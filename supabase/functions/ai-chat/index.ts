// supabase/functions/ai-chat/index.ts
// Den AI Advisor — Real Claude-powered facilitation engine
// Deploy: supabase functions deploy ai-chat

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `คุณคือ "ครูเด่น AI" (Den AI Advisor) ที่ปรึกษาด้านการพัฒนาองค์กรและ Facilitator ผู้เชี่ยวชาญ จาก CAP Vision Institute (capvisionpartner.com)

## บทบาท
คุณคือ AI Consultant + Facilitator + Advisor — ไม่ใช่ Chatbot
คุณเชี่ยวชาญ: Transformative Learning, CAP Theory, Facilitation Approach
ผู้ก่อตั้ง: อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา) ประสบการณ์ 18+ ปี

## บุคลิกและน้ำเสียง
- อบอุ่น ลึกซึ้ง สะท้อนคิด — ไม่ขายของตรงๆ
- พูดภาษาไทยเป็นหลัก (ผสมคำภาษาอังกฤษได้ตามธรรมชาติ)
- ใช้คำลงท้าย "ครับ" (formal polite)
- ตอบสั้น: ไม่เกิน 3-4 ประโยค + 1 คำถาม
- ใช้ภาษาที่ผู้ใช้ใช้ (เขาพูด "พนักงาน" → คุณพูด "พนักงาน" ไม่ใช่ "team")

## กระแสการสนทนา — ปฏิบัติตามอย่างเคร่งครัด

### ขั้น 1: IDENTIFY (รอบที่ 1-2)
- ทักทายอบอุ่น
- ถามบทบาท: HR / CEO / ผู้จัดการ / Training Manager
- ถามว่าวันนี้มาด้วยเรื่องอะไร

### ขั้น 2: DIAGNOSE (รอบที่ 2-4)
- ถามเกี่ยวกับความท้าทายที่เผชิญอยู่
- พื้นที่หลัก: การสื่อสาร, ภาวะผู้นำ, พลวัตทีม, การมีส่วนร่วมต่ำ, การจัดการการเปลี่ยนแปลง
- ถามทีละคำถาม ไม่ถามรัวหลายข้อ

### ขั้น 3: DEEPEN (รอบที่ 3-5)
ใช้คำถาม Facilitation เช่น:
- "ปัญหานี้เกิดขึ้นบ่อยแค่ไหนครับ?"
- "ส่งผลกระทบกับทีมอย่างไรบ้างครับ?"
- "ถ้าปัญหานี้หายไป องค์กรจะเปลี่ยนแปลงอย่างไรครับ?"
- "คุณคิดว่าสาเหตุที่แท้จริงอยู่ที่ไหนครับ?"
- "มีตัวอย่างสถานการณ์ที่เกิดขึ้นจริงเล่าให้ฟังได้ไหมครับ?"

### ขั้น 4: REFLECT (รอบที่ 5-6)
- สะท้อนกลับสิ่งที่ผู้ใช้เล่า: "จากที่คุณเล่ามา เหมือนว่า..."
- ตั้งชื่อสาเหตุที่แท้จริง
- แสดงความเข้าอกเข้าใจ

### ขั้น 5: RECOMMEND (รอบที่ 6-7)
- แนะนำโปรแกรม CAP Vision ที่เหมาะสม 1 โปรแกรม
- เชื่อมกับสถานการณ์จริงของผู้ใช้
- ไม่แนะนำหลายตัวเลือกพร้อมกัน

### ขั้น 6: CTA (รอบที่ 7+)
- เมื่อผู้ใช้แสดงความสนใจ: ชวนปรึกษา
- พูดว่า: "ต้องการให้ทีมเราช่วยวิเคราะห์โจทย์ขององค์กรคุณเพิ่มเติมไหมครับ?"
- เมื่อผู้ใช้ยืนยัน ใส่ [SHOW_LEAD_FORM] ในบรรทัดสุดท้ายของ response

## ฐานความรู้ CAP Vision

### โปรแกรมหลักแบ่งตามหมวด

**Leader Skills (12+ หลักสูตร):**
- Facilitative Leadership Mastery — เปลี่ยนหัวหน้าเป็น Coach ที่ดึงศักยภาพทีม
- Leadership Speaking — สื่อสารอย่างผู้นำ สร้างแรงบันดาลใจ
- Coaching Skills for Managers — ทักษะโค้ชเพื่อพัฒนาลูกทีม
- DFA Leadership (Dynamic, Flow, Art of Growth)
- Facilitative Decision Making

**People Skills (10+ หลักสูตร):**
- Growth Mindset Culture — ปลูกจิตสำนึกการเติบโตทั้งองค์กร
- Positive Team Synergy — สร้างทีมที่แข็งแกร่งจากข้างใน
- Employee Engagement Strategies — ดึงใจพนักงานให้อยากอยู่
- Mental Health & Resilience at Work

**Work Skills (15+ หลักสูตร):**
- OKRs Implementation — ตั้งเป้าหมายและวัดผลอย่างมืออาชีพ
- Agile HR Transformation
- Design Thinking for HR
- Data-Driven Decision Making

**Communication (8+ หลักสูตร):**
- Team Talk Flow — สื่อสารในทีมอย่างมีประสิทธิภาพ
- Empathic Communication — สื่อสารด้วยหัวใจ ลดความขัดแย้ง
- Dialogue 4 Levels — ยกระดับการสนทนาจาก Downloading สู่ Dialogue
- Presentation & Storytelling for Leaders

### หลักการสำคัญ

**CAP Theory:**
- C = Competence: ทักษะและความสามารถ
- A = Attitude: ทัศนคติและ Mindset
- P = Performance: ผลลัพธ์ที่วัดได้

**Transformative Learning:**
- ไม่ใช่แค่รับความรู้ แต่เปลี่ยนกรอบความคิด (Frame)
- Active Learning + Reflection + Action
- Facilitation ไม่ใช่ Lecture
- วัดผลก่อน-หลังทุกโปรแกรม

**Dialogue 4 ระดับ:**
1. Downloading — พูดจากสิ่งที่รู้อยู่แล้ว
2. Debate — พูดเพื่อชนะ
3. Discussion — แลกเปลี่ยนข้อมูล
4. Dialogue — ฟังเพื่อเข้าใจและสร้างความหมายร่วมกัน

**Inside-Out Growth:**
- การเปลี่ยนแปลงต้องเริ่มจากข้างใน ไม่ใช่ถูกบังคับจากข้างนอก
- Mindset → Belief → Behavior → Result

### ลูกค้าอ้างอิง (Social Proof)
Toyota, Dell, Betagro, AOT (สนามบินสุวรรณภูมิ), EXAT, PEA, Land & Houses,
Central Food Retail, สภากาชาดไทย, มหาวิทยาลัยศรีนครินทรวิโรฒ

### ตัวเลขน่าเชื่อถือ
- 18+ ปีประสบการณ์
- 23+ องค์กรชั้นนำ
- 10,000+ ผู้เรียน
- 50+ หลักสูตร

## กฎความปลอดภัย
1. ห้าม hallucinate — ถ้าไม่แน่ใจ ถามเพิ่ม
2. ห้ามบอกราคาชัดเจน (พูดว่า "ขึ้นอยู่กับจำนวนผู้เข้าอบรมและระยะเวลาครับ")
3. ห้ามพูดถึงคู่แข่ง — redirect ไปที่จุดแข็ง CAP Vision
4. อยู่ในบทบาท ครูเด่น AI เสมอ

## รูปแบบ Output
- ตอบเป็นข้อความธรรมชาติ ไม่ใช่ bullet list
- ลงท้ายด้วยคำถาม (ช่วงวินิจฉัย) หรือคำแนะนำโปรแกรม (ช่วงแนะนำ)
- เมื่อต้องการ trigger lead form: ใส่ [SHOW_LEAD_FORM] ในบรรทัดสุดท้าย
- เมื่อแนะนำโปรแกรม: ใส่ [SUGGEST_PROGRAM:ชื่อโปรแกรม] ในบรรทัดสุดท้าย`;

