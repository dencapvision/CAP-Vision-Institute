import { supabase, assertSupabaseEnv } from '../lib/supabaseClient';
import type { Course } from '../types';

const TABLE_NAME = 'courses';

export const fetchCourses = async (): Promise<Course[]> => {
  assertSupabaseEnv();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(`
      *,
      instructor:instructors(*)
    `)
    .eq('is_published', true)
    .order('title', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return (data ?? []) as Course[];
};

export const fetchCourseBySlug = async (slug: string): Promise<Course | null> => {
   assertSupabaseEnv();

   const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(`
      *,
      instructor:instructors(*)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

   if (error) {
     if (error.code === 'PGRST116') return null; // Not found
     throw new Error(`Failed to fetch course detail: ${error.message}`);
   }
   
   return data as Course;
}
