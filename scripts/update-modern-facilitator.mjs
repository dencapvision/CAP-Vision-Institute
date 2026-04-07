import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZXBwdmpheXp4bGJsa2VhbnhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA3NjIwNywiZXhwIjoyMDg2NjUyMjA3fQ.F5vnxMcpf2Pieh-lgKx7dFLk0j2oUmT30qE2SENhcHY';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const COURSE_SLUG = 'the-modern-facilitator';

// ─── Why Section ──────────────────────────────────────────────
const why_section = [
  {
    icon: 'Users',
    stat: 'เงียบ',
    label: 'ห้องอบรมเงียบ คนไม่มีส่วนร่วม',
    desc: 'วิทยากรพูดคนเดียว 6 ชั่วโมง ผู้เรียนนั่งฟังอย่างเดียว จนกระทั่งพยักหน้าหลับ การอบรมแบบนี้ไม่สร้างการเปลี่ยนแปลงพฤติกรรม เพราะสมองไม่ได้ประมวลผลอย่างลึก'
  },
  {
    icon: 'Target',
    stat: 'ลืม',
    label: 'จบแล้วลืม ไม่ได้นำไปใช้',
    desc: 'งานวิจัยด้าน Learning Science พบว่าคนลืมสิ่งที่เรียน 70% ภายใน 24 ชั่วโมง หากไม่มีกระบวนการ Active Recall และ Application ระหว่างอบรม เงินและเวลาที่ลงทุนจึงสูญเปล่า'
  },
  {
    icon: 'Zap',
    stat: 'ขาด',
    label: 'Facilitator ขาดทักษะอ่านห้อง',
    desc: 'การบริหารห้องเรียนเป็นมากกว่าการพูดเก่ง Facilitator ที่ไม่รู้วิธีอ่านพลังงานห้อง จัดการกลุ่มที่ไม่ร่วมมือ หรือ Debrief ให้ลึก ทำให้กิจกรรมดีแต่ไม่เกิด Insight จริง'
  }
];

// ─── How Section ──────────────────────────────────────────────
const how_section = [
  {
    icon: 'Layers',
    title: 'Learning by Facilitating',
    desc: 'ผู้เข้าอบรมได้ฝึก Facilitate จริงทุกคน ผ่าน Micro-Teaching และรับ Feedback จาก Facilitator ผู้เชี่ยวชาญและเพื่อนร่วมกลุ่ม'
  },
  {
    icon: 'Brain',
    title: 'CAP Facilitation Framework',
    desc: 'เรียนรู้กรอบที่ครูเด่นพัฒนาขึ้นจากประสบการณ์ 1,000+ เวที ครอบคลุมตั้งแต่ Learning Design จนถึงการ Debrief อย่างลึก'
  },
  {
    icon: 'Target',
    title: 'Real Room Simulation',
    desc: 'จำลองสถานการณ์ห้องจริงทุกรูปแบบ ทั้งกลุ่มที่เงียบ คนที่ท้าทาย และห้องที่พลังงานตก เพื่อฝึกรับมือก่อนเจอจริง'
  }
];

// ─── What Section ─────────────────────────────────────────────
const what_section = [
  { icon: 'Layers',      title: 'ออกแบบ Learning Experience ที่ดึงดูด มีส่วนร่วม และสร้างการเปลี่ยนแปลงพฤติกรรมได้จริง' },
  { icon: 'Brain',       title: 'ใช้จิตวิทยาการเรียนรู้ผู้ใหญ่ (Andragogy) ออกแบบกิจกรรมที่โดนใจทุก Generation' },
  { icon: 'Users',       title: 'บริหารพลังงานห้อง อ่านกลุ่ม และจัดการผู้เรียนทุกประเภทได้อย่างมีประสิทธิภาพ' },
  { icon: 'Target',      title: 'Debrief อย่างลึกด้วย Powerful Questions ที่ดึง Insight จากผู้เรียนออกมาได้จริง' },
  { icon: 'MessageCircle', title: 'สร้าง Psychological Safety ในห้องเรียนเพื่อให้ทุกคนกล้าพูด กล้าลอง กล้าผิดพลาด' },
  { icon: 'Zap',         title: 'มี Facilitation Toolkit ส่วนตัวที่นำไปใช้กับการสอนหรือประชุมได้ทันทีหลังจบหลักสูตร' }
];

