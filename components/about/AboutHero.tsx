import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants/brand';

const AboutHero: React.FC = () => {
  const stats = [
    { value: '2552', label: 'ปีก่อตั้ง' },
    { value: '18+', label: 'ปีประสบการณ์' },
    { value: '100+', label: 'องค์กรพันธมิตร' },
    { value: '10,000+', label: 'ผู้เรียนสำเร็จ' },
  ];

  return (
    <section className="bg-[#0f3460] pt-28 md:pt-44 pb-28 md:pb-44 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c5a059]/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Label badge */}
        <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-8 nav-font">
          The Visionary Leader
        </p>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[96px] font-black text-white nav-font leading-[0.9] tracking-tight mb-8">
          ผู้นำกระบวนการ
          <br />
          <span className="text-[#c5a059]">เปลี่ยนผ่าน</span>
        </h1>

        {/* Divider */}
        <div className="w-12 h-[2px] bg-[#c5a059] mx-auto mb-8" />

        {/* Subheadline */}
        <p className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          ไม่ใช่แค่การเรียนรู้
          <br />
          แต่คือการเปลี่ยนแปลงจากภายในสู่ผลลัพธ์จริงในองค์กร
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href={CONTACT_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c5a059] text-white px-10 py-4 font-black text-sm md:text-base uppercase tracking-widest nav-font hover:bg-[#d4b06a] transition-colors"
          >
            ขอคำปรึกษา
          </a>
          <Link
            to="/courses"
            className="border border-white/30 text-white px-10 py-4 font-bold text-sm md:text-base uppercase tracking-widest nav-font hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
          >
            ดูหลักสูตร
          </Link>
        </div>

        {/* Stats row */}
        <div className="border-t border-white/10 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-[#c5a059] nav-font mb-2">
                {s.value}
              </div>
              <div className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">
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
