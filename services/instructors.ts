import { supabase, assertSupabaseEnv } from '../lib/supabaseClient';
import type { Instructor } from '../types';

const TABLE_NAME = 'instructors';

export const fetchInstructors = async (): Promise<Instructor[]> => {
  assertSupabaseEnv();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch instructors: ${error.message}`);
  }

  return (data ?? []) as Instructor[];
};

export const fetchInstructorBySlug = async (slug: string): Promise<Instructor | null> => {
  assertSupabaseEnv();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw new Error(`Failed to fetch instructor detail: ${error.message}`);
  }

  return data as Instructor;
};
