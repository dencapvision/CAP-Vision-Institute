import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── Course Identity ───────────────────────────────────────────
const COURSE_SLUG = 'leadership-communication-for-impact';

// ─── Why Section ──────────────────────────────────────────────
const why_section = [
  {
    icon: 'MessageCircle',
    stat: 'พลาด',
    label: 'ทีมเข้าใจไม่ตรงกัน',
    desc: 'ผู้นำพูดแล้ว แต่ทีมทำคนละทิศ การสื่อสารขาดโครงสร้างและความชัดเจนในระดับที่นำไปปฏิบัติได้จริง ส่งผลให้งานผิดพลาดซ้ำและเสียเวลาแก้ปัญหาที่ป้องกันได้'
  },
  {
    icon: 'Zap',
    stat: 'อ่อน',
    label: 'ผู้นำขาดอิทธิพลในการพูด',
    desc: 'บางคนพูดแล้วคนฟัง บางคนพูดแล้วคนเงียบ ความแตกต่างไม่ได้อยู่ที่ตำแหน่ง แต่อยู่ที่ทักษะการสื่อสารที่สร้าง Presence ความน่าเชื่อถือ และแรงจูงใจในเวลาเดียวกัน'
  },
  {
    icon: 'Target',
    stat: 'หยุด',
    label: 'Feedback และ Coaching ไม่ได้ผล',
    desc: 'หัวหน้าไม่กล้าให้ Feedback ตรง หรือให้แล้วทีมรู้สึกถูกโจมตี ปัญหาซุกอยู่ใต้พรม วัฒนธรรมองค์กรไม่เติบโต และคนเก่งเลือกออกแทนที่จะพัฒนา'
  }
];

// ─── How Section ──────────────────────────────────────────────
const how_section = [
  {
    icon: 'Zap',
    title: 'Active Learning 70%',
    desc: 'ฝึกพูด ฝึกฟัง ฝึก Feedback แบบ Real-time ในทุกโมดูล ไม่นั่งฟังบรรยายอย่างเดียว'
  },
  {
    icon: 'Users',
    title: 'Role Play & Simulation',
    desc: 'ฝึกผ่านสถานการณ์จริงที่ผู้เข้าอบรมนำมาเอง ผิดพลาดได้อย่างปลอดภัยก่อนนำไปใช้จริง'
  },
  {
    icon: 'Target',
    title: 'Personal Communication Blueprint',
    desc: 'แต่ละคนออกแบบกรอบการสื่อสารส่วนตัวที่สอดคล้องกับสไตล์และบริบทองค์กรจริง'
  }
];

// ─── What Section ─────────────────────────────────────────────
const what_section = [
  { icon: 'MessageCircle', title: 'สื่อสารได้ชัด ตรงประเด็น และกระตุ้นการลงมือทำในทุกสถานการณ์' },
  { icon: 'Zap', title: 'สร้าง Presence และความน่าเชื่อถือในฐานะผู้นำที่คนอยากฟังและตาม' },
  { icon: 'Target', title: 'ให้ Feedback ที่สร้างสรรค์และนำ Difficult Conversations ได้อย่างมั่นใจ' },
  { icon: 'Users', title: 'ลดความเข้าใจผิดในทีม ลดงานซ้ำซ้อน และเพิ่มความไว้วางใจ' },
  { icon: 'Brain', title: 'มีกรอบการสื่อสารส่วนตัวที่ใช้ได้จริงในงานประจำวัน' }
];

// ─── Objectives / Modules ─────────────────────────────────────
const objectives = [
  {
    icon: 'Eye',
    title: 'Module 1 — Communication Awareness',
    desc: 'เข้าใจรูปแบบการสื่อสารของตัวเองผ่าน CAP Communication Profile\n\n- วิเคราะห์ช่องว่างระหว่าง "สิ่งที่ตั้งใจพูด" กับ "สิ่งที่คนได้ยิน"\n- ระบุพฤติกรรมการสื่อสารที่ส่งผลต่อความไว้วางใจของทีม\n- ค้นพบ Communication Blind Spot ของตัวเองในฐานะผู้นำ'
  },
  {
    icon: 'Layers',
    title: 'Module 2 — Structured Leadership Messaging',
    desc: 'เรียนรู้และฝึกใช้กรอบการสื่อสาร 3 ระดับ: Context — Content — Call to Action\n\n- ทุกการสื่อสาร ตั้งแต่การประชุม การ Briefing งาน ไปจนถึงอีเมล มีโครงสร้างที่ชัด\n- ฝึกพูดในเวลาจำกัดให้ครบและกระตุ้นการลงมือทำ\n- ออกแบบ Message ที่เหมาะกับผู้ฟังแต่ละกลุ่ม'
  },
  {
    icon: 'Zap',
    title: 'Module 3 — Influence Without Authority',
    desc: 'พัฒนาทักษะการสื่อสารเพื่อสร้างแรงจูงใจและความร่วมมือโดยไม่ต้องพึ่งอำนาจตำแหน่ง\n\n- Storytelling for Leaders — เล่าเรื่องที่ทำให้คนอยากตาม\n- Emotional Validation — รับรู้ความรู้สึกคนอื่นอย่างเป็นธรรมชาติ\n- ฝึกสร้าง Psychological Safety ในบทสนทนาประจำวัน'
  },
  {
    icon: 'MessageCircle',
    title: 'Module 4 — Feedback and Courageous Conversations',
    desc: 'ฝึกการให้และรับ Feedback อย่างตรงไปตรงมาในแบบที่สร้างการเติบโต ไม่ใช่ความขัดแย้ง\n\n- SBI Feedback Model — Situation / Behavior / Impact\n- การนำ Difficult Conversations ในสถานการณ์จริง\n- ฝึก: การแจ้งผลงาน การปรับพฤติกรรม การจัดการความขัดแย้งในทีม'
  },
  {
    icon: 'Target',
    title: 'Module 5 — Communication in Action',
    desc: 'Workshop สังเคราะห์ทักษะทั้งหมดผ่าน Role Play และ Simulation จากสถานการณ์จริง\n\n- ผู้เข้าอบรมนำ Case จริงจากองค์กรมาฝึก\n- Facilitator ให้ Feedback รายบุคคลแบบ Real-time\n- แต่ละคนสร้าง Personal Communication Blueprint พร้อมนำกลับไปใช้ในวันรุ่งขึ้น'
  }
];

