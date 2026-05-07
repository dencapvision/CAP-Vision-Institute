import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { resolve } from 'path';

const envPathLocal = resolve(process.cwd(), '.env.local');
const envPath = resolve(process.cwd(), '.env');
const configPath = fs.existsSync(envPathLocal) ? envPathLocal : fs.existsSync(envPath) ? envPath : null;
if (configPath) {
  fs.readFileSync(configPath, 'utf-8').split('\n').forEach(line => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  });
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SERVICE_ROLE_KEY || '';
if (!SUPABASE_URL || !SUPABASE_KEY) { console.error('Missing credentials'); process.exit(1); }

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Communication Skills — 14 courses ────────────────────────
// Excluded: communication-mastery (already done with full script)
const courses = [
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'powerful-speaking',
    objectives: [
      {
        icon: 'Zap',
        title: 'Module 1 — Voice Foundation: เสียงและพลังงานที่สร้างความน่าเชื่อถือ',
        desc: 'เสียงของคุณคือเครื่องมือที่ทรงพลังที่สุด ก่อนจะพูดให้คนเชื่อ ต้องฝึกให้เสียงสื่อความมั่นใจก่อน\n\n- Voice Anatomy: ทำความรู้จักกับกลไกการสร้างเสียงที่ทรงพลัง\n- Pace, Pitch, Volume, Pause — 4 ตัวแปรที่เปลี่ยนความหมายของคำเดียวกัน\n- การหายใจแบบ Diaphragmatic เพื่อเสียงที่มั่นคงและมีพลัง\n- Vocal Warm-Up Routine ที่ใช้ได้ก่อนการพูดทุกครั้ง\n- Workshop: บันทึกเสียงและวิเคราะห์ Vocal Signature ของตัวเอง'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Message Architecture: สร้างโครงสร้างข้อความที่ฟังแล้วเข้าใจทันที',
        desc: 'ข้อความที่ดีไม่ใช่แค่พูดได้ครบ แต่ต้องพูดแล้วคนได้ยินและจำได้\n\n- Bottom Line Up Front (BLUF): สรุปก่อน ขยายทีหลัง\n- Rule of Three: สมองมนุษย์จำได้ดีที่สุดเมื่อมีสามประเด็น\n- Signposting: ใช้ภาษานำทางให้ผู้ฟังรู้ว่าตามทัน\n- วิธีตัดข้อมูลที่ไม่จำเป็นออกโดยไม่สูญเสียความสมบูรณ์\n- Workshop: แปลง Idea ซับซ้อนให้เป็นการพูด 2 นาทีที่คนเข้าใจ'
      },
      {
        icon: 'Eye',
        title: 'Module 3 — Presence and Body Language: ร่างกายที่พูดแทนคำพูด',
        desc: 'กว่า 55% ของความประทับใจมาจากภาษากาย ไม่ใช่คำพูด\n\n- Power Posture: ท่ายืน/นั่งที่สื่อความมั่นใจและเปิดรับ\n- Eye Contact ที่สร้าง Connection ไม่ใช่ความกดดัน\n- Gesture ที่เสริมความหมาย ไม่ทำให้ฟุ้งซ่าน\n- Micro-expression Awareness: อ่านและควบคุมการแสดงออกที่ไม่ตั้งใจ\n- Workshop: ฝึกพูดหน้ากล้อง วิเคราะห์ Presence ของตัวเอง'
      },
      {
        icon: 'Heart',
        title: 'Module 4 — Emotional Connection: สร้างความเชื่อมโยงทางอารมณ์กับผู้ฟัง',
        desc: 'คนจะเชื่อในสิ่งที่คุณพูดก็ต่อเมื่อเขารู้สึกว่าคุณพูดเพื่อเขา ไม่ใช่เพื่อตัวเอง\n\n- Empathy in Speaking: พูดจากมุมมองของผู้ฟัง ไม่ใช่ผู้พูด\n- วิธีใช้ภาษาที่สร้าง Inclusion ไม่ใช่ Exclusion\n- Emotional Hooks: เปิดและปิดการพูดด้วยอารมณ์ที่ถูกต้อง\n- Vulnerability as Strength: เปิดเผยตัวเองในระดับที่เหมาะสมเพื่อสร้างความไว้ใจ\n- Role Play: พูดเรื่องเดิมสองแบบ — แบบ Information vs แบบ Connection'
      },
      {
        icon: 'Star',
        title: 'Module 5 — Powerful Closing and Q&A: จบอย่างทรงพลังและรับมือคำถามอย่างมืออาชีพ',
        desc: 'การจบที่ดีสร้างความประทับใจที่อยู่กับคนฟังนานที่สุด\n\n- The Peak-End Rule: ทำไมนาทีสุดท้ายสำคัญที่สุด\n- Call to Action ที่ชัดและทำให้คนอยากลงมือทำจริง\n- Q&A Mastery: รับมือคำถามยาก คำถามที่ไม่รู้คำตอบ และคำถามเชิงโจมตี\n- Bridging Technique: เชื่อมคำถามกลับสู่ Key Message ของตัวเอง\n- Workshop: Final Presentation พร้อม Live Q&A รับ Feedback จริง'
      }
    ],
    long_description: `เสียงของคุณมีพลังเพียงพอที่จะเปลี่ยนความคิดคน — คำถามคือ คุณได้ใช้พลังนั้นเต็มที่หรือยัง

Powerful Speaking ออกแบบสำหรับผู้ที่ต้องการพัฒนาทักษะการพูดอย่างครบมิติ ตั้งแต่การใช้เสียง ภาษากาย โครงสร้างข้อความ ไปจนถึงการสร้างพลังและความเชื่อมโยงทางอารมณ์กับผู้ฟัง ผ่านกระบวนการฝึกฝนที่เน้นการลงมือทำจริงและรับ Feedback แบบ Real-time

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- พูดได้ชัด มีโครงสร้าง และผู้ฟังติดตามได้โดยไม่หลุด
- ภาษากายและเสียงสื่อความมั่นใจและความน่าเชื่อถือโดยอัตโนมัติ
- รับมือคำถามและสถานการณ์ที่ไม่คาดคิดได้อย่างมืออาชีพ

---

#### เหมาะสำหรับ

- ผู้บริหารและหัวหน้าทีมที่ต้องพูดในที่ประชุม นำเสนอ และสื่อสารกับทีม
- ผู้ที่ต้องการสร้างความมั่นใจในการพูดต่อหน้าคนหมู่มาก
- Sales Executive, Business Developer, และผู้ที่ต้องโน้มน้าวใจผู้อื่นในงาน

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'presentation-like-a-pro',
    objectives: [
      {
        icon: 'Layers',
        title: 'Module 1 — Slide Design Thinking: ออกแบบสไลด์ที่ทำงานเพื่อผู้ฟัง ไม่ใช่เพื่อผู้พูด',
        desc: 'สไลด์ที่ดีไม่ใช่สไลด์ที่สวย แต่คือสไลด์ที่ช่วยให้ผู้ฟังเข้าใจและจดจำได้\n\n- One Slide, One Idea: หลักการที่เปลี่ยนวิธีคิดเรื่อง Slide\n- Visual Hierarchy: ทำให้ตาผู้ฟังไปหาสิ่งที่สำคัญที่สุดก่อน\n- Data Visualization: เปลี่ยนตัวเลขและกราฟให้เป็นเรื่องราวที่เข้าใจได้\n- Font, Color, Whitespace — 3 ตัวแปรที่ทำให้สไลด์ดูมืออาชีพหรือสมัครเล่น\n- Workshop: Redesign สไลด์เก่าของตัวเองให้ดีขึ้นในเวลา 20 นาที'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Story Structure for Presentation: เล่าเรื่องในการนำเสนอ',
        desc: 'Presentation ที่ดีที่สุดไม่ใช่การรายงานข้อมูล แต่คือการเล่าเรื่องที่ผู้ฟังอยากติดตาม\n\n- McKinsey Pyramid Principle: สร้างโครงสร้างจากสรุปสู่หลักฐาน\n- Problem-Solution-Benefit Framework: สูตรการนำเสนอที่โน้มน้าวใจได้\n- Narrative Arc: เพิ่ม Tension และ Resolution ให้การนำเสนอมีชีวิต\n- Opening Hook ที่ดึงความสนใจใน 30 วินาทีแรก\n- Workshop: ออกแบบ Opening ของ Presentation ที่เตรียมไว้จริง'
      },
      {
        icon: 'Zap',
        title: 'Module 3 — Delivery Excellence: นำเสนอด้วยความมั่นใจและพลังงานที่ถูกต้อง',
        desc: 'เนื้อหาดีแต่นำเสนอไม่เป็น ก็ไม่มีใครได้ประโยชน์จากมัน\n\n- The Presenter Mindset: เปลี่ยนจาก Fear of Judgment สู่ Focus on Audience\n- Pacing และการใช้ Silence ให้เป็นพลัง ไม่ใช่ความกลัว\n- Managing Nerves: เทคนิคทางวิทยาศาสตร์ที่ลด Performance Anxiety\n- How to Handle Technical Failures อย่างเป็นธรรมชาติ\n- Workshop: ฝึก Presentation จริง 5 นาที รับ Feedback ทันที'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Audience Engagement: ทำให้ผู้ฟังมีส่วนร่วมตลอดการนำเสนอ',
        desc: 'Presentation ที่ดีไม่ใช่การพูดทางเดียว แต่คือการสร้างประสบการณ์ร่วมกัน\n\n- Interactive Techniques: Poll, Question, Think-Pair-Share ในการนำเสนอ\n- Reading the Room: อ่านสัญญาณจากผู้ฟังและปรับ Style ได้ทันที\n- Storytelling Checkpoints: ใส่ Micro-story ระหว่างนำเสนอเพื่อรักษาความสนใจ\n- Virtual Presentation Skills: เทคนิคเฉพาะสำหรับการนำเสนอออนไลน์\n- Workshop: ทดลอง Engagement Technique กับกลุ่มจริง'
      },
      {
        icon: 'Target',
        title: 'Module 5 — Executive Presentation: นำเสนอต่อผู้บริหารและผู้มีอำนาจตัดสินใจ',
        desc: 'การนำเสนอต่อ C-Level ต้องการ Skills คนละชุดกับการนำเสนอทั่วไป\n\n- Executive Attention Span: ทำไมต้องสรุปใน 3 นาทีแรก\n- ROI-First Thinking: พูดภาษาที่ผู้บริหารสนใจ — ตัวเลข ความเสี่ยง โอกาส\n- Handling Tough Questions จากผู้บริหารที่มีข้อมูลมากกว่าคุณ\n- How to Disagree Upward อย่างมืออาชีพและน่าเชื่อถือ\n- Final Presentation: นำเสนอจริงต่อคณะกรรมการในห้อง รับ Feedback ครบมิติ'
      }
    ],
    long_description: `การนำเสนอไม่ใช่แค่การพูดต่อหน้าคน แต่คือการสร้างการเปลี่ยนแปลงในความคิดของผู้ฟัง

Presentation Like a Pro ครอบคลุมทุกมิติของการนำเสนออย่างมืออาชีพ ตั้งแต่การออกแบบสไลด์ที่ทำให้ข้อมูลเป็นเรื่องราว การสร้างโครงสร้างที่โน้มน้าวใจ ไปจนถึงทักษะ Delivery และการจัดการกับสถานการณ์ที่ไม่คาดคิดบนเวที ด้วยการฝึกฝนจากผู้เชี่ยวชาญและ Feedback แบบตรงไปตรงมา

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- นำเสนอได้อย่างมั่นใจ ชัดเจน และน่าประทับใจในทุกบริบท
- ออกแบบสไลด์ที่ดูมืออาชีพและช่วยให้ผู้ฟังเข้าใจได้เร็วขึ้น
- รับมือคำถามและสถานการณ์ฉุกเฉินบนเวทีได้อย่างเป็นธรรมชาติ

---

#### เหมาะสำหรับ

- ผู้จัดการ หัวหน้าทีม และผู้บริหารที่ต้องนำเสนอต่อผู้บริหารระดับสูงหรือลูกค้า
- Business Analyst, Consultant, และทุกคนที่ต้องสื่อสารข้อมูลซับซ้อนให้เข้าใจง่าย
- ผู้ที่ต้องการ Upgrade ทักษะการนำเสนอจากระดับกลางสู่ระดับมืออาชีพ

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'storytelling-for-business',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — Why Stories Work: วิทยาศาสตร์เบื้องหลังพลังของเรื่องเล่า',
        desc: 'สมองมนุษย์ถูกออกแบบมาให้ตอบสนองต่อเรื่องเล่า ไม่ใช่ข้อมูล\n\n- Neural Coupling: ทำไมเรื่องเล่าทำให้สมองผู้ฟัง Sync กับผู้พูด\n- Oxytocin Effect: ฮอร์โมนแห่งความไว้ใจที่เรื่องเล่าสร้างได้\n- Story vs Data: เปรียบเทียบผลลัพธ์ของการสื่อสารสองรูปแบบ\n- ทำไมธุรกิจที่เล่าเรื่องได้ดีกว่าจึงเติบโตเร็วกว่า\n- Workshop: เล่าเรื่องเดิมสองแบบ แล้ววิเคราะห์ว่าแบบไหนโน้มน้าวใจได้มากกว่า'
      },
      {
        icon: 'Layers',
        title: 'Module 2 — Story Structures: โครงสร้างเรื่องเล่าที่ใช้งานได้จริงในธุรกิจ',
        desc: 'เรื่องเล่าที่ดีไม่ได้เกิดจากพรสวรรค์ แต่เกิดจากโครงสร้างที่ถูกต้อง\n\n- The Classic Narrative Arc: Setup, Conflict, Resolution\n- The Star Framework (Situation, Task, Action, Result) สำหรับ Business Story\n- Problem-Agitate-Solve: โครงสร้างสำหรับการนำเสนอปัญหาและทางออก\n- The Pixar Story Spine: Once upon a time / Every day / Until one day...\n- Workshop: สร้าง Business Story ของตัวเองโดยใช้ 2 Framework'
      },
      {
        icon: 'Users',
        title: 'Module 3 — Customer and Brand Story: เล่าเรื่องแบรนด์และลูกค้าให้คนอยากซื้อ',
        desc: 'เรื่องของลูกค้าขายได้ดีกว่าโฆษณาใดๆ ถ้าเล่าอย่างถูกวิธี\n\n- The Customer as Hero Framework: แบรนด์คือ Guide ไม่ใช่ Hero\n- Case Study Storytelling: เปลี่ยน Case Study แห้งๆ ให้เป็นเรื่องน่าติดตาม\n- Testimonial Design: ดึงข้อมูลจากลูกค้าและเรียบเรียงให้ทรงพลัง\n- Origin Story: เล่าที่มาของแบรนด์หรือทีมให้คนรู้สึกเชื่อมโยง\n- Workshop: เขียนและนำเสนอ Customer Story ของผลิตภัณฑ์/บริการของตัวเอง'
      },
      {
        icon: 'Compass',
        title: 'Module 4 — Leadership Storytelling: ผู้นำที่เล่าเรื่องได้สร้างองค์กรที่เดินไปด้วยกัน',
        desc: 'ผู้นำที่ยิ่งใหญ่ทุกคนเป็นนักเล่าเรื่อง พวกเขาไม่สั่งการ แต่สร้างแรงบันดาลใจผ่านเรื่องราว\n\n- Vision Story: เล่า Future ที่ทำให้ทีมอยากเดินไปถึง\n- Lesson Story: แปลงความผิดพลาดและบทเรียนให้เป็นเรื่องราวที่สร้างแรงบันดาลใจ\n- Purpose Story: เชื่อม Why ขององค์กรกับ Why ของแต่ละคน\n- Change Story: ใช้เรื่องเล่าเพื่อนำผู้คนผ่านการเปลี่ยนแปลงที่ยาก\n- Workshop: แต่ละคนเล่า Leadership Story ของตัวเองต่อกลุ่ม'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Storytelling in Action: ใช้เรื่องเล่าในบริบทธุรกิจจริง',
        desc: 'ฝึกใช้ Storytelling ในสถานการณ์ธุรกิจที่พบบ่อยที่สุด\n\n- Pitch Story: เล่าไอเดียหรือโปรเจกต์ให้ผู้บริหารเห็นภาพและอยากสนับสนุน\n- Meeting Opener: เริ่มประชุมด้วยเรื่องเล่าที่ทำให้ทุกคนอยู่ในห้องนั้นจริงๆ\n- Email and Report Storytelling: ใส่ Narrative ลงในงานเขียนทางธุรกิจ\n- Data Storytelling: เล่าเรื่องจากตัวเลขและ Data ให้คนที่ไม่ใช่นักวิเคราะห์เข้าใจ\n- Final Showcase: นำเสนอ Business Story ที่เตรียมมาตลอดหลักสูตร'
      }
    ],
    long_description: `ข้อมูลเปลี่ยนความคิด แต่เรื่องเล่าเปลี่ยนพฤติกรรม

Storytelling for Business ไม่ใช่การสอนเขียนนิยายหรือการพูดสนุก แต่คือการสอนให้นักธุรกิจ ผู้นำ และมืออาชีพทุกคนรู้จักใช้โครงสร้างของเรื่องเล่าเพื่อสื่อสาร โน้มน้าว และสร้างแรงบันดาลใจในบริบทที่ทำงาน ตั้งแต่การ Pitch ไอเดีย การนำประชุม ไปจนถึงการสร้างแบรนด์และวัฒนธรรมองค์กร

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- สื่อสารไอเดียและข้อมูลซับซ้อนให้คนเข้าใจและจำได้นานขึ้น
- โน้มน้าวใจผู้บริหาร ลูกค้า และทีมงานได้ดีขึ้นผ่านเรื่องเล่า
- สร้างแรงบันดาลใจและ Engagement ในทีมผ่าน Leadership Story

---

#### เหมาะสำหรับ

- ผู้บริหาร ผู้นำ และ HR ที่ต้องสื่อสาร Vision และการเปลี่ยนแปลง
- Marketing, Sales, และ Business Development ที่ต้องเล่าเรื่องแบรนด์และลูกค้า
- ผู้ที่ต้องการสร้างอิทธิพลผ่านการสื่อสาร ไม่ใช่ผ่านอำนาจหรือตำแหน่ง

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'influencing-and-persuasion-skills',
    objectives: [
      {
        icon: 'Target',
        title: 'Module 1 — Psychology of Influence: เข้าใจจิตวิทยาที่ขับเคลื่อนการตัดสินใจ',
        desc: 'การโน้มน้าวใจที่แท้จริงไม่ใช่การบังคับ แต่คือการช่วยให้คนตัดสินใจสิ่งที่ดีสำหรับทุกคน\n\n- Cialdini 6 Principles of Influence: Reciprocity, Commitment, Social Proof, Authority, Liking, Scarcity\n- System 1 vs System 2 Thinking: การตัดสินใจที่เกิดจากอารมณ์กับเหตุผล\n- Cognitive Biases ที่นักโน้มน้าวใจต้องรู้และรับผิดชอบ\n- Ethical Influence vs Manipulation: เส้นแบ่งที่ต้องไม่ข้าม\n- Workshop: วิเคราะห์สถานการณ์จริงว่าใช้ Principle ใดในการโน้มน้าวใจ'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 2 — Listening to Influence: ฟังก่อน แล้วค่อยโน้มน้าว',
        desc: 'คนที่โน้มน้าวใจได้ดีที่สุดคือคนที่ฟังได้ดีที่สุด ไม่ใช่คนที่พูดเก่งที่สุด\n\n- Motivational Interviewing: เทคนิคถามเพื่อให้คนโน้มน้าวใจตัวเอง\n- Finding Common Ground: ค้นหาจุดร่วมก่อนเริ่มโน้มน้าว\n- Needs vs Positions: ฟังสิ่งที่คนต้องการจริงๆ ไม่ใช่แค่ที่พวกเขาพูด\n- Empathy Mapping: ทำแผนที่ความคิด ความรู้สึก และความกังวลของผู้ฟัง\n- Workshop: ฝึกสัมภาษณ์เพื่อค้นหา Real Need ของอีกฝ่าย'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Logical and Emotional Appeals: ใช้เหตุผลและอารมณ์ร่วมกันอย่างทรงพลัง',
        desc: 'การโน้มน้าวใจที่ดีต้องสัมผัสทั้งหัวใจและสมองของผู้ฟัง\n\n- Logos, Ethos, Pathos: Aristotle สูตรการโน้มน้าวใจที่ยังใช้ได้อยู่\n- Building a Logical Case: สร้างเหตุผลที่แน่นหนาและโจมตีได้ยาก\n- Emotional Anchoring: ใช้อารมณ์เป็นตัวเปิดก่อนนำเสนอเหตุผล\n- Evidence Hierarchy: รู้ว่าหลักฐานแบบไหนน่าเชื่อถือมากที่สุดในบริบทใด\n- Workshop: สร้าง Persuasion Case สำหรับสถานการณ์ของตัวเองในที่ทำงาน'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Influence Without Authority: โน้มน้าวใจคนที่ไม่ใช่ลูกน้องของคุณ',
        desc: 'ในองค์กรสมัยใหม่ อิทธิพลที่แท้จริงมาจากความไว้ใจ ไม่ใช่ตำแหน่ง\n\n- Stakeholder Mapping: รู้จักผู้มีส่วนได้ส่วนเสียและระดับอิทธิพลของแต่ละคน\n- Coalition Building: สร้างพันธมิตรก่อนที่จะต้องการการสนับสนุน\n- Peer Influence Tactics: โน้มน้าวเพื่อนร่วมงานโดยไม่มีอำนาจบังคับ\n- Managing Up: โน้มน้าวผู้บริหารที่มีอำนาจมากกว่าคุณ\n- Case Study: วิเคราะห์สถานการณ์การโน้มน้าวใจในองค์กรจริง'
      },
      {
        icon: 'Compass',
        title: 'Module 5 — Influence in Difficult Situations: โน้มน้าวใจเมื่อคนไม่เห็นด้วย',
        desc: 'การโน้มน้าวใจที่ยากที่สุดคือเมื่อคนอื่นมีจุดยืนตรงข้ามกับคุณ\n\n- Overcoming Objections: รับมือกับการคัดค้านโดยไม่เข้าสู่การโต้เถียง\n- Reframing: เปลี่ยนกรอบความคิดของผู้ฟังด้วยมุมมองใหม่\n- The Foot-in-the-Door Technique: เริ่มจากสิ่งเล็กๆ ก่อนขอสิ่งใหญ่\n- Dealing with Skeptics and Critics: โน้มน้าวคนที่สงสัยทุกอย่าง\n- Role Play: สถานการณ์โน้มน้าวใจที่ยากที่สุด รับ Feedback จากกลุ่ม'
      }
    ],
    long_description: `อิทธิพลที่แท้จริงไม่ได้มาจากการบีบบังคับ แต่มาจากการเข้าใจคนและสร้างแรงจูงใจจากภายใน

