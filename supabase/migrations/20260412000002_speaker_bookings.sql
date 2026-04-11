-- Migration: Speaker Booking Ecosystem
-- Description: Schema for centralized speaker bookings and payment systems.

-- 1. SPEAKER BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.speaker_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_code TEXT UNIQUE NOT NULL, -- Format: SP-YYYYMMDD-XXXX
    instructor_id UUID REFERENCES public.instructors(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Optional if guest
    user_email TEXT,
    user_full_name TEXT NOT NULL,
    user_phone TEXT,
    user_line_id TEXT,
    service_type TEXT NOT NULL, -- 'speaking', 'training', 'consulting', 'workshop'
    challenge TEXT,
    expectation TEXT,
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, confirmed, rejected, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SPEAKER PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.speaker_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES public.speaker_bookings(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'THB' NOT NULL,
    method TEXT NOT NULL, -- 'transfer'
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, completed, failed
    slip_url TEXT, -- URL to Supabase Storage
    transfer_date TEXT,
    transfer_time TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TRIGGERS
DROP TRIGGER IF EXISTS update_speaker_bookings_updated_at ON public.speaker_bookings;
CREATE TRIGGER update_speaker_bookings_updated_at 
    BEFORE UPDATE ON public.speaker_bookings 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 4. RLS POLICIES
ALTER TABLE public.speaker_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaker_payments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (Guest support)
DROP POLICY IF EXISTS "Anyone can insert speaker bookings" ON public.speaker_bookings;
CREATE POLICY "Anyone can insert speaker bookings" ON public.speaker_bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can insert speaker payments" ON public.speaker_payments;
CREATE POLICY "Anyone can insert speaker payments" ON public.speaker_payments FOR INSERT WITH CHECK (true);

-- Allow users to view their own (simple check)
DROP POLICY IF EXISTS "Users can view own bookings" ON public.speaker_bookings;
CREATE POLICY "Users can view own bookings" ON public.speaker_bookings FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can view own payments" ON public.speaker_payments;
CREATE POLICY "Users can view own payments" ON public.speaker_payments FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.speaker_bookings b WHERE b.id = booking_id AND (b.user_id = auth.uid() OR b.user_id IS NULL)));
