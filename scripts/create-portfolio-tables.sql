-- ═══════════════════════════════════════════════
-- CAP Vision Institute — Portfolio Schema
-- ═══════════════════════════════════════════════

-- 1. portfolio (main case studies)
create table if not exists portfolio (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  organization text not null,
  course_name  text,
  category     text,                        -- Leadership / Team / Communication / Mindset / Work Skills
  description_short text,
  description_full  text,
  result       text,
  keywords     text[],
  cover_image  text,
  created_at   timestamptz default now()
);

-- 2. portfolio_images (3–12 images per portfolio)
create table if not exists portfolio_images (
  id           uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references portfolio(id) on delete cascade,
  image_url    text not null,
  caption      text,
  sort_order   int default 0,
  created_at   timestamptz default now()
);

-- 3. portfolio_courses (many-to-many with courses table)
create table if not exists portfolio_courses (
  portfolio_id uuid references portfolio(id) on delete cascade,
  course_id    uuid references courses(id)   on delete cascade,
  primary key (portfolio_id, course_id)
);

-- Indexes
create index if not exists idx_portfolio_slug     on portfolio(slug);
create index if not exists idx_portfolio_category on portfolio(category);
create index if not exists idx_portfolio_images_portfolio_id on portfolio_images(portfolio_id);

-- RLS
alter table portfolio         enable row level security;
alter table portfolio_images  enable row level security;
alter table portfolio_courses enable row level security;

-- Public read policies
create policy "public read portfolio"
  on portfolio for select using (true);

create policy "public read portfolio_images"
  on portfolio_images for select using (true);

create policy "public read portfolio_courses"
  on portfolio_courses for select using (true);
