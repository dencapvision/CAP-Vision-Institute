import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, Sparkles, User, X } from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';
import { SERVICES_LIST as SERVICES } from '../constants/services';
import { supabase } from '../lib/supabaseClient';
import { fetchCourses } from '../services/courses';
import { fetchOnlineCourses } from '../services/onlineCourses';
import type { Course, OnlineCourse } from '../types';

type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

const INITIAL_MESSAGE =
  'สวัสดีครับ ผมคือ KruDen AI Advisor พร้อมช่วยวิเคราะห์โจทย์การเรียนรู้ ภาวะผู้นำ ทีม และหลักสูตรที่เหมาะกับองค์กรของคุณครับ';

const FALLBACK_MESSAGE =
  'ขออภัยครับ ระบบ AI ยังไม่พร้อมใช้งานในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือทัก LINE เพื่อให้ทีมช่วยดูแลต่อครับ';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const sessionIdRef = useRef(`web-chat-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const contextRef = useRef<Record<string, unknown> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initContext = async () => {
    if (contextRef.current || isInitializing) return;

    setIsInitializing(true);
    try {
      const [allCourses, allOnlineCourses] = await Promise.all([
        fetchCourses().catch(() => [] as Course[]),
        fetchOnlineCourses().catch(() => [] as OnlineCourse[]),
      ]);

      contextRef.current = {
        courses: [
          ...allCourses.map((course) => `- ${course.title}: ${course.description}`),
          ...allOnlineCourses.map((course) => `- [Online] ${course.title}`),
        ].join('\n'),
        services: SERVICES.map((service) => `- ${service.title}: ${service.description}`).join('\n'),
        contact: {
          line: CONTACT_INFO.line,
          lineUrl: CONTACT_INFO.lineUrl,
          phone: CONTACT_INFO.phone,
        },
      };
    } catch (error) {
      console.error('Failed to initialize chat context:', error);
      contextRef.current = {};
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (isOpen) void initContext();
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage || isTyping || isInitializing) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      if (!contextRef.current) await initContext();

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userMessage,
          history: messages.map((message) => ({
            role: message.role === 'model' ? 'assistant' : 'user',
            content: message.text,
          })),
          session_id: sessionIdRef.current,
          user_context: contextRef.current ?? {},
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: 'model', text: data?.reply || FALLBACK_MESSAGE },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'model', text: FALLBACK_MESSAGE }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gold-gradient text-white p-5 rounded-full shadow-[0_15px_40px_-10px_rgba(197,160,89,0.5)] hover:scale-110 active:scale-95 transition-all border-4 border-white"
          aria-label="Open KruDen AI chat"
        >
          <MessageSquare className="w-8 h-8" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[95vw] md:w-[450px] h-[650px] max-h-[85vh] rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(15,52,96,0.3)] flex flex-col overflow-hidden border border-gray-100">
          <div className="bg-[#0f3460] p-5 flex items-center justify-between text-white border-b-4 border-[#c5a059]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#c5a059]" />
              </div>
              <div>
                <h3 className="font-bold nav-font text-base leading-tight">KruDen AI Advisor</h3>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isInitializing ? 'bg-yellow-400' : 'bg-green-400'}`} />
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">
                    {isInitializing ? 'Preparing context' : 'Server-side AI'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-2 rounded-xl transition-colors"
              aria-label="Close KruDen AI chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-5 bg-gray-50/50">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${message.role === 'user' ? 'bg-[#c5a059] text-white' : 'bg-white text-[#0f3460] border border-gray-100'}`}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-3xl text-[15px] shadow-sm ${message.role === 'user' ? 'bg-[#0f3460] text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                    <p className="whitespace-pre-wrap font-medium">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:150ms]" />
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-gray-100">
            <div className="relative">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void handleSend();
                  }
                }}
                disabled={isInitializing}
                placeholder={isInitializing ? 'กำลังเตรียมข้อมูล...' : 'พิมพ์โจทย์ที่อยากปรึกษา...'}
                rows={1}
                className="w-full pl-5 pr-14 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] focus:bg-white transition-all text-sm font-medium resize-none overflow-hidden"
              />
              <button
                onClick={() => void handleSend()}
                disabled={!input.trim() || isTyping || isInitializing}
                className={`absolute right-3 top-3 p-2 rounded-xl transition-all ${input.trim() && !isTyping && !isInitializing ? 'bg-[#0f3460] text-white shadow-lg shadow-blue-900/20' : 'bg-gray-200 text-gray-400'}`}
                aria-label="Send chat message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between px-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">AI runs via secure Edge Function</p>
              <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noreferrer" className="text-[10px] text-[#c5a059] font-black underline nav-font">
                นัดปรึกษากับทีม
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
