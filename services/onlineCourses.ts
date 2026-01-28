import { supabase, assertSupabaseEnv } from '../lib/supabaseClient';
import type { OnlineCourse } from '../types';

const TABLE_NAME = 'online_courses';

export const fetchOnlineCourses = async (): Promise<OnlineCourse[]> => {
  assertSupabaseEnv();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(
      'id, title, category, image, progress, duration, lessons, instructor, price'
    )
    .order('title', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch online courses: ${error.message}`);
  }

  return (data ?? []) as OnlineCourse[];
};
