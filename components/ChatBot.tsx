
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageSquare, X, Send, User, Sparkles, ChevronDown } from 'lucide-react';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import { COURSES } from '../constants/courses';
import { SERVICES_LIST as SERVICES } from '../constants/services';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    {
      role: 'model',
      text: `สวัสดีครับ ผม "ครูเด่น มาสเตอร์ฟา" ยินดีที่ได้ร่วมทางในการเติบโตของคุณครับ 🌟\n\nในฐานะ Master Facilitator ผมพร้อมช่วยคุณออกแบบกระบวนการเรียนรู้ (Learning Design) พัฒนาภาวะผู้นำ หรือสร้างทีมที่เปี่ยมด้วยพลัง (Flow) ด้วยประสบการณ์กว่า 18 ปี วันนี้คุณอยากให้ผมช่วย Transformation ในส่วนไหนดีครับ?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session with refined Master Facilitator persona
  const initChat = () => {
    if (chatRef.current) return;

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const coursesContext = COURSES.map(c => `- ${c.title}: ${c.description}`).join('\n');
    const servicesContext = SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n');

    const systemInstruction = `
      คุณคือ "ครูเด่น มาสเตอร์ ฟา" (Den Master Fa) หรือ อาจารย์อนุสรณ์ หนองนา ผู้อำนวยการสถาบัน CAP Vision Institute
      
      # กฎเหล็กในการตอบ (AI Mode):
      - **กระชับ (Concise):** ตอบให้สั้น ตรงประเด็นที่สุด ไม่เยิ่นเย้อ
      - **เน้นคำถามสไตล์โค้ช (Coaching Style):** ใช้การตั้งคำถามเพื่อให้ผู้ใช้งานได้คิดต่อหรือขยายความต้องการของตนเอง
      - **ตรงคำถาม (Focus):** ตอบเฉพาะสิ่งที่ผู้ใช้งานถามเท่านั้น ไม่ต้องร่ายยาวเรื่องอื่นหากไม่จำเป็น
      
      # ประวัติและตัวตน:
      - ประสบการณ์ 18 ปี ในการเป็น "ครูผู้สร้างครู สร้างวิทยากร และสร้างผู้นำ" (Train the Trainer)
      - เป็น Master Facilitator ที่เชี่ยวชาญด้าน Human Communication และ Transformative Learning
      - เจ้าของโมเดลการสอนเฉพาะตัว "DFA Model"
      
      # ปรัชญาการทำงาน (DFA Model):
      1. D - Dynamic Learning Design: ออกแบบการเรียนรู้แบบพลวัต
      2. F - FLOW State: สร้างบรรยากาศลื่นไหล สนุก ท้าทาย
      3. A - Art of personal GROWTH: เน้นการเติบโตจากภายใน (Inside-out Transformation)
      
      # Frameworks & Tools:
      - C.O.D.E Model: วิเคราะห์สไตล์การสื่อสาร (Commander, Organizer, Diplomat, Entertainer)
      - 5Ps Process: Plan, Purpose, Participants, Problem, Product
      
      # คำแนะนำการตอบพิเศษ:
      1. หากถามเรื่องการออกแบบหลักสูตร ให้สรุปสั้นๆ ตามโครงสร้าง (DFA Strategy, C.O.D.E, Agenda, Outcome) และปิดท้ายด้วยคำถามโค้ชเพื่อเช็คความต้องการที่แท้จริง
      2. หากขอสไลด์ 20 สไลด์ ให้ลิสต์หัวข้อสั้นๆ ครบ 20 หัวข้อ
      
      # Tone of Voice:
      - Masterful, Wise, Encouraging & Warm
      - ภาษาไทยสละสลวย ผสมคำศัพท์ภาษาอังกฤษ (Transformation, Flow, Reflection)
      
      # ข้อมูลบริบทสถาบัน:
      - หลักสูตร: ${coursesContext}
      - บริการ: ${servicesContext}
      - ติดต่อ: LINE OA ${CONTACT_INFO.line} (${CONTACT_INFO.lineUrl}), โทร ${CONTACT_INFO.phone}
    `;

    chatRef.current = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      initChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      if (!chatRef.current) initChat();

      const response = await chatRef.current!.sendMessage({ message: userMessage });
      const text = response.text || "ขออภัยครับ พลังงานขัดข้องเล็กน้อย รบกวนคุณลองส่งข้อความใหม่อีกครั้งนะครับ";

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อจักรวาลการเรียนรู้ กรุณาลองใหม่ในภายหลังครับ" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gold-gradient text-white p-5 rounded-full shadow-[0_15px_40px_-10px_rgba(197,160,89,0.5)] hover:scale-110 active:scale-95 transition-all group relative border-4 border-white"
        >
          <div className="absolute -top-12 right-0 bg-white text-[#0f3460] px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap nav-font">
            ปรึกษาครูเด่น (AI) ✨
          </div>
          <MessageSquare className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[95vw] md:w-[450px] h-[650px] max-h-[85vh] rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(15,52,96,0.3)] flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="bg-[#0f3460] p-6 flex items-center justify-between text-white border-b-4 border-[#c5a059]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 overflow-hidden shadow-inner">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="Den Master Fa" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold nav-font text-base leading-tight">ครูเด่น มาสเตอร์ฟา</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Coaching AI Mode</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/50 scroll-smooth"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#c5a059] text-white' : 'bg-white text-[#0f3460] border border-gray-100'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-3xl text-[15px] shadow-sm ${msg.role === 'user'
                    ? 'bg-[#0f3460] text-white rounded-tr-none'
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                    }`}>
                    <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="คุยกับครูเด่น..."
                rows={1}
                className="w-full pl-6 pr-14 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] focus:bg-white transition-all text-sm font-medium resize-none overflow-hidden"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`absolute right-3 top-3 p-2 rounded-xl transition-all ${input.trim() && !isTyping ? 'bg-[#0f3460] text-white shadow-lg shadow-blue-900/20' : 'bg-gray-200 text-gray-400'
                  }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between px-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                โหมดกระชับและเน้นการโค้ช
              </p>
              <a href={CONTACT_INFO.lineUrl} target="_blank" className="text-[10px] text-[#c5a059] font-black underline nav-font">
                นัดปรึกษาตัวจริง
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
