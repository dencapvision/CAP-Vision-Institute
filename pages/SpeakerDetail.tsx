import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Award, Star, MessageCircle, Phone, BookOpen,
  ChevronRight, Zap, Users, Brain, Target, Quote, Calendar, TrendingUp, Shield,
  Mic2, Sparkles, Heart, Presentation, ArrowRight, Building, Mail, Maximize2,
  Clock, ShieldCheck, ExternalLink, Download, FileText
} from 'lucide-react';
import { fetchInstructorBySlug } from '../services/instructors';
import { fetchCourses } from '../services/courses';
import type { Instructor, Course } from '../types';
import { CONTACT_INFO, CLIENTS, BRAND_INFO } from '../constants/brand';
import SEO from '../components/SEO';
import { DrSoBookingWizard } from '../components/DrSo/BookingWizard';
import { BookingWizard } from '../components/Speakers/BookingWizard';
import {
  IconGoldCrestStar,
  IconInstituteShield,
  IconFacilitatorMastery,
  IconLeadership,
  IconTeamSynergy
} from '../components/icons/CapBrandIcons';

/* ─── 1. DATA CONFIGS ────────────────────────────────────────── */

const DEN_SPECIFIC = {
  heroHeadline: 'ครูเด่น มาสเตอร์ฟา (Master Facilitator)',
  heroSub: 'ผู้อำนวยการสถาบันผู้เชี่ยวชาญด้าน Transformative Learning, 6D CPS Model และการออกแบบกระบวนการเรียนรู้เพื่อยกระดับภาวะผู้นำและทีมงานอย่างยั่งยืน',
  stats: [
    { value: '18+', label: 'ปีประสบการณ์', icon: ShieldCheck },
    { value: '1,000+', label: 'เวทีทั่วประเทศ', icon: Award },
    { value: '200+', label: 'องค์กรชั้นนำ', icon: Users },
    { value: '3', label: 'Framework ต้นฉบับ', icon: Brain },
  ],
  trainerVsFacilitator: [
    {
      label: 'วิทยากรทั่วไป (Traditional Trainer)',
      points: [
        'เน้นการบรรยายทางเดียว 6-8 ชั่วโมง',
        'ผู้เรียนรับฟังแบบ Passive',
        'วัดผลด้วยแบบสอบถามความพอใจ',
        'จบแล้วลืม ไม่เกิดการลงมือทำจริง',
        'เปลี่ยนเพียงระดับความรู้ (Knowledge)'
      ]
    },
    {
      label: 'ครูเด่น มาสเตอร์ฟา (Master Facilitator)',
      points: [
        'ใช้ Facilitation ดึงศักยภาพและปัญญาในตัวผู้เรียน',
        'ทุกคนมีส่วนร่วมคิดและลงมือทำ 100%',
        'วัดผลด้วยพฤติกรรมและการทำงานร่วมกันที่เปลี่ยนจริง',
        'มี Action Plan และเครื่องมือติดตามผล',
        'เปลี่ยนลึกถึงระดับกรอบคิด (Mindset & Behavior)'
      ]
    },
  ],
  capValues: [
    {
      letter: 'C',
      title: 'CAPACITY',
      titleTh: 'ศักยภาพที่ไร้ขีดจำกัด',
      desc: 'มนุษย์ทุกคนมีศักยภาพที่รอการปลดปล่อย หน้าที่ของกระบวนกรคือสร้างพื้นที่ปลอดภัยเพื่อให้ทีมกล้าคิด กล้าแชร์ และเผยศักยภาพนั้นออกมา',
      icon: MessageCircle,
      badge: 'bg-blue-50 text-[#2563EB]',
    },
    {
      letter: 'A',
      title: 'AWARENESS',
      titleTh: 'การตระหนักรู้จากภายใน',
      desc: 'การเปลี่ยนแปลงที่ยั่งยืนเริ่มจาก Self & Team Awareness รู้จักจุดแข็ง ข้อจำกัด และมองเห็นโอกาสใหม่ในการเติบโตร่วมกัน',
      icon: Brain,
      badge: 'bg-amber-50 text-amber-800',
    },
    {
      letter: 'P',
      title: 'PERFORMANCE',
      titleTh: 'ผลลัพธ์ที่วัดผลได้จริง',
      desc: 'การเรียนรู้ต้องแปลงเป็นผลงานที่จับต้องได้ ทลาย Silo สื่อสารชัดเจน และขับเคลื่อนเป้าหมายองค์กรได้อย่างเป็นรูปธรรม',
      icon: TrendingUp,
      badge: 'bg-emerald-50 text-emerald-700',
    },
  ],
  methodologies: [
    { name: 'Transformative Learning', desc: 'เปลี่ยนมุมมองและกรอบคิดผ่านประสบการณ์จริง ไม่ใช่การท่องจำ', index: '01' },
    { name: 'Active Learning & Flow', desc: 'ออกแบบกิจกรรมจำลองสถานการณ์เพื่อให้ผู้เรียนเกิด Aha! Moment', index: '02' },
    { name: 'Circle Dialogue & Reflection', desc: 'กระบวนการสะท้อนคิดอย่างลึกซึ้ง ดึงความรู้และทางออกจากทุกคนในทีม', index: '03' },
    { name: '6D Creative Problem Solving', desc: 'เครื่องมือแก้ปัญหาเชิงนวัตกรรมอย่างเป็นระบบจากต้นเหตุสู่โซลูชัน', index: '04' },
  ],
  signaturePrograms: [
    { name: 'Transformative Leadership & Facilitative Mindset', duration: '1-2 วัน', outcome: 'ผู้นำดึงศักยภาพทีมงาน สร้าง Engagement สูงขึ้น 80%' },
    { name: 'Team Synergy & Silo Breaker (CAP Framework)', duration: '1-2 วัน', outcome: 'ทลายกำแพงระหว่างแผนก สร้างความร่วมมือและการสื่อสารไร้รอยต่อ' },
    { name: 'Creative Problem Solving with 6D CPS Model', duration: '1-2 วัน', outcome: 'ทีมร่วมคิดค้นไอเดียแก้ปัญหาและนวัตกรรมใหม่ที่นำไปใช้ได้ทันที' },
    { name: 'CEO Speechfulness & Executive Communication', duration: '1 วัน / Coaching', outcome: 'ผู้บริหารสื่อสารทรงพลัง โน้มน้าวใจ และขับเคลื่อนวิสัยทัศน์' },
  ],
  gallery: [
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa1.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa10.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa11.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa12.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa13.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa14.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa2.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Den%20Masterfa%20Gallery/den%20masterfa7.jpg',
  ],
  contact: {
    line: 'https://lin.ee/OO6jotG',
    lineId: '@capvision',
    phone: CONTACT_INFO.phone
  }
};

