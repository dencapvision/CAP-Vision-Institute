/**
 * update-leader-skills.mjs
 * อัปเดต objectives + long_description สำหรับ Leader Skills
 * (ยกเว้น transformational-leadership, leading-with-purpose,
 *  leadership-communication-for-impact ที่เขียนเสร็จแล้ว)
 *
 * รัน: node scripts/update-leader-skills.mjs
 * ครอบคลุม 12 หลักสูตร
 */

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

// ─── Course Content ────────────────────────────────────────────────
const courses = [

  // ══════════════════════════════════════════════════════
  // 1. Leadership Mindset Reset
  // ══════════════════════════════════════════════════════
  {
    slug: 'leadership-mindset-reset',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — Mindset Audit: รู้จัก Mindset ปัจจุบันของตัวเอง',
        desc: 'ก่อนจะ Reset ต้องรู้ก่อนว่ากำลัง Run โปรแกรมอะไรอยู่\n\n- วิเคราะห์ Current Leadership Mindset ผ่าน CAP Mindset Profile\n- ระบุ Limiting Beliefs ที่ขัดขวางการเป็นผู้นำที่มีประสิทธิภาพ\n- เข้าใจ Fixed vs Growth Mindset ในบริบทผู้นำองค์กรจริง\n- ค้นพบ "Story I Tell Myself" ที่จำกัดพฤติกรรมการนำโดยไม่รู้ตัว\n- Workshop: Mindset Map — วาดแผนที่ความเชื่อที่มีผลต่อการนำ'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Belief Rewiring: ปรับโปรแกรมความเชื่อ',
        desc: 'Mindset เปลี่ยนได้ แต่ต้องใช้กระบวนการที่ถูกต้อง\n\n- Neuroscience of Change: สมองเปลี่ยนได้อย่างไร และทำไม Willpower ไม่พอ\n- Cognitive Reframing: เปลี่ยนกรอบความคิดโดยไม่ต้องลืมประสบการณ์เดิม\n- จาก "ฉันต้องรู้ทุกอย่าง" สู่ "ฉันสร้างทีมที่แข็งแกร่งกว่าตัวเอง"\n- กระบวนการ Unlearn ที่ต้องทำก่อน Relearn\n- Workshop: เขียน Empowering Belief ทดแทนความเชื่อที่จำกัด'
      },
      {
        icon: 'Layers',
        title: 'Module 3 — Leader vs Expert: เปลี่ยนบทบาทจาก Expert สู่ Leader',
        desc: 'สิ่งที่ทำให้คุณประสบความสำเร็จในฐานะ Expert อาจเป็นสิ่งที่ขัดขวางคุณในฐานะ Leader\n\n- ความแตกต่างระหว่าง Individual Contributor, Manager, และ Leader อย่างชัดเจน\n- Letting Go: ปล่อยวางการควบคุมแบบ Micromanager อย่างมีเกียรติ\n- Delegation เป็น Leadership Act ไม่ใช่แค่การกระจายงาน\n- "The Expert Trap": ทำไมคนเก่งที่สุดมักเป็นหัวหน้าที่ยากที่สุด\n- Role Play: สถานการณ์ที่ต้องเลือกระหว่าง Doing กับ Enabling'
      },
      {
        icon: 'Zap',
        title: 'Module 4 — Proactive Leadership: นำแบบ Proactive ไม่ใช่ Reactive',
        desc: 'ผู้นำที่ Reactive ถูกสถานการณ์นำ ผู้นำที่ Proactive นำสถานการณ์\n\n- Circle of Concern vs Circle of Influence: เลือกใช้พลังงานอย่างชาญฉลาด\n- วิธีรับมือ Crisis โดยไม่ตกอยู่ใน Reactive Mode\n- Stimulus-Response Gap: พื้นที่ระหว่างเหตุการณ์กับการตอบสนอง\n- Proactive Language: ปรับคำพูดที่สะท้อน Mindset ผู้นำ\n- ฝึก Pause Practice: หยุด 6 วินาทีก่อนตอบสนองในสถานการณ์กดดัน'
      },
      {
        icon: 'Target',
        title: 'Module 5 — Mindset in Action: แผนพัฒนาที่ยั่งยืน',
        desc: 'Mindset ที่ดีต้องแสดงออกมาเป็นพฤติกรรมที่สม่ำเสมอ\n\n- ออกแบบ 30-60-90 Day Personal Mindset Reset Plan\n- Mindset Triggers: ระบุสถานการณ์ที่จะ Trigger Limiting Beliefs\n- Accountability Partner System ที่ Works จริงในชีวิตงาน\n- สร้าง Daily Practices ที่ Reinforce New Mindset\n- Commitment Circle: แต่ละคนประกาศการเปลี่ยนแปลงที่จะเริ่มพรุ่งนี้'
      }
    ],
    long_description: `ทักษะผู้นำทั้งหมดยืนอยู่บน Mindset ที่ถูกต้อง

Leadership Mindset Reset ออกแบบมาเพื่อผู้นำที่รู้ว่าตัวเองต้องเปลี่ยน แต่ยังไม่รู้ว่าจะเริ่มจากตรงไหน หรือผู้นำที่ถูก Promote มาจากการเป็น Expert แต่ยังติดกับดักการทำทุกอย่างเอง โดยมองไม่เห็นว่า "ความเก่ง" ของตัวเองกำลังกลายเป็น Bottleneck ขององค์กร

หลักสูตรนี้ใช้ Neuroscience of Change และ CAP Facilitation Framework ที่ผ่านการพิสูจน์กับผู้นำมากกว่า 1,000 คน เพื่อดึงความเชื่อที่จำกัดออกมา ตั้งคำถาม และแทนที่ด้วย Empowering Beliefs ที่สอดคล้องกับบทบาทผู้นำที่แท้จริง

---

#### ผลลัพธ์ที่ผู้นำรายงานหลังผ่านหลักสูตร

- กล้า Delegate มากขึ้น และทีมรับผิดชอบได้มากขึ้นตามไปด้วย
- หยุด Micromanage และเริ่ม Empower แทน
- มองความท้าทายเป็นโอกาสเรียนรู้ ไม่ใช่ภัยคุกคาม

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 2. Strategic Thinking for Leaders
  // ══════════════════════════════════════════════════════
  {
    slug: 'strategic-thinking-for-leaders',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — Strategic Lens: มองโลกด้วยสายตา Strategic',
        desc: 'ผู้นำ Strategic เห็นสิ่งที่คนอื่นมองข้าม\n\n- ความแตกต่างระหว่าง Operational Thinking กับ Strategic Thinking\n- Helicopter View: ฝึกมองภาพรวมโดยไม่สูญเสียความเข้าใจในรายละเอียด\n- Systems Thinking: เห็นความเชื่อมโยงระหว่างปัจจัยต่างๆ\n- Environmental Scanning: อ่านสัญญาณจาก PESTLE และตลาด\n- Workshop: วิเคราะห์ Industry ของตัวเองผ่าน Strategic Lens'
      },
      {
        icon: 'Layers',
        title: 'Module 2 — Strategic Frameworks: เครื่องมือคิดเชิงกลยุทธ์',
        desc: 'เครื่องมือที่ถูกต้องทำให้การตัดสินใจเชิงกลยุทธ์ชัดขึ้นและเร็วขึ้น\n\n- SWOT ขั้นสูง: ใช้ให้ได้มากกว่าแค่รายการจุดแข็งจุดอ่อน\n- Porter Five Forces: วิเคราะห์ความน่าดึงดูดของอุตสาหกรรม\n- Blue Ocean Strategy: สร้างตลาดใหม่แทนการแข่งขันในตลาดเดิม\n- Scenario Planning: เตรียมพร้อมสำหรับอนาคตหลายแบบ\n- Case Workshop: ใช้ Framework กับธุรกิจจริง'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Strategic Decision Making: ตัดสินใจเชิงกลยุทธ์',
        desc: 'กลยุทธ์ที่ดีที่สุดคือกลยุทธ์ที่ถูก Execute ได้\n\n- Where to Play & How to Win Framework (Roger Martin)\n- Resource Allocation: จัดสรรทรัพยากรให้ตรงกับ Strategic Priority\n- Trade-offs ใน Strategy: เลือกสิ่งที่จะไม่ทำให้ชัดเจน\n- Data-informed vs Data-driven: ใช้ข้อมูลอย่างชาญฉลาดในการตัดสินใจ\n- Workshop: เลือก Strategic Option สำหรับองค์กรของตัวเอง'
      },
      {
        icon: 'Target',
        title: 'Module 4 — Strategy Communication: สื่อสารกลยุทธ์ให้ทีมเข้าใจและ Align',
        desc: 'กลยุทธ์ที่ไม่ถูกสื่อสารได้ดีจะไม่ถูก Execute\n\n- Cascading Strategy: แปลง Strategy ระดับองค์กรลงสู่ Team และ Individual Goals\n- OKR เป็นเครื่องมือ Strategy Communication ที่ทรงพลัง\n- Strategy Story: เล่ากลยุทธ์เป็นเรื่องราวที่ทุกคนเข้าใจและอยากร่วม\n- War Room: วิธีออกแบบ Strategy Review ที่สร้าง Alignment จริง\n- Workshop: ออกแบบ Strategy Cascade ของแผนกตัวเอง'
      },
      {
        icon: 'Compass',
        title: 'Module 5 — Strategic Leadership Habits: นิสัยผู้นำเชิงกลยุทธ์',
        desc: 'Strategic Thinking เป็นทักษะที่ต้องฝึกทุกวัน ไม่ใช่แค่ในห้องประชุม\n\n- Weekly Strategic Review: ใช้ 30 นาทีต่อสัปดาห์อย่างมีคุณค่า\n- Strategic Reading: สร้าง Information Diet ที่ทำให้ Thinking คมขึ้น\n- Thinking Partners: หา People ที่ Challenge มุมมองของคุณ\n- Long-term vs Short-term: จัดสมดุลระหว่างงาน Urgent และงาน Important\n- Commitment: แต่ละคนออก Personal Strategic Habit Plan'
      }
    ],
    long_description: `ผู้นำที่ยุ่งกับงาน Operational จนไม่มีเวลาคิด Strategic คือองค์กรที่กำลังวิ่งไปในทิศทางที่ผิด

