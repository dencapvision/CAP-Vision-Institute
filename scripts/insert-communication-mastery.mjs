import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── Course Identity ───────────────────────────────────────────
const COURSE_SLUG = 'communication-mastery';

// ─── Why Section ──────────────────────────────────────────────
const why_section = [
  {
    icon: 'AlertTriangle',
    stat: 'พลาด',
    label: 'งานสะดุดเพราะการสื่อสารกำกวม',
    desc: 'ข้อมูลที่ส่งออกไปไม่เคยถึงผู้รับแบบ 100% ก่อให้เกิดความเข้าใจผิด งานผิดพลาด และต้นทุนเวลาที่องค์กรต้องจ่ายเพียงเพราะ "พูดไม่เคลียร์"'
  },
  {
    icon: 'Zap',
    stat: 'ถอย',
    label: 'พูดเก่งแต่โน้มน้าวใจไม่ได้',
    desc: 'การมีข้อมูลที่ดียังไม่พอ หากขาดจิตวิทยาการจูงใจและการจัดโครงสร้าง Message ที่ทรงพลัง ผู้นำจะสูญเสียอิทธิพลในการขับเคลื่อนทีมและโปรเจกต์สำคัญ'
  },
  {
    icon: 'MessageSquare',
    stat: 'เสี่ยง',
    label: 'บทสนทนาที่ตึงเครียดทำลายความไว้วางใจ',
    desc: 'เมื่อต้องพูดเรื่องที่ยากหรือให้ Feedback ที่ตรงไปตรงมา หลายคนเลือกเงียบหรือพูดทำลายน้ำใจ ทำให้ความสัมพันธ์ในทีมพังทลายลงในระยะยาว'
  }
];

// ─── How Section ──────────────────────────────────────────────
const how_section = [
  {
    icon: 'Activity',
    title: 'Transformative Learning 70:30',
    desc: 'เน้นการฝึกปฏิบัติ (Experiential Learning) ผ่าน Role Play และ Simulation 70% และบรรยายเนื้อหาแก่นสำคัญ 30%'
  },
  {
    icon: 'Brain',
    title: 'CAP Communication Framework',
    desc: 'ใช้เครื่องมือวิเคราะห์สไตล์การสื่อสารระดับสากล เพื่อให้ผู้เข้าอบรมเห็นจุดบอด (Blind Spots) ของตัวเองได้ทันที'
  },
  {
    icon: 'Target',
    title: 'Customized Business Cases',
    desc: 'นำสถานการณ์จริงจากการทำงานของผู้เข้าอบรมมาใช้ในการฝึกซ้อม เพื่อให้มั่นใจว่าจบหลักสูตรแล้วนำไปใช้ได้พรุ่งนี้'
  }
];

// ─── What Section ─────────────────────────────────────────────
const what_section = [
  { icon: 'CheckCircle', title: 'สื่อสารได้อย่างเฉียบคม เคลียร์ และลดความเข้าใจผิดในทุกมิติ' },
  { icon: 'Zap', title: 'สร้าง Presence และความน่าเชื่อถือผ่านภาษากายและน้ำเสียงที่มีพลัง' },
  { icon: 'Users', title: 'โน้มน้าวใจผู้คนและสร้างความร่วมมือโดยไม่ต้องใช้การสั่งการ' },
  { icon: 'MessageCircle', title: 'จัดการ Conflict และ Conversations ที่ยากลำบากได้อย่างมืออาชีพ' },
  { icon: 'TrendingUp', title: 'ยกระดับวัฒนธรรมการสื่อสารในองค์กรให้เปิดกว้างและสร้างสรรค์' }
];

// ─── Objectives / Modules ─────────────────────────────────────
const objectives = [
  {
    icon: 'Eye',
    title: 'Module 1 — Psychology of Communication Excellence',
    desc: 'ทำความเข้าใจ "หน้าต่างการสื่อสาร" และจิตวิทยาเบื้องหลังพฤติกรรมมนุษย์\n\n- ค้นหา Communication Style ของตัวเองผ่าน CAP Profile\n- การสร้าง Rapport (ความผูกพัน) เชิงจิตวิทยาในเวลาจำกัด\n- ปรับจูนคลื่นความถี่การสื่อสารให้ตรงกับผู้รับสารแต่ละประเภท'
  },
  {
    icon: 'Layers',
    title: 'Module 2 — Precision Message Architecture',
    desc: 'ศิลปะการจัดระเบียบความคิดและการโครงสร้างการสื่อสารที่มีประสิทธิภาพสูงสุด\n\n- การใช้ Framework สื่อสาร 3 ระดับเพื่อความเฉียบคม\n- เปลี่ยน Data & Logical ให้เป็น Emotional Value ที่โดนใจ\n- ฝึกสรุปประเด็น (Executive Summary) ให้สั้น กระชับ แต่อรงพลัง'
  },
  {
    icon: 'UserCheck',
    title: 'Module 3 — Presence & Non-Verbal Mastery',
    desc: 'ยกระดับการสื่อสารที่มากกว่าคำพูด (Influence beyond words)\n\n- การใช้น้ำเสียง สุ้มเสียง และจังหวะจะโคนเพื่อตรึงใจผู้ฟัง\n- ภาษากาย (Body Language) ที่ส่งผลต่อความน่าเชื่อถือ\n- การสร้าง First Impression ในฐานะผู้นำมืออาชีพ'
  },
  {
    icon: 'HelpCircle',
    title: 'Module 4 — Active Listening & Empathy Art',
    desc: 'การฟังคืออาวุธลับของการสื่อสารชั้นเลิศ\n\n- พัฒนาทักษะ Deep Listening เพื่อได้ยินสิ่งที่ "ไม่ได้พูด"\n- การใช้เทคนิค Reflective Thinking เพื่อสร้างความเข้าอกเข้าใจ\n- ศิลปะการตั้งคำถามทรงพลัง (Powerful Questions) เพื่อขจัดปัญหาที่ต้นเหตุ'
  },
  {
    icon: 'Zap',
    title: 'Module 5 — Mastering Difficult Conversations',
    desc: 'ฝึกฝนทักษะการสื่อสารในภาวะวิกฤตและความขัดแย้ง\n\n- วิธีการให้ Feedback เชิงบวกที่เปลี่ยนคนได้จริง (SBI Model)\n- การรับมือกับคนที่มีสไตล์ต่างกันอย่างสุดขั้ว\n- Workshop: การเผชิญหน้ากับสถานการณ์ที่ยากลำบากที่สุดในการทำงาน'
  }
];

