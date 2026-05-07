import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const COURSE_SLUG = 'transformational-leadership';

// ─── Why Section (คงเดิม — ครบและถูกต้องแล้ว) ─────────────────
const why_section = [
  {
    icon: 'Eye',
    stat: '100%',
    label: 'Self-Awareness',
    desc: 'ค้นพบ Core Identity และศักยภาพภายในของผู้นำแต่ละคน เพื่อนำจากจุดแข็งที่แท้จริง'
  },
  {
    icon: 'Flame',
    stat: 'จริง',
    label: 'Behavioral Change',
    desc: 'ออกแบบให้เกิดการเปลี่ยนแปลงพฤติกรรมจริง ไม่ใช่แค่ความรู้ที่จำได้ชั่วคราว'
  },
  {
    icon: 'Users',
    stat: '+85%',
    label: 'Team Engagement',
    desc: 'ผู้นำที่เปลี่ยนแปลงจากภายในส่งผลให้ทีมมี Ownership และแรงจูงใจสูงขึ้นอย่างเห็นได้ชัด'
  },
  {
    icon: 'Star',
    stat: 'ยาวนาน',
    label: 'Sustainable Results',
    desc: 'สร้างผลลัพธ์ที่ยั่งยืนจากการเปลี่ยนแปลงจากรากฐาน ไม่ใช่การแก้ที่ปลายเหตุ'
  }
];

// ─── How Section (คงเดิม — ครบและถูกต้องแล้ว) ─────────────────
const how_section = [
  {
    icon: 'Zap',
    title: 'Workshop 70%',
    desc: 'Learning by Doing — เรียนรู้ผ่านการลงมือทำจริงทุกกิจกรรม ไม่ใช่แค่ฟังบรรยาย'
  },
  {
    icon: 'MessageCircle',
    title: 'Reflection & Dialogue',
    desc: 'สะท้อนคิดเชิงลึกและ Circle Dialogue เรียนรู้ผ่านวงสนทนาที่ปลอดภัย'
  },
  {
    icon: 'Target',
    title: 'Real Case Application',
    desc: 'เรียนรู้ → ตกผลึก → ทดลองใช้ → เปลี่ยนจริง กระบวนการ Signature ของ CAP Vision'
  }
];

// ─── What Section (คงเดิม — ครบและถูกต้องแล้ว) ────────────────
const what_section = [
  { icon: 'Eye',           title: 'เข้าใจสไตล์ผู้นำของตนเองและค้นพบ Core Identity ผ่าน C.O.D.E Assessment' },
  { icon: 'Brain',         title: 'ปรับ Mindset จากการ "ควบคุม" สู่การ "สร้างแรงบันดาลใจ" ให้ทีม' },
  { icon: 'Compass',       title: 'สร้าง Vision ที่ทีมเชื่อมั่นและอยากเดินทางไปด้วย (Vision & Purpose)' },
  { icon: 'Users',         title: 'สร้างทีมที่มี Engagement และ Ownership อย่างแท้จริง ไม่ใช่แค่ทำตามสั่ง' },
  { icon: 'Flame',         title: 'นำการเปลี่ยนแปลงในองค์กรได้จริง เปลี่ยน Resistance เป็น Engagement' },
  { icon: 'MessageCircle', title: 'Facilitative Leadership — ตั้งคำถามทรงพลังและนำ Team Dialogue ได้' }
];

