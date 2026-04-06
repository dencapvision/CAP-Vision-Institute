import React, { useState } from 'react';
import {
  BookOpen, PlayCircle, Clock, Download, FileText, ChevronRight,
  ArrowRight, Sparkles, Users, Target, Zap, Brain, MessageCircle,
  TrendingUp, GraduationCap, CheckCircle2, Star, Shield, Award
} from 'lucide-react';
import { MICRO_LEARNING_VIDEOS, DOWNLOAD_RESOURCES } from '../constants/resources';
import { HRD_ARTICLES } from '../constants/articles';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';

const FEATURED_IDS = ['flow-state-learning', 'intro-to-facilitation', 'hrd-future-skills-2025', 'building-growth-mindset-culture'];

const CATEGORIES = [
  {
    label: 'ทั้งหมด',
    sublabel: 'ทุกหัวข้อ',
    icon: Sparkles,
    ids: HRD_ARTICLES.map(a => a.id),
    textColor: 'text-gray-600',
    lightColor: 'bg-gray-100'
  },
  {
    label: 'Leadership',
    sublabel: 'ผู้นำทีม',
    icon: Target,
    ids: ['hrd-future-skills-2025', 'coaching-skills-for-managers', 'training-management-guide', 'intro-to-facilitation', 'effective-leadership-communication'],
    textColor: 'text-blue-600',
    lightColor: 'bg-blue-50'
  },
  {
    label: 'Team & Culture',
    sublabel: 'วัฒนธรรม',
    icon: Users,
    ids: ['employee-engagement-strategies', 'agile-hr-transformation', 'mental-health-in-workplace', 'building-growth-mindset-culture'],
    textColor: 'text-green-600',
    lightColor: 'bg-green-50'
  },
  {
    label: 'Modern HR',
    sublabel: 'เทคโนโลยี',
    icon: MessageCircle,
    ids: ['ai-proof-skills-hr-2026', 'data-driven-hr', 'okrs-implementation-guide', 'design-thinking-for-hr'],
    textColor: 'text-purple-600',
    lightColor: 'bg-purple-50'
  },
  {
    label: 'Self-Growth',
    sublabel: 'พัฒนาตนเอง',
    icon: Brain,
    ids: ['flow-state-learning', 'building-growth-mindset-culture'],
    textColor: 'text-amber-600',
    lightColor: 'bg-amber-50'
  }
];

const DEEP_KNOWLEDGE = [
  {
    icon: Zap,
    title: 'Transformative Learning คืออะไร?',
    hook: 'ทำไมการอบรม 2 วันถึงไม่เปลี่ยนพฤติกรรมได้?',
    body: 'การเรียนรู้ที่แท้จริงไม่ได้เกิดจากการรับข้อมูล แต่เกิดจากการเปลี่ยนกรอบความคิด (Transformative Frame) CAP Vision ออกแบบทุกหลักสูตรด้วยหลัก Active Learning ที่ผสาน Reflection กับ Action ทำให้ผู้เรียนนำไปใช้ได้จริง ไม่ใช่แค่จำได้ชั่วคราว',
    tag: 'CAP Theory',
  },
  {
    icon: Brain,
    title: 'Inside-Out Growth Model',
    hook: 'ทีมที่เก่งขึ้นจากข้างในออกมา vs ถูกสั่งให้เก่ง',
    body: 'การเปลี่ยนแปลงที่ยั่งยืนต้องเริ่มจากข้างใน โมเดล Inside-Out ของ CAP Vision ทำงานที่ระดับ Mindset, Belief และ Behavior ไม่ใช่แค่ Skills เพราะคนที่เชื่อในตัวเองจะเรียนรู้ต่อไปเองโดยไม่ต้องรอให้องค์กรส่งไปอบรม',
    tag: 'Philosophy',
  },
  {
    icon: MessageCircle,
    title: 'Dialogue 4 ระดับ',
    hook: 'คุณกำลังพูดคุย หรือแค่รอให้ถึงตาตัวเอง?',
    body: 'ทฤษฎี Dialogue มี 4 ระดับ: 1) Downloading — พูดจากสิ่งที่รู้อยู่แล้ว, 2) Debate — พูดเพื่อชนะ, 3) Discussion — แลกเปลี่ยนข้อมูล, 4) Dialogue — ฟังเพื่อเข้าใจและสร้างความหมายร่วมกัน การประชุมส่วนใหญ่อยู่ที่ระดับ 1-2 ผู้นำที่ยิ่งใหญ่ดึงทีมขึ้นสู่ระดับ 4',
    tag: 'Facilitation',
  },
];

