
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, Award, Star, MessageCircle, Phone, BookOpen,
  ChevronRight, Zap, Users, Brain, Target, Quote, Calendar, TrendingUp, Shield,
  Mic2, Sparkles, Heart
} from 'lucide-react';
import { fetchInstructorBySlug } from '../services/instructors';
import { fetchCourses } from '../services/courses';
import type { Instructor, Course } from '../types';
import { CONTACT_INFO, CLIENTS } from '../constants/brand';
import SEO from '../components/SEO';

/* ─── Den Master Fa specific data ──────────────────────────── */
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

/* ─── Dr. So specific data ─────────────────────────────────── */
const SO_SPECIFIC = {
  heroHeadline: 'ปลดล็อกศักยภาพ สื่อสารอย่างทรงพลังจากภายใน',
  heroSub: '“เปลี่ยนคนธรรมดา ให้กลายเป็นวิทยากรมืออาชีพ ด้วยพลังจิตใต้สำนึก”',
  stats: [
    { value: 'Dr.', label: 'ปริญญาเอก สันติศึกษา', icon: Award },
    { value: 'Expert', label: 'Subconscious Guru', icon: Brain },
    { value: 'Success', label: 'เห็นผลลัพธ์จริง', icon: Target },
    { value: 'Award', label: 'วิศวกรสันติภาพ', icon: Shield },
  ],
  transformation: [
    { label: 'พนักงานพูดไม่เป็น / ขาดความมั่นใจ', icon: '✗' },
    { label: 'เนื้อหาดีแต่ไม่มีเสน่ห์ในการสื่อสาร', icon: '✗' },
    { label: 'กลัวเวที ไม่กล้าแสดงออก', icon: '✗' },
    { label: 'การสื่อสารในทีมติดขัด ไม่เข้าใจกัน', icon: '✗' },
  ],
  expertise: [
    { title: 'Subconscious Mind', desc: 'การใช้พลังจิตใต้สำนึกเพื่อการสื่อสารระดับลึก', icon: Brain },
    { title: 'Speaking Identity', desc: 'ค้นหาและพัฒนาเสน่ห์การพูดเฉพาะตัว', icon: Zap },
    { title: 'Script Programming', desc: 'ออกแบบสคริปต์โปรแกรมจิตเฉพาะบุคคล', icon: Mic2 },
    { title: 'Heart-to-Heart', desc: 'การสื่อสารเพื่อเข้าถึงใจและเปลี่ยนพฤติกรรม', icon: Heart },
    { title: 'Healing Tools', desc: 'การใช้เครื่องมือบำบัดปลดล็อกปมภายใน', icon: Sparkles },
  ],
  faq: [
    { q: 'วิทยากรจิตใต้สำนึกคืออะไร?', a: 'คือผู้ที่ใช้ความเข้าใจ "จิตใต้สำนึก" มาช่วยพัฒนาการสื่อสารและพฤติกรรมจากภายใน ทำให้เกิดการเปลี่ยนแปลงอย่างยั่งยืน' },
    { q: 'หลักสูตรนี้เหมาะกับใคร?', a: 'เหมาะกับ HR, Training Manager, ผู้บริหาร, วิทยากร, และผู้ที่ต้องการพัฒนาทักษะการพูดให้มีพลัง' },
    { q: 'แตกต่างจากการอบรมพูดทั่วไปอย่างไร?', a: 'เน้น "เปลี่ยนภายในก่อนภายนอก" ไม่ใช่แค่เทคนิค แต่เป็นการปลดล็อกความกลัวและสร้างความมั่นใจจากรากฐาน' },
    { q: 'สามารถจัด In-house Training ได้หรือไม่?', a: 'ได้ครับ สามารถออกแบบหลักสูตรให้ตอบโจทย์ Pain Point เฉพาะของแต่ละองค์กรได้' },
    { q: 'Dr.So ช่วยองค์กรได้อย่างไร?', a: 'ช่วยพัฒนาผู้นำให้มี Leadership Presence, เพิ่ม Team Engagement และลดความขัดแย้งผ่านการสื่อสารที่ทรงพลัง' },
  ],
  gallery: [
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so1.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so2.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so3.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so4.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so5.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so6.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so7.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class1.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class2.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class3.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class4.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class5.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class6.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class7.jpg',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class8.jpg'
  ],
};

