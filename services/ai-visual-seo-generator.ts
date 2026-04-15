import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SUPABASE_STORAGE_BASE =
  'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Course';

const SYSTEM_PROMPT = `You are CAP Vision Visual & SEO Generator AI.
Brand: CAP Vision Institute — Thailand's premium corporate training institute.
Style: Professional, modern corporate training. Thai-English bilingual SEO.
Output ONLY valid JSON, no explanation, no markdown fences.`;

const USER_TEMPLATE = (courseName: string) => `
Course Name: "${courseName}"

Generate this JSON:
{
  "slug": "kebab-case-english-only, max 5 words, e.g. leadership-mindset-shift",
  "file_name": "cap-vision-[slug]-course.jpg",
  "alt_text": "Thai + English combined, 100-120 chars, natural sentence. Mention CAP Vision Institute.",
  "description": "Thai. 1 benefit-focused sentence. 140-160 chars. No brand name needed.",
  "seo_title": "Thai. 50-60 chars. For og:title and course card headline.",
  "image_prompt": {
    "midjourney": "Cinematic corporate training photography. [describe the course concept visually]. Professional Thai business people in modern workspace. Shallow depth of field. Warm neutral tones, soft natural light. Shot on Sony A7IV 85mm f/1.8. --ar 16:9 --style raw --q 2",
    "dalle": "A professional corporate training photograph showing [describe the course concept visually]. Modern Thai business professionals in a contemporary office setting. Warm tones, soft lighting, bokeh background. Photorealistic, high quality, 16:9 ratio."
  }
}

Rules:
- slug: lowercase english kebab-case, no thai, no special chars
- file_name: must start with cap-vision- and end with .jpg
- image_prompt.midjourney: replace [describe...] with vivid, specific visual that represents the course theme. 50-80 words total.
- image_prompt.dalle: replace [describe...] similarly. 40-60 words total.
- All prompts must reflect the specific course topic, not generic.
`;

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
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT + '\n\n' + USER_TEMPLATE(courseName) }],
      },
    ],
    config: { temperature: 0.75 },
  });

  const text = response.text ?? '';
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned) as VisualSEOResult;
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
