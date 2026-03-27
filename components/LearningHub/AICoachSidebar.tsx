import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Sparkles, Send, X, BookOpen, Wand2, Star, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'workshop' | 'action-plan';
}

interface AICoachSidebarProps {
  articleTitle: string;
  articleContent: string;
}

const AICoachSidebar: React.FC<AICoachSidebarProps> = ({ articleTitle, articleContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `สวัสดีครับ! ผมคือ AI Coach จาก CAP Vision ยินดีที่ได้คุยกับคุณเรื่อง "${articleTitle}" ครับ\n\nหัวข้อนี้เข้มข้นมาก อยากให้ผมช่วยเปลี่ยนเนื้อหานี้เป็น Workshop สำหรับทีม หรือสร้างแผนปฏิบัติงาน (Action Plan) ดีครับ?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response based on Multi-Agent logic
    setTimeout(() => {
      let aiContent = "น่าสนใจครับ! เดี๋ยผมลองประมวลผลให้ตามแนวทางของ CAP Vision นะครับ...";
      if (input.includes("workshop")) {
        aiContent = "จัดไปครับ! สำหรับเนื้อหานี้ ผมแนะนำ Workshop 60 นาที แบ่งเป็น 4 ช่วง: 1. Icebreaking (Insight Check) - 10 นาที 2. Group Discussion - 20 นาที 3. Co-creation Action - 20 นาที และ 4. Deep Reflection - 10 นาทีครับ";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiContent };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: 'Create Workshop', icon: <Wand2 className="w-3.5 h-3.5" />, value: 'ขอขั้นตอนการจัด workshop จากบทความนี้หน่อย' },
    { label: 'Summarize Key', icon: <Star className="w-3.5 h-3.5" />, value: 'ขอ 3 ประเด็นสำคัญของบทความนี้' },
    { label: 'Action Plan', icon: <Zap className="w-3.5 h-3.5" />, value: 'ช่วยสร้าง Action Plan 1 สัปดาห์ให้ที' }
  ];

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-50 group flex items-center gap-3 bg-[#0f3460] text-white p-4 pl-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-500"
      >
        <span className="text-xs font-black uppercase tracking-widest nav-font opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Talk to AI Coach</span>
        <div className="relative">
          <MessageSquare className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-[#0f3460]" />
        </div>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Actual Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[101] shadow-2xl transition-transform duration-500 ease-out border-l border-gray-100 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0f3460] rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#0f3460] uppercase nav-font tracking-tight">AI Intelligent Coach</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Online Experts</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-gray-200/50 rounded-xl transition-colors">
            <X className="text-gray-400 w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-6 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white font-medium rounded-tr-none' 
                  : 'bg-[#f0f4f8] text-[#0f3460] font-medium rounded-tl-none'
              }`}>
                {msg.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}<br/></React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#f0f4f8] p-4 rounded-2xl rounded-tl-none flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer & Input */}
        <div className="p-8 bg-white border-t border-gray-50">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => { setInput(action.value); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-[10px] font-black text-blue-600 border border-blue-100/50 whitespace-nowrap hover:bg-blue-100 transition-colors nav-font uppercase tracking-tight"
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              placeholder="Ask anything about this article..."
              className="w-full bg-[#f8fafc] border-2 border-transparent focus:border-blue-100 focus:ring-0 rounded-2xl p-4 pr-16 text-sm font-medium text-gray-600 placeholder:text-gray-300 min-h-[50px] max-h-[150px] transition-all resize-none"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 bottom-3 p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 hover:scale-110 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-300 mt-4 nav-font uppercase tracking-widest flex items-center justify-center gap-1.5">
            <BookOpen className="w-3 h-3" /> Based on CAP Vision Knowledge Hub
          </p>
        </div>
      </div>
    </>
  );
};

export default AICoachSidebar;
