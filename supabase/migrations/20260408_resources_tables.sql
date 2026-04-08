-- ============================================================
-- Resources: Micro-learning Videos + Toolkit Downloads
-- ============================================================

-- 1. Micro-learning videos
CREATE TABLE IF NOT EXISTS micro_videos (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  category    text        NOT NULL DEFAULT 'Micro-learning',
  thumbnail_url text      NOT NULL DEFAULT '',
  duration    text        NOT NULL DEFAULT '',
  video_url   text        NOT NULL DEFAULT '',
  description text                 DEFAULT '',
  published   boolean     NOT NULL DEFAULT false,
  sort_order  integer     NOT NULL DEFAULT 0,
  created_at  timestamptz          DEFAULT now(),
  updated_at  timestamptz          DEFAULT now()
);

-- 2. Toolkit / free downloads
CREATE TABLE IF NOT EXISTS toolkit_downloads (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text        NOT NULL,
  file_type    text        NOT NULL DEFAULT 'PDF',
  category     text        NOT NULL DEFAULT 'HRD',
  thumbnail_url text       NOT NULL DEFAULT '',
  download_url  text       NOT NULL DEFAULT '',
  description   text                DEFAULT '',
  published     boolean    NOT NULL DEFAULT false,
  sort_order    integer    NOT NULL DEFAULT 0,
  created_at    timestamptz         DEFAULT now(),
  updated_at    timestamptz         DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER micro_videos_updated_at
  BEFORE UPDATE ON micro_videos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER toolkit_downloads_updated_at
  BEFORE UPDATE ON toolkit_downloads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: anyone can read published rows; only authenticated can write
ALTER TABLE micro_videos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE toolkit_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read published videos"
  ON micro_videos FOR SELECT USING (published = true);
CREATE POLICY "auth manage videos"
  ON micro_videos FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public read published toolkits"
  ON toolkit_downloads FOR SELECT USING (published = true);
CREATE POLICY "auth manage toolkits"
  ON toolkit_downloads FOR ALL USING (auth.role() = 'authenticated');
