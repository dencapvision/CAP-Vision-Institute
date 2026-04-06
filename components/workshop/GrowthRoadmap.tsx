import React from 'react';
import { GrowthRoadmapState } from '../../types';
import { Sparkles, Brain, Target, Compass, Award } from 'lucide-react';

interface Props {
  data: GrowthRoadmapState;
  onChange: (newData: Partial<GrowthRoadmapState>) => void;
  onGenerateAI: () => void;
  onGenerateRowAI: (index: number) => void;
  isGenerating?: boolean;
  rowGenerating?: number | null;
}

export const GrowthRoadmap: React.FC<Props> = ({ 
  data, onChange, onGenerateAI, onGenerateRowAI, isGenerating, rowGenerating 
}) => {
  const updatePlan = (index: number, field: string, value: any) => {
    const newPlans = [...data.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    onChange({ plans: newPlans });
  };

  return (
    <div className="bg-white p-6 md:p-10 w-full max-w-[210mm] min-h-[297mm] mx-auto card-premium flex flex-col relative overflow-hidden text-[#0f3460] printable-area border-0 shadow-2xl">
      {/* Header Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0f3460] via-[#c5a059] to-[#0f3460]"></div>

      {/* Header Section */}
      <div className="border-b-2 border-gray-100 pb-6 mb-8 mt-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] tracking-tight uppercase nav-font flex items-center gap-3">
              <Compass className="w-8 h-8 text-[#c5a059]" />
              My Growth Roadmap
            </h1>
            <p className="text-[#c5a059] font-bold text-sm nav-font ml-11">เข็มทิศนำทางสู่ความสำเร็จและการเติบโตอย่างก้าวกระโดด</p>
          </div>
          <button 
            onClick={onGenerateAI} 
            disabled={isGenerating} 
            className="no-print group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#0f3460] to-[#16213e] text-white text-[12px] font-black rounded-full hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 nav-font border border-white/10 active:scale-95"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                AI กำลังวางแผน...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059] animate-pulse" />
                ✨ AI แนะนำแผนการเติบโต
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-8 gap-6 text-sm font-bold nav-font">
          <div className="flex items-center gap-3 flex-1 border-b border-gray-50 pb-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">OWNER:</span>
            <input 
              className="flex-1 bg-transparent outline-none text-[#0f3460] placeholder:text-gray-200" 
              value={data.name} 
              onChange={e => onChange({ name: e.target.value })} 
              placeholder="ระบุชื่อ-นามสกุลของคุณ"
            />
          </div>
          <div className="flex items-center gap-3 flex-1 border-b border-gray-50 pb-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">TEAM:</span>
            <input 
              className="flex-1 bg-transparent outline-none text-[#0f3460] placeholder:text-gray-200" 
              value={data.team} 
              onChange={e => onChange({ team: e.target.value })} 
              placeholder="ระบุชื่อแผนก/ทีม"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Left Side: Current State */}
        <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:bg-white hover:shadow-md">
          <h2 className="text-[11px] font-black text-gray-400 uppercase mb-5 flex items-center gap-2 tracking-[0.2em] nav-font">
            <Brain className="w-4 h-4 text-[#0f3460]" />
            CURRENT ME (สะท้อนตนเอง)
          </h2>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#0f3460] uppercase pl-1 opacity-60">My Strengths (จุดแข็งที่ฉันภูมิใจ):</label>
              <textarea 
                className="w-full text-[13px] bg-white border border-gray-100 rounded-2xl p-4 outline-none h-24 resize-none leading-relaxed transition-all focus:border-[#c5a059] focus:shadow-md font-medium" 
                value={data.strengths.join('\n')} 
                onChange={e => onChange({ strengths: e.target.value.split('\n') })} 
                placeholder="• พิมพ์จุดแข็งของคุณที่นี่ (บรรทัดละ 1 ข้อ)" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#c14c4c] uppercase pl-1 opacity-60">My Gaps (สิ่งที่ต้องติดอาวุธเพิ่ม):</label>
              <textarea 
                className="w-full text-[13px] bg-white border border-gray-100 rounded-2xl p-4 outline-none h-24 resize-none leading-relaxed transition-all focus:border-[#c14c4c]/30 focus:shadow-md font-medium" 
                value={data.gaps.join('\n')} 
                onChange={e => onChange({ gaps: e.target.value.split('\n') })} 
                placeholder="• พิมพ์สิ่งที่ต้องการพัฒนาเพิ่มที่นี่" 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Future Target */}
        <div className="bg-gradient-to-br from-white to-[#f0f4ff]/30 p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <h2 className="text-[11px] font-black text-[#c5a059] uppercase mb-5 flex items-center gap-2 tracking-[0.2em] nav-font">
            <Target className="w-4 h-4" />
            90-DAY FOCUS (เป้าหมายระยะสั้น)
          </h2>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#0f3460] uppercase pl-1 opacity-60">Main Goal (เป้าหมายสูงสุดใน 3 เดือน):</label>
              <textarea 
                className="w-full text-sm font-black text-[#0f3460] bg-white border border-gray-100 rounded-2xl p-4 outline-none h-24 resize-none leading-relaxed transition-all focus:border-[#c5a059] focus:shadow-md placeholder:font-medium placeholder:opacity-30" 
                value={data.mainGoal} 
                onChange={e => onChange({ mainGoal: e.target.value })} 
                placeholder="เช่น ก้าวขึ้นเป็นหัวหน้าทีม, เรียนจบโปรเจกต์ X ให้สำเร็จ..." 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#0f3460] uppercase pl-1 opacity-60">How it Feels (ความรู้สึกเมื่อถึงเป้าหมาย):</label>
              <div className="relative">
                <input 
                  className="w-full text-[13px] bg-white border border-gray-100 rounded-full px-5 py-3 outline-none transition-all focus:border-[#c5a059] focus:shadow-md font-bold text-[#c5a059]" 
                  value={data.feeling} 
                  onChange={e => onChange({ feeling: e.target.value })} 
                  placeholder="ภูมิใจ, มั่นใจ, มีพลัง..." 
                />
                <Award className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow z-10 relative">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-black bg-[#0f3460] text-white px-6 py-2 rounded-xl uppercase tracking-widest nav-font shadow-lg">
            Action Plan
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-200 to-transparent"></div>
        </div>
        
        <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl bg-white">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#0f3460] text-white font-black text-[10px] uppercase tracking-widest nav-font">
                <th className="p-4 w-1/4 text-center border-r border-white/5">CORE GOAL</th>
                <th className="p-4 w-1/3 text-center border-r border-white/5">ACTION STEPS</th>
                <th className="p-4 text-center border-r border-white/5 uppercase">TIMELINE</th>
                <th className="p-4 text-center">SUPPORT NEEDED</th>
              </tr>
            </thead>
            <tbody className="font-medium text-gray-700">
              {data.plans.map((plan, idx) => (
                <tr key={idx} className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'}`}>
                  <td className="p-4 align-top border-r border-gray-50 font-black text-[#0f3460]">
                    <textarea 
                      className="w-full bg-transparent outline-none resize-none font-black text-[#c5a059]" 
                      rows={3} 
                      value={plan.goal} 
                      onChange={e => updatePlan(idx, 'goal', e.target.value)} 
                      placeholder="ด้านที่เน้น เช่น Mindset" 
                    />
                  </td>
                  <td className="p-4 align-top border-r border-gray-50 group relative">
                    <textarea 
                      className="w-full bg-transparent outline-none resize-none leading-relaxed" 
                      rows={5} 
                      value={plan.steps.join('\n')} 
                      onChange={e => updatePlan(idx, 'steps', e.target.value.split('\n'))} 
                      placeholder="1. ...&#10;2. ..." 
                    />
                    <button 
                      onClick={() => onGenerateRowAI(idx)} 
                      disabled={rowGenerating === idx} 
                      className="no-print absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 bg-[#c5a059] text-white text-[9px] px-3 py-1 rounded-full shadow-lg transition-all font-black uppercase flex items-center gap-1 active:scale-95"
                    >
                      {rowGenerating === idx ? '...' : <><Sparkles className="w-2.5 h-2.5" /> AI SUGGEST</>}
                    </button>
                  </td>
                  <td className="p-4 align-top border-r border-gray-50 italic">
                    <textarea 
                      className="w-full bg-transparent outline-none resize-none text-[11px]" 
                      rows={2} 
                      value={plan.timeline} 
                      onChange={e => updatePlan(idx, 'timeline', e.target.value)} 
                      placeholder="กำหนดการเริ่ม..." 
                    />
                  </td>
                  <td className="p-4 align-top bg-emerald-50/10">
                    <textarea 
                      className="w-full bg-transparent outline-none resize-none text-[11px]" 
                      rows={2} 
                      value={plan.support} 
                      onChange={e => updatePlan(idx, 'support', e.target.value)} 
                      placeholder="ทรัพยากรหรือพี่เลี้ยง..." 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-[#0f3460] to-[#16213e] text-white rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/10 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 rounded-full translate-x-20 -translate-y-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-[11px] font-black text-[#c5a059] mb-3 tracking-[0.4em] uppercase nav-font">My 1% Better Promise</h3>
            <p className="text-[15px] leading-relaxed italic font-medium opacity-90 border-l-[3px] border-[#c5a059] pl-6 py-2">
              "ฉันสัญญาว่าจะลงมือทำวันละนิดเพื่อการเติบโตที่ยั่งยืน แม้เพียง 1% ก็ดีกว่าไม่ขยับเลย ฉันจะไม่หยุดเรียนรู้และจะก้าวข้ามขีดจำกัดของตัวเองในทุกๆ วัน"
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-6 font-bold nav-font uppercase tracking-widest text-[10px]">
            <div className="border-b border-white/20 pb-1 w-full md:w-64">
              <span className="opacity-40">Your Signature</span>
            </div>
            <div className="border-b border-white/20 pb-1 w-full md:w-64">
              <span className="opacity-40">Commitment Date</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-10 text-[9px] text-gray-300 font-black uppercase tracking-[0.5em] nav-font opacity-60">
        Growth Mastery Workshop | CAP Vision Institute | DFA - Art of Growth
      </div>
    </div>
  );
};