Strategic Thinking for Leaders สร้างขึ้นจากความเชื่อว่า Strategic Thinking ไม่ใช่พรสวรรค์ที่คนบางคนมี แต่คือทักษะที่ฝึกได้ผ่านกรอบคิดที่ถูกต้องและการปฏิบัติที่สม่ำเสมอ หลักสูตรนี้ผสาน Strategic Frameworks ระดับโลกกับ CAP Facilitation Process ที่ทำให้การเรียนรู้เกิดขึ้นผ่านการ Apply กับโจทย์จริงขององค์กรของผู้เข้าอบรม

ผู้เข้าอบรมจะไม่ได้แค่รู้จัก Framework แต่จะสามารถใช้ได้จริงในวันรุ่งขึ้น เพราะทุก Module ออกแบบให้ฝึกกับข้อมูลและบริบทขององค์กรจริง

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- ใช้เวลากับงาน Strategic มากขึ้น 40% ภายใน 3 เดือน
- ทีมเข้าใจและ Align กับทิศทางองค์กรได้ชัดขึ้น
- การตัดสินใจเชิงกลยุทธ์รวดเร็วและมั่นใจมากขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 3. Decision Making Mastery
  // ══════════════════════════════════════════════════════
  {
    slug: 'decision-making-mastery',
    objectives: [
      {
        icon: 'Brain',
        title: 'Module 1 — Decision Science: วิทยาศาสตร์เบื้องหลังการตัดสินใจ',
        desc: 'ทำไมคนฉลาดจึงยังตัดสินใจผิดพลาด?\n\n- System 1 vs System 2: สมองสองระบบที่ควบคุมการตัดสินใจ\n- Cognitive Biases 12 ชนิดที่พบบ่อยในผู้นำ: Confirmation, Sunk Cost, Anchoring\n- Emotional Hijack: อารมณ์บิดเบือนการตัดสินใจอย่างไร\n- Heuristics: Shortcuts ที่มีประโยชน์แต่อันตราย\n- Workshop: วิเคราะห์การตัดสินใจที่ผ่านมาของตัวเองผ่าน Bias Lens'
      },
      {
        icon: 'Layers',
        title: 'Module 2 — Decision Frameworks: กรอบการตัดสินใจที่เป็นระบบ',
        desc: 'กรอบที่ดีทำให้การตัดสินใจเป็น Repeatable Process ไม่ใช่แค่ Gut Feeling\n\n- Decision Matrix: ประเมินทางเลือกด้วยเกณฑ์ที่ชัดเจน\n- OODA Loop: Observe-Orient-Decide-Act สำหรับสถานการณ์เร่งด่วน\n- Pre-mortem Analysis: จินตนาการความล้มเหลวก่อนตัดสินใจ\n- Reversible vs Irreversible: ตัดสินใจต่างกันตาม Type ของ Decision\n- ฝึก: นำ Decision Framework มาใช้กับ Real Decision ที่กำลังเผชิญ'
      },
      {
        icon: 'Eye',
        title: 'Module 3 — Information Quality: ตัดสินใจด้วยข้อมูลที่มีคุณภาพ',
        desc: 'Garbage In Garbage Out ใช้ได้กับการตัดสินใจเสมอ\n\n- การประเมิน Quality ของ Sources และ Data ที่ได้รับ\n- ข้อมูลที่ "ดูดี" แต่ Misleading: วิธีสังเกตและหลีกเลี่ยง\n- เมื่อข้อมูลไม่ครบ: วิธีตัดสินใจอย่างมีเหตุผลภายใต้ Uncertainty\n- Diverse Input: ทำไมต้องรับฟัง Perspective หลากหลายก่อนตัดสินใจ\n- Workshop: Stress-test Decision ด้วยการหาข้อมูลที่โต้แย้ง'
      },
      {
        icon: 'Zap',
        title: 'Module 4 — Pressure Decisions: ตัดสินใจในสถานการณ์กดดัน',
        desc: 'การตัดสินใจยากที่สุดมักมาพร้อมกับ Deadline ที่สั้นที่สุด\n\n- Time-boxed Decision Making: ตั้ง Deadline ให้กับกระบวนการตัดสินใจ\n- Satisficing vs Optimizing: เมื่อ "ดีพอ" ดีกว่า "สมบูรณ์แบบ"\n- Managing Ambiguity: ตัดสินใจโดยไม่รอข้อมูลครบร้อยเปอร์เซ็นต์\n- Stress Inoculation: ฝึกตัดสินใจในสภาวะกดดันจำลอง\n- Simulation: High-stakes Decision Scenario ที่ต้องตัดสินใจในเวลาจำกัด'
      },
      {
        icon: 'Target',
        title: 'Module 5 — Decision Communication: สื่อสารการตัดสินใจให้ทีม Buy-in',
        desc: 'การตัดสินใจที่ดีที่ไม่ได้รับ Buy-in ก็ยังไม่ถูก Execute\n\n- RACI สำหรับการตัดสินใจ: ใครต้อง Involve ในระดับไหน\n- การอธิบายเหตุผลโดยไม่ต้อง Justify ทุกอย่าง\n- รับมือกับ Pushback หลังตัดสินใจอย่างมั่นใจและเปิดกว้าง\n- Learning from Decisions: สร้าง After-action Review Process\n- Commitment: แต่ละคนออก Personal Decision Protocol'
      }
    ],
    long_description: `ผู้นำที่ตัดสินใจช้าและผิดพลาดบ่อยทำให้ทีมสูญเสียโมเมนตัมและความเชื่อมั่น

Decision Making Mastery สร้างขึ้นจาก Behavioral Economics, Neuroscience, และ Applied Psychology เพื่อช่วยให้ผู้นำเข้าใจ "ทำไม" เบื้องหลังการตัดสินใจ ไม่ใช่แค่ "อะไร" ที่ต้องตัดสินใจ เพราะการเข้าใจ Root Cause ของการตัดสินใจที่ผิดพลาดคือจุดเริ่มต้นของการพัฒนาที่ยั่งยืน

หลักสูตรนี้ออกแบบให้ผู้เข้าอบรมฝึกตัดสินใจจริงในสถานการณ์จำลองที่ใกล้เคียงกับสถานการณ์ขององค์กรจริง พร้อมรับ Feedback แบบ Real-time จาก Facilitator ที่มีประสบการณ์

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- ตัดสินใจได้เร็วขึ้นโดยไม่ลดคุณภาพของการตัดสินใจ
- รู้จัก Bias ของตัวเองและมีกลไกป้องกันที่ใช้ได้จริง
- ทีม Buy-in กับการตัดสินใจมากขึ้นเพราะกระบวนการโปร่งใส

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 4. Adaptive Leadership
  // ══════════════════════════════════════════════════════
  {
    slug: 'adaptive-leadership',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — VUCA Reality: เข้าใจโลกที่เปลี่ยนเร็ว',
        desc: 'ผู้นำที่ยังใช้ Playbook เดิมในโลกใหม่จะนำองค์กรไปสู่ความล้าหลัง\n\n- VUCA World: Volatility, Uncertainty, Complexity, Ambiguity ในบริบทธุรกิจไทย\n- Megatrends ที่กำลัง Disrupt ทุกอุตสาหกรรม\n- Technical vs Adaptive Challenges: แยกแยะและเลือกวิธีรับมือที่ถูกต้อง\n- ทำไม Solutions เดิมไม่ Work กับ Adaptive Challenges\n- Workshop: วิเคราะห์ Challenges ขององค์กรว่าเป็น Technical หรือ Adaptive'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Adaptive Mindset: Mindset สำหรับโลกที่ไม่แน่นอน',
        desc: 'การปรับตัวเริ่มจากการเปลี่ยนวิธีคิด ไม่ใช่แค่เปลี่ยน Action\n\n- Learning Agility: ความสามารถเรียนรู้ ลืม และเรียนรู้ใหม่\n- Comfort with Ambiguity: รับมือกับความไม่แน่นอนโดยไม่ Panic\n- Beginner Mind (Shoshin): กลับมาเรียนรู้แบบ Fresh Eyes\n- Resilience vs Adaptability: ความแตกต่างและเมื่อไหรต้องใช้อะไร\n- Self-assessment: วัด Adaptive Capacity ของตนเองและทีม'
      },
      {
        icon: 'Layers',
        title: 'Module 3 — Leading Change: นำการเปลี่ยนแปลงอย่างมีกลยุทธ์',
        desc: 'Adaptive Leaders ไม่ได้แค่ Survive การเปลี่ยนแปลง แต่ Thrive กับมัน\n\n- Holding Environment: สร้างพื้นที่ปลอดภัยสำหรับการทดลองและเปลี่ยนแปลง\n- Productive Disequilibrium: ใช้ความตึงเครียดเป็นเชื้อเพลิงการเปลี่ยนแปลง\n- Managing Resistance: เข้าใจและจัดการความต้านทานด้วยความเห็นใจ\n- Coalition Building: สร้างกลุ่มผู้นำการเปลี่ยนแปลงในทุกระดับ\n- Case Study: วิเคราะห์กรณีการเปลี่ยนแปลงที่สำเร็จและล้มเหลว'
      },
      {
        icon: 'Zap',
        title: 'Module 4 — Experimentation Culture: สร้างวัฒนธรรมการทดลอง',
        desc: 'องค์กรที่ Adaptive ที่สุดคือองค์กรที่ Experiment เร็วและเรียนรู้เร็ว\n\n- Fail Fast, Learn Fast: เปลี่ยน Failure เป็น Data\n- Small Bets: วิธีทดสอบไอเดียใหม่โดยไม่เสี่ยงทรัพยากรมาก\n- Psychological Safety สำหรับ Experimentation\n- Agile Iteration: วางแผน ทดลอง วัดผล ปรับแผน\n- Workshop: ออกแบบ Small Experiment สำหรับโจทย์ขององค์กร'
      },
      {
        icon: 'Compass',
        title: 'Module 5 — Adaptive Action Plan: แผนนำองค์กรสู่ความสามารถในการปรับตัว',
        desc: 'Adaptive Leadership ต้องถูกฝังเป็นความสามารถขององค์กร\n\n- Organizational Adaptability Assessment: วัดระดับความสามารถปรับตัวขององค์กร\n- ออกแบบ Adaptive Leadership Practices ในระดับทีม\n- Building Adaptive Capacity: เสริมสร้างทักษะปรับตัวในทีม\n- Early Warning System: สร้างระบบตรวจจับสัญญาณการเปลี่ยนแปลงแต่เนิ่นๆ\n- Commitment: แต่ละคนออก Adaptive Leadership Action Plan'
      }
    ],
    long_description: `ในโลกที่ทุกอย่างเปลี่ยนแปลงเร็วกว่าที่เคย ทักษะที่ทำให้รอดไม่ใช่ความเก่ง แต่คือความสามารถในการปรับตัว

Adaptive Leadership สร้างขึ้นจากงานวิจัยของ Ron Heifetz และ Marty Linsky จาก Harvard Kennedy School ผสานกับ CAP Facilitation Framework เพื่อช่วยให้ผู้นำไทยเข้าใจและรับมือกับ Adaptive Challenges ที่ไม่มีคำตอบสำเร็จรูป

ผู้นำที่ผ่านหลักสูตรนี้จะไม่ได้แค่รู้วิธีปรับตัว แต่จะสามารถสร้างทีมและองค์กรที่มี Built-in Adaptive Capacity ที่พร้อมรับมือกับการเปลี่ยนแปลงในอนาคตได้อย่างมั่นใจ

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- มองเห็น Adaptive Challenges ได้เร็วขึ้นและตอบสนองได้ถูกวิธี
- ทีมกล้าทดลองและเรียนรู้จากความผิดพลาดได้มากขึ้น
- องค์กรปรับตัวต่อการเปลี่ยนแปลงได้เร็วและมีประสิทธิภาพขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 5. Coaching Leadership
  // ══════════════════════════════════════════════════════
  {
    slug: 'coaching-leadership',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — Coaching vs Telling: เปลี่ยนวิธีนำจากการบอกสู่การถาม',
        desc: 'ผู้นำที่บอกทุกอย่างสร้างคนที่รอคำสั่ง ผู้นำที่ถามสร้างคนที่คิดเอง\n\n- ความแตกต่างระหว่าง Coaching, Mentoring, Consulting, และ Managing\n- "Advice Monster": ทำไมผู้นำถึงรีบให้คำตอบก่อนฟังคำถาม\n- เมื่อไหรควร Coach และเมื่อไหรควร Direct\n- Coaching Mindset: มองทุกคนว่ามีศักยภาพและหาคำตอบได้ด้วยตัวเอง\n- Self-assessment: วัดสัดส่วน Telling vs Asking ของตัวเองในปัจจุบัน'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Powerful Questions: ศิลปะแห่งการถาม',
        desc: 'คำถามที่ดีเปิดประตูสู่ความคิดที่ยังไม่เคยถูกเปิด\n\n- Open vs Closed Questions: เลือกใช้อย่างมีเจตนา\n- Scaling Questions: ประเมินสถานการณ์ด้วยตัวเลข\n- Future-oriented Questions: ดึงความคิดจาก Possibility ไม่ใช่ Problem\n- Silence as a Tool: ความเงียบที่ทรงพลังหลังคำถาม\n- Workshop: ฝึกตั้งคำถาม Coach กับ Real Situations จากชีวิตงาน'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 3 — GROW Model: กรอบการ Coach ที่ได้ผล',
        desc: 'GROW คือกรอบที่ทำให้ Coaching Conversation มีทิศทางและนำไปสู่ Action\n\n- Goal: ช่วยให้คนกำหนดเป้าหมายที่ชัดเจนและมีความหมาย\n- Reality: สำรวจสถานการณ์ปัจจุบันอย่างซื่อสัตย์\n- Options: ดึงทางเลือกออกมาให้มากที่สุด\n- Will/Way Forward: สร้าง Commitment ต่อ Action\n- Practice: ฝึก GROW Session แบบ Complete ในคู่ รับ Feedback'
      },
      {
        icon: 'Heart',
        title: 'Module 4 — Empathic Listening: ฟังในระดับที่สร้างความไว้วางใจ',
        desc: 'Coaching ไม่ได้เริ่มจากคำถาม แต่เริ่มจากการฟังที่แท้จริง\n\n- 5 Levels of Listening: จาก Ignoring ถึง Empathic\n- Listening to Understand ไม่ใช่ Listening to Reply\n- สังเกต Nonverbal Cues ที่บอกสิ่งที่คำพูดไม่ได้พูด\n- Reflecting Back: เทคนิคแสดงให้คนรู้ว่าถูกฟังจริง\n- Practice: Listening Lab ในคู่และกลุ่มเล็ก'
      },
      {
        icon: 'Users',
        title: 'Module 5 — Coaching Culture: สร้างวัฒนธรรม Coaching ในทีม',
        desc: 'Coaching ไม่ใช่แค่การนัดประชุม 1-on-1 แต่คือวิธีนำที่ฝังอยู่ในทุกการสื่อสาร\n\n- สร้าง Regular Coaching Rhythm: Weekly 1-on-1 ที่มีคุณภาพ\n- Micro-Coaching: Coach ในบทสนทนาสั้น 5 นาที\n- Team Coaching: ดึงปัญญาจากกลุ่มด้วย Group Coaching Techniques\n- Measuring Coaching Effectiveness: วัดผลที่วัดได้\n- Commitment Circle: แต่ละคนประกาศ Coaching Commitment 30 วัน'
      }
    ],
    long_description: `ผู้นำที่ดีที่สุดในโลกยุคใหม่ไม่ได้เป็นคนที่มีคำตอบมากที่สุด แต่คือคนที่ถามคำถามที่ดีที่สุด

Coaching Leadership สร้างขึ้นจาก Evidence-based Coaching Methodology และ CAP Facilitation Framework เพื่อเปลี่ยนผู้นำจาก Answer Machine เป็น Question Master ที่ดึงศักยภาพสูงสุดออกจากทีมได้โดยไม่ต้องทำทุกอย่างเอง

หลักสูตรนี้เน้นการฝึกปฏิบัติจริง 70% ของเวลาทั้งหมด ผู้เข้าอบรมทุกคนจะได้ฝึก Coach จริง รับ Feedback จริง และออก Action Plan ที่ใช้ได้ทันทีในการ 1-on-1 ครั้งถัดไป

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- ทีมคิดเองและแก้ปัญหาเองได้มากขึ้นอย่างเห็นได้ชัด
- เวลาของหัวหน้าเพิ่มขึ้นเพราะไม่ต้องแก้ปัญหาแทนทีมทุกเรื่อง
- ความสัมพันธ์ในทีมลึกขึ้นเพราะการสนทนาที่มีคุณภาพกว่าเดิม

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 6. High-Performance Leadership
  // ══════════════════════════════════════════════════════
  {
    slug: 'high-performance-leadership',
    objectives: [
      {
        icon: 'Target',
        title: 'Module 1 — High-Performance Defined: นิยาม High Performance ที่แท้จริง',
        desc: 'High Performance ไม่ใช่แค่ผลลัพธ์ตัวเลข แต่คือระบบที่สร้างผลลัพธ์อย่างสม่ำเสมอ\n\n- ความแตกต่างระหว่าง Busy Team กับ High-Performance Team\n- HP Anatomy: 5 องค์ประกอบของทีมที่มีประสิทธิภาพสูง (Google Project Aristotle)\n- Leading Indicators vs Lagging Indicators: วัดสิ่งที่สำคัญจริงๆ\n- HP Culture DNA: วัฒนธรรมที่ดึงดูดและรักษา High Performers\n- Assessment: วัด Current Performance Level ของทีม'
      },
      {
        icon: 'Compass',
        title: 'Module 2 — Goal Architecture: ออกแบบระบบเป้าหมายที่ขับเคลื่อนผลลัพธ์',
        desc: 'เป้าหมายที่ดีไม่ใช่แค่ตัวเลข แต่คือแรงบันดาลใจที่มีกำหนดวันสิ้นสุด\n\n- OKR: Objectives and Key Results สำหรับทีม\n- SMART Goals ขั้นสูง: เพิ่ม Meaning และ Why เข้าไป\n- Goal Cascade: Align Individual Goals กับ Team และ Org Goals\n- Stretch Goals vs Realistic Goals: เมื่อไหรใช้อะไร\n- Workshop: ออกแบบ OKR สำหรับทีมตัวเอง'
      },
      {
        icon: 'Users',
        title: 'Module 3 — Talent Optimization: ดึงศักยภาพสูงสุดของแต่ละคน',
        desc: 'ทีม High-Performance ไม่ได้มาจากการจ้างคนเก่งทุกคน แต่จากการให้คนทุกคนทำในสิ่งที่ตัวเองเก่งที่สุด\n\n- Strengths-based Leadership: ดึงจุดแข็งแทนการแก้จุดอ่อน\n- Role Crafting: ปรับ Role ให้เหมาะกับ Strengths\n- Individual Development Plans ที่มีความหมาย\n- Managing Different Performance Levels ในทีมเดียวกัน\n- Workshop: Strength Mapping สมาชิกในทีม'
      },
      {
        icon: 'Zap',
        title: 'Module 4 — Performance Rhythm: สร้างจังหวะการทำงานที่ Sustain ผลลัพธ์',
        desc: 'HP Teams ไม่ได้ Sprint ตลอดเวลา แต่รู้จังหวะที่จะเร่งและเมื่อไหรต้องพัก\n\n- Cadence of Accountability: สร้าง Check-in Rhythm ที่ทีม Own\n- Feedback Loops: ทำให้ Feedback เป็น Real-time ไม่ใช่แค่ Annual\n- Energy Management ระดับทีม: ไม่ใช่แค่ตัวเอง\n- Recovery as Performance: ทำไม Rest เป็นส่วนหนึ่งของ Performance\n- สร้าง Team Rituals ที่ Reinforce HP Culture'
      },
      {
        icon: 'Flame',
        title: 'Module 5 — Sustaining Excellence: รักษา High Performance ระยะยาว',
        desc: 'การ Sprint ระยะสั้นทุกคนทำได้ แต่การ Sustain ต้องการระบบ\n\n- Talent Retention: ทำไมคนเก่งออกและวิธีรักษา\n- Recognition Systems ที่ Work จริงและ Meaningful\n- Succession Planning ในระดับทีม\n- Building HP Culture ที่ Self-sustaining\n- Commitment: แต่ละคนออก HP Leadership Blueprint สำหรับทีม'
      }
    ],
    long_description: `ทีมที่ทำงานหนักแต่ผลลัพธ์ไม่ถึงศักยภาพที่แท้จริง คือปัญหาที่แก้ไขได้ด้วยระบบที่ถูกต้อง

