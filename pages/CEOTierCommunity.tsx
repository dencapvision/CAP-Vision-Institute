import React, { useState } from 'react';
import {
  Shield, Users, MessageCircle, Zap, Brain,
  CheckCircle2, XCircle, ChevronDown, ArrowRight, ChevronRight,
  Star, Lock, TrendingUp, Target, Sparkles,
  Crown, Eye, Clock
} from 'lucide-react';
import SEO from '../components/SEO';
import { CONTACT_INFO, CLIENTS as BRAND_CLIENTS } from '../constants/brand';

// ─── Logos & Assets ───────────────────────────────────────────────────────────
const CAP_LOGO = 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/cap%20vision%20logo.png';
const NEWDICE_LOGO = 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/Logo-newdice.png';
const COMMUNITY_HERO = 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/service/CEO%20Tier%20Community.jpg';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  { icon: <XCircle className="w-6 h-6 text-red-400" />, text: 'คุยกับทีมไม่ได้ เพราะคุณคือคนตัดสินใจ' },
  { icon: <XCircle className="w-6 h-6 text-red-400" />, text: 'คุยกับเพื่อนไม่เข้าใจ เพราะเขาไม่ได้อยู่ในเกมเดียวกัน' },
  { icon: <XCircle className="w-6 h-6 text-red-400" />, text: 'คุยในโซเชียลไม่ได้ เพราะบางเรื่อง "พูดไม่ได้"' },
];

const CORE_VALUES = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Safe Space for Real Talk',
    desc: 'พื้นที่ปลอดภัยสำหรับเรื่องจริง ที่พูดที่อื่นไม่ได้',
    color: '#c5a059',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Peer-Level Thinking',
    desc: 'ได้มุมมองจาก CEO ที่ "อยู่ในสนามเดียวกัน"',
    color: '#c5a059',
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'No Selling, No Pitch',
    desc: 'ไม่มีการขาย ไม่มี Hidden Agenda ทุกคนมาเพื่อแลกเปลี่ยนจริง',
    color: '#c5a059',
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Facilitated by Expert',
    desc: 'วงสนทนาถูกออกแบบด้วยศาสตร์ Facilitation เพื่อดึง Insight ที่ลึกและใช้งานได้จริง',
    color: '#c5a059',
  },
];

const EXPERIENCES = [
  'แลกเปลี่ยน Case จริง ทั้ง Success & Failure',
  'วิเคราะห์การตัดสินใจระดับธุรกิจ',
  'ถอดบทเรียนแบบ Real-time',
  'ตั้งคำถามที่ "ไม่มีใครเคยถามคุณ"',
];

const QUALIFIED = [
  'CEO / Founder',
  'ธุรกิจ 50–100 ล้านบาทต่อปี',
  'ต้องการ "โตแบบมีสติ ไม่ใช่โตแบบเสี่ยง"',
  'พร้อมเปิดใจและแลกเปลี่ยนจริง',
];

const NOT_FOR = [
  'คนที่มาหาคอนเนคชั่น',
  'คนที่มาขายของ',
  'คนที่ยังไม่อยู่ในระดับตัดสินใจธุรกิจ',
];

const STEPS = [
  { no: '01', icon: <Target className="w-6 h-6" />, title: 'Apply', desc: 'กรอกฟอร์มสมัคร' },
  { no: '02', icon: <Eye className="w-6 h-6" />, title: 'Screening', desc: 'คัดเลือกเพื่อรักษาคุณภาพวง' },
  { no: '03', icon: <CheckCircle2 className="w-6 h-6" />, title: 'Confirmation', desc: 'รับสิทธิ์เข้าร่วม' },
  { no: '04', icon: <MessageCircle className="w-6 h-6" />, title: 'Private Session', desc: 'เข้าวงสนทนา' },
];

const OUTCOMES = [
  { icon: <TrendingUp className="w-6 h-6" />, title: 'มุมมองใหม่', desc: 'ในการตัดสินใจทางธุรกิจ' },
  { icon: <Brain className="w-6 h-6" />, title: 'ความชัดเจน', desc: 'ในทิศทางธุรกิจของคุณ' },
  { icon: <Users className="w-6 h-6" />, title: 'Connection ที่ลึก', desc: 'ไม่ใช่เยอะ แต่ใช่จริง' },
  { icon: <Zap className="w-6 h-6" />, title: 'ลดความโดดเดี่ยว', desc: 'ของการเป็นผู้นำ' },
];

