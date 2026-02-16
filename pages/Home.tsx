import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, GraduationCap, Award, Sparkles, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import { COURSES } from '../constants/courses';
import Logo from '../components/Logo';
import ClientsSection from '../components/ClientsSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="หน้าหลัก"
        description="CAP Vision Institute สถาบันฝึกอบรมระดับมืออาชีพ ผู้นำด้าน Transformative Learning นำโดย ครูเด่น (อนุสรณ์ หนองนา) และ Master Fa"
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-[#0f3460] pt-16 md:pt-0">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
            alt="Collaboration"
            className="w-full h-full object-cover scale-110 md:scale-100 transition-transform duration-[10s] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f3460] via-[#0f3460]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1),transparent_70%)]"></div>
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#c5a059]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-400/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 md:mb-10 animate-fade-in-down">
              <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-ping"></span>
              <span className="text-white/80 font-bold tracking-[0.2em] text-[10px] md:text-sm nav-font uppercase leading-none mt-0.5">
                CAP Vision Institute
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-white leading-[1.05] md:leading-[1] mb-8 md:mb-12 nav-font tracking-tight">
              Transform <span className="font-gold block md:inline">People</span><br className="hidden md:block" />
              <span className="md:ml-20">Transform <span className="font-gold">Organization</span></span>
            </h1>

            <p className="text-lg md:text-3xl text-blue-50 leading-relaxed mb-10 md:mb-16 font-light opacity-80 max-w-3xl">
              <span>“Transform People, Transform Organization.”</span> <br className="hidden md:block" />
              <span className="font-medium text-white/90">ปลดล็อคศักยภาพมนุษย์ด้วยกระบวนการเรียนรู้ระดับพรีเมี่ยม</span> <br />
              <span className="text-[#c5a059] font-bold">โดย ครูเด่น มาสเตอร์ฟา [Master Facilitator]</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
              <Link to="/courses" className="btn-premium bg-[#c5a059] text-white px-8 md:px-14 py-4 md:py-6 rounded-2xl font-black text-lg md:text-xl transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-gold-500/30 nav-font active:scale-95">
                เลือกหลักสูตรฝึกอบรม
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/contact" className="btn-premium bg-white/5 backdrop-blur-xl text-white border-2 border-white/20 px-8 md:px-14 py-4 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 nav-font active:scale-95">
                ขอใบเสนอราคา
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/40">
          <span className="text-[10px] items-center font-bold tracking-widest uppercase rotate-90 origin-left translate-x-3 mb-8">Scroll</span>
          <div className="w-0.5 h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#c5a059] font-black text-[10px] md:text-sm uppercase tracking-[0.4em] mb-4 block nav-font">Course Selection</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f3460] nav-font leading-tight">
                หลักสูตรที่ <span className="font-gold">ดีที่สุด</span> สำหรับคุณ
              </h2>
            </div>
            <Link to="/courses" className="group flex items-center gap-3 text-lg font-bold text-[#0f3460] hover:text-[#c5a059] transition-all nav-font">
              ดูหลักสูตรทั้งหมด <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card-premium group">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1552664730-d307ca884978' : item === 2 ? '1551434678-e076c223a692' : '1542744173-8e7e53415bb0'}?auto=format&fit=crop&q=80`}
                    alt="Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0f3460]/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase z-10">
                    Workshop
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-xl md:text-2xl font-black text-[#0f3460] mb-4 nav-font group-hover:text-[#c5a059] transition-colors leading-tight">
                    {item === 1 ? 'Dynamic Learning Design (DFA)' : item === 2 ? 'Leadership Transformation' : 'Facilitation Mastery'}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base mb-8 line-clamp-2 opacity-80 leading-relaxed font-medium">
                    ยกระดับทักษะการเรียนรู้และการบริหารคนด้วยเทคนิค Facilitation สมัยใหม่ที่มุ่งเน้นผลลัพธ์ที่ยั่งยืน
                  </p>
                  <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-auto">
                    <span className="text-[#0f3460] font-black nav-font">เปิดรับสมัคร</span>
                    <button className="flex items-center gap-2 text-[#c5a059] font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all nav-font">
                      ดูรายละเอียด <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 bg-[#0f3460] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {[
              { label: 'ผู้สำเร็จการอบรม', value: '10,000+', icon: <Users className="w-8 h-8 md:w-10 md:h-10" /> },
              { label: 'หลักสูตรที่เปิดสอน', value: '50+', icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" /> },
              { label: 'องค์กรพันธมิตร', value: '200+', icon: <Award className="w-8 h-8 md:w-10 md:h-10" /> },
              { label: 'ความพึงพอใจ', value: '99%', icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" /> }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className="text-[#c5a059] mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-6xl font-black text-white mb-2 md:mb-4 nav-font tracking-tight">{stat.value}</div>
                <div className="text-blue-200/60 font-black tracking-[0.2em] text-[10px] md:text-sm uppercase nav-font">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16 md:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-16 -left-16 w-64 md:w-80 h-64 md:h-80 bg-[#c5a059] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-pulse"></div>
              <div className="bg-white p-4 md:p-6 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative z-10">
                <img
                  src="/images/denmasterfa.jpg"
                  alt="ครูเด่น มาสเตอร์ฟา"
                  className="rounded-[2.5rem] md:rounded-[3rem] w-full max-w-lg mx-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#c5a059] text-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] z-20 shadow-2xl hidden md:block border-8 border-white">
                <p className="text-3xl md:text-5xl font-black mb-1 nav-font">18+</p>
                <p className="text-[8px] md:text-xs font-bold uppercase tracking-[0.3em] nav-font">Experience Years</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="inline-block text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-6 md:mb-8 nav-font">Master Facilitator</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f3460] mb-6 md:mb-10 nav-font leading-tight">{BRAND_INFO.director}</h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 md:mb-12 font-medium opacity-80">
                ผู้อำนวยการสถาบัน แคป วิชั่น อินสติทิวต์ ผู้เชี่ยวชาญด้านกระบวนการเรียนรู้เพื่อการเปลี่ยนแปลง (Transformative Learning)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
                {[
                  'Activity Based Learning',
                  'Transformative Facilitator',
                  'Leadership Development',
                  'Corporate Culture Coaching'
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6 text-[#c5a059]" />
                    <span className="font-bold text-[#0f3460] text-base md:text-lg nav-font">{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Link to="/speakers" className="bg-[#0f3460] text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-[#c5a059] transition-all nav-font shadow-xl text-center">
                  ทีมวิทยากรทั้งหมด
                </Link>
                <a href={CONTACT_INFO.lineUrl} className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-[#0f3460] px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold hover:border-[#c5a059] transition-all nav-font">
                  <MessageCircle className="w-6 h-6 text-[#c5a059]" /> {CONTACT_INFO.line}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsSection />

      {/* Final CTA */}
      <section className="py-24 md:py-40 bg-gradient-to-br from-[#0f3460] to-[#0a2545] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
          <Logo className="w-full h-full p-20" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-8xl font-black mb-8 md:mb-12 nav-font leading-tight tracking-tight uppercase">ยกระดับ<br />องค์กรของคุณ</h2>
          <p className="text-blue-100/70 text-lg md:text-3xl mb-12 md:mb-20 font-light max-w-2xl mx-auto">
            ปรึกษาเราเพื่อออกแบบโซลูชันการพัฒนาผู้นำที่ทันสมัยและวัดผลได้จริง
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10">
            <a href={CONTACT_INFO.lineUrl} className="btn-premium bg-[#c5a059] text-white px-10 md:px-20 py-5 md:py-8 rounded-[2rem] font-bold text-xl md:text-3xl hover:scale-105 transition-all shadow-2xl shadow-gold-500/40 nav-font">
              พูดคุยกับพวกเรา
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
