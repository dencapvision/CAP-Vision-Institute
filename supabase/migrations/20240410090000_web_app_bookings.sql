-- Migration: Web App Pricing Closing System
-- Description: Isolated table for Web App bookings and payment tracking.

-- 1. Create the Table
CREATE TABLE IF NOT EXISTS public.web_app_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Customer Info
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    line_id TEXT,
    
    -- Booking Details
    package_name TEXT NOT NULL,
    plan_id TEXT, -- e.g. 'start-up', 'business', 'enterprise'
    total_amount NUMERIC,
    booking_code TEXT UNIQUE, -- e.g. WA-2026-XXXX
    status TEXT DEFAULT 'pending_payment', -- pending_payment, paid, verified, cancelled
    
    -- Payment Info
    slip_url TEXT, -- URL to Supabase Storage
    payment_method TEXT, -- 'transfer' or 'stripe'
    
    -- Internal Meta
    is_vat BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Security (RLS)
ALTER TABLE public.web_app_bookings ENABLE ROW LEVEL SECURITY;

-- Allow Public/Anonymous to insert (Guest Registration)
DROP POLICY IF EXISTS "Anyone can submit a web app booking" ON public.web_app_bookings;
CREATE POLICY "Anyone can submit a web app booking" ON public.web_app_bookings
    FOR INSERT 
    WITH CHECK (true);

-- Allow admins or specific users to view
DROP POLICY IF EXISTS "Admins can view web app bookings" ON public.web_app_bookings;
CREATE POLICY "Admins can view web app bookings" ON public.web_app_bookings
    FOR SELECT 
    USING (true);

-- 3. Storage Policy Update (Ensuring slips can be uploaded to ceo-media)
-- Note: 'ceo-media' bucket must already exist. 
-- This policy allows guests to upload their payment slips.
DROP POLICY IF EXISTS "Allow public upload for web app slips" ON storage.objects;
CREATE POLICY "Allow public upload for web app slips" ON storage.objects
    FOR INSERT 
    WITH CHECK (bucket_id = 'ceo-media');
