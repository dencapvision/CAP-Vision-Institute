import React, { useState } from 'react';
import {
  ArrowRight, MessageCircle, ChevronDown,
  Target, CheckCircle2, Shield, Sparkles, Phone, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CONTACT_INFO, CLIENTS, BRAND_INFO } from '../constants/brand';
import {
  IconLeadership,
  IconTeamSynergy,
  IconGrowthCulture,
  IconCustomArchitecture,
  IconFacilitatorMastery,
  IconGoldCrestStar,
  IconInstituteShield
} from '../components/icons/CapBrandIcons';

// ─── Pain Points ────────────────────────────────────────────────────────────
const PAIN_POINTS = [
  {
    icon: '⚡',
    title: 'สื่อสารไม่ตรงจุด เกิดความเข้าใจคลาดเคลื่อน',
    desc: 'ทีมงานต่างคนต่างทำ เป้าหมายไม่สอดคล้อง เกิดการแก้ปัญหาซ้ำซากและงานสะดุด'
  },
  {
    icon: '🧱',
    title: 'แต่ละแผนกทำงานแบบ Silo',
    desc: 'ขาดความร่วมมือข้ามสายงาน ข้อมูลไม่เชื่อมโยง ขาดความรู้สึกเป็นเจ้าของความสำเร็จร่วมกัน'
  },
  {
    icon: '👑',
    title: 'ผู้นำสั่งการแต่ทีมไม่ขับเคลื่อน',
    desc: 'ตำแหน่งมีแต่ขาดอำนาจจูงใจ (Influence) และยังขาด Facilitative Mindset ในการดึงศักยภาพทีม'
  }
];

// ─── Value Propositions ──────────────────────────────────────────────────────
const VALUE_PROPS = [
  {
    title: 'Transformative Learning',
    desc: 'ไม่ใช่แค่อบรมให้ "รู้" แต่เปลี่ยนกรอบคิด (Mindset) และสร้าง "พฤติกรรมใหม่" ที่นำไปใช้ได้จริงทันที'
  },
  {
    title: 'Master Facilitator Approach',
    desc: 'ไม่สอนบรรยายทางเดียว ออกแบบกระบวนการให้ผู้เรียนเกิด "Aha! Moment" และร่วมคิดค้นหาทางออกด้วยตนเอง'
  },
  {
    title: 'Customized In-house Architecture',
    desc: 'เริ่มจากการทำ TNA (Training Needs Analysis) เชิงลึก ไม่มี Template สำเร็จรูป ออกแบบเฉพาะตามโจทย์องค์กร'
  },
  {
    title: 'Measurable Outcomes & ROI',
    desc: 'วัดผลการเปลี่ยนแปลงพฤติกรรมผ่าน Pre/Post Assessment และ Action Learning Project ที่มี KPI ชัดเจน'
  }
];

// ─── Service Cards (Aligned with 4 Core Solutions) ────────────────────────
const SERVICE_CARDS = [
  {
    id: 'leadership',
    IconComponent: IconLeadership,
    title: 'Leadership Transformation',
    enSub: 'ภาวะผู้นำยุคใหม่ & การเป็นผู้นำสร้างแรงบันดาลใจ',
    tagline: 'ยกระดับผู้บริหารและหัวหน้างานจาก "ผู้สั่งการ" สู่ "Facilitative & Inspiring Leader"',
    features: [
      'Transformational Leadership & Executive Presence',
      'Facilitative Leadership for Modern Managers',
      'Strategic Thinking & Decisive Execution',
      '1-on-1 Executive Coaching & Leadership DNA'
    ],
    bgBadge: 'from-blue-500/10 to-indigo-500/10 text-blue-700 border-blue-200'
  },
  {
    id: 'people-team',
    IconComponent: IconTeamSynergy,
    title: 'People & Team Synergy',
    enSub: 'การสื่อสารข้ามสายงาน & การทลายกำแพง Silo',
    tagline: 'ทลายกำแพง Silo สร้างความปลอดภัยทางจิตวิทยา (Psychological Safety) และการสื่อสารที่ไร้รอยต่อ',
    features: [
      'Psychological Safety & High-Performing Teams',
      'Empathetic Communication & Constructive Feedback',
      'DISC & Behavioral Dynamics at Work',
      'Conflict Resolution & Inter-department Alignment'
    ],
    bgBadge: 'from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-200'
  },
  {
    id: 'culture',
    IconComponent: IconGrowthCulture,
    title: 'Organization Culture & Mindset',
    enSub: 'วัฒนธรรมการเติบโต & ความคล่องตัวในการเปลี่ยนแปลง',
    tagline: 'ปลูกฝัง Growth Mindset สร้างวัฒนธรรมการแก้ปัญหาเชิงสร้างสรรค์ (6D CPS) ที่พร้อมรับความเปลี่ยนแปลง',
    features: [
      'Building Growth Mindset Culture across Teams',
      'Change Agility & Resilience in Disruption',
      'Creative Problem Solving (6D CPS Model)',
      'Core Values Activation into Daily Habits'
    ],
    bgBadge: 'from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-200'
  },
  {
    id: 'customized',
    IconComponent: IconCustomArchitecture,
    title: 'Customized In-house Solutions',
    enSub: 'หลักสูตรปรับแต่งเฉพาะองค์กร 100%',
    tagline: 'เริ่มจาก TNA วิเคราะห์ปัญหาจริง สู่ Workshop ที่ปรับแต่ง 100% สอดคล้องกับเป้าหมายทางธุรกิจ',
    features: [
      'In-depth TNA (Training Needs Analysis) Diagnostic',
      'Activity-Based Learning Workshop Design',
      'Pre & Post Assessment with Behavioral Action Plan',
      'Long-term OD Consulting & Impact Tracking'
    ],
    bgBadge: 'from-indigo-500/10 to-purple-500/10 text-indigo-700 border-indigo-200'
  }
];

