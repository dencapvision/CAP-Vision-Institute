import React from 'react';

import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  IconLeadership,
  IconTeamSynergy,
  IconGrowthCulture,
  IconCreativeCPS,
  IconGoldCrestStar,
  IconInstituteShield
} from '../icons/CapBrandIcons';

const pillars = [
  {
    number: '01',
    IconComponent: IconLeadership,
    title: 'Transformative Learning',
    thai: 'การเรียนรู้เชิงเปลี่ยนผ่าน',
    body: 'การเรียนรู้ที่ไม่หยุดอยู่ที่ "รู้" แต่นำไปสู่การเปลี่ยนแปลงสมมติฐานหลักในการมองโลก — Perspective Transformation ตามทฤษฎีของ Jack Mezirow เพื่อสร้างพฤติกรรมใหม่ที่ยั่งยืน',
    quote: 'เรียนแล้วต้องเปลี่ยนพฤติกรรมจริง ไม่ใช่แค่ท่องจำ',
    badge: 'Perspective Shift'
  },
  {
    number: '02',
    IconComponent: IconTeamSynergy,
    title: 'Active Experiential Learning',
    thai: 'การเรียนรู้เชิงรุกผ่านประสบการณ์จริง',
    body: 'ผู้เรียนเป็นผู้ "ลงมือทำ" ไม่ใช่ผู้ "ฟังบรรยาย" ทุก Session ออกแบบให้มีสัดส่วนของ Experiential Workshop มากกว่า 60% เพราะประสบการณ์ตรงสร้างความจำและความเข้าใจได้ดีกว่า',
    quote: 'ลงมือทำและทดลอง คือการเรียนรู้ที่ลึกที่สุด',
    badge: '60%+ Practice'
  },
  {
    number: '03',
    IconComponent: IconGrowthCulture,
    title: 'Master Facilitation',
    thai: 'กระบวนกรสร้างพื้นที่การเรียนรู้',
    body: 'วิทยากรทำหน้าที่เป็น Facilitator — ผู้สร้างบริบทและพื้นที่ปลอดภัยทางจิตวิทยา ทุกคำถามถูกออกแบบเพื่อกระตุ้นให้ทีมงานร่วมคิดและค้นพบคำตอบที่ทรงพลังด้วยตนเอง',
    quote: 'คำตอบที่ดีที่สุดอยู่ในตัวและทีมงานของท่านอยู่แล้ว',
    badge: 'Facilitative Process'
  },
  {
    number: '04',
    IconComponent: IconCreativeCPS,
    title: 'Reflection & Circle Dialogue',
    thai: 'การสะท้อนคิดและสุนทรียสนทนา',
    body: 'Reflection ไม่ใช่การมองย้อนหลังเฉยๆ แต่คือกระบวนการเปลี่ยนประสบการณ์ให้กลายเป็นปัญญาปฏิบัติ (Actionable Wisdom) ผ่านการตั้งคำถาม สนทนา และฟังอย่างลึกซึ้ง',
    quote: 'สะท้อนให้ถึงใจ แล้วการเปลี่ยนแปลงจะขับเคลื่อนเอง',
    badge: 'Actionable Wisdom'
  },
];

export const Methodology: React.FC = () => {
  return (
    <section id="cap-framework" className="py-24 md:py-36 bg-[#FFFFFF] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label + Headline */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 nav-font">
            <IconInstituteShield className="w-4 h-4" />
            CAP Framework & Learning Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F2557] nav-font leading-[1.05] tracking-tight mb-6">
            4 เสาหลักสถาปัตยกรรม
            <br />
            <span className="text-[#F59E0B]">กระบวนการพัฒนาองค์กร</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
            ไม่ใช่เทคนิคที่เลือกตามกระแส แต่คือ Framework ที่พิสูจน์ผ่านการนำกระบวนการจริงกับองค์กรชั้นนำกว่า 200+ แห่ง เพื่อสร้างการเปลี่ยนแปลงที่วัดผลได้ในระยะยาว
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pillars.map((p, i) => {
            const Icon = p.IconComponent;
            return (
              <div
                key={i}
                className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-md hover:border-[#2563EB] hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-2xl font-black text-[#2563EB]/25 nav-font group-hover:text-[#2563EB] transition-colors">
                        {p.number}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0F2557] nav-font mb-1 group-hover:text-[#2563EB] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-500 mb-4">
                    {p.thai}
                  </p>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                    {p.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/80">
                  <p className="text-xs font-bold text-amber-800 italic border-l-2 border-[#F59E0B] pl-3 py-1">
                    "{p.quote}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Callout Box */}
        <div className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-2">
              <IconGoldCrestStar className="w-4 h-4" />
              Organizational Diagnosis
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white nav-font mb-2">
              ประเมินความพร้อมขององค์กรคุณด้วย CAP Model
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              ทำแบบประเมินออนไลน์ 3 นาที ค้นหาจุดแข็ง (Strengths) และจุดปลดล็อก (Unlocks) ของคนและทีมในองค์กรคุณทันที
            </p>
          </div>

          <a href="/assessment"
            className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-sm whitespace-nowrap shadow-lg inline-flex items-center gap-2 flex-shrink-0"
          >
            เริ่มทำแบบประเมินฟรี
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Methodology;