Influencing and Persuasion Skills สอนให้รู้จักกลไกทางจิตวิทยาที่อยู่เบื้องหลังการตัดสินใจ และนำความรู้นั้นมาออกแบบการสื่อสารที่โน้มน้าวใจอย่างมีจริยธรรม ไม่ว่าจะเป็นการ Pitch ไอเดีย ขอทรัพยากร สร้างความร่วมมือข้ามฝ่าย หรือนำพาการเปลี่ยนแปลงในองค์กร

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- โน้มน้าวใจผู้บริหาร เพื่อนร่วมงาน และลูกค้าได้อย่างเป็นธรรมชาติและมีประสิทธิภาพ
- รับมือการคัดค้านได้โดยไม่ทำให้ความสัมพันธ์เสียหาย
- สร้างอิทธิพลในองค์กรโดยไม่ต้องพึ่งอำนาจหรือตำแหน่ง

---

#### เหมาะสำหรับ

- ผู้จัดการโครงการ, Business Analyst, และผู้ที่ต้องขับเคลื่อนงานโดยไม่มีอำนาจโดยตรง
- Sales, Marketing, และผู้ที่ต้องโน้มน้าวลูกค้าหรือผู้มีส่วนได้ส่วนเสีย
- ผู้นำที่ต้องการเพิ่ม Influence ในองค์กรและกับทีมงาน

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'active-listening-deep-dive',
    objectives: [
      {
        icon: 'Brain',
        title: 'Module 1 — The Listening Gap: ทำไมเราฟังแต่ไม่ได้ยิน',
        desc: 'ทุกคนมีหูสองข้าง แต่น้อยคนที่ฟังจริงๆ เพราะสมองเราออกแบบมาเพื่อตอบ ไม่ใช่เพื่อฟัง\n\n- The Listening Statistics: เราฟังจริงแค่ 25% ของที่ได้ยิน\n- Internal Interference: Assumptions, Judgments, Planning Response\n- External Interference: Device, Environment, Multi-tasking\n- Listening Styles: เราแต่ละคนมี Listening Style ที่ต่างกัน\n- Self-Assessment: วัด Listening Effectiveness ของตัวเองด้วย Diagnostic Tool'
      },
      {
        icon: 'Heart',
        title: 'Module 2 — Empathic Listening: ฟังด้วยใจเพื่อเข้าใจ ไม่ใช่เพื่อตอบ',
        desc: 'Empathic Listening คือการฟังเพื่อเข้าใจความรู้สึกและความต้องการของอีกฝ่าย ไม่ใช่แค่ข้อความที่พูดออกมา\n\n- Levels of Listening: Cosmetic, Conversational, Active, Empathic, Generative\n- Reflecting and Paraphrasing: แสดงว่าคุณได้ยินทั้งคำพูดและความรู้สึก\n- Holding Space: วิธีอยู่กับความรู้สึกของคนอื่นโดยไม่รีบแก้ปัญหา\n- The Difference Between Sympathy and Empathy ในการสนทนา\n- Workshop: ฝึกฟังแบบ Empathic กับ Partner ในสถานการณ์ที่กำหนด'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 3 — Listening to Understand: ถามคำถามที่เปิดความเข้าใจ',
        desc: 'การถามคำถามที่ดีคือส่วนหนึ่งของการฟังที่ดี\n\n- Powerful Questions vs Closed Questions: ความแตกต่างที่สร้างคุณภาพบทสนทนา\n- Funnel Questioning: เริ่มกว้าง แล้วค่อยแคบลงสู่ความชัดเจน\n- Clarifying vs Leading Questions: ฟังเพื่อเข้าใจ ไม่ใช่เพื่อนำทาง\n- Silence as a Listening Tool: ใช้ความเงียบเพื่อให้อีกฝ่ายพูดต่อ\n- Workshop: ฝึกสัมภาษณ์โดยใช้คำถามเพียง 5 คำถาม ค้นพบเรื่องราวเต็มๆ'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Listening in Teams: ฟังในบริบทกลุ่มและการประชุม',
        desc: 'การฟังในกลุ่มต้องการทักษะพิเศษที่แตกต่างจากการสนทนาแบบ 1-1\n\n- Meeting Listening Skills: อยู่กับทุกเสียงในห้องโดยไม่ทิ้งโฟกัส\n- Minority Voice: ฟังคนที่พูดน้อยหรือเห็นต่างให้ได้ยิน\n- Listening Under Pressure: รักษาคุณภาพการฟังในสถานการณ์ที่ตึงเครียด\n- Collective Listening: สร้างวัฒนธรรมการฟังในทีม\n- Team Workshop: ฝึกฟังในสถานการณ์ประชุมจริง สังเกตและ Debrief'
      },
      {
        icon: 'Compass',
        title: 'Module 5 — Listening as Leadership: ผู้นำที่ฟังได้ดีสร้างทีมที่แข็งแกร่งกว่า',
        desc: 'สิ่งที่ผู้นำทำน้อยที่สุดแต่ทรงพลังที่สุดคือการฟังอย่างแท้จริง\n\n- Listening Culture: ผู้นำสร้างหรือทำลายวัฒนธรรมการฟังในองค์กร\n- Psychological Safety through Listening: ความปลอดภัยในทีมเริ่มต้นจากการรู้สึกว่าถูกได้ยิน\n- Active Listening in Performance Reviews และ 1-on-1\n- How Leaders Kill Listening: พฤติกรรมที่ผู้นำมักทำโดยไม่รู้ตัว\n- Personal Commitment: แต่ละคนออกแบบ Listening Practice สำหรับสัปดาห์หน้า'
      }
    ],
    long_description: `ในยุคที่ทุกคนพูดพร้อมกัน การฟังอย่างแท้จริงกลายเป็น Superpower ที่หาได้ยากที่สุด

Active Listening Deep Dive ไม่ใช่แค่การสอนให้ "หยุดพูด" แต่คือการพัฒนาทักษะการฟังในระดับที่ลึก ตั้งแต่การเข้าใจว่าทำไมสมองเราถึงฟังได้ไม่ดี ไปจนถึงการฝึกฝน Empathic Listening, Powerful Questions, และการสร้างวัฒนธรรมการฟังในทีมและองค์กร

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- เข้าใจคนได้ลึกขึ้น สร้างความไว้ใจได้เร็วขึ้น แก้ปัญหาได้ตรงจุดขึ้น
- บทสนทนาในทีมมีคุณภาพดีขึ้น ความขัดแย้งที่มาจากความเข้าใจผิดลดลง
- ทีมรู้สึกว่าตัวเองถูกได้ยิน ส่งผลต่อ Engagement และความไว้วางใจ

---

#### เหมาะสำหรับ

- ผู้นำและผู้จัดการที่ต้องการสร้าง Psychological Safety ในทีม
- HR, Counselor, Coach และผู้ที่ทำงานกับคนเป็นหลัก
- ทีมที่มีปัญหาด้านการสื่อสาร ความเข้าใจผิด หรือการทำงานร่วมกัน

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'difficult-conversation-mastery',
    objectives: [
      {
        icon: 'Flame',
        title: 'Module 1 — Why Difficult Conversations Are Difficult: เข้าใจรากของความยาก',
        desc: 'ก่อนจะพูดได้ดี ต้องเข้าใจก่อนว่าทำไมการสนทนาบางอย่างถึงทำให้เราหนีหรือระเบิดออกมา\n\n- The Anatomy of a Difficult Conversation: ทุก Difficult Conversation มี 3 บทสนทนาซ้อนกัน\n- Identity Conversation: ทำไมคำวิจารณ์ถึงรู้สึกเหมือนถูกโจมตีตัวตน\n- Feelings Conversation: อารมณ์ที่ซ่อนอยู่ใต้คำพูดที่เราไม่พูดออกมา\n- Contribution Map: ใครมีส่วนในการสร้างปัญหา ไม่ใช่ใครถูกใครผิด\n- Self-Assessment: ประเมิน Conversation Style ของตัวเองในสถานการณ์ยาก'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Preparation and Mindset: เตรียมตัวก่อนการสนทนาที่ยาก',
        desc: 'Difficult Conversation ที่ดีเริ่มต้นก่อนที่จะพูดคำแรก\n\n- Clarifying Your Purpose: ต้องการผลลัพธ์อะไรจากบทสนทนานี้จริงๆ\n- Moving from Certainty to Curiosity: เปลี่ยน Mindset จาก "ฉันถูก" เป็น "ฉันอยากเข้าใจ"\n- Separating Impact from Intent: ผลกระทบที่เกิดขึ้นไม่ได้แปลว่าอีกฝ่ายตั้งใจร้าย\n- Choosing Time and Place: บริบทสำคัญพอๆ กับคำพูด\n- Pre-Conversation Centering: เทคนิครีเซ็ตอารมณ์ก่อนเข้าสู่การสนทนา'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 3 — Opening and Navigating: เปิดและนำทางบทสนทนาอย่างมีทักษะ',
        desc: 'วิธีที่คุณเปิดการสนทนากำหนดทิศทางทั้งหมด\n\n- Third Story Opening: เริ่มจากมุมมองของบุคคลที่สาม ไม่ใช่ของคุณหรือเขา\n- Inquiry First, Advocacy Second: ฟังก่อน พูดทีหลัง\n- Stay in the Learning Conversation: ไม่หนี ไม่โจมตี อยู่กับความจริง\n- Reframing Attacks as Information: เปลี่ยนการโจมตีให้เป็นข้อมูลที่มีประโยชน์\n- Role Play: ฝึกเปิดบทสนทนายากในสถานการณ์ที่กำหนด'
      },
      {
        icon: 'Target',
        title: 'Module 4 — Specific Difficult Scenarios: รับมือสถานการณ์ที่ยากที่พบบ่อย',
        desc: 'แต่ละประเภทของ Difficult Conversation ต้องการ Approach ที่แตกต่างกัน\n\n- Performance Issues: บอกความจริงโดยไม่ทำให้คนรู้สึกถูกโจมตี\n- Peer Conflicts: แก้ความขัดแย้งกับเพื่อนร่วมงานโดยรักษาความสัมพันธ์\n- Managing Up: สื่อสารกับผู้บริหารในเรื่องที่เขาไม่อยากได้ยิน\n- Saying No ให้ได้ยินว่า Yes ต่อคนที่สำคัญ\n- Workshop: แต่ละคนเลือกสถานการณ์จริงของตัวเองและฝึกรับมือ'
      },
      {
        icon: 'Star',
        title: 'Module 5 — Resolution and Follow-Through: นำพาสู่การแก้ปัญหาที่ยั่งยืน',
        desc: 'บทสนทนาที่ดีต้องจบด้วยความชัดเจน ไม่ใช่แค่ความรู้สึกดีขึ้น\n\n- Problem-Solving Together: เปลี่ยนจาก Positions เป็น Shared Solutions\n- Agreement and Commitment: ตกลงให้ชัดเจนว่าใครทำอะไร เมื่อไหร่\n- How to Follow Up Without Micromanaging หลังการสนทนา\n- Repairing Relationships after Difficult Conversations\n- Reflection and Growth: ทบทวนบทสนทนา เรียนรู้สำหรับครั้งต่อไป'
      }
    ],
    long_description: `บทสนทนาที่เราหลีกเลี่ยงที่สุดมักเป็นบทสนทนาที่สำคัญที่สุด

