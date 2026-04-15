import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SUPABASE_STORAGE_BASE =
  'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Course';

const SYSTEM_PROMPT = `You are CAP Vision Visual & SEO Generator AI.
Brand: CAP Vision Institute — Thailand's premium corporate training institute.
Style: Hyper-realistic production photography. Thai-English bilingual SEO.
Output ONLY valid JSON, no explanation, no markdown fences.`;

const USER_TEMPLATE = (courseName: string) => `
Course Name: "${courseName}"

Generate this JSON:
{
  "slug": "derive DIRECTLY from the English words in the course name. lowercase kebab-case. replace & with 'and'. no extra words. e.g. 'Resilient Leadership' → 'resilient-leadership', 'Strategy & Execution' → 'strategy-and-execution'",
  "file_name": "cap-vision-[slug]-course.png",
  "alt_text": "Thai + English combined, 100-120 chars, natural sentence. Mention CAP Vision Institute.",
  "description": "Thai. 1 benefit-focused sentence. 140-160 chars. No brand name needed.",
  "seo_title": "Thai. 50-60 chars. For og:title and course card headline.",
  "image_prompt": {
    "midjourney": "A [medium-wide / close-medium] shot of [exact number] Asian business professionals in tailored, smart [specific clothing: navy blue suits / white silk blouse / beige blazer — vary per course]. [Describe each person's exact position, action, and expression — e.g. 'seated in deep blue velvet armchairs around a round dark wood coffee table', 'standing at the head of the table pointing to a whiteboard diagram', 'leaning forward with clasped hands attentively']. [Describe a specific course-relevant prop or visual detail on the table or wall — e.g. leather padfolio and pen, clear water glasses, whiteboard with labeled diagram boxes connected by gold light-lines]. The setting is a [specific premium Thai corporate environment: luxurious high-rise executive lounge / modern boardroom / premium training room] with full floor-to-ceiling glass walls revealing a [dusky / golden hour / softly blurred] panoramic cityscape skyline. Soft, warm golden contemplative lighting from recessed ceiling fixtures, creating deep rich navy blue and radiant gold tones. Selectively focused on [the key person and the key prop/action], surrounding faces softly present. No text, watermark, or graphic overlays. Photorealistic, ultra-high quality, fine film grain. --ar 16:9",
    "dalle": "A [medium-wide / close-medium], eye-level photograph of [exact number] Asian business professionals in tailored high-end [specific clothing] seated/standing in a [specific premium Thai corporate setting] with floor-to-ceiling glass walls and a softly blurred [dusky/golden] cityscape beyond. [Describe the specific course-relevant scene in one vivid sentence: what each person is doing, what props are on the table, what the key human moment is.] Soft contemplative warm golden lighting from recessed ceiling fixtures. Deep rich navy blue and radiant gold color tones. Selectively focused on [key subject]. No text, watermark, or graphic overlays. Photorealistic, ultra-high quality, fine film grain. 16:9 ratio."
  }
}

Rules:
- slug: derived DIRECTLY from the English part of the course name only. lowercase kebab-case. replace & with 'and'. no added words beyond the course name itself.
- file_name: must start with cap-vision- and end with .png
- image_prompt.midjourney: fill ALL placeholders with hyper-specific details — exact clothing, furniture, props, number of people, positions, expressions, and a course-relevant prop or diagram. Never generic. Vary the setting and number of people per course.
- image_prompt.dalle: same hyper-specific approach in one dense paragraph, ~100-120 words.
- Clothing must vary: mix navy suits, white blouses, gold accessories, beige blazers — always tailored and premium.
- Setting must vary per course: executive lounge / boardroom / training room / quiet meeting corner — pick the one that best fits the course theme.
- Props must reflect the course topic: whiteboard with logic diagram (Decision Making), leather notebook open (Coaching), performance dashboard on screen (High Performance), etc.
- All prompts must feel like a real luxury corporate photography brief — not AI-generated descriptions.
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
