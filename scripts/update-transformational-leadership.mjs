import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZXBwdmpheXp4bGJsa2VhbnhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA3NjIwNywiZXhwIjoyMDg2NjUyMjA3fQ.F5vnxMcpf2Pieh-lgKx7dFLk0j2oUmT30qE2SENhcHY';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ---- Course data (matches the premium structure of all other courses) ----
const COURSE_SLUG = 'transformational-leadership';

const why_section = [
  {
    icon: 'Eye',
    stat: '100%',
    label: 'Self-Awareness',
    desc: 'ค้นพบ Core Identity และศักยภาพภายในของผู้นำแต่ละคน'
  },
  {
    icon: 'Flame',
    stat: 'จริง',
    label: 'Behavioral Change',
    desc: 'ออกแบบให้เกิดการเปลี่ยนแปลงพฤติกรรมจริง ไม่ใช่แค่ความรู้'
  },
  {
    icon: 'Users',
    stat: '+85%',
    label: 'Team Engagement',
    desc: 'ผู้นำที่เปลี่ยนแปลงส่งผลให้ทีมมี Ownership สูงขึ้น'
  },
  {
    icon: 'Star',
    stat: 'ยาวนาน',
    label: 'Sustainable Results',
    desc: 'สร้างผลลัพธ์ที่ยั่งยืนจากการเปลี่ยนแปลงจากภายใน'
  }
];

const how_section = [
  {
    icon: 'Zap',
    title: 'Workshop 70%',
    desc: 'Learning by Doing — เรียนรู้ผ่านการลงมือทำจริงทุกกิจกรรม'
  },
  {
    icon: 'MessageCircle',
    title: 'Reflection & Dialogue',
    desc: 'สะท้อนคิดเชิงลึกและ Circle Dialogue เรียนรู้ผ่านวงสนทนา'
  },
  {
    icon: 'Target',
    title: 'Real Case Application',
    desc: '"เรียนรู้ → ตกผลึก → ทดลองใช้ → เปลี่ยนจริง" Signature CAP Vision'
  }
];

const what_section = [
  { icon: 'Eye', title: 'เข้าใจสไตล์ผู้นำของตนเองและค้นพบ Core Identity (Self-Leadership)' },
  { icon: 'Brain', title: 'ปรับ Mindset จาก "ควบคุม" สู่ "สร้างแรงบันดาลใจ" ให้ทีม' },
  { icon: 'Compass', title: 'สร้าง Vision ที่ทีมเชื่อและอยากไปด้วย (Vision & Purpose)' },
  { icon: 'Users', title: 'สร้างทีมที่มี Engagement และ Ownership อย่างแท้จริง' },
  { icon: 'Flame', title: 'นำการเปลี่ยนแปลงในองค์กรได้จริง เปลี่ยน Resistance → Engagement' },
  { icon: 'MessageCircle', title: 'Facilitative Leadership — ตั้งคำถามทรงพลัง + Team Facilitation' }
];

const objectives = [
  {
    icon: 'Eye',
    title: 'Module 1: Self-Leadership',
    desc: 'CAP Theory ค้นพบตัวตนผู้นำ + Reflection จุดแข็ง / Blind Spot\n- ทดสอบสไตล์ผู้นำผ่าน C.O.D.E Assessment\n- ระบุ Leadership Identity ของตนเอง\n- เห็นจุดแข็งและ Blind Spot ที่ส่งผลต่อทีม'
  },
  {
    icon: 'Brain',
    title: 'Module 2: Leadership Mindset',
    desc: 'เปลี่ยนจาก Manager → Leader วิธีคิดที่สร้าง/จำกัดทีม\n- Fixed vs Growth Mindset ในการนำทีม\n- Language of Leadership — คำพูดที่เพิ่ม/ลด Engagement\n- Workshop: "ฉันเป็นผู้นำแบบไหน และฉันอยากเป็นแบบไหน?"'
  },
  {
    icon: 'Compass',
    title: 'Module 3: Vision & Purpose',
    desc: 'สร้าง Vision ที่มีพลัง + Alignment ระหว่างคนกับองค์กร\n- หลักการสร้าง Inspiring Vision ที่ทีมอยากไปด้วย\n- เชื่อม Personal Purpose กับ Team Purpose\n- กิจกรรม: เขียน Vision Statement ส่วนตัวและของทีม'
  },
  {
    icon: 'Users',
    title: 'Module 4: Leading People',
    desc: 'เข้าใจคน (Psychology + Behavior) + Motivation จากภายใน\n- 4 Drivers of Intrinsic Motivation\n- วิธีอ่านคนและปรับสไตล์การนำให้เหมาะกับแต่ละคน\n- Role Play: บทสนทนา One-on-One ที่เปลี่ยนพฤติกรรมทีม'
  },
  {
    icon: 'Flame',
    title: 'Module 5: Leading Change',
    desc: 'การนำการเปลี่ยนแปลง + รับมือแรงต้าน Resistance → Engagement\n- Change Curve Model — ทำไมคนต้านการเปลี่ยนแปลง\n- กลยุทธ์ Win Hearts Before Changing Minds\n- Case Study: สถานการณ์จริงในองค์กรไทย'
  },
  {
    icon: 'MessageCircle',
    title: 'Module 6: Facilitative Leadership',
    desc: 'การตั้งคำถามทรงพลัง + Circle Dialogue / Team Facilitation\n- Powerful Questions ที่สร้าง Insight และ Ownership\n- Circle Dialogue: พื้นที่ปลอดภัยสำหรับทีม\n- Action Plan: 3 สิ่งที่ฉันจะเปลี่ยนแปลงทันที'
  }
];

