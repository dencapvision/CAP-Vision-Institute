import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Phone, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { CONTACT_INFO, BRAND_INFO } from '../constants/brand';
import { IconGoldCrestStar } from './icons/CapBrandIcons';

export const FloatingLineWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  // Auto-open subtle preview after 4 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      {/* ── Expanded / Floating Popup Modal ── */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 w-[calc(100vw-2.5rem)] sm:w-84 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#111827] via-[#0F2557] to-[#111827] text-white p-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/denmasterfa.jpg"
                  alt={BRAND_INFO.director}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#F59E0B] shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                  }}
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#06C755] border-2 border-[#111827] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#F59E0B] uppercase tracking-wider">
                    Online Now
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] animate-pulse"></span>
                </div>
                <h4 className="text-sm font-black text-white nav-font">
                  ปรึกษาหลักสูตร In-house ด่วน
                </h4>
                <p className="text-[11px] text-gray-300 font-light">
                  {BRAND_INFO.director} & Master Facilitators
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-2.5 bg-[#F8FAFC]">
            <p className="text-xs text-gray-600 leading-relaxed font-medium px-1">
              สนใจจัดฝึกอบรม หรือต้องการคำแนะนำออกแบบ Learning Journey เฉพาะองค์กร? ทักทายสอบถามได้ทันทีครับ
            </p>

            {/* Quick Action 1: LINE OA */}
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#06C755] hover:bg-[#05B34C] text-white p-3.5 rounded-2xl font-black text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span>ทัก LINE OA ทันที (@capvision)</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Quick Action 2: Free Assessment */}
            <a
              href="/assessment"
              className="flex items-center justify-between w-full bg-white hover:bg-gray-50 text-[#111827] border border-gray-200/80 p-3 rounded-2xl font-bold text-xs shadow-xs active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center">
                  <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <span>ประเมินจุดปลดล็อกองค์กร (3 นาที)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
            </a>

            {/* Quick Action 3: Call Hotline */}
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full text-center text-gray-500 hover:text-[#0F2557] py-2 text-[11px] font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>โทรปรึกษาด่วน: {CONTACT_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}

      {/* ── Floating Bubble Prompt (When closed, but prompted) ── */}
      {!isOpen && hasPrompted && (
        <div
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto mb-2 cursor-pointer bg-[#111827] text-white px-4 py-2 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2.5 animate-bounce text-xs font-bold hover:bg-[#0F2557] transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#06C755]"></span>
          <span>ปรึกษาหลักสูตรองค์กรด่วน ทัก LINE ได้ครับ 👋</span>
          <X
            className="w-3.5 h-3.5 text-gray-400 hover:text-white ml-1"
            onClick={(e) => {
              e.stopPropagation();
              setHasPrompted(false);
            }}
          />
        </div>
      )}

      {/* ── Main Circular Trigger Button ── */}
      <div className="pointer-events-auto relative group">
        {/* Ping Animation Ring */}
        <span className="absolute -inset-1 bg-[#06C755] rounded-full blur-sm opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse"></span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#06C755] hover:bg-[#05B34C] text-white shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 group-hover:shadow-emerald-500/40"
          aria-label="LINE OA Quick Contact"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-white/20" />
              {/* Notification Pill */}
              <span className="absolute -top-1 -right-1 bg-[#F59E0B] text-[#111827] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingLineWidget;
