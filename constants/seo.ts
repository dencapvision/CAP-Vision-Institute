import { BRAND_INFO } from './brand';

export const DEFAULT_SEO = {
  title: `${BRAND_INFO.name} | ${BRAND_INFO.slogan}`,
  description: 'สถาบันพัฒนาที่ปรึกษา วิทยากร กระบวนกร และพัฒนาบุคลากรในองค์กร ออกแบบหลักสูตร In-house Training ที่เน้นผลลัพธ์ นำโดยครูเด่น มาสเตอร์ฟา',
  keywords: 'ฝึกอบรม, In-house Training, พัฒนาบุคลากร, วิทยากร, กระบวนกร, ผู้นำ, HRD, Soft Skills, Leadership, CAP Vision Institute, ครูเด่น มาสเตอร์ฟา',
  author: 'CAP Vision Institute',
  themeColor: '#0f3460',
  url: 'https://capvision.co.th', // Replace with exact prod URL
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
  }
];
