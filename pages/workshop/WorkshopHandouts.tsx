import React, { useState, useEffect } from 'react';
import { WheelOfLife } from '../../components/workshop/WheelOfLife';
import { GrowthRoadmap } from '../../components/workshop/GrowthRoadmap';
import { SlideDeck } from '../../components/workshop/SlideDeck';
import { WheelData, GrowthRoadmapState, WorksheetType } from '../../types';
import { 
  FileText, 
  Settings, 
  Download, 
  Sparkles, 
  ChevronRight, 
  LineChart, 
  Map, 
  Presentation,
  Save,
  Trash2,
  Share2
} from 'lucide-react';

const INITIAL_WHEEL_DATA: WheelData = {
  career: 5,
  finance: 5,
  health: 5,
  family: 5,
  love: 5,
  growth: 5,
  leisure: 5,
  contribution: 5,
};

const INITIAL_ROADMAP_DATA: GrowthRoadmapState = {
  name: '',
  team: '',
  strengths: [''],
  gaps: [''],
  mainGoal: '',
  feeling: '',
  plans: [
    { goal: 'ด้าน Mindset', steps: [''], timeline: 'เดือนที่ 1', support: '' },
    { goal: 'ด้าน Skillset', steps: [''], timeline: 'เดือนที่ 2', support: '' },
    { goal: 'ด้าน Toolset', steps: [''], timeline: 'เดือนที่ 3', support: '' },
  ],
};

