-- Migration: Backfill missing profiles
-- Description: Inserts missing profile records for existing users in auth.users.

INSERT INTO public.profiles (id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;
