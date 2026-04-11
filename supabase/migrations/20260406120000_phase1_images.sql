-- Migration for Phase 1: Add image fields to speakers and contents

-- 1. Add image_url to speakers table
ALTER TABLE public.speakers ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Add featured_image_url to contents table
ALTER TABLE public.contents ADD COLUMN IF NOT EXISTS featured_image_url TEXT;

-- 3. Update RLS policies to ensure public can view images
-- (Assuming RLS is already enabled and public select policies exist, 
-- but adding columns doesn't usually require new policies unless they are sensitive)

COMMENT ON COLUMN public.speakers.image_url IS 'URL of the speaker profile picture';
COMMENT ON COLUMN public.contents.featured_image_url IS 'URL of the featured image for the article';
