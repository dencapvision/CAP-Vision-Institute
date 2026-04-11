-- Migration: Create Storage Buckets for Images and Profiles
-- Description: Sets up the 'images' and 'profiles' buckets with appropriate RLS policies.

-- 1. Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS (Should be enabled by default for storage.objects, but ensuring policies are clean)

-- ---------------------------------------------------------
-- POLICIES FOR 'images' BUCKET
-- ---------------------------------------------------------
DROP POLICY IF EXISTS "Public Access - Images" ON storage.objects;
CREATE POLICY "Public Access - Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Authenticated Upload - Images" ON storage.objects;
CREATE POLICY "Authenticated Upload - Images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "Authenticated Update - Images" ON storage.objects;
CREATE POLICY "Authenticated Update - Images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Authenticated Delete - Images" ON storage.objects;
CREATE POLICY "Authenticated Delete - Images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'images');

-- ---------------------------------------------------------
-- POLICIES FOR 'profiles' BUCKET
-- ---------------------------------------------------------
DROP POLICY IF EXISTS "Public Access - Profiles" ON storage.objects;
CREATE POLICY "Public Access - Profiles" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'profiles');

DROP POLICY IF EXISTS "Authenticated Upload - Profiles" ON storage.objects;
CREATE POLICY "Authenticated Upload - Profiles" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'profiles');

DROP POLICY IF EXISTS "Authenticated Update - Profiles" ON storage.objects;
CREATE POLICY "Authenticated Update - Profiles" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'profiles');

DROP POLICY IF EXISTS "Authenticated Delete - Profiles" ON storage.objects;
CREATE POLICY "Authenticated Delete - Profiles" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'profiles');
