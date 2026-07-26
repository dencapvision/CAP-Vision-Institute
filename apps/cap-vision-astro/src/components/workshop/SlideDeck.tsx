import React, { useState } from 'react';
import type {  Slide  } from '../../types';
import { ChevronLeft, ChevronRight, Monitor, Layout, Sparkles } from 'lucide-react';

export const SlideDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      section: "INTRO",
      title: "GROWTH MASTERY",
      theme: "dark",
      content: (
        <div className="text-center space-y-8 flex flex-col items-center justify-center h-full">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#c5a059]/20 rounded-full blur-2xl group-hover:bg-[#c5a059]/30 transition-all duration-700 animate-pulse"></div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 nav-font relative bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              DESIGN YOUR LIFE
            </h1>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-[#c5a059] nav-font tracking-widest uppercase">
            ออกแบบชีวิต ปลุกพลังลงมือทำ
          </div>
          <div className="pt-12 relative">
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mb-6"></div>
            <p className="text-xl font-medium tracking-[0.2em] opacity-80">โดย ครูเด่น มาสเตอร์ ฟา</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      section: "CHECK-IN",
      title: "ENERGY CHECK",
      theme: "gold",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
          <div className="space-y-8">
            <p className="text-3xl leading-relaxed opacity-80">ก่อนเราจะเริ่มออกแบบชีวิต...</p>
            <h3 className="text-5xl font-black nav-font leading-tight">
              วันนี้ใจของคุณพร้อมเติบโตระดับไหน? <span className="text-[#c5a059]">(0-100%)</span>
            </h3>
          </div>
          <div className="flex justify-center">
            <div className="w-56 h-80 rounded-[3rem] p-3 relative overflow-hidden bg-white/5 border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#c5a059] to-[#ebd49d] transition-all duration-1000 ease-out" style={{ height: '85%' }}>
                  <div className="absolute top-0 left-0 right-0 h-4 bg-white/30 animate-pulse"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <span className="text-6xl font-black nav-font text-white drop-shadow-lg">85%</span>
                  <span className="text-xs font-bold tracking-widest opacity-60 uppercase mt-2">Ready to Grow</span>
                </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      section: "MINDSET",
      title: "Why Growth Mindset?",
      theme: "dark",
      content: (
        <div className="flex flex-col justify-center h-full space-y-10">
          <div className="grid grid-cols-1 gap-6">
            {[
              { id: "01", text: "โลกเปลี่ยนไว - ความรู้เดิมหมดอายุเร็วมาก", sub: "Adaptability is the new currency" },
              { id: "02", text: "ทีมจะแกร่ง - คนต้อง \"เก่งขึ้น\" จากภายใน", sub: "Inside-out transformation" },
              { id: "03", text: "\"ความล้มเหลว ไม่ใช่ทางตัน แต่เป็นบันได\"", sub: "Failure as a data point for growth" }
            ].map((item, i) => (
              <div key={i} className="group flex items-center gap-8 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-x-4 duration-500">
                <span className="text-5xl font-black text-[#c5a059]/30 nav-font group-hover:text-[#c5a059] transition-colors">{item.id}</span>
                <div>
                  <p className="text-3xl font-bold nav-font">{item.text}</p>
                  <p className="text-sm opacity-40 uppercase tracking-widest mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      section: "MINDSET",
      title: "Fixed vs. Growth",
      theme: "dark",
      content: (
        <div className="grid grid-cols-2 gap-10 h-full">
          <div className="bg-red-500/5 p-10 rounded-[2.5rem] border border-red-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
            <h3 className="text-red-400 font-black text-3xl mb-8 nav-font tracking-widest uppercase">FIXED MINDSET</h3>
            <ul className="space-y-6 text-xl italic opacity-60 font-medium">
              <li className="flex items-center gap-4"><span>✕</span> "ฉันทำไม่ได้หรอก"</li>
              <li className="flex items-center gap-4"><span>✕</span> "เขามีพรสวรรค์ ฉันไม่มี"</li>
              <li className="flex items-center gap-4"><span>✕</span> "ยากเกินไป เสียเวลา"</li>
            </ul>
          </div>
          <div className="bg-[#c5a059]/5 p-10 rounded-[2.5rem] border border-[#c5a059]/30 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/20 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
            <h3 className="text-[#ebd49d] font-black text-3xl mb-8 nav-font tracking-widest uppercase">GROWTH MINDSET</h3>
            <ul className="space-y-6 text-xl font-bold">
              <li className="flex items-center gap-4 text-white"><Sparkles className="w-5 h-5 text-[#c5a059]" /> "ฉันเรียนรู้และฝึกฝนได้"</li>
              <li className="flex items-center gap-4 text-white"><Sparkles className="w-5 h-5 text-[#c5a059]" /> "ความพยายามทำให้เก่งขึ้น"</li>
              <li className="flex items-center gap-4 text-white"><Sparkles className="w-5 h-5 text-[#c5a059]" /> "นี่คือโอกาสที่จะท้าทายตนเอง"</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 5,
      section: "LIFE PLANNING",
      title: "WHEEL OF LIFE",
      theme: "dark",
      content: (
        <div className="flex items-center gap-16 h-full">
          <div className="w-1/2 space-y-8">
             <div className="p-8 bg-white/5 rounded-3xl border-l-[6px] border-[#c5a059] backdrop-blur-sm hover:bg-white/10 transition-all">
               <p className="text-2xl font-bold leading-relaxed italic">"งานรุ่ง แต่สุขภาพร่วง = ไม่คุ้ม"</p>
             </div>
             <div className="p-8 bg-white/5 rounded-3xl border-l-[6px] border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all">
               <p className="text-2xl font-bold leading-relaxed italic">"เงินดี แต่ไม่มีครอบครัว = วางเปล่า"</p>
             </div>
          </div>
          <div className="w-1/2">
            <h3 className="text-5xl font-black nav-font leading-[1.2] text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
              ถึงเวลา... เช็คสมดุล <br />
              <span className="text-[#c5a059]">"วงล้อชีวิต"</span> ของคุณ
            </h3>
            <p className="mt-6 text-xl opacity-50 font-medium">8 ด้านที่ประกอบกันเป็นตัวตนที่สมบูรณ์</p>
          </div>
        </div>
      )
    },
    {
      id: 6,
      section: "ACTION",
      title: "THE 1% RULE",
      theme: "dark",
      content: (
        <div className="grid grid-cols-2 gap-12 items-center h-full">
           <div className="text-center relative">
              <div className="absolute inset-0 bg-[#c5a059]/20 blur-[100px] rounded-full"></div>
              <div className="relative">
                <div className="text-[10rem] font-black nav-font leading-none text-white">1%</div>
                <p className="text-3xl mt-4 font-bold tracking-[0.3em] uppercase text-[#c5a059]">Small Wins</p>
              </div>
           </div>
           <div className="space-y-8">
              <p className="text-3xl opacity-70">ดีขึ้นวันละ 1% ครบ 1 ปี...</p>
              <div className="p-8 bg-gradient-to-br from-[#c5a059] to-[#ebd49d] rounded-[3rem] shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <p className="text-5xl font-black nav-font text-[#0f3460]">ดีขึ้น 37 เท่า!</p>
              </div>
              <p className="text-xl italic opacity-50">"ไม่ต้องเปลี่ยนโลกใขข้ามคืน แค่ก้าวต่อก้าว"</p>
           </div>
        </div>
      )
    },
    {
      id: 7,
      section: "CLOSING",
      title: "START YOUR JOURNEY",
      theme: "dark",
      content: (
        <div className="text-center space-y-12 flex flex-col items-center justify-center h-full">
           <div className="max-w-3xl">
             <p className="text-4xl md:text-5xl leading-tight italic font-medium opacity-90 nav-font">
               "The best way to <span className="text-[#c5a059]">predict the future</span> is to <span className="text-white font-black underline decoration-[#c5a059] underline-offset-8">create it.</span>"
             </p>
           </div>
           <div className="h-[2px] w-32 bg-[#c5a059] mx-auto opacity-30"></div>
           <div className="space-y-2">
              <p className="text-3xl font-black nav-font tracking-widest text-[#c5a059]">ขอบคุณและสวัสดีครับ</p>
              <p className="opacity-40 font-bold tracking-[0.2em] uppercase text-sm">Kru Den Master Fa | CAP Vision Partner</p>
           </div>
        </div>
      )
    }
  ];

  const next = () => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
  const prev = () => setCurrentSlide(prev => Math.max(0, prev - 1));

  const themeClasses = {
    dark: 'bg-[#0f3460]',
    gold: 'bg-gradient-to-br from-[#c5a059] to-[#ebd49d]',
    navy: 'bg-[#1a1a2e]'
  };

  return (
    <div className="w-full flex flex-col items-center max-w-6xl mx-auto px-4">
      {/* Slide Viewport */}
      <div className={`relative w-full aspect-video rounded-[3rem] shadow-2xl overflow-hidden mb-12 transition-all duration-700 border border-white/10 ${themeClasses[slides[currentSlide].theme as keyof typeof themeClasses] || themeClasses.dark}`}>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-[#c5a059]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-black/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl pointer-events-none"></div>

        {/* Slide Content */}
        <div className="h-full p-12 md:p-16 flex flex-col relative z-10 text-white">
          <header className="flex justify-between items-start mb-12">
            <div className="group">
               <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-[#c5a059] mb-2 nav-font">
                 {slides[currentSlide].section}
               </p>
               <h2 className="text-3xl md:text-5xl font-black tracking-tight nav-font leading-none uppercase">
                 {slides[currentSlide].title}
               </h2>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl md:text-4xl font-black opacity-10 nav-font leading-none">{currentSlide + 1}</div>
              <div className="h-1 w-12 bg-[#c5a059] mt-2 rounded-full opacity-30"></div>
            </div>
          </header>

          <main className="flex-grow">
            <div className="transition-all duration-500 transform translate-y-0 opacity-100">
              {slides[currentSlide].content}
            </div>
          </main>

          <footer className="mt-8 flex justify-between items-end border-t border-white/5 pt-6">
            <div className="flex items-center gap-4">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c5a059] to-[#ebd49d] flex items-center justify-center p-1.5 shadow-lg">
                 <Monitor className="w-full h-full text-[#0f3460]" />
               </div>
               <p className="text-[9px] md:text-xs opacity-40 uppercase tracking-[0.3em] font-bold nav-font">
                 Growth Mastery Workshop
               </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] md:text-xs font-black tracking-widest text-[#c5a059] nav-font uppercase">Art of Growth</p>
              <p className="text-[8px] opacity-30 font-bold">CAP VISION INSTITUTE</p>
            </div>
          </footer>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="no-print w-full flex flex-col items-center">
        <div className="flex items-center gap-8 mb-8">
          <button 
            onClick={prev} 
            disabled={currentSlide === 0}
            className="p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl md:rounded-3xl hover:bg-white/10 disabled:opacity-20 transition-all active:scale-90 text-white group"
          >
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="hidden md:flex bg-white/5 backdrop-blur-md px-10 py-5 border border-white/10 shadow-xl rounded-[2.5rem] items-center gap-3">
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-500 ease-out hover:scale-125 ${i === currentSlide ? 'w-12 bg-gradient-to-r from-[#c5a059] to-[#ebd49d]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>

          <div className="md:hidden text-white font-black nav-font tracking-widest text-xl opacity-60">
            {currentSlide + 1} / {slides.length}
          </div>

          <button 
            onClick={next} 
            disabled={currentSlide === slides.length - 1}
            className="p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl md:rounded-3xl hover:bg-white/10 disabled:opacity-20 transition-all active:scale-90 text-white group border-r-4 border-r-[#c5a059]/30"
          >
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Jump Grid */}
        <div className="grid grid-cols-7 gap-3 w-full max-w-2xl px-4 overflow-auto pb-8">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`aspect-video rounded-xl border-2 transition-all duration-500 flex items-center justify-center relative group overflow-hidden ${i === currentSlide ? 'border-[#c5a059] scale-110 shadow-2xl z-10' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-[#0f3460] to-black opacity-80`}></div>
              <span className={`relative z-10 font-black text-sm nav-font ${i === currentSlide ? 'text-[#c5a059]' : 'text-white/40'}`}>{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CSS for Print */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .printable-slide {
            page-break-after: always;
            width: 297mm;
            height: 210mm;
            padding: 30px !important;
            background: white !important;
            color: black !important;
            border: 1px solid #eee !important;
            border-radius: 0 !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .printable-slide * {
            color: black !important;
            background-color: transparent !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
          .printable-slide h1, 
          .printable-slide h2, 
          .printable-slide h3,
          .printable-slide .nav-font {
            color: #0f3460 !important;
            -webkit-text-fill-color: #0f3460 !important;
          }
          .printable-slide .text-[#c5a059] {
            color: #c5a059 !important;
            -webkit-text-fill-color: #c5a059 !important;
          }
        }
      `}} />
    </div>
  );
};