// ─── Long Description ──────────────────────────────────────────
const long_description = `ผู้นำที่เก่งงานแต่สื่อสารไม่ชัด คือต้นทุนที่องค์กรจ่ายแพงที่สุด

หลักสูตรนี้ออกแบบมาเพื่อให้ผู้นำทุกระดับสื่อสารได้อย่างมีพลัง สร้างความเชื่อมั่น และนำทีมสู่เป้าหมายเดียวกันด้วยภาษาที่ทุกคนเข้าใจและลงมือได้ทันที

Leadership Communication for Impact สร้างขึ้นจาก CAP Theory และ Transformative Learning Design ไม่ใช่การนั่งฟังบรรยาย แต่คือประสบการณ์การเรียนรู้แบบ Active Learning ที่ผู้เข้าอบรมจะได้ฝึกพูด ฝึกฟัง รับ Feedback แบบ Real-time และออกแบบรูปแบบการสื่อสารของตัวเองที่สอดคล้องกับบุคลิกและบริบทองค์กรจริง

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- การประชุมสั้นลง แต่ได้ผลมากขึ้น เพราะทุกคนเข้าใจตรงกัน
- ทีมกล้าพูด กล้าเสนอ เพราะรู้สึกปลอดภัยในการสื่อสาร
- Feedback ที่เคยกลัวให้ กลายเป็นเครื่องมือที่ทีมรอรับและนำไปพัฒนาตัวเอง

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`;

// ─── Main Insert Function ──────────────────────────────────────
async function main() {
  console.log('Leadership Communication for Impact — Supabase Insert Script');
  console.log('=============================================================\n');

  // Check if course already exists
  const { data: existing } = await supabase
    .from('courses')
    .select('id, slug, title')
    .eq('slug', COURSE_SLUG)
    .maybeSingle();

  if (existing) {
    console.log(`Found existing course: ${existing.title} (${existing.id})`);
    console.log('Updating with full premium data...\n');

    const { error } = await supabase
      .from('courses')
      .update({
        title: 'Leadership Communication for Impact',
        description: 'สื่อสารแบบผู้นำ สร้างความเข้าใจ ขับเคลื่อนทีม และผลลัพธ์ที่วัดได้',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
        alt_text: 'หลักสูตร Leadership Communication for Impact - CAP Vision Institute',
        long_description,
        duration: 'In-house Training 1–2 วัน | Online / Hybrid | 20–50 คน',
        audience: 'CEO / MD, ผู้จัดการ / หัวหน้าทีม, HR & L&D, Talent & Future Leader',
        why_section,
        how_section,
        what_section,
        objectives,
      })
      .eq('slug', COURSE_SLUG);

    if (error) {
      console.error('Update error:', error.message);
      process.exit(1);
    }

    console.log('Update successful!');

  } else {
    console.log('Course not found. Inserting new record...\n');

    const { data: inserted, error } = await supabase
      .from('courses')
      .insert({
        slug: COURSE_SLUG,
        title: 'Leadership Communication for Impact',
        category: 'Communication Skills',
        description: 'สื่อสารแบบผู้นำ สร้างความเข้าใจ ขับเคลื่อนทีม และผลลัพธ์ที่วัดได้',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
        alt_text: 'หลักสูตร Leadership Communication for Impact - CAP Vision Institute',
        long_description,
        duration: 'In-house Training 1–2 วัน | Online / Hybrid | 20–50 คน',
        audience: 'CEO / MD, ผู้จัดการ / หัวหน้าทีม, HR & L&D, Talent & Future Leader',
        why_section,
        how_section,
        what_section,
        objectives,
      })
      .select('id, slug')
      .single();

    if (error) {
      console.error('Insert error:', error.message);
      process.exit(1);
    }

    console.log('Insert successful!');
    console.log('  id:', inserted.id);
    console.log('  slug:', inserted.slug);
  }

  console.log('\nSummary:');
  console.log('  why_section:', why_section.length, 'items');
  console.log('  how_section:', how_section.length, 'items');
  console.log('  what_section:', what_section.length, 'items');
  console.log('  objectives:', objectives.length, 'modules');
  console.log('  long_description: populated');
  console.log('\nCourse URL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
