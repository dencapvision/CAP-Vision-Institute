import React from 'react';

const outcomes = [
  {
    metric: '85%',
    label: 'ผู้เรียนรายงานการเปลี่ยนแปลง Mindset',
    headline: 'เปลี่ยน Mindset',
    body: 'ผู้เรียนเกิดการตั้งคำถามต่อสมมติฐานเดิมของตัวเอง และมองสถานการณ์เดิมด้วยมุมมองใหม่ที่เปิดกว้างกว่าเดิม',
  },
  {
    metric: '3x',
    label: 'การมีส่วนร่วมใน Team Activity เพิ่มขึ้น',
    headline: 'เพิ่ม Engagement',
    body: 'กระบวนการ Facilitation สร้างบรรยากาศที่ผู้คนรู้สึกปลอดภัยและมีพลังที่จะมีส่วนร่วม ส่งผลให้การประชุม การทำงานร่วมกัน และการสื่อสารในทีมดีขึ้นอย่างชัดเจน',
  },
  {
    metric: '70%',
    label: 'ลดความขัดแย้งระหว่างแผนก',
    headline: 'ลด Silo',
    body: 'การเรียนรู้ร่วมกันสร้างความเข้าใจและความเชื่อมโยงระหว่างคนต่างแผนก ต่างหน้าที่ ทำให้กำแพงองค์กรที่เคยแข็งแกร่งค่อยๆ ละลายหายไป',
  },
];

const testimonials = [
  {
    quote: 'ครั้งแรกที่นั่งในห้อง ผมคิดว่าจะเป็นอีกหนึ่ง workshop ทั่วไป แต่สิ่งที่เกิดขึ้นคือผมได้พบตัวเองในแบบที่ไม่เคยรู้จักมาก่อน',
    author: 'ผู้จัดการฝ่ายพัฒนาบุคลากร',
    org: 'บริษัทผลิตชิ้นส่วนยานยนต์',
  },
  {
    quote: 'ทีมของเราเปลี่ยนไปจริงๆ ไม่ใช่แค่ในห้อง แต่ในการทำงานจริงอีก 6 เดือนต่อมา ผลลัพธ์ยังอยู่',
    author: 'ผู้อำนวยการสำนัก',
    org: 'หน่วยงานราชการ กรุงเทพมหานคร',
  },
];

const Impact: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label */}
        <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-6 nav-font">
          Impact
        </p>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20 items-end">
          <h2 className="text-4xl md:text-6xl font-black text-[#0f3460] nav-font leading-[1.05] tracking-tight">
            ผลลัพธ์ที่
            <br />
            จับต้องได้จริง
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            ตัวเลขและเรื่องราวจากผู้เรียนและองค์กรที่ผ่านกระบวนการของ CAP Vision
          </p>
        </div>

        {/* Outcome cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20 md:mb-28 border border-gray-200">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className={`p-10 md:p-12 ${i < outcomes.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
            >
              {/* Big metric */}
              <div className="text-5xl md:text-6xl font-black text-[#c5a059] nav-font mb-2">
                {o.metric}
              </div>
              <p className="text-gray-400 text-xs mb-8 leading-snug">{o.label}</p>

              {/* Divider */}
              <div className="w-8 h-[2px] bg-[#0f3460]/20 mb-6" />

              <h3 className="text-xl font-black text-[#0f3460] nav-font mb-3">
                {o.headline}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{o.body}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-10 nav-font">
            เสียงจากผู้ผ่านกระบวนการ
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`p-10 md:p-14 ${i === 0 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
              >
                <p className="text-[#0f3460] text-lg md:text-xl font-bold leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-[#0f3460] text-sm font-black nav-font">{t.author}</p>
                  <p className="text-gray-400 text-xs mt-1">{t.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Impact;
