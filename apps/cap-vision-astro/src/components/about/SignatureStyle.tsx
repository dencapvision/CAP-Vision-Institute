import React from 'react';

const elements = [
  {
    label: 'Facilitation for Flow',
    headline: 'สร้างสภาวะ Flow ในการเรียนรู้',
    body: 'เมื่อผู้เรียนเข้าสู่สภาวะ Flow ความต้านทานต่อการเปลี่ยนแปลงจะหายไป การเรียนรู้เกิดขึ้นอย่างเป็นธรรมชาติ ลึก และจดจำได้นานกว่า กระบวนการของครูเด่นออกแบบมาเพื่อนำทางผู้เรียนเข้าสู่สภาวะนี้ทุก session',
  },
  {
    label: 'Inner Growth Journey',
    headline: 'การเดินทางของการเติบโตภายใน',
    body: 'ก่อนที่องค์กรจะเปลี่ยนแปลงได้ คนในองค์กรต้องเติบโตก่อน Inner Growth Journey คือกระบวนการที่พาผู้เรียนสำรวจตนเอง เผชิญสมมติฐานเดิม และเลือกเส้นทางใหม่ด้วยตัวเอง',
  },
  {
    label: 'Self Reflection + 360 Feedback',
    headline: 'สะท้อนตนเองจากหลายมุมมอง',
    body: 'การรู้จักตัวเองที่แท้จริงต้องการทั้งมุมมองจากภายใน (Self-Reflection) และมุมมองจากผู้อื่น (360 Feedback) ครูเด่นออกแบบกระบวนการที่ผสานทั้งสองให้ผู้เรียนได้ภาพที่ครบถ้วน ชัดเจน และนำไปปฏิบัติได้จริง',
  },
];

const SignatureStyle: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-[#0f3460]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label */}
        <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-6 nav-font">
          Signature Style
        </p>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20 items-end">
          <h2 className="text-4xl md:text-6xl font-black text-white nav-font leading-[1.05] tracking-tight">
            สิ่งที่ทำให้
            <br />
            <span className="text-[#c5a059]">ต่างออกไป</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
            ไม่ใช่เทคนิคพิเศษ แต่คือความเข้าใจลึกในธรรมชาติของมนุษย์ และการออกแบบกระบวนการที่เคารพความเป็นปัจเจกของผู้เรียน
          </p>
        </div>

        {/* Elements */}
        <div className="space-y-0">
          {elements.map((el, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-white/10 py-12 md:py-16 items-start"
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-4xl md:text-5xl font-black text-white/10 nav-font select-none">
                  0{i + 1}
                </span>
              </div>

              {/* Label + Headline */}
              <div className="md:col-span-4 md:pt-1">
                <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-3 nav-font">
                  {el.label}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-white nav-font leading-snug">
                  {el.headline}
                </h3>
              </div>

              {/* Body */}
              <div className="md:col-span-7 md:pt-1 md:pl-12">
                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                  {el.body}
                </p>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>

      </div>
    </section>
  );
};

export default SignatureStyle;
