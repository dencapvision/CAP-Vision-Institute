import { supabase, assertSupabaseEnv } from '../lib/supabaseClient';
import type { Instructor } from '../types';

const TABLE_NAME = 'instructors';

let _instructorsCache: Instructor[] | null = null;
let _instructorsCacheAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

export const fetchInstructors = async (): Promise<Instructor[]> => {
  assertSupabaseEnv();

  const now = Date.now();
  if (_instructorsCache && now - _instructorsCacheAt < CACHE_TTL_MS) {
    return _instructorsCache;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch instructors: ${error.message}`);
  }

  _instructorsCache = (data ?? []) as Instructor[];
  _instructorsCacheAt = now;
  return _instructorsCache;
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
