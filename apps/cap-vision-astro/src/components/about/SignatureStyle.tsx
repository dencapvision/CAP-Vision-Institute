import React from 'react';
import { IconGoldCrestStar } from '../icons/CapBrandIcons';

const elements = [
  {
    label: 'Facilitation for Flow',
    headline: 'สร้างสภาวะ Flow ในการเรียนรู้',
    body: 'เมื่อผู้เรียนเข้าสู่สภาวะ Flow ความต้านทานต่อการเปลี่ยนแปลงจะหายไป การเรียนรู้เกิดขึ้นอย่างเป็นธรรมชาติ ลึกซึ้ง และจดจำได้นานกว่า กระบวนการของเราออกแบบมาเพื่อนำทางผู้เรียนเข้าสู่สภาวะนี้ในทุก Session',
  },
  {
    label: 'Inner Growth & Mindset',
    headline: 'การเติบโตและปลดล็อกกรอบคิดจากภายใน',
    body: 'ก่อนที่องค์กรจะเปลี่ยนแปลงได้ คนในองค์กรต้องเติบโตก่อน เราพาผู้เรียนสำรวจตนเอง เผชิญสมมติฐานเดิม ทลายความกลัว และเลือกเส้นทางแห่งการเติบโตร่วมกัน',
  },
  {
    label: 'Actionable Reflection',
    headline: 'สะท้อนคิดเชื่อมโยงสู่ผลงานจริง',
    body: 'การเรียนรู้ที่ไร้การสะท้อนคิดจะกลายเป็นเพียงกิจกรรมชั่วคราว เราออกแบบกระบวนการ Action Learning และ 360 Feedback ให้ทีมงานนำบทเรียนไปปรับใช้กับการทำงานจริงได้ทันที',
  },
];

export const SignatureStyle: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 nav-font backdrop-blur-md">
          <IconGoldCrestStar className="w-3.5 h-3.5 text-[#F59E0B]" />
          Signature Style & Distinction
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white nav-font leading-[1.05] tracking-tight">
              สิ่งที่ทำให้เรา
              <br />
              <span className="text-[#F59E0B]">แตกต่างอย่างโดดเด่น</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
              ไม่ใช่เพียงเทคนิคการสอน แต่คือความเข้าใจลึกซึ้งในธรรมชาติของมนุษย์ และการออกแบบกระบวนการที่สร้างพลังการมีส่วนร่วมอย่างแท้จริง
            </p>
          </div>
        </div>

        {/* Elements */}
        <div className="space-y-6">
          {elements.map((el, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-sm hover:border-[#2563EB]/50 transition-all flex flex-col md:flex-row gap-6 md:gap-12 items-start"
            >
              {/* Number */}
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-lg font-black text-[#F59E0B] flex-shrink-0">
                0{i + 1}
              </div>

              {/* Label + Headline */}
              <div className="md:w-1/3">
                <span className="text-[#60A5FA] text-xs font-bold uppercase tracking-wider block mb-1">
                  {el.label}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white nav-font leading-snug">
                  {el.headline}
                </h3>
              </div>

              {/* Body */}
              <div className="md:w-2/3">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                  {el.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SignatureStyle;
