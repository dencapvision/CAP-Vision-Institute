-- Migration: Allow Guest Bookings and Fix FK Constraints
-- Description: Makes user_id nullable and stores contact info directly in bookings.

-- 1. Modify ceo_bookings to support guests and redundancy
ALTER TABLE public.ceo_bookings ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.ceo_bookings ADD COLUMN IF NOT EXISTS user_full_name TEXT;
ALTER TABLE public.ceo_bookings ADD COLUMN IF NOT EXISTS user_phone TEXT;
ALTER TABLE public.ceo_bookings ADD COLUMN IF NOT EXISTS tax_id TEXT;
ALTER TABLE public.ceo_bookings ADD COLUMN IF NOT EXISTS address TEXT;

-- 2. Redefine RPC to be robust against missing profiles or auth sync latencies
CREATE OR REPLACE FUNCTION public.register_speechfulness_booking(
    p_user_email TEXT,
    p_full_name TEXT,
    p_phone TEXT,
    p_tax_id TEXT,
    p_address TEXT,
    p_package_name TEXT,
    p_tier_id TEXT,
    p_total_amount NUMERIC,
    p_booking_code TEXT,
    p_type TEXT,
    p_user_id UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_profile_id UUID;
    v_booking_id UUID;
BEGIN
    -- 1. Optional Profile Sync (Try but don't fail)
    -- This handles the FK issue by ignoring profile errors or just trying best-effort
    BEGIN
        IF p_user_id IS NOT NULL THEN
            INSERT INTO public.profiles (id, email, full_name, phone, tax_id, address, updated_at)
            VALUES (p_user_id, p_user_email, p_full_name, p_phone, p_tax_id, p_address, now())
            ON CONFLICT (id) DO UPDATE SET
                full_name = EXCLUDED.full_name,
                phone = EXCLUDED.phone,
                tax_id = EXCLUDED.tax_id,
                address = EXCLUDED.address,
                updated_at = now();
            v_profile_id := p_user_id;
        ELSE
            -- No ID provided, try to find existing profile by email but don't force it
            SELECT id INTO v_profile_id FROM public.profiles WHERE email = p_user_email LIMIT 1;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        v_profile_id := NULL; -- Proceed as guest if profile fails
    END;

    -- 2. Create Booking (Robust with all details included)
    INSERT INTO public.ceo_bookings (
        user_id,
        user_email,
        user_full_name,
        user_phone,
        tax_id,
        address,
        booking_code,
        type,
        package_name,
        tier_id,
        status,
        is_vat,
        total_amount,
        created_at
    ) VALUES (
        v_profile_id,
        p_user_email,
        p_full_name,
        p_phone,
        p_tax_id,
        p_address,
        p_booking_code,
        p_type,
        p_package_name,
        p_tier_id,
        'pending_payment',
        (p_total_amount > 20000), -- Example logic for VAT packages
        p_total_amount,
        now()
    )
    RETURNING id INTO v_booking_id;

    RETURN v_booking_id;
END;
$$;
