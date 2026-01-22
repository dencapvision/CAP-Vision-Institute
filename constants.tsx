
import React from 'react';
import { Users, User, Award, TrendingUp, Handshake, Target, BookOpen, PlayCircle, Clock, FileText, Download, Layout, Video, Sparkles, Heart, Zap, Globe, Cpu, ShieldCheck, BarChart2, Lightbulb, Puzzle, MessageCircle, BarChart3, LineChart, RefreshCcw, Brain, PenTool, Layers, Rocket, Search, Stethoscope, Calendar, MapPin, HelpCircle, Plus, Smile, Shield, GraduationCap, Laptop, Facebook } from 'lucide-react';

export const COLORS = {
  primaryBlue: '#0f3460', // Deep Navy Professional Blue
  primaryGold: '#c5a059', // Sophisticated Premium Gold
  accentGold: '#e0c58e',  // Lighter gold for highlights
  textDark: '#1a202c',    // Modern neutral dark
  textLight: '#718096',   // Modern neutral light
  bgGray: '#f8fafc',      // Clean light background
};

export const CONTACT_INFO = {
  phone: '093-223-5919',
  email: 'thecapvision@gmail.com',
  line: '@denmasterfa',
  lineUrl: 'https://lin.ee/zRTBF6K',
  facebook: 'thecapvision',
  facebookUrl: 'https://facebook.com/thecapvision',
  youtube: '@thecapvision',
  youtubeUrl: 'https://youtube.com/@thecapvision',
  address: 'Bangkok, Thailand',
  mapsUrl: 'https://goo.gl/maps/abc'
};

export const BRAND_INFO = {
  name: 'CAP Vision Institute',
  thaiName: 'แคป วิชั่น อินสติทิวต์',
  slogan: 'Transform People, Transform Organization',
  director: 'ครูเด่น มาสเตอร์ฟา (อนุสรณ์ หนองนา)',
  vision: 'เชื่อมโยงข้อมูลระดับโลก เพื่อช่วยให้บุคคลและองค์กรค้นพบทุกกลยุทธ์และพัฒนาศักยภาพสูงสุดในเวลาที่จำกัด',
  mission: [
    'ออกแบบโซลูชันการเรียนรู้ที่ทันสมัย – ผสมผสานแนวคิด Blended Learning และ AI-powered Learning',
    'พัฒนาผู้นำและบุคลากรองค์กร – สร้าง Leadership Development Programs ที่ตอบโจทย์อนาคต',
    'สนับสนุนองค์กรสร้าง Learning Culture – วางรากฐานวัฒนธรรมการเรียนรู้ผ่าน Reskilling & Upskilling',
    'เป็น Facilitator ในการเปลี่ยนแปลง – ใช้เทคนิค Facilitation & Coaching เพื่อพัฒนาแนวคิดและพฤติกรรม',
    'นำเทคโนโลยีมาขับเคลื่อนการเรียนรู้ – สร้างแพลตฟอร์ม Digital Learning Solutions ที่ตอบโจทย์องค์กรยุคใหม่'
  ],
  coreBeliefs: [
    { title: 'Human Potential', desc: 'ศักยภาพมนุษย์ไม่ได้ถูกจำกัดด้วยสภาพแวดล้อม แต่ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง', icon: <Sparkles className="w-6 h-6" /> },
    { title: 'Actionable Learning', desc: 'การเรียนรู้ที่แท้จริงต้องนำไปใช้ได้ทันทีและสร้างการเปลี่ยนแปลง', icon: <Zap className="w-6 h-6" /> },
    { title: 'Inside-Out Growth', desc: 'การเติบโตที่ยั่งยืนเริ่มต้นจากการตระหนักรู้ภายใน (Self-Awareness)', icon: <Heart className="w-6 h-6" /> }
  ]
};

