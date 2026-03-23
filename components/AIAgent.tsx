import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageCircle, X, Send, ExternalLink,
  BookOpen, Users, Phone, ChevronRight,
  Sparkles, GraduationCap, Target, Save, Loader2, CheckCircle2
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';
import { COURSES } from '../constants/courses';
import { supabase } from '../lib/supabaseClient';

// ===== TYPES =====
interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'course-cards' | 'action-buttons' | 'lead-form' | 'success';
}

interface LeadData {
  name: string;
  company: string;
  email: string;
  phone: string;
  line_id: string;
  interest_topic: string;
}

// ===== CONSTANTS =====
const QUICK_REPLIES = [
  { label: '📚 ดูหลักสูตรทั้งหมด', action: 'courses' },
  { label: '📐 ออกแบบหลักสูตรเฉพาะองค์กร', action: 'custom' },
  { label: '💬 ขอใบเสนอราคา', action: 'quote' },
  { label: '🧑‍🏫 รู้จักครูเด่น', action: 'about' },
];

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationState = useRef({
    step: 'intake', // intake -> diagnosis -> prescription -> checkout
    topic: '',
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      conversationState.current = { step: 'intake', topic: '' };
      setMessages([
        {
          role: 'assistant',
          content: 'สวัสดีครับ! 👋 ยินดีต้อนรับสู่คลินิกพัฒนาศักยภาพองค์กรของ **CAP Vision Institute** นะครับ\n\nผม "ครูเด่น (AI)" รับหน้าที่เป็นที่ปรึกษาเบื้องต้น... วันนี้มี "อาการ" หรือทีมงานกำลังมีโจทย์ด้านไหน ให้ผมช่วยวินิจฉัยและแนะนำหลักสูตรดีครับ? 🩺\n\n(เช่น: ทีมสื่อสารไม่เข้าใจกัน, พนักงานบริการไม่ประทับใจ, หรืออยากสร้างความเป็นผู้นำ)',
        },
      ]);
    }
    scrollToBottom();
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Lead Form Component
  const LeadForm = ({ topic }: { topic: string }) => {
    const [formData, setFormData] = useState<LeadData>({
      name: '',
      company: '',
      email: '',
      phone: '',
      line_id: '',
      interest_topic: topic || 'Custom Course Design',
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmittingLead(true);
      try {
        // 1. Save to Supabase Leads table
        const { error } = await supabase.from('leads').insert([{
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          line_id: formData.line_id,
          interest_topic: formData.interest_topic,
          source: 'ai_agent_form'
        }]);

        if (error) throw error;

        // 2. Send LINE Notification via Edge Function
        try {
          await supabase.functions.invoke('line-notify', {
            body: { 
              formType: 'AI Agent Lead (Custom Course)', 
              data: {
                'ชื่อ-นามสกุล': formData.name,
                'หน่วยงาน/บริษัท': formData.company,
                'อีเมล': formData.email,
                'เบอร์โทรศัพท์': formData.phone,
                'Line ID': formData.line_id,
                'หัวข้อที่สนใจ': formData.interest_topic
              } 
            }
          });
        } catch (lineErr) {
          console.error('Failed to send LINE notification:', lineErr);
          // Don't block the user if only notification fails
        }

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '✅ **ได้รับข้อมูลเรียบร้อยแล้วครับ!**\n\nขอบคุณที่ไว้วางใจให้ทีมงานครูเด่นช่วยดูแลนะครับ เราจะติดต่อกลับทาง Email/Line เพื่อพูดคุยรายละเอียดเบื้องต้นภายใน 24 ชั่วโมงครับ 🙏\n\nระหว่างนี้สามารถดูหลักสูตรอื่นๆ รอได้เลยนะครับ 👇',
          type: 'action-buttons'
        }]);
      } catch (err) {
        console.error('Lead submission error:', err);
        alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง หรือติดต่อทาง LINE ครับ');
      } finally {
        setIsSubmittingLead(false);
      }
    };

    return (
      <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm space-y-3 mt-2 w-full">
        <div className="flex items-center gap-2 text-[#0f3460] mb-2">
          <GraduationCap className="w-5 h-5" />
          <span className="font-black text-sm">ข้อมูลสำหรับออกแบบหลักสูตร</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            placeholder="ชื่อ-นามสกุล"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#0f3460] outline-none"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            required
            placeholder="ชื่อหน่วยงาน/บริษัท"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#0f3460] outline-none"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          />
          <input
            required
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#0f3460] outline-none"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="อีเมล (E-mail)"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#0f3460] outline-none"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            required
            placeholder="Line ID"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#0f3460] outline-none"
            value={formData.line_id}
            onChange={e => setFormData({ ...formData, line_id: e.target.value })}
          />
          <button
            type="submit"
            disabled={isSubmittingLead}
            className="w-full bg-gradient-to-r from-[#0f3460] to-[#1a4d8c] text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isSubmittingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSubmittingLead ? 'กำลังส่ง...' : 'ส่งข้อมูลให้ทีมงาน'}
          </button>
        </form>
      </div>
    );
  };

  const generateDynamicResponse = useCallback((input: string): Message => {
    const q = input.toLowerCase();
    const state = conversationState.current;

    // Intent Flags - Exact Button Matches first
    const isViewCourses = q.includes('ดูหลักสูตร') || q.includes('courses');
    const isAbout = q.includes('รู้จักครูเด่น') || q.includes('ครูเด่นคือใคร') || q.includes('วิทยากร') || q.includes('ประวัติ');
    const isCustom = q.includes('ออกแบบเฉพาะ') || q.includes('ออกแบบให้') || q.includes('custom') || q.includes('บริษัทผม') || q.includes('สำหรับองค์กร');
    const isQuote = q.includes('ราคา') || q.includes('เสนอราคา') || q.includes('quotation') || q.includes('งบประมาณ') || q.includes('จ้าง') || q.includes('ค่าใช้จ่าย') || q.includes('กี่บาท');
    
    const isGreeting = (q.includes('สวัสดี') || q.includes('hi') || q.includes('hello')) && messages.length < 3;
    const isProblem = !isViewCourses && !isAbout && !isCustom && !isQuote && 
                      (q.includes('ปัญหา') || q.includes('ไม่') || q.includes('ขาด') || q.includes('ต้องการพัฒนา') || q.includes('อยากพัฒนา'));

    // Topic Identification (Update state)
    if (q.includes('service') || q.includes('บริการ') || q.includes('ลูกค้า')) state.topic = 'service';
    else if (q.includes('team') || q.includes('ทีม') || q.includes('สามัคคี') || q.includes('ร่วมมือ')) state.topic = 'team';
    else if (q.includes('ผู้นำ') || q.includes('หัวหน้า') || q.includes('leadership') || q.includes('management')) state.topic = 'leadership';
    else if (q.includes('พูด') || q.includes('สื่อสาร') || q.includes('คุย') || q.includes('communication')) state.topic = 'communication';

    // 1. VIEW COURSES
    if (isViewCourses) {
      return {
        role: 'assistant',
        content: 'ยินดีเลยครับ! 📚 ผมได้รวบรวมหลักสูตรยอดนิยมของ **CAP Vision Institute** ไว้ให้แล้วครับ\n\nคุณสามารถคลิกเข้าไปดูรายละเอียด เนื้อหา และผลลัพธ์ที่จะได้รับในแต่ละหลักสูตรได้ที่ลิงก์นี้เลยนะครับ:\n👉 [ดูหลักสูตรทั้งหมดของเรา](https://capvisionpartner.com/courses)\n\nหรือถ้าอยากให้ผมช่วยเลือกหลักสูตรที่ "ตรงโจทย์" ที่สุด ลองบอกประเภททีมหรือปัญหาที่เจออยู่ได้นะครับ!',
        type: 'action-buttons'
      };
    }

    // 2. ABOUT KRU DEN
    if (isAbout) {
      return {
        role: 'assistant',
        content: 'ยินดีแนะนำตัวครับ! 😄\n\n**อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)**\nผู้อำนวยการ CAP Vision Institute และ Master Facilitator ที่มีประสบการณ์กว่า **18 ปี**\n\nครูเด่นเชี่ยวชาญการสอนแบบ **Transformative Learning** โดยเน้นการใช้กิจกรรมเป็นเครื่องมือเพื่อสร้าง Insight และเปลี่ยนทัศนคติในระดับจิตสำนึกครับ\n\nหากต้องการดูหลักสูตรที่ครูเด่นสอน หรือขอข้อมูลประวัติ (Profile) เพิ่มเติม เลือกด้านล่างได้เลยนะครับ 📂',
        type: 'action-buttons'
      };
    }

    // 3. QUOTE / CUSTOM PATH
    if (isQuote || isCustom) {
      state.step = 'checkout';
      return {
        role: 'assistant',
        content: 'ยินดีเลยครับ! สำหรับการ **ออกแบบหลักสูตรเฉพาะองค์กร (Custom Course Design)** นั้น ทีมงานเราจะทำการวิเคราะห์โจทย์ร่วมกันกับคุณ เพื่อสร้างโครงสร้างที่แก้ปัญหานั้นๆ ได้จริงครับ\n\nหากคุณต้องการให้เราช่วยประเมินแผนงานเบื้องต้นหรือส่งใบเสนอราคาให้ **รบกวนกรอกข้อมูลในฟอร์มด้านล่างนี้** ได้เลยนะครับ แล้วทีมงานจะรีบติดต่อกลับไปครับ 👇',
        type: 'lead-form'
      };
    }

    // 4. GREETING
    if (isGreeting) {
      return {
        role: 'assistant',
        content: 'สวัสดีครับ! ยินดีที่ได้พบกันครับ ผม **"ครูเด่น (AI)"** ที่ปรึกษาจาก CAP Vision Institute ครับ 😊\n\nเพื่อให้ผมแนะนำได้ตรงจุดที่สุด... ตอนนี้องค์กรของคุณกำลังมองหาการพัฒนาทีมงานในด้านไหนเป็นพิเศษอยู่ไหมครับ? หรือมี "โจทย์" อะไรที่อยากให้ผมช่วยแชร์ไอเดียไหมครับ?'
      };
    }

    // 5. INTAKE / DIAGNOSIS (Problem identified)
    if (isProblem || (state.step === 'intake' && q.includes('หลักสูตร') && !isViewCourses)) {
      state.step = 'diagnosis';
      const topics = {
        'service': 'การบริการที่ประทับใจ',
        'team': 'การสร้างทีมเวิร์คที่ทรงพลัง',
        'leadership': 'ภาวะผู้นำและการบริหาร',
        'communication': 'การสื่อสารและประสานงาน'
      };
      //@ts-ignore
      const topicLabel = topics[state.topic] || 'การพัฒนาบุคลากร';
      
      return {
        role: 'assistant',
        content: `เข้าใจเลยครับ เรื่อง **${topicLabel}** เป็นโจทย์ที่สำคัญมากในปัจจุบัน... 💡\n\nเพื่อให้ผมช่วยวินิจฉัย "อาการ" ได้แม่นยำขึ้น เหมือนเวลาหาหมอเลยครับ... ลองแชร์ให้ฟังหน่อยได้ไหมครับว่า **พฤติกรรมแบบไหนที่พี่อยากเห็นพนักงานทำต่างไปจากเดิม** หลังจากจบ Class นี้ครับ?`
      };
    }

    // 5. PRESCRIPTION (Based on user answer to diagnosis)
    if (state.step === 'diagnosis' && messages.length > 2) {
      state.step = 'prescription';
      
      let recCourse = 'Customized Program';
      let reason = 'เนื่องจากเป็นโจทย์ที่มีรายละเอียดเฉพาะเจาะจง ผมแนะนำให้เราออกแบบใหม่ร่วมกันครับ';

      if (state.topic === 'service') {
        recCourse = 'ใช้หัวใจบริการ คนสำราญ งานสำเร็จ (Service Mind Excellence)';
        reason = 'เพื่อปรับจูน Mindset จากภายในสู่การบริการที่เป็นเลิศครับ';
      } else if (state.topic === 'team') {
        recCourse = 'Positive Team Synergy';
        reason = 'เน้นการเปิดใจ ลดกำแพงความขัดแย้ง และสร้างเป้าหมายร่วมกันครับ';
      } else if (state.topic === 'leadership') {
        recCourse = 'Facilitative Leadership Mastery';
        reason = 'เปลี่ยนหัวหน้างานให้เป็น "ผู้อำนวยความสะดวก" ที่ดึงศักยภาพลูกน้องได้สูงสุดครับ';
      }

      return {
        role: 'assistant',
        content: `ขอบคุณสำหรับข้อมูลที่มีคุณค่ามากครับ! ข้อมูลนี้ช่วยให้เห็นภาพชัดขึ้นจริงๆ 🙏\n\nจากโจทย์ดังกล่าว ผมขอแนะนำแนวทางที่เหมาะสมเป็นตัวนี้ครับ:\n🎯 **หลักสูตร ${recCourse}**\n\n${reason}\n\nคุณสนใจอยากรับ **Course Outline (โครงร่างหลักสูตร)** เพื่อไปเป็นข้อมูลเบื้องต้นในการพิจารณาก่อนไหมครับ? หรืออยากให้ทีมเราช่วยออกแบบพิเศษสำหรับองค์กรเลยดีครับ?`,
        type: 'action-buttons'
      };
    }

    // DEFAULT FALLBACK
    const defaultMessages = [
      'น่าสนใจมากครับ! ผมอยากเข้าใจโจทย์นี้ให้ลึกขึ้นอีกนิด... คุณคิดว่าอุปสรรคที่ใหญ่ที่สุดในตอนนี้คืออะไรหรือครับ? 🤔',
      'เป็นมุมมองที่ดีมากครับ! 🌟 ในฐานะที่ปรึกษา... ผมอยากรู้ว่าเป้าหมายที่คุณอยากเห็นความสำเร็จของโปรเจกต์นี้คืออะไรครับ?',
      'ยินดีรับโจทย์นี้ไปพิจารณาครับ! หากต้องการข้อมูลหลักสูตรที่เกี่ยวข้องทันที หรือต้องการให้ผมช่วยแนะนำหัวข้อที่เหมาะสม เลือกดูที่ปุ่มเมนูได้เลยนะครับ 👇'
    ];
    return {
      role: 'assistant',
      content: defaultMessages[Math.floor(Math.random() * defaultMessages.length)],
      type: 'action-buttons'
    };
  }, [messages.length]);

  const handleSend = (overrideInput?: string) => {
    const text = overrideInput ?? input;
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = generateDynamicResponse(text);
      setMessages(prev => [...prev, response]);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="fixed bottom-6 right-5 md:right-6 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div
          className="mb-4 w-[calc(100vw-24px)] md:w-[400px] max-h-[85svh] md:max-h-[650px] bg-white rounded-[1.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ animation: 'chatSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f3460] to-[#1a4d8c] p-5 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full border-2 border-[#c5a059] overflow-hidden bg-white/20">
                  <img src="/images/denmasterfa.jpg" alt="ครูเด่น (AI)" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f3460]" />
              </div>
              <div>
                <h3 className="font-black text-[15px] nav-font leading-snug">ครูเด่น (AI)</h3>
                <span className="text-[10px] text-[#c5a059] font-bold tracking-wider uppercase">Master Facilitator • ออนไลน์</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/25 p-2 rounded-full transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fbff]">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full border border-[#c5a059]/30 overflow-hidden flex-shrink-0 mt-1">
                      <img src="/images/denmasterfa.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                      m.role === 'user'
                        ? 'bg-[#0f3460] text-white rounded-tr-sm'
                        : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-blue-50'
                    } whitespace-pre-line`}
                    dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                </div>
                
                {m.type === 'lead-form' && <LeadForm topic={conversationState.current.topic} />}

                {m.role === 'assistant' && m.type === 'action-buttons' && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-9">
                    <button
                      onClick={() => handleSend('ขอดูหลักสูตรที่มีอยู่แล้วครับ')}
                      className="bg-white text-[#0f3460] border border-[#0f3460]/20 px-3 py-1.5 rounded-full text-[12px] font-black hover:bg-[#0f3460] hover:text-white transition-all shadow-sm"
                    >
                      📂 ดูหลักสูตรทั้งหมด
                    </button>
                    <button
                      onClick={() => handleSend('อยากพัฒนาหลักสูตรเฉพาะองค์กรครับ')}
                      className="bg-white text-[#c5a059] border border-[#c5a059]/30 px-3 py-1.5 rounded-full text-[12px] font-black hover:bg-[#c5a059] hover:text-white transition-all shadow-sm"
                    >
                      📐 ออกแบบเฉพาะ
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 ml-1">
                <div className="w-7 h-7 rounded-full border border-[#c5a059]/30 overflow-hidden shrink-0">
                  <img src="/images/denmasterfa.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex gap-1 items-center h-[38px]">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Replies Footer */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 bg-[#f8fbff]">
              {QUICK_REPLIES.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.label)}
                  className="bg-white border border-[#0f3460]/10 px-3 py-2 rounded-xl text-[12px] font-black text-[#0f3460] hover:border-[#0f3460] hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {q.label}
                </button>
              ))}
            </div>
          ) }

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="คุยกับครูเด่น (AI) ได้ที่นี่..."
              className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3460]/20 border border-gray-200"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-[#0f3460] disabled:opacity-40 text-white p-3 rounded-xl hover:bg-[#1a4d8c] transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center transition-all duration-500 rounded-full shadow-[0_10px_40px_rgba(15,52,96,0.5)] ${
          isOpen ? 'bg-gray-800 p-3 rotate-90 scale-90' : 'bg-[#0f3460] p-4 hover:scale-110 active:scale-95'
        }`}
      >
        {!isOpen && <span className="absolute inset-0 rounded-full bg-[#0f3460] animate-ping opacity-25" />}
        {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageCircle className="w-8 h-8 text-white" />}
        
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-white text-[#0f3460] px-5 py-3 rounded-2xl shadow-2xl font-black nav-font text-[14px] whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-blue-50">
            <span className="text-yellow-500 mr-2">✨</span> ปรึกษาครูเด่น (AI)
            <div className="absolute top-1/2 right-[-8px] -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent shadow-sm" />
          </div>
        )}
      </button>
    </div>
  );
};

export default AIAgent;