High-Performance Leadership สร้างขึ้นจากงานวิจัยของ Google (Project Aristotle), Gallup Engagement Research, และ CAP Performance Framework เพื่อช่วยผู้นำออกแบบทั้งระบบ วัฒนธรรม และพฤติกรรมที่ทำให้ทีมสร้างผลลัพธ์ระดับสูงได้อย่างสม่ำเสมอ ไม่ใช่แค่ในช่วงที่มีแรงบันดาลใจ

ทุก Module ออกแบบให้ผู้เข้าอบรมนำ Frameworks ไปใช้กับทีมจริงของตัวเอง และออกมาพร้อม Action Plan ที่สามารถ Implement ได้ทันทีในสัปดาห์ถัดไป

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- ผลลัพธ์ของทีมเพิ่มขึ้น 20-35% ภายใน 90 วัน
- Engagement Score ของทีมสูงขึ้นอย่างมีนัยสำคัญ
- อัตราการ Retain High Performers ดีขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 7. Leadership Presence & Influence
  // ══════════════════════════════════════════════════════
  {
    slug: 'leadership-presence-and-influence',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — Presence Decoded: ถอดรหัส Executive Presence',
        desc: 'Presence ไม่ใช่สิ่งที่คุณทำ แต่คือสิ่งที่คนรู้สึกเมื่ออยู่ใกล้คุณ\n\n- Executive Presence ประกอบด้วยอะไร: Gravitas, Communication, Appearance\n- Presence Assessment: ผู้อื่นรับรู้ Presence ของเราอย่างไร\n- ช่องว่างระหว่าง How We See Ourselves กับ How Others See Us\n- Video Analysis: ดูและวิเคราะห์ Presence ของผู้นำระดับโลก\n- Workshop: ถ่าย Video ตัวเองและ Debrief กับ Facilitator'
      },
      {
        icon: 'Zap',
        title: 'Module 2 — Command the Room: สร้าง Commanding Presence',
        desc: 'คนที่ Walk Into a Room กับคนที่ Own the Room ต่างกันอย่างไร\n\n- Body Language ที่สร้าง Authority โดยไม่เป็น Aggressive\n- Voice Mastery: Pitch, Pace, Pause, Power\n- Eye Contact: เครื่องมือที่ทรงพลังที่สุดในการสร้าง Connection\n- Space Management: วิธีใช้ Physical Space สร้าง Presence\n- ฝึก: Power Entry — การเข้าห้องที่สร้าง Positive First Impression'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Influence Psychology: วิทยาศาสตร์แห่งอิทธิพล',
        desc: 'Influence ที่แท้จริงมาจากการเข้าใจ Human Psychology ไม่ใช่การบงการ\n\n- Cialdini 6 Principles: Reciprocity, Commitment, Social Proof, Authority, Liking, Scarcity\n- Trust as Foundation: ทำไม Trust เป็นเงื่อนไขเบื้องต้นของ Influence\n- Emotional Influence: เชื่อมกับ Emotions ก่อน Logic\n- Credibility Building: สร้างและรักษา Credibility ในระยะยาว\n- ฝึก: วิเคราะห์สถานการณ์ Influence ในชีวิตงานจริง'
      },
      {
        icon: 'Heart',
        title: 'Module 4 — Authentic Presence: Presence ที่มาจากภายใน',
        desc: 'Presence ที่ Sustainable ต้องมาจากความเป็นตัวเอง ไม่ใช่การแสดง\n\n- Authentic Leadership: เป็นตัวเองในระดับที่เหมาะสมกับบริบท\n- Personal Brand ในองค์กร: คุณต้องการให้คนจำคุณว่าอย่างไร\n- Vulnerability as Strength: การเปิดเผยตัวเองอย่างเหมาะสม\n- Values Alignment: Presence ที่แสดงค่านิยมของตัวเองออกมา\n- Workshop: Craft Your Leadership Brand Statement'
      },
      {
        icon: 'Target',
        title: 'Module 5 — Influence Across Levels: Influence ข้ามระดับและข้ามแผนก',
        desc: 'ผู้นำที่ทรงพลังในยุคนี้ต้อง Influence ได้ทั้งขึ้น ลง และข้าง\n\n- Influencing Up: นำเสนอต่อผู้บังคับบัญชาและ Board อย่างมีประสิทธิภาพ\n- Influencing Across: สร้าง Buy-in จากแผนกอื่นโดยไม่มี Authority\n- Influencing Down: สร้างแรงบันดาลใจไม่ใช่แค่ Direction\n- Stakeholder Mapping: รู้จัก Influencers ที่สำคัญในองค์กร\n- Commitment: แต่ละคนออก Personal Influence Strategy Plan'
      }
    ],
    long_description: `ความสามารถเพียงอย่างเดียวไม่พอ ในโลกที่การมองเห็นและความน่าเชื่อถือสำคัญพอๆ กับผลลัพธ์

Leadership Presence & Influence สร้างขึ้นจาก Executive Presence Research, Behavioral Psychology, และ CAP Facilitation Framework เพื่อช่วยให้ผู้นำพัฒนา Presence ที่ทำให้คนฟัง Follow และเชื่อถือ โดยไม่ต้องพึ่งพาอำนาจตำแหน่ง

หลักสูตรนี้เน้น Practical Application 70% รวมถึงการถ่าย Video วิเคราะห์ Presence ฝึก Influence ในสถานการณ์จำลอง และรับ Personal Coaching จาก Facilitator แบบ Individualized

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- คนในองค์กรให้ความสนใจและ Follow มากขึ้น
- สามารถ Influence Stakeholders ที่ไม่ได้รายงานตรงได้ดีขึ้น
- มั่นใจในการสื่อสารต่อหน้ากลุ่มใหญ่มากขึ้นอย่างเห็นได้ชัด

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 8. Emotional Intelligence for Leaders
  // ══════════════════════════════════════════════════════
  {
    slug: 'emotional-intelligence-for-leaders',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — EQ Foundation: เข้าใจ EQ ในบริบทผู้นำ',
        desc: 'IQ พาคุณเข้ามา EQ คือสิ่งที่ทำให้คุณอยู่รอดและเติบโตในตำแหน่งผู้นำ\n\n- EQ vs IQ: ทำไม EQ ทำนายความสำเร็จผู้นำได้ดีกว่า\n- 4 Domains ของ EQ: Self-Awareness, Self-Management, Social Awareness, Relationship Management\n- EQ Assessment: วัด EQ Profile ของตัวเองด้วย EQ-i Framework\n- Leadership Derailment: เรื่องจริงของผู้นำที่ล้มเหลวเพราะ EQ ต่ำ\n- Debrief: ทำความเข้าใจ EQ Profile ของตัวเองกับ Facilitator'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Self-Awareness: รู้จักตัวเองอย่างลึกซึ้ง',
        desc: 'คุณไม่สามารถจัดการสิ่งที่คุณไม่รู้จัก\n\n- Emotional Vocabulary: ชื่อเรียกอารมณ์ที่แม่นยำทำให้จัดการได้ดีขึ้น\n- Trigger Mapping: ค้นหาสิ่งที่ Trigger Emotional Reactions\n- Values Clarification: ความขัดแย้งกับ Core Values คือที่มาของ Strong Emotions\n- Leadership Shadow: ผู้นำส่งผลต่อ Emotional Climate ของทีมอย่างไร\n- Journaling Practice: เครื่องมือพัฒนา Self-Awareness ที่ทรงพลัง'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Self-Management: จัดการอารมณ์และพฤติกรรมของตัวเอง',
        desc: 'Emotional Regulation คือ Superpower ของผู้นำที่มีประสิทธิภาพ\n\n- Amygdala Hijack: เข้าใจและป้องกัน Emotional Flooding\n- STOPP Technique: Stop, Think, Observe, Plan, Proceed\n- Reframing: เปลี่ยนมุมมองต่อสถานการณ์เพื่อ Regulate Emotion\n- Mindful Leadership: ฝึก Mindfulness ในบริบทการทำงาน\n- ฝึก: Emotion Regulation ในสถานการณ์กดดันจำลอง'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Social Awareness: อ่านอารมณ์ห้องได้',
        desc: 'ผู้นำที่มี High Social Awareness รู้ว่าห้องรู้สึกอะไรก่อนที่ใครจะพูด\n\n- Empathy: ความแตกต่างระหว่าง Cognitive และ Emotional Empathy\n- Reading Group Dynamics: อ่าน Energy และ Emotional Climate ของทีม\n- Organizational Awareness: เข้าใจ Political Landscape และ Unspoken Rules\n- Listening Beyond Words: ฟัง Tone, Pace, และ What Is Not Said\n- Practice: Empathy Walk — มองโลกผ่านสายตาของคนอื่น'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Relationship Management: นำความสัมพันธ์สู่ผลลัพธ์',
        desc: 'EQ สูงสุดคือการใช้ความเข้าใจ Emotions สร้างผลลัพธ์ที่ดีกว่าสำหรับทุกคน\n\n- Inspirational Leadership: ดึงสิ่งที่ดีที่สุดจากคนอื่นออกมา\n- Conflict Management ด้วย EQ: เปลี่ยนความขัดแย้งเป็นพลัง\n- Developing Others: เห็น Potential ในคนและช่วยให้พัฒนา\n- Change Catalyst: นำการเปลี่ยนแปลงด้วย Emotional Intelligence\n- Commitment: Personal EQ Development Plan 90 วัน'
      }
    ],
    long_description: `งานวิจัยจาก TalentSmart พบว่า EQ เป็นตัวทำนายความสำเร็จในการทำงานที่แม่นยำที่สุด มากกว่า IQ และ Technical Skills รวมกัน

