import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Target, Zap, Award, CheckCircle2, BarChart3, Users, ShieldCheck } from 'lucide-react';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import { COURSES } from '../constants/courses';
import Logo from '../components/Logo';
import ClientsSection from '../components/ClientsSection';
import SEO from '../components/SEO';
import CourseCard from '../components/CourseCard';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO
        title="หน้าหลัก"
        description="CAP Vision Institute สถาบันฝึกอบรมระดับมืออาชีพ โดย ครูเด่น (อนุสรณ์ หนองนา) และ Master Fa เน้นการพัฒนาคนและองค์กร ด้วยหลักสูตรเชื่อมคน Leadership และ Team Building"
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-[#0f3460]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
            alt="Collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f3460] via-[#0f3460]/70 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="text-[#c5a059] font-bold tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-base mb-4 md:mb-6 nav-font uppercase">
              CAP Vision Institute
            </h2>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 md:mb-10 nav-font">
              Transform <span className="text-[#c5a059]">People</span>,<br />
              Transform <span className="text-[#c5a059]">Organization</span>
            </h1>
            <p className="text-lg md:text-2xl text-blue-50 leading-relaxed mb-10 md:mb-12 font-light opacity-80 max-w-2xl">
              “Transform People, Transform Organization.” <br className="hidden md:block" />
              ปลดล็อคศักยภาพมนุษย์ด้วยกระบวนการเรียนรู้ระดับพรีเมี่ยม โดย ครูเด่น มาสเตอร์ฟา [Master Facilitator]
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <Link to="/courses" className="bg-[#c5a059] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white hover:text-[#0f3460] transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-gold-500/20 nav-font">
                เลือกหลักสูตรฝึกอบรม
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-white/5 backdrop-blur-md text-white border-2 border-white/20 px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 nav-font">
                ขอใบเสนอราคา
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#c5a059] font-bold text-xs tracking-[0.5em] uppercase mb-4 block nav-font">POPULAR COURSES</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 nav-font">หลักสูตรยอดนิยม</h2>
            <div className="w-16 h-1 bg-[#c5a059] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor?.name || 'ครูเด่น มาสเตอร์ฟา'}
                image={course.image}
                duration={course.duration}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center gap-2 text-[#0f3460] font-bold text-lg hover:text-[#c5a059] transition-colors nav-font group">
              ดูหลักสูตรทั้งหมด <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#c5a059] font-bold text-xs tracking-[0.5em] uppercase mb-4 md:mb-6 block nav-font">Premium Learning Sanctuary</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 md:mb-8 nav-font">จุดเด่นที่เหนือกว่า</h2>
            <div className="w-16 md:w-24 h-1 bg-[#c5a059] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {[
              { title: 'Activity Based', desc: 'เรียนรู้ผ่านการลงมือทำ สนุก ไม่น่าเบื่อ (Edutainment)', icon: <Play className="w-8 h-8 md:w-10 h-10 text-[#c5a059]" /> },
              { title: 'Practical Results', desc: 'ปรับใช้ได้ทันทีหลังจบการอบรม (Actionable)', icon: <Zap className="w-8 h-8 md:w-10 h-10 text-[#c5a059]" /> },
              { title: 'Custom Design', desc: 'ออกแบบเนื้อหาตามโจทย์ธุรกิจเฉพาะองค์กร', icon: <Target className="w-8 h-8 md:w-10 h-10 text-[#c5a059]" /> },
              { title: 'Master Facilitator', desc: 'ทีมวิทยากรผู้เชี่ยวชาญด้านกระบวนการ Facilitation', icon: <Award className="w-8 h-8 md:w-10 h-10 text-[#c5a059]" /> }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 md:p-12 bg-gray-50/50 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 hover:border-[#c5a059]/20 transition-all hover:bg-white hover:shadow-2xl">
                <div className="mb-6 md:mb-10 bg-white w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-3xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 nav-font">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-medium opacity-80">{item.desc}</p>
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
              <div className="absolute -top-16 -left-16 w-64 md:w-80 h-64 md:h-80 bg-gold-gradient rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-20 animate-pulse"></div>
              <div className="bg-white p-4 md:p-6 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                  alt="ครูเด่น มาสเตอร์ฟา"
                  className="rounded-[2.5rem] md:rounded-[3rem] w-full max-w-lg mx-auto grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#c5a059] text-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] z-20 shadow-2xl hidden md:block border-4 md:border-8 border-white">
                <p className="text-3xl md:text-5xl font-black mb-1 nav-font">18+</p>
                <p className="text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] nav-font">Experience Years</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="inline-block text-[#c5a059] font-black text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 md:mb-8 nav-font">Den Master Facilitator</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f3460] mb-6 md:mb-10 nav-font leading-[1.2] md:leading-[1.1]">{BRAND_INFO.director}</h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 md:mb-12 font-medium opacity-80">
                ผู้อำนวยการสถาบัน แคป วิชั่น อินสติทิวต์ ผู้เชี่ยวชาญด้านกระบวนการเรียนรู้เพื่อการเปลี่ยนแปลง (Transformative Learning) ระดับแถวหน้าของเมืองไทย
                ผู้เชื่อมั่นว่าการเรียนรู้ต้องนำไปสู่ "การตระหนักรู้ภายใน" (Internal Insight)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
                {[
                  'Activity Based Learning Specialist',
                  'International Facilitator Certification',
                  'Expert in EQ & Self Awareness',
                  'Corporate Culture Strategist'
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4">
                    <CheckCircle2 className="w-5 md:w-7 h-5 md:h-7 text-[#c5a059] flex-shrink-0" />
                    <span className="font-bold text-[#0f3460] text-base md:text-lg nav-font opacity-90">{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
                <Link to="/about" className="bg-[#0f3460] text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-[#c5a059] transition-all nav-font shadow-xl text-center">
                  ทำความรู้จักครูเด่น
                </Link>
                <a href={CONTACT_INFO.lineUrl} className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-[#0f3460] px-8 md:px-10 py-4 md:py-4.5 rounded-2xl font-bold hover:border-[#c5a059] transition-all nav-font">
                  LINE OA: {CONTACT_INFO.line}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Showcase */}
      <ClientsSection />

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#0f3460] to-[#16213e] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 md:p-32 opacity-5 pointer-events-none">
          <Logo className="w-64 md:w-96 h-64 md:h-96" />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 md:mb-12 nav-font leading-tight">ยกระดับ<br />องค์กรของคุณ</h2>
          <p className="text-blue-100 text-lg md:text-2xl lg:text-3xl mb-12 md:mb-16 font-light opacity-70">
            ปรึกษาเราเพื่อออกแบบกระบวนการพัฒนาบุคลากรที่เหมาะสมที่สุด <br className="hidden md:block" />
            สำหรับการเติบโตที่ยั่งยืนของธุรกิจคุณ
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8">
            <a href={CONTACT_INFO.lineUrl} className="bg-[#c5a059] text-white px-8 md:px-16 py-4 md:py-6 rounded-2xl font-bold text-xl md:text-2xl hover:scale-105 transition-all shadow-2xl shadow-gold-500/40 nav-font">
              นัดคุยกับ Master Facilitator
            </a>
            <a href={`tel:${CONTACT_INFO.phone}`} className="bg-white/10 backdrop-blur-md text-white px-8 md:px-16 py-4 md:py-6 rounded-2xl font-bold text-xl md:text-2xl hover:bg-white/20 transition-all nav-font border border-white/20">
              โทร: {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
