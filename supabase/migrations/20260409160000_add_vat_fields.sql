-- Migration: Add VAT and Tax fields to CEO system
-- Description: Adds necessary columns for VAT calculation and tax invoice requests.

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS tax_id TEXT,
ADD COLUMN IF NOT EXISTS address TEXT;

ALTER TABLE public.ceo_bookings
ADD COLUMN IF NOT EXISTS is_vat BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS total_amount NUMERIC,
ADD COLUMN IF NOT EXISTS package_name TEXT;

-- RLS policies usually don't need changes as they are user_id based.
-- But let's ensure authenticated users can update these new fields in their profiles.
-- The existing policy "Users can update own profile" should cover this.