Emotional Intelligence for Leaders ออกแบบโดยใช้ EQ-i 2.0 Framework และ CAP Facilitation Process เพื่อช่วยผู้นำพัฒนา EQ อย่างเป็นระบบ ตั้งแต่ Self-Awareness ถึง Relationship Management ผ่านกระบวนการ Assessment, Reflection, และ Practice ที่สอดคล้องกับความเป็นจริงของชีวิตการทำงาน

ผู้เข้าอบรมทุกคนจะได้รับ Personal EQ Report และ Debrief Session เพื่อทำความเข้าใจ Profile ของตัวเองอย่างลึกซึ้งก่อนเข้าสู่การพัฒนา

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- จัดการ Stress ได้ดีขึ้นและ Recover จากสถานการณ์ยากได้เร็วขึ้น
- ทีมรู้สึก Heard และ Valued มากขึ้นอย่างเห็นได้ชัด
- ความสัมพันธ์ในองค์กรดีขึ้น Conflict ลดลง

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 9. Change Leadership
  // ══════════════════════════════════════════════════════
  {
    slug: 'change-leadership',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — Change Landscape: เข้าใจธรรมชาติของการเปลี่ยนแปลง',
        desc: 'การเปลี่ยนแปลงไม่ใช่เหตุการณ์ แต่คือกระบวนการที่ต้องการผู้นำที่เข้าใจจิตใจมนุษย์\n\n- ทำไม 70% ของ Change Initiatives ล้มเหลว\n- Change Curve: ทำความเข้าใจ Emotional Journey ของคนในการเปลี่ยนแปลง\n- Types of Change: Incremental, Transformational, และ Disruptive\n- Hidden Iceberg: ส่วนที่มองไม่เห็นของ Resistance\n- Assessment: วัด Change Readiness ขององค์กรและทีม'
      },
      {
        icon: 'Layers',
        title: 'Module 2 — Change Frameworks: กรอบการนำการเปลี่ยนแปลง',
        desc: 'Framework ที่ถูกต้องทำให้ Change Process มีโครงสร้างและลด Chaos\n\n- Kotter 8-Step Model: จาก Urgency สู่ Institutionalization\n- ADKAR: Awareness, Desire, Knowledge, Ability, Reinforcement\n- Lewin Change Model: Unfreeze, Change, Refreeze\n- Prosci Change Triangle: Leadership, Project Management, Change Management\n- Workshop: เลือก Framework และ Apply กับ Change Project จริงขององค์กร'
      },
      {
        icon: 'Heart',
        title: 'Module 3 — Managing Resistance: จัดการความต้านทานด้วยความเข้าใจ',
        desc: 'Resistance ไม่ใช่ศัตรู แต่คือข้อมูลสำคัญที่ผู้นำต้องฟัง\n\n- Root Causes of Resistance: กลัวอะไร? สูญเสียอะไร?\n- Active vs Passive Resistance: สังเกตสัญญาณทั้งสองแบบ\n- Empathy-based Resistance Management: ฟังและ Validate ก่อน Persuade\n- Timing Matters: เมื่อไหรต้องฟัง เมื่อไหรต้องตัดสินใจ\n- Role Play: จัดการ Resistant Stakeholder ในสถานการณ์จำลอง'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Coalition Building: สร้างกองทัพ Change Agents',
        desc: 'ผู้นำคนเดียวไม่สามารถนำการเปลี่ยนแปลงใหญ่ได้ ต้องสร้าง Coalition\n\n- Change Champions: ระบุและ Develop คนที่จะเป็น Change Advocates\n- Stakeholder Mapping: รู้จัก Supporters, Neutrals, และ Resistors\n- Guiding Coalition: สร้างทีมนำการเปลี่ยนแปลงจากทุกระดับ\n- Peer Influence: ทำไม Peer-to-peer ทรงพลังกว่า Top-down\n- Workshop: ออกแบบ Change Coalition สำหรับโครงการจริง'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Sustaining Change: ทำให้การเปลี่ยนแปลง Stick',
        desc: 'ความสำเร็จที่แท้จริงคือเมื่อ New Way กลายเป็น Normal Way\n\n- Quick Wins: วางแผน Early Wins ที่สร้าง Momentum\n- Celebrating Progress: ทำให้ทีมเห็นและรู้สึกถึงความก้าวหน้า\n- Embedding in Culture: ฝัง New Behaviors เข้าใน Systems และ Processes\n- Measuring Change Success: KPIs ที่วัด Change Effectiveness จริง\n- Commitment: แต่ละคนออก Change Leadership Action Plan'
      }
    ],
    long_description: `การเปลี่ยนแปลงที่ดีที่สุดยังล้มเหลวได้ถ้าผู้นำไม่เข้าใจมิติของมนุษย์ในกระบวนการเปลี่ยนแปลง

Change Leadership สร้างขึ้นจาก Prosci Change Management Methodology, Kotter Change Model, และ CAP Human-centered Facilitation เพื่อให้ผู้นำมีทั้งกรอบที่เป็นระบบและทักษะด้าน Human Side ที่ทำให้การเปลี่ยนแปลงสำเร็จจริง ไม่ใช่แค่บนกระดาษ

ผู้เข้าอบรมจะได้ Apply Frameworks กับ Change Project จริงขององค์กร และออกมาพร้อม Roadmap ที่ Implement ได้ทันที

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- Change Projects ดำเนินไปได้ราบรื่นขึ้น ต้านทานน้อยลง
- ทีมเข้าร่วมการเปลี่ยนแปลงด้วยความสมัครใจมากขึ้น
- Adoption Rate ของ New Processes สูงขึ้นอย่างมีนัยสำคัญ

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 10. Leading Innovation & Creativity
  // ══════════════════════════════════════════════════════
  {
    slug: 'leading-innovation-and-creativity',
    objectives: [
      {
        icon: 'Brain',
        title: 'Module 1 — Innovation Mindset: Mindset ที่ทำให้นวัตกรรมเกิดขึ้น',
        desc: 'นวัตกรรมไม่ได้เกิดจากคนอัจฉริยะ แต่เกิดจากสภาพแวดล้อมและ Mindset ที่ถูกต้อง\n\n- Innovation Myths: ทำลายความเชื่อผิดๆ เกี่ยวกับความคิดสร้างสรรค์\n- Curiosity as a Practice: พัฒนาความอยากรู้เป็น Daily Habit\n- "Yes, And" vs "Yes, But": Improv Techniques สำหรับ Innovation\n- Psychological Safety เป็นเงื่อนไขเบื้องต้นของนวัตกรรม\n- Assessment: วัด Innovation Climate ในทีมและองค์กร'
      },
      {
        icon: 'Layers',
        title: 'Module 2 — Creative Toolbox: เครื่องมือกระตุ้นความคิดสร้างสรรค์',
        desc: 'ความคิดสร้างสรรค์มีเครื่องมือ เหมือนกับทักษะอื่นๆ\n\n- SCAMPER: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse\n- Lateral Thinking: มองปัญหาจากมุมที่ไม่คาดคิด\n- Random Stimulus: ใช้สิ่งที่ไม่เกี่ยวข้องกระตุ้น Fresh Connections\n- Analogical Thinking: เรียนรู้จากอุตสาหกรรมอื่นมาแก้ปัญหาของตัวเอง\n- Workshop: ฝึกทุก Technique กับ Real Business Challenge'
      },
      {
        icon: 'Heart',
        title: 'Module 3 — Human-centered Innovation: นวัตกรรมที่เริ่มจากคน',
        desc: 'นวัตกรรมที่ดีที่สุดแก้ปัญหาที่คนมีจริง ไม่ใช่ปัญหาที่เราคิดว่าเขามี\n\n- Empathy Research: ค้นพบ Unmet Needs ที่ลูกค้าและพนักงานยังไม่ได้บอก\n- Jobs to Be Done: เข้าใจว่าคนจ้างผลิตภัณฑ์หรือบริการไปทำอะไร\n- Pain Point Mining: ค้นหา Friction ในกระบวนการที่มีอยู่\n- Insight Synthesis: เปลี่ยน Observation เป็น Actionable Insights\n- Field Research: ออกไปสังเกตและสัมภาษณ์ "Users" จริง'
      },
      {
        icon: 'Zap',
        title: 'Module 4 — Innovation Process: กระบวนการนวัตกรรมที่เป็นระบบ',
        desc: 'นวัตกรรมที่ยั่งยืนต้องการกระบวนการ ไม่ใช่แค่ Inspiration\n\n- Double Diamond Process: Diverge ก่อน Converge\n- Rapid Prototyping: สร้าง Prototype เพื่อทดสอบในเวลา 1 วัน\n- Fail Forward: เรียนรู้จากการทดลองที่ไม่ work\n- Innovation Sprints: ทดสอบไอเดียอย่างรวดเร็วก่อนลงทุนจริง\n- Workshop: Innovation Sprint สำหรับโจทย์ขององค์กร'
      },
      {
        icon: 'Users',
        title: 'Module 5 — Innovation Culture: สร้างวัฒนธรรมนวัตกรรมที่ยั่งยืน',
        desc: 'ผู้นำที่สร้าง Innovation Culture ยั่งยืนกว่าผู้นำที่มีไอเดียเก่งเพียงคนเดียว\n\n- Innovation Rituals: สร้าง Practices ที่ Reinforce Creative Thinking\n- Safe-to-fail Environment: ออกแบบระบบที่ทำให้ Experiment ได้อย่างปลอดภัย\n- Recognition of Innovation: ยกย่องความพยายาม ไม่ใช่แค่ผลลัพธ์\n- Cross-pollination: สร้าง Exposure ให้ทีมได้รับ Diverse Inputs\n- Commitment: แต่ละคนออก Innovation Leadership Plan สำหรับทีม'
      }
    ],
    long_description: `องค์กรที่ไม่นวัตกรรมไม่ได้เพราะขาดคนฉลาด แต่เพราะขาดผู้นำที่สร้างสภาพแวดล้อมที่ความคิดสร้างสรรค์เบ่งบานได้

