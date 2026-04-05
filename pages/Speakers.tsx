import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, MessageCircle, Users, Award, Zap, Clock, Loader2 } from 'lucide-react';
import { fetchInstructors } from '../services/instructors';
import type { Instructor } from '../types';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';

const Speakers: React.FC = () => {
  const [speakers, setSpeakers] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-white">
      <SEO
        title="วิทยากรอบรมองค์กร และ Master Facilitator | CAP Vision Institute"
        description="ทีมวิทยากรอบรมองค์กรและ Master Facilitator ผู้เชี่ยวชาญด้าน Transformative Learning ประสบการณ์ 18+ ปี 1,000+ เวที เปลี่ยนพฤติกรรมคนได้จริง จาก CAP Vision Institute"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-[#0a1628] overflow-hidden pt-28 pb-24">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #c5a059 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c5a059 0px, #c5a059 1px, transparent 1px, transparent 60px)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full px-5 py-2 mb-8">
            <Star className="w-4 h-4 text-[#c5a059]" fill="currentColor" />
            <span className="text-[#c5a059] font-bold text-sm tracking-wider">Expert Facilitators & Trainers</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            วิทยากรอบรมองค์กร
            <span className="block mt-2" style={{
              background: 'linear-gradient(135deg, #c5a059 0%, #e0c58e 50%, #c5a059 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              ที่เปลี่ยนพฤติกรรมคนได้จริง
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            พบกับทีม Master Facilitator และผู้เชี่ยวชาญด้าน Transformative Learning จาก {BRAND_INFO.thaiName}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { icon: Clock, value: '18+', label: 'ปีประสบการณ์' },
              { icon: Award, value: '1,000+', label: 'เวทีทั่วประเทศ' },
              { icon: Users, value: '100+', label: 'องค์กรชั้นนำ' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-3 text-white">
                  <Icon className="w-5 h-5 text-[#c5a059]" />
                  <div className="text-left">
                    <span className="font-black text-lg">{stat.value}</span>
                    <span className="text-white/50 text-sm ml-2">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPEAKERS GRID ─────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-12 h-12 text-[#c5a059] animate-spin" />
            </div>
          ) : (
            <>
              {/* Featured speaker — Den Master Fa — large card */}
              {speakers.filter(s => s.slug === 'den-master-fa').map(speaker => (
            <div key={speaker.id} className="mb-12">
              <div className="bg-[#0a1628] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-[400px] lg:h-auto overflow-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1628]/80 lg:block hidden" />
                    <div className="absolute top-6 left-6 bg-[#c5a059] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">
                      🌟 Featured Speaker
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    {/* Badge */}
                    <p className="text-[#c5a059] font-bold uppercase tracking-[0.25em] text-xs mb-4">
                      Master Facilitator & Director
                    </p>

                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                      {speaker.name}
                    </h2>
                    <p className="text-white/60 mb-6 leading-relaxed">{speaker.bio}</p>

                    {/* Mini stats */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {[
                        { v: '18+', l: 'ปี' },
                        { v: '1,000+', l: 'เวที' },
                        { v: '100+', l: 'องค์กร' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-center">
                          <p className="text-[#c5a059] font-black text-lg">{s.v}</p>
                          <p className="text-white/50 text-xs">{s.l}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={`/speakers/${speaker.slug}`}
                        className="group btn-premium inline-flex items-center gap-2 bg-[#c5a059] text-white px-7 py-4 rounded-2xl font-black hover:bg-white hover:text-[#0f3460] transition-all"
                      >
                        ดูโปรไฟล์เต็ม
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href={CONTACT_INFO.lineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-7 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" /> จองคิว
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

              {/* Other speakers grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {speakers.filter(s => s.slug !== 'den-master-fa').map(speaker => (
              <div
                key={speaker.id}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                      Expert Facilitator
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-[#c5a059] text-xs font-black uppercase tracking-[0.25em] mb-2">{speaker.title}</p>
                  <h3 className="text-xl font-black text-[#0f3460] mb-3 group-hover:text-[#c5a059] transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{speaker.bio}</p>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/speakers/${speaker.slug}`}
                      className="text-[#0f3460] font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-[#c5a059]"
                    >
                      ดูประวัติและผลงาน <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
                  ))}
                </div>
              </>
            )}
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative bg-[#0a1628] rounded-[3rem] overflow-hidden p-12 md:p-16 text-center shadow-2xl">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, #c5a059 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059]/30 flex items-center justify-center mx-auto mb-8">
                <Zap className="w-7 h-7 text-[#c5a059]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                ต้องการนัดปรึกษาหลักสูตร In-house?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                เราพร้อมออกแบบและส่งทีมวิทยากรไปช่วย Transform องค์กรของคุณถึงที่
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-4">
                <Link
                  to="/contact"
                  className="group btn-premium inline-flex items-center gap-3 bg-[#c5a059] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[0_8px_32px_rgba(197,160,89,0.35)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  คุยกับเราตอนนี้
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
                >
                  Line: {CONTACT_INFO.line}
                </a>
              </div>
              <p className="text-white/30 text-sm">
                ปรึกษาเบื้องต้นฟรี · ตารางคิวมีจำกัด แนะนำจองล่วงหน้า 1-2 เดือน
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Speakers;
