-- Migration: RPC for CEO Registration
-- Description: Handles both profile sync and booking insertion securely.

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
SECURITY DEFINER -- Bypasses RLS to ensure successful registration
AS $$
DECLARE
    v_profile_id UUID;
    v_booking_id UUID;
BEGIN
    -- 1. Sync Profile
    -- If user_id is provided, use it. Otherwise, try matching by email.
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
        -- Match by email if id is null (guest flow)
        INSERT INTO public.profiles (id, email, full_name, phone, tax_id, address, updated_at)
        VALUES (gen_random_uuid(), p_user_email, p_full_name, p_phone, p_tax_id, p_address, now())
        ON CONFLICT (email) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            phone = EXCLUDED.phone,
            tax_id = EXCLUDED.tax_id,
            address = EXCLUDED.address,
            updated_at = now()
        RETURNING id INTO v_profile_id;
    END IF;

    -- 2. Create Booking
    INSERT INTO public.ceo_bookings (
        user_id,
        user_email,
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
        p_booking_code,
        p_type,
        p_package_name,
        p_tier_id,
        'pending_payment',
        (p_total_amount > 0), -- Simplified check
        p_total_amount,
        now()
    )
    RETURNING id INTO v_booking_id;

    RETURN v_booking_id;
END;
$$;
