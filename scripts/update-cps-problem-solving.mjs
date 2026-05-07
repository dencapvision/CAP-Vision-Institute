import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const COURSE_SLUG = 'cps-problem-solving';

// ─── Why Section ──────────────────────────────────────────────
const why_section = [
  {
    icon: 'Search',
    stat: 'ผิด',
    label: 'แก้ปัญหาผิดจุด',
    desc: 'องค์กรส่วนใหญ่เสียเวลาและทรัพยากรไปกับการแก้อาการ ไม่ใช่สาเหตุจริง เพราะขาดกระบวนการวิเคราะห์ปัญหาที่มีโครงสร้าง ทำให้ปัญหาเดิมวนซ้ำอยู่ตลอดเวลา'
  },
  {
    icon: 'Brain',
    stat: 'ซ้ำ',
    label: 'คิดวนซ้ำแบบเดิม',
    desc: 'เมื่อเจอปัญหา ทีมมักหยิบวิธีแก้เดิมที่เคยใช้โดยไม่ตั้งคำถาม ขาดทักษะ Creative Thinking ที่จะมองหาทางเลือกใหม่ ส่งผลให้นวัตกรรมในองค์กรหยุดนิ่ง'
  },
  {
    icon: 'Users',
    stat: 'ช้า',
    label: 'ตัดสินใจไม่ได้ ติดขัดทุกขั้น',
    desc: 'ประชุมนานแต่ไม่ได้ข้อสรุป ทุกคนมีความเห็นต่างกัน ไม่มีกรอบกลางที่ใช้ร่วมกันในการประเมินทางเลือกและตัดสินใจ ทำให้โอกาสหลุดมือทุกครั้ง'
  }
];

// ─── How Section ──────────────────────────────────────────────
const how_section = [
  {
    icon: 'Search',
    title: 'CPS Framework (7 ขั้นตอน)',
    desc: 'ฝึกกระบวนการ Creative Problem Solving ทีละขั้นตอน ตั้งแต่ Define Problem ถึง Action Plan ผ่าน Case จริง'
  },
  {
    icon: 'Zap',
    title: 'Design Thinking Tools',
    desc: 'ใช้เครื่องมือ เช่น Root Cause Analysis, How Might We, Idea Matrix และ Prototype Thinking เพื่อสร้างทางเลือกที่หลากหลาย'
  },
  {
    icon: 'Target',
    title: 'Real Problem Workshop',
    desc: 'นำปัญหาจริงขององค์กรเข้ามาทดลองแก้ในห้อง Facilitator ช่วย Debrief และชี้ให้เห็น Pattern การคิดของแต่ละทีม'
  }
];

// ─── What Section ─────────────────────────────────────────────
const what_section = [
  { icon: 'Search',      title: 'วิเคราะห์และระบุ Root Cause ของปัญหาได้อย่างแม่นยำก่อนลงมือแก้' },
  { icon: 'Brain',       title: 'ใช้กระบวนการ CPS 7 ขั้นตอนในการแก้ปัญหาที่ซับซ้อนได้อย่างเป็นระบบ' },
  { icon: 'Zap',         title: 'สร้างทางเลือกใหม่ที่หลากหลายด้วย Creative Thinking Tools' },
  { icon: 'Target',      title: 'ประเมินและเลือกทางออกที่ดีที่สุดด้วยเกณฑ์ที่ชัดเจน มีเหตุผล' },
  { icon: 'Users',       title: 'นำทีมผ่านกระบวนการแก้ปัญหาร่วมกันได้อย่างมีประสิทธิภาพ' },
  { icon: 'Layers',      title: 'สร้าง Action Plan ที่นำไปปฏิบัติได้จริง พร้อม Owner และ Timeline ชัดเจน' }
];

