import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const COURSE_SLUG = 'leading-with-purpose';

// ─── Why Section (แก้ stat emoji → text) ──────────────────────
const why_section = [
  {
    icon: 'Flame',
    stat: 'จม',
    label: 'ทีมทำงาน Routine ไร้พลัง',
    desc: 'ทีมทำงานตามหน้าที่แต่ขาดแรงขับเคลื่อนจากภายใน ทำซ้ำๆ โดยไม่เห็นคุณค่าของสิ่งที่ทำ ส่งผลให้ผลงานหยุดนิ่งและนวัตกรรมองค์กรไม่เกิดขึ้น'
  },
  {
    icon: 'Target',
    stat: 'ว่าง',
    label: 'พนักงานไม่รู้ว่าทำไปเพื่ออะไร',
    desc: 'เมื่อคนไม่เห็นความเชื่อมโยงระหว่างงานที่ทำกับเป้าหมายที่ใหญ่กว่า ความพยายามจะลดลงทันที งานกลายเป็นแค่การผ่านวัน ไม่ใช่การสร้างคุณค่า'
  },
  {
    icon: 'Users',
    stat: 'ต่ำ',
    label: 'Engagement ต่ำ Vision ไม่ถึงทีม',
    desc: 'ผู้นำสื่อสาร Vision แต่ทีมไม่อิน เพราะ Vision นั้นยังไม่ได้เชื่อมกับความหมายของแต่ละคน การ Align คนกับองค์กรต้องเริ่มจาก Purpose ส่วนบุคคล'
  }
];

// ─── How Section (ขยาย desc ให้ชัดขึ้น) ──────────────────────
const how_section = [
  {
    icon: 'Layers',
    title: 'Experiential Workshop',
    desc: 'เรียนรู้ผ่านการลงมือทำจริง 70% กิจกรรมที่ออกแบบให้สร้างประสบการณ์การค้นพบความหมายด้วยตัวเอง ไม่ใช่รับฟังจากวิทยากรเพียงอย่างเดียว'
  },
  {
    icon: 'Brain',
    title: 'Deep Reflection',
    desc: 'กระบวนการสะท้อนคิดที่นำผู้เข้าอบรมเข้าสู่ความเข้าใจตนเองอย่างลึกซึ้ง ผ่าน Guided Journaling และ Self-Inquiry ที่มีโครงสร้าง'
  },
  {
    icon: 'MessageCircle',
    title: 'Circle Dialogue',
    desc: 'วงสนทนาแบบ Generative ที่สร้างพื้นที่ให้ทุกคนแลกเปลี่ยนความหมายและค้นพบ Purpose ร่วมกัน เสริมสร้าง Psychological Safety ในทีม'
  },
  {
    icon: 'Zap',
    title: 'Purpose Storytelling',
    desc: 'ฝึกเล่า Purpose Story ของตัวเองและทีมอย่างทรงพลัง เพื่อสร้างแรงบันดาลใจให้คนอื่นเชื่อและอยากร่วมเดินทางด้วย'
  }
];

// ─── What Section (เพิ่ม desc ให้ชัด และปรับ icon ที่ไม่มีใน ICON_MAP) ──
const what_section = [
  { icon: 'Eye',     title: 'ค้นพบ Personal Purpose และคุณค่าที่แท้จริงที่ขับเคลื่อนตนเองจากภายใน' },
  { icon: 'Heart',   title: 'เชื่อมโยงงานประจำวันกับความหมายที่ใหญ่กว่า ทำให้ทุกงานมีคุณค่า' },
  { icon: 'Compass', title: 'สร้างและสื่อสาร Vision ที่ทีมเชื่อและอยากร่วมสร้างด้วยตนเอง' },
  { icon: 'Users',   title: 'Align Purpose ส่วนบุคคลกับเป้าหมายองค์กร สร้างทีมที่มี Passion ยั่งยืน' },
  { icon: 'Zap',     title: 'เล่า Purpose Story ที่จุดไฟแรงบันดาลใจให้ผู้อื่นได้อย่างมีพลัง' },
  { icon: 'Star',    title: 'ออกแบบ Leadership Identity ที่นำด้วยความหมาย ไม่ใช่อำนาจหรือตำแหน่ง' }
];

