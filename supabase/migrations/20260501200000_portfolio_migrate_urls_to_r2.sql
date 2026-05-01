-- Migration: Update portfolio image URLs from Supabase Storage → Cloudflare R2
-- The original R2 migration (20260417000000) missed the portfolio and portfolio_images tables.
-- All other tables (courses, instructors, blog_articles) were already migrated.

DO $$
DECLARE
  old_base TEXT := 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/';
  new_base TEXT := 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/';
BEGIN

  -- portfolio.cover_image
  UPDATE public.portfolio
  SET cover_image = REPLACE(cover_image, old_base, new_base)
  WHERE cover_image LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  RAISE NOTICE 'portfolio updated: % rows',
    (SELECT COUNT(*) FROM public.portfolio WHERE cover_image LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%');

  -- portfolio_images.image_url
  UPDATE public.portfolio_images
  SET image_url = REPLACE(image_url, old_base, new_base)
  WHERE image_url LIKE '%nheppvjayzxlblkeanxs.supabase.co%';

  RAISE NOTICE 'portfolio_images updated: % rows',
    (SELECT COUNT(*) FROM public.portfolio_images WHERE image_url LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%');

  RAISE NOTICE 'Portfolio R2 migration complete.';

END $$;
