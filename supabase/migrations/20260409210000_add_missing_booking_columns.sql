-- Migration: Add Missing Columns to ceo_bookings
-- Description: Ensures tier_id and package_name columns exist to support the Speechfulness registration flow.

DO $$ 
BEGIN
    -- Add package_name if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ceo_bookings' AND column_name='package_name') THEN
        ALTER TABLE public.ceo_bookings ADD COLUMN package_name TEXT;
    END IF;

    -- Add tier_id if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ceo_bookings' AND column_name='tier_id') THEN
        ALTER TABLE public.ceo_bookings ADD COLUMN tier_id TEXT;
    END IF;

    -- Add is_vat if not exists (referenced in RPC)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ceo_bookings' AND column_name='is_vat') THEN
        ALTER TABLE public.ceo_bookings ADD COLUMN is_vat BOOLEAN DEFAULT false;
    END IF;

    -- Add total_amount if not exists (referenced in RPC)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ceo_bookings' AND column_name='total_amount') THEN
        ALTER TABLE public.ceo_bookings ADD COLUMN total_amount NUMERIC;
    END IF;

    -- Add user_email if not exists (referenced in RPC)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ceo_bookings' AND column_name='user_email') THEN
        ALTER TABLE public.ceo_bookings ADD COLUMN user_email TEXT;
    END IF;
END $$;
