-- Migration: Course Booking System
-- Description: Schema for general course bookings and payments, tailored for "Subconscious Speaker" course.

-- 1. COURSE BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.course_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_code TEXT UNIQUE NOT NULL, -- Format: SS-YYYYMMDD-XXXX
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_email TEXT,
    user_full_name TEXT NOT NULL,
    user_phone TEXT,
    user_line_id TEXT,
    occupation TEXT,
    goals TEXT,
    package_id TEXT NOT NULL, -- 'early_bird', 'regular'
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, confirmed, rejected, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. COURSE PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.course_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES public.course_bookings(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'THB' NOT NULL,
    method TEXT NOT NULL, -- 'transfer', 'stripe_ui'
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, completed, failed
    slip_url TEXT,
    transfer_date TEXT,
    transfer_time TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TRIGGERS for updated_at
DROP TRIGGER IF EXISTS update_course_bookings_updated_at ON public.course_bookings;
CREATE TRIGGER update_course_bookings_updated_at 
    BEFORE UPDATE ON public.course_bookings 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 4. RLS POLICIES
ALTER TABLE public.course_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert course bookings" ON public.course_bookings;
CREATE POLICY "Anyone can insert course bookings" ON public.course_bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own course bookings" ON public.course_bookings;
CREATE POLICY "Users can view own course bookings" ON public.course_bookings FOR SELECT 
USING (auth.uid() = user_id OR (user_id IS NULL));

DROP POLICY IF EXISTS "Anyone can insert course payments" ON public.course_payments;
CREATE POLICY "Anyone can insert course payments" ON public.course_payments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own course payments" ON public.course_payments;
CREATE POLICY "Users can view own course payments" ON public.course_payments FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.course_bookings b WHERE b.id = booking_id AND (b.user_id = auth.uid() OR b.user_id IS NULL)));
