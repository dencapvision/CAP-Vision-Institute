-- Migration: CEO Tier Community Booking & Membership System
-- Description: Core schema for user profiles, bookings, payments, and memberships.

-- 1. PROFILES TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    company TEXT,
    position TEXT,
    revenue_range TEXT, -- 10-50M, 50-100M, 100M+
    line_id TEXT,
    phone TEXT,
    challenge TEXT,
    expectation TEXT,
    is_ceo_member BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CEO BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.ceo_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_code TEXT UNIQUE NOT NULL, -- Format: CEO-YYYYMMDD-XXX
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- 'session' or 'membership'
    session_date TEXT, -- For single sessions
    plan_name TEXT, -- e.g., 'Monthly Membership'
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, confirmed, rejected, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CEO PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.ceo_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES public.ceo_bookings(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'THB' NOT NULL,
    method TEXT NOT NULL, -- 'stripe' or 'transfer'
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, completed, failed
    slip_url TEXT, -- URL to Supabase Storage for bank transfers
    stripe_session_id TEXT, -- Stripe Checkout Session ID
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CEO MEMBERSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.ceo_memberships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    plan_type TEXT NOT NULL, -- 'monthly', 'yearly'
    status TEXT DEFAULT 'active' NOT NULL, -- active, expired, cancelled
    start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- TRIGGERS & FUNCTIONS
-- -------------------------------------------------------------

-- Trigger for updated_at on profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Trigger for updated_at on ceo_bookings
DROP TRIGGER IF EXISTS update_ceo_bookings_updated_at ON public.ceo_bookings;
CREATE TRIGGER update_ceo_bookings_updated_at BEFORE UPDATE ON public.ceo_bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Trigger for updated_at on ceo_memberships
DROP TRIGGER IF EXISTS update_ceo_memberships_updated_at ON public.ceo_memberships;
CREATE TRIGGER update_ceo_memberships_updated_at BEFORE UPDATE ON public.ceo_memberships FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Automatically create a profile when a new auth.user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, phone)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'phone');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- -------------------------------------------------------------
-- RLS POLICIES
-- -------------------------------------------------------------

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ceo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ceo_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ceo_memberships ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Bookings: Users can view and insert their own bookings
DROP POLICY IF EXISTS "Users can view own bookings" ON public.ceo_bookings;
CREATE POLICY "Users can view own bookings" ON public.ceo_bookings FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own bookings" ON public.ceo_bookings;
CREATE POLICY "Users can insert own bookings" ON public.ceo_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments: Users can view their own payments
DROP POLICY IF EXISTS "Users can view own payments" ON public.ceo_payments;
CREATE POLICY "Users can view own payments" ON public.ceo_payments FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.ceo_bookings b WHERE b.id = booking_id AND b.user_id = auth.uid()));

-- Memberships: Users can view their own membership status
DROP POLICY IF EXISTS "Users can view own membership" ON public.ceo_memberships;
CREATE POLICY "Users can view own membership" ON public.ceo_memberships FOR SELECT USING (auth.uid() = user_id);

-- -------------------------------------------------------------
-- STORAGE SETUP (Payment Slips)
-- -------------------------------------------------------------

-- Create private bucket for payment slips
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-slips', 'payment-slips', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Authenticated users can upload their own slips
DROP POLICY IF EXISTS "Authenticated users can upload slips" ON storage.objects;
CREATE POLICY "Authenticated users can upload slips" ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'payment-slips' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Policy: Authenticated users can view their own slips
DROP POLICY IF EXISTS "Authenticated users can view own slips" ON storage.objects;
CREATE POLICY "Authenticated users can view own slips" ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'payment-slips' AND (storage.foldername(name))[1] = auth.uid()::text);
