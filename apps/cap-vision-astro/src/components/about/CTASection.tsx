import React from 'react';

import { CONTACT_INFO } from '../../constants/brand';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Main CTA block */}
        <div className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl relative z-10">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#F59E0B] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 nav-font backdrop-blur-md">
              Start Your Transformation Journey
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white nav-font leading-[1.05] tracking-tight mb-6">
              เริ่มต้นการเปลี่ยนแปลง
              <br />
              <span className="text-[#F59E0B]">ขับเคลื่อนองค์กรสู่ระดับถัดไป</span>
            </h2>

            {/* Divider */}
            <div className="w-16 h-1 bg-[#2563EB] rounded-full mb-6" />

            <p className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl font-light">
              ปรึกษาฟรีกับ Master Facilitator — เราวิเคราะห์ปัญหา ออกแบบแนวทาง และนำเสนอหลักสูตรที่เหมาะกับองค์กรของคุณโดยเฉพาะ
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/assessment"
                className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest nav-font shadow-xl transition-all text-center"
              >
                ทำแบบประเมินองค์กรฟรี
              </a>
              <a
                href={CONTACT_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest nav-font transition-all text-center"
              >
                ปรึกษาด่วนผ่าน LINE OA
              </a>
            </div>

            {/* Micro-copy */}
            <p className="text-gray-400 text-xs mt-6 font-light">
              ไม่มีข้อผูกมัด · ตอบกลับภายใน 24 ชั่วโมง · ปรึกษาฟรี
            </p>
          </div>
        </div>

        {/* Secondary info row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-r border-b border-gray-200">
          {[
            {
              label: 'โทรศัพท์',
              value: CONTACT_INFO.phone,
              sub: 'จันทร์ – เสาร์ 08.30 – 18.00',
            },
            {
              label: 'Line Official',
              value: CONTACT_INFO.line,
              sub: 'ตอบกลับเร็วที่สุด',
            },
            {
              label: 'อีเมล',
              value: CONTACT_INFO.email,
              sub: 'สำหรับข้อมูลองค์กร',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`px-8 py-8 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
            >
              <p className="text-[#c5a059] text-[9px] font-black uppercase tracking-[0.4em] mb-2 nav-font">
                {item.label}
              </p>
              <p className="text-[#0f3460] text-base font-black nav-font mb-1">{item.value}</p>
              <p className="text-gray-400 text-xs">{item.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CTASection;
