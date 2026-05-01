import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import ClientsSection from '../components/ClientsSection';
import PortfolioCard from '../components/PortfolioCard';
import { fetchPortfolios } from '../services/portfolio';
import type { Portfolio } from '../services/portfolio';

const CATEGORIES = ['ทั้งหมด', 'Leadership', 'Team', 'Communication', 'Mindset', 'Work Skills'];

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

  useEffect(() => {
    fetchPortfolios()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'ทั้งหมด'
    ? items
    : items.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 overflow-x-hidden">
      <SEO
        title="ผลงาน Case Studies — CAP Vision Institute"
        description="Case Study จากองค์กรชั้นนำที่ไว้วางใจ CAP Vision Institute ในการพัฒนาผู้นำ ทีม และองค์กร"
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="bg-[#0f3460] pt-16 md:pt-24 pb-28 md:pb-40 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059]/8 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.45em] mb-4 block nav-font">
            Success Stories
          </span>
          <h1 className="text-3xl md:text-6xl font-black mb-5 nav-font tracking-tight">
            Case Studies
          </h1>
          <p className="text-white/75 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            เบื้องหลังการเปลี่ยนแปลงขององค์กรชั้นนำ — ผ่านกระบวนการ Transformative Learning โดย CAP Vision Institute
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-20 relative z-20">

        {/* ── FILTER ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-8 flex flex-wrap gap-2 items-center justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeCategory === cat
                  ? 'bg-[#0f3460] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── GRID ─────────────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-[#c5a059] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium">
            ยังไม่มี Case Study ในหมวดนี้
          </div>
        ) : (
          <>
            <p className="text-xs font-bold text-gray-400 mb-5">
              {activeCategory === 'ทั้งหมด'
                ? `Case Studies ทั้งหมด ${filtered.length} รายการ`
                : `${activeCategory} · ${filtered.length} รายการ`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mb-16">
              {filtered.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {/* ── CLIENTS ──────────────────────────────────────── */}
        <div className="mb-20">
          <ClientsSection />
        </div>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#0f3460] to-[#1a4a8a] rounded-[2.5rem] py-16 px-8 md:px-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] mb-5 nav-font">
              ร่วมสร้างความสำเร็จ
            </p>
            <h2 className="text-2xl md:text-4xl font-black nav-font mb-3 leading-tight">
              ให้ CAP Vision เป็นส่วนหนึ่ง<br />ในการขับเคลื่อนองค์กรของคุณ
            </h2>
            <div className="w-12 h-1 bg-[#c5a059] rounded-full mx-auto my-5" />
            <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-8 font-medium leading-relaxed">
              ปรึกษาฟรีกับ Master Facilitator — วิเคราะห์ปัญหา ออกแบบแนวทาง ส่งใบเสนอราคาภายใน 24 ชั่วโมง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-[#c5a059] text-white px-10 py-4 rounded-2xl font-black text-base md:text-lg hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-2xl inline-flex items-center justify-center gap-2"
              >
                ขอใบเสนอราคาฟรี <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/courses"
                className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all nav-font inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-[#c5a059]" /> ดูหลักสูตรทั้งหมด
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
