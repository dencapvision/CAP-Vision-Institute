
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, Heart, Sparkles, CheckCircle2, Play, Users, Clock, Zap, MessageCircle, Quote, ShieldCheck, Cpu, Globe, ArrowRight, Shield } from 'lucide-react';
import { BRAND_INFO, CONTACT_INFO, TIMELINE } from '../constants/brand';
import { SPEAKERS } from '../constants/speakers';
import { SERVICES_LIST } from '../constants/services';
import ClientsSection from '../components/ClientsSection';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-16 md:pb-24 overflow-x-hidden">
      <SEO
        title="เกี่ยวกับเรา - CAP Vision Institute"
        description="เกี่ยวกับ CAP Vision Institute สถาบันฝึกอบรมระดับมืออาชีพ ผู้นำด้าน Transformative Learning นำโดย ครูเด่น (อนุสรณ์ หนองนา) และ Master Fa"
      />
      {/* Hero Header */}
      <div className="bg-[#0f3460] pt-24 md:pt-40 pb-32 md:pb-56 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#c5a059]/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-400/5 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,52,96,0.2),transparent_70%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 md:mb-8 block nav-font">About CAP Vision Institute</span>
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-black mb-8 md:mb-12 nav-font tracking-tighter uppercase leading-[0.9]">
            จุดเริ่มต้นของ<br /><span className="font-gold">พวกเรา</span>
          </h1>
          <p className="text-xl md:text-4xl font-gold font-black nav-font mb-6 md:mb-10 italic">“{BRAND_INFO.slogan}”</p>
          <div className="w-24 h-1.5 bg-[#c5a059] mx-auto rounded-full mb-10 scale-x-110"></div>
          <p className="text-lg md:text-3xl text-blue-50/70 max-w-4xl mx-auto font-light leading-relaxed px-4">
            {BRAND_INFO.thaiName} — พาร์ทเนอร์ผู้อยู่เบื้องหลังการ Transformation ขององค์กรชั้นนำ <br className="hidden md:block" />
            ผ่านกระบวนการ Facilitation ที่มุ่งเน้นผลลัพธ์ที่ยั่งยืน
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 md:-mt-32 relative z-20">

        {/* Intro Section - The Core Narrative */}
        <section className="mb-24 md:mb-40">
          <div className="card-premium p-10 md:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Quote className="w-48 h-48 md:w-80 md:h-80 text-[#0f3460]" />
            </div>
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
              <div className="lg:w-1/2">
                <span className="text-[#c5a059] font-black text-[10px] uppercase tracking-widest mb-4 block nav-font">Our Philosophy</span>
                <h2 className="text-3xl md:text-6xl font-black text-[#0f3460] mb-8 md:mb-12 nav-font leading-tight">
                  เปลี่ยนคน... <br />เปลี่ยนองค์กร
                </h2>
                <div className="space-y-6 md:space-y-8 text-lg md:text-2xl text-gray-600 font-medium leading-relaxed opacity-90">
                  <p>
                    CAP Vision Partner ก่อตั้งขึ้นจากความเชื่อที่ว่า <span className="text-[#0f3460] font-black underline decoration-[#c5a059]/40 underline-offset-8">"ศักยภาพที่แท้จริงของมนุษย์ไม่ได้ถูกจำกัดด้วยสภาพแวดล้อม แต่ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง"</span>
                  </p>
                  <p>
                    เริ่มต้นจากปี 2552 เราไม่ได้เป็นเพียงแค่ "ผู้ฝึกอบรม" แต่เป็น "ผู้กระตุ้น" และ "ผู้อำนวยการเรียนรู้" ที่ช่วยให้บุคคลค้นพบศักยภาพที่ซ่อนเร้น และเปลี่ยนแปลงตนเองจากภายใน อย่างลึกซึ้ง
                  </p>
                </div>
                <div className="mt-12 md:mt-16 p-10 md:p-14 bg-gradient-to-br from-[#0f3460] to-[#0a2545] rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#c5a059]/20 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <p className="text-xl md:text-4xl font-black nav-font leading-relaxed italic relative z-10 pr-6">
                    "พลังแห่งศักยภาพอยู่ในตัวท่าน ค้นพบความมหัศจรรย์นั้นด้วยตัวท่านเอง"
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative group">
                  <div className="absolute -inset-10 bg-[#c5a059]/10 rounded-full blur-[100px] group-hover:blur-[120px] transition-all"></div>
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                    className="relative z-10 rounded-[3rem] md:rounded-[4rem] shadow-2xl transition-all duration-1000 w-full h-[400px] md:h-[650px] object-cover"
                    alt="Team Collaboration"
                  />
                  <div className="absolute inset-0 z-20 rounded-[3rem] md:rounded-[4rem] ring-1 ring-inset ring-white/10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Grid */}
        <section className="mb-24 md:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
              <div className="w-20 h-20 bg-[#c5a059]/10 text-[#c5a059] rounded-3xl flex items-center justify-center mb-10 group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-[#0f3460] mb-8 nav-font uppercase tracking-tighter">Vision</h3>
              <p className="text-xl md:text-3xl text-gray-700 font-bold leading-relaxed border-l-8 border-[#c5a059] pl-8 italic nav-font">
                “{BRAND_INFO.vision}”
              </p>
            </div>
            <div className="lg:col-span-7 bg-[#0f3460] p-10 md:p-16 rounded-[4rem] shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Zap className="w-48 h-48" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-12 nav-font uppercase tracking-tighter text-[#c5a059]">Mission</h3>
              <div className="space-y-6 md:space-y-8 relative z-10">
                {BRAND_INFO.mission.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <span className="w-10 h-10 md:w-12 md:h-12 bg-white/10 text-[#c5a059] rounded-full flex items-center justify-center font-black flex-shrink-0 text-lg md:text-xl group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                      {idx + 1}
                    </span>
                    <p className="text-blue-50 text-lg md:text-2xl font-medium leading-relaxed opacity-90">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Institution Overview - Service Categories */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 block nav-font">ภาพรวมบริการของเรา</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] nav-font mb-6 md:mb-8">ผู้นำด้าน Learning & Development</h2>
            <p className="text-gray-500 max-w-3xl mx-auto font-medium text-sm md:text-lg px-4">
              เชื่อมโยงองค์ความรู้สมัยใหม่เข้ากับความเข้าใจเชิงลึกเกี่ยวกับมนุษย์ เพื่อยกระดับศักยภาพองค์กรทุกระดับ
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {SERVICES_LIST.map((service, idx) => (
              <div key={idx} className="glass-panel-light p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-gray-100 group hover:translate-y-[-8px]">
                <div className="w-16 h-16 bg-gray-50 text-[#c5a059] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-inner">
                  {service.icon}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-[#0f3460] mb-4 nav-font group-hover:font-gold transition-all">{service.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed text-xs md:text-sm opacity-80">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clients Showcase */}
        <ClientsSection />

        {/* History Timeline */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 block nav-font">การเดินทางของพวกเรา</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] nav-font">จุดเริ่มต้นและประวัติความเป็นมา</h2>
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
            <div className="space-y-12 md:space-y-20">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-3xl md:text-5xl font-black text-[#c5a059] nav-font mb-2">{item.year}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-[#0f3460] mb-4 nav-font">{item.title}</h4>
                    <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed opacity-90">{item.desc}</p>
                  </div>
                  <div className="w-6 h-6 bg-white border-4 border-[#c5a059] rounded-full relative z-10 hidden md:block"></div>
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20 md:mb-32">
          <div className="bg-white rounded-[2.5rem] md:rounded-[4.5rem] p-8 md:p-24 shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
              <div className="lg:w-1/2">
                <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 block nav-font">Why CAP Vision Partner?</span>
                <h2 className="text-3xl md:text-6xl font-black text-[#0f3460] mb-8 md:mb-12 nav-font leading-none">ทำไมต้องเลือกเรา?</h2>
                <div className="space-y-4 md:space-y-8">
                  {[
                    { title: 'Customized Learning', desc: 'ออกแบบการเรียนรู้เฉพาะองค์กร (Customized Learning Solutions)' },
                    { title: 'Active Facilitation', desc: 'ใช้เทคนิค Facilitation & Coaching เพื่อกระตุ้นการเรียนรู้' },
                    { title: 'Result-Oriented', desc: 'เน้นแนวทาง Reskilling & Upskilling ที่วัดผลได้จริง' },
                    { title: 'Learning Culture', desc: 'สนับสนุนองค์กรสร้างวัฒนธรรมการเรียนรู้ที่ยั่งยืน' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 md:gap-6 group">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-green-50 text-green-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-sm">
                        <ShieldCheck className="w-5 h-5 md:w-7 md:h-7" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-2xl font-bold text-[#0f3460] mb-1 md:mb-2 nav-font">{item.title}</h4>
                        <p className="text-gray-500 text-xs md:text-base font-medium opacity-80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 md:mt-16">
                  <Link to="/contact" className="btn-premium bg-[#0f3460] text-white px-10 md:px-14 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-xl hover:bg-[#c5a059] transition-all nav-font shadow-xl inline-flex items-center gap-3 active:scale-95">
                    พร้อมยกระดับองค์กรหรือยัง? <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 w-full mt-8 md:mt-0">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" className="rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg h-48 md:h-80 w-full object-cover" alt="Workshop" />
                  <img src="https://images.unsplash.com/photo-1517048676732-d676936d9b2c?auto=format&fit=crop&q=80" className="rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg h-48 md:h-80 w-full object-cover mt-8 md:mt-12" alt="Meeting" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block nav-font">The Visionary Leader</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] nav-font">ผู้นำกระบวนการเปลี่ยนผ่าน</h2>
          </div>
          <div className="bg-white rounded-[2.5rem] md:rounded-[4.5rem] p-8 md:p-24 shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24 relative z-10">
              <div className="lg:w-1/3">
                <div className="relative group max-w-sm mx-auto">
                  <div className="absolute -inset-4 md:-inset-6 bg-[#c5a059]/10 rounded-[2.5rem] md:rounded-[3.5rem] blur-2xl group-hover:blur-3xl transition-all"></div>
                  <img
                    src={SPEAKERS[0].image}
                    alt={SPEAKERS[0].name}
                    className="relative z-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl w-full grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 bg-[#c5a059] text-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] z-20 shadow-xl border-4 border-white hidden sm:block">
                    <Award className="w-8 h-8 md:w-12 md:h-12 mx-auto" />
                    <p className="text-[10px] font-black nav-font uppercase tracking-widest mt-2">Master Fa</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl md:text-6xl font-black text-[#0f3460] mb-6 md:mb-10 nav-font leading-tight">{SPEAKERS[0].name}</h2>
                <p className="text-lg md:text-2xl text-gray-700 leading-relaxed font-medium mb-8 md:mb-12 opacity-80">
                  {SPEAKERS[0].longBio}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
                  {SPEAKERS[0].expertise.map((exp, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="bg-[#c5a059]/10 p-2 rounded-lg group-hover:bg-[#c5a059] transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-[#c5a059] group-hover:text-white" />
                      </div>
                      <span className="text-sm md:text-lg font-bold text-gray-600 nav-font group-hover:text-[#0f3460] transition-colors">{exp}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/speakers/${SPEAKERS[0].id}`} className="bg-[#0f3460] text-white px-10 md:px-14 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-xl hover:bg-[#c5a059] transition-all nav-font shadow-2xl active:scale-95">
                  อ่านประวัติฉบับเต็ม
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center py-16 md:py-24 bg-white rounded-[2.5rem] md:rounded-[4.5rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-gray-50 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="relative z-10 px-6">
            <h2 className="text-3xl md:text-6xl font-black text-[#0f3460] mb-6 md:mb-10 nav-font leading-tight tracking-tight">ยกระดับสู่อนาคต</h2>
            <p className="text-gray-500 text-base md:text-2xl font-medium mb-10 md:mb-16 max-w-3xl mx-auto opacity-80">
              เริ่มต้นการเปลี่ยนแปลงองค์กรของคุณวันนี้กับ {BRAND_INFO.thaiName} <br className="hidden md:block" />
              เราพร้อมเป็นพาร์ทเนอร์เคียงข้างความสำเร็จของคุณ
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8">
              <Link to="/contact" className="bg-[#0f3460] text-white px-10 md:px-16 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-xl hover:bg-[#c5a059] transition-all nav-font shadow-xl active:scale-105">
                นัดปรึกษาหลักสูตร
              </Link>
              <a href={CONTACT_INFO.lineUrl} className="flex items-center justify-center gap-4 bg-white border-2 border-gray-100 text-[#0f3460] px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-bold hover:border-[#c5a059] transition-all nav-font text-base md:text-lg active:scale-105">
                <MessageCircle className="w-6 h-6 text-[#c5a059]" /> LINE OA: {CONTACT_INFO.line}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
