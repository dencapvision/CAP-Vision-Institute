import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Sparkles, Send, X, BookOpen, Wand2, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { HRD_ARTICLES } from '../../constants/articles';
import { COURSES } from '../../constants/courses';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'workshop' | 'action-plan' | 'recommendation';
}

interface AICoachSidebarProps {
  articleTitle: string;
  articleContent: string;
}

const renderMessageContent = (content: string) => {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return (
      <React.Fragment key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-[#0f3460]">{part.slice(2, -2)}</strong>;
          } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
              const [, text, url] = match;
              return (
                <a key={j} href={url} className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1">
                  {text} <ArrowRight className="w-3 h-3" />
                </a>
              );
            }
          }
          return <span key={j}>{part}</span>;
        })}
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

const AICoachSidebar: React.FC<AICoachSidebarProps> = ({ articleTitle, articleContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `สวัสดีครับ! ผมคือ AI Guru จาก CAP Vision ยินดีที่ได้ร่วมทางในเส้นทางปัญญากับคุณเรื่อง "${articleTitle}" นะครับ 🎯\n\nเนื้อหาส่วนนี้มีพลังมากครับ อยากให้ผมช่วยสรุปประเด็นสำคัญ หรือขยายความส่วนไหนเพื่อให้คุณนำไปปรับใช้กับทีมได้ทันทีดีครับ?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateMasterFaResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // 1. Acknowledgment (Master Fa Style)
    let response = "เป็นคำถามที่มีมูลค่ามากและแสดงถึงความตั้งใจที่จะพัฒนาทีมอย่างแท้จริงครับ! 🌟\n\n";

    // 2. Core Logic (Summarization / Workshop / Action)
    if (q.includes("สรุป") || q.includes("ประเด็น") || q.includes("summarize")) {
      response += `จากเรื่อง "${articleTitle}" ผมสรุป 3 ประเด็นกระแทกใจ (Insight) มาให้ดังนี้ครับ:\n\n`;
      response += "1️⃣ **Mindset over Tool:** หัวใจสำคัญไม่ได้อยู่ที่เครื่องมือ แต่อยู่ที่การปรับมุมมองของผู้ปฏิบัติงาน\n";
      response += "2️⃣ **Agile Execution:** ความเร็วที่ปราศจากทิศทางคือความสูญเปล่า การโฟกัสที่ผลลัพธ์ (Outcome) สำคัญกว่ายอดงาน (Output)\n";
      response += "3️⃣ **Sustainable Growth:** การพัฒนาคนคือการลงทุนระยะยาวที่คุ้มค่าที่สุดขององค์กรครับ\n\n";
    } else if (q.includes("workshop") || q.includes("กิจกรรม") || q.includes("จัด")) {
      response += "สำหรับการจัด Workshop เรื่องนี้ ผมแนะนำโครงสร้าง 3 ช่วง (The Learning Loop) ครับ:\n\n";
      response += "📍 **ช่วงที่ 1 (Insight Check):** ให้ทีมแชร์ความท้าทายจริงที่เจอ\n";
      response += "📍 **ช่วงที่ 2 (Co-Creation):** ใช้เครื่องมือจากบทความมาลองแก้โจทย์นั้นร่วมกัน\n";
      response += "📍 **ช่วงที่ 3 (Reflection):** สะท้อนสิ่งที่ได้เรียนรู้และ Action ที่จะทำในพรุ่งนี้ครับ\n\n";
    } else {
      response += "น่าตื่นเต้นครับ! สำหรับประเด็นนี้ ผมมองว่าหัวใจสำคัญคือการทำให้คนในองค์กรเห็นภาพเป้าหมายเดียวกัน (Shared Vision) ครับ\n\n";
    }

    // 3. Resource Matching (Internal Links)
    const relatedArticle = HRD_ARTICLES.find(a => a.id !== articleTitle && (a.title.includes("HR") || a.title.includes("Future")));
    const relatedCourse = COURSES[0]; // Default to some high value course

    response += "💡 **ทรัพยากรที่ผมคัดสรรมาให้คุณเป็นพิเศษ:**\n";
    if (relatedArticle) {
      response += `- อ่านต่อเพื่อเจาะลึก: [${relatedArticle.title}](/resources/${relatedArticle.id})\n`;
    }
    response += `- หลักสูตรแนะนำ: [${relatedCourse.title}](/courses/${relatedCourse.id})\n\n`;

    // 4. Engagement Invitation
    response += "---\n";
    response += "🙌 **ชวนคุยต่อ:** หากคุณมีโจทย์เฉพาะทางหรือคำถามสำคัญที่อยากให้ทางทีมงานครูเด่นช่วยออกแบบโซลูชัน ติดต่อเราได้ทันทีนะครับ ทีมงานพร้อมเป็นคู่คิดทางปัญญาให้องค์กรคุณครับ\n";
    
    return response;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiContent = generateMasterFaResponse(userMsg.content);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiContent };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: 'สรุปประเด็นสำคัญ', icon: <Star className="w-3.5 h-3.5" />, value: 'ขอ 3 ประเด็นสำคัญจากเนื้อหานี้ในสไตล์ครูเด่นหน่อยครับ' },
    { label: 'แนะนำหลักสูตร', icon: <BookOpen className="w-3.5 h-3.5" />, value: 'มีหลักสูตรไหนที่เกี่ยวข้องกับเรื่องนี้ไหมครับ' },
    { label: 'ขอจัด Workshop', icon: <Wand2 className="w-3.5 h-3.5" />, value: 'อยากจัด Workshop เรื่องนี้ มีขั้นตอนแนะนำลำดับไหมครับ' }
  ];

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-[60] group flex items-center gap-3 bg-[#0f3460] text-white p-4 pl-6 rounded-full shadow-[0_10px_40px_rgba(15,52,96,0.3)] hover:bg-blue-900 transition-all hover:scale-105 active:scale-95 border border-white/10 cursor-pointer"
      >
        <span className="text-xs font-black uppercase tracking-widest nav-font opacity-0 w-0 md:group-hover:w-auto md:group-hover:opacity-100 transition-all duration-300 md:group-hover:mr-2 whitespace-nowrap overflow-hidden">Talk to AI Guru</span>
        <div className="relative">
          <MessageSquare className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00f2fe] rounded-full border-2 border-[#0f3460] animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00f2fe] rounded-full border-2 border-[#0f3460]" />
        </div>
      </button>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Actual Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#f8fafc] z-[101] shadow-2xl border-l border-gray-100 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0f3460] to-[#1a4a82] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/10 border border-white/10">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[15px] font-black text-[#0f3460] uppercase nav-font tracking-tight">AI Guru</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Master Fa Persona</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-grow p-6 py-8 overflow-y-auto space-y-6 scrollbar-hide bg-[#f8fafc]">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} transition-all`}
            >
              <div className={`max-w-[85%] p-5 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-[#0f3460] to-[#1a4a82] text-white font-medium rounded-[1.5rem] rounded-tr-sm' 
                  : 'bg-white text-gray-700 rounded-[1.5rem] rounded-tl-sm border border-gray-100/50'
              }`}>
                {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-gray-100 p-4 px-5 rounded-[1.5rem] rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 bg-[#0f3460]/40 rounded-full animate-bounce" 
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Engagement Banner (LINE OA) */}
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00B900] flex items-center justify-center text-white shadow-md shadow-green-200">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 tracking-tight">ปรึกษาทีมงานผู้ออกแบบ</span>
              <span className="text-[11px] text-gray-500 font-medium">เราพร้อมเป็นคู่คิดให้องค์กรคุณ</span>
            </div>
          </div>
          <a 
            href="https://lin.ee/zRTBF6K" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#00B900] hover:bg-[#00a000] text-white text-[12px] font-bold rounded-full transition-transform hover:scale-105 shadow-sm shadow-green-200 flex items-center gap-1.5 cursor-pointer"
          >
            เพิ่มเพื่อน <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Footer & Input */}
        <div className="p-5 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => { setInput(action.value); }}
                className="snap-start flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-50/50 text-[11px] font-bold text-[#0f3460] border border-[#0f3460]/10 whitespace-nowrap hover:bg-[#0f3460] hover:text-white transition-all nav-font tracking-tight group cursor-pointer"
              >
                <span className="group-hover:scale-110 transition-transform">{action.icon}</span> {action.label}
              </button>
            ))}
          </div>
          
          <div className="relative flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              placeholder="พิมพ์ข้อความที่นี่..."
              className="w-full bg-[#f8fafc] border border-gray-200 focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460] rounded-2xl p-3.5 pr-12 text-sm text-gray-700 placeholder:text-gray-400 min-h-[52px] max-h-[120px] transition-all resize-none shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 bottom-2 p-2.5 bg-[#0f3460] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl hover:bg-blue-900 transition-colors shadow-md shadow-blue-900/20 disabled:shadow-none cursor-pointer"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICoachSidebar;
