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
  heroHeadline: 'ปลดล็อกศักยภาพ สื่อสารอย่างทรงพลังจากภายใน',
  heroSub: '“เปลี่ยนคนธรรมดา ให้กลายเป็นวิทยากรมืออาชีพ ด้วยพลังจิตใต้สำนึก”',
  stats: [
    { value: 'Dr.', label: 'ปริญญาเอก สันติศึกษา', icon: Award },
    { value: 'Expert', label: 'Subconscious Guru', icon: Brain },
    { value: 'Success', label: 'เห็นผลลัพธ์จริง', icon: Target },
    { value: 'Award', label: 'วิทยากรพหุภาคี', icon: Shield },
  ],
  expertise: [
    { title: 'Subconscious Mind', desc: 'การใช้พลังจิตใต้สำนึกเพื่อการสื่อสารระดับลึก', icon: Brain },
    { title: 'Speaking Identity', desc: 'ค้นหาและพัฒนาเสน่ห์การพูดเฉพาะตัว', icon: Zap },
    { title: 'Heart-to-Heart', desc: 'การสื่อสารเพื่อเข้าถึงใจและเปลี่ยนพฤติกรรม', icon: Heart },
  ],
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
        title={`${speaker.name} | วิทยากรจิตใต้สำนึก`}
        description={speaker.bio}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-[#0a1628] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-white/50 hover:text-[#c5a059] transition-colors mb-12 uppercase font-black text-sm">
            <ArrowLeft className="w-4 h-4" /> วิทยากร
          </Link>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-2/5">
              <img src={speaker.image} alt={speaker.name} className="w-full h-[550px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white/10" />
            </div>
            <div className="lg:w-3/5">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                {speaker.name.split(' (')[0]}
                <span className="block text-[#c5a059]">{speaker.name.includes('(') ? `(${speaker.name.split('(')[1]}` : ''}</span>
              </h1>
              <p className="text-2xl text-white/80 font-bold mb-10 leading-relaxed">{SO_SPECIFIC.heroHeadline}</p>
              <div className="flex gap-4">
                <button onClick={() => openBooking('personal')} className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all">จองปรึกษาเบื้องต้น</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Bio */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black text-[#0f3460] mb-8 flex items-center gap-3">
                <Award className="text-[#c5a059]" /> ความเชี่ยวชาญพิเศษ
              </h2>
              <div className="grid gap-6">
                {SO_SPECIFIC.expertise.map((item, idx) => (
                  <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#c5a059]/30 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c5a059] shadow-sm shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-[#0f3460] mb-2">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0f4c75]/5 p-10 rounded-[3rem] border border-[#0f4c75]/10"
            >
              <Quote className="w-12 h-12 text-[#c5a059]/20 mb-6" />
              <h2 className="text-3xl font-black text-[#0f3460] mb-6">เส้นทางการพัฒนาจากภายใน</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                {speaker.longBio?.split('\n').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                )) || <p>{speaker.bio}</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SO_SPECIFIC.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#c5a059] mx-auto mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3460] mb-6 tracking-tight">เลือกรูปแบบการปรึกษา</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">เริ่มต้นการเปลี่ยนแปลงที่จับต้องได้ ผ่านกระบวนการออกแบบเฉพาะบุคคล</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'personal' as const, title: 'Personal Coaching', icon: Zap, list: ['ปลดล็อกรายบุคคล (1-on-1)', 'ออกแบบเส้นทางการเติบโต', 'เทคนิคการสื่อสารจิตใต้สำนึก'], color: 'from-[#c5a059] to-[#c5a059]/80' },
              { id: 'private' as const, title: 'Private Group', icon: Users, list: ['เรียนรู้ร่วมกลุ่ม Elite 5-10 ท่าน', 'กลยุทธ์การสื่อสารวิสัยทัศน์', 'กิจกรรมกลุ่มสะท้อนคิด'], color: 'from-blue-600 to-blue-800' },
              { id: 'workshop' as const, title: 'Corporate Workshop', icon: Presentation, list: ['Internal Training ทีมงาน', 'ปรับจูนวัฒนธรรมองค์กร', 'พัฒนาทักษะวิทยากรภายใน'], color: 'from-emerald-600 to-emerald-800' },
            ].map((service) => (
              <motion.div 
                key={service.id} 
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#c5a059] mb-8 group-hover:bg-[#0f3460] group-hover:text-white transition-all duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0f3460] mb-4">{service.title}</h3>
                <ul className="text-gray-500 mb-10 space-y-3">
                  {service.list.map(l => (
                    <li key={l} className="flex items-center gap-2 justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059]" /> {l}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => openBooking(service.id)} 
                  className="w-full bg-[#0f3460] text-white py-5 rounded-2xl font-black hover:bg-[#c5a059] active:scale-95 transition-all shadow-lg shadow-[#0f3460]/10"
                >
                  เริ่มปรึกษาตอนนี้
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-[#0f3460] mb-4">Gallery</h2>
              <p className="text-gray-500 italic">"ความสำเร็จเริ่มต้นจากการลงมือทำด้วยหัวใจ"</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SO_SPECIFIC.gallery.map((img, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className={`rounded-3xl overflow-hidden cursor-pointer shadow-lg ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img src={img} alt={`Dr So ${idx}`} className="w-full h-full object-cover aspect-square md:aspect-auto" />
              </motion.div>
            ))}
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
    <div className="bg-[#0a1628] min-h-screen text-white">
      <SEO title={speaker.name} description={speaker.bio} />
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <h1 className="text-6xl font-black text-center mb-12">{speaker.name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {DEN_SPECIFIC.stats.map(s => <div key={s.label} className="bg-white/5 p-8 rounded-3xl text-center"><p className="text-4xl font-black text-[#c5a059]">{s.value}</p><p className="text-sm opacity-60">{s.label}</p></div>)}
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
