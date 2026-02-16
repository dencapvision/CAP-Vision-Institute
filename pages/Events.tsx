
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, ExternalLink, MessageCircle, Facebook, Linkedin, Globe, Target, Zap, Heart, Award, ArrowRight } from 'lucide-react';
import { EVENT_INFO } from '../constants/events';
import { CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';

const Events: React.FC = () => {
   return (
      <div className="bg-gray-50 min-h-screen pb-20">
         <SEO
            title="กิจกรรม & เครือข่าย"
            description="กิจกรรม Workshop สัมมนา และเครือข่าย Facilitator Community ของ CAP Vision Institute"
         />
         {/* Hero Header */}
         <div className="bg-[#0f3460] pt-24 pb-48 text-white relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <Calendar className="w-96 h-96 absolute -bottom-20 -left-20" />
               <Users className="w-64 h-64 absolute top-10 right-10" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-6 block nav-font">Gathering of Minds</span>
               <h1 className="text-4xl md:text-7xl font-black mb-8 nav-font tracking-tight">{EVENT_INFO.title}</h1>
               <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed italic">
                  “{EVENT_INFO.slogan}”
               </p>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">

            {/* Why Events Matter */}
            <section className="mb-24">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {EVENT_INFO.why.map((item, idx) => (
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

            {/* Seminar Schedule Table */}
            <section className="mb-32">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 nav-font">Workshops & Seminar Schedule</h2>
                  <p className="text-gray-500 font-medium max-w-2xl mx-auto">“เรียนรู้จากของจริง ลงมือทำจริง เพื่อพัฒนาอย่างก้าวกระโดด”</p>
               </div>

               <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                           <tr>
                              <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400 nav-font">📅 วัน/เวลา</th>
                              <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400 nav-font">📌 หัวข้อสัมมนา</th>
                              <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400 nav-font">🎤 วิทยากร</th>
                              <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400 nav-font">📍 สถานที่</th>
                              <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400 nav-font text-center">📝 รายละเอียด</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {EVENT_INFO.schedule.map((event) => (
                              <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                                 <td className="px-10 py-8 text-[#c5a059] font-black nav-font whitespace-nowrap">{event.date}</td>
                                 <td className="px-10 py-8 text-[#0f3460] font-bold text-lg nav-font leading-tight">{event.title}</td>
                                 <td className="px-10 py-8 text-gray-500 font-medium whitespace-nowrap">{event.speaker}</td>
                                 <td className="px-10 py-8 text-gray-500 font-medium">
                                    <div className="flex items-center gap-2">
                                       <MapPin className="w-4 h-4 text-[#c5a059]" /> {event.location}
                                    </div>
                                 </td>
                                 <td className="px-10 py-8 text-center">
                                    <a href={event.link} className="inline-flex items-center gap-2 bg-[#0f3460] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#c5a059] transition-all nav-font whitespace-nowrap">
                                       ลงทะเบียน <ExternalLink className="w-4 h-4" />
                                    </a>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </section>

            {/* Communities Section */}
            <section className="mb-32">
               <div className="flex flex-col md:flex-row gap-16 items-center">
                  <div className="md:w-1/2">
                     <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">Be Part of Us</span>
                     <h2 className="text-3xl md:text-6xl font-black text-[#0f3460] mb-8 nav-font leading-tight">Facilitator & Learning Community</h2>
                     <p className="text-xl text-gray-500 font-medium mb-12 opacity-80 leading-relaxed">
                        "เรียนรู้ร่วมกัน สร้างแรงบันดาลใจ ขยายเครือข่ายวิชาชีพ" การเป็นผู้นำการเรียนรู้ไม่สามารถทำได้ลำพัง มาร่วมเติบโตไปพร้อมกับเรา
                     </p>
                     <div className="space-y-6">
                        {[
                           'Exclusive Learning Materials – เทคนิคและแนวทางใหม่ๆ',
                           'Monthly Virtual Meet-ups – ประชุมออนไลน์แชร์ไอเดีย',
                           'Facilitator’s Mastermind Group – กลุ่มแลกเปลี่ยนประสบการณ์'
                        ].map((item, i) => (
                           <div key={i} className="flex gap-4 items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                              <Award className="w-6 h-6 text-green-500" />
                              <span className="font-bold text-[#0f3460] nav-font">{item}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="md:w-1/2 w-full grid grid-cols-1 gap-6">
                     {EVENT_INFO.communities.map((comm, idx) => (
                        <div key={idx} className="bg-[#0f3460] text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-all">
                           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                              {React.cloneElement(comm.icon as any, { className: "w-24 h-24" })}
                           </div>
                           <div className="relative z-10">
                              <p className="text-[#c5a059] font-black text-[10px] uppercase tracking-widest mb-2">{comm.platform}</p>
                              <h4 className="text-2xl font-black nav-font mb-8">{comm.name}</h4>
                              <a href={comm.link} className="bg-white text-[#0f3460] px-8 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-3 hover:bg-[#c5a059] hover:text-white transition-all nav-font">
                                 เข้าร่วมคอมมูนิตี้ <ArrowRight className="w-4 h-4" />
                              </a>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Bottom CTA */}
            <div className="text-center py-20 bg-white rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
               <div className="absolute -top-12 -left-12 w-64 h-64 bg-gray-50 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
               <div className="relative z-10 px-6">
                  <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-8 nav-font leading-tight tracking-tight">พร้อมเข้าร่วมเครือข่ายมืออาชีพหรือยัง?</h2>
                  <p className="text-gray-500 text-lg md:text-2xl font-medium mb-12 max-w-3xl mx-auto opacity-80 leading-relaxed">
                     CAP Vision Partner พร้อมช่วยคุณพัฒนาเครือข่าย แลกเปลี่ยนความรู้ และสร้างโอกาสในการเติบโตที่ยั่งยืน
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
                     <Link to="/contact" className="bg-[#0f3460] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#c5a059] transition-all nav-font shadow-xl">
                        สมัครสมาชิกชุมชน
                     </Link>
                     <Link to="/courses" className="flex items-center justify-center gap-4 bg-white border-2 border-gray-100 text-[#0f3460] px-10 py-5 rounded-2xl font-bold hover:border-[#c5a059] transition-all nav-font text-lg">
                        <MessageCircle className="w-6 h-6 text-[#c5a059]" /> ดูหลักสูตรทั้งหมด
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Events;