Difficult Conversation Mastery อิงจากงานวิจัยของ Harvard Negotiation Project ช่วยให้ผู้เข้าอบรมเข้าใจโครงสร้างของการสนทนาที่ยาก เตรียมตัวอย่างถูกวิธี และนำทางบทสนทนาได้อย่างมีทักษะ ทั้งกับลูกน้อง เพื่อนร่วมงาน และผู้บริหาร โดยไม่ทำให้ความสัมพันธ์เสียหาย

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- กล้าพูดความจริงที่ยากและจำเป็นโดยไม่ทำลายความสัมพันธ์
- แก้ปัญหาที่ค้างมานานได้ผ่านการสนทนาที่มีคุณภาพ
- บรรยากาศทีมโปร่งขึ้น ปัญหาถูกพูดถึงเร็วขึ้น ก่อนที่จะบานปลาย

---

#### เหมาะสำหรับ

- ผู้นำและผู้จัดการที่ต้องจัดการ Performance Issues หรือความขัดแย้งในทีม
- HR และผู้ที่ทำหน้าที่ไกล่เกลี่ยหรือ Mediate ในองค์กร
- ทุกคนที่มีบทสนทนาที่ค้างอยู่ในใจและยังไม่กล้าพูด

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'feedback-and-coaching-conversation',
    objectives: [
      {
        icon: 'MessageCircle',
        title: 'Module 1 — Feedback Culture: ทำไมองค์กรส่วนใหญ่ถึง Feedback ไม่เป็น',
        desc: 'ปัญหาของ Feedback ในองค์กรไม่ได้อยู่ที่ปริมาณ แต่อยู่ที่คุณภาพและวัฒนธรรม\n\n- The Feedback Paradox: คนต้องการ Feedback แต่กลัวที่จะรับและให้\n- Judgment vs Observation: ความแตกต่างระหว่าง Feedback ที่สร้างและทำลาย\n- Fear-Based vs Growth-Based Feedback Culture\n- What Happens to the Brain When Receiving Critical Feedback\n- Team Survey: ประเมิน Feedback Culture ในทีมของตัวเองตอนนี้'
      },
      {
        icon: 'Target',
        title: 'Module 2 — SBI and BID Framework: สูตร Feedback ที่ได้ผลในทุกสถานการณ์',
        desc: 'Feedback ที่ดีต้องเฉพาะเจาะจง เชื่อมกับผลกระทบ และเปิดพื้นที่ให้อีกฝ่ายตอบสนอง\n\n- SBI Framework (Situation, Behavior, Impact): Feedback 3 ขั้นที่ได้ผล\n- BID Framework (Behavior, Impact, Desired Outcome): เพิ่มทิศทางใน Feedback\n- Positive Feedback ที่เจาะจงและ Meaningful ไม่ใช่แค่ "ดีมาก"\n- Developmental Feedback ที่ช่วยให้คนเติบโต ไม่ใช่ตั้งรับ\n- Workshop: ฝึกให้ Feedback จากสถานการณ์จริงโดยใช้ SBI'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Receiving Feedback Gracefully: รับ Feedback อย่างมืออาชีพ',
        desc: 'การรับ Feedback ได้ดีเป็นทักษะที่ต้องฝึก ไม่ใช่นิสัยที่มีมาแต่กำเนิด\n\n- Reactive Triggers: อะไรทำให้เราตั้งรับเมื่อได้รับ Feedback\n- ACT Framework: Acknowledge, Clarify, Thank — วิธีรับ Feedback อย่างเปิดใจ\n- Separating the Message from the Messenger: Feedback ยังมีประโยชน์แม้มาจากคนที่เราไม่ชอบ\n- Growth Mindset in Feedback: เปลี่ยน "คำวิจารณ์" ให้เป็น "ข้อมูลเพื่อการพัฒนา"\n- Role Play: ฝึกรับ Feedback ยากโดยไม่ตั้งรับหรือหนี'
      },
      {
        icon: 'Compass',
        title: 'Module 4 — Coaching Conversations: เปลี่ยนการสนทนาให้เป็น Coaching',
        desc: 'ผู้นำที่ Coaching ได้จะสร้างทีมที่คิดเป็นและแก้ปัญหาได้เอง\n\n- Coaching vs Directing: เมื่อไหรควรสั่งและเมื่อไหรควร Coach\n- GROW Model (Goal, Reality, Options, Will): กรอบ Coaching 4 ขั้นที่ใช้ได้ทันที\n- Powerful Coaching Questions ที่เปิดความคิดและความรับผิดชอบ\n- Non-Directive Coaching: ฟังและถามให้อีกฝ่ายค้นพบคำตอบเอง\n- Workshop: ฝึก Mini Coaching Session 15 นาทีกับ Partner จริง'
      },
      {
        icon: 'Star',
        title: 'Module 5 — Building a Feedback Loop: สร้างระบบ Feedback ที่ทีมใช้จริง',
        desc: 'Feedback ที่ดีที่สุดคือ Feedback ที่เกิดขึ้นอย่างสม่ำเสมอ ไม่ใช่แค่ในปี Annual Review\n\n- Informal Feedback Moments: สร้างนิสัย Feedback ในชีวิตประจำวัน\n- Peer Feedback System: ออกแบบกระบวนการ Feedback ระหว่างสมาชิกในทีม\n- Feedback Check-In Rituals: พิธีกรรมเล็กๆ ที่รักษา Feedback Culture\n- 360 Feedback Facilitation: นำกระบวนการ 360 ให้ได้ประโยชน์จริง\n- Team Commitment: แต่ละทีมออกแบบ Feedback Ritual สำหรับองค์กรตัวเอง'
      }
    ],
    long_description: `Feedback คือของขวัญที่มีคนน้อยมากให้ได้ดี และน้อยกว่านั้นที่รับได้อย่างงดงาม

Feedback and Coaching Conversation สอนทั้งสองด้านของสมการ: การให้ Feedback ที่เฉพาะเจาะจง ตรงประเด็น และสร้างแรงจูงใจ และการรับ Feedback อย่างเปิดใจโดยไม่ตั้งรับ รวมถึงการใช้ทักษะ Coaching เพื่อเปลี่ยนการสนทนาทั่วไปให้กลายเป็นโอกาสพัฒนาคน

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- ทีมให้และรับ Feedback ได้อย่างเป็นธรรมชาติและสม่ำเสมอมากขึ้น
- ผู้นำ Coaching ทีมได้โดยใช้คำถาม ไม่ใช่การสั่งการ
- วัฒนธรรมการพัฒนาตัวเองในทีมแข็งแกร่งขึ้น ลด Performance Issue

---

#### เหมาะสำหรับ

- ผู้นำและผู้จัดการที่ต้องการพัฒนาทักษะการ Feedback และ Coaching ทีม
- HR, L&D และผู้ออกแบบระบบพัฒนาคนในองค์กร
- ทีมที่ต้องการสร้างวัฒนธรรม Feedback ที่แท้จริง ไม่ใช่แค่ Annual Review

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'nonverbal-communication',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — The Silent Language: ภาษาที่พูดมากที่สุดโดยไม่ใช้คำ',
        desc: 'มากกว่า 60% ของการสื่อสารเกิดจากสัญญาณที่ไม่ใช่คำพูด ทั้งของเราและของคนอื่น\n\n- Mehrabian Model: 7% คำพูด 38% น้ำเสียง 55% ภาษากาย\n- Categories of Nonverbal Communication: Kinesics, Proxemics, Haptics, Chronemics\n- Congruence vs Incongruence: เมื่อคำพูดและภาษากายไม่ตรงกัน\n- Cultural Differences in Nonverbal Communication ที่ต้องรู้\n- Self-Observation: วิดีโอตัวเองและวิเคราะห์ Nonverbal Signals'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Reading People: อ่านภาษากายและจริตของคนอื่น',
        desc: 'การอ่านคนไม่ใช่การตัดสิน แต่คือการเข้าใจและตอบสนองได้ถูกต้อง\n\n- Baseline Behavior: รู้จัก Normal ของคนก่อนจะตีความ Deviation\n- Comfort and Discomfort Signals: สัญญาณว่าคนกำลังเปิดหรือปิดตัว\n- Micro-expressions: อ่านอารมณ์ที่แสดงออกไม่ถึง 1 วินาที\n- Cluster Reading: อย่าตีความจากท่าทางเดียว ดูภาพรวม\n- Workshop: ฝึกอ่านภาษากายจากคลิปวิดีโอและสถานการณ์จริง'
      },
      {
        icon: 'Heart',
        title: 'Module 3 — Projecting Confidence and Warmth: สื่อสารพลังงานที่ถูกต้อง',
        desc: 'คนที่น่าเชื่อถือและน่าไว้ใจไม่ได้เกิดจากตำแหน่ง แต่เกิดจากสัญญาณที่ร่างกายส่งออกมา\n\n- Presence Signals: สัญญาณที่บอกว่าคุณอยู่ในห้องนี้จริงๆ\n- Open vs Closed Body Language: ความแตกต่างที่เปลี่ยนบรรยากาศ\n- Power Poses and Their Real Effects: วิทยาศาสตร์ที่ถกเถียงกัน แต่ใช้ได้จริง\n- Warmth Signals: ยิ้ม Eye Contact ท่าทางที่สร้าง Rapport ได้เร็ว\n- Workshop: ฝึกเข้าห้องและแนะนำตัวให้ส่งพลังงาน Confidence + Warmth'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Nonverbal in Conversations and Meetings: ใช้ภาษากายในการสนทนา',
        desc: 'ในทุกการสนทนา ภาษากายของคุณส่งสัญญาณว่าคุณสนใจ เบื่อ หรือกำลังซ่อนอะไร\n\n- Active Listening Signals: แสดงว่าคุณกำลังฟังโดยไม่ต้องพูด\n- Mirroring: ลอกเลียนท่าทางเพื่อสร้าง Rapport โดยธรรมชาติ\n- Territorial Behavior in Meetings: พื้นที่ อำนาจ และการวางตัว\n- Video Call Nonverbal: สิ่งที่เปลี่ยนไปและสิ่งที่ยังสำคัญเท่าเดิม\n- Live Practice: สนทนาในกลุ่ม ผู้สังเกตการณ์ Debrief ภาษากาย'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Nonverbal Mastery in High-Stakes Situations: ควบคุมภาษากายในสถานการณ์สำคัญ',
        desc: 'ในสถานการณ์ที่มีเดิมพันสูง ภาษากายของคุณสำคัญกว่าที่คุณคิด\n\n- Interview and Job Performance Nonverbal\n- Negotiation Body Language: อ่านสัญญาณและส่งสัญญาณในการเจรจา\n- Public Speaking Presence: ควบคุม Stage Fright ผ่านภาษากาย\n- Detecting Deception: รู้เท่าทันสัญญาณที่ไม่สอดคล้องกัน\n- Personal Brand Through Nonverbal: สร้าง Signature Presence ที่เป็นตัวเอง'
      }
    ],
    long_description: `ทุกวันคุณสื่อสารหลายพันสัญญาณโดยไม่รู้ตัว คำถามคือสัญญาณนั้นส่งสิ่งที่คุณต้องการหรือเปล่า

