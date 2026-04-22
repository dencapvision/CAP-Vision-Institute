
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
  email: 'dencapvision@gmail.com',
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
  { name: 'Tops (Central Food Retail)', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/central%20food%20retail%20(CFR).png' },
  { name: 'Mr.D.I.Y. (Thailand)', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Mr-DIY-logo.png' },
  { name: 'AOT', type: 'State Enterprise', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Airports_of_Thailand_Logo.svg.png' },
  { name: 'PEA', type: 'State Enterprise', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/PEA.png' },
  { name: 'Land & Houses', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/landandhouses.jpg' },
  { name: 'Toyota', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Toyota_Symbol.svg.png' },
  { name: 'Dell Technologies', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Dell%20Corperation%20(Thailand)%20Co.,%20Ltd..png' },
  { name: 'Betagro', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Betagro.png' },
  { name: 'EXAT', type: 'State Enterprise', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/EXAT.png' },
  { name: 'Universal Robina', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Universal_Robina-Logo.wine.png' },
  { name: 'ศอบต.', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/sbpac.go.th.jpg' },
  { name: 'สสส. SOOK', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/sook.png' },
  { name: 'กรมวิทยาศาสตร์บริการ', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/dss.go.th.png' },
  { name: 'สภากาชาดไทย', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Thai_Red_Cross_Society_Logo_(2022).svg' },
  { name: 'มหาวิทยาลัยศรีนครินทรวิโรฒ', type: 'Academic', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/SWU.png' },
  { name: 'TISTR วว.', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/tistr.or.th.svg' }
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
    name: 'อ.อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)',
    title: 'ผู้อำนวยการสถาบัน CAP-Vision Institute',
    image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/speakers/Profile_D-MasterFa.webp',
    bio: 'ผู้พัฒนากระบวนการเรียนรู้ (Dynamic Learning Designer) และผู้นำการเปลี่ยนแปลงด้วยแนวคิด Transformative Learning ประสบการณ์กว่า 18 ปี',
    longBio: 'อาจารย์อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา) ผู้อำนวยการสถาบันแคป วิชั่น ผู้เชี่ยวชาญด้าน Transformative Learning และผู้ก่อตั้ง FFT – Facilitator for Thailand เชี่ยวชาญการออกแบบการเรียนรู้แบบ Blended Learning และกระบวนการพัฒนาบุคลากรที่ผสมผสาน AI',
    expertise: [
      'CAP Theory & Learning Design',
      'Communication Psychology & Peace Communication',
      'Transformative Leadership',
      'Mindfulness in Action',
      'Generative Facilitation'
    ],
    achievements: [
      'ประสบการณ์กว่า 18 ปี พัฒนาบุคลากรชั้นนำภาครัฐและเอกชน',
      'ผู้ร่วมก่อตั้ง FFT - Facilitator for Thailand',
      'ผู้ออกแบบโมเดล 6D CPS และ CAP Framework',
      'Certificate of Creative Problem Solving (Buffalo College, NY)'
    ],
    socials: {
      line: 'https://lin.ee/zRTBF6K',
      facebook: 'https://facebook.com/thecapvision'
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
      image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/speakers/Profile_D-MasterFa.webp'
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
      image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/speakers/Profile_D-MasterFa.webp'
    }
  },
  {
    id: 'leadership-mindset-reset',
    title: 'Leadership Mindset Reset: รีเซ็ตวิธีคิดผู้นำ ปลดล็อกศักยภาพทีมทั้งระบบ',
    category: 'Leader Skills',
    description: 'เปลี่ยน "กรอบความคิดเดิม" ที่จำกัดทีม สู่ Mindset ผู้นำยุคใหม่ ที่สร้างทั้งผลงานและคนไปพร้อมกัน ผ่านกระบวนการเรียนรู้แบบ ลงมือทำ + สะท้อนคิด + ตกผลึก',
    image: 'https://images.unsplash.com/photo-1507679799987-c7377bc586df?auto=format&fit=crop&q=80',
    longDescription: 'ผู้นำจำนวนมาก "ทำงานเก่ง" แต่ยังไม่สามารถ "ยกระดับทีม" ได้จริง ไม่ใช่เพราะขาดทักษะ แต่เพราะยังติดอยู่ใน กรอบความคิดเดิม (Old Mindset) หลักสูตรนี้ช่วยให้ผู้นำมองเห็นรูปแบบความคิดของตัวเอง เข้าใจผลกระทบต่อทีม และ Reset วิธีคิดเพื่อสร้างผลลัพธ์ใหม่' + '\n\n' + '#### ลูกค้าที่ไว้วางใจ' + '\n' + 'URC | Central | AOT | Land and Houses | การไฟฟ้าส่วนภูมิภาค (PEA) | ศอ.บต. | ปปส. (200+ องค์กรทั่วประเทศ)',
    duration: '1 วัน (6 ชม.)',
    audience: 'ผู้บริหาร, ผู้จัดการ / หัวหน้างาน, Talent / Future Leader',
    why: [
      { label: 'ผู้นำยึดวิธีเดิม', stat: '01', desc: 'ไม่กล้าเปลี่ยน ยึดติดความสำเร็จเดิม', icon: <Zap /> },
      { label: 'ทีมรอคำสั่ง', stat: '02', desc: 'ทีมงานไม่คิดเอง รอสั่งการอย่างเดียว', icon: <Search /> },
      { label: 'ขาด Growth Mindset', stat: '03', desc: 'ทีมขาดความกระตือรือร้นในการเรียนรู้', icon: <TrendingUp /> }
    ],
    how: [
      { title: 'Self-Awareness', desc: 'Module 1: เข้าใจกรอบความคิดที่จำกัดตัวเอง', icon: <Search /> },
      { title: 'Mindset Shift', desc: 'Module 2: เปลี่ยน Fixed เป็น Growth Mindset', icon: <Zap /> },
      { title: 'Growth Culture', desc: 'Module 4: สร้าง Psychological Safety ในทีม', icon: <ShieldCheck /> }
    ],
    what: [
      'เข้าใจกรอบความคิดของตนเองและทีม',
      'ปรับ Mindset ให้สอดคล้องกับเป้าหมายองค์กร',
      'เพิ่ม Engagement และการมีส่วนร่วมของทีม',
      'สร้างพฤติกรรมการเรียนรู้ในทีม',
      'นำแนวคิดไปใช้ในการทำงานจริงทันที'
    ],
    objectives: [
      'เห็น Mindset ที่ซ่อนอยู่ของตัวเอง',
      'เปลี่ยนจาก สั่งงาน เป็น สร้างการเรียนรู้',
      'สร้างวัฒนธรรมการเติบโตในองค์กร',
      'ลดปัญหาการสื่อสารและเพิ่มประสิทธิภาพทีม'
    ],
    instructor: {
      id: 'den-master-fa',
      name: 'ครูเด่น มาสเตอร์ฟา',
      bio: 'ผู้อำนวยการสถาบันแคป วิชั่น ผู้เชี่ยวชาญด้าน Transformative Learning',
      image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/speakers/Profile_D-MasterFa.webp'
    }
  },
  {
    id: 'conflict-to-collaboration',
    title: 'Conflict to Collaboration: The Art of Generative Teams',
    category: 'People Skills',
    description: 'เปลี่ยนความขัดแย้งเป็นพลังสร้างสรรค์: ศิลปะการสร้างทีมที่มีประสิทธิภาพสูงด้วยเทคนิค Generative Dialogue และ Trust Architecture',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    longDescription: 'หลักสูตรนี้จะพาคุณไปเจาะลึกถึงรากเหง้าของความขัดแย้ง และใช้เครื่องมือในการสร้างความเข้าใจแบบ Inside-Out เพื่อเปลี่ยนทีมจาก Silo ให้เป็น Synergy',
    duration: '1 วัน (6 ชม.)',
    audience: 'ทีมบริหาร, หัวหน้างาน, พนักงานระดับปฏิบัติการ, Cross-functional Teams',
    why: [
      { label: 'The Root of Friction', stat: '100%', desc: 'วิเคราะห์สาเหตุที่ทำให้เกิดความขัดแย้งในที่ทำงาน', icon: <Search /> },
      { label: 'Trust Economy', stat: '95%', desc: 'ความไว้วางใจคือต้นทุนสำคัญของผลผลิตในทีม', icon: <Heart /> }
    ],
    how: [
      { title: 'Simulation Games', desc: 'กิจกรรมจำลองสถานการณ์ความขัดแย้งเสมือนจริง', icon: <Layout /> },
      { title: 'Safe Space Dialogue', desc: 'การสร้างพื้นที่ปลอดภัยในการแลกเปลี่ยนความคิด', icon: <MessageCircle /> }
    ],
    what: [
      'Radical Empathy',
      'Generative Dialogue',
      'Conflict Framework',
      'Action Plan for Synergy'
    ],
    objectives: [
      'สามารถระบุสไตล์การสื่อสารที่แตกต่างกันของคนในทีมได้',
      'ลดอัตราการเกิดความขัดแย้งที่รุนแรงและส่งผลกระทบต่อผลผลิตงาน',
      'สร้างข้อตกลงร่วมกัน (Team Agreement) ที่สมาชิกทุกคนยอมรับ',
      'พัฒนาทักษะการฟังที่ลึกซึ้ง (Empathetic Listening) เพื่อลดการตัดสิน'
    ],
    instructor: {
      id: 'den-master-fa',
      name: 'ครูเด่น มาสเตอร์ฟา',
      bio: 'ผู้อำนวยการสถาบันแคป วิชั่น ผู้เชี่ยวชาญด้าน Transformative Learning',
      image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/speakers/Profile_D-MasterFa.webp'
    }
  },
  {
    id: 'health-communication-mastery',
    title: 'หลักสูตร เสริมสร้างความมั่นใจและบุคลิกภาพที่ดี เพื่อสื่อสารสุขภาพอย่างมีประสิทธิภาพ',
    category: 'People Skills',
    description: 'ยกระดับการสื่อสารด้านสุขภาพด้วยความมั่นใจและบุคลิกภาพที่เป็นอาชีพ สำหรับบุคลากรทางการแพทย์ยุคใหม่',
    image: '/images/health-communication-cover.png',
    longDescription: 'ในโลกของการดูแลสุขภาพ การสื่อสารที่มีประสิทธิภาพคือหัวใจสำคัญของการสร้างความเชื่อมั่น หลักสูตรนี้ถูกออกแบบมาเพื่อทีมสหวิชาชีพและคลินิกครอบครัว โดยใช้กระบวนการ 6D CPS Model และ CAP Framework เพื่อปรับบุคลิกภาพและวิธีการสื่อสารให้ทรงพลังและเข้าถึงหัวใจผู้รับบริการ',
    duration: '1-2 วัน (เลือกตามความเหมาะสม)',
    audience: 'ทีมสหวิชาชีพ, แพทย์, พยาบาล, บุคลากรในคลินิกและโรงพยาบาล',
    why: [
      { label: 'ความเชี่ยวชาญและความน่าเชื่อถือ', stat: '100%', desc: 'สร้าง First Impression ที่น่าประทับใจและไว้วางใจได้', icon: <Shield /> },
      { label: 'ความพึงพอใจผู้ป่วย', stat: '40%+', desc: 'ลดความขัดแย้งและเพิ่มความร่วมมือในการรักษา', icon: <Heart /> }
    ],
    how: [
      { title: 'Confidence Reset', desc: 'ปลดล็อกความประหม่า สู่ออร่าแห่งผู้เชี่ยวชาญ', icon: <Sparkles /> },
      { title: 'Health Narrative', desc: 'ศิลปะการเล่าเรื่องสุขภาพให้เข้าใจง่ายและประทับใจ', icon: <MessageCircle /> },
      { title: 'Facial & Voice Mastery', desc: 'การใช้น้ำเสียงและภาษากายเพื่อสร้างความอุ่นใจ', icon: <Mic /> }
    ],
    what: [
      'Smart Personality for Health Professionals',
      'Psychology of Patient Communication',
      'Empathetic Deep Listening',
      'Handling Difficult Health Conversations'
    ],
    objectives: [
      'พัฒนาบุคลิกภาพภายนอกให้ดูเป็นมืออาชีพและเข้าถึงง่าย',
      'สร้างความเชื่อมั่นในตัวเอง (Core Confidence) เมื่อต้องสื่อสารเรื่องยาก',
      'เรียนรู้เทคนิคการให้ข้อมูลสุขภาพที่ไม่ใช่แค่ "บอก" แต่เป็นการ "สร้างความตระหนัก"',
      'สร้างระบบการสื่อสารที่ลื่นไหลภายในทีมสหวิชาชีพ'
    ],
    instructor: {
      id: 'den-master-fa',
      name: 'ครูเด่น มาสเตอร์ฟา',
      bio: 'ผู้อำนวยการสถาบันแคป วิชั่น ผู้เชี่ยวชาญด้าน Transformative Learning',
      image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/speakers/Profile_D-MasterFa.webp'
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
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80'
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
