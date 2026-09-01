import React from 'react';

const pillars = [
  {
    number: '01',
    title: 'Transformative Learning',
    thai: 'การเรียนรู้เชิงเปลี่ยนผ่าน',
    body: 'การเรียนรู้ที่ไม่หยุดอยู่ที่ "รู้" แต่นำไปสู่การเปลี่ยนแปลงสมมติฐานหลักในการมองโลก — สิ่งที่เรียกว่า Perspective Transformation ตามทฤษฎีของ Jack Mezirow',
    quote: 'เรียนแล้วต้องเปลี่ยน ไม่ใช่แค่จำ',
  },
  {
    number: '02',
    title: 'Active Learning',
    thai: 'การเรียนรู้เชิงรุก',
    body: 'ผู้เรียนเป็นผู้ "ทำ" ไม่ใช่ผู้ "ฟัง" ทุก session ออกแบบให้มีสัดส่วนของ Experiential Activity มากกว่า 60% เพราะร่างกายจำได้ดีกว่าหัว',
    quote: 'ลงมือทำคือการเรียนรู้ที่ลึกที่สุด',
  },
  {
    number: '03',
    title: 'Facilitation',
    thai: 'กระบวนกรการเรียนรู้',
    body: 'วิทยากรทำหน้าที่เป็น Facilitator — ผู้สร้างบริบท ไม่ใช่ผู้ถ่ายทอด ทุกคำถามถูกออกแบบเพื่อกระตุ้นให้ผู้เรียนค้นพบคำตอบด้วยตนเอง',
    quote: 'คำตอบที่ดีที่สุดอยู่ในตัวท่านเองอยู่แล้ว',
  },
  {
    number: '04',
    title: 'Reflection & Dialogue',
    thai: 'การสะท้อนคิดและสนทนา',
    body: 'Reflection ไม่ใช่การมองย้อนหลัง แต่คือกระบวนการที่เปลี่ยนประสบการณ์ให้เป็นภูมิปัญญา ผ่านการตั้งคำถาม สนทนา และฟังอย่างลึกซึ้ง',
    quote: 'สะท้อนให้ถึงใจ แล้วการเปลี่ยนจะเกิดขึ้นเอง',
  },
];

const Methodology: React.FC = () => {
  return (
    <section id="cap-framework" className="py-24 md:py-40 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label + Headline */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-3 nav-font">
            Methodology & Framework
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F2557] nav-font leading-[1.1] tracking-tight mb-4">
            4 เสาหลักที่อยู่เบื้องหลัง
            <br />
            ทุกกระบวนการพัฒนาองค์กร
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            ไม่ใช่เทคนิคที่เลือกตามกระแส แต่คือปรัชญาที่พิสูจน์ผ่านการทำงานจริงกับองค์กรชั้นนำกว่า 200+ แห่ง
          </p>
        </div>

        {/* Pillars - full-width horizontal stack */}
        <div className="space-y-0">
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-gray-100 py-10 md:py-14 items-start group ${
                i === pillars.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-4xl sm:text-6xl font-black text-[#2563EB]/20 nav-font select-none group-hover:text-[#2563EB] transition-colors">
                  {p.number}
                </span>
              </div>

              {/* English + Thai Title */}
              <div className="md:col-span-4 mt-2 md:mt-0">
                <h3 className="text-xl sm:text-2xl font-black text-[#0F2557] nav-font mb-1 group-hover:text-[#2563EB] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm font-bold text-gray-400">
                  {p.thai}
                </p>
              </div>

              {/* Body */}
              <div className="md:col-span-4 mt-3 md:mt-0">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {p.body}
                </p>
              </div>

              {/* Quote */}
              <div className="md:col-span-3 mt-3 md:mt-0 md:pl-6">
                <p className="text-xs sm:text-sm font-medium text-amber-700 italic border-l-2 border-[#F59E0B] pl-3 py-1">
                  "{p.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
