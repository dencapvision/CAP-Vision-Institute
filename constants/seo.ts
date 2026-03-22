
// HRD keyword library + SEO defaults for CAP Vision Institute
// ใช้สำหรับ meta keywords, page-level defaults, และ AEO FAQ planning

// ===== TARGET AUDIENCE KEYWORDS =====
export const HRD_KEYWORDS = {
  // Primary — high search volume, Thai HRD audience
  primary: [
    'หลักสูตรฝึกอบรม',
    'อบรม HRD',
    'หลักสูตร In-house',
    'พัฒนาบุคลากร',
    'ฝึกอบรมองค์กร',
    'สถาบันฝึกอบรม',
    'หลักสูตรพัฒนาตนเอง',
  ],
  // Secondary — specific course types
  secondary: [
    'อบรม Service Mind',
    'อบรม Team Building',
    'หลักสูตรผู้นำ',
    'Growth Mindset workshop',
    'Effective Communication training',
    'Creative Problem Solving',
    'Leadership Development',
  ],
  // GEO — location-based for local SEO
  geo: [
    'ฝึกอบรมกรุงเทพ',
    'สถาบันฝึกอบรม Bangkok',
    'อบรมบุคลากรไทย',
    'Training Provider Thailand',
    'In-house Training กรุงเทพ',
  ],
  // Brand
  brand: [
    'CAP Vision Institute',
    'ครูเด่น มาสเตอร์ฟา',
    'Master Facilitator',
    'capvisionpartner',
  ],
} as const;

// ===== PAGE-LEVEL SEO DEFAULTS =====
export interface PageSEODefaults {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  schemaType?: 'WebSite' | 'Course' | 'Article' | 'FAQPage' | 'EducationalOrganization';
}

export const PAGE_SEO: Record<string, PageSEODefaults> = {
  home: {
    title: 'CAP Vision Institute | สถาบันฝึกอบรมพัฒนาบุคลากรครบวงจร',
    description:
      'สถาบันฝึกอบรมพัฒนาบุคลากร ด้วยหลักสูตร In-house Training, Growth Mindset, Service Mind, Team Building, Leadership โดยครูเด่น มาสเตอร์ฟา ผู้เชี่ยวชาญการพัฒนาองค์กร',
    keywords: [
      ...HRD_KEYWORDS.primary,
      ...HRD_KEYWORDS.brand,
      ...HRD_KEYWORDS.geo,
    ],
    ogImage: 'https://www.visionpartner.com/og-home.jpg',
    schemaType: 'EducationalOrganization',
  },
  courses: {
    title: 'หลักสูตรฝึกอบรม In-house Training | CAP Vision Institute',
    description:
      'รวมหลักสูตรฝึกอบรมสำหรับ HRD: Service Mind, Team Building, Creative Problem Solving, Effective Communication, Leadership — ออกแบบ In-house ตามความต้องการองค์กร',
    keywords: [
      ...HRD_KEYWORDS.primary,
      ...HRD_KEYWORDS.secondary,
    ],
    ogImage: 'https://www.visionpartner.com/og-courses.jpg',
    schemaType: 'Course',
  },
  about: {
    title: 'เกี่ยวกับ CAP Vision Institute | สถาบันพัฒนาศักยภาพผู้นำ',
    description:
      'CAP Vision Institute สถาบันพัฒนาศักยภาพผู้นำและฝึกอบรมครบวงจร นำโดย ครูเด่น มาสเตอร์ฟา นักออกแบบกระบวนการเรียนรู้ (Master Facilitator) ประสบการณ์กว่า 15 ปี',
    keywords: [
      ...HRD_KEYWORDS.brand,
      'สถาบันพัฒนาผู้นำ',
      'Master Facilitator Thailand',
    ],
    schemaType: 'EducationalOrganization',
  },
  resources: {
    title: 'คลังความรู้ HRD | บทความพัฒนาบุคลากร | CAP Vision Institute',
    description:
      'บทความและคลังความรู้สำหรับ HRD: เทคนิคการฝึกอบรม, Growth Mindset, Leadership, การพัฒนาทีม — อัพเดตใหม่ทุกสัปดาห์',
    keywords: [
      'บทความ HRD',
      'ความรู้พัฒนาบุคลากร',
      'เทคนิคฝึกอบรม',
      ...HRD_KEYWORDS.secondary,
    ],
    schemaType: 'Article',
  },
  contact: {
    title: 'ติดต่อ / ขอใบเสนอราคา In-house Training | CAP Vision Institute',
    description:
      'ติดต่อขอใบเสนอราคาหลักสูตรฝึกอบรม In-house สำหรับองค์กรของท่าน — ปรึกษาฟรี โทร หรือ LINE ได้เลย',
    keywords: [
      'ขอใบเสนอราคาอบรม',
      'ติดต่อสถาบันฝึกอบรม',
      'In-house Training ราคา',
      ...HRD_KEYWORDS.geo,
    ],
  },
};

// ===== FAQS — สำหรับ AEO (Featured Snippets / People Also Ask) =====
export const HRD_FAQS = [
  {
    question: 'In-house Training คืออะไร?',
    answer:
      'In-house Training คือการจัดฝึกอบรมภายในองค์กร โดยสถาบันฝึกอบรมจะออกแบบหลักสูตรเฉพาะให้ตรงกับความต้องการของบริษัท ประหยัดต้นทุน และพนักงานทุกคนได้รับการฝึกอบรมพร้อมกัน',
  },
  {
    question: 'CAP Vision Institute มีหลักสูตรอะไรบ้าง?',
    answer:
      'มีหลักสูตรหลัก 4 กลุ่ม: People Skills (Service Mind, บุคลิกภาพ), Work Skills (Team Building, Creative Problem Solving), Communication Skills (DISC, Effective Communication), และ Leader Skills (Leadership, Growth Mindset)',
  },
  {
    question: 'จะขอใบเสนอราคาอบรม In-house ทำอย่างไร?',
    answer:
      'ติดต่อได้ทาง LINE Official Account หรือโทรตรงที่ฝ่ายการตลาด ทีมงานจะรับรายละเอียดและจัดส่งใบเสนอราคาภายใน 24 ชั่วโมง',
  },
  {
    question: 'หลักสูตรฝึกอบรมใช้เวลานานแค่ไหน?',
    answer:
      'หลักสูตรส่วนใหญ่ใช้เวลา 1 วัน (09.00-16.30 น.) สามารถปรับเป็นครึ่งวันหรือ 2 วันตามความต้องการขององค์กร',
  },
  {
    question: 'ครูเด่น มาสเตอร์ฟา คือใคร?',
    answer:
      'ครูเด่น มาสเตอร์ฟา คือนักออกแบบกระบวนการเรียนรู้ (Master Facilitator) ผู้ก่อตั้ง CAP Vision Institute ผู้เชี่ยวชาญด้าน Growth Mindset, Service Mind, Leadership มากกว่า 15 ปี',
  },
];
