import React, { useState } from 'react';
import { Lightbulb, RotateCcw, ArrowRight, Save, Sparkles } from 'lucide-react';

interface ReflectionPanelProps {
  articleTitle: string;
}

const ReflectionPanel: React.FC<ReflectionPanelProps> = ({ articleTitle }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ insight: '', shift: '', action: '' });
  const [isSaved, setIsSaved] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Insight: คุณได้เรียนรู้อะไรจากบทความนี้?",
      placeholder: "พิมพ์สิ่งที่ 'ปิ๊งแว้บ' หรือความรู้ใหม่ที่ได้...",
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      field: 'insight' as const
    },
    {
      id: 2,
      title: "Reflection: มุมมองของคุณเปลี่ยนไปอย่างไร?",
      placeholder: "วิธีคิดเดิม VS วิธีคิดใหม่ที่ได้จากบทความ...",
      icon: <RotateCcw className="w-5 h-5 text-blue-500" />,
      field: 'shift' as const
    },
    {
      id: 3,
      title: "Action: พรุ่งนี้คุณจะลองทำอะไรที่ต่างจากเดิม?",
      placeholder: "ระบุ 1 การกระทำเล็กๆ ที่จะเริ่มทำทันที...",
      icon: <ArrowRight className="w-5 h-5 text-green-500" />,
      field: 'action' as const
    }
  ];

  const currentStep = steps[step - 1];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setIsSaved(true);
  };

  if (isSaved) {
    return (
      <div className="bg-[#f8fafc] border-2 border-green-100 rounded-[2.5rem] p-10 text-center animate-fade-in my-12 shadow-inner">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-100">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-[#0f3460] mb-2 nav-font uppercase tracking-tighter">Transformation Saved!</h3>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          เยี่ยมมากครับ "การเรียนรู้ที่ไม่มีการนำไปใช้ คือความว่างเปล่า" <br/>
          ทีมงาน CAP Vision ส่งกำลังใจให้คุณลงมือทำพรุ่งนี้ครับ!
        </p>
        <button 
          onClick={() => { setStep(1); setIsSaved(false); setAnswers({ insight: '', shift: '', action: '' }); }}
          className="mt-8 text-xs font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest nav-font"
        >
          Do it again
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-white border-2 border-gray-100 rounded-[3rem] p-10 md:p-14 my-16 shadow-2xl shadow-blue-50/50 overflow-hidden group">
      {/* Background Accent */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2 nav-font">Transformative Learning Panel</h4>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font leading-tight tracking-tighter">
              Time to Reflect & Action
            </h2>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? 'w-8 bg-blue-600' : 'w-2 bg-gray-100'}`} 
              />
            ))}
          </div>
        </div>

        <div className="bg-[#fcfdfe] border border-gray-100 rounded-[2rem] p-8 md:p-10 mb-8 min-h-[220px] transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-white rounded-xl shadow-sm">
              {currentStep.icon}
            </div>
            <h3 className="text-base font-bold text-[#0f3460]">{currentStep.title}</h3>
          </div>
          
          <textarea
            value={answers[currentStep.field]}
            onChange={(e) => setAnswers({ ...answers, [currentStep.field]: e.target.value })}
            className="w-full bg-transparent border-none focus:ring-0 text-gray-600 placeholder:text-gray-300 min-h-[100px] text-lg font-medium leading-relaxed resize-none"
            placeholder={currentStep.placeholder}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium text-gray-400 max-w-[240px]">
            *ข้อมูลนี้จะถูกบันทึกไว้เป็น Learning Journey ส่วนตัวของคุณในระบบ AI Coach
          </p>
          
          <button 
            onClick={handleNext}
            disabled={!answers[currentStep.field]}
            className={`flex items-center gap-2 py-4 px-10 rounded-2xl font-black nav-font tracking-widest transition-all shadow-lg ${
              !answers[currentStep.field] 
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                : 'bg-[#1D4ED8] text-white hover:scale-105 active:scale-95 shadow-blue-100'
            }`}
          >
            {step === 3 ? <Save className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            {step === 3 ? 'Save Reflection' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionPanel;
