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

// ===== CORE RESPONSE ENGINE & CONTEXT TRACKING =====
// Track basic conversation state to make it feel more natural (like a doctor's visit)
let conversationState = {
  step: 'intake', // intake -> diagnosis -> prescription -> checkout
  topic: '',
};

function generateResponse(input: string, prevMessages?: Message[]): string {
  const q = input.toLowerCase();

  // 1. Analyze user intent
  const isGreeting = q.includes('สวัสดี') || q.includes('ทักทาย') || q.includes('hi') || q.includes('hello');
  const isProblem = q.includes('ปัญหา') || q.includes('ไม่') || q.includes('ขาด') || q.includes('ต้องการพัฒนา') || q.includes('อยากพัฒนา');
  const isQuote = q.includes('ราคา') || q.includes('เสนอราคา') || q.includes('quotation') || q.includes('งบประมาณ') || q.includes('จ้าง') || q.includes('ค่าใช้จ่าย');
  const isCourse = q.includes('หลักสูตร') || q.includes('อบรม') || q.includes('training') || q.includes('in-house');

  // Identify topics
  if (q.includes('service') || q.includes('บริการ') || q.includes('ลูกค้า')) conversationState.topic = 'service';
  if (q.includes('team') || q.includes('ทีม') || q.includes('สามัคคี') || q.includes('ร่วมมือ')) conversationState.topic = 'team';
  if (q.includes('ผู้นำ') || q.includes('หัวหน้า') || q.includes('leadership') || q.includes('management')) conversationState.topic = 'leadership';
  if (q.includes('พูด') || q.includes('สื่อสาร') || q.includes('คุย') || q.includes('communication')) conversationState.topic = 'communication';
  if (q.includes('growth') || q.includes('mindset') || q.includes('ทัศนคติ') || q.includes('เปลี่ยนแปลง')) conversationState.topic = 'mindset';

  // --- STEP 0: Greetings & Quick Actions ---
  if (isGreeting && (!prevMessages || prevMessages.length < 3)) {
    return `สวัสดีครับ! ยินดีที่ได้รู้จักครับ ผม "ครูเด่น (AI)" ผู้ช่วยของ CAP Vision Institute 😊
    
เพื่อจะได้แนะนำได้อย่างเหมาะสมที่สุด... ตอนนี้ที่องค์กรกำลังมองหาการพัฒนาทีมงานด้านไหนเป็นพิเศษไหมครับ? (เช่น เรื่องบริการ, การทำงานเป็นทีม, หรือภาวะผู้นำ)`;
  }

  if (isQuote) {
    conversationState.step = 'checkout';
    return `ยินดีครับ เรื่องค่าใช้จ่ายหรือขอใบเสนอราคา (In-house Training) ขั้นตอนง่ายมากครับ 📋

**ขั้นแรก** รบกวนแจ้งกรอบเบื้องต้นนิดนึงครับ:
1. จัดให้แผนกไหน หรือระดับใด (พนักงาน / หัวหน้างาน)?
2. ผู้เข้าร่วมประมาณกี่ท่านครับ?
3. อยากให้เน้นทักษะอะไรเป็นพิเศษไหมครับ?

คุณสามารถพิมพ์ตอบผมที่นี่ หรือสะดวกส่งเข้า **LINE: @denmasterfa** เพื่อให้ทีมงานส่งใบเสนอราคาอย่างเป็นทางการให้ภายใน 24 ชม. ได้เลยนะครับ 👇`;
  }

  if (q.includes('ครูเด่นคือใคร') || q.includes('about') || q.includes('วิทยากร') || q.includes('ครูเด่น') || q.includes('ประวัติ')) {
    return `ยินดีแนะนำตัวครับ! 😄

**อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)**
ผู้อำนวยการ CAP Vision Institute และ Master Facilitator 

ด้วยประสบการณ์กว่า **18 ปี** ในการพัฒนาคนให้กับระดับองค์กรใหญ่ๆ เช่น Toyota, PEA, AOT... ครูเด่นเน้นการสอนแบบ **Transformative Learning** — ไม่ใช่แค่นั่งฟังเลกเชอร์ แต่เปลี่ยนทัศนคติและพฤติกรรมผ่านกิจกรรม (Tools) ที่สนุกและลึกซึ้งครับ

อยากคุยกับครูเด่นโดยตรง ทัก LINE: @denmasterfa ได้เลยนะครับ 🙏`;
  }

  if (q.includes('ติดต่อ') || q.includes('line') || q.includes('โทร') || q.includes('facebook') || q.includes('สอบถาม')) {
    return `ช่องทางติดต่อ CAP Vision Institute ทั้งหมดครับ 📞

💬 **LINE OA:** @denmasterfa  
🔗 **Link:** https://lin.ee/zRTBF6K  
📞 **โทร:** 093-223-5919  
📧 **Email:** thecapvision@gmail.com  

**สำหรับ HRD / ฝ่ายพัฒนาบุคลากร** แนะนำส่งรายละเอียดโจทย์มาทาง LINE นะครับ จะได้รับการตอบสนองเร็วที่สุด! 🚀`;
  }

  // --- STEP 1: Intake (ซักประวัติ / อาการ) ---
  if (isProblem || (isCourse && conversationState.step === 'intake')) {
    conversationState.step = 'diagnosis';
    
    if (conversationState.topic) {
      const topicName = conversationState.topic === 'team' ? 'การสร้างทีม' 
                      : conversationState.topic === 'service' ? 'การบริการลูกค้า' 
                      : conversationState.topic === 'leadership' ? 'การบริหารและภาวะผู้นำ' 
                      : conversationState.topic === 'mindset' ? 'ทัศนคติ Mindset'
                      : 'การสื่อสารประสานงาน';

      return `เข้าใจเลยครับ ปัญหาเรื่อง${topicName}เป็นเรื่องที่หลายองค์กรเจอเหมือนกันเลย 💡

เพื่อให้ผม (ในฐานะคู่คิด) ช่วย "วินิจฉัย" และจัดโครงสร้างการเรียนรู้ให้ตรงจุดที่สุด... ลองเล่าให้ผมฟังอีกนิดได้ไหมครับว่า **พฤติกรรมแบบไหนที่อยากเห็นการเปลี่ยนแปลงมากที่สุดหลังจบการอบรมครับ?** (เช่น อยากให้คุยกันมากขึ้น หรือแก้ปัญหาเก่งขึ้น)`;
    }

    return `ยินดีครับ! 🎯 ผมมีหลักสูตรครอบคลุมครบ 4 ด้าน (People, Work, Communication, Leader Skills)

แต่เพื่อให้แนะนําได้เป๊ะที่สุด เหมือนเวลาไปหาหมอเลย... ถ้ารู้ "อาการ" ชัดเจน ก็จะจ่ายยาได้ตรงจุด 🩺
    
ตอนนี้ "อาการ" หรือความท้าทายหลักๆ ที่ทีมงานกำลังเจออยู่คือเรื่องไหนครับ? 
- (ก) สื่อสารกันไม่ค่อยเข้าใจ
- (ข) ขาดแรงจูงใจในการทำงาน/อยากพัฒนาหัวหน้า
- (ค) บริการลูกค้ายังไม่ประทับใจ
- (ง) อื่นๆ ลองเล่ามาได้เลยครับ!`;
  }

  // --- STEP 2: Diagnosis & Prescription (วินิจฉัยและสั่งยา) ---
  if (conversationState.step === 'diagnosis' || (conversationState.topic && !isGreeting && !isQuote)) {
    conversationState.step = 'prescription';
    
    let recommendation = '';
    let details = '';

    if (conversationState.topic === 'service' || q.includes('ค') || q.includes('บริการ')) {
      recommendation = `หลักสูตร **"ใช้หัวใจบริการ คนสำราญ งานสำเร็จ"**`;
      details = `เน้นแก้ปัญหาตั้งแต่ Mindset ไปสู่การรับมือกับเคสลูกค้าตัวจริง สร้าง Smart Personality และ Empathy ครับ`;
    } else if (conversationState.topic === 'team' || q.includes('ก') || q.includes('สื่อสาร')) {
      recommendation = `หลักสูตร **"สร้างทีมแกร่งด้วยพลังบวก (Positive Team Synergy)"**`;
      details = `เราจะไม่เอาแต่เล่นเกมสนุกสนาน แต่จะใช้ Activity ดึงปมปัญหาในใจออกมาคลายด้วยกระบวนการ Facilitation เน้น 3 เสาหลัก: Trust → Communication → Shared Goal ครับ`;
    } else if (conversationState.topic === 'leadership' || conversationState.topic === 'mindset' || q.includes('ข')) {
      recommendation = `หลักสูตร **"Leadership Mastery"** หรือ **"Growth Mastery Workshop"**`;
      details = `เปลี่ยนจากคนเก่งงาน ให้เป็นคนเก่งคนครับ ปลดล็อคศักยภาพทีมด้วย Mindset ที่ถูกต้อง และเรียนรู้การเป็นผู้นำที่ใช้คำถาม (Facilitation) ครับ`;
    } else {
      recommendation = `หลักสูตร **Custom Course Design**`;
      details = `ถ้าเป็นโจทย์เฉพาะตัวแบบนี้ ผมแนะนำให้เราออกแบบใหม่เลยดีกว่าครับ! (เหมือนตัดเสื้อให้พอดีตัวองค์กรคุณเลย) จะได้แก้ปัญหาได้ตรงจุดที่สุดครับ`;
    }

    return `คำตอบนี้ช่วยให้เห็นภาพชัดขึ้นมากครับ! ขอบคุณที่แชร์นะครับ 🙏

จากโจทย์ที่คุณเล่ามา ผมขอ "สั่งยา" เป็นตัวนี้ครับ:
🎯 **${recommendation}**

${details}

ผมสามารถส่ง **Course Outline (โครงสร้างหลักสูตร)** เบื้องต้นแบบ 1 วันเต็มให้คุณดูคร่าวๆ ก่อนเอาไปพิจารณากับผู้บริหารได้นะครับ... **สนใจรับ Outline ไปดูก่อนไหมครับ?**`;
  }

  // --- STEP 3: Next Steps (นัดหมาย / จบกระบวนการ) ---
  if (conversationState.step === 'prescription' && (q.includes('สนใจ') || q.includes('เอา') || q.includes('ได้') || q.includes('outline') || q.includes('ส่ง') || q.includes('รับ'))) {
    conversationState.step = 'checkout';
    return `เยี่ยมเลยครับ! 📝 

เพื่อมอบประสบการณ์ที่ดีที่สุด และส่ง Course Outline ที่เจาะจงเฉพาะปัญหาที่คุณเพิ่งเล่าให้ฟัง แปะไปให้...

รบกวนขอ **ชื่อหน่วยงาน/องค์กร** และ **แอด LINE: @denmasterfa** มารับ Outline ทางไลน์ได้เลยครับ 👇

ทีมงานครูเด่น สแตนด์บายพร้อมส่งให้ภายในวันนี้เลยครับ!`;
  }

  // --- Default Fallback (General Conversation / Open Questions) ---
  const defaults = [
    'เข้าใจเลยครับ... แล้วในมุมของคุณ คิดว่าอุปสรรคที่ใหญ่ที่สุดของการพัฒนาเรื่องนี้คืออะไรหรือครับ? 🤔',
    'น่าสนใจมากครับ ลองขยายความตรงนี้อีกนิดได้ไหมครับ เพื่อที่ผมจะได้แนะนำสิ่งที่เหมาะสมที่สุดให้?',
    'เป็นมุมมองที่ดีมากครับ! ในฐานะที่ปรึกษา... ผมอยากรู้ว่าเป้าหมายสูงสุดที่คุณอยากเห็นทีมเปลี่ยนแปลงไปคืออะไรครับ? 🌟',
    'รับทราบครับ! ทุกโจทย์มีทางออกเสมอ... ให้ผมช่วยส่งข้อมูลที่เกี่ยวข้องให้ทางช่องทางไหนดีครับ? (LINE หรือ Email ดีครับ) 👇'
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
      // Reset state on open
      conversationState = { step: 'intake', topic: '' };
      
      setMessages([
        {
          role: 'assistant',
          content:
            'สวัสดีครับ! 👋 ยินดีต้อนรับสู่คลินิกพัฒนาศักยภาพองค์กรของ **CAP Vision Institute** นะครับ\n\nผม "ครูเด่น (AI)" รับหน้าที่เป็นที่ปรึกษาเบื้องต้น... วันนี้มี "อาการ" หรือทีมงานกำลังมีโจทย์ด้านไหน ให้ผมช่วยวินิจฉัยและแนะนำหลักสูตรดีครับ? 🩺\n\n(เช่น: ทีมสื่อสารไม่เข้าใจกัน, พนักงานบริการไม่ประทับใจ, หรืออยากสร้างความเป็นผู้นำ)',
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
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    // Filter quick actions that bypass conversation logic
    const lowerText = text.toLowerCase();
    let actionResponse = '';
    
    // Quick menu mapping
    if (lowerText === 'courses' || lowerText === 'สนใจ in-house training ครับ' || lowerText === 'ดูหลักสูตรทั้งหมด') {
      actionResponse = 'สนใจหลักสูตร';
      conversationState.step = 'intake';
    }
    else if (lowerText === 'quote' || lowerText === 'ขอใบเสนอราคาได้เลยไหม?' || lowerText === 'ขอใบเสนอราคา') {
      actionResponse = 'ขอใบเสนอราคา';
    }
    else if (lowerText === 'about' || lowerText === 'ครูเด่น คือใคร?' || lowerText === 'ครูเด่น คือใคร') {
      actionResponse = 'ครูเด่นคือใคร';
    }
    else if (lowerText === 'อยากพัฒนาทีมงาน') {
      conversationState.topic = 'team';
      actionResponse = 'อยากพัฒนาทีมงาน สื่อสารให้ดีขึ้น';
    }

    const queryText = actionResponse || text;

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: generateResponse(queryText, prev) },
      ]);
    }, 1000 + Math.random() * 500); // More natural typing delay
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
