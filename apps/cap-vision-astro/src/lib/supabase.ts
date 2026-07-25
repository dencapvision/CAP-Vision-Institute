import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || 'https://nheppvjayzxlblkeanxs.supabase.co') as string;
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZXBwdmpheXp4bGJsa2VhbnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzYyMDcsImV4cCI6MjA4NjY1MjIwN30.gL5j6E9nlQH7JPfvzE0kqgjlgCFjL0e3p-hu039O6K0') as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const assertSupabaseEnv = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
};
