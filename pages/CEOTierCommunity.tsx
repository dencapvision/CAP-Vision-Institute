import React, { useState } from 'react';
import {
  Shield, Users, MessageCircle, Zap, Brain,
  CheckCircle2, XCircle, ChevronDown, ArrowRight,
  Star, Lock, TrendingUp, Target, Sparkles,
  Crown, Eye, Clock
} from 'lucide-react';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants/brand';

// ─── Logos ────────────────────────────────────────────────────────────────────
const CAP_LOGO = 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/cap%20vision%20logo.png';
const NEWDICE_LOGO = 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/Logo-newdice.png';

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

const CLIENTS = ['Toyota', 'Dell', 'Central', 'Betagro', 'หน่วยงานรัฐ', 'องค์กรชั้นนำ'];

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

// ─── Component ────────────────────────────────────────────────────────────────

const CEOTierCommunity: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#0a0a1a] text-white min-h-screen">
      <SEO
        title="CEO Tier Community | Private Exchange Session สำหรับ CEO ระดับ 50-100 ล้าน | CAP Vision x NEWDICE"
        description="พื้นที่ปลอดภัยสำหรับ CEO คุยได้แค่กับ CEO Private Roundtable สำหรับผู้นำธุรกิจ 50-100 ล้านบาท โดย CAP Vision Institute x NEWDICE"
      />

      {/* ─── PARTNERSHIP BADGE ───────────────────────────────────────────────── */}
      <div className="bg-[#0f0f20] border-b border-[#c5a059]/20 py-3">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-[#c5a059]/60 text-xs font-semibold tracking-widest uppercase">Collaboration by</span>
          <div className="flex items-center gap-4">
            <img src={CAP_LOGO} alt="CAP Vision Institute" className="h-7 object-contain brightness-0 invert opacity-80" />
            <span className="text-[#c5a059]/40 text-lg font-light">×</span>
            <img src={NEWDICE_LOGO} alt="NEWDICE" className="h-7 object-contain brightness-0 invert opacity-80" />
          </div>
        </div>
      </div>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#c5a059]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0f3460]/40 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          {/* Exclusive badge */}
          <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-5 py-2.5 rounded-full mb-10">
            <Crown className="w-4 h-4 text-[#c5a059]" />
            <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font">
              Private · Exclusive · CEO Only
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black nav-font leading-[1.0] tracking-tight mb-6">
            <span className="text-[#c5a059]">CEO Tier</span>
            <br />
            <span className="text-white">Community</span>
          </h1>

          <p className="text-2xl md:text-3xl text-white/50 font-light italic mb-6 leading-relaxed">
            "บางเรื่อง… CEO คุยได้แค่กับ CEO"
          </p>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
            Private Exchange Session สำหรับผู้นำธุรกิจระดับ 50–100 ล้านบาท
          </p>
          <p className="text-white/50 text-base leading-relaxed mb-12 max-w-xl mx-auto">
            พื้นที่ปลอดภัยในการคิด ตัดสินใจ และเติบโตอย่างมีทิศทาง
          </p>

          {/* Hook bullets */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 flex-wrap">
            {['เงียบ ลึก ตรงไปตรงมา', 'ไม่มีลำดับขั้น ไม่มีสปอนเซอร์', 'บทสนทนาที่เปลี่ยนเกมธุรกิจ'].map((t) => (
              <div key={t} className="flex items-center gap-2 text-white/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                {t}
              </div>
            ))}
          </div>

          <a
            href={CONTACT_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#c5a059] text-[#0a0a1a] px-10 py-5 rounded-2xl font-black text-base nav-font hover:bg-[#e0c58e] transition-all shadow-2xl shadow-[#c5a059]/20"
          >
            สมัครเข้าร่วมวง CEO Tier
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-white/30 text-xs mt-4 tracking-widest uppercase">Limited Seat · คัดเฉพาะ CEO ตัวจริง</p>
        </div>
      </section>

      {/* ─── PROBLEM ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d1f]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-4">ปัญหาที่ไม่มีใครพูดถึง</p>
          <h2 className="text-3xl md:text-4xl font-black nav-font text-white mb-4 leading-tight">
            เมื่อคุณเป็น CEO…<br />
            <span className="text-white/50">คุณเริ่มไม่มี "พื้นที่พูดความจริง"</span>
          </h2>

          <div className="mt-12 space-y-4">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-2xl p-5 text-left">
                {p.icon}
                <p className="text-white/80 text-base">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-[#c5a059]/10 border border-[#c5a059]/25 rounded-3xl p-8">
            <p className="text-white/50 text-sm mb-3 uppercase tracking-widest">Insight</p>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              คุณไม่ได้ต้องการ <span className="text-white/40">"คำแนะนำเพิ่ม"</span>
            </p>
            <p className="text-xl md:text-2xl font-bold text-[#c5a059] leading-relaxed mt-2">
              แต่ต้องการ "คนที่เข้าใจระดับเดียวกัน"
            </p>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION ───────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-4">What Makes Us Different</p>
            <h2 className="text-3xl md:text-4xl font-black nav-font text-white">
              CEO Tier ไม่ใช่ Community ทั่วไป
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_VALUES.map((v, i) => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-3xl p-8 hover:border-[#c5a059]/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/10 flex items-center justify-center mb-5 text-[#c5a059] group-hover:bg-[#c5a059]/20 transition-all">
                  {v.icon}
                </div>
                <h3 className="font-black text-white text-lg nav-font mb-3">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d1f]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-4">Inside the Room</p>
            <h2 className="text-3xl md:text-4xl font-black nav-font text-white">
              สิ่งที่เกิดขึ้นในวง CEO Tier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/3 border border-white/8 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-full bg-[#c5a059]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#c5a059] text-xs font-black">0{i + 1}</span>
                </div>
                <p className="text-white/80 text-base leading-relaxed">{exp}</p>
              </div>
            ))}
          </div>

          {/* Format badges */}
          <div className="bg-[#c5a059]/8 border border-[#c5a059]/20 rounded-3xl p-8">
            <p className="text-center text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-6">Session Format</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Private Roundtable (Small Group)', 'Facilitated Dialogue', 'No Slide / No Lecture / No Seminar'].map((f) => (
                <div key={f} className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-white/70 text-sm font-medium">
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TARGET AUDIENCE ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-4">Qualification</p>
            <h2 className="text-3xl md:text-4xl font-black nav-font text-white">
              นี่ไม่ใช่สำหรับทุกคน
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For you */}
            <div className="bg-white/3 border border-[#c5a059]/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#c5a059]" />
                </div>
                <h3 className="font-black text-white text-lg nav-font">เหมาะสำหรับ</h3>
              </div>
              <div className="space-y-4">
                {QUALIFIED.map((q, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#c5a059] mt-0.5 flex-shrink-0" />
                    <p className="text-white/80 text-sm leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Not for you */}
            <div className="bg-white/2 border border-white/8 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-black text-white/60 text-lg nav-font">ไม่เหมาะสำหรับ</h3>
              </div>
              <div className="space-y-4">
                {NOT_FOR.map((n, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400/60 mt-0.5 flex-shrink-0" />
                    <p className="text-white/50 text-sm leading-relaxed">{n}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d1f]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-4">How to Join</p>
            <h2 className="text-3xl md:text-4xl font-black nav-font text-white">
              กระบวนการเข้าร่วม CEO Tier
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#c5a059]/30 to-transparent" />
                )}
                <div className="w-20 h-20 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                  {s.icon}
                </div>
                <p className="text-[#c5a059] text-[10px] font-black tracking-widest mb-1">{s.no}</p>
                <h3 className="font-black text-white nav-font text-base mb-1">{s.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUTCOMES ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-4">What You'll Get</p>
            <h2 className="text-3xl md:text-4xl font-black nav-font text-white">
              สิ่งที่คุณจะได้ <span className="text-white/40">(Beyond Networking)</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {OUTCOMES.map((o, i) => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6 text-center hover:border-[#c5a059]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                  {o.icon}
                </div>
                <h3 className="font-black text-white text-sm nav-font mb-1">{o.title}</h3>
                <p className="text-white/50 text-xs">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0d0d1f] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-3">Trusted by Leaders from</p>
          <h2 className="text-2xl md:text-3xl font-black nav-font text-white mb-10">
            Leading Organizations
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CLIENTS.map((c) => (
              <div key={c} className="bg-white/4 border border-white/10 rounded-full px-6 py-3 text-white/60 text-sm font-semibold hover:border-[#c5a059]/30 hover:text-white/80 transition-all">
                {c}
              </div>
            ))}
          </div>

          {/* Partner logos again */}
          <div className="mt-14 flex items-center justify-center gap-8">
            <img src={CAP_LOGO} alt="CAP Vision Institute" className="h-10 object-contain brightness-0 invert opacity-60 hover:opacity-90 transition-all" />
            <span className="text-[#c5a059]/30 text-xl">×</span>
            <img src={NEWDICE_LOGO} alt="NEWDICE" className="h-10 object-contain brightness-0 invert opacity-60 hover:opacity-90 transition-all" />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a1a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] nav-font mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black nav-font text-white">คำถามที่พบบ่อย</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`bg-white/3 border rounded-2xl overflow-hidden transition-all ${openFaq === i ? 'border-[#c5a059]/40' : 'border-white/8'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-semibold text-base leading-snug">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#c5a059] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0d0d1f] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1f] via-[#0a0a1a] to-[#0d0d1f]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c5a059]/6 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <Crown className="w-10 h-10 text-[#c5a059] mx-auto mb-8 opacity-60" />

          <h2 className="text-3xl md:text-5xl font-black nav-font text-white leading-tight mb-6">
            ถ้าคุณคือ CEO<br />
            <span className="text-white/40">ที่กำลัง "แบกการตัดสินใจคนเดียว"</span>
          </h2>

          <div className="bg-[#c5a059]/8 border border-[#c5a059]/20 rounded-3xl p-8 mb-10">
            <p className="text-white/60 text-lg leading-relaxed mb-2">
              บางที…คุณไม่ต้องเก่งขึ้น
            </p>
            <p className="text-[#c5a059] text-xl font-bold leading-relaxed">
              แต่ต้อง "คุยกับคนที่เข้าใจคุณมากขึ้น"
            </p>
          </div>

          <a
            href={CONTACT_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#c5a059] text-[#0a0a1a] px-12 py-5 rounded-2xl font-black text-lg nav-font hover:bg-[#e0c58e] transition-all shadow-2xl shadow-[#c5a059]/25 mb-4"
          >
            สมัคร CEO Tier Community
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="text-white/30 text-xs tracking-widest uppercase">
            จำนวนจำกัด · คัดเฉพาะ CEO ตัวจริง
          </p>

          <div className="mt-12 flex items-center justify-center gap-6 opacity-50">
            <img src={CAP_LOGO} alt="CAP Vision" className="h-7 object-contain brightness-0 invert" />
            <span className="text-[#c5a059]/50 text-lg">×</span>
            <img src={NEWDICE_LOGO} alt="NEWDICE" className="h-7 object-contain brightness-0 invert" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CEOTierCommunity;
