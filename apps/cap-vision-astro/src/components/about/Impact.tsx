import React from 'react';
import { Quote } from 'lucide-react';
import { IconGoldCrestStar } from '../icons/CapBrandIcons';

const outcomes = [
  {
    metric: '92%',
    label: 'ผู้เรียนรายงานการเปลี่ยนแปลง Mindset & Behavior',
    headline: 'เปลี่ยน Mindset & พฤติกรรม',
    body: 'ผู้เรียนเกิดการตั้งคำถามต่อสมมติฐานเดิม มองสถานการณ์ด้วยมุมมองใหม่ และกล้าลงมือทำสิ่งใหม่เพื่อผลลัพธ์ที่ดีกว่า',
  },
  {
    metric: '3x',
    label: 'การมีส่วนร่วมและการสื่อสารในทีมเพิ่มขึ้น',
    headline: 'เพิ่ม Team Engagement',
    body: 'กระบวนการ Facilitation สร้างบรรยากาศที่ปลอดภัยทางจิตวิทยา ทำให้คนในทีมกล้าแสดงความคิดเห็นและร่วมแก้ปัญหา',
  },
  {
    metric: '75%',
    label: 'ลดความขัดแย้งและทลาย Silo ระหว่างแผนก',
    headline: 'ทลาย Silo ข้ามสายงาน',
    body: 'การเรียนรู้ร่วมกันสร้างความเข้าใจและความเชื่อมโยงระหว่างคนต่างแผนก ทำให้กำแพงองค์กรละลายหายไป',
  },
];

const testimonials = [
  {
    quote: 'ครั้งแรกที่นั่งในห้อง ผมคิดว่าจะเป็นอีกหนึ่ง workshop ทั่วไป แต่สิ่งที่เกิดขึ้นคือผมได้พบศักยภาพของตัวเองและทีมในแบบที่ไม่เคยเห็นมาก่อน',
    author: 'ผู้จัดการฝ่ายพัฒนาบุคลากร (HRD)',
    org: 'บริษัทผลิตชิ้นส่วนยานยนต์ชั้นนำ',
  },
  {
    quote: 'ทีมของเราเปลี่ยนไปจริงๆ ไม่ใช่แค่ความรู้สึกดีในห้องอบรม แต่ 6 เดือนต่อมา การทำงานร่วมกันและการสื่อสารยังคงราบรื่นและเห็นผลชัดเจน',
    author: 'ผู้อำนวยการฝ่ายทรัพยากรบุคคล',
    org: 'องค์กรรัฐวิสาหกิจ',
  },
];

export const Impact: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label */}
        <p className="text-[#2563EB] text-xs font-black uppercase tracking-widest mb-6 nav-font">
          Measurable Impact & Real Results
        </p>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0F2557] nav-font leading-[1.05] tracking-tight">
              ผลลัพธ์ที่
              <br />
              <span className="text-[#F59E0B]">จับต้องได้จริง</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
              ตัวเลขและเรื่องราวความสำเร็จจากผู้เรียนและองค์กรที่ผ่านกระบวนการ Transformative Learning ของ CAP Vision Institute
            </p>
          </div>
        </div>

        {/* Outcome Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-md hover:border-[#2563EB]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl sm:text-5xl font-black text-[#2563EB] nav-font mb-2">
                  {o.metric}
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6 leading-snug">
                  {o.label}
                </p>
                <h3 className="text-lg font-black text-[#0F2557] nav-font mb-2">
                  {o.headline}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {o.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B]" />
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest nav-font">
              เสียงสะท้อนจากผู้บริหารและฝ่ายพัฒนาบุคลากร
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-md flex flex-col justify-between"
              >
                <p className="text-[#0F2557] text-sm sm:text-base font-bold leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[#0F2557] text-xs sm:text-sm font-black nav-font">{t.author}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{t.org}</p>
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
