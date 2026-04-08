/**
 * update-people-skills.mjs
 * อัปเดต objectives + long_description สำหรับ People Skills
 * (ยกเว้น conflict-to-collaboration ที่เขียนเสร็จแล้ว)
 *
 * รัน: node scripts/update-people-skills.mjs
 * ครอบคลุม 9 หลักสูตร
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

  // ══════════════════════════════════════════════════════
  // 1. Psychology of People
  // ══════════════════════════════════════════════════════
  {
    slug: 'psychology-of-people',
    objectives: [
      {
        icon: 'Brain',
        title: 'Module 1 — Human Behavior Basics: วิทยาศาสตร์เบื้องหลังพฤติกรรมมนุษย์',
        desc: 'คนไม่ได้ทำอะไรโดยไม่มีเหตุผล แต่เหตุผลนั้นอาจซ่อนอยู่ใต้ Conscious Mind\n\n- Iceberg Model of Behavior: มองเห็นแค่ส่วนปลาย แต่ต้นเหตุอยู่ใต้น้ำ\n- Maslow Hierarchy in Workplace: คนต้องการอะไรจริงๆ\n- Basic Human Needs: Certainty, Variety, Significance, Connection, Growth, Contribution\n- Why People Resist: กลไกการป้องกันตัวเองของมนุษย์\n- Workshop: วิเคราะห์พฤติกรรมของคนในทีมผ่าน Behavior Framework'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Personality Profiles: เข้าใจบุคลิกภาพที่แตกต่างกัน',
        desc: 'คนแต่ละคนมี Operating System ที่แตกต่างกัน การทำงานกับพวกเขาต้องปรับ Interface\n\n- DISC Model: Dominance, Influence, Steadiness, Conscientiousness\n- สังเกต Behavioral Cues ของแต่ละ Type ในชีวิตงานจริง\n- Strengths และ Blind Spots ของแต่ละ Style\n- ปรับ Communication และ Management Style ตาม DISC\n- Self-assessment: ค้นพบ DISC Profile ของตัวเองและคนในทีม'
      },
      {
        icon: 'Target',
        title: 'Module 3 — Motivation Decoded: ถอดรหัสแรงจูงใจรายบุคคล',
        desc: 'แรงจูงใจเดียวกันไม่ Works กับทุกคน ต้องรู้ว่าอะไร Drives แต่ละคน\n\n- Intrinsic vs Extrinsic Motivation: ความแตกต่างและผลระยะยาว\n- Self-Determination Theory: Autonomy, Mastery, Purpose\n- Motivation Interviewing: วิธีค้นพบ Motivators ของคนในทีม\n- Demotivators: สิ่งที่ทำลาย Motivation โดยที่หัวหน้าไม่รู้ตัว\n- Workshop: สร้าง Motivation Profile สำหรับสมาชิกทีม'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 4 — Reading People: อ่านคนให้ออกในเวลาสั้น',
        desc: 'ทักษะการอ่านคนทำให้สื่อสารได้ตรงจุดและสร้างความสัมพันธ์ได้เร็วขึ้น\n\n- Verbal vs Nonverbal Signals: สิ่งที่คำพูดไม่บอกแต่ Body บอก\n- Emotional Cues: สังเกต Micro-expressions และ Tone Changes\n- Context Reading: พฤติกรรมเดียวกันหมายความต่างกันในบริบทต่างกัน\n- Pattern Recognition: สร้าง Mental Model ของแต่ละคนจาก Observations\n- Practice: Observation Lab ในกลุ่ม'
      },
      {
        icon: 'Users',
        title: 'Module 5 — Applied Psychology: นำความเข้าใจมนุษย์สู่การปฏิบัติ',
        desc: 'ความรู้ด้าน Psychology มีคุณค่าก็ต่อเมื่อนำไปใช้ได้จริงในชีวิตงาน\n\n- Tailored Communication: ปรับวิธีสื่อสารให้เหมาะกับแต่ละบุคลิก\n- Conflict Prevention: ใช้ความเข้าใจ Psychology ป้องกันความขัดแย้งก่อนเกิด\n- Effective Motivation: สร้างแรงจูงใจที่ตรงกับ Needs รายบุคคล\n- Team Composition: ออกแบบทีมให้มี Diversity ที่เสริมกัน\n- Commitment: แต่ละคนออก People Intelligence Action Plan'
      }
    ],
    long_description: `คนที่เข้าใจมนุษย์สามารถนำ จูงใจ และแก้ปัญหาได้ดีกว่าคนที่มีแค่ความรู้ทางเทคนิค

Psychology of People สร้างขึ้นจาก Applied Psychology, Behavioral Science, และ CAP Human Understanding Framework เพื่อช่วยให้ทุกคนที่ทำงานกับคน — ไม่ว่าจะเป็นผู้นำ HR หรือพนักงานทั่วไป — เข้าใจว่าทำไมคนถึงทำแบบนั้น รู้สึกแบบนี้ และต้องการอะไร

หลักสูตรนี้ออกแบบให้เข้าใจง่าย ไม่ใช่วิชาการ แต่นำไปใช้ได้ทันทีในการทำงานกับทีม ลูกค้า หรือ Stakeholders ในชีวิตประจำวัน

---

#### ผู้เข้าอบรมรายงานว่า

- เข้าใจพฤติกรรมของคนในทีมได้ดีขึ้นและตอบสนองได้ถูกจุดมากขึ้น
- Conflict ในทีมลดลงเพราะเข้าใจที่มาของความต่างกัน
- สร้าง Rapport กับคนใหม่ได้เร็วขึ้นอย่างเห็นได้ชัด

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 2. Team Synergy
  // ══════════════════════════════════════════════════════
  {
    slug: 'team-synergy',
    objectives: [
      {
        icon: 'Users',
        title: 'Module 1 — Team Anatomy: เข้าใจโครงสร้างและพลวัตของทีม',
        desc: 'ทีมที่ดีไม่ได้เกิดขึ้นเองแต่ถูกสร้างอย่างตั้งใจ\n\n- Tuckman Model: Forming, Storming, Norming, Performing, Adjourning\n- 5 Dysfunctions of a Team (Patrick Lencioni): จาก Absence of Trust ถึง Inattention to Results\n- Team Roles: Belbin Team Roles และการผสมผสานที่ลงตัว\n- Signs of a Healthy vs Unhealthy Team\n- Assessment: วัด Team Health ด้วย Team Diagnostic'
      },
      {
        icon: 'Heart',
        title: 'Module 2 — Trust Foundation: สร้างรากฐานความไว้วางใจในทีม',
        desc: 'ทุกอย่างใน High-Performance Team ยืนอยู่บน Trust\n\n- Trust Equation: Credibility + Reliability + Intimacy / Self-orientation\n- Vulnerability-based Trust: เปิดเผยข้อผิดพลาดและจุดอ่อนอย่างกล้าหาญ\n- Trust-building Activities ที่สร้าง Genuine Connection\n- Trust Breakers: พฤติกรรมที่ทำลาย Trust โดยไม่รู้ตัว\n- Workshop: Trust Building Conversations ในทีม'
      },
      {
        icon: 'Target',
        title: 'Module 3 — Shared Purpose: สร้างเป้าหมายและ Identity ร่วมกัน',
        desc: 'ทีมที่ทำงานเพื่อเป้าหมายร่วมกันทรงพลังกว่าทีมที่ทำงานเพื่อตัวเอง\n\n- Team Purpose Co-creation: สร้าง Team Mission ที่ทุกคน Own\n- Shared Values: ระบุค่านิยมที่จะเป็น Guide ในการทำงานร่วมกัน\n- Team Identity: สร้างความรู้สึก "เรา" ที่แข็งแกร่ง\n- Goal Alignment: เชื่อม Individual Goals กับ Team Goals\n- Workshop: Team Charter — ข้อตกลงการทำงานร่วมกัน'
      },
      {
        icon: 'Brain',
        title: 'Module 4 — Strengths Synergy: ดึงจุดแข็งแต่ละคนสู่พลังทีม',
        desc: 'ทีมที่แข็งแกร่งที่สุดคือทีมที่ทุกคนทำในสิ่งที่ตัวเองเก่งที่สุด\n\n- Individual Strengths Mapping: ระบุจุดแข็งของแต่ละคนอย่างชัดเจน\n- Complementary Strengths: วิธีใช้จุดแข็งที่แตกต่างกันให้เสริมกัน\n- Gap Analysis: ระบุ Capability Gaps ของทีมและวางแผนเสริม\n- Role Clarity: ทุกคนรู้บทบาทของตัวเองและ Dependencies\n- Workshop: Team Strengths Map และ Role Optimization'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Synergy in Action: สร้าง Collaborative Flow',
        desc: 'Synergy ที่แท้จริงคือเมื่อทีมทำงานร่วมกันอย่างลื่นไหลโดยไม่ต้องพึ่งคำสั่ง\n\n- Meeting Effectiveness: ออกแบบ Meetings ที่สร้าง Collaboration จริง\n- Collaborative Decision Making: ตัดสินใจร่วมกันอย่างมีประสิทธิภาพ\n- Feedback Culture ในทีม: ให้และรับ Feedback อย่างเป็นธรรมชาติ\n- Celebrating Wins Together: สร้าง Team Rituals ที่ Reinforce Synergy\n- Commitment: แต่ละทีมออก Team Synergy Action Plan'
      }
    ],
    long_description: `1 + 1 ไม่ได้เท่ากับ 2 เสมอไป ถ้าทีมทำงานร่วมกันได้ดี ผลลัพธ์อาจเท่ากับ 10

Team Synergy ออกแบบมาเพื่อทีมที่ทำงานด้วยกันอยู่แล้วแต่ยังไม่ได้ Unlock ศักยภาพเต็มที่ หรือทีมใหม่ที่ต้องการสร้างรากฐานที่แข็งแกร่งตั้งแต่ต้น โดยใช้ Team Development Research, Positive Psychology, และ CAP Team Facilitation Framework

หลักสูตรนี้ออกแบบให้ทีมทั้งทีมเข้าอบรมร่วมกัน เพราะประสบการณ์ร่วมกันคือสิ่งที่สร้าง Synergy ไม่ใช่การเรียนรู้แยกกัน

---

#### ทีมที่ผ่านหลักสูตรนี้รายงานว่า

- ทำงานร่วมกันได้ลื่นไหลขึ้นอย่างเห็นได้ชัดหลัง 2 สัปดาห์
- ลดความขัดแย้งเล็กๆ ที่เสียเวลาพลังงานในชีวิตประจำวัน
- ทีมรู้สึก Connected และ Motivated มากขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 3. Building Trust in Team
  // ══════════════════════════════════════════════════════
  {
    slug: 'building-trust-in-team',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — Trust Architecture: ทำความเข้าใจโครงสร้างของความไว้วางใจ',
        desc: 'ความไว้วางใจไม่ใช่ความรู้สึก막연 แต่มีองค์ประกอบที่ชัดเจนที่สร้างและวัดได้\n\n- Trust Equation: Credibility + Reliability + Intimacy / Self-orientation\n- Types of Trust: Competence Trust vs Character Trust\n- Trust Development Stages: จาก Distrust สู่ Blind Trust\n- Cost of Low Trust: Speed และ Cost ที่เพิ่มขึ้นเมื่อ Trust ต่ำ\n- Trust Audit: ประเมิน Trust Level ในทีมปัจจุบัน'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Trust Builders: พฤติกรรมที่สร้างความไว้วางใจ',
        desc: 'ความไว้วางใจสร้างจากพฤติกรรมเล็กๆ ที่สม่ำเสมอ ไม่ใช่ Gesture ใหญ่ครั้งเดียว\n\n- Consistency: ทำตามที่พูดทุกครั้ง ไม่มีข้อยกเว้น\n- Transparency: แบ่งปันข้อมูลที่คนต้องการรู้ก่อนที่จะถาม\n- Accountability: รับผิดชอบความผิดพลาดโดยไม่ Blame คนอื่น\n- Competence Demonstration: แสดงความสามารถที่คนจะ Rely on\n- Workshop: Trust Behavior Commitment'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Vulnerability Leadership: ความกล้าที่จะเปิดเผยตัวเอง',
        desc: 'ความไว้วางใจลึกที่สุดสร้างจากการแสดง Vulnerability อย่างกล้าหาญ\n\n- Vulnerability vs Weakness: ทำไม Vulnerability สร้าง Trust มากกว่า Perfection\n- Brene Brown Research: ข้อมูลเชิงวิทยาศาสตร์เรื่อง Vulnerability กับ Connection\n- Appropriate Disclosure: เปิดเผยตัวเองในระดับที่เหมาะกับบริบท\n- First Mover Advantage: ผู้นำที่เปิดก่อนสร้างพื้นที่ให้คนอื่นเปิดตาม\n- Workshop: Personal Story Sharing ในกลุ่มเล็ก'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Psychological Safety: พื้นที่ปลอดภัยสำหรับทีม',
        desc: 'Psychological Safety คือเงื่อนไขที่ทำให้ทีมกล้าพูดความจริง ลองสิ่งใหม่ และยอมรับความผิดพลาด\n\n- Amy Edmondson Research: ทำไม Psychological Safety สำคัญกว่า IQ ของทีม\n- Creating Safe Space: พฤติกรรมผู้นำที่สร้างและทำลาย Safety\n- Speaking Up Culture: ทำให้ทีมกล้าพูดสิ่งที่ยากจริงๆ\n- Learning from Mistakes: สร้าง Norm ที่ทำให้ความผิดพลาดเป็นโอกาสเรียนรู้\n- Assessment: วัด Psychological Safety Level ในทีม'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Trust Repair: ซ่อมความไว้วางใจที่แตกร้าว',
        desc: 'ความไว้วางใจที่ถูกทำลายสามารถฟื้นฟูได้ถ้าใช้กระบวนการที่ถูกต้อง\n\n- Why Trust Breaks: สาเหตุที่พบบ่อยของ Trust Breakdown ในทีม\n- Trust Repair Process: ขั้นตอนการฟื้นฟูความไว้วางใจที่พิสูจน์แล้ว\n- Sincere Apology: ขอโทษอย่างไรให้ Meaningful ไม่ใช่แค่ Ritual\n- Rebuilding Credibility: พิสูจน์ตัวเองใหม่อย่างอดทน\n- Commitment: Personal Trust Commitment ในทีม'
      }
    ],
    long_description: `ทีมที่ไว้วางใจกันทำงานได้เร็วกว่า กล้าคิดสร้างสรรค์กว่า และผ่านวิกฤตได้ดีกว่าทีมที่ไม่มี Trust

Building Trust in Team สร้างขึ้นจาก Trust Research ของ Frances Frei, Brene Brown, และ Patrick Lencioni ผสานกับ CAP Facilitation Framework ที่สร้างพื้นที่ปลอดภัยให้ทีมแบ่งปันและเชื่อมโยงกันในระดับที่ลึกกว่า Professional Relationship ปกติ

หลักสูตรนี้เหมาะสำหรับทีมที่ต้องการ Rebuild Trust หลังจากมีความขัดแย้ง หรือทีมที่ต้องการสร้าง Trust ที่แข็งแกร่งตั้งแต่ต้น

---

#### ทีมที่ผ่านหลักสูตรนี้รายงานว่า

- พูดความจริงกันได้มากขึ้นในการประชุม
- ตัดสินใจเร็วขึ้นเพราะไม่ต้อง Double-check ทุกอย่าง
- ความสัมพันธ์ในทีมลึกและแข็งแกร่งขึ้นอย่างเห็นได้ชัด

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 4. Empathy at Work
  // ══════════════════════════════════════════════════════
  {
    slug: 'empathy-at-work',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — Empathy Science: วิทยาศาสตร์แห่งการเข้าใจคนอื่น',
        desc: 'Empathy ไม่ใช่ความอ่อนแอ แต่คือ Superpower ของผู้นำและคนทำงานในยุคนี้\n\n- Sympathy vs Empathy vs Compassion: ความแตกต่างที่สำคัญ\n- Neuroscience of Empathy: Mirror Neurons และ Brain Research\n- Cognitive Empathy vs Emotional Empathy: เข้าใจ vs รู้สึกร่วม\n- Empathy Deficit ในองค์กร: ผลกระทบต่อ Engagement และ Performance\n- Self-assessment: วัด Empathy Level ของตัวเอง'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Perspective Taking: มองโลกผ่านสายตาคนอื่น',
        desc: 'Empathy เริ่มจากการหยุดยืนยันสิ่งที่เราเชื่อ และลองมองผ่านสายตาของคนอื่น\n\n- Empathy Mapping: เครื่องมือทำความเข้าใจ Thoughts, Feelings, Actions\n- Walking in Someone Else Shoes: ฝึก Perspective-taking อย่างมีโครงสร้าง\n- Assumptions vs Reality: ทดสอบสมมติฐานก่อนสรุปเกี่ยวกับคนอื่น\n- Cultural Empathy: Empathy ข้ามวัฒนธรรมและ Background\n- Workshop: Empathy Walk — สวมบทบาทเป็นคนในสถานการณ์ต่างๆ'
      },
      {
        icon: 'MessageCircle',
        title: 'Module 3 — Empathic Listening: ฟังด้วยหัวใจ',
        desc: 'การฟังแบบ Empathic คือของขวัญที่ดีที่สุดที่คุณจะให้กับคนอื่น\n\n- Levels of Listening: จาก Pretending ถึง Empathic\n- Creating Space: ความเงียบและการไม่รีบแก้ปัญหา\n- Reflecting Feelings: เทคนิคสะท้อนอารมณ์ที่ทำให้คนรู้สึกถูกเข้าใจ\n- Avoid Empathy Blocks: คำพูดและพฤติกรรมที่ทำลาย Empathic Connection\n- Practice: Empathic Listening Pairs'
      },
      {
        icon: 'Brain',
        title: 'Module 4 — Empathic Communication: พูดด้วย Empathy',
        desc: 'Empathy ไม่ใช่แค่การฟัง แต่ยังสะท้อนออกมาในวิธีที่เราพูด\n\n- Nonviolent Communication (NVC): Observation, Feeling, Need, Request\n- "I" Statements: สื่อสารจากมุมมองของตัวเองโดยไม่ Blame\n- Validation: รับรู้ความรู้สึกของคนอื่นโดยไม่ต้องเห็นด้วย\n- Empathy in Difficult Conversations: ใช้ Empathy ในการสื่อสารที่ยาก\n- Role Play: Empathic Conversation ในสถานการณ์ท้าทาย'
      },
      {
        icon: 'Users',
        title: 'Module 5 — Empathy Culture: สร้างวัฒนธรรมแห่งการเข้าใจ',
        desc: 'องค์กรที่มี Empathy Culture ดึงดูดคนเก่งและสร้างผลลัพธ์ที่ดีกว่า\n\n- Leading with Empathy: ผู้นำในฐานะ Model ของ Empathic Culture\n- Empathy in Policies และ Processes: ฝัง Empathy ในระบบขององค์กร\n- Customer Empathy: เชื่อมโยง Internal Empathy กับ Customer Experience\n- Measuring Empathy Culture: วัดและ Track Culture ที่เปลี่ยนไป\n- Commitment: แต่ละคนออก Empathy Practice Plan'
      }
    ],
    long_description: `ในยุคที่ AI เพิ่มขึ้น ทักษะที่ทำให้คนยังมีคุณค่าคือสิ่งที่ AI ทำไม่ได้ — Empathy

Empathy at Work สร้างขึ้นจาก Empathy Research, Neuroscience, และ CAP Human Connection Framework เพื่อช่วยให้ทุกคนในองค์กรพัฒนาความสามารถในการเข้าใจและเชื่อมกับคนอื่นได้ลึกขึ้น ซึ่งส่งผลโดยตรงต่อ Collaboration, Customer Experience, และ Leadership Effectiveness

หลักสูตรนี้ใช้ประสบการณ์แบบ Immersive ที่ทำให้ผู้เข้าอบรมรู้สึกถึงพลังของ Empathy ด้วยตัวเอง ไม่ใช่แค่รู้เรื่องมัน

---

#### ผู้เข้าอบรมรายงานว่า

- สื่อสารกับทีมและลูกค้าได้ดีขึ้นอย่างเห็นได้ชัด
- ลด Conflict จากการ Misunderstand กันได้มากขึ้น
- รู้สึกมีความหมายมากขึ้นในการทำงาน

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 5. Diversity & Inclusion Mindset
  // ══════════════════════════════════════════════════════
  {
    slug: 'diversity-and-inclusion-mindset',
    objectives: [
      {
        icon: 'Eye',
        title: 'Module 1 — D&I Fundamentals: ทำความเข้าใจ Diversity และ Inclusion',
        desc: 'Diversity คือการมีอยู่ Inclusion คือการได้รับเชิญ Belonging คือรู้สึกว่าอยากอยู่\n\n- Diversity Dimensions: Visible และ Invisible Dimensions of Diversity\n- Inclusion vs Exclusion: ความรู้สึกที่คนมีเมื่อถูก Include หรือ Exclude\n- Business Case for D&I: ทำไม Diverse Teams ทำผลงานได้ดีกว่า\n- D&I in Thai Context: ความท้าทายและโอกาสเฉพาะของไทย\n- Assessment: D&I Climate Survey ในองค์กรหรือทีม'
      },
      {
        icon: 'Brain',
        title: 'Module 2 — Unconscious Bias: ค้นพบและจัดการ Bias ที่ซ่อนอยู่',
        desc: 'ทุกคนมี Bias บางส่วน การไม่รู้จักมันทำให้มันควบคุมเราโดยไม่รู้ตัว\n\n- Types of Unconscious Bias: Affinity, Halo, Attribution, Confirmation\n- Implicit Association Test (IAT): วัด Bias ที่ไม่รู้ตัว\n- Bias in Hiring, Promotion, และ Performance Review\n- De-biasing Strategies: วิธีลดผลกระทบของ Bias ในการตัดสินใจ\n- Workshop: Bias Case Study วิเคราะห์สถานการณ์จริง'
      },
      {
        icon: 'Users',
        title: 'Module 3 — Inclusive Practices: สร้างพฤติกรรมที่ Inclusive',
        desc: 'Inclusion ไม่ใช่นโยบาย แต่คือพฤติกรรมของทุกคนในทุกวัน\n\n- Inclusive Meeting Practices: ทำให้ทุก Voice ถูกได้ยิน\n- Microaggressions: สังเกตและจัดการ Subtle Exclusion Behaviors\n- Allyship: สนับสนุนคนที่ถูก Marginalize อย่างมีประสิทธิภาพ\n- Sponsorship vs Mentoring: ทำไม Sponsorship เปลี่ยนชีวิตได้มากกว่า\n- Practice: Inclusive Conversation Simulation'
      },
      {
        icon: 'Heart',
        title: 'Module 4 — Cross-cultural Competence: ทำงานข้ามวัฒนธรรมได้อย่างมีประสิทธิภาพ',
        desc: 'โลกธุรกิจเชื่อมกันมากขึ้น ทักษะ Cross-cultural จึงสำคัญกว่าเคย\n\n- Cultural Dimensions (Hofstede): เข้าใจความแตกต่างเชิงวัฒนธรรม\n- High-context vs Low-context Communication\n- Generation Diversity: Boomers, Gen X, Millennials, Gen Z ในทีมเดียวกัน\n- Building Cross-cultural Trust: สร้างความไว้วางใจข้ามวัฒนธรรม\n- Workshop: Cross-cultural Scenario สำหรับบริบทธุรกิจไทย'
      },
      {
        icon: 'Compass',
        title: 'Module 5 — D&I Action Plan: จาก Awareness สู่ Action',
        desc: 'การรู้เรื่อง D&I ไม่พอ ต้องแปลงเป็น Actions ที่วัดได้\n\n- D&I Strategy ระดับทีมและองค์กร\n- Inclusive Leadership Behaviors: 6 พฤติกรรมที่ผู้นำ Inclusive ทำทุกวัน\n- Measuring Inclusion: KPIs และ Metrics ที่วัด Inclusion จริง\n- Accountability: สร้าง D&I Accountability ในทีม\n- Commitment: แต่ละคนออก Personal D&I Action Pledge'
      }
    ],
    long_description: `ทีมที่หลากหลายและ Inclusive ไม่ใช่แค่ "สิ่งที่ถูกต้อง" แต่คือ Competitive Advantage ที่วัดได้

Diversity & Inclusion Mindset ออกแบบขึ้นจาก D&I Research, Implicit Bias Science, และ CAP Inclusive Facilitation Framework เพื่อช่วยให้บุคคลและองค์กรเปลี่ยนจากความตั้งใจดีเป็น Inclusive Actions ที่เปลี่ยนวัฒนธรรมองค์กรได้จริง

หลักสูตรนี้ไม่ใช่ Compliance Training ที่ทำเพราะต้องทำ แต่คือ Transformation Journey ที่ผู้เข้าอบรมจะออกมาด้วยมุมมองที่กว้างขึ้นและ Conviction ที่จะสร้างความเปลี่ยนแปลง

---

#### องค์กรที่ผ่านหลักสูตรนี้รายงานว่า

- Diverse Voices ได้รับการฟังมากขึ้นในการประชุมและการตัดสินใจ
- Retention ของ Diverse Talent ดีขึ้น
- Innovation เพิ่มขึ้นจาก Cross-pollination ของ Perspectives ที่หลากหลาย

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 6. Motivation & Engagement
  // ══════════════════════════════════════════════════════
  {
    slug: 'motivation-and-engagement',
    objectives: [
      {
        icon: 'Flame',
        title: 'Module 1 — Motivation Science: วิทยาศาสตร์แห่งแรงจูงใจ',
        desc: 'การให้โบนัสอาจลด Intrinsic Motivation ลง ถ้าใช้ไม่ถูกวิธี\n\n- Intrinsic vs Extrinsic Motivation: ความแตกต่างและผลระยะยาว\n- Self-Determination Theory: Autonomy, Mastery, Purpose (Daniel Pink)\n- Herzberg Two-factor Theory: Hygiene vs Motivators\n- Flow State: สภาวะที่คนทำงานด้วยความสุขและ Productivity สูงสุด\n- Assessment: Motivation Inventory ของตัวเองและทีม'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Individual Motivators: ค้นพบแรงจูงใจรายบุคคล',
        desc: 'ไม่มีแรงจูงใจ Universal ที่ใช้ได้กับทุกคน ต้องรู้จัก Individual Motivators\n\n- Motivation Interview Techniques: ถามอย่างไรให้ได้คำตอบที่แท้จริง\n- Values as Motivators: ค่านิยมส่วนตัวคืออะไรที่ Drive คน\n- Career Aspirations: รู้ว่าคนอยากไปไหนและช่วยให้เดินไปทางนั้น\n- Engagement Drivers vs Detractors: อะไรทำให้คน Engage และอะไรทำให้ Disengage\n- Workshop: 1-on-1 Motivation Discovery Conversation'
      },
      {
        icon: 'Layers',
        title: 'Module 3 — Engagement Architecture: ออกแบบ Work ให้ Engage คน',
        desc: 'Engagement ไม่ได้มาจากการจัด Party แต่จากการออกแบบ Work ที่มีความหมาย\n\n- Job Enrichment vs Job Enlargement: เพิ่มความหมาย ไม่ใช่แค่ปริมาณงาน\n- Autonomy Design: ให้คนเป็นเจ้าของงานของตัวเอง\n- Mastery Opportunities: สร้างเส้นทางการพัฒนาที่เห็นได้ชัด\n- Purpose Connection: เชื่อมงานกับ Mission ที่ใหญ่กว่า\n- Workshop: Job Crafting สำหรับแต่ละบทบาทในทีม'
      },
      {
        icon: 'Heart',
        title: 'Module 4 — Recognition & Appreciation: ยกย่องอย่างมีความหมาย',
        desc: 'การ Recognize ที่ Work จริงต้องเฉพาะเจาะจง ทันเวลา และ Genuine\n\n- 5 Languages of Appreciation (Gary Chapman): Words, Acts, Gifts, Time, Touch\n- Specific vs Generic Praise: ทำไม "Good job" ไม่พอ\n- Public vs Private Recognition: รู้ว่าใครชอบแบบไหน\n- Peer Recognition Programs: สร้างวัฒนธรรมที่คนยกย่องกันเอง\n- Practice: ฝึกให้ Meaningful Recognition ต่อกันในกลุ่ม'
      },
      {
        icon: 'Users',
        title: 'Module 5 — Engagement System: สร้างระบบ Engagement ที่ยั่งยืน',
        desc: 'Engagement ที่ยั่งยืนต้องการระบบ ไม่ใช่แค่ Initiative ครั้งเดียว\n\n- Engagement Pulse: วัด Engagement อย่างสม่ำเสมอ\n- Stay Interviews: ทำไม Stay Interview สำคัญกว่า Exit Interview\n- Engagement Action Planning: แปลงข้อมูล Engagement สู่ Action\n- Manager Role in Engagement: Gallup พบว่า 70% ของ Engagement มาจากหัวหน้า\n- Commitment: Engagement Action Plan สำหรับทีม'
      }
    ],
    long_description: `70% ของพนักงานทั่วโลก Disengaged นั่นหมายถึงองค์กรส่วนใหญ่ได้ผลลัพธ์แค่ 30% ของศักยภาพจริง

Motivation & Engagement สร้างขึ้นจาก Gallup Engagement Research, Motivation Science, และ CAP Human-centered Framework เพื่อช่วยผู้นำและ HR เข้าใจว่า Engagement ไม่ใช่เรื่องของการจัดกิจกรรมสันทนาการ แต่คือการออกแบบ Work Environment และ Management Practices ที่ตอบ Human Needs อย่างแท้จริง

หลักสูตรนี้ให้ทั้ง Science ที่อธิบาย "ทำไม" และ Tools ที่ Practical สำหรับ "จะทำอย่างไร" ในบริบทองค์กรจริงของผู้เข้าอบรม

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- Engagement Score ของทีมเพิ่มขึ้นภายใน 60-90 วัน
- อัตราการ Retain คนเก่งดีขึ้นอย่างมีนัยสำคัญ
- ทีมทำงานอย่างมีพลังและ Ownership มากขึ้น

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 7. Team Emotional Intelligence
  // ══════════════════════════════════════════════════════
  {
    slug: 'team-emotional-intelligence',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — Team EQ Concept: เข้าใจ EQ ระดับทีม',
        desc: 'Team EQ ไม่ใช่แค่ผลรวม EQ ของแต่ละคน แต่คือความสามารถของกลุ่มในการจัดการ Collective Emotions\n\n- Individual EQ vs Team EQ: ความแตกต่างและความสำคัญ\n- How Emotions Spread: Emotional Contagion ในกลุ่ม\n- High Team EQ Indicators: สัญญาณของทีมที่มี EQ สูง\n- Team EQ Assessment: วัด EQ Level ของทีมด้วยกัน\n- Impact on Performance: ทีมที่มี EQ สูง Deliver ได้ดีกว่าอย่างไร'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Team Emotional Awareness: อ่าน Emotional Climate ของทีม',
        desc: 'ผู้นำและสมาชิกทีมที่ดีอ่านบรรยากาศอารมณ์ของกลุ่มได้ก่อนที่มันจะระเบิด\n\n- Reading the Room: สัญญาณ Verbal และ Nonverbal ของ Team Emotion\n- Energy Tracking: วิธีสังเกต Energy Level ของทีมในแต่ละวัน\n- Naming Group Emotions: สร้าง Emotional Vocabulary ร่วมกันในทีม\n- Emotional Triggers ของทีม: อะไรที่มักทำให้ Team Emotion เปลี่ยนไป\n- Practice: Team Emotion Barometer'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Group Emotional Regulation: จัดการอารมณ์ร่วมกัน',
        desc: 'ทีมที่มี EQ สูงมีกลไกจัดการ Collective Emotions ในสถานการณ์กดดัน\n\n- Team Breathing Space: วิธีสร้าง Pause ให้ทีมในช่วงเครียด\n- Humor as Regulation Tool: ใช้ Humor อย่าง Appropriate ลด Tension\n- Ritual and Routine: สร้าง Team Rituals ที่ Regulate Collective Emotion\n- De-escalation Techniques สำหรับ Group Conflict\n- Workshop: Team Emotion Regulation Toolkit'
      },
      {
        icon: 'Users',
        title: 'Module 4 — Psychological Safety Practices: สร้างพื้นที่ปลอดภัยทางอารมณ์',
        desc: 'Psychological Safety คือ Foundation ของ Team EQ ที่แท้จริง\n\n- Creating Check-in Culture: ทำให้การถามว่า "เป็นยังไงบ้าง?" มีความหมาย\n- Normalizing Emotions at Work: Emotions เป็นข้อมูล ไม่ใช่ปัญหา\n- Brave Space vs Safe Space: สร้างพื้นที่กล้าพูดความจริง\n- Response to Vulnerability: วิธีตอบสนองเมื่อคนแบ่งปันสิ่งที่ยาก\n- Practice: Check-in Circle ที่มีความหมาย'
      },
      {
        icon: 'Zap',
        title: 'Module 5 — Team EQ Culture: ฝัง EQ ไว้ในวัฒนธรรมทีม',
        desc: 'Team EQ ที่ยั่งยืนคือ EQ ที่ถูกฝังเป็น Team Norm ไม่ใช่แค่ Workshop ครั้งเดียว\n\n- EQ Team Agreements: ข้อตกลงร่วมกันเรื่อง Emotional Norms\n- Team Retrospectives ที่รวม Emotional Dimension\n- Celebrating Emotional Growth ในทีม\n- Leader Modeling: ผู้นำแสดง EQ ให้ทีมเห็นก่อน\n- Commitment: Team EQ Charter และ Practice Plan'
      }
    ],
    long_description: `ทีมที่มี Technical Skills สูงแต่ Team EQ ต่ำจะล้มเหลวในสถานการณ์กดดัน ในขณะที่ทีมที่มี Team EQ สูงจะ Thrive

Team Emotional Intelligence สร้างขึ้นจาก Group Dynamics Research, Team EQ Studies, และ CAP Team Facilitation Framework เพื่อช่วยทีมพัฒนาความสามารถในการ Navigate Collective Emotions ร่วมกัน ซึ่งส่งผลโดยตรงต่อ Collaboration, Resilience, และ Performance

หลักสูตรนี้ออกแบบให้ทีมทั้งทีมเรียนรู้ร่วมกัน เพราะ Team EQ เป็น Collective Skill ที่ต้องพัฒนาร่วมกัน ไม่ใช่ทีละคน

---

#### ทีมที่ผ่านหลักสูตรนี้รายงานว่า

- บรรยากาศทีมดีขึ้น Conflict ยากๆ จัดการได้มากขึ้น
- ทีมฟื้นตัวจากความเครียดและวิกฤตได้เร็วขึ้น
- Collaboration ลื่นไหลมากขึ้นในทุกสถานการณ์

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 8. Relationship Mastery
  // ══════════════════════════════════════════════════════
  {
    slug: 'relationship-mastery',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — Relationship Capital: ทำความเข้าใจคุณค่าของความสัมพันธ์',
        desc: 'โอกาสและความสำเร็จในชีวิตงานส่วนใหญ่มาจาก Relationship ไม่ใช่แค่ความสามารถ\n\n- Relationship as Capital: ทำไม Social Capital สำคัญเท่ Human Capital\n- Strong Ties vs Weak Ties: ทั้งสองแบบมีคุณค่าต่างกัน\n- Network Analysis: เข้าใจ Relationship Network ของตัวเองในองค์กร\n- Reciprocity: กฎพื้นฐานของ Relationship ที่ยั่งยืน\n- Self-assessment: วัด Relationship Capital ปัจจุบัน'
      },
      {
        icon: 'Users',
        title: 'Module 2 — Rapport Building: สร้าง Connection อย่างรวดเร็วและ Genuine',
        desc: 'Rapport ที่แท้จริงเกิดจาก Genuine Interest ไม่ใช่ Technique\n\n- First Impressions: วิทยาศาสตร์ของ 7 วินาทีแรก\n- Common Ground: หาจุดร่วมอย่างรวดเร็ว\n- Active Curiosity: ฝึกสนใจคนอื่นอย่างแท้จริง\n- FORD Technique: Family, Occupation, Recreation, Dreams\n- Practice: Speed Networking ที่สร้าง Genuine Connection'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Strategic Networking: สร้าง Network อย่างมีกลยุทธ์',
        desc: 'Network ที่ดีต้อง Diverse, Deep, และ Maintained อย่างสม่ำเสมอ\n\n- Networking Strategy: รู้ว่าต้องการ Network อะไรเพื่อเป้าหมายอะไร\n- Giving Before Taking: วิธีสร้าง Value ก่อนที่จะขอ Help\n- Virtual Networking: สร้างและรักษา Relationship ในยุค Digital\n- Weak Ties Strategy: ทำไมคนที่รู้จักน้อยกว่ามักเปิดประตูใหม่\n- Workshop: ออกแบบ 90-Day Network Building Plan'
      },
      {
        icon: 'Target',
        title: 'Module 4 — Relationship Maintenance: รักษาความสัมพันธ์ในระยะยาว',
        desc: 'การสร้างความสัมพันธ์ยากกว่าการรักษา แต่การรักษาต้องการ Intentional Practice\n\n- Stay in Touch Systems: วิธีรักษา Relationship โดยไม่รู้สึก Transactional\n- Relationship CRM: เครื่องมือจัดการ Network ส่วนตัว\n- Follow-through: ทำตามที่พูดทุกครั้งคือ Trust Builder อันดับหนึ่ง\n- Celebrating Others: สนใจและ Celebrate ความสำเร็จของคนอื่น\n- Workshop: สร้าง Relationship Maintenance System'
      },
      {
        icon: 'Compass',
        title: 'Module 5 — Stakeholder Mastery: บริหารความสัมพันธ์ Stakeholders สำคัญ',
        desc: 'ความสามารถจัดการ Stakeholders ที่หลากหลายคือ Leadership Skill ที่แยกผู้นำดีออกจากผู้นำที่ยอดเยี่ยม\n\n- Stakeholder Mapping: ระบุและจัดลำดับ Stakeholders ที่สำคัญ\n- Managing Up: บริหารความสัมพันธ์กับ Supervisor และ Executive\n- Managing Across: Influence กับ Peers ที่ไม่มี Authority เหนือกัน\n- Difficult Stakeholders: จัดการคนที่ยากโดยไม่เสียความสัมพันธ์\n- Commitment: Personal Stakeholder Management Plan'
      }
    ],
    long_description: `การสำรวจของ Harvard พบว่าความสุขและความสำเร็จในชีวิตส่วนใหญ่มาจาก Quality ของ Relationships ไม่ใช่ Wealth หรือ Fame

Relationship Mastery ออกแบบขึ้นจาก Social Network Theory, Relationship Psychology, และ CAP Connection Framework เพื่อช่วยให้ผู้เข้าอบรมสร้าง Authentic Relationships ที่มีคุณค่าและยั่งยืน ทั้งในองค์กร อุตสาหกรรม และชีวิตส่วนตัว

หลักสูตรนี้ไม่ใช่การสอน "เทคนิคการสร้าง Network" แต่คือการพัฒนา Genuine Curiosity และ Generosity ที่เป็นรากฐานของ Relationship ที่แท้จริง

---

#### ผู้เข้าอบรมรายงานว่า

- สร้างและรักษาความสัมพันธ์ที่มีความหมายได้มากขึ้น
- โอกาสใหม่ๆ เข้ามาจาก Network ที่แข็งแกร่งขึ้น
- รู้สึกมีพลังและ Supported มากขึ้นในชีวิตงาน

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

  // ══════════════════════════════════════════════════════
  // 9. Human-Centered Leadership
  // ══════════════════════════════════════════════════════
  {
    slug: 'human-centered-leadership',
    objectives: [
      {
        icon: 'Heart',
        title: 'Module 1 — Human-centered Philosophy: ปรัชญาผู้นำที่เห็นคน',
        desc: 'ผู้นำที่ดีที่สุดไม่ได้แค่ Manage Workforce แต่มองเห็นคนในฐานะมนุษย์\n\n- People-first vs Profit-first: ทำไมไม่ใช่การเลือกอย่างใดอย่างหนึ่ง\n- Servant Leadership (Robert Greenleaf): ผู้นำรับใช้คนก่อน\n- Human Needs in Workplace: ทุกคนต้องการ Safety, Belonging, Esteem, Growth\n- Cost of Treating People as Resources: ผลกระทบระยะยาวที่มองเห็นได้\n- Reflection: ผู้นำของตัวเองมี Human-centered อย่างไร'
      },
      {
        icon: 'Eye',
        title: 'Module 2 — Deep Listening at Scale: ฟังคนในองค์กรให้ได้ยิน',
        desc: 'ผู้นำที่รู้ว่าคนในองค์กรต้องการอะไรจริงๆ สามารถตัดสินใจได้ดีกว่า\n\n- Employee Listening Systems: สร้างช่องทางที่คนกล้าพูดความจริง\n- Stay Interviews: ถามก่อนที่คนจะตัดสินใจออก\n- Walking the Floor: ผู้นำที่รู้จักคนตัวต่อตัวสร้าง Trust ที่ไม่สามารถสร้างด้วย Survey\n- Acting on Feedback: ทำไมการฟังแต่ไม่ Act ทำลาย Trust\n- Workshop: ออกแบบ Employee Listening Strategy'
      },
      {
        icon: 'Brain',
        title: 'Module 3 — Human-centered Decision Making: ตัดสินใจโดยคิดถึงคน',
        desc: 'การตัดสินใจที่ดีต้องสมดุลระหว่าง Business Outcomes และ Human Impact\n\n- Decision Impact Assessment: ประเมินผลกระทบต่อคนก่อนตัดสินใจ\n- Transparency in Decision Making: เปิดเผยเหตุผลอย่างเหมาะสม\n- Inclusive Decision Making: Involve คนที่ได้รับผลกระทบในกระบวนการ\n- Ethical Leadership: เส้นแบ่งระหว่าง Hard Decisions และ Wrong Decisions\n- Case Study: วิเคราะห์การตัดสินใจยากในมุม Human-centered'
      },
      {
        icon: 'Layers',
        title: 'Module 4 — Employee Experience Design: ออกแบบประสบการณ์การทำงาน',
        desc: 'Employee Experience ที่ดีสร้างจากการออกแบบอย่างตั้งใจ ไม่ใช่เกิดขึ้นเอง\n\n- Employee Journey Mapping: ทำความเข้าใจประสบการณ์ของพนักงานทุก Touchpoint\n- Moments That Matter: ระบุ Moments ที่ส่งผลต่อ Engagement มากที่สุด\n- Wellbeing at Work: Physical, Mental, Emotional, Financial Wellbeing\n- Flexible Work Design: ออกแบบ Work ที่เคารพชีวิตของคน\n- Workshop: Redesign หนึ่ง Employee Experience ที่ต้องการปรับปรุง'
      },
      {
        icon: 'Compass',
        title: 'Module 5 — People-first Culture: สร้างวัฒนธรรมที่คนรู้สึก Valued',
        desc: 'วัฒนธรรมที่ดีไม่ได้อยู่ในค่านิยมบนกำแพง แต่อยู่ในพฤติกรรมของผู้นำทุกวัน\n\n- Culture Carriers: ระบุและ Develop คนที่เป็น Culture Role Models\n- Rituals and Symbols: สร้าง Practices ที่สะท้อน People-first Values\n- Accountability: ทำให้ Human-centered Leadership เป็น Standard\n- Measuring Culture: วัดว่าวัฒนธรรมเปลี่ยนจริงหรือไม่\n- Commitment: Personal Human-centered Leadership Pledge'
      }
    ],
    long_description: `ในยุคที่ Talent Wars รุนแรงขึ้น ผู้นำที่เห็นคนในฐานะมนุษย์คือผู้นำที่องค์กรต้องการมากที่สุด

Human-Centered Leadership สร้างขึ้นจาก Servant Leadership Theory, Employee Experience Research, และ CAP Humanistic Framework เพื่อช่วยผู้นำพัฒนา Philosophy, Mindset, และ Practices ที่วางคนเป็นศูนย์กลางของทุกการตัดสินใจและทุก Action

หลักสูตรนี้ท้าทายผู้นำให้ตั้งคำถามกับวิธีที่ตัวเองนำอยู่ และค้นหาวิธีนำที่ไม่เพียงสร้างผลลัพธ์ทางธุรกิจ แต่ยังสร้างผลลัพธ์ในชีวิตของคนที่ทำงานด้วยด้วย

---

#### ผู้นำที่ผ่านหลักสูตรนี้รายงานว่า

- ทีมรู้สึก Valued และ Seen มากขึ้นอย่างเห็นได้ชัด
- Retention ดีขึ้นเพราะคนอยากทำงานกับหัวหน้าคนนี้
- ผลลัพธ์ทางธุรกิจดีขึ้นเพราะทีมทุ่มเทด้วยตัวเอง

---

#### ลูกค้าที่ไว้วางใจ

Central Food Retail | Land and Houses | Dell | Toyota | 100+ องค์กรทั่วประเทศ`
  },

];

// ─── Runner ────────────────────────────────────────────────────────
async function main() {
  console.log('People Skills — Full Content Update (9 courses)');
  console.log('================================================\n');

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
