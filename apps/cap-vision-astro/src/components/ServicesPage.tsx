import React, { useState } from 'react';
import {
    ArrowRight, MessageCircle, ChevronDown,
    GraduationCap, Users, Target, Laptop,
    Search, BarChart3, Brain, CheckCircle2,
    Shield, Layers3, Sparkles, Calendar, Rocket,
    Crown, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


import { CONTACT_INFO, CLIENTS } from '../constants/brand';
import BookingWizard from './SubconsciousSpeaker/BookingWizard';

// ─── Pain Points ────────────────────────────────────────────────────────────
const PAIN_POINTS = [
   {
      Icon: MessageCircle,
      title: 'สื่อสารกันไม่รู้เรื่อง',
      desc: 'ทีมงานต่างคนต่างทำ ความเข้าใจไม่ตรงกัน งานล่าช้าซ้ำแล้วซ้ำเล่า'
   },
   {
      Icon: Users,
      title: 'แต่ละแผนกทำงานแบบ Silo',
      desc: 'ไม่มีความร่วมมือข้ามทีม ข้อมูลไม่ไหล เป้าหมายองค์กรไม่เป็นหนึ่งเดียว'
   },
   {
      Icon: Target,
      title: 'ผู้นำไม่สามารถสร้าง Influence',
      desc: 'ตำแหน่งมีแต่ไม่มีพลังดึงดูด บุคลากรไม่ follow ผลงานทีมหยุดนิ่ง'
   }
];

// ─── Value Propositions ──────────────────────────────────────────────────────
const VALUE_PROPS = [
   {
      Icon: Brain,
      title: 'Transformative Learning',
      desc: 'ไม่ใช่แค่อบรมให้ "รู้" แต่เปลี่ยน "พฤติกรรม" ที่เห็นผลในชีวิตการทำงานจริง'
   },
   {
      Icon: MessageCircle,
      title: 'Facilitation Approach',
      desc: 'ไม่บรรยายทางเดียว — ออกแบบกระบวนการให้ผู้เรียน "ค้นพบ" ด้วยตัวเอง'
   },
   {
      Icon: Search,
      title: 'Customized Design',
      desc: 'ทุกหลักสูตรเริ่มจาก TNA วิเคราะห์ปัญหาจริง ไม่มี Template สำเร็จรูป'
   },
   {
      Icon: BarChart3,
      title: 'Measurable Outcomes',
      desc: 'วัดผลได้ตั้งแต่ Day 1 ผ่าน Pre/Post Assessment และ KPI Tracking ที่ชัดเจน'
   }
];

// ─── Service Cards (Aligned with CAP Vision Blueprint) ────────────────────────
const SERVICE_CARDS = [
   {
      id: 'leadership',
      Icon: GraduationCap,
      title: 'Leadership Transformation',
      tagline: 'ยกระดับผู้นำทุกระดับจาก "ผู้สั่งการ" สู่ "Facilitative & Inspiring Leader"',
      features: [
         'Transformational Leadership & Executive Presence',
         'Facilitative Leadership for Modern Managers',
         'Strategic Thinking & Decisive Execution',
         '1-on-1 Executive Coaching & Leadership DNA'
      ]
   },
   {
      id: 'people-team',
      Icon: Users,
      title: 'People & Team Synergy',
      tagline: 'ทลายกำแพง Silo สร้างความปลอดภัยทางจิตวิทยา และการสื่อสารที่ไร้รอยต่อ',
      features: [
         'Psychological Safety & High-Performing Teams',
         'Empathetic Communication & Constructive Feedback',
         'DISC & Behavioral Dynamics at Work',
         'Cross-Functional Collaboration & Trust Building'
      ]
   },
   {
      id: 'culture',
      Icon: Target,
      title: 'Organization Culture',
      tagline: 'ปลูกฝัง Growth Mindset และสร้างวัฒนธรรมแห่งการเรียนรู้ที่ยั่งยืน',
      features: [
         'Building Growth Mindset Culture',
         'Change Agility & Resilience in Disruption',
         'Creative Problem Solving (CPS Model)',
         'Core Values Activation into Daily Behavior'
      ]
   },
   {
      id: 'customized',
      Icon: Laptop,
      title: 'Customized In-house Solutions',
      tagline: 'เริ่มจาก TNA วิเคราะห์ปัญหาจริง สู่ Workshop ที่ปรับแต่ง 100%',
      features: [
         'In-depth TNA (Training Needs Analysis) Diagnostic',
         'Activity-Based Learning Workshop Design',
         'Pre & Post Assessment with Action Plan',
         'Long-term OD Consulting & ROI Tracking'
      ]
   },
   {
      id: 'facilitorium',
      Icon: Layers3,
      title: 'The Facilitorium',
      tagline: 'โรงเรียนวิทยากรและคลังเครื่องมือสร้างการเรียนรู้ยุคใหม่ สำหรับวิทยากรยุคดิจิทัล',
      features: [
         'คลังเครื่องมือและเทคนิคการสอนแบบ Facilitation',
         'AI Tools สำหรับการออกแบบและจัดหลักสูตร',
         'คอมมูนิตี้วิทยากรและผู้รักการเรียนรู้',
         'วิดีโอและบทความเจาะลึกทักษะเฉพาะด้าน'
      ],
      externalUrl: 'https://facilitorium.denmasterfa.com/'
   }
];

// ─── Process Steps ───────────────────────────────────────────────────────────
const PROCESS_STEPS = [
   {
      step: '01',
      title: 'วินิจฉัย (Diagnose)',
      desc: 'วิเคราะห์ปัญหาและความต้องการขององค์กรผ่าน TNA และการสัมภาษณ์เชิงลึก'
   },
   {
      step: '02',
      title: 'ออกแบบ (Design)',
      desc: 'ออกแบบหลักสูตรและกระบวนการ Facilitation ที่ตอบโจทย์เฉพาะองค์กร'
   },
   {
      step: '03',
      title: 'ส่งมอบ (Deliver)',
      desc: 'ดำเนินการด้วย Transformative Learning — Activity, Reflection, Insight, Action'
   },
   {
      step: '04',
      title: 'ติดตามผล (Debrief)',
      desc: 'วัดผลหลังอบรม ติดตามการเปลี่ยนแปลง และให้คำแนะนำเพื่อ Lasting Impact'
   }
];

// ─── KPI Results ─────────────────────────────────────────────────────────────
const RESULTS = [
   { stat: '92%', label: 'Team Synergy', desc: 'ความร่วมมือในทีมเพิ่มขึ้นอย่างชัดเจน' },
   { stat: '40%', label: 'Productivity', desc: 'ประสิทธิภาพสูงขึ้นผ่านกระบวนการที่ถูกต้อง' },
   { stat: '98%', label: 'Engagement', desc: 'ผู้เรียนมีส่วนร่วมในกระบวนการอย่างเต็มที่' },
   { stat: '3X', label: 'Team Impact', desc: 'ผลลัพธ์ที่มากกว่าการทำงานต่างคนต่างทำ' }
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQS = [
   {
      q: 'CAP Vision แตกต่างจากวิทยากรทั่วไปอย่างไร?',
      a: 'เราไม่ใช่ "วิทยากรบรรยาย" แต่เป็น Master Facilitator ที่ออกแบบกระบวนการให้ผู้เรียนค้นพบคำตอบด้วยตัวเอง ผ่าน DFA Model (Dynamic, Flow, Art of Growth) ทำให้การเปลี่ยนแปลงเกิดจากภายในและยั่งยืนกว่า'
   },
   {
      q: 'วัดผลการอบรมได้จริงไหม?',
      a: 'ได้ ทุกโปรแกรมมี Pre/Post Assessment วัดทัศนคติและพฤติกรรม รวมถึง KPI Tracking ที่ตกลงร่วมกันก่อนเริ่ม เพื่อให้ HR และผู้บริหารเห็นผลลัพธ์ที่ชัดเจน'
   },
   {
      q: 'ใช้เวลาเท่าไรต่อโปรแกรม?',
      a: 'ขึ้นอยู่กับเป้าหมาย โปรแกรมสั้นเริ่มที่ 1 วัน (Workshop) ถึง 3–6 เดือน (Leadership Program) เราออกแบบให้เหมาะกับ Timeline และ Budget ขององค์กรของคุณ'
   },
   {
      q: 'ปรับให้เหมาะกับองค์กรได้ไหม?',
      a: 'ได้ทุกโปรแกรม — เราเริ่มจาก TNA วิเคราะห์ปัญหาจริง แล้วออกแบบเนื้อหา กิจกรรม และกระบวนการให้สอดคล้องกับวัฒนธรรมและบริบทขององค์กรคุณโดยเฉพาะ ไม่มีสูตรสำเร็จรูป'
   },
   {
      q: 'ราคาและแพ็กเกจเป็นอย่างไร?',
      a: 'ราคาขึ้นอยู่กับขอบเขตงาน ระยะเวลา และจำนวนผู้เข้าร่วม ติดต่อเราเพื่อรับใบเสนอราคาที่ตรงกับความต้องการขององค์กรคุณ — ปรึกษาฟรีไม่มีข้อผูกมัด'
   }
];

// ────────────────────────────────────────────────────────────────────────────

const Services: React.FC = () => {
   const [openFAQ, setOpenFAQ] = useState<number | null>(null);
   const [isBookingOpen, setIsBookingOpen] = useState(false);

   return (
      <div className="bg-gray-50 min-h-screen">
         

         {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
         <div className="bg-[#0f3460] pt-28 pb-32 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c5a059] opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a059] opacity-5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
               <span className="inline-block bg-[#c5a059]/20 border border-[#c5a059]/30 text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full mb-8 nav-font">
                  Corporate Learning Solutions
               </span>
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 nav-font tracking-tight leading-tight">
                  <span className="text-[#c5a059]">พัฒนาคน เปลี่ยนองค์กร</span><br />
                  <span className="text-white">อย่างที่เห็นผลจริง</span>
               </h1>
               <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                  สำหรับ HR Manager และผู้บริหารที่ต้องการ{' '}
                  <strong className="text-white">ยกระดับทีม สร้างผู้นำ และวัดผลได้</strong>
                  <br />ไม่ใช่แค่อบรม — แต่คือการเปลี่ยนแปลงที่ยั่งยืน
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/contact"
                     className="bg-[#c5a059] text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-2xl active:scale-95 inline-flex items-center justify-center gap-3"
                  >
                     ขอใบเสนอราคา <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                     href={CONTACT_INFO.lineUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all nav-font inline-flex items-center justify-center gap-3"
                  >
                     <MessageCircle className="w-5 h-5 text-[#c5a059]" /> ปรึกษาฟรี
                  </a>
               </div>
               <p className="text-white/85 text-sm mt-8">
                  ไว้วางใจโดย Tops · Mr.D.I.Y. · AOT · PEA · Land and Houses · กว่า 100 องค์กร
               </p>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 pb-24">

            {/* ── 2. PAIN POINTS ──────────────────────────────────────────────── */}
            <section className="py-20 -mt-12">
               <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
                     คุ้นเคยกับปัญหาเหล่านี้ไหม?
                  </h2>
                  <p className="text-gray-500 max-w-xl mx-auto">
                     สัญญาณที่บอกว่าองค์กรต้องการการพัฒนาอย่างจริงจัง
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PAIN_POINTS.map(({ Icon, title, desc }, idx) => (
                     <div key={idx} className="bg-white p-8 rounded-3xl shadow-md border border-red-50 hover:border-red-200 transition-all group">
                        <div className="w-14 h-14 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-red-100 transition-all">
                           <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-black text-[#0f3460] mb-2 nav-font">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* ── 3. VALUE PROPOSITION ────────────────────────────────────────── */}
            <section className="bg-[#0f3460] rounded-[3rem] px-8 md:px-16 py-16 mb-8">
               <div className="text-center mb-12">
                  <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] block mb-4 nav-font">
                     Why CAP Vision?
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-white nav-font mb-3">
                     เราแตกต่างจากการอบรมทั่วไปอย่างไร
                  </h2>
                  <p className="text-white/85 max-w-2xl mx-auto">
                     ไม่ใช่วิทยากรบรรยาย แต่คือ{' '}
                     <strong className="text-[#c5a059]">Transformation Partner</strong>{' '}
                     ที่ออกแบบทุกอย่างเพื่อองค์กรของคุณ
                  </p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {VALUE_PROPS.map(({ Icon, title, desc }, idx) => (
                     <div key={idx} className="flex gap-5 items-start bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                        <div className="w-12 h-12 bg-[#c5a059]/20 text-[#c5a059] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                           <Icon className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-lg font-black text-white mb-1 nav-font">{title}</h3>
                           <p className="text-white/85 text-sm leading-relaxed">{desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </section>



            {/* ── 4. SERVICES ─────────────────────────────────────────────────── */}
            <section className="py-20">
               <div className="text-center mb-12">
                  <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] block mb-4 nav-font">
                     Service Portfolio
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
                     บริการของเรา
                  </h2>
                  <p className="text-gray-500 max-w-xl mx-auto">
                     ครอบคลุมทุกความต้องการในการพัฒนาคนและองค์กร
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SERVICE_CARDS.map(({ id, Icon, title, tagline, features, externalUrl }) => {
                     const CardContent = (
                        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:border-[#c5a059] hover:shadow-xl transition-all group h-full">
                           <div className="w-14 h-14 bg-[#0f3460]/5 text-[#c5a059] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#0f3460] group-hover:text-white transition-all">
                              <Icon className="w-7 h-7" />
                           </div>
                           <h3 className="text-2xl font-black text-[#0f3460] mb-2 nav-font flex items-center gap-2">
                              {title}
                              {externalUrl && <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#c5a059]" />}
                           </h3>
                           <p className="text-gray-500 text-sm mb-5 leading-relaxed">{tagline}</p>
                           <ul className="space-y-2">
                              {features.map((f, i) => (
                                 <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                                    <span className="font-medium">{f}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     );

                     return externalUrl ? (
                        <a key={id} id={id} href={externalUrl} target="_blank" rel="noopener noreferrer" className="scroll-mt-28">
                           {CardContent}
                        </a>
                     ) : (
                        <div key={id} id={id} className="scroll-mt-28">
                           {CardContent}
                        </div>
                     );
                  })}
               </div>
               <div className="text-center mt-10">
                  <a href="/contact" className="inline-flex items-center gap-3 bg-[#0f3460] text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#c5a059] transition-all nav-font shadow-xl active:scale-95">
                     สอบถามเกี่ยวกับบริการ <ArrowRight className="w-5 h-5" />
                  </a>
               </div>
            </section>

            {/* ── 5. PROCESS ──────────────────────────────────────────────────── */}
            <section className="bg-white rounded-[3rem] px-8 md:px-16 py-16 shadow-md border border-gray-100 mb-8">
               <div className="text-center mb-12">
                  <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] block mb-4 nav-font">
                     Our Process
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
                     กระบวนการทำงานของเรา
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                     ทุกโปรแกรมผ่าน 4 ขั้นตอนที่พิสูจน์แล้วว่าให้ผลลัพธ์ที่ยั่งยืน
                  </p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PROCESS_STEPS.map(({ step, title, desc }, idx) => (
                     <div key={idx} className="bg-gray-50 rounded-3xl p-7 border border-gray-100 hover:border-[#c5a059] transition-all">
                        <span className="text-5xl font-black text-[#c5a059]/25 nav-font block mb-4 leading-none">
                           {step}
                        </span>
                        <h3 className="text-lg font-black text-[#0f3460] mb-2 nav-font">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* ── 6. RESULTS ──────────────────────────────────────────────────── */}
            <section className="py-20">
               <div className="text-center mb-12">
                  <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] block mb-4 nav-font">
                     Proven Results
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
                     ผลลัพธ์ที่องค์กรของเราได้รับ
                  </h2>
                  <p className="text-gray-500 max-w-xl mx-auto">
                     ตัวเลขจากองค์กรที่ผ่านโปรแกรมพัฒนากับ CAP Vision
                  </p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {RESULTS.map(({ stat, label, desc }, idx) => (
                     <div key={idx} className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 text-center hover:border-[#c5a059] transition-all">
                        <span className="text-4xl md:text-5xl font-black text-[#0f3460] nav-font block mb-2">
                           {stat}
                        </span>
                        <h4 className="text-[#c5a059] font-black text-xs mb-2 nav-font uppercase tracking-wider">
                           {label}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* ── 7. SOCIAL PROOF ─────────────────────────────────────────────── */}
            <section className="bg-white rounded-[3rem] px-8 md:px-16 py-16 shadow-md border border-gray-100 mb-8">
               <div className="text-center mb-12">
                  <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] block mb-4 nav-font">
                     Trusted By
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
                     ไว้วางใจโดยกว่า 100+ องค์กร
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                     ครอบคลุมภาคเอกชน รัฐวิสาหกิจ ราชการ และสถาบันการศึกษา
                  </p>
               </div>
               <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
                  {CLIENTS.slice(0, 12).map((client, idx) => (
                     <img
                        key={idx}
                        src={client.logo}
                        alt={client.name}
                        title={client.name}
                        className="h-10 md:h-12 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                     />
                  ))}
               </div>
               <p className="text-center text-gray-400 text-xs leading-relaxed max-w-3xl mx-auto">
                  Tops · Mr.D.I.Y. · AOT · PEA · Land and Houses · Toyota · Dell Technologies · Betagro · EXAT ·
                  สภากาชาดไทย · กรมวิทยาศาสตร์บริการ · สสส. · ปปส. · มหาวิทยาลัยศรีนครินทรวิโรฒ และอีกมากกว่า 100 องค์กร
               </p>
            </section>

            {/* ── 8. FAQ ──────────────────────────────────────────────────────── */}
            <section className="py-20">
               <div className="text-center mb-12">
                  <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] block mb-4 nav-font">
                     FAQ
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
                     คำถามที่พบบ่อย
                  </h2>
                  <p className="text-gray-500">ตอบทุกข้อสงสัยก่อนตัดสินใจ</p>
               </div>
               <div className="max-w-3xl mx-auto space-y-3">
                  {FAQS.map((faq, idx) => (
                     <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <button
                           className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                           onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                        >
                           <span className="font-black text-[#0f3460] nav-font text-base">{faq.q}</span>
                           <ChevronDown
                              className={`w-5 h-5 text-[#c5a059] flex-shrink-0 transition-transform duration-200 ${openFAQ === idx ? 'rotate-180' : ''}`}
                           />
                        </button>
                        {openFAQ === idx && (
                           <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                              {faq.a}
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </section>

            {/* ── 9. FINAL CTA ────────────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-[#0f3460] to-[#1a4a7a] rounded-[3rem] px-8 md:px-16 py-16 text-white text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/15 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c5a059]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
               <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#c5a059]/20 border border-[#c5a059]/50 rounded-full px-5 py-2 mb-8">
                     <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-pulse" />
                     <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] nav-font">เริ่มต้นวันนี้</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black nav-font mb-2 leading-tight text-white">
                     เริ่มต้นพัฒนาทีมของคุณวันนี้
                  </h2>
                  <div className="w-16 h-1 bg-[#c5a059] rounded-full mx-auto mb-6 mt-4" />
                  <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                     ปรึกษาฟรีกับ Master Facilitator — เราวิเคราะห์ปัญหา ออกแบบแนวทาง
                     และส่งใบเสนอราคาภายใน 24 ชั่วโมง
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <a href="/contact"
                        className="bg-[#c5a059] text-white px-12 py-4 rounded-2xl font-black text-xl hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-2xl active:scale-95 inline-flex items-center justify-center gap-3"
                     >
                        ขอใบเสนอราคา <ArrowRight className="w-5 h-5" />
                     </a>
                     <a
                        href={CONTACT_INFO.lineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all nav-font inline-flex items-center justify-center gap-3"
                     >
                        <MessageCircle className="w-5 h-5 text-[#c5a059]" /> ปรึกษาฟรีผ่าน Line
                     </a>
                  </div>
                  <p className="text-white/85 text-xs mt-6">
                     ไม่มีข้อผูกมัด · ตอบกลับภายใน 24 ชั่วโมง · ปรึกษาฟรี
                  </p>
               </div>
            </section>

         </div>

         {/* Course Booking Wizard */}
         <BookingWizard 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
         />
      </div>
   );
};

export default Services;
