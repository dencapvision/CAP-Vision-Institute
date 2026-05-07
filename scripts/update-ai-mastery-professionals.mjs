import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const COURSE_SLUG = 'ai-mastery-professionals';

// ─── Why Section (ต้องใช้ label ไม่ใช่ title — CourseDetail render item.label) ──
const why_section = [
  {
    icon: 'Zap',
    stat: 'ช้า',
    label: 'ทำงานช้ากว่าคนที่ใช้ AI',
    desc: 'คนที่ใช้ AI เก่งทำงานได้เร็วกว่า 3–5 เท่าในงานเดียวกัน องค์กรที่ไม่ปรับตัวกำลังเสียความได้เปรียบเชิงแข่งขันทุกวัน ในขณะที่คู่แข่งกำลังลดต้นทุนและเพิ่มผลผลิตด้วย AI'
  },
  {
    icon: 'Brain',
    stat: 'ผิด',
    label: 'ใช้ AI ไม่เป็น หรือใช้ผิดทาง',
    desc: 'หลายคนเคยลอง ChatGPT แล้วรู้สึกว่าผลลัพธ์ไม่ดี เพราะขาดทักษะ Prompt Engineering และไม่รู้ว่า AI เครื่องมือไหนเหมาะกับงานประเภทใด จึงหยุดใช้และพลาดโอกาสสำคัญ'
  },
  {
    icon: 'Shield',
    stat: 'เสี่ยง',
    label: 'ไม่รู้ขอบเขตและความเสี่ยงของ AI',
    desc: 'การใช้ AI โดยไม่เข้าใจ Hallucination ความเป็นส่วนตัว และ Bias ทำให้เกิดความเสียหายต่อองค์กรและความน่าเชื่อถือของงาน ทั้งยังส่งผลต่อภาพลักษณ์ระยะยาว'
  }
];

// ─── How Section ──────────────────────────────────────────────
const how_section = [
  {
    icon: 'Zap',
    title: 'Hands-on 80%',
    desc: 'ทุกโมดูลฝึกใช้ AI Tools จริงกับงานของตัวเอง ไม่ใช่แค่ดูสาธิต ทุกคนสร้าง Output จริงก่อนจบแต่ละ Session'
  },
  {
    icon: 'Layers',
    title: 'Prompt Engineering Lab',
    desc: 'ฝึก Prompting ตั้งแต่พื้นฐานจนถึงระดับ Advanced สำหรับงาน HR, Marketing, Operations และ Management'
  },
  {
    icon: 'Target',
    title: 'Personal AI Workflow',
    desc: 'แต่ละคนออกแบบ AI Workflow ส่วนตัวที่นำกลับไปใช้กับงานจริงได้ทันทีในวันรุ่งขึ้น ไม่ใช่แค่แบบฝึกหัดในห้อง'
  }
];

// ─── What Section ─────────────────────────────────────────────
const what_section = [
  { icon: 'Zap',         title: 'ใช้ AI ลดเวลาทำงานซ้ำซากได้ 50–70% ด้วย Workflow ที่ออกแบบเอง' },
  { icon: 'Brain',       title: 'เขียน Prompt ที่ได้ผลลัพธ์ตรงใจครั้งแรก ทุกครั้ง' },
  { icon: 'Target',      title: 'เลือกและประเมิน AI Tools ที่เหมาะกับงานแต่ละประเภทได้อย่างมีวิจารณญาณ' },
  { icon: 'Shield',      title: 'ใช้ AI อย่างปลอดภัย เข้าใจ Hallucination, Bias และข้อจำกัดของแต่ละ Tool' },
  { icon: 'Layers',      title: 'สร้าง AI-Powered Output ได้จริง เช่น รายงาน Presentation สรุปประชุม และ Content' },
  { icon: 'Users',       title: 'นำทีมสู่การทำงานแบบ AI-Augmented ได้อย่างเป็นธรรมชาติและยั่งยืน' }
];

