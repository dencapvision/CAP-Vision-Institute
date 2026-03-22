import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, X, Send, ExternalLink,
  BookOpen, Users, Phone, ChevronRight,
  Sparkles, GraduationCap, Target
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';
import { COURSES } from '../constants/courses';

// ===== TYPES =====
interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'course-cards' | 'action-buttons';
}

// ===== COURSE RECOMMENDATION MAP =====
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'service-mind-excellence': [
    'service mind', 'บริการ', 'ลูกค้า', 'front-line', 'customer', 'พนักงานบริการ', 'ต้อนรับ',
  ],
  'creative-problem-solving': [
    'แก้ปัญหา', 'problem solving', 'creative', 'สร้างสรรค์', 'ปัญหา', 'คิดนอกกรอบ',
  ],
  'effective-communication': [
    'สื่อสาร', 'communication', 'พูด', 'ฟัง', 'ความขัดแย้ง', 'disc', 'feedback',
  ],
  'team-synergy': [
    'team building', 'ทีม', 'team', 'ความสามัคคี', 'ทำงานร่วมกัน', 'synergy',
  ],
};

// ===== SYSTEM PERSONA PROMPTS =====
const QUICK_REPLIES = [
  { label: '📚 ดูหลักสูตรทั้งหมด', action: 'courses' },
  { label: '💬 ขอใบเสนอราคา', action: 'quote' },
  { label: '🧑‍🏫 รู้จักครูเด่น', action: 'about' },
  { label: '🏆 ผลงานองค์กร', action: 'portfolio' },
];

