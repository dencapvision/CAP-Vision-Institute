import { supabase } from '../lib/supabaseClient';
import type { GeneratedArticle } from './ai-article-generator';

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

export async function fetchPublishedArticles(): Promise<BlogArticleRow[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as BlogArticleRow[];
}

export async function fetchAllArticles(): Promise<BlogArticleRow[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as BlogArticleRow[];
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

export async function saveArticle(article: GeneratedArticle): Promise<BlogArticleRow> {
  const row = {
    slug: article.slug,
    title: article.title,
    category: article.seo?.keywords?.[0] ? 'Insight' : 'Insight',
    thumbnail: article.images?.[0]?.url ?? '',
    author: 'ครูเด่น มาสเตอร์ฟา',
    date_label: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
    read_time: '7 นาที',
    content: article,
    published: false,
  };
  const { data, error } = await supabase
    .from('blog_articles')
    .upsert(row, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data as BlogArticleRow;
}

export async function togglePublished(id: string, published: boolean): Promise<void> {
  const { error } = await supabase
    .from('blog_articles')
    .update({ published, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from('blog_articles').delete().eq('id', id);
  if (error) throw error;
}
