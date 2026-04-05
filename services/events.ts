import { supabase, assertSupabaseEnv } from '../lib/supabaseClient';
import type { Event } from '../types';

const TABLE_NAME = 'events';

export const fetchEvents = async (): Promise<Event[]> => {
  assertSupabaseEnv();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(`
      *,
      speaker:instructors(*)
    `)
    .eq('is_published', true)
    .order('event_date', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return (data ?? []) as Event[];
};
