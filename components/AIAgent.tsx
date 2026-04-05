import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageCircle, X, Send, ArrowRight,
  GraduationCap, Save, Loader2, Sparkles, ChevronRight,
  Brain, Users, Target, MessageSquare
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant';
  content: string;
  showLeadForm?: boolean;
  suggestedProgram?: string | null;
  ctaType?: string;
}

interface LeadData {
  name: string;
  company: string;
  phone: string;
  email: string;
  line_id: string;
  interest_topic: string;
}

// ─── QUICK STARTERS ───────────────────────────────────────────────────────────

const QUICK_STARTERS = [
  { icon: MessageSquare, label: 'ทีมสื่อสารไม่ได้เรื่อง', value: 'ทีมผมมีปัญหาการสื่อสารกัน ไม่ค่อยเข้าใจกัน' },
  { icon: Target,        label: 'อยากพัฒนาผู้นำ',         value: 'อยากพัฒนาทักษะภาวะผู้นำให้กับหัวหน้างานในองค์กร' },
  { icon: Users,         label: 'พนักงาน Engagement ต่ำ', value: 'พนักงานขาดความผูกพันกับองค์กร ขาดแรงจูงใจ' },
  { icon: Brain,         label: 'ต้องการออกแบบหลักสูตร',   value: 'ต้องการออกแบบหลักสูตรอบรมเฉพาะสำหรับองค์กรเรา' },
];

// ─── WELCOME MESSAGE ──────────────────────────────────────────────────────────

const WELCOME: Message = {
  role: 'assistant',
  content: 'สวัสดีครับ ยินดีต้อนรับสู่ CAP Vision Institute ครับ\n\nผมครูเด่น AI ที่ปรึกษาด้านการพัฒนาคนและองค์กร ผมไม่ได้มาแค่แนะนำหลักสูตร แต่จะช่วยวิเคราะห์โจทย์ขององค์กรคุณก่อนครับ\n\nก่อนอื่นเลย ผมอยากรู้จักคุณสักหน่อย... คุณรับผิดชอบงานด้านไหนในองค์กรครับ? (เช่น HR, ผู้บริหาร, ผู้จัดการทีม)',
};

// ─── LEAD FORM ────────────────────────────────────────────────────────────────

const LeadForm: React.FC<{ topic: string; onSuccess: () => void }> = ({ topic, onSuccess }) => {
  const [form, setForm] = useState<LeadData>({
    name: '', company: '', phone: '', email: '', line_id: '', interest_topic: topic,
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('leads').insert([{
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        line_id: form.line_id,
        interest_topic: form.interest_topic,
        source: 'den_ai_advisor',
      }]);
      if (error) throw error;

      try {
        await supabase.functions.invoke('line-notify', {
          body: {
            formType: 'Den AI Advisor — Lead',
            data: {
              'ชื่อ': form.name,
              'บริษัท': form.company,
              'โทร': form.phone,
              'อีเมล': form.email,
              'Line ID': form.line_id,
              'ความสนใจ': form.interest_topic,
            },
          },
        });
      } catch (_) {
        // non-fatal
      }

      setDone(true);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่หรือติดต่อทาง LINE ครับ');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mt-3 text-center">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <Save className="w-5 h-5 text-white" />
        </div>
        <p className="font-black text-emerald-800 text-sm nav-font">ได้รับข้อมูลแล้วครับ!</p>
        <p className="text-emerald-600 text-xs mt-1">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมงครับ</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#0f3460]/10 rounded-2xl p-5 mt-3 space-y-3 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <GraduationCap className="w-4 h-4 text-[#0f3460]" />
        <span className="font-black text-sm text-[#0f3460] nav-font">ข้อมูลสำหรับปรึกษา</span>
      </div>
      {(['name', 'company', 'phone', 'email', 'line_id'] as const).map((field) => (
        <input
          key={field}
          required
          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
          placeholder={
            field === 'name' ? 'ชื่อ-นามสกุล' :
            field === 'company' ? 'หน่วยงาน / บริษัท' :
            field === 'phone' ? 'เบอร์โทรศัพท์' :
            field === 'email' ? 'อีเมล' : 'Line ID'
          }
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#0f3460]/20 focus:border-[#0f3460] outline-none transition-all"
        />
      ))}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c5a059] text-white py-3 rounded-xl font-black text-sm nav-font flex items-center justify-center gap-2 hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'กำลังส่ง...' : 'ส่งข้อมูลให้ทีมงาน'}
      </button>
      <p className="text-center text-gray-400 text-[10px] nav-font">ปรึกษาฟรี ไม่มีข้อผูกมัด</p>
    </form>
  );
};

