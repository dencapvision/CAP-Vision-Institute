import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `You are CAP Vision Course Generator AI.
Brand: CAP Vision Institute — Thailand's premium corporate training institute.
Methodology: CAP Theory, Transformative Learning, Facilitation, Flow Learning.
Tone: Professional, Transformative, Practical. Thai language. No emoji. No markdown bold (**).

Generate a complete course in JSON. Output ONLY valid JSON, no explanation.`;

const USER_TEMPLATE = (courseName: string, category: string) => `
Course Name: ${courseName}
Category: ${category}

Generate this JSON structure:
{
  "title": "short english title",
  "description": "1 sentence Thai description, benefit-focused",
  "why_section": [
    { "icon": "Zap", "stat": "short 2-3 char", "label": "short label", "desc": "1-2 sentence Thai" },
    { "icon": "Brain", "stat": "short 2-3 char", "label": "short label", "desc": "1-2 sentence Thai" },
    { "icon": "Users", "stat": "short 2-3 char", "label": "short label", "desc": "1-2 sentence Thai" }
  ],
  "how_section": [
    { "icon": "Layers", "title": "method name", "desc": "1 sentence Thai" },
    { "icon": "Target", "title": "method name", "desc": "1 sentence Thai" },
    { "icon": "MessageCircle", "title": "method name", "desc": "1 sentence Thai" }
  ],
  "what_section": [
    { "icon": "Zap", "title": "outcome Thai sentence" },
    { "icon": "Brain", "title": "outcome Thai sentence" },
    { "icon": "Target", "title": "outcome Thai sentence" },
    { "icon": "Users", "title": "outcome Thai sentence" },
    { "icon": "Compass", "title": "outcome Thai sentence" },
    { "icon": "Star", "title": "outcome Thai sentence" }
  ],
  "objectives": [
    { "icon": "Eye", "title": "Module 1 — title", "desc": "2-3 sentence Thai + bullet list with - prefix" },
    { "icon": "Brain", "title": "Module 2 — title", "desc": "2-3 sentence Thai + bullet list with - prefix" },
    { "icon": "Layers", "title": "Module 3 — title", "desc": "2-3 sentence Thai + bullet list with - prefix" },
    { "icon": "Target", "title": "Module 4 — title", "desc": "2-3 sentence Thai + bullet list with - prefix" },
    { "icon": "Compass", "title": "Module 5 — title", "desc": "2-3 sentence Thai + bullet list with - prefix" }
  ],
  "long_description": "3-4 paragraph Thai. Use --- to separate sections. Use #### for section headers. No ** bold.",
  "audience": "Thai comma-separated target roles",
  "duration": "In-house Training 1-2 วัน | 20-50 คน"
}

Icons allowed (use only these): Zap, Brain, Users, Target, Layers, MessageCircle, Eye, Flame, Star, Compass, Shield, Heart, Search, Award, Clock, CheckCircle2, ShieldCheck.`;

export interface GeneratedCourse {
  title: string;
  description: string;
  why_section: any[];
  how_section: any[];
  what_section: any[];
  objectives: any[];
  long_description: string;
  audience: string;
  duration: string;
}

export async function generateCourseContent(
  courseName: string,
  category: string
): Promise<GeneratedCourse> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\n' + USER_TEMPLATE(courseName, category) }] }
    ],
    config: { temperature: 0.7 }
  });

  const text = response.text ?? '';
  // Strip markdown code fences if present
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned) as GeneratedCourse;
}