const WorkshopHandouts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorksheetType>('wheel');
  const [wheelData, setWheelData] = useState<WheelData>(INITIAL_WHEEL_DATA);
  const [roadmapData, setRoadmapData] = useState<GrowthRoadmapState>(INITIAL_ROADMAP_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rowGenerating, setRowGenerating] = useState<number | null>(null);

  const handleWheelChange = (newData: Partial<WheelData>) => {
    setWheelData(prev => ({ ...prev, ...newData }));
  };

  // Persistence
  useEffect(() => {
    const savedWheel = localStorage.getItem('cap_workshop_wheel');
    const savedRoadmap = localStorage.getItem('cap_workshop_roadmap');
    if (savedWheel) setWheelData(JSON.parse(savedWheel));
    if (savedRoadmap) setRoadmapData(JSON.parse(savedRoadmap));
  }, []);

  useEffect(() => {
    localStorage.setItem('cap_workshop_wheel', JSON.stringify(wheelData));
  }, [wheelData]);

  useEffect(() => {
    localStorage.setItem('cap_workshop_roadmap', JSON.stringify(roadmapData));
  }, [roadmapData]);

  const handleReset = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดใช่หรือไม่?')) {
      setWheelData(INITIAL_WHEEL_DATA);
      setRoadmapData(INITIAL_ROADMAP_DATA);
      localStorage.removeItem('cap_workshop_wheel');
      localStorage.removeItem('cap_workshop_roadmap');
    }
  };

  const generateAI = async (prompt: string) => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.text as string;
    } catch (error) {
      console.error("AI Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ AI กรุณาลองใหม่อีกครั้ง");
      return null;
    }
  };

  const handleGenerateFullRoadmap = async () => {
    setIsGenerating(true);
    const prompt = `
      คุณคือโค้ชด้าน Growth Mindset และ IDP (Individual Development Plan)
      ต้องการให้คุณช่วยร่างแผนการเติบโตสำหรับคนที่มีข้อมูลดังนี้:
      จุดแข็ง: ${roadmapData.strengths.join(', ')}
      สิ่งที่ต้องพัฒนา: ${roadmapData.gaps.join(', ')}
      เป้าหมายเมนหลัก: ${roadmapData.mainGoal}
      
      โปรดตอบกลับเป็น JSON เท่านั้น (Array ของ Object 3 ชิ้น) ตามรูปแบบนี้:
      [
        {"goal": "หัวข้อเป้าหมาย", "steps": ["ขั้นที่ 1", "ขั้นที่ 2"], "timeline": "ระยะเวลา", "support": "ทรัพยากรที่ต้องใช้"},
        ...
      ]
      ขอเป็นภาษาไทยที่ทรงพลังและทำได้จริง (Actionable) ห้ามมีข้อความอื่นนอกเหนือจาก JSON
    `;

    const response = await generateAI(prompt);
    if (response) {
      try {
        // More robust JSON extraction
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        const cleanJson = jsonMatch ? jsonMatch[0] : response.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (Array.isArray(parsed)) {
          setRoadmapData(prev => ({ ...prev, plans: parsed }));
        }
      } catch (e) {
        console.error("JSON Parse Error:", e);
        alert("AI ส่งข้อมูลมาในรูปแบบที่อ่านไม่ได้ กรุณาลองกด Suggest อีกครั้งครับ");
      }
    }
    setIsGenerating(false);
  };

  const handleGenerateRow = async (index: number) => {
    setRowGenerating(index);
    const goalType = roadmapData.plans[index].goal;
    const prompt = `
      แนะนำขั้นตอน Action Steps สำหรับเป้าหมาย: "${goalType}" 
      ภายใต้เป้าหมายหลักรวมคือ: "${roadmapData.mainGoal}"
      จุดแข็งที่มี: ${roadmapData.strengths.join(', ')}
      หัวข้อหลักที่เน้น: ${goalType}

      ตอบมาเป็นลิสต์ขั้นตอนสั้นๆ 3-5 ข้อ ภาษาไทย (เช่น 1. ... 2. ...)
    `;

    const response = await generateAI(prompt);
    if (response) {
      const steps = response.split('\n').filter(s => s.trim()).map(s => s.replace(/^\d+\.\s*/, '').trim());
      const newPlans = [...roadmapData.plans];
      newPlans[index] = { ...newPlans[index], steps };
      setRoadmapData(prev => ({ ...prev, plans: newPlans }));
    }
    setRowGenerating(null);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-24 pb-20 overflow-x-hidden">
      {/* Background Shapes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-[#0f3460]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[5%] left-[-10%] w-[35rem] h-[35rem] bg-[#c5a059]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#c5a059] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">Workshop Resource</span>
              <div className="h-[1px] w-12 bg-gray-200"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0f3460] tracking-tight nav-font leading-tight">
              GROWTH MASTERY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f3460] to-[#c5a059]">HANDOUTS & TOOLS</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 no-print animate-in fade-in slide-in-from-right-8 duration-700">
             <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-2xl text-xs font-bold text-gray-400 hover:text-red-500 hover:border-red-100 transition-all bg-white"
             >
               <Trash2 className="w-4 h-4" />
               Reset All
             </button>
             <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-[#0f3460] text-white rounded-2xl text-xs font-black shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all nav-font"
             >
               <Download className="w-4 h-4" />
               Export PDF / Print
             </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="no-print mb-12 flex flex-wrap gap-4 p-2 bg-white/50 backdrop-blur-md rounded-[2rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
           {[
             { id: 'wheel', label: 'Wheel of Harmony', icon: LineChart, desc: 'ประเมินสมดุลชีวิต 8 ด้าน' },
             { id: 'roadmap', label: 'Growth Roadmap', icon: Map, desc: 'วางแผนพัฒนาตนเอง 90 วัน' },
             { id: 'slides', label: 'Presentation Deck', icon: Presentation, desc: 'เนื้อหาหลักที่คุณสรุปได้' }
           ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as WorksheetType)}
              className={`flex-1 min-w-[240px] flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group ${
                activeTab === tab.id 
                ? 'bg-white shadow-xl border border-gray-100 scale-100' 
                : 'opacity-40 hover:opacity-100 hover:bg-white/40 scale-95'
              }`}
             >
               <div className={`p-3 rounded-xl transition-all duration-500 shadow-sm ${
                 activeTab === tab.id ? 'bg-[#0f3460] text-white rotate-0' : 'bg-gray-100 text-gray-400 -rotate-3 group-hover:rotate-0'
               }`}>
                 <tab.icon className="w-6 h-6" />
               </div>
               <div className="text-left">
                 <div className={`text-sm font-black nav-font tracking-wide uppercase transition-colors ${activeTab === tab.id ? 'text-[#0f3460]' : 'text-gray-500'}`}>
                   {tab.label}
                 </div>
                 <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{tab.desc}</div>
               </div>
               {activeTab === tab.id && (
                 <ChevronRight className="w-4 h-4 ml-auto text-[#c5a059]" />
               )}
             </button>
           ))}
        </div>

        {/* Content Display */}
        <div className="animate-in fade-in zoom-in-95 duration-1000 delay-300">
          {activeTab === 'wheel' && (
            <div className="flex flex-col items-center">
              <div className="no-print mb-10 p-6 bg-[#c5a059]/5 border border-[#c5a059]/10 rounded-3xl max-w-2xl text-center">
                <p className="text-sm font-bold text-[#0f3460]/80 leading-relaxed">
                  <span className="text-[#c5a059]">💡 คำแนะนำ:</span> ให้คะแนนตัวเองในทุกด้าน (1-10) เพื่อมองเห็น "ภาพที่แท้จริง" ของชีวิตคุณในปัจจุบัน 
                  เราไม่ได้เน้นความสมบูรณ์แบบ แต่เราเน้น "ความสมดุล"
                </p>
              </div>
              <WheelOfLife 
                data={wheelData} 
                onChange={handleWheelChange} 
                reflections={{ shape: '', missing: '', commitment: '' }} // Placeholder for now or add to state
                onReflectionChange={() => {}}
              />
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="flex flex-col items-center">
              <div className="no-print mb-10 p-6 bg-[#0f3460]/5 border border-[#0f3460]/10 rounded-3xl max-w-3xl text-center">
                <p className="text-sm font-bold text-[#0f3460]/80 leading-relaxed flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#c5a059]" />
                  คุณสามารถใช้ AI เพื่อช่วยร่างแผนการพัฒนา หรือปรับเปลี่ยนตามความต้องการได้ทันที
                </p>
              </div>
              <GrowthRoadmap 
                data={roadmapData} 
                onChange={(newData) => setRoadmapData(prev => ({ ...prev, ...newData }))}
                onGenerateAI={handleGenerateFullRoadmap}
                onGenerateRowAI={handleGenerateRow}
                isGenerating={isGenerating}
                rowGenerating={rowGenerating}
              />
            </div>
          )}

          {activeTab === 'slides' && (
            <div className="w-full flex justify-center">
              <SlideDeck />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="no-print mt-20 p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#0f3460] to-[#16213e] flex items-center justify-center shadow-xl p-5 border-4 border-white">
              <Save className="w-full h-full text-[#c5a059]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0f3460] nav-font uppercase tracking-tight">Auto-Save Enabled</h3>
              <p className="text-sm text-gray-400 font-medium max-w-md">ข้อมูลของคุณถูกเก็บไว้ในเบราว์เซอร์นี้โดยอัตโนมัติ คุณสามารถกลับมาทำต่อได้เสมอจนกว่าจะกดรีเซ็ต</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-xs font-bold text-[#0f3460] hover:bg-gray-50 transition-all">
              <Share2 className="w-4 h-4" />
              แชร์ผลลัพธ์
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#c5a059] text-white rounded-full text-xs font-black shadow-lg hover:shadow-xl transition-all uppercase tracking-widest nav-font">
              Get Certified
            </button>
          </div>
        </div>
      </div>

      {/* Global CSS for Print and Extra UI Elements */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .print-container { 
            padding: 0 !important; 
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
          }
          /* Force visibility for clipped or transparent text */
          h1, h2, h3, h4, h5, h6, .nav-font, [class*="bg-clip-text"] {
            background: none !important;
            -webkit-background-clip: initial !important;
            background-clip: initial !important;
            color: #0f3460 !important; /* Default dark navy for print */
            text-fill-color: #0f3460 !important;
            -webkit-text-fill-color: #0f3460 !important;
            opacity: 1 !important;
            text-shadow: none !important;
          }
          .text-[#c5a059], .text-[#ebd49d], .text-gold { color: #c5a059 !important; }
          
          .printable-area { 
            box-shadow: none !important; 
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .card-premium { border: 1px solid #eee !important; box-shadow: none !important; }
          .page-break { page-break-after: always; }
        }
        
        .nav-font {
          font-family: 'Inter', 'Sarabun', sans-serif;
        }

        .bg-gold-gradient {
          background: linear-gradient(135deg, #c5a059 0%, #ebd49d 100%);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #c5a05933;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #c5a059;
          transition: all 0.3s;
        }
      `}} />
    </div>
  );
};

export default WorkshopHandouts;