const long_description = `ผู้นำจำนวนมาก "เก่งงาน" แต่ไม่สามารถ "เปลี่ยนทีม" ได้จริง

เพราะสิ่งที่องค์กรต้องการวันนี้ไม่ใช่แค่คนที่บริหารงานได้ แต่คือผู้นำที่เปลี่ยนคน เปลี่ยนทีม และเปลี่ยนผลลัพธ์ได้

---

### ปัญหาที่ผู้นำหลายคนเผชิญ

- **สั่งงานได้ แต่ไม่ได้ใจคน** — ทีมทำงานเพราะต้องทำ ไม่ใช่เพราะอยากทำ
- **รู้ว่าต้องเปลี่ยน แต่ไม่รู้จะเริ่มจากตรงไหน** — การเปลี่ยนแปลงดูยิ่งใหญ่และน่ากลัว
- **ทีมไม่ Engage** — ขาด Ownership และแรงจูงใจจากภายใน
- **ผลลัพธ์ไม่ยั่งยืน** — แก้ที่ปลายเหตุ ไม่ได้เปลี่ยนจากรากฐาน

---

### หลักสูตรนี้จะพา Transformation คุณสู่

หลักสูตร Transformational Leadership ออกแบบให้ผู้นำเข้าใจ **"ตัวเอง"** อย่างลึก เห็น **"ศักยภาพของคน"** อย่างแท้จริง และสร้างการเปลี่ยนแปลงจากภายในสู่ภายนอก

**เมื่อผู้นำเปลี่ยน ทีมจะเปลี่ยน องค์กรจะเปลี่ยน**

---

### DFA Model — กระบวนการที่ CAP Vision ใช้

#### D — Dynamic Learning Design
ออกแบบกระบวนการเรียนรู้ที่ไม่ใช่แค่ Lecture แต่สร้าง Experience ที่เปลี่ยนแปลงได้จริง

#### F — FLOW State
สร้างบรรยากาศที่ผู้เข้าร่วมลื่นไหล สนุก และท้าทายในระดับที่พอดีกับการเติบโต

#### A — Art of Personal Growth
เน้นการเติบโตจากภายใน (Inside-out Transformation) ที่ยั่งยืนและเป็นธรรมชาติ`;

async function main() {
  console.log(`Updating course: ${COURSE_SLUG} ...`);

  // First, check current state
  const { data: existing, error: fetchError } = await supabase
    .from('courses')
    .select('id, slug, title, image, why_section, how_section, what_section, objectives')
    .eq('slug', COURSE_SLUG)
    .single();

  if (fetchError) {
    console.error('Fetch error:', fetchError.message);
    process.exit(1);
  }

  console.log('Current record:');
  console.log('  id:', existing.id);
  console.log('  title:', existing.title);
  console.log('  image:', existing.image);
  console.log('  why_section count:', existing.why_section?.length ?? 'null');
  console.log('  how_section count:', existing.how_section?.length ?? 'null');
  console.log('  what_section count:', existing.what_section?.length ?? 'null');
  console.log('  objectives count:', existing.objectives?.length ?? 'null');

  // Update with full premium data
  const { error: updateError } = await supabase
    .from('courses')
    .update({
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
      alt_text: 'หลักสูตร Transformational Leadership - พัฒนาผู้นำองค์กร CAP Vision Institute',
      long_description,
      duration: 'In-house Training 1–2 วัน | Online / Hybrid | 20–50 คน',
      audience: 'ผู้บริหาร / CEO, ผู้จัดการ / หัวหน้างาน, High Potential Leader',
      why_section,
      how_section,
      what_section,
      objectives,
    })
    .eq('slug', COURSE_SLUG);

  if (updateError) {
    console.error('Update error:', updateError.message);
    process.exit(1);
  }

  console.log('\nUpdate successful!');
  console.log('  why_section:', why_section.length, 'items');
  console.log('  how_section:', how_section.length, 'items');
  console.log('  what_section:', what_section.length, 'items');
  console.log('  objectives:', objectives.length, 'modules');
  console.log('  long_description: populated');
  console.log('\nCourse URL: https://capvisionpartner.com/courses/transformational-leadership');
}

main();
