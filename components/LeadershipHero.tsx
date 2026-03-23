import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Sparkles, CheckCircle2, MessageCircle, Award, Target, Zap } from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';

const LeadershipHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-[#0f3460] py-20 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
          alt="Leadership Workshop"
          className="w-full h-full object-cover scale-110 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f3460] via-[#0f3460]/90 to-[#0f3460]"></div>
        
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#c5a059]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
        
        {/* Animated Patterns */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Left */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col space-y-8 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 w-fit bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full shadow-2xl">
                <Sparkles className="w-5 h-5 text-[#c5a059] animate-pulse" />
                <span className="text-[#c5a059] font-black tracking-[0.3em] text-[10px] md:text-xs nav-font uppercase leading-none">
                  Premium Leadership Course
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] nav-font tracking-tight">
                  Designing <br />
                  <span className="font-gold text-5xl md:text-8xl">For Action</span>
                </h1>
                <h2 className="text-xl md:text-3xl font-black text-blue-100/90 nav-font uppercase tracking-wider mb-2">
                  Leadership Mastery DFA
                </h2>
              </div>

              {/* Thai Subtitle */}
              <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-light max-w-2xl border-l-4 border-[#c5a059] pl-6 py-2">
                <span className="text-white font-bold">ปลุกจิตวิญญาณความเป็นผู้นำ</span> ยกระดับการบริหารทีมผ่านกระบวนการ <span className="text-[#c5a059]">Transformative Learning</span> ที่เปลี่ยนแนวคิดสู่การลงมือทำจริง
              </p>

              {/* USP Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mb-8">
                {[
                  'ทักษะการ Facilitation ขั้นสูง',
                  'การออกแบบผลลัพธ์ในองค์กร',
                  'จิตวิทยาการเป็นผู้นำยุคใหม่',
                  'Activity-Based Certification'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-white/80 font-bold text-sm md:text-base nav-font">{item}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <a href={CONTACT_INFO.lineUrl} className="btn-premium bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl nav-font hover:scale-105 active:scale-95">
                  ร่วมหลักสูตรระดับ Exclusive
                  <Zap className="w-5 h-5" />
                </a>
                <Link to="/contact" className="btn-premium bg-white/5 backdrop-blur-xl text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 nav-font hover:bg-white/10 hover:border-white/40 active:scale-95 shadow-xl">
                  ขอเสนอโครงการ
                  <Award className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Graphical Element Right (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/20 to-transparent rounded-[4rem] blur-[80px] group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[4rem] shadow-3xl overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c5a059]/20 rounded-full blur-[60px]"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="w-20 h-20 bg-[#c5a059] rounded-3xl flex items-center justify-center text-white shadow-xl shadow-[#c5a059]/20">
                  <GraduationCap className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] nav-font">Next Intake</p>
                  <p className="text-2xl font-black text-white nav-font">Q2 / 2026</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[#c5a059] font-black text-xs mb-1 uppercase tracking-widest nav-font">Designed For</p>
                    <p className="text-white font-bold text-sm">Executives & Senior HR Leaders</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[#c5a059] font-black text-xs mb-1 uppercase tracking-widest nav-font">Location</p>
                    <p className="text-white font-bold text-sm">In-house / Exclusive Retreat</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-white/60">
                  <Target className="w-6 h-6" />
                  <span className="text-xs font-black uppercase tracking-widest nav-font">Transform Learning</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent"></div>
    </section>
  );
};

export default LeadershipHero;
