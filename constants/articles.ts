
// Article Content Strategy for CAP Vision Institute
// Target Audience: HRD, ฝ่ายพัฒนาบุคลากร, องค์กรไทย
// Updated: March 2026

export type ArticlePriority = 'high' | 'medium' | 'low';
export type ArticleIntent = 'informational' | 'commercial' | 'transactional';
export type ArticleStatus = 'planned' | 'in-progress' | 'published';

export interface ArticlePlan {
  id: string;
  title: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: ArticleIntent;
  priority: ArticlePriority;
  category: string;
  estimatedWordCount: number;
  outline: string[];
  status: ArticleStatus;
  targetFAQ?: string; // Question to target for "People Also Ask"
  linkedCourse?: string; // Link to relevant course page
}

export const ARTICLE_PLAN: ArticlePlan[] = [
  {
    id: 'art-001',
    title: '10 หลักสูตรฝึกอบรมที่ฝ่าย HRD ควรรู้จัก ปี 2568',
    slug: 'หลักสูตรฝึกอบรม-hrd-2568',
    primaryKeyword: 'หลักสูตรฝึกอบรม HRD',
    secondaryKeywords: ['หลักสูตรพัฒนาบุคลากร', 'อบรม In-house', 'training 2568'],
    intent: 'commercial',
    priority: 'high',
    category: 'HRD Guide',
    estimatedWordCount: 2000,
    outline: [
      'ทำไม HRD ต้องเลือกหลักสูตรอย่างมีกลยุทธ์',
      '10 หลักสูตรที่แนะนำพร้อมคำอธิบาย',
      'วิธีเลือก Training Provider ที่เหมาะกับองค์กร',
      'ตารางเปรียบเทียบ In-house vs Public Training',
      'CTA: ปรึกษาฟรีกับ CAP Vision Institute',
    ],
    status: 'planned',
    targetFAQ: 'หลักสูตรฝึกอบรม HRD มีอะไรบ้าง?',
    linkedCourse: '/courses',
  },
  {
    id: 'art-002',
    title: 'In-house Training คืออะไร? ประโยชน์ที่องค์กรจะได้รับ',
    slug: 'in-house-training-คืออะไร',
    primaryKeyword: 'In-house training คืออะไร',
    secondaryKeywords: ['ข้อดี In-house training', 'ฝึกอบรมภายในองค์กร', 'ประโยชน์การอบรม'],
    intent: 'informational',
    priority: 'high',
    category: 'Learning & Development',
    estimatedWordCount: 1500,
    outline: [
      'In-house Training คืออะไร (นิยามชัดเจน)',
      'ข้อดีเมื่อเทียบกับ Public Training',
      'ขั้นตอนการจัด In-house Training สำหรับ HRD',
      'ตัวอย่างหลักสูตรที่นิยมจัดแบบ In-house',
      'FAQ: ราคา, ระยะเวลา, การออกแบบหลักสูตร',
    ],
    status: 'planned',
    targetFAQ: 'In-house Training คืออะไร?',
    linkedCourse: '/courses',
  },
  {
    id: 'art-003',
    title: 'ขอใบเสนอราคา In-house Training ต้องเตรียมอะไรบ้าง?',
    slug: 'ขอใบเสนอราคา-in-house-training',
    primaryKeyword: 'ขอใบเสนอราคาอบรม',
    secondaryKeywords: ['quotation In-house training', 'ติดต่อสถาบันฝึกอบรม', 'เตรียม TOR อบรม'],
    intent: 'transactional',
    priority: 'high',
    category: 'HRD Guide',
    estimatedWordCount: 1200,
    outline: [
      'ข้อมูลที่ต้องเตรียมก่อนติดต่อสถาบัน',
      'Template TOR / Training Brief สำหรับ HRD',
      'คำถามที่ควรถาม Training Provider',
      'เปรียบเทียบราคาและสิ่งที่ได้รับ',
      'CTA: ขอใบเสนอราคาจาก CAP Vision Institute',
    ],
    status: 'planned',
    targetFAQ: 'จะขอใบเสนอราคาอบรม In-house ทำอย่างไร?',
    linkedCourse: '/contact',
  },
  {
    id: 'art-004',
    title: 'Growth Mindset คืออะไร? และสำคัญกับองค์กรอย่างไร',
    slug: 'growth-mindset-คืออะไร',
    primaryKeyword: 'growth mindset คืออะไร',
    secondaryKeywords: ['growth mindset องค์กร', 'fixed mindset vs growth mindset', 'carol dweck'],
    intent: 'informational',
    priority: 'high',
    category: 'Mindset & Leadership',
    estimatedWordCount: 1800,
    outline: [
      'Growth Mindset คืออะไร? (Carol Dweck Theory)',
      'ความแตกต่าง Fixed vs Growth Mindset',
      'ผลกระทบต่อประสิทธิภาพการทำงาน',
      'วิธีพัฒนา Growth Mindset ในองค์กร',
      'Workshop: Growth Mastery ของ CAP Vision Institute',
    ],
    status: 'planned',
    targetFAQ: 'Growth Mindset คืออะไร?',
    linkedCourse: 'https://growth-mindset-workshop.capvisionpartner.com/',
  },
  {
    id: 'art-005',
    title: 'วิธีเลือกสถาบันฝึกอบรมที่เหมาะกับองค์กร (Checklist สำหรับ HRD)',
    slug: 'เลือกสถาบันฝึกอบรม',
    primaryKeyword: 'สถาบันฝึกอบรม',
    secondaryKeywords: ['เลือก training provider', 'คุณสมบัติสถาบันฝึกอบรม', 'HRD checklist'],
    intent: 'informational',
    priority: 'medium',
    category: 'HRD Guide',
    estimatedWordCount: 1400,
    outline: [
      '5 คำถามสำคัญก่อนเลือกสถาบัน',
      'Checklist ประเมิน Training Provider',
      'Red flags ที่ควรระวัง',
      'ตัวอย่างเกณฑ์ที่บริษัทชั้นนำใช้',
    ],
    status: 'planned',
    linkedCourse: '/about',
  },
  {
    id: 'art-006',
    title: 'Service Mind ที่แท้จริง ต่างจาก Customer Service อย่างไร?',
    slug: 'service-mind-คืออะไร',
    primaryKeyword: 'service mind คืออะไร',
    secondaryKeywords: ['จิตบริการ', 'customer service training', 'อบรม service mind'],
    intent: 'informational',
    priority: 'medium',
    category: 'People Skills',
    estimatedWordCount: 1500,
    outline: [
      'นิยาม Service Mind vs Customer Service',
      'ทำไมองค์กรถึงต้องการ Service Mind',
      'ทักษะ 5 อย่างที่พนักงาน Service Mind ต้องมี',
      'Case Study: ผลลัพธ์จากการอบรม Service Mind',
    ],
    status: 'planned',
    linkedCourse: '/courses/service-mind-excellence',
  },
  {
    id: 'art-007',
    title: 'Team Building ที่ได้ผลจริง: ไม่ใช่แค่กิจกรรมสนุก',
    slug: 'team-building-ที่ดี',
    primaryKeyword: 'team building ที่ดี',
    secondaryKeywords: ['กิจกรรม team building', 'สร้างทีม', 'team synergy'],
    intent: 'informational',
    priority: 'medium',
    category: 'Work Skills',
    estimatedWordCount: 1400,
    outline: [
      'Team Building ทั่วไป vs Team Building เชิงพัฒนา',
      '3 องค์ประกอบที่ทำให้ Team Building ได้ผล',
      'กิจกรรมที่แนะนำสำหรับแต่ละปัญหาทีม',
      'วิธีวัดผลหลัง Team Building',
    ],
    status: 'planned',
    linkedCourse: '/courses/team-synergy',
  },
  {
    id: 'art-008',
    title: 'ทักษะที่หัวหน้างานต้องมีในยุค 2568',
    slug: 'ทักษะผู้นำ-2568',
    primaryKeyword: 'ทักษะผู้นำ',
    secondaryKeywords: ['leadership skills', 'หัวหน้างานยุคใหม่', 'competency ผู้นำ'],
    intent: 'informational',
    priority: 'medium',
    category: 'Leader Skills',
    estimatedWordCount: 1600,
    outline: [
      'Landscape องค์กรยุค 2568 ที่เปลี่ยนไป',
      '7 ทักษะ Leadership ที่จำเป็นในปัจจุบัน',
      'Self-assessment: คุณมีทักษะเหล่านี้แล้วหรือยัง?',
      'หลักสูตรพัฒนาผู้นำจาก CAP Vision Institute',
    ],
    status: 'planned',
    linkedCourse: '/courses',
  },
  {
    id: 'art-009',
    title: 'Creative Problem Solving ช่วยแก้ปัญหาในที่ทำงานได้อย่างไร?',
    slug: 'creative-problem-solving-ที่ทำงาน',
    primaryKeyword: 'creative problem solving',
    secondaryKeywords: ['การแก้ปัญหาอย่างสร้างสรรค์', 'CPS methodology', 'แก้ปัญหาในที่ทำงาน'],
    intent: 'informational',
    priority: 'low',
    category: 'Work Skills',
    estimatedWordCount: 1400,
    outline: [
      'CPS คืออะไร? (Buffalo College Model)',
      'กระบวนการ 7 ขั้นตอน',
      'ตัวอย่างการใช้ CPS แก้ปัญหางานจริง',
      'Workshop: Creative Problem Solving',
    ],
    status: 'planned',
    linkedCourse: '/courses/creative-problem-solving',
  },
  {
    id: 'art-010',
    title: 'Effective Communication ในทีมงานข้ามแผนก: เทคนิคและเครื่องมือ',
    slug: 'effective-communication-ในองค์กร',
    primaryKeyword: 'การสื่อสารในองค์กร',
    secondaryKeywords: ['effective communication', 'DISC model', 'การสื่อสารข้ามแผนก'],
    intent: 'informational',
    priority: 'low',
    category: 'Communication Skills',
    estimatedWordCount: 1500,
    outline: [
      'ปัญหาการสื่อสารที่พบบ่อยในองค์กร',
      'DISC Model: รู้จักรูปแบบการสื่อสาร 4 แบบ',
      'เทคนิค 5 อย่างสำหรับการสื่อสารข้ามแผนก',
      'วัดผลด้วย Communication Assessment',
    ],
    status: 'planned',
    linkedCourse: '/courses/effective-communication',
  },
];

// Summary stats for content calendar
export const ARTICLE_STATS = {
  total: ARTICLE_PLAN.length,
  byPriority: {
    high: ARTICLE_PLAN.filter(a => a.priority === 'high').length,
    medium: ARTICLE_PLAN.filter(a => a.priority === 'medium').length,
    low: ARTICLE_PLAN.filter(a => a.priority === 'low').length,
  },
  byIntent: {
    informational: ARTICLE_PLAN.filter(a => a.intent === 'informational').length,
    commercial: ARTICLE_PLAN.filter(a => a.intent === 'commercial').length,
    transactional: ARTICLE_PLAN.filter(a => a.intent === 'transactional').length,
  },
};
