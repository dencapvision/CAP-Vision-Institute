import{c as n}from"./index-DG6gsF8a.js";import{G as s}from"./index-Cj6XxBog.js";const o=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],u=n("chevron-up",o),r=new s({apiKey:"AIzaSyDuvVV48GG5TYFspKNx1_khLsOLbjrTf10"}),l=`You are CAP Vision Institute Article Generator AI.
Brand: CAP Vision Institute — Thailand's premium corporate training institute.
Methodology: CAP Theory, Transformative Learning, Facilitation, Flow Learning.
Tone: Professional, Transformative, Actionable. Thai language. No emoji. No markdown bold (**).
Style: Answer-first (AEO) — answer the question immediately, then explain.

Generate a complete article in JSON. Output ONLY valid JSON, no explanation.`,c=e=>`
Article Title: ${e}

Generate this JSON structure:
{
  "title": "${e}",
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
- Images: suggest relevant Unsplash photo URLs for training/leadership/teamwork topics`;async function d(e,t){const i=t?.trim()?`
Editor Context / Pain Point:
${t.trim()}
Use this context to make the article more specific and relevant.
`:"",a=((await r.models.generateContent({model:"gemini-2.0-flash",contents:[{role:"user",parts:[{text:l+`

`+i+c(e)}]}],config:{temperature:.7}})).text??"").replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();return JSON.parse(a)}export{u as C,d as g};
