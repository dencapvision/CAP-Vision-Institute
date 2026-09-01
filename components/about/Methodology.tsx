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
        <div className="max-w-2xl mb-20 md:mb-28">
          <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-6 nav-font">
            Methodology
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-[#0f3460] nav-font leading-[1.05] tracking-tight mb-6">
            4 เสาหลักที่อยู่เบื้องหลัง
            <br />
            ทุกกระบวนการ
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            ไม่ใช่เทคนิคที่เลือกตามกระแส แต่คือปรัชญาที่พิสูจน์ผ่านการทำงานจริงกับมากกว่า 100 องค์กร
          </p>
        </div>

        {/* Pillars - full-width horizontal stack */}
        <div className="space-y-0">
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-gray-100 py-12 md:py-16 items-start group ${
                i === pillars.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-5xl md:text-7xl font-black text-[#0f3460]/10 nav-font select-none group-hover:text-[#c5a059]/30 transition-colors">
                  {p.number}
                </span>
              </div>

              {/* Title */}
              <div className="md:col-span-3 md:pt-2">
                <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-2 nav-font">
                  {p.thai}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-[#0f3460] nav-font">
                  {p.title}
                </h3>
              </div>

              {/* Body */}
              <div className="md:col-span-5 md:pt-2">
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                  {p.body}
                </p>
              </div>

              {/* Quote */}
              <div className="md:col-span-3 md:pt-2 md:pl-8">
                <div className="border-l-2 border-[#c5a059] pl-4">
                  <p className="text-[#0f3460] text-sm font-bold nav-font italic leading-snug">
                    "{p.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
