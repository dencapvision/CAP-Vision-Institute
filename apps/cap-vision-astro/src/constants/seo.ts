import { BRAND_INFO } from './brand';

export const DEFAULT_SEO = {
  title: 'รับจัดอบรม In-house Training | พัฒนาผู้นำและทีมองค์กร | CAP Vision Institute',
  description: 'พัฒนาคนให้เปลี่ยนวิธีคิด สร้างทีมให้ทำงานได้จริง ยกระดับองค์กรด้วย In-house Training และ Customized Learning โดย ครูเด่น Master Facilitator ประสบการณ์ 18+ ปี',
  keywords: 'รับจัดอบรม In-house Training, In-house Training, พัฒนาบุคลากร, พัฒนาผู้นำ, พัฒนาทีม, Training สำหรับองค์กร, Customized Training, Transformative Learning, Experiential Learning, Master Facilitator, Facilitation, Leadership Transformation, Human Communication, เปลี่ยนวิธีคิด, สร้างทีม, ยกระดับผู้นำ, สร้างวัฒนธรรมองค์กร, เพิ่มประสิทธิภาพการทำงาน, สร้างการเปลี่ยนแปลงที่ยั่งยืน, CAP Vision Institute, ครูเด่น มาสเตอร์ฟา',
  author: 'CAP Vision Institute',
  themeColor: '#0f3460',
  url: 'https://capvisionpartner.com',
  ogImage: '/og-image.jpg',
  h1: 'พัฒนาคน สร้างทีม ยกระดับองค์กร',
  subH1: 'In-house Training & Transformative Learning ที่ออกแบบตามโจทย์จริงขององค์กร',
  primaryCta: 'ปรึกษาและออกแบบหลักสูตรสำหรับองค์กร',
  secondaryCta: 'ดูหลักสูตรทั้งหมด',
};

// 8 Core SEO Landing Pages Architecture
export const SEO_LANDING_PAGES = [
  {
    url: '/in-house-training',
    h1: 'รับจัดอบรม In-house Training สำหรับองค์กร',
    intent: 'Commercial',
    description: 'ออกแบบและจัดฝึกอบรม In-house Training ที่ตอบโจทย์เฉพาะองค์กร เน้นผลลัพธ์และการนำไปใช้จริง',
    keywords: ['รับจัดอบรม In-house Training', 'In-house Training สำหรับองค์กร', 'จัดอบรมภายในองค์กร']
  },
  {
    url: '/leadership-development',
    h1: 'หลักสูตรพัฒนาผู้นำและ Leadership Development',
    intent: 'Commercial',
    description: 'ยกระดับผู้นำทุกระดับ จากผู้สั่งการสู่ Facilitative Leader ที่สร้างแรงบันดาลใจและขับเคลื่อนผลลัพธ์',
    keywords: ['พัฒนาผู้นำ', 'Leadership Development', 'หลักสูตรผู้นำ', 'Transformational Leadership']
  },
  {
    url: '/team-building',
    h1: 'Team Building และการพัฒนาทีมสำหรับองค์กร',
    intent: 'Commercial',
    description: 'สร้าง Team Synergy และ Psychological Safety ทลายกำแพง Silo สู่ทีมที่ร่วมมือกันอย่างแท้จริง',
    keywords: ['Team Building องค์กร', 'พัฒนาทีมงาน', 'Team Synergy', 'Psychological Safety']
  },
  {
    url: '/communication-training',
    h1: 'หลักสูตรอบรมทักษะการสื่อสารสำหรับองค์กร',
    intent: 'Commercial',
    description: 'พัฒนาทักษะ Human Communication 4 ระดับ การฟังเชิงลึก และการสื่อสารด้วยความเข้าอกเข้าใจ (Empathy)',
    keywords: ['อบรมการสื่อสาร', 'Communication Training', 'ทักษะการสื่อสารในองค์กร', 'Empathetic Communication']
  },
  {
    url: '/service-mind',
    h1: 'อบรม Service Mind และ Service Excellence',
    intent: 'Commercial',
    description: 'สร้างหัวใจบริการที่แท้จริงจากภายใน ยกระดับประสบการณ์ลูกค้าสู่ Service Excellence ที่ยั่งยืน',
    keywords: ['อบรม Service Mind', 'Service Excellence', 'พัฒนาทักษะการบริการ', 'Customer Experience']
  },
  {
    url: '/facilitator-training',
    h1: 'Facilitator Training พัฒนาทักษะกระบวนกร',
    intent: 'Niche',
    description: 'ศาสตร์และศิลป์แห่งการเป็น Modern Facilitator ออกแบบและนำกระบวนการเรียนรู้เพื่อการเปลี่ยนแปลง',
    keywords: ['Facilitator Training', 'ฝึกอบรมกระบวนกร', 'ทักษะวิทยากร', 'Master Facilitator']
  },
  {
    url: '/executive-coaching',
    h1: 'Executive Coaching สำหรับผู้บริหาร',
    intent: 'Premium',
    description: '1-on-1 Coaching ปลดล็อกศักยภาพผู้นำระดับสูง วางกลยุทธ์และปรับ Mindset สู่ความสำเร็จที่ยั่งยืน',
    keywords: ['Executive Coaching', 'โค้ชผู้บริหาร', 'Coaching สำหรับผู้นำ', '1-on-1 Coaching']
  },
  {
    url: '/od-consulting',
    h1: 'OD Consulting ที่ปรึกษาพัฒนาองค์กร',
    intent: 'B2B',
    description: 'ที่ปรึกษาด้านการพัฒนาองค์กร ออกแบบสถาปัตยกรรมการเรียนรู้และขับเคลื่อนวัฒนธรรมองค์กรเชิงกลยุทธ์',
    keywords: ['OD Consulting', 'ที่ปรึกษาพัฒนาองค์กร', 'Organization Development', 'Culture Transformation']
  }
];

