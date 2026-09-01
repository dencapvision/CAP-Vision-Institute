import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { IconInstituteShield, IconGoldCrestStar } from '../icons/CapBrandIcons';

export const CapVisionStory: React.FC = () => {
  const pillars = [
    {
      letter: 'C',
      word: 'Capacity',
      thai: 'ศักยภาพ (Capacity)',
      body: 'มนุษย์ทุกคนมีศักยภาพที่รอการปลดปล่อย หน้าที่ของ CAP Vision คือการสร้างบริบทที่ปลอดภัยให้ศักยภาพนั้นเผยออกมา',
      badge: 'bg-blue-50 text-[#2563EB]',
    },
    {
      letter: 'A',
      word: 'Awareness',
      thai: 'การตระหนักรู้ (Awareness)',
      body: 'การเปลี่ยนแปลงที่ยั่งยืนเริ่มจาก Self-Awareness — การรู้จักตนเอง เข้าใจรูปแบบความคิด และมองเห็นทางเลือกใหม่ที่ไม่เคยเห็นมาก่อน',
      badge: 'bg-amber-50 text-amber-800',
    },
    {
      letter: 'P',
      word: 'Performance',
      thai: 'ผลลัพธ์ที่จับต้องได้ (Performance)',
      body: 'การเรียนรู้ต้องแปลงเป็นผลลัพธ์จริงในการทำงาน ไม่ใช่แค่ความรู้สึกดีในห้องอบรม แต่คือพฤติกรรมและผลงานที่เปลี่ยนจริง',
      badge: 'bg-emerald-50 text-emerald-700',
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label */}
        <p className="text-[#2563EB] text-xs font-black uppercase tracking-widest mb-6 nav-font">
          CAP Vision Theory
        </p>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0F2557] nav-font leading-[1.05] tracking-tight">
              ปรัชญาที่อยู่เบื้องหลัง
              <br />
              <span className="text-[#F59E0B]">ทุกกระบวนการ</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
              CAP ไม่ใช่แค่ชื่อ แต่คือปรัชญาที่เชื่อว่าการพัฒนาคนต้องเริ่มจากการสร้างศักยภาพ ผ่านการตระหนักรู้ และวัดผลด้วยผลลัพธ์ที่จับต้องได้
            </p>
          </div>
        </div>

        {/* CAP Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 flex flex-col justify-between hover:border-[#2563EB]/40 hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl sm:text-6xl font-black text-[#2563EB]/15 nav-font leading-none select-none">
                    {p.letter}
                  </span>
                  <span className={`text-[11px] font-black px-3 py-1 rounded-full ${p.badge}`}>
                    {p.word}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#0F2557] nav-font mb-3">
                  {p.thai}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Facilitation Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 text-[#2563EB] text-xs font-black uppercase tracking-widest mb-4 nav-font">
              <IconInstituteShield className="w-4 h-4" />
              Facilitation Approach
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0F2557] nav-font leading-tight mb-4">
              เราไม่ได้ "สอน"<br />
              <span className="text-[#F59E0B]">เราสร้างพื้นที่ให้คนค้นพบ</span>
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
              Facilitation ของ CAP Vision คือการออกแบบบริบทการเรียนรู้ที่ผู้เรียนเป็นศูนย์กลาง วิทยากรทำหน้าที่เป็นผู้ตั้งคำถาม ไม่ใช่ผู้ให้คำตอบ เพราะคำตอบที่ดีที่สุดมักอยู่ในตัวผู้เรียนเองอยู่แล้ว
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              'ตั้งคำถามเพื่อกระตุ้นการคิด ไม่ใช่การท่องจำ',
              'สร้างความปลอดภัยทางจิตวิทยา (Psychological Safety)',
              'ออกแบบ Learning Journey ไม่ใช่แค่ Content',
              'ใช้ประสบการณ์ตรง (Active Learning) เป็นสื่อการสอนหลัก',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-center bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                <p className="text-gray-700 text-xs sm:text-sm font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CapVisionStory;
