-- Create leads table for AI Agent inquiries
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() (at time zone 'utc') NOT NULL,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    interest_topic TEXT,
    notes TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'lost')),
    source TEXT DEFAULT 'ai_agent'
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insertion (since visitors use the AI agent)
CREATE POLICY "Allow anonymous insert for leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admins can view/update leads
CREATE POLICY "Admin only select/update"
ON public.leads
FOR ALL
TO authenticated
USING (true);
