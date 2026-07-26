import { supabase, assertSupabaseEnv } from '../supabase';
import type { Course } from '../types';

const TABLE_NAME = 'courses';

// In-memory cache — courses rarely change; avoids repeated API+egress costs
let _coursesCache: Course[] | null = null;
let _coursesCacheAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all published courses with instructor details
 */
export const fetchCourses = async (bust = false): Promise<Course[]> => {
  assertSupabaseEnv();

  const now = Date.now();
  if (!bust && _coursesCache && now - _coursesCacheAt < CACHE_TTL_MS) {
    return _coursesCache;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*, instructor:instructor_id(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  _coursesCache = (data ?? []) as Course[];
  _coursesCacheAt = now;
  return _coursesCache;
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
