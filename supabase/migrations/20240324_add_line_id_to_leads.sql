-- Add line_id column to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS line_id TEXT;
