import { supabase } from '../lib/supabaseClient';
import { supabaseAdmin } from '../lib/supabaseAdmin';
import { uploadToR2 } from '../lib/uploadToR2';
import type { Portfolio, PortfolioImage } from './portfolio';

export interface PortfolioFormData {
  title: string;
  slug: string;
  organization: string;
  course_name: string;
  category: string;
  description_short: string;
  description_full: string;
  result: string;
  keywords: string[];
  cover_image: string;
}

export interface PortfolioImageInput {
  image_url: string;
  caption: string;
  sort_order: number;
}

export async function createPortfolioAdmin(
  data: PortfolioFormData,
  images: PortfolioImageInput[],
  courseIds: string[]
): Promise<Portfolio> {
  const { data: row, error } = await supabaseAdmin
    .from('portfolio')
    .insert(data)
    .select()
    .single();
  if (error) throw error;

  if (images.length > 0) {
    const { error: imgError } = await supabaseAdmin.from('portfolio_images').insert(
      images.map(img => ({ ...img, portfolio_id: row.id }))
    );
    if (imgError) throw new Error(`บันทึกรูปภาพไม่สำเร็จ: ${imgError.message}`);
  }
  if (courseIds.length > 0) {
    await supabaseAdmin.from('portfolio_courses').insert(
      courseIds.map(course_id => ({ portfolio_id: row.id, course_id }))
    );
  }
  return row as Portfolio;
}

export async function updatePortfolioAdmin(
  id: string,
  data: PortfolioFormData,
  images: PortfolioImageInput[],
  courseIds: string[]
): Promise<void> {
  const { error } = await supabaseAdmin.from('portfolio').update(data).eq('id', id);
  if (error) throw error;

  // Replace images
  await supabaseAdmin.from('portfolio_images').delete().eq('portfolio_id', id);
  if (images.length > 0) {
    const { error: imgError } = await supabaseAdmin.from('portfolio_images').insert(
      images.map(img => ({ ...img, portfolio_id: id }))
    );
    if (imgError) throw new Error(`บันทึกรูปภาพไม่สำเร็จ: ${imgError.message}`);
  }

  // Replace course links
  await supabaseAdmin.from('portfolio_courses').delete().eq('portfolio_id', id);
  if (courseIds.length > 0) {
    await supabaseAdmin.from('portfolio_courses').insert(
      courseIds.map(course_id => ({ portfolio_id: id, course_id }))
    );
  }
}

export async function deletePortfolioAdmin(id: string): Promise<void> {
  await supabaseAdmin.from('portfolio_images').delete().eq('portfolio_id', id);
  await supabaseAdmin.from('portfolio_courses').delete().eq('portfolio_id', id);
  const { error } = await supabaseAdmin.from('portfolio').delete().eq('id', id);
  if (error) throw error;
}

export async function fetchPortfolioForEdit(id: string): Promise<{
  portfolio: Portfolio;
  images: PortfolioImage[];
  courseIds: string[];
} | null> {
  const { data: port } = await supabaseAdmin.from('portfolio').select('*').eq('id', id).single();
  if (!port) return null;
  const { data: images } = await supabaseAdmin.from('portfolio_images').select('*').eq('portfolio_id', id).order('sort_order');
  const { data: links } = await supabaseAdmin.from('portfolio_courses').select('course_id').eq('portfolio_id', id);
  return {
    portfolio: port as Portfolio,
    images: (images ?? []) as PortfolioImage[],
    courseIds: (links ?? []).map((l: any) => l.course_id),
  };
}

export async function fetchCoursesForSelect(): Promise<{ id: string; title: string; category: string }[]> {
  const { data } = await supabaseAdmin.from('courses').select('id, title, category').order('title');
  return (data ?? []) as { id: string; title: string; category: string }[];
}

export async function uploadPortfolioImage(file: File): Promise<string> {
  return uploadToR2(file, 'media/portfolio');
}

export function slugify(text: string): string {
  const base = text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  // Fallback for Thai-only titles where Latin chars are stripped
  if (base.length > 0) return base;
  return `case-study-${Date.now()}`;
}
