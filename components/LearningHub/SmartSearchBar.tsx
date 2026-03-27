import React, { useState, useEffect } from 'react';
import { Search, Sparkles, MessageSquare, Zap, Target } from 'lucide-react';

interface SmartSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const COACH_PLACEHOLDERS = [
  "คุณอยากพัฒนาทักษะอะไรวันนี้?",
  "อยากออกแบบ Workshop เรื่องอะไรดีครับ?",
  "ช่วยสรุปบทความที่เกี่ยวกับ Leadership ให้หน่อย",
  "ทักษะไหนที่จะช่วยให้ทีมคุณเติบโตได้เร็วขึ้น?",
  "ค้นหาเครื่องมือช่วยสอน (Facilitation Tools)..."
];

const SmartSearchBar: React.FC<SmartSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFocused) {
        setPlaceholderIndex((prev) => (prev + 1) % COACH_PLACEHOLDERS.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-amber-500/20 blur-2xl rounded-[2.5rem] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className={`relative flex items-center bg-white rounded-[2rem] p-2 pr-4 shadow-xl border-2 transition-all duration-300 ${isFocused ? 'border-[#1D4ED8] ring-4 ring-blue-50' : 'border-gray-100 group-hover:border-blue-100'}`}>
          <div className="flex-grow relative overflow-hidden pl-6">
            <Search className={`w-6 h-6 absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? 'text-[#1D4ED8]' : 'text-gray-300'}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full py-4 pl-10 pr-4 bg-transparent border-none focus:ring-0 text-lg font-bold text-[#0f3460] placeholder:text-gray-300 transition-all font-sans"
              placeholder={COACH_PLACEHOLDERS[placeholderIndex]}
            />
          </div>
          
          <button 
            type="submit"
            className="flex items-center gap-2 bg-[#1D4ED8] text-white px-8 py-3.5 rounded-2xl font-black nav-font tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-100"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">Ask AI Guru</span>
          </button>
        </div>

        {/* Quick Suggest Topics */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-4 p-6 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 animate-slide-up">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Popular Transformations</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Facilitation Skills', icon: <Zap className="w-3.5 h-3.5" />, color: 'text-amber-500 bg-amber-50' },
                { name: 'People Development', icon: <Target className="w-3.5 h-3.5" />, color: 'text-blue-500 bg-blue-50' },
                { name: 'Mindset Shift', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'text-purple-500 bg-purple-50' },
                { name: 'Workshop Design', icon: <MessageSquare className="w-3.5 h-3.5" />, color: 'text-green-500 bg-green-50' }
              ].map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => { setQuery(topic.name); onSearch(topic.name); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 ${topic.color}`}
                >
                  {topic.icon} {topic.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SmartSearchBar;
