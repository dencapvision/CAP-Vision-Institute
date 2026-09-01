import React, { useState, useEffect } from 'react';
import {
  BookOpen, PlayCircle, Clock, Download, FileText, ChevronRight,
  ArrowRight, Sparkles, Users, Target, Zap, Brain, MessageCircle,
  TrendingUp, GraduationCap, CheckCircle2, Star, Shield, Award, Cpu,
  ExternalLink, Search
} from 'lucide-react';
import { MICRO_LEARNING_VIDEOS, DOWNLOAD_RESOURCES } from '../constants/resources';
import { HRD_ARTICLES } from '../constants/articles';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';
import { fetchPublishedArticles, type BlogArticleRow } from '../services/blog-articles';
import { fetchPublishedVideos, fetchPublishedToolkits, type MicroVideo, type ToolkitDownload } from '../services/resources-admin';
import { supabase } from '../lib/supabaseClient';
import {
  IconInstituteShield,
  IconGoldCrestStar,
  IconLeadership,
  IconTeamSynergy,
  IconGrowthCulture,
  IconCreativeCPS
} from '../components/icons/CapBrandIcons';

const FEATURED_IDS = ['flow-state-learning', 'intro-to-facilitation', 'hrd-future-skills-2025', 'building-growth-mindset-culture'];

const CATEGORIES = [
  {
    label: 'ทั้งหมด',
    sublabel: 'ทุกหมวดหมู่',
    icon: Sparkles,
    ids: HRD_ARTICLES.map(a => a.id),
    textColor: 'text-gray-700',
    lightColor: 'bg-gray-100'
  },
  {
    label: 'Leadership & ภาวะผู้นำ',
    sublabel: 'ผู้นำทีมและผู้บริหาร',
    icon: Target,
    ids: ['hrd-future-skills-2025', 'coaching-skills-for-managers', 'training-management-guide', 'intro-to-facilitation', 'effective-leadership-communication'],
    textColor: 'text-[#2563EB]',
    lightColor: 'bg-blue-50'
  },
  {
    label: 'Team Synergy & วัฒนธรรม',
    sublabel: 'การทำงานร่วมกัน',
    icon: Users,
    ids: ['employee-engagement-strategies', 'agile-hr-transformation', 'mental-health-in-workplace', 'building-growth-mindset-culture'],
    textColor: 'text-emerald-700',
    lightColor: 'bg-emerald-50'
  },
  {
    label: 'Modern People Skills',
    sublabel: 'ทักษะแห่งอนาคต',
    icon: MessageCircle,
    ids: ['ai-proof-skills-hr-2026', 'data-driven-hr', 'okrs-implementation-guide', 'design-thinking-for-hr'],
    textColor: 'text-purple-700',
    lightColor: 'bg-purple-50'
  },
  {
    label: 'Self-Growth & Mindset',
    sublabel: 'การเติบโตจากภายใน',
    icon: Brain,
    ids: ['flow-state-learning', 'building-growth-mindset-culture'],
    textColor: 'text-amber-800',
    lightColor: 'bg-amber-50'
  }
];

const DEEP_KNOWLEDGE = [
  {
    icon: Zap,
    title: 'Transformative Learning คืออะไร?',
    hook: 'ทำไมการอบรม 2 วันแบบเดิมถึงไม่เปลี่ยนพฤติกรรม?',
    body: 'การเรียนรู้ที่แท้จริงไม่ได้เกิดจากการรับข้อมูล แต่เกิดจากการเปลี่ยนกรอบความคิด (Perspective Transformation) CAP Vision ออกแบบทุกหลักสูตรด้วยหลัก Active Experiential Learning ที่ผสาน Reflection กับ Action เพื่อผลลัพธ์ที่ยั่งยืน',
    tag: 'CAP Framework',
  },
  {
    icon: Brain,
    title: 'Inside-Out Growth Model',
    hook: 'ทีมที่เก่งขึ้นจากแรงขับเคลื่อนภายใน vs ถูกสั่งให้ทำ',
    body: 'การเปลี่ยนแปลงที่ยั่งยืนต้องเริ่มจากข้างใน โมเดล Inside-Out ของเราทำงานที่ระดับ Mindset, Belief และ Behavior ไม่ใช่แค่จำเทคนิค เพราะคนที่เข้าใจเป้าหมายจะพัฒนาตนเองอย่างต่อเนื่องโดยไม่ต้องรอคำสั่ง',
    tag: 'Philosophy',
  },
  {
    icon: MessageCircle,
    title: 'Dialogue 4 ระดับเพื่อทีมทรงพลัง',
    hook: 'คุณกำลังสนทนาเพื่อเข้าใจ หรือแค่รอให้ถึงตาตัวเองพูด?',
    body: 'ทฤษฎี Dialogue มี 4 ระดับ: 1) Downloading, 2) Debate, 3) Discussion, 4) Generative Dialogue ที่สร้างความเข้าใจและความหมายร่วมกัน การ Facilitate ที่ดีจะช่วยยกระดับการประชุมสู่ระดับ 4 เพื่อปลดล็อกความคิดสร้างสรรค์ของทีม',
    tag: 'Master Facilitation',
  },
];

