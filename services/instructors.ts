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

export const fetchInstructorBySlug = async (slugOrId: string): Promise<Instructor | null> => {
  assertSupabaseEnv();

  // Try by slug first
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('slug', slugOrId)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch instructor detail: ${error.message}`);
  if (data) return data as Instructor;

  // Fallback: try by UUID id (handles legacy links from CourseDetail)
  const { data: byId, error: idError } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', slugOrId)
    .maybeSingle();

  if (idError) throw new Error(`Failed to fetch instructor by id: ${idError.message}`);
  return byId as Instructor | null;
};