// ─── Long Description ──────────────────────────────────────────
const long_description = `ในยุคที่เทคโนโลยีมาแทนที่ทุกอย่าง "ทักษะการสื่อสารและการเชื่อมโยงกับมนุษย์" กลายเป็นทรัพย์สินที่มีค่าที่สุดของผู้นำ
\nหลักสูตร **Communication Mastery: สื่อสารอย่างมืออาชีพ** ออกแบบมาเพื่อให้ผู้เข้าอบรมก้าวข้ามขีดจำกัดของการสื่อสารแบบเดิมๆ สู่การเป็น Master ในการส่งต่อสารที่ทรงพลังและสร้างผลกระทบ (Impact) ต่อผู้คน
\nภายใต้ CAP Framework เราไม่ได้สอนแค่ "พูดอย่างไร" แต่เราเน้นให้คุณเข้าใจว่า "ทำไมคนถึงฟังคุณ" และคุณจะใช้อิทธิพลเหล่านั้นในการขับเคลื่อนความร่วมมือและเป้าหมายขององค์กรได้อย่างไร
\n---
\n#### สิ่งที่คุณจะได้รับจากหลักสูตรนี้:
- **Clarity Mastery**: ความสามารถในการสื่อสารที่ชัดเจนในทุกสถานการณ์
- **Influence & Persuasion**: จิตวิทยาการโน้มน้าวที่ทำให้คนอยากร่วมงานด้วย
- **Conflict Resolver**: ทักษะการเปลี่ยนความขัดแย้งให้เป็นโอกาสในการเติบโต
\n---
\n#### เหมาะสำหรับ:
ผู้นำทีม (Team Leaders), ผู้จัดการ (Managers), ฝ่ายขายและการตลาด (Sales & Marketing), และใครก็ตามที่ต้องทำงานร่วมกับผู้คนจำนวนมาก`;

// ─── Main Insert Function ──────────────────────────────────────
async function main() {
  console.log('Communication Mastery — Supabase Insert Script');
  console.log('===============================================\n');

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
        title: 'Communication Mastery: สื่อสารอย่างมืออาชีพ',
        category: 'Communication Skills',
        description: 'ยกระดับการสื่อสารเชิงจิตวิทยาเพื่อการโน้มน้าวใจ สร้างอิทธิพล และเปลี่ยนความขัดแย้งให้เป็นความร่วมมือที่ยั่งยืน',
        image: 'https://images.unsplash.com/photo-1557426272-fc759fbbad4e?auto=format&fit=crop&q=80&w=1200',
        alt_text: 'หลักสูตร Communication Mastery สื่อสารอย่างมืออาชีพ - CAP Vision Institute',
        long_description,
        duration: 'In-house Training 1–2 วัน | Workshop | 20–50 คน',
        audience: 'Team Leader, Manager, Talent, Sales, และผู้นำทุกระดับ',
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
        title: 'Communication Mastery: สื่อสารอย่างมืออาชีพ',
        category: 'Communication Skills',
        description: 'ยกระดับการสื่อสารเชิงจิตวิทยาเพื่อการโน้มน้าวใจ สร้างอิทธิพล และเปลี่ยนความขัดแย้งให้เป็นความร่วมมือที่ยั่งยืน',
        image: 'https://images.unsplash.com/photo-1557426272-fc759fbbad4e?auto=format&fit=crop&q=80&w=1200',
        alt_text: 'หลักสูตร Communication Mastery สื่อสารอย่างมืออาชีพ - CAP Vision Institute',
        long_description,
        duration: 'In-house Training 1–2 วัน | Workshop | 20–50 คน',
        audience: 'Team Leader, Manager, Talent, Sales, และผู้นำทุกระดับ',
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
  console.log('\nCourse URL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
