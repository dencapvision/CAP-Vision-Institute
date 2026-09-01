import React, { useEffect, useState } from 'react';

import { ArrowRight, Building2, BookOpen, Tag, MessageCircle, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { fetchPortfolioBySlug } from '../lib/services/portfolio';
import type { Portfolio } from '../lib/services/portfolio';
import PortfolioGallery from './PortfolioGallery';

import { IconGoldCrestStar } from './icons/CapBrandIcons';
import { CONTACT_INFO } from '../constants/brand';

const CATEGORY_COLORS: Record<string, string> = {
  Leadership: 'bg-blue-50 text-[#2563EB] border-blue-200',
  Team: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Communication: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Mindset: 'bg-amber-50 text-amber-800 border-amber-200',
  'Work Skills': 'bg-teal-50 text-teal-700 border-teal-200',
};

export const PortfolioDetail: React.FC<{ slug?: string }> = ({ slug: propSlug }) => {
  const slug = propSlug || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchPortfolioBySlug(slug).then((data) => {
      if (!data) setNotFound(true);
      else setPortfolio(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3">
        <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">กำลังโหลดรายละเอียด Case Study...</p>
      </div>
    );
  }

  if (notFound || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4 px-4">
        <p className="text-gray-500 text-lg font-bold">ไม่พบข้อมูล Case Study นี้</p>
        <a href="/portfolio" className="btn-premium bg-[#2563EB] text-white px-6 py-3 rounded-2xl text-xs font-bold">
          ดูผลงานทั้งหมด
        </a>
      </div>
    );
  }

  const categoryClass = CATEGORY_COLORS[portfolio.category] ?? 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden pb-20">
      

      {/* ── 1. HERO HEADER ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-24 md:pt-32 pb-28 md:pb-36 relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          {portfolio.cover_image && (
            <img
              src={portfolio.cover_image}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <a href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F59E0B] text-xs font-bold transition-colors mb-6 uppercase tracking-widest"
          >
            ← กลับหน้ารวม Case Studies
          </a>

          <div>
            <span className={`inline-block text-[11px] font-black px-3.5 py-1 rounded-full border mb-4 ${categoryClass}`}>
              {portfolio.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white nav-font leading-tight mb-6">
            {portfolio.title}
          </h1>

          <div className="flex flex-wrap gap-6 items-center text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <Building2 className="w-4 h-4 text-[#F59E0B]" />
              <span className="font-bold text-white">{portfolio.organization}</span>
            </div>
            {portfolio.course_name && (
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                <BookOpen className="w-4 h-4 text-[#60A5FA]" />
                <span className="font-medium text-gray-200">{portfolio.course_name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 md:-mt-16 relative z-20">

        {/* ── 2. KEY RESULT HIGHLIGHT CARD ─────────────────────────── */}
        {portfolio.result && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <IconGoldCrestStar className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-[11px] font-black text-amber-800 uppercase tracking-widest">
                  Key Transformation Impact
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F2557] nav-font leading-snug">
                {portfolio.result}
              </h2>
            </div>

            <a href="/assessment"
              className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-2xl font-bold text-xs whitespace-nowrap shadow-md flex items-center gap-2 flex-shrink-0"
            >
              ประเมินองค์กรของคุณ
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* ── 3. IMAGE GALLERY ─────────────────────────────────────── */}
        {portfolio.images && portfolio.images.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              Workshop Gallery
            </h2>
            <PortfolioGallery images={portfolio.images} />
          </section>
        )}

        {/* ── 4. DETAILED STORY ─────────────────────────────────────── */}
        {portfolio.description_full && (
          <section className="mb-14 bg-[#F8FAFC] rounded-3xl p-8 sm:p-12 border border-gray-200/80">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-4 nav-font">
              Case Study & Solution Architecture
            </span>
            <div className="space-y-4">
              {portfolio.description_full.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
                  {para}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. KEYWORDS ─────────────────────────────────────────── */}
        {portfolio.keywords?.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-[#2563EB]" />
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">Focus Areas</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {portfolio.keywords.map((kw) => (
                <span key={kw} className="text-xs font-bold text-gray-700 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-xs">
                  {kw}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── 6. RELATED COURSES ──────────────────────────────────── */}
        {portfolio.related_courses && portfolio.related_courses.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-black text-[#2563EB] uppercase tracking-widest mb-6">
              หลักสูตรและโซลูชันที่เกี่ยวข้อง
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {portfolio.related_courses.map((course) => (
                <a key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  {course.image && (
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-wider block mb-1">
                      {course.category}
                    </span>
                    <h3 className="text-sm font-black text-[#0F2557] mb-3 nav-font line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB]">
                      ดูรายละเอียด <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── 7. FINAL ACTION CTA ──────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider">
              <IconGoldCrestStar className="w-3.5 h-3.5" />
              Tailored In-house Transformation
            </div>

            <h2 className="text-2xl sm:text-4xl font-black nav-font mb-3 leading-tight text-white">
              ต้องการสร้างผลลัพธ์แบบนี้<br />ในองค์กรของคุณ?
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm mb-8 font-light leading-relaxed">
              ปรึกษาฟรีกับ Master Facilitator — เราช่วยวิเคราะห์ปัญหา ออกแบบ Workshop และจัดทำใบเสนอราคาภายใน 24 ชั่วโมง
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact"
                className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl inline-flex items-center justify-center gap-2"
              >
                ขอใบเสนอราคาหลักสูตร <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all nav-font inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#06C755]" /> ปรึกษาด่วนผ่าน LINE
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PortfolioDetail;
