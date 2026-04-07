import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Building2, BookOpen, Tag, MessageCircle, Loader2 } from 'lucide-react';
import { fetchPortfolioBySlug } from '../services/portfolio';
import type { Portfolio } from '../services/portfolio';
import PortfolioGallery from '../components/PortfolioGallery';
import SEO from '../components/SEO';

const CATEGORY_COLORS: Record<string, string> = {
  Leadership: 'bg-blue-50 text-blue-700 border-blue-200',
  Team: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Communication: 'bg-purple-50 text-purple-700 border-purple-200',
  Mindset: 'bg-orange-50 text-orange-700 border-orange-200',
  'Work Skills': 'bg-teal-50 text-teal-700 border-teal-200',
};

const PortfolioDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#c5a059] animate-spin" />
      </div>
    );
  }

  if (notFound || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4 px-4">
        <p className="text-gray-400 text-lg font-medium">ไม่พบ Case Study นี้</p>
        <Link to="/portfolio" className="text-[#c5a059] font-bold hover:underline">
          ดูผลงานทั้งหมด
        </Link>
      </div>
    );
  }

  const categoryClass = CATEGORY_COLORS[portfolio.category] ?? 'bg-gray-100 text-gray-600 border-gray-200';

  return (
    <div className="bg-white min-h-screen overflow-x-hidden pb-20">
      <SEO
        title={`${portfolio.title} — ${portfolio.organization} | CAP Vision`}
        description={portfolio.description_short ?? ''}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="bg-[#0f3460] pt-20 md:pt-32 pb-24 md:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {portfolio.cover_image && (
            <img
              src={portfolio.cover_image}
              alt=""
              className="w-full h-full object-cover opacity-15"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f3460] via-[#0f3460]/90 to-[#0f3460]/70" />
          <div className="absolute -top-1/4 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-white/60 text-xs font-bold hover:text-[#c5a059] transition-colors mb-8 uppercase tracking-widest"
          >
            ← ผลงานทั้งหมด
          </Link>

          <span className={`inline-block text-xs font-black px-3 py-1.5 rounded-xl border mb-5 ${categoryClass}`}>
            {portfolio.category}
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white nav-font leading-tight mb-5">
            {portfolio.title}
          </h1>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-white/80">
              <Building2 className="w-4 h-4 text-[#c5a059]" />
              <span className="text-sm font-bold">{portfolio.organization}</span>
            </div>
            {portfolio.course_name && (
              <div className="flex items-center gap-2 text-white/80">
                <BookOpen className="w-4 h-4 text-[#c5a059]" />
                <span className="text-sm font-bold">{portfolio.course_name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-12 md:-mt-16 relative z-20">

        {/* ── RESULT HIGHLIGHT ─────────────────────────────── */}
        {portfolio.result && (
          <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 md:p-10 mb-10">
            <p className="text-[10px] md:text-xs font-black text-[#c5a059] uppercase tracking-[0.4em] mb-3 nav-font">
              ผลลัพธ์ที่ได้
            </p>
            <p className="text-xl md:text-3xl font-black text-[#0f3460] nav-font leading-tight">
              {portfolio.result}
            </p>
          </div>
        )}

        {/* ── GALLERY ──────────────────────────────────────── */}
        {portfolio.images && portfolio.images.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] mb-5">Gallery</h2>
            <PortfolioGallery images={portfolio.images} />
          </section>
        )}

        {/* ── STORY ────────────────────────────────────────── */}
        {portfolio.description_full && (
          <section className="mb-14 bg-[#f8fafc] rounded-[2rem] p-8 md:p-12">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] mb-6">Case Study</h2>
            <div className="space-y-5">
              {portfolio.description_full.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                  {para}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ── KEYWORDS ─────────────────────────────────────── */}
        {portfolio.keywords?.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[#c5a059]" />
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em]">Keywords</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {portfolio.keywords.map((kw) => (
                <span key={kw} className="text-xs font-bold text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl">
                  {kw}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── RELATED COURSES ──────────────────────────────── */}
        {portfolio.related_courses && portfolio.related_courses.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] mb-6">หลักสูตรที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {portfolio.related_courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  {course.image && (
                    <div className="h-36 overflow-hidden bg-gray-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-[10px] font-black text-[#c5a059] uppercase tracking-wider">
                      {course.category}
                    </span>
                    <h3 className="text-sm font-black text-[#0f3460] mt-1 mb-2 nav-font line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#0f3460] group-hover:text-[#c5a059] transition-colors">
                      ดูหลักสูตร <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#0f3460] to-[#1a4a8a] rounded-[2rem] p-10 md:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#c5a059]/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] mb-4 nav-font">
              ต้องการผลลัพธ์แบบนี้
            </p>
            <h2 className="text-2xl md:text-4xl font-black nav-font mb-3 leading-tight">
              ให้เราออกแบบหลักสูตร<br />สำหรับองค์กรของคุณ
            </h2>
            <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto mb-8 font-medium">
              ปรึกษาฟรี — วิเคราะห์ปัญหา ออกแบบแนวทาง ส่งใบเสนอราคาภายใน 24 ชั่วโมง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-[#c5a059] text-white px-10 py-4 rounded-2xl font-black text-base hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-xl inline-flex items-center justify-center gap-2"
              >
                ขอใบเสนอราคา <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/courses"
                className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all nav-font inline-flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#c5a059]" /> ดูหลักสูตรทั้งหมด
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioDetail;
