
import React from 'react';
import { SERVICES, TRAINING_INFO, TRANSFORMATIVE_LEARNING_INFO, FACILITATION_TRAINING_INFO, TEAM_LEADERSHIP_INFO, OD_CONSULTING_INFO, CONTACT_INFO, BRAND_INFO } from '../constants';
import { CheckCircle2, ArrowRight, Zap, Target, TrendingUp, Heart, Cpu, Layout, MessageCircle, BarChart3, ShieldCheck, Award, LineChart, Puzzle, RefreshCcw, Brain, Sparkles, PenTool, Layers, Rocket, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#0f3460] pt-24 pb-48 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <Target className="w-full h-full transform translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
           <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-6 block nav-font">Corporate Solutions</span>
           <h1 className="text-4xl md:text-7xl font-black mb-8 nav-font tracking-tight">{TRAINING_INFO.title}</h1>
           <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed opacity-80 italic">
             “{TRAINING_INFO.slogan}”
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20 pb-24">
        
        {/* Why? Section - Refined Corporate Statistics */}
        <section className="mb-32">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 nav-font">Why? ทำไมต้องพัฒนาองค์ความรู้ภายในองค์กร</h2>
             <p className="text-gray-500 font-medium max-w-2xl mx-auto">เพราะบุคลากรที่มีทักษะคือความได้เปรียบทางธุรกิจที่ยั่งยืนที่สุด</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {TRAINING_INFO.why.map((item, idx) => (
               <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform group">
                 <div className="w-20 h-20 bg-gray-50 text-[#c5a059] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-inner">
                    {React.cloneElement(item.icon as any, { className: "w-10 h-10" })}
                 </div>
                 <span className="text-5xl font-black text-[#0f3460] mb-4 nav-font tracking-tighter">{item.stat}</span>
                 <h4 className="text-xl font-bold text-[#c5a059] mb-4 nav-font leading-tight">{item.label}</h4>
                 <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-80">{item.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Transformative Learning Section */}
        <section className="mb-32">
           <div className="text-center mb-16">
              <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">Beyond Traditional Training</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 nav-font">{TRANSFORMATIVE_LEARNING_INFO.title}</h2>
              <p className="text-gray-500 font-medium max-w-3xl mx-auto">“{TRANSFORMATIVE_LEARNING_INFO.slogan}”</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {TRANSFORMATIVE_LEARNING_INFO.why.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      {React.cloneElement(item.icon as any, { className: "w-24 h-24" })}
                   </div>
                   <span className="text-4xl font-black text-[#c5a059] mb-2 block nav-font">{item.stat}</span>
                   <h4 className="text-lg font-bold text-[#0f3460] mb-3 nav-font">{item.label}</h4>
                   <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-xl border border-gray-100 overflow-hidden relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                 <div className="lg:col-span-5 relative">
                    <div className="absolute -inset-4 bg-[#c5a059]/10 rounded-[3rem] blur-2xl"></div>
                    <img 
                       src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80" 
                       className="relative z-10 rounded-[3rem] shadow-2xl w-full h-[500px] object-cover"
                       alt="Transformative dialogue"
                    />
                 </div>
                 <div className="lg:col-span-7 space-y-12">
                    <div>
                       <h3 className="text-3xl font-black text-[#0f3460] mb-8 nav-font">How? วิธีการของเรา</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          {TRANSFORMATIVE_LEARNING_INFO.how.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-start group">
                               <div className="w-12 h-12 bg-[#0f3460]/5 text-[#c5a059] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-sm">
                                  {React.cloneElement(item.icon as any, { className: "w-6 h-6" })}
                               </div>
                               <div>
                                  <h4 className="text-lg font-bold text-[#0f3460] mb-1 nav-font">{item.title}</h4>
                                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-[#0f3460] mb-8 nav-font">What? สิ่งที่เราออกแบบ</h3>
                       <div className="space-y-4">
                          {TRANSFORMATIVE_LEARNING_INFO.what.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#c5a059] transition-all">
                               <ShieldCheck className="w-5 h-5 text-green-500" />
                               <span className="text-lg font-bold text-[#0f3460] nav-font">{item}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Facilitation Skills Training Section */}
        <section className="mb-32">
           <div className="text-center mb-16">
              <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">Empowering Facilitators</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 nav-font">{FACILITATION_TRAINING_INFO.title}</h2>
              <p className="text-gray-500 font-medium max-w-3xl mx-auto">“{FACILITATION_TRAINING_INFO.slogan}”</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {FACILITATION_TRAINING_INFO.why.map((item, idx) => (
                <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform group">
                   <div className="w-20 h-20 bg-gray-50 text-[#c5a059] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-inner">
                      {React.cloneElement(item.icon as any, { className: "w-10 h-10" })}
                   </div>
                   <span className="text-5xl font-black text-[#0f3460] mb-4 nav-font tracking-tighter">{item.stat}</span>
                   <h4 className="text-xl font-bold text-[#c5a059] mb-4 nav-font leading-tight">{item.label}</h4>
                   <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-80">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-[#0f3460] rounded-[4rem] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                 <PenTool className="w-64 h-64 md:w-96 md:h-96" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                 <div className="lg:col-span-7 space-y-12">
                    <div>
                       <h3 className="text-3xl font-black mb-10 nav-font text-[#c5a059]">How? วิธีการของเรา</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          {FACILITATION_TRAINING_INFO.how.map((item, idx) => (
                            <div key={idx} className="flex gap-6 items-start group">
                               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a059] transition-all border border-white/5">
                                  {React.cloneElement(item.icon as any, { className: "w-7 h-7" })}
                               </div>
                               <div>
                                  <h4 className="text-xl font-bold text-[#c5a059] mb-2 nav-font">{item.title}</h4>
                                  <p className="text-blue-100/70 text-sm leading-relaxed">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <h3 className="text-3xl font-black mb-10 nav-font text-[#c5a059]">What? สิ่งที่คุณจะได้รับ</h3>
                       <div className="space-y-4">
                          {FACILITATION_TRAINING_INFO.what.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                               <CheckCircle2 className="w-6 h-6 text-green-400" />
                               <span className="text-xl font-bold nav-font">{item}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="lg:col-span-5">
                    <div className="relative">
                       <div className="absolute -inset-4 bg-[#c5a059]/20 rounded-[3rem] blur-2xl"></div>
                       <img 
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                          className="relative z-10 rounded-[3rem] shadow-2xl w-full h-[550px] object-cover border-4 border-white/10"
                          alt="Facilitation workshop in progress"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Team Building & Leadership Development Section */}
        <section className="mb-32">
           <div className="text-center mb-16">
              <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">Next-Level Leadership</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 nav-font">{TEAM_LEADERSHIP_INFO.title}</h2>
              <p className="text-gray-500 font-medium max-w-3xl mx-auto">“{TEAM_LEADERSHIP_INFO.slogan}”</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {TEAM_LEADERSHIP_INFO.why.map((item, idx) => (
                <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform group">
                   <div className="w-20 h-20 bg-gray-50 text-[#c5a059] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-inner">
                      {React.cloneElement(item.icon as any, { className: "w-10 h-10" })}
                   </div>
                   <span className="text-5xl font-black text-[#0f3460] mb-4 nav-font tracking-tighter">{item.stat}</span>
                   <h4 className="text-xl font-bold text-[#c5a059] mb-4 nav-font leading-tight">{item.label}</h4>
                   <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-80">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-xl border border-gray-100 overflow-hidden relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                 <div className="lg:col-span-5 relative">
                    <div className="absolute -inset-4 bg-[#c5a059]/10 rounded-[3rem] blur-2xl"></div>
                    <img 
                       src="https://images.unsplash.com/photo-1517048676732-d676936d9b2c?auto=format&fit=crop&q=80" 
                       className="relative z-10 rounded-[3rem] shadow-2xl w-full h-[550px] object-cover"
                       alt="Executive meeting and leadership development"
                    />
                 </div>
                 <div className="lg:col-span-7 space-y-12">
                    <div>
                       <h3 className="text-3xl font-black text-[#0f3460] mb-8 nav-font flex items-center gap-4">
                          <Target className="w-8 h-8 text-[#c5a059]" /> How? วิธีการของเรา
                       </h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          {TEAM_LEADERSHIP_INFO.how.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-start group">
                               <div className="w-12 h-12 bg-gray-50 text-[#0f3460] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-sm">
                                  {React.cloneElement(item.icon as any, { className: "w-6 h-6" })}
                               </div>
                               <div>
                                  <h4 className="text-lg font-bold text-[#0f3460] mb-1 nav-font">{item.title}</h4>
                                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-[#0f3460] mb-8 nav-font">What? หลักสูตรที่เราให้บริการ</h3>
                       <div className="space-y-4">
                          {TEAM_LEADERSHIP_INFO.what.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#c5a059] transition-all">
                               <ShieldCheck className="w-6 h-6 text-green-500" />
                               <span className="text-lg font-bold text-[#0f3460] nav-font">{item}</span>
                            </div>
                          ))}
                       </div>
                       <div className="mt-10">
                          <Link to="/contact" className="bg-[#0f3460] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#c5a059] transition-all nav-font shadow-xl inline-flex items-center gap-4">
                             นัดคุยแนวทางพัฒนาผู้นำ <ArrowRight className="w-6 h-6" />
                          </Link>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* OD Consulting Section */}
        <section className="mb-32">
           <div className="text-center mb-16">
              <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">Systemic Transformation</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 nav-font">{OD_CONSULTING_INFO.title}</h2>
              <p className="text-gray-500 font-medium max-w-3xl mx-auto">“{OD_CONSULTING_INFO.slogan}”</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {OD_CONSULTING_INFO.why.map((item, idx) => (
                <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform group">
                   <div className="w-20 h-20 bg-gray-50 text-[#c5a059] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-inner">
                      {React.cloneElement(item.icon as any, { className: "w-10 h-10" })}
                   </div>
                   <span className="text-5xl font-black text-[#0f3460] mb-4 nav-font tracking-tighter">{item.stat}</span>
                   <h4 className="text-xl font-bold text-[#c5a059] mb-4 nav-font leading-tight">{item.label}</h4>
                   <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-80">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-[#0f3460] rounded-[4rem] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 p-12 opacity-5">
                 <Search className="w-64 h-64 md:w-96 md:h-96" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                 <div className="lg:col-span-7 space-y-12">
                    <div>
                       <h3 className="text-3xl font-black mb-10 nav-font text-[#c5a059]">How? วิธีการของ CAP Vision Partner</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          {OD_CONSULTING_INFO.how.map((item, idx) => (
                            <div key={idx} className="flex gap-6 items-start group">
                               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a059] transition-all border border-white/5">
                                  {React.cloneElement(item.icon as any, { className: "w-7 h-7" })}
                               </div>
                               <div>
                                  <h4 className="text-xl font-bold text-[#c5a059] mb-2 nav-font">{item.title}</h4>
                                  <p className="text-blue-100/70 text-sm leading-relaxed">{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <h3 className="text-3xl font-black mb-10 nav-font text-[#c5a059]">What? สิ่งที่ CAP Vision Partner ให้บริการ</h3>
                       <div className="space-y-4">
                          {OD_CONSULTING_INFO.what.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                               <ShieldCheck className="w-6 h-6 text-green-400" />
                               <span className="text-xl font-bold nav-font">{item}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="lg:col-span-5">
                    <div className="relative">
                       <div className="absolute -inset-4 bg-[#c5a059]/20 rounded-[3rem] blur-2xl"></div>
                       <img 
                          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
                          className="relative z-10 rounded-[3rem] shadow-2xl w-full h-[550px] object-cover border-4 border-white/10"
                          alt="Organization analysis and OD Consulting"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Detailed Service Cards */}
        <section>
          <div className="text-center mb-16">
             <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">Service Portfolio</span>
             <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] nav-font">เจาะลึกบริการของเรา</h2>
          </div>
          <div className="grid grid-cols-1 gap-16 md:gap-32">
            {SERVICES.map((service, idx) => (
              <div key={service.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
                <div className="lg:w-1/2">
                  <div className="w-20 h-20 bg-[#0f3460]/5 text-[#c5a059] rounded-[2rem] flex items-center justify-center mb-10 shadow-inner">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-8 nav-font leading-tight">{service.title}</h2>
                  <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium opacity-80">
                    {service.description} เรามุ่งเน้นการออกแบบการเรียนรู้ที่เห็นผลจริง โดยเริ่มจากการประเมินปัญหาที่แท้จริงขององค์กร
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {[
                      'Custom Learning Experience',
                      'Measurable Outcomes',
                      'Active Learning Design',
                      'Certified Expert Team'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-[#c5a059] group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-sm">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700 font-bold nav-font text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-4 bg-[#0f3460] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#c5a059] transition-all shadow-2xl active:scale-95 nav-font"
                  >
                    ขอรายละเอียดเพิ่มเติม <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-[#0f3460] to-[#c5a059] rounded-[3.5rem] opacity-20 blur-xl group-hover:opacity-40 transition-all"></div>
                    <img 
                      src={service.image || `https://picsum.photos/seed/${service.id}/800/600`} 
                      alt={service.title} 
                      className="relative z-10 rounded-[3rem] shadow-2xl object-cover w-full h-[350px] md:h-[500px]"
                    />
                    <div className="absolute top-8 right-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white hidden md:block">
                       <Award className="w-10 h-10 text-[#c5a059] mx-auto mb-2" />
                       <p className="text-[10px] font-black nav-font uppercase tracking-widest text-[#0f3460]">Premium Service</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-32 text-center py-20 bg-white rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
           <div className="absolute -top-12 -left-12 w-64 h-64 bg-gray-50 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
           <div className="relative z-10 px-6">
              <h2 className="text-3xl md:text-6xl font-black text-[#0f3460] mb-8 nav-font leading-tight tracking-tight">พร้อมยกระดับทีมงานของคุณหรือยัง?</h2>
              <p className="text-gray-500 text-lg md:text-2xl font-medium mb-12 max-w-3xl mx-auto opacity-80 leading-relaxed">
                ให้เราเป็นพาร์ทเนอร์ในการสร้างบุคลากรที่พร้อมรับความเปลี่ยนแปลง และนำพาองค์กรสู่อนาคตที่ยั่งยืน
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
                <Link to="/contact" className="bg-[#0f3460] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#c5a059] transition-all nav-font shadow-xl active:scale-105">
                   เริ่มวางแผนการพัฒนาคน
                </Link>
                <a href={CONTACT_INFO.lineUrl} className="flex items-center justify-center gap-4 bg-white border-2 border-gray-100 text-[#0f3460] px-10 py-5 rounded-2xl font-bold hover:border-[#c5a059] transition-all nav-font text-lg active:scale-105">
                   <MessageCircle className="w-6 h-6 text-[#c5a059]" /> ปรึกษา Master Facilitator
                </a>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
