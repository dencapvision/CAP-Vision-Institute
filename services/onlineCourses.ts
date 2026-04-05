import { supabase, assertSupabaseEnv } from '../lib/supabaseClient';
import type { OnlineCourse } from '../types';

const TABLE_NAME = 'online_courses';

export const fetchOnlineCourses = async (): Promise<OnlineCourse[]> => {
  assertSupabaseEnv();

  // ดึงข้อมูลหลักพร้อม join ข้อมูลจากตาราง instructors 
  // โดยอ้างอิงผ่าน foreign key (instructor_id)
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(`
      *,
      instructor:instructors(*)
    `)
    .eq('is_published', true)
    .order('title', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch online courses: ${error.message}`);
  }

  return (data ?? []) as OnlineCourse[];
};

export const fetchOnlineCourseBySlug = async (slug: string): Promise<OnlineCourse | null> => {
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
    throw new Error(`Failed to fetch online course detail: ${error.message}`);
  }
  
  return data as OnlineCourse;
};
