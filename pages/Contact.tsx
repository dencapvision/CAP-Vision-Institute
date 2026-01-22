
import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Facebook, Youtube, Instagram, Send, Globe, Mail, Clock, CheckCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CONTACT_INFO, BRAND_INFO, FAQS } from '../constants';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-16 rounded-[3.5rem] shadow-2xl max-w-2xl text-center border border-gray-100 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-[#0f3460] mb-6 nav-font">ขอบคุณที่ติดต่อเรา!</h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
            ทีมงานสถาบันแคป วิชั่น ได้รับข้อมูลของคุณแล้ว เราจะติดต่อกลับเพื่อแจ้งรายละเอียดหรือนัดปรึกษาโดยเร็วที่สุด
          </p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="bg-[#0f3460] text-white px-12 py-5 rounded-2xl font-bold nav-font hover:bg-[#c5a059] transition-all shadow-lg"
          >
            ส่งข้อความใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero Header */}
      <div className="bg-[#0f3460] pt-24 pb-48 text-white relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <Globe className="w-full h-full transform translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-6 block nav-font">Contact Us</span>
           <h1 className="text-4xl md:text-7xl font-black mb-8 nav-font tracking-tight">เชื่อมต่อกับเรา</h1>
           <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed opacity-80 italic">
             “ร่วมสร้างการเรียนรู้ที่เปลี่ยนแปลงองค์กรของคุณ”
           </p>
           <p className="mt-8 text-blue-50/70 font-medium max-w-2xl mx-auto text-sm md:text-lg">
             ไม่ว่าคุณจะเป็น HR, ผู้บริหารองค์กร, นักกระบวนกร หรือบุคคลที่ต้องการพัฒนาศักยภาพ เราพร้อมเป็นพาร์ทเนอร์ด้านการเรียนรู้ที่ช่วยออกแบบเส้นทางการพัฒนาที่เหมาะสมสำหรับคุณ
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Form Section */}
          <div className="lg:col-span-8 bg-white rounded-[3.5rem] shadow-2xl p-10 md:p-20 border border-gray-100">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                <div>
                   <h2 className="text-3xl font-black text-[#0f3460] nav-font mb-2">สอบถามหลักสูตร / ขอใบเสนอราคา</h2>
                   <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Consultation & Quotation Request</p>
                </div>
                <div className="bg-[#c5a059]/10 text-[#c5a059] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest nav-font">
                   Learning Strategy Hub
                </div>
             </div>

             <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-3 group">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest nav-font transition-colors group-focus-within:text-[#c5a059]">Full Name</label>
                      <input required type="text" className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 focus:ring-4 focus:ring-[#c5a059]/10 focus:border-[#c5a059] focus:outline-none bg-gray-50/50 font-bold text-[#0f3460] transition-all" placeholder="ชื่อ-นามสกุล ของคุณ" />
                   </div>
                   <div className="space-y-3 group">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest nav-font transition-colors group-focus-within:text-[#c5a059]">Organization</label>
                      <input required type="text" className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 focus:ring-4 focus:ring-[#c5a059]/10 focus:border-[#c5a059] focus:outline-none bg-gray-50/50 font-bold text-[#0f3460] transition-all" placeholder="ชื่อหน่วยงาน / บริษัท" />
                   </div>
                   <div className="space-y-3 group">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest nav-font transition-colors group-focus-within:text-[#c5a059]">Phone Number</label>
                      <input required type="tel" className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 focus:ring-4 focus:ring-[#c5a059]/10 focus:border-[#c5a059] focus:outline-none bg-gray-50/50 font-bold text-[#0f3460] transition-all" placeholder="เบอร์โทรศัพท์ที่ติดต่อได้" />
                   </div>
                   <div className="space-y-3 group">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest nav-font transition-colors group-focus-within:text-[#c5a059]">Service Interest</label>
                      <select required className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 focus:ring-4 focus:ring-[#c5a059]/10 focus:border-[#c5a059] focus:outline-none bg-gray-50/50 font-black text-[#0f3460] transition-all nav-font appearance-none">
                         <option value="">เลือกบริการที่สนใจ...</option>
                         <option value="inhouse">In-house Training</option>
                         <option value="coaching">Executive Coaching</option>
                         <option value="od">OD Consulting</option>
                         <option value="facilitator">Facilitator Training</option>
                         <option value="events">Seminar & Workshops</option>
                         <option value="other">อื่นๆ</option>
                      </select>
                   </div>
                </div>
                <div className="space-y-3 group">
                   <label className="block text-xs font-black text-gray-400 uppercase tracking-widest nav-font transition-colors group-focus-within:text-[#c5a059]">Your Requirements</label>
                   <textarea required rows={5} className="w-full px-6 py-5 rounded-[2rem] border border-gray-100 focus:ring-4 focus:ring-[#c5a059]/10 focus:border-[#c5a059] focus:outline-none bg-gray-50/50 font-bold text-[#0f3460] transition-all" placeholder="เป้าหมายที่ต้องการพัฒนา / จำนวนผู้เข้าอบรม / ช่วงเวลาที่สะดวก..."></textarea>
                </div>
                <div className="pt-6">
                   <button type="submit" className="w-full bg-[#0f3460] text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#c5a059] transition-all flex items-center justify-center gap-6 shadow-2xl shadow-blue-900/20 group nav-font">
                      ส่งข้อมูลขอคำปรึกษา
                      <Send className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
                <p className="text-center text-xs text-gray-400 font-medium">เมื่อคุณส่งข้อมูล ทีมงานของเราจะติดต่อกลับภายใน 24 ชั่วโมงทำการ</p>
             </form>
          </div>

          {/* Contact Details Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             {/* Channels */}
             <div className="bg-[#0f3460] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                   <MessageCircle className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-black mb-10 nav-font border-b border-white/10 pb-6 uppercase tracking-widest">Channels</h3>
                <div className="space-y-10 relative z-10">
                   <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-6 group">
                      <div className="bg-white/10 p-5 rounded-2xl group-hover:bg-[#c5a059] transition-all border border-white/5"><Phone className="w-7 h-7" /></div>
                      <div>
                         <p className="text-[10px] text-blue-300 font-black uppercase tracking-widest nav-font mb-1">Hotline</p>
                         <p className="text-xl font-black nav-font tracking-tight">{CONTACT_INFO.phone}</p>
                      </div>
                   </a>
                   <a href={CONTACT_INFO.lineUrl} className="flex items-center gap-6 group">
                      <div className="bg-white/10 p-5 rounded-2xl group-hover:bg-[#c5a059] transition-all border border-white/5"><MessageCircle className="w-7 h-7" /></div>
                      <div>
                         <p className="text-[10px] text-blue-300 font-black uppercase tracking-widest nav-font mb-1">LINE Official</p>
                         <p className="text-xl font-black nav-font tracking-tight">{CONTACT_INFO.line}</p>
                      </div>
                   </a>
                   <div className="flex items-center gap-6 group">
                      <div className="bg-white/10 p-5 rounded-2xl group-hover:bg-[#c5a059] transition-all border border-white/5"><Mail className="w-7 h-7" /></div>
                      <div>
                         <p className="text-[10px] text-blue-300 font-black uppercase tracking-widest nav-font mb-1">Email Support</p>
                         <p className="text-sm font-black nav-font tracking-tight break-all">{CONTACT_INFO.email}</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Location / Hours */}
             <div className="bg-white rounded-[3.5rem] p-12 shadow-xl border border-gray-100">
                <div className="space-y-10">
                   <div>
                      <div className="flex items-center gap-3 mb-6">
                         <MapPin className="w-6 h-6 text-[#c5a059]" />
                         <h4 className="text-lg font-black text-[#0f3460] nav-font">ที่ตั้งสำนักงาน</h4>
                      </div>
                      <p className="text-gray-500 font-bold leading-relaxed mb-1 nav-font">CAP Vision Partner - Learning & Facilitation Hub</p>
                      <p className="text-gray-500 font-medium leading-relaxed mb-6">
                         {CONTACT_INFO.address}
                      </p>
                      <div className="aspect-video bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner border border-gray-50 relative group cursor-pointer">
                         <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Office location" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <a href={CONTACT_INFO.mapsUrl} target="_blank" rel="noreferrer" className="bg-[#c5a059] text-white px-6 py-3 rounded-xl font-bold nav-font text-xs flex items-center gap-2">
                               <MapPin className="w-4 h-4" /> Open in Google Maps
                            </a>
                         </div>
                      </div>
                   </div>
                   
                   <div className="pt-10 border-t border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                         <Clock className="w-6 h-6 text-[#c5a059]" />
                         <h4 className="text-lg font-black text-[#0f3460] nav-font">เวลาทำการ</h4>
                      </div>
                      <div className="space-y-2">
                         <div className="flex justify-between text-sm font-bold nav-font">
                            <span className="text-gray-400 uppercase tracking-widest">Mon - Fri</span>
                            <span className="text-[#0f3460]">09:00 - 18:00</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold nav-font">
                            <span className="text-gray-400 uppercase tracking-widest">Sat</span>
                            <span className="text-[#0f3460]">09:00 - 12:00</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold nav-font">
                            <span className="text-gray-400 uppercase tracking-widest">Sun</span>
                            <span className="text-gray-300">Closed</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* FAQs Section */}
        <section className="mt-32">
           <div className="text-center mb-16">
              <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">Frequently Asked Questions</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] nav-font leading-tight">ทุกข้อสงสัย เรามีคำตอบให้คุณ</h2>
           </div>
           
           <div className="max-w-4xl mx-auto space-y-6">
              {FAQS.map((faq, idx) => (
                 <div key={idx} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <button 
                       onClick={() => toggleFaq(idx)}
                       className="w-full flex items-center justify-between p-8 text-left group"
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openFaq === idx ? 'bg-[#0f3460] text-white' : 'bg-gray-50 text-[#c5a059]'}`}>
                             <HelpCircle className="w-5 h-5" />
                          </div>
                          <span className={`text-lg font-bold nav-font transition-all ${openFaq === idx ? 'text-[#0f3460]' : 'text-gray-700 group-hover:text-[#0f3460]'}`}>
                             {faq.question}
                          </span>
                       </div>
                       <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                          <ChevronDown className={`w-6 h-6 ${openFaq === idx ? 'text-[#c5a059]' : 'text-gray-300'}`} />
                       </div>
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                       <div className="px-24 pb-10 pt-0 text-gray-500 font-medium leading-relaxed border-t border-gray-50/50">
                          <p className="pt-6">{faq.answer}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="text-center mt-12">
              <p className="text-gray-400 font-bold nav-font text-sm">ยังมีคำถามอื่นเพิ่มเติม?</p>
              <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noreferrer" className="text-[#c5a059] font-black underline decoration-[#c5a059]/30 underline-offset-8 mt-2 inline-block hover:text-[#0f3460] transition-colors">ทักแชทคุยกับเราใน LINE ได้เลยครับ</a>
           </div>
        </section>
      </div>

      {/* Social Bar Section */}
      <div className="bg-gray-50 py-20 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
               <h3 className="text-2xl font-black text-[#0f3460] nav-font">Follow Us on Social Media</h3>
               <p className="text-gray-400 text-sm font-medium mt-2">ติดตามข่าวสารและกิจกรรมการเรียนรู้จากเราได้ทุกช่องทาง</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
               <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-y-2 transition-all">
                     <Facebook className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-black nav-font uppercase tracking-widest text-gray-400 group-hover:text-[#0f3460]">Facebook</span>
               </a>
               <a href={CONTACT_INFO.youtubeUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white group-hover:-translate-y-2 transition-all">
                     <Youtube className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-black nav-font uppercase tracking-widest text-gray-400 group-hover:text-[#0f3460]">YouTube</span>
               </a>
               <a href="#" className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-pink-600 mb-4 group-hover:bg-pink-600 group-hover:text-white group-hover:-translate-y-2 transition-all">
                     <Instagram className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-black nav-font uppercase tracking-widest text-gray-400 group-hover:text-[#0f3460]">Instagram</span>
               </a>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;