// ─── Objectives (เพิ่ม icon + ขยาย desc ให้ครบ) ───────────────
const objectives = [
  {
    icon: 'Eye',
    title: 'Module 1 — Self Purpose Discovery: ค้นพบความหมายจากภายใน',
    desc: 'ก่อนจะนำผู้อื่นด้วย Purpose ต้องรู้ Purpose ของตัวเองให้ชัดก่อน\n\n- ฉันทำงานไปเพื่ออะไร — คำถามที่เปลี่ยนทุกอย่าง\n- Ikigai Framework: จุดตัดระหว่างสิ่งที่รัก ถนัด โลกต้องการ และสร้างรายได้\n- Core Values Excavation — ขุดค้นคุณค่าที่แท้จริงที่ซ่อนอยู่ใต้พฤติกรรม\n- Peak Experience Mapping: เรียนรู้จากช่วงเวลาที่ดีที่สุดในชีวิตการทำงาน\n- Workshop: เขียน Personal Purpose Statement ที่ชัดและมีพลัง'
  },
  {
    icon: 'Heart',
    title: 'Module 2 — Work and Meaning Connection: เชื่อมงานกับความหมาย',
    desc: 'งานทุกชิ้นมีความหมาย ถ้าเรารู้วิธีมองมัน\n\n- Job Crafting — วิธีเปลี่ยนนิยามงานจาก Task สู่ Contribution\n- The Three Bricklayers Story: งานเดียวกัน ความหมายต่างกัน ผลลัพธ์ต่างกัน\n- เชื่อม Daily Task กับ Team Purpose และ Organizational Mission\n- Meaning in Difficult Times — รักษาความหมายในช่วงที่งานยากหรือกดดัน\n- Workshop: แต่ละคน Recraft งานของตัวเองให้มีความหมายขึ้น 3 ระดับ'
  },
  {
    icon: 'Compass',
    title: 'Module 3 — Purposeful Leadership: นำด้วยความหมาย ไม่ใช่อำนาจ',
    desc: 'ผู้นำที่นำด้วย Purpose สร้างแรงจูงใจที่ยั่งยืนกว่าการใช้รางวัลหรือการบังคับ\n\n- ความแตกต่างระหว่าง Positional Power กับ Purposeful Influence\n- Simon Sinek Golden Circle — เริ่มต้นจาก Why เสมอ\n- วิธีสร้างแรงจูงใจจากภายในที่ไม่ต้องพึ่งโบนัสหรือการลงโทษ\n- Servant Leadership — ผู้นำที่รับใช้เป้าหมายร่วมกันของทีม\n- Role Play: บทสนทนาที่เปลี่ยน "ต้องทำ" เป็น "อยากทำ"'
  },
  {
    icon: 'Zap',
    title: 'Module 4 — Vision Communication: สื่อสาร Vision ให้ทีมอิน',
    desc: 'Vision ที่ดีที่สุดก็ไม่มีความหมาย ถ้าสื่อสารออกมาไม่ถูกวิธี\n\n- Storytelling for Purpose — เล่าเรื่องที่ทำให้คนรู้สึกว่าตนเองเป็นส่วนหนึ่ง\n- Hero Journey Framework: วาง Team Vision ในรูปแบบที่ทีมเป็น Hero\n- The 3C Communication Model: Clarity / Connection / Call to Action\n- วิธีปรับ Vision Message ให้เหมาะกับผู้ฟังแต่ละประเภท\n- Workshop: แต่ละคนฝึกเล่า Purpose Story ของทีม รับ Feedback'
  },
  {
    icon: 'Users',
    title: 'Module 5 — Purpose-Driven Team: สร้างทีมที่ขับเคลื่อนด้วยความหมาย',
    desc: 'เมื่อทุกคนในทีมเห็นความหมายร่วมกัน พลังงานขององค์กรจะเปลี่ยนไปอย่างสิ้นเชิง\n\n- Team Purpose Co-Creation — สร้าง Team Purpose ร่วมกันที่ทุกคน Own\n- Alignment Check: ช่องว่างระหว่าง Personal Purpose กับ Team Purpose\n- Purpose Rituals — พิธีกรรมเล็กๆ ที่รักษาความหมายในชีวิตประจำวัน\n- Commitment Design: ออกแบบ Team Agreement ที่มาจาก Shared Purpose\n- Commitment Circle: แต่ละคนประกาศ 1 สิ่งที่จะทำแตกต่างจากวันนี้เป็นต้นไป'
  }
];

