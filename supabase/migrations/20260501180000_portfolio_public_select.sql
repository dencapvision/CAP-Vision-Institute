-- Migration: Add public SELECT policy for portfolio tables
-- The rls_hardening migration only added admin write policies but forgot public read access.
-- Without this, the anon key cannot query portfolio data and the public page shows nothing.

DROP POLICY IF EXISTS "Public can view portfolio" ON public.portfolio;
CREATE POLICY "Public can view portfolio"
ON public.portfolio FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Public can view portfolio_images" ON public.portfolio_images;
CREATE POLICY "Public can view portfolio_images"
ON public.portfolio_images FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Public can view portfolio_courses" ON public.portfolio_courses;
CREATE POLICY "Public can view portfolio_courses"
ON public.portfolio_courses FOR SELECT
TO public
USING (true);
