import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const COURSE_SLUG = 'conflict-to-collaboration';

// ─── Why Section ──────────────────────────────────────────────
const why_section = [
  {
    icon: 'Users',
    stat: 'แตก',
    label: 'ทีมแตกแยก ทำงานเป็น Silos',
    desc: 'ต่างคนต่างทำ แต่ละแผนกมีกำแพงล่องหนกั้นอยู่ การประสานงานล่าช้า งานตกหล่น และไม่มีใครรู้สึกเป็นเจ้าของผลลัพธ์เดียวกัน ทำให้องค์กรเติบโตได้ช้ากว่าศักยภาพจริง'
  },
  {
    icon: 'MessageCircle',
    stat: 'เงียบ',
    label: 'บรรยากาศอึดอัด ไม่มีใครกล้าพูด',
    desc: 'ความขัดแย้งที่ถูกกดเอาไว้ใต้พรมสร้างความเครียดสะสม คนเก่งเลือกเงียบแทนที่จะพูดความจริง ทีมขาด Psychological Safety ที่จะเสนอไอเดียหรือชี้ปัญหาได้ตรงๆ'
  },
  {
    icon: 'Shield',
    stat: 'ต่ำ',
    label: 'ความไว้วางใจต่ำ ขัดขวางทุกอย่าง',
    desc: 'เมื่อความไว้วางใจในทีมต่ำ ทุกการตัดสินใจช้าลง ทุกความเห็นต่างกลายเป็นการโจมตี และพลังงานขององค์กรถูกใช้ไปกับการเมืองภายในแทนที่จะสร้างผลลัพธ์'
  }
];

// ─── How Section ──────────────────────────────────────────────
const how_section = [
  {
    icon: 'Brain',
    title: 'Conflict Psychology Deep Dive',
    desc: 'เรียนรู้ว่าความขัดแย้งเกิดจากอะไรจริงๆ ไม่ใช่แค่ความเห็นต่าง แต่คือ Unmet Needs ที่ซ่อนอยู่ใต้พฤติกรรม'
  },
  {
    icon: 'MessageCircle',
    title: 'Generative Dialogue Practice',
    desc: 'ฝึกการฟัง 4 ระดับและการสนทนาที่สร้างความเข้าใจลึก ไม่ใช่แค่การพูดเพื่อชนะ แต่เพื่อค้นหาทางออกร่วมกัน'
  },
  {
    icon: 'Target',
    title: 'Collaboration Blueprint',
    desc: 'ออกแบบข้อตกลงทีมและระบบความร่วมมือที่ทุกคน Commit ร่วมกัน พร้อม Action Plan ที่นำไปใช้ได้จริงในวันรุ่งขึ้น'
  }
];

// ─── What Section ─────────────────────────────────────────────
const what_section = [
  { icon: 'Brain',         title: 'เข้าใจจิตวิทยาความขัดแย้งและ Needs ที่ซ่อนอยู่เบื้องหลังพฤติกรรมของคน' },
  { icon: 'MessageCircle', title: 'ฟังอย่างลึกซึ้งด้วย 4 Levels of Listening และดึง Insight จากบทสนทนาได้' },
  { icon: 'Shield',        title: 'สร้าง Psychological Safety ในทีมให้ทุกคนกล้าพูดความจริงได้อย่างปลอดภัย' },
  { icon: 'Target',        title: 'นำ Conflict Mapping มาวิเคราะห์และหาทางออก Win-Win ได้อย่างเป็นระบบ' },
  { icon: 'Users',         title: 'สร้าง Trust Architecture ที่แข็งแกร่งในทีม ผ่านกระบวนการ 5 มิติ' },
  { icon: 'Compass',       title: 'ออกแบบ Team Agreement และ Collaboration Norm ที่ทุกคน Commit ร่วมกัน' }
];

