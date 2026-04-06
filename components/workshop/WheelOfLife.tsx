import React from 'react';
import { RadarChart } from './RadarChart';
import { WheelData } from '../../types';

interface Props {
  data: WheelData;
  onChange: (newData: Partial<WheelData>) => void;
  reflections: {
    shape: string;
    missing: string;
    commitment: string;
  };
  onReflectionChange: (key: string, val: string) => void;
}

const labels = [
  'การงาน', 'การเงิน', 'สุขภาพ', 'ครอบครัว',
  'ความสัมพันธ์', 'พัฒนาตนเอง', 'การพักผ่อน', 'จิตวิญญาณ'
];

export const WheelOfLife: React.FC<Props> = ({ data, onChange, reflections, onReflectionChange }) => {
  const scores = [
    data.career, data.finance, data.health, data.family,
    data.love, data.growth, data.leisure, data.contribution
  ];

  const handleScoreChange = (key: keyof WheelData, val: string) => {
    const num = Math.min(10, Math.max(0, parseInt(val) || 0));
    onChange({ [key]: num });
  };

  return (
    <div className="bg-white p-6 md:p-10 w-full max-w-[210mm] min-h-[297mm] mx-auto card-premium flex flex-col relative overflow-hidden text-[#0f3460] printable-area border-0 shadow-2xl">
      {/* Premium Header Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#c5a059]/10 to-transparent rounded-bl-full -z-0 no-print pointer-events-none"></div>
      
      {/* Branding & Header */}
      <div className="border-b-2 border-[#c5a059] pb-6 mb-8 z-10 relative">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] tracking-tight uppercase nav-font">
              The Wheel of Harmony
            </h1>
            <p className="text-[#c5a059] font-bold text-sm md:text-base nav-font">วงล้อแห่งความสมดุลและความสุขที่ยั่งยืน</p>
          </div>
          <div className="text-right no-print hidden md:block">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Workshop Handout</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-6 gap-4 text-sm font-bold nav-font">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-1 md:pb-0">
            <span className="opacity-60">NAME:</span>
            <input type="text" placeholder="ระบุชื่อของคุณที่นี่..." className="focus:outline-none w-64 bg-transparent text-[#0f3460] placeholder:opacity-30" />
          </div>
          <div className="flex items-center gap-2 border-b border-gray-100 pb-1 md:pb-0">
            <span className="opacity-60">DATE:</span>
            <input type="text" placeholder="วว/ดด/ปป" className="focus:outline-none w-32 bg-transparent text-[#0f3460] placeholder:opacity-30 text-right" />
          </div>
        </div>
        <p className="italic text-gray-400 mt-4 text-[11px] font-medium leading-relaxed">
          "Life is like riding a bicycle. To keep your balance, you must keep moving." — Albert Einstein
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-grow relative z-10">
        {/* Left Side: Assessment */}
        <div className="flex flex-col space-y-6">
          <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <h2 className="text-base font-black bg-[#0f3460] text-white px-4 py-1.5 inline-block rounded-lg mb-3 shadow-md nav-font">
              PART 1: ASSESSMENT
            </h2>
            <p className="text-[12px] text-gray-500 mb-5 leading-relaxed font-medium">
              คำชี้แจง: ให้คะแนนความพึงพอใจในแต่ละด้าน (0 = ไม่พอใจเลย, 10 = พอใจมากที่สุด) วงล้อจะปรับเปลี่ยนตามคะแนนที่คุณระบุ
            </p>
            
            <ul className="space-y-3.5">
              {[
                { key: 'career', label: '1. การงาน (Career & Passion)', desc: 'ความพึงพอใจในหน้าที่การงาน' },
                { key: 'finance', label: '2. การเงิน (Finances)', desc: 'สถานะทางการเงินและความมั่นคง' },
                { key: 'health', label: '3. สุขภาพ (Health & Vitality)', desc: 'พลังกาย พลังใจ และการดูแลตัวเอง' },
                { key: 'family', label: '4. ครอบครัว (Family)', desc: 'เวลาและความสัมพันธ์กับคนในบ้าน' },
                { key: 'love', label: '5. ความรัก/ความสัมพันธ์ (Relationships)', desc: 'คู่ชีวิต เพื่อน และคนรอบข้าง' },
                { key: 'growth', label: '6. การพัฒนาตนเอง (Personal Growth)', desc: 'การเรียนรู้และยกระดับ Mindset' },
                { key: 'leisure', label: '7. การพักผ่อน (Fun & Recreation)', desc: 'งานอดิเรกและการเติมพลังชีวิต' },
                { key: 'contribution', label: '8. จิตวิญญาณ/การแบ่งปัน (Spiritual)', desc: 'ความสงบใจและการเป็นผู้ให้' },
              ].map((item) => (
                <li key={item.key} className="group">
                  <div className="flex justify-between items-center mb-0.5">
                    <strong className="text-[13px] font-bold text-[#0f3460] group-hover:text-[#c5a059] transition-colors">{item.label}</strong>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="number" 
                        min="0" max="10" 
                        value={data[item.key as keyof WheelData] || ''} 
                        onChange={(e) => handleScoreChange(item.key as keyof WheelData, e.target.value)}
                        className="w-12 h-8 text-center bg-white border border-gray-100 rounded-lg focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/10 outline-none text-sm font-black text-[#c5a059] shadow-sm transition-all no-appearance-inner"
                      />
                      <span className="text-[11px] font-bold text-gray-300">/10</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium opacity-80">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 mt-auto flex justify-center items-center">
             <div className="relative p-8 bg-white rounded-full shadow-inner border border-gray-50 group">
                <div className="absolute inset-0 bg-[#c5a059]/5 rounded-full scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                <RadarChart data={scores} labels={labels} size={280} />
             </div>
          </div>
        </div>

        {/* Right Side: Reflection */}
        <div className="flex flex-col space-y-8">
          <div className="relative">
            <h2 className="text-base font-black bg-[#c5a059] text-white px-4 py-1.5 inline-block rounded-lg self-start shadow-md nav-font">
              PART 2: DEEP REFLECTION
            </h2>
          </div>
          
          <div className="space-y-2 group">
            <h3 className="font-black text-[14px] text-[#0f3460] flex items-center gap-2">
              <span className="w-6 h-6 bg-[#0f3460]/5 rounded-full flex items-center justify-center text-[10px] text-[#c5a059]">1</span>
              The Shape (รูปร่างของชีวิต)
            </h3>
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed pl-8">
              ถ้าเปรียบชีวิตเป็นรถยนต์ วงล้อรูปร่างนี้จะพาคุณพุ่งทะยานไปข้างหน้าได้ราบรื่นและมั่นคงเพียงใด?
            </p>
            <textarea 
              value={reflections.shape}
              onChange={(e) => onReflectionChange('shape', e.target.value)}
              placeholder="บันทึกความรู้สึกของคุณหลังจากเห็นรูปวงล้อ..."
              className="w-full h-28 p-4 text-[13px] font-medium bg-gray-50/30 border border-gray-100 rounded-2xl focus:border-[#c5a059] focus:bg-white focus:shadow-lg outline-none resize-none transition-all placeholder:opacity-40"
            />
          </div>

          <div className="space-y-2 group">
            <h3 className="font-black text-[14px] text-[#0f3460] flex items-center gap-2">
              <span className="w-6 h-6 bg-[#0f3460]/5 rounded-full flex items-center justify-center text-[10px] text-[#c5a059]">2</span>
              The Missing Piece (สิ่งที่ขาดหาย)
            </h3>
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed pl-8">
              ด้านใดที่คุณ "ละเลย" มานานที่สุด? และถ้าด้านนี้ดีขึ้นเล็กน้อย จะส่งผลต่อเป้าหมายใหญ่ของคุณอย่างไร?
            </p>
            <textarea 
              value={reflections.missing}
              onChange={(e) => onReflectionChange('missing', e.target.value)}
              placeholder="ด้านที่อยากเติมเต็มคือ... เพราะ..."
              className="w-full h-28 p-4 text-[13px] font-medium bg-gray-50/30 border border-gray-100 rounded-2xl focus:border-[#c5a059] focus:bg-white focus:shadow-lg outline-none resize-none transition-all placeholder:opacity-40"
            />
          </div>

          <div className="space-y-3 p-6 bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-[2rem] border border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#c5a059]/10 rounded-full blur-xl transition-all group-hover:scale-150"></div>
            <h3 className="font-black text-[15px] text-white flex items-center gap-2 nav-font">
              <span className="text-[#c5a059]">★</span> My Active Commitment
            </h3>
            <p className="text-[11px] text-gray-300 font-medium leading-relaxed italic border-l-2 border-[#c5a059] pl-3">
              "เพื่อให้วงล้อเริ่มขยับได้อีกครั้ง 1 สิ่งเล็กๆ ที่ฉันจะเริ่มทำตั้งแต่วันพรุ่งนี้ คือ..."
            </p>
            <textarea 
              value={reflections.commitment}
              onChange={(e) => onReflectionChange('commitment', e.target.value)}
              placeholder="ฉะนจะเริ่มทำ..."
              className="w-full h-24 p-3 text-[14px] font-black text-[#c5a059] border border-white/5 bg-white/5 rounded-xl focus:border-[#c5a059] focus:bg-white/10 outline-none resize-none transition-all placeholder:text-[#c5a059]/30 italic"
            />
          </div>

          {/* Premium Footer */}
          <div className="mt-auto pt-8 text-center no-print">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent w-full mb-4"></div>
            <p className="text-[9px] font-black text-gray-300 tracking-[0.3em] uppercase nav-font">
              Growth Mastery Handouts | CAP Vision Institute 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
