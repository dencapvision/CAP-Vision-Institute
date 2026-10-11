import { BRAND_INFO } from './brand';

export const DEFAULT_SEO = {
  title: 'บริษัทฝึกอบรม & สถาบันพัฒนาบุคลากร In-house Training องค์กร | CAP Vision Institute',
  description: 'บริษัทจัดฝึกอบรม In-house Training และสถาบันพัฒนาบุคลากรชั้นนำ ออกแบบหลักสูตรเฉพาะองค์กร Leadership, Team Building, Growth Mindset โดย ครูเด่น มาสเตอร์ฟา ปรึกษาและขอใบเสนอราคาได้ใน 24 ชม.',
  keywords: 'บริษัทฝึกอบรม, สถาบันฝึกอบรม, บริษัทจัดฝึกอบรม, รับจัดอบรม In-house Training, ศูนย์ฝึกอบรม, ฝึกอบรม, อบรมองค์กร, พัฒนาบุคลากร, พัฒนาผู้นำ, Leadership Development, Team Building, Growth Mindset, Master Facilitator, CAP Vision Institute, ครูเด่น มาสเตอร์ฟา, อบรมใกล้ฉัน, อบรมปทุมธานี, อบรมกรุงเทพ',
  author: 'CAP Vision Institute',
  themeColor: '#0f3460',
  url: 'https://capvisionpartner.com',
  ogImage: '/og-image.jpg',
  h1: 'พัฒนาคน สร้างทีม ยกระดับองค์กร',
  subH1: 'บริษัทฝึกอบรม In-house Training & Transformative Learning ที่ออกแบบตามโจทย์จริงขององค์กร',
  primaryCta: 'ปรึกษาและออกแบบหลักสูตรสำหรับองค์กร',
  secondaryCta: 'ดูหลักสูตรทั้งหมด',
};

