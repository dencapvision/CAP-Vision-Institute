import { supabase, assertSupabaseEnv } from '../lib/supabaseClient';
import type { Course } from '../types';

const TABLE_NAME = 'courses';

/**
 * Fetch all published courses with instructor details
 */
export const fetchCourses = async (): Promise<Course[]> => {
  assertSupabaseEnv();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*, instructor:instructor_id(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return (data ?? []) as Course[];
};

/**
 * Fetch a single course by its slug with instructor details
 */
export const fetchCourseBySlug = async (slug: string): Promise<Course | null> => {
   assertSupabaseEnv();

   const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*, instructor:instructor_id(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

   if (error) {
     if (error.code === 'PGRST116') return null; // Not found
     throw new Error(`Failed to fetch course detail: ${error.message}`);
   }
   
   return data as Course;
};