// Strategic SEO Vocabulary
export const SEO_VOCABULARY = {
  coreKeywords: [
    'In-house Training',
    'พัฒนาบุคลากร',
    'พัฒนาผู้นำ',
    'พัฒนาทีม',
    'Training สำหรับองค์กร',
    'Customized Training'
  ],
  differentiationKeywords: [
    'Transformative Learning',
    'Experiential Learning',
    'Master Facilitator',
    'Facilitation',
    'Leadership Transformation',
    'Human Communication'
  ],
  businessOutcomes: [
    'เปลี่ยนวิธีคิด',
    'สร้างทีม',
    'ยกระดับผู้นำ',
    'สร้างวัฒนธรรมองค์กร',
    'เพิ่มประสิทธิภาพการทำงาน',
    'สร้างการเปลี่ยนแปลงที่ยั่งยืน'
  ]
};

// Strategic Positioning
export const BRAND_POSITIONING = {
  layer1_searchIntent: 'In-house Training',
  layer2_expertise: 'Leadership • Team • Communication • Facilitation • OD',
  layer3_differentiator: 'Transformative Learning',
  brandPromise: 'พัฒนาคน สร้างทีม ยกระดับองค์กร',
  signature: 'Master Facilitator | Transformative Learning',
  proofMetrics: {
    yearsExperience: '18+',
    learnersTrained: '10,000+',
    organizations: '200+'
  }
};

export const generateTitle = (pageTitle: string) => `${pageTitle} | ${BRAND_INFO.name}`;

