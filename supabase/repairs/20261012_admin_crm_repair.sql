-- Repairs missing CRM schema; maps only existing CMS administrators.
BEGIN;
CREATE TABLE IF NOT EXISTS public.crm_admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);
ALTER TABLE public.crm_admins ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "CRM admin self lookup" ON public.crm_admins;
CREATE POLICY "CRM admin self lookup" ON public.crm_admins FOR SELECT TO authenticated USING (user_id = auth.uid());
GRANT SELECT ON public.crm_admins TO authenticated;
REVOKE ALL ON public.crm_admins FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.crm_admins FROM authenticated;

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS pipeline_stage text CHECK (pipeline_stage IN
  ('new','contacted','tna','proposal','won','lost','delivery','follow_up','repeat'));
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS follow_up_at timestamptz;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS crm_notes text CHECK (length(crm_notes) <= 4000);
UPDATE public.leads SET pipeline_stage = status WHERE status IN ('new','contacted','lost');
-- Historical qualified/closed are intentionally left unclassified.
-- Enforce the contact contract at the database boundary as well as in the UI.
-- NOT VALID leaves historical data intact while checking new inserts/updates.
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.leads'::regclass AND conname='contact_form_fields') THEN
ALTER TABLE public.leads ADD CONSTRAINT contact_form_fields CHECK (
  source IS DISTINCT FROM 'contact_form' OR (
    name IS NOT NULL AND length(btrim(name)) BETWEEN 1 AND 200
    AND company IS NOT NULL AND length(btrim(company)) BETWEEN 1 AND 300
    AND email IS NOT NULL AND length(email) <= 254 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    AND phone IS NOT NULL AND length(phone) BETWEEN 6 AND 40
    AND interest_topic IS NOT NULL AND length(interest_topic) BETWEEN 1 AND 4070
    AND (line_id IS NULL OR length(line_id) <= 100)
  )
) NOT VALID;
END IF; END $$;
CREATE INDEX IF NOT EXISTS leads_pipeline_follow_up_idx ON public.leads(pipeline_stage, follow_up_at);

-- Replace every existing leads policy: permissive policies combine with OR.
DO $$ DECLARE p record; BEGIN
  FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='leads' LOOP
    EXECUTE format('DROP POLICY %I ON public.leads', p.policyname);
  END LOOP;
END $$;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public capture new lead" ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new' AND pipeline_stage IS NULL AND follow_up_at IS NULL AND crm_notes IS NULL);
CREATE POLICY "CRM admins read" ON public.leads FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.crm_admins WHERE user_id = auth.uid()));
CREATE POLICY "CRM admins update" ON public.leads FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.crm_admins WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.crm_admins WHERE user_id = auth.uid()));
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE ON public.leads TO authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon;
REVOKE DELETE ON public.leads FROM authenticated;
INSERT INTO public.crm_admins(user_id)
SELECT id FROM public.profiles WHERE is_admin IS TRUE
ON CONFLICT (user_id) DO NOTHING;
NOTIFY pgrst, 'reload schema';
COMMIT;
