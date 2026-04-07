-- Blog Articles Table for AI-generated AEO content
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS blog_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text DEFAULT 'Insight',
  thumbnail text DEFAULT '',
  author text DEFAULT 'ครูเด่น มาสเตอร์ฟา',
  date_label text DEFAULT '',
  read_time text DEFAULT '5 นาที',
  content jsonb NOT NULL DEFAULT '{}',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Public: read published articles only
CREATE POLICY "Public read published"
  ON blog_articles FOR SELECT
  USING (published = true);

-- Authenticated: full access
CREATE POLICY "Auth full access"
  ON blog_articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index for fast slug lookup
CREATE INDEX IF NOT EXISTS blog_articles_slug_idx ON blog_articles (slug);
CREATE INDEX IF NOT EXISTS blog_articles_published_idx ON blog_articles (published, created_at DESC);
