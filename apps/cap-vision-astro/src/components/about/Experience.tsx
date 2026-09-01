import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { IconGoldCrestStar } from '../icons/CapBrandIcons';

const credentials = [
  {
    category: 'ตำแหน่งและบทบาทสำคัญ',
    items: [
      'ผู้อำนวยการสถาบันจัดการเรียนรู้ CAP Vision Institute',
      'วิทยากรและ Master Facilitator อบรมองค์กรภาครัฐ เอกชน และรัฐวิสาหกิจ',
      'ที่ปรึกษาการออกแบบกระบวนการเรียนรู้และพัฒนาสมรรถนะบุคลากร (OD & Learning Design)',
      'ผู้ร่วมก่อตั้ง Facilitator for Thailand (FFT) และโครงการ Dynamic School Thailand',
    ],
  },
  {
    category: 'ความเชี่ยวชาญเฉพาะด้าน',
    items: [
      'Transformative Facilitation & Active Experiential Learning',
      '6D Creative Problem Solving (CPS Model) นวัตกรรมการแก้ปัญหาเชิงระบบ',
      'Executive Speechfulness & การสื่อสารโน้มน้าวใจระดับผู้นำ',
      'Team Synergy & Silo Breaker การสร้างวัฒนธรรมการทำงานร่วมกัน',
    ],
  },
];

const clients = [
  { name: 'Toyota', type: 'ยานยนต์ & อุตสาหกรรม' },
  { name: 'PEA (การไฟฟ้าส่วนภูมิภาค)', type: 'รัฐวิสาหกิจ' },
  { name: 'AOT (การท่าอากาศยาน)', type: 'รัฐวิสาหกิจ' },
  { name: 'Tops (Central Retail)', type: 'ค้าปลีก & FMCG' },
  { name: 'Mr. D.I.Y. Thailand', type: 'ค้าปลีกชั้นนำ' },
  { name: 'Land and Houses', type: 'อสังหาริมทรัพย์' },
  { name: 'Dell Technologies', type: 'เทคโนโลยี & ดิจิทัล' },
  { name: 'ศอบต. & หน่วยงานภาครัฐ', type: 'หน่วยงานราชการ' },
];

export const Experience: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label */}
        <p className="text-[#2563EB] text-xs font-black uppercase tracking-widest mb-6 nav-font">
          Experience & Proven Track Record
        </p>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0F2557] nav-font leading-[1.05] tracking-tight">
              18+ ปีแห่งการ
              <br />
              <span className="text-[#F59E0B]">พิสูจน์ผลลัพธ์บนเวทีจริง</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
              ไม่ใช่แค่ทฤษฎีในห้องเรียน แต่คือประสบการณ์จากเวทีจริง องค์กรจริง และการแก้ปัญหาจริงของผู้บริหารและทีมงานกว่า 200+ องค์กร
            </p>
          </div>
        </div>

        {/* Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {credentials.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center">
                  {i === 0 ? <Award className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0F2557] nav-font">
                  {c.category}
                </h3>
              </div>

              <ul className="space-y-4">
                {c.items.map((item, j) => (
                  <li key={j} className="flex gap-3.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Client List Showcase */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B]" />
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest nav-font">
              ตัวอย่างองค์กรชั้นนำที่ไว้วางใจ
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clients.map((client, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:border-[#2563EB]/40 transition-colors"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  {client.type}
                </span>
                <p className="text-[#0F2557] text-sm font-black nav-font leading-snug">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
