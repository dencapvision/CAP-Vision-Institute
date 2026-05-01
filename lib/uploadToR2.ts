import { supabase } from './supabaseClient';

/**
 * Upload a file to Cloudflare R2 via the upload-to-r2 Edge Function.
 * Returns the public URL at assets.capvisionpartner.com.
 *
 * @param file   - File object from <input type="file">
 * @param folder - Sub-folder path in R2 bucket, e.g. 'media/portfolio', 'media/courses'
 */
export async function uploadToR2(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const { data, error } = await supabase.functions.invoke('upload-to-r2', {
    body: formData,
  });

  if (error) throw new Error(error.message ?? 'Upload failed');
  if (!data?.url) throw new Error('No URL returned from upload');

  return data.url as string;
}