const articleById = (id: string) => HRD_ARTICLES.find(a => a.id === id);

const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);

  const featuredArticles = FEATURED_IDS.map(id => articleById(id)).filter(Boolean) as typeof HRD_ARTICLES;
  const categoryArticles = CATEGORIES[activeCategory].ids
    .map(id => articleById(id))
    .filter(Boolean) as typeof HRD_ARTICLES;

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Learning Hub | ศูนย์รวมความรู้พัฒนาคนและองค์กร | CAP Vision Institute"
        description="รวมบทความ วิดีโอ และเครื่องมือฟรีด้านภาวะผู้นำ การสื่อสาร และการพัฒนาบุคลากร โดย ครูเด่น มาสเตอร์ฟา"
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-[#0f3460] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
            alt="Learning Hub"
            className="w-full h-full object-cover opacity-10 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f3460] via-[#0f3460]/95 to-[#0f3460]" />
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#c5a059]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-[#c5a059] animate-pulse" />
            <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font">
              Learning Hub · {HRD_ARTICLES.length} บทความ · เครื่องมือฟรี
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black nav-font leading-[1.1] tracking-tight mb-6">
            <span className="text-[#c5a059]">ศูนย์รวมความรู้</span><br />
            <span className="text-white">ด้านการพัฒนาคนและองค์กร</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            ความรู้ที่ใช้งานได้จริง — ไม่ใช่แค่ทฤษฎี<br />
            <span className="text-white/80 font-semibold">บทความ · วิดีโอ · เครื่องมือฟรี</span> โดยทีม CAP Vision Institute
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#featured"
              className="bg-[#c5a059] text-white px-8 py-4 rounded-2xl font-black text-base nav-font flex items-center justify-center gap-3 hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all shadow-2xl"
            >
              อ่านบทความแนะนำ <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#toolkit"
              className="bg-white/5 border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-black text-base nav-font flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              ดาวน์โหลดเครื่องมือฟรี <Download className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent" />
      </section>

      {/* ─── FEATURED INSIGHTS ────────────────────────────────── */}
      <section id="featured" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-3">
              บทความแนะนำ
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font">
              เริ่มต้นที่นี่ — ความรู้ที่เปลี่ยนมุมมอง
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              คัดเลือกโดยทีม CAP Vision เหมาะสำหรับผู้นำ HR และผู้จัดการที่ต้องการผลลัพธ์จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.map((article, idx) => (
              <Link
                key={article.id}
                to={`/resources/${article.id}`}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {idx === 0 && (
                    <div className="absolute top-4 left-4 bg-[#c5a059] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full nav-font">
                      Hot
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest mb-2 nav-font">
                    {article.date}
                  </p>
                  <h3 className="font-bold text-base text-[#0f3460] nav-font leading-tight mb-3 group-hover:text-[#c5a059] transition-colors flex-grow">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#0f3460] font-black text-[10px] nav-font uppercase tracking-widest mt-auto">
                    อ่านต่อ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IN-LINE CTA #1 ────────────────────────────────────── */}
      <section className="py-12 bg-[#0f3460]/5 border-y border-[#c5a059]/10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-black text-[#0f3460] text-lg nav-font">
              สนใจนำความรู้เหล่านี้ไปใช้ในองค์กร?
            </p>
            <p className="text-gray-500 text-sm mt-1">
              ทุกบทความเชื่อมกับหลักสูตร In-house Training ที่ออกแบบเฉพาะ
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-[#c5a059] text-white px-8 py-4 rounded-2xl font-black nav-font flex items-center gap-3 hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all whitespace-nowrap shadow-lg"
          >
            ปรึกษาฟรี <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ─── CONTENT CATEGORIES ───────────────────────────────── */}
      <section id="content-categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#c5a059] font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-3">
              หมวดหมู่ความรู้
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font">
              เลือกอ่านตามทักษะที่ต้องการพัฒนา
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm nav-font transition-all ${
                    activeCategory === idx
                      ? 'bg-[#0f3460] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span className={`text-[10px] opacity-70 hidden sm:block`}>{cat.sublabel}</span>
                </button>
              );
            })}
          </div>

          {/* Category Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryArticles.map((article) => {
              const cat = CATEGORIES[activeCategory];
              const Icon = cat.icon;
              return (
                <Link
                  key={article.id}
                  to={`/resources/${article.id}`}
                  className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute top-4 left-4 ${cat.lightColor} ${cat.textColor} text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full nav-font flex items-center gap-1`}>
                      <Icon className="w-3 h-3" /> {cat.label}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#0f3460] nav-font leading-tight mb-2 group-hover:text-[#c5a059] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-[#0f3460] font-black text-[10px] nav-font uppercase tracking-widest">
                      อ่านบทความ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => {
                setActiveCategory(0);
                document.getElementById('content-categories')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-[#0f3460] font-black text-sm nav-font border-2 border-[#0f3460]/20 px-6 py-3 rounded-2xl hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
            >
              ดูบทความทั้งหมด <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── DEEP KNOWLEDGE ───────────────────────────────────── */}
      <section className="py-24 bg-[#0f3460]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-3">
              องค์ความรู้เชิงลึก
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white nav-font">
              ทฤษฎีที่อยู่เบื้องหลังการอบรม CAP Vision
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              เข้าใจว่าทำไมเราถึงออกแบบหลักสูตรแบบนี้ — และทำไมมันถึงได้ผล
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEEP_KNOWLEDGE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#c5a059]/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#c5a059]" />
                    </div>
                    <span className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest nav-font">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs font-semibold italic mb-3">
                    "{item.hook}"
                  </p>
                  <h3 className="text-white font-black text-xl nav-font mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── MICRO-LEARNING VIDEO ─────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-[#c5a059] font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-2">
                Micro-learning
              </p>
              <h2 className="text-3xl font-black text-[#0f3460] nav-font">
                เรียนรู้ใน 3-5 นาที
              </h2>
              <p className="text-gray-500 mt-1 text-sm">เข้าใจง่าย นำไปใช้ได้ทันที</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MICRO_LEARNING_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0f3460]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-[#c5a059] rounded-full flex items-center justify-center shadow-2xl">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {video.duration}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest mb-3 block nav-font">
                    {video.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#0f3460] nav-font mb-4 group-hover:text-[#c5a059] transition-colors">
                    {video.title}
                  </h3>
                  <button className="flex items-center gap-2 text-[#0f3460] text-[10px] font-black nav-font uppercase tracking-widest group-hover:gap-4 transition-all">
                    ดูวิดีโอ <ChevronRight className="w-4 h-4 text-[#c5a059]" />
                  </button>
                </div>
              </div>
            ))}

            {/* Coming Soon Cards */}
            {[
              { title: 'เทคนิค Facilitation คำถามที่เปลี่ยนห้องประชุม', category: 'Facilitation', soon: true },
              { title: 'OKRs ใน 5 นาที — ตั้งเป้าหมายอย่างผู้นำระดับโลก', category: 'Leadership', soon: true },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 opacity-60">
                <div className="h-56 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <span className="text-gray-400 text-xs font-black nav-font uppercase tracking-widest">
                      เร็วๆ นี้
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-3 block nav-font">
                    {v.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-400 nav-font leading-tight">
                    {v.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IN-LINE CTA #2 ────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-[#c5a059]/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#c5a059] font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-4">
            จาก Insight สู่ Action
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-4">
            ความรู้เหล่านี้สอนได้ในองค์กรของคุณ
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            ทุก concept ในบทความและวิดีโอ มีหลักสูตร In-house Training รองรับ ออกแบบเฉพาะสำหรับทีมของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-[#0f3460] text-white px-8 py-4 rounded-2xl font-black nav-font flex items-center justify-center gap-3 hover:bg-[#1a4a7a] transition-all"
            >
              ดูหลักสูตรทั้งหมด <GraduationCap className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-[#c5a059] text-[#c5a059] px-8 py-4 rounded-2xl font-black nav-font flex items-center justify-center gap-3 hover:bg-[#c5a059] hover:text-white transition-all"
            >
              ปรึกษาฟรี ไม่มีข้อผูกมัด <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TOOLKIT / FREE DOWNLOADS ─────────────────────────── */}
      <section id="toolkit" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-3">
              Toolkit ฟรี
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font">
              เครื่องมือที่ HR และผู้จัดการใช้จริง
            </h2>
            <p className="text-gray-500 mt-3">ดาวน์โหลดฟรี ใช้ได้ทันที ไม่ต้องรอ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {DOWNLOAD_RESOURCES.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 bg-[#0f3460]/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a059]/10 transition-colors">
                    <FileText className="w-7 h-7 text-[#0f3460] group-hover:text-[#c5a059] transition-colors" />
                  </div>
                  <div>
                    <span className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest nav-font block mb-1">
                      {tool.type} · {tool.category}
                    </span>
                    <h3 className="font-black text-[#0f3460] nav-font leading-tight text-lg">
                      {tool.title}
                    </h3>
                  </div>
                </div>
                <button className="w-full bg-[#0f3460] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#c5a059] transition-all nav-font text-sm">
                  <Download className="w-4 h-4" /> ดาวน์โหลดฟรี
                </button>
                <p className="text-center text-gray-400 text-[10px] mt-3 nav-font">
                  ไม่ต้องลงทะเบียน · ดาวน์โหลดได้เลย
                </p>
              </div>
            ))}
          </div>

          {/* Lead Capture */}
          <div className="bg-[#0f3460] rounded-[2.5rem] p-10 md:p-16 max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#c5a059]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-[#c5a059]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white nav-font mb-4">
              รับ Toolkit ชุดพิเศษ ฟรี
            </h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Checklist พัฒนาภาวะผู้นำ 30 ข้อ + คู่มือออกแบบ Learning Journey สำหรับ HR
            </p>
            {downloadSubmitted ? (
              <div className="flex items-center justify-center gap-3 text-[#c5a059] font-black nav-font">
                <CheckCircle2 className="w-6 h-6" /> ขอบคุณ! เราจะส่งให้ทาง LINE ภายใน 24 ชม.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ"
                  value={downloadEmail}
                  onChange={e => setDownloadEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 px-5 py-4 rounded-2xl font-medium focus:outline-none focus:border-[#c5a059] transition-colors"
                />
                <button
                  onClick={() => downloadEmail && setDownloadSubmitted(true)}
                  className="bg-[#c5a059] text-white px-8 py-4 rounded-2xl font-black nav-font hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all whitespace-nowrap"
                >
                  รับฟรีเลย
                </button>
              </div>
            )}
            <p className="text-white/30 text-[10px] mt-4 nav-font">
              ไม่มี Spam · ยกเลิกได้ทุกเมื่อ
            </p>
          </div>
        </div>
      </section>

      {/* ─── QUOTE ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-1 bg-[#c5a059] rounded-full mx-auto mb-10" />
          <blockquote className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font italic leading-tight mb-8">
            "การเรียนรู้ที่ไม่มีการสะท้อนคิด (Reflection)<br />
            เปรียบเสมือนการปลูกเมล็ดพันธุ์บนพื้นปูน"
          </blockquote>
          <p className="text-gray-400 font-black text-xs uppercase tracking-widest nav-font">
            — ครูเด่น มาสเตอร์ฟา, Founder CAP Vision Institute
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f3460] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#c5a059] font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-6">
            ก้าวต่อไป
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#c5a059] nav-font leading-tight mb-6">
            พร้อมนำความรู้เหล่านี้
          </h2>
          <h2 className="text-3xl md:text-5xl font-black text-white nav-font leading-tight mb-8">
            ไปพัฒนาทีมของคุณ?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            ปรึกษาโปรแกรมอบรม In-house Training ที่ออกแบบเฉพาะสำหรับองค์กรของคุณ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/contact"
              className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg nav-font flex items-center justify-center gap-3 hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all shadow-2xl"
            >
              ปรึกษาโปรแกรมอบรม <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg nav-font flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              LINE: {CONTACT_INFO.line}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/40 text-xs font-bold nav-font uppercase tracking-widest">
            {['ปรึกษาฟรี ไม่มีข้อผูกมัด', 'ตอบกลับภายใน 24 ชม.', 'ออกแบบเฉพาะองค์กรคุณ'].map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-[#c5a059]" /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent" />
      </section>
    </div>
  );
};

export default Resources;
