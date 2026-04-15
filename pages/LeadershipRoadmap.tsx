import React, { useState, useRef } from 'react';
import {
  ArrowRight, MessageCircle, ChevronRight,
  Target, Zap, Brain, Crown, Rocket,
  Users, TrendingUp, Star, Shield,
  CheckCircle2, Sparkles, Award, BarChart3,
  ArrowUpRight, Play, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants/brand';

// ─── Types ──────────────────────────────────────────────────────────────────
interface RoadmapStage {
  id: string;
  level: number;
  label: string;
  title: string;
  titleTh: string;
  role: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  competencies: string[];
  challenges: string[];
  courses: { name: string; tag: string }[];
  outcome: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STAGES: RoadmapStage[] = [
  {
    id: 'potential',
    level: 1,
    label: 'LEVEL 1',
    title: 'Potential Leader',
    titleTh: 'ผู้นำที่มีศักยภาพ',
    role: 'Staff / Individual Contributor',
    tagline: '"มีแวว" แต่ยังขาดโอกาสพิสูจน์ตัวเอง',
    description:
      'คือคนที่มีความสามารถในตัวเอง มีความมุ่งมั่น และถูกมองว่า "น่าจะเป็นผู้นำได้" แต่ยังขาดทักษะการนำคน เครื่องมือการคิด และความมั่นใจที่จะก้าวขึ้นมา',
    icon: <Star className="w-7 h-7" />,
    color: '#6366f1',
    bgGradient: 'from-indigo-900/60 to-indigo-800/30',
    competencies: [
      'Self-Awareness & Growth Mindset',
      'Communication Basics',
      'Personal Effectiveness',
      'Taking Initiative',
    ],
    challenges: [
      'ไม่รู้จะเริ่มพัฒนาตัวเองจากตรงไหน',
      'ยังไม่มีทีมงานรับผิดชอบ',
      'ขาดความเชื่อมั่นในตัวเอง',
    ],
    courses: [
      { name: 'Growth Mindset & Self-Leadership', tag: 'Foundation' },
      { name: 'Communication for Impact', tag: 'Skill' },
      { name: 'Personal Branding for Professionals', tag: 'Career' },
    ],
    outcome: 'มีความชัดเจนในตัวเอง พร้อมรับบทบาทผู้นำเป็นครั้งแรก',
  },
  {
    id: 'emerging',
    level: 2,
    label: 'LEVEL 2',
    title: 'Emerging Leader',
    titleTh: 'ผู้นำมือใหม่',
    role: 'Team Leader / Supervisor',
    tagline: 'เพิ่งก้าวขึ้นมา ยังติดกับดักการทำเองทุกอย่าง',
    description:
      'ผู้นำที่เพิ่งได้รับตำแหน่ง มักติดกับดัก "ทำเองทุกอย่าง" เพราะยังไม่มั่นใจในทีม ขาดทักษะการมอบหมายงาน การโค้ช และการสร้าง Accountability ในทีม',
    icon: <Zap className="w-7 h-7" />,
    color: '#f59e0b',
    bgGradient: 'from-amber-900/60 to-amber-800/30',
    competencies: [
      'Team Leadership & Delegation',
      'Coaching & Feedback Skills',
      'Goal Setting & Accountability',
      'Conflict Management',
    ],
    challenges: [
      'ยังทำเองทุกอย่าง ไม่กล้า Delegate',
      'ให้ Feedback ลูกทีมไม่เป็น',
      'จัดการความขัดแย้งในทีมไม่ได้',
    ],
    courses: [
      { name: 'Leadership Mindset Shift', tag: 'Core' },
      { name: 'Coaching for Performance', tag: 'Skill' },
      { name: 'Team Accountability System', tag: 'System' },
    ],
    outcome: 'สร้างทีมที่ทำงานได้อย่างอิสระ ลดการ Micromanage',
  },
  {
    id: 'core',
    level: 3,
    label: 'LEVEL 3',
    title: 'Core Leader',
    titleTh: 'ผู้นำระดับกลาง',
    role: 'Manager / Department Head',
    tagline: 'จัดการได้ทั้งงานและคน แต่ยังขาด Systems Thinking',
    description:
      'ผู้นำที่มีประสบการณ์พอสมควร ดูแลทีมได้ แต่เริ่มติดกับดัก "งานยุ่ง ไม่มีเวลาคิด" ขาดระบบในการพัฒนาทีม และยังไม่สามารถเชื่อมงานของตัวเองเข้ากับเป้าหมายองค์กรใหญ่ได้',
    icon: <Target className="w-7 h-7" />,
    color: '#10b981',
    bgGradient: 'from-emerald-900/60 to-emerald-800/30',
    competencies: [
      'Systems Thinking',
      'Cross-functional Collaboration',
      'Data-Driven Decision Making',
      'Developing Talent Pipeline',
    ],
    challenges: [
      'งานยุ่งจนไม่มีเวลาพัฒนาทีม',
      'แต่ละแผนกทำงานแบบ Silo',
      'ตัดสินใจโดยใช้ความรู้สึกมากกว่าข้อมูล',
    ],
    courses: [
      { name: 'Strategic People Development', tag: 'Leadership' },
      { name: 'Leading with Influence', tag: 'Core' },
      { name: 'OKR & Performance Architecture', tag: 'System' },
    ],
    outcome: 'บริหารทีมเป็นระบบ สร้าง Pipeline ผู้นำรุ่นถัดไป',
  },
  {
    id: 'senior',
    level: 4,
    label: 'LEVEL 4',
    title: 'Senior Leader',
    titleTh: 'ผู้นำอาวุโส',
    role: 'Director / General Manager',
    tagline: 'นำได้หลายทีม แต่ยังขาดการมองภาพองค์กรรวม',
    description:
      'ผู้นำที่ดูแลหลายฟังก์ชันหรือหลายทีม มีความสามารถเชิง Operational แต่กำลังก้าวเข้าสู่โลกของ Strategic Leadership ที่ต้องมองภาพรวมระยะยาว สร้าง Culture และ Influence ข้ามองค์กร',
    icon: <TrendingUp className="w-7 h-7" />,
    color: '#c5a059',
    bgGradient: 'from-yellow-900/60 to-yellow-800/30',
    competencies: [
      'Organizational Design',
      'Culture Building & Change Leadership',
      'Executive Communication',
      'Strategic Influence',
    ],
    challenges: [
      'สื่อสารวิสัยทัศน์ให้คนทั้งองค์กรเข้าใจไม่ได้',
      'นำการเปลี่ยนแปลงองค์กรโดยไม่ให้คนต่อต้าน',
      'สร้าง Leadership Culture ให้ฝังลึก',
    ],
    courses: [
      { name: 'Executive Presence & Influence', tag: 'Executive' },
      { name: 'Change Leadership Masterclass', tag: 'Advanced' },
      { name: 'Building High-Performance Culture', tag: 'Culture' },
    ],
    outcome: 'นำการเปลี่ยนแปลงองค์กรได้จริง สร้าง Culture ที่ยั่งยืน',
  },
  {
    id: 'strategic',
    level: 5,
    label: 'LEVEL 5',
    title: 'Strategic Leader',
    titleTh: 'ผู้นำเชิงกลยุทธ์',
    role: 'C-Level / CEO / Executive',
    tagline: 'ตัดสินใจจากภาพใหญ่ สร้างผลกระทบระยะยาว',
    description:
      'ผู้นำสูงสุดที่ต้องมองอนาคต 3–5 ปี สร้างกลยุทธ์องค์กร บริหารความไม่แน่นอน และขับเคลื่อนองค์กรผ่านวิกฤตและโอกาส ด้วย Executive Presence ที่สร้างแรงบันดาลใจ',
    icon: <Crown className="w-7 h-7" />,
    color: '#0f3460',
    bgGradient: 'from-blue-900/60 to-blue-800/30',
    competencies: [
      'Strategic Vision & Scenario Planning',
      'Stakeholder & Board Management',
      'Crisis Leadership',
      'Legacy & Succession Building',
    ],
    challenges: [
      'ตัดสินใจท่ามกลางความไม่แน่นอนสูง',
      'บริหาร Stakeholder ทุกระดับ',
      'สร้างมรดกองค์กรระยะยาว',
    ],
    courses: [
      { name: 'CEO Speechfulness Program', tag: 'Flagship' },
      { name: 'Strategic Facilitation Mastery', tag: 'Advanced' },
      { name: 'Executive Coaching 1-on-1', tag: 'Exclusive' },
    ],
    outcome: 'ขับเคลื่อนองค์กรด้วยวิสัยทัศน์ สร้างมรดกที่ยั่งยืน',
  },
];

const STATS = [
  { value: '15+', label: 'ปีประสบการณ์พัฒนาผู้นำ' },
  { value: '200+', label: 'องค์กรที่ไว้วางใจ' },
  { value: '50,000+', label: 'ผู้นำที่ผ่านกระบวนการ' },
  { value: '5', label: 'ระดับการพัฒนาที่ครอบคลุม' },
];

const PROCESS_STEPS = [
  {
    no: '01',
    icon: <Brain className="w-6 h-6" />,
    title: 'Assess',
    desc: 'วิเคราะห์ระดับผู้นำและช่องว่างที่ต้องพัฒนา',
  },
  {
    no: '02',
    icon: <Target className="w-6 h-6" />,
    title: 'Design',
    desc: 'ออกแบบ Learning Journey เฉพาะองค์กรหรือเฉพาะบุคคล',
  },
  {
    no: '03',
    icon: <Rocket className="w-6 h-6" />,
    title: 'Develop',
    desc: 'ผ่านกระบวนการ Transformative Learning + Coaching',
  },
  {
    no: '04',
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Measure',
    desc: 'วัดผลลัพธ์ที่วัดได้จริง ทั้ง Behavior และ KPI',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StageNav: React.FC<{
  stages: RoadmapStage[];
  active: number;
  onSelect: (i: number) => void;
}> = ({ stages, active, onSelect }) => (
  <div className="relative">
    {/* Connector line */}
    <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-white/10 z-0" />
    <div
      className="hidden md:block absolute top-8 left-0 h-0.5 bg-[#c5a059] z-0 transition-all duration-500"
      style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
    />

    <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between relative z-10">
      {stages.map((s, i) => {
        const isActive = i === active;
        const isPast = i < active;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(i)}
            className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 group"
          >
            {/* Circle */}
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0
                ${isActive
                  ? 'border-[#c5a059] bg-[#c5a059] shadow-lg shadow-[#c5a059]/30 scale-110'
                  : isPast
                  ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]'
                  : 'border-white/20 bg-white/5 text-white/40 group-hover:border-white/40'
                }`}
            >
              <span className={isActive ? 'text-white' : isPast ? 'text-[#c5a059]' : 'text-white/40'}>
                {s.icon}
              </span>
            </div>
            {/* Label */}
            <div className="text-left md:text-center">
              <p className={`text-[9px] md:text-[9px] font-black tracking-widest nav-font uppercase mb-0.5 ${isActive ? 'text-[#c5a059]' : 'text-white/30'}`}>
                {s.label}
              </p>
              <p className={`text-xs md:text-[11px] font-bold nav-font leading-tight ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'} transition-colors`}>
                {s.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const StageDetail: React.FC<{ stage: RoadmapStage }> = ({ stage }) => (
  <motion.div
    key={stage.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className={`rounded-3xl bg-gradient-to-br ${stage.bgGradient} border border-white/10 p-8 md:p-10`}
  >
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
        style={{ backgroundColor: stage.color + '33', border: `2px solid ${stage.color}55` }}
      >
        <span style={{ color: stage.color }}>{stage.icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest nav-font uppercase"
            style={{ backgroundColor: stage.color + '33', color: stage.color }}
          >
            {stage.label}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold nav-font">
            {stage.role}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black nav-font text-white leading-tight">
          {stage.title}
          <span className="block text-lg font-bold mt-1" style={{ color: stage.color }}>
            {stage.titleTh}
          </span>
        </h3>
        <p className="text-white/60 text-sm mt-2 italic">"{stage.tagline}"</p>
      </div>
    </div>

    <p className="text-white/80 leading-relaxed mb-8 text-sm md:text-base">{stage.description}</p>

    <div className="grid md:grid-cols-3 gap-6">
      {/* Competencies */}
      <div>
        <h4 className="text-[10px] font-black tracking-widest nav-font uppercase text-white/40 mb-4 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5" /> ทักษะที่ต้องพัฒนา
        </h4>
        <ul className="space-y-2">
          {stage.competencies.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: stage.color }} />
              <span className="text-white/75 text-sm">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Challenges */}
      <div>
        <h4 className="text-[10px] font-black tracking-widest nav-font uppercase text-white/40 mb-4 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" /> ความท้าทายหลัก
        </h4>
        <ul className="space-y-2">
          {stage.challenges.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-white/30" />
              <span className="text-white/75 text-sm">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Courses */}
      <div>
        <h4 className="text-[10px] font-black tracking-widest nav-font uppercase text-white/40 mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> หลักสูตรแนะนำ
        </h4>
        <ul className="space-y-2">
          {stage.courses.map((c, i) => (
            <li key={i} className="flex items-start gap-2 group">
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-black nav-font uppercase flex-shrink-0 mt-0.5"
                style={{ backgroundColor: stage.color + '33', color: stage.color }}
              >
                {c.tag}
              </span>
              <span className="text-white/75 text-sm group-hover:text-white transition-colors">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Outcome */}
    <div
      className="mt-8 p-4 rounded-2xl flex items-center gap-4"
      style={{ backgroundColor: stage.color + '15', border: `1px solid ${stage.color}30` }}
    >
      <Award className="w-8 h-8 flex-shrink-0" style={{ color: stage.color }} />
      <div>
        <p className="text-[10px] font-black tracking-widest nav-font uppercase text-white/40 mb-0.5">
          ผลลัพธ์ที่คาดหวัง
        </p>
        <p className="font-bold text-white text-sm">{stage.outcome}</p>
      </div>
    </div>
  </motion.div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const LeadershipRoadmap: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const scrollToRoadmap = () => {
    roadmapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080e1a]">
      <SEO
        title="Leadership Roadmap | เส้นทางพัฒนาผู้นำองค์กร"
        description="ออกแบบเส้นทางผู้นำองค์กร จาก Potential Leader สู่ Strategic Leader อย่างมีแบบแผน โดย CAP Vision Institute"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0f3460] pt-16">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Course/cap-vision-leadership-roadmap-strategic-course.png"
            alt="Leadership Roadmap เส้นทางพัฒนาผู้นำองค์กร จาก Potential สู่ Strategic Leader อย่างมีแบบแผน โดย CAP Vision Institute"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3460] via-[#0f3460]/90 to-[#080e1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(197,160,89,0.08),transparent_60%)]" />
          {/* Decorative path line */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 10 80 Q 30 20 50 50 Q 70 80 90 20"
              stroke="#c5a059"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-ping flex-shrink-0" />
              <span className="text-white/80 font-bold tracking-[0.15em] text-[10px] nav-font uppercase">
                Leadership Development Framework
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black nav-font leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">Leadership</span>
              <br />
              <span className="text-[#c5a059]">Roadmap</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-bold text-[#c5a059] mb-4"
            >
              เส้นทางผู้นำองค์กร จาก Potential Leader สู่ Strategic Leader
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
            >
              ผู้นำที่ยิ่งใหญ่ไม่ได้เกิดขึ้นเอง — เขาถูก "พัฒนาอย่างมีแบบแผน"
              ค้นหาระดับของคุณและก้าวต่อไปด้วยหลักสูตรที่ออกแบบมาเพื่อคุณโดยเฉพาะ
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToRoadmap}
                className="inline-flex items-center justify-center gap-3 bg-[#c5a059] hover:bg-[#d4b06a] text-white px-8 py-4 rounded-2xl font-black nav-font text-base transition-all shadow-xl shadow-[#c5a059]/20 active:scale-95"
              >
                <Play className="w-5 h-5" />
                ดู Roadmap ของฉัน
              </button>
              <a
                href={CONTACT_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold nav-font text-base hover:bg-white/15 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                ปรึกษาผู้เชี่ยวชาญ
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] font-bold tracking-widest nav-font uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0f3460] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-black nav-font text-[#c5a059]">{s.value}</p>
                <p className="text-white/50 text-xs md:text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ───────────────────────────────────────────────────────────── */}
      <section ref={roadmapRef} className="py-20 md:py-28 bg-[#080e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span className="text-[#c5a059] text-xs font-black tracking-widest nav-font uppercase">5 Levels of Leadership</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black nav-font text-white leading-tight mb-4">
              คุณอยู่ที่ระดับไหน?
              <span className="block text-[#c5a059] text-2xl md:text-3xl mt-2">เลือกระดับเพื่อดูแผนพัฒนา</span>
            </h2>
            <p className="text-white/55 text-sm md:text-base leading-relaxed">
              กดเลือกระดับผู้นำที่ตรงกับตำแหน่งหรือบทบาทของคุณ แล้วดูทักษะที่ต้องพัฒนา ความท้าทายที่ต้องเผชิญ และหลักสูตรที่ออกแบบมาเพื่อคุณ
            </p>
          </div>

          {/* Stage Navigator */}
          <div className="mb-10">
            <StageNav stages={STAGES} active={activeStage} onSelect={setActiveStage} />
          </div>

          {/* Stage Detail */}
          <AnimatePresence mode="wait">
            <StageDetail key={activeStage} stage={STAGES[activeStage]} />
          </AnimatePresence>

          {/* Prev / Next */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
              disabled={activeStage === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-bold text-sm nav-font hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              ระดับก่อนหน้า
            </button>
            <button
              onClick={() => setActiveStage(Math.min(STAGES.length - 1, activeStage + 1))}
              disabled={activeStage === STAGES.length - 1}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#c5a059] text-white font-bold text-sm nav-font hover:bg-[#d4b06a] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ระดับถัดไป
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-black nav-font text-white mb-4">
              กระบวนการออกแบบ
              <span className="text-[#c5a059]"> Leadership Journey</span>
            </h2>
            <p className="text-white/55 text-sm md:text-base">
              ไม่ใช่แค่อบรมแล้วจบ แต่เป็น Learning Journey ที่ออกแบบเพื่อสร้างการเปลี่ยนแปลงจริง
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#c5a059]/20 via-[#c5a059]/60 to-[#c5a059]/20 z-0" />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#0f3460] border-2 border-[#c5a059]/40 flex items-center justify-center mb-5 shadow-lg shadow-[#c5a059]/10">
                  <span className="text-[#c5a059]">{step.icon}</span>
                </div>
                <span className="text-[#c5a059] text-xs font-black tracking-widest nav-font mb-2">{step.no}</span>
                <h3 className="text-lg font-black nav-font text-white mb-2">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CAP Vision ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#080e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/20 px-4 py-2 rounded-full mb-6">
                <Award className="w-4 h-4 text-[#c5a059]" />
                <span className="text-[#c5a059] text-xs font-black tracking-widest nav-font uppercase">Why CAP Vision</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black nav-font text-white leading-tight mb-6">
                ทำไมองค์กรชั้นนำ
                <span className="text-[#c5a059] block">ไว้วางใจ CAP Vision?</span>
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Brain className="w-5 h-5" />,
                    title: 'Transformative Learning',
                    desc: 'ไม่ใช่แค่รู้ แต่เปลี่ยนพฤติกรรมจริง ผ่านกระบวนการ Experiential Learning',
                  },
                  {
                    icon: <Target className="w-5 h-5" />,
                    title: 'Customized for Your Context',
                    desc: 'ทุกโปรแกรมเริ่มจากการวิเคราะห์ปัญหาจริงขององค์กร ไม่มีหลักสูตรสำเร็จรูป',
                  },
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    title: 'Measurable ROI',
                    desc: 'วัดผลลัพธ์ได้ตั้งแต่ Day 1 ทั้ง Behavior Change และ Business KPI',
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    title: '15+ Years Deep Experience',
                    desc: 'ประสบการณ์พัฒนาผู้นำกว่า 15 ปี ครอบคลุมทุกอุตสาหกรรม ทุกระดับ',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center flex-shrink-0 text-[#c5a059]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black nav-font text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quote card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#c5a059]/5 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-[#0f3460] to-[#0a1628] border border-white/10 rounded-3xl p-8 md:p-10">
                <div className="text-[80px] leading-none text-[#c5a059]/20 font-black nav-font mb-2">"</div>
                <blockquote className="text-white/85 text-base md:text-lg leading-relaxed mb-8 -mt-6">
                  ผู้นำที่แท้จริงไม่ได้เกิดจากตำแหน่ง แต่เกิดจากการพัฒนาอย่างตั้งใจ
                  ที่สร้างการเปลี่ยนแปลงจากภายใน
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-[#c5a059]" />
                  </div>
                  <div>
                    <p className="font-black nav-font text-white text-sm">ครูเด่น มาสเตอร์ฟา</p>
                    <p className="text-white/40 text-xs">อนุสรณ์ หนองนา · CAP Vision Institute</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#0f3460] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.12),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-2 rounded-full mb-8">
              <Rocket className="w-4 h-4 text-[#c5a059]" />
              <span className="text-[#c5a059] text-xs font-black tracking-widest nav-font uppercase">
                เริ่มต้นเส้นทางผู้นำของคุณ
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black nav-font text-white leading-tight mb-6">
              พร้อมออกแบบ
              <span className="text-[#c5a059] block">Leadership Journey?</span>
            </h2>

            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              ให้ทีมผู้เชี่ยวชาญของ CAP Vision ช่วยออกแบบโปรแกรมพัฒนาผู้นำที่เหมาะกับองค์กร ระดับ
              และเป้าหมายของคุณโดยเฉพาะ
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#c5a059] hover:bg-[#d4b06a] text-white px-10 py-4 rounded-2xl font-black nav-font text-base transition-all shadow-xl shadow-[#c5a059]/25 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                ปรึกษาผ่าน LINE ฟรี
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold nav-font text-base hover:bg-white/15 transition-all active:scale-95"
              >
                ดูบริการทั้งหมด
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipRoadmap;