Nonverbal Communication สอนให้เข้าใจและควบคุมภาษากาย น้ำเสียง พื้นที่ และสัญญาณที่ไม่ใช่คำพูด ทั้งของตัวเองและของคนอื่น เพื่อสื่อสารได้ตรงและทรงพลังมากขึ้น สร้าง Rapport ได้เร็วขึ้น และอ่านสถานการณ์ได้แม่นยำขึ้น

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- ส่งสัญญาณ Confidence และ Warmth ได้อย่างสม่ำเสมอในทุกสถานการณ์
- อ่านภาษากายและอารมณ์ของคนอื่นได้ดีขึ้น ตอบสนองได้ถูกต้องมากขึ้น
- ลด Nonverbal Noise ที่ทำให้ข้อความถูกตีความผิด

---

#### เหมาะสำหรับ

- ผู้นำ ผู้บริหาร และผู้ที่ต้องสร้าง Presence และความน่าเชื่อถือในทุกการพบปะ
- Sales, Customer Service, และผู้ที่ต้องสร้าง Rapport กับคนแปลกหน้าอย่างรวดเร็ว
- ผู้ที่รู้สึกว่าการสื่อสารของตัวเองยังไม่สะท้อนความตั้งใจที่แท้จริง

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'communication-for-leaders',
    objectives: [
      {
        icon: 'Compass',
        title: 'Module 1 — Leader as Chief Communication Officer: ผู้นำคือผู้สื่อสารหลักขององค์กร',
        desc: 'ไม่มีผู้นำที่ยิ่งใหญ่คนไหนที่สื่อสารไม่เป็น เพราะการนำต้องอาศัยการสื่อสารเป็นพาหนะ\n\n- Communication as Leadership Function: ทำไมการสื่อสารถึงเป็นงานหลักของผู้นำ\n- The Leader Communication Audit: ประเมินจุดแข็งและช่องว่างการสื่อสารของตัวเอง\n- Message Multiplication: วิธีที่ข้อความของผู้นำกระจายและบิดเบือนลงมา\n- Consistency and Trust: ผู้นำที่สื่อสารสม่ำเสมอสร้างความไว้ใจได้มากกว่า\n- Workshop: ออกแบบ Communication Principle ส่วนตัวในฐานะผู้นำ'
      },
      {
        icon: 'Target',
        title: 'Module 2 — Vision and Strategy Communication: สื่อสาร Vision ให้ทีมเห็นภาพและเชื่อ',
        desc: 'Strategy ที่ดีที่สุดก็ไร้ค่า ถ้าคนในองค์กรไม่เข้าใจว่าตัวเองมีบทบาทอะไรในนั้น\n\n- The Strategy Translation Problem: ทำไม Strategy มักตายที่ระดับ Manager\n- Cascade Communication: สื่อสาร Strategy ลงมาให้ตรงและมีความหมาย\n- The One Page Story: สรุป Vision ให้ทุกคนจำและอธิบายต่อได้\n- Town Hall and All-Hands Mastery: นำการสื่อสารในระดับองค์กรอย่างทรงพลัง\n- Workshop: ฝึกสื่อสาร Strategy ของทีมหรือองค์กรตัวเองใน 3 นาที'
      },
      {
        icon: 'Users',
        title: 'Module 3 — One-on-One and Team Communication: สื่อสารกับคนและกลุ่ม',
        desc: 'ผู้นำต้องสื่อสารได้ดีในทุกระดับ ตั้งแต่บทสนทนา 1-on-1 ไปจนถึงการนำประชุมทั้งองค์กร\n\n- High-Quality 1-on-1 Conversations: สร้างนิสัยการสนทนาที่พัฒนาคน\n- Productive Team Meetings: นำประชุมให้มีผลลัพธ์ที่ชัดเจนใน 60 นาที\n- Adapting Communication Style: ปรับวิธีพูดตามบุคลิกและความต้องการของผู้ฟัง\n- Transparent Communication in Uncertainty: พูดความจริงในช่วงที่ยังไม่รู้คำตอบ\n- Workshop: ฝึกนำ Mini Town Hall สำหรับทีมของตัวเอง'
      },
      {
        icon: 'Flame',
        title: 'Module 4 — Crisis and Change Communication: สื่อสารในช่วงวิกฤตและการเปลี่ยนแปลง',
        desc: 'วิธีที่ผู้นำสื่อสารในช่วงวิกฤตกำหนดว่าทีมจะล่มหรือยืนหยัดได้\n\n- Crisis Communication Principles: ความเร็ว ความโปร่งใส และความเห็นอกเห็นใจ\n- Change Narrative: เล่าเรื่องการเปลี่ยนแปลงให้คนเข้าใจว่าทำไมและจะเป็นอย่างไร\n- Managing Rumors and Misinformation ในองค์กร\n- Communicating Bad News อย่างตรงไปตรงมาและรับผิดชอบ\n- Case Study: วิเคราะห์การสื่อสารของผู้นำในวิกฤตจริง'
      },
      {
        icon: 'Star',
        title: 'Module 5 — Executive Presence Through Communication: สร้าง Presence ที่สะท้อนความเป็นผู้นำ',
        desc: 'Executive Presence ไม่ใช่บุคลิก แต่คือทักษะที่สร้างและพัฒนาได้\n\n- The Gravitas-Communication-Appearance Triad\n- Speaking with Authority ที่มาจากความชัดเจน ไม่ใช่เสียงดัง\n- Listening as a Leadership Superpower\n- Authentic Communication: พูดในแบบที่เป็นตัวเองในขณะที่ยังมืออาชีพ\n- Personal Brand Statement: สร้างและฝึกสื่อสาร Leadership Brand ของตัวเอง'
      }
    ],
    long_description: `ผู้นำที่สื่อสารได้ดีสร้างทีมที่เดินไปในทิศทางเดียวกัน ทีมที่เชื่อมั่น และองค์กรที่เติบโตได้แม้ในช่วงที่ยาก

Communication for Leaders ออกแบบมาสำหรับผู้นำที่เข้าใจว่าการสื่อสารไม่ใช่ Soft Skill แต่คือเครื่องมือหลักของการนำ ครอบคลุมทั้ง Vision Communication, Team and 1-on-1 Conversations, Crisis Communication, และ Executive Presence เพื่อให้ผู้นำสื่อสารได้อย่างชัดเจน น่าเชื่อถือ และสร้างแรงบันดาลใจ

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- ทีมเข้าใจ Vision และ Strategy ชัดขึ้น มี Direction ที่ตรงกันมากขึ้น
- ผู้นำสื่อสารในสถานการณ์ยาก เช่น วิกฤตและการเปลี่ยนแปลง ได้อย่างมั่นใจ
- Executive Presence แข็งแกร่งขึ้น ทั้งในการพูดและการฟัง

---

#### เหมาะสำหรับ

- ผู้บริหาร C-Level และผู้นำระดับสูงที่ต้องสื่อสารกับองค์กรในวงกว้าง
- ผู้จัดการระดับกลางที่กำลังเติบโตสู่บทบาทผู้นำที่ใหญ่ขึ้น
- High Potential Leaders ที่ต้องการพัฒนา Communication Skills เพื่ออนาคต

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'cross-functional-communication',
    objectives: [
      {
        icon: 'Users',
        title: 'Module 1 — The Silo Problem: ทำไมองค์กรถึงสื่อสารข้ามทีมไม่ได้',
        desc: 'ปัญหาระหว่างแผนกส่วนใหญ่ไม่ได้มาจากคนไม่ดี แต่มาจากระบบและวัฒนธรรมที่สร้าง Silo\n\n- The Silo Mentality: ทำไมแต่ละแผนกถึงมองว่าตัวเองสำคัญที่สุด\n- Communication Breakdown Patterns ที่พบบ่อยในองค์กร\n- The Hidden Cost of Poor Cross-Functional Communication\n- Stakeholder Perspective: วิธีมองปัญหาจากมุมของแผนกอื่น\n- Workshop: Map ปัญหาการสื่อสารข้ามทีมในองค์กรของตัวเอง'
      },
      {
        icon: 'Compass',
        title: 'Module 2 — Understanding Different Functions: เข้าใจภาษาและลำดับความสำคัญของแผนกอื่น',
        desc: 'Finance พูดภาษา ROI, Marketing พูดภาษา Awareness, IT พูดภาษา Risk — การสื่อสารข้ามทีมต้องพูดภาษาของอีกฝ่าย\n\n- Function-Specific Priorities: แต่ละแผนกให้ความสำคัญกับอะไร\n- Translation Skills: แปล Idea ของคุณให้เป็นภาษาที่แผนกอื่นสนใจ\n- Empathy Across Functions: มองงานของแผนกอื่นอย่างที่เขามอง ไม่ใช่อย่างที่คุณมอง\n- Shared Goals vs Departmental Goals: หาจุดร่วมในความต้องการที่ต่างกัน\n- Workshop: ฝึกนำเสนอ Request เดียวกันต่อ Finance, Marketing, และ IT'
      },
      {
        icon: 'Target',
        title: 'Module 3 — Effective Cross-Functional Meetings: ประชุมข้ามทีมให้ได้ผลลัพธ์จริง',
        desc: 'ประชุมข้ามทีมที่ไร้ประสิทธิภาพคือหนึ่งในสิ่งที่สิ้นเปลืองเวลาองค์กรมากที่สุด\n\n- Pre-Meeting Alignment: สร้างความเข้าใจก่อนเข้าห้องประชุม\n- Agenda Design ที่ผลักดันการตัดสินใจ ไม่ใช่แค่การอัพเดท\n- Facilitation Techniques สำหรับกลุ่มที่มี Interest หลากหลาย\n- Decision-Making Protocols: ชัดเจนว่าใครตัดสินใจอะไร ด้วยวิธีไหน\n- Meeting Follow-Up ที่ทำให้ Action Item เกิดขึ้นจริง'
      },
      {
        icon: 'Brain',
        title: 'Module 4 — Managing Conflict Across Teams: แก้ความขัดแย้งระหว่างแผนก',
        desc: 'ความขัดแย้งระหว่างแผนกไม่ใช่เรื่องบุคคล แต่มักเป็นเรื่องของระบบ ทรัพยากร และลำดับความสำคัญ\n\n- Structural Conflict vs People Conflict: แยกให้ออกก่อนจะแก้\n- Interest-Based Negotiation ในบริบทของการทำงานข้ามทีม\n- Escalation vs Resolution: รู้ว่าเมื่อไหรควรเพิ่มระดับ และเมื่อไหรควรแก้เอง\n- Building Long-term Cross-Functional Relationships\n- Case Study: วิเคราะห์ความขัดแย้งข้ามทีมจริงและออกแบบวิธีแก้'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Building Cross-Functional Culture: สร้างวัฒนธรรมการทำงานข้ามทีม',
        desc: 'ปัญหา Cross-Functional Communication ไม่ได้แก้ได้ด้วย Workshop เดียว ต้องสร้างเป็นวัฒนธรรม\n\n- Cross-Functional Champions: ผู้นำการเปลี่ยนแปลงในแต่ละแผนก\n- Shared KPI Design: ออกแบบตัวชี้วัดที่ให้แต่ละแผนกมีผลประโยชน์ร่วมกัน\n- Information Sharing Systems: สร้างช่องทางแลกเปลี่ยนข้อมูลที่ใช้งานได้จริง\n- Celebrating Cross-Functional Wins: สร้าง Momentum ด้วยความสำเร็จร่วมกัน\n- Action Planning: แต่ละทีมออกแบบ 3 สิ่งที่จะทำเพื่อปรับปรุง Cross-Functional Communication'
      }
    ],
    long_description: `องค์กรที่เติบโตเร็วที่สุดไม่ใช่องค์กรที่มีแผนกที่แข็งแกร่งที่สุด แต่คือองค์กรที่แผนกทำงานร่วมกันได้ดีที่สุด