// ─── Objectives (แก้ desc ให้สะอาด ไม่มี **bold** — ใช้ - bullet แทน) ─
const objectives = [
  {
    icon: 'Eye',
    title: 'Module 1 — Self-Leadership: รู้จักตัวเองในฐานะผู้นำ',
    desc: 'ผู้นำที่เข้าใจตัวเองอย่างลึกซึ้งคือผู้นำที่เปลี่ยนคนอื่นได้\n\n- ทดสอบสไตล์ผู้นำผ่าน C.O.D.E Assessment\n- ระบุ Leadership Identity และ Core Values ของตนเอง\n- ค้นพบจุดแข็งและ Blind Spot ที่ส่งผลต่อทีมโดยไม่รู้ตัว\n- เชื่อม Personal Story กับ Leadership Purpose\n- Workshop: เขียน Leadership Identity Statement ส่วนตัว'
  },
  {
    icon: 'Brain',
    title: 'Module 2 — Leadership Mindset: เปลี่ยนวิธีคิดก่อนเปลี่ยนทีม',
    desc: 'ทีมที่ Perform ต่ำกว่าศักยภาพ มักเกิดจาก Mindset ของผู้นำ ไม่ใช่ความสามารถของทีม\n\n- Fixed vs Growth Mindset ในการนำทีม\n- Language of Leadership — คำพูดที่เพิ่มหรือลด Engagement ของทีม\n- Unconscious Bias ที่ผู้นำมีต่อลูกทีมและผลกระทบที่ตามมา\n- Self-Limiting Beliefs ที่ขัดขวางการเติบโตของผู้นำ\n- Workshop: ฉันเป็นผู้นำแบบไหน และฉันอยากเป็นแบบไหน'
  },
  {
    icon: 'Compass',
    title: 'Module 3 — Vision & Purpose: สร้างทิศทางที่ทีมอยากตาม',
    desc: 'ผู้นำที่ไม่มี Vision ที่ชัดเจนคือผู้นำที่พาทีมไปไม่ถึงไหน\n\n- หลักการสร้าง Inspiring Vision ที่มีพลังและดึงดูด\n- เชื่อม Personal Purpose กับ Team Purpose และ Organizational Goal\n- Simon Sinek Start With Why — ทำไมคนตาม Purpose ไม่ใช่ Plan\n- วิธีสื่อสาร Vision ให้ทีมเชื่อและอยากมีส่วนร่วม\n- Workshop: เขียน Vision Statement ส่วนตัวและของทีม'
  },
  {
    icon: 'Users',
    title: 'Module 4 — Leading People: เข้าใจคนและจุดไฟจากภายใน',
    desc: 'คนทุกคนมีแรงจูงใจจากภายใน ผู้นำที่ดีรู้วิธีค้นพบและจุดประกายมันออกมา\n\n- 4 Drivers of Intrinsic Motivation: Autonomy / Mastery / Purpose / Connection\n- วิธีอ่านคนและปรับสไตล์การนำให้เหมาะกับแต่ละบุคลิก\n- Situational Leadership: นำคนต่างระดับด้วยวิธีที่ต่างกัน\n- Delegation with Trust — มอบหมายงานอย่างไรให้คนรู้สึก Ownership\n- Role Play: บทสนทนา One-on-One ที่เปลี่ยนพฤติกรรมทีมได้จริง'
  },
  {
    icon: 'Flame',
    title: 'Module 5 — Leading Change: นำการเปลี่ยนแปลงอย่างมีพลัง',
    desc: 'การเปลี่ยนแปลงล้มเหลวไม่ใช่เพราะ Strategy ผิด แต่เพราะผู้นำไม่ได้ชนะใจคนก่อน\n\n- Change Curve Model — ทำความเข้าใจว่าทำไมคนต้านการเปลี่ยนแปลง\n- กลยุทธ์ Win Hearts Before Changing Minds\n- วิธีสื่อสารการเปลี่ยนแปลงที่ลดความกลัวและสร้างความมั่นใจ\n- Resistance to Engagement — เปลี่ยนผู้ต้านให้กลายเป็นแชมเปี้ยน\n- Case Study: สถานการณ์จริงในองค์กรไทยที่นำ Change ได้สำเร็จ'
  },
  {
    icon: 'MessageCircle',
    title: 'Module 6 — Facilitative Leadership: นำด้วยคำถาม ไม่ใช่คำตอบ',
    desc: 'ผู้นำที่ยิ่งใหญ่ไม่ได้มีคำตอบทุกข้อ แต่รู้วิธีตั้งคำถามที่ดึงศักยภาพออกมาจากทีม\n\n- Powerful Questions ที่สร้าง Insight และ Ownership ในทีม\n- Circle Dialogue — สร้างพื้นที่ปลอดภัยให้ทุกคนกล้าพูดความจริง\n- Coaching Conversation สั้นๆ ที่ผู้นำทำได้ในชีวิตประจำวัน\n- Team Facilitation Skills: นำประชุมให้ได้ผลลัพธ์ทุกครั้ง\n- Action Plan: 3 สิ่งที่จะเปลี่ยนแปลงทันทีเมื่อกลับไปทำงาน'
  }
];

