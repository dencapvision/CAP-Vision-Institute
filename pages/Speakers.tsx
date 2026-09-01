import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Users, Award, Clock, Loader2, Sparkles, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';
import { fetchInstructors } from '../services/instructors';
import type { Instructor } from '../types';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';
import { IconFacilitatorMastery, IconGoldCrestStar, IconInstituteShield, IconLeadership, IconTeamSynergy } from '../components/icons/CapBrandIcons';

export const Speakers: React.FC = () => {
  const [speakers, setSpeakers] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback data for Den Master Fa in case Database is empty or failing
  const DEN_FALLBACK: Instructor = {
    id: 'den-masterfa-fallback',
    slug: 'den-masterfa',
    name: 'ครูเด่น มาสเตอร์ฟา (อนุสรณ์ หนองนา)',
    title: 'Master Facilitator & Director of CAP Vision Institute',
    bio: 'ผู้อำนวยการสถาบันผู้เชี่ยวชาญด้าน Transformative Learning และกระบวนการคิดสร้างสรรค์ (6D CPS) ประสบการณ์กว่า 18+ ปี 1,000+ เวทีทั่วประเทศ',
    image: '/images/denmasterfa.jpg',
    socials: { line: CONTACT_INFO.line }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInstructors();
        setSpeakers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] overflow-x-hidden">
      <SEO
        title="ทีมวิทยากรและ Master Facilitators | CAP Vision Institute"
        description="ทีมวิทยากรและ Master Facilitators ผู้เชี่ยวชาญด้าน Transformative Learning ประสบการณ์ 18+ ปี กับ 200+ องค์กรชั้นนำทั่วประเทศ"
      />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-36 text-white text-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 nav-font backdrop-blur-md">
            <IconFacilitatorMastery className="w-4 h-4 text-[#F59E0B]" />
            Certified Master Facilitators & Speakers
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 nav-font tracking-tight leading-tight">
            <span className="text-white">วิทยากรและกระบวนกร</span><br />
            <span className="text-[#F59E0B]">ที่เปลี่ยนพฤติกรรมคนได้จริง</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            ไม่ใช่แค่การบรรยายทางเดียว แต่เป็นการนำกระบวนการเรียนรู้แบบ Transformative Learning เพื่อสร้าง Aha! Moment และปลดล็อกศักยภาพทีมงานจากภายใน
          </p>

          {/* Stat Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-gray-300 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              <span className="font-bold text-white">18+ ปี</span>
              <span className="text-gray-400">ประสบการณ์นำกระบวนการ</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              <span className="font-bold text-white">1,000+</span>
              <span className="text-gray-400">เวทีทั่วประเทศ</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Users className="w-4 h-4 text-[#10B981]" />
              <span className="font-bold text-white">200+</span>
              <span className="text-gray-400">องค์กรชั้นนำ</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SPEAKERS SHOWCASE ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 gap-3 bg-white rounded-3xl shadow-xl p-8">
            <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">กำลังโหลดข้อมูลวิทยากร...</p>
          </div>
        ) : (
          <>
            {/* 🌟 FEATURED MASTER FACILITATOR: ครูเด่น มาสเตอร์ฟา */}
            {(() => {
              const den = speakers.find(s => s.slug === 'den-masterfa') || DEN_FALLBACK;
              return (
                <div key={den.id} className="mb-14">
                  <div className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Speaker Image */}
                      <div className="lg:col-span-5 relative h-[380px] sm:h-[460px] lg:h-auto overflow-hidden bg-gray-900">
                        <img
                          src={den.image || '/images/denmasterfa.jpg'}
                          alt={den.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/denmasterfa.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent lg:hidden" />
                        <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-[#F59E0B] text-[#111827] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                          <IconGoldCrestStar className="w-3.5 h-3.5" />
                          Founder & Master Facilitator
                        </div>
                      </div>

                      {/* Speaker Content */}
                      <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center text-white">
                        <div className="inline-flex items-center gap-2 text-[#60A5FA] text-xs font-bold uppercase tracking-widest mb-3">
                          <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                          Executive Leadership & OD Consultant
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 nav-font leading-tight">
                          {den.name}
                        </h2>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                          {den.bio}
                        </p>

                        {/* Signature Competencies */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          <div className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                            <span>Transformative Facilitation</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                            <span>6D CPS Creative Thinking</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                            <span>Executive Speaking & Influence</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                            <span>Team Synergy & Silo Breaker</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-2">
                          <Link
                            to={`/speakers/${den.slug}`}
                            className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition-all"
                          >
                            ดูโปรไฟล์และผลงานฉบับเต็ม
                            <ArrowRight className="w-4 h-4" />
                          </Link>

                          <Link
                            to="/contact"
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-2xl font-bold text-sm transition-all nav-font inline-flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4 text-[#60A5FA]" />
                            นัดปรึกษา / ขอใบเสนอราคา
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── 3. OTHER FACILITATORS & KEYNOTE SPEAKERS ──────────────── */}
            <div className="mb-10">
              <div className="text-center mb-10">
                <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
                  Expert Network
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font">
                  ทีมวิทยากรและผู้เชี่ยวชาญเฉพาะด้าน
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {speakers.filter(s => s.slug !== 'den-masterfa').map(speaker => (
                  <div
                    key={speaker.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col hover:-translate-y-1.5"
                  >
                    {/* Speaker Image */}
                    <div className="relative h-72 overflow-hidden bg-gray-100">
                      <img
                        src={
                          speaker.slug === 'kraiput-intarayotha'
                            ? 'https://res.cloudinary.com/dmo4kq7ej/image/upload/v1786514509/NewProfile_Kraiput_bgvjeo.jpg'
                            : speaker.image
                        }
                        alt={speaker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-50/90 backdrop-blur-md text-[#2563EB] border border-blue-200 text-[11px] font-black px-3 py-1 rounded-full shadow-xs">
                          Certified Facilitator
                        </span>
                      </div>
                    </div>

                    {/* Speaker Details */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {speaker.title}
                      </p>

                      <h4 className="text-xl font-black text-[#0F2557] mb-2.5 nav-font group-hover:text-[#2563EB] transition-colors">
                        {speaker.name}
                      </h4>

                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1 font-light line-clamp-3">
                        {speaker.bio}
                      </p>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <Link
                          to={`/speakers/${speaker.slug}`}
                          className="text-xs font-black text-[#2563EB] group-hover:text-[#1D4ED8] flex items-center gap-1.5 nav-font transition-colors"
                        >
                          ดูประวัติและหลักสูตร <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 4. STRATEGIC BOTTOM CTA ───────────────────────────────── */}
            <section className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl mt-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider">
                  <IconGoldCrestStar className="w-3.5 h-3.5" />
                  In-house Facilitation & Speaker Booking
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black nav-font mb-4 leading-tight text-white">
                  ต้องการนัดวิเคราะห์โจทย์และเชิญวิทยากร<br />สำหรับงานอบรมองค์กรของคุณ?
                </h2>

                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                  เราพร้อมช่วยวิเคราะห์ TNA ออกแบบกระบวนการเรียนรู้เฉพาะองค์กร และจัดส่งทีมวิทยากร Master Facilitators ไปสร้างการเปลี่ยนแปลงถึงที่
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
                    ขอใบเสนอราคา / คิววิทยากร
                    <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
                  </Link>
                </div>

                <p className="text-gray-400 text-xs mt-6 font-light">
                  ปรึกษาฟรีไม่มีค่าใช้จ่าย · แนะนำจองคิวล่วงหน้า 1-2 เดือน
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Speakers;