Leading Innovation & Creativity สร้างขึ้นจาก Design Thinking, Behavioral Innovation Research, และ CAP Creative Facilitation Framework เพื่อช่วยผู้นำไม่เพียงแค่ "มีไอเดีย" แต่สร้างระบบและวัฒนธรรมที่ทำให้นวัตกรรมเกิดขึ้นได้อย่างต่อเนื่องในทีมและองค์กร

ทุก Module มี Hands-on Activities ที่ใช้โจทย์จริงขององค์กร ผู้เข้าอบรมจะออกมาพร้อม Innovation Prototype อย่างน้อย 1 ชิ้นที่สามารถนำไปทดสอบต่อได้ทันที

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- ทีมเสนอไอเดียใหม่ๆ บ่อยขึ้นและกล้า Experiment มากขึ้น
- การ Solve Problems ของทีมสร้างสรรค์และมีคุณภาพสูงขึ้น
- วัฒนธรรม "กลัวผิด" ลดลง และ "ลองดู" เพิ่มขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 11. Resilient Leadership
  // ══════════════════════════════════════════════════════
  {
    slug: 'resilient-leadership',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — Resilience Science: วิทยาศาสตร์แห่งความแข็งแกร่ง',
        desc: 'Resilience ไม่ใช่การไม่รู้สึกเจ็บ แต่คือการฟื้นตัวและเติบโตจากความเจ็บ\n\n- Resilience ไม่ใช่ Personality แต่คือ Skill ที่พัฒนาได้\n- Post-Traumatic Growth: ทำไมบางคนเติบโตจากวิกฤตในขณะที่บางคนพัง\n- Resilience Factors: ความสัมพันธ์, ความหมาย, Mastery, Physical Health\n- Resilience Assessment: วัด Resilience Profile ของตัวเอง\n- Leadership Resilience vs Personal Resilience: ความแตกต่างและความสำคัญ'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Stress Mastery: จัดการความกดดันอย่างชาญฉลาด',
        desc: 'ผู้นำที่จัดการ Stress ตัวเองได้ดีคือทรัพย์สินที่ทรงคุณค่าที่สุดขององค์กร\n\n- Stress Physiology: เข้าใจว่า Stress ทำอะไรกับร่างกายและสมอง\n- Good Stress vs Bad Stress: ใช้ Eustress เพิ่มประสิทธิภาพ\n- Stress Response Patterns: รู้จัก Pattern ของตัวเองในสถานการณ์กดดัน\n- Regulation Techniques: Breathing, Grounding, Reframing\n- Prevention vs Recovery: สร้าง Stress Buffer ก่อนวิกฤตมาถึง'
      },
      {
        icon: 'Compass',
        title: 'Module 3 — Meaning in Adversity: ค้นหาความหมายในความยาก',
        desc: 'ความหมายคือ Buffer ที่ทรงพลังที่สุดในการรับมือกับความยากลำบาก\n\n- Viktor Frankl: ค้นพบ Meaning ในสถานการณ์ที่เลือกไม่ได้\n- Purpose as Armor: ทำไมผู้นำที่มี Purpose แข็งแกร่งกว่าคนอื่น\n- Narrative Power: เขียนเรื่องราวใหม่จากประสบการณ์ที่เจ็บปวด\n- Values as Anchor: กลับสู่ค่านิยมในช่วงที่สูญเสียทิศทาง\n- Workshop: Meaning Map — ค้นหาความหมายในความท้าทายปัจจุบัน'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Leading Through Crisis: นำทีมในช่วงวิกฤต',
        desc: 'ทีมมองหาผู้นำที่มั่นคงในช่วงเวลาที่ไม่มีอะไรมั่นคง\n\n- Crisis Communication: สื่อสารอย่างตรงไปตรงมาและสร้างความมั่นใจ\n- Steady Presence: สร้างความมั่นคงทางอารมณ์ให้ทีมในช่วงไม่แน่นอน\n- Decision Making Under Pressure: ตัดสินใจที่ดีเมื่อข้อมูลไม่ครบ\n- Team Resilience Building: ช่วยทีมพัฒนา Resilience ร่วมกัน\n- Recovery Leadership: นำทีมออกจากวิกฤตสู่การเริ่มต้นใหม่'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Resilience System: สร้างระบบที่ Sustain Resilience',
        desc: 'Resilience ไม่ใช่แค่ฟื้นตัว แต่คือสร้างระบบที่ป้องกันไม่ให้พังง่ายๆ\n\n- Energy Management System: Physical, Mental, Emotional, Spiritual Energy\n- Recovery Practices: สร้าง Routine ที่ฟื้นฟูพลังงานทุกวัน\n- Support System: สร้างเครือข่ายสนับสนุนที่แท้จริงในและนอกองค์กร\n- Building Team Resilience: ออกแบบ Practices ที่สร้าง Collective Resilience\n- Commitment: Personal Resilience Blueprint สำหรับ 90 วันข้างหน้า'
      }
    ],
    long_description: `ผู้นำที่ยิ่งใหญ่ไม่ใช่คนที่ไม่เคยล้ม แต่คือคนที่ล้มแล้วลุกได้เร็วกว่าและแข็งแกร่งกว่าเดิม

Resilient Leadership ออกแบบมาสำหรับผู้นำที่กำลังเผชิญกับความกดดันสูง หรือผู้นำที่ต้องการสร้าง Resilience ก่อนที่วิกฤตจะมาถึง โดยใช้ Positive Psychology, Stress Research, และ CAP Inner Work Framework ที่เน้นการพัฒนาทั้งมิติ Physical, Mental, Emotional, และ Meaning

หลักสูตรนี้ไม่ใช่แค่การ Cope กับความยาก แต่คือการเปลี่ยน Adversity เป็น Catalyst ของการเติบโตที่ทำให้ผู้นำแข็งแกร่งขึ้นและมีความหมายมากขึ้นในทุกประสบการณ์

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- จัดการความกดดันได้ดีขึ้นและ Recover ได้เร็วขึ้น
- มีความชัดเจนในทิศทางและความหมายแม้ในช่วงวิกฤต
- นำทีมผ่านช่วงยากได้ด้วยความมั่นคงมากกว่าเดิม

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

  // ══════════════════════════════════════════════════════
  // 12. Leadership Roadmap
  // ══════════════════════════════════════════════════════
  {
    slug: 'leadership-roadmap',
    objectives: [
      {
        icon: 'Compass',
        title: 'Module 1 — Leadership Architecture: ออกแบบสถาปัตยกรรมการพัฒนาผู้นำ',
        desc: 'การพัฒนาผู้นำที่ได้ผลต้องมีแผนที่ ไม่ใช่แค่โปรแกรมฝึกอบรม\n\n- Leadership Pipeline Model: ผู้นำแต่ละระดับต้องการทักษะอะไร\n- Competency Framework: ออกแบบกรอบสมรรถนะผู้นำที่สอดคล้องกับ Strategy\n- 70-20-10 Model: Learn from Experience, Others, and Courses\n- Leadership vs Management: ความชัดเจนในบทบาทที่แตกต่างกัน\n- Assessment: ประเมิน Current State ของ Leadership Development Organization'
      },
      {
        icon: 'Layers',
        title: 'Module 2 — Talent Identification: ค้นหาและระบุ Future Leaders',
        desc: 'การ Identify ผู้นำที่มีศักยภาพต้องอาศัยกระบวนการ ไม่ใช่แค่ Gut Feeling\n\n- High Potential Indicators: สัญญาณที่บ่งบอก Leadership Potential\n- 9-Box Grid: ประเมิน Performance กับ Potential\n- Assessment Tools: 360 Feedback, Leadership Simulations, Psychometrics\n- Avoiding Bias ใน Talent Identification\n- Workshop: ฝึกใช้ 9-Box กับทีมจริง'
      },
      {
        icon: 'Target',
        title: 'Module 3 — Development Planning: วางแผนพัฒนาที่ตรงจุด',
        desc: 'Individual Development Plan ที่ดีต้องมาจากทั้ง Organization Need และ Individual Aspiration\n\n- IDP Design: องค์ประกอบของ Development Plan ที่มีประสิทธิภาพ\n- Learning Interventions: เลือก Activities ที่เหมาะกับแต่ละ Gap\n- Stretch Assignments: วิธีใช้งานจริงเป็น Development Tool\n- Mentoring & Sponsorship: ความแตกต่างและวิธีใช้ให้เหมาะ\n- Workshop: ออกแบบ IDP สำหรับ High Potential ในทีม'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Succession Planning: สร้าง Leadership Pipeline',
        desc: 'ไม่มี Successor คือความเสี่ยงขององค์กรที่ถูกมองข้ามมากที่สุด\n\n- Key Position Mapping: ระบุตำแหน่งที่ต้องมี Successor\n- Readiness Assessment: วัดความพร้อมของ Successors\n- Development Acceleration: เร่งพัฒนา Successors ด้วย Targeted Experiences\n- Succession Conversations: วิธีพูดคุยเรื่อง Succession อย่างโปร่งใส\n- Workshop: สร้าง Succession Plan สำหรับ Key Positions'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Measuring ROI: วัดผลการพัฒนาผู้นำ',
        desc: 'ถ้าวัดไม่ได้ ก็ไม่รู้ว่าสำเร็จหรือไม่\n\n- Kirkpatrick Model: วัดผล 4 ระดับจาก Reaction ถึง Results\n- Leading Indicators ของ Leadership Development ที่ดี\n- Business Impact Metrics: เชื่อม Leadership Development กับ Business Outcomes\n- Continuous Improvement: ปรับแผนการพัฒนาตาม Data\n- Commitment: แต่ละองค์กรออก Leadership Development Roadmap ฉบับแรก'
      }
    ],
    long_description: `องค์กรที่ไม่มี Leadership Pipeline คือองค์กรที่กำลังเดินบนความเสี่ยงที่คาดเดาได้

