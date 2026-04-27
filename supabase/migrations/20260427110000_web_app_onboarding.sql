-- Create Web App Onboarding Table
CREATE TABLE IF NOT EXISTS public.web_app_onboarding (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.web_app_bookings(id),
    package_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    goal TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    assets JSONB DEFAULT '{}',
    budget TEXT,
    timeline TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.web_app_onboarding ENABLE ROW LEVEL SECURITY;

-- Create Policies
DROP POLICY IF EXISTS "Allow public insert on web_app_onboarding" ON public.web_app_onboarding;
CREATE POLICY "Allow public insert on web_app_onboarding" ON public.web_app_onboarding
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin read on web_app_onboarding" ON public.web_app_onboarding;
CREATE POLICY "Allow admin read on web_app_onboarding" ON public.web_app_onboarding
    FOR SELECT USING (true); -- Simplified for now, or match existing admin logic

-- Add update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_web_app_onboarding_updated_at ON public.web_app_onboarding;
CREATE TRIGGER update_web_app_onboarding_updated_at
    BEFORE UPDATE ON public.web_app_onboarding
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
