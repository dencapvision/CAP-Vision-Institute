import { supabase } from '../supabase';

export interface PostContentSection {
  type: 'text' | 'heading' | 'subheading' | 'quote' | 'image' | 'list' | 'box' | 'highlight';
  content?: string;
  title?: string;
  items?: string[];
  level?: number;
  author?: string;
  imageUrl?: string;
  variant?: 'info' | 'warning' | 'success' | 'danger';
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  summary: string;
  context: string;
  insight: string;
  framework: any;
  application: string;
  case_study: any;
  takeaways: string[];
  faq: Array<{ question: string; answer: string }>;
  cta?: any;
  seo?: { meta_title?: string; metaTitle?: string; meta_description?: string; metaDescription?: string; keywords?: string[] };
  hashtags?: string[];
  images?: Array<{ url: string; alt: string; title?: string; description?: string; caption?: string }>;
}

export interface BlogArticleRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  author: string;
  date_label: string;
  read_time: string;
  content: GeneratedArticle;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// List view: exclude heavy `content` JSON — fetch it only in detail/edit views
export async function fetchPublishedArticles(): Promise<BlogArticleRow[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('id, slug, title, category, thumbnail, author, date_label, read_time, published, created_at, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogArticleRow[];
}

export async function fetchAllArticles(): Promise<BlogArticleRow[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogArticleRow[];
}

export async function fetchArticleBySlug(slug: string): Promise<BlogArticleRow | null> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  if (error) return null;
  return data as BlogArticleRow;
}

export async function fetchArticleById(id: string): Promise<BlogArticleRow | null> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as BlogArticleRow;
}

export async function fetchRelatedArticles(slug: string, keywords: string[], limit = 3): Promise<BlogArticleRow[]> {
  const { data } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('published', true)
    .neq('slug', slug)
    .order('created_at', { ascending: false })
    .limit(20);
  if (!data) return [];
  // Score by keyword overlap client-side
  const scored = (data as BlogArticleRow[]).map(row => {
    const rowKeywords: string[] = row.content?.seo?.keywords ?? [];
    const overlap = keywords.filter(k => rowKeywords.some(rk => rk.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(rk.toLowerCase()))).length;
    return { row, overlap };
  });
  return scored
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(s => s.row);
}
