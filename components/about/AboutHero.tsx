import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants/brand';
import { IconInstituteShield, IconGoldCrestStar } from '../icons/CapBrandIcons';

export const AboutHero: React.FC = () => {
  const stats = [
    { value: '2552', label: 'ปีก่อตั้ง' },
    { value: '18+', label: 'ปีประสบการณ์' },
    { value: '200+', label: 'องค์กรชั้นนำ' },
    { value: '10,000+', label: 'ผู้เรียนสำเร็จ' },
  ];

  return (
    <section className="bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 md:pt-40 pb-24 md:pb-36 relative overflow-hidden text-white">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F59E0B]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Label badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 nav-font backdrop-blur-md">
          <IconInstituteShield className="w-4 h-4 text-[#F59E0B]" />
          About CAP Vision Institute
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white nav-font leading-[1.05] tracking-tight mb-6">
          ผู้นำกระบวนการ
          <br />
          <span className="text-[#F59E0B]">Transform องค์กรแห่งอนาคต</span>
        </h1>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#2563EB] rounded-full mx-auto mb-8" />

        {/* Subheadline */}
        <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
          "Transform People → Transform Organization"
          <br />
          ไม่ใช่แค่การจัดฝึกอบรม แต่คือการขับเคลื่อนการเปลี่ยนแปลงพฤติกรรมจากภายในสู่ผลลัพธ์จริง
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/assessment"
            className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest nav-font shadow-xl transition-all inline-flex items-center gap-2"
          >
            <IconGoldCrestStar className="w-4 h-4" />
            ทำแบบประเมินองค์กรฟรี
          </Link>
          <Link
            to="/contact"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest nav-font transition-all"
          >
            ขอใบเสนอราคาหลักสูตร
          </Link>
        </div>

        {/* Stats row */}
        <div className="border-t border-white/10 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-[#F59E0B] nav-font mb-2">
                {s.value}
              </div>
              <div className="text-white/60 text-[11px] font-bold uppercase tracking-[0.25em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