const articleById = (id: string) => HRD_ARTICLES.find(a => a.id === id);

export const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);
  const [aeoArticles, setAeoArticles] = useState<BlogArticleRow[]>([]);
  const [liveVideos, setLiveVideos] = useState<MicroVideo[]>([]);
  const [liveToolkits, setLiveToolkits] = useState<ToolkitDownload[]>([]);

  useEffect(() => {
    fetchPublishedArticles().then(setAeoArticles).catch(() => {});
    fetchPublishedVideos().then(setLiveVideos).catch(() => {});
    fetchPublishedToolkits().then(setLiveToolkits).catch(() => {});
  }, []);

  const activeVideos = liveVideos.length > 0
    ? liveVideos
    : MICRO_LEARNING_VIDEOS.map(v => ({ ...v, id: v.id, thumbnail_url: v.thumbnail, video_url: v.videoUrl ?? '', file_type: '', download_url: '', description: '', published: true, sort_order: 0, created_at: '', updated_at: '' } as unknown as MicroVideo));
  const activeToolkits = liveToolkits.length > 0
    ? liveToolkits
    : DOWNLOAD_RESOURCES.map(t => ({ ...t, id: t.id, file_type: t.type, thumbnail_url: t.thumbnail, download_url: t.downloadUrl ?? '', description: '', published: true, sort_order: 0, created_at: '', updated_at: '' } as unknown as ToolkitDownload));

  const featuredArticles = FEATURED_IDS.map(id => articleById(id)).filter(Boolean) as typeof HRD_ARTICLES;
  
  const categoryArticles = CATEGORIES[activeCategory].ids
    .map(id => articleById(id))
    .filter(Boolean) as typeof HRD_ARTICLES;

  const filteredArticles = categoryArticles.filter(art => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q);
  });

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden">
      <SEO
        title="Learning & Knowledge Hub | คลังความรู้พัฒนาคนและองค์กร | CAP Vision Institute"
        description="ศูนย์รวมบทความ วิดีโอ Micro-Learning และเอกสาร Worksheet ฟรีด้านภาวะผู้นำ การสื่อสาร และการพัฒนาวัฒนธรรมองค์กร โดย ครูเด่น มาสเตอร์ฟา"
      />

      {/* ─── 1. HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 md:pt-40 pb-24 md:pb-36 overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F59E0B]/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          {/* Label Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <IconInstituteShield className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[#60A5FA] text-xs font-bold uppercase tracking-widest nav-font">
              Knowledge Hub · {HRD_ARTICLES.length}+ บทความ & สื่อการสอน
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black nav-font leading-[1.05] tracking-tight mb-6 text-white">
            คลังปัญญาและการเรียนรู้
            <br />
            <span className="text-[#F59E0B]">เพื่อการ Transform องค์กร</span>
          </h1>

          <div className="w-16 h-1 bg-[#2563EB] rounded-full mx-auto mb-8" />

          <p className="text-gray-300 text-base sm:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            องค์ความรู้และเครื่องมือที่ใช้งานได้จริงในโลกธุรกิจยุคใหม่
            <br />
            <span className="text-white font-medium">บทความเชิงลึก · Micro-Learning Videos · Worksheets ฟรี</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#featured"
              className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider nav-font shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              อ่านบทความแนะนำ <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#teaching-docs"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider nav-font flex items-center justify-center gap-2 transition-all"
            >
              ดาวน์โหลด Worksheets ฟรี <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURED INSIGHTS ─────────────────────────────────────── */}
      <section id="featured" className="py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#2563EB] text-xs font-black uppercase tracking-widest mb-3 nav-font">
              <IconGoldCrestStar className="w-3.5 h-3.5" />
              Featured Insights
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F2557] nav-font">
              เริ่มต้นที่นี่ — ความรู้ที่เปลี่ยนมุมมอง
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-xl mx-auto font-light">
              คัดเลือกโดยทีม Master Facilitator เหมาะสำหรับผู้บริหาร, HRD และผู้นำทีมที่ต้องการขับเคลื่อนผลลัพธ์จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.map((article, idx) => (
              <Link
                key={article.id}
                to={`/resources/${article.id}`}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-md hover:shadow-2xl hover:border-[#2563EB]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {idx === 0 && (
                    <div className="absolute top-4 left-4 bg-[#F59E0B] text-[#111827] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Must Read
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[#2563EB] text-[11px] font-black uppercase tracking-wider mb-2 nav-font">
                    {article.date}
                  </span>
                  <h3 className="font-bold text-base text-[#0F2557] nav-font leading-snug mb-3 group-hover:text-[#2563EB] transition-colors flex-grow">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-light">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#2563EB] font-black text-xs nav-font uppercase tracking-wider mt-auto pt-2 border-t border-gray-100">
                    อ่านต่อ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. IN-LINE ASSESSMENT CALLOUT ────────────────────────────── */}
      <section className="py-12 bg-[#F8FAFC] border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
              <IconInstituteShield className="w-4 h-4" />
              Organizational Diagnosis
            </div>
            <p className="font-black text-[#0F2557] text-lg sm:text-xl nav-font">
              สนใจวัดระดับความพร้อมและจุดปลดล็อกขององค์กรคุณ?
            </p>
            <p className="text-gray-600 text-xs sm:text-sm mt-0.5 font-light">
              ทำแบบประเมิน Organization Assessment 3 นาทีเพื่อรับคำแนะนำที่ตรงจุด
            </p>
          </div>
          <Link
            to="/assessment"
            className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3.5 rounded-2xl font-black text-xs sm:text-sm nav-font flex items-center gap-2 whitespace-nowrap shadow-lg flex-shrink-0"
          >
            ทำแบบประเมินฟรี <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── 4. CONTENT CATEGORIES ────────────────────────────────────── */}
      <section id="content-categories" className="py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Knowledge Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F2557] nav-font mb-4">
              เลือกอ่านตามทักษะที่ต้องการพัฒนา
            </h2>

            {/* Search Input */}
            <div className="max-w-md mx-auto relative mt-6">
              <input
                type="text"
                placeholder="ค้นหาบทความ, หัวข้อ หรือคีย์เวิร์ด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] shadow-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = activeCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm nav-font transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20'
                      : 'bg-[#F8FAFC] border border-gray-200 text-gray-700 hover:border-[#2563EB] hover:text-[#2563EB]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Filtered Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const cat = CATEGORIES[activeCategory];
                const Icon = cat.icon;
                return (
                  <Link
                    key={article.id}
                    to={`/resources/${article.id}`}
                    className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-md hover:shadow-xl hover:border-[#2563EB]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className={`absolute top-3 left-3 ${cat.lightColor} ${cat.textColor} text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full nav-font flex items-center gap-1 shadow-xs`}>
                        <Icon className="w-3 h-3" /> {cat.label.split('&')[0]}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-[#0F2557] nav-font leading-snug mb-2 group-hover:text-[#2563EB] transition-colors flex-1">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-light">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[#2563EB] font-black text-xs nav-font uppercase tracking-wider pt-3 border-t border-gray-100">
                        อ่านบทความ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F8FAFC] rounded-3xl border border-gray-200">
              <p className="text-gray-500 text-sm">ไม่พบบทความที่ตรงกับคำค้นหา "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-bold text-[#2563EB] hover:underline"
              >
                ล้างคำค้นหา
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── 5. AI-POWERED INSIGHTS (AEO Articles) ────────────────────── */}
      {aeoArticles.length > 0 && (
        <section className="py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-[#2563EB] text-xs font-black uppercase tracking-widest mb-2 nav-font">
                  <Cpu className="w-3.5 h-3.5" /> AEO & AI Knowledge Insights
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0F2557] nav-font">
                  CAP Vision Insight Series
                </h2>
                <p className="text-gray-600 mt-1 text-sm font-light">บทความและข้อคิดเห็นเชิงลึกสำหรับผู้นำยุค AI</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aeoArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/resources/${article.slug}`}
                  className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {article.thumbnail ? (
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-[#0F2557]/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full nav-font flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-[#F59E0B]" /> AI Insight
                      </div>
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-[#111827] to-[#0F2557] flex items-center justify-center relative">
                      <Sparkles className="w-10 h-10 text-[#F59E0B]/30" />
                      <div className="absolute top-3 left-3 bg-white/10 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full nav-font flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-[#F59E0B]" /> AI Insight
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider mb-2 nav-font">
                      {article.date_label || article.category}
                    </span>
                    <h3 className="font-bold text-base text-[#0F2557] nav-font leading-snug mb-3 group-hover:text-[#2563EB] transition-colors flex-grow">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-light">
                      {article.content.summary}
                    </p>
                    <div className="flex items-center gap-2 text-[#2563EB] font-black text-xs nav-font uppercase tracking-wider mt-auto pt-3 border-t border-gray-100">
                      อ่านต่อ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. DEEP KNOWLEDGE FRAMEWORK ─────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 nav-font backdrop-blur-md">
              <IconGoldCrestStar className="w-3.5 h-3.5 text-[#F59E0B]" />
              Deep Learning Frameworks
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white nav-font mb-4">
              ปรัชญาเบื้องหลังกระบวนการ CAP Vision
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-light">
              เข้าใจว่าทำไมเราจึงออกแบบกระบวนการเรียนรู้แบบนี้ และทำไมถึงสร้างผลลัพธ์ที่ยั่งยืน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEEP_KNOWLEDGE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-[#2563EB]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#F59E0B]" />
                      </div>
                      <span className="text-[#60A5FA] text-xs font-bold uppercase tracking-wider nav-font">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-[#F59E0B] text-xs font-bold italic mb-3">
                      "{item.hook}"
                    </p>
                    <h3 className="text-white font-black text-xl nav-font mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 7. MICRO-LEARNING VIDEOS ─────────────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
                Micro-Learning Video
              </span>
              <h2 className="text-3xl font-black text-[#0F2557] nav-font">
                เรียนรู้แบบรวดเร็วใน 3-5 นาที
              </h2>
              <p className="text-gray-600 mt-1 text-sm font-light">เข้าใจง่าย ย่อยง่าย นำไปปฏิบัติจริงได้ทันที</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeVideos.map((video) => {
              const hasUrl = !!video.video_url;
              const Wrapper = hasUrl ? 'a' : 'div';
              const wrapperProps = hasUrl
                ? { href: video.video_url, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              const thumb = (video as any).thumbnail_url || (video as any).thumbnail || '';
              return (
                <Wrapper
                  key={video.id}
                  {...(wrapperProps as any)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {thumb
                      ? <img src={thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      : <div className="w-full h-52 bg-gray-100 flex items-center justify-center"><PlayCircle className="w-12 h-12 text-gray-300" /></div>}
                    <div className="absolute inset-0 bg-[#0F2557]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-xl">
                        <PlayCircle className="w-7 h-7 text-[#111827]" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[10px] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {video.duration}
                      </div>
                    )}
                    {!hasUrl && (
                      <div className="absolute top-3 left-3 bg-black/60 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full nav-font">
                        เร็วๆ นี้
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider mb-2 block nav-font">
                      {video.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#0F2557] nav-font mb-4 group-hover:text-[#2563EB] transition-colors flex-1">
                      {video.title}
                    </h3>
                    <span className="flex items-center gap-1.5 text-[#0F2557] text-xs font-black nav-font uppercase tracking-wider group-hover:text-[#2563EB] transition-all pt-3 border-t border-gray-100">
                      {hasUrl ? 'ดูวิดีโอบทเรียน' : 'เร็วๆ นี้'} <ChevronRight className="w-4 h-4 text-[#F59E0B]" />
                    </span>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 8. TEACHING DOCS & HANDOUTS ─────────────────────────────── */}
      <section id="teaching-docs" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Teaching Docs & Worksheets
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F2557] nav-font">
              สื่อการเรียนรู้และเอกสารประกอบการสอน
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-xl mx-auto font-light">
              เอกสารประกอบการอบรมและแบบฝึกหัดจากหลักสูตรจริง ออกแบบโดยครูเด่น มาสเตอร์ฟา
            </p>
          </div>

          {/* ── Training Handouts ── */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 nav-font">หมวดหมู่</span>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-[#2563EB] font-black text-xs nav-font">
                📂 เอกสารและระบบประกอบการอบรม (Training Systems & Handouts)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 — MIND STAR */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform">
                    ⭐
                  </div>
                  <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider nav-font block mb-1.5">
                    MIND STAR x ภูเก็ต 2026
                  </span>
                  <h3 className="font-black text-[#0F2557] nav-font text-lg leading-snug mb-3">
                    ยกระดับทุนวัฒนธรรม สู่ตลาดพรีเมียม ด้วย AI
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    ระบบและเอกสารเวิร์กชอปเพื่อการพัฒนาผลิตภัณฑ์และบรรจุภัณฑ์ท้องถิ่นด้วย AI
                  </p>
                </div>
                <a
                  href="https://mind-star-workshop-2026.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F2557] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all nav-font text-xs shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> เปิดระบบเรียนรู้
                </a>
              </div>

              {/* Card 2 — Comm for Leader */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform">
                    🗣️
                  </div>
                  <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider nav-font block mb-1.5">
                    Communication for Leaders
                  </span>
                  <h3 className="font-black text-[#0F2557] nav-font text-lg leading-snug mb-3">
                    ทักษะการสื่อสารและการนำเสนอสำหรับผู้นำ
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    เครื่องมือพัฒนาการนำเสนออย่างมีพลัง การโน้มน้าวใจ และการสื่อสารระดับผู้บริหาร
                  </p>
                </div>
                <a
                  href="https://workshop-communicaion-for-leader.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F2557] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all nav-font text-xs shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> เปิดระบบเรียนรู้
                </a>
              </div>

              {/* Card 3 — DIPROM x CAP VISION */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform">
                    💡
                  </div>
                  <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider nav-font block mb-1.5">
                    DIPROM x CAP VISION
                  </span>
                  <h3 className="font-black text-[#0F2557] nav-font text-lg leading-snug mb-3">
                    พัฒนาผลิตภัณฑ์ชุมชนด้วย AI
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    แนวทางการยกระดับทุนวัฒนธรรมสู่ผลิตภัณฑ์ต้นแบบด้วยพลังของ AI
                  </p>
                </div>
                <a
                  href="https://diprom-flow-tha7.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F2557] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all nav-font text-xs shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> เปิดระบบเรียนรู้
                </a>
              </div>

              {/* Card 4 — NotebookLM Workshop */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform">
                    📓
                  </div>
                  <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider nav-font block mb-1.5">
                    NotebookLM Workshop
                  </span>
                  <h3 className="font-black text-[#0F2557] nav-font text-lg leading-snug mb-3">
                    สร้างสรรค์เนื้อหาด้วยพลังสมองอัจฉริยะ
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    วิเคราะห์จิตวิทยาผู้บริโภค ถอดรหัสความคิด และย่อยสคริปต์สไลด์ด้วย AI
                  </p>
                </div>
                <a
                  href="https://notebook-lm-workshop.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F2557] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all nav-font text-xs shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> เปิดระบบเรียนรู้
                </a>
              </div>
            </div>
          </div>

          {/* ── Course Worksheets ── */}
          <div className="border-t border-gray-200 pt-16">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 nav-font">หมวดหมู่</span>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full text-amber-800 font-black text-xs nav-font">
                📝 Worksheets จากหลักสูตรจริง (Course Worksheets)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 — My Worth Tree */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                    🌳
                  </div>
                  <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider nav-font block mb-1.5">
                    Self Esteem Module
                  </span>
                  <h3 className="font-black text-[#0F2557] nav-font text-lg leading-snug mb-3">
                    My Worth Tree Worksheet
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    ค้นพบค่านิยม จุดแข็ง และพลังขับเคลื่อนภายในตนเอง พร้อม Checklist 2 หน้า A4
                  </p>
                </div>
                <a
                  href="https://docs.google.com/document/d/1fZKByd2im107nRiFxmV06qFt5AwRJEJ5Rn4nDZSd_Z4/edit?tab=t.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F2557] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all nav-font text-xs shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> ดาวน์โหลด Google Docs
                </a>
              </div>

              {/* Card 2 — Smart Profile */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                    📊
                  </div>
                  <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider nav-font block mb-1.5">
                    Multiple Intelligences Module
                  </span>
                  <h3 className="font-black text-[#0F2557] nav-font text-lg leading-snug mb-3">
                    Smart Profile Worksheet
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    ตารางประเมินพหุปัญญา 8 ด้าน + Radar Grid + ช่อง Reflection & Dialog
                  </p>
                </div>
                <a
                  href="https://docs.google.com/document/d/1jXAOrgX6JmdFQZBk8hxTs70FcGYDP934ncGhGhOtjx8/edit?tab=t.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F2557] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all nav-font text-xs shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> ดาวน์โหลด Google Docs
                </a>
              </div>

              {/* Card 3 — Style Myself */}
              <div className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                    🎨
                  </div>
                  <span className="text-[#2563EB] text-[10px] font-black uppercase tracking-wider nav-font block mb-1.5">
                    Style & Communication Module
                  </span>
                  <h3 className="font-black text-[#0F2557] nav-font text-lg leading-snug mb-3">
                    Style Myself Worksheet
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    สำรวจ 3 มิติ Inner · Social · Visual Style + My Identity Card
                  </p>
                </div>
                <a
                  href="https://docs.google.com/document/d/1Gz7nnCfFtwdVtxylIemXIVpRYPvxbyimD_ceSQur9Hc/edit?tab=t.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F2557] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all nav-font text-xs shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> ดาวน์โหลด Google Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. TOOLKIT LEAD CAPTURE ─────────────────────────────────── */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-7 h-7 text-[#F59E0B]" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white nav-font mb-4">
              รับ Toolkit พัฒนาภาวะผู้นำ ฟรี
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-8 max-w-md mx-auto font-light leading-relaxed">
              Checklist พัฒนาภาวะผู้นำ 30 ข้อ + คู่มือออกแบบ Learning Journey สำหรับ HR & ผู้บริหาร
            </p>

            {downloadSubmitted ? (
              <div className="inline-flex items-center gap-2 text-[#F59E0B] font-bold text-sm bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5" /> ขอบคุณ! เราจะจัดส่งเอกสารให้คุณโดยเร็ว
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="กรอกอีเมลของคุณ..."
                  value={downloadEmail}
                  onChange={e => setDownloadEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
                />
                <button
                  onClick={async () => {
                    if (downloadEmail) {
                      setDownloadSubmitted(true);
                      try {
                        await supabase.functions.invoke('line-notify', {
                          body: { 
                            project: 'RESOURCES',
                            formType: 'ดาวน์โหลด Toolkit ฟรี', 
                            data: { 'อีเมล': downloadEmail } 
                          }
                        });
                      } catch (e) {
                         console.error('Failed to notify toolkit download:', e);
                      }
                    }
                  }}
                  className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider nav-font transition-all whitespace-nowrap"
                >
                  รับเอกสารฟรี
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 10. CLOSING QUOTE & FINAL CTA ─────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <blockquote className="text-2xl sm:text-3xl font-black text-white nav-font italic leading-snug mb-8">
            "การเรียนรู้ที่ไร้การสะท้อนคิด (Reflection)
            <br />
            <span className="text-[#F59E0B]">เปรียบเสมือนการปลูกเมล็ดพันธุ์บนพื้นปูน"</span>
          </blockquote>
          <p className="text-[#60A5FA] font-bold text-xs uppercase tracking-widest nav-font mb-12">
            — ครูเด่น มาสเตอร์ฟา, Director of CAP Vision Institute
          </p>

          <h3 className="text-2xl sm:text-4xl font-black text-white nav-font mb-4">
            พร้อมนำความรู้เหล่านี้ไปยกระดับทีมของคุณ?
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mb-10 max-w-lg mx-auto font-light leading-relaxed">
            ปรึกษาการจัดอบรม In-house Training และ Master Facilitation ที่ออกแบบเฉพาะสำหรับโจทย์ขององค์กรคุณ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider nav-font shadow-xl flex items-center justify-center gap-2"
            >
              ขอใบเสนอราคาหลักสูตร In-house <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider nav-font flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755]" /> ปรึกษาผ่าน LINE OA
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
