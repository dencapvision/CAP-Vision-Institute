import { ProblemNavigator, WebsiteNavigator } from '../components/home/HomeNavigation';
import { contactHref } from '../lib/contact-context.mjs';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Award, Sparkles, CheckCircle2, 
  ChevronRight, ChevronDown, MessageCircle, BarChart3, Target,
  Compass, Layers3, PhoneCall, Play, Clock, ArrowUpRight,
  HelpCircle, Users, TrendingUp, ShieldCheck
} from 'lucide-react';
import { 
  IconLeadership, IconTeamSynergy, IconGrowthCulture, 
  IconCreativeCPS, IconCustomArchitecture, IconFacilitatorMastery, 
  IconGoldCrestStar, IconInstituteShield 
} from '../components/icons/CapBrandIcons';
import { motion } from 'framer-motion';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import { HRD_ARTICLES } from '../constants/articles';
import { fetchCourses } from '../services/courses';
import type { Course } from '../types';
import Logo from '../components/Logo';
import ClientsSection from '../components/ClientsSection';
import SEO from '../components/SEO';
import StatCounter from '../components/StatCounter';
import TransformationAssessment from '../components/TransformationAssessment';

const Home: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSolutionTab, setActiveSolutionTab] = useState<number>(0);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
      <SEO
        title="รับจัดอบรม In-house Training | พัฒนาผู้นำและทีมองค์กร | CAP Vision Institute"
        description="พัฒนาคนให้เปลี่ยนวิธีคิด สร้างทีมให้ทำงานได้จริง ยกระดับองค์กรด้วย In-house Training และ Customized Learning โดย ครูเด่น Master Facilitator ประสบการณ์ 18+ ปี"
      />

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
                <Link to={contactHref()} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-7 py-4 text-base font-bold text-white shadow-xl transition hover:bg-[#1D4ED8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  ปรึกษาโจทย์องค์กร <ArrowRight size={19} aria-hidden="true" />
                </Link>
                <Link to="/assessment" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  สำรวจความพร้อมองค์กร <ChevronRight size={18} aria-hidden="true" />
                </Link>
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
              <Link to="/services" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#93C5FD] hover:text-white">
                ดูแนวทางพัฒนาองค์กร <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <ProblemNavigator />

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
                  <Icon className="w-4 h-4" />
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
                      <Link
                        to={contactHref(sol.id)}
                        className="btn-premium bg-[#111827] hover:bg-[#0F2557] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                      >
                        ปรึกษาออกแบบโซลูชันนี้
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/services#${sol.id}`}
                        className="btn-premium bg-white hover:bg-gray-100 text-[#111827] border border-gray-200 px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                      >
                        ดูรายละเอียดโซลูชันนี้
                      </Link>
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
            <Link
              to="/courses"
              className="flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] group nav-font"
            >
              ดูหลักสูตรทั้งหมด 50+ วิชา
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PROGRAM_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  to={cat.link}
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
                </Link>
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
                        <Link
                          to={`/courses/${course.slug || course.id}`}
                          className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                        >
                          รายละเอียด
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
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
        <div className="mt-8 text-center"><Link to="/about#cap-framework" className="inline-flex min-h-12 items-center gap-2 font-bold text-white underline underline-offset-4">รู้จักกระบวนการ CAP Framework <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </section>

      {/* ── 6. EXPECTED OUTCOMES SECTION (คุณค่าที่องค์กรได้รับจริง) ─────────────── */}
      <section className="py-20 md:py-32 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
              TANGIBLE IMPACT & OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] nav-font leading-tight">
              ผลลัพธ์ที่องค์กรจะได้รับ <span className="text-[#2563EB]">อย่างเป็นรูปธรรม</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
              การพัฒนาที่ไม่จบเพียงแค่ความสนุกในห้องอบรม แต่เปลี่ยนเป็นพลังขับเคลื่อน 3 ระดับที่สัมผัสได้จริงในชีวิตการทำงาน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            
            {/* Level 1: Individual */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    ระดับบุคคล (Individual)
                  </span>
                  <span className="text-xs font-black text-gray-400 font-mono">01</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-5 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#111827] nav-font mb-3 leading-snug">
                  Mindset เปลี่ยน สู่ความรับผิดชอบเชิงรุก
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  พนักงานตระหนักรู้ในตนเอง ปลดล็อก Fixed Mindset สู่ Growth Mindset ก้าวข้าม Comfort Zone และทำงานด้วยจิตสำนึกของความเป็นเจ้าของร่วม (Ownership)
                </p>
              </div>

              <ul className="space-y-3 pt-5 border-t border-gray-100 text-xs text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>กล้าคิดริเริ่มและรับผิดชอบผลลัพธ์ของงาน</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>สื่อสารด้วยความเห็นอกเห็นใจ (Empathy) และเปิดรับคำแนะนำ</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>พร้อมปรับตัวยืดหยุ่นต่อสถานการณ์ที่ไม่แน่นอน</span>
                </li>
              </ul>
            </div>

            {/* Level 2: Team */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    ระดับทีม (Team Synergy)
                  </span>
                  <span className="text-xs font-black text-gray-400 font-mono">02</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#0F2557] flex items-center justify-center mb-5 shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#111827] nav-font mb-3 leading-snug">
                  ทลายกำแพง Silo สู่ความร่วมมือที่ไร้รอยต่อ
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  สร้างความปลอดภัยทางจิตวิทยา (Psychological Safety) ที่เปิดโอกาสให้ทุกคนกล้าพูดความจริง กล้าเสนอไอเดีย และรวมพลังกันแก้ปัญหาข้ามสายงาน
                </p>
              </div>

              <ul className="space-y-3 pt-5 border-t border-gray-100 text-xs text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F2557] shrink-0 mt-0.5" />
                  <span>การประสานงานข้ามแผนกเป็นไปอย่างราบรื่นและไว้เนื้อเชื่อใจ</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F2557] shrink-0 mt-0.5" />
                  <span>ลดความขัดแย้งเชิงบุคคล มุ่งเน้นเป้าหมายความสำเร็จร่วมกัน</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F2557] shrink-0 mt-0.5" />
                  <span>เกิดการแลกเปลี่ยนความรู้และระดมสมองแก้ปัญหาอย่างสร้างสรรค์</span>
                </li>
              </ul>
            </div>

            {/* Level 3: Organization */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    ระดับองค์กร (Organization)
                  </span>
                  <span className="text-xs font-black text-gray-400 font-mono">03</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center mb-5 shadow-xs">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#111827] nav-font mb-3 leading-snug">
                  ผลักดันกลยุทธ์ได้เร็ว วัฒนธรรมเติบโตยั่งยืน
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  ผู้นำทุกระดับสามารถถ่ายทอดวิสัยทัศน์ นำพาการเปลี่ยนแปลง และแปลง Core Values ให้ออกมาเป็นพฤติกรรมจริงในการทำงานทุกวัน
                </p>
              </div>

              <ul className="space-y-3 pt-5 border-t border-gray-100 text-xs text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <span>เพิ่มความเร็วในการขับเคลื่อนแผนกลยุทธ์ขององค์กร (Strategic Agility)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <span>ค่านิยมองค์กร (Core Values) ปรากฏชัดเจนในวัฒนธรรมการทำงาน</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <span>ความผูกพันของพนักงาน (Engagement) สูงขึ้น ผลประกอบการเติบโตมั่นคง</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Outcome Assessment Callout */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#111827] nav-font">
                  วัดผลอย่างเป็นระบบด้วย Pre & Post Assessment
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-light mt-0.5">
                  เราจัดทำสรุปผลการเรียนรู้และข้อสังเกตเชิงลึก (Executive Summary Report) ส่งมอบให้ฝ่าย HRD หลังจบการอบรมทุกครั้ง
                </p>
              </div>
            </div>
            <Link to={contactHref()}
              className="btn-premium bg-[#111827] hover:bg-[#0F2557] text-white px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2"
            >
              ปรึกษาแนวทางการวัดผล
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 7. LEAD FACILITATOR SPOTLIGHT (ครูเด่น & Team) ────────────────────── */}
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
                <Link
                  to="/speakers"
                  className="btn-premium bg-[#111827] hover:bg-[#0F2557] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  ทำความรู้จักทีมวิทยากรทั้งหมด
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
            <Link
              to="/resources"
              className="flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] group nav-font"
            >
              ดูบทความทั้งหมด
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HRD_ARTICLES.slice(0, 3).map(article => (
              <div
                key={article.id}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group"
              >
                <Link to={`/resources/${article.id}`} className="relative h-56 overflow-hidden block">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#111827] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {article.category}
                  </div>
                </Link>

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="text-xs text-gray-400 font-bold mb-3">
                    {article.date} • โดย {article.author}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-3 leading-snug nav-font">
                    <Link to={`/resources/${article.id}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/resources/${article.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] group-hover:underline"
                  >
                    อ่านบทความฉบับเต็ม
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 8. FAQ SECTION (คำถามที่พบบ่อยสำหรับ HR & ผู้บริหาร) ───────────────── */}
      <section className="py-20 md:py-32 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
              DECISION ENABLERS & FAQ
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] nav-font leading-tight">
              คำถามที่พบบ่อยสำหรับ <span className="text-[#2563EB]">HRD & ผู้บริหาร</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
              รวบรวมข้อสงสัยสำคัญที่องค์กรมักสอบถาม ก่อนตัดสินใจเลือกหลักสูตรและกระบวนการเรียนรู้กับ CAP Vision
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {[
              {
                q: 'CAP Vision แตกต่างจากสถาบันฝึกอบรมทั่วไปอย่างไร?',
                a: 'เราไม่ใช้หลักสูตรสำเร็จรูป (No One-Size-Fits-All) แต่เริ่มจากการทำ TNA เพื่อวินิจฉัยปัญหาองค์กรจริง ใช้กระบวนการ Activity-Based & Transformative Learning ที่เน้นให้ผู้เรียนคิด ตระหนัก และค้นพบแนวทางแก้ปัญหาด้วยตนเอง ไม่ใช่เพียงแค่นั่งฟังบรรยาย พร้อมเชื่อมโยง Mindset สู่ Action Plan ที่นำไปปรับใช้ในงานได้ทันที'
              },
              {
                q: 'สามารถปรับแต่งเนื้อหาและ Case Study ให้ตรงกับธุรกิจของเราได้ไหม?',
                a: 'ปรับแต่งได้ 100% ครับ ทีมงานของเราจะทำการสัมภาษณ์และศึกษาบริบทจริงขององค์กรคุณ เพื่อออกแบบเนื้อหา กิจกรรม และกรณีศึกษา (Customized Cases) ให้สอดคล้องกับสถานการณ์จริงของอุตสาหกรรม วัฒนธรรมองค์กร และเป้าหมายทางธุรกิจที่คุณต้องการ'
              },
              {
                q: 'ขั้นตอนการขอรับคำปรึกษาและใบเสนอราคา (Proposal) ใช้เวลานานเท่าใด?',
                a: 'เพียงกรอกข้อมูลโจทย์เบื้องต้นผ่านหน้าติดต่อ หรือส่งรายละเอียดความต้องการ ทีมงานจะติดต่อกลับเพื่อพูดคุยซักถามโจทย์เชิงลึก และจัดส่ง Proposal โครงสร้างหลักสูตร (Syllabus) พร้อมใบเสนอราคาเบื้องต้นให้ท่านพิจารณาภายใน 24 ชั่วโมง'
              },
              {
                q: 'รองรับรูปแบบการจัดอบรมแบบใดบ้าง และจำนวนผู้เข้าอบรมที่แนะนำคือเท่าใด?',
                a: 'รองรับทั้ง In-house Workshop ณ บริษัท, สัมมนานอกสถานที่ (Offsite / Outing Workshop) ทั่วประเทศ รวมถึง Virtual Interactive Training สำหรับเวิร์กช็อปที่มีการทำกิจกรรมอย่างเข้มข้น แนะนำขนาดกลุ่ม 20-40 ท่านต่อรุ่น เพื่อให้เกิดการมีส่วนร่วมและการดูแลผู้เรียนอย่างทั่วถึง'
              },
              {
                q: 'มีกระบวนการติดตามและประเมินผลลัพธ์หลังจบการอบรม (Post-training) หรือไม่?',
                a: 'เรามีระบบแบบประเมินผลก่อนและหลังการอบรม (Pre & Post Assessment), สรุปรายงานการเรียนรู้และข้อสังเกตของผู้เข้าร่วมอบรม (Executive Summary Report) ส่งมอบให้ฝ่าย HR พร้อมมีตัวเลือกโปรแกรม Coaching หรือ Follow-up Session เพื่อติดตามผลการปฏิบัติตาม Action Plan อย่างต่อเนื่อง'
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-blue-50/40 border-blue-200 shadow-md' 
                      : 'bg-white border-gray-200/80 hover:border-gray-300 hover:bg-gray-50/50 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111827] nav-font"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2563EB]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-blue-100/60 mt-1">
                      <p className="pl-8">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Help Callout */}
          <div className="mt-12 text-center text-xs sm:text-sm text-gray-500">
            มีคำถามเฉพาะทางหรือต้องการสอบถามเพิ่มเติม?{' '}
            <Link to={contactHref()} className="font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1">
              พูดคุยกับทีมที่ปรึกษาโดยตรง <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      <WebsiteNavigator />

      {/* ── 9. FINAL CONSULTATION & CLOSING CTA ───────────────────────────────── */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Logo className="w-full h-full p-24" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            Transform People · Transform Organization
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 nav-font leading-tight !text-white text-white drop-shadow-md">
            พร้อมยกระดับองค์กร
            <span className="text-[#F59E0B] !text-[#F59E0B] block mt-1 sm:inline sm:ml-3">สู่ผลลัพธ์ใหม่แล้วหรือยัง?</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            เริ่มต้นจากการปรึกษาโจทย์เฉพาะองค์กรของคุณเพื่อรับโครงสร้างหลักสูตรและใบเสนอราคาเบื้องต้นใน 24 ชั่วโมง หรือสำรวจความพร้อมด้วยแบบประเมินฟรี
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to={contactHref()}
              className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-10 py-5 rounded-2xl text-base shadow-2xl nav-font flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              ปรึกษาโจทย์องค์กร (รับข้อเสนอใน 24 ชม.)
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/assessment"
              className="btn-premium bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-bold px-10 py-5 rounded-2xl text-base nav-font flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-[#F59E0B]" />
              สำรวจความพร้อมองค์กร (3 นาที)
            </Link>
          </div>

          {/* Quick Line contact */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>หรือปรึกษาด่วนกับ ครูเด่น มาสเตอร์ฟา ผ่าน</span>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#34D399] hover:underline font-bold inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" /> LINE Official
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
