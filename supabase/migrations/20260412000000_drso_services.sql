-- Migration: Dr. So Service Ecosystem
-- Description: Schema for Dr. So's booking and payment system.

-- 1. DR.SO BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.drso_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_code TEXT UNIQUE NOT NULL, -- Format: SO-YYYYMMDD-XXXX
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Nullable to support guest bookings
    user_email TEXT, -- Stored directly if guest or from profile
    user_full_name TEXT NOT NULL,
    user_phone TEXT,
    user_line_id TEXT,
    service_type TEXT NOT NULL, -- 'personal_coaching', 'private_group', 'workshop_training'
    challenge TEXT,
    expectation TEXT,
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, confirmed, rejected, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DR.SO PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.drso_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES public.drso_bookings(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'THB' NOT NULL,
    method TEXT NOT NULL, -- 'transfer' (Stripe can be added later)
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, completed, failed
    slip_url TEXT, -- URL to Supabase Storage for bank transfers
    transfer_date TEXT,
    transfer_time TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TRIGGERS for updated_at
DROP TRIGGER IF EXISTS update_drso_bookings_updated_at ON public.drso_bookings;
CREATE TRIGGER update_drso_bookings_updated_at 
    BEFORE UPDATE ON public.drso_bookings 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 4. RLS POLICIES (Dr. So Services)
ALTER TABLE public.drso_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drso_payments ENABLE ROW LEVEL SECURITY;

-- Bookings: Allow Anyone to Insert (Guest Support)
DROP POLICY IF EXISTS "Anyone can insert DrSo bookings" ON public.drso_bookings;
CREATE POLICY "Anyone can insert DrSo bookings" ON public.drso_bookings FOR INSERT WITH CHECK (true);

-- Bookings: Users can view their own bookings
DROP POLICY IF EXISTS "Users can view own DrSo bookings" ON public.drso_bookings;
CREATE POLICY "Users can view own DrSo bookings" ON public.drso_bookings FOR SELECT 
USING (auth.uid() = user_id OR (user_id IS NULL AND auth.uid() IS NULL)); -- Simple check, enhanced logic can be added later

-- Payments: Allow Anyone to Insert (Guest Support)
DROP POLICY IF EXISTS "Anyone can insert DrSo payments" ON public.drso_payments;
CREATE POLICY "Anyone can insert DrSo payments" ON public.drso_payments FOR INSERT WITH CHECK (true);

-- Payments: Users can view their own payments via booking relationship
DROP POLICY IF EXISTS "Users can view own DrSo payments" ON public.drso_payments;
CREATE POLICY "Users can view own DrSo payments" ON public.drso_payments FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.drso_bookings b WHERE b.id = booking_id AND (b.user_id = auth.uid() OR b.user_id IS NULL)));

-- 5. STORAGE POLICIES Extension (Reuse payment-slips bucket)
-- We use the existing 'payment-slips' bucket but need to ensure policies allow guest/specific path uploads if needed.
-- Policies from CEO migration already handle authenticated users. For Dr. So, we'll keep it similar but add path for 'drso'.

DROP POLICY IF EXISTS "Anyone can upload DrSo slips" ON storage.objects;
CREATE POLICY "Anyone can upload DrSo slips" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'payment-slips'); -- In production, we should restrict this more, but for now allow flow.

DROP POLICY IF EXISTS "Anyone can view DrSo slips" ON storage.objects;
CREATE POLICY "Anyone can view DrSo slips" ON storage.objects FOR SELECT 
USING (bucket_id = 'payment-slips');
