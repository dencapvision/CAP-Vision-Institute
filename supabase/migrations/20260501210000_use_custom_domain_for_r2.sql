-- Migration: Replace R2 public URL with custom domain assets.capvisionpartner.com
-- Use branded custom domain instead of the raw r2.dev public URL across all tables.

DO $$
DECLARE
  old_base TEXT := 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/';
  new_base TEXT := 'https://assets.capvisionpartner.com/';
  n BIGINT;
BEGIN

  -- courses.image
  UPDATE public.courses
  SET image = REPLACE(image, old_base, new_base)
  WHERE image LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';
  GET DIAGNOSTICS n = ROW_COUNT;
  RAISE NOTICE 'courses: % rows updated', n;

  -- courses.long_description (JSON)
  UPDATE public.courses
  SET long_description = REPLACE(long_description::text, old_base, new_base)::jsonb
  WHERE long_description::text LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';

  -- instructors.image
  UPDATE public.instructors
  SET image = REPLACE(image, old_base, new_base)
  WHERE image LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';
  GET DIAGNOSTICS n = ROW_COUNT;
  RAISE NOTICE 'instructors: % rows updated', n;

  -- blog_articles.thumbnail
  UPDATE public.blog_articles
  SET thumbnail = REPLACE(thumbnail, old_base, new_base)
  WHERE thumbnail LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';
  GET DIAGNOSTICS n = ROW_COUNT;
  RAISE NOTICE 'blog_articles thumbnail: % rows updated', n;

  -- blog_articles.content (JSON)
  UPDATE public.blog_articles
  SET content = REPLACE(content::text, old_base, new_base)::jsonb
  WHERE content::text LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';

  -- portfolio.cover_image
  UPDATE public.portfolio
  SET cover_image = REPLACE(cover_image, old_base, new_base)
  WHERE cover_image LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';
  GET DIAGNOSTICS n = ROW_COUNT;
  RAISE NOTICE 'portfolio: % rows updated', n;

  -- portfolio_images.image_url
  UPDATE public.portfolio_images
  SET image_url = REPLACE(image_url, old_base, new_base)
  WHERE image_url LIKE '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';
  GET DIAGNOSTICS n = ROW_COUNT;
  RAISE NOTICE 'portfolio_images: % rows updated', n;

  -- resources (if exists)
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'resources') THEN
    EXECUTE 'UPDATE public.resources SET thumbnail = REPLACE(thumbnail, $1, $2) WHERE thumbnail LIKE $3'
      USING old_base, new_base, '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';
  END IF;

  -- speakers (if exists with image column)
  IF EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'speakers' AND column_name = 'image') THEN
    EXECUTE 'UPDATE public.speakers SET image = REPLACE(image, $1, $2) WHERE image LIKE $3'
      USING old_base, new_base, '%pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev%';
  END IF;

  RAISE NOTICE 'Custom domain migration complete.';

END $$;
