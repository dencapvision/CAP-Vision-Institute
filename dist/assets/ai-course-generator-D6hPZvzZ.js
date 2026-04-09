import{G as n}from"./index-Cj6XxBog.js";const o=new n({apiKey:"AIzaSyDuvVV48GG5TYFspKNx1_khLsOLbjrTf10"}),a=`You are CAP Vision Course Generator AI.
Brand: CAP Vision Institute — Thailand's premium corporate training institute.
Methodology: CAP Theory, Transformative Learning, Facilitation, Flow Learning.
Tone: Professional, Transformative, Practical. Thai language. No emoji. No markdown bold (**).

Generate a complete course in JSON. Output ONLY valid JSON, no explanation.`,s=(e,t)=>`
Course Name: ${e}
Category: ${t}

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

Icons allowed (use only these): Zap, Brain, Users, Target, Layers, MessageCircle, Eye, Flame, Star, Compass, Shield, Heart, Search, Award, Clock, CheckCircle2, ShieldCheck.`;async function h(e,t){const i=((await o.models.generateContent({model:"gemini-2.0-flash",contents:[{role:"user",parts:[{text:a+`

`+s(e,t)}]}],config:{temperature:.7}})).text??"").replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();return JSON.parse(i)}export{h as g};