// ─── PROGRAM CARD ─────────────────────────────────────────────────────────────

const ProgramCard: React.FC<{ program: string }> = ({ program }) => (
  <div className="bg-gradient-to-br from-[#0f3460] to-[#1a4a7a] rounded-2xl p-5 mt-3 text-white">
    <p className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest nav-font mb-2">
      แนะนำโปรแกรม
    </p>
    <p className="font-black text-base nav-font mb-4 leading-tight">{program}</p>
    <div className="flex gap-2">
      <Link
        to="/courses"
        className="flex-1 bg-[#c5a059] text-white py-2 rounded-xl font-black text-xs nav-font flex items-center justify-center gap-1 hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all"
      >
        ดูรายละเอียด <ChevronRight className="w-3 h-3" />
      </Link>
      <Link
        to="/contact"
        className="flex-1 bg-white/10 text-white py-2 rounded-xl font-black text-xs nav-font flex items-center justify-center gap-1 hover:bg-white/20 transition-all"
      >
        ขอใบเสนอราคา <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  </div>
);

// ─── SOFT CTA ─────────────────────────────────────────────────────────────────

const SoftCTA: React.FC<{ onShowForm: () => void }> = ({ onShowForm }) => (
  <div className="flex flex-wrap gap-2 mt-3 ml-9">
    <button
      onClick={onShowForm}
      className="bg-[#c5a059] text-white px-3 py-1.5 rounded-full text-[11px] font-black nav-font hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all shadow-sm"
    >
      ใช่ ต้องการปรึกษา
    </button>
    <Link
      to="/courses"
      className="bg-white text-[#0f3460] border border-[#0f3460]/20 px-3 py-1.5 rounded-full text-[11px] font-black nav-font hover:bg-[#0f3460] hover:text-white transition-all shadow-sm"
    >
      ดูหลักสูตรก่อน
    </Link>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem('capvision_ai_session_id');
    if (saved) return saved;
    const newId = crypto.randomUUID();
    localStorage.setItem('capvision_ai_session_id', newId);
    return newId;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('capvision_ai_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFormForIdx, setShowFormForIdx] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<{ role: string; content: string }[]>(
    (() => {
      try {
        const saved = localStorage.getItem('capvision_ai_history');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    })()
  );

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  // Save messages & history to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('capvision_ai_messages', JSON.stringify(messages));
      localStorage.setItem('capvision_ai_history', JSON.stringify(historyRef.current));
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([WELCOME]);
      historyRef.current = [];
    }
    scrollToBottom();
  }, [isOpen, messages.length]);

  useEffect(() => { if (messages.length) scrollToBottom(); }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendToAI = useCallback(async (text: string) => {
    setIsTyping(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: text,
          history: historyRef.current,
          session_id: sessionId,
          user_context: {},
        },
      });

      if (error || !data?.reply) {
        throw new Error(error?.message || 'Empty response');
      }

      // Update history for next turn
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: text },
        { role: 'assistant', content: data.reply },
      ];

      const aiMsg: Message = {
        role: 'assistant',
        content: data.reply,
        showLeadForm: data.show_lead_form,
        suggestedProgram: data.suggested_program,
        ctaType: data.cta_type,
      };
      setMessages(prev => {
        const next = [...prev, aiMsg];
        if (data.show_lead_form) setShowFormForIdx(next.length - 1);
        return next;
      });
    } catch (err) {
      console.error('AI error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'ขออภัยครับ ขณะนี้ระบบขัดข้องชั่วคราว กรุณาติดต่อทาง LINE ได้เลยครับ',
        ctaType: 'none',
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [sessionId]);

  const handleSend = (overrideText?: string) => {
    const text = overrideText ?? input;
    if (!text.trim() || isTyping) return;
    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    sendToAI(text);
  };

  const renderMarkdown = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');

  return (
    <div className="fixed bottom-6 right-5 md:right-6 z-[9999] flex flex-col items-end">
      {/* ── CHAT WINDOW ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="mb-4 w-[calc(100vw-24px)] md:w-[400px] max-h-[88svh] md:max-h-[660px] bg-white rounded-[1.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ animation: 'chatSlideUp 0.28s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f3460] to-[#1a4a7a] px-5 py-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full border-2 border-[#c5a059] overflow-hidden bg-white/20">
                  <img src="/images/denmasterfa.jpg" alt="ครูเด่น AI" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f3460]" />
              </div>
              <div>
                <h3 className="font-black text-[15px] nav-font leading-none">ครูเด่น AI</h3>
                <span className="text-[10px] text-[#c5a059] font-bold tracking-wider uppercase">
                  AI Advisor · ออนไลน์
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/10 hover:bg-white/25 p-2 rounded-full transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f7f9fc]">

            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-start gap-2 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full border border-[#c5a059]/40 overflow-hidden flex-shrink-0 mt-0.5">
                      <img src="/images/denmasterfa.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                      m.role === 'user'
                        ? 'bg-[#0f3460] text-white rounded-tr-sm'
                        : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-blue-50/80'
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                  />
                </div>

                {/* CTA widgets */}
                {m.role === 'assistant' && (
                  <>
                    {(m.showLeadForm || showFormForIdx === idx) && (
                      <div className="w-full max-w-[88%] ml-9">
                        <LeadForm
                          topic={m.suggestedProgram ?? 'AI Advisor Consultation'}
                          onSuccess={() => setShowFormForIdx(null)}
                        />
                      </div>
                    )}
                    {m.suggestedProgram && !m.showLeadForm && (
                      <div className="w-full max-w-[88%] ml-9">
                        <ProgramCard program={m.suggestedProgram} />
                      </div>
                    )}
                    {m.ctaType === 'soft_cta' && !m.showLeadForm && !m.suggestedProgram && (
                      <SoftCTA onShowForm={() => setShowFormForIdx(idx)} />
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-[#c5a059]/40 overflow-hidden shrink-0">
                  <img src="/images/denmasterfa.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-blue-50 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Starters — shown only on first message */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3 bg-[#f7f9fc] grid grid-cols-2 gap-2">
              {QUICK_STARTERS.map((q, i) => {
                const Icon = q.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(q.value)}
                    disabled={isTyping}
                    className="bg-white border border-[#0f3460]/10 px-3 py-2.5 rounded-xl text-[11px] font-black text-[#0f3460] nav-font hover:border-[#c5a059] hover:bg-[#c5a059]/5 transition-all flex items-center gap-2 text-left"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    {q.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="คุยกับครูเด่น AI ได้ที่นี่..."
              disabled={isTyping}
              className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3460]/20 border border-gray-200 disabled:opacity-60 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="bg-[#0f3460] disabled:opacity-40 text-white p-3 rounded-xl hover:bg-[#1a4a7a] transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ── TOGGLE BUTTON ────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-label="ปรึกษาครูเด่น AI"
        className={`group relative flex items-center justify-center transition-all duration-400 rounded-full shadow-[0_8px_32px_rgba(15,52,96,0.45)] ${
          isOpen
            ? 'bg-gray-800 p-3 rotate-90 scale-90'
            : 'bg-[#0f3460] p-4 hover:scale-110 active:scale-95'
        }`}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#0f3460] animate-ping opacity-20" />
        )}
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-white text-[#0f3460] px-5 py-3 rounded-2xl shadow-2xl font-black nav-font text-[13px] whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-blue-50 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            ปรึกษาครูเด่น AI
            <div className="absolute top-1/2 right-[-7px] -translate-y-1/2 w-0 h-0 border-l-[7px] border-l-white border-y-[5px] border-y-transparent" />
          </div>
        )}

        {/* Unread badge when closed and not interacted */}
        {!isOpen && messages.length === 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#c5a059] rounded-full flex items-center justify-center">
            <span className="text-white text-[8px] font-black">1</span>
          </div>
        )}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AIAgent;
