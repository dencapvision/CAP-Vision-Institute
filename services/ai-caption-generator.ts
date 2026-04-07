import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface CaptionResult {
  caption: string;
  short_description: string;
  keywords: string[];
}

export async function generateCaption(
  courseName: string,
  organization: string,
  imageContext: string
): Promise<CaptionResult> {
  const prompt = `You are CAP Vision Institute content writer.
Brand: CAP Vision Institute — Thailand's premium corporate training institute.
Tone: Professional, Transformative, Sales-driven. Thai language. No emoji. No markdown bold (**).

Generate a JSON caption for a training photo with this context:
- Course: ${courseName}
- Organization: ${organization}
- Image context: ${imageContext}

Output ONLY valid JSON, no explanation:
{
  "caption": "1-2 sentence Thai description of what's happening in the image, reflect transformation and CAP Vision methodology",
  "short_description": "short Thai phrase for image subtitle",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { temperature: 0.6 },
  });

  const text = response.text ?? '';
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned) as CaptionResult;
}
