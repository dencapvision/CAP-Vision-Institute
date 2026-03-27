import React from 'react';
import { Lightbulb, Plus, Zap, CheckCircle2 } from 'lucide-react';

interface Suggestion {
  title: string;
  description: string;
}

const SUGGESTIONS: Suggestion[] = [
  { title: 'Growth Mindset for Teams', description: 'โฟกัสที่การปรับทัศนคติเมื่อเผชิญกับการเปลี่ยนแปลง' },
  { title: 'Design Thinking Workspace', description: 'ใช้กระบวนการคิดเชิงออกแบบเพื่อสร้างนวัตกรรมในองค์กร' },
  { title: 'Agile Workplace Culture', description: 'สร้างทีมที่พร้อมรับมือกับความเร็วและความซับซ้อน' },
];

const SmartSuggest: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2 px-1">
        <Zap className="w-4 h-4 text-[#F59E0B]" />
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Smart Suggest (AI Assist)</h4>
      </div>
      
      <div className="space-y-4">
        {SUGGESTIONS.map((s, i) => (
          <div key={i} className="group bg-white p-6 rounded-[2rem] border border-gray-100/50 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-full -mr-8 -mt-8 group-hover:bg-blue-50/50 transition-all" />
            
            <div className="relative z-10">
              <h5 className="text-sm font-black text-[#0f3460] mb-2 flex items-center justify-between">
                {s.title}
                <Plus className="w-4 h-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
              </h5>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-[#1D4ED8] to-blue-600 p-6 rounded-[2.5rem] shadow-lg shadow-blue-100 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mb-12 -mr-12" />
        <div className="relative z-10">
          <h5 className="text-white font-black nav-font mb-2">Need a Custom Idea?</h5>
          <p className="text-blue-100/80 text-[11px] leading-relaxed mb-4">Tell us more about your team's current dynamic and we'll suggest a custom path.</p>
          <button className="w-full bg-white text-[#1D4ED8] text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-blue-50 transition-all">
             Ask AI Coach
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggest;
