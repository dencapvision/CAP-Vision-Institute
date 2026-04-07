import { supabase } from '../lib/supabaseClient';

export interface PortfolioImage {
  id: string;
  portfolio_id: string;
  image_url: string;
  caption: string;
  sort_order: number;
}

export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  organization: string;
  course_name: string;
  category: string;
  description_short: string;
  description_full: string;
  result: string;
  keywords: string[];
  cover_image: string;
  created_at: string;
  images?: PortfolioImage[];
  related_courses?: any[];
}

export async function fetchPortfolios(): Promise<Portfolio[]> {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function fetchPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  const { data: port, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !port) return null;

  // Fetch images
  const { data: images } = await supabase
    .from('portfolio_images')
    .select('*')
    .eq('portfolio_id', port.id)
    .order('sort_order');

  // Fetch related courses via join table, fallback to keyword match
  let relatedCourses: any[] = [];
  const { data: joinRows } = await supabase
    .from('portfolio_courses')
    .select('course_id')
    .eq('portfolio_id', port.id);

  if (joinRows && joinRows.length > 0) {
    const ids = joinRows.map(r => r.course_id);
    const { data: courses } = await supabase
      .from('courses')
      .select('id, title, slug, description, image, category')
      .in('id', ids)
      .limit(3);
    relatedCourses = courses ?? [];
  } else if (port.keywords?.length) {
    // keyword-based fallback — match by category or course_name similarity
    const { data: courses } = await supabase
      .from('courses')
      .select('id, title, slug, description, image, category')
      .or(`title.ilike.%${port.course_name ?? ''}%,category.ilike.%${port.category ?? ''}%`)
      .limit(3);
    relatedCourses = courses ?? [];
  }

  return { ...port, images: images ?? [], related_courses: relatedCourses };
}
