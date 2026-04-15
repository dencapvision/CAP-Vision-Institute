-- Migration: Update all Supabase Storage URLs → Cloudflare R2
-- Run AFTER files have been copied to R2 and R2 custom domain is live.
-- Apply with: supabase db push

DO $$
DECLARE
  old_base TEXT := 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/';
  new_base TEXT := 'https://assets.capvisionpartner.com/';
BEGIN

  -- courses.image
  UPDATE public.courses
  SET image = REPLACE(image, old_base, new_base)
  WHERE image LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  RAISE NOTICE 'courses updated: % rows', (SELECT COUNT(*) FROM public.courses WHERE image LIKE '%assets.capvisionpartner.com%');

  -- courses.alt_text (บางครั้งมี URL ฝัง)
  UPDATE public.courses
  SET long_description = REPLACE(long_description::text, old_base, new_base)::jsonb
  WHERE long_description::text LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  -- instructors.image
  UPDATE public.instructors
  SET image = REPLACE(image, old_base, new_base)
  WHERE image LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  RAISE NOTICE 'instructors updated: % rows', (SELECT COUNT(*) FROM public.instructors WHERE image LIKE '%assets.capvisionpartner.com%');

  -- blog_articles.thumbnail
  UPDATE public.blog_articles
  SET thumbnail = REPLACE(thumbnail, old_base, new_base)
  WHERE thumbnail LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  -- blog_articles.content (JSON — รูปภาพในบทความ)
  UPDATE public.blog_articles
  SET content = REPLACE(content::text, old_base, new_base)::jsonb
  WHERE content::text LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  RAISE NOTICE 'blog_articles updated: % rows', (SELECT COUNT(*) FROM public.blog_articles WHERE thumbnail LIKE '%assets.capvisionpartner.com%');

  -- resources (ถ้ามี)
  UPDATE public.resources
  SET thumbnail = REPLACE(thumbnail, old_base, new_base)
  WHERE thumbnail LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  -- speakers (ถ้ามี)
  UPDATE public.speakers
  SET image = REPLACE(image, old_base, new_base)
  WHERE image LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  RAISE NOTICE 'Migration complete.';

END $$;