Leadership Roadmap ออกแบบมาสำหรับ HRD, OD, และ CEO ที่ต้องการสร้างระบบพัฒนาผู้นำที่เป็นระบบ ต่อเนื่อง และสอดคล้องกับทิศทางองค์กร โดยใช้ Leadership Pipeline Framework, Succession Planning Best Practices, และ CAP Development Design Process

ผู้เข้าอบรมจะออกมาพร้อม Leadership Development Blueprint ที่สามารถ Implement ได้จริงในองค์กร ไม่ใช่แค่ทฤษฎีบนกระดาษ

---

#### องค์กรที่ผ่านหลักสูตรนี้รายงานว่า

- มีความชัดเจนในการพัฒนาผู้นำในทุกระดับ
- Succession Planning ที่เป็นระบบและ Board-approved
- ROI ของการลงทุนด้าน Leadership Development วัดได้ชัดขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Tops | AOT | PEA | Land and Houses | Mr.D.I.Y. (100+ องค์กรทั่วประเทศ)`
  },

];

// ─── Runner ────────────────────────────────────────────────────────
async function main() {
  console.log('Leader Skills — Full Content Update (12 courses)');
  console.log('=================================================\n');

  let success = 0, errors = 0;

  for (const course of courses) {
    const { error } = await supabase
      .from('courses')
      .update({
        objectives: course.objectives,
        long_description: course.long_description,
      })
      .eq('slug', course.slug);

    if (error) {
      console.error(`❌ ${course.slug}: ${error.message}`);
      errors++;
    } else {
      console.log(`✅ ${course.slug}`);
      success++;
    }
  }

  console.log(`\nDone: ${success} updated, ${errors} errors`);
}

main().catch(console.error);