// ===== CORE RESPONSE ENGINE =====
function generateResponse(input: string): string {
  const q = input.toLowerCase();

  // --- Course inquiry ---
  if (q.includes('หลักสูตร') || q.includes('อบรม') || q.includes('training') || q.includes('in-house')) {
    return `ยอดเยี่ยมครับ! 🎯 ผมมีหลักสูตรฝึกอบรมหลัก 4 กลุ่ม ที่ออกแบบมาสำหรับองค์กรโดยเฉพาะ:

🔹 **People Skills** — Service Mind, บุคลิกภาพ, Smart Personality
🔹 **Work Skills** — Team Building, Creative Problem Solving
🔹 **Communication Skills** — DISC, Effective Communication, Feedback
🔹 **Leader Skills** — Leadership, DFA Strategy, Growth Mindset

ทุกหลักสูตรสามารถจัดแบบ **In-house Training** และ **ออกแบบเฉพาะองค์กร** ได้นะครับ 💡

บอกผมได้เลยว่าองค์กรของคุณกำลังเผชิญโจทย์ไหนอยู่ครับ เช่น "ทีมสื่อสารไม่เข้าใจกัน" หรือ "พนักงานขาด Service Mind" ผมจะแนะนำให้ตรงจุดกว่านี้เลยครับ 🙌`;
  }

  // --- Quote / Price ---
  if (q.includes('ราคา') || q.includes('เสนอราคา') || q.includes('quotation') || q.includes('งบประมาณ') || q.includes('จ้าง') || q.includes('ค่าใช้จ่าย')) {
    return `สำหรับการขอใบเสนอราคา In-house Training ครับ ขั้นตอนง่ายๆ มีดังนี้ 📋

**ขั้นที่ 1:** แจ้งข้อมูลเบื้องต้น
- หัวข้อ / โจทย์องค์กรที่ต้องการพัฒนา
- จำนวนผู้เข้าร่วม (กี่ท่าน)
- ระยะเวลาที่ต้องการ (ครึ่งวัน / 1 วัน / 2 วัน)

**ขั้นที่ 2:** ทีมงานออกแบบ Course Outline เฉพาะองค์กร

**ขั้นที่ 3:** รับใบเสนอราคาภายใน 24 ชั่วโมง

📱 ส่งรายละเอียดมาที่ **LINE: @denmasterfa** ได้เลยนะครับ หรือกด "คุยกับเจ้าหน้าที่" ด้านล่างครับ 👇`;
  }

  // --- Service Mind specific ---
  if (q.includes('service mind') || q.includes('บริการ') || q.includes('พนักงานบริการ') || q.includes('customer')) {
    return `หลักสูตร **"ใช้หัวใจบริการ คนสำราญ งานสำเร็จ"** เหมาะมากเลยครับ! 🌟

หลักสูตรนี้ออกแบบมาเพื่อ:
✅ สร้าง **Smart Personality** ให้พนักงาน
✅ พัฒนาทักษะ **Empathy** เข้าใจลูกค้า 4 ประเภท  
✅ จัดการสถานการณ์ยากลำบากด้วย **Conflict Management**

**ระยะเวลา:** 1 วัน (09.00 - 16.30 น.)  
**เหมาะกับ:** Front-line Staff, เจ้าหน้าที่บริการลูกค้า

อยากทราบรายละเอียดเพิ่มเติม หรือต้องการให้ผมออกแบบ Outline เฉพาะองค์กรไหมครับ? 😊`;
  }

  // --- Team Building ---
  if (q.includes('team') || q.includes('ทีม') || q.includes('team building') || q.includes('สามัคคี')) {
    return `โจทย์เรื่องทีม เป็นสิ่งที่ผมชอบมากครับ! 💪

หลักสูตร **"สร้างทีมแกร่งด้วยพลังบวก (Positive Team Synergy)"** ตอบโจทย์ได้ตรงครับ:

🎯 **เน้นทำความ "เข้าใจ" กัน** — ไม่ใช่แค่กิจกรรมสนุก
🔑 **3 เสา Teamwork:** Trust → Communication → Shared Goal
🎪 **Activity-based Learning** ที่นำกลับไปใช้งานได้จริง

**สิ่งสำคัญที่สุด** ก่อนออกแบบ Team Building คือต้องรู้ว่าทีมมีปัญหาอะไรอยู่ครับ เช่น:
- ขาดความไว้วางใจซึ่งกันและกัน?
- สื่อสารข้ามแผนกไม่ค่อยดี?
- หรือต้องการเพิ่ม Engagement?

บอกผมได้เลยนะครับ จะได้ออกแบบได้ตรงจริงๆ 🙏`;
  }

  // --- Leadership ---
  if (q.includes('ผู้นำ') || q.includes('leadership') || q.includes('หัวหน้า') || q.includes('management') || q.includes('manager')) {
    return `ผู้นำที่ดีในยุคนี้ต้องทั้ง "รู้จักตัวเอง" และ "พัฒนาคนอื่น" ได้ด้วยนะครับ 🎯

ที่ CAP Vision Institute มีหลักสูตรด้าน Leader Skills โดยเฉพาะ:

📌 **Leadership Mastery: DFA Strategy**
- D: Dynamic (พลังการนำที่ยืดหยุ่น)
- F: Facilitation (นำด้วยคำถาม ไม่ใช่คำสั่ง)
- A: Action Learning (เรียนจากการลงมือจริง)

📌 **Growth Mindset Workshop**
หลักสูตร Signature ของครูเด่น — ช่วยให้ผู้นำปลดล็อคศักยภาพทีมด้วย Mindset ที่ถูกต้อง

อยากให้ผมเล่ารายละเอียดเพิ่มเติมหลักสูตรไหนครับ? 🌟`;
  }

  // --- Growth Mindset ---
  if (q.includes('growth') || q.includes('mindset') || q.includes('ทัศนคติ') || q.includes('เปลี่ยนแปลง')) {
    return `Growth Mindset — หัวใจสำคัญที่สุดของทุกองค์กรที่ต้องการเติบโตครับ! 🌱

**Growth Mastery Workshop** คือหลักสูตร Signature ของผมครับ ที่ออกแบบมาเฉพาะ:

✨ เปลี่ยน Fixed Mindset → Growth Mindset ในระดับพฤติกรรมจริง
💡 ใช้กระบวนการ Transformative Learning ไม่ใช่แค่บรรยาย
🎯 วัดผลได้หลังจบ — ทั้งทัศนคติและพฤติกรรม

👉 ดูรายละเอียดเพิ่มเติมได้ที่: https://growth-mindset-workshop.capvisionpartner.com/

หรืออยากให้ผมออกแบบ Outline พิเศษสำหรับองค์กรของคุณไหมครับ? 😊`;
  }

  // --- About Kru Den ---
  if (q.includes('ครูเด่น') || q.includes('วิทยากร') || q.includes('facilitator') || q.includes('อนุสรณ์') || q.includes('อาจารย์')) {
    return `ยินดีแนะนำตัวเองนะครับ! 😄

**อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)**
ผู้อำนวยการ CAP Vision Institute

📌 **ประสบการณ์** มากกว่า **18 ปี** ด้านการพัฒนาคนและองค์กร
📌 ออกแบบ Workshop / หลักสูตรกว่า **1,000 เวที** ทั่วประเทศ
📌 วิทยากรและที่ปรึกษาให้กับ Toyota, Dell, Land & Houses, PEA, AOT และอีกกว่า 200 องค์กร

🏆 **ความเชี่ยวชาญ:**
- Transformative Learning & Flow Learning
- Human Communication & Facilitation
- Leadership Development (DFA Model)
- Growth Mindset & Team Synergy

💬 **วิธีการสอน:** Activity-based + Circle Dialogue + Play to Learn — "เข้าใจง่าย ใช้ได้จริง"

อยากคุยโดยตรงกับครูเด่น สามารถ **ADD LINE: @denmasterfa** ได้เลยนะครับ 🙏`;
  }

  // --- Contact / Line ---
  if (q.includes('ติดต่อ') || q.includes('line') || q.includes('โทร') || q.includes('facebook') || q.includes('สอบถาม')) {
    return `ช่องทางติดต่อ CAP Vision Institute ทั้งหมดครับ 📞

💬 **LINE OA:** @denmasterfa  
🔗 **Link:** https://lin.ee/zRTBF6K  
📞 **โทร:** 093-223-5919  
📧 **Email:** thecapvision@gmail.com  
📘 **Facebook:** facebook.com/thecapvision

**สำหรับ HRD / ฝ่ายพัฒนาบุคลากร** แนะนำส่งรายละเอียดโจทย์มาทาง LINE นะครับ จะได้รับการตอบสนองเร็วที่สุด! 🚀`;
  }

  // --- How to use website ---
  if (q.includes('เวบไซต์') || q.includes('website') || q.includes('ใช้งาน') || q.includes('ขั้นตอน') || q.includes('วิธี')) {
    return `ขั้นตอนการรับบริการของ CAP Vision Institute ง่ายมากครับ! 📋

**Step 1: 🔍 เลือกหลักสูตร**
→ กด "หลักสูตรฝึกอบรม" บนเมนู
→ เลือกหมวดหมู่ที่ต้องการ: People / Work / Communication / Leader Skills

**Step 2: 💬 ติดต่อขอใบเสนอราคา**
→ กด "ขอใบเสนอราคา" ในหน้าหลักสูตร
→ หรือ LINE: @denmasterfa

**Step 3: 📐 รับ Custom Course Outline**
→ ทีมงานออกแบบหลักสูตรเฉพาะองค์กร

**Step 4: 🎓 จัดอบรม + วัดผล**
→ วิทยากรลงพื้นที่ + Certificate + Follow-up

มีอะไรสงสัยเพิ่มเติมไหมครับ? 😊`;
  }

  // --- Default - Powerful Question ---
  const defaults = [
    'ได้เลยครับ! 😊 ช่วยบอกผมหน่อยนะครับ ตอนนี้มีโจทย์ด้านไหนในองค์กรบ้าง เช่น เรื่องทีม, ผู้นำ, หรือพนักงาน?',
    'ยินดีช่วยครับ! 👍 อยากทราบว่าองค์กรของคุณกำลังมองหาการพัฒนาด้านไหนครับ — ทักษะ (Skill) หรือ ทัศนคติ (Mindset)?',
    'โอเคครับ! 🎯 ผมจะแนะนำให้ตรงที่สุดเลย บอกผมได้เลยนะครับว่าเป็นองค์กรเอกชน รัฐ หรือ SME ครับ?',
    'ฟังดูน่าสนใจมากครับ! ✨ สอบถามบริการด้านไหนดีครับ — หลักสูตรอบรม, ขอใบเสนอราคา, หรืออยากคุยกับครูเด่นโดยตรง?',
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ===== MAIN COMPONENT =====
const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            'สวัสดีดีครับ! 😊 ยินดีให้บริการเลยนะครับ\n\nผมครูเด่น (AI) ผู้ช่วยจาก **CAP Vision Institute** ครับ สอบถามบริการด้านไหนดีครับ?\n\n✅ หลักสูตรฝึกอบรม In-house\n✅ ขอใบเสนอราคา\n✅ ปรึกษาด้านการพัฒนาบุคลากร',
        },
      ]);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (overrideInput?: string) => {
    const text = overrideInput ?? input;
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Handle quick menu actions
    const lowerText = text.toLowerCase();
    let actionResponse = '';
    if (lowerText === 'courses') actionResponse = 'ดูหลักสูตรทั้งหมด';
    else if (lowerText === 'quote') actionResponse = 'ขอใบเสนอราคา';
    else if (lowerText === 'about') actionResponse = 'ครูเด่น คือใคร';
    else if (lowerText === 'portfolio') actionResponse = 'ผลงานองค์กร';

    const queryText = actionResponse || text;

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: generateResponse(queryText) },
      ]);
    }, 900 + Math.random() * 400);
  };

  const suggestions = [
    'สนใจ In-house Training ครับ',
    'อยากพัฒนาทีมงาน',
    'ขอใบเสนอราคาได้เลยไหม?',
    'ครูเด่น คือใคร?',
  ];

  return (
    <div className="fixed bottom-6 right-5 md:right-6 z-[9999] flex flex-col items-end">

      {/* ===== CHAT WINDOW ===== */}
      {isOpen && (
        <div
          className="mb-4 w-[calc(100vw-24px)] md:w-[400px] max-h-[80svh] md:max-h-[600px] bg-white rounded-[1.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ animation: 'chatSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          <style>{`
            @keyframes chatSlideUp {
              from { opacity:0; transform:translateY(24px) scale(0.97); }
              to   { opacity:1; transform:translateY(0)   scale(1); }
            }
            @keyframes typingBounce {
              0%,80%,100% { transform: translateY(0); }
              40% { transform: translateY(-6px); }
            }
          `}</style>

          {/* --- Header --- */}
          <div className="bg-gradient-to-r from-[#0f3460] to-[#1a4d8c] p-5 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full border-2 border-[#c5a059] overflow-hidden bg-white/20">
                  <img
                    src="/images/denmasterfa.jpg"
                    alt="ครูเด่น มาสเตอร์ฟา"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://ui-avatars.com/api/?name=D&background=c5a059&color=fff&size=80';
                    }}
                  />
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f3460]" />
              </div>
              <div>
                <h3 className="font-black text-[15px] nav-font leading-snug">ครูเด่น (AI)</h3>
                <span className="text-[10px] text-[#c5a059] font-bold tracking-wider uppercase">
                  Master Facilitator • ออนไลน์
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/10 hover:bg-white/25 p-2 rounded-full transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="ปิดแชท"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* --- Chat Area --- */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f7f9fc]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full border border-[#c5a059]/30 overflow-hidden mr-2 flex-shrink-0 mt-0.5">
                    <img
                      src="/images/denmasterfa.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://ui-avatars.com/api/?name=D&background=c5a059&color=fff&size=40';
                      }}
                    />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-[#0f3460] text-white rounded-2xl rounded-tr-sm font-medium'
                      : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 font-medium'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-[#c5a059]/30 overflow-hidden flex-shrink-0">
                  <img
                    src="/images/denmasterfa.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://ui-avatars.com/api/?name=D&background=c5a059&color=fff&size=40';
                    }}
                  />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="w-2 h-2 rounded-full bg-gray-400 block"
                      style={{
                        animation: `typingBounce 1.2s ${dot * 0.2}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* --- Quick Suggestion Chips (first message) --- */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 bg-[#f7f9fc]">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[12px] font-bold text-[#0f3460] hover:border-[#0f3460] hover:bg-[#0f3460] hover:text-white transition-all whitespace-nowrap"
                  style={{ touchAction: 'manipulation' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* --- LINE OA Banner --- */}
          <div className="px-4 pt-3 pb-2 bg-white border-t border-gray-100">
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#00b900] text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow nav-font text-[13px]"
              style={{ touchAction: 'manipulation' }}
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              คุยตรงกับครูเด่น (LINE: @denmasterfa)
              <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-60" />
            </a>
          </div>

          {/* --- Input Area --- */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="ถามเรื่องหลักสูตร หรือโจทย์องค์กร..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3460] transition-all min-h-[44px]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-[#0f3460] disabled:opacity-40 text-white p-3 rounded-xl hover:bg-[#c5a059] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="ส่งข้อความ"
              style={{ touchAction: 'manipulation' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ===== TOGGLE BUTTON — Navy dark with gold accent (readable on any bg) ===== */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'ปิดแชท AI' : 'เปิดแชทกับครูเด่น AI'}
        style={{ touchAction: 'manipulation' }}
        className={`group relative flex items-center gap-3 transition-all duration-400 rounded-full shadow-2xl ${
          isOpen
            ? 'bg-gray-700 p-3.5 rotate-[5deg] scale-90'
            : 'bg-[#0f3460] hover:bg-[#1a4d8c] p-4 hover:scale-105 active:scale-95'
        }`}
      >
        {/* Pulsing ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#0f3460] animate-ping opacity-30 pointer-events-none" />
        )}

        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <>
            {/* Tooltip label */}
            <div className="absolute right-full mr-3 bg-[#0f3460] text-white px-4 py-2.5 rounded-2xl shadow-xl font-black nav-font text-[13px] whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-white/10">
              <span className="text-[#c5a059]">✨</span> ปรึกษาครูเด่น (AI)
              {/* Arrow */}
              <div className="absolute top-1/2 right-[-6px] -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-[#0f3460] border-y-[5px] border-y-transparent" />
            </div>

            {/* Icon + Gold badge */}
            <div className="relative">
              <MessageCircle className="w-7 h-7 text-white" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c5a059] rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default AIAgent;