// 8 Core SEO Landing Pages Architecture
export const SEO_LANDING_PAGES = [
  {
    url: '/in-house-training',
    h1: 'บริษัทจัดฝึกอบรม In-house Training สำหรับองค์กรชั้นนำ',
    intent: 'Commercial',
    description: 'สถาบันฝึกอบรมและพัฒนาบุคลากร ออกแบบหลักสูตร In-house Training ตรงโจทย์ปัญหาองค์กร นำไปใช้จริงได้ทันที',
    keywords: ['บริษัทฝึกอบรม', 'บริษัทจัดฝึกอบรม', 'สถาบันฝึกอบรม', 'รับจัดอบรม In-house Training', 'In-house Training สำหรับองค์กร', 'จัดอบรมภายในองค์กร']
  },
  {
    url: '/leadership-development',
    h1: 'หลักสูตรพัฒนาผู้นำและ Leadership Development',
    intent: 'Commercial',
    description: 'ยกระดับผู้นำทุกระดับ จากผู้สั่งการสู่ Facilitative Leader ที่สร้างแรงบันดาลใจและขับเคลื่อนผลลัพธ์',
    keywords: ['พัฒนาผู้นำ', 'Leadership Development', 'หลักสูตรผู้นำ', 'Transformational Leadership', 'อบรมหัวหน้างาน']
  },
  {
    url: '/team-building',
    h1: 'Team Building และการพัฒนาทีมสำหรับองค์กร',
    intent: 'Commercial',
    description: 'สร้าง Team Synergy และ Psychological Safety ทลายกำแพง Silo สู่ทีมที่ร่วมมือกันอย่างแท้จริง',
    keywords: ['Team Building องค์กร', 'พัฒนาทีมงาน', 'Team Synergy', 'Psychological Safety', 'กิจกรรม Team Building']
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

// Strategic SEO Vocabulary (Top GSC & Market Target)
export const SEO_VOCABULARY = {
  coreKeywords: [
    'บริษัทฝึกอบรม',
    'สถาบันฝึกอบรม',
    'บริษัทจัดฝึกอบรม',
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
  ],
  geoLocations: [
    'กรุงเทพมหานคร',
    'ปทุมธานี',
    'ลำลูกกา',
    'รังสิต',
    'ทั่วประเทศไทย (Onsite & Hybrid)'
  ]
};

// Strategic Positioning
export const BRAND_POSITIONING = {
  layer1_searchIntent: 'บริษัทฝึกอบรม & In-house Training',
  layer2_expertise: 'Leadership • Team • Communication • Facilitation • OD',
  layer3_differentiator: 'Transformative Learning & Facilitation by Kru Den Master Fa',
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
    question: "บริษัทฝึกอบรม หรือ สถาบันฝึกอบรม CAP Vision ให้บริการด้านใดบ้าง?",
    answer: "CAP Vision Institute เป็นสถาบันและบริษัทจัดฝึกอบรม In-house Training ครบวงจร ให้บริการออกแบบหลักสูตรพัฒนาบุคลากรเฉพาะองค์กร (Customized Learning) ทั้งหลักสูตรภาวะผู้นำ (Leadership), Team Building, การสื่อสารองค์กร (Communication), Service Mind และการให้คำปรึกษาพัฒนาองค์กร (OD Consulting) โดย ครูเด่น มาสเตอร์ฟา"
  },
  {
    question: "ควรจัดอบรม In-house Training หัวข้ออะไรดีสำหรับปี 2026?",
    answer: "หลักสูตรยอดนิยมสำหรับองค์กรยุคนี้คือ Facilitative Leadership, Growth Mindset, Effective & Empathetic Communication, Team Synergy และ OKRs ซึ่งทีมวิทยากรจะออกแบบเนื้อหาให้ตรงกับปัญหาและเป้าหมายขององค์กรอย่างแท้จริง"
  },
  {
    question: "ทำไมถึงควรเลือก CAP Vision Institute สำหรับการพัฒนาบุคลากร?",
    answer: "เพราะเราไม่ใช่แค่สอนทฤษฎี แต่เน้นการสร้าง 'กระบวนการเรียนรู้เชิงประสบการณ์' (Experiential Facilitation) ให้ผู้เข้าอบรมได้คิด ค้นพบ และนำไปใช้จริง โดย ครูเด่น มาสเตอร์ฟา ที่มีประสบการณ์ฝึกอบรมองค์กรชั้นนำกว่า 18 ปี"
  },
  {
    question: "CAP Vision Institute ให้บริการจัดฝึกอบรมในพื้นที่ใดบ้าง (Local / Onsite)?",
    answer: "เราให้บริการจัดฝึกอบรมนอกสถานที่ (On-site Training) ถึงสถานประกอบการของลูกค้าทั่วประเทศ ทั้งกรุงเทพมหานคร, ปทุมธานี (โซนรังสิต/ลำลูกกา), สมุทรปราการ, ชลบุรี, ระยอง และต่างจังหวัดทั่วไทย รวมถึงรูปแบบ Online Interactive Workshop"
  },
  {
    question: "Soft Skills ไหนจำเป็นที่สุดสำหรับพนักงานในปัจจุบัน?",
    answer: "ทักษะที่สำคัญที่สุดคือ Empathy, Adaptability และ Complex Problem Solving ซึ่งเป็นรากฐานของการทำงานร่วมกันในยุค AI และการเปลี่ยนแปลงอย่างรวดเร็ว"
  },
  {
    question: "มีหลักสูตรสำหรับหัวหน้างานมือใหม่ (New Manager) หรือไม่?",
    answer: "มีครับ เรามีหลักสูตร 'จาก Manager สู่ Coach & Facilitator' ที่จะช่วยปรับ Mindset และติดอาวุธทักษะที่จำเป็น เช่น การมอบหมายงาน, การรับฟังอย่างเข้าใจ, การโค้ชทีม และการประเมินผลอย่างสร้างสรรค์"
  },
  {
    question: "CAP Vision Institute รองรับการอบรมกี่คนต่อรุ่น?",
    answer: "หลักสูตร In-house Training รองรับตั้งแต่ 20-200 คน ขึ้นอยู่กับรูปแบบ Workshop หรือ Seminar ทีมงานจะออกแบบกระบวนการให้เหมาะสมกับจำนวนและเป้าหมายขององค์กร"
  },
  {
    question: "CAP Theory คืออะไร และช่วยองค์กรได้อย่างไร?",
    answer: "CAP Theory คือกรอบการพัฒนาของ CAP Vision Institute ประกอบด้วย C=Competence (ทักษะ), A=Attitude (ทัศนคติ), P=Performance (ผลลัพธ์) โดยเชื่อว่าการเปลี่ยน Attitude และ Mindset คือกุญแจสำคัญที่ทำให้ทักษะและผลลัพธ์เติบโตอย่างยั่งยืน"
  },
  {
    question: "การอบรมแบบ Facilitation ต่างจากการบรรยายทั่วไปอย่างไร?",
    answer: "การบรรยายคือวิทยากรพูด ผู้เรียนฟัง แต่ Facilitation คือกระบวนการที่ทำให้ผู้เรียนคิดเอง ค้นพบคำตอบเอง และเปลี่ยนแปลงพฤติกรรมจากข้างใน ทำให้เกิดความร่วมมือและนำไปใช้จริงได้มากกว่าอย่างชัดเจน"
  },
  {
    question: "องค์กรจะวัดผลลัพธ์หลังการอบรมได้อย่างไร?",
    answer: "CAP Vision Institute มีระบบวัดผล Pre-Post Assessment และ Action Plan Tracking เพื่อให้องค์กรเห็นผลลัพธ์ ROI และพฤติกรรมที่เปลี่ยนแปลง พร้อมรายงานสรุปผลลัพธ์ให้ฝ่าย HR และผู้บริหาร"
  },
  {
    question: "มีบริการ Coaching สำหรับผู้บริหารระดับสูงหรือไม่?",
    answer: "มีครับ บริการ Executive Coaching ของครูเด่น มาสเตอร์ฟา ออกแบบเฉพาะสำหรับ CEO, MD และผู้บริหารระดับสูง เน้นการสะท้อนคิด ปลดล็อก Mindset และวางกลยุทธ์การนำพาองค์กร"
  },
  {
    question: "ติดต่อขอใบเสนอราคา In-house Training ได้อย่างไร?",
    answer: "สามารถติดต่อขอรับคำปรึกษาและใบเสนอราคาได้ทาง LINE @denmasterfa หรือโทร 093-223-5919 ทีมงานจะติดต่อกลับพร้อมส่งข้อเสนอหลักสูตรและใบเสนอราคาภายใน 24 ชั่วโมง"
  }
];
