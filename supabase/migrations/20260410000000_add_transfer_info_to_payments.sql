-- Migration: Add transfer date and time to payments
-- Description: Required for verifying bank transfers from slips.

ALTER TABLE public.ceo_payments 
ADD COLUMN IF NOT EXISTS transfer_date DATE,
ADD COLUMN IF NOT EXISTS transfer_time TIME;

COMMENT ON COLUMN public.ceo_payments.transfer_date IS 'Date of transfer as shown on the slip';
COMMENT ON COLUMN public.ceo_payments.transfer_time IS 'Time of transfer as shown on the slip';
