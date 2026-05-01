-- Migration: Security Hardening & RLS Refinement
-- Description: Adds is_admin check and restricts CMS management to admins only.

-- 1. Extend Profiles with is_admin
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Create is_admin() helper function
-- This function checks the is_admin flag in the profiles table for the current user.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT is_admin 
    FROM public.profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------------------------
-- CMS TABLES REFINEMENT (Instructors, Courses, Online Courses, Events)
-- -------------------------------------------------------------

-- Instructors
DROP POLICY IF EXISTS "Authenticated users can fully manage instructors" ON public.instructors;
DROP POLICY IF EXISTS "Admins can fully manage instructors" ON public.instructors;
CREATE POLICY "Admins can fully manage instructors" 
ON public.instructors FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Courses
DROP POLICY IF EXISTS "Authenticated users can fully manage courses" ON public.courses;
DROP POLICY IF EXISTS "Authenticated users can insert courses" ON public.courses;
DROP POLICY IF EXISTS "Authenticated users can update courses" ON public.courses;
DROP POLICY IF EXISTS "Authenticated users can delete courses" ON public.courses;
DROP POLICY IF EXISTS "Authenticated users can view all courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can fully manage courses" ON public.courses;

CREATE POLICY "Admins can fully manage courses" 
ON public.courses FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Online Courses
DROP POLICY IF EXISTS "Authenticated users can fully manage online_courses" ON public.online_courses;
DROP POLICY IF EXISTS "Authenticated users can view all online_courses" ON public.online_courses;
DROP POLICY IF EXISTS "Admins can fully manage online_courses" ON public.online_courses;

CREATE POLICY "Admins can fully manage online_courses" 
ON public.online_courses FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Events
DROP POLICY IF EXISTS "Authenticated users can fully manage events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can view all events" ON public.events;
DROP POLICY IF EXISTS "Admins can fully manage events" ON public.events;

CREATE POLICY "Admins can fully manage events" 
ON public.events FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -------------------------------------------------------------
-- RESOURCES TABLES (Micro Videos, Toolkits)
-- -------------------------------------------------------------

-- Micro Videos
DROP POLICY IF EXISTS "auth manage videos" ON public.micro_videos;
DROP POLICY IF EXISTS "Admins can manage videos" ON public.micro_videos;
CREATE POLICY "Admins can manage videos"
ON public.micro_videos FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Toolkit Downloads
DROP POLICY IF EXISTS "auth manage toolkits" ON public.toolkit_downloads;
DROP POLICY IF EXISTS "Admins can manage toolkits" ON public.toolkit_downloads;
CREATE POLICY "Admins can manage toolkits"
ON public.toolkit_downloads FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -------------------------------------------------------------
-- PORTFOLIO TABLES
-- -------------------------------------------------------------

-- Portfolio
DROP POLICY IF EXISTS "Admins manage portfolio" ON public.portfolio;
CREATE POLICY "Admins manage portfolio" 
ON public.portfolio FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Portfolio Images
DROP POLICY IF EXISTS "Admins manage portfolio_images" ON public.portfolio_images;
CREATE POLICY "Admins manage portfolio_images" 
ON public.portfolio_images FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Portfolio Courses
DROP POLICY IF EXISTS "Admins manage portfolio_courses" ON public.portfolio_courses;
CREATE POLICY "Admins manage portfolio_courses" 
ON public.portfolio_courses FOR ALL 
TO authenticated 
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- -------------------------------------------------------------
-- PROFILES & BOOKINGS (Fixing Anon Vulnerabilities)
-- -------------------------------------------------------------

-- Profiles
-- Fix: Only allow auth users to update their own profile (and prevent anon update)
DROP POLICY IF EXISTS "Allow anon to update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Course Bookings
-- Fix: Restrict guest booking visibility to admins only
DROP POLICY IF EXISTS "Users can view own course bookings" ON public.course_bookings;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.course_bookings;
CREATE POLICY "Users can view own bookings" 
ON public.course_bookings FOR SELECT 
USING (auth.uid() = user_id OR public.is_admin());

-- -------------------------------------------------------------
-- STORAGE REFINEMENT
-- -------------------------------------------------------------

-- Payment Slips Bucket
DROP POLICY IF EXISTS "Allow public to view own slips" ON storage.objects;
DROP POLICY IF EXISTS "Only admins or owners can view slips" ON storage.objects;
CREATE POLICY "Only admins or owners can view slips" 
ON storage.objects FOR SELECT 
TO public
USING (
  bucket_id = 'payment-slips' AND 
  ( (storage.foldername(name))[1] = auth.uid()::text OR public.is_admin() )
);

-- -------------------------------------------------------------
-- INITIAL SETUP
-- -------------------------------------------------------------

-- Set an initial admin (Replace with actual admin email if known)
-- Example: UPDATE public.profiles SET is_admin = true WHERE email = 'den@capvision.com';
