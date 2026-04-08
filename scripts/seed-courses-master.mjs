/**
 * seed-courses-master.mjs
 * Master seed script สำหรับ 50 หลักสูตร CAP Vision Institute
 *
 * รัน: node scripts/seed-courses-master.mjs
 *
 * หมวด 1: Leader Skills       (15 หลักสูตร)
 * หมวด 2: People Skills       (10 หลักสูตร)
 * หมวด 3: Work Skills         (10 หลักสูตร)
 * หมวด 4: Communication Skills (15 หลักสูตร)
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { resolve } from 'path';

// ─── Env Loading ───────────────────────────────────────────────────
const envPathLocal = resolve(process.cwd(), '.env.local');
const envPath = resolve(process.cwd(), '.env');
const configPath = fs.existsSync(envPathLocal) ? envPathLocal : fs.existsSync(envPath) ? envPath : null;

if (configPath) {
  fs.readFileSync(configPath, 'utf-8')
    .split('\n')
    .forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    });
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Constants ─────────────────────────────────────────────────────
const INSTRUCTOR_ID = '5c27d651-5a5e-4001-9c83-55d8d224791f';

const IMAGES = {
  leadership:    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
  mindset:       'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200',
  purpose:       'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
  strategy:      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
  decision:      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=1200',
  adaptive:      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
  coaching:      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
  performance:   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
  presence:      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
  eq:            'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1200',
  change:        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
  communication: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
  innovation:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
  resilience:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
  roadmap:       'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?auto=format&fit=crop&q=80&w=1200',
  people:        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
  team:          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
  trust:         'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
  conflict:      'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=1200',
  empathy:       'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200',
  diversity:     'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
  motivation:    'https://images.unsplash.com/photo-1552664688-cf412ec27db2?auto=format&fit=crop&q=80&w=1200',
  relationship:  'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&q=80&w=1200',
  productivity:  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200',
  time:          'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1200',
  problem:       'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?auto=format&fit=crop&q=80&w=1200',
  creative:      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
  project:       'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1200',
  agile:         'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&q=80&w=1200',
  design:        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200',
  data:          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
  digital:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200',
  execution:     'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200',
  speaking:      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
  presentation:  'https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&q=80&w=1200',
  storytelling:  'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=1200',
  influence:     'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
  listening:     'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1200',
  difficult:     'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1200',
  feedback:      'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1200',
  nonverbal:     'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&q=80&w=1200',
  crossfunc:     'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200',
  alignment:     'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
  publicspeaking:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
  facilitation:  'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1200',
  meaningful:    'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&q=80&w=1200',
};

// ─── Course Data ───────────────────────────────────────────────────
const courses = [

  // ════════════════════════════════════════════════════════════════
  // หมวด 1: Leader Skills (15 หลักสูตร)
  // ════════════════════════════════════════════════════════════════

  {
    slug: 'transformational-leadership',
    title: 'Transformational Leadership',
    category: 'Leader Skills',
    description: 'ผู้นำเปลี่ยนองค์กรจากภายใน สร้างทีมที่มีพลังและเชื่อในทิศทางเดียวกัน',
    image: IMAGES.leadership,
    alt_text: 'หลักสูตร Transformational Leadership - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–50 คน',
    audience: 'CEO / MD, ผู้บริหารระดับสูง, ผู้จัดการ, HRD & OD',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'หยุด', label: 'ทีมขาดแรงขับเคลื่อนจากภายใน', desc: 'เมื่อผู้นำสั่งการด้วยอำนาจ ทีมทำงานเพราะต้องทำ ไม่ใช่อยากทำ แรงจูงใจหายไปพร้อมกับนวัตกรรมและความคิดสร้างสรรค์ขององค์กร' },
      { icon: 'Target', stat: 'ต่ำ', label: 'Engagement ไม่เชื่อมกับ Vision', desc: 'ทีมไม่รู้ว่าทิศทางองค์กรคืออะไร ทำงานไปวันๆ โดยไม่เห็นภาพรวม ความมุ่งมั่นจึงต่ำและเปลี่ยนงานบ่อย' },
      { icon: 'Users', stat: 'อ่อน', label: 'Culture ยังไม่สะท้อนค่านิยมจริง', desc: 'ค่านิยมองค์กรแปะบนผนัง แต่ไม่ได้ถูกปฏิบัติจริงในชีวิตประจำวัน เพราะผู้นำยังไม่ได้เปลี่ยนแปลงตัวเองก่อน' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Inner Transformation First', desc: 'เริ่มจากการเปลี่ยนแปลงภายในของผู้นำ ก่อนจะไปเปลี่ยนทีมและองค์กร ด้วย Deep Self-Inquiry' },
      { icon: 'Users', title: 'Circle Dialogue', desc: 'วงสนทนาที่สร้าง Psychological Safety ให้ทุกคนแสดงความจริงใจและสร้างความไว้วางใจร่วมกัน' },
      { icon: 'Zap', title: 'Transformative Learning Design', desc: 'กระบวนการเรียนรู้ที่เน้น Action Learning 70% เพื่อให้เกิดการเปลี่ยนแปลงพฤติกรรมจริง ไม่ใช่แค่ความรู้' }
    ],
    what_section: [
      { icon: 'Eye', title: 'เข้าใจความแตกต่างระหว่าง Transactional กับ Transformational Leadership' },
      { icon: 'Heart', title: 'พัฒนา Leadership Identity ที่นำจากคุณค่าภายใน ไม่ใช่จากอำนาจ' },
      { icon: 'Compass', title: 'สร้าง Compelling Vision ที่ทีมเชื่อและอยากร่วมสร้าง' },
      { icon: 'Users', title: 'สร้างวัฒนธรรมองค์กรที่ดึงดูดคนเก่งและรักษา Talent' },
      { icon: 'Zap', title: 'ออกแบบ Leadership Legacy ที่ส่งต่อได้ในระยะยาว' }
    ],
  },

  {
    slug: 'leadership-mindset-reset',
    title: 'Leadership Mindset Reset',
    category: 'Leader Skills',
    description: 'คิดแบบผู้นำในโลกยุคใหม่ ปรับ Mindset จาก Manager สู่ Leader ที่สร้างผลกระทบ',
    image: IMAGES.mindset,
    alt_text: 'หลักสูตร Leadership Mindset Reset - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, Supervisor, ผู้นำรุ่นใหม่',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'ติด', label: 'ยังคิดแบบ Expert ไม่ใช่ Leader', desc: 'ผู้นำหลายคนถูก Promote เพราะเก่งงาน แต่ยังติดกับดักการทำทุกอย่างเอง แทนที่จะ Empower ทีม ส่งผลให้ Bottleneck อยู่ที่ตัวเอง' },
      { icon: 'Target', stat: 'แคบ', label: 'มองแบบ Short-term ขาดมุมมองระยะยาว', desc: 'ผู้นำที่มีความคิดแบบ Reactive จะแก้ปัญหาเฉพาะหน้า แต่ไม่ได้สร้างระบบที่ป้องกันปัญหาในอนาคต' },
      { icon: 'Flame', stat: 'กลัว', label: 'กลัวความผิดพลาดจนไม่กล้าตัดสินใจ', desc: 'Mindset แบบ Fixed ทำให้ผู้นำกลัวล้มเหลว หลีกเลี่ยงความเสี่ยง และส่งผลให้องค์กรเติบโตช้ากว่าที่ควร' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Mindset Diagnostic', desc: 'วิเคราะห์ Leadership Mindset ของตัวเองผ่าน CAP Mindset Assessment เพื่อค้นหาจุดที่ต้องปรับ' },
      { icon: 'Zap', title: 'Belief System Rewiring', desc: 'เทคนิคการเปลี่ยน Limiting Beliefs เป็น Empowering Beliefs ที่นำไปใช้ได้ทันทีในชีวิตงาน' },
      { icon: 'Target', title: 'Action Commitment', desc: 'แต่ละคนออก Personal Mindset Reset Plan พร้อม Accountability Partner' }
    ],
    what_section: [
      { icon: 'Brain', title: 'ระบุ Limiting Beliefs ที่ขัดขวางการเป็นผู้นำที่มีประสิทธิภาพ' },
      { icon: 'Eye', title: 'เปลี่ยน Mindset จาก Reactive สู่ Proactive Leadership' },
      { icon: 'Zap', title: 'พัฒนา Growth Mindset ที่มองความท้าทายเป็นโอกาสเรียนรู้' },
      { icon: 'Target', title: 'สร้าง Leadership Habits ใหม่ที่เสริมประสิทธิภาพการนำทีม' },
      { icon: 'Compass', title: 'ออกแบบ Personal Development Plan สำหรับผู้นำยุคใหม่' }
    ],
  },

  {
    slug: 'leading-with-purpose',
    title: 'Leading with Purpose',
    category: 'Leader Skills',
    description: 'นำทีมด้วยความหมายและคุณค่า เปลี่ยนจากทีมที่ทำงานเพราะต้องทำ สู่ทีมที่ทำเพราะเชื่อ',
    image: IMAGES.purpose,
    alt_text: 'หลักสูตร Leading with Purpose - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–50 คน',
    audience: 'CEO / MD, ผู้จัดการ, HRD & OD, High Potential Leader',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'จม', label: 'ทีมทำงาน Routine ไร้พลัง', desc: 'ทีมทำงานตามหน้าที่แต่ขาดแรงขับเคลื่อนจากภายใน ทำซ้ำๆ โดยไม่เห็นคุณค่า ส่งผลให้ผลงานหยุดนิ่งและนวัตกรรมไม่เกิดขึ้น' },
      { icon: 'Target', stat: 'ว่าง', label: 'พนักงานไม่รู้ว่าทำไปเพื่ออะไร', desc: 'เมื่อคนไม่เห็นความเชื่อมโยงระหว่างงานกับเป้าหมายที่ใหญ่กว่า ความพยายามลดลงทันที งานกลายเป็นแค่การผ่านวัน' },
      { icon: 'Users', stat: 'ต่ำ', label: 'Engagement ต่ำ Vision ไม่ถึงทีม', desc: 'ผู้นำสื่อสาร Vision แต่ทีมไม่อิน เพราะ Vision นั้นยังไม่ได้เชื่อมกับความหมายของแต่ละคน' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Experiential Workshop', desc: 'เรียนรู้ผ่านการลงมือทำจริง 70% กิจกรรมที่สร้างประสบการณ์การค้นพบความหมายด้วยตัวเอง' },
      { icon: 'Brain', title: 'Deep Reflection', desc: 'กระบวนการสะท้อนคิดผ่าน Guided Journaling และ Self-Inquiry ที่มีโครงสร้าง' },
      { icon: 'MessageCircle', title: 'Circle Dialogue', desc: 'วงสนทนาแบบ Generative ที่สร้างพื้นที่ให้ทุกคนค้นพบ Purpose ร่วมกัน' }
    ],
    what_section: [
      { icon: 'Eye', title: 'ค้นพบ Personal Purpose ที่แท้จริงจากภายใน' },
      { icon: 'Heart', title: 'เชื่อมงานประจำวันกับความหมายที่ใหญ่กว่า' },
      { icon: 'Compass', title: 'สร้างและสื่อสาร Vision ที่ทีมเชื่อและอยากร่วมสร้าง' },
      { icon: 'Users', title: 'Align Purpose ส่วนบุคคลกับเป้าหมายองค์กร' },
      { icon: 'Zap', title: 'เล่า Purpose Story ที่จุดไฟแรงบันดาลใจให้ผู้อื่น' }
    ],
  },

  {
    slug: 'strategic-thinking-for-leaders',
    title: 'Strategic Thinking for Leaders',
    category: 'Leader Skills',
    description: 'คิดเชิงกลยุทธ์แบบผู้นำ มองภาพใหญ่ วิเคราะห์สถานการณ์ และวางแผนให้ได้เปรียบ',
    image: IMAGES.strategy,
    alt_text: 'หลักสูตร Strategic Thinking for Leaders - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 15–40 คน',
    audience: 'CEO / MD, ผู้บริหาร, ผู้จัดการระดับกลาง-สูง, Strategy Team',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ไม่มี', label: 'ผู้นำยุ่งกับงาน Operational จนไม่มีเวลาคิด Strategic', desc: 'ผู้นำใช้เวลา 80% กับการแก้ปัญหาเฉพาะหน้า เหลือเวลาน้อยมากในการคิดระยะยาว ทำให้องค์กรตามหลังคู่แข่งอยู่เสมอ' },
      { icon: 'Brain', stat: 'แคบ', label: 'วิเคราะห์แต่ข้อมูลภายใน ไม่มองบริบทภายนอก', desc: 'การตัดสินใจโดยอิงแค่ข้อมูลภายในองค์กรทำให้พลาดสัญญาณจากตลาด คู่แข่ง และการเปลี่ยนแปลงของโลก' },
      { icon: 'Flame', stat: 'หาย', label: 'กลยุทธ์มีแต่ไม่ถูก Execute จริง', desc: 'แผนกลยุทธ์ถูกสร้างในห้อง Workshop แต่ไม่ได้ถูก Cascade ลงสู่การปฏิบัติจริง เพราะขาดกระบวนการเชื่อมโยง' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Strategic Frameworks', desc: 'เรียนรู้เครื่องมือคิดเชิงกลยุทธ์จริง เช่น SWOT, Porter Five Forces, Blue Ocean, Scenario Planning' },
      { icon: 'Target', title: 'Real Case Workshop', desc: 'ฝึกวิเคราะห์กรณีศึกษาจากองค์กรจริงในอุตสาหกรรมที่เกี่ยวข้อง' },
      { icon: 'Zap', title: 'Strategy-to-Action Bridge', desc: 'เชื่อม Strategic Thinking กับ Execution Plan ที่ทีมนำไปปฏิบัติได้ทันที' }
    ],
    what_section: [
      { icon: 'Eye', title: 'มองภาพรวมและวิเคราะห์สภาพแวดล้อมองค์กรได้อย่างแม่นยำ' },
      { icon: 'Brain', title: 'ใช้ Strategic Frameworks ในการตัดสินใจและวางแผนได้จริง' },
      { icon: 'Target', title: 'แปลงกลยุทธ์เป็น Action Plan ที่ชัดและ Execute ได้' },
      { icon: 'Compass', title: 'สื่อสารกลยุทธ์ให้ทีมเข้าใจและ Align ได้อย่างมีประสิทธิภาพ' },
      { icon: 'Zap', title: 'พัฒนานิสัยการคิดเชิงกลยุทธ์ที่ใช้ได้ในชีวิตงานประจำวัน' }
    ],
  },

  {
    slug: 'decision-making-mastery',
    title: 'Decision Making Mastery',
    category: 'Leader Skills',
    description: 'ตัดสินใจแม่นยำในสถานการณ์กดดัน ด้วยกรอบคิดที่ชัดและเครื่องมือที่ใช้ได้จริง',
    image: IMAGES.decision,
    alt_text: 'หลักสูตร Decision Making Mastery - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้บริหาร, ผู้จัดการ, หัวหน้าทีม, Project Manager',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'ช้า', label: 'ตัดสินใจช้าเพราะกลัวผิดพลาด', desc: 'ผู้นำหลายคนลังเลในการตัดสินใจ โดยเฉพาะในภาวะไม่แน่นอน ทำให้ Opportunities หลุดมือและทีมขาดทิศทางที่ชัดเจน' },
      { icon: 'Target', stat: 'พลาด', label: 'ตัดสินใจด้วย Emotion ไม่ใช่ข้อมูล', desc: 'Cognitive Biases และ Emotional Triggers ทำให้การตัดสินใจบิดเบือนจากความเป็นจริง ส่งผลให้เสียโอกาสและทรัพยากร' },
      { icon: 'Flame', stat: 'หาย', label: 'ขาดกระบวนการตัดสินใจที่เป็นระบบ', desc: 'การตัดสินใจแบบ Ad-hoc โดยไม่มีกรอบที่ชัด ทำให้คุณภาพของการตัดสินใจไม่สม่ำเสมอและไม่สามารถเรียนรู้จากอดีตได้' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Decision Framework', desc: 'เรียนรู้ OODA Loop, Decision Matrix, Pre-mortem Analysis และเครื่องมือตัดสินใจอื่นๆ' },
      { icon: 'Eye', title: 'Bias Awareness Training', desc: 'ฝึกระบุและจัดการ Cognitive Biases ที่พบบ่อยในการตัดสินใจ เช่น Confirmation Bias, Sunk Cost Fallacy' },
      { icon: 'Zap', title: 'Pressure Simulation', desc: 'ฝึกตัดสินใจในสถานการณ์กดดันจำลอง เพื่อสร้างความมั่นใจและความรวดเร็วในการตัดสินใจ' }
    ],
    what_section: [
      { icon: 'Brain', title: 'ระบุ Cognitive Biases ที่บิดเบือนการตัดสินใจของตัวเอง' },
      { icon: 'Eye', title: 'ใช้ Decision Framework ที่เหมาะสมกับแต่ละสถานการณ์' },
      { icon: 'Target', title: 'ตัดสินใจได้อย่างรวดเร็วและมั่นใจแม้ในภาวะข้อมูลไม่สมบูรณ์' },
      { icon: 'Layers', title: 'สื่อสารเหตุผลการตัดสินใจให้ทีมเข้าใจและ Buy-in' },
      { icon: 'Zap', title: 'เรียนรู้จากการตัดสินใจที่ผ่านมาเพื่อพัฒนาคุณภาพในอนาคต' }
    ],
  },

  {
    slug: 'adaptive-leadership',
    title: 'Adaptive Leadership',
    category: 'Leader Skills',
    description: 'นำทีมในโลกที่เปลี่ยนเร็ว ปรับตัวได้ไว นำการเปลี่ยนแปลงอย่างมีกลยุทธ์',
    image: IMAGES.adaptive,
    alt_text: 'หลักสูตร Adaptive Leadership - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–50 คน',
    audience: 'CEO / MD, ผู้บริหาร, ผู้จัดการ, Change Agent',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'ช้า', label: 'องค์กรปรับตัวช้ากว่าการเปลี่ยนแปลงของโลก', desc: 'ในยุค VUCA โลกเปลี่ยนเร็วกว่าที่หลายองค์กรจะตามทัน ผู้นำที่ยึดติดกับสูตรเดิมจะนำทีมไปสู่ความล้าหลัง' },
      { icon: 'Target', stat: 'แข็ง', label: 'ผู้นำแข็งตัว ยึดแนวทางเดิมในสถานการณ์ใหม่', desc: 'Technical Solutions ที่เคยได้ผลอาจไม่ใช่คำตอบสำหรับ Adaptive Challenges ที่ต้องการการเปลี่ยนแปลงเชิงค่านิยมและพฤติกรรม' },
      { icon: 'Brain', stat: 'หนัก', label: 'ทีมต้านการเปลี่ยนแปลงเพราะขาดความเข้าใจ', desc: 'การเปลี่ยนแปลงที่ถูก Impose ลงมาจากบนลงล่างโดยไม่มีการ Engage ทีมมักถูกต้านและไม่ได้รับ Buy-in' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Adaptive Challenge Diagnosis', desc: 'ฝึกแยกแยะ Technical Problems ออกจาก Adaptive Challenges และเลือกวิธีรับมือที่เหมาะสม' },
      { icon: 'Users', title: 'Change Leadership Simulation', desc: 'จำลองสถานการณ์การเปลี่ยนแปลงจริง ฝึกการ Navigate Resistance และสร้าง Coalition' },
      { icon: 'Brain', title: 'Experimentation Mindset', desc: 'พัฒนาทักษะการทดลอง เรียนรู้จากความล้มเหลวอย่างรวดเร็ว และ Iterate' }
    ],
    what_section: [
      { icon: 'Eye', title: 'แยกแยะ Technical กับ Adaptive Challenges ได้อย่างแม่นยำ' },
      { icon: 'Brain', title: 'พัฒนา Adaptive Capacity ของตนเองและทีม' },
      { icon: 'Target', title: 'นำการเปลี่ยนแปลงโดยสร้าง Coalition และจัดการ Resistance' },
      { icon: 'Compass', title: 'ทดลองและเรียนรู้อย่างรวดเร็วในสภาวะที่ไม่แน่นอน' },
      { icon: 'Zap', title: 'สร้างองค์กรที่พร้อมรับมือกับการเปลี่ยนแปลงในอนาคต' }
    ],
  },

  {
    slug: 'coaching-leadership',
    title: 'Coaching Leadership',
    category: 'Leader Skills',
    description: 'ผู้นำสายโค้ช ดึงศักยภาพทีมออกมาด้วยคำถาม ไม่ใช่คำสั่ง',
    image: IMAGES.coaching,
    alt_text: 'หลักสูตร Coaching Leadership - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–30 คน',
    audience: 'CEO / MD, ผู้จัดการ, หัวหน้าทีม, HR & L&D',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'ไม่', label: 'ผู้นำสอนงานแต่ไม่ได้ดึงศักยภาพ', desc: 'ผู้นำส่วนใหญ่ยังใช้รูปแบบการบอกและสั่ง ทีมจึงรอคำสั่งแทนที่จะคิดเองและรับผิดชอบ' },
      { icon: 'Target', stat: 'สูญ', label: 'ทีมพึ่งพาหัวหน้าแก้ปัญหาทุกอย่าง', desc: 'เมื่อทีมนำปัญหามาให้หัวหน้าตัดสินใจทุกเรื่อง ผู้นำกลายเป็น Bottleneck และทีมไม่พัฒนาทักษะการแก้ปัญหาของตัวเอง' },
      { icon: 'Flame', stat: 'ขาด', label: 'Coaching Culture ยังไม่เกิดขึ้นจริงในองค์กร', desc: 'องค์กรลงทุนใน Coaching แต่ยังไม่เห็นผล เพราะผู้นำยังไม่ได้เปลี่ยนพฤติกรรมการสื่อสารในชีวิตประจำวัน' }
    ],
    how_section: [
      { icon: 'MessageCircle', title: 'Coaching Conversation Practice', desc: 'ฝึก Coaching Conversations จริงในกลุ่มเล็ก ด้วย GROW Model และ Powerful Questions' },
      { icon: 'Brain', title: 'Listening Mastery', desc: 'พัฒนา Level 3 Listening ที่ฟังเพื่อเข้าใจ ไม่ใช่ฟังเพื่อตอบ' },
      { icon: 'Users', title: 'Peer Coaching Lab', desc: 'ฝึกโค้ชเพื่อนร่วมกลุ่มในสถานการณ์จริง รับ Feedback แบบ Real-time' }
    ],
    what_section: [
      { icon: 'MessageCircle', title: 'ใช้ Powerful Questions เพื่อดึงความคิดและศักยภาพจากทีม' },
      { icon: 'Brain', title: 'ฟังอย่าง Active ในระดับที่สร้างความไว้วางใจ' },
      { icon: 'Target', title: 'ดำเนิน Coaching Session แบบ GROW ได้อย่างมีประสิทธิภาพ' },
      { icon: 'Users', title: 'สร้าง Coaching Culture ในทีมด้วยพฤติกรรมประจำวัน' },
      { icon: 'Zap', title: 'วัดผลและติดตาม Development ของทีมสมาชิกแต่ละคน' }
    ],
  },

  {
    slug: 'high-performance-leadership',
    title: 'High-Performance Leadership',
    category: 'Leader Skills',
    description: 'สร้างทีมผลงานระดับสูง ออกแบบระบบและวัฒนธรรมที่ขับเคลื่อนผลลัพธ์ยอดเยี่ยม',
    image: IMAGES.performance,
    alt_text: 'หลักสูตร High-Performance Leadership - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–50 คน',
    audience: 'CEO / MD, ผู้บริหาร, ผู้จัดการ, Team Lead',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ต่ำ', label: 'ทีมทำงานได้แต่ผลลัพธ์ยังไม่ถึงศักยภาพจริง', desc: 'หลายทีมทำงานขยัน แต่ผลลัพธ์ยังห่างจาก High Performance เพราะขาดทิศทางที่ชัด ระบบที่ดี และแรงจูงใจที่ถูกต้อง' },
      { icon: 'Flame', stat: 'หาย', label: 'คนเก่งไม่อยากอยู่เพราะไม่เห็น Growth', desc: 'Talent ที่ดีที่สุดมักออกจากองค์กรที่ไม่มีเส้นทางการเติบโตชัดเจน และไม่มีวัฒนธรรมที่ดึงดูดคนมีศักยภาพ' },
      { icon: 'Brain', stat: 'อ่อน', label: 'ขาดระบบวัดผลและ Feedback ที่ทำให้ทีมพัฒนา', desc: 'โดยไม่มีระบบ Performance Management ที่ดี ทีมไม่รู้ว่าตัวเองทำได้ดีแค่ไหน และควรพัฒนาอะไรต่อ' }
    ],
    how_section: [
      { icon: 'Target', title: 'OKR & Goal Alignment', desc: 'ออกแบบระบบ OKR ที่เชื่อม Individual Goals กับ Team และ Organizational Goals' },
      { icon: 'Layers', title: 'Performance System Design', desc: 'สร้าง Feedback Loop ที่ทำให้ทีมรู้สถานะของตัวเองและพัฒนาอย่างต่อเนื่อง' },
      { icon: 'Zap', title: 'High-Performance Culture Blueprint', desc: 'ออกแบบวัฒนธรรมองค์กรที่ดึงดูดคนเก่ง สร้างผลลัพธ์ และรักษา Talent ได้' }
    ],
    what_section: [
      { icon: 'Target', title: 'ออกแบบ Goal System ที่ชัดและ Align ทั้งทีมได้' },
      { icon: 'Layers', title: 'สร้างระบบ Performance Review ที่สร้างการพัฒนา ไม่ใช่แค่การประเมิน' },
      { icon: 'Flame', title: 'พัฒนาวัฒนธรรมทีมที่ขับเคลื่อนด้วย Excellence' },
      { icon: 'Users', title: 'ดึงศักยภาพสูงสุดของแต่ละคนออกมาอย่างเป็นระบบ' },
      { icon: 'Zap', title: 'รักษา Momentum และ Engagement ของทีมในระยะยาว' }
    ],
  },

  {
    slug: 'leadership-presence-and-influence',
    title: 'Leadership Presence & Influence',
    category: 'Leader Skills',
    description: 'ภาวะผู้นำที่ทรงพลัง สร้างอิทธิพลและความน่าเชื่อถือโดยไม่ต้องพึ่งตำแหน่ง',
    image: IMAGES.presence,
    alt_text: 'หลักสูตร Leadership Presence & Influence - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'CEO / MD, ผู้บริหาร, ผู้จัดการ, Future Leader',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'ขาด', label: 'ผู้นำที่ขาด Presence ทำให้ทีมไม่ Follow', desc: 'บางคนมีตำแหน่งแต่ไม่มี Presence คนไม่ฟัง ไม่ Follow ทำให้การนำทีมต้องพึ่งพาอำนาจมากกว่าแรงบันดาลใจ' },
      { icon: 'Target', stat: 'อ่อน', label: 'ขาดทักษะ Influence ที่ไม่ต้องใช้ Authority', desc: 'ในโลกที่ Matrix Organization เพิ่มขึ้น การ Influence ผู้ที่ไม่ได้รายงานตรงกลายเป็นทักษะสำคัญที่หลายผู้นำขาด' },
      { icon: 'Brain', stat: 'ไม่', label: 'ยังสร้าง Executive Presence ไม่ได้', desc: 'ผู้นำที่มีความสามารถแต่ยังสื่อสารและแสดงออกแบบ Mid-level Manager จะถูกมองข้ามเมื่อองค์กรต้องการผู้นำระดับสูง' }
    ],
    how_section: [
      { icon: 'Eye', title: 'Presence Audit', desc: 'ประเมิน Leadership Presence ของตนเองผ่าน Video Feedback และ Peer Assessment' },
      { icon: 'Brain', title: 'Influence Strategies', desc: 'เรียนรู้ 6 Principles of Influence ของ Cialdini และวิธีประยุกต์ใช้ในบริบทองค์กร' },
      { icon: 'Zap', title: 'Body Language Mastery', desc: 'ฝึก Nonverbal Communication ที่สร้าง Credibility, Warmth, และ Authority พร้อมกัน' }
    ],
    what_section: [
      { icon: 'Eye', title: 'สร้าง Executive Presence ที่ทำให้คนให้ความสนใจและเชื่อถือ' },
      { icon: 'Brain', title: 'ใช้ Influence Strategies ที่เหมาะกับบริบทและผู้คนที่แตกต่างกัน' },
      { icon: 'Zap', title: 'สื่อสาร Nonverbally ด้วยความมั่นใจและความน่าเชื่อถือ' },
      { icon: 'MessageCircle', title: 'สร้าง Network และ Coalition ที่สนับสนุนเป้าหมายของตน' },
      { icon: 'Star', title: 'พัฒนา Personal Brand ในฐานะผู้นำที่มีอิทธิพลในองค์กร' }
    ],
  },

  {
    slug: 'emotional-intelligence-for-leaders',
    title: 'Emotional Intelligence for Leaders',
    category: 'Leader Skills',
    description: 'EQ ผู้นำยุคใหม่ รู้จักและจัดการอารมณ์ตัวเองและทีมเพื่อผลลัพธ์ที่ดีกว่า',
    image: IMAGES.eq,
    alt_text: 'หลักสูตร Emotional Intelligence for Leaders - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'CEO / MD, ผู้จัดการ, หัวหน้าทีม, HR & L&D',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Heart', stat: 'ต่ำ', label: 'EQ ต่ำทำให้ความสัมพันธ์ในทีมพัง', desc: 'ผู้นำที่ขาด EQ มักปฏิกิริยาต่อความกดดันแบบ Reactive ส่งผลต่อบรรยากาศทีมและทำให้คนดีๆ เลือกออก' },
      { icon: 'Brain', stat: 'ขาด', label: 'Self-Awareness ต่ำทำให้ Blind Spots ขยายใหญ่', desc: 'ผู้นำที่ไม่รู้จักอารมณ์ตัวเองจะมี Leadership Blind Spots ที่ส่งผลต่อคนอื่นโดยไม่รู้ตัว' },
      { icon: 'Target', stat: 'พลาด', label: 'ตัดสินใจจาก Emotion ไม่ใช่ความเป็นจริง', desc: 'อารมณ์ที่ไม่ได้รับการจัดการจะบิดเบือนการตัดสินใจ ทำให้ผู้นำเลือกสิ่งที่รู้สึกดีมากกว่าสิ่งที่ถูกต้อง' }
    ],
    how_section: [
      { icon: 'Heart', title: 'EQ Assessment & Debrief', desc: 'ประเมิน EQ ผ่าน EQ-i Framework พร้อม Personal Debrief กับ Facilitator' },
      { icon: 'Brain', title: 'Emotion Regulation Techniques', desc: 'เรียนรู้เทคนิคจัดการอารมณ์ในสถานการณ์กดดัน เช่น Mindful Pause, Reframing, STOPP Technique' },
      { icon: 'Users', title: 'Empathy Practice Lab', desc: 'ฝึก Empathic Listening และ Perspective-Taking ในกลุ่มเล็กผ่าน Role-play' }
    ],
    what_section: [
      { icon: 'Heart', title: 'รู้จักและจัดการอารมณ์ของตัวเองในสถานการณ์กดดัน' },
      { icon: 'Brain', title: 'อ่านอารมณ์และความต้องการของผู้อื่นได้อย่างแม่นยำ' },
      { icon: 'Users', title: 'สร้างความสัมพันธ์ที่แน่นแฟ้นและไว้วางใจได้กับทีม' },
      { icon: 'Eye', title: 'นำทีมผ่านสถานการณ์ยากด้วยความสงบและชัดเจน' },
      { icon: 'Zap', title: 'สร้างบรรยากาศทีมที่ Psychologically Safe และสร้างสรรค์' }
    ],
  },

  {
    slug: 'change-leadership',
    title: 'Change Leadership',
    category: 'Leader Skills',
    description: 'นำการเปลี่ยนแปลงอย่างมีพลัง สร้าง Buy-in และ Execute การเปลี่ยนแปลงที่ได้ผลจริง',
    image: IMAGES.change,
    alt_text: 'หลักสูตร Change Leadership - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–50 คน',
    audience: 'CEO / MD, ผู้บริหาร, Change Agent, HR & OD',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'ล้ม', label: '70% ของโครงการเปลี่ยนแปลงล้มเหลว', desc: 'สถิติชี้ว่าการเปลี่ยนแปลงส่วนใหญ่ล้มเหลวไม่ใช่เพราะกลยุทธ์แย่ แต่เพราะคนไม่ได้รับการ Engage และไม่ Buy-in กับการเปลี่ยนแปลง' },
      { icon: 'Target', stat: 'ต้าน', label: 'ทีมต้านการเปลี่ยนแปลงอย่างเงียบๆ', desc: 'Resistance ไม่ได้แสดงออกมาตรงๆ เสมอไป บ่อยครั้งมาในรูปแบบของการเฉื่อยชา ข้อแก้ตัว และการทำงานแบบเดิม' },
      { icon: 'Brain', stat: 'ขาด', label: 'ขาดกระบวนการ Change Management ที่เป็นระบบ', desc: 'การเปลี่ยนแปลงที่ขาด Roadmap ที่ชัด ทำให้ทีมสับสน ขาดความมั่นใจ และไม่รู้ว่าตัวเองต้องทำอะไร' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Change Management Models', desc: 'เรียนรู้ Kotter 8-Step, ADKAR, และ Prosci Framework เพื่อวางแผนการเปลี่ยนแปลงอย่างเป็นระบบ' },
      { icon: 'Users', title: 'Resistance Management', desc: 'ฝึกเทคนิคระบุและจัดการ Resistance ทุกรูปแบบ ทั้ง Active และ Passive' },
      { icon: 'Zap', title: 'Change Communication Strategy', desc: 'ออกแบบ Communication Plan ที่สร้าง Awareness, Desire, Knowledge, Ability, Reinforcement' }
    ],
    what_section: [
      { icon: 'Eye', title: 'วิเคราะห์ Change Readiness ของทีมและองค์กร' },
      { icon: 'Layers', title: 'ออกแบบ Change Roadmap ที่มีโอกาสสำเร็จสูง' },
      { icon: 'Users', title: 'สร้าง Change Coalition ที่ขับเคลื่อนการเปลี่ยนแปลงจากทุกระดับ' },
      { icon: 'MessageCircle', title: 'สื่อสารการเปลี่ยนแปลงอย่างโปร่งใสและสร้างความมั่นใจ' },
      { icon: 'Zap', title: 'ยึดการเปลี่ยนแปลงไว้ให้ Sustain ในระยะยาว' }
    ],
  },

  {
    slug: 'leadership-communication-for-impact',
    title: 'Leadership Communication for Impact',
    category: 'Leader Skills',
    description: 'สื่อสารแบบผู้นำ สร้างความเข้าใจ ขับเคลื่อนทีม และผลลัพธ์ที่วัดได้',
    image: IMAGES.communication,
    alt_text: 'หลักสูตร Leadership Communication for Impact - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–50 คน',
    audience: 'CEO / MD, ผู้จัดการ / หัวหน้าทีม, HR & L&D, Talent & Future Leader',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'MessageCircle', stat: 'พลาด', label: 'ทีมเข้าใจไม่ตรงกัน', desc: 'ผู้นำพูดแล้ว แต่ทีมทำคนละทิศ การสื่อสารขาดโครงสร้างและความชัดเจนในระดับที่นำไปปฏิบัติได้จริง' },
      { icon: 'Zap', stat: 'อ่อน', label: 'ผู้นำขาดอิทธิพลในการพูด', desc: 'บางคนพูดแล้วคนฟัง บางคนพูดแล้วคนเงียบ ความแตกต่างอยู่ที่ทักษะการสื่อสารที่สร้าง Presence และแรงจูงใจ' },
      { icon: 'Target', stat: 'หยุด', label: 'Feedback และ Coaching ไม่ได้ผล', desc: 'หัวหน้าไม่กล้าให้ Feedback ตรง หรือให้แล้วทีมรู้สึกถูกโจมตี ปัญหาซุกอยู่ใต้พรม วัฒนธรรมไม่เติบโต' }
    ],
    how_section: [
      { icon: 'Zap', title: 'Active Learning 70%', desc: 'ฝึกพูด ฝึกฟัง ฝึก Feedback แบบ Real-time ในทุกโมดูล ไม่นั่งฟังบรรยายอย่างเดียว' },
      { icon: 'Users', title: 'Role Play & Simulation', desc: 'ฝึกผ่านสถานการณ์จริงที่ผู้เข้าอบรมนำมาเอง ผิดพลาดได้อย่างปลอดภัยก่อนนำไปใช้จริง' },
      { icon: 'Target', title: 'Personal Communication Blueprint', desc: 'แต่ละคนออกแบบกรอบการสื่อสารส่วนตัวที่สอดคล้องกับสไตล์และบริบทองค์กรจริง' }
    ],
    what_section: [
      { icon: 'MessageCircle', title: 'สื่อสารได้ชัด ตรงประเด็น และกระตุ้นการลงมือทำ' },
      { icon: 'Zap', title: 'สร้าง Presence และความน่าเชื่อถือในฐานะผู้นำ' },
      { icon: 'Target', title: 'ให้ Feedback ที่สร้างสรรค์และนำ Difficult Conversations ได้' },
      { icon: 'Users', title: 'ลดความเข้าใจผิดในทีมและเพิ่มความไว้วางใจ' },
      { icon: 'Brain', title: 'มีกรอบการสื่อสารส่วนตัวที่ใช้ได้จริงในงานประจำวัน' }
    ],
  },

  {
    slug: 'leading-innovation-and-creativity',
    title: 'Leading Innovation & Creativity',
    category: 'Leader Skills',
    description: 'ผู้นำสร้างนวัตกรรม สร้างสภาพแวดล้อมที่ความคิดสร้างสรรค์เบ่งบาน',
    image: IMAGES.innovation,
    alt_text: 'หลักสูตร Leading Innovation & Creativity - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'CEO / MD, ผู้บริหาร, Product / Innovation Team, HRD',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'หยุด', label: 'องค์กรขาดนวัตกรรมเพราะกลัวความล้มเหลว', desc: 'วัฒนธรรมที่ลงโทษความผิดพลาดทำให้คนกลัวเสนอไอเดียใหม่ นวัตกรรมจึงหยุดนิ่ง และองค์กรถูกแซงหน้าโดยคู่แข่ง' },
      { icon: 'Brain', stat: 'ติด', label: 'ทีมคิดแบบเดิมวนซ้ำ ไม่มีมุมมองใหม่', desc: 'เมื่อทีมทำงานด้วย Routine เดิมๆ ความคิดสร้างสรรค์ลดลง ทำให้ขาด Solutions ที่แปลกใหม่และมีคุณค่า' },
      { icon: 'Target', stat: 'ไม่', label: 'ผู้นำยังไม่รู้วิธีสร้าง Innovation Culture', desc: 'การมีไอเดียดีอย่างเดียวไม่พอ ผู้นำต้องรู้วิธีสร้างระบบและวัฒนธรรมที่ทำให้นวัตกรรมเกิดขึ้นได้อย่างต่อเนื่อง' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Design Thinking Process', desc: 'ฝึกกระบวนการ Design Thinking 5 ขั้น จาก Empathize ถึง Test กับโจทย์จริงขององค์กร' },
      { icon: 'Brain', title: 'Creative Techniques Toolkit', desc: 'เรียนรู้เครื่องมือกระตุ้นความคิดสร้างสรรค์ เช่น SCAMPER, Random Stimulus, Reverse Brainstorming' },
      { icon: 'Users', title: 'Innovation Culture Design', desc: 'ออกแบบ Practices และ Rituals ที่สร้าง Innovation Culture ในทีมและองค์กร' }
    ],
    what_section: [
      { icon: 'Brain', title: 'สร้างบรรยากาศที่ความคิดสร้างสรรค์เบ่งบานได้' },
      { icon: 'Layers', title: 'ใช้ Design Thinking ในการแก้ปัญหาและสร้างนวัตกรรม' },
      { icon: 'Target', title: 'ออกแบบ Innovation Process ที่เป็นระบบ' },
      { icon: 'Users', title: 'สร้าง Cross-functional Collaboration เพื่อนวัตกรรม' },
      { icon: 'Zap', title: 'นำ Innovation Project จาก Idea ถึง Implementation' }
    ],
  },

  {
    slug: 'resilient-leadership',
    title: 'Resilient Leadership',
    category: 'Leader Skills',
    description: 'ผู้นำที่แข็งแกร่งในวิกฤต ฟื้นตัวเร็ว นำทีมผ่านความยากลำบากด้วยพลัง',
    image: IMAGES.resilience,
    alt_text: 'หลักสูตร Resilient Leadership - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'CEO / MD, ผู้บริหาร, ผู้จัดการ, ทุกคนที่เผชิญความกดดัน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'ล้ม', label: 'วิกฤตทำให้ผู้นำสูญเสียความมั่นใจ', desc: 'เมื่อเผชิญกับ Crisis หรือความล้มเหลว ผู้นำบางคนสูญเสียทิศทาง กลายเป็น Victim Mindset และไม่สามารถนำทีมได้อย่างมีประสิทธิภาพ' },
      { icon: 'Target', stat: 'ยาก', label: 'Burnout ระบาดในหมู่ผู้นำยุคใหม่', desc: 'ผู้นำถูก Expect ให้แข็งแกร่งตลอดเวลา แต่ไม่ได้รับเครื่องมือในการดูแลพลังงานและ Resilience ของตัวเอง' },
      { icon: 'Brain', stat: 'หาย', label: 'ขาดทักษะนำทีมผ่านความไม่แน่นอน', desc: 'ในสถานการณ์ที่ไม่แน่นอน ทีมต้องการผู้นำที่มั่นคงและชัดเจน แต่ผู้นำที่ขาด Resilience จะแพร่ความกังวลแทนที่จะสร้างความมั่นใจ' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Resilience Assessment', desc: 'ประเมิน Resilience Profile ของตัวเองผ่าน CAP Resilience Framework' },
      { icon: 'Brain', title: 'Stress Management & Recovery', desc: 'เรียนรู้เทคนิคการจัดการ Stress และฟื้นตัวจากความกดดันอย่างรวดเร็ว' },
      { icon: 'Compass', title: 'Post-Traumatic Growth', desc: 'แปลงประสบการณ์วิกฤตเป็นบทเรียนที่ทำให้เข้มแข็งขึ้นและเป็นแรงบันดาลใจให้ทีม' }
    ],
    what_section: [
      { icon: 'Heart', title: 'เข้าใจและจัดการ Stress ของตัวเองได้อย่างมีประสิทธิภาพ' },
      { icon: 'Brain', title: 'ฟื้นตัวจากความล้มเหลวและวิกฤตได้เร็วกว่าเดิม' },
      { icon: 'Flame', title: 'นำทีมผ่านช่วงยากด้วยความมั่นคงและความชัดเจน' },
      { icon: 'Target', title: 'สร้าง Resilient Culture ในทีมที่รับมือกับการเปลี่ยนแปลงได้ดี' },
      { icon: 'Zap', title: 'ใช้วิกฤตเป็นโอกาสในการเติบโตและสร้างความเข้มแข็ง' }
    ],
  },

  {
    slug: 'leadership-roadmap',
    title: 'Leadership Roadmap',
    category: 'Leader Skills',
    description: 'ออกแบบเส้นทางผู้นำองค์กร จาก Potential Leader สู่ Strategic Leader อย่างมีแบบแผน',
    image: IMAGES.roadmap,
    alt_text: 'หลักสูตร Leadership Roadmap - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 15–30 คน',
    audience: 'HRD & OD, CEO, ผู้บริหาร, Talent Management Team',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Compass', stat: 'ขาด', label: 'ไม่มีเส้นทางพัฒนาผู้นำที่ชัดเจน', desc: 'หลายองค์กรพัฒนาผู้นำแบบ Ad-hoc โดยไม่มี Roadmap ที่เป็นระบบ ทำให้การพัฒนาไม่ต่อเนื่องและขาดความสัมพันธ์กับเป้าหมายองค์กร' },
      { icon: 'Target', stat: 'สูญ', label: 'ลงทุนพัฒนาแล้วแต่ผู้นำยังไม่เติบโต', desc: 'เมื่อการพัฒนาผู้นำขาดทิศทางที่ชัด การลงทุนใน Training และ Coaching อาจไม่ตอบโจทย์ความต้องการจริงขององค์กร' },
      { icon: 'Brain', stat: 'ไม่', label: 'ไม่รู้ว่า Leader รุ่นต่อไปจะมาจากไหน', desc: 'โดยขาด Leadership Pipeline ที่ชัดเจน องค์กรจะขาดแคลนผู้นำเมื่อถึงเวลาที่ต้องการ ส่งผลต่อความต่อเนื่องทางธุรกิจ' }
    ],
    how_section: [
      { icon: 'Compass', title: 'Leadership Competency Framework', desc: 'ออกแบบกรอบสมรรถนะผู้นำที่สอดคล้องกับ Strategy และ Culture ขององค์กร' },
      { icon: 'Layers', title: 'Leadership Pipeline Design', desc: 'วางแผน Development Path สำหรับผู้นำแต่ละระดับ พร้อม Milestones และ Assessment' },
      { icon: 'Target', title: 'Succession Planning', desc: 'ระบุ Key Positions และ Potential Successors พร้อมแผนพัฒนาที่เป็นรูปธรรม' }
    ],
    what_section: [
      { icon: 'Compass', title: 'ออกแบบ Leadership Competency Framework ขององค์กร' },
      { icon: 'Layers', title: 'สร้าง Leadership Development Roadmap ที่เป็นระบบ' },
      { icon: 'Target', title: 'วางแผน Succession Planning อย่างมีประสิทธิภาพ' },
      { icon: 'Brain', title: 'เลือก Learning Interventions ที่เหมาะกับแต่ละระดับผู้นำ' },
      { icon: 'Zap', title: 'วัดผลการพัฒนาผู้นำด้วย KPIs ที่ชัดเจน' }
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // หมวด 2: People Skills (10 หลักสูตร)
  // ════════════════════════════════════════════════════════════════

  {
    slug: 'psychology-of-people',
    title: 'Psychology of People',
    category: 'People Skills',
    description: 'เข้าใจคน เข้าใจทีม วิทยาศาสตร์เบื้องหลังพฤติกรรมมนุษย์เพื่อทำงานร่วมกันได้ดีขึ้น',
    image: IMAGES.people,
    alt_text: 'หลักสูตร Psychology of People - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, HR, ทุกคนที่ทำงานกับคน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'ไม่', label: 'ยังไม่เข้าใจว่าทำไมคนถึงทำแบบนั้น', desc: 'เมื่อไม่เข้าใจ Motivation และ Behavior ของคน ผู้นำจะตีความผิดและตอบสนองไม่ตรงจุด ทำให้ความสัมพันธ์ในทีมแย่ลง' },
      { icon: 'Target', stat: 'พลาด', label: 'แรงจูงใจที่ใช้ไม่ได้ผลกับทุกคน', desc: 'คนแต่ละคนมี Intrinsic Motivators ที่แตกต่างกัน การใช้แรงจูงใจแบบเดียวกับทุกคนทำให้บางคนไม่ตอบสนอง' },
      { icon: 'Users', stat: 'ขาด', label: 'ทีมขาดการทำงานร่วมกันอย่างมีประสิทธิภาพ', desc: 'ความไม่เข้าใจในบุคลิกภาพและสไตล์การทำงานที่แตกต่างกัน ทำให้เกิดความขัดแย้งที่ไม่จำเป็น' }
    ],
    how_section: [
      { icon: 'Brain', title: 'People Profile Assessment', desc: 'วิเคราะห์ Personality Type และ Behavioral Style ผ่าน DISC หรือ MBTI' },
      { icon: 'Eye', title: 'Human Behavior Masterclass', desc: 'เรียนรู้ Psychology ที่อยู่เบื้องหลังพฤติกรรมมนุษย์ในบริบทองค์กร' },
      { icon: 'Users', title: 'Application Workshop', desc: 'ฝึกประยุกต์ใช้ความเข้าใจด้าน Psychology กับสถานการณ์จริงในการทำงาน' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าใจ Personality Types และ Behavioral Styles ที่แตกต่างกัน' },
      { icon: 'Eye', title: 'อ่านสัญญาณ Motivation และ Emotion ของคนรอบข้างได้แม่นยำ' },
      { icon: 'Target', title: 'ปรับ Communication Style ให้เหมาะกับแต่ละบุคลิก' },
      { icon: 'Users', title: 'ลดความขัดแย้งในทีมด้วยความเข้าใจที่ลึกขึ้น' },
      { icon: 'Heart', title: 'สร้างแรงจูงใจที่ตรงกับความต้องการรายบุคคล' }
    ],
  },

  {
    slug: 'team-synergy',
    title: 'Team Synergy',
    category: 'People Skills',
    description: 'สร้างทีมเวิร์กพลังสูง ดึงจุดแข็งแต่ละคนออกมาสร้างผลลัพธ์ที่มากกว่าผลรวม',
    image: IMAGES.team,
    alt_text: 'หลักสูตร Team Synergy - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 15–50 คน',
    audience: 'ทีมงาน, หัวหน้าทีม, ผู้จัดการ, HR & L&D',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Users', stat: 'แยก', label: 'ทีมทำงานแบบ Silo ไม่ประสานงานกัน', desc: 'เมื่อทีมแต่ละส่วนมุ่งแต่เป้าหมายของตัวเอง การส่งต่องาน การสื่อสาร และการแก้ปัญหาร่วมกันล้มเหลว' },
      { icon: 'Target', stat: 'สูญ', label: 'ไม่ได้ใช้จุดแข็งของทีมเต็มประสิทธิภาพ', desc: 'ทีมที่ไม่เข้าใจจุดแข็งและจุดอ่อนของกันและกัน จะไม่สามารถ Complement กันได้ ทำให้ผลลัพธ์น้อยกว่าที่ควร' },
      { icon: 'Flame', stat: 'ต่ำ', label: 'Morale ต่ำ ทีมไม่ Happy ที่จะทำงานร่วมกัน', desc: 'ทีมที่ขาด Connection ที่แท้จริง ขาด Psychological Safety และไม่ไว้วางใจกัน จะทำงานด้วยพลังงานต่ำ' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Team Dynamics Workshop', desc: 'กิจกรรมสร้าง Team Cohesion ที่ออกแบบให้ดึงศักยภาพ Synergy จากกลุ่ม' },
      { icon: 'Users', title: 'Strength Mapping', desc: 'ระบุจุดแข็งของแต่ละคนและออกแบบบทบาทที่เล่นจุดแข็งของทุกคนให้สูงสุด' },
      { icon: 'Brain', title: 'Team Agreement', desc: 'สร้าง Team Charter และ Working Agreement ที่ทุกคน Own' }
    ],
    what_section: [
      { icon: 'Users', title: 'สร้าง Team Identity ที่ทุกคนภูมิใจและ Belong' },
      { icon: 'Brain', title: 'ดึงจุดแข็งของแต่ละคนออกมาใช้ให้เต็มศักยภาพ' },
      { icon: 'Target', title: 'สร้าง Shared Goals ที่ทีมทุกคน Commit' },
      { icon: 'Zap', title: 'ทำงานร่วมกันได้อย่างลื่นไหลและมีประสิทธิภาพ' },
      { icon: 'Heart', title: 'สร้าง Trust และ Psychological Safety ในทีม' }
    ],
  },

  {
    slug: 'building-trust-in-team',
    title: 'Building Trust in Team',
    category: 'People Skills',
    description: 'สร้างความไว้วางใจในองค์กร รากฐานของทีมที่แข็งแกร่งและทำงานร่วมกันได้จริง',
    image: IMAGES.trust,
    alt_text: 'หลักสูตร Building Trust in Team - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'หัวหน้าทีม, ผู้จัดการ, ทีมงาน, HR & OD',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'พัง', label: 'ขาดความไว้วางใจทำให้ทุกอย่างช้าลง', desc: 'ทีมที่ขาด Trust ต้องใช้เวลาตรวจสอบ ขออนุมัติ และ Double-check ทุกอย่าง ทำให้ความเร็วและประสิทธิภาพลดลงอย่างมาก' },
      { icon: 'Brain', stat: 'หาย', label: 'คนไม่กล้าพูดความจริงในทีม', desc: 'เมื่อไม่มีความไว้วางใจ คนจะ Play Safe ไม่แสดงความเห็นที่แตกต่าง ทำให้สูญเสีย Diverse Perspectives และนวัตกรรม' },
      { icon: 'Flame', stat: 'ต่ำ', label: 'ความสัมพันธ์ในทีมตื้น ไม่มีความเชื่อมโยงจริง', desc: 'ทีมที่มีแค่ความสัมพันธ์แบบ Professional ไม่มี Human Connection จะขาด Resilience เมื่อเผชิญกับความยากลำบาก' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Trust Building Activities', desc: 'กิจกรรมที่ออกแบบให้สร้าง Connection ที่แท้จริงระหว่างสมาชิกในทีม' },
      { icon: 'MessageCircle', title: 'Vulnerability Leadership', desc: 'เรียนรู้วิธีแสดง Vulnerability อย่างมีกลยุทธ์เพื่อสร้าง Trust และเปิดพื้นที่ให้คนอื่นทำเช่นเดียวกัน' },
      { icon: 'Brain', title: 'Trust Recovery Process', desc: 'เรียนรู้วิธีฟื้นฟูความไว้วางใจเมื่อมันแตกสลาย ซึ่งเป็นทักษะที่ผู้นำทุกคนต้องมี' }
    ],
    what_section: [
      { icon: 'Heart', title: 'เข้าใจ Components ของความไว้วางใจและวิธีสร้าง' },
      { icon: 'Eye', title: 'แสดงพฤติกรรมที่สร้าง Trust ในทีมอย่างสม่ำเสมอ' },
      { icon: 'Brain', title: 'สร้าง Psychological Safety ที่ทำให้คนกล้าพูดความจริง' },
      { icon: 'Users', title: 'ฟื้นฟูความไว้วางใจเมื่อเกิดความขัดแย้งหรือความผิดพลาด' },
      { icon: 'Target', title: 'รักษา Trust ในระยะยาวด้วยความสม่ำเสมอและความซื่อสัตย์' }
    ],
  },

  {
    slug: 'conflict-to-collaboration',
    title: 'Conflict to Collaboration',
    category: 'People Skills',
    description: 'เปลี่ยนความขัดแย้งเป็นพลัง ใช้ความแตกต่างเป็นเชื้อเพลิงสำหรับนวัตกรรมและการเติบโต',
    image: IMAGES.conflict,
    alt_text: 'หลักสูตร Conflict to Collaboration - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, HR & OD, ทุกคนในองค์กร',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'สูง', label: 'ความขัดแย้งสูญเสียพลังงานองค์กร', desc: 'ความขัดแย้งที่ไม่ได้รับการจัดการทำให้เสียเวลา พลังงาน และความสัมพันธ์ ส่งผลต่อประสิทธิภาพการทำงานโดยตรง' },
      { icon: 'Brain', stat: 'ไม่', label: 'คนไม่รู้วิธีจัดการความขัดแย้งอย่างสร้างสรรค์', desc: 'สัญชาตญาณแรกของคนส่วนใหญ่คือหลีกเลี่ยง โจมตี หรือยอมแพ้ ซึ่งไม่มีวิธีใดที่แก้ปัญหาได้จริงในระยะยาว' },
      { icon: 'Target', stat: 'สูญ', label: 'ขาด Diverse Perspectives เพราะคนไม่กล้าเถียง', desc: 'ความขัดแย้งที่ถูกมองว่าเป็นเรื่องร้ายทำให้คนไม่กล้าแสดงความเห็นที่แตกต่าง ทำให้สูญเสียคุณค่าจาก Diversity' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Conflict Styles Assessment', desc: 'วิเคราะห์รูปแบบการรับมือความขัดแย้งของตัวเอง และเข้าใจว่าสไตล์ใดเหมาะกับสถานการณ์ใด' },
      { icon: 'MessageCircle', title: 'Mediation Skills Practice', desc: 'ฝึกการเป็น Mediator ในความขัดแย้งในทีม ด้วยเทคนิค Interest-based Negotiation' },
      { icon: 'Brain', title: 'Productive Disagreement', desc: 'เรียนรู้วิธีเปลี่ยน Destructive Conflict เป็น Productive Debate ที่นำไปสู่ Solutions ที่ดีกว่า' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าใจต้นเหตุของความขัดแย้งและรูปแบบของตัวเองในการรับมือ' },
      { icon: 'Layers', title: 'ใช้ Interest-based Approach เพื่อหา Win-win Solutions' },
      { icon: 'MessageCircle', title: 'เป็น Mediator ที่มีประสิทธิภาพในความขัดแย้งระหว่างคนในทีม' },
      { icon: 'Users', title: 'เปลี่ยน Conflict เป็น Collaboration ที่สร้างนวัตกรรม' },
      { icon: 'Zap', title: 'สร้าง Norm ในทีมที่ทำให้ความขัดแย้งสร้างสรรค์เกิดขึ้นได้' }
    ],
  },

  {
    slug: 'empathy-at-work',
    title: 'Empathy at Work',
    category: 'People Skills',
    description: 'เข้าใจคนด้วยหัวใจ พัฒนา Empathy เพื่อสร้างความสัมพันธ์และผลลัพธ์ที่ดีกว่า',
    image: IMAGES.empathy,
    alt_text: 'หลักสูตร Empathy at Work - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'หัวหน้าทีม, ผู้จัดการ, HR, Customer Service, ทุกคน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Heart', stat: 'ขาด', label: 'ขาด Empathy ทำให้ทีมรู้สึกไม่ถูกเข้าใจ', desc: 'เมื่อผู้นำไม่ได้แสดง Empathy ทีมรู้สึกว่าเป็นแค่ทรัพยากร ไม่ใช่คน ทำให้ Engagement ลดลงและออกบ่อย' },
      { icon: 'Brain', stat: 'ผิด', label: 'เข้าใจ Empathy ผิด คิดว่าต้องเห็นด้วยกับทุกอย่าง', desc: 'Empathy ไม่ใช่การยอมตาม แต่คือการเข้าใจมุมมองของคนอื่นโดยไม่ตัดสิน ซึ่งเป็นทักษะที่พัฒนาได้' },
      { icon: 'Target', stat: 'หาย', label: 'ขาดการเชื่อมโยงระหว่างมนุษย์ในองค์กรยุคดิจิทัล', desc: 'เทคโนโลยีทำให้สื่อสารเร็วขึ้น แต่ Human Connection ลดลง ทำให้วัฒนธรรมองค์กรกลายเป็น Transactional' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Empathy Mapping', desc: 'ฝึก Perspective-taking ผ่าน Empathy Mapping ด้วยกรณีศึกษาจากชีวิตจริง' },
      { icon: 'MessageCircle', title: 'Empathic Listening Practice', desc: 'ฝึกฟังแบบ Empathic ในคู่และกลุ่มเล็ก รับ Feedback ว่าคนรู้สึกได้รับการเข้าใจหรือไม่' },
      { icon: 'Users', title: 'Human Stories Sharing', desc: 'สร้างพื้นที่ให้ทีมแบ่งปันเรื่องราวส่วนตัวอย่างปลอดภัย เพื่อสร้าง Human Connection' }
    ],
    what_section: [
      { icon: 'Heart', title: 'เข้าใจความแตกต่างระหว่าง Sympathy, Empathy, และ Compassion' },
      { icon: 'Eye', title: 'อ่านความรู้สึกและความต้องการที่ซ่อนอยู่เบื้องหลังพฤติกรรม' },
      { icon: 'Brain', title: 'ฟังแบบ Empathic ที่ทำให้คนรู้สึกถูกเข้าใจและมีคุณค่า' },
      { icon: 'MessageCircle', title: 'สื่อสารด้วย Empathy ในสถานการณ์ยากอย่างมีประสิทธิภาพ' },
      { icon: 'Users', title: 'สร้างทีมที่มีวัฒนธรรมแห่งความเข้าใจและการดูแลซึ่งกันและกัน' }
    ],
  },

  {
    slug: 'diversity-and-inclusion-mindset',
    title: 'Diversity & Inclusion Mindset',
    category: 'People Skills',
    description: 'ทำงานกับคนที่แตกต่าง สร้างสภาพแวดล้อมที่ทุกคน Belong และมีส่วนร่วมได้เต็มที่',
    image: IMAGES.diversity,
    alt_text: 'หลักสูตร Diversity & Inclusion Mindset - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'CEO / MD, HR & OD, ผู้จัดการ, ทีมงานทุกระดับ',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Users', stat: 'ขาด', label: 'องค์กรยังไม่ได้ใช้ประโยชน์จาก Diversity จริง', desc: 'มีความหลากหลายแต่ยังไม่มี Inclusion ทำให้ Diverse Voices ถูก Suppress และองค์กรสูญเสียมุมมองที่มีคุณค่า' },
      { icon: 'Brain', stat: 'มี', label: 'Unconscious Bias บิดเบือนการตัดสินใจโดยไม่รู้ตัว', desc: 'ทุกคนมี Bias บางส่วน การไม่รู้จัก Bias ของตัวเองทำให้การตัดสินใจ การ Hire และการ Promote ยังไม่ Equitable' },
      { icon: 'Target', stat: 'สูญ', label: 'ขาด Inclusive Culture ทำให้ Talent หนี', desc: 'ผู้มีความสามารถจาก Diverse Backgrounds ไม่อยากทำงานในองค์กรที่ไม่รู้สึก Inclusive ทำให้สูญเสีย Talent' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Unconscious Bias Workshop', desc: 'ค้นพบ Unconscious Biases ของตัวเองผ่าน Implicit Association Test และ Reflection Activities' },
      { icon: 'Users', title: 'Inclusion Practices', desc: 'เรียนรู้ Practical Strategies ในการสร้าง Inclusive Environment ในการประชุม การตัดสินใจ และชีวิตประจำวัน' },
      { icon: 'Heart', title: 'Cross-cultural Dialogue', desc: 'ฝึกสนทนาข้ามวัฒนธรรมและมุมมองอย่างเปิดใจและเคารพซึ่งกันและกัน' }
    ],
    what_section: [
      { icon: 'Brain', title: 'ระบุ Unconscious Biases ของตัวเองและผลกระทบที่มี' },
      { icon: 'Users', title: 'สร้าง Inclusive Practices ในการทำงาน การประชุม และการตัดสินใจ' },
      { icon: 'Heart', title: 'สื่อสารข้ามวัฒนธรรมและบุคลิกที่แตกต่างกันได้อย่างมีประสิทธิภาพ' },
      { icon: 'Eye', title: 'สร้างสภาพแวดล้อมที่ทุกคน Belong และนำมุมมองที่ดีที่สุดมาแบ่งปัน' },
      { icon: 'Target', title: 'ฝัง D&I ไว้ใน Processes และ Culture ขององค์กร' }
    ],
  },

  {
    slug: 'motivation-and-engagement',
    title: 'Motivation & Engagement',
    category: 'People Skills',
    description: 'ปลุกพลังทีมให้ลุกขึ้นทำ เข้าใจ Motivation ที่แท้จริงของแต่ละคนและสร้างสภาพแวดล้อมที่ Energize',
    image: IMAGES.motivation,
    alt_text: 'หลักสูตร Motivation & Engagement - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, HR & L&D, Business Leader',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'ดับ', label: 'ทีม Disengaged ทำงานแค่พอผ่าน', desc: 'งานวิจัยพบว่า 70% ของพนักงานทั่วโลก Disengaged ทำให้ประสิทธิภาพและนวัตกรรมขององค์กรลดลงอย่างมีนัยสำคัญ' },
      { icon: 'Brain', stat: 'ผิด', label: 'เชื่อว่าเงินคือแรงจูงใจเดียว', desc: 'การ Motivate ด้วยแค่เงินและ Bonus ใช้ได้ในระยะสั้น แต่ Intrinsic Motivation ต่างหากที่สร้าง Engagement ระยะยาว' },
      { icon: 'Target', stat: 'ไม่', label: 'ผู้นำไม่รู้ว่า Motivates คนแต่ละคนคืออะไร', desc: 'แรงจูงใจของคนแต่ละคนแตกต่างกัน การไม่รู้จัก Individual Motivators ทำให้ Investment ในการ Engage ทีมไม่ได้ผล' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Motivation Science', desc: 'เรียนรู้ Motivation Theories จาก Maslow, Herzberg, Pink, และ Deci & Ryan พร้อม Application จริง' },
      { icon: 'Target', title: 'Individual Motivation Mapping', desc: 'เครื่องมือ Discover Intrinsic Motivators ของสมาชิกทีมแต่ละคน' },
      { icon: 'Users', title: 'Engagement Design Workshop', desc: 'ออกแบบ Work Environment และ Leadership Practices ที่สร้าง Sustained Engagement' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าใจ Motivation Science ที่อยู่เบื้องหลัง Engagement' },
      { icon: 'Eye', title: 'ค้นพบ Intrinsic Motivators ของตัวเองและทีม' },
      { icon: 'Target', title: 'ออกแบบ Work Experiences ที่ Energize คนและสร้าง Commitment' },
      { icon: 'Users', title: 'สร้างสภาพแวดล้อมที่ทำให้คนอยากทำงานอย่างเต็มที่' },
      { icon: 'Zap', title: 'ฟื้นฟู Engagement ของทีมที่กำลัง Burn Out หรือ Disengage' }
    ],
  },

  {
    slug: 'team-emotional-intelligence',
    title: 'Team Emotional Intelligence',
    category: 'People Skills',
    description: 'EQ ของทีม สร้างวัฒนธรรมที่จัดการอารมณ์ได้ดี ทำงานร่วมกันได้แม้ในสถานการณ์กดดัน',
    image: IMAGES.eq,
    alt_text: 'หลักสูตร Team Emotional Intelligence - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 15–40 คน',
    audience: 'ทีมงาน, หัวหน้าทีม, ผู้จัดการ, HR & L&D',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Heart', stat: 'ต่ำ', label: 'Team EQ ต่ำทำให้การทำงานร่วมกันยาก', desc: 'ทีมที่ขาด Emotional Intelligence จะตอบสนองต่อความกดดันแบบ Reactive ทำให้เกิดความขัดแย้ง ซุบซิบ และบรรยากาศแย่' },
      { icon: 'Brain', stat: 'ไม่', label: 'ทีมไม่รู้วิธีจัดการอารมณ์ร่วมกัน', desc: 'เมื่อไม่มีภาษากลางในการพูดถึง Emotions ในทีม ปัญหาที่มาจากอารมณ์จะซ่อนตัวและระเบิดออกมาในเวลาไม่เหมาะ' },
      { icon: 'Target', stat: 'พัง', label: 'ทีมล้มเหลวในสถานการณ์กดดันสูง', desc: 'ในช่วง Crisis หรือ High-stress periods ทีมที่ขาด Emotional Regulation จะแตกแยก แทนที่จะรวมตัวกัน' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Team EQ Assessment', desc: 'วัด Team Emotional Intelligence ผ่าน Group Assessment และ Debrief ร่วมกัน' },
      { icon: 'Users', title: 'Group Emotion Regulation', desc: 'เรียนรู้เทคนิคจัดการ Collective Emotions ในทีมโดยเฉพาะในสถานการณ์ยาก' },
      { icon: 'Brain', title: 'Team EQ Rituals', desc: 'ออกแบบ Team Practices ที่สร้าง Emotional Awareness และ Regulation อย่างต่อเนื่อง' }
    ],
    what_section: [
      { icon: 'Heart', title: 'เข้าใจ Team Emotional Dynamics และผลกระทบต่อประสิทธิภาพ' },
      { icon: 'Eye', title: 'อ่านและตอบสนองต่อ Collective Emotions ของทีมได้' },
      { icon: 'Users', title: 'สร้าง Emotional Safety ที่ทำให้ทีมกล้าแสดงความจริงใจ' },
      { icon: 'Zap', title: 'จัดการ Emotional Contagion ทั้งเชิงบวกและเชิงลบในทีม' },
      { icon: 'Brain', title: 'ออกแบบ EQ Practices ที่ฝังไว้ในวัฒนธรรมทีม' }
    ],
  },

  {
    slug: 'relationship-mastery',
    title: 'Relationship Mastery',
    category: 'People Skills',
    description: 'บริหารความสัมพันธ์ในองค์กร สร้าง Network ที่แข็งแกร่งและความสัมพันธ์ที่มีคุณค่า',
    image: IMAGES.relationship,
    alt_text: 'หลักสูตร Relationship Mastery - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, Sales, HR, ทุกคนที่ทำงานกับผู้อื่น',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Users', stat: 'อ่อน', label: 'ความสัมพันธ์ในองค์กรตื้นและ Transactional', desc: 'เมื่อความสัมพันธ์ถูกมองแค่เป็นเครื่องมือ ความร่วมมือและ Collaboration ที่แท้จริงจะไม่เกิดขึ้น' },
      { icon: 'Brain', stat: 'ขาด', label: 'ขาดทักษะสร้างความสัมพันธ์ข้ามแผนก', desc: 'ปัญหา Silo ส่วนหนึ่งมาจากการที่คนไม่รู้จักและไม่ไว้วางใจคนในแผนกอื่น ทำให้การประสานงานยากลำบาก' },
      { icon: 'Target', stat: 'สูญ', label: 'สูญเสียโอกาสเพราะ Network ไม่แข็งแกร่ง', desc: 'โอกาสส่วนใหญ่มาจาก Relationship ไม่ใช่แค่ความสามารถ คนที่ขาด Relationship Skills จะพลาดโอกาสสำคัญ' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Authentic Relationship Building', desc: 'เรียนรู้วิธีสร้างความสัมพันธ์ที่แท้จริงบนพื้นฐานของ Genuine Interest ไม่ใช่ Agenda' },
      { icon: 'Brain', title: 'Strategic Networking', desc: 'ฝึกสร้าง Professional Network อย่างมีกลยุทธ์และรักษา Relationship ในระยะยาว' },
      { icon: 'MessageCircle', title: 'Rapport Building Techniques', desc: 'เทคนิคสร้าง Rapport อย่างรวดเร็วและ Natural ในทุกสถานการณ์' }
    ],
    what_section: [
      { icon: 'Heart', title: 'สร้างความสัมพันธ์ที่แท้จริงและมีคุณค่าในระยะยาว' },
      { icon: 'Users', title: 'Build & Maintain Professional Network อย่างมีกลยุทธ์' },
      { icon: 'MessageCircle', title: 'สร้าง Rapport ได้อย่างรวดเร็วในสถานการณ์ใหม่' },
      { icon: 'Brain', title: 'บริหารความสัมพันธ์กับ Stakeholders ที่หลากหลาย' },
      { icon: 'Zap', title: 'ฟื้นฟูความสัมพันธ์ที่แตกร้าวด้วยกระบวนการที่มีประสิทธิภาพ' }
    ],
  },

  {
    slug: 'human-centered-leadership',
    title: 'Human-Centered Leadership',
    category: 'People Skills',
    description: 'ผู้นำที่เข้าใจคน วางคนเป็นศูนย์กลางของการตัดสินใจและการออกแบบองค์กร',
    image: IMAGES.people,
    alt_text: 'หลักสูตร Human-Centered Leadership - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'CEO / MD, ผู้บริหาร, HR & OD, ผู้นำที่อยากสร้าง People-first Culture',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Heart', stat: 'ไม่', label: 'ผู้นำยังมองคนเป็น Resource ไม่ใช่ Human Being', desc: 'เมื่อองค์กรวัดทุกอย่างด้วย KPI และ ROI โดยไม่ใส่ใจ Human Experience ทีมจะรู้สึกไม่มีคุณค่าและออกในที่สุด' },
      { icon: 'Brain', stat: 'ขาด', label: 'ขาด Human Understanding ในการออกแบบ Processes', desc: 'Processes ที่ออกแบบโดยไม่คำนึงถึง Human Factors จะถูกต้านและไม่ถูก Adopt เพราะไม่สอดคล้องกับธรรมชาติมนุษย์' },
      { icon: 'Target', stat: 'สูญ', label: 'Trust ต่ำทำให้ Engagement หายไปพร้อมกับคนเก่ง', desc: 'Talent ที่ดีที่สุดมักออกจากผู้นำ ไม่ใช่ออกจากองค์กร เมื่อผู้นำขาด Human-centered Approach' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Human Experience Design', desc: 'เรียนรู้วิธีออกแบบ Employee Experience ที่คำนึงถึง Human Needs ในทุกมิติ' },
      { icon: 'Brain', title: 'Listening at Scale', desc: 'เครื่องมือและเทคนิคในการ Listen to People ในระดับทีมและองค์กร' },
      { icon: 'Compass', title: 'People-first Decision Making', desc: 'กรอบการตัดสินใจที่ Balance ระหว่าง Business Results และ Human Impact' }
    ],
    what_section: [
      { icon: 'Heart', title: 'พัฒนา Human-centered Leadership Philosophy ของตนเอง' },
      { icon: 'Eye', title: 'ออกแบบ Employee Experience ที่ตอบ Human Needs' },
      { icon: 'Brain', title: 'ตัดสินใจโดยคำนึงถึงผลกระทบต่อคนในทุกมิติ' },
      { icon: 'Users', title: 'สร้าง Culture ที่คนรู้สึกมีคุณค่า Belong และเติบโตได้' },
      { icon: 'Compass', title: 'Balance Business Performance กับ Human Wellbeing อย่างยั่งยืน' }
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // หมวด 3: Work Skills (10 หลักสูตร)
  // ════════════════════════════════════════════════════════════════

  {
    slug: 'productivity-flow',
    title: 'Productivity Flow',
    category: 'Work Skills',
    description: 'ทำงานลื่นไหลใน Flow State เพิ่มประสิทธิภาพและความสุขในการทำงานในเวลาเดียวกัน',
    image: IMAGES.productivity,
    alt_text: 'หลักสูตร Productivity Flow - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'พนักงานทุกระดับ, ผู้จัดการ, Knowledge Worker',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'หาย', label: 'ทำงานยุ่งแต่ไม่ Productive จริง', desc: 'งานยุ่งไม่เท่ากับงานมีประสิทธิภาพ หลายคนทำงาน 10 ชั่วโมงแต่ได้ผลลัพธ์เท่ากับคนที่ทำงาน 5 ชั่วโมงในสภาวะ Flow' },
      { icon: 'Brain', stat: 'ขาด', label: 'ถูก Distract จนไม่สามารถ Deep Work ได้', desc: 'Notification, การประชุมที่ไม่จำเป็น และ Multitasking ทำให้สูญเสียความสามารถในการ Focus และทำงานอย่างมีคุณภาพ' },
      { icon: 'Target', stat: 'ต่ำ', label: 'Energy Management ไม่ดีทำให้ Burnout', desc: 'การทำงานหนักโดยไม่จัดการ Energy อย่างถูกวิธีทำให้เกิด Burnout ซึ่งส่งผลต่อทั้ง Performance และสุขภาพ' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Flow State Science', desc: 'เรียนรู้วิทยาศาสตร์เบื้องหลัง Flow State และวิธีสร้างเงื่อนไขที่ทำให้เข้าสู่ Flow ได้บ่อยขึ้น' },
      { icon: 'Target', title: 'Deep Work Practices', desc: 'ออกแบบ Work Schedule และ Environment ที่สนับสนุน Deep Work และลด Distraction' },
      { icon: 'Zap', title: 'Energy Management System', desc: 'สร้าง Personal Energy Management System ที่ Sustain ประสิทธิภาพในระยะยาว' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าสู่ Flow State ได้บ่อยขึ้นด้วยเงื่อนไขที่ออกแบบเอง' },
      { icon: 'Target', title: 'ออกแบบ Work System ที่ลด Distraction และเพิ่ม Focus' },
      { icon: 'Zap', title: 'บริหาร Energy ไม่ใช่แค่ Time เพื่อ Sustainable Productivity' },
      { icon: 'Layers', title: 'ทำ Deep Work ได้คุณภาพสูงขึ้นในเวลาน้อยลง' },
      { icon: 'Flame', title: 'สร้างสมดุลระหว่าง Productivity และ Wellbeing' }
    ],
  },

  {
    slug: 'time-and-energy-management',
    title: 'Time & Energy Management',
    category: 'Work Skills',
    description: 'บริหารเวลาและพลังงาน ไม่ใช่แค่ To-do List แต่ระบบที่ทำให้ทำสิ่งที่สำคัญที่สุดได้จริง',
    image: IMAGES.time,
    alt_text: 'หลักสูตร Time & Energy Management - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'พนักงานทุกระดับ, ผู้จัดการ, ทุกคนที่รู้สึกว่าเวลาไม่พอ',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ขาด', label: 'เวลาหมดไปกับสิ่งที่ Urgent แต่ไม่ Important', desc: 'Eisenhower Matrix เผยว่าคนส่วนใหญ่ใช้เวลาใน Quadrant 1 และ 3 แต่สิ่งที่สร้างคุณค่าจริงอยู่ใน Quadrant 2' },
      { icon: 'Flame', stat: 'หมด', label: 'Energy หมดก่อนเวลางานสิ้นสุด', desc: 'การทำงานโดยไม่จัดการ Energy อย่างถูกวิธีทำให้ประสิทธิภาพลดลงในช่วงบ่าย และคุณภาพงานไม่สม่ำเสมอ' },
      { icon: 'Brain', stat: 'ไม่', label: 'ยังไม่มีระบบที่ทำงานสำคัญสำเร็จจริง', desc: 'To-do List เพียงอย่างเดียวไม่พอ ต้องมีระบบที่ Protect เวลาสำหรับงาน High-value และ Execute ได้จริง' }
    ],
    how_section: [
      { icon: 'Target', title: 'Priority Framework', desc: 'เรียนรู้วิธีใช้ Eisenhower Matrix, MoSCoW Method และ OKR ในการจัดลำดับงาน' },
      { icon: 'Brain', title: 'Time Blocking System', desc: 'ออกแบบ Weekly Schedule ที่ Block เวลาสำหรับงาน Deep Work, Meetings, และ Recovery' },
      { icon: 'Zap', title: 'Energy Optimization', desc: 'เรียนรู้ Ultradian Rhythms และวิธี Optimize งานตาม Energy Level ของตัวเอง' }
    ],
    what_section: [
      { icon: 'Target', title: 'จัดลำดับความสำคัญของงานได้อย่างชัดเจนและถูกต้อง' },
      { icon: 'Brain', title: 'ออกแบบ Weekly System ที่ทำให้งานสำคัญสำเร็จเสมอ' },
      { icon: 'Zap', title: 'บริหาร Energy ตาม Natural Rhythms เพื่อประสิทธิภาพสูงสุด' },
      { icon: 'Layers', title: 'ลด Time Wasters และเพิ่มเวลาสำหรับงานที่มีคุณค่า' },
      { icon: 'Flame', title: 'สร้าง Work-Life Integration ที่ Sustainable ในระยะยาว' }
    ],
  },

  {
    slug: 'problem-solving-and-critical-thinking',
    title: 'Problem Solving & Critical Thinking',
    category: 'Work Skills',
    description: 'แก้ปัญหาอย่างเป็นระบบและคิดวิเคราะห์อย่างมีวิจารณญาณ เพื่อ Solutions ที่แม่นยำ',
    image: IMAGES.problem,
    alt_text: 'หลักสูตร Problem Solving & Critical Thinking - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'พนักงานทุกระดับ, ผู้จัดการ, หัวหน้าทีม, Project Manager',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'พลาด', label: 'แก้ปัญหาที่ Symptom ไม่ใช่ Root Cause', desc: 'ปัญหาที่กลับมาซ้ำๆ มักเกิดจากการแก้ที่ปลายเหตุ ไม่ใช่ต้นเหตุ ทำให้เสียเวลาและทรัพยากรในการแก้ปัญหาเดิมซ้ำไป' },
      { icon: 'Brain', stat: 'ติด', label: 'คิดแบบเดิม หา Solutions เดิมๆ', desc: 'เมื่อทีมใช้ Mental Models เดิมๆ ในการแก้ปัญหา Solutions ที่ได้จะซ้ำซาก และไม่สามารถรับมือกับ Complex Problems ได้' },
      { icon: 'Flame', stat: 'รีบ', label: 'ตัดสินใจเร็วเกินไปโดยไม่วิเคราะห์ให้ถ้วนถี่', desc: 'ความกดดันด้านเวลาทำให้คนมักกระโดดไปหา Solution โดยไม่เข้าใจปัญหาอย่างลึกซึ้ง ทำให้ Solutions ใช้ไม่ได้' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Problem Analysis Frameworks', desc: 'เรียนรู้ Root Cause Analysis, 5 Whys, Fishbone Diagram, และ Systems Thinking' },
      { icon: 'Brain', title: 'Critical Thinking Tools', desc: 'ฝึกใช้ Logical Reasoning, Evidence Evaluation, และ Cognitive Bias Awareness' },
      { icon: 'Target', title: 'Solution Workshop', desc: 'ฝึกแก้ปัญหาจริงขององค์กรด้วย Structured Problem-solving Process' }
    ],
    what_section: [
      { icon: 'Brain', title: 'วิเคราะห์หา Root Cause ของปัญหาได้อย่างแม่นยำ' },
      { icon: 'Eye', title: 'คิดวิเคราะห์ข้อมูลและ Evidence อย่างมีวิจารณญาณ' },
      { icon: 'Layers', title: 'สร้าง Solutions ที่แก้ปัญหาจริงไม่ใช่แค่ Symptom' },
      { icon: 'Target', title: 'ตัดสินใจเลือก Solution ที่ดีที่สุดจากหลายทางเลือก' },
      { icon: 'Users', title: 'นำกระบวนการแก้ปัญหาในกลุ่มได้อย่างมีประสิทธิภาพ' }
    ],
  },

  {
    slug: 'creative-thinking-and-innovation',
    title: 'Creative Thinking & Innovation',
    category: 'Work Skills',
    description: 'พัฒนาความคิดสร้างสรรค์ สร้างไอเดียใหม่และนวัตกรรมที่แก้ปัญหาจริงในองค์กร',
    image: IMAGES.creative,
    alt_text: 'หลักสูตร Creative Thinking & Innovation - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'พนักงานทุกระดับ, Product Team, Marketing, Innovation Team',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'ติด', label: 'คิดซ้ำเดิม หาไอเดียใหม่ไม่ออก', desc: 'Routine และ Comfort Zone ทำให้สมองใช้ Pattern เดิมๆ การคิดนอกกรอบต้องการ Deliberate Practice และ Techniques' },
      { icon: 'Flame', stat: 'กลัว', label: 'กลัวผิดจนไม่กล้าเสนอไอเดียใหม่', desc: 'วัฒนธรรมที่ลงโทษความผิดพลาดทำให้คนไม่กล้า Experiment ซึ่งคือรากฐานของนวัตกรรมทุกชนิด' },
      { icon: 'Target', stat: 'ขาด', label: 'มีไอเดียแต่ไม่รู้วิธีพัฒนาเป็นนวัตกรรมจริง', desc: 'ช่องว่างระหว่าง Creative Idea กับ Working Innovation ต้องการกระบวนการ Prototyping, Testing, และ Iteration' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Creative Techniques Training', desc: 'ฝึกใช้ SCAMPER, Six Thinking Hats, Mind Mapping, Lateral Thinking และ Random Stimulus' },
      { icon: 'Layers', title: 'Ideation Workshop', desc: 'Workshop สร้างไอเดียจากโจทย์จริงขององค์กร ด้วยกระบวนการ Divergent → Convergent Thinking' },
      { icon: 'Zap', title: 'Rapid Prototyping', desc: 'เรียนรู้วิธีสร้าง Prototype เพื่อทดสอบไอเดียอย่างรวดเร็วและประหยัด' }
    ],
    what_section: [
      { icon: 'Brain', title: 'ใช้ Creative Thinking Techniques ได้จริงในการทำงาน' },
      { icon: 'Flame', title: 'สร้างไอเดียใหม่ที่มีคุณค่าสำหรับองค์กรอย่างเป็นระบบ' },
      { icon: 'Layers', title: 'พัฒนาไอเดียสู่ Prototype ที่ทดสอบได้' },
      { icon: 'Target', title: 'สร้าง Safe Space สำหรับ Experimentation ในทีม' },
      { icon: 'Zap', title: 'นำ Innovation Process ในทีมได้อย่างมีประสิทธิภาพ' }
    ],
  },

  {
    slug: 'project-management-for-success',
    title: 'Project Management for Success',
    category: 'Work Skills',
    description: 'บริหารโครงการให้สำเร็จ ส่งมอบงานตรงเวลา ตรงงบประมาณ และตรงความต้องการ',
    image: IMAGES.project,
    alt_text: 'หลักสูตร Project Management for Success - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'Project Manager, Team Lead, ทุกคนที่ต้องบริหารโครงการ',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ล่าช้า', label: 'Project ส่วนใหญ่ล่าช้าและเกินงบ', desc: 'งานวิจัยพบว่า 70% ของโครงการ IT และ Business Transformation ล้มเหลวในแง่ Time, Cost, หรือ Quality' },
      { icon: 'Brain', stat: 'ขาด', label: 'ขาดกระบวนการบริหาร Risk และ Change', desc: 'โครงการที่ไม่มี Risk Management ที่ดีจะตกใจกับปัญหาที่คาดเดาได้ และไม่สามารถรับมือกับการเปลี่ยนแปลง' },
      { icon: 'Users', stat: 'ไม่', label: 'Stakeholder ไม่ Align ทำให้ต้องแก้งานซ้ำ', desc: 'ขาด Stakeholder Management ที่ดีทำให้ได้ Requirements ที่ไม่ชัด และต้องแก้งานซ้ำหลายครั้ง' }
    ],
    how_section: [
      { icon: 'Layers', title: 'PM Frameworks', desc: 'เรียนรู้ทั้ง Waterfall และ Agile Approach พร้อมวิธีเลือกใช้ให้เหมาะกับโครงการ' },
      { icon: 'Target', title: 'Project Simulation', desc: 'ฝึกบริหารโครงการจำลองตั้งแต่ Initiation ถึง Close-out พร้อมรับมือกับ Curveballs' },
      { icon: 'Users', title: 'Stakeholder Management', desc: 'เทคนิคการ Identify, Analyze, และ Engage Stakeholders อย่างมีประสิทธิภาพ' }
    ],
    what_section: [
      { icon: 'Layers', title: 'วางแผนโครงการด้วย WBS, Timeline, และ Budget ที่แม่นยำ' },
      { icon: 'Target', title: 'บริหาร Risk, Scope, และ Change อย่างเป็นระบบ' },
      { icon: 'Users', title: 'จัดการ Stakeholders และ Communication ได้อย่างมีประสิทธิภาพ' },
      { icon: 'Brain', title: 'นำทีม Project ให้ Deliver ได้ตรงเวลาและตรงงบประมาณ' },
      { icon: 'Zap', title: 'ทำ Project Retrospective เพื่อเรียนรู้และพัฒนาอย่างต่อเนื่อง' }
    ],
  },

  {
    slug: 'agile-and-adaptive-work-skills',
    title: 'Agile & Adaptive Work Skills',
    category: 'Work Skills',
    description: 'ทำงานแบบ Agile ปรับตัวเร็ว ส่งมอบคุณค่าได้ต่อเนื่อง และรับมือการเปลี่ยนแปลงได้',
    image: IMAGES.agile,
    alt_text: 'หลักสูตร Agile & Adaptive Work Skills - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 15–40 คน',
    audience: 'ทีมงาน, หัวหน้าทีม, Project Manager, HR & OD',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'ช้า', label: 'การทำงานแบบ Waterfall ช้าเกินไปสำหรับโลกปัจจุบัน', desc: 'โลกเปลี่ยนเร็วกว่า Long-term Plans การยึดแผนเดิมโดยไม่ปรับตัวทำให้ส่งมอบสิ่งที่ตลาดไม่ต้องการอีกต่อไป' },
      { icon: 'Brain', stat: 'ไม่', label: 'ทีมยังไม่รู้วิธีทำงานแบบ Iterative', desc: 'Agile ไม่ใช่แค่ Process แต่คือ Mindset และ Behavior ที่ต้องพัฒนาผ่านการฝึกฝนอย่างต่อเนื่อง' },
      { icon: 'Target', stat: 'ขาด', label: 'Collaboration ข้ามทีมยังติดขัด', desc: 'Agile ต้องการ Cross-functional Collaboration ที่แท้จริง แต่ Silo Mentality ทำให้ยากที่จะ Deliver ได้เร็ว' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Agile Fundamentals', desc: 'เรียนรู้ Agile Manifesto, Scrum, Kanban, และ SAFe ผ่าน Hands-on Simulation' },
      { icon: 'Zap', title: 'Sprint Workshop', desc: 'ฝึกวางแผนและดำเนิน Sprint จำลองเพื่อสัมผัสประสบการณ์ Agile จริง' },
      { icon: 'Brain', title: 'Agile Mindset Transformation', desc: 'สร้าง Agile Mindset ผ่าน Reflection และ Real-case Application' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าใจ Agile Values และนำมาใช้ในบริบทองค์กรได้' },
      { icon: 'Layers', title: 'ใช้ Scrum หรือ Kanban ในการบริหารงานทีม' },
      { icon: 'Zap', title: 'Iterate และ Improve ได้อย่างรวดเร็วโดยอิง Feedback' },
      { icon: 'Users', title: 'ทำงานร่วมกันข้ามทีมในรูปแบบ Agile ได้' },
      { icon: 'Target', title: 'วัดและปรับ Direction ได้อย่างรวดเร็วตาม Data' }
    ],
  },

  {
    slug: 'design-thinking-for-business',
    title: 'Design Thinking for Business',
    category: 'Work Skills',
    description: 'ใช้ Design Thinking แก้โจทย์ธุรกิจ สร้าง Solutions ที่ตรงความต้องการลูกค้าจริง',
    image: IMAGES.design,
    alt_text: 'หลักสูตร Design Thinking for Business - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 15–40 คน',
    audience: 'Product Manager, HR, Marketing, Business Development, ผู้บริหาร',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ผิด', label: 'สร้าง Solutions โดยไม่เข้าใจความต้องการจริง', desc: 'หลายโครงการล้มเหลวเพราะสร้างสิ่งที่ตัวเองคิดว่าลูกค้าต้องการ แทนที่จะเริ่มจากการทำความเข้าใจ Human Needs' },
      { icon: 'Brain', stat: 'ขาด', label: 'กระบวนการนวัตกรรมไม่เป็นระบบ', desc: 'ขาดกระบวนการที่ทำให้ไอเดียดีๆ ถูกพัฒนาอย่างมีโครงสร้าง และทดสอบก่อนลงทุนจริง' },
      { icon: 'Flame', stat: 'ช้า', label: 'กลัวลงทุนผิด จึงไม่กล้า Experiment', desc: 'Design Thinking ช่วยลดความเสี่ยงด้วยการ Prototype และ Test ก่อนลงทุนจริง ทำให้ Fail Fast และ Learn Fast' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Empathy Research', desc: 'ฝึก User Research, Observation, และ Interview เพื่อค้นพบ Unmet Needs ที่แท้จริง' },
      { icon: 'Brain', title: 'Ideation & Prototyping', desc: 'Workshop สร้างไอเดีย สร้าง Rapid Prototype และ Test กับ Users จริง' },
      { icon: 'Layers', title: 'DT Sprint', desc: 'ฝึกผ่าน 5-stage Design Thinking Process กับโจทย์ธุรกิจจริงขององค์กร' }
    ],
    what_section: [
      { icon: 'Heart', title: 'ทำ Empathy Research เพื่อค้นพบ Human Needs ที่ซ่อนอยู่' },
      { icon: 'Brain', title: 'ใช้กระบวนการ Design Thinking กับโจทย์จริงได้' },
      { icon: 'Layers', title: 'สร้าง Rapid Prototype เพื่อทดสอบไอเดียก่อนลงทุน' },
      { icon: 'Target', title: 'Iterate Solution ตาม User Feedback อย่างรวดเร็ว' },
      { icon: 'Zap', title: 'นำ DT Process ในทีมและออกแบบ Innovation Projects' }
    ],
  },

  {
    slug: 'data-thinking-and-decision-making',
    title: 'Data Thinking & Decision Making',
    category: 'Work Skills',
    description: 'ตัดสินใจด้วย Data ไม่ใช่ Gut Feeling พัฒนาทักษะ Data Literacy สำหรับคนทำงาน',
    image: IMAGES.data,
    alt_text: 'หลักสูตร Data Thinking & Decision Making - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, พนักงานทุกระดับที่ต้องการ Data Literacy',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'ไม่', label: 'ตัดสินใจด้วย Gut Feeling ในยุคที่ Data มีอยู่มาก', desc: 'Data ที่มีอยู่จำนวนมากในองค์กรยังไม่ถูกใช้ประโยชน์ เพราะคนขาดทักษะในการอ่าน วิเคราะห์ และตีความ Data' },
      { icon: 'Target', stat: 'ผิด', label: 'อ่าน Data ผิดและสรุปผลผิดพลาด', desc: 'ทักษะ Data Literacy ต่ำทำให้ตีความ Data อย่างเป็น Correlation เป็น Causation ทำให้ตัดสินใจผิดพลาด' },
      { icon: 'Flame', stat: 'ช้า', label: 'รายงานข้อมูลช้า ตอบสนองตลาดไม่ทัน', desc: 'การขาดทักษะ Data ทำให้ได้รับ Insights ช้า ทำให้องค์กรตอบสนองต่อโอกาสและความเสี่ยงช้ากว่าที่ควร' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Data Literacy Fundamentals', desc: 'เรียนรู้วิธีอ่าน วิเคราะห์ และตีความ Data อย่างถูกต้องและไม่ถูก Biased' },
      { icon: 'Layers', title: 'Data Visualization', desc: 'ฝึกนำเสนอ Data ด้วยกราฟและ Dashboard ที่ทำให้ Decision Makers เข้าใจและ Act' },
      { icon: 'Target', title: 'Data-driven Decision Workshop', desc: 'ฝึกนำ Data มาใช้ในการตัดสินใจจริงผ่าน Business Case จากองค์กร' }
    ],
    what_section: [
      { icon: 'Brain', title: 'อ่านและวิเคราะห์ Data ได้อย่างถูกต้องและมีวิจารณญาณ' },
      { icon: 'Eye', title: 'ระบุ Patterns, Trends, และ Outliers ที่สำคัญใน Data' },
      { icon: 'Layers', title: 'นำเสนอ Data ด้วย Visualization ที่ชัดเจนและ Actionable' },
      { icon: 'Target', title: 'ตัดสินใจโดยอิง Data มากกว่า Assumption' },
      { icon: 'Zap', title: 'สร้าง Data Culture ในทีมด้วย Habits ที่เป็นรูปธรรม' }
    ],
  },

  {
    slug: 'digital-and-ai-skills-for-work',
    title: 'Digital & AI Skills for Work',
    category: 'Work Skills',
    description: 'ใช้ AI และ Digital Tools เพิ่มประสิทธิภาพการทำงาน ไม่ใช่ถูกแทนที่',
    image: IMAGES.digital,
    alt_text: 'หลักสูตร Digital & AI Skills for Work - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'พนักงานทุกระดับ, ผู้จัดการ, ทุกคนที่ต้องการ Upskill ด้าน AI',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'กลัว', label: 'กลัวว่า AI จะมาแทนที่งาน', desc: 'AI ไม่ได้แทนที่คน แต่แทนที่งาน ทักษะที่จะอยู่รอดคือทักษะที่ทำงานร่วมกับ AI ได้อย่างมีประสิทธิภาพ' },
      { icon: 'Target', stat: 'ขาด', label: 'ไม่รู้วิธีใช้ AI Tools ในงานประจำวัน', desc: 'AI Tools มีให้ใช้มากขึ้นทุกวัน แต่คนส่วนใหญ่ยังใช้ไม่เป็นหรือใช้ได้ไม่เต็มศักยภาพ ทำให้พลาดโอกาสเพิ่มประสิทธิภาพ' },
      { icon: 'Flame', stat: 'ช้า', label: 'Digitalization ในองค์กรยังไม่เกิดขึ้นจริง', desc: 'การ Transform Digital ล้มเหลวส่วนใหญ่เพราะคนไม่ได้รับการ Upskill และยังใช้วิธีทำงานแบบเดิม' }
    ],
    how_section: [
      { icon: 'Zap', title: 'AI Tools Hands-on', desc: 'ฝึกใช้ AI Tools จริง เช่น ChatGPT, Copilot, Gemini ในงานที่ทำอยู่ทุกวัน' },
      { icon: 'Brain', title: 'Prompt Engineering', desc: 'เรียนรู้วิธีสื่อสารกับ AI ให้ได้ Output ที่มีคุณภาพและตรงความต้องการ' },
      { icon: 'Target', title: 'AI Workflow Design', desc: 'ออกแบบ Workflow ที่รวม AI เข้าไปอย่างมีกลยุทธ์เพื่อ Amplify ไม่ใช่แค่ Automate' }
    ],
    what_section: [
      { icon: 'Brain', title: 'ใช้ AI Tools เพิ่มประสิทธิภาพงานได้ 3–5 เท่า' },
      { icon: 'Zap', title: 'เขียน Prompts ที่ได้ Output มีคุณภาพสูงจาก AI' },
      { icon: 'Layers', title: 'ออกแบบ Digital Workflow ที่เหมาะกับงานของตัวเอง' },
      { icon: 'Target', title: 'Upskill ตัวเองให้ Work Alongside AI ได้อย่างมั่นใจ' },
      { icon: 'Eye', title: 'ประเมิน Output ของ AI ด้วย Critical Thinking ที่ถูกต้อง' }
    ],
  },

  {
    slug: 'execution-excellence',
    title: 'Execution Excellence',
    category: 'Work Skills',
    description: 'ทำงานให้ได้ผลลัพธ์จริง จากแผนสู่การ Execute ที่ประสบความสำเร็จอย่างสม่ำเสมอ',
    image: IMAGES.execution,
    alt_text: 'หลักสูตร Execution Excellence - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'พนักงานทุกระดับ, ผู้จัดการ, หัวหน้าทีม',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ขาด', label: 'มีแผนดีแต่ Execute ไม่ได้', desc: 'ช่องว่างระหว่าง Strategy กับ Execution คือสาเหตุหลักที่ทำให้องค์กรไม่บรรลุเป้าหมาย แม้จะมีแผนที่ดีเยี่ยมก็ตาม' },
      { icon: 'Brain', stat: 'หาย', label: 'ขาด Accountability ในการส่งงาน', desc: 'เมื่อไม่มีระบบ Accountability ที่ชัดเจน คนมักทำงานในสิ่งที่ตัวเองชอบ ไม่ใช่สิ่งที่สำคัญ และ Deadline มักไม่ถูกรักษา' },
      { icon: 'Flame', stat: 'ต่ำ', label: 'Discipline ในการทำตามแผนไม่สม่ำเสมอ', desc: 'Execution ต้องการ Discipline ที่มากกว่า Motivation ชั่วคราว คนที่ขาด Execution Habits จะทำงานได้ไม่สม่ำเสมอ' }
    ],
    how_section: [
      { icon: 'Target', title: 'Execution Framework', desc: 'เรียนรู้ 4DX (4 Disciplines of Execution) และ OKR ในการ Execute Priority Goals' },
      { icon: 'Brain', title: 'Accountability System', desc: 'ออกแบบระบบ Accountability ที่ทำให้ทีม Follow Through ด้วยความสมัครใจ ไม่ใช่การบังคับ' },
      { icon: 'Zap', title: 'High-impact Habits', desc: 'สร้าง Daily and Weekly Execution Habits ที่ทำให้ Progress สม่ำเสมอ' }
    ],
    what_section: [
      { icon: 'Target', title: 'แปลงเป้าหมายเป็น Action Plans ที่ Execute ได้จริง' },
      { icon: 'Brain', title: 'สร้างระบบ Accountability ที่ทีม Own และรักษาได้' },
      { icon: 'Zap', title: 'พัฒนา Execution Habits ที่สม่ำเสมอและมีประสิทธิภาพ' },
      { icon: 'Layers', title: 'วัด Progress และ Adjust Course อย่างรวดเร็ว' },
      { icon: 'Flame', title: 'สร้าง Execution Culture ในทีมที่ Deliver อย่างสม่ำเสมอ' }
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // หมวด 4: Communication Skills (15 หลักสูตร)
  // ════════════════════════════════════════════════════════════════

  {
    slug: 'communication-mastery',
    title: 'Communication Mastery',
    category: 'Communication Skills',
    description: 'สื่อสารอย่างมืออาชีพ ส่งสารที่ชัดเจน น่าเชื่อถือ และสร้างผลลัพธ์ในทุกสถานการณ์',
    image: IMAGES.communication,
    alt_text: 'หลักสูตร Communication Mastery - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–50 คน',
    audience: 'พนักงานทุกระดับ, ผู้จัดการ, ทุกคนที่ต้องสื่อสารในงาน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'MessageCircle', stat: 'ผิด', label: 'สื่อสารแล้วถูกเข้าใจผิดบ่อย', desc: 'ปัญหา 80% ในองค์กรมีต้นกำเนิดจากการสื่อสารที่ไม่ชัดเจน ส่งผลต่อความสัมพันธ์ ประสิทธิภาพ และความไว้วางใจ' },
      { icon: 'Target', stat: 'ขาด', label: 'ขาดทักษะปรับ Message ให้เหมาะกับผู้ฟัง', desc: 'การสื่อสารแบบ One-size-fits-all ทำให้บางคนได้ข้อมูลมากเกิน บางคนน้อยเกิน และบางคนไม่เข้าใจเลย' },
      { icon: 'Brain', stat: 'กลัว', label: 'ไม่มั่นใจในการสื่อสารต่อหน้ากลุ่ม', desc: 'ความกลัวการสื่อสารต่อหน้าคนหมู่มากทำให้พลาดโอกาสในการนำเสนอและแสดงความสามารถ' }
    ],
    how_section: [
      { icon: 'MessageCircle', title: 'Communication Style Assessment', desc: 'ค้นพบ Personal Communication Style และ Blind Spots ผ่าน Assessment' },
      { icon: 'Zap', title: 'Active Learning 70%', desc: 'ฝึกพูด เขียน และฟังในทุก Module ด้วย Real-time Feedback จาก Facilitator' },
      { icon: 'Target', title: 'Blueprint Creation', desc: 'แต่ละคนออกแบบ Personal Communication Blueprint ที่ใช้ได้จริงในวันรุ่งขึ้น' }
    ],
    what_section: [
      { icon: 'MessageCircle', title: 'สื่อสารได้ชัด ตรงประเด็น และน่าเชื่อถือในทุกสถานการณ์' },
      { icon: 'Eye', title: 'ปรับ Communication Style ให้เหมาะกับผู้ฟังแต่ละประเภท' },
      { icon: 'Brain', title: 'ฟังอย่าง Active เพื่อเข้าใจจริง ไม่ใช่แค่รอพูด' },
      { icon: 'Target', title: 'เขียนสื่อสารได้ชัดเจนและ Professional' },
      { icon: 'Zap', title: 'สร้างความประทับใจและ Credibility ผ่านการสื่อสาร' }
    ],
  },

  {
    slug: 'powerful-speaking',
    title: 'Powerful Speaking',
    category: 'Communication Skills',
    description: 'พูดทรงพลังในองค์กร สร้างผลกระทบด้วยคำพูดที่ชัด มีพลัง และสร้างแรงบันดาลใจ',
    image: IMAGES.speaking,
    alt_text: 'หลักสูตร Powerful Speaking - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, ผู้บริหาร, ทุกคนที่ต้องพูดต่อหน้าคน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Zap', stat: 'อ่อน', label: 'พูดแล้วคนไม่รู้สึก Motivated', desc: 'การพูดที่ขาดพลังและความน่าเชื่อถือทำให้ Message ไม่ถูกรับ ไม่สร้างแรงจูงใจ และไม่นำไปสู่การ Action' },
      { icon: 'Brain', stat: 'ไม่', label: 'ยังไม่รู้วิธีใช้เสียงและ Body Language อย่างมีพลัง', desc: 'การสื่อสาร 55% มาจาก Body Language 38% จาก Tonality และแค่ 7% จาก Words ผู้พูดส่วนใหญ่ยังไม่ได้ใช้ศักยภาพเต็ม' },
      { icon: 'Flame', stat: 'หาย', label: 'ขาดโครงสร้างที่ทำให้ Message จำง่ายและกระตุ้น Action', desc: 'การพูดที่ไม่มีโครงสร้างที่ดีทำให้คนฟังแล้วจำไม่ได้และไม่รู้ว่าต้องทำอะไร' }
    ],
    how_section: [
      { icon: 'Zap', title: 'Voice & Presence Training', desc: 'ฝึกใช้เสียง จังหวะ การหยุด และ Body Language เพื่อสร้าง Speaking Presence' },
      { icon: 'Layers', title: 'Speech Structure Masterclass', desc: 'เรียนรู้โครงสร้างการพูดที่ทรงพลัง เช่น PREP, Hero Journey, Problem-Solution-Benefit' },
      { icon: 'Target', title: 'Live Speaking Practice', desc: 'ฝึกพูดจริง รับ Video Feedback และ Coaching จาก Facilitator แบบ Real-time' }
    ],
    what_section: [
      { icon: 'Zap', title: 'ใช้เสียงและ Body Language สร้าง Commanding Presence' },
      { icon: 'Layers', title: 'โครงสร้างการพูดที่ทำให้ Message ชัดและจำง่าย' },
      { icon: 'Flame', title: 'พูดด้วยความมั่นใจในทุกสถานการณ์ ตั้งแต่ 1-on-1 ถึง Large Audience' },
      { icon: 'MessageCircle', title: 'สร้างแรงบันดาลใจและกระตุ้น Action ด้วยคำพูด' },
      { icon: 'Brain', title: 'จัดการ Nervous Energy และเปลี่ยนเป็น Speaking Power' }
    ],
  },

  {
    slug: 'presentation-like-a-pro',
    title: 'Presentation Like a Pro',
    category: 'Communication Skills',
    description: 'นำเสนองานอย่างมืออาชีพ สร้าง Slides ที่ดีและนำเสนอได้น่าเชื่อถือและน่าติดตาม',
    image: IMAGES.presentation,
    alt_text: 'หลักสูตร Presentation Like a Pro - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'พนักงานทุกระดับ, ผู้จัดการ, ทุกคนที่ต้องนำเสนองาน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'พลาด', label: 'Slides เต็มไปด้วยข้อความจนคนไม่อ่าน', desc: 'Presentation Slides ส่วนใหญ่มีข้อมูลมากเกินไปและ Visualize ไม่ดี ทำให้คนฟังกลับไม่รู้ว่า Key Message คืออะไร' },
      { icon: 'Brain', stat: 'ขาด', label: 'ไม่รู้วิธีออกแบบ Narrative ที่น่าติดตาม', desc: 'การนำเสนอที่ดีต้องมี Storyline ที่ทำให้คนฟังติดตามตั้งแต่ต้นจนจบ ไม่ใช่แค่รายการข้อมูล' },
      { icon: 'Flame', stat: 'กลัว', label: 'กังวลเรื่อง Q&A และคำถามยากๆ', desc: 'ความกลัวคำถามทำให้คนหลีกเลี่ยงการนำเสนอและพลาดโอกาสแสดงความเชี่ยวชาญ' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Slide Design Principles', desc: 'เรียนรู้หลักการออกแบบ Slides ที่สื่อสาร Visually แทนที่จะ Dump Text' },
      { icon: 'Brain', title: 'Presentation Narrative', desc: 'ออกแบบ Storyline ที่ Hook ผู้ฟัง สร้าง Tension และนำไปสู่ Call to Action' },
      { icon: 'Zap', title: 'Mock Presentation', desc: 'ฝึกนำเสนอจริงพร้อม Q&A Simulation และรับ Feedback แบบ Detailed' }
    ],
    what_section: [
      { icon: 'Layers', title: 'ออกแบบ Slides ที่สื่อสาร Key Message อย่างชัดเจน' },
      { icon: 'Brain', title: 'สร้าง Presentation Narrative ที่น่าติดตามตั้งแต่ต้นถึงจบ' },
      { icon: 'Zap', title: 'นำเสนอด้วยความมั่นใจและ Engage ผู้ฟัง' },
      { icon: 'Target', title: 'จัดการ Q&A ได้อย่างมีประสิทธิภาพและมั่นใจ' },
      { icon: 'Eye', title: 'ปรับ Presentation ให้เหมาะกับ Audience และ Context ต่างๆ' }
    ],
  },

  {
    slug: 'storytelling-for-business',
    title: 'Storytelling for Business',
    category: 'Communication Skills',
    description: 'เล่าเรื่องธุรกิจที่ทรงพลัง สร้างการเชื่อมโยง ความไว้วางใจ และ Buy-in จากทุกคน',
    image: IMAGES.storytelling,
    alt_text: 'หลักสูตร Storytelling for Business - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้บริหาร, Sales, Marketing, HR, ผู้นำที่ต้องสร้างแรงบันดาลใจ',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'จำ', label: 'ข้อมูลถูกลืม แต่เรื่องเล่าถูกจำ', desc: 'งานวิจัย Neuroscience พบว่าสมองจำ Stories ได้ดีกว่า Data ถึง 22 เท่า Business Storytelling คือเครื่องมือ Influence ที่ทรงพลังที่สุด' },
      { icon: 'Target', stat: 'ขาด', label: 'ขาดทักษะเชื่อมข้อมูลกับ Human Experience', desc: 'การนำเสนอด้วยตัวเลขและ Bullet Points อย่างเดียวไม่สร้าง Emotional Connection ที่นำไปสู่การตัดสินใจและ Action' },
      { icon: 'Flame', stat: 'ไม่', label: 'ยังไม่รู้วิธีสร้าง Business Story ที่มีโครงสร้าง', desc: 'หลายคนมีเรื่องดีๆ แต่ไม่รู้วิธีเรียงร้อยให้เป็น Narrative ที่สื่อสาร Message ได้อย่างทรงพลัง' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Story Architecture', desc: 'เรียนรู้ Business Story Frameworks เช่น Hero Journey, STAR, และ Problem-Insight-Action' },
      { icon: 'Heart', title: 'Authentic Story Mining', desc: 'ค้นหาและพัฒนา Personal และ Business Stories ที่แท้จริงและมีพลัง' },
      { icon: 'Zap', title: 'Story Performance', desc: 'ฝึกเล่าเรื่องจริง รับ Feedback และ Coach วิธีส่ง Story ได้อย่างมีผลกระทบ' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าใจ Science ของ Storytelling และทำไมมันทรงพลัง' },
      { icon: 'Heart', title: 'สร้าง Business Stories ที่ Authentic และมีผลกระทบ' },
      { icon: 'Layers', title: 'ใช้ Story Frameworks ที่เหมาะกับแต่ละวัตถุประสงค์' },
      { icon: 'Zap', title: 'เล่าเรื่องได้อย่างมีพลังและสร้าง Emotional Connection' },
      { icon: 'Target', title: 'ประยุกต์ Storytelling ใน Presentation, Sales, และ Leadership' }
    ],
  },

  {
    slug: 'influencing-and-persuasion-skills',
    title: 'Influencing & Persuasion Skills',
    category: 'Communication Skills',
    description: 'สร้างอิทธิพลและโน้มน้าวใจ ทำให้คนอื่นเชื่อและ Act โดยไม่ต้องพึ่งพาอำนาจ',
    image: IMAGES.influence,
    alt_text: 'หลักสูตร Influencing & Persuasion Skills - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, Sales, HR, ผู้นำ, ทุกคนที่ต้องการ Influence ผู้อื่น',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ขาด', label: 'ขาด Influence ทำให้ไอเดียดีไม่ถูกรับฟัง', desc: 'ในองค์กรที่ Matrix ความสำเร็จขึ้นอยู่กับความสามารถ Influence ผู้ที่ไม่ใช่ทีมตัวเอง ทักษะนี้จึงสำคัญมากขึ้นเรื่อยๆ' },
      { icon: 'Brain', stat: 'ผิด', label: 'โน้มน้าวโดยพึ่ง Logic เพียงอย่างเดียว', desc: 'คนตัดสินใจด้วย Emotion ก่อน แล้วใช้ Logic รับรอง การ Persuade ที่ได้ผลต้องเข้าใจทั้ง Emotional และ Rational Drivers' },
      { icon: 'Flame', stat: 'ไม่', label: 'ยังไม่เข้าใจ Principles ของ Influence', desc: 'ทักษะ Influence ไม่ใช่การบงการ แต่คือการเข้าใจ Human Psychology และสร้าง Mutual Value ที่ทำให้คนอยากร่วมมือ' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Influence Psychology', desc: 'เรียนรู้ 6 Principles of Influence ของ Cialdini และ Neuroscience ของการตัดสินใจ' },
      { icon: 'Target', title: 'Persuasion Frameworks', desc: 'ฝึกใช้ AIDA, Monroe Motivated Sequence, และ SPIN ในการ Influence ที่เหมาะกับสถานการณ์' },
      { icon: 'Users', title: 'Influence Role Play', desc: 'ฝึก Influence ในสถานการณ์จำลองที่ยาก เช่น การขายไอเดีย การโน้มน้าว Stakeholder ที่ต่อต้าน' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าใจ Psychology ของ Influence และการตัดสินใจของมนุษย์' },
      { icon: 'Target', title: 'ใช้ Persuasion Techniques ที่เหมาะกับคนและสถานการณ์' },
      { icon: 'Heart', title: 'สร้าง Rapport และ Trust ที่ทำให้ Influence เกิดขึ้นตามธรรมชาติ' },
      { icon: 'Zap', title: 'นำเสนอไอเดียและข้อเสนอที่คนยากจะปฏิเสธ' },
      { icon: 'Eye', title: 'Influence ข้ามระดับและข้ามแผนกได้อย่างมีประสิทธิภาพ' }
    ],
  },

  {
    slug: 'active-listening-deep-dive',
    title: 'Active Listening Deep Dive',
    category: 'Communication Skills',
    description: 'ฟังอย่าง Active เพื่อเข้าใจจริง สร้างความสัมพันธ์ที่ลึกและ Insights ที่มีคุณค่า',
    image: IMAGES.listening,
    alt_text: 'หลักสูตร Active Listening Deep Dive - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, HR, Counselor, หัวหน้าทีม, ทุกคนที่ทำงานกับคน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Brain', stat: 'ฟัง', label: 'ฟังเพื่อตอบ ไม่ใช่ฟังเพื่อเข้าใจ', desc: 'คนส่วนใหญ่ใช้เวลาระหว่างการฟังในการคิดคำตอบแทนที่จะฟังอย่างลึกซึ้ง ทำให้พลาด Nuance สำคัญ' },
      { icon: 'Target', stat: 'ขาด', label: 'ขาด Listening Skills ทำให้พลาด Insights จากทีม', desc: 'ผู้นำที่ฟังไม่ดีพลาด Early Warning Signs, Good Ideas, และสัญญาณที่บ่งบอกว่าทีมกำลังจะออก' },
      { icon: 'Heart', stat: 'เย็น', label: 'ทีมไม่รู้สึกถูกฟังหรือเข้าใจ', desc: 'เมื่อคนไม่รู้สึกถูกฟัง พวกเขาหยุดแบ่งปันความจริง ทำให้ผู้นำขาดข้อมูลที่สำคัญในการตัดสินใจ' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Listening Levels', desc: 'เรียนรู้ 5 Levels of Listening และพัฒนาจากระดับที่ฟังแค่คำพูด สู่ระดับที่ฟัง Intention' },
      { icon: 'Heart', title: 'Presence Practice', desc: 'ฝึก Mindful Listening ที่ Present ร้อยเปอร์เซ็นต์ ไม่ Distract ด้วย Internal Dialogue' },
      { icon: 'MessageCircle', title: 'Reflective Responding', desc: 'เรียนรู้เทคนิค Paraphrasing, Reflection of Feeling, และ Summarizing เพื่อแสดงให้คนรู้ว่าถูกฟังจริง' }
    ],
    what_section: [
      { icon: 'Brain', title: 'ฟังในระดับที่ลึกกว่าคำพูด ถึง Emotion และ Intention' },
      { icon: 'Heart', title: 'สร้างความสัมพันธ์ที่ลึกผ่านการฟังอย่างแท้จริง' },
      { icon: 'Eye', title: 'ค้นพบ Insights และ Information ที่ซ่อนอยู่ในสิ่งที่ไม่ได้พูด' },
      { icon: 'MessageCircle', title: 'ตอบสนองด้วยวิธีที่แสดงให้คนรู้สึกถูกเข้าใจ' },
      { icon: 'Target', title: 'จัดการ Distractions และ Biases ที่ขัดขวางการฟังที่ดี' }
    ],
  },

  {
    slug: 'difficult-conversation-mastery',
    title: 'Difficult Conversation Mastery',
    category: 'Communication Skills',
    description: 'นำบทสนทนาที่ยากได้อย่างมีประสิทธิภาพ เปลี่ยนความไม่สบายใจเป็นการเติบโต',
    image: IMAGES.difficult,
    alt_text: 'หลักสูตร Difficult Conversation Mastery - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, HR, ผู้บริหาร',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'กลัว', label: 'กลัวบทสนทนายากจนหลีกเลี่ยงปัญหา', desc: 'ปัญหาที่ไม่ถูกพูดถึงจะใหญ่ขึ้นเรื่อยๆ การหลีกเลี่ยง Difficult Conversations ทำให้ปัญหาเล็กกลายเป็นวิกฤต' },
      { icon: 'Brain', stat: 'พลาด', label: 'พูดแล้วเกิดความขัดแย้งมากกว่าการแก้ปัญหา', desc: 'การเข้าสู่ Difficult Conversations โดยไม่มี Framework ที่ถูกต้องมักทำให้สถานการณ์แย่ลงและความสัมพันธ์เสีย' },
      { icon: 'Target', stat: 'สูญ', label: 'โอกาสพัฒนาคนหายไปเพราะไม่ Feedback', desc: 'เมื่อผู้นำไม่กล้าให้ Feedback ที่ยาก ทีมสูญเสียโอกาสพัฒนา และพฤติกรรมที่ไม่ดีกลายเป็น Norm' }
    ],
    how_section: [
      { icon: 'Brain', title: 'Conversation Framework', desc: 'เรียนรู้ Crucial Conversations Model และ SBI Framework สำหรับ Difficult Conversations' },
      { icon: 'Heart', title: 'Safety First Approach', desc: 'เทคนิคสร้าง Psychological Safety ก่อนเข้าสู่บทสนทนาที่ยาก เพื่อให้ทั้งสองฝ่ายพูดความจริงได้' },
      { icon: 'Users', title: 'Conversation Simulation', desc: 'ฝึก Difficult Conversations จำลองในสถานการณ์ที่พบบ่อย เช่น Underperformance, Conflict, Termination' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เตรียมตัวและเข้าสู่ Difficult Conversations ได้อย่างมั่นใจ' },
      { icon: 'Heart', title: 'สร้าง Safety ที่ทำให้ทั้งสองฝ่ายพูดความจริงได้' },
      { icon: 'MessageCircle', title: 'ใช้ Language ที่ลดความขัดแย้งและสร้าง Understanding' },
      { icon: 'Target', title: 'นำบทสนทนาสู่ Resolution ที่ทั้งสองฝ่าย Own ได้' },
      { icon: 'Zap', title: 'เปลี่ยน Difficult Conversations เป็น Catalyst ของการเติบโต' }
    ],
  },

  {
    slug: 'feedback-and-coaching-conversation',
    title: 'Feedback & Coaching Conversation',
    category: 'Communication Skills',
    description: 'ให้ Feedback ที่สร้างการเติบโต ไม่ใช่ความขัดแย้ง และโค้ชด้วยคำถามที่ทรงพลัง',
    image: IMAGES.feedback,
    alt_text: 'หลักสูตร Feedback & Coaching Conversation - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, HR & L&D, Mentor',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'กลัว', label: 'กลัวให้ Feedback เพราะกลัวทำให้คนรู้สึกแย่', desc: 'ผู้นำที่หลีกเลี่ยงการให้ Feedback ทำให้ทีมไม่รู้ว่าตัวเองอยู่ตรงไหน และสูญเสียโอกาสพัฒนา' },
      { icon: 'Brain', stat: 'พลาด', label: 'ให้ Feedback แบบ Judgmental ไม่ใช่ Developmental', desc: 'Feedback ที่ฟังดูเหมือนการโจมตีหรือตัดสิน ทำให้คนรู้สึก Defensive แทนที่จะเปิดรับและพัฒนา' },
      { icon: 'Flame', stat: 'ขาด', label: 'ขาดทักษะ Coaching Conversation ที่ดึงความคิด', desc: 'ผู้นำส่วนใหญ่บอกคำตอบแทนที่จะใช้คำถามดึงให้คนคิดเอง ทำให้ทีมพึ่งพาและไม่พัฒนา Ownership' }
    ],
    how_section: [
      { icon: 'Target', title: 'Feedback Models', desc: 'เรียนรู้ SBI Model, Feedforward Approach, และ Radical Candor ในการให้ Feedback' },
      { icon: 'Brain', title: 'Coaching Conversation Practice', desc: 'ฝึก Coaching Conversation ด้วย GROW Model และ Powerful Questions ในคู่และกลุ่มเล็ก' },
      { icon: 'Heart', title: 'Feedback Reception', desc: 'เรียนรู้วิธีรับ Feedback อย่าง Gracefully และ Use มันเพื่อ Grow ไม่ใช่ Defend' }
    ],
    what_section: [
      { icon: 'Target', title: 'ให้ Feedback ที่ Specific, Timely, และ Actionable' },
      { icon: 'Brain', title: 'สร้าง Feedback Culture ที่ทีม Seek และ Give ได้อย่างเป็นธรรมชาติ' },
      { icon: 'MessageCircle', title: 'ดำเนิน Coaching Conversation ที่ดึงศักยภาพออกมา' },
      { icon: 'Heart', title: 'รับ Feedback อย่าง Open-minded และนำไปพัฒนาตัวเอง' },
      { icon: 'Zap', title: 'สร้าง Regular Feedback Rhythms ในทีมที่สม่ำเสมอ' }
    ],
  },

  {
    slug: 'nonverbal-communication',
    title: 'Nonverbal Communication',
    category: 'Communication Skills',
    description: 'อ่านและส่งสัญญาณ Nonverbal อย่างชำนาญ สร้างความน่าเชื่อถือและความเข้าใจที่ลึก',
    image: IMAGES.nonverbal,
    alt_text: 'หลักสูตร Nonverbal Communication - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, HR, Sales, ผู้บริหาร, ทุกคนที่ต้องการสร้าง Presence',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Eye', stat: 'พลาด', label: 'ส่ง Nonverbal Messages ที่ขัดแย้งกับคำพูด', desc: 'เมื่อ Body Language ไม่สอดคล้องกับคำพูด คนฟังจะเชื่อ Body Language มากกว่า ทำให้ Credibility ลดลง' },
      { icon: 'Brain', stat: 'ไม่', label: 'ยังไม่รู้วิธีอ่าน Nonverbal ของคนอื่น', desc: 'ทักษะการอ่าน Body Language ทำให้เข้าใจสิ่งที่คนไม่ได้พูด เช่น ความไม่สบายใจ ความสนใจ และความเห็นด้วย' },
      { icon: 'Flame', stat: 'ขาด', label: 'ขาด Physical Presence ที่ทำให้คนเชื่อและฟัง', desc: 'Executive Presence ส่วนใหญ่มาจาก Nonverbal Communication ผู้ที่ขาดทักษะนี้มักถูกมองข้ามแม้จะมีความสามารถ' }
    ],
    how_section: [
      { icon: 'Eye', title: 'Body Language Reading', desc: 'เรียนรู้วิธีอ่าน Micro-expressions, Gestures, Posture, และ Proxemics อย่างแม่นยำ' },
      { icon: 'Zap', title: 'Presence Training', desc: 'ฝึก Power Poses, Open Body Language, และ Eye Contact ที่สร้าง Confidence และ Credibility' },
      { icon: 'Target', title: 'Video Analysis', desc: 'วิเคราะห์ Video ของตัวเองและผู้นำระดับโลกเพื่อเรียนรู้ Best Practices' }
    ],
    what_section: [
      { icon: 'Eye', title: 'อ่าน Body Language ของคนอื่นได้อย่างแม่นยำและรวดเร็ว' },
      { icon: 'Zap', title: 'ส่ง Nonverbal Messages ที่สอดคล้องกับคำพูดและสร้าง Credibility' },
      { icon: 'Flame', title: 'สร้าง Physical Presence ที่ทำให้คนเชื่อถือและสนใจ' },
      { icon: 'Brain', title: 'จัดการ Nervous Body Language ในสถานการณ์กดดัน' },
      { icon: 'Users', title: 'ใช้ Nonverbal Communication ในการสร้าง Rapport อย่างรวดเร็ว' }
    ],
  },

  {
    slug: 'communication-for-leaders',
    title: 'Communication for Leaders',
    category: 'Communication Skills',
    description: 'สื่อสารในฐานะผู้นำ Executive Messaging และการส่งสารที่ Cascade ลงสู่ทีมได้อย่างมีประสิทธิภาพ',
    image: IMAGES.communication,
    alt_text: 'หลักสูตร Communication for Leaders - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'CEO / MD, ผู้บริหาร, ผู้จัดการ, Future Leader',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Zap', stat: 'ขาด', label: 'Executive Communication ไม่ตรงกับความคาดหวัง', desc: 'ผู้นำระดับสูงต้องสื่อสารต่างจากพนักงานทั่วไป ทั้งในด้านความกระชับ ความมั่นใจ และการ Frame Message ที่ Inspire คนจำนวนมาก' },
      { icon: 'Target', stat: 'พลาด', label: 'Message จาก Leadership ไม่ถึงพนักงาน Front-line', desc: 'การสื่อสารจากระดับ CEO ลงสู่ Front-line มักสูญเสีย Essence และ Context ทำให้ทีมไม่ Aligned กับ Direction' },
      { icon: 'Brain', stat: 'ไม่', label: 'ขาด Communication Strategy ที่เหมาะกับแต่ละ Stakeholder', desc: 'ผู้นำต้องสื่อสารกับ Board, Investors, Employees, Media และ Customers แตกต่างกัน ทักษะนี้ต้องพัฒนาอย่างตั้งใจ' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Executive Communication Framework', desc: 'เรียนรู้ Pyramid Principle, BLUF (Bottom Line Up Front), และ Executive Messaging Structure' },
      { icon: 'Target', title: 'Stakeholder Communication Mapping', desc: 'ออกแบบ Communication Strategy สำหรับ Stakeholders แต่ละกลุ่มที่มี Needs ต่างกัน' },
      { icon: 'Zap', title: 'Crisis Communication', desc: 'ฝึกสื่อสารในภาวะวิกฤตและสถานการณ์กดดัน ด้วยความมั่นใจและความโปร่งใส' }
    ],
    what_section: [
      { icon: 'Zap', title: 'สื่อสารในระดับ Executive ด้วยความกระชับ ชัด และมีพลัง' },
      { icon: 'Layers', title: 'ออกแบบ Communication Strategy สำหรับ Stakeholders ทุกระดับ' },
      { icon: 'Target', title: 'Cascade Message จาก Leadership ลงสู่ทีมได้อย่างมีประสิทธิภาพ' },
      { icon: 'Brain', title: 'สื่อสารในภาวะวิกฤตด้วยความมั่นคงและความน่าเชื่อถือ' },
      { icon: 'Eye', title: 'สร้าง Communication Presence ที่เหมาะกับ Leadership Level' }
    ],
  },

  {
    slug: 'cross-functional-communication',
    title: 'Cross-Functional Communication',
    category: 'Communication Skills',
    description: 'สื่อสารข้ามแผนกได้อย่างมีประสิทธิภาพ ทลายกำแพง Silo และสร้างการทำงานร่วมกัน',
    image: IMAGES.crossfunc,
    alt_text: 'หลักสูตร Cross-Functional Communication - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'ผู้จัดการ, Project Manager, ทุกคนที่ทำงานข้ามแผนก',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ติด', label: 'Silo Mentality ทำให้ข้อมูลไม่ Flow', desc: 'เมื่อแผนกต่างๆ ไม่สื่อสารกันอย่างมีประสิทธิภาพ การตัดสินใจช้า งาน Duplicate และโอกาสหายไป' },
      { icon: 'Brain', stat: 'ไม่', label: 'ไม่เข้าใจบริบทและภาษาของแผนกอื่น', desc: 'แต่ละแผนกมี Jargon, KPIs, และ Priorities ของตัวเอง การไม่เข้าใจบริบทของกันและกันทำให้ Miscommunication บ่อย' },
      { icon: 'Flame', stat: 'สูญ', label: 'โปรเจคข้ามแผนกล้มเหลวเพราะขาด Alignment', desc: 'Cross-functional Projects ส่วนใหญ่ล้มเหลวไม่ใช่เพราะขาดทักษะ แต่เพราะขาด Communication ที่ดีระหว่างทีม' }
    ],
    how_section: [
      { icon: 'Layers', title: 'Cross-functional Dynamics', desc: 'เข้าใจ Organizational Dynamics ที่ทำให้ Silo เกิดขึ้น และวิธีสร้าง Cross-functional Bridges' },
      { icon: 'MessageCircle', title: 'Stakeholder Communication', desc: 'เรียนรู้วิธีปรับ Message สำหรับ Stakeholders ต่างแผนกที่มี Needs และ Language ต่างกัน' },
      { icon: 'Users', title: 'Cross-team Workshop', desc: 'กิจกรรมที่สร้าง Cross-functional Understanding และ Collaboration จริง' }
    ],
    what_section: [
      { icon: 'Brain', title: 'เข้าใจ Perspectives และ Needs ของแผนกอื่นๆ' },
      { icon: 'MessageCircle', title: 'ปรับ Message ให้ Resonate กับ Stakeholders ต่างกลุ่ม' },
      { icon: 'Users', title: 'สร้าง Cross-functional Relationships ที่แน่นแฟ้น' },
      { icon: 'Target', title: 'Align Goals และ Expectations ระหว่างทีมที่แตกต่างกัน' },
      { icon: 'Zap', title: 'ทลาย Silo และสร้างวัฒนธรรม Collaboration ข้ามแผนก' }
    ],
  },

  {
    slug: 'communication-for-team-alignment',
    title: 'Communication for Team Alignment',
    category: 'Communication Skills',
    description: 'สื่อสารเพื่อสร้าง Team Alignment ทุกคนเข้าใจเป้าหมาย บทบาท และ Direction เดียวกัน',
    image: IMAGES.alignment,
    alt_text: 'หลักสูตร Communication for Team Alignment - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–50 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, CEO, ผู้นำที่ต้องสื่อสาร Direction',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ต่าง', label: 'ทีมเข้าใจเป้าหมายไม่ตรงกัน', desc: 'เมื่อทีมไม่ Aligned กับเป้าหมาย ความพยายามของแต่ละคนไปคนละทิศ ทำให้ผลรวมน้อยกว่าที่ควรจะเป็นมาก' },
      { icon: 'Brain', stat: 'ขาด', label: 'ขาดวิธีสื่อสาร Direction ให้ทีมทุกระดับเข้าใจ', desc: 'การสื่อสาร Strategy จาก C-level ลงมาสู่ Front-line มักสูญเสีย Context และ Meaning ทำให้ Execution ไม่ตรงทิศ' },
      { icon: 'Flame', stat: 'สูญ', label: 'Meeting เยอะแต่ Alignment ไม่เกิดขึ้นจริง', desc: 'จำนวน Meeting ไม่ได้การันตี Alignment หากขาดกระบวนการสื่อสารที่ทำให้คนเข้าใจจริงและ Commit จริง' }
    ],
    how_section: [
      { icon: 'Target', title: 'Alignment Communication Framework', desc: 'เรียนรู้ 3C Model: Context, Content, Commitment สำหรับการสื่อสารที่สร้าง Alignment จริง' },
      { icon: 'Layers', title: 'Cascade Communication', desc: 'เทคนิคการ Cascade Message จาก Leadership ลงสู่ทีมโดยไม่สูญเสีย Essence' },
      { icon: 'Users', title: 'Alignment Meeting Design', desc: 'ออกแบบ Meetings ที่สร้าง Alignment จริง ไม่ใช่แค่ Information Sharing' }
    ],
    what_section: [
      { icon: 'Target', title: 'สื่อสาร Goals และ Strategy ให้ทีมเข้าใจและ Commit' },
      { icon: 'Brain', title: 'ออกแบบ Communication Flow ที่สร้าง Alignment ทุกระดับ' },
      { icon: 'Layers', title: 'ดำเนิน Alignment Meetings ที่ได้ผลจริง' },
      { icon: 'Users', title: 'ตรวจสอบ Alignment และปรับแก้ได้อย่างรวดเร็ว' },
      { icon: 'Zap', title: 'สร้าง Communication Rituals ที่รักษา Alignment ต่อเนื่อง' }
    ],
  },

  {
    slug: 'public-speaking-confidence',
    title: 'Public Speaking Confidence',
    category: 'Communication Skills',
    description: 'พูดต่อสาธารณะด้วยความมั่นใจ เปลี่ยนความกลัวเป็นพลังงานที่ทำให้ผู้ฟัง Engage',
    image: IMAGES.publicspeaking,
    alt_text: 'หลักสูตร Public Speaking Confidence - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–30 คน',
    audience: 'ทุกคนที่ต้องการพัฒนาความมั่นใจในการพูดต่อหน้าคน',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Flame', stat: 'กลัว', label: 'การพูดต่อหน้าคนคือความกลัวอันดับ 1 ของมนุษย์', desc: 'งานวิจัยพบว่าคนกลัวการพูดต่อหน้าคนมากกว่ากลัวตาย ความกลัวนี้ทำให้พลาดโอกาสสำคัญมากมาย' },
      { icon: 'Brain', stat: 'ขาด', label: 'ขาดทักษะและ Framework ที่ทำให้พูดได้ดี', desc: 'Public Speaking ไม่ใช่พรสวรรค์ แต่คือทักษะที่พัฒนาได้ คนที่ขาด Training มักพูดไม่มีโครงสร้างและ Lose Audience' },
      { icon: 'Target', stat: 'สูญ', label: 'ไม่กล้าพูดทำให้พลาดโอกาสแสดงความสามารถ', desc: 'ในองค์กรที่ Visibility สำคัญ คนที่ไม่กล้าพูดมักถูกมองข้ามสำหรับ Promotion และ Leadership Roles' }
    ],
    how_section: [
      { icon: 'Flame', title: 'Fear Management', desc: 'เทคนิค Reframe ความกลัวการพูดเป็น Excited Energy ที่เพิ่มประสิทธิภาพ' },
      { icon: 'Layers', title: 'Speech Structure Practice', desc: 'ฝึกสร้างและส่งสาร Speech ที่มีโครงสร้างชัดในเวลาจำกัด' },
      { icon: 'Zap', title: 'Progressive Exposure', desc: 'ฝึกพูดในกลุ่มที่เพิ่มขนาดขึ้นเรื่อยๆ เพื่อ Build Confidence อย่างค่อยเป็นค่อยไป' }
    ],
    what_section: [
      { icon: 'Flame', title: 'เปลี่ยนความกลัวการพูดเป็นพลังงานที่ Engage ผู้ฟัง' },
      { icon: 'Layers', title: 'สร้าง Speech ที่มีโครงสร้างชัดในเวลาสั้น' },
      { icon: 'Zap', title: 'พูดด้วยความมั่นใจต่อหน้าคนทุกขนาด' },
      { icon: 'Brain', title: 'จัดการ Nervous Energy ก่อนและระหว่างการพูด' },
      { icon: 'Eye', title: 'สร้าง Connection กับ Audience ตั้งแต่วินาทีแรก' }
    ],
  },

  {
    slug: 'facilitation-skills-for-communication',
    title: 'Facilitation Skills for Communication',
    category: 'Communication Skills',
    description: 'ทักษะ Facilitator สำหรับการสื่อสาร อำนวยการสนทนาที่ดึงความคิดและสร้างผลลัพธ์',
    image: IMAGES.facilitation,
    alt_text: 'หลักสูตร Facilitation Skills for Communication - CAP Vision Institute',
    duration: 'In-house Training 1–2 วัน | 20–40 คน',
    audience: 'HR, Training Manager, หัวหน้าทีม, ผู้จัดการ, วิทยากร',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Target', stat: 'ไม่', label: 'ประชุมยาวแต่ไม่ได้ Decision หรือ Action', desc: 'Meetings ส่วนใหญ่ขาด Facilitation ที่ดี ทำให้วนเวียน ไม่ Focus และจบโดยไม่มีข้อสรุปที่ชัดเจน' },
      { icon: 'Brain', stat: 'เงียบ', label: 'บางคนพูดมาก บางคนไม่ได้พูดเลย', desc: 'การประชุมที่ขาด Facilitation ที่ดีมักมีคน Dominate การสนทนา ทำให้สูญเสีย Perspectives ที่มีคุณค่าจากคนที่เงียบ' },
      { icon: 'Flame', stat: 'หาย', label: 'ความคิดดีๆ ในห้องถูกเก็บสงวนไว้ ไม่ออกมา', desc: 'ทักษะ Facilitation ที่ดีทำให้ดึงความคิดจากทุกคนออกมา ไม่ใช่แค่คนที่กล้าพูดหรือมีอำนาจ' }
    ],
    how_section: [
      { icon: 'MessageCircle', title: 'Facilitation Techniques', desc: 'เรียนรู้เทคนิค Facilitation เช่น Open Space, World Café, Fishbowl, Dot Voting' },
      { icon: 'Brain', title: 'Powerful Questions', desc: 'พัฒนาทักษะการใช้คำถามปลายเปิดที่ดึงความคิดและสร้าง Insight ในกลุ่ม' },
      { icon: 'Users', title: 'Group Dynamics Management', desc: 'เรียนรู้วิธีจัดการ Difficult Participants, Domination, และ Silence ในกลุ่มสนทนา' }
    ],
    what_section: [
      { icon: 'MessageCircle', title: 'ออกแบบและดำเนิน Facilitated Sessions ที่ได้ผล' },
      { icon: 'Brain', title: 'ใช้ Powerful Questions ดึงความคิดจากทุกคนในกลุ่ม' },
      { icon: 'Users', title: 'จัดการ Group Dynamics รวมถึง Difficult Participants' },
      { icon: 'Target', title: 'นำการสนทนาสู่ Decision และ Action อย่างมีประสิทธิภาพ' },
      { icon: 'Layers', title: 'ใช้ Facilitation Tools ที่หลากหลายตามบริบท' }
    ],
  },

  {
    slug: 'meaningful-conversation',
    title: 'Meaningful Conversation',
    category: 'Communication Skills',
    description: 'สื่อสารเชื่อมใจทีม สร้างบทสนทนาที่มีความหมาย สร้างความเชื่อมโยงและความเข้าใจที่ลึก',
    image: IMAGES.meaningful,
    alt_text: 'หลักสูตร Meaningful Conversation - CAP Vision Institute',
    duration: 'In-house Training 1 วัน | 20–40 คน',
    audience: 'ผู้จัดการ, หัวหน้าทีม, HR, ทุกคนที่อยากสร้างความสัมพันธ์ที่ลึก',
    is_published: true,
    instructor_id: INSTRUCTOR_ID,
    why_section: [
      { icon: 'Heart', stat: 'ตื้น', label: 'บทสนทนาส่วนใหญ่ตื้น ไม่สร้าง Connection จริง', desc: 'ในยุคดิจิทัลที่สื่อสารเร็วขึ้น Meaningful Conversation กลับหายากขึ้น ทำให้ความสัมพันธ์ในองค์กรเป็นแค่ Transactional' },
      { icon: 'Brain', stat: 'ไม่', label: 'ยังไม่รู้วิธีเปิดบทสนทนาที่ลึกและมีความหมาย', desc: 'การเปิดบทสนทนาที่ไปถึงระดับ Values, Meaning, และ Dreams ต้องการทักษะและ Courage ที่ต้องพัฒนา' },
      { icon: 'Target', stat: 'สูญ', label: 'สูญเสีย Human Connection เพราะบทสนทนาจำกัดแค่งาน', desc: 'ทีมที่ไม่มี Meaningful Conversations ขาด Bonding ที่จะทำให้ฝ่าวิกฤตร่วมกันได้และสร้างนวัตกรรมร่วมกันได้' }
    ],
    how_section: [
      { icon: 'Heart', title: 'Circle Dialogue', desc: 'วงสนทนาแบบ Circle ที่สร้างพื้นที่ปลอดภัยให้ทุกคนแบ่งปันอย่างแท้จริง' },
      { icon: 'Brain', title: 'Question Design', desc: 'เรียนรู้วิธีออกแบบคำถามที่เปิดบทสนทนาระดับลึก ไปถึง Values และ Meaning' },
      { icon: 'Eye', title: 'Deep Presence Practice', desc: 'ฝึก Present อย่างเต็มที่ในบทสนทนา ไม่ Distract และ ไม่ Judge' }
    ],
    what_section: [
      { icon: 'Heart', title: 'เปิดและดำเนิน Meaningful Conversations ได้อย่างเป็นธรรมชาติ' },
      { icon: 'Brain', title: 'ออกแบบคำถามที่นำสู่บทสนทนาที่มีความหมาย' },
      { icon: 'Eye', title: 'Present อย่างเต็มที่ในบทสนทนาโดยไม่ Distract' },
      { icon: 'Users', title: 'สร้าง Culture ของ Meaningful Conversation ในทีม' },
      { icon: 'Zap', title: 'เชื่อมความสัมพันธ์ที่ลึกและไว้วางใจด้วยการสนทนา' }
    ],
  },

];

// ─── Main Function ─────────────────────────────────────────────────
async function main() {
  console.log('CAP Vision — Master Course Seed (50 Courses)');
  console.log('=============================================\n');
  console.log(`Supabase URL: ${SUPABASE_URL}`);
  console.log(`Total courses: ${courses.length}\n`);

  const results = { success: 0, error: 0, errors: [] };

  for (const course of courses) {
    const { error } = await supabase
      .from('courses')
      .upsert(course, { onConflict: 'slug' });

    if (error) {
      console.error(`  ❌ ${course.slug}: ${error.message}`);
      results.error++;
      results.errors.push({ slug: course.slug, message: error.message });
    } else {
      console.log(`  ✅ ${course.category.padEnd(25)} | ${course.slug}`);
      results.success++;
    }
  }

  console.log('\n─────────────────────────────────────────────');
  console.log(`Results: ${results.success} success, ${results.error} errors`);

  if (results.errors.length > 0) {
    console.log('\nFailed:');
    results.errors.forEach(e => console.log(`  - ${e.slug}: ${e.message}`));
  }

  // Summary by category
  const categories = [...new Set(courses.map(c => c.category))];
  console.log('\nSummary by Category:');
  categories.forEach(cat => {
    const count = courses.filter(c => c.category === cat).length;
    console.log(`  ${cat.padEnd(25)}: ${count} courses`);
  });

  console.log('\nDone! Run the following to verify:');
  console.log('  node -e "const {createClient}=require(\'@supabase/supabase-js\'); ..."');
}

main().catch(console.error);