Cross-Functional Communication สอนทักษะและกรอบความคิดที่จำเป็นสำหรับการทำงานข้ามสายงาน ตั้งแต่การเข้าใจมุมมองและภาษาของแต่ละฝ่าย การสื่อสารและประชุมข้ามทีมอย่างมีประสิทธิภาพ ไปจนถึงการสร้างความสัมพันธ์และวัฒนธรรมที่ทำให้องค์กรทำงานเป็นทีมเดียวกัน

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- โครงการข้ามทีมเดินหน้าได้เร็วขึ้น มีการอ้างอิงกันน้อยลง
- ความขัดแย้งระหว่างแผนกถูกแก้ที่ต้นเหตุ ไม่ใช่ปลายเหตุ
- วัฒนธรรมความร่วมมือข้ามทีมแข็งแกร่งขึ้นอย่างยั่งยืน

---

#### เหมาะสำหรับ

- ผู้จัดการโครงการและ Project Lead ที่ต้องประสานงานหลายทีม
- ผู้นำระดับกลางที่ต้องทำงานกับหลายแผนกโดยไม่มีอำนาจโดยตรง
- องค์กรที่กำลัง Restructure หรือสร้างวัฒนธรรมการทำงานข้าม Silo

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'communication-for-team-alignment',
    objectives: [
      {
        icon: 'Target',
        title: 'Module 1 — Alignment vs Agreement: ความต่างที่เปลี่ยนวิธีคิดเรื่องทีม',
        desc: 'ทีมที่ Aligned ไม่จำเป็นต้องเห็นด้วยกันทุกเรื่อง แต่ต้องเดินไปในทิศทางเดียวกัน\n\n- ความหมายของ Alignment ในบริบทองค์กร\n- Why Misalignment Happens: สาเหตุที่ทีมเดินเหลื่อมกันโดยไม่รู้ตัว\n- Alignment Audit: ตรวจสอบว่าทีมของคุณ Aligned แค่ไหน\n- The Cost of Misalignment: เวลา ทรัพยากร และโอกาสที่เสียไป\n- Workshop: Map ช่องว่างของ Alignment ในทีมหรือโครงการของตัวเอง'
      },
      {
        icon: 'Compass',
        title: 'Module 2 — Shared Language and Mental Models: สร้างภาษาร่วมในทีม',
        desc: 'ทีมที่มีภาษาร่วมและ Mental Model ที่ตรงกันทำงานได้เร็วกว่าและผิดพลาดน้อยกว่า\n\n- Mental Models และทำไมคนที่ฉลาดถึงยังเข้าใจผิดกัน\n- Shared Vocabulary: สร้างคำที่ทีมทั้งหมดเข้าใจตรงกัน\n- Visual Alignment Tools: ใช้ภาพ ไดอะแกรม และ Frameworks ร่วมกัน\n- Assumption Surfacing: ดึงสมมติฐานที่ซ่อนอยู่ออกมาให้เห็น\n- Workshop: สร้าง Shared Language Guide สำหรับโครงการหรือทีมจริง'
      },
      {
        icon: 'Layers',
        title: 'Module 3 — Goal and Priority Alignment: ทำให้ทุกคนรู้ว่าอะไรสำคัญที่สุด',
        desc: 'ทีมที่ทำงานหนักในทิศทางต่างกันเหนื่อยกว่าและได้น้อยกว่าทีมที่ทำงานร่วมกัน\n\n- OKR Communication: สื่อสาร Objectives and Key Results ให้ทีมเข้าใจและ Own\n- Priority Matrix: ทำให้ชัดว่าอะไรสำคัญ เร่งด่วน และไม่ใช่ทั้งคู่\n- Trade-off Conversations: พูดคุยอย่างเปิดเผยเมื่อต้องเลือกระหว่างสองสิ่งสำคัญ\n- Cascade Goal Setting: ถ่ายทอด Organizational Goal ลงสู่ Team Goal ให้เชื่อมกัน\n- Workshop: ฝึกสื่อสาร Team OKR ที่ทุกคน Own และเข้าใจจริง'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 4 — Regular Alignment Rituals: พิธีกรรมที่รักษาความ Aligned',
        desc: 'Alignment ไม่ใช่สิ่งที่ทำครั้งเดียวแล้วจบ แต่ต้องรักษาอย่างสม่ำเสมอ\n\n- Daily Stand-up ที่ทำให้ทีม Sync จริง ไม่ใช่แค่รายงาน\n- Weekly Team Check-in ที่เพิ่ม Cohesion ไม่ใช่แค่ Update\n- Monthly Alignment Review: ทบทวนทิศทางก่อนที่จะหลุด Track\n- Retrospective for Alignment: เรียนรู้จากสิ่งที่ Misaligned ในรอบที่ผ่านมา\n- Design Sprint: ทีมออกแบบ Alignment Ritual สำหรับตัวเองที่ยั่งยืน'
      },
      {
        icon: 'Heart',
        title: 'Module 5 — Emotional Alignment: Align ทั้งหัวและใจของทีม',
        desc: 'Goal ตรงกันแต่ใจไม่ตรงกัน ทีมก็ยังเดินไม่พร้อมกัน\n\n- Values Alignment: ทำให้ Team Values ไม่ใช่แค่คำบนกำแพง\n- Trust as Foundation of Alignment: ทีมที่ไว้ใจกันจะ Align กันได้เร็วกว่า\n- Handling Disagreement Within Aligned Teams: Disagree แล้วยังเดินด้วยกันได้\n- Celebrating Progress Together: สร้าง Shared Wins ที่รักษา Momentum\n- Team Charter: สร้างข้อตกลงทีมที่ Align ทั้ง Goal, Values, และ Working Norms'
      }
    ],
    long_description: `ทีมที่ดีที่สุดไม่ใช่ทีมที่มีคนเก่งที่สุด แต่คือทีมที่ Aligned มากที่สุด

Communication for Team Alignment สอนให้ผู้นำและทีมรู้จักสร้าง รักษา และฟื้นฟูความ Aligned ผ่านการสื่อสารที่ชัดเจน ตรงกัน และสม่ำเสมอ ตั้งแต่การสร้างภาษาร่วม การสื่อสาร Goals และ Priorities ไปจนถึงการออกแบบพิธีกรรมที่รักษาทีมให้เดินไปด้วยกัน

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- ทีมเข้าใจเป้าหมายและลำดับความสำคัญตรงกัน ลดเวลาสูญเปล่าจาก Rework
- ประชุมและ Check-in มีประสิทธิภาพขึ้น ทีมออกจากห้องด้วยความชัดเจน
- วัฒนธรรมทีมแข็งแกร่งขึ้น มีความไว้ใจและ Cohesion ที่สูงขึ้น

---

#### เหมาะสำหรับ

- ผู้นำทีมและผู้จัดการที่ต้องการรักษา Team Alignment ในโครงการซับซ้อน
- ทีมที่กำลังเติบโตหรือผ่านการเปลี่ยนแปลงและต้องการ Re-align
- องค์กรที่ต้องการเพิ่มความเร็วและประสิทธิภาพของการทำงานร่วมกัน

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'public-speaking-confidence',
    objectives: [
      {
        icon: 'Flame',
        title: 'Module 1 — Understanding Speaking Anxiety: ทำความเข้าใจกับความกลัวการพูดต่อหน้าคน',
        desc: 'ความกลัวการพูดต่อหน้าคนพบบ่อยกว่าความกลัวความตาย เข้าใจมันคือก้าวแรกของการพิชิตมัน\n\n- The Neuroscience of Stage Fright: สมองทำอะไรเมื่อคุณยืนหน้าคนหมู่มาก\n- Anxiety vs Excitement: ทำไมสองอย่างนี้รู้สึกเหมือนกันแต่ผลต่างกัน\n- Common Anxiety Triggers และวิธีระบุ Trigger ของตัวเอง\n- Growth Mindset for Speaking: เปลี่ยน "ฉันพูดไม่เก่ง" เป็น "ฉันกำลังพัฒนาทักษะนี้"\n- Personal Speaking History: ย้อนดูประสบการณ์การพูดที่ดีและไม่ดีเพื่อเรียนรู้'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Preparation Strategies: เตรียมตัวอย่างที่ลด Anxiety จริงๆ',
        desc: 'ความมั่นใจส่วนใหญ่มาจากการเตรียมตัว ไม่ใช่พรสวรรค์\n\n- Content Preparation Framework: รู้ว่าต้องเตรียมอะไร ไม่ใช่แค่ท่อง Script\n- The 3-Pass Rehearsal Method: ซ้อมอย่างไรให้ได้ผลสูงสุดในเวลาน้อย\n- Overcoming Over-Preparation: ทำไมการซ้อมมากเกินไปถึงเพิ่ม Anxiety\n- Mental Rehearsal: ใช้ Visualization เพื่อโปรแกรมสมองให้พร้อม\n- Workshop: ใช้ Framework เตรียมการพูด 5 นาทีที่จะฝึกในหลักสูตรนี้'
      },
      {
        icon: 'Zap',
        title: 'Module 3 — In-the-Moment Techniques: เทคนิครับมือ Anxiety ระหว่างพูด',
        desc: 'ในช่วงนาทีที่อยู่หน้าคน คุณต้องมีเครื่องมือที่ใช้ได้ทันที\n\n- Box Breathing: เทคนิคหายใจที่ลด Cortisol ใน 4 นาที\n- Grounding Techniques: รีเซ็ตระบบประสาทก่อนและระหว่างการพูด\n- Redirect Focus from Self to Audience: ย้ายความสนใจจาก "ฉันจะเป็นอย่างไร" ไปสู่ "เขาได้อะไร"\n- Using Pause Intentionally แทนการรีบพูดต่อเมื่อตื่นเต้น\n- Embracing Imperfection: เรียนรู้ว่าผิดพลาดเล็กน้อยไม่ทำให้คุณดูไม่น่าเชื่อถือ'
      },
      {
        icon: 'Heart',
        title: 'Module 4 — Building Confidence Through Practice: สร้างความมั่นใจผ่านการฝึกฝน',
        desc: 'ความมั่นใจไม่ได้รอให้มาเอง แต่เกิดจากการสะสมประสบการณ์ที่ได้รับการออกแบบมาดี\n\n- Progressive Exposure: เริ่มจากสิ่งที่กลัวน้อย แล้วค่อยเพิ่ม Challenge\n- Safe Practice Environment: ฝึกในพื้นที่ที่ปลอดภัยพอที่จะล้มได้\n- Recording and Self-Review ที่สร้างสรรค์ ไม่ใช่การ Criticize ตัวเอง\n- Peer Support and Accountability: ทำไมการฝึกกับคนอื่นได้ผลกว่าการฝึกคนเดียว\n- Speaking Streak Challenge: ออกแบบแผนฝึกพูดต่อเนื่อง 30 วัน'
      },
      {
        icon: 'Star',
        title: 'Module 5 — Showcase and Growth Planning: พูดจริงและวางแผนการเติบโตต่อ',
        desc: 'จุดสูงสุดของหลักสูตรคือการพูดจริงต่อหน้ากลุ่ม และวางแผนเดินต่อ\n\n- Final Speech Presentation: แต่ละคนพูด 5 นาทีในหัวข้อที่เตรียมมา\n- Structured Peer Feedback: รับ Feedback จากกลุ่มด้วยกระบวนการที่สร้างสรรค์\n- Personal Speaking Development Plan: วางแผน 90 วันสำหรับการพัฒนาต่อ\n- Speaking Opportunities Identification: หาโอกาสพูดจริงในชีวิตประจำวัน\n- Commitment Ceremony: ประกาศเป้าหมายการพูดต่อหน้ากลุ่ม'
      }
    ],
    long_description: `ความกลัวการพูดต่อหน้าคนไม่ใช่ข้อบกพร่องของคุณ มันคือสัญญาณว่าคุณใส่ใจ และมันเปลี่ยนแปลงได้

