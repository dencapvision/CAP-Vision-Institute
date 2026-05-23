import { BRAND_INFO } from './brand';

export const DEFAULT_SEO = {
  title: `${BRAND_INFO.name} | ${BRAND_INFO.slogan}`,
  description: 'สถาบันพัฒนาที่ปรึกษา วิทยากร กระบวนกร และพัฒนาบุคลากรในองค์กร ออกแบบหลักสูตร In-house Training ที่เน้นผลลัพธ์ นำโดยครูเด่น มาสเตอร์ฟา',
  keywords: 'ฝึกอบรม, In-house Training, พัฒนาบุคลากร, วิทยากร, กระบวนกร, ผู้นำ, HRD, Soft Skills, Leadership, CAP Vision Institute, ครูเด่น มาสเตอร์ฟา',
  author: 'CAP Vision Institute',
  themeColor: '#0f3460',
  url: 'https://capvisionpartner.com',
  ogImage: '/og-image.jpg', // Placeholder, needs actual image
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
