import React from 'react';
import { Users, Zap, Layout, Target, BookOpen, Video, FileDown } from 'lucide-react';

interface LearningPathFilterProps {
  activePath: string;
  onPathChange: (path: string) => void;
}

export const LEARNING_PATHS = [
  { id: 'leadership', name: 'Leadership', icon: <Users className="w-4 h-4" />, description: 'ทักษะผู้นำและการบริหารคน' },
  { id: 'facilitation', name: 'Facilitation', icon: <Zap className="w-4 h-4" />, description: 'ศิลปะการจัดกระบวนการเรียนรู้' },
  { id: 'transformation', name: 'Transformation', icon: <Layout className="w-4 h-4" />, description: 'การนำการเปลี่ยนแปลงในองค์กร' },
  { id: 'hr_strategy', name: 'HR Strategy', icon: <Target className="w-4 h-4" />, description: 'กลยุทธ์ HR ยุคใหม่' }
];

const LearningPathFilter: React.FC<LearningPathFilterProps> = ({ activePath, onPathChange }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {LEARNING_PATHS.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => onPathChange(path.id)}
            className={`group relative flex flex-col items-start p-6 rounded-[2.5rem] border-2 transition-all w-full md:w-64 cursor-pointer ${
              activePath === path.id
                ? 'bg-[#0f3460] border-[#0f3460] text-white shadow-2xl scale-105 z-10'
                : 'bg-white border-gray-100 text-[#0f3460] hover:border-blue-100 hover:shadow-xl'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
              activePath === path.id ? 'bg-blue-500/20' : 'bg-blue-50'
            }`}>
              <div className={activePath === path.id ? 'text-blue-200' : 'text-blue-600'}>
                {path.icon}
              </div>
            </div>
            
            <h3 className="text-sm font-black uppercase tracking-widest mb-1 nav-font">{path.name}</h3>
            <p className={`text-[10px] font-medium text-left leading-relaxed ${
              activePath === path.id ? 'text-blue-100/60' : 'text-gray-400'
            }`}>
              {path.description}
            </p>

            {/* Active Indicator */}
            {activePath === path.id && (
              <div className="absolute top-4 right-6">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Legacy Filter Placeholder */}
      <div className="flex justify-center gap-10 mt-12 py-6 border-y border-gray-100/50">
        {[
          { id: 'video', label: 'Micro-learning', icon: <Video className="w-4 h-4" /> },
          { id: 'article', label: 'Insight Articles', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'download', label: 'Toolkits', icon: <FileDown className="w-4 h-4" /> }
        ].map((item) => (
          <button 
            key={item.id} 
            type="button"
            className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#0f3460] transition-colors uppercase tracking-[0.2em] nav-font cursor-pointer"
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LearningPathFilter;
