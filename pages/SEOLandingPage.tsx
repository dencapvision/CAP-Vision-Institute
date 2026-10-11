import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, ChevronRight, MessageCircle, 
  PhoneCall, Star, Shield, Award, Users, Target, 
  HelpCircle, ChevronDown, Sparkles, Clock, MapPin,
  TrendingUp, Check, AlertTriangle, Layers, Flame,
  FileCheck, Compass, HeartHandshake, Zap, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { SEO_LANDING_PAGES_DATA, SEOLandingPageData } from '../constants/seoLandingPagesData';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import { IconGoldCrestStar, IconLeadership, IconTeamSynergy, IconGrowthCulture } from '../components/icons/CapBrandIcons';
import ClientsSection from '../components/ClientsSection';
import StatCounter from '../components/StatCounter';

interface SEOLandingPageProps {
  slugOverride?: string;
}

const SEOLandingPage: React.FC<SEOLandingPageProps> = ({ slugOverride }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const currentSlug = slugOverride || paramSlug || 'in-house-training';
  const pageData: SEOLandingPageData = SEO_LANDING_PAGES_DATA[currentSlug] || SEO_LANDING_PAGES_DATA['in-house-training'];

  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // All 8 landing pages for internal linking
  const allLandingPages = Object.values(SEO_LANDING_PAGES_DATA);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── 0. SEO & SCHEMA METADATA ────────────────────────────────────────── */}
      <SEO
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        keywords={pageData.keywords}
        type="EducationalOrganization"
        includeFAQ={true}
        articleFaq={pageData.faqs}
        breadcrumb={[
          { name: 'หน้าแรก', url: 'https://capvisionpartner.com' },
          { name: pageData.h1, url: `https://capvisionpartner.com${pageData.url}` }
        ]}
      />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[85svh] flex items-center overflow-hidden bg-[#111827] text-white pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Ambient Background & Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src={pageData.heroImage}
            alt={pageData.h1}
            className="w-full h-full object-cover opacity-20 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/95 to-[#0F2557]/90"></div>
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#F59E0B]/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Breadcrumb Bar */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">หน้าแรก</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[#F59E0B] font-semibold">{pageData.badge}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-8">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full mb-6">
                <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-full animate-pulse flex-shrink-0"></span>
                <span className="text-white font-bold tracking-wider text-xs uppercase nav-font">
                  {pageData.badge}
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.18] mb-6 nav-font tracking-tight text-white">
                {pageData.h1}
              </h1>

              {/* Sub-H1 */}
              <p className="text-lg sm:text-xl text-[#60A5FA] font-semibold leading-relaxed mb-4 max-w-3xl">
                {pageData.subH1}
              </p>

              {/* Tagline / Value Proposition */}
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-10 max-w-2xl">
                {pageData.valueProposition}
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/contact"
                  className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-base shadow-2xl flex items-center justify-center gap-3 active:scale-95 group transition-all"
                >
                  <IconGoldCrestStar className="w-5 h-5 text-[#F59E0B]" />
                  {pageData.primaryCta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium bg-[#06C755] hover:bg-[#05a346] text-white px-8 py-4 sm:py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  ปรึกษาทาง LINE (ตอบเร็ว)
                </a>
              </div>

              {/* Proof Numbers */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-xl">
                {[
                  { value: '18+', label: 'ปีประสบการณ์ (Years)' },
                  { value: '10,000+', label: 'ผู้เรียน (Learners)' },
                  { value: '200+', label: 'องค์กร (Organizations)' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] nav-font">
                      <StatCounter value={stat.value} />
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Format & Key Fact Card */}
            <div className="lg:col-span-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#2563EB] to-[#F59E0B] rounded-[2.5rem] blur-xl opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-[2rem] shadow-2xl">
                  
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/20 flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Signature Framework</div>
                      <div className="text-base font-black text-white">Transformative Learning</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 text-xs text-gray-200">
                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Clock className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">ระยะเวลาจัดอบรม</span>
                        {pageData.formatAndDuration.duration}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Users className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">ขนาดกลุ่มที่แนะนำ</span>
                        {pageData.formatAndDuration.groupSize}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      <MapPin className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">รูปแบบการจัด</span>
                        {pageData.formatAndDuration.mode}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-300 mb-3">
                      นำกระบวนการโดย <strong className="text-white">ครูเด่น มาสเตอร์ฟา</strong> และทีมวิทยากร CAP Vision
                    </p>
                    <Link
                      to="/assessment"
                      className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all"
                    >
                      ประเมินความต้องการองค์กรฟรี (Diagnostic)
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PAIN POINTS VS CAP VISION SOLUTIONS ───────────────────────────── */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#2563EB] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full inline-block mb-3">
              Why CAP Vision
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 nav-font mb-4">
              {pageData.painPointsTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {pageData.painPointsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
            
            {/* The Common Problems */}
            <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 nav-font">ปัญหาที่พบบ่อยในการอบรมแบบเดิม</h3>
                </div>

                <div className="space-y-4">
                  {pageData.painPoints.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-red-50/40 rounded-2xl border border-red-100/50">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                      <div>
                        <div className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</div>
                        <div className="text-xs text-gray-600 leading-relaxed">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The CAP Vision Solutions */}
            <div className="bg-[#111827] text-white p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-lg font-black text-white nav-font">แนวทางแก้ปัญหาของ CAP Vision Institute</h3>
                </div>

                <div className="space-y-4">
                  {pageData.solutions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10">
                      <Check className="w-4 h-4 text-[#10B981] mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                        <div className="text-xs text-gray-300 leading-relaxed">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                <span className="text-xs text-gray-300 font-medium">ออกแบบเฉพาะตามโจทย์องค์กรคุณ</span>
                <Link to="/contact" className="text-xs text-[#F59E0B] font-bold flex items-center gap-1 hover:underline">
                  ปรึกษาทีมออกแบบ <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 3. INTERACTIVE MODULES / CURRICULUM ARCHITECTURE ────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#F59E0B] uppercase bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full inline-block mb-3">
              Curriculum Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 nav-font mb-4">
              {pageData.modulesTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {pageData.modulesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Module Navigation */}
            <div className="lg:col-span-5 space-y-3">
              {pageData.modules.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                    activeModuleIndex === idx
                      ? 'bg-[#0F2557] text-white border-[#2563EB] shadow-xl scale-[1.02]'
                      : 'bg-gray-50 text-gray-800 border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 ${
                    activeModuleIndex === idx ? 'bg-[#2563EB] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base nav-font leading-snug">{mod.title}</h4>
                    <p className={`text-xs mt-1 line-clamp-1 ${activeModuleIndex === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                      {mod.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Active Module Detail Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModuleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-black text-[#2563EB] uppercase tracking-wider block">
                        MODULE 0{activeModuleIndex + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 nav-font mt-1">
                        {pageData.modules[activeModuleIndex]?.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {pageData.modules[activeModuleIndex]?.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                    {pageData.modules[activeModuleIndex]?.description}
                  </p>

                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4">
                    จุดเน้นและการฝึกปฏิบัติในโมดูลนี้ (Key Highlights):
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {pageData.modules[activeModuleIndex]?.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-blue-50/50 rounded-xl border border-blue-100/60">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-gray-800 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-500">
                      * สามารถปรับเพิ่ม-ลดหัวข้อให้ตรงกับความต้องการขององค์กร
                    </div>
                    <Link
                      to="/contact"
                      className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-md whitespace-nowrap"
                    >
                      ขอรับโครงสร้างหลักสูตรฉบับเต็ม
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. BUSINESS OUTCOMES (ผลลัพธ์ที่องค์กรจะได้รับ) ───────────────────── */}
      <section className="py-20 bg-[#111827] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#F59E0B] uppercase bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block mb-3">
              Measurable ROI & Impact
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white nav-font mb-4">
              ผลลัพธ์เชิงพฤติกรรมและธุรกิจที่องค์กรจะได้รับ
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              เรามุ่งเน้นการสร้างผลกระทบที่แท้จริง ไม่ใช่แค่การจบหลักสูตร แต่คือการเติบโตของคนและองค์กรอย่างยั่งยืน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.businessOutcomes.map((outcome, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-[#F59E0B]/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <IconGoldCrestStar className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h3 className="text-base font-bold text-white nav-font mb-2">
                  {outcome.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {outcome.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. TARGET AUDIENCE & ELIGIBILITY ─────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 p-8 sm:p-12 rounded-3xl border border-blue-100/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs font-black text-[#2563EB] uppercase tracking-wider block mb-2">
                  Who Should Attend
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 nav-font mb-4">
                  หลักสูตรนี้เหมาะสำหรับใคร?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  เนื้อหาและกิจกรรมถูกออกแบบให้ยืดหยุ่น สามารถปรับระดับความลึกและการปฏิบัติการให้ตรงกับกลุ่มผู้เรียนเป้าหมาย
                </p>
                <Link
                  to="/contact"
                  className="btn-premium bg-[#111827] hover:bg-[#1E293B] text-white text-xs font-bold px-6 py-3.5 rounded-xl inline-flex items-center gap-2"
                >
                  สอบถามความเหมาะสมของกลุ่มผู้เรียน
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pageData.targetAudience.map((audience, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">
                      {audience}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TRUST & CLIENT LOGOS ─────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="text-xs font-black tracking-widest text-gray-400 uppercase">
            Trusted by Leading Organizations Across Thailand
          </span>
        </div>
        <ClientsSection />
      </section>

      {/* ── 7. FAQ ACCORDION (AEO & Search Engines) ──────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-xs font-black tracking-widest text-[#2563EB] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full inline-block mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 nav-font mb-2">
              คำถามที่พบบ่อย (FAQs)
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              ข้อสงสัยและคำถามสำคัญเกี่ยวกับการจัดอบรมและการบริการ
            </p>
          </div>

          <div className="space-y-4">
            {pageData.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-[#2563EB] transition-colors"
                  >
                    <span className="text-sm sm:text-base nav-font">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2563EB]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 8. INTERNAL LINK GRAPH (EXPLORE OTHER 7 SOLUTIONS) ──────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-black tracking-widest text-[#F59E0B] uppercase">
                Explore Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 nav-font mt-1">
                โซลูชันและหลักสูตรอื่นของ CAP Vision Institute
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 mt-4 md:mt-0"
            >
              ดูหลักสูตรทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allLandingPages
              .filter((p) => p.slug !== currentSlug)
              .slice(0, 4)
              .map((landing) => (
                <Link
                  key={landing.slug}
                  to={landing.url}
                  className="bg-gray-50 hover:bg-blue-50/50 border border-gray-200/80 hover:border-blue-300 p-6 rounded-2xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider bg-blue-100/60 px-2 py-0.5 rounded-full inline-block mb-3">
                      {landing.intent}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 nav-font group-hover:text-[#2563EB] transition-colors mb-2">
                      {landing.h1}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {landing.tagline}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-[#2563EB] flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                    ดูรายละเอียด <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
          </div>

        </div>
      </section>

      {/* ── 9. FINAL HIGH-CONVERTING CTA BANNER ──────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#0F2557] via-[#111827] to-[#0F2557] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-6 border border-white/15">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs font-bold uppercase tracking-wider">พร้อมออกแบบประสบการณ์การเรียนรู้เฉพาะองค์กรคุณ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black nav-font leading-tight mb-6">
            เริ่มต้นเปลี่ยนวิธีคิด สร้างทีม และยกระดับองค์กรของคุณวันนี้
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            ปรึกษาโจทย์เบื้องต้นกับ ครูเด่น มาสเตอร์ฟา และทีมงานผู้เชี่ยวชาญ เพื่อออกแบบหลักสูตรที่ตอบโจทย์เฉพาะองค์กรของคุณอย่างแท้จริง
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-premium w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-black px-8 py-4 sm:py-5 rounded-2xl text-base flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95"
            >
              <PhoneCall className="w-5 h-5" />
              ติดต่อขอใบเสนอราคา & ออกแบบหลักสูตร
            </Link>

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="btn-premium w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 sm:py-5 rounded-2xl text-base flex items-center justify-center gap-2 transition-all"
            >
              โทรสายด่วน {CONTACT_INFO.phone}
            </a>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            ตอบกลับและส่งมอบข้อเสนอการออกแบบหลักสูตร (Training Proposal) ภายใน 24 ชั่วโมง
          </div>
        </div>
      </section>

    </div>
  );
};

export default SEOLandingPage;
