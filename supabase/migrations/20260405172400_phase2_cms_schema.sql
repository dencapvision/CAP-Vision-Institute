-- Create instructors table
CREATE TABLE IF NOT EXISTS public.instructors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    bio TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- For an existing instructors table, ensure all properties exist:
ALTER TABLE public.instructors ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE public.instructors ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.instructors ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.instructors ADD COLUMN IF NOT EXISTS image TEXT;

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    alt_text TEXT,
    long_description TEXT,
    duration TEXT,
    audience TEXT,
    why_section JSONB DEFAULT '[]'::jsonb,
    how_section JSONB DEFAULT '[]'::jsonb,
    what_section JSONB DEFAULT '[]'::jsonb,
    objectives JSONB DEFAULT '[]'::jsonb,
    instructor_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- For an existing courses table, ensure all properties exist:
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS alt_text TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS audience TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS why_section JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS how_section JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS what_section JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS objectives JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;


-- Create online_courses table
CREATE TABLE IF NOT EXISTS public.online_courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    image TEXT,
    duration TEXT,
    lessons INTEGER DEFAULT 0,
    price NUMERIC,
    curriculum JSONB DEFAULT '[]'::jsonb,
    instructor_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- For an existing online_courses table, ensure all properties exist:
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS lessons INTEGER DEFAULT 0;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS price NUMERIC;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS curriculum JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL;
ALTER TABLE public.online_courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;


-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    event_date TEXT,
    location TEXT,
    link TEXT,
    speaker_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- For an existing events table, ensure all properties exist:
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS event_date TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS speaker_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;


-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update 'updated_at' (Using DROP IF EXISTS for idempotency)
DROP TRIGGER IF EXISTS update_instructors_updated_at ON public.instructors;
CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON public.instructors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_courses_updated_at ON public.courses;
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_online_courses_updated_at ON public.online_courses;
CREATE TRIGGER update_online_courses_updated_at BEFORE UPDATE ON public.online_courses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.online_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- RLS POLICIES
-- -------------------------------------------------------------

-- Instructors Policies
DROP POLICY IF EXISTS "Public can view instructors" ON public.instructors;
CREATE POLICY "Public can view instructors" 
ON public.instructors FOR SELECT 
TO public 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can fully manage instructors" ON public.instructors;
CREATE POLICY "Authenticated users can fully manage instructors" 
ON public.instructors FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- Courses Policies
DROP POLICY IF EXISTS "Public can view published courses" ON public.courses;
CREATE POLICY "Public can view published courses" 
ON public.courses FOR SELECT 
TO public 
USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can view all courses" ON public.courses;
CREATE POLICY "Authenticated users can view all courses" 
ON public.courses FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert courses" ON public.courses;
CREATE POLICY "Authenticated users can insert courses" 
ON public.courses FOR INSERT 
TO authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update courses" ON public.courses;
CREATE POLICY "Authenticated users can update courses" 
ON public.courses FOR UPDATE 
TO authenticated 
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete courses" ON public.courses;
CREATE POLICY "Authenticated users can delete courses" 
ON public.courses FOR DELETE 
TO authenticated 
USING (true);

-- Online Courses Policies
DROP POLICY IF EXISTS "Public can view published online_courses" ON public.online_courses;
CREATE POLICY "Public can view published online_courses" 
ON public.online_courses FOR SELECT 
TO public 
USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can view all online_courses" ON public.online_courses;
CREATE POLICY "Authenticated users can view all online_courses" 
ON public.online_courses FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can fully manage online_courses" ON public.online_courses;
CREATE POLICY "Authenticated users can fully manage online_courses" 
ON public.online_courses FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- Events Policies
DROP POLICY IF EXISTS "Public can view published events" ON public.events;
CREATE POLICY "Public can view published events" 
ON public.events FOR SELECT 
TO public 
USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can view all events" ON public.events;
CREATE POLICY "Authenticated users can view all events" 
ON public.events FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can fully manage events" ON public.events;
CREATE POLICY "Authenticated users can fully manage events" 
ON public.events FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);