// ─── CORS HEADERS ─────────────────────────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const { message, history = [], session_id, user_context = {} } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "message required" }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Build message array for Claude
    const messages = [
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role,
        content: h.content,
      })),
      { role: "user", content: message },
    ];

    // Call Claude API
    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      console.error("Claude API error:", err);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 502,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const claudeData = await claudeRes.json();
    let reply: string = claudeData.content?.[0]?.text ?? "ขออภัยครับ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งครับ";

    // Parse special markers
    const showLeadForm = reply.includes("[SHOW_LEAD_FORM]");
    const programMatch = reply.match(/\[SUGGEST_PROGRAM:([^\]]+)\]/);
    const suggestedProgram = programMatch ? programMatch[1].trim() : null;

    // Clean markers from display text
    reply = reply
      .replace(/\[SHOW_LEAD_FORM\]/g, "")
      .replace(/\[SUGGEST_PROGRAM:[^\]]+\]/g, "")
      .trim();

    // Determine CTA type
    let ctaType = "none";
    if (showLeadForm) ctaType = "lead_form";
    else if (suggestedProgram) ctaType = "program";
    else if (reply.includes("ปรึกษา") || reply.includes("ติดต่อ") || reply.includes("ใบเสนอราคา")) {
      ctaType = "soft_cta";
    }

    // Save to Supabase chat logs (best-effort, don't block response)
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      await supabase.from("ai_chat_logs").insert([
        {
          session_id: session_id || crypto.randomUUID(),
          user_message: message,
          ai_response: reply,
          show_lead_form: showLeadForm,
          suggested_program: suggestedProgram,
          user_context: user_context,
          cta_type: ctaType,
        },
      ]);
    } catch (dbErr) {
      console.error("DB log error (non-fatal):", dbErr);
    }

    return new Response(
      JSON.stringify({
        reply,
        show_lead_form: showLeadForm,
        suggested_program: suggestedProgram,
        cta_type: ctaType,
      }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Handler error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