/* ─── Generic fallback detail page ─────────────────────────── */
const GenericDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  if (!speaker) return null;
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0f3460] pt-24 pb-40 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-blue-200 hover:text-[#c5a059] transition-colors font-bold mb-10 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </Link>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <div className="bg-white p-4 rounded-[3rem] shadow-2xl relative">
                <img src={speaker.image} alt={speaker.name} className="w-full h-[400px] object-cover rounded-[2.5rem]" />
                <div className="absolute -bottom-6 -right-6 bg-[#c5a059] p-6 rounded-[1.5rem] shadow-xl text-white text-center border-4 border-white">
                  <Star className="w-6 h-6 mb-1 mx-auto" />
                  <p className="text-xs font-black uppercase tracking-widest">Expert</p>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight text-white">{speaker.name}</h1>
              {speaker.title && <p className="text-lg text-[#c5a059] font-bold uppercase tracking-[0.15em] mb-8">{speaker.title}</p>}
              <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl">{speaker.longBio || speaker.bio}</p>
              <a href={CONTACT_INFO.lineUrl} className="inline-flex items-center gap-3 bg-[#c5a059] text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-[#0f3460] transition-all">
                <MessageCircle className="w-5 h-5" /> นัดปรึกษาหลักสูตร
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#0f3460] mb-6 border-l-4 border-[#c5a059] pl-5">ความเชี่ยวชาญ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(speaker.expertise || []).map((exp, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
                    <span className="font-bold text-[#0f3460]">{exp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#0f3460] mb-6 border-l-4 border-[#c5a059] pl-5">ผลงานและประสบการณ์</h2>
              <ul className="space-y-4">
                {(speaker.achievements || []).map((ach, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <Award className="w-5 h-5 text-[#c5a059] flex-shrink-0 mt-1" />
                    <p className="text-gray-600 leading-relaxed">{ach}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            {taughtCourses.length > 0 && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-[#0f3460] mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#c5a059]" /> หลักสูตรที่สอน
                </h3>
                <div className="space-y-4">
                  {taughtCourses.map(course => (
                    <Link key={course.id} to={`/courses/${course.id}`} className="block p-3 rounded-xl border border-gray-100 hover:border-[#c5a059] transition-all">
                      <img src={course.image} className="w-full h-28 object-cover rounded-lg mb-3" alt={course.title} />
                      <h4 className="font-bold text-[#0f3460] text-sm">{course.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-gradient-to-br from-[#c5a059] to-[#e0c58e] p-8 rounded-[2.5rem] text-white shadow-xl">
              <h4 className="text-lg font-black mb-3">ติดต่อวิทยากร</h4>
              <p className="text-white/80 text-sm mb-6">สอบถามตารางงานและรับใบเสนอราคา</p>
              <div className="space-y-3">
                {speaker.socials?.phone && (
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <Phone className="w-4 h-4" /> {speaker.socials.phone}
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm font-bold">
                  <MessageCircle className="w-4 h-4" /> Line: {speaker.socials?.line || CONTACT_INFO.line}
                </div>
              </div>
              <a href={CONTACT_INFO.lineUrl} className="mt-6 w-full block text-center bg-white text-[#c5a059] py-3 rounded-xl font-black hover:bg-[#0f3460] hover:text-white transition-all">
                ส่งข้อความ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Knight Kraiput Premium Detail Page ─────────────────────── */
const KnightKraiputDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  const K_DATA = {
    positions: [
      'ผู้ช่วยประธานสภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย',
      'คณะทำงานรัฐมนตรีว่าการกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
      'CEO, Guardian Global Security Co., Ltd.',
      'ประธานเจ้าหน้าที่บริหาร (CEO) บริษัท นิวไดซ์ จำกัด (Newdice Co., Ltd.)',
      'นายกสมาคมศิษย์เก่าโรงเรียนสาธิตมหาวิทยาลัยศิลปากร (วาระปี 2566 – 2568)',
      'คณะกรรมการบริหารหอการค้าจังหวัดนครปฐม (วาระปี 2566 – 2568)',
      'อนุกรรมการ ยุทธศาสตร์และเทคโนโลยีสารสนเทศ สภาสมาคมสตรีแห่งชาติ ในพระบรมราชินูปถัมภ์',
      'อนุกรรมการ ขับเคลื่อนเศรษฐกิจดิจิทัลฯ (SME/Digital Nomad) สภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย',
      'เลขานุการ คณะกรรมการยุทธศาสตร์ สภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย'
    ],
    experience: [
      'ที่ปรึกษาบริษัท Newdice (Digital Marketing & Solution)',
      'ที่ปรึกษาอาวุโสด้านบริหารจัดการกลยุทธ์และการเปลี่ยนแปลง (Corporate Strategy & Transformation)',
      'กรรมการ สถาบันวิสาหกิจขนาดกลางและขนาดย่อมอุตสาหกรรมการผลิต (SMI) สภาอุตสาหกรรมแห่งประเทศไทย (2563-2565)',
      'กรรมการบริษัท ประชารัฐรักสามัคคีนครปฐม (วิสาหกิจเพื่อสังคม) จำกัด',
      'ที่ปรึกษาประธานคณะกรรมาธิการการสื่อสาร โทรคมนาคม และดิจิทัลเพื่อเศรษฐกิจและสังคม',
      'เลขานุการ คณะอนุกรรมาธิการส่งเสริมวิสาหกิจเริ่มต้น (Start-up) และดึงดูดบุคลากรทักษะสูงจากต่างประเทศ (Global Talent)'
    ],
    education: [
      'ปริญญาโท บริหารธุรกิจมหาบัณฑิต (MBA - Global Business Management) มหาวิทยาลัยรามคำแหง',
      'ปริญญาตรี ศิลปศาสตรบัณฑิต (BA - International Business Management) มหาวิทยาลัยเกษตรศาสตร์'
    ],
    training: [
      'หลักสูตร ผู้บริหารด้านความมั่นคงปลอดภัยไซเบอร์ (CISO) รุ่นที่ 2 (สกมช.)',
      'หลักสูตร CEO-Smart (รุ่นที่ 1) หอการค้าไทย และมหาวิทยาลัยหอการค้าไทย',
      'หลักสูตร การบริหารจัดการด้านความมั่นคงขั้นสูง (สวพช. มอก. รุ่นที่ 11)',
      'หลักสูตร ผู้นำยุคใหม่เพื่อการเปลี่ยนแปลง (Leadership for Change รุ่นที่ 10) มูลนิธิสัมมาชีพ'
    ],
    otherWork: [
      'ที่ปรึกษาอาวุโสด้านบริหารจัดการกลยุทธ์และการเปลี่ยนแปลง (Corporate Strategy & Transformation)',
      'ที่ปรึกษาบริษัท Newdice (Digital Marketing & Solution)',
      'คณะทำงาน รัฐมนตรีว่าการกระทรวงประมง (อินโดนีเซีย)'
    ],
    gallery: [
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha2.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha3.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha4.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha5.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha6.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha7.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha8.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha9.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha10.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha11.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha12.jpg',
      'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha13.jpg'
    ]
  };

  return (
    <div className="bg-[#050a14] min-h-screen text-white overflow-x-hidden font-sans">
      <SEO 
        title={`${speaker.name} | วิทยากรผู้เชี่ยวชาญด้านความปลอดภัยและเทคโนโลยีสื่อสาร`}
        description="ผู้ช่วยประธานสภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย และ CEO Guardian Global Security ผู้เชี่ยวชาญด้านความปลอดภัย ไซเบอร์ และยุทธศาสตร์ดิจิทัลเพื่อเศรษฐกิจและสังคม"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c5a059]/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-white/50 hover:text-[#c5a059] transition-colors font-bold mb-12 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </Link>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-2/5 relative">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#c5a059] to-blue-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-gray-900 rounded-[2.5rem] overflow-hidden border border-white/10">
                  <img src={speaker.image} alt={speaker.name} className="w-full h-auto object-cover" />
                </div>
                {/* Contact Badge */}
                <div className="absolute -bottom-6 -right-6 bg-[#0f3460] border-4 border-[#050a14] p-6 rounded-[2rem] shadow-2xl flex flex-col items-center min-w-[160px]">
                  <p className="text-[#c5a059] font-black text-xs uppercase tracking-widest mb-2">Connect</p>
                  <div className="flex gap-4">
                    <a href={`tel:${CONTACT_INFO.phone}`} className="p-2 bg-white/5 rounded-full hover:bg-[#c5a059] transition-colors">
                      <Phone className="w-4 h-4" />
                    </a>
                    <a href={CONTACT_INFO.lineUrl} className="p-2 bg-white/5 rounded-full hover:bg-[#c5a059] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/5 pt-4">
              <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4 text-[#c5a059]" />
                <span className="text-[#c5a059] font-black text-xs uppercase tracking-widest leading-none">Senior Advisor & Professional Speaker</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                {speaker.name.split(' (')[0]}
                <span className="block text-3xl md:text-4xl text-[#c5a059] mt-2 font-bold">{speaker.name.includes('(') ? `(${speaker.name.split('(')[1]}` : ''}</span>
              </h1>
              <div className="space-y-4 mb-10 max-w-xl">
                <p className="text-xl text-white/90 font-bold border-l-4 border-[#c5a059] pl-6 leading-relaxed bg-white/5 py-4 rounded-r-2xl">
                  {K_DATA.positions[0]}
                </p>
                <p className="text-lg text-white/60 leading-relaxed font-medium pl-6">
                  {K_DATA.positions[1]}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href={CONTACT_INFO.lineUrl} className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:scale-105 transition-all">
                  ติดต่อวิทยากร
                </a>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                   <div className="text-center">
                      <p className="text-2xl font-black text-[#c5a059]">10+</p>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Exp Years</p>
                   </div>
                   <div className="w-px h-8 bg-white/10"></div>
                   <div className="text-center">
                      <p className="text-2xl font-black text-[#c5a059]">100+</p>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Keynotes</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Professional Detail */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Experience */}
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-600/10 rounded-2xl">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-black">ตำแหน่งพหุภาคีและประสบการณ์ระดับชาติ</h2>
                </div>
                <div className="grid gap-6">
                  {K_DATA.positions.slice(2).map((pos, i) => (
                    <div key={i} className="flex gap-5 group items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#c5a059] group-hover:scale-150 transition-transform"></div>
                      <p className="text-lg text-white/80 font-bold group-hover:text-white transition-colors leading-relaxed">{pos}</p>
                    </div>
                  ))}
                  <div className="h-px bg-white/10 my-4"></div>
                  {K_DATA.experience.map((exp, i) => (
                    <div key={i} className="flex gap-5 group items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full border border-[#c5a059]"></div>
                      <p className="text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">{exp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training */}
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-600/10 rounded-2xl">
                    <BookOpen className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-black">การศึกษาและการพัฒนาคุณวุฒิ</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[#c5a059] font-black text-xs uppercase tracking-widest mb-4">Academic Background</p>
                    <div className="space-y-4">
                      {K_DATA.education.map((edu, i) => (
                        <p key={i} className="text-white/80 font-bold leading-relaxed">{edu}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#c5a059] font-black text-xs uppercase tracking-widest mb-4">Professional Training</p>
                    <div className="space-y-4">
                      {K_DATA.training.map((trn, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                          <p className="text-sm text-white/60">{trn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Sidebar Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-gradient-to-br from-[#c5a059]/20 to-transparent border border-[#c5a059]/30 rounded-[3rem] p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black">บทบาทที่ปรึกษา</h3>
                  <Target className="w-6 h-6 text-[#c5a059]" />
                </div>
                <div className="space-y-6">
                  {K_DATA.otherWork.map((work, i) => (
                    <div key={i} className="pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <p className="text-sm text-white/50 mb-2 font-bold uppercase tracking-widest">Advisory {i+1}</p>
                      <p className="text-white/80 font-bold leading-relaxed">{work}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Taught Courses */}
              {taughtCourses.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10">
                  <h3 className="text-xl font-black mb-8">หลักสูตรโดยคุณไนท์</h3>
                  <div className="space-y-6">
                    {taughtCourses.map(course => (
                      <Link key={course.id} to={`/courses/${course.id}`} className="group block relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#c5a059] transition-all">
                        <img src={course.image} className="w-full h-32 object-cover opacity-50 group-hover:opacity-80 transition-opacity" alt={course.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="font-bold text-white text-sm group-hover:text-[#c5a059] transition-colors">{course.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Activity Gallery - Bento Grid */}
      <section className="py-24 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-[#c5a059] font-black text-xs uppercase tracking-[0.3em] mb-4">Impact & Activities</p>
              <h2 className="text-4xl font-black leading-tight">ภาพบรรยากาศการบรรยาย<br/>และกิจกรรมต่างๆ</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl flex items-center gap-4">
               <Calendar className="w-6 h-6 text-[#c5a059]" />
               <p className="text-white/80 font-bold leading-none">พร้อมบรรยายทั่วประเทศ</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {K_DATA.gallery.map((img, idx) => {
              const spanClass = idx === 0 ? 'col-span-2 row-span-2' : '';
              return (
                <div key={idx} className={`${spanClass} rounded-[2rem] overflow-hidden group border border-white/10 relative`}>
                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt={`Activity ${idx + 1}`} />
                  {idx === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                       <p className="text-white font-bold text-lg">ประสบการณ์การบรรยายระดับชาติ</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-20 text-center">
            <a href={CONTACT_INFO.lineUrl} className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-6 rounded-3xl hover:bg-[#c5a059] transition-all">
              <span className="font-black text-lg">จองตัววิทยากรคุณไนท์</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer Support */}
      <section className="py-24 bg-gradient-to-t from-blue-900/20 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="w-12 h-12 text-[#c5a059]/30 mx-auto mb-8" />
          <p className="text-3xl md:text-5xl font-black italic leading-tight mb-12" style={{ letterSpacing: '-0.02em' }}>
            "การสื่อสารที่ทรงพลังที่สุด<br/>คือการสื่อสารที่ทำให้เกิด<span className="text-[#c5a059]">การลงมือทำ</span>"
          </p>
          <div className="w-12 h-1 bg-[#c5a059] mx-auto mb-6"></div>
          <p className="text-xl font-bold text-white/80">Knight Kraiput Intarayotha</p>
          <p className="text-white/40 uppercase tracking-widest text-sm font-black mt-2">CEO, NEWDICE</p>
        </div>
      </section>
    </div>
  );
};

/* ─── Den Master Fa Premium Detail Page ─────────────────────── */
const DenMasterFaDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  const [activeProblem, setActiveProblem] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveProblem(p => (p + 1) % DEN_SPECIFIC.problems.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const featuredClients = CLIENTS.slice(0, 8);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <SEO
        title="ครูเด่น มาสเตอร์ฟา | วิทยากรอบรมองค์กร เปลี่ยนพฤติกรรมคนได้จริง"
        description="วิทยากรอบรมองค์กรและ Master Facilitator ประสบการณ์ 18+ ปี 1,000+ เวที ผู้เชี่ยวชาญ Transformative Learning ที่เปลี่ยนพฤติกรรมองค์กรได้จริง ไม่ใช่แค่สร้างแรงบันดาลใจชั่วคราว"
      />

      {/* ── 1. HERO SECTION ─────────────────────────────────── */}
      <section className="relative bg-[#0a1628] overflow-hidden min-h-screen flex items-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #c5a059 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #1a4d8c 0%, transparent 70%)' }} />
          {/* Diagonal decorative lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c5a059 0px, #c5a059 1px, transparent 1px, transparent 60px)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10 w-full">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-[#c5a059]/70 hover:text-[#c5a059] transition-colors font-semibold mb-12 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> วิทยากร / ผู้เชี่ยวชาญ
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full px-5 py-2 mb-8">
                <Star className="w-4 h-4 text-[#c5a059]" fill="currentColor" />
                <span className="text-[#c5a059] font-bold text-sm tracking-wider">Master Facilitator & Learning Designer</span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.1] mb-6"
                style={{ letterSpacing: '-0.02em' }}>
                วิทยากรอบรมองค์กร
                <span className="block mt-2" style={{
                  background: 'linear-gradient(135deg, #c5a059 0%, #e0c58e 50%, #c5a059 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  ที่เปลี่ยนพฤติกรรมคนได้จริง
                </span>
              </h1>

              {/* Name */}
              <p className="text-xl text-white/80 font-semibold mb-4">
                ครูเด่น มาสเตอร์ฟา (อนุสรณ์ หนองนา)
              </p>

              {/* Hook */}
              <p className="text-lg text-white/85 leading-relaxed mb-10 max-w-xl">
                "ไม่ใช่แค่การพูดบนเวที แต่คือการ<strong className="text-white/90">เปลี่ยนวิธีคิด</strong>ของคนทั้งองค์กร"
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 btn-premium bg-[#c5a059] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[0_8px_32px_rgba(197,160,89,0.4)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  จองคิววิทยากร
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {CONTACT_INFO.phone}
                </a>
              </div>

              {/* Microcopy */}
              <p className="mt-4 text-white/65 text-sm">
                ตารางคิวมีจำกัด — แนะนำจองล่วงหน้า 1-2 เดือน
              </p>
            </div>

            {/* RIGHT: Photo */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Frame */}
                <div className="relative w-[340px] md:w-[400px]">
                  <div className="absolute inset-0 rounded-[2.5rem] rotate-3 opacity-30"
                    style={{ background: 'linear-gradient(135deg, #c5a059, #0f3460)' }} />
                  <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl">
                    <img
                      src={speaker.image}
                      alt="ครูเด่น มาสเตอร์ฟา วิทยากรอบรมองค์กร"
                      className="w-full h-[480px] object-cover rounded-[2rem]"
                    />
                  </div>
                  {/* Overlay badge */}
                  <div className="absolute -bottom-6 -left-6 bg-[#0f3460] border-4 border-white rounded-[1.5rem] p-5 shadow-2xl text-white text-center min-w-[140px]">
                    <p className="text-3xl font-black text-[#c5a059]">18+</p>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-80">ปีประสบการณ์</p>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-[#c5a059] rounded-[1.2rem] p-4 shadow-xl text-white text-center min-w-[110px]">
                    <p className="text-2xl font-black">1K+</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider">เวที</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {DEN_SPECIFIC.stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <Icon className="w-6 h-6 text-[#c5a059] mx-auto mb-3" />
                  <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-white/85 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 2. TRUST SIGNAL — Client Logos ─────────────────── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-10">
            เบื้องหลังความสำเร็จขององค์กรชั้นนำกว่า 100 แห่ง
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {featuredClients.map((client, i) => (
              <img
                key={i}
                src={client.logo}
                alt={client.name}
                title={client.name}
                className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. EMOTIONAL HOOK — The Problem ─────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">ก่อนจะตัดสินใจ</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] mb-6" style={{ letterSpacing: '-0.02em' }}>
            ทีมคุณกำลังเจอปัญหานี้อยู่หรือไม่?
          </h2>
          <div className="h-px w-16 bg-[#c5a059] mx-auto mb-12" />
          <div className="space-y-4 max-w-2xl mx-auto mb-16">
            {DEN_SPECIFIC.problems.map((problem, i) => (
              <div
                key={i}
                onClick={() => setActiveProblem(i)}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-left ${
                  activeProblem === i
                    ? 'border-[#c5a059] bg-amber-50 shadow-md'
                    : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm transition-colors ${
                  activeProblem === i ? 'bg-[#c5a059] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i + 1}
                </div>
                <p className={`font-semibold leading-relaxed transition-colors ${
                  activeProblem === i ? 'text-[#0a1628]' : 'text-gray-500'
                }`}>{problem}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#0a1628] rounded-3xl p-8 md:p-10 text-white">
            <Zap className="w-10 h-10 text-[#c5a059] mx-auto mb-4" />
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              ถึงเวลาเปลี่ยนจากการ <span className="text-white/80 line-through">"สอน" (Teaching)</span>
              <br />
              เป็นการ <span className="text-[#c5a059]">"ฟื้นฟู" (Facilitating)</span> ศักยภาพที่แท้จริง
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. CONTRAST — Trainer vs Facilitator ────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">ความแตกต่างที่ชัดเจน</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628]" style={{ letterSpacing: '-0.02em' }}>
              ทำไมต้องเป็น Facilitator ไม่ใช่แค่ Trainer?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEN_SPECIFIC.trainerVsFacilitator.map((col, colIdx) => (
              <div key={colIdx} className={`rounded-3xl p-8 ${
                colIdx === 0
                  ? 'bg-white border-2 border-gray-100'
                  : 'bg-[#0a1628] border-2 border-[#c5a059]/30 shadow-2xl'
              }`}>
                <div className={`flex items-center gap-3 mb-6`}>
                  {colIdx === 1 && <div className="w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center"><Star className="w-4 h-4 text-white" fill="currentColor" /></div>}
                  <h3 className={`font-black text-lg ${colIdx === 0 ? 'text-gray-400' : 'text-white'}`}>
                    {col.label}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {col.points.map((point, i) => (
                    <li key={i} className={`flex items-center gap-3 py-2 border-b last:border-0 ${
                      colIdx === 0 ? 'border-gray-100' : 'border-white/10'
                    }`}>
                      {colIdx === 0
                        ? <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-400 text-xs font-black flex-shrink-0">✗</span>
                        : <CheckCircle2 className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
                      }
                      <span className={`font-semibold text-sm ${colIdx === 0 ? 'text-gray-400' : 'text-white/90'}`}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CAP THEORY — Core Value ───────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">CAP Vision Story</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628]" style={{ letterSpacing: '-0.02em' }}>
              ทฤษฎีที่อยู่เบื้องหลังทุกกระบวนการ
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
              CAP ไม่ใช่แค่ชื่อ แต่คือปรัชญาที่เชื่อว่าการพัฒนาคนต้องเริ่มจากการสร้างศักยภาพ
              ผ่านการตระหนักรู้ และวัดผลด้วยผลลัพธ์ที่จับต้องได้
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEN_SPECIFIC.capValues.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="group relative overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`h-2 w-full bg-gradient-to-r ${cap.color}`} />
                  <div className="p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <span className="text-white text-2xl font-black">{cap.letter}</span>
                    </div>
                    <p className={`text-xs font-black tracking-widest uppercase mb-1 bg-gradient-to-r ${cap.color} bg-clip-text text-transparent`}>
                      {cap.title}
                    </p>
                    <h3 className="text-xl font-black text-[#0a1628] mb-3">{cap.titleTh}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5.5 DFA MODEL ───────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#0a1628] to-[#0f3460]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">ปรัชญาต้นฉบับ</p>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              DFA Model — Dialogue · Flow · Action
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto leading-relaxed">
              แนวคิดหลักของครูเด่นในการออกแบบกระบวนการเรียนรู้ที่มีประสิทธิภาพ
              <br />
              <span className="text-[#c5a059] font-semibold">"การสื่อสารที่เยียวยา นำไปสู่การไหลเวียนของพลังงานที่ดี และสร้างการกระทำที่ยั่งยืน"</span>
            </p>
          </div>

          {/* Flow Arrow Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {/* D */}
            <div className="flex-1 max-w-xs bg-white/8 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/12 hover:border-[#c5a059]/40 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-[#c5a059] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#c5a059]/30 group-hover:scale-105 transition-transform">
                <span className="text-white text-2xl font-black">D</span>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Dialogue</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                การสื่อสารที่เปิดพื้นที่ ฟัง ถาม สะท้อน สร้างความเชื่อมโยงในทีมและการเรียนรู้ร่วมกัน
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-[#c5a059]/15 text-[#c5a059] text-xs font-bold px-3 py-1.5 rounded-full">
                เปิดพื้นที่ · ฟัง · ถาม · สะท้อน
              </div>
            </div>

            {/* Arrow */}
            <div className="flex md:flex-col items-center justify-center px-4 py-2 md:py-0 text-[#c5a059]/50">
              <svg className="w-8 h-8 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>

            {/* F */}
            <div className="flex-1 max-w-xs bg-white/8 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/12 hover:border-blue-400/40 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <span className="text-white text-2xl font-black">F</span>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Flow</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                การออกแบบกระบวนการเรียนรู้ที่ลื่นไหล ทำให้ผู้เรียนมีส่วนร่วมอย่างต่อเนื่องและเกิดการเรียนรู้อย่างแท้จริง
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-blue-500/15 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full">
                ลื่นไหล · มีส่วนร่วม · เรียนรู้แท้จริง
              </div>
            </div>

            {/* Arrow */}
            <div className="flex md:flex-col items-center justify-center px-4 py-2 md:py-0 text-[#c5a059]/50">
              <svg className="w-8 h-8 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>

            {/* A */}
            <div className="flex-1 max-w-xs bg-white/8 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/12 hover:border-emerald-400/40 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                <span className="text-white text-2xl font-black">A</span>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Action</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                การลงมือเปลี่ยนแปลงและสร้างนิสัยใหม่ที่นำไปสู่ผลลัพธ์ที่วัดได้และยั่งยืน
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
                ลงมือทำ · วัดได้ · ยั่งยืน
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-8 py-4">
              <span className="text-2xl font-black text-[#c5a059] nav-font">D</span>
              <span className="text-white/30 text-lg">→</span>
              <span className="text-2xl font-black text-blue-400 nav-font">F</span>
              <span className="text-white/30 text-lg">→</span>
              <span className="text-2xl font-black text-emerald-400 nav-font">A</span>
              <span className="w-px h-6 bg-white/20 mx-2" />
              <span className="text-white/60 text-sm">กรอบแนวคิดต้นฉบับโดย ครูเด่น มาสเตอร์ฟา</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. METHODOLOGY ──────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#0a1628] to-[#0f3460]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">กระบวนการเรียนรู้</p>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              Transformative Learning คืออะไร?
            </h2>
            <p className="mt-4 text-white/85 max-w-2xl mx-auto">
              เราเชื่อว่า "ความรู้อย่างเดียวเปลี่ยนคนไม่ได้ แต่ประสบการณ์ต่างหากที่เปลี่ยนคนได้"
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEN_SPECIFIC.methodologies.map((method, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#c5a059]/40 transition-all duration-300">
                <div className="step-number mb-5">{method.index}</div>
                <h3 className="font-black text-white mb-3">{method.name}</h3>
                <p className="text-white/85 text-sm leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. KEY EXPERTISE ────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">ความเชี่ยวชาญหลัก</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628]" style={{ letterSpacing: '-0.02em' }}>
              หมวดหมู่ความสามารถ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEN_SPECIFIC.expertiseAreas.map((area, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="font-black text-[#0f3460] mb-5 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#c5a059]/15 flex items-center justify-center text-[#c5a059] text-sm font-black">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {area.category}
                </h3>
                <ul className="space-y-2">
                  {area.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                      <span className="font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SIGNATURE PROGRAMS ───────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">หลักสูตรซิกเนเจอร์</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628]" style={{ letterSpacing: '-0.02em' }}>
              หลักสูตรที่ออกแบบมาเพื่อผลลัพธ์
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEN_SPECIFIC.signaturePrograms.map((prog, i) => (
              <div key={i} className="group relative bg-gray-50 border-2 border-gray-100 hover:border-[#c5a059] rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {prog.tag === 'bestseller' && (
                  <div className="absolute -top-3 -right-3 bg-[#c5a059] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    Bestseller
                  </div>
                )}
                {prog.tag === 'popular' && (
                  <div className="absolute -top-3 -right-3 bg-[#0f3460] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    Popular
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-black text-[#0a1628] group-hover:text-[#0f3460] transition-colors">{prog.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-[#c5a059]" />
                  <span className="text-[#c5a059] font-bold text-sm">{prog.duration}</span>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-gray-100">
                  <Target className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">{prog.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-6">ทุกหลักสูตรออกแบบได้ตามความต้องการขององค์กร (Customized In-house Training)</p>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-premium bg-[#0f3460] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#c5a059] transition-colors"
            >
              <BookOpen className="w-5 h-5" /> ดูหลักสูตรทั้งหมด
            </a>
          </div>
        </div>
      </section>

      {/* ── 9. RELATED COURSES ──────────────────────────────── */}
      {taughtCourses.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-black text-[#0a1628] mb-8 text-center">หลักสูตรที่เปิดสอน</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {taughtCourses.slice(0, 3).map(course => (
                <Link key={course.id} to={`/courses/${course.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-6">
                    <p className="text-xs font-black text-[#c5a059] uppercase tracking-widest mb-2">{course.category}</p>
                    <h3 className="font-black text-[#0f3460] group-hover:text-[#c5a059] transition-colors">{course.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9.5 IMPACT & ACTIVITIES ──────────────────────────── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div data-aos="fade-up">
              <p className="text-[#c5a059] font-black text-xs uppercase tracking-[0.3em] mb-4">Impact & Activities</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#0a1628] leading-tight">
                ภาพบรรยากาศการบรรยาย<br/>และกิจกรรมต่างๆ
              </h2>
            </div>
            <div className="bg-gray-50 border border-gray-100 px-8 py-4 rounded-2xl flex items-center gap-4 shadow-sm" data-aos="fade-left">
               <Calendar className="w-6 h-6 text-[#c5a059]" />
               <p className="text-[#0a1628] font-bold leading-none">พร้อมบรรยายทั่วประเทศ</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {DEN_SPECIFIC.gallery.map((img, idx) => {
              const spanClass = idx === 0 ? 'col-span-2 row-span-2' : '';
              return (
                <div key={idx} className={`${spanClass} rounded-[2rem] overflow-hidden group border border-gray-100 shadow-lg relative`} data-aos="zoom-in">
                  <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" alt={`Den Masterfa Activity ${idx + 1}`} />
                  {idx === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <p className="text-white font-bold">สัมผัสประสบการณ์การเรียนรู้ระดับพรีเมี่ยม</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Bar Interaction */}
          <div className="mt-20 bg-[#0a1628] rounded-[3rem] p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8">
                ยกระดับองค์กรของคุณด้วย<br/>
                <span className="text-[#c5a059]">กระบวนการ Facilitation ระดับมืออาชีพ</span>
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href={CONTACT_INFO.lineUrl} className="group inline-flex items-center gap-4 bg-[#c5a059] text-white px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#c5a059]/20">
                  <span className="font-black text-lg">ปรึกษาคิวงานครูเด่น</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
                <a href={`tel:${CONTACT_INFO.phone}`} className="inline-flex items-center gap-4 bg-white/10 border border-white/20 text-white px-10 py-5 rounded-2xl hover:bg-white/20 transition-all font-bold">
                  <Phone className="w-5 h-5 text-[#c5a059]" />
                  สอบถามโทรด่วน
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. TESTIMONIALS (Social Proof) ─────────────────── */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-sm mb-4">เสียงจากลูกค้า</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628]" style={{ letterSpacing: '-0.02em' }}>
              สิ่งที่ลูกค้าพูดถึงครูเด่น
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEN_SPECIFIC.testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-shadow relative">
                <Quote className="w-8 h-8 text-[#c5a059]/30 mb-4" />
                <p className="text-gray-700 leading-relaxed font-medium mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0f3460] to-[#c5a059] flex items-center justify-center text-white font-black text-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <p className="font-bold text-[#0a1628] text-sm">{testimonial.role}</p>
                    <p className="text-gray-400 text-xs">{testimonial.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Dr. So Premium Detail Page ────────────────────────────── */
const DrSoDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker, taughtCourses }) => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden font-sans">
      <SEO
        title="Dr.So วิทยากรจิตใต้สำนึก | อบรมการสื่อสารและพัฒนาศักยภาพ"
        description="ดร.พิศลยา บัวแก้ว วิทยากรผู้เชี่ยวชาญด้านพลังจิตใต้สำนึก ช่วยพัฒนาทักษะการพูด การสื่อสาร และสร้างวิทยากรมืออาชีพ พร้อมหลักสูตรสำหรับองค์กร"
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-32 pb-24 bg-[#0a1628] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c5a059]/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/speakers" className="inline-flex items-center gap-2 text-white/50 hover:text-[#c5a059] transition-colors font-bold mb-12 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> วิทยากร / ผู้เชี่ยวชาญ
          </Link>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-2/5">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#c5a059] to-indigo-600 rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-3 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
                  <img src={speaker.image || SO_SPECIFIC.gallery[0]} alt={ speaker.name } className="w-full h-[550px] object-cover rounded-[2.5rem]" />
                </div>
                {/* Float Badges */}
                <div className="absolute -bottom-6 -right-6 bg-[#0f3460] border-4 border-white p-6 rounded-[2rem] shadow-2xl text-center min-w-[150px]">
                   <p className="text-[#c5a059] font-black text-2xl">Expert</p>
                   <p className="text-[10px] text-white/60 uppercase tracking-widest font-black">Subconscious</p>
                </div>
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="inline-flex items-center gap-2 bg-[#c5a059]/15 border border-[#c5a059]/30 px-5 py-2 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span className="text-[#c5a059] font-black text-xs uppercase tracking-widest">Transformative Speaker</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
                { speaker.name.split(' (')[0] } 
                <span className="block text-[#c5a059]">{ speaker.name.includes('(') ? `(${speaker.name.split('(')[1]}` : '' }</span>
              </h1>
              <h2 className="text-2xl text-white/80 font-bold mb-8 leading-relaxed max-w-2xl">
                { SO_SPECIFIC.heroHeadline }
              </h2>
              <p className="text-xl text-white/60 italic mb-10 leading-relaxed">
                { SO_SPECIFIC.heroSub }
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href={CONTACT_INFO.lineUrl} className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" /> จองวิทยากรวันนี้
                </a>
                <a href={`tel:${CONTACT_INFO.phone}`} className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/20 transition-all">
                  <Phone className="w-5 h-5 text-[#c5a059]" /> ติดต่อสอบถาม
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ── */}
      <section className="bg-[#0f3460] py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {SO_SPECIFIC.stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center group">
                    <div className="mb-4 inline-flex p-3 bg-white/5 rounded-2xl group-hover:bg-[#c5a059]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#c5a059]" />
                    </div>
                    <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                    <p className="text-white/60 text-sm font-bold tracking-tight">{stat.label}</p>
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      {/* ── 3. STORYTELLING BIO ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0a1628] mb-6">About Dr. So</h2>
            <div className="h-1 w-20 bg-[#c5a059] mx-auto rounded-full"></div>
          </div>
          <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-medium text-center md:text-left">
            <p>
              ดร.พิศลยา บัวแก้ว คือผู้บุกเบิกแนวทาง <strong>“การสื่อสารผ่านจิตใต้สำนึก”</strong> ที่ผสานศาสตร์จิตวิทยา การสื่อสาร และการบำบัดเข้าด้วยกันอย่างลึกซึ้ง
            </p>
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-[#c5a059] relative">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-gray-100 -scale-x-100" />
              <p className="text-2xl font-black text-[#0f3460] mb-0 relative z-10">
                “พลังการสื่อสารที่แท้จริง ไม่ได้เริ่มจากคำพูด…<br/>แต่เริ่มจากภายใน”
              </p>
            </div>
            <p>
              ด้วยความเชื่อนี้ เธอจึงออกแบบกระบวนการเรียนรู้ที่ช่วยให้ผู้คนปลดล็อกความกลัว ค้นพบตัวตนที่แท้จริง และสื่อสารได้อย่าง “ตรงใจ” และ “ทรงพลัง” 
            </p>
            <p>
              ในฐานะ <strong>ผู้อำนวยการศูนย์พัฒนาศักยภาพพลังจิตใต้สำนึก</strong> Dr. So ได้พัฒนาหลักสูตรที่ช่วยให้ “มือใหม่” ก้าวสู่การเป็นวิทยากรมืออาชีพได้จริง
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. KEY EXPERTISE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div>
                <p className="text-[#c5a059] font-black text-xs uppercase tracking-[0.3em] mb-4">Core Competency</p>
                <h2 className="text-4xl font-black text-[#0a1628]">ความเชี่ยวชาญ (Key Expertise)</h2>
             </div>
             <div className="hidden md:block w-32 h-1 bg-gray-100 mb-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SO_SPECIFIC.expertise.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <div key={i} className="group bg-gray-50 p-10 rounded-[2.5rem] border border-transparent hover:border-[#c5a059] hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#0f3460] transition-colors">
                     <Icon className="w-8 h-8 text-[#c5a059]" />
                  </div>
                  <h3 className="text-xl font-black text-[#0a1628] mb-4 group-hover:text-[#0f3460]">{exp.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{exp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. SIGNATURE PROGRAM ── */}
      <section className="py-24 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] -ml-40 -mt-40"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-[#c5a059] to-[#e0c58e] p-12 md:p-20 rounded-[4rem] shadow-2xl relative">
            <div className="absolute top-10 right-10 opacity-20"><Star className="w-20 h-20 text-white" fill="currentColor" /></div>
            
            <p className="text-[#0f3460] font-black text-xs uppercase tracking-[0.4em] mb-6">Signature Program</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3460] mb-8 leading-tight">
              🌟 ก้าวแรกสู่ “วิทยากรจิตใต้สำนึก”
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-black text-[#0f3460] mb-6 border-b-2 border-[#0f3460]/20 pb-2">สิ่งที่ผู้เรียนจะได้รับ:</h3>
                <ul className="space-y-4">
                   {['เข้าใจกลไกจิตใต้สำนึก', 'พูดได้อย่างเป็นธรรมชาติ ไม่ฝืน', 'สร้าง Impact กับผู้ฟังได้ทันที', 'มี Script ส่วนตัวที่ใช้ได้จริง'].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-[#0f3460] font-bold text-lg">
                        <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" fill="#0f3460" />
                        {item}
                     </li>
                   ))}
                </ul>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl border border-white/30">
                 <p className="text-[#0f3460] font-bold leading-relaxed">
                    หลักสูตรที่ช่วยเปลี่ยนคนธรรมดาที่ไม่กล้าพูด ให้ระเบิดศักยภาพออกมาเป็นสไตล์การพูดเฉพาะตัวที่ตรงใจผู้ฟังระดับจิตใต้สำนึก
                 </p>
                 <a href={CONTACT_INFO.lineUrl} className="mt-8 w-full block bg-[#0f3460] text-white py-5 rounded-2xl font-black text-center hover:bg-indigo-900 transition-colors">
                    สนใจจัดอบรมองค์กร
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TRANSFORMATION RESULTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-black text-xs uppercase tracking-[0.3em] mb-4">Transformation Results</p>
            <h2 className="text-4xl font-black text-[#0a1628]">ผลลัพธ์ที่เกิดขึ้นจริง</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'ความมั่นใจในการพูด', value: '80-100%', color: 'from-blue-500 to-indigo-600' },
              { label: 'ความชัดเจนของเป้าหมาย', value: '95%', color: 'from-[#c5a059] to-[#e0c58e]' },
              { label: 'การลดความกลัวเวที', value: 'Full', color: 'from-emerald-500 to-teal-600' },
              { label: 'อัตราความพึงพอใจ', value: '10/10', color: 'from-rose-500 to-pink-600' },
            ].map((res, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[2rem] text-center hover:scale-105 transition-transform border border-gray-100">
                <p className={`text-4xl font-black bg-gradient-to-r ${res.color} bg-clip-text text-transparent mb-2`}>{res.value}</p>
                <p className="text-gray-500 font-bold text-sm tracking-tight">{res.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHY DR. SO + CAP VISION ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl font-black text-[#0f3460] mb-8">Why Dr. So + CAP Vision</h2>
                <div className="space-y-6">
                   {[
                     { title: 'CAP Theory', desc: 'ค้นพบตัวตนที่แท้จริงและขยายขีดความสามารถจากภายใน' },
                     { title: 'Transformative Learning', desc: 'เปลี่ยนพฤติกรรมและความเชื่อในระดับจิตใต้สำนึก' },
                     { title: 'Facilitation for Flow', desc: 'ดึงศักยภาพสูงสุดผ่านบรรยากาศการเรียนรู้ที่ลื่นไหล' }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-5 group">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a059] transition-colors">
                           <Zap className="w-5 h-5 text-[#c5a059] group-hover:text-white" />
                        </div>
                        <div>
                           <h4 className="font-black text-[#0a1628] text-lg mb-1">{item.title}</h4>
                           <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-[#0f3460] rounded-[3rem] p-10 md:p-16 text-white relative">
                <Quote className="w-12 h-12 text-[#c5a059]/40 mb-8" />
                <p className="text-2xl font-black leading-tight italic mb-8">
                  "การสื่อสารที่ทรงพลังไม่ได้อยู่ที่เทคนิค<br/> แต่อยู่ที่หัวใจที่ตื่นรู้และพร้อมจะส่งมอบคุณค่า"
                </p>
                <div className="w-16 h-1 bg-[#c5a059] rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 8. GALLERY ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0a1628]">บรรยากาศการเรียนรู้</h2>
            <p className="mt-4 text-gray-500">การเรียนรู้ไม่ได้เกิดจากการฟัง แต่เกิดจาก “การสัมผัสประสบการณ์จริง”</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             {SO_SPECIFIC.gallery.slice(1,9).map((img, i) => {
               const bentoClass = i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : '';
               return (
                 <div key={i} className={`rounded-[2rem] overflow-hidden group shadow-lg ${bentoClass}`}>
                   <img src={img} alt={`Atmosphere ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                 </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ SECTION ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#0a1628]">FAQ สำหรับองค์กร</h2>
          </div>
          <div className="space-y-4">
            {SO_SPECIFIC.faq.map((item, i) => (
              <details key={i} className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 open:shadow-xl transition-all">
                <summary className="list-none cursor-pointer flex justify-between items-center font-black text-[#0f3460]">
                  {item.q}
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform text-[#c5a059]" />
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-50 text-gray-500 font-medium leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-t from-[#0a1628] to-[#0f3460] text-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-indigo-500/10 blur-[150px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Brain className="w-12 h-12 text-[#c5a059] mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
             พร้อมปลดล็อกศักยภาพทีมของคุณแล้วหรือยัง?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
             ให้ Dr. So ช่วย “เปลี่ยนการสื่อสารของทีมคุณ”<br/>จากการพูดแบบเดิม → สู่การสื่อสารที่ทรงพลังจากภายใน
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
             <a href={CONTACT_INFO.lineUrl} className="group bg-[#c5a059] text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4">
               จองคิววิทยากรวันนี้ <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
             </a>
             <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] mb-1">📞 ด่วน</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-black">{ CONTACT_INFO.phone }</a>
             </div>
          </div>
          {/* Schema JSON-LD */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": speaker.name,
              "alternateName": "Dr. So",
              "jobTitle": "Subconscious Communication Trainer",
              "worksFor": {
                "@type": "Organization",
                "name": "CAP Vision Institute"
              },
              "knowsAbout": [
                "Subconscious Communication",
                "Public Speaking",
                "Personal Transformation",
                "Coaching"
              ],
              "telephone": CONTACT_INFO.phone,
              "email": "souloflightacademy@gmail.com"
            })}
          </script>
        </div>
      </section>
    </div>
  );
};

/* ─── Main Component ───────────────────────────────────────── */
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
        setSpeaker(null);
        setTaughtCourses([]);
        const fetchedSpeaker = await fetchInstructorBySlug(id);
        if (fetchedSpeaker) {
          setSpeaker(fetchedSpeaker);
          const allCourses = await fetchCourses();
          setTaughtCourses(allCourses.filter(c => c.instructor_id === fetchedSpeaker.id));
        } else {
          setSpeaker(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!speaker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl max-w-lg">
          <h2 className="text-2xl font-black text-[#0f3460] mb-4">ไม่พบข้อมูลวิทยากร</h2>
          <Link to="/speakers" className="text-[#c5a059] font-bold flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าวิทยากร
          </Link>
        </div>
      </div>
    );
  }

  // Den Master Fa gets premium high-converting page
  if (speaker.slug === 'den-masterfa') {
    return <DenMasterFaDetail speaker={speaker} taughtCourses={taughtCourses} />;
  }

  // Knight Kraiput Premium Profile
  if (speaker.slug === 'kraiput-intarayotha') {
    return <KnightKraiputDetail speaker={speaker} taughtCourses={taughtCourses} />;
  }

  // Dr. So Premium Profile
  if (speaker.slug === 'dr-so') {
    return <DrSoDetail speaker={speaker} taughtCourses={taughtCourses} />;
  }

  // Other speakers get generic detail page
  return <GenericDetail speaker={speaker} taughtCourses={taughtCourses} />;
};

export default SpeakerDetail;
