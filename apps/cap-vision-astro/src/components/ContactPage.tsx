import React, { useState } from 'react';

import {
  Phone, MessageCircle, MapPin, Facebook, Youtube, Instagram,
  Send, Mail, Clock, CheckCircle, ArrowRight, HelpCircle, ChevronDown
} from 'lucide-react';
import { CONTACT_INFO, BRAND_INFO } from '../constants/brand';
import { FAQS } from '../constants/faqs';
import { supabase } from '../lib/supabase';

import { IconGoldCrestStar } from './icons/CapBrandIcons';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.34 6.34 0 0 1-2.9-2.8V15.22c.07 1.96-.58 4.02-2.01 5.43-1.61 1.64-4.14 2.21-6.32 1.44-2.18-.74-3.79-2.78-4.10-5.06-.31-2.12.51-4.41 2.14-5.83 1.64-1.45 4.09-1.89 6.22-1.12.03.01.06.02.09.03v4.02c-1.39-.46-3.03-.2-4.16.89-1.14 1.1-1.28 3.01-.26 4.21.96 1.19 2.8 1.48 4.07.64.92-.61 1.34-1.74 1.3-2.83V.02z"/>
  </svg>
);

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const organization = formData.get('organization') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const lineId = formData.get('lineId') as string;
    const service = formData.get('service') as string;
    const requirements = formData.get('requirements') as string;

    const displayData = {
      'ชื่อ-นามสกุล': fullName,
      'หน่วยงาน/องค์กร': organization,
      'เบอร์ติดต่อ': phone,
      'อีเมล': email,
      'Line ID': lineId,
      'บริการที่สนใจ': service,
      'ความต้องการเพิ่มเติม': requirements
    };

    try {
      // 1. Persist to Supabase Database
      const { error: dbError } = await supabase
        .from('leads')
        .insert([
          {
            name: fullName,
            company: organization,
            phone: phone,
            email: email,
            line_id: lineId,
            interest_topic: `Service: ${service} | ${requirements}`,
            source: 'contact_form',
            status: 'new'
          }
        ]);

      if (dbError) throw dbError;

      // 2. Send notification via Supabase Edge Function
      const { error: invokeError } = await supabase.functions.invoke('line-notify', {
        body: { 
          project: 'CONTACT',
          formType: 'ฟอร์มติดต่อสอบถาม / ขอใบเสนอราคา', 
          data: displayData 
        }
      });

      if (invokeError) throw new Error(invokeError.message || 'Notification failed');

      setSubmitted(true);
    } catch (error: any) {
      console.error('Failed to submit form:', error);
      const errorMsg = error.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล';
      alert(`ขออภัยครับ: ${errorMsg}\n\nหากปัญหายังคงอยู่ กรุณาติดต่อผ่าน LINE OA @capvision`);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white p-10 sm:p-16 rounded-3xl shadow-2xl max-w-xl text-center border border-gray-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-[#0F2557] mb-4 nav-font">ขอบคุณที่ติดต่อ CAP Vision!</h2>
          <p className="text-gray-600 font-medium leading-relaxed mb-8 text-sm sm:text-base">
            ทีมงาน Master Facilitator ได้รับข้อมูลของท่านแล้ว เราจะติดต่อกลับเพื่อจัดเตรียมข้อเสนอและพูดคุยแนวทางพัฒนาองค์กรโดยเร็วที่สุด
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3.5 rounded-2xl font-bold nav-font shadow-lg transition-all"
          >
            ส่งข้อความเพิ่มเติม
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827] overflow-x-hidden">
      

      {/* ── 1. HERO HEADER ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-40 text-white relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 nav-font backdrop-blur-md">
            Get in Touch
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 nav-font tracking-tight leading-tight">
            <span className="text-white">ปรึกษาออกแบบหลักสูตร</span><br />
            <span className="text-[#F59E0B]">ขอใบเสนอราคาเฉพาะองค์กร</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8">
            บอกเราถึงความท้าทายและเป้าหมายขององค์กรคุณ<br />
            เราช่วยวิเคราะห์ TNA ออกแบบ Framework และส่งข้อเสนอ <strong className="text-white font-bold">ภายใน 24 ชั่วโมง</strong>
          </p>

          {/* Quick contact shortcuts */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05B34C] text-white px-8 py-3.5 rounded-2xl font-black text-sm nav-font transition-all shadow-xl active:scale-95"
            >
              <MessageCircle className="w-4 h-4" /> ทัก LINE OA ทันที (@capvision)
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-2xl font-bold text-sm nav-font hover:bg-white/20 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" /> โทรสายด่วน: {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-20 pb-24">

        {/* ── 2. QUICK ASSESSMENT BANNER ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
              <IconGoldCrestStar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-black text-[#2563EB] uppercase tracking-widest mb-0.5">
                Executive Self-Discovery
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#0F2557] nav-font">
                ยังไม่แน่ใจว่าจะเริ่มต้นหลักสูตรไหน?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-light">
                ทำแบบประเมินความพร้อม 4 มิติฟรี (3 นาที) เพื่อค้นพบจุดแข็งและจุดปลดล็อกองค์กรคุณทันที
              </p>
            </div>
          </div>

          <a href="/assessment"
            className="btn-premium bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-2xl font-bold text-xs whitespace-nowrap shadow-md flex items-center gap-2"
          >
            เริ่มประเมินฟรี
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── 3. CONTACT & PROPOSAL FORM ── */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl p-8 sm:p-14 border border-gray-100">
            <div className="mb-8">
              <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest block mb-1">
                Consultation & Quotation Request
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font mb-3">
                กรอกข้อมูลเพื่อให้ทีมงานจัดเตรียมข้อเสนอ
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {['ตอบกลับภายใน 24 ชั่วโมง', 'ปรึกษาฟรี', 'ไม่มีข้อผูกมัด'].map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    required
                    type="text"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm text-[#111827] bg-[#F8FAFC]"
                    placeholder="เช่น คุณอนุสรณ์ (ครูเด่น)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    ชื่อองค์กร / บริษัท <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="organization"
                    required
                    type="text"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm text-[#111827] bg-[#F8FAFC]"
                    placeholder="เช่น บริษัท แคป วิชั่น จำกัด"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm text-[#111827] bg-[#F8FAFC]"
                    placeholder="08X-XXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm text-[#111827] bg-[#F8FAFC]"
                    placeholder="name@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    LINE ID (ถ้ามี)
                  </label>
                  <input
                    name="lineId"
                    type="text"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm text-[#111827] bg-[#F8FAFC]"
                    placeholder="ID สำหรับส่งข้อมูลกลับ"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    บริการหรือหัวข้อที่สนใจ <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm text-[#111827] bg-[#F8FAFC]"
                  >
                    <option value="">เลือกบริการที่ต้องการ...</option>
                    <option value="leadership">Leadership Transformation (ผู้นำยุคใหม่)</option>
                    <option value="people-team">People & Team Synergy (การสื่อสาร & Silo)</option>
                    <option value="culture">Organization Culture & Growth Mindset</option>
                    <option value="customized">Customized In-house Training (ตาม TNA)</option>
                    <option value="coaching">Executive 1-on-1 Coaching</option>
                    <option value="facilitator">Modern Facilitator Training</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  โจทย์ความท้าทาย / เป้าหมาย / จำนวนผู้เข้าอบรมโดยประมาณ <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="requirements"
                  required
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm text-[#111827] bg-[#F8FAFC]"
                  placeholder="ระบุสิ่งที่ต้องการให้พัฒนา เช่น ปัญหาการสื่อสารข้ามแผนก, ต้องการเพิ่ม Facilitative Mindset ให้หัวหน้างาน, จำนวนผู้เรียนประมาณ 30 ท่าน ในช่วงเดือน..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-premium w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  ส่งข้อมูลขอใบเสนอราคา / ปรึกษาฟรี
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-light">
                ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมงทำการ · ข้อมูลองค์กรของท่านเป็นความลับ 100%
              </p>
            </form>
          </div>

          {/* ── 4. CONTACT DETAILS SIDEBAR ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Channels Card */}
            <div className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/20 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-lg font-black mb-6 nav-font border-b border-white/10 pb-4 text-[#F59E0B] uppercase tracking-wider">
                Direct Channels
              </h3>

              <div className="space-y-6 relative z-10">
                <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl group-hover:bg-[#2563EB] transition-all flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hotline</p>
                    <p className="text-base font-black nav-font text-white">{CONTACT_INFO.phone}</p>
                  </div>
                </a>

                <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#06C755] rounded-2xl group-hover:scale-105 transition-all flex items-center justify-center flex-shrink-0 shadow-md">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">LINE Official</p>
                    <p className="text-base font-black nav-font text-white">{CONTACT_INFO.line}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</p>
                    <p className="text-xs font-bold nav-font text-white break-all">{CONTACT_INFO.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Office Hours */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                  <h4 className="text-base font-black text-[#0F2557] nav-font">ที่ตั้งสถาบัน</h4>
                </div>
                <p className="text-xs font-bold text-[#111827] mb-1">{BRAND_INFO.fullName}</p>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  {CONTACT_INFO.address}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2.5 mb-3">
                  <Clock className="w-5 h-5 text-[#F59E0B]" />
                  <h4 className="text-base font-black text-[#0F2557] nav-font">เวลาทำการ</h4>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-500">จันทร์ - ศุกร์</span>
                    <span className="font-bold text-[#111827]">{CONTACT_INFO.businessHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-500">เสาร์</span>
                    <span className="font-bold text-[#111827]">{CONTACT_INFO.businessHours.saturday}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-500">อาทิตย์</span>
                    <span className="text-amber-600 font-bold">{CONTACT_INFO.businessHours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── 5. FAQs SECTION ── */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest mb-2 block nav-font">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F2557] nav-font">
              คำถามที่พบบ่อยในการจัดฝึกอบรม
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-sm overflow-hidden transition-all">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${openFaq === idx ? 'bg-[#2563EB] text-white' : 'bg-gray-50 text-[#2563EB]'}`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={`text-sm sm:text-base font-bold nav-font ${openFaq === idx ? 'text-[#2563EB]' : 'text-gray-800'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[#2563EB]' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-0 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-50 pt-3 font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
