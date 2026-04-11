import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Award, Star, MessageCircle, Phone, BookOpen,
  ChevronRight, Zap, Users, Brain, Target, Quote, Calendar, TrendingUp, Shield,
  Mic2, Sparkles, Heart, Presentation
} from 'lucide-react';
import { fetchInstructorBySlug } from '../services/instructors';
import { fetchCourses } from '../services/courses';
import type { Instructor, Course } from '../types';
import { CONTACT_INFO, CLIENTS } from '../constants/brand';
import SEO from '../components/SEO';
import { DrSoBookingWizard } from '../components/DrSo/BookingWizard';

/* ─── PREMIUM DATA CONFIG ──────────────────────────────────── */

const DEN_SPECIFIC = {
  heroHeadline: 'วิทยากรอบรมองค์กร ที่เปลี่ยนพฤติกรรมคนได้จริง',
  heroSub: 'ไม่ใช่แค่การพูดบนเวที\nแต่คือการเปลี่ยนวิธีคิดของคนทั้งองค์กร',
  stats: [
    { value: '18+', label: 'ปีประสบการณ์', icon: Shield },
    { value: '1,000+', label: 'เวทีทั่วประเทศ', icon: Award },
    { value: '100+', label: 'องค์กรชั้นนำ', icon: Users },
    { value: '3', label: 'Framework ต้นฉบับ', icon: Brain },
  ],
  problems: [
    'จ้างวิทยากรมาพูด แต่พนักงานกลับไปทำงานแบบเดิมในวันรุ่งขึ้น',
    'การอบรมที่ดี "แต่ไม่มีใครนำไปใช้จริง" หลังจบ workshop',
    'หัวหน้างานเก่งงาน แต่สื่อสารกับทีมไม่เป็น ทีมเงียบ ไม่มีใครพูด',
    'ใช้เงินล้านกับการอบรม แต่วัฒนธรรมองค์กรไม่เคยเปลี่ยน',
  ],
  trainerVsFacilitator: [
    { label: 'วิทยากรทั่วไป (Trainer)', points: ['พูดคนเดียว 6-8 ชั่วโมง', 'ผู้เรียนฟังอย่างเดียว', 'วัดผลด้วยคะแนนสอบ', 'จบแล้วก็จบ', 'เปลี่ยนแค่ความรู้'] },
    { label: 'ครูเด่น มาสเตอร์ฟา', points: ['Facilitation ดึงศักยภาพออกมา', 'ทุกคนมีส่วนร่วม 100%', 'วัดผลด้วยพฤติกรรมที่เปลี่ยน', 'ติดตามผล 30-90 วัน', 'เปลี่ยน Mindset จากภายใน'] },
  ],
  capValues: [
    {
      letter: 'C',
      title: 'CAPACITY',
      titleTh: 'ศักยภาพ',
      desc: 'มนุษย์ทุกคนมีศักยภาพที่รอการปลดปล่อย หน้าที่ของ CAP Vision คือการสร้างบริบทที่ปลอดภัยให้ศักยภาพนั้นเผยออกมา',
      icon: MessageCircle,
      color: 'from-blue-600 to-blue-800',
    },
    {
      letter: 'A',
      title: 'AWARENESS',
      titleTh: 'การตระหนักรู้',
      desc: 'การเปลี่ยนแปลงที่ยั่งยืนเริ่มจาก Self-Awareness — การรู้จักตนเอง เข้าใจรูปแบบความคิด และมองเห็นทางเลือกใหม่ที่ไม่เคยเห็นมาก่อน',
      icon: Brain,
      color: 'from-amber-500 to-amber-700',
    },
    {
      letter: 'P',
      title: 'PERFORMANCE',
      titleTh: 'ผลลัพธ์ที่วัดได้',
      desc: 'การเรียนรู้ต้องแปลงเป็นผลลัพธ์จริงในการทำงาน ไม่ใช่แค่ความรู้สึกดีในห้องอบรม แต่คือพฤติกรรมและผลงานที่เปลี่ยนจริง',
      icon: TrendingUp,
      color: 'from-emerald-600 to-emerald-800',
    },
  ],
  methodologies: [
    { name: 'Transformative Learning', desc: 'เรียนรู้ผ่านประสบการณ์จริง ไม่ใช่แค่ฟังบรรยาย', index: '01' },
    { name: 'Active Learning & Flow', desc: 'กิจกรรมที่ทำให้ผู้เรียน "เข้าสู่สภาวะ Flow" ลืมเวลาแต่ได้เนื้อหา', index: '02' },
    { name: 'Circle Dialogue', desc: 'กระบวนการสะท้อนคิดเป็นวงกลม ดึงความรู้จากภายในออกมา', index: '03' },
    { name: 'Role Play & Simulation', desc: 'ฝึกทักษะจากสถานการณ์จริง ผิดพลาดได้อย่างปลอดภัย', index: '04' },
  ],
  expertiseAreas: [
    { category: 'Leadership & Communication', items: ['สื่อสารสำหรับผู้นำยุคใหม่', 'C.O.D. Communication Model', 'Human Communication 4 ระดับ', 'Leadership Presence & Influence'] },
    { category: 'Team Development', items: ['Team Synergy & Flow Design', 'Conflict Resolution', 'Building Psychological Safety', 'High-Performance Team Culture'] },
    { category: 'Facilitation & Coaching', items: ['Master Facilitation Skills', 'Coaching for Leaders', 'Group Process Design', 'Learning Experience Design'] },
    { category: 'Creative & Innovation', items: ['Design Thinking Workshop', 'Problem-Solving Facilitation', 'Creative Brainstorming Techniques', 'Innovation Culture Building'] },
  ],
  signaturePrograms: [
    { name: 'Team Talk Flow', duration: '1-2 วัน', outcome: 'ทีมสื่อสารชัดขึ้น ลดความขัดแย้ง 80%', tag: 'bestseller' },
    { name: 'Leadership Speaking Masterclass', duration: '1 วัน', outcome: 'ผู้นำพูดโน้มน้าวและสร้าง Engagement ได้ทันที', tag: 'popular' },
    { name: 'The Master Facilitator', duration: '2-3 วัน', outcome: 'หัวหน้าทีมกลายเป็นผู้นำกระบวนการที่ลูกน้องเชื่อ', tag: '' },
    { name: 'Brainwave for Focus', duration: '1 วัน', outcome: 'เพิ่ม Focus & Productivity ด้วย Mindfulness in Action', tag: '' },
  ],
  testimonials: [
    { text: 'ครูเด่นไม่ได้แค่สอน แต่ทำให้เราค้นพบตัวเองในฐานะผู้นำ ทีมงานเปลี่ยนไปอย่างเห็นได้ชัดหลังจาก workshop เพียง 2 วัน', author: 'HR Manager — บริษัทมหาชนชั้นนำ', role: 'ผู้จัดการฝ่าย HRD' },
    { text: 'สร้างประสบการณ์ที่เปลี่ยน Mindset และนำไปใช้ได้จริง ไม่ใช่การอบรมที่ "จบแล้วก็ลืม" แบบที่เคยเจอมา', author: 'Senior Manager — องค์กรรัฐวิสาหกิจ', role: 'ผู้บริหารระดับ Senior' },
    { text: 'เป็นวิทยากรที่ทำให้ห้องอบรมเงียบน้อยลงมากที่สุด เพราะทุกคนอยากพูด อยากมีส่วนร่วม ผลลัพธ์ชัดเจนมาก', author: 'Learning & Development Lead — MNC', role: 'L&D Director' },
  ],
  gallery: [
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/denmasterfa.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa1.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa2.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa3.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa4.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa5.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa6.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa7.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa8.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa9.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa10.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa11.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa12.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa13.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa14.jpg'
  ],
};