const SO_SPECIFIC = {
  fullName: 'อาจารย์ ดร.พิศลยา บัวแก้ว (Dr. So)',
  title: 'ผู้เชี่ยวชาญด้านพลังจิตใต้สำนึกและการสื่อสารเพื่อพัฒนาศักยภาพมนุษย์',
  heroHeadline: 'ปลดล็อกพลังจิตใต้สำนึก สื่อสารให้เข้าถึงใจและเปลี่ยนพฤติกรรมคนได้จริง',
  heroSub: '“การสื่อสารที่ทรงพลังที่สุด ไม่ได้เริ่มจากคำพูด…แต่เริ่มจากจิตใต้สำนึก”',
  stats: [
    { value: 'ดร.', label: 'พุทธศาสตรดุษฎีบัณฑิต', icon: Award },
    { value: 'Expert', label: 'วิศวกรสันติภาพ', icon: ShieldCheck },
    { value: 'Guru', label: 'Subconscious Mastery', icon: Brain },
    { value: 'Director', label: 'ศูนย์พัฒนาศักยภาพฯ', icon: Star },
  ],
  principles: [
    'ปลดล็อกข้อจำกัดและความกลัวภายใน (Break Free)',
    'ค้นพบตัวตนและเสน่ห์การสื่อสารที่แท้จริง (Authentic Self)',
    'พัฒนาการสื่อสารที่เข้าถึงใจผู้ฟัง (Deep Connection)',
  ],
  missions: [
    { title: 'Confidence', desc: 'ปลดล็อกความกลัว พูดอย่างมั่นใจโดยไม่ฝืนธรรมชาติ' },
    { title: 'Authentic Voice', desc: 'ดึงจุดเด่นและเสน่ห์เฉพาะตัวออกมาใช้ในการสื่อสาร' },
    { title: 'Impact', desc: 'ถ่ายทอดเรื่องราวที่เข้าถึงจิตใจและสร้างแรงบันดาลใจ' },
  ],
  gallery: [
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/dr.so_healing/dr.so2.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/dr.so_healing/dr.so3.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/dr.so_healing/dr.so4.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/dr.so_healing/dr.so5.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/dr.so_healing/dr.so6.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/dr.so_healing/dr.so_class2.jpg',
  ],
};