const ACTIVITIES = [
  { url: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa1.jpg', title: 'CEO Roundtable' },
  { url: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa2.jpg', title: 'Strategic Planning' },
  { url: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa3.jpg', title: 'Executive Coaching' },
  { url: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa4.jpg', title: 'Leadership Workshop' },
  { url: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa5.jpg', title: 'Organizational Design' },
  { url: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/den%20masterfa6.jpg', title: 'Mindset Transformation' },
];

const FAQS = [
  {
    q: 'CEO Tier ต่างจาก Networking Event ยังไง?',
    a: 'CEO Tier ไม่ใช่ Networking Event ทั่วไป ไม่มีการแจกนามบัตร ไม่มีการขายของ แต่เป็น Facilitated Dialogue ที่ออกแบบมาเพื่อการแลกเปลี่ยนเชิงลึกในกลุ่มเล็ก เน้นคุณภาพของบทสนทนา ไม่ใช่ปริมาณคนรู้จัก',
  },
  {
    q: 'ต้องมีรายได้เท่าไหร่ถึงเข้าร่วมได้?',
    a: 'เราเน้นธุรกิจที่มีรายได้ 50–100 ล้านบาทต่อปี เพราะต้องการให้ทุกคนในวงอยู่ในระดับการตัดสินใจที่ใกล้เคียงกัน เพื่อให้บทสนทนาเกิดประโยชน์สูงสุดสำหรับทุกคน',
  },
  {
    q: 'มีการขายของในวงไหม?',
    a: 'ไม่มีเลย ทุก Session ถูก Facilitate โดยผู้เชี่ยวชาญ และมีกติกาชัดเจนว่าห้ามขายหรือ Pitch ใด ๆ ทั้งสิ้น CEO Tier ถูกออกแบบให้เป็นพื้นที่บริสุทธิ์สำหรับการแลกเปลี่ยน',
  },
  {
    q: 'ถ้าไม่เคยเข้าร่วมมาก่อน จะเข้าร่วมได้ไหม?',
    a: 'ได้ครับ ไม่จำเป็นต้องเคยเข้าร่วมมาก่อน เราคัดเลือกจากระดับและความพร้อมในการแลกเปลี่ยน ไม่ใช่จากประวัติการเข้าร่วมกิจกรรม',
  },
  {
    q: 'ความลับในวงถูกเก็บอย่างไร?',
    a: 'ทุก Session ดำเนินภายใต้ Chatham House Rule — สิ่งที่พูดในวงสามารถนำไปใช้ได้ แต่ไม่มีการเปิดเผยว่าใครพูด ทุกคนเซ็นข้อตกลงความลับก่อนเข้าร่วม',
  },
];

const FACilitators = [
  {
    name: 'ครูเด่น มาสเตอร์ฟา',
    realName: 'อนุสรณ์ หนองนา',
    title: 'Master Facilitator & AI Learning Designer',
    desc: 'ผู้เชี่ยวชาญด้านการพัฒนาศักยภาพมนุษย์และออกแบบการเรียนรู้ระดับพรีเมี่ยม Founder of CAP-Vision Institute ผู้นำกระบวนการ Facilitation ที่เปลี่ยน Mindset องค์กรชั้นนำมาแล้วมากมาย',
    image: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/denmasterfa.jpg',
    slug: 'den-masterfa'
  },
  {
    name: 'คุณไนท์ ไกรพุฒิ',
    realName: 'ไกรพุฒิ อินทรโยรา',
    title: 'Strategic Policy & Technology Advisor',
    desc: 'ผู้ช่วยประธานสภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย และคณะทำงานรัฐมนตรีดีอี ผู้เชี่ยวชาญด้านยุทธศาสตร์ดิจิทัลเพื่อเศรษฐกิจและสังคม และความมั่นคงไซเบอร์ระดับประเทศ',
    image: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha.jpg',
    slug: 'kraiput-intarayotha'
  }
];

// ─── Component ────────────────────────────────────────────────────────────────

const CEOTierCommunity: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#0a0a1a] text-white min-h-screen selection:bg-[#c5a059]/30">
      <SEO
        title="CEO Tier Community | Private Exchange Session สำหรับ CEO ระดับ 50-100 ล้าน | CAP Vision x NEWDICE"
        description="พื้นที่ปลอดภัยสำหรับ CEO คุยได้แค่กับ CEO Private Roundtable สำหรับผู้นำธุรกิจ 50-100 ล้านบาท โดย CAP Vision Institute x NEWDICE"
      />

      {/* ─── PARTNERSHIP BADGE ───────────────────────────────────────────────── */}
      <div className="bg-[#0f0f20]/90 backdrop-blur-xl border-b border-[#c5a059]/10 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#c5a059]/60 text-[10px] font-bold tracking-[0.2em] uppercase hidden sm:block">A Collaboration of Distinction</span>
          </div>
          <div className="flex items-center gap-8">
            <img src={CAP_LOGO} alt="CAP Vision Institute" className="h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all cursor-pointer" />
            <span className="text-[#c5a059]/30 text-xl font-light">|</span>
            <img src={NEWDICE_LOGO} alt="NEWDICE" className="h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
        {/* Advanced Background effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#c5a059]/5 rounded-full blur-[140px] opacity-40 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#0f3460]/20 rounded-full blur-[120px] opacity-30" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c5a059 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-5 py-2.5 rounded-full mb-10 group cursor-default">
                <Crown className="w-4 h-4 text-[#c5a059] group-hover:scale-125 transition-transform" />
                <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] nav-font">
                  Private · Exclusive · CEO Only
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black nav-font leading-[0.95] tracking-tight mb-8">
                <span className="font-gold block mb-4">CEO Tier</span>
                <span className="text-white">Community</span>
              </h1>

              <div className="relative pl-8 mb-12 border-l-4 border-[#c5a059]">
                <p className="text-3xl md:text-4xl text-white/90 font-light italic leading-relaxed">
                  "เมื่อคุณอยู่บนยอดเขา… <br/> บางเรื่องคุยได้แค่กับคนที่อยู่ระดับเดียวกัน"
                </p>
              </div>

              <div className="space-y-6 mb-14 max-w-2xl">
                <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
                  Private Exchange Session สำหรับผู้นำธุรกิจ <br className="hidden md:block"/>
                  ที่ต้องการ <span className="text-[#c5a059] font-bold underline decoration-[#c5a059]/30 underline-offset-8">โตอย่างมีสติและยั่งยืน</span>
                </p>
                <p className="text-white/40 text-lg leading-relaxed italic">
                  *สิทธิ์เข้าร่วมจำกัด ธุรกิจรายได้ 50–100 ล้านบาทต่อปี*
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-4 bg-[#c5a059] text-[#0a0a1a] px-12 py-6 rounded-2xl font-black text-lg nav-font shadow-[0_20px_50px_-12px_rgba(197,160,89,0.3)]"
                >
                  สมัครเข้าร่วมวง CEO Tier
                  <ArrowRight className="w-6 h-6" />
                </a>
                <div className="flex flex-col gap-1">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0a0a1a] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-black text-[#c5a059]">CEO</div>
                     ))}
                   </div>
                   <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">Strict Selection Process</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute -inset-10 bg-[#c5a059]/20 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
              <div className="relative glass-panel p-3 rounded-[3.5rem] border-white/5 shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={COMMUNITY_HERO} 
                  alt="CEO Tier Community" 
                  className="w-full h-full object-cover rounded-[2.8rem] aspect-[4/5] lg:aspect-[3.5/4.5] grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                />
                
                {/* Floating Insight Card */}
                <div className="absolute bottom-12 left-10 right-10 z-20 glass-panel !bg-[#0f0f20]/40 p-8 rounded-3xl border-[#c5a059]/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                   <div className="w-10 h-10 rounded-xl bg-[#c5a059] mb-5 flex items-center justify-center text-[#0a0a1a]">
                      <Sparkles className="w-6 h-6" />
                   </div>
                   <p className="text-white text-lg font-black leading-tight mb-2">Exclusive Insight Room</p>
                   <p className="text-white/50 text-xs">แลกเปลี่ยนกลยุทธ์จากหน้างานจริง ที่ไม่มีเขียนในตำราเล่มไหน</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a0a1a] border-y border-white/5 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[#c5a059]/50 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
            Joining the conversation alongside executives from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-80 transition-all duration-700">
             {BRAND_CLIENTS.map((client, i) => (
               <div key={i} className="group relative">
                 <img 
                   src={client.logo} 
                   alt={client.name} 
                   className="h-10 md:h-14 object-contain brightness-0 invert filter hover:brightness-100 hover:invert-0 transition-all duration-500 grayscale group-hover:grayscale-0" 
                 />
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-black text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
                   {client.name}
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─────────────────────────────────────────────────────────── */}
      <section className="py-32 bg-gradient-to-b from-[#0d0d1f] to-[#0a0a1a] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="cap-label mb-6 block">The Leadership Paradox</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black nav-font text-white mb-20 leading-tight">
             เมื่อจุดที่คุณยืนมีคนอยู่น้อย <br/>
            <span className="text-white/30">ความเข้าใจจึงเป็นของมีค่า</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className="glass-panel p-10 rounded-[2.5rem] hover:bg-white/5 transition-all group border-white/5 h-full flex flex-col items-center text-center">
                <div className="mb-8 scale-150 transform group-hover:scale-175 transition-transform duration-500">
                  {p.icon}
                </div>
                <p className="text-white/80 text-xl font-medium leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 glass-panel !bg-white/[0.02] border-white/5 p-12 md:p-20 rounded-[3.5rem] relative overflow-hidden group">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[100px]" />
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-8">The Core Insight</p>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-[1.25]">
               "คุณไม่ได้ต้องการ <span className="text-white/30">บทเรียนเพิ่ม</span><br/>
               แต่คุณต้องการ <span className="font-gold">เพื่อนร่วมทางที่เดินอยู่ในระดับเดียวกับคุณ</span> "
            </h3>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION ───────────────────────────────────────────────── */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-5/12 lg:sticky lg:top-40">
              <span className="cap-label mb-6 block">Beyond Networking</span>
              <h2 className="text-5xl lg:text-7xl font-black nav-font text-white mb-10 leading-[0.9]">
                มากกว่าแค่รวบรวม <br/> <span className="font-gold">แต่คือการ "คัดสรร"</span>
              </h2>
              <p className="text-white/50 text-xl leading-relaxed mb-12">
                CEO Tier ไม่ใช่การพบปะเพื่อเพิ่ม Connection <br className="hidden md:block"/>
                แต่คือการพบปะเพื่อเพิ่ม Clarity ในการตัดสินใจทางธุรกิจ
              </p>
              <div className="gold-divider w-24 h-1" />
            </div>

            <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-10">
              {CORE_VALUES.map((v, i) => (
                <div key={i} className="glass-panel !bg-[#111122]/80 backdrop-blur-2xl border-white/5 p-10 group hover:border-[#c5a059]/40 transition-all duration-500 rounded-[2.5rem] flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#c5a059]/10 flex items-center justify-center mb-10 text-[#c5a059] group-hover:scale-110 group-hover:bg-[#c5a059]/20 transition-all duration-500">
                    {v.icon}
                  </div>
                  <h3 className="font-black text-2xl text-white nav-font mb-6">{v.title}</h3>
                  <div className="gold-divider mb-6 opacity-40" />
                  <p className="text-white/60 text-lg leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ──────────────────────────────────────────────────────── */}
      <section className="py-32 bg-[#0d0d1f] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-24">
            <span className="cap-label mb-6 block">Internal Dynamics</span>
            <h2 className="text-5xl md:text-6xl font-black nav-font text-white mb-8">
               สิ่งที่ถูกพูดถึง <span className="font-gold">ในวงความลับ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 text-left">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="flex items-center gap-8 glass-panel !bg-white/5 p-10 rounded-[3rem] group hover:border-[#c5a059]/40 transition-all duration-500">
                <div className="step-number group-hover:bg-[#c5a059] group-hover:text-[#0a0a1a] transition-all duration-500 scale-125">
                  0{i + 1}
                </div>
                <p className="text-white/90 text-2xl font-medium tracking-tight">{exp}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['Private Roundtable (Small Group)', 'Facilitated Dialogue', 'No Selling / No Pitching'].map((f) => (
              <div key={f} className="border border-white/10 rounded-full py-4 px-10 text-white/30 text-xs font-black uppercase tracking-[0.3em] hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-all cursor-default grow md:grow-0">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TARGET AUDIENCE ─────────────────────────────────────────────────── */}
      <section className="py-40 bg-[#0a0a1a] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
             <div className="order-2 lg:order-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059]/10 to-transparent rounded-[3rem] blur-3xl opacity-20" />
                <div className="relative glass-panel border-[#c5a059]/20 p-12 md:p-16 rounded-[4rem] text-center bg-white/[0.01]">
                   <Lock className="w-12 h-12 text-[#c5a059] mx-auto mb-10" />
                   <h3 className="text-2xl font-black text-white nav-font mb-10">Verification Protocol</h3>
                   <div className="space-y-6 text-left">
                      {QUALIFIED.map((q, i) => (
                        <div key={i} className="flex gap-4 items-center border-b border-white/5 pb-4">
                           <CheckCircle2 className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
                           <span className="text-white text-lg font-medium">{q}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="order-1 lg:order-2">
                <span className="cap-label mb-8 block">Exclusive Entry</span>
                <h2 className="text-5xl md:text-7xl font-black nav-font text-white mb-10 leading-[0.95]">
                   ความลับของวงรักษาได้ <br/> <span className="font-gold">ด้วยการ "กรอง" คน</span>
                </h2>
                <div className="gold-divider w-20 h-1.5 mb-10" />
                <p className="text-white/50 text-xl leading-relaxed">
                   เราไม่ได้เลือกแค่ใครก็ได้ที่มีเงินถึง แต่เราเลือกคนที่มี Mindset ในการแลกเปลี่ยน เพื่อรักษาคุณภาพของบทสนทนาให้บริสุทธิ์ที่สุด
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="cap-label mb-6 block text-center">Your Journey</span>
            <h2 className="text-5xl md:text-6xl font-black nav-font text-white">ขั้นตอนการเป็นส่วนหนึ่ง</h2>
            <div className="gold-divider-center" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative h-full">
            {/* Desktop Link Line */}
            <div className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent z-0" />
            
            {STEPS.map((s, i) => (
              <div key={i} className="relative z-10 text-center h-full flex flex-col items-center">
                <div className="w-24 h-24 rounded-[2rem] bg-[#111122] border border-white/5 flex items-center justify-center mb-8 text-[#c5a059] shadow-2xl transition-all hover:-translate-y-3 hover:border-[#c5a059]/40 duration-500">
                  {s.icon}
                </div>
                <span className="text-[#c5a059] text-xs font-black tracking-[0.5em] mb-4">0{s.no}</span>
                <h3 className="text-2xl font-black text-white nav-font mb-4">{s.title}</h3>
                <p className="text-white/40 text-base leading-relaxed max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FacilitatorSection />

      {/* ─── IMPACT & ACTIVITIES ────────────────────────────────────────────── */}
      <section className="py-32 bg-[#0a0a1a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="cap-label mb-6 block text-center">Impact & Activities</span>
            <h2 className="text-5xl md:text-6xl font-black nav-font text-white">บรรยากาศและกิจกรรม</h2>
            <div className="gold-divider-center" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {ACTIVITIES.map((img, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden rounded-[2rem] group border border-white/5 ${
                  i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity" />
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-widest">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-40 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
             <span className="cap-label mb-6 block text-center">Frequently Asked Questions</span>
             <h2 className="text-5xl font-black nav-font text-white leading-tight">สิ่งที่คุณอาจยังสงสัย</h2>
             <div className="gold-divider-center mt-6 w-16" />
          </div>

          <div className="space-y-6">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`group border rounded-[2rem] overflow-hidden transition-all duration-700 ${openFaq === i ? 'bg-white/[0.03] border-[#c5a059]/60 shadow-[0_0_50px_rgba(197,160,89,0.05)]' : 'bg-transparent border-white/5 hover:border-white/20'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-10 text-left gap-6"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${openFaq === i ? 'text-white' : 'text-white/60'}`}>{f.q}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 scale-110 ${openFaq === i ? 'bg-[#c5a059] text-[#0a0a1a]' : 'bg-white/5'}`}>
                    <ChevronDown className={`w-6 h-6 transition-transform duration-700 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-10 pb-12 animate-fade-in-up">
                    <div className="h-px w-full bg-white/5 mb-8" />
                    <p className="text-white/50 text-xl leading-relaxed font-light">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-48 bg-[#0d0d1f] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[1200px] h-[1200px] bg-[#c5a059]/5 rounded-full blur-[150px] opacity-20" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0f3460]/10 rounded-full blur-[120px] opacity-30" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#c5a059] to-[#e0c58e] p-[1px] mx-auto mb-16 animate-bounce" style={{ animationDuration: '3s' }}>
             <div className="w-full h-full bg-[#0d0d1f] rounded-[calc(2rem-1px)] flex items-center justify-center text-[#c5a059]">
                 <Crown className="w-10 h-10" />
             </div>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black nav-font text-white leading-[0.9] mb-16 tracking-tighter">
             ถ้าคุณคือ CEO <br/> <span className="text-white/20">ตัวจริงที่เราตามหา</span>
          </h2>

          <div className="max-w-3xl mx-auto glass-panel border-white/5 p-16 md:p-24 rounded-[4rem] mb-20 group hover:bg-white/[0.04] transition-all cursor-default">
            <p className="text-white/60 text-2xl md:text-3xl font-light leading-relaxed italic mb-10">
               "แลกเปลี่ยนกลยุทธ์ ถอดบทเรียนหัวใจผู้นำ <br className="hidden md:block"/>
               เพื่อก้าวข้ามทุกความท้าทาย...ไปด้วยกัน"
            </p>
            <div className="gold-divider-center w-20 mb-10 h-1.5" />
            <p className="font-gold text-3xl font-black uppercase tracking-[0.2em]">BECOME THE CEO TIER</p>
          </div>

          <div className="space-y-10">
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-6 bg-[#c5a059] text-[#0a0a1a] px-20 py-8 rounded-[2.5rem] font-black text-2xl nav-font shadow-[0_30px_60px_-15px_rgba(197,160,89,0.4)] hover:-translate-y-2 group"
            >
              คุยกับเราเพื่อขอเข้ากลุ่ม
              <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
            </a>
            
            <p className="text-white/30 text-xs font-black uppercase tracking-[0.6em] animate-pulse">
                Selection Strictly Focused on High-Impact Leaders
            </p>

            <div className="flex items-center justify-center gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
               <img src={CAP_LOGO} alt="CAP Vision" className="h-8" />
               <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
               <img src={NEWDICE_LOGO} alt="NEWDICE" className="h-8" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Absolute Minimal Footer */}
      <footer className="py-12 bg-[#070715] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
            <p className="text-white/10 text-[10px] uppercase font-black tracking-[0.5em] mb-2">Designed for the Executive Mindset</p>
            <p className="text-white/20 text-[9px] uppercase font-black tracking-[0.2em]">© 2024 CAP Vision Institute x NEWDICE · Standard of Excellence</p>
        </div>
      </footer>
    </div>
  );
};

/* ─── FACILITATORS ────────────────────────────────────────────────────────── */
const FacilitatorSection: React.FC = () => {
  return (
    <section className="py-40 bg-[#0f0f20] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059]/5 rounded-full blur-[120px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="cap-label mb-6 block text-center">The Experts Behind</span>
          <h2 className="text-5xl md:text-6xl font-black nav-font text-white leading-tight">
             ผู้ดูแลวงสนทนา <br/> <span className="font-gold">Executive Facilitators</span>
          </h2>
          <div className="gold-divider-center" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {FACilitators.map((fac, i) => (
            <div key={i} className="group relative">
               <div className="absolute -inset-2 bg-gradient-to-r from-[#c5a059]/20 to-blue-600/10 rounded-[3.5rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />
               <div className="relative glass-panel !bg-[#0a0a1a]/60 border-white/5 p-10 md:p-12 rounded-[3rem] h-full flex flex-col md:flex-row gap-10 items-center md:items-start transition-all duration-500 hover:border-[#c5a059]/40">
                  {/* Image Part */}
                  <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 relative">
                     <div className="absolute inset-0 bg-[#c5a059] rounded-[2.5rem] rotate-6 scale-95 opacity-20 group-hover:rotate-12 transition-transform duration-700" />
                     <img 
                       src={fac.image} 
                       alt={fac.name} 
                       className="w-full h-full object-cover rounded-[2.5rem] relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10"
                     />
                  </div>

                  {/* Info Part */}
                  <div className="flex-1 text-center md:text-left">
                     <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-1.5 rounded-full mb-6">
                        <Star className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-widest">{fac.title}</span>
                     </div>
                     <h3 className="text-3xl font-black text-white nav-font mb-2">
                        {fac.name} <span className="text-white/30 text-lg block md:inline font-bold md:ml-2">({fac.realName})</span>
                     </h3>
                     <p className="text-white/50 text-base leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
                        {fac.desc}
                     </p>
                     <a 
                       href={`/speakers/${fac.slug}`}
                       className="inline-flex items-center gap-2 text-[#c5a059] font-black text-sm uppercase tracking-widest hover:gap-4 transition-all"
                     >
                        ดูโปรไฟล์เต็ม
                        <ChevronRight className="w-4 h-4" />
                     </a>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CEOTierCommunity;