const SO_SPECIFIC = {
  fullName: 'อาจารย์ ดร.พิศลยา บัวแก้ว (Dr. So)',
  heroHeadline: 'ปลดล็อกพลังจิตใต้สำนึก สื่อสารให้เข้าถึงใจและเปลี่ยนคนได้จริง',
  heroSub: '“การสื่อสารที่ทรงพลังที่สุด ไม่ได้เริ่มจากคำพูด…แต่เริ่มจากจิตใต้สำนึก”',
  stats: [
    { value: 'Dr.', label: 'พุทธศาสตรดุษฎีบัณฑิต (สันติศึกษา)', icon: Award },
    { value: 'Expert', label: 'วิศวกรสันติภาพ', icon: Shield },
    { value: 'Guru', label: 'Subconscious Guru', icon: Brain },
    { value: 'Award', label: 'ผู้อำนวยการศูนย์พัฒนาศักยภาพฯ', icon: Star },
  ],
  principles: [
    'ปลดล็อกข้อจำกัดภายใน (Break Free)',
    'ค้นพบตัวตนที่แท้จริง (Authentic Self)',
    'พัฒนาการสื่อสารที่ตรงใจผู้ฟัง (Deep Connection)',
  ],
  expertise: [
    { title: 'Subconscious Programming', desc: 'การประยุกต์ใช้พลังจิตใต้สำนึกเพื่อการสื่อสารระดับลึก', icon: Brain },
    { title: 'Subconscious Script Design', desc: 'การออกแบบบทพูดโปรแกรมจิตเฉพาะบุคคล', icon: Mic2 },
    { title: 'Healing Tools Integration', desc: 'การใช้เครื่องมือบำบัดเพื่อปลดล็อกศักยภาพภายใน', icon: Heart },
  ],
  missions: [
    { title: 'Confidence', desc: 'ปลดล็อกความกลัวและความไม่มั่นใจ' },
    { title: 'Identity', desc: 'ดึง "เสน่ห์เฉพาะตัว" ออกมาใช้ในการสื่อสาร' },
    { title: 'Impact', desc: 'ถ่ายทอดเรื่องราวที่ "ตรงใจ" และ "ทรงพลัง"' },
  ],
  contact: {
    phone: '091-789-6529',
    email: 'souloflightacademy@gmail.com',
    facebook: 'https://www.facebook.com/share/17EnJghSkt/',
    line: 'https://lin.ee/6Baop7M',
    lineId: '@958wlshf',
    tiktok: '@dr.so_healing',
    tiktokUrl: 'https://www.tiktok.com/@souloflightacademy?_r=1&_t=ZS-95RuOyLhp7S'
  },
  gallery: [
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so2.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so3.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so4.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so5.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so6.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class1.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class2.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class3.jpg',
  ],
};