export const CLIENTS = [
  { name: 'Toyota', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Toyota_logo_%28modern%29.svg' },
  { name: 'Dell Technologies', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg' },
  { name: 'Betagro', type: 'Corporate', logo: 'https://www.betagro.com/img/logo-betagro.svg' },
  { name: 'AOT', type: 'State Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Airports_of_Thailand_Logo.svg' },
  { name: 'EXAT', type: 'State Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/th/4/4e/EXAT_Logo.png' },
  { name: 'PEA', type: 'State Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/f/f6/PEA_Logo.svg/1200px-PEA_Logo.svg.png' },
  { name: 'Land & Houses', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/3/30/Land_and_Houses_logo.svg/1280px-Land_and_Houses_logo.svg.png' },
  { name: 'Central Food Retail', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Central_Group_logo.svg' },
  { name: 'Universal Robina', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/URC_Logo.svg' },
  { name: 'ศอบต.', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/d/d4/SBPAC_Logo.png' },
  { name: 'สสส. SOOK', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/e/e0/Thai_Health_Promotion_Foundation_Logo.png/640px-Thai_Health_Promotion_Foundation_Logo.png' },
  { name: 'กรมวิทยาศาสตร์บริการ', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/7/7b/Logo_DSS_Thailand.svg/1200px-Logo_DSS_Thailand.svg.png' },
  { name: 'มหาวิทยาลัยศรีนครินทรวิโรฒ', type: 'Academic', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/6/6f/SWU_Seal.png/600px-SWU_Seal.png' },
  { name: 'มหาวิทยาลัยราชภัฏสกลนคร', type: 'Academic', logo: 'https://upload.wikimedia.org/wikipedia/th/9/9c/SNRU_Logo.png' },
  { name: 'มหาวิทยาลัยราชภัฏยะลา', type: 'Academic', logo: 'https://upload.wikimedia.org/wikipedia/th/0/0f/YRU_Logo.png' },
  { name: 'TISTR วว.', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/1/11/TISTR_Logo.png' }
];

export const TIMELINE = [
  { year: '2552', title: 'จุดเริ่มต้น CAP Vision', desc: 'ก่อตั้งขึ้นจากความเชื่อที่ว่าศักยภาพมนุษย์ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง มุ่งเน้นการพัฒนาจากภายใน' },
  { year: '2554 - 2558', title: 'ภารกิจเพื่อสังคมและชุมชน (ศอบต.)', desc: 'ลงพื้นที่ภาคใต้ช่วยเหลือผู้ได้รับผลกระทบจากเหตุการณ์ความไม่สงบ พิสูจน์ว่าการเรียนรู้สามารถเปลี่ยนแปลงชีวิตและสังคมได้จริง' },
  { year: '2561', title: 'DFA Model Generation', desc: 'คิดค้นและพัฒนาหลักสูตร Dynamic Learning Design (DFA) ที่เป็นเอกลักษณ์ เชื่อมโยง Transformative Learning' },
  { year: 'ปัจจุบัน', title: 'Transformation Partner', desc: 'เป็นผู้นำด้าน L&D ที่เชื่อมโยงองค์ความรู้สมัยใหม่เข้ากับ Digital Learning และ AI Solutions' }
];

export interface Speaker {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  longBio: string;
  expertise: string[];
  achievements: string[];
  socials?: {
    line?: string;
    facebook?: string;
    tiktok?: string;
  };
}

export const SPEAKERS: Speaker[] = [
  {
    id: 'den-master-fa',
    name: 'อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)',
    title: 'ผู้อำนวยการและมาสเตอร์ฟาซิลิตเทเตอร์',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    bio: 'ผู้อำนวยการสถาบันแคป วิชั่น ผู้เชี่ยวชาญด้าน Transformative Learning ประสบการณ์ 18 ปี',
    longBio: 'วิทยากรผู้สร้างการเปลี่ยนแปลงจากภายใน (Communication Healer and Facilitator) เจ้าของโมเดล DFA Strategy และผู้ก่อตั้ง FFT – Facilitator for Thailand มุ่งเน้นการสร้าง Human Capital ผ่านกระบวนการที่สนุก (Edutainment) และมีส่วนร่วมสูง โดยใช้จิตวิทยาเชิงบวกและการโค้ชด้าน Mindfulness & Meditation',
    expertise: [
      'Transformative Learning & Flow Design',
      'Communication Styles (C.O.D. Model)',
      'Facilitation & Coaching Techniques',
      'Team & Leadership Development',
      'Mindfulness in Business'
    ],
    achievements: [
      'ประสบการณ์กว่า 18 ปี ในการพัฒนาบุคลากรทั้งภาครัฐและเอกชน',
      'นักจัดและพัฒนาเวิร์กชอปมากกว่า 1,000 เวที',
      'วิทยากรที่ปรึกษาด้านนวัตกรรมบริการและการสร้างทีม',
      'ที่ปรึกษาด้าน AI สำหรับธุรกิจสมัยใหม่'
    ],
    socials: {
      line: '@denmasterfa',
      facebook: 'thecapvision'
    }
  }
];

export interface CourseDetailInfo {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  longDescription?: string;
  objectives?: string[];
  instructor?: {
    id?: string;
    name: string;
    bio: string;
    image: string;
  };
  duration?: string;
  audience?: string;
  why?: { label: string; stat: string; desc: string; icon?: React.ReactNode }[];
  how?: { title: string; desc: string; icon?: React.ReactNode }[];
  what?: string[];
}

export const COURSES: CourseDetailInfo[] = [
  {
    id: 'service-mind-excellence',
    title: 'หลักสูตร ใช้หัวใจบริการ คนสำราญ งานสำเร็จ (Service Mind)',
    category: 'People Skills',
    description: 'สร้างความแตกต่างด้วยหัวใจบริการ พร้อมปรับบุคลิกภาพแห่งตัวตนอย่างแท้จริง',
    image: 'https://images.unsplash.com/photo-1556740734-7f9a2b7a0f4d?auto=format&fit=crop&q=80',
    longDescription: 'หลักสูตรที่มุ่งเน้นการสร้างบุคลิกภาพแห่งตัวตน (Smart Personality) ทั้งด้านทักษะความรู้และความเข้าใจในหลักการให้บริการด้วยใจ (Service Mind) โดยใช้จิตวิทยาการบริการอย่างมีศิลปะเพื่อภาพลักษณ์องค์กรที่ดีเยี่ยม',
    duration: '1 วัน (09.00 - 16.30 น.)',
    audience: 'พนักงานส่วนหน้า (Front-line), เจ้าหน้าที่บริการลูกค้า, พนักงานทุกคนในองค์กร',
    why: [
      { label: 'ดัชนีความสุขผู้รับบริการ', stat: '98%', desc: 'ยกระดับความพึงพอใจด้วยการบริการที่เหนือความคาดหมาย', icon: <Smile /> },
      { label: 'ภาพลักษณ์องค์กร', stat: '100%', desc: 'สร้างความเชื่อมั่นผ่านการสื่อสารที่เป็นมืออาชีพ', icon: <ShieldCheck /> }
    ],
    how: [
      { title: 'Smart Personality', desc: 'ปรับบุคลิกภาพและสร้างเสน่ห์สำหรับผู้ให้บริการ', icon: <Layout /> },
      { title: 'Empathy Analysis', desc: 'วิเคราะห์ความต้องการของผู้รับบริการ 4 ประเภท', icon: <Search /> },
      { title: 'Conflict Management', desc: 'ทักษะการจัดการอารมณ์และสถานการณ์ยากลำบาก', icon: <Zap /> }
    ],
    what: [
      'Personality Adjustment for Service Excellence',
      'Effective Communication & Peace Communication',
      'Emotional Intelligence in Service',
      'Scenario-based Management Workshop'
    ],
    objectives: [
      'เข้าใจประโยชน์ของคุณค่าการบริการต่อตนเองและองค์กร',
      'พัฒนาบุคลิกภาพให้น่าเชื่อถือและมีเสน่ห์ดึงดูด',
      'เรียนรู้ทักษะการฟังเชิงลึก (Deep Listening)',
      'ฝึกทัศนคติเชิงบวกต่อการพัฒนาตนเองและเพื่อนร่วมงาน'
    ],
    instructor: {
      id: 'den-master-fa',
      name: 'ครูเด่น มาสเตอร์ฟา',
      bio: 'ที่ปรึกษาองค์กรและนักพัฒนาทักษะการสื่อสารเพิ่มพลังบวก',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'creative-problem-solving',
    title: 'หลักสูตร การแก้ปัญหาอย่างสร้างสรรค์ (Creative Problem Solving)',
    category: 'Work Skills',
    description: 'แตกปัญหาเพื่อหาทางออกด้วยกระบวนการคิดที่เป็นระบบและสร้างสรรค์',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    longDescription: 'กระบวนการที่สอนให้เราแตกปัญหาเพื่อทำความเข้าใจ สร้างแนวคิด และประเมินความคิดเหล่านั้นเพื่อหาทางออกที่มีประสิทธิภาพสูงสุด ตามหลักสูตรระดับสากล (Buffalo College, New York)',
    duration: '1 วัน (09.00 - 16.30 น.)',
    audience: 'พนักงานระดับปฏิบัติการ, หัวหน้างาน, ผู้จัดการโครงการ',
    why: [
      { label: 'นวัตกรรมใหม่', stat: '45%', desc: 'เพิ่มขีดความสามารถในการสร้างทางเลือกที่แตกต่าง', icon: <Lightbulb /> },
      { label: 'ประสิทธิภาพงาน', stat: '3X', desc: 'แก้ปัญหาได้รวดเร็วและแม่นยำขึ้นด้วยกระบวนการ 7 ขั้นตอน', icon: <Target /> }
    ],
    how: [
      { title: 'Growth Mindset Workshop', desc: 'ปรับทัศนคติการเผชิญปัญหาผ่านกิจกรรม Gain & Loss', icon: <Brain /> },
      { title: '7-Steps CPS Process', desc: 'เรียนรู้ขั้นตอนตั้งแต่ระบุปัญหาจนถึงการนำไปใช้งานจริง', icon: <Layers /> },
      { title: 'Facilitating Cards', desc: 'ใช้เครื่องมือกระตุ้นไอเดียเพื่อเปลี่ยนปัญหาเป็นความท้าทาย', icon: <Zap /> }
    ],
    what: [
      'Growth Mindset in Problem Solving',
      'The 7 Steps of Creative Problem Solving',
      'Relationship & Internal Communication Problems',
      'Strategic Action Planning'
    ],
    objectives: [
      'ระบุและวิจัยปัญหาที่แท้จริงได้อย่างแม่นยำ',
      'สร้างแนวคิด (Ideation) ที่หลากหลายแบบ No Judgment',
      'จัดทำแผนปฏิบัติการ (Action Plan) ที่เป็นรูปธรรม',
      'ตอบสนองต่อสิ่งเร้าอย่างมีสติและมีเหตุผล'
    ],
    instructor: {
      id: 'den-master-fa',
      name: 'ครูเด่น มาสเตอร์ฟา',
      bio: 'นักออกแบบกระบวนการเรียนรู้ (Dynamic Learning Designer)',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    }
  }
];

export const RESOURCE_ARTICLES = [
  {
    id: 'training-management-guide',
    title: 'Training Management 101: 4 ขั้นตอนปั้นแผนพัฒนาคนให้เห็นผลจริง (T1-T4 Cycle)',
    category: 'HRD Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    excerpt: 'การทำ TNA (Training Needs Analysis) ให้แม่นยำคือจุดเริ่มต้นของความสำเร็จ เจาะลึกสมการ E - A = G และความต่างระหว่าง "Wants" vs "Needs" ที่ HR ต้องรู้'
  },
  {
    id: 'learning-organization-key',
    title: 'สร้างองค์กรแห่งการเรียนรู้: กุญแจสำคัญสู่ความสำเร็จในยุคเปลี่ยนผ่าน',
    category: 'Corporate Culture',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    excerpt: 'การเรียนรู้ไม่ใช่ทางเลือก แต่มันคือความอยู่รอดขององค์กร เจาะลึกกรณีศึกษา Microsoft และ 3 ขั้นตอนสร้าง Learning DNA'
  },
  {
    id: 'development-70-20-10',
    title: 'ปลดล็อกศักยภาพพนักงานด้วยโมเดล 70/20/10 Development Model',
    category: 'People Skills',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    excerpt: 'ทำไมการเข้าห้องอบรมถึงให้ผลลัพธ์เพียง 10%? มาทำความเข้าใจสัดส่วนการเรียนรู้ที่ทรงประสิทธิภาพที่สุดสำหรับการพัฒนาบุคลากรยุคใหม่'
  }
];

export const MICRO_LEARNING_VIDEOS = [
  {
    id: 'vid-1',
    title: 'เทคนิคการฟังแบบ Deep Listening',
    category: 'Communication Skills',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    duration: '3:45'
  }
];

export const DOWNLOAD_RESOURCES = [
  {
    id: 'tna-toolkit',
    title: 'TNA Framework & Questionnaire (Thai version)',
    type: 'PDF / EXCEL',
    category: 'HRD Partner',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80'
  },
  {
    id: 'roi-calculator',
    title: 'สูตรคำนวณ ROI การฝึกอบรม (Cheat Sheet)',
    type: 'PDF',
    category: 'Business Result',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80'
  }
];

// Mock data for Online Courses
export const ONLINE_COURSES = [
  {
    id: 'leadership-mastery',
    title: 'Leadership Mastery: DFA Strategy',
    category: 'Leader Skills',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    progress: 45,
    duration: '12 ชม.',
    lessons: 24,
    instructor: 'ครูเด่น มาสเตอร์ฟา',
    price: 5900,
    curriculum: [
      { title: 'Introduction to Leadership', duration: '15:00', completed: true },
      { title: 'The DFA Model', duration: '45:00', completed: false, resources: [{ name: 'DFA Guide', url: '#' }], quiz: [{ question: 'What does D stand for?', options: ['Dynamic', 'Digital', 'Design'], answer: 0 }] }
    ]
  }
];

export const SERVICES = [
  {
    id: 'in-house-training',
    title: 'In-house Training',
    description: 'ออกแบบหลักสูตรพัฒนาบุคลากรที่ตอบโจทย์เฉพาะองค์กรของคุณ',
    icon: <GraduationCap className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80'
  },
  {
    id: 'executive-coaching',
    title: 'Executive Coaching',
    description: 'การโค้ชผู้บริหารเพื่อดึงศักยภาพและสร้างภาวะผู้นำที่เหนือระดับ',
    icon: <Users className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1517048676732-d676936d9b2c?auto=format&fit=crop&q=80'
  },
  {
    id: 'od-consulting',
    title: 'OD Consulting',
    description: 'ที่ปรึกษาการพัฒนาองค์กรและวัฒนธรรมแห่งการเรียนรู้',
    icon: <Target className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'
  }
];

export const TRAINING_INFO = {
  title: 'Corporate Training Solutions',
  slogan: 'ยกระดับองค์กรด้วยการพัฒนาคนอย่างมีระบบ',
  why: [
    { label: 'Growth Mindset', stat: '85%', desc: 'พนักงานมีทัศนคติที่พร้อมเติบโตและรับความท้าทายใหม่', icon: <TrendingUp /> },
    { label: 'Team Synergy', stat: '92%', desc: 'ความร่วมมือในทีมเพิ่มขึ้นอย่างเห็นได้ชัด', icon: <Users /> },
    { label: 'Productivity', stat: '40%', desc: 'ประสิทธิภาพการทำงานสูงขึ้นผ่านกระบวนการที่ถูกต้อง', icon: <Zap /> }
  ]
};

export const TRANSFORMATIVE_LEARNING_INFO = {
  title: 'Transformative Learning',
  slogan: 'การเรียนรู้ที่สร้างการเปลี่ยนแปลงจากภายในสู่ภายนอก',
  why: [
    { label: 'Awareness', stat: '100%', desc: 'สร้างความตระหนักรู้ในตนเอง', icon: <Heart /> },
    { label: 'Insight', stat: '90%', desc: 'เกิดการเรียนรู้จากความเข้าใจที่แท้จริง', icon: <Zap /> },
    { label: 'Action', stat: '95%', desc: 'นำไปสู่การปฏิบัติที่เห็นผลจริง', icon: <Target /> }
  ],
  how: [
    { title: 'Activity Based', desc: 'เรียนรู้ผ่านกิจกรรมและการลงมือทำ', icon: <Layout /> },
    { title: 'Facilitation', desc: 'กระบวนการอำนวยความสะดวกในการเรียนรู้', icon: <MessageCircle /> },
    { title: 'Reflection', desc: 'การสะท้อนคิดเพื่อถอดบทเรียน', icon: <Brain /> },
    { title: 'Coaching', desc: 'การโค้ชเพื่อดึงศักยภาพเฉพาะตัว', icon: <Users /> }
  ],
  what: [
    'Inside-Out Transformation Program',
    'Self-Awareness & EQ Workshop',
    'Communication Healer Series',
    'Mindfulness in Business'
  ]
};

export const FACILITATION_TRAINING_INFO = {
  title: 'Facilitation Skills Training',
  slogan: 'ศิลปะการอำนวยความสะดวกเพื่อการเรียนรู้ที่มีประสิทธิภาพ',
  why: [
    { label: 'Engagement', stat: '98%', desc: 'ผู้เรียนมีส่วนร่วมในกระบวนการอย่างเต็มที่', icon: <Users /> },
    { label: 'Flow State', stat: '88%', desc: 'บรรยากาศการเรียนรู้ที่ลื่นไหลและสนุกสนาน', icon: <Sparkles /> },
    { label: 'Transfer', stat: '90%', desc: 'การถ่ายทอดความรู้ที่นำไปใช้ได้จริง', icon: <Zap /> }
  ],
  how: [
    { title: 'DFA Model', desc: 'Dynamic, Flow, Art of Growth strategy', icon: <Layers /> },
    { title: 'Tools & Cards', desc: 'ใช้เครื่องมือประกอบการทำกิจกรรม', icon: <Layout /> },
    { title: 'Practice', desc: 'ฝึกปฏิบัติจริงในทุกหัวข้อ', icon: <PenTool /> },
    { title: 'Feedback', desc: 'การให้คำแนะนำเพื่อการพัฒนา', icon: <MessageCircle /> }
  ],
  what: [
    'Professional Facilitator Certification',
    'Dynamic Learning Design Workshop',
    'Visual Facilitation Techniques',
    'Game-based Learning Design'
  ]
};

export const TEAM_LEADERSHIP_INFO = {
  title: 'Team & Leadership Development',
  slogan: 'สร้างผู้นำและทีมงานที่เปี่ยมด้วยพลังแห่งความร่วมมือ',
  why: [
    { label: 'Trust', stat: '100%', desc: 'สร้างความไว้วางใจภายในทีม', icon: <Heart /> },
    { label: 'Vision', stat: '95%', desc: 'เป้าหมายที่ชัดเจนและเป็นหนึ่งเดียว', icon: <Target /> },
    { label: 'Impact', stat: '3X', desc: 'สร้างผลลัพธ์ที่มากกว่าการทำงานคนเดียว', icon: <Rocket /> }
  ],
  how: [
    { title: 'Leadership DNA', desc: 'ค้นหาและพัฒนาจุดแข็งของผู้นำ', icon: <Cpu /> },
    { title: 'Team Building', desc: 'กิจกรรมสร้างทีมสัมพันธ์ที่เห็นผลจริง', icon: <Users /> },
    { title: 'Communication', desc: 'ทักษะการสื่อสารเพื่อการทำงานร่วมกัน', icon: <MessageCircle /> },
    { title: 'Strategy', desc: 'การวางแผนและการตัดสินใจเชิงกลยุทธ์', icon: <BarChart3 /> }
  ],
  what: [
    'The Modern Leader Program',
    'High Performance Team Workshop',
    'Strategic Leadership Retreat',
    'Team Synergy & Collaboration'
  ]
};

export const OD_CONSULTING_INFO = {
  title: 'OD Consulting & Strategy',
  slogan: 'วางกลยุทธ์การพัฒนาองค์กรสู่ความยั่งยืน',
  why: [
    { label: 'Culture', stat: '100%', desc: 'สร้างวัฒนธรรมองค์กรที่แข็งแกร่ง', icon: <Shield /> },
    { label: 'Efficiency', stat: '50%', desc: 'เพิ่มประสิทธิภาพกระบวนการทำงาน', icon: <Zap /> },
    { label: 'Succession', stat: '90%', desc: 'การวางแผนสืบทอดตำแหน่งและคนเก่ง', icon: <Award /> }
  ],
  how: [
    { title: 'TNA Analysis', desc: 'วิเคราะห์ความต้องการพัฒนาที่แท้จริง', icon: <Search /> },
    { title: 'Roadmap Design', desc: 'ออกแบบแผนพัฒนาบุคลากรระยะยาว', icon: <MapPin /> },
    { title: 'Evaluation', desc: 'การประเมินผลและการติดตามผล', icon: <BarChart3 /> },
    { title: 'Consulting', desc: 'การให้คำปรึกษาเชิงลึกโดยผู้เชี่ยวชาญ', icon: <User /> }
  ],
  what: [
    'Corporate Culture Design',
    'Strategic HRD Consulting',
    'Succession Planning & Talent Management',
    'Change Management Strategy'
  ]
};

export const FAQS = [
  {
    question: 'สถาบันแคป วิชั่น รับจัดอบรมทั่วประเทศหรือไม่?',
    answer: 'ใช่ครับ เราให้บริการจัดอบรมทั้งแบบ In-house และ Seminar ทั่วประเทศไทย รวมถึงการจัดอบรมผ่านระบบออนไลน์สำหรับองค์กรที่มีหลายสาขา'
  },
  {
    question: 'สามารถปรับแต่งเนื้อหาหลักสูตรให้ตรงกับโจทย์ขององค์กรได้หรือไม่?',
    answer: 'แน่นอนครับ จุดเด่นของเราคือการ Customized Training โดยเราจะทำการวิเคราะห์ปัญหาและความต้องการ (TNA) ก่อนออกแบบหลักสูตรเสมอ'
  },
  {
    question: 'มีวิทยากรท่านอื่นนอกจากครูเด่นหรือไม่?',
    answer: 'ทางสถาบันมีเครือข่ายวิทยากรและ Facilitator มืออาชีพที่ผ่านการรับรองมาตรฐานของ CAP Vision เพื่อรองรับกลุ่มผู้เข้าอบรมจำนวนมากหรือหัวข้อเฉพาะทางครับ'
  }
];

export const SERVICES_LIST = [
  { title: 'In-house Training', desc: 'ออกแบบหลักสูตรพัฒนาบุคลากรที่ตอบโจทย์เฉพาะองค์กร', icon: <GraduationCap className="w-8 h-8" /> },
  { title: 'Executive Coaching', desc: 'การโค้ชผู้บริหารเพื่อดึงศักยภาพและสร้างภาวะผู้นำ', icon: <Users className="w-8 h-8" /> },
  { title: 'OD Consulting', desc: 'ที่ปรึกษาการพัฒนาองค์กรและวัฒนธรรมแห่งการเรียนรู้', icon: <Target className="w-8 h-8" /> },
  { title: 'Digital Learning', desc: 'แพลตฟอร์มการเรียนรู้ออนไลน์สำหรับองค์กรยุคใหม่', icon: <Laptop className="w-8 h-8" /> }
];

export const EVENT_INFO = {
  title: 'Events & Communities',
  slogan: 'พื้นที่แห่งการเรียนรู้และแบ่งปันประสบการณ์',
  why: [
    { label: 'Connection', stat: '1000+', desc: 'เครือข่ายนักพัฒนาทรัพยากรมนุษย์และวิทยากร', icon: <Users /> },
    { label: 'Update', stat: 'Weekly', desc: 'อัปเดตเทรนด์การเรียนรู้ใหม่ๆ เสมอ', icon: <RefreshCcw /> },
    { label: 'Impact', stat: 'High', desc: 'สร้างแรงบันดาลใจเพื่อการเปลี่ยนแปลง', icon: <Zap /> }
  ],
  schedule: [
    { id: 1, date: '25 มี.ค. 2567', title: 'The Modern Facilitator Workshop', speaker: 'ครูเด่น มาสเตอร์ฟา', location: 'Bangkok / Online', link: '#' },
    { id: 2, date: '10 เม.ย. 2567', title: 'Leadership DNA for HR Leaders', speaker: 'ทีมวิทยากร CAP Vision', location: 'Hotel in Bangkok', link: '#' }
  ],
  communities: [
    { platform: 'Facebook Group', name: 'Facilitator for Thailand', link: 'https://facebook.com/groups/denmasterfa', icon: <Facebook /> },
    { platform: 'LINE OpenChat', name: 'Learning Designer Community', link: 'https://line.me/ti/g2/denmasterfa', icon: <MessageCircle /> }
  ]
};
