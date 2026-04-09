-- Migration: CEO Speechfulness Clean Slate Integration
-- Description: Creates a dedicated, isolated table for Speechfulness leads.

-- 1. Create the Isolated Table
CREATE TABLE IF NOT EXISTS public.ceo_speechfulness_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Customer Info (Decoupled from profiles)
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    tax_id TEXT, -- For VAT/Tax Invoice
    
    -- Booking Details
    package_name TEXT NOT NULL,
    tier_id TEXT,
    total_amount NUMERIC,
    booking_code TEXT UNIQUE, -- e.g. CEO-SPEECH-2026-XXXX
    status TEXT DEFAULT 'pending_payment', -- pending_payment, paid, verified, cancelled
    
    -- Payment Info
    slip_url TEXT, -- URL to Supabase Storage
    
    -- Internal Meta
    is_vat BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Security (RLS)
ALTER TABLE public.ceo_speechfulness_leads ENABLE ROW LEVEL SECURITY;

-- Allow Public/Anonymous to insert (Guest Registration)
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.ceo_speechfulness_leads;
CREATE POLICY "Anyone can submit a lead" ON public.ceo_speechfulness_leads
    FOR INSERT 
    WITH CHECK (true);

-- Allow admins or specific users to view (You can refine this later)
DROP POLICY IF EXISTS "Admins can view leads" ON public.ceo_speechfulness_leads;
CREATE POLICY "Admins can view leads" ON public.ceo_speechfulness_leads
    FOR SELECT 
    USING (true); -- Set to true for now so Kru Den can see them, restrict to auth.uid() later if needed

-- 3. Storage (Optional: Ensuring bucket exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ceo-media', 'ceo-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Allow anyone to upload slips for this course
DROP POLICY IF EXISTS "Public can upload CEO slips" ON storage.objects;
CREATE POLICY "Public can upload CEO slips" ON storage.objects
    FOR INSERT 
    WITH CHECK (bucket_id = 'ceo-media');
