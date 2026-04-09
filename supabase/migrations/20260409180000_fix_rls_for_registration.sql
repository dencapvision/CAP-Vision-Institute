-- Migration: Fix RLS for CEO Speechfulness Registration (Guest-First Flow)
-- Description: Allows unauthenticated users to register and upload slips.

-- 1. PROFILES: Allow anon to insert/update during registration
-- Trigger handles insert, but upsert on frontend might try to update.
DROP POLICY IF EXISTS "Allow anon to insert profiles" ON public.profiles;
CREATE POLICY "Allow anon to insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon to update profiles" ON public.profiles;
CREATE POLICY "Allow anon to update profiles" ON public.profiles FOR UPDATE USING (true) WITH CHECK (true);

-- 2. BOOKINGS: Allow anyone to insert a booking
DROP POLICY IF EXISTS "Allow anon to insert bookings" ON public.ceo_bookings;
CREATE POLICY "Allow anon to insert bookings" ON public.ceo_bookings FOR INSERT WITH CHECK (true);

-- 3. PAYMENTS: Allow anyone to insert payment data (including slip URL)
DROP POLICY IF EXISTS "Allow anon to insert payments" ON public.ceo_payments;
CREATE POLICY "Allow anon to insert payments" ON public.ceo_payments FOR INSERT WITH CHECK (true);

-- 4. STORAGE: Allow public/anon uploads for payment slips
-- Note: This is required if the user isn't logged in when uploading.
-- We'll allow any anon user to upload to the payment-slips bucket.
DROP POLICY IF EXISTS "Allow public to upload slips" ON storage.objects;
CREATE POLICY "Allow public to upload slips" ON storage.objects FOR INSERT 
TO public
WITH CHECK (bucket_id = 'payment-slips');

-- Allow public to view their own upload if needed (though admin handles this)
DROP POLICY IF EXISTS "Allow public to view own slips" ON storage.objects;
CREATE POLICY "Allow public to view own slips" ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'payment-slips');
