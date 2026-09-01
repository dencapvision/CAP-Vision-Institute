import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles, Building2, Search, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import ClientsSection from '../components/ClientsSection';
import PortfolioCard from '../components/PortfolioCard';
import { fetchPortfolios } from '../services/portfolio';
import type { Portfolio } from '../services/portfolio';
import { IconGoldCrestStar, IconInstituteShield } from '../components/icons/CapBrandIcons';
import { CONTACT_INFO } from '../constants/brand';

const CATEGORIES = ['ทั้งหมด', 'Leadership', 'Team', 'Communication', 'Mindset', 'Work Skills'];

export const PortfolioPage: React.FC = () => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPortfolios()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((p) => {
    const matchesCategory = activeCategory === 'ทั้งหมด' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description_short && p.description_short.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden">
      <SEO
        title="ผลงาน & Case Studies องค์กรชั้นนำ | CAP Vision Institute"
        description="เจาะลึก Case Studies และผลลัพธ์จริงจากองค์กรชั้นนำกว่า 200+ แห่งที่ไว้วางใจ CAP Vision Institute ในการขับเคลื่อน Leadership Transformation, Team Synergy และ Organization Culture"
      />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-36 text-white text-center relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 nav-font backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            Enterprise Transformation Stories
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 nav-font tracking-tight leading-tight">
            <span className="text-white">เบื้องหลังความสำเร็จ</span><br />
            <span className="text-[#F59E0B]">ขององค์กรชั้นนำ</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8">
            ถอดบทเรียนและผลลัพธ์จริงจากการจัด In-house Training และ OD Consulting ด้วย 6D CPS Model และ CAP Framework
          </p>

          {/* Key Metric Highlights */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 pt-4 text-gray-300 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
              <span>200+ องค์กรชั้นนำ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              <span>18+ ปี ประสบการณ์นำกระบวนการ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>98% ความพึงพอใจและผลลัพธ์</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">

        {/* ── 2. FILTER & SEARCH BAR ────────────────────────────────────── */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อองค์กร หรือหัวข้อ..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-[#F8FAFC] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* ── 3. CASE STUDIES GRID ──────────────────────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">กำลังโหลด Case Studies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-xs">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-700 mb-1">ไม่พบ Case Study ที่ตรงกับเงื่อนไข</h3>
            <p className="text-xs text-gray-400">ลองเปลี่ยนหมวดหมู่หรือคำค้นหาใหม่ครับ</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-bold text-gray-500">
                {activeCategory === 'ทั้งหมด'
                  ? `แสดง Case Studies ทั้งหมด ${filtered.length} รายการ`
                  : `หมวดหมู่ ${activeCategory} (${filtered.length} รายการ)`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {filtered.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {/* ── 4. TRUSTED CLIENTS SHOWCASE ──────────────────────────────── */}
        <div className="mb-20">
          <ClientsSection />
        </div>

        {/* ── 5. STRATEGIC CTA BANNER ───────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider">
              <IconGoldCrestStar className="w-3.5 h-3.5" />
              Custom In-house Training Solutions
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black nav-font mb-4 leading-tight text-white">
              พร้อมสร้าง Success Story บทใหม่<br />ให้กับองค์กรของคุณแล้วหรือยัง?
            </h2>

            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              ปรึกษาฟรีกับ Master Facilitator — เราช่วยวิเคราะห์ TNA ออกแบบ Framework การเรียนรู้ และจัดทำใบเสนอราคาภายใน 24 ชั่วโมง
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/assessment"
                className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 inline-flex items-center justify-center gap-3 transition-all"
              >
                <IconGoldCrestStar className="w-5 h-5 text-[#111827]" />
                ทำแบบประเมินองค์กรฟรี
              </Link>

              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all nav-font inline-flex items-center justify-center gap-3"
              >
                ขอใบเสนอราคาหลักสูตร
                <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
              </Link>
            </div>

            <p className="text-gray-400 text-xs mt-6 font-light">
              ไม่มีข้อผูกมัด · ตอบกลับภายใน 24 ชั่วโมง · ปรึกษาฟรี
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PortfolioPage;
