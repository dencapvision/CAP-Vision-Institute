-- Migration: Fix Profile and Booking Schema alignment
-- Description: Adds missing columns used by the registration flow.

-- 1. Add email to profiles (if not exists)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles (email);

-- 2. Add user_email to ceo_bookings (if not exists)
ALTER TABLE public.ceo_bookings ADD COLUMN IF NOT EXISTS user_email TEXT;

-- 3. Ensure booking_code is NOT NULL (already is, but confirming)
-- This migration should be run in the Supabase SQL Editor.
