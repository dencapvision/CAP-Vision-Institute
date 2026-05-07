import { invokeAIGeneration } from './ai-client';

const SUPABASE_STORAGE_BASE =
  'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Course';

export interface VisualSEOResult {
  slug: string;
  file_name: string;
  alt_text: string;
  description: string;
  seo_title: string;
  image_prompt: {
    midjourney: string;
    dalle: string;
  };
}

export async function generateVisualSEO(courseName: string): Promise<VisualSEOResult> {
  return invokeAIGeneration<VisualSEOResult>('visual_seo', { courseName });
}

/** Build the full Supabase Storage public URL for a given file_name */
export function buildImageUrl(fileName: string): string {
  return `${SUPABASE_STORAGE_BASE}/${fileName}`;
}

/** Generate a ready-to-run SQL UPDATE for the courses table */
export function buildUpdateSQL(result: VisualSEOResult): string {
  const imageUrl = buildImageUrl(result.file_name);
  return `-- อัปเดต courses table หลังอัปโหลดภาพขึ้น Supabase Storage
UPDATE public.courses
SET
  image       = '${imageUrl}',
  alt_text    = '${result.alt_text.replace(/'/g, "''")}',
  description = '${result.description.replace(/'/g, "''")}',
  updated_at  = now()
WHERE slug = '${result.slug}';

-- ตรวจสอบผลลัพธ์
SELECT slug, title, image, alt_text, description
FROM public.courses
WHERE slug = '${result.slug}';`;
}