// ─── Objectives / Modules ─────────────────────────────────────
const objectives = [
  {
    icon: 'Brain',
    title: 'Module 1 — Facilitator Mindset and Identity',
    desc: 'ก่อนเรียนเทคนิค ต้องเข้าใจก่อนว่า Facilitator คือใคร และมีหน้าที่อะไรที่แตกต่างจาก Trainer หรือ Speaker\n\n- Facilitator vs Trainer vs Teacher — ความแตกต่างและบทบาทที่ชัดเจน\n- CAP Facilitation Philosophy: "เราไม่ได้สอน เราสร้างพื้นที่ให้คนค้นพบตัวเอง"\n- The 3 Levels of Facilitation: Surface / Process / Transformative\n- Self-Assessment: ค้นพบสไตล์ Facilitation ของตัวเองและจุดที่ต้องพัฒนา\n- Workshop: เขียน Facilitation Identity Statement ของตัวเอง'
  },
  {
    icon: 'Layers',
    title: 'Module 2 — Learning Design Fundamentals',
    desc: 'ออกแบบการเรียนรู้ที่ดีก่อนเข้าห้อง คือครึ่งหนึ่งของความสำเร็จ\n\n- Adult Learning Theory (Andragogy) — ผู้ใหญ่เรียนรู้อย่างไร\n- Learning Outcomes ที่วัดได้: Bloom Taxonomy ประยุกต์ใช้จริง\n- Experience Learning Cycle (Kolb): Do — Reflect — Conceptualize — Apply\n- โครงสร้าง Session Design: Opening Energy / Content Delivery / Application / Debrief\n- Workshop: แต่ละคนออกแบบ Session 30 นาทีจากหัวข้อที่ตัวเองต้องสอนจริง'
  },
  {
    icon: 'Users',
    title: 'Module 3 — Reading the Room and Energy Management',
    desc: 'ทักษะที่แยก Facilitator ดีออกจาก Facilitator เก่ง — การอ่านห้องและจัดการพลังงาน\n\n- 5 สัญญาณที่บอกว่าห้องกำลังหลุด และวิธีดึงกลับ\n- การจัดการกลุ่มที่ไม่ร่วมมือ: Silent Type / Dominator / Skeptic / Disengaged\n- Energy Curve Management — จังหวะขึ้นลงของพลังงานตลอดวัน\n- Icebreaker และ Energizer ที่เชื่อมกับ Learning Outcome ไม่ใช่แค่สนุก\n- Micro-Teaching 1: แต่ละคนฝึก Facilitate 10 นาที รับ Feedback รายบุคคล'
  },
  {
    icon: 'MessageCircle',
    title: 'Module 4 — The Art of Powerful Questions and Debriefing',
    desc: 'คำถามที่ถูกต้องเปลี่ยนบทสนทนาธรรมดาให้กลายเป็นประสบการณ์ที่ผู้เรียนจำไปตลอดชีวิต\n\n- ระดับของคำถาม: Recall / Analyze / Synthesize / Evaluate / Create\n- Socratic Questioning — ดึง Insight โดยไม่บอกคำตอบ\n- Circle Debrief Process: Experience → Reflect → Generalize → Apply\n- การรับมือกับคำตอบที่ไม่คาดคิดหรือคำตอบที่ผิด\n- Workshop: ฝึก Debrief จากกิจกรรมที่ทำใน Module 3 อย่างลึกขึ้น'
  },
  {
    icon: 'Zap',
    title: 'Module 5 — Facilitation in Action (Full Simulation)',
    desc: 'วันสองทั้งวันคือการฝึกจริงในสถานการณ์ที่ท้าทาย\n\n- Micro-Teaching 2: แต่ละคน Facilitate 20–30 นาที ด้วย Session ที่ออกแบบเองจาก Module 2\n- Peer Feedback Framework: SBI + Growth Suggestions\n- Facilitation Rescue: จำลองสถานการณ์ห้องที่ล้มเหลว แล้วฝึก Recover\n- สร้าง Personal Facilitation Toolkit: กิจกรรม คำถาม และ Framework ที่นำกลับไปใช้ได้\n- Commitment Circle: แต่ละคนประกาศ Next Step และรับการสนับสนุนจากกลุ่ม'
  }
];