// ─── Objectives / Modules ─────────────────────────────────────
const objectives = [
  {
    icon: 'Search',
    title: 'Module 1 — Problem Definition Mastery',
    desc: 'ทักษะที่สำคัญที่สุดในการแก้ปัญหา คือการ Define ปัญหาให้ถูกก่อน\n\n- ความแตกต่างระหว่าง Symptom กับ Root Cause\n- เทคนิค 5 Whys และ Fishbone Diagram\n- How Might We (HMW) — การ Reframe ปัญหาให้เปิดกว้างต่อทางออกใหม่\n- Workshop: แต่ละทีมนำปัญหาจริงจากงานมา Define ใหม่ให้ชัดและลึกขึ้น'
  },
  {
    icon: 'Brain',
    title: 'Module 2 — Creative Thinking Techniques',
    desc: 'ทลายกำแพงความคิดเดิมด้วยเครื่องมือที่ใช้งานได้จริง\n\n- SCAMPER Technique — ดัดแปลง ผสม นำออก ฯลฯ\n- Random Word Association และ Analogical Thinking\n- Reverse Brainstorming — คิดว่าจะทำให้แย่ลงได้อย่างไร แล้วพลิกกลับ\n- Idea Matrix — สร้างไอเดียใหม่จากการรวมตัวแปร 2 มิติ\n- Workshop: แข่งสร้างไอเดียจากโจทย์เดียวกันให้ได้มากที่สุดใน 10 นาที'
  },
  {
    icon: 'Layers',
    title: 'Module 3 — Evaluation and Decision Making',
    desc: 'จากไอเดียหลาย 10 ข้อ เลือกสิ่งที่ดีที่สุดอย่างมีเหตุผล\n\n- เกณฑ์การประเมินทางเลือก: Impact vs Effort Matrix\n- Weighted Scoring Model — ประเมินด้วยน้ำหนักความสำคัญ\n- Risk Assessment เบื้องต้นก่อนตัดสินใจ\n- Consensus Building — นำทีมมาตกลงร่วมกันโดยไม่ใช้อำนาจ\n- Workshop: แต่ละกลุ่มประเมินและเลือก Solution จาก Module 2'
  },
  {
    icon: 'Zap',
    title: 'Module 4 — Prototype and Test Thinking',
    desc: 'ไม่รอให้สมบูรณ์ก่อนลองทำ — เรียนรู้เร็วด้วยการทดสอบแนวคิดก่อนลงทุนจริง\n\n- แนวคิด Minimum Viable Solution (MVS)\n- วิธีสร้าง Quick Prototype ใน 30 นาที\n- Assumption Testing — ระบุสมมติฐานที่ต้องพิสูจน์ก่อน\n- Learning Loop: Try → Observe → Adjust → Repeat\n- Workshop: แต่ละทีม Prototype Solution และนำเสนอ รับ Feedback จากกลุ่มอื่น'
  },
  {
    icon: 'Target',
    title: 'Module 5 — From Insight to Action Plan',
    desc: 'ทุกไอเดียที่ดีจะไม่มีความหมาย ถ้าไม่ถูกนำไปลงมือจริง\n\n- โครงสร้าง Action Plan ที่นำไปใช้ได้จริง: What — Who — When — How\n- การกำหนด KPI ของ Solution ที่วัดผลได้\n- Stakeholder Communication — สื่อสารแผนงานให้ได้รับการสนับสนุน\n- Commitment Workshop: แต่ละคนเขียน Personal Action Commitment ก่อนออกจากห้อง\n- Facilitator ให้ Feedback รายกลุ่มและสรุปการเรียนรู้ตลอดทั้งวัน'
  }
];

// ─── Long Description ──────────────────────────────────────────
const long_description = `ปัญหาไม่ได้น่ากลัว แต่การแก้ผิดจุดซ้ำๆ ต่างหากที่ทำลายองค์กร

CPS — Creative Problem Solving ไม่ใช่แค่การระดมสมอง แต่คือกระบวนการที่มีโครงสร้างชัดเจนสำหรับการวิเคราะห์ปัญหาอย่างลึกซึ้ง สร้างทางออกที่สร้างสรรค์ และตัดสินใจอย่างมีเหตุผลจนถึงการลงมือทำจริง

หลักสูตรนี้ออกแบบโดยใช้ CAP Facilitation Design ที่ผู้เข้าอบรมจะ "ฝึกแก้ปัญหาจริง" ตลอดทั้งวัน ไม่ใช่แค่เรียนทฤษฎีแล้วกลับบ้าน

---

#### ทำไมองค์กรชั้นนำถึงเลือก CPS Methodology

ปัญหาในโลกธุรกิจปัจจุบันไม่ได้มีคำตอบเดียวที่ถูก การแก้ปัญหาแบบเดิมที่ใช้ประสบการณ์และ Intuition อย่างเดียวไม่เพียงพออีกต่อไป CPS ให้ทีมมีภาษากลางในการคิด ตั้งคำถาม และตัดสินใจร่วมกันอย่างมีประสิทธิภาพ

---

#### ผลลัพธ์ที่องค์กรรายงานหลังผ่านหลักสูตร

- เวลาในการแก้ปัญหาในทีมลดลง 40–60% เพราะทุกคนมีกรอบการคิดร่วมกัน
- การประชุมแก้ปัญหาได้ข้อสรุปและ Action Plan ทุกครั้ง
- ทีมกล้าเสนอไอเดียใหม่มากขึ้น เพราะมีพื้นที่ปลอดภัยในการคิดนอกกรอบ

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`;

// ─── Run Update ───────────────────────────────────────────────
async function main() {
  console.log('CPS Problem Solving — Full Update');
  console.log('==================================\n');

  const { error } = await supabase
    .from('courses')
    .update({
      title:            'Creative Problem Solving (CPS)',
      category:         'Work Skills',
      description:      'กระบวนการแก้ปัญหาอย่างสร้างสรรค์ที่มีโครงสร้าง วิเคราะห์ได้ลึก และนำไปปฏิบัติได้จริง',
      image:            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
      alt_text:         'หลักสูตร Creative Problem Solving CPS - CAP Vision Institute',
      duration:         'In-house Training 1–2 วัน | Online / Hybrid | 20–50 คน',
      audience:         'ผู้จัดการ / หัวหน้าทีม, Knowledge Worker, HR & L&D, ผู้บริหาร',
      long_description,
      why_section,
      how_section,
      what_section,
      objectives,
      instructor_id:    '5c27d651-5a5e-4001-9c83-55d8d224791f',
    })
    .eq('slug', COURSE_SLUG);

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('Update successful!\n');
  console.log('  why_section:   ', why_section.length, 'items');
  console.log('  how_section:   ', how_section.length, 'items');
  console.log('  what_section:  ', what_section.length, 'items');
  console.log('  objectives:    ', objectives.length, 'modules');
  console.log('  long_description: populated');
  console.log('\nURL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