export const HRD_FAQS = [
  {
    question: "ควรจัดอบรม In-house Training หัวข้ออะไรดี?",
    answer: "หลักสูตรยอดนิยมสำหรับองค์กรยุคนี้คือ Leadership, Growth Mindset, Effective Communication และ OKRs ซึ่งครูเด่น มาสเตอร์ฟา จะออกแบบเนื้อหาให้ตรงกับปัญหาของแต่ละองค์กร (Customize) อย่างแท้จริง"
  },
  {
    question: "ทำไมถึงควรเลือก CAP Vision Institute สำหรับการพัฒนาบุคลากร?",
    answer: "เพราะเราไม่ใช่แค่สอนทฤษฎี แต่เน้นการสร้าง 'กระบวนการเรียนรู้' (Facilitation) ให้ผู้เข้าอบรมได้คิดและนำไปใช้จริง โดยผู้เชี่ยวชาญระดับอาจารย์ (ครูเด่น มาสเตอร์ฟา) ที่มีประสบการณ์จริงกว่า 20 ปี"
  },
  {
    question: "Soft Skills ไหนจำเป็นที่สุดสำหรับพนักงานในปัจจุบัน?",
    answer: "ทักษะที่สำคัญที่สุดคือ Empathy, Adaptability และ Complex Problem Solving ซึ่งเป็นรากฐานของการทำงานร่วมกันในยุคเทคโนโลยีดิสรัปชั่น"
  },
  {
    question: "มีหลักสูตรสำหรับหัวหน้างานมือใหม่ (New Manager) หรือไม่?",
    answer: "มีครับ เรามีหลักสูตร 'จาก Manager สู่ Coach' ที่จะช่วยปรับ Mindset และติดอาวุธทักษะที่จำเป็น เช่น การมอบหมายงาน, รับฟังอย่างเข้าใจ และการประเมินผล"
  },
  {
    question: "CAP Vision Institute รองรับการอบรมกี่คนต่อรุ่น?",
    answer: "หลักสูตร In-house Training รองรับตั้งแต่ 20-200 คน ขึ้นอยู่กับรูปแบบ Workshop หรือ Seminar ทีมงานจะออกแบบให้เหมาะสมกับจำนวนและเป้าหมายขององค์กรครับ"
  },
  {
    question: "CAP Theory คืออะไร และช่วยองค์กรได้อย่างไร?",
    answer: "CAP Theory คือกรอบการพัฒนาที่ CAP Vision Institute ใช้ ประกอบด้วย C=Competence (ทักษะ), A=Attitude (ทัศนคติ), P=Performance (ผลลัพธ์) โดยเชื่อว่าการเปลี่ยน Attitude คือกุญแจสำคัญที่ทำให้ทักษะและผลลัพธ์ดีขึ้นอย่างยั่งยืน"
  },
  {
    question: "การอบรมแบบ Facilitation ต่างจากการบรรยายทั่วไปอย่างไร?",
    answer: "การบรรยายคือวิทยากรพูด ผู้เรียนฟัง แต่ Facilitation คือกระบวนการที่ทำให้ผู้เรียนคิดเอง ค้นพบคำตอบเอง และเปลี่ยนแปลงพฤติกรรมจากข้างใน ทำให้การเรียนรู้ยั่งยืนและนำไปใช้จริงได้มากกว่า"
  },
  {
    question: "องค์กรจะวัดผลลัพธ์หลังการอบรมได้อย่างไร?",
    answer: "CAP Vision Institute ใช้การวัดผลก่อน-หลังการอบรม (Pre-Post Assessment) โดยวัดทั้งระดับ Competence และ Attitude เพื่อให้องค์กรเห็น ROI ที่ชัดเจน พร้อมรายงานสรุปผลลัพธ์ให้ HR และผู้บริหาร"
  },
  {
    question: "มีบริการ Coaching สำหรับผู้บริหารระดับสูงหรือไม่?",
    answer: "มีครับ บริการ Executive Coaching ของครูเด่น มาสเตอร์ฟา ออกแบบเฉพาะสำหรับ CEO, MD และผู้บริหารระดับสูง เน้นการสะท้อนคิด ปลดล็อก Mindset และวางกลยุทธ์การพัฒนาตัวเอง"
  },
  {
    question: "ติดต่อขอใบเสนอราคา In-house Training ได้อย่างไร?",
    answer: "ติดต่อได้ทาง LINE @denmasterfa หรือโทร 093-223-5919 ทีมงานจะรับข้อมูลและส่งใบเสนอราคาภายใน 24 ชั่วโมงครับ นอกจากนี้ยังสามารถสนทนากับกระบวนกรคู่คิดบนเว็บไซต์เพื่อวิเคราะห์โจทย์เบื้องต้นได้ทันที"
  }
];