// ─── Long Description ──────────────────────────────────────────
const long_description = `เมื่อคนเห็นความหมาย เขาจะสร้างผลงานที่มีคุณค่า

ไม่มีองค์กรไหนประสบความสำเร็จระยะยาวด้วยทีมที่ทำงานเพราะต้องทำ ความแตกต่างระหว่างทีมธรรมดากับทีมที่ยอดเยี่ยมไม่ได้อยู่ที่ทักษะหรือประสบการณ์ แต่อยู่ที่ว่าทุกคนในทีมเห็นความหมายในสิ่งที่ทำหรือไม่

Leading with Purpose ออกแบบโดยใช้ CAP Facilitation Framework ที่ผสาน Positive Psychology, Purpose Theory และ Transformative Learning เข้าด้วยกัน เพื่อนำผู้นำและทีมผ่านกระบวนการค้นพบ เชื่อมโยง และสร้างพลังจาก Purpose จากภายในอย่างแท้จริง

---

#### ผลลัพธ์ที่องค์กรสัมผัสได้หลังผ่านหลักสูตร

- Engagement Score เพิ่มขึ้น เพราะทุกคนรู้ว่าทำไปเพื่ออะไร
- ทีมที่เคยเฉยชาเริ่ม Take Ownership และเสนอไอเดียด้วยตัวเอง
- ผู้นำสื่อสาร Vision ได้ชัดขึ้น และทีมตอบสนองด้วยความตั้งใจมากขึ้น

---

#### เหมาะสำหรับองค์กรที่

- กำลังผ่านการเปลี่ยนแปลงและต้องการ Re-align คนกับทิศทางใหม่
- มีปัญหา Engagement และต้องการแก้ที่ต้นเหตุ ไม่ใช่แค่ปลายเหตุ
- ต้องการสร้างวัฒนธรรมองค์กรที่ขับเคลื่อนด้วย Purpose อย่างยั่งยืน

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`;

// ─── Run Update ───────────────────────────────────────────────
async function main() {
  console.log('Leading with Purpose — Full Update');
  console.log('===================================\n');

  const { error } = await supabase
    .from('courses')
    .update({
      title:       'Leading with Purpose',
      category:    'Leader Skills',
      description: 'เปลี่ยนจากทีมที่ทำงานตามหน้าที่ สู่ทีมที่เข้าใจคุณค่า เชื่อในเป้าหมาย และอยากสร้างผลงานด้วยตนเอง',
      image:       'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      alt_text:    'หลักสูตร Leading with Purpose - CAP Vision Institute',
      duration:    'In-house Training 1–2 วัน | 20–50 คน',
      audience:    'ผู้บริหาร / CEO, ผู้จัดการ / หัวหน้าทีม, HR & OD, High Potential Leader',
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
  console.log('  title:            Leading with Purpose (simplified)');
  console.log('  image:            Unsplash URL (was local path)');
  console.log('  why_section:     ', why_section.length, 'items (emoji stat → text)');
  console.log('  how_section:     ', how_section.length, 'items (desc expanded)');
  console.log('  what_section:    ', what_section.length, 'items (Rocket icon fixed)');
  console.log('  objectives:      ', objectives.length, 'modules (added icon + full desc)');
  console.log('  long_description: populated (emoji removed)');
  console.log('\nURL: https://capvisionpartner.com/courses/' + COURSE_SLUG);
}

main();
