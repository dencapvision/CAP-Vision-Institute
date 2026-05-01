-- Migration: Create/configure 'media' bucket with public access
-- Portfolio images are stored in the 'media' bucket (not 'images').
-- Without this, all portfolio cover images return 400 and won't display.

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access - Media" ON storage.objects;
CREATE POLICY "Public Access - Media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated Upload - Media" ON storage.objects;
CREATE POLICY "Authenticated Upload - Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated Update - Media" ON storage.objects;
CREATE POLICY "Authenticated Update - Media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated Delete - Media" ON storage.objects;
CREATE POLICY "Authenticated Delete - Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');