Public Speaking Confidence ออกแบบมาเพื่อคนที่กลัวการพูดต่อหน้าคน ไม่ว่าจะเป็นความกลัวระดับเบา (ประหม่าเล็กน้อย) ไปจนถึงระดับหนัก (หลีกเลี่ยงทุกสถานการณ์ที่ต้องพูด) ผ่านการผสานวิทยาศาสตร์ด้านจิตวิทยา เทคนิคการจัดการ Anxiety และการฝึกพูดจริงในสภาพแวดล้อมที่ปลอดภัย

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- ความมั่นใจในการพูดต่อหน้าคนเพิ่มขึ้นอย่างมีนัยสำคัญ
- มีเครื่องมือจัดการ Anxiety ที่ใช้ได้จริงในสถานการณ์จริง
- พูดได้ชัดเจน มีโครงสร้าง และส่งข้อความได้ตามที่ตั้งใจ

---

#### เหมาะสำหรับ

- ผู้ที่กลัวการพูดต่อหน้าคนและต้องการพิชิตความกลัวนี้อย่างจริงจัง
- มืออาชีพที่ต้องพูดในที่ประชุม นำเสนองาน หรือพูดบนเวทีแต่ยังขาดความมั่นใจ
- High Potential Talent ที่ความกลัวการพูดกำลังจำกัด Career Growth

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'facilitation-skills-for-communication',
    objectives: [
      {
        icon: 'Layers',
        title: 'Module 1 — The Facilitator Mindset: เปลี่ยนจากผู้พูดเป็นผู้สร้างพื้นที่',
        desc: 'Facilitator ไม่ใช่คนที่พูดมากที่สุด แต่คือคนที่ทำให้คนอื่นพูดได้ดีที่สุด\n\n- Facilitator vs Presenter vs Manager: บทบาทที่ต่างกันโดยสิ้นเชิง\n- The Art of Holding Space: สร้างพื้นที่ที่ทุกเสียงมีคุณค่า\n- Process vs Content: Facilitator ดูแลกระบวนการ ไม่ใช่เนื้อหา\n- Facilitator Qualities: ความอยากรู้ ความเป็นกลาง และ Presence\n- Self-Assessment: ประเมิน Facilitation Style และจุดพัฒนาของตัวเอง'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Designing Facilitated Sessions: ออกแบบการประชุมและ Workshop ที่ได้ผล',
        desc: 'ผลลัพธ์ของ Facilitated Session ถูกกำหนดเป็นส่วนใหญ่ก่อนที่จะเริ่ม\n\n- Outcome-Based Design: เริ่มจากผลลัพธ์ที่ต้องการ แล้วค่อยออกแบบกระบวนการ\n- Session Flow Architecture: เปิด สำรวจ สรุป ปิด อย่างมีประสิทธิภาพ\n- Time Management in Facilitation: รักษาตารางเวลาโดยไม่บีบบังคับผู้เข้าร่วม\n- Room Setup and Energy Management: พื้นที่กายภาพส่งผลต่อคุณภาพการสนทนา\n- Workshop: ออกแบบ Session Plan สำหรับการประชุมหรือ Workshop จริง'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 3 — Facilitation Techniques: เครื่องมือที่ใช้ได้จริงในทุกสถานการณ์',
        desc: 'Facilitator ที่ดีมีกล่องเครื่องมือหลากหลายและรู้ว่าเมื่อไหรควรใช้อะไร\n\n- Divergent and Convergent Techniques: เปิดความคิดก่อน แล้วค่อยรวม\n- Liberating Structures: 33 วิธีสร้างการมีส่วนร่วมที่ไม่ธรรมดา\n- World Cafe, Open Space, Fishbowl: Format สำหรับกลุ่มใหญ่\n- Digital Facilitation Tools: Miro, Mentimeter, Jamboard สำหรับออนไลน์\n- Workshop: ฝึกใช้ 3 เทคนิคกับกลุ่มจริง รับ Feedback ทันที'
      },
      {
        icon: 'Flame',
        title: 'Module 4 — Handling Difficult Group Dynamics: รับมือพลวัตกลุ่มที่ท้าทาย',
        desc: 'กลุ่มมนุษย์มีพลวัตที่ซับซ้อน Facilitator ต้องอ่านและตอบสนองได้ทันที\n\n- Dominant Voices vs Silent Members: สร้างสมดุลการมีส่วนร่วม\n- Conflict in Groups: รับมือความขัดแย้งโดยไม่สูญเสียกระบวนการ\n- Energy Drops: สังเกตและฟื้น Energy ของกลุ่มได้\n- Off-Track Conversations: นำกลุ่มกลับมาโดยไม่ทำให้ใครรู้สึกถูกตัดปาก\n- Role Play: รับมือสถานการณ์กลุ่มยากในสถานการณ์จำลอง'
      },
      {
        icon: 'Star',
        title: 'Module 5 — Facilitation Practicum: ฝึกนำจริงและรับ Feedback ครบมิติ',
        desc: 'ทักษะ Facilitation เกิดจากการลงมือทำ ไม่ใช่การดูหรือฟัง\n\n- Mini Facilitation Showcase: แต่ละคนนำ Session 20 นาทีจริง\n- Observer Checklist: กลุ่มสังเกตและให้ Feedback อย่างมีโครงสร้าง\n- Video Review: วิเคราะห์การนำของตัวเองจากการบันทึก\n- Personal Facilitation Development Plan: ระบุ 3 ทักษะที่จะพัฒนาต่อ\n- Community of Practice: สร้างเครือข่าย Facilitator ที่จะเรียนรู้ร่วมกันต่อไป'
      }
    ],
    long_description: `การ Facilitate ได้ดีคือหนึ่งในทักษะที่หาคนทำได้ยากที่สุดในองค์กร และมีคุณค่ามากที่สุดในยุคที่ต้องการความร่วมมือและ Co-creation

Facilitation Skills for Communication สอนกระบวนการคิด เครื่องมือ และทักษะที่จำเป็นในการออกแบบและนำกระบวนการกลุ่ม ไม่ว่าจะเป็นการประชุม Workshop, Strategy Session, หรือการสนทนาที่ต้องการการมีส่วนร่วมจากทุกคน

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- ออกแบบและนำ Workshop และการประชุมที่ได้ผลลัพธ์จริงได้
- จัดการพลวัตกลุ่มที่ซับซ้อนได้โดยไม่สูญเสียทิศทาง
- สร้างบรรยากาศที่ทุกคนอยากมีส่วนร่วมและแสดงความคิดเห็น

---

#### เหมาะสำหรับ

- HR, L&D, OD Consultant และผู้ออกแบบ Learning Experience
- ผู้นำและผู้จัดการที่ต้องนำการประชุมและ Decision-Making Session
- ผู้ที่ต้องการเปลี่ยนตัวเองจาก Presenter เป็น Facilitator

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'meaningful-conversation',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — The Depth of Conversation: ทำไมเราคุยกันเยอะแต่เชื่อมกันน้อย',
        desc: 'ในยุคที่สื่อสารง่ายที่สุดในประวัติศาสตร์ แต่ความสัมพันธ์กลับตื้นที่สุด\n\n- Levels of Conversation: Small Talk, Fact Sharing, Opinion, Feeling, Value, Purpose\n- The Cocktail Party Trap: ทำไมเราติดอยู่ที่ระดับผิวเผิน\n- What Makes a Conversation Meaningful: องค์ประกอบที่สร้าง Connection จริงๆ\n- The Loneliness Paradox: ทำไมคนที่มีเพื่อนเยอะถึงรู้สึกโดดเดี่ยว\n- Personal Inventory: ทบทวนบทสนทนาในชีวิตที่มีความหมายที่สุดและทำไม'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Presence in Conversation: อยู่ในบทสนทนาอย่างเต็มที่',
        desc: 'บทสนทนาที่มีความหมายเริ่มต้นจากการอยู่ในนั้นจริงๆ ไม่ใช่แค่ร่างกาย\n\n- Multi-tasking Myth: ทำไมสมองทำสองอย่างพร้อมกันไม่ได้จริงๆ\n- Device-Free Conversation: ผลของการวางโทรศัพท์ที่วัดได้ทางวิทยาศาสตร์\n- Mindful Listening: อยู่กับปัจจุบันในบทสนทนาโดยไม่วางแผนคำตอบ\n- Somatic Awareness: ใช้ร่างกายเป็นสัญญาณว่าคุณอยู่ในบทสนทนาหรือเปล่า\n- Practice: สนทนา 10 นาทีโดยไม่มีสิ่งรบกวน แล้ว Debrief ความแตกต่าง'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Questions that Open Doors: ถามคำถามที่นำสู่บทสนทนาที่ลึกกว่า',
        desc: 'คำถามที่ดีเปิดประตูสู่บทสนทนาที่คนจะจำไปตลอดชีวิต\n\n- Closed vs Open-Ended Questions ในบริบทของ Meaningful Conversation\n- Generative Questions: คำถามที่สร้างความคิดใหม่ ไม่ใช่แค่ดึงข้อมูลเก่า\n- Question Depth Model: เพิ่มระดับความลึกของคำถามอย่างเป็นธรรมชาติ\n- The Art of Follow-Up Questions: ฟังแล้วถามต่อจากสิ่งที่ได้ยิน\n- Workshop: ฝึกสนทนาโดยใช้คำถาม 5 ข้อเพื่อไปถึงระดับ Purpose'
      },
      {
        icon: 'Compass',
        title: 'Module 4 — Vulnerability and Authenticity: ความจริงใจที่สร้างความสัมพันธ์ที่แท้จริง',
        desc: 'บทสนทนาที่มีความหมายต้องการความกล้าที่จะเปิดเผยตัวเองในระดับที่ถูกต้อง\n\n- Vulnerability as Connection Bridge: เปิดเผยตัวเองอย่างมีสติ ไม่ใช่การระบาย\n- Authentic Sharing: พูดความจริงของตัวเองโดยไม่โจมตีหรือตัดสินผู้อื่น\n- Reciprocal Self-Disclosure: สร้าง Intimacy ผ่านการแลกเปลี่ยนความจริงกัน\n- Boundaries in Meaningful Conversation: รู้ว่าอะไรควรแชร์และอะไรไม่ควร\n- Role Play: ฝึกบทสนทนาที่ต้องการความกล้าในระดับที่ปลอดภัย'
      },
      {
        icon: 'Star',
        title: 'Module 5 — Meaningful Conversations at Work: ความสัมพันธ์ที่ลึกซึ้งในบริบทองค์กร',
        desc: 'บทสนทนาที่มีความหมายไม่ใช่สิ่งหรูหรา แต่คือสิ่งที่ทำให้งานมีคุณค่าและทีมแข็งแกร่ง\n\n- Meaningful 1-on-1: เปลี่ยนการประชุมตรวจงานให้เป็นบทสนทนาที่พัฒนาคน\n- Team Conversations Beyond Task: สร้างพื้นที่สนทนาที่เกินไปกว่าเรื่องงาน\n- Cross-Generational Conversations: สนทนากับคนต่าง Generation อย่างมีความหมาย\n- Building Relationship Capital: ความสัมพันธ์ที่แข็งแกร่งสร้างได้จากบทสนทนาเล็กๆ\n- Personal Practice Design: ออกแบบนิสัยการสนทนาที่มีความหมายในชีวิตประจำวัน'
      }
    ],
    long_description: `ในท้ายที่สุด สิ่งที่มนุษย์ต้องการที่สุดคือการรู้สึกว่าตัวเองถูกได้ยิน เข้าใจ และสำคัญในสายตาของคนอื่น

