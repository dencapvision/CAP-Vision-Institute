import React, { useState } from 'react';
import { Eye, BookOpen, Layers, Lightbulb, CheckCircle2, ChevronRight, Edit2, Plus, Download, Globe, Save } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  content: string;
  workshop: string;
  outcome: string;
}

interface CoursePreviewProps {
  data: {
    title: string;
    description: string;
    modules: Module[];
    activities: string[];
    objectives: string[];
  } | null;
  isLoading?: boolean;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ data, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'activities'>('overview');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);

  if (isLoading) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-gray-100 flex flex-col items-center justify-center min-h-[500px] text-center">
        <div className="w-16 h-16 border-4 border-blue-50 border-t-[#1D4ED8] rounded-full animate-spin mb-6" />
        <h3 className="text-2xl font-black text-[#0f3460] nav-font mb-2">AI is building your course...</h3>
        <p className="text-gray-400 font-medium">Crafting the 6D Learning Flow according to CAP-Vision standards.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-50 rounded-[2.5rem] p-12 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[500px] text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
          <Eye className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-400 mb-2">No Course Generated Yet</h3>
        <p className="text-gray-400 max-w-xs">Fill in the form on the left and click "Generate" to see the magic happen.</p>
      </div>
    );
  }

  const selectedModule = data.modules.find(m => m.id === selectedModuleId);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 min-h-[600px] relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-gray-50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-50 text-[#1D4ED8] text-[10px] font-black uppercase tracking-widest rounded-lg">Draft Course</span>
              <span className="text-gray-300 font-light">•</span>
              <span className="text-xs text-gray-400 font-medium">Kruden Master Fa Template</span>
            </div>
            <h2 className="text-3xl font-black text-[#0f3460] nav-font leading-[1.1]">{data.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-all">
              <Download className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-bold nav-font transition-all hover:scale-105 shadow-lg shadow-blue-100">
              <Globe className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl mb-8 w-fit">
          {(['overview', 'modules', 'activities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-white text-[#1D4ED8] shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100/50">
                <h4 className="text-sm font-black text-[#1D4ED8] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Description
                </h4>
                <p className="text-gray-600 leading-relaxed font-medium">{data.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-100 p-6 rounded-3xl">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Core Objectives</h4>
                  <ul className="space-y-3">
                    {data.objectives.map((obj, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Module Flow (6D) */}
              <div className="md:col-span-4 space-y-3">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Learning Flow (6D)</h4>
                {data.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModuleId(module.id)}
                    className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all border ${
                      selectedModuleId === module.id
                        ? 'bg-blue-50 border-blue-200 text-[#1D4ED8] shadow-sm ring-1 ring-blue-200'
                        : 'bg-white border-transparent text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        selectedModuleId === module.id ? 'bg-[#1D4ED8] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {module.id}
                      </span>
                      <span className="text-[13px] font-black uppercase tracking-wide">{module.title.split(':')[0]}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedModuleId === module.id ? 'rotate-90' : 'opacity-20'}`} />
                  </button>
                ))}
              </div>

              {/* Module Detail Panel */}
              <div className="md:col-span-8 bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-100 animate-slide-up">
                {selectedModule && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-black text-[#0f3460] nav-font">{selectedModule.title}</h4>
                      <button className="flex items-center gap-2 text-[#1D4ED8] bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-blue-50">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-[#1D4ED8] uppercase tracking-widest flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5" /> Content Scope
                        </h5>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{selectedModule.content}</p>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-[#F59E0B] uppercase tracking-widest flex items-center gap-2">
                          <Plus className="w-3.5 h-3.5" /> Workshop Activity
                        </h5>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-50/50">
                          <p className="text-sm text-gray-700 font-bold mb-2">💡 Facilitation Idea:</p>
                          <p className="text-sm text-gray-600 font-medium leading-relaxed">{selectedModule.workshop}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
                          <Star className="w-3.5 h-3.5" /> Module Outcome
                        </h5>
                        <p className="text-sm text-gray-600 font-black italic">{selectedModule.outcome}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.activities.map((act, i) => (
                <div key={i} className="bg-white border border-gray-100 p-6 rounded-3xl flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-1">Activity {i + 1}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{act}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-md px-8 py-4 rounded-[2rem] border border-white/20 shadow-lg sticky bottom-4">
        <p className="text-xs font-medium text-gray-400 italic">Auto-saved to draft items at {new Date().toLocaleTimeString()}</p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-gray-500 font-bold text-sm px-6 py-2 hover:bg-white/50 rounded-xl transition-all">
             Save Draft
          </button>
          <button className="flex items-center gap-2 bg-[#1D4ED8] text-white px-8 py-3 rounded-2xl font-black nav-font tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-100">
             <Save className="w-4 h-4" /> Save to CMS
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