// ─── Objectives / Modules (5 modules พร้อม desc ละเอียด) ────
const objectives = [
  {
    icon: 'Brain',
    title: 'Module 1 — AI Landscape for Professionals',
    desc: 'เข้าใจ AI ในปี 2025 อย่างถูกต้องก่อนเริ่มใช้งานจริง\n\n- ความแตกต่างของ Generative AI, Automation AI และ Analytical AI\n- เครื่องมือ AI ที่ Professional ต้องรู้จัก: ChatGPT, Claude, Gemini, Copilot, Midjourney\n- ทำไม AI ถึงให้คำตอบผิด และรู้ได้อย่างไรว่าเชื่อได้แค่ไหน\n- Workshop: ทดสอบและเปรียบเทียบ AI Tools 3 ตัวกับงานจริงของตัวเอง'
  },
  {
    icon: 'Zap',
    title: 'Module 2 — Prompt Engineering Masterclass',
    desc: 'ฝึกเขียน Prompt ที่ได้ผลลัพธ์ตรงใจทุกครั้ง ไม่ต้องลองผิดลองถูก\n\n- โครงสร้าง Prompt ที่มีประสิทธิภาพ: Role — Context — Task — Format — Constraint\n- เทคนิค Chain-of-Thought, Few-shot Learning และ Iterative Prompting\n- Prompt Templates สำเร็จรูปสำหรับงาน HR, Operations, Marketing และ Leadership\n- Workshop: แต่ละคน Build Prompt Library ของตัวเองสำหรับงาน 5 ประเภทที่ทำบ่อยที่สุด'
  },
  {
    icon: 'Layers',
    title: 'Module 3 — AI for Your Work: Use Case Lab',
    desc: 'ฝึกใช้ AI กับงานจริงใน 6 หมวดงานหลักที่ทุก Professional ทำทุกวัน\n\n- Writing & Communication: รายงาน อีเมล Presentation ภายใน 10 นาที\n- Research & Analysis: สรุปข้อมูล วิเคราะห์ตลาด Benchmark คู่แข่ง\n- HR Applications: JD, Interview Questions, Training Content, Performance Review\n- Meeting & Planning: สรุปประชุม Action Plan Project Brief\n- Creative & Ideation: Brainstorm, Campaign Concept, Problem-solving\n- Workshop: แต่ละคนสร้าง Real Output จากงานจริงของตัวเองภายใน 30 นาที'
  },
  {
    icon: 'Shield',
    title: 'Module 4 — AI Ethics, Risks and Governance',
    desc: 'ใช้ AI อย่างรับผิดชอบในระดับบุคคลและองค์กร\n\n- Hallucination คืออะไร และ Verify ผลลัพธ์จาก AI อย่างไร\n- ข้อมูลส่วนตัว ความลับองค์กร และสิ่งที่ห้ามป้อนเข้า AI\n- Copyright และ Intellectual Property ของ Content ที่ AI สร้าง\n- วิธีกำหนด AI Policy สำหรับทีมและองค์กรที่นำไปใช้ได้จริง\n- Workshop: ร่าง AI Usage Guidelines สำหรับแผนกของตัวเอง'
  },
  {
    icon: 'Target',
    title: 'Module 5 — Build Your Personal AI Workflow',
    desc: 'ออกแบบระบบการทำงานแบบ AI-Augmented ที่ใช้ได้จริงและยั่งยืน\n\n- วิเคราะห์ขั้นตอนงานที่ AI ช่วยได้มากที่สุดในงานของตัวเอง\n- ออกแบบ Personal AI Workflow Map พร้อม Tools และ Prompt ที่ครบชุด\n- แชร์ Workflow ในทีมเพื่อ Feedback และปรับให้สมบูรณ์\n- Workshop: แต่ละคนนำเสนอ AI Workflow และรับ Feedback จาก Facilitator ก่อนกลับ'
  }
];

// ─── Long Description ──────────────────────────────────────────
const long_description = `AI ไม่ได้มาแทนที่คน แต่คนที่ใช้ AI เก่งจะแทนที่คนที่ไม่ใช้

ในปี 2025 ทักษะการใช้ AI กลายเป็น Core Competency ที่ Professional ทุกระดับต้องมี ไม่ใช่แค่ฝ่าย IT หรือ Tech หลักสูตร AI Mastery for Professionals ออกแบบมาให้ HR, Manager, Executive และ Knowledge Worker ทุกคนสามารถเอา AI ไปใช้กับงานจริงได้ทันทีหลังจบ 1 วัน

หลักสูตรนี้ไม่ใช่การอธิบายว่า AI คืออะไร แต่คือการฝึกใช้จริงผ่าน Hands-on Workshop 80% กับงานของตัวเองในห้องอบรม

---

#### สิ่งที่ทำให้หลักสูตรนี้แตกต่าง

- ฝึกกับงานจริงของผู้เข้าอบรม ไม่ใช่ตัวอย่างสมมติ
- ทุกคนกลับไปพร้อม Prompt Library และ AI Workflow ที่ใช้ได้เลยในวันรุ่งขึ้น
- Facilitator มีประสบการณ์ใช้ AI จริงในงาน Learning Design และ Consulting
- อัปเดต Tools และ Use Case ล่าสุดทุกรุ่น ไม่ใช้ข้อมูลเก่า

---

#### ผลลัพธ์ที่ผู้เข้าอบรมรายงาน

- ประหยัดเวลาทำงาน 2–3 ชั่วโมงต่อวันด้วย AI Workflow ที่ออกแบบเอง
- เขียน Report สรุปประชุม และ Presentation ได้เร็วขึ้น 5–10 เท่า
- ทีม HR ลดเวลาสร้าง JD และ Training Content ลง 60%

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`;

async function main() {
  console.log('AI Mastery for Professionals — Full Update');
  console.log('==========================================\n');

  const { error } = await supabase
    .from('courses')
    .update({
      title:       'AI Mastery for Professionals',
      category:    'Work Skills',
      description: 'เชี่ยวชาญ AI ในงานจริง เพิ่มผลลัพธ์ ลดเวลา ก้าวนำคนอื่น',
      image:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200',
      alt_text:    'หลักสูตร AI Mastery for Professionals - CAP Vision Institute',
      duration:    'In-house Training 1–2 วัน | Online / Hybrid | 20–50 คน',
      audience:    'ผู้จัดการ / หัวหน้าทีม, Knowledge Worker, HR & L&D, CEO / ผู้บริหาร',
      long_description,
      why_section,
      how_section,
      what_section,
      objectives,
      instructor_id: '5c27d651-5a5e-4001-9c83-55d8d224791f',
    })
    .eq('slug', COURSE_SLUG);

  if (error) { console.error('Error:', error.message); process.exit(1); }

  console.log('Update successful!\n');
  console.log('  why_section:     ', why_section.length, 'items (label field fixed)');
  console.log('  how_section:     ', how_section.length, 'items');
  console.log('  what_section:    ', what_section.length, 'items');
  console.log('  objectives:      ', objectives.length, 'modules (expanded from 4 short)');
  console.log('  long_description: populated');
  console.log('\nURL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