Meaningful Conversation สอนให้ผู้เข้าอบรมสร้างบทสนทนาที่เชื่อมคน ไม่ใช่แค่แลกเปลี่ยนข้อมูล ผ่านทักษะการอยู่เป็นปัจจุบัน การถามคำถามที่เปิดระดับความลึก ความกล้าที่จะเปิดเผยตัวเองอย่างแท้จริง และการสร้างพื้นที่ที่คนรู้สึกว่าสามารถพูดความจริงได้อย่างปลอดภัย

---

#### ผลลัพธ์ที่สัมผัสได้หลังผ่านหลักสูตร

- ความสัมพันธ์ในทีมลึกขึ้น ไว้ใจกันมากขึ้น ทำงานร่วมกันได้ดีขึ้น
- บทสนทนา 1-on-1 มีคุณภาพสูงขึ้น คนรู้สึกว่าตัวเองถูกรับฟังและให้คุณค่า
- วัฒนธรรมองค์กรเปิดขึ้น คนกล้าพูดความจริงและแสดงตัวตนที่แท้จริง

---

#### เหมาะสำหรับ

- ผู้นำที่ต้องการสร้างความสัมพันธ์ที่ลึกซึ้งกับทีม ไม่ใช่แค่ความสัมพันธ์เชิงงาน
- HR, Coach, Counselor และผู้ที่ทำงานกับความสัมพันธ์ระหว่างคนเป็นหลัก
- ทุกคนที่ต้องการให้ชีวิตและงานของตัวเองมีความหมายมากขึ้นผ่านการเชื่อมกับคนอื่น

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  }
];

// ─── Run Update ───────────────────────────────────────────────
async function main() {
  console.log('Communication Skills — Full Content Update');
  console.log('==========================================\n');

  let success = 0;
  let failed = 0;

  for (const course of courses) {
    const { error } = await supabase
      .from('courses')
      .update({
        objectives:       course.objectives,
        long_description: course.long_description,
      })
      .eq('slug', course.slug);

    if (error) {
      console.error(`  FAIL  ${course.slug}: ${error.message}`);
      failed++;
    } else {
      console.log(`  OK    ${course.slug}`);
      success++;
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed`);
  console.log(`Total: ${courses.length} Communication Skills courses`);
}

main();
