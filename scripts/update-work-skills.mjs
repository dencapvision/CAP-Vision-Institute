/**
 * update-work-skills.mjs
 * อัปเดต objectives + long_description สำหรับ Work Skills ทั้ง 10 หลักสูตร
 *
 * รัน: node scripts/update-work-skills.mjs
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
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!SUPABASE_URL || !SUPABASE_KEY) { console.error('Missing credentials'); process.exit(1); }

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const courses = [

  {
    slug: 'productivity-flow',
    objectives: [
      { icon: 'Brain', title: 'Module 1 — Flow Science: วิทยาศาสตร์แห่ง Flow State', desc: 'Flow ไม่ใช่โชค แต่คือสภาวะที่สร้างได้ด้วยเงื่อนไขที่เหมาะสม\n\n- Mihaly Csikszentmihalyi: งานวิจัย Flow ที่เปลี่ยนโลก\n- Flow Conditions: Challenge กับ Skill ต้องสมดุลกัน\n- Flow Triggers: สิ่งที่ทำให้เข้าสู่ Flow ได้เร็วขึ้น\n- Flow Killers: อะไรที่รบกวน Flow และวิธีกำจัด\n- Self-assessment: วิเคราะห์ Flow Pattern ของตัวเอง' },
      { icon: 'Target', title: 'Module 2 — Deep Work: ทำงานอย่างลึกและมีสมาธิ', desc: 'ในยุคที่ทุกอย่าง Distract ความสามารถ Deep Work คือ Competitive Advantage\n\n- Cal Newport Deep Work Framework: ทำงานหนักในสิ่งที่สำคัญ\n- Attention Residue: ทำไม Multitasking ทำลาย Output Quality\n- Deep Work Scheduling: Block เวลาสำหรับงานที่ต้องการ Full Focus\n- Distraction Management: Digital, Environmental, Internal\n- Workshop: ออกแบบ Personal Deep Work System' },
      { icon: 'Zap', title: 'Module 3 — Energy Management: บริหารพลังงาน ไม่ใช่แค่เวลา', desc: 'เวลา 24 ชั่วโมงเท่ากันทุกคน แต่พลังงานสร้างและจัดการได้\n\n- 4 Types of Energy: Physical, Emotional, Mental, Spiritual\n- Ultradian Rhythms: Cycles ตามธรรมชาติของสมองในแต่ละวัน\n- Recovery as Performance: ทำไม Rest ไม่ใช่การสูญเสียเวลา\n- Energy Audit: ระบุ Energy Drains และ Energy Sources\n- Workshop: สร้าง Personal Energy Management System' },
      { icon: 'Layers', title: 'Module 4 — Productivity Systems: ระบบที่ทำให้งานสำคัญสำเร็จ', desc: 'ระบบที่ดีทำให้คนธรรมดาทำงานได้เหมือนคนพิเศษ\n\n- GTD (Getting Things Done): Capture, Clarify, Organize, Reflect, Engage\n- Time Blocking: จัดการ Calendar ให้ Work For You ไม่ใช่ Against You\n- Inbox Zero: จัดการ Email และ Messages อย่างมีประสิทธิภาพ\n- Weekly Review: Habit ที่ทรงพลังที่สุดของคนที่ Productive\n- Workshop: สร้าง Personal Productivity System' },
      { icon: 'Flame', title: 'Module 5 — Sustainable Productivity: Productive โดยไม่ Burnout', desc: 'Productivity ที่แท้จริงต้อง Sustainable ในระยะยาว\n\n- Burnout Prevention: สัญญาณเตือนและวิธีป้องกัน\n- Work-Life Integration ไม่ใช่ Balance\n- Boundaries ที่ Protect Performance ระยะยาว\n- Mindfulness as Productivity Tool\n- Commitment: Personal Productivity Blueprint' }
    ],
    long_description: `ทำงานน้อยลง แต่ได้ผลลัพธ์มากขึ้น ไม่ใช่ Myth แต่คือ Science ที่พิสูจน์ได้

Productivity Flow สร้างขึ้นจาก Flow Research, Deep Work Framework, และ Energy Management Science เพื่อช่วยให้ทุกคนทำงานในสภาวะที่ดีที่สุดของตัวเอง ซึ่งไม่ใช่แค่ประสิทธิภาพสูงขึ้น แต่ยังสนุกกับการทำงานมากขึ้นด้วย

---

#### ผู้เข้าอบรมรายงานว่า

- ทำงาน Deep Work ได้นานขึ้นและมีคุณภาพสูงขึ้น
- รู้สึก Less Stressed แม้ปริมาณงานจะเท่าเดิม
- มีพลังงานเหลืออยู่หลังเลิกงานมากขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'time-and-energy-management',
    objectives: [
      { icon: 'Target', title: 'Module 1 — Priority Matrix: จัดลำดับสิ่งที่สำคัญจริงๆ', desc: 'Urgent ไม่ใช่ Important เสมอไป และสิ่งที่ Important มักไม่ค่อย Urgent\n\n- Eisenhower Matrix: 4 Quadrants ของงานและวิธีจัดการ\n- Q2 Investment: เพิ่มเวลากับงาน Important แต่ไม่ Urgent\n- "Hell Yes or No" Decision Framework\n- Distinguishing Priorities จาก To-do List\n- Workshop: วิเคราะห์ Current Task Portfolio' },
      { icon: 'Layers', title: 'Module 2 — Time Systems: ระบบจัดการเวลาที่ใช้ได้จริง', desc: 'Calendar คือ Reflection ของ Priorities หากปล่อยให้คนอื่น Fill มันจะสะท้อน Priority ของคนอื่น\n\n- Time Blocking vs Task Lists: ทำไม Block Time ได้ผลกว่า\n- Theme Days: จัดกลุ่มงานประเภทเดียวกันไว้วันเดียวกัน\n- Meeting Diet: ลด Meeting ที่ไม่จำเป็นและ Improve คุณภาพที่เหลือ\n- Buffer Time: ทำไมต้องมี Slack ในแต่ละวัน\n- Workshop: Redesign Weekly Calendar' },
      { icon: 'Brain', title: 'Module 3 — Energy Rhythms: ทำงานตาม Natural Rhythms', desc: 'สมองมี Peak Performance ช่วงเวลาต่างกันในแต่ละวัน การรู้จักมันคือ Advantage\n\n- Chronotype: คุณเป็น Morning Person, Night Owl หรือ Afternoon Person?\n- Peak, Trough, Recovery: จัดงานตาม Energy Cycle\n- Cognitive Load Management: จัดงานหนักในช่วง Peak\n- Power Nap and Micro-recovery Techniques\n- Tracking: วิธีค้นพบ Energy Pattern ส่วนตัว' },
      { icon: 'Zap', title: 'Module 4 — Digital Discipline: จัดการ Digital Life', desc: 'สมาร์ทโฟนและ Notifications ขโมยเวลาเฉลี่ย 3 ชั่วโมงต่อวัน\n\n- Digital Minimalism: ใช้ Technology เท่าที่ Serve Purpose\n- Notification Management: ปิดทุกอย่างที่ไม่ Critical\n- Email Batching: ตอบ Email ใน Time Block แทนที่จะตอบตลอดวัน\n- Social Media Intentionality: ใช้อย่างมีเจตนาไม่ใช่แบบ Habitual\n- Workshop: Digital Life Redesign' },
      { icon: 'Heart', title: 'Module 5 — Life Integration: สร้างสมดุลที่ Sustainable', desc: 'Work-Life Balance เป็น Myth แต่ Work-Life Integration เป็น Practice\n\n- Boundaries ที่ Protect Personal Energy\n- Recovery Practices ที่ Work จริง\n- Saying No อย่างมีศิลปะ\n- Long-term Sustainability vs Short-term Hustle\n- Commitment: Personal Time & Energy System' }
    ],
    long_description: `คนที่ประสบความสำเร็จสูงสุดไม่ได้ทำงานมากกว่า แต่ทำงานอย่าง Smarter กว่า

Time & Energy Management ออกแบบขึ้นจาก Chronobiology, Behavioral Psychology, และ CAP Productivity Framework เพื่อช่วยให้ทุกคนสร้างระบบการทำงานที่ทำให้สิ่งสำคัญเกิดขึ้นเสมอ โดยไม่ต้อง Sacrifice สุขภาพและชีวิตส่วนตัว

---

#### ผู้เข้าอบรมรายงานว่า

- ทำงาน Priorities ได้สม่ำเสมอมากขึ้น
- ลด Time Wasters ได้อย่างน้อย 1-2 ชั่วโมงต่อวัน
- รู้สึก In Control ของเวลามากขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'problem-solving-and-critical-thinking',
    objectives: [
      { icon: 'Eye', title: 'Module 1 — Problem Definition: นิยามปัญหาให้ถูกต้อง', desc: 'ปัญหาที่นิยามผิดจะนำไปสู่ Solution ที่ผิด แม้จะเก่งแค่ไหนก็ตาม\n\n- Problem vs Symptom: แยกแยะอย่างชัดเจน\n- Problem Framing: การตั้งคำถามบางแบบปิดทางเลือก บางแบบเปิดความเป็นไปได้\n- Reframe the Problem: มองปัญหาจากมุมต่างๆ\n- Problem Statement Writing: เขียนนิยามปัญหาที่ชัดและ Actionable\n- Workshop: Reframe Real Problems จากชีวิตงานจริง' },
      { icon: 'Layers', title: 'Module 2 — Root Cause Analysis: ค้นหาต้นเหตุที่แท้จริง', desc: 'แก้ที่ Symptom ต้องกลับมาแก้ซ้ำ แก้ที่ Root Cause แก้ครั้งเดียวจบ\n\n- 5 Whys: ถามจนถึงต้นเหตุที่แท้จริง\n- Fishbone Diagram (Ishikawa): วิเคราะห์หลาย Causes พร้อมกัน\n- Systems Thinking: เห็น Interconnections และ Feedback Loops\n- Pareto Analysis: 80% ของปัญหามาจาก 20% ของ Causes\n- Practice: Root Cause Analysis กับ Case Study จริง' },
      { icon: 'Brain', title: 'Module 3 — Critical Thinking: คิดวิเคราะห์อย่างมีวิจารณญาณ', desc: 'Critical Thinking ไม่ใช่การวิจารณ์ แต่คือการประเมินอย่างเป็นระบบ\n\n- Logic and Reasoning: Deductive vs Inductive Reasoning\n- Logical Fallacies: รู้จักและหลีกเลี่ยง Common Fallacies\n- Evidence Evaluation: ประเมิน Quality ของข้อมูลและ Sources\n- Assumption Testing: ตั้งคำถามกับ Assumptions ก่อนสรุป\n- Workshop: Critical Analysis ของ Business Case' },
      { icon: 'Target', title: 'Module 4 — Solution Generation: สร้าง Solutions ที่ดีกว่า', desc: 'เมื่อเข้าใจปัญหาชัด ถึงเวลาสร้าง Solutions อย่างสร้างสรรค์\n\n- Divergent Thinking: สร้างทางเลือกให้มากที่สุดก่อน\n- Solution Evaluation Matrix: เปรียบเทียบทางเลือกอย่างเป็นระบบ\n- Prototyping Mindset: ทดสอบก่อนลงทุนเต็มที่\n- Risk Assessment: ประเมินความเสี่ยงของแต่ละทางเลือก\n- Workshop: Solve Real Problem ด้วย Structured Process' },
      { icon: 'Users', title: 'Module 5 — Collaborative Problem Solving: แก้ปัญหาร่วมกันในทีม', desc: 'ปัญหาซับซ้อนแก้ได้ดีกว่าเมื่อหลายคนช่วยกันคิด\n\n- Facilitated Problem-solving Sessions\n- Diverse Perspectives: ทำไม Diverse Team แก้ปัญหาได้ดีกว่า\n- Consensus Building: ตัดสินใจร่วมกันอย่างมีประสิทธิภาพ\n- After-action Review: เรียนรู้จากการแก้ปัญหาที่ผ่านมา\n- Commitment: Personal Problem-solving Protocol' }
    ],
    long_description: `ปัญหาที่ถูกแก้ซ้ำๆ คือปัญหาที่ยังไม่ถูกเข้าใจอย่างแท้จริง

Problem Solving & Critical Thinking สร้างขึ้นจาก Systems Thinking, Design Thinking, และ CAP Analytical Framework เพื่อพัฒนาทักษะการวิเคราะห์และแก้ปัญหาอย่างเป็นระบบ ตั้งแต่การนิยามปัญหาที่ถูกต้องจนถึงการ Execute Solution อย่างมีประสิทธิภาพ

---

#### ผู้เข้าอบรมรายงานว่า

- แก้ปัญหาถูกจุดมากขึ้น ปัญหาเดิมไม่กลับมาซ้ำ
- ตัดสินใจบนพื้นฐานข้อมูลมากขึ้น ลด Assumptions
- นำกระบวนการแก้ปัญหาในทีมได้อย่างมีประสิทธิภาพ

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'creative-thinking-and-innovation',
    objectives: [
      { icon: 'Brain', title: 'Module 1 — Creativity Myths: ทำลายความเชื่อผิดๆ เกี่ยวกับความคิดสร้างสรรค์', desc: 'ความคิดสร้างสรรค์ไม่ใช่พรสวรรค์ที่คนบางคนมีแต่คนอื่นไม่มี\n\n- ทำลาย 5 Myths เกี่ยวกับ Creativity\n- Neuroscience of Creativity: ความคิดสร้างสรรค์เกิดขึ้นในสมองได้อย่างไร\n- Growth Mindset สำหรับ Creativity\n- Conditions for Creativity: สภาพแวดล้อมที่กระตุ้นความคิดสร้างสรรค์\n- Self-assessment: Creativity Profile ของตัวเอง' },
      { icon: 'Layers', title: 'Module 2 — Creative Techniques: เครื่องมือกระตุ้นความคิดสร้างสรรค์', desc: 'มีเครื่องมือ Proven มากมายที่ช่วยสร้างไอเดียใหม่ในทุกสถานการณ์\n\n- SCAMPER: 7 วิธีเปลี่ยนสิ่งที่มีอยู่\n- Six Thinking Hats: มองปัญหาจาก 6 มุมพร้อมกัน\n- Mind Mapping: สร้าง Visual Map ของความคิด\n- Reverse Brainstorming: คิดจากปลายทางย้อนกลับมา\n- Workshop: ฝึกทุก Technique กับโจทย์จริง' },
      { icon: 'Zap', title: 'Module 3 — Ideation Process: กระบวนการสร้างไอเดียอย่างเป็นระบบ', desc: 'Brainstorming ที่ดีมีโครงสร้าง ไม่ใช่แค่การนั่งพูดอะไรก็ได้\n\n- Diverge Before Converge: สร้างมากก่อน กรองทีหลัง\n- "Yes, And" Rules: สร้างบรรยากาศที่ไอเดียทุกชิ้นได้รับการต้อนรับ\n- Quantity Leads to Quality: ทำไมต้องสร้างไอเดียให้มากที่สุดก่อน\n- Dot Voting: วิธีเลือกไอเดียอย่างเป็นประชาธิปไตย\n- Ideation Sprint: ฝึก 30-minute Ideation Workshop' },
      { icon: 'Target', title: 'Module 4 — Prototype and Test: จาก Idea สู่ Experiment', desc: 'ไอเดียที่ไม่ถูกทดสอบยังไม่ใช่นวัตกรรม\n\n- Rapid Prototyping: สร้าง Low-fidelity Prototype ใน 1 ชั่วโมง\n- Paper Prototyping: เริ่มทดสอบโดยไม่ต้องลงทุน\n- Feedback Collection: วิธีได้ Feedback ที่ Honest และ Useful\n- Iteration Mindset: ทุก Version คือการเรียนรู้\n- Workshop: Prototype Workshop สำหรับ Real Business Challenge' },
      { icon: 'Users', title: 'Module 5 — Creative Culture: สร้างทีมที่คิดสร้างสรรค์ร่วมกัน', desc: 'Creative Teams ไม่ได้มาจากการรวมคน Creative แต่จากการสร้าง Creative Environment\n\n- Psychological Safety สำหรับ Creativity\n- Creative Rituals: Practices ที่กระตุ้น Innovation ทุกวัน\n- Cross-pollination: เชิญ Perspectives จากนอก Industry\n- Celebrating Attempts ไม่ใช่แค่ผลลัพธ์\n- Commitment: Team Creative Practice Plan' }
    ],
    long_description: `ความคิดสร้างสรรค์ไม่ใช่สิ่งที่คุณมีหรือไม่มี แต่คือทักษะที่พัฒนาได้ด้วย Practice ที่ถูกต้อง

Creative Thinking & Innovation สร้างขึ้นจาก Creativity Research, Design Thinking, และ CAP Creative Process Framework เพื่อช่วยให้ทุกคน ไม่ว่าจะคิดว่าตัวเองสร้างสรรค์หรือไม่ สามารถสร้างไอเดียใหม่และนวัตกรรมที่มีคุณค่าได้อย่างสม่ำเสมอ

---

#### ผู้เข้าอบรมรายงานว่า

- คิดไอเดียใหม่ได้มากขึ้นและกล้าแบ่งปันมากขึ้น
- สร้าง Solutions ที่ Creative และ Effective กว่าเดิม
- ทีมมีบรรยากาศที่ Innovative มากขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'project-management-for-success',
    objectives: [
      { icon: 'Layers', title: 'Module 1 — Project Foundations: พื้นฐานการบริหารโครงการ', desc: 'Project ที่ดีเริ่มจาก Clarity ก่อนเริ่มลงมือ\n\n- Project Triangle: Scope, Time, Cost — เลือกได้แค่ 2\n- Project Charter: กำหนด Scope, Objectives, Stakeholders, Constraints\n- Work Breakdown Structure: แบ่งงานใหญ่เป็นงานเล็กที่ Manageable\n- RACI Matrix: ใครต้อง Responsible, Accountable, Consulted, Informed\n- Workshop: สร้าง Project Charter สำหรับโครงการจริง' },
      { icon: 'Target', title: 'Module 2 — Planning Mastery: วางแผนที่ Execute ได้จริง', desc: 'แผนที่ดีไม่ต้องสมบูรณ์แบบ แต่ต้องปรับได้เมื่อสถานการณ์เปลี่ยน\n\n- Gantt Chart และ Network Diagram: เครื่องมือ Visualize Timeline\n- Critical Path Analysis: หา Tasks ที่ถ้าล่าช้าจะทำให้ทุกอย่างล่าช้า\n- Resource Planning: คนและทรัพยากรที่ต้องการ เมื่อไหร่ และมากแค่ไหน\n- Milestone Planning: Checkpoints ที่สร้าง Momentum\n- Workshop: สร้าง Project Plan ด้วย Real Timeline' },
      { icon: 'Brain', title: 'Module 3 — Risk Management: บริหารความเสี่ยงก่อนเกิดเหตุ', desc: 'Risk ที่ถูก Anticipate เป็นแค่ Issue ที่ยังไม่เกิด\n\n- Risk Identification: Brainstorm ทุก Risk ที่อาจเกิดขึ้น\n- Risk Assessment Matrix: Probability กับ Impact\n- Risk Response Strategies: Avoid, Transfer, Mitigate, Accept\n- Contingency Planning: Plan B ที่พร้อมใช้ได้ทันที\n- Workshop: Risk Register สำหรับโครงการจริง' },
      { icon: 'Users', title: 'Module 4 — Stakeholder Management: บริหาร Stakeholders อย่างมีประสิทธิภาพ', desc: 'Stakeholders ที่ไม่ Managed อย่างดีมักเป็นเหตุให้ Project ล้มเหลว\n\n- Stakeholder Mapping: Power vs Interest Grid\n- Communication Planning: ใครต้องรู้อะไร เมื่อไหร่ และวิธีไหน\n- Managing Expectations: ตั้ง Expectation ที่ Realistic ตั้งแต่ต้น\n- Executive Updates: รายงาน Progress ให้ผู้บริหารอย่างมีประสิทธิภาพ\n- Workshop: สร้าง Stakeholder Communication Plan' },
      { icon: 'Zap', title: 'Module 5 — Execution & Closure: Execute ให้ได้ผลและปิดโครงการอย่างดี', desc: 'Project Closure ที่ดีคือการลงทุนสำหรับ Project ถัดไป\n\n- Progress Tracking และ Status Reporting\n- Change Management: จัดการ Scope Creep อย่างมีประสิทธิภาพ\n- Problem-solving During Execution: แก้ไขปัญหาอย่างรวดเร็ว\n- Project Retrospective: เรียนรู้จากสิ่งที่ Work และไม่ Work\n- Celebration: ทำไม Celebrating Success สำคัญต่อทีม' }
    ],
    long_description: `โครงการส่วนใหญ่ล้มเหลวไม่ใช่เพราะขาดทักษะ แต่เพราะขาด Process ที่เป็นระบบ

Project Management for Success ออกแบบขึ้นจาก PMI Framework, Agile Principles, และ CAP Execution Framework เพื่อช่วยให้ทุกคนที่บริหารโครงการ ตั้งแต่มือใหม่ถึงมีประสบการณ์ สามารถ Deliver ได้ตรงเวลา ตรงงบ และตรงความต้องการ

---

#### ผู้เข้าอบรมรายงานว่า

- โครงการส่งมอบตรงเวลามากขึ้น
- Stakeholder Satisfaction สูงขึ้นเพราะ Expectations ชัดขึ้น
- ทีม Project ทำงานร่วมกันได้ดีขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'agile-and-adaptive-work-skills',
    objectives: [
      { icon: 'Brain', title: 'Module 1 — Agile Manifesto: เข้าใจ Philosophy ของ Agile', desc: 'Agile ไม่ใช่ Process แต่คือ Mindset\n\n- 4 Agile Values และ 12 Principles ที่ต้องเข้าใจก่อนใช้\n- Agile vs Waterfall: ใช้อะไรในสถานการณ์ไหน\n- Why Agile Fails: ทำ Agile โดยไม่มี Agile Mindset\n- Agile Beyond Software: ใช้ Agile กับงาน Business ทั่วไป\n- Self-assessment: Agile Maturity ของทีม' },
      { icon: 'Layers', title: 'Module 2 — Scrum Framework: กรอบการทำงานแบบ Scrum', desc: 'Scrum เป็น Agile Framework ที่ได้รับความนิยมสูงสุดในโลก\n\n- Scrum Roles: Product Owner, Scrum Master, Development Team\n- Scrum Events: Sprint, Sprint Planning, Daily Scrum, Review, Retrospective\n- Scrum Artifacts: Product Backlog, Sprint Backlog, Increment\n- User Stories: เขียน Requirements ในแบบที่ Customer เป็นศูนย์กลาง\n- Simulation: Mini Sprint ในกลุ่ม' },
      { icon: 'Target', title: 'Module 3 — Kanban Flow: จัดการ Work Flow ด้วย Kanban', desc: 'Kanban ทำให้งานที่ Invisible กลายเป็น Visible\n\n- Kanban Board: Visualize Work ด้วย To Do, In Progress, Done\n- WIP Limits: ทำไมต้องจำกัด Work-in-Progress\n- Flow Metrics: Lead Time, Cycle Time, Throughput\n- Cumulative Flow Diagram: วิเคราะห์ Bottlenecks\n- Workshop: สร้าง Kanban Board สำหรับงานจริง' },
      { icon: 'Zap', title: 'Module 4 — Agile Retrospective: เรียนรู้และปรับปรุงอย่างต่อเนื่อง', desc: 'Retrospective คือ Secret Weapon ของทีม Agile ที่ประสบความสำเร็จ\n\n- Retrospective Formats: Start-Stop-Continue, 4Ls, Sailboat\n- Psychological Safety ใน Retrospective\n- Action Items: ทำ Retrospective ที่นำไปสู่ Real Change\n- Continuous Improvement Cycle\n- Practice: ดำเนิน Retrospective จริงในกลุ่ม' },
      { icon: 'Users', title: 'Module 5 — Scaling Agile: ขยาย Agile ไปทั้งองค์กร', desc: 'เมื่อ Agile Work ในทีม ขั้นตอนต่อไปคือขยายไปทั้งองค์กร\n\n- SAFe Overview: Scaled Agile Framework\n- Agile Across Departments: Marketing, HR, Finance ทำ Agile ได้\n- Agile Leadership: บทบาทของ Leader ใน Agile Organization\n- Change Management สำหรับ Agile Transformation\n- Commitment: Agile Implementation Plan สำหรับทีม' }
    ],
    long_description: `โลกเปลี่ยนเร็วกว่าที่แผนระยะยาวจะตาม Agile คือวิธีที่ทีมและองค์กรตอบสนองต่อการเปลี่ยนแปลงได้อย่างรวดเร็วและมีประสิทธิภาพ

Agile & Adaptive Work Skills ออกแบบขึ้นจาก Scrum, Kanban, และ Lean Principles เพื่อช่วยทีมและองค์กรไทยนำ Agile มาใช้จริง ไม่ใช่แค่เปลี่ยน Terminology แต่เปลี่ยน Way of Working จริงๆ

---

#### ทีมที่ผ่านหลักสูตรนี้รายงานว่า

- Delivery เร็วขึ้นและมีคุณภาพสูงขึ้น
- ทีมสื่อสารกันดีขึ้นผ่าน Visual Management
- ปรับตัวต่อ Requirement Changes ได้เร็วและเครียดน้อยลง

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'design-thinking-for-business',
    objectives: [
      { icon: 'Heart', title: 'Module 1 — Empathize: เข้าใจผู้ใช้อย่างลึกซึ้ง', desc: 'นวัตกรรมที่ดีเริ่มจากการเข้าใจคนที่คุณสร้างมันให้\n\n- Human-centered Design Philosophy\n- User Research Techniques: Interview, Observation, Shadowing\n- Empathy Map: ทำความเข้าใจ Think, Feel, Say, Do\n- Jobs to Be Done Framework: คนจ้างสิ่งนี้ไปทำอะไร\n- Field Research: ออกไปสังเกตผู้ใช้จริง' },
      { icon: 'Eye', title: 'Module 2 — Define: กำหนดโจทย์ที่แท้จริง', desc: 'How Might We Statement ที่ดีเปิดความเป็นไปได้มหาศาล\n\n- Insight Synthesis: เปลี่ยน Observations เป็น Insights\n- Point of View Statement: User + Need + Insight\n- How Might We (HMW): กำหนดโจทย์เชิงบวก\n- Problem Framing: ตั้งกรอบปัญหาในแบบที่กระตุ้น Creativity\n- Workshop: สังเคราะห์ Insights และสร้าง HMW Statements' },
      { icon: 'Brain', title: 'Module 3 — Ideate: สร้างไอเดียอย่างสร้างสรรค์', desc: 'Ideation ที่ดีไม่ได้หยุดที่ไอเดียแรกที่ดูดี\n\n- Brainstorming Rules: "Yes, And" Environment\n- Quantity Over Quality: สร้างให้มากก่อน\n- Worst Possible Idea: เทคนิค Reverse ที่ปลดล็อก Creativity\n- SCAMPER สำหรับ Ideation\n- Idea Affinity Mapping: จัดกลุ่มและเลือก Ideas' },
      { icon: 'Layers', title: 'Module 4 — Prototype: สร้าง Prototype เพื่อเรียนรู้', desc: 'Prototype ไม่ต้องสมบูรณ์ แต่ต้องสร้าง Learning\n\n- Prototype Fidelity: Low vs High Fidelity\n- Paper Prototype: เริ่มทดสอบด้วยต้นทุนเกือบศูนย์\n- Role Play Prototype: แสดงบทบาทเพื่อทดสอบ Service Experience\n- Prototype Goals: กำหนดว่าต้องการ Learn อะไรจาก Prototype นี้\n- Workshop: Build Prototype ใน 2 ชั่วโมง' },
      { icon: 'Zap', title: 'Module 5 — Test & Iterate: ทดสอบและปรับปรุงอย่างรวดเร็ว', desc: 'ทีม DT ที่ดีที่สุดคือทีมที่ Fail Fastest\n\n- User Testing Techniques: Observation, Think-aloud Protocol\n- Feedback Synthesis: เปลี่ยน Feedback เป็น Actionable Insights\n- Iteration: ปรับ Prototype จาก Learning แต่ละรอบ\n- When to Pivot vs Persevere\n- Commitment: นำ DT Process ใช้กับโจทย์ขององค์กรต่อ' }
    ],
    long_description: `Design Thinking เป็น Approach ที่ทำให้นวัตกรรมไม่ใช่เรื่องของโชค แต่เป็น Repeatable Process

Design Thinking for Business สร้างขึ้นจาก Stanford d.school Framework, IDEO Methodology, และ CAP Human-centered Innovation Process เพื่อช่วยให้องค์กรไทยสร้างนวัตกรรมที่ตอบ Human Needs จริงๆ ไม่ใช่นวัตกรรมที่ทีมคิดว่าคนต้องการ

---

#### ทีมที่ผ่านหลักสูตรนี้รายงานว่า

- สร้าง Solutions ที่ตรง User Needs มากกว่าเดิม
- ลดเวลาที่เสียกับ Features ที่ไม่มีคนใช้
- มีกระบวนการที่ทำให้ Innovation เกิดขึ้นได้อย่างสม่ำเสมอ

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'data-thinking-and-decision-making',
    objectives: [
      { icon: 'Eye', title: 'Module 1 — Data Literacy: พื้นฐานการอ่าน Data', desc: 'Data Literacy คือทักษะที่ทุกคนต้องมีในยุค Data-driven\n\n- Data Types: Quantitative vs Qualitative, Structured vs Unstructured\n- Descriptive Statistics: Mean, Median, Mode, Standard Deviation\n- Data Quality: ประเมิน Reliability และ Validity ของข้อมูล\n- Correlation vs Causation: ข้อผิดพลาดที่พบบ่อยที่สุด\n- Workshop: วิเคราะห์ Dataset จริงขององค์กร' },
      { icon: 'Layers', title: 'Module 2 — Data Visualization: สื่อสาร Data ได้อย่างมีพลัง', desc: 'Data ที่ Visualize ดีสื่อสารได้มากกว่า Data ที่ Visualize แย่ 1,000 เท่า\n\n- Chart Selection Guide: เลือก Chart ประเภทใดสำหรับข้อมูลแบบไหน\n- Dashboard Design Principles: สร้าง Dashboard ที่ Lead to Action\n- Storytelling with Data: เล่าเรื่องจาก Data อย่างน่าสนใจ\n- Tools Overview: Excel, Power BI, Google Data Studio\n- Workshop: สร้าง Dashboard สำหรับ KPIs จริง' },
      { icon: 'Brain', title: 'Module 3 — Analytical Thinking: คิดวิเคราะห์ข้อมูลอย่างมีวิจารณญาณ', desc: 'Data ที่วิเคราะห์ผิดอาจนำไปสู่การตัดสินใจที่ผิดกว่าไม่มี Data\n\n- Asking the Right Questions: กำหนด Questions ก่อนเก็บ Data\n- Spotting Patterns and Trends: เห็น Signal ท่ามกลาง Noise\n- Outlier Detection: รู้ว่าอะไรผิดปกติ\n- Simpson Paradox และ Statistical Traps อื่นๆ\n- Workshop: Analyze และ Interpret Dataset จาก Case Study' },
      { icon: 'Target', title: 'Module 4 — Data-driven Decisions: ตัดสินใจบน Data', desc: 'Data-driven ไม่ได้แปลว่าไม่ใช้ Intuition แต่ใช้ Data Inform Intuition\n\n- Decision Framework ที่รวม Data และ Judgment\n- A/B Testing: ทดสอบสมมติฐานด้วยการทดลองจริง\n- Predictive Thinking: ใช้ Historical Data คาดการณ์อนาคต\n- Balancing Data and Speed: ตัดสินใจได้โดยไม่รอ Data ครบร้อยเปอร์เซ็นต์\n- Workshop: Data-driven Decision Case Study' },
      { icon: 'Users', title: 'Module 5 — Data Culture: สร้างวัฒนธรรม Data ในองค์กร', desc: 'Data Culture คือเมื่อทุกการตัดสินใจเริ่มต้นด้วยคำถามว่า "Data บอกว่าอะไร?"\n\n- Data Democratization: ทำให้ Data Accessible กับทุกคน\n- Data Governance: ใช้ Data อย่างมีความรับผิดชอบ\n- Building Data Habits ในทีม\n- Measuring Data Maturity ขององค์กร\n- Commitment: Data Practice Plan สำหรับทีม' }
    ],
    long_description: `ในโลกที่ข้อมูลมีมากกว่าเคย ทักษะที่แยก Leader จาก Follower คือความสามารถในการอ่านและใช้ข้อมูลได้อย่างถูกต้อง

Data Thinking & Decision Making ออกแบบขึ้นโดยไม่ต้องการพื้นฐานด้าน Data Science แต่สร้าง Data Literacy และ Analytical Thinking ที่ทุกคนในองค์กรควรมี ตั้งแต่ผู้บริหารถึงพนักงาน Front-line

---

#### ผู้เข้าอบรมรายงานว่า

- อ่านและตีความ Data ได้แม่นยำขึ้น
- นำเสนอ Data ได้อย่างน่าสนใจและ Actionable
- ตัดสินใจบนพื้นฐาน Data มากขึ้น ลด Gut Feeling

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'digital-and-ai-skills-for-work',
    objectives: [
      { icon: 'Brain', title: 'Module 1 — AI Fundamentals: เข้าใจ AI โดยไม่ต้องเป็น Engineer', desc: 'รู้จัก AI ในระดับที่ใช้งานได้ ไม่ใช่แค่อ่านข่าว\n\n- AI ทำงานอย่างไร: อธิบายแบบที่ไม่ใช่ Engineer เข้าใจ\n- AI ทำอะไรได้และทำอะไรไม่ได้: ความจริงที่ Marketing ไม่บอก\n- Generative AI: ChatGPT, Claude, Gemini, Copilot\n- AI Ethics and Risks: ใช้ AI อย่างมีความรับผิดชอบ\n- AI Landscape: Tools ที่กำลังเปลี่ยนโลกงานในปี 2025' },
      { icon: 'Zap', title: 'Module 2 — Prompt Engineering: สื่อสารกับ AI ให้ได้งาน', desc: 'AI ดีแค่ไหนขึ้นอยู่กับ Prompt ที่คุณให้มัน\n\n- Anatomy of a Good Prompt: Context, Task, Format, Constraints\n- Few-shot Prompting: ให้ Example เพื่อได้ Output ที่ดีขึ้น\n- Chain-of-thought Prompting: ให้ AI แสดง Reasoning\n- Iterative Prompting: ปรับ Prompt จนได้ Output ที่ต้องการ\n- Hands-on: ฝึก Prompt สำหรับงานของตัวเอง' },
      { icon: 'Layers', title: 'Module 3 — AI for Your Work: ใช้ AI ในงานประจำวัน', desc: 'ทุกงานมี Use Cases สำหรับ AI ที่รอถูก Discover\n\n- Writing Assistant: ร่าง Email, Report, Proposal ด้วย AI\n- Research Assistant: สรุป Research, ค้นหาข้อมูล, Synthesize\n- Brainstorming Partner: ใช้ AI เป็น Thinking Partner\n- Code และ Data: ให้ AI ช่วยงาน Excel, Formula, Analysis\n- Workshop: Map AI Use Cases สำหรับงานของตัวเอง' },
      { icon: 'Target', title: 'Module 4 — AI Workflow Design: สร้าง AI-powered Workflow', desc: 'ไม่ใช่แค่ใช้ AI ครั้งเดียว แต่รวม AI เข้าไปใน Workflow ทั้งหมด\n\n- Workflow Mapping: วิเคราะห์ Current Workflow ว่าอะไร AI ช่วยได้\n- AI Tool Stack: เลือก Tools ที่เหมาะกับงานแต่ละประเภท\n- Automation vs Augmentation: รู้ว่าอะไรควร Automate อะไรควร Augment\n- Output Quality Control: ตรวจสอบ AI Output ด้วย Critical Thinking\n- Workshop: Redesign Workflow โดยรวม AI เข้าไป' },
      { icon: 'Eye', title: 'Module 5 — Future-ready Skills: เตรียมตัวสำหรับอนาคตที่ AI ครองโลก', desc: 'ทักษะที่ AI ทำไม่ได้คือทักษะที่มีคุณค่ามากที่สุดในอนาคต\n\n- Skills AI ยังทำไม่ได้: Creativity, Empathy, Complex Judgment\n- Human + AI Collaboration: วิธีทำงานร่วมกับ AI ให้ดีที่สุด\n- Continuous Learning: เรียนรู้ AI Tools ใหม่ๆ อย่างต่อเนื่อง\n- Personal AI Strategy: วางแผน AI Upskilling ของตัวเอง\n- Commitment: 90-Day AI Adoption Plan' }
    ],
    long_description: `AI ไม่ได้มาแทนที่คน แต่คนที่ใช้ AI เก่งจะแทนที่คนที่ไม่ใช้

Digital & AI Skills for Work ออกแบบขึ้นสำหรับคนทำงานทุกสาขา ไม่จำเป็นต้องมีพื้นฐานด้าน Technology ให้สามารถใช้ AI Tools ในชีวิตงานจริงได้อย่างมีประสิทธิภาพ ตั้งแต่ Prompt Engineering ถึงการออกแบบ AI-powered Workflow

---

#### ผู้เข้าอบรมรายงานว่า

- ประสิทธิภาพการทำงานเพิ่มขึ้น 2-5 เท่าในงานที่ใช้ AI ช่วย
- ไม่กลัว AI อีกต่อไป และมองมันเป็น Opportunity
- นำ AI มาใช้ในทีมได้อย่างมีประสิทธิภาพ

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  {
    slug: 'execution-excellence',
    objectives: [
      { icon: 'Target', title: 'Module 1 — Execution Gap: เข้าใจช่องว่างระหว่างแผนกับผลลัพธ์', desc: 'ช่องว่างระหว่าง Strategy กับ Execution คือที่ที่ความล้มเหลวส่วนใหญ่อาศัยอยู่\n\n- Execution Gap: ทำไมองค์กรที่มี Strategy ดีก็ยัง Fail\n- 4 Disciplines of Execution (4DX) Overview\n- Whirlwind vs Wildly Important Goals\n- Lead Measures vs Lag Measures: วัดสิ่งที่ Drive ผลลัพธ์\n- Self-assessment: Execution Effectiveness ของตัวเองและทีม' },
      { icon: 'Compass', title: 'Module 2 — Priority Clarity: ชัดเจนในสิ่งที่สำคัญที่สุด', desc: 'ทำทุกอย่างเท่ากับไม่ทำอะไรเลย\n\n- WIG: Wildly Important Goal — เลือก 1-2 Priority ที่สำคัญที่สุด\n- Goal Setting ที่ดี: Specific, Measurable, Achievable, Relevant, Time-bound\n- Saying No Strategically: ปฏิเสธอย่างมีหลักการ\n- Aligning Team Goals กับ WIG\n- Workshop: กำหนด WIG สำหรับทีมตัวเอง' },
      { icon: 'Brain', title: 'Module 3 — Scoreboard: สร้างระบบวัดผลที่ทีม Own', desc: 'ทีมที่เห็น Score ของตัวเองเล่นหนักกว่าทีมที่ไม่รู้ว่าตัวเองได้กี่แต้ม\n\n- Compelling Scoreboard: Visible, Simple, Show Lead and Lag Measures\n- Real-time Tracking: ทำให้ Progress เห็นได้ตลอดเวลา\n- Team Ownership ของ Scoreboard\n- Gamification: ใช้ Game Mechanics เพิ่ม Engagement\n- Workshop: สร้าง Team Scoreboard' },
      { icon: 'Users', title: 'Module 4 — Accountability Cadence: สร้างจังหวะความรับผิดชอบ', desc: 'Accountability ที่แท้จริงไม่ใช่การลงโทษ แต่คือการ Support กันให้สำเร็จ\n\n- Weekly WIG Session: 20-30 นาทีที่เปลี่ยนทุกอย่าง\n- Commitment Making: ทุกคนประกาศ 1-3 Actions สำหรับสัปดาห์นี้\n- Progress Review: Report on Last Week Commitments\n- Problem-solving: ช่วยกันแก้ปัญหาที่ขัดขวาง Progress\n- Practice: ดำเนิน WIG Session จำลอง' },
      { icon: 'Zap', title: 'Module 5 — Execution Habits: สร้างนิสัย Execute ที่สม่ำเสมอ', desc: 'ผู้ที่ Execute ได้ดีที่สุดคือผู้ที่มี System ไม่ใช่ผู้ที่มี Motivation มากที่สุด\n\n- Habit Stacking: เชื่อม Execution Habits กับ Existing Routines\n- Implementation Intentions: ถ้า X แล้ว Y\n- Friction Reduction: ลดความยากในการเริ่มต้น\n- Reflection Practices: Review และ Learn จากการ Execute ทุกสัปดาห์\n- Commitment: Personal Execution System สำหรับ 90 วัน' }
    ],
    long_description: `โลกธุรกิจเต็มไปด้วย Great Strategies ที่ไม่ถูก Execute และ Talented People ที่ยังขาด Execution Discipline

Execution Excellence สร้างขึ้นจาก 4 Disciplines of Execution (FranklinCovey), Habit Science, และ CAP Performance Framework เพื่อช่วยให้บุคคลและทีมพัฒนา Execution Muscle ที่ทำให้สิ่งสำคัญที่สุดเกิดขึ้นได้เสมอ แม้ในช่วงที่วุ่นวายที่สุด

---

#### ทีมที่ผ่านหลักสูตรนี้รายงานว่า

- OKR และ Priority Goals สำเร็จสูงขึ้นอย่างเห็นได้ชัด
- ทีมมี Accountability ที่สูงขึ้นโดยไม่ต้องตามงาน
- Execution Culture ที่ก่อตัวขึ้นในทีม

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

];

async function main() {
  console.log('Work Skills — Full Content Update (10 courses)');
  console.log('===============================================\n');
  let success = 0, errors = 0;
  for (const course of courses) {
    const { error } = await supabase.from('courses').update({ objectives: course.objectives, long_description: course.long_description }).eq('slug', course.slug);
    if (error) { console.error(`❌ ${course.slug}: ${error.message}`); errors++; }
    else { console.log(`✅ ${course.slug}`); success++; }
  }
  console.log(`\nDone: ${success} updated, ${errors} errors`);
}

main().catch(console.error);
