import React from 'react';

import { CONTACT_INFO } from '../../constants/brand';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Main CTA block */}
        <div className="bg-[#0f3460] p-12 md:p-20">
          <div className="max-w-4xl">
            {/* Label */}
            <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-8 nav-font">
              พร้อมร่วมงานกับเรา
            </p>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white nav-font leading-[0.95] tracking-tight mb-8">
              เริ่มต้น
              <br />
              การเปลี่ยนแปลง
              <br />
              <span className="text-[#c5a059]">วันนี้</span>
            </h2>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-[#c5a059] mb-8" />

            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              ปรึกษาฟรีกับ Master Facilitator — เราวิเคราะห์ปัญหา ออกแบบแนวทาง และนำเสนอหลักสูตรที่เหมาะกับองค์กรของคุณโดยเฉพาะ
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact"
                className="bg-[#c5a059] text-white px-10 py-4 font-black text-sm md:text-base uppercase tracking-widest nav-font hover:bg-[#d4b06a] transition-colors text-center"
              >
                ขอ In-house Training
              </a>
              <a
                href={CONTACT_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white px-10 py-4 font-bold text-sm md:text-base uppercase tracking-widest nav-font hover:border-[#c5a059] hover:text-[#c5a059] transition-colors text-center"
              >
                นัดคุยผ่าน Line
              </a>
            </div>

            {/* Micro-copy */}
            <p className="text-white/30 text-xs mt-6 uppercase tracking-widest">
              ไม่มีข้อผูกมัด — ตอบกลับภายใน 24 ชั่วโมง
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
