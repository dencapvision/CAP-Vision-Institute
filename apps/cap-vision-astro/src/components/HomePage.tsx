import React, { useState, useEffect } from 'react';

import { 
  ArrowRight, Award, Sparkles, CheckCircle2, 
  ChevronRight, MessageCircle, BarChart3, Target,
  Compass, Layers3, PhoneCall, Play, Clock, ArrowUpRight
} from 'lucide-react';
import { 
  IconLeadership, IconTeamSynergy, IconGrowthCulture, 
  IconCreativeCPS, IconCustomArchitecture, IconFacilitatorMastery, 
  IconGoldCrestStar, IconInstituteShield 
} from './icons/CapBrandIcons';
import { motion } from 'framer-motion';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import { HRD_ARTICLES } from '../constants/articles';
import { fetchCourses } from '../lib/services/courses';
import type { Course } from '../types';
import Logo from './Logo';
import ClientsSection from './ClientsSection';

import StatCounter from './StatCounter';
import TransformationAssessment from './TransformationAssessment';

const Home: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSolutionTab, setActiveSolutionTab] = useState<number>(0);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setFeaturedCourses(data.slice(0, 4));
      } catch (error) {
        console.error('Error loading featured courses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  // 4 Core Solutions with Custom Brand Emblems
  const SOLUTIONS = [
    {
      id: 'leadership',
      title: 'Leadership Transformation',
      thTitle: 'ภาวะผู้นำเพื่อการเปลี่ยนแปลง',
      tagline: 'ยกระดับผู้นำทุกระดับจาก "ผู้สั่งการ" สู่ "Facilitative & Inspiring Leader"',
      description: 'พัฒนา Mindset และทักษะการนำพาทีมในยุคแห่งความผันผวน สร้างวิสัยทัศน์ร่วม (Shared Vision) และการตัดสินใจเชิงกลยุทธ์ที่ขับเคลื่อนผลลัพธ์องค์กรอย่างแท้จริง',
      icon: IconLeadership,
      color: '#2563EB',
      bgLight: 'bg-blue-50',
      highlights: [
        'Transformational Leadership & Executive Presence',
        'Facilitative Leadership for Modern Managers',
        'Strategic Thinking & Decisive Execution',
        '1-on-1 Executive Coaching & Leadership DNA'
      ],
      image: 'https://assets.capvisionpartner.com/media/portfolio/Comprehensive%20OD%20%26%20Training%20Solutions.jpg'
    },
    {
      id: 'people-team',
      title: 'People & Team Synergy',
      thTitle: 'พัฒนาคนและพลังทีมงาน',
      tagline: 'ทลายกำแพง Silo สร้างความปลอดภัยทางจิตวิทยา และการสื่อสารที่ไร้รอยต่อ',
      description: 'ปรับกระบวนการทำงานร่วมกันผ่านการสื่อสารด้วย Empathy การเข้าใจความหลากหลายของบุคคล และการสร้างบรรยากาศที่ทุกคนกล้าคิด กล้าเสนอ และร่วมมือกันอย่างเต็มใจ',
      icon: IconTeamSynergy,
      color: '#0F2557',
      bgLight: 'bg-indigo-50',
      highlights: [
        'Psychological Safety & High-Performing Teams',
        'Empathetic Communication & Constructive Feedback',
        'DISC & Behavioral Dynamics at Work',
        'Cross-Functional Collaboration & Trust Building'
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80'
    },
    {
      id: 'culture',
      title: 'Organization Culture',
      thTitle: 'วัฒนธรรมองค์กร & กรอบคิดเติบโต',
      tagline: 'ปลูกฝัง Growth Mindset และสร้างวัฒนธรรมแห่งการเรียนรู้ที่ยั่งยืน',
      description: 'เปลี่ยน Mindset ของคนในองค์กรให้มองปัญหาเป็นความท้าทาย เปิดรับนวัตกรรม และสร้างความยืดหยุ่น (Agility) เพื่อให้องค์กรพร้อมปรับตัวต่อการเปลี่ยนแปลงทุกรูปแบบ',
      icon: IconGrowthCulture,
      color: '#F59E0B',
      bgLight: 'bg-amber-50',
      highlights: [
        'Building Growth Mindset Culture',
        'Change Agility & Resilience in Disruption',
        'Creative Problem Solving (CPS Model)',
        'Core Values Activation into Daily Behavior'
      ],
      image: 'https://assets.capvisionpartner.com/media/portfolio/Organization%20Culture.jpg'
    },
    {
      id: 'customized',
      title: 'Customized In-house Solutions',
      thTitle: 'โซลูชันออกแบบเฉพาะองค์กร',
      tagline: 'เริ่มจาก TNA วิเคราะห์ปัญหาจริง สู่ Workshop ที่ปรับแต่ง 100%',
      description: 'ไม่มีหลักสูตรสำเร็จรูป (No One-Size-Fits-All) เราลงลึกศึกษาบริบท Pain Points และเป้าหมายธุรกิจขององค์กรคุณ เพื่อออกแบบ Learning Journey ที่ตอบโจทย์เฉพาะองค์กรอย่างแท้จริง',
      icon: IconCustomArchitecture,
      color: '#10B981',
      bgLight: 'bg-emerald-50',
      highlights: [
        'In-depth TNA (Training Needs Analysis) Diagnostic',
        'Activity-Based Learning Workshop Design',
        'Pre & Post Assessment with Action Plan',
        'Long-term OD Consulting & ROI Tracking'
      ],
      image: 'https://assets.capvisionpartner.com/media/portfolio/Customized%20In-house%20Solutions.jpg'
    }
  ];

  // 4 Main Program Categories
  const PROGRAM_CATEGORIES = [
    {
      category: 'Leadership Programs',
      thTitle: 'หลักสูตรภาวะผู้นำ',
      desc: 'สร้างผู้นำที่จุดประกายทีม กล้าคิดเชิงกลยุทธ์ และนำการเปลี่ยนแปลง',
      icon: IconLeadership,
      count: '15+ หลักสูตร',
      color: '#2563EB',
      link: '/courses?cat=Leader+Skills'
    },
    {
      category: 'People Skills',
      thTitle: 'ทักษะคนและการทำงานร่วมกัน',
      desc: 'การสื่อสาร, Service Mind, การให้ Feedback และการเข้าใจพฤติกรรมมนุษย์',
      icon: IconTeamSynergy,
      count: '18+ หลักสูตร',
      color: '#0F2557',
      link: '/courses?cat=People+Skills'
    },
    {
      category: 'Creative Thinking',
      thTitle: 'การคิดเชิงสร้างสรรค์ & แก้ปัญหา',
      desc: 'Creative Problem Solving (CPS Model), Design Thinking และการพัฒนานวัตกรรม',
      icon: IconCreativeCPS,
      count: '10+ หลักสูตร',
      color: '#F59E0B',
      link: '/courses?cat=Work+Skills'
    },
    {
      category: 'Facilitator & Process Design',
      thTitle: 'หลักสูตรวิทยากร & Facilitator',
      desc: 'ศาสตร์และศิลป์แห่งการเป็น Modern Facilitator ออกแบบกระบวนการเรียนรู้ที่มีพลัง',
      icon: IconFacilitatorMastery,
      count: '8+ หลักสูตร',
      color: '#10B981',
      link: '/courses'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      {/* ── 1. PROBLEM-FIRST HERO — CAP Vision Conversion V2 ── */}
      <section aria-labelledby="home-hero-title" className="relative isolate overflow-hidden bg-[#111827] text-white pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <img src="/images/courses/team_synergy.png" alt="" aria-hidden="true"
            className="h-full w-full object-cover opacity-[0.13]" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/95 to-[#0F2557]/90" />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-xs font-bold tracking-wider text-blue-200">
                CAP VISION INSTITUTE · TRANSFORMATION PARTNER
              </p>
              <h1 id="home-hero-title" className="nav-font mb-6 text-4xl font-extrabold leading-[1.25] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                องค์กรมี <span className="text-[#FBBF24]">“คนเก่ง”</span><br />
                แต่ทำไมทีมยังไปได้<br className="hidden sm:block" />
                ไม่เต็มศักยภาพ?
              </h1>
              <p className="mb-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                คนเก่งแต่สื่อสารกันไม่เข้าใจ ทีมทำงานแยกส่วน
                หัวหน้าเก่งงานแต่ยังนำคนไม่เป็น และค่านิยมองค์กรยังไม่เกิดขึ้นจริงในงานประจำวัน
              </p>
              <div className="mb-7 border-l-4 border-[#FBBF24] pl-5">
                <p className="nav-font text-xl font-bold leading-relaxed text-white sm:text-2xl">
                  บางครั้งปัญหาไม่ใช่การขาดคนเก่ง<br />
                  แต่คือการยังไม่สามารถดึงศักยภาพของคน<br className="hidden sm:block" />
                  มาสร้างผลงานร่วมกันได้
                </p>
              </div>
              <p className="mb-8 max-w-2xl text-base leading-8 text-slate-300">
                CAP Vision ช่วยวิเคราะห์โจทย์คน ทีม และองค์กร
                แล้วออกแบบ In-house Training, Workshop และ Learning Journey
                ที่เชื่อม Mindset → Behavior → Performance
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="/contact" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-7 py-4 text-base font-bold text-white shadow-xl transition hover:bg-[#1D4ED8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  ปรึกษาโจทย์องค์กร <ArrowRight size={19} aria-hidden="true" />
                </a>
                <a href="/assessment" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  สำรวจความพร้อมองค์กร <ChevronRight size={18} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 text-sm text-slate-400">
                Human • Heart • Harmony · Transform People → Transform Organization
              </p>
            </div>
            <aside aria-label="ปัญหาที่ CAP Vision ช่วยองค์กรรับมือ" className="rounded-[1.75rem] border border-white/20 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <p className="mb-6 text-sm font-bold uppercase tracking-wide text-[#FBBF24]">โจทย์ที่หลายองค์กรกำลังเผชิญ</p>
              <ul className="space-y-5">
                {[
                  ['Communication Gap', 'คนเก่งแต่สื่อสารกันไม่เข้าใจ'],
                  ['Silo Working', 'แต่ละทีมเก่ง แต่ยังต่างคนต่างทำ'],
                  ['Low Ownership', 'พนักงานรอคำสั่ง มากกว่าร่วมรับผิดชอบ'],
                  ['Leadership Gap', 'หัวหน้าเก่งงาน แต่ยังต้องพัฒนาทักษะการนำคน'],
                  ['Values in Action', 'มี Core Values แต่ยังไม่เห็นในพฤติกรรมจริง']
                ].map(([label, detail]) => (
                  <li key={label} className="flex gap-3">
                    <CheckCircle2 className="mt-1 shrink-0 text-[#60A5FA]" size={20} aria-hidden="true" />
                    <div><strong className="block text-sm text-white">{label}</strong><span className="text-sm leading-7 text-slate-300">{detail}</span></div>
                  </li>
                ))}
              </ul>
              <a href="/services" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#93C5FD] hover:text-white">
                ดูแนวทางพัฒนาองค์กร <ArrowRight size={17} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 2. PAIN POINTS SECTION: “ปัญหาขององค์กรคุณ อยู่ตรงไหน?” ─────────────── */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
              ORGANIZATION DIAGNOSTIC
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] nav-font leading-tight">
              “ปัญหาขององค์กรคุณ <span className="text-[#2563EB]">อยู่ตรงไหน?</span>”
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
              การพัฒนาองค์กรที่เห็นผลจริง ต้องเริ่มต้นจากการระบุสาเหตุที่แท้จริง ไม่ใช่แค่การจัดอบรมตามหลักสูตรทั่วไป
            </p>
          </div>

          {/* 4 Pain Point Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                pillar: 'LEADERSHIP',
                num: '01',
                title: 'ผู้นำยังไม่สามารถดึงศักยภาพทีมออกมาได้',
                description: 'ผู้นำเน้นการสั่งการมากกว่าการ Facilitate ขาดทักษะการสร้างแรงบันดาลใจ และยังติดกับดักการทำงานแบบเดิม',
                impact: 'ทีมขาด Ownership & ทำงานแบบรอคำสั่ง',
                icon: IconLeadership,
                color: '#2563EB',
                bgBadge: 'bg-blue-50 text-blue-700 border-blue-200'
              },
              {
                pillar: 'TEAM',
                num: '02',
                title: 'คนเก่ง แต่ทำงานร่วมกันไม่ได้',
                description: 'แต่ละฝ่ายทำงานแยกส่วน (Silo) ขาดความปลอดภัยทางจิตวิทยา (Psychological Safety) และการสื่อสารไม่เปิดใจ',
                impact: 'เกิดความขัดแย้ง ประสิทธิภาพงานลดลง',
                icon: IconTeamSynergy,
                color: '#0F2557',
                bgBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
              },
              {
                pillar: 'CULTURE',
                num: '03',
                title: 'องค์กรต้องการเปลี่ยน แต่คนยังไม่เปลี่ยน',
                description: 'คนในองค์กรมี Fixed Mindset ยึดติดกับ Comfort Zone กลัวความผิดพลาด และต่อต้านการเปลี่ยนแปลงกลยุทธ์ใหม่',
                impact: 'การทรานส์ฟอร์มองค์กรสะดุด ล่าช้า',
                icon: IconGrowthCulture,
                color: '#F59E0B',
                bgBadge: 'bg-amber-50 text-amber-700 border-amber-200'
              },
              {
                pillar: 'INNOVATION',
                num: '04',
                title: 'มีปัญหา แต่ทีมยังคิดทางออกแบบเดิม',
                description: 'ขาดทักษะ Creative Problem Solving (CPS Model) และการคิดวิเคราะห์เชิงระบบ ทำให้ไม่เกิดนวัตกรรมหรือทางเลือกใหม่',
                impact: 'สูญเสียความได้เปรียบในการแข่งขัน',
                icon: IconCreativeCPS,
                color: '#10B981',
                bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className={`text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full border ${card.bgBadge}`}>
                        {card.pillar}
                      </span>
                      <span className="text-xs font-black text-gray-400 font-mono">
                        {card.num}
                      </span>
                    </div>

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-md bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/80">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-lg font-black text-[#111827] mb-3 nav-font leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-2">
                    <div className="text-[11px] font-bold text-gray-500 mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                      ผลกระทบ: <span className="text-gray-700">{card.impact}</span>
                    </div>

                    <a href="/assessment"
                      className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                      style={{ color: card.color }}
                    >
                      ประเมินมิตินี้ในองค์กร
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Funnel CTA Card */}
          <div className="bg-gradient-to-r from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B]" />
                Strategic Lead-Generation Funnel
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white nav-font">
                พร้อมค้นหาพลังขับเคลื่อน และจุดปลดล็อกองค์กรของคุณแล้วหรือยัง?
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-light">
                ประเมินคน ทีม และองค์กร เพื่อค้นหาว่า อะไรคือจุดแข็งที่ควรต่อยอด และอะไรคือจุดที่ควรเปลี่ยน
              </p>
            </div>

            <div className="flex-shrink-0 w-full sm:w-auto">
              <a href="/assessment"
                className="btn-premium w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-black px-8 py-4 rounded-xl text-base shadow-xl flex items-center justify-center gap-3 transition-all"
              >
                <IconGoldCrestStar className="w-5 h-5 text-[#111827]" />
                เริ่ม Organization Assessment →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. SOLUTIONS SECTION (4 Core Pillars) ─────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
              Comprehensive OD & Training Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] nav-font leading-tight">
              โซลูชันการพัฒนา <span className="text-[#2563EB]">ครบวงจร</span> สำหรับองค์กร
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed">
              ตอบโจทย์ทั้งการพัฒนาผู้นำ การสร้างความร่วมมือในทีม การปรับวัฒนธรรมองค์กร และการออกแบบเฉพาะตามโจทย์ธุรกิจ
            </p>
          </div>

          {/* Solutions Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              const isActive = activeSolutionTab === idx;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveSolutionTab(idx)}
                  className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#111827] text-white shadow-xl shadow-gray-900/10'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-[#111827]'
                  }`}
                >
                  <Icon className="w-4 h-4" style={{ color: isActive ? '#F59E0B' : sol.color }} />
                  <span>{sol.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Solution Content Card */}
          <div className="bg-gray-50 rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-sm transition-all duration-300">
            {(() => {
              const sol = SOLUTIONS[activeSolutionTab];
              const Icon = sol.icon;
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: `${sol.color}15`, color: sol.color }}>
                      <Icon className="w-4 h-4" />
                      {sol.thTitle}
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black text-[#111827] nav-font mb-4 leading-tight">
                      {sol.tagline}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                      {sol.description}
                    </p>

                    {/* Highlights List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {sol.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-gray-200/60 shadow-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-bold text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="/contact"
                        className="btn-premium bg-[#111827] hover:bg-[#0F2557] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                      >
                        ปรึกษาออกแบบโซลูชันนี้
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a href="/services"
                        className="btn-premium bg-white hover:bg-gray-100 text-[#111827] border border-gray-200 px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                      >
                        ดูรายละเอียดบริการทั้งหมด
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                          Activity Based Learning
                        </div>
                        <div className="text-sm font-bold">เน้นการลงมือปฏิบัติจริง มีส่วนร่วม 100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      </section>

      {/* ── 4. PROGRAMS SHOWCASE (4 Categories) ───────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F8FAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
                Signature Program Categories
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#111827] nav-font leading-tight">
                หมวดหมู่หลักสูตร <span className="text-[#2563EB]">ยอดนิยม</span>
              </h2>
            </div>
            <a href="/courses"
              className="flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] group nav-font"
            >
              ดูหลักสูตรทั้งหมด 50+ วิชา
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* 4 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PROGRAM_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <a key={idx}
                  href={cat.link}
                  className="exec-card-interactive p-6 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      {cat.count}
                    </div>
                    <h3 className="text-lg font-black text-[#111827] group-hover:text-[#2563EB] transition-colors mb-1 nav-font">
                      {cat.thTitle}
                    </h3>
                    <div className="text-xs font-bold text-gray-400 mb-3">{cat.category}</div>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                    <span>สำรวจหลักสูตร</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Featured Courses Selection */}
          {featuredCourses.length > 0 && (
            <div className="space-y-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                หลักสูตรแนะนำสำหรับ In-house Training
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[#111827]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold">
                        {course.category || 'In-house'}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="text-sm sm:text-base font-black text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-2 nav-font leading-snug">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400">Activity Based</span>
                        <a href={`/courses/${course.slug || course.id}`}
                          className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                        >
                          รายละเอียด
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── 5. TRANSFORMATION JOURNEY (CAP Framework) ─────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#111827] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2563EB] rounded-full blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#F59E0B] rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#F59E0B] font-bold text-xs uppercase tracking-widest block mb-3">
              The Signature Methodology
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white nav-font leading-tight">
              เส้นทางการเปลี่ยนแปลง <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#2563EB] to-[#F59E0B]">
                CAP Transformation Framework
              </span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
              กระบวนการ 3 ขั้นตอนที่พิสูจน์แล้วว่าสามารถสร้างการเปลี่ยนแปลงระดับพฤติกรรม และให้ผลลัพธ์ทางธุรกิจที่จับต้องได้จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1: Context & Clarify */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative group hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-blue-500/20">
                C
              </div>
              <div className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider mb-1">
                Phase 01
              </div>
              <h3 className="text-xl font-black text-white nav-font mb-2">Context & Clarify</h3>
              <div className="text-xs font-bold text-[#F59E0B] mb-4">วินิจฉัยบริบท & สื่อสารเป้าหมาย</div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                เริ่มต้นด้วยการทำ TNA (Training Needs Analysis) สัมภาษณ์ผู้บริหารและสำรวจโจทย์จริง เพื่อค้นหารากเหง้าของปัญหาและกำหนด KPI ที่ชัดเจน
              </p>
              <ul className="text-xs text-gray-400 space-y-2 border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Executive & Stakeholder Interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Organization Transformation Assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Customized Syllabus & Case Design</span>
                </li>
              </ul>
            </div>

            {/* Step 2: Align & Activate */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative group hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-[#111827] flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-amber-500/20">
                A
              </div>
              <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
                Phase 02
              </div>
              <h3 className="text-xl font-black text-white nav-font mb-2">Align & Activate</h3>
              <div className="text-xs font-bold text-[#60A5FA] mb-4">จัดวางความคิด & ปลดล็อกศักยภาพ</div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                ส่งมอบกระบวนการเรียนรู้แบบ Activity-Based Learning ที่เน้น Experiential Workshop ผู้เรียนได้สัมผัส ค้นพบวิธีคิดใหม่ และทดลองใช้ Tools ทันที
              </p>
              <ul className="text-xs text-gray-400 space-y-2 border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Interactive & Activity-Based Flow</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Transformative Facilitation Dynamics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Individual & Team Action Plan Commitments</span>
                </li>
              </ul>
            </div>

            {/* Step 3: Perform & Partner */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative group hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-emerald-500/20">
                P
              </div>
              <div className="text-xs font-bold text-[#34D399] uppercase tracking-wider mb-1">
                Phase 03
              </div>
              <h3 className="text-xl font-black text-white nav-font mb-2">Perform & Partner</h3>
              <div className="text-xs font-bold text-[#F59E0B] mb-4">ปฏิบัติการจริง & ร่วมทางระยะยาว</div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                ติดตามผลลัพธ์การนำไปใช้ในการทำงานจริง (Action Learning) ให้คำปรึกษาต่อเนื่อง และประเมินพัฒนาการอย่างเป็นรูปธรรม
              </p>
              <ul className="text-xs text-gray-400 space-y-2 border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Post-Workshop Follow-up & Coaching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Learning Impact & Behavioral Evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Long-term Growth Partner</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ── 6. LEAD FACILITATOR SPOTLIGHT (ครูเด่น & Team) ────────────────────── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Box */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative bg-[#111827] p-3 rounded-[2.5rem] shadow-2xl">
                <img
                  src="/images/denmasterfa.jpg"
                  alt="ครูเด่น อนุสรณ์ หนองนา Master Facilitator"
                  className="rounded-[2rem] w-full object-cover aspect-[4/5]"
                />
                
                {/* Floating Experience Badge */}
                <div className="absolute -bottom-6 -right-6 bg-[#2563EB] text-white p-6 rounded-2xl shadow-xl border-4 border-white hidden sm:block">
                  <div className="text-3xl font-black nav-font">18+ ปี</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-100">
                    Transformative Facilitator
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-7">
              <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
                Master Facilitator & Director
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#111827] nav-font mb-4 leading-tight">
                {BRAND_INFO.director}
              </h2>
              <p className="text-lg font-bold text-[#0F2557] mb-6">
                ผู้อำนวยการ CAP Vision Institute และผู้เชี่ยวชาญด้านกระบวนการเรียนรู้เพื่อการเปลี่ยนแปลง
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                ด้วยประสบการณ์กว่า 18 ปี ในการจัดกระบวนการเรียนรู้ให้กับองค์กรชั้นนำทั้งภาครัฐ รัฐวิสาหกิจ และบริษัทเอกชน ครูเด่นมุ่งเน้นการสร้างพื้นที่การเรียนรู้ที่มีความปลอดภัยทางจิตวิทยา ผสมผสานศาสตร์แห่งจิตวิทยาการเรียนรู้ผู้ใหญ่ (Adult Learning) และเทคนิค Facilitation ขั้นสูง เพื่อให้ผู้เรียนทุกคนเกิดแรงบันดาลใจและปลดล็อกศักยภาพจากภายใน
              </p>

              {/* Competencies Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-10">
                {[
                  'Activity-Based Learning Architecture',
                  'Transformational Leadership Coaching',
                  'Psychological Safety & Team Synergy',
                  'Creative Problem Solving Facilitator'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200/60">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span className="text-xs font-bold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/speakers"
                  className="btn-premium bg-[#111827] hover:bg-[#0F2557] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  ทำความรู้จักทีมวิทยากรทั้งหมด
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-premium bg-[#06C755] text-white px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  คุยกับครูเด่นผ่าน LINE
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. CASE STUDIES & CLIENTS SECTION ─────────────────────────────────── */}
      <ClientsSection />

      {/* ── 8. KNOWLEDGE HUB SECTION ──────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
                Executive Insights & Articles
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#111827] nav-font leading-tight">
                คลังความรู้สำหรับ <span className="text-[#2563EB]">ผู้นำ & HRD</span>
              </h2>
            </div>
            <a href="/resources"
              className="flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] group nav-font"
            >
              ดูบทความทั้งหมด
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HRD_ARTICLES.slice(0, 3).map(article => (
              <div
                key={article.id}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group"
              >
                <a href={`/resources/${article.id}`} className="relative h-56 overflow-hidden block">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#111827] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {article.category}
                  </div>
                </a>

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="text-xs text-gray-400 font-bold mb-3">
                    {article.date} • โดย {article.author}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-3 leading-snug nav-font">
                    <a href={`/resources/${article.id}`}>{article.title}</a>
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {article.excerpt}
                  </p>

                  <a href={`/resources/${article.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] group-hover:underline"
                  >
                    อ่านบทความฉบับเต็ม
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 9. FINAL EXECUTIVE CTA SECTION ────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Logo className="w-full h-full p-24" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            Start Your Organization Journey
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 nav-font leading-tight !text-white text-white drop-shadow-md">
            พร้อมยกระดับองค์กร
            <span className="text-[#F59E0B] !text-[#F59E0B] block mt-1 sm:inline sm:ml-3">ของคุณแล้วหรือยัง?</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            เริ่มต้นจากการทำ Organization Transformation Assessment เพื่อวินิจฉัยจุดแข็งและร่วมออกแบบโปรแกรมพัฒนากับทีม Master Facilitator
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/assessment"
              className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-black px-10 py-5 rounded-2xl text-base shadow-2xl nav-font flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              ทำแบบประเมินความพร้อมองค์กร
            </a>
            <a href="/contact"
              className="btn-premium bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-bold px-10 py-5 rounded-2xl text-base nav-font flex items-center justify-center gap-2"
            >
              ขอใบเสนอราคา / ปรึกษาหลักสูตร
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
