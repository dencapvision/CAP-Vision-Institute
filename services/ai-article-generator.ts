import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  title: string;
  description: string;
}

export interface ArticleSEO {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  summary: string;
  context: string;
  insight: string;
  framework: string[];
  application: string;
  case_study: string;
  takeaways: string[];
  faq: ArticleFAQ[];
  cta: string;
  seo: ArticleSEO;
  hashtags: string[];
  images: ArticleImage[];
}

const SYSTEM_PROMPT = `You are CAP Vision Institute Article Generator AI.
Brand: CAP Vision Institute — Thailand's premium corporate training institute.
Methodology: CAP Theory, Transformative Learning, Facilitation, Flow Learning.
Tone: Professional, Transformative, Actionable. Thai language. No emoji. No markdown bold (**).
Style: Answer-first (AEO) — answer the question immediately, then explain.

Generate a complete article in JSON. Output ONLY valid JSON, no explanation.`;

const USER_TEMPLATE = (title: string) => `
Article Title: ${title}

Generate this JSON structure:
{
  "title": "${title}",
  "slug": "lowercase-english-slug-from-title",
  "summary": "2-3 sentence answer-first summary that directly answers what the reader needs to know — this is the AEO snippet",

  "context": "2-3 paragraphs explaining why this topic matters in Thai organizations today (Pain + Situation)",

  "insight": "2-3 paragraphs of CAP Vision Insight — theory + transformative learning perspective, connect to CAP methodology",

  "framework": [
    "Step 1: ...",
    "Step 2: ...",
    "Step 3: ...",
    "Step 4: ..."
  ],

  "application": "2-3 paragraphs on how to practically apply this in organizations — specific, actionable",

  "case_study": "1 paragraph case example from a real-type Thai organization — show problem → solution → result",

  "takeaways": [
    "Key insight 1",
    "Key insight 2",
    "Key insight 3",
    "Key insight 4",
    "Key insight 5"
  ],

  "faq": [
    { "question": "คำถามที่ผู้อ่านมักถามเกี่ยวกับหัวข้อนี้", "answer": "คำตอบกระชับและมีประโยชน์" },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ],

  "cta": "1-2 sentence CTA ที่เชื่อมกับการขอรับบริการ CAP Vision",

  "seo": {
    "meta_title": "SEO title under 60 chars",
    "meta_description": "SEO description 150-160 chars that includes main keyword",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
  },

  "hashtags": ["#LeadershipDevelopment", "#TransformativeLearning", "#CAPVision", "#HRDThailand"],

  "images": [
    {
      "url": "https://images.unsplash.com/photo-RELEVANT?auto=format&fit=crop&q=80&w=1200",
      "alt": "Thai alt text describing the image",
      "title": "English image title",
      "description": "Thai image description for SEO"
    }
  ]
}

Rules:
- Thai language throughout (except hashtags, framework steps may use Thai+English)
- Professional, sales-driven, transformative tone
- Answer-first: summary must directly answer the article title
- Reflect CAP Vision methodology in insight section
- FAQ must be genuinely useful questions readers ask
- Keywords must include main topic + HRD + Leadership + Thai terms
- Images: suggest relevant Unsplash photo URLs for training/leadership/teamwork topics`;

export async function generateArticle(title: string, context?: string): Promise<GeneratedArticle> {
  const contextNote = context?.trim()
    ? `\nEditor Context / Pain Point:\n${context.trim()}\nUse this context to make the article more specific and relevant.\n`
    : '';
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\n' + contextNote + USER_TEMPLATE(title) }] }
    ],
    config: { temperature: 0.7 }
  });

  const text = response.text ?? '';
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned) as GeneratedArticle;
}
