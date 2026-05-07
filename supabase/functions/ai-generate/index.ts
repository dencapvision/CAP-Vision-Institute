// supabase/functions/ai-generate/index.ts
// Server-side AI generation gateway. Keep provider keys out of browser bundles.

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type AIGenerationKind = "course" | "article" | "caption" | "visual_seo";

const stripJsonFences = (text: string) =>
  text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

async function callGemini(prompt: string, temperature = 0.7) {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error:", errorText);
    throw new Error("AI provider unavailable");
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return JSON.parse(stripJsonFences(text));
}

function buildPrompt(kind: AIGenerationKind, input: Record<string, unknown>) {
  const brand = [
    "You are CAP Vision Institute AI.",
    "Brand: Thailand premium corporate training institute.",
    "Methodology: CAP Theory, Transformative Learning, Facilitation, Flow Learning.",
    "Tone: Professional, practical, transformative. Thai language. No emoji. Output only valid JSON.",
  ].join("\n");

  if (kind === "course") {
    return `${brand}

Generate a complete course in JSON.
Course Name: ${input.courseName}
Category: ${input.category}

Return this shape:
{
  "title": "short English title",
  "description": "1 sentence Thai benefit-focused description",
  "why_section": [{ "icon": "Zap", "stat": "2-3 chars", "label": "short label", "desc": "Thai description" }],
  "how_section": [{ "icon": "Layers", "title": "method name", "desc": "Thai description" }],
  "what_section": [{ "icon": "Target", "title": "Thai outcome sentence" }],
  "objectives": [{ "icon": "Eye", "title": "Module title", "desc": "Thai module description" }],
  "long_description": "3-4 Thai paragraphs",
  "audience": "Thai comma-separated target roles",
  "duration": "In-house Training 1-2 วัน | 20-50 คน"
}`;
  }

  if (kind === "article") {
    return `${brand}

Generate a complete answer-first SEO article in JSON.
Article Title: ${input.title}
Editor Context: ${input.context ?? ""}

Return this shape:
{
  "title": "${input.title}",
  "slug": "lowercase-english-slug",
  "summary": "2-3 sentence answer-first summary",
  "context": "Thai context section",
  "insight": "Thai CAP Vision insight",
  "framework": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "application": "Thai practical application",
  "case_study": "Thai case example",
  "takeaways": ["insight 1", "insight 2", "insight 3", "insight 4", "insight 5"],
  "faq": [{ "question": "Thai question", "answer": "Thai answer" }],
  "cta": "Thai CTA",
  "seo": { "meta_title": "SEO title", "meta_description": "SEO description", "keywords": ["keyword"] },
  "hashtags": ["#CAPVision"],
  "images": [{ "url": "https://images.unsplash.com/photo-relevant?auto=format&fit=crop&q=80&w=1200", "alt": "Thai alt", "title": "English title", "description": "Thai description" }]
}`;
  }

  if (kind === "caption") {
    return `${brand}

Generate a JSON caption for a training photo.
Course: ${input.courseName}
Organization: ${input.organization}
Image context: ${input.imageContext}

Return this shape:
{
  "caption": "1-2 sentence Thai caption",
  "short_description": "short Thai subtitle",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`;
  }

  return `${brand}

Generate visual SEO metadata and image prompts in JSON.
Course Name: ${input.courseName}

Return this shape:
{
  "slug": "lowercase-kebab-case-from-English-course-name",
  "file_name": "cap-vision-[slug]-course.png",
  "alt_text": "Thai + English natural alt text",
  "description": "Thai benefit-focused image description",
  "seo_title": "Thai SEO title",
  "image_prompt": {
    "midjourney": "specific premium corporate photography prompt",
    "dalle": "specific premium corporate photography prompt"
  }
}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const { kind, input = {} } = (await req.json()) as {
      kind?: AIGenerationKind;
      input?: Record<string, unknown>;
    };

    if (!kind || !["course", "article", "caption", "visual_seo"].includes(kind)) {
      return new Response(JSON.stringify({ error: "invalid generation kind" }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const result = await callGemini(buildPrompt(kind, input), kind === "visual_seo" ? 0.75 : 0.7);
    return new Response(JSON.stringify({ result }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("ai-generate error:", error);
    return new Response(JSON.stringify({ error: "AI generation failed" }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