const K_DATA = {
  fullName: 'ไกรพุฒิ อินทรโยธา (ไนท์)',
  title: 'ผู้เชี่ยวชาญด้านความมั่นคง กลยุทธ์องค์กร และการบริหารจัดการภาวะวิกฤต',
  bio: 'ที่ปรึกษาและผู้เชี่ยวชาญด้านการบริหารความมั่นคงระดับสูง ยุทธศาสตร์ภาครัฐและเอกชน ประสบการณ์บริหารองค์กรและการขับเคลื่อนโครงการระดับประเทศ',
  stats: [
    { value: 'CEO', label: 'Guardian Global Security', icon: ShieldCheck },
    { value: 'Advisor', label: 'สภาอุตสาหกรรมท่องเที่ยวฯ', icon: Award },
    { value: '200+', label: 'หลักสูตรยุทธวิธี & ความมั่นคง', icon: BookOpen },
    { value: 'Strategist', label: 'ผู้เชี่ยวชาญกลยุทธ์องค์กร', icon: Target },
  ],
  positions: [
    'ผู้ช่วยประธานสภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย',
    'คณะทำงานรัฐมนตรีกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    'CEO, Guardian Global Security Co., Ltd.',
    'CEO, Newdice Co., Ltd.',
    'ประธานโครงการท่องเที่ยวระดับพรีเมียม สภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย',
    'คณะอนุกรรมการขับเคลื่อนอุตสาหกรรมซอฟต์พาวเวอร์ไทย ด้านการท่องเที่ยว'
  ],
  education: [
    'ปริญญาโท รัฐประศาสนศาสตรมหาบัณฑิต (นโยบายสาธารณะและการจัดการเชิงกลยุทธ์) มหาวิทยาลัยเกษมบัณฑิต',
    'ปริญญาตรี รัฐประศาสนศาสตรบัณฑิต (การบริหารงานตำรวจและกระบวนการยุติธรรม) สถาบันรัชต์ภาคย์'
  ],
  training: [
    'หลักสูตรการบริหารจัดการด้านความปลอดภัยขั้นสูง (Advanced Security Management Program) รุ่นที่ 15',
    'หลักสูตรการพัฒนาผู้บริหารระดับสูง (Executive Development Program) รุ่นที่ 2',
    'หลักสูตรการบริหารงานยุติธรรมระดับสูง (Advanced Justice Administration) รุ่นที่ 1',
    'ผ่านการอบรมด้านยุทธวิธีและการบริหารความมั่นคงมากกว่า 200 หลักสูตร'
  ],
  gallery: [
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Kraiput%20Gallery/Kraiput%20Intarayotha.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Kraiput%20Gallery/Kraiput%20Intarayotha2.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Kraiput%20Gallery/Kraiput%20Intarayotha3.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Kraiput%20Gallery/Kraiput%20Intarayotha4.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Kraiput%20Gallery/Kraiput%20Intarayotha5.jpg',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Kraiput%20Gallery/Kraiput%20Intarayotha6.jpg',
  ],
  onePagerImage: 'https://res.cloudinary.com/dmo4kq7ej/image/upload/v1786514509/NewProfile_Kraiput_bgvjeo.jpg'
};

/* ─── 2. KRAIPUT INTARAYOTHA DETAIL COMPONENT ───────────────── */

const KnightKraiputDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker }) => {
  const profileImg = 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Kraiput%20Gallery/Kraiput%20Intarayotha.jpg';

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden pb-20">
      <SEO
        title={`${K_DATA.fullName} — วิทยากรผู้เชี่ยวชาญด้านความมั่นคงและกลยุทธ์ | CAP Vision`}
        description={K_DATA.bio}
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-36 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F59E0B] transition-colors mb-8 uppercase font-bold text-xs tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> กลับหน้ารวมวิทยากร
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Speaker Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-gray-900">
                <img
                  src={profileImg}
                  alt={K_DATA.fullName}
                  className="w-full h-[450px] sm:h-[520px] object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = K_DATA.gallery[0];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="bg-[#2563EB] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Security & Strategy Expert
                  </span>
                </div>
              </div>
            </div>

            {/* Speaker Bio */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider">
                <IconGoldCrestStar className="w-3.5 h-3.5" />
                Executive Keynote Speaker
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 nav-font leading-tight">
                {K_DATA.fullName}
              </h1>

              <p className="text-xl sm:text-2xl text-[#60A5FA] font-bold mb-6 leading-relaxed">
                {K_DATA.title}
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-light max-w-2xl">
                {K_DATA.bio}
              </p>

              {/* Stats Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {K_DATA.stats.map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                    <s.icon className="w-5 h-5 text-[#F59E0B] mx-auto mb-1.5" />
                    <p className="text-lg font-black text-white">{s.value}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  ติดต่องานบรรยาย / ขอใบเสนอราคา
                </Link>

                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm inline-flex items-center gap-2 transition-all nav-font"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755]" />
                  ปรึกษาผ่าน LINE OA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">

        {/* Positions & Credentials */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Current Positions */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F2557] nav-font">
                ตำแหน่งและบทบาทสำคัญ
              </h2>
            </div>

            <div className="space-y-4">
              {K_DATA.positions.map((pos, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 leading-snug">{pos}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Training */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 text-[#F59E0B] rounded-2xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F2557] nav-font">
                การศึกษาและหลักสูตรระดับสูง
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">คุณวุฒิการศึกษา</h3>
                <div className="space-y-3">
                  {K_DATA.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">การอบรมขั้นสูง</h3>
                <div className="space-y-3">
                  {K_DATA.training.map((trn, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                      <span>{trn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 1-PAGE EXECUTIVE PROFILE / ONE-PAGER SUMMARY ── */}
        <section className="mb-20">
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-xl">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 nav-font">
                <FileText className="w-4 h-4" />
                Official Executive Profile
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F2557] nav-font mb-3">
                ประวัติย่อ 1-Page Executive Summary
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
                เอกสารสรุปประวัติ ผลงาน ตำแหน่ง และคุณวุฒิความเชี่ยวชาญแบบย่อ 1 หน้า สำหรับคณะกรรมการจัดซื้อ, ผู้บริหาร และฝ่ายพัฒนาทรัพยากรมนุษย์ (HRD)
              </p>
            </div>

            {/* Infographic Poster Frame */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-gray-100 p-2 sm:p-4 group relative">
              <div className="relative overflow-hidden rounded-2xl bg-gray-900">
                <img
                  src={K_DATA.onePagerImage}
                  alt={`${K_DATA.fullName} — ประวัติย่อ 1-Page`}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B]" />
                  <span>เอกสารทางการจากสถาบัน CAP Vision Institute</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={K_DATA.onePagerImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0F2557] hover:bg-[#2563EB] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    เปิดดูรูปขนาดเต็ม (Full Resolution)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Showcase */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Activity & Keynote Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font">
              ภาพบรรยากาศการบรรยายและการทำงาน
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {K_DATA.gallery.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-64 bg-gray-100"
              >
                <img
                  src={img}
                  alt={`Activity ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Final Action CTA */}
        <section className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black nav-font mb-4 text-white">
              เชิญ คุณไกรพุฒิ อินทรโยธา เป็นวิทยากรพิเศษ
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mb-8 font-light leading-relaxed">
              สำหรับหัวข้อการบริหารความมั่นคง ยุทธศาสตร์ความปลอดภัย และการจัดการวิกฤตระดับองค์กร
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-sm shadow-xl inline-flex items-center justify-center gap-2"
              >
                ติดต่อจองคิววิทยากร <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

/* ─── 3. DR SO DETAIL COMPONENT ─────────────────────────────── */

const DrSoDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<'personal' | 'private' | 'workshop'>('personal');

  const openBooking = (service: 'personal' | 'private' | 'workshop') => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden pb-20">
      <SEO
        title={`${SO_SPECIFIC.fullName} — วิทยากรจิตใต้สำนึก | CAP Vision`}
        description={SO_SPECIFIC.title}
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-36 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F59E0B] transition-colors mb-8 uppercase font-bold text-xs tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> กลับหน้ารวมวิทยากร
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-gray-900">
                <img
                  src={speaker.image || SO_SPECIFIC.gallery[0]}
                  alt={SO_SPECIFIC.fullName}
                  className="w-full h-[450px] sm:h-[520px] object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = SO_SPECIFIC.gallery[0];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-[#F59E0B] text-[#111827] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Subconscious Communication Expert
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#60A5FA] rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 text-[#F59E0B]" />
                Subconscious Learning & Empowerment
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 nav-font leading-tight">
                {SO_SPECIFIC.fullName}
              </h1>

              <p className="text-xl sm:text-2xl text-[#F59E0B] font-bold mb-4 leading-relaxed">
                {SO_SPECIFIC.heroHeadline}
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-light italic">
                {SO_SPECIFIC.heroSub}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {SO_SPECIFIC.stats.map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                    <s.icon className="w-5 h-5 text-[#F59E0B] mx-auto mb-1.5" />
                    <p className="text-lg font-black text-white">{s.value}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  จองคอร์ส / ขอหลักสูตรองค์กร
                </Link>

                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm inline-flex items-center gap-2 transition-all nav-font"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755]" />
                  ปรึกษาผ่าน LINE OA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars & Missions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Subconscious Transformation Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font">
              3 เสาหลักปลดล็อกศักยภาพการสื่อสาร
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SO_SPECIFIC.missions.map((m, idx) => (
              <div key={idx} className="bg-[#F8FAFC] p-8 rounded-3xl border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-5 font-black text-lg">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-black text-[#0F2557] mb-2 nav-font">{m.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
            Workshop & Coaching Moments
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font">
            บรรยากาศการอบรมและการปลดล็อกศักยภาพ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SO_SPECIFIC.gallery.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-64 bg-gray-100"
            >
              <img
                src={img}
                alt={`Dr So Moment ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
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

/* ─── 4. DEN MASTER FA DETAIL COMPONENT ─────────────────────── */

const DenMasterFaDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden pb-20">
      <SEO
        title="ครูเด่น มาสเตอร์ฟา — Master Facilitator & Director | CAP Vision"
        description={DEN_SPECIFIC.heroSub}
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-36 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F59E0B] transition-colors mb-8 uppercase font-bold text-xs tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> กลับหน้ารวมวิทยากร
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-gray-900">
                <img
                  src={speaker.image || '/images/denmasterfa.jpg'}
                  alt={speaker.name}
                  className="w-full h-[450px] sm:h-[550px] object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/denmasterfa.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="bg-[#F59E0B] text-[#111827] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Founder & Master Facilitator
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#60A5FA] rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider">
                <IconGoldCrestStar className="w-3.5 h-3.5 text-[#F59E0B]" />
                Director of CAP Vision Institute
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 nav-font leading-tight">
                {speaker.name || "ครูเด่น มาสเตอร์ฟา"}
              </h1>

              <p className="text-xl sm:text-2xl text-[#F59E0B] font-bold mb-4 leading-relaxed">
                {DEN_SPECIFIC.heroHeadline}
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
                {DEN_SPECIFIC.heroSub}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {DEN_SPECIFIC.stats.map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                    <s.icon className="w-5 h-5 text-[#F59E0B] mx-auto mb-1.5" />
                    <p className="text-lg font-black text-white">{s.value}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  ติดต่องานบรรยาย / นัดคุย TNA
                </Link>

                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm inline-flex items-center gap-2 transition-all nav-font"
                >
                  <MessageCircle className="w-4 h-4 text-[#06C755]" />
                  LINE: {CONTACT_INFO.line}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. GREETING BANNER CARD (ถัดจากส่วน HERO) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
        <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 bg-gray-900 group">
              <img
                src="https://res.cloudinary.com/dmo4kq7ej/image/upload/v1788199810/1787733149434_cjlynw.jpg"
                alt="สาส์นทักทายจากครูเด่น มาสเตอร์ฟา"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 nav-font w-fit">
                <IconGoldCrestStar className="w-3.5 h-3.5 text-[#F59E0B]" />
                สาส์นจาก Master Facilitator
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font mb-4 leading-tight">
                "การเรียนรู้ที่แท้จริง คือการค้นพบพลังที่อยู่ในตัวคุณเอง"
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                ยินดีต้อนรับทุกท่านสู่พื้นที่แห่งการเติบโตและการเปลี่ยนผ่าน เราเชื่อมั่นว่าทุกองค์กรและทุกคนมีศักยภาพอันไร้ขีดจำกัด กระบวนการของ CAP Vision Institute ถูกออกแบบมาเพื่อเป็นสะพานเชื่อมโยงศักยภาพนั้นสู่ความสำเร็จจริง
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://res.cloudinary.com/dmo4kq7ej/image/upload/v1788199810/1787733149434_cjlynw.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0F2557] hover:bg-[#2563EB] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  เปิดดูการ์ดขนาดเต็ม
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: Trainer vs Facilitator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              The Facilitation Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font">
              ทำไมองค์กรชั้นนำจึงเลือกกระบวนการแบบ Master Facilitator
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {DEN_SPECIFIC.trainerVsFacilitator.map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border ${
                  idx === 1
                    ? 'bg-blue-50/50 border-blue-200 shadow-md'
                    : 'bg-[#F8FAFC] border-gray-100'
                }`}
              >
                <h3 className={`text-lg font-black mb-6 nav-font ${idx === 1 ? 'text-[#2563EB]' : 'text-gray-600'}`}>
                  {item.label}
                </h3>
                <div className="space-y-3.5">
                  {item.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${idx === 1 ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. 1-PAGE EXECUTIVE PROFILE / ONE-PAGER SUMMARY ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 nav-font">
              <FileText className="w-4 h-4" />
              Official Executive Profile
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F2557] nav-font mb-3">
              ประวัติย่อ 1-Page Executive Summary
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
              เอกสารสรุปประวัติ ผลงาน ประสบการณ์ และแนวทางการจัดกระบวนการเรียนรู้แบบย่อ 1 หน้า สำหรับผู้บริหาร ฝ่ายจัดซื้อ และ HRD
            </p>
          </div>

          {/* 2 One-Pager Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 p-3 sm:p-5 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-black text-[#0F2557] nav-font">ประวัติย่อฉบับทางการ (ชุดที่ 1)</span>
                  <span className="text-[11px] font-bold text-[#2563EB] bg-blue-50 px-3 py-0.5 rounded-full">Executive Profile</span>
                </div>
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-100">
                  <img
                    src="https://res.cloudinary.com/dmo4kq7ej/image/upload/v1786514510/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B9%81%E0%B8%99%E0%B8%B0%E0%B8%99%E0%B8%B3_%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%AA%E0%B8%A3%E0%B8%93%E0%B9%8C_%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%B2_1_%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_tz1rp0.png"
                    alt="การ์ดแนะนำ อนุสรณ์ หนองนา 1 หน้า"
                    className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="pt-4 px-2 flex items-center justify-between border-t border-gray-100 mt-4">
                <span className="text-[11px] font-medium text-gray-500">อนุสรณ์ หนองนา (ครูเด่น)</span>
                <a
                  href="https://res.cloudinary.com/dmo4kq7ej/image/upload/v1786514510/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B9%81%E0%B8%99%E0%B8%B0%E0%B8%99%E0%B8%B3_%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%AA%E0%B8%A3%E0%B8%93%E0%B9%8C_%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%B2_1_%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_tz1rp0.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#0F2557] hover:bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  เปิดดูภาพเต็ม
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 p-3 sm:p-5 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-black text-[#0F2557] nav-font">ประวัติย่อฉบับทางการ (ชุดที่ 2)</span>
                  <span className="text-[11px] font-bold text-[#F59E0B] bg-amber-50 px-3 py-0.5 rounded-full">Facilitator Portfolio</span>
                </div>
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-100">
                  <img
                    src="https://res.cloudinary.com/dmo4kq7ej/image/upload/v1786824025/b61c8175-85ec-4cd8-8c23-ef68ed8ecb47_gecnhc.png"
                    alt="ประวัติย่อ Master Facilitator ครูเด่น"
                    className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="pt-4 px-2 flex items-center justify-between border-t border-gray-100 mt-4">
                <span className="text-[11px] font-medium text-gray-500">Master Facilitator & Director</span>
                <a
                  href="https://res.cloudinary.com/dmo4kq7ej/image/upload/v1786824025/b61c8175-85ec-4cd8-8c23-ef68ed8ecb47_gecnhc.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#0F2557] hover:bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  เปิดดูภาพเต็ม
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
            Signature In-house Programs
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font">
            หลักสูตรเรือธงโดย ครูเด่น มาสเตอร์ฟา
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {DEN_SPECIFIC.signaturePrograms.map((prog, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
                  {prog.duration}
                </span>
              </div>
              <h3 className="text-lg font-black text-[#0F2557] mb-2 nav-font">{prog.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">{prog.outcome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
            Workshop Moments
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font">
            ภาพบรรยากาศการจัดกระบวนการเรียนรู้
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEN_SPECIFIC.gallery.map((img, idx) => (
            <div key={idx} className="group rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-56 bg-gray-100">
              <img
                src={img}
                alt={`Den Moment ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        instructorId={speaker.id}
        instructorName={speaker.name}
        lineOA={DEN_SPECIFIC.contact.lineId}
        lineLink={DEN_SPECIFIC.contact.line}
        avatarUrl={speaker.image}
      />
    </div>
  );
};

/* ─── 5. GENERIC DETAIL COMPONENT ──────────────────────────── */

const GenericDetail: React.FC<{ speaker: Instructor, taughtCourses: Course[] }> = ({ speaker }) => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden pb-20">
      <SEO
        title={`${speaker.name} — วิทยากร | CAP Vision`}
        description={speaker.bio}
      />

      <div className="bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-36 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F59E0B] transition-colors mb-8 uppercase font-bold text-xs tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> กลับหน้ารวมวิทยากร
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-[400px] object-cover rounded-3xl shadow-2xl border-2 border-white/10"
              />
            </div>
            <div className="lg:w-2/3">
              <span className="bg-[#2563EB] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                Certified Speaker
              </span>
              <h1 className="text-4xl sm:text-5xl font-black mb-4 nav-font">{speaker.name}</h1>
              <p className="text-lg text-[#F59E0B] font-bold mb-6">{speaker.title}</p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light mb-8">
                {speaker.longBio || speaker.bio}
              </p>
              <Link
                to="/contact"
                className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                ติดต่องานบรรยาย / ขอใบเสนอราคา
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── MAIN SPEAKER DETAIL ROUTER ───────────────────────────── */

export const SpeakerDetail: React.FC = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">กำลังโหลดข้อมูลวิทยากร...</p>
      </div>
    );
  }

  if (!speaker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4 px-4">
        <p className="text-gray-500 text-lg font-bold">ไม่พบข้อมูลวิทยากรท่านนี้</p>
        <Link to="/speakers" className="btn-premium bg-[#2563EB] text-white px-6 py-3 rounded-2xl text-xs font-bold">
          ดูวิทยากรทั้งหมด
        </Link>
      </div>
    );
  }

  const slug = speaker.slug?.toLowerCase() || '';

  if (slug === 'den-master-fa' || slug === 'den-masterfa') {
    return <DenMasterFaDetail speaker={speaker} taughtCourses={taughtCourses} />;
  }

  if (slug === 'kraiput-knight' || slug === 'kraiput-intarayotha') {
    return <KnightKraiputDetail speaker={speaker} taughtCourses={taughtCourses} />;
  }

  if (slug === 'dr-so' || slug === 'dr-so-healing') {
    return <DrSoDetail speaker={speaker} taughtCourses={taughtCourses} />;
  }

  return <GenericDetail speaker={speaker} taughtCourses={taughtCourses} />;
};

export default SpeakerDetail;