// ─── Process Steps ───────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'วินิจฉัย (Diagnose)',
    desc: 'ทำ TNA และสัมภาษณ์ผู้มีส่วนได้ส่วนเสียเพื่อค้นหา Root Cause และ Gap พฤติกรรมที่แท้จริง'
  },
  {
    step: '02',
    title: 'ออกแบบ (Design)',
    desc: 'วางสถาปัตยกรรมการเรียนรู้เฉพาะองค์กรด้วย 6D CPS Model และ CAP Framework'
  },
  {
    step: '03',
    title: 'ส่งมอบ (Deliver)',
    desc: 'จัดกิจกรรม Transformative Workshop สไตล์ Activity-Based ผู้เรียนลงมือทำและตกผลึกด้วยตนเอง'
  },
  {
    step: '04',
    title: 'ติดตามผล (Debrief & Impact)',
    desc: 'ประเมินผลลัพธ์หลังอบรม ติดตาม Action Project และสรุป Executive Summary แก่ผู้บริหาร'
  }
];

// ─── KPI Results ─────────────────────────────────────────────────────────────
const RESULTS = [
  { stat: '94%', label: 'Team Synergy', desc: 'ความร่วมมือและการสื่อสารในทีมเพิ่มขึ้นอย่างชัดเจน' },
  { stat: '18+ ปี', label: 'Facilitation Expertise', desc: 'ประสบการณ์นำกระบวนการอบรมองค์กรชั้นนำ' },
  { stat: '200+', label: 'Enterprise Clients', desc: 'องค์กรชั้นนำภาครัฐและเอกชนไว้วางใจ' },
  { stat: '98%', label: 'Learner Satisfaction', desc: 'ผู้เข้าอบรมได้รับคุณค่าและนำไปประยุกต์ใช้ได้ทันที' }
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'CAP Vision แตกต่างจากสถาบันฝึกอบรมทั่วไปอย่างไร?',
    a: 'เราไม่ใช่ "วิทยากรบรรยาย" (Lecturer) แต่เป็น Master Facilitator & OD Consultant ที่เน้น Transformative Learning และ Activity-Based Learning ผู้เรียนไม่ได้แค่นั่งฟัง แต่ได้ลงมือทำจริง ค้นพบทางออกด้วยตนเอง และนำไปสู่การเปลี่ยนพฤติกรรมที่ถาวร'
  },
  {
    q: 'สามารถปรับแต่งหลักสูตรให้ตรงกับโจทย์เฉพาะองค์กรได้ไหม?',
    a: 'ได้ 100% — ทุกโปรแกรม In-house ของเราเริ่มต้นจากการทำ TNA (Training Needs Analysis) เพื่อทำความเข้าใจความท้าทาย วัฒนธรรมองค์กร และเป้าหมายทางธุรกิจ จากนั้นจึงออกแบบเนื้อหา Case Study และ Workshop ให้ตรงจุดที่สุด'
  },
  {
    q: 'มีระบบประเมินและวัดผลการอบรมอย่างไร?',
    a: 'เราใช้ Pre/Post Assessment แบบ Multi-dimension (เช่น Radar Chart วิเคราะห์ 4 มิติ) พร้อมติดตามผลผ่าน Action Learning Projects และมี Executive Summary Report สรุปส่งให้ฝ่าย HR และผู้บริหารอย่างเป็นระบบ'
  },
  {
    q: 'ระยะเวลาในการจัดหลักสูตรเป็นอย่างไร?',
    a: 'มีตั้งแต่ 1-2 วัน Intensive Workshop ไปจนถึง Long-term Leadership Journey (3-6 เดือน) ที่มีการโค้ชชิ่งและติดตามผลเป็นระยะ สามารถปรับตาม Timeline และงบประมาณขององค์กร'
  },
  {
    q: 'ขั้นตอนการขอใบเสนอราคาและการเริ่มต้นงานเป็นอย่างไร?',
    a: 'ท่านสามารถติดต่อเราผ่านฟอร์มหน้าเว็บ หรือทัก LINE OA @capvision ทีมงาน Master Facilitator จะนัดหมายพูดคุยเพื่อรับโจทย์ (Discovery Call 30 นาที) และจัดทำข้อเสนอโครงการพร้อมใบเสนอราคาภายใน 24-48 ชั่วโมง'
  }
];

