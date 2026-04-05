
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Sparkles, CheckCircle2, MessageCircle, Target, Users, Layers, Zap } from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';

const CATEGORY_STATS = [
  { icon: Target,  label: 'Leader Skills',        count: '12+', color: 'bg-indigo-500' },
  { icon: Users,   label: 'People Skills',         count: '10+', color: 'bg-emerald-500' },
  { icon: Layers,  label: 'Work Skills',           count: '15+', color: 'bg-orange-500' },
  { icon: MessageCircle, label: 'Communication',   count: '8+',  color: 'bg-sky-500' },
];

const LeadershipHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-[#0f3460] py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
          alt="Leadership Workshop"
          className="w-full h-full object-cover scale-110 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f3460] via-[#0f3460]/90 to-[#0f3460]"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#c5a059]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Content Left */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col space-y-8">

              {/* Badge */}
              <div className="inline-flex items-center gap-3 w-fit bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full shadow-2xl">
                <Sparkles className="w-5 h-5 text-[#c5a059] animate-pulse" />
                <span className="text-[#c5a059] font-black tracking-[0.3em] text-[10px] md:text-xs nav-font uppercase leading-none">
                  50+ หลักสูตร · 4 หมวดทักษะ
                </span>
              </div>

              {/* H1 */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] nav-font tracking-tight">
                  <span className="text-[#c5a059]">พัฒนาคน สร้างทีม</span><br />
                  <span className="text-white">ยกระดับองค์กร</span>
                </h1>
                <h2 className="text-lg md:text-2xl font-black text-blue-100/70 nav-font uppercase tracking-wider">
                  Transformative Learning Programs
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-base md:text-xl text-white/70 leading-relaxed font-light max-w-2xl border-l-4 border-[#c5a059] pl-6 py-2">
                <span className="text-white font-bold">ไม่ใช่แค่ความรู้ แต่คือการเปลี่ยนพฤติกรรม</span> — ทุกหลักสูตรออกแบบด้วย{' '}
                <span className="text-[#c5a059]">Facilitation & Active Learning</span>{' '}
                ที่เห็นผลในองค์กรจริง
              </p>

              {/* USP Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'หลักสูตรพร้อมใช้ 50+ รายการ',
                  'ปรับเป็น In-house Training ได้',
                  'Facilitator ประสบการณ์ 18+ ปี',
                  'วัดผลก่อน-หลังอบรมทุกโปรแกรม',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-all flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-white/80 font-bold text-sm md:text-base nav-font">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#courses-grid"
                  className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl nav-font hover:bg-[#e0c58e] hover:text-[#0f3460] active:scale-95"
                >
                  เลือกหลักสูตรที่ใช่
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  to="/contact"
                  className="bg-white/5 backdrop-blur-xl text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 nav-font hover:bg-white/10 active:scale-95 shadow-xl"
                >
                  ขอ In-house Training
                  <GraduationCap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Panel — Category Overview */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c5a059]/20 rounded-full blur-[60px]"></div>
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] nav-font mb-1">Course Categories</p>
                  <p className="text-2xl font-black text-white nav-font">4 หมวดทักษะหลัก</p>
                </div>
                <div className="space-y-3">
                  {CATEGORY_STATS.map(({ icon: Icon, label, count, color }, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm nav-font">{label}</p>
                      </div>
                      <span className="text-[#c5a059] font-black text-sm nav-font">{count}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <Zap className="w-5 h-5 text-[#c5a059]" />
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest nav-font">ทุกหลักสูตรปรับ In-house ได้</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent"></div>
    </section>
  );
};

export default LeadershipHero;
