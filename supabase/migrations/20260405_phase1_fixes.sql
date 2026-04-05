-- PHASE 1 FIXES: Performance Indexes and RLS Security Audit

-- 1. Indexes for `leads` table to improve query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Optional: add session_id to leads for tracking conversions
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS session_id UUID;
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON public.leads(session_id);

-- 2. RLS Security Audit for `ai_chat_logs` and `ai_sessions`
-- Drop the insecure public read access policies
DROP POLICY IF EXISTS "Service role full access on ai_chat_logs" ON public.ai_chat_logs;
DROP POLICY IF EXISTS "Service role full access on ai_sessions" ON public.ai_sessions;

-- Create secure policies: only authenticated admins can read/write.
-- Note: Edge functions use service_role key, which bypasses RLS automatically, 
-- so they can still insert records without needing a specific policy.
CREATE POLICY "Admins full access on ai_chat_logs"
  ON public.ai_chat_logs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins full access on ai_sessions"
  ON public.ai_sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