const K_DATA = {
  positions: [
    'ผู้ช่วยประธานสภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย',
    'คณะทำงานรัฐมนตรีว่าการกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    'CEO, Guardian Global Security Co., Ltd.',
    'ประธานเจ้าหน้าที่บริหาร (CEO) บริษัท นิวไดซ์ จำกัด',
  ],
  gallery: [
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha2.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha3.jpg',
  ]
};

/* ─── GENERIC DETAIL ───────────────────────────────────────── */

/* ─── COMPONENTS ───────────────────────────────────────────── */

const CoursePromoCard: React.FC<{ instructorName: string }> = ({ instructorName }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-20 bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-[3.5rem] p-8 md:p-12 text-white relative overflow-hidden border border-[#c5a059]/30 shadow-2xl"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
      <div className="lg:w-1/3">
        <div className="relative">
          <div className="absolute -inset-4 bg-[#c5a059]/20 rounded-[2.5rem] blur-2xl animate-pulse"></div>
          <img 
            src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class2.jpg" 
            alt="Subconscious Speaker Course" 
            className="relative rounded-[2rem] border-2 border-[#c5a059]/50 shadow-2xl w-full h-64 object-cover"
          />
        </div>
      </div>
      <div className="lg:w-2/3 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-[#c5a059]/20 text-[#c5a059] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4" /> New Course Launch
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6 nav-font leading-tight">
          ก้าวแรกสู่ <span className="text-[#c5a059]">วิทยากรจิตใต้สำนึก</span>
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
          เตรียมพบกับหลักสูตรที่จะเปลี่ยน "เสียงในหัว" ให้กลายเป็น "พลังบนเวที" 
          ปลดล็อกศักยภาพการสื่อสารจากจิตใต้สำนึกไปกับ {instructorName}
        </p>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link 
            to="/subconscious-speaker"
            className="bg-[#c5a059] hover:bg-amber-400 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-[#c5a059]/20 active:scale-95 flex items-center gap-3"
          >
            ดูรายละเอียดคอร์ส
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3 text-white/60 font-bold px-6">
            <Calendar className="w-5 h-5 text-[#c5a059]" />
            20-21 พฤษภาคม 2569
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const GenericDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0f3460] pt-24 pb-40 text-white relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-blue-200 hover:text-[#c5a059] transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </Link>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <img src={speaker.image} alt={speaker.name} className="w-full h-[400px] object-cover rounded-[2.5rem] shadow-2xl" />
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-4xl md:text-5xl font-black mb-4">{speaker.name}</h1>
              <p className="text-lg text-[#c5a059] font-bold mb-8 uppercase tracking-widest">{speaker.title}</p>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl">{speaker.longBio || speaker.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── DR SO DETAIL ─────────────────────────────────────────── */

const DrSoDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<'personal' | 'private' | 'workshop'>('personal');

  const openBooking = (service: 'personal' | 'private' | 'workshop') => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <SEO 
        title="Dr.So วิทยากรจิตใต้สำนึก | อบรมการสื่อสารและพัฒนาศักยภาพ"
        description="ดร.พิศลยา บัวแก้ว ผู้เชี่ยวชาญด้านพลังจิตใต้สำนึก ช่วยพัฒนาทักษะการพูด การเล่าเรื่อง และสร้างวิทยากรมืออาชีพ พร้อมหลักสูตรสำหรับองค์กร"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-[#0a1628] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-white/50 hover:text-[#c5a059] transition-colors mb-12 uppercase font-black text-sm">
            <ArrowLeft className="w-4 h-4" /> วิทยากร
          </Link>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <img src={speaker.image} alt={SO_SPECIFIC.fullName} className="w-full h-[550px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white/10" />
                <div className="absolute -bottom-6 -right-6 bg-[#c5a059] p-6 rounded-3xl shadow-xl hidden md:block">
                  <p className="text-white font-black text-center leading-tight">วิทยากร<br/>จิตใต้สำนึก</p>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-3/5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                  {SO_SPECIFIC.fullName.split(' (')[0]}
                  <span className="block text-[#c5a059]">{`(${SO_SPECIFIC.fullName.split('(')[1]}`}</span>
                </h1>
                <p className="text-2xl text-white/80 font-bold mb-4 leading-relaxed">{SO_SPECIFIC.heroHeadline}</p>
                <p className="text-xl text-[#c5a059] font-medium mb-10 italic">{SO_SPECIFIC.heroSub}</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => openBooking('personal')} 
                    className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/20"
                  >
                    จองวิทยากร / ขอหลักสูตรองค์กร
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-[#0f3460] mb-8">About Dr. So</h2>
              <div className="prose prose-lg text-gray-600 space-y-6">
                <p className="font-bold text-xl text-[#0f3460]">
                  ดร.พิศลยา เป็นทั้งนักพัฒนาและนักถ่ายทอดองค์ความรู้ด้าน “Subconscious Communication” 
                  ที่ผสานศาสตร์จิตวิทยา การสื่อสาร และเครื่องมือบำบัด (Healing Tools) เข้าด้วยกันอย่างลึกซึ้ง
                </p>
                <p>
                  ด้วยความเชื่อว่า <span className="text-[#c5a059] font-bold">“การสื่อสารที่ทรงพลังที่สุด ไม่ได้เริ่มจากคำพูด…แต่เริ่มจากจิตใต้สำนึก”</span> 
                </p>
                <p>
                  ท่านจึงออกแบบกระบวนการเรียนรู้ที่ช่วยให้ผู้เรียน ปลดล็อกข้อจำกัดภายใน ค้นพบตัวตนที่แท้จริง 
                  และพัฒนาการสื่อสารให้ “ตรงใจและเข้าถึงใจผู้ฟัง”
                </p>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                {SO_SPECIFIC.principles.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <CheckCircle2 className="text-[#c5a059] w-5 h-5 shrink-0" />
                    <span className="font-bold text-[#0f3460]">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0f4c75]/5 p-12 rounded-[3.5rem] border border-[#0f4c75]/10 relative"
            >
              <Quote className="absolute -top-6 -left-6 w-16 h-16 text-[#c5a059]/20" />
              <h3 className="text-2xl font-black text-[#0f3460] mb-6 flex items-center gap-3">
                <Award className="text-[#c5a059]" /> ตำแหน่งและกิตติคุณ
              </h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-black text-[#0f3460] mb-3 opacity-60 uppercase tracking-widest text-sm">ตำแหน่งปัจจุบัน</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-lg font-bold text-gray-700">
                      <ChevronRight className="text-[#c5a059] shrink-0" /> ผู้อำนวยการศูนย์พัฒนาศักยภาพพลังจิตใต้สำนึก
                    </li>
                    <li className="flex gap-3 text-lg font-bold text-gray-700">
                      <ChevronRight className="text-[#c5a059] shrink-0" /> โค้ชผู้พัฒนาหลักสูตรวิทยากรจิตใต้สำนึก
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-[#0f3460] mb-3 opacity-60 uppercase tracking-widest text-sm">การศึกษาและเกียรติประวัติ</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-gray-700">
                      <ChevronRight className="text-[#c5a059] shrink-0" /> ปริญญาเอก พุทธศาสตรดุษฎีบัณฑิต (สันติศึกษา) มหาจุฬาลงกรณราชวิทยาลัย
                    </li>
                    <li className="flex gap-3 text-gray-800 font-black bg-[#c5a059]/10 p-4 rounded-2xl">
                      <Award className="text-[#2d5a27] shrink-0" /> ได้รับการยกย่องเป็น “วิศวกรสันติภาพ” (10 ธ.ค. 2566)
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0f3460] mb-4">ความเชี่ยวชาญและประสบการณ์</h2>
            <p className="text-xl text-gray-500">หัวใจของการพัฒนาคนและองค์กรอย่างยั่งยืน</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SO_SPECIFIC.expertise.map((exp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center text-[#c5a059] mb-6">
                  <exp.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-[#0f3460] mb-4">{exp.title}</h3>
                <p className="text-gray-600 leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 bg-[#0a1628] rounded-[3.5rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6">Mission & Impact</h2>
                <p className="text-xl text-[#c5a059] font-bold mb-8 uppercase tracking-widest">
                  “เปลี่ยนคนธรรมดา ให้กลายเป็นวิทยากรมืออาชีพ”
                </p>
                <div className="grid gap-6">
                  {SO_SPECIFIC.missions.map((m, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black shrink-0">{idx+1}</div>
                      <div>
                        <h4 className="font-black text-lg mb-1">{m.title}</h4>
                        <p className="opacity-70">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <TrendingUp className="text-[#c5a059]" /> ผลลัพธ์ที่ได้รับ
                </h3>
                <ul className="space-y-4">
                  {[
                    'พูดอย่างมั่นใจโดยไม่ฝืนธรรมชาติ',
                    'ถ่ายทอดเนื้อหาได้อย่างมี “พลังและเสน่ห์”',
                    'เข้าถึงอารมณ์และจิตใจของผู้ฟัง',
                    'เริ่มต้นเส้นทาง “วิทยากรมืออาชีพ” ได้จริง'
                  ].map(item => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="text-[#c5a059] shrink-0" />
                      <span className="font-bold opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Funnel Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3460] mb-6">เริ่มปลดล็อกศักยภาพของคุณ</h2>
            <div className="h-1 w-20 bg-[#c5a059] mx-auto mb-6"></div>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">เลือกรูปแบบการสื่อสารที่ตรงกับเป้าหมายความสำเร็จของคุณ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Service 1: Personal */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center relative group h-full"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-[#c5a059] mb-8 group-hover:bg-[#c5a059] group-hover:text-white transition-all duration-300">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#0f3460] mb-2">Personal Coaching</h3>
              <p className="text-[#c5a059] font-black mb-6">1-on-1 Subconscious Healing</p>
              <ul className="text-gray-500 mb-10 space-y-4 text-left w-full border-t border-gray-100 pt-8">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> ปลดล็อกความกลัวในรายบุคคล</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> ออกแบบ Script โปรแกรมจิตเฉพาะคุณ</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> ค้นหาเสน่ห์การพูดที่ไม่เหมือนใคร</li>
              </ul>
              <div className="mt-auto w-full">
                <button 
                  onClick={() => openBooking('personal')} 
                  className="w-full bg-[#0f3460] text-white py-5 rounded-2xl font-black hover:bg-[#c5a059] transition-all shadow-xl"
                >
                  เริ่มปรึกษารายบุคคล
                </button>
              </div>
            </motion.div>

            {/* Service 2: Private Group */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#0f3460] p-10 rounded-[3.5rem] shadow-2xl text-white flex flex-col items-center text-center relative h-full scale-105"
            >
              <div className="absolute top-8 right-8 bg-[#c5a059] text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-tighter">Elite</div>
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-[#c5a059] mb-8">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-2">Private Group</h3>
              <p className="text-[#c5a059] font-black mb-6 italic">วิทยากรจิตใต้สำนึก (กลุ่มเล็ก)</p>
              <ul className="text-white/70 mb-10 space-y-4 text-left w-full border-t border-white/10 pt-8">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> ฝึกทักษะกับกลุ่ม Elite 5-10 ท่าน</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> การเล่าเรื่องที่เปลี่ยนพฤติกรรมผู้ฟัง</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> กระบวนการสะท้อนคิดแบบลึกซึ้ง</li>
              </ul>
              <div className="mt-auto w-full">
                <button 
                  onClick={() => openBooking('private')} 
                  className="w-full bg-[#c5a059] text-white py-5 rounded-2xl font-black hover:bg-white hover:text-[#0f3460] transition-all shadow-xl shadow-[#000]/10"
                >
                  สมัครรอบกลุ่มส่วนตัว
                </button>
              </div>
            </motion.div>

            {/* Service 3: Workshop */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center relative group h-full"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-[#c5a059] mb-8 group-hover:bg-[#0f4c75] group-hover:text-white transition-all duration-300">
                <Presentation className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#0f3460] mb-2">Corporate Training</h3>
              <p className="text-[#c5a059] font-black mb-6">Internal Speaker Development</p>
              <ul className="text-gray-500 mb-10 space-y-4 text-left w-full border-t border-gray-100 pt-8">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> พัฒนาวิทยากรภายในองค์กร</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> ปรับจูน Mindset วัฒนธรรมองค์กร</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" /> การสื่อสารเพื่อความสำเร็จในงาน</li>
              </ul>
              <div className="mt-auto w-full">
                <button 
                  onClick={() => openBooking('workshop')} 
                  className="w-full bg-[#0f3460] text-white py-5 rounded-2xl font-black hover:bg-[#c5a059] transition-all shadow-xl"
                >
                  ขอเสนอโครงการองค์กร
                </button>
              </div>
            </motion.div>
          </div>
          
          <CoursePromoCard instructorName="ดร.โส" />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-[#0f3460] mb-4">บรรยากาศการอบรม</h2>
              <p className="text-gray-500 italic">“เพราะความสำเร็จเริ่มต้นจากการลงมือทำด้วยหัวใจ”</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SO_SPECIFIC.gallery.map((img, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className={`rounded-[2rem] overflow-hidden cursor-pointer shadow-lg ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <img src={img} alt={`Dr So ${idx}`} className="w-full h-full object-cover min-h-[250px]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-24 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8">พร้อมปลดล็อกศักยภาพ<br/>การสื่อสารของคุณแล้วหรือยัง?</h2>
              <p className="text-2xl text-[#c5a059] font-bold mb-10 leading-relaxed">
                ให้ Dr. So ช่วยคุณ “พูดให้เข้าถึงใจ และเปลี่ยนชีวิตผู้ฟังได้จริง”
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#c5a059]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm opacity-50 uppercase font-black">Call Support</h4>
                    <p className="text-xl font-black">{SO_SPECIFIC.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#c5a059]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm opacity-50 uppercase font-black">Messenger / Facebook</h4>
                    <p className="text-xl font-black">
                      <a href={SO_SPECIFIC.contact.facebook} target="_blank" rel="noreferrer" className="hover:text-[#c5a059] transition-colors">
                        {SO_SPECIFIC.contact.facebook.includes('facebook.com') ? 'Facebook Profile' : SO_SPECIFIC.contact.facebook}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-10 rounded-[3.5rem] border border-white/10">
              <h3 className="text-2xl font-black mb-8">Follow Dr. So</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={SO_SPECIFIC.contact.tiktokUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-black p-6 rounded-3xl hover:scale-105 transition-all">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#c5a059]" />
                  </div>
                  <span className="font-black">TikTok</span>
                </a>
                <a href={SO_SPECIFIC.contact.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#1877F2] p-6 rounded-3xl hover:scale-105 transition-all">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-black">Facebook</span>
                </a>
                <a href={SO_SPECIFIC.contact.line} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#06C755] p-6 rounded-3xl hover:scale-105 transition-all">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-black">LINE OA</span>
                </a>
              </div>
              <div className="mt-10 text-center">
                <button 
                  onClick={() => openBooking('personal')}
                  className="text-[#c5a059] font-black border-b-2 border-[#c5a059] pb-2 hover:opacity-70 transition-all uppercase text-sm tracking-widest"
                >
                  Request Proposal for Organization
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DrSoBookingWizard 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};

/* ─── KNIGHT KRAIPUT DETAIL ─────────────────────────────────── */

const KnightKraiputDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  return (
    <div className="bg-[#050a14] min-h-screen text-white">
      <SEO title={speaker.name} description={speaker.bio} />
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <Link to="/speakers" className="text-white/50 hover:text-[#c5a059] mb-12 block"><ArrowLeft /></Link>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <img src={speaker.image} alt={speaker.name} className="w-full rounded-[3rem] shadow-2xl" />
          <div>
            <h1 className="text-6xl font-black mb-6">{speaker.name}</h1>
            <p className="text-2xl text-[#c5a059] mb-8">{speaker.title}</p>
            <div className="space-y-4">
              {K_DATA.positions.map(p => <p key={p} className="text-white/70 border-l-2 border-[#c5a059] pl-4">{p}</p>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── DEN MASTER FA DETAIL ─────────────────────────────────── */

const DenMasterFaDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  return (
    <div className="bg-white min-h-screen font-sans">
      <SEO 
        title="ครูเด่น มาสเตอร์ฟา | Master Facilitator & Speaker อบรมองค์กร"
        description="ครูเด่น ผู้เชี่ยวชาญด้านกระบวนการเรียนรู้และพัฒนาผู้นำ เปลี่ยนวัฒนธรรมองค์กรด้วย Facilitation และ Active Learning"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-[#0f3460] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400 rounded-full blur-[120px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400 rounded-full blur-[100px] -ml-20 -mb-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-white/50 hover:text-[#c5a059] transition-colors mb-12 uppercase font-black text-sm">
            <ArrowLeft className="w-4 h-4" /> วิทยากร
          </Link>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <img src={speaker.image} alt={speaker.name} className="w-full h-[550px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white/10" />
                <div className="absolute -bottom-6 -right-6 bg-[#c5a059] p-6 rounded-3xl shadow-xl hidden md:block">
                  <p className="text-white font-black text-center leading-tight">Master<br/>Facilitator</p>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-3/5 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  {speaker.name}
                </h1>
                <p className="text-2xl text-[#c5a059] font-bold mb-4 leading-relaxed">{DEN_SPECIFIC.heroHeadline}</p>
                <p className="text-xl text-white/80 font-medium mb-10 italic max-w-2xl">{DEN_SPECIFIC.heroSub}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {DEN_SPECIFIC.stats.map((s, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl text-center border border-white/10">
                      <div className="flex justify-center mb-2">
                        <s.icon className="w-6 h-6 text-[#c5a059]" />
                      </div>
                      <p className="text-3xl font-black text-white">{s.value}</p>
                      <p className="text-[10px] uppercase font-black opacity-60 tracking-widest">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={CONTACT_INFO.lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/20"
                  >
                    ปรึกษาหลักสูตรองค์กร
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CAP Values Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0f3460] mb-4">The CAP Framework</h2>
            <p className="text-xl text-gray-500">ปรัชญาการพัฒนาคนสไตล์ CAP Vision Institute</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {DEN_SPECIFIC.capValues.map((v, i) => (
              <div key={i} className="relative group p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center mb-8 text-3xl font-black`}>
                  {v.letter}
                </div>
                <h3 className="text-2xl font-black text-[#0f3460] mb-2">{v.title}</h3>
                <p className="text-[#c5a059] font-black mb-6">{v.titleTh}</p>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-[#0f3460] mb-8">Methodology</h2>
              <p className="text-xl text-gray-600 mb-12">เราไม่ได้มองหาแค่การเรียนรู้ แต่เรามองหาการ "ตื่นรู้" และการเปลี่ยนแปลงที่จับต้องได้</p>
              <div className="space-y-6">
                {DEN_SPECIFIC.methodologies.map((m, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0f3460] text-white flex items-center justify-center shrink-0 font-black text-lg group-hover:bg-[#c5a059] transition-colors">
                      {m.index}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-[#0f3460] mb-1">{m.name}</h4>
                      <p className="text-gray-500">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {DEN_SPECIFIC.gallery.slice(0, 4).map((img, i) => (
                <img key={i} src={img} alt="Workshop" className={`rounded-3xl shadow-lg w-full h-64 object-cover ${i % 2 !== 0 ? 'mt-8' : ''}`} />
              ))}
            </div>
          </div>
          
          <CoursePromoCard instructorName="ครูเด่น" />
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {DEN_SPECIFIC.gallery.slice(4).map((img, i) => (
              <img key={i} src={img} alt="Den Gallery" className="w-full rounded-2xl shadow-sm hover:shadow-xl transition-all" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── MAIN COMPONENT ───────────────────────────────────────── */

const SpeakerDetail: React.FC = () => {
  const { id } = useParams();
  const [speaker, setSpeaker] = useState<Instructor | null>(null);
  const [taughtCourses, setTaughtCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const fetchedSpeaker = await fetchInstructorBySlug(id);
        if (fetchedSpeaker) {
          setSpeaker(fetchedSpeaker);
          const allCourses = await fetchCourses();
          setTaughtCourses(allCourses.filter(c => c.instructor_id === fetchedSpeaker.id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div></div>;
  if (!speaker) return <div className="min-h-screen flex items-center justify-center text-2xl font-black">Speaker Not Found</div>;

  // PREMIUM ROUTING
  if (speaker.slug === 'den-master-fa') return <DenMasterFaDetail speaker={speaker} taughtCourses={taughtCourses} />;
  if (speaker.slug === 'kraiput-knight') return <KnightKraiputDetail speaker={speaker} taughtCourses={taughtCourses} />;
  if (speaker.slug === 'dr-so') return <DrSoDetail speaker={speaker} taughtCourses={taughtCourses} />;

  return <GenericDetail speaker={speaker} taughtCourses={taughtCourses} />;
};

export default SpeakerDetail;