// ─── Long Description ──────────────────────────────────────────
const long_description = `Facilitator ที่ดีไม่ได้เกิดมาพร้อมพรสวรรค์ แต่ถูกออกแบบมาด้วยทักษะ

The Modern Facilitator คือหลักสูตร Signature ของ CAP Vision Institute ที่ออกแบบโดยครูเด่น มาสเตอร์ฟา จากประสบการณ์ 18+ ปี และ 1,000+ เวทีการ Facilitate ทั่วประเทศ

หลักสูตรนี้ไม่ใช่การสอนว่า Facilitation คืออะไร แต่คือการพาคุณ "กลายเป็น" Facilitator ที่ห้องไว้วางใจ ผู้เรียนอยากมีส่วนร่วม และทุก Session สร้าง Transformation ที่แท้จริง

---

#### ความแตกต่างของ The Modern Facilitator

หลักสูตรนี้ใช้รูปแบบ Learning by Facilitating — ผู้เข้าอบรมทุกคนได้ฝึก Facilitate จริง ไม่ใช่แค่นั่งดูตัวอย่าง ทุกคนได้รับ Feedback รายบุคคลจากครูเด่นและเพื่อนร่วมกลุ่ม ซึ่งเป็นวิธีเดียวที่ทักษะ Facilitation จะพัฒนาได้จริง

---

#### เหมาะสำหรับ

หลักสูตรนี้ออกแบบมาให้ทุกคนที่ต้องนำกระบวนการในองค์กร ไม่ว่าจะเป็นวิทยากรมืออาชีพ หัวหน้างานที่ต้องสอนทีม HR ที่ต้องออกแบบการอบรม หรือผู้บริหารที่ต้องนำประชุมให้มีประสิทธิภาพ

---

#### ผลลัพธ์ที่ผู้เข้าอบรมรายงาน

- ห้องอบรมหลังจบหลักสูตรมีพลังงานสูงขึ้นอย่างเห็นได้ชัด
- ผู้เรียนมีส่วนร่วมตลอดทั้งวัน ไม่มีใครหลับหรือก้มหน้าดูโทรศัพท์
- Feedback Score จากผู้เรียนเพิ่มขึ้นจากเฉลี่ย 3.5 เป็น 4.8 จาก 5

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`;

// ─── Run Update ───────────────────────────────────────────────
async function main() {
  console.log('The Modern Facilitator — Full Update');
  console.log('=====================================\n');

  const { error } = await supabase
    .from('courses')
    .update({
      title:       'The Modern Facilitator',
      category:    'Leader Skills',
      description: 'ยกระดับจากวิทยากรที่พูดเก่ง สู่ Facilitator ที่สร้างการเปลี่ยนแปลงพฤติกรรมได้จริง',
      image:       'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
      alt_text:    'หลักสูตร The Modern Facilitator - CAP Vision Institute ครูเด่น มาสเตอร์ฟา',
      duration:    'In-house Training 2 วัน | 20–40 คน',
      audience:    'วิทยากร / Trainer, HRD & L&D, หัวหน้างานที่ต้องสอนทีม, ผู้บริหารที่นำประชุม',
      long_description,
      why_section,
      how_section,
      what_section,
      objectives,
      instructor_id: '5c27d651-5a5e-4001-9c83-55d8d224791f',
    })
    .eq('slug', COURSE_SLUG);

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('Update successful!\n');
  console.log('  why_section:     ', why_section.length, 'items');
  console.log('  how_section:     ', how_section.length, 'items');
  console.log('  what_section:    ', what_section.length, 'items');
  console.log('  objectives:      ', objectives.length, 'modules');
  console.log('  long_description: populated');
  console.log('\nURL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