// ─── Objectives / Modules ─────────────────────────────────────
const objectives = [
  {
    icon: 'Brain',
    title: 'Module 1 — Understanding Conflict from the Inside Out',
    desc: 'ความขัดแย้งที่แท้จริงไม่ได้อยู่ที่คำพูด แต่อยู่ที่ความต้องการที่ยังไม่ได้รับการตอบสนอง\n\n- จิตวิทยาความขัดแย้ง: ทำไมคนเราถึงสู้หรือหนี (Fight, Flight, Freeze)\n- Iceberg Model — สิ่งที่มองเห็นกับสิ่งที่ซ่อนอยู่ใต้พฤติกรรม\n- Conflict Styles Assessment: รู้จักสไตล์การรับมือความขัดแย้งของตัวเอง\n- ความแตกต่างระหว่าง Destructive Conflict กับ Generative Conflict\n- Workshop: แต่ละคน Map ความขัดแย้งที่กำลังเจออยู่จริงในงาน'
  },
  {
    icon: 'MessageCircle',
    title: 'Module 2 — The 4 Levels of Listening',
    desc: 'การฟังส่วนใหญ่หยุดอยู่แค่ระดับแรก แต่ความเข้าใจที่แท้จริงต้องการการฟังถึงระดับที่สี่\n\n- Level 1 Downloading: ฟังแต่สิ่งที่ยืนยันความเชื่อตัวเอง\n- Level 2 Factual: ฟังข้อเท็จจริงโดยไม่ตัดสิน\n- Level 3 Empathic: ฟังด้วยความรู้สึก เข้าถึงอารมณ์ผู้พูด\n- Level 4 Generative: ฟังเพื่อสร้างความเป็นไปได้ใหม่ร่วมกัน\n- Workshop: ฝึก Dialogue คู่ที่ฟังในระดับ 3 และ 4 กับสถานการณ์จริง'
  },
  {
    icon: 'Shield',
    title: 'Module 3 — Building Psychological Safety and Trust',
    desc: 'ทีมที่ดีที่สุดในโลกมีสิ่งเดียวที่เหมือนกัน — ทุกคนรู้สึกปลอดภัยที่จะพูดความจริง\n\n- Google Project Aristotle: สิ่งที่ทำให้ทีมมีประสิทธิภาพสูงที่สุด\n- Trust Architecture 5 มิติ: Reliability / Sincerity / Competence / Care / Safety\n- วิธีสร้างพื้นที่ปลอดภัยในการประชุมและการสนทนาประจำวัน\n- การรับมือกับ Trust Breakers ที่พบบ่อยในองค์กร\n- Workshop: ทีมประเมิน Trust Level ปัจจุบันและออกแบบ Trust Building Action'
  },
  {
    icon: 'Target',
    title: 'Module 4 — Conflict Mapping and Win-Win Solutions',
    desc: 'เมื่อเข้าใจความขัดแย้งลึกพอ การหาทางออกที่ทุกฝ่ายได้ประโยชน์ไม่ใช่เรื่องยากอีกต่อไป\n\n- Conflict Mapping: วาด Map ความขัดแย้งเพื่อมองเห็นภาพรวม\n- Interest vs Position: แยกระหว่างสิ่งที่ต้องการ กับสิ่งที่บอกว่าต้องการ\n- Harvard Negotiation Model: Principled Negotiation สำหรับองค์กร\n- Emptying Process — กระบวนการสลายกำแพงทางอารมณ์ก่อนเจรจา\n- Workshop: แต่ละกลุ่มนำ Case จริงมา Map และหาทาง Win-Win'
  },
  {
    icon: 'Compass',
    title: 'Module 5 — Team Agreement and Collaboration Blueprint',
    desc: 'ความร่วมมือที่ยั่งยืนต้องมีโครงสร้างที่ทุกคน Commit ร่วมกัน ไม่ใช่แค่ความรู้สึกดีในห้องอบรม\n\n- ออกแบบ Team Agreement ที่ครอบคลุม: การสื่อสาร การตัดสินใจ การรับมือความขัดแย้ง\n- Collaboration Norms: กฎกติกาของทีมที่ทุกคนร่วมสร้างและเชื่อมั่น\n- Re-entry Plan: วิธีนำสิ่งที่เรียนกลับไปปรับใช้กับทีมจริงอย่างเป็นขั้นตอน\n- Commitment Circle: แต่ละคนประกาศ 1 สิ่งที่จะทำแตกต่างออกไป\n- Facilitator สรุป Insight สำคัญและให้ Feedback รายบุคคล'
  }
];

// ─── Long Description ──────────────────────────────────────────
const long_description = `ความขัดแย้งไม่ใช่ปัญหา แต่การจัดการผิดวิธีต่างหากที่ทำลายทีม

ในทุกองค์กร ความเห็นต่างเป็นเรื่องปกติ แต่สิ่งที่แยกทีมชั้นนำออกจากทีมทั่วไปคือความสามารถในการเปลี่ยนความขัดแย้งให้กลายเป็นพลังสร้างสรรค์ แทนที่จะปล่อยให้มันทำลายความสัมพันธ์และประสิทธิภาพการทำงาน

Conflict to Collaboration ออกแบบด้วย CAP Facilitation Framework ที่ผู้เข้าอบรมจะได้สำรวจความขัดแย้งจากภายในตัวเอง ฝึกทักษะการฟังและการสนทนาที่สร้างสรรค์ และออกแบบระบบความร่วมมือที่นำกลับไปใช้ในทีมจริงได้ทันที

---

#### ทีมที่ผ่านหลักสูตรนี้รายงานว่า

- การประชุมที่เคยเต็มไปด้วยความตึงเครียดกลายเป็นพื้นที่แลกเปลี่ยนที่สร้างสรรค์
- คนที่เคยเงียบในห้องประชุมเริ่มพูด เสนอ และมีส่วนร่วมมากขึ้น
- ความขัดแย้งระหว่างแผนกลดลงชัดเจน เพราะทุกคนเข้าใจ Needs ของกันและกัน

---

#### เหมาะสำหรับ

หลักสูตรนี้เหมาะที่สุดเมื่อนำมาจัดเป็น Team Building หรือ Offsite สำหรับทีมที่กำลังเผชิญกับความขัดแย้ง หรือต้องการเสริมสร้างวัฒนธรรมความร่วมมือก่อนที่ปัญหาจะบานปลาย

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`;

// ─── Run Update ───────────────────────────────────────────────
async function main() {
  console.log('Conflict to Collaboration — Full Update');
  console.log('=======================================\n');

  const { error } = await supabase
    .from('courses')
    .update({
      title:       'Conflict to Collaboration: The Art of Generative Teams',
      category:    'People Skills',
      description: 'เปลี่ยนความขัดแย้งเป็นพลังสร้างสรรค์ด้วยกระบวนการ Trust Building, Generative Dialogue และ Collaboration Design',
      image:       'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
      alt_text:    'หลักสูตร Conflict to Collaboration - CAP Vision Institute',
      duration:    'In-house Training 1–2 วัน | 15–40 คน',
      audience:    'ผู้บริหาร / หัวหน้าทีม, Cross-functional Teams, HR & OD, ทีมที่มีความขัดแย้งสูง',
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
  console.log('  why_section:     ', why_section.length, 'items');
  console.log('  how_section:     ', how_section.length, 'items');
  console.log('  what_section:    ', what_section.length, 'items');
  console.log('  objectives:      ', objectives.length, 'modules');
  console.log('  long_description: populated');
  console.log('\nURL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