// ─── Long Description (สะอาด ไม่มี **bold** หรือ ### header ที่ดูแข็ง) ──
const long_description = `ผู้นำจำนวนมาก "เก่งงาน" แต่ไม่สามารถ "เปลี่ยนทีม" ได้จริง

เพราะสิ่งที่องค์กรต้องการวันนี้ไม่ใช่แค่คนที่บริหารงานได้ แต่คือผู้นำที่เปลี่ยนคน เปลี่ยนทีม และเปลี่ยนผลลัพธ์ได้จากภายใน

---

#### ปัญหาที่ผู้นำหลายคนเผชิญอยู่

- สั่งงานได้ แต่ไม่ได้ใจคน — ทีมทำงานเพราะต้องทำ ไม่ใช่เพราะอยากทำ
- รู้ว่าต้องเปลี่ยน แต่ไม่รู้จะเริ่มจากตรงไหน — การเปลี่ยนแปลงดูยิ่งใหญ่และน่ากลัว
- ทีมไม่ Engage — ขาด Ownership และแรงจูงใจจากภายใน
- ผลลัพธ์ไม่ยั่งยืน — แก้ที่ปลายเหตุ ไม่ได้เปลี่ยนจากรากฐาน

---

#### DFA Model กระบวนการที่ CAP Vision ใช้

#### D — Dynamic Learning Design
ออกแบบกระบวนการเรียนรู้ที่ไม่ใช่แค่ Lecture แต่สร้าง Experience ที่เปลี่ยนแปลงได้จริงผ่านกิจกรรม Workshop 70%

#### F — Flow State Learning
สร้างบรรยากาศที่ผู้เข้าร่วมลื่นไหล สนุก และท้าทายในระดับที่พอดีกับการเติบโต ทุกนาทีมีคุณค่า

#### A — Art of Personal Growth
เน้นการเติบโตจากภายใน (Inside-out Transformation) ที่ยั่งยืนและเป็นธรรมชาติ ไม่ใช่การเปลี่ยนแปลงจากภายนอก

---

#### เมื่อผู้นำเปลี่ยน ทีมจะเปลี่ยน องค์กรจะเปลี่ยน

ผู้เข้าอบรมจะออกจากห้องไปพร้อมกับ Leadership Action Plan ที่ชัดเจน วัดผลได้ และพร้อมนำไปใช้จริงในวันรุ่งขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`;

// ─── Run Update ───────────────────────────────────────────────
async function main() {
  console.log('Transformational Leadership — Full Update v2');
  console.log('============================================\n');

  const { error } = await supabase
    .from('courses')
    .update({
      title:       'Transformational Leadership',
      category:    'Leader Skills',
      description: 'เปลี่ยนจากผู้นำที่สั่งงานสู่ผู้นำที่เข้าใจตนเอง เห็นคน และขับเคลื่อนการเปลี่ยนแปลงได้จริง',
      image:       'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
      alt_text:    'หลักสูตร Transformational Leadership - CAP Vision Institute',
      duration:    'In-house Training 1–2 วัน | Online / Hybrid | 20–50 คน',
      audience:    'ผู้บริหาร / CEO, ผู้จัดการ / หัวหน้างาน, High Potential Leader',
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
  console.log('  title:           Transformational Leadership (newline removed)');
  console.log('  why_section:    ', why_section.length, 'items');
  console.log('  how_section:    ', how_section.length, 'items');
  console.log('  what_section:   ', what_section.length, 'items');
  console.log('  objectives:     ', objectives.length, 'modules (bold markers removed)');
  console.log('  long_description: cleaned (no **bold**, clean markdown)');
  console.log('  image:           new unique image');
  console.log('\nURL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