export const Services: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111827]">
      <SEO
        title="โซลูชันพัฒนาองค์กรและหลักสูตร In-house | CAP Vision Institute"
        description="In-house Training, Leadership Transformation, Team Synergy, OD Consulting โดย Master Facilitator ประสบการณ์กว่า 18+ ปี ไว้วางใจโดย Tops, Mr.D.I.Y., AOT, PEA, LH และกว่า 200 องค์กร"
      />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#111827] via-[#0F2557] to-[#111827] pt-28 pb-32 text-white relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 nav-font backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            Corporate Transformation Solutions
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 nav-font tracking-tight leading-tight">
            <span className="text-white">พัฒนาคน ขับเคลื่อนองค์กร</span><br />
            <span className="text-[#F59E0B]">สู่ผลลัพธ์ที่จับต้องได้จริง</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            สำหรับ HRD, L&D และผู้บริหารที่มองหา <strong className="text-white font-bold">In-house Training & OD Solutions</strong> ที่เปลี่ยนพฤติกรรมจริง ไม่ใช่อบรมแบบท่องจำ
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/assessment"
              className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 inline-flex items-center justify-center gap-3 transition-all"
            >
              <IconGoldCrestStar className="w-5 h-5 text-[#111827]" />
              ทำแบบประเมินองค์กรฟรี
            </Link>

            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all nav-font inline-flex items-center justify-center gap-3"
            >
              <FileText className="w-5 h-5 text-[#60A5FA]" />
              ขอใบเสนอราคาหลักสูตร
            </Link>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm mt-8 font-light">
            18+ ปีประสบการณ์ · วิทยากรและที่ปรึกษาโดย {BRAND_INFO.director} & Master Facilitators
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── 2. PAIN POINTS ──────────────────────────────────────────────── */}
        <section className="py-20 -mt-16 relative z-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-2 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Organizational Roadblocks
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F2557] nav-font mb-3">
              องค์กรของคุณกำลังเผชิญกับสิ่งเหล่านี้หรือไม่?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              สัญญาณเตือนที่ชี้ว่าองค์กรต้องการการปรับโครงสร้างกรอบคิดและการทำงานร่วมกัน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIN_POINTS.map((pain, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-red-50 text-2xl rounded-2xl flex items-center justify-center mb-5 group-hover:bg-red-100 transition-all">
                  {pain.icon}
                </div>
                <h3 className="text-lg font-black text-[#111827] mb-2 nav-font leading-snug">{pain.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{pain.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. VALUE PROPOSITION ────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-14 text-white mb-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-12 relative z-10">
            <span className="text-[#F59E0B] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Why Choose CAP Vision Institute?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white nav-font mb-4">
              ความแตกต่างที่คุณจะสัมผัสได้ตั้งแต่วันแรก
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base font-light">
              เราไม่ได้ส่งแค่วิทยากรมาพูด แต่เราทำหน้าที่เป็น <strong className="text-[#F59E0B] font-bold">Transformation Partner</strong> เพื่อออกแบบผลลัพธ์ที่ยั่งยืน
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {VALUE_PROPS.map((vp, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-[#2563EB] text-white rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm mt-0.5 shadow-md">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-1.5 nav-font">{vp.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">{vp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. 4 CORE SOLUTIONS ─────────────────────────────────────────── */}
        <section className="py-12 mb-20">
          <div className="text-center mb-14">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Core Solution Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F2557] nav-font mb-3">
              4 เสาหลักโซลูชันพัฒนาคนและองค์กร
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              ครอบคลุมทุกมิติสำคัญของการ Transform องค์กรในยุคปัจจุบัน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICE_CARDS.map(({ id, IconComponent, title, enSub, tagline, features, bgBadge }) => (
              <div
                key={id}
                id={id}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-[#2563EB] hover:shadow-2xl transition-all group flex flex-col justify-between scroll-mt-28"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2.5 shadow-sm group-hover:scale-105 transition-transform">
                      <IconComponent className="w-9 h-9" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${bgBadge}`}>
                      {enSub}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-[#0F2557] mb-2 nav-font group-hover:text-[#2563EB] transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {tagline}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    ขอคำปรึกษาหลักสูตรนี้
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={CONTACT_INFO.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-[#06C755] flex items-center gap-1 font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    LINE สอบถาม
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. PROCESS STEPS ─────────────────────────────────────────────── */}
        <section className="bg-gray-50 rounded-3xl p-8 sm:p-14 border border-gray-200/80 mb-20">
          <div className="text-center mb-12">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Our 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F2557] nav-font mb-3">
              กระบวนการทำงานที่เน้นผลลัพธ์ยั่งยืน
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              ออกแบบจากประสบการณ์กว่า 18+ ปี เพื่อส่งมอบการเปลี่ยนแปลงที่วัดผลได้จริง
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map(({ step, title, desc }, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <span className="text-4xl font-black text-[#2563EB]/20 nav-font block mb-3 leading-none">
                  {step}
                </span>
                <h3 className="text-base font-black text-[#0F2557] mb-2 nav-font">{title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. STATS & RESULTS ──────────────────────────────────────────── */}
        <section className="py-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RESULTS.map(({ stat, label, desc }, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
                <span className="text-3xl sm:text-4xl font-black text-[#0F2557] nav-font block mb-1">
                  {stat}
                </span>
                <h4 className="text-[#2563EB] font-black text-xs mb-2 nav-font uppercase tracking-wider">
                  {label}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. CLIENT LOGOS ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 mb-20 text-center">
          <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
            Trusted by Leading Organizations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font mb-4">
            ไว้วางใจโดยกว่า 200+ องค์กรชั้นนำ
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto mb-8">
            ครอบคลุมภาคเอกชน รัฐวิสาหกิจ ราชการ และสถาบันการศึกษาชั้นนำทั่วประเทศ
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-8">
            {CLIENTS.slice(0, 12).map((client, idx) => (
              <img
                key={idx}
                src={client.logo}
                alt={client.name}
                title={client.name}
                className="h-9 sm:h-11 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
            ))}
          </div>
        </section>

        {/* ── 8. FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-8 mb-20">
          <div className="text-center mb-12">
            <span className="text-[#2563EB] text-xs font-black uppercase tracking-widest block mb-2 nav-font">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] nav-font mb-3">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-gray-600 text-sm">ข้อมูลประกอบการพิจารณาและวางแผนพัฒนาบุคลากร</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-sm transition-all">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                >
                  <span className="font-black text-[#0F2557] nav-font text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2563EB] flex-shrink-0 transition-transform duration-200 ${openFAQ === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-6 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 9. FINAL CTA ────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#111827] via-[#0F2557] to-[#111827] rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider">
              <IconGoldCrestStar className="w-3.5 h-3.5" />
              Start Your Organization Transformation
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black nav-font mb-4 leading-tight text-white">
              พร้อมค้นหาจุดปลดล็อก และยกระดับทีมของคุณแล้วหรือยัง?
            </h2>

            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              ปรึกษาฟรีกับ Master Facilitator — เราช่วยวิเคราะห์ TNA ออกแบบ Framework การเรียนรู้ และจัดทำใบเสนอราคาภายใน 24 ชั่วโมง
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/assessment"
                className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] px-8 py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 inline-flex items-center justify-center gap-3 transition-all"
              >
                <IconGoldCrestStar className="w-5 h-5 text-[#111827]" />
                ทำแบบประเมินองค์กรฟรี
              </Link>

              <a
                href={CONTACT_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all nav-font inline-flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 text-[#06C755]" />
                ปรึกษาด่วนผ่าน LINE OA
              </a>
            </div>

            <p className="text-gray-400 text-xs mt-6 font-light">
              ไม่มีข้อผูกมัด · ตอบกลับภายใน 24 ชั่วโมง · ปรึกษาฟรี
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Services;
