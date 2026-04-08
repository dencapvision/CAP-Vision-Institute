import { supabase } from '../lib/supabaseClient';

// ─── Types ────────────────────────────────────────────────────

export interface MicroVideo {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  duration: string;
  video_url: string;
  description: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ToolkitDownload {
  id: string;
  title: string;
  file_type: string;
  category: string;
  thumbnail_url: string;
  download_url: string;
  description: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type MicroVideoInput = Omit<MicroVideo, 'id' | 'created_at' | 'updated_at'>;
export type ToolkitInput = Omit<ToolkitDownload, 'id' | 'created_at' | 'updated_at'>;

// ─── Micro Videos ─────────────────────────────────────────────

export async function fetchAllVideos(): Promise<MicroVideo[]> {
  const { data, error } = await supabase
    .from('micro_videos')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as MicroVideo[];
}

export async function fetchPublishedVideos(): Promise<MicroVideo[]> {
  const { data, error } = await supabase
    .from('micro_videos')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as MicroVideo[];
}

export async function createVideo(input: MicroVideoInput): Promise<MicroVideo> {
  const { data, error } = await supabase
    .from('micro_videos')
    .insert([input])
    .select()
    .single();
  if (error) throw error;
  return data as MicroVideo;
}

export async function updateVideo(id: string, input: Partial<MicroVideoInput>): Promise<MicroVideo> {
  const { data, error } = await supabase
    .from('micro_videos')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as MicroVideo;
}

export async function deleteVideo(id: string): Promise<void> {
  const { error } = await supabase.from('micro_videos').delete().eq('id', id);
  if (error) throw error;
}

// ─── Toolkit Downloads ────────────────────────────────────────

export async function fetchAllToolkits(): Promise<ToolkitDownload[]> {
  const { data, error } = await supabase
    .from('toolkit_downloads')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ToolkitDownload[];
}

export async function fetchPublishedToolkits(): Promise<ToolkitDownload[]> {
  const { data, error } = await supabase
    .from('toolkit_downloads')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as ToolkitDownload[];
}

export async function createToolkit(input: ToolkitInput): Promise<ToolkitDownload> {
  const { data, error } = await supabase
    .from('toolkit_downloads')
    .insert([input])
    .select()
    .single();
  if (error) throw error;
  return data as ToolkitDownload;
}

export async function updateToolkit(id: string, input: Partial<ToolkitInput>): Promise<ToolkitDownload> {
  const { data, error } = await supabase
    .from('toolkit_downloads')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as ToolkitDownload;
}

export async function deleteToolkit(id: string): Promise<void> {
  const { error } = await supabase.from('toolkit_downloads').delete().eq('id', id);
  if (error) throw error;
}
