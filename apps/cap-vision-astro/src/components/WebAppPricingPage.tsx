import React, { useState } from 'react';

import {
  CheckCircle2, X, Zap, Globe, Bot, Database, LineChart,
  Users, ShieldCheck, Rocket, Star, MessageCircle, PhoneCall,
  ChevronDown, ArrowRight, Crown, Building2, Layers3, Server
} from 'lucide-react';

import { CONTACT_INFO } from '../constants/brand';
import WebAppBookingWizard from './WebAppBookingWizard';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  badge?: string;
  name: string;
  nameTh: string;
  subtitle: string;
  outcomeHeadline: string;
  pros: string[];
  price: number;
  priceNote: string;
  infrastructureCost: string;
  domainCost: string;
  color: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  ctaPrimary: string;
  ctaSecondary: string;
  popular?: boolean;
  stripeLink?: string;
}

// ─── Pricing Data ─────────────────────────────────────────────────────────────
const PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'P1 — Brand Presence',
    nameTh: 'สร้างแบรนด์ & ตัวตนดิจิทัล',
    subtitle: 'มีตัวตนออนไลน์ระดับโปร ขยายต่อได้ทันที',
    outcomeHeadline: 'สร้างความน่าเชื่อถือ + มี AI ช่วยตอบลูกค้า',
    pros: [
      'ประหยัดค่า Server ตลอดชีพ',
      'มีหน้าเว็บที่ดูพรีเมียมทันที'
    ],
    price: 25000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    infrastructureCost: 'ฟรีตลอดชีพ (Cloudflare Pages)',
    domainCost: '฿680/ปี (Domain เท่านั้น)',
    color: '#4f86c6',
    accentColor: '#3b6fa8',
    bgGradient: 'from-blue-50 to-indigo-50',
    icon: <Globe className="w-7 h-7" />,
    ctaPrimary: 'เริ่มต้นทันที',
    ctaSecondary: 'ขอคำแนะนำก่อน',
    stripeLink: 'https://buy.stripe.com/4gM9AM5vy6mRgpeba85EY05',
    features: [
      { text: 'Next.js 14 High Performance', included: true },
      { text: '1 หน้า Landing Page (พรีเมียม)', included: true },
      { text: 'Section: Hero · บริการ · Portfolio · ติดต่อ', included: true },
      { text: 'AI Chatbot ตอบแทน 24/7', included: true },
      { text: 'SEO ครบ (Playfair + Sarabun Font)', included: true },
      { text: 'Deploy บน Cloudflare Pages ฟรี', included: true },
      { text: 'Admin Dashboard', included: false },
      { text: 'Blog / บทความ', included: false },
      { text: 'Line OA Integration', included: false },
      { text: 'ระบบสมาชิก', included: false },
    ],
  },
  {
    id: 'p2',
    name: 'P2 — CRM & Portal',
    nameTh: 'เว็บธุรกิจ + ระบบจัดการลูกค้า',
    subtitle: 'เว็บมืออาชีพ บริหารได้เอง มีระบบหลังบ้าน',
    outcomeHeadline: 'เปลี่ยนเว็บไซต์ → เป็นเครื่องมือบริหารธุรกิจ',
    pros: [
      'เก็บฐานข้อมูลลูกค้าได้เอง',
      'ระบบหลังบ้าน Supabase ใช้ง่าย'
    ],
    price: 39000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    infrastructureCost: 'ฟรี Tier เริ่มต้น (Supabase)',
    domainCost: '฿680/ปี (Domain เท่านั้น)',
    color: '#c5a059',
    accentColor: '#a8883e',
    bgGradient: 'from-amber-50 to-yellow-50',
    icon: <Building2 className="w-7 h-7" />,
    ctaPrimary: 'เริ่มต้นทันที',
    ctaSecondary: 'ขอคำแนะนำก่อน',
    stripeLink: 'https://buy.stripe.com/aFa8wIf684eJ0qgcec5EY06',
    features: [
      { text: '5–8 หน้าหลัก (Multi-page)', included: true },
      { text: 'Admin Dashboard (จัดการข้อมูลเอง)', included: true },
      { text: 'Database: Supabase (RLS Security)', included: true },
      { text: 'Contact Form + Lead Management', included: true },
      { text: 'Blog / บทความ + ระบบจัดการ', included: true },
      { text: 'Cloudflare R2 (เก็บรูปภาพ 10GB ฟรี)', included: true },
      { text: 'SEO ครบ + Google Analytics', included: true },
      { text: 'Line OA Integration', included: false },
      { text: 'AI สร้างคอนเทนต์อัตโนมัติ', included: false },
      { text: 'ระบบสมาชิก', included: false },
    ],
  },
  {
    id: 'p3',
    name: 'P3 — AI & Growth',
    nameTh: 'ออโตเมชัน + พลัง AI',
    subtitle: 'ระบบการตลาดอัตโนมัติ + เชื่อมต่อ LINE ครบ',
    outcomeHeadline: 'สร้างระบบขายอัตโนมัติ + ลดงาน Manual',
    pros: [
      'มีระบบปิดการขายผ่าน LINE',
      'AI ช่วยทำงานแทนได้จริง',
      'ประหยัดค่าแอดมินรายเดือน'
    ],
    price: 49000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    infrastructureCost: 'ฟรี Tier เริ่มต้น (Cloudflare Workers)',
    domainCost: '฿680/ปี (Domain เท่านั้น)',
    color: '#0f3460',
    accentColor: '#0a2444',
    bgGradient: 'from-slate-50 to-blue-50',
    icon: <Layers3 className="w-7 h-7" />,
    ctaPrimary: 'เริ่มต้นทันที',
    ctaSecondary: 'ขอคำแนะนำก่อน',
    stripeLink: 'https://buy.stripe.com/fZu14g7DG5iN6OE9205EY07',
    popular: true,
    badge: 'แพ็กเกจยอดนิยม / คุ้มค่าที่สุด',
    features: [
      { text: 'ทุกอย่างใน P2 รวมถึง...', included: true },
      { text: 'Line OA + Messaging API Integration', included: true },
      { text: 'Line Notify แจ้งเตือนยอดขายทันที', included: true },
      { text: 'AI สร้างบทความ/แคปชั่น (Gemini/Claude)', included: true },
      { text: 'AI Personal Advisor พื้นฐาน', included: true },
      { text: 'Custom AI Prompt สำหรับธุรกิจคุณ', included: true },
      { text: 'Email System: Resend (3,000/เดือน)', included: true },
      { text: 'Admin Dashboard (Advanced)', included: true },
      { text: 'White-label Infrastructure', included: true },
      { text: 'ระบบสมาชิก / ชำระเงินออนไลน์', included: false },
    ],
  },
  {
    id: 'p4',
    name: 'P4 — Full Platform',
    nameTh: 'คอมมูนิตี้ + ระบบสมาชิก',
    subtitle: 'สร้างชุมชน / Online Learning / SaaS',
    outcomeHeadline: 'สร้าง Platform ของคุณเอง (รายได้ระยะยาว)',
    pros: [
      'ทำระบบสมาชิก / คอร์ส / Community',
      'ขยายเป็นธุรกิจ Subscription ได้'
    ],
    price: 85000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    infrastructureCost: 'Auto-scaling (Serverless)',
    domainCost: '฿680/ปี (Domain เท่านั้น)',
    color: '#7c3aed',
    accentColor: '#6d28d9',
    bgGradient: 'from-violet-50 to-purple-50',
    icon: <Crown className="w-7 h-7" />,
    ctaPrimary: 'เริ่มต้นทันที',
    ctaSecondary: 'ขอคำแนะนำก่อน',
    stripeLink: 'https://buy.stripe.com/bJe00c4rufXr4Gw9205EY08',
    badge: 'สำหรับสเกลธุรกิจ',
    features: [
      { text: 'ทุกอย่างใน P3 รวมถึง...', included: true },
      { text: 'ระบบสมาชิก (SignUp / Login / Profile)', included: true },
      { text: 'ชำระเงินออนไลน์ (PromptPay / บัตรเครดิต)', included: true },
      { text: 'Online Learning (Video / Quiz / Cert)', included: true },
      { text: 'Community Feed / Discussion Board', included: true },
      { text: 'Dashboard ความคืบหน้าของสมาชิก', included: true },
      { text: 'Subscription Billing System', included: true },
      { text: 'Super Admin Analytics Dashboard', included: true },
      { text: 'Infrastructure พร้อมรับ User จำนวนมาก', included: true },
      { text: 'API Integration ขั้นสูง', included: true },
    ],
  },
  {
    id: 'p5',
    name: 'P5 — Enterprise Customer Service',
    nameTh: 'ระบบดูแลลูกค้าองค์กรอัจฉริยะ',
    subtitle: 'ยกระดับบริการด้วย AI Agent ขั้นสูง',
    outcomeHeadline: 'ลดภาระแอดมิน 90% + ลูกค้าประทับใจ 24/7',
    pros: [
      'AI เรียนรู้ข้อมูลองค์กรเชิงลึก',
      'ระบบดูแลลูกค้าแบบไร้รอยต่อ',
      'Custom Deep Integration'
    ],
    price: 150000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    infrastructureCost: 'Dedicated / High Availability',
    domainCost: '฿680/ปี (Domain เท่านั้น)',
    color: '#10b981',
    accentColor: '#059669',
    bgGradient: 'from-emerald-50 to-teal-50',
    icon: <Rocket className="w-7 h-7" />,
    ctaPrimary: 'ปรึกษาโปรเจกต์พิเศษ',
    ctaSecondary: 'ดูตัวอย่าง Demo',
    stripeLink: 'https://buy.stripe.com/5kA6oA5vy7qVepacN8',
    badge: 'ขีดสุดของเทคโนโลยี',
    features: [
      { text: 'ทุกอย่างใน P4 รวมถึง...', included: true },
      { text: 'Advanced AI Agent (Context Learning)', included: true },
      { text: 'Deep Integration กับระบบเดิมขององค์กร', included: true },
      { text: 'Custom Workflow Automation', included: true },
      { text: 'ระบบวิเคราะห์ความพึงพอใจลูกค้าด้วย AI', included: true },
      { text: 'Enterprise Grade Security & RLS', included: true },
      { text: 'Priority Support & Consultation', included: true },
      { text: 'Scalable Microservices Architecture', included: true },
      { text: 'Custom Design (Design System เฉพาะ)', included: true },
      { text: 'อบรมทีมงานและดูแลหลังการขาย 1 ปี', included: true },
    ],
  },
];

// ─── Add-ons ──────────────────────────────────────────────────────────────────
const ADDONS = [
  { icon: <Server className="w-5 h-5" />, name: 'Maintenance รายเดือน', price: '฿3,000–10,000/เดือน' },
  { icon: <Bot className="w-5 h-5" />, name: 'AI Content (ไทย-อังกฤษ) รายเดือน', price: '฿5,000/เดือน' },
  { icon: <MessageCircle className="w-5 h-5" />, name: 'Line OA Setup + Flow Bot', price: '฿15,000' },
  { icon: <Globe className="w-5 h-5" />, name: 'เพิ่มภาษา (Multilingual)', price: '฿20,000+' },
  { icon: <Bot className="w-5 h-5" />, name: 'Custom AI Persona / ตัวละคร AI', price: '฿25,000+' },
  { icon: <Users className="w-5 h-5" />, name: 'Training ทีมงานใช้ระบบ', price: '฿5,000/ครึ่งวัน' },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'ราคานี้รวมอะไรบ้าง?',
    a: 'รวมค่าออกแบบ พัฒนาระบบ Deploy บน VPS และ โดเมนปีแรก (ฟรี) ค่า VPS รายเดือนของ Hostinger ลูกค้าจ่ายตรงกับ Hostinger เองครับ ครูเด่นช่วย Setup และ Config ให้ฟรี',
  },
  {
    q: 'ใช้เวลานานเท่าไหร่ในการสร้าง?',
    a: 'P1: 7–14 วัน | P2: 3–5 สัปดาห์ | P3: 6–10 สัปดาห์ | P4: 3–6 เดือน ขึ้นกับความซับซ้อนและความรวดเร็วในการส่งข้อมูลของลูกค้า',
  },
  {
    q: 'แก้ไขได้กี่รอบ?',
    a: 'P1: 2 รอบ | P2: 3 รอบ | P3: ไม่จำกัดรอบภายใน 90 วัน | P4: ไม่จำกัดพร้อม Support 1 ปี',
  },
  {
    q: 'ถ้าต้องการ Support หลังส่งงานต้องทำอย่างไร?',
    a: 'มีแผน Maintenance รายเดือน ตั้งแต่ ฿3,000/เดือน ครอบคลุม อัปเดตระบบ แก้ Bug และ ปรับปรุงเนื้อหา',
  },
  {
    q: 'เว็บจะ Deploy ที่ไหน?',
    a: 'Deploy บน Hostinger VPS (Linux/Ubuntu) ที่ลูกค้าเป็นเจ้าของ บัญชี เข้าถึงได้เอง 100% ไม่ได้ lock อยู่กับเรา',
  },
  {
    q: 'มี AI ภาษาไทยรองรับไหม?',
    a: 'ใช่ครับ! ระบบ AI ทุก Package รองรับภาษาไทยเต็มรูปแบบ ใช้ Google Gemini และ Claude AI ที่เข้าใจบริบทภาษาไทยได้ดีเยี่ยม',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const WebAppPricing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsWizardOpen(true);
  };

  const formatPrice = (n: number) =>
    n.toLocaleString('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 });

  return (
    <>
      

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0f3460] pt-24 pb-16">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#c5a059]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-white/3 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#c5a059] text-sm font-bold px-5 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4" />
            บริการที่ปรึกษาดิจิทัลโดยครูเด่น มาสเตอร์ฟา
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 nav-font">
            เลือก <span className="text-[#c5a059]">“ระบบที่ช่วยคุณสร้างรายได้”</span>
            <br />
            ไม่ใช่แค่เว็บไซต์
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            <span className="text-[#c5a059] font-bold">เริ่มต้นจากตัวตน → สู่ระบบธุรกิจ → เติบโตเป็นแพลตฟอร์ม</span>
            <br />
            ออกแบบ พัฒนา และ Deploy โดยทีมผู้เชี่ยวชาญเพื่อความสำเร็จของธุรกิจคุณ
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { n: '15+', label: 'ปีประสบการณ์' },
              { n: '5', label: 'แพคเกจครอบคลุม' },
              { n: 'AI', label: 'ทุกแพคเกจ' },
              { n: '฿680', label: 'ค่าใช้จ่ายรายปี' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-[#c5a059] nav-font">{s.n}</div>
                <div className="text-white/60 text-xs md:text-sm mt-1 nav-font">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="mt-12 flex flex-col items-center gap-2 text-white/40 text-sm">
            <span>เลือกแพคเกจด้านล่าง</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Hosting Included Strip ───────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#c5a059] to-amber-500 text-white py-3 px-4 text-center">
        <p className="text-sm md:text-base font-bold nav-font flex items-center justify-center gap-2 flex-wrap">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          ทุกแพคเกจ: โครงสร้างพื้นฐานระดับโลก (Cloudflare + Supabase) · ไม่มีค่า Server รายเดือน · จ่ายแค่ค่าโดเมน ฿680/ปี
        </p>
      </div>

      {/* ── Package Selector (Decision Booster) ──────────────────────────────── */}
      <section className="py-12 bg-white px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-8">
            คุณอยู่ในระดับไหนตอนนี้?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'เริ่มต้น', target: 'p1', desc: 'สร้างตัวตนระดับโปร' },
              { label: 'มีธุรกิจแล้ว', target: 'p2', desc: 'ต้องการระบบจัดการ' },
              { label: 'อยากโตเร็ว', target: 'p3', desc: 'เน้น AI ออโตเมชัน' },
              { label: 'สร้าง Platform', target: 'p4', desc: 'สเกลธุรกิจระยะยาว' },
              { label: 'Enterprise', target: 'p5', desc: 'ระบบดูแลลูกค้าอัจฉริยะ' }
            ].map((btn) => (
              <button
                key={btn.target}
                onClick={() => {
                  const el = document.getElementById(`plan-${btn.target}`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="group p-4 rounded-2xl border-2 border-gray-100 hover:border-[#c5a059] hover:bg-[#c5a059]/5 transition-all text-center"
              >
                <div className="font-black text-[#0f3460] group-hover:text-[#c5a059] nav-font mb-1">👈 {btn.label}</div>
                <div className="text-[10px] text-gray-400 font-medium">{btn.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1600px] mx-auto" id="pricing-grid">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
              เลือกแพคเกจที่ใช่สำหรับคุณ
            </h2>
            <p className="text-gray-500 text-lg">5 ระดับ ครอบคลุมทุกขนาดธุรกิจและการเติบโต</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                id={`plan-${plan.id}`}
                className={`relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  plan.popular
                    ? 'ring-4 ring-[#c5a059] shadow-2xl shadow-[#c5a059]/30'
                    : 'shadow-lg border border-gray-100'
                } bg-white`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className={`absolute top-0 inset-x-0 ${plan.popular ? 'bg-[#c5a059]' : 'bg-gray-800'} text-white text-[10px] font-black text-center py-2 nav-font tracking-wider uppercase z-10`}>
                    {plan.popular && '🔥 '} {plan.badge}
                  </div>
                )}

                {/* Card Header */}
                <div
                  className={`px-6 pt-${plan.badge ? '12' : '8'} pb-6`}
                  style={{ background: `linear-gradient(135deg, ${plan.color}15, ${plan.color}05)` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg"
                    style={{ backgroundColor: plan.color }}
                  >
                    {plan.icon}
                  </div>
                  <div className="text-xs font-bold tracking-widest nav-font mb-2" style={{ color: plan.color }}>
                    {plan.name}
                  </div>
                  <h3 className="text-xl font-black text-[#0f3460] nav-font leading-tight mb-2">
                    {plan.outcomeHeadline}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{plan.nameTh}</p>
                </div>

                {/* Benefits / Pros (Pain -> Solution) */}
                <div className="px-6 py-4 bg-green-50/30 border-y border-green-100">
                  <ul className="space-y-2">
                    {plan.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-green-800">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="px-6 py-6 transition-colors">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-3xl font-black text-[#0f3460] nav-font">
                      {formatPrice(plan.price)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{plan.priceNote}</p>

                  {/* Infrastructure Info (Compact) */}
                  <div className="mt-4 bg-gray-50 rounded-xl p-3 space-y-1 border border-gray-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                      <Zap className="w-3 h-3 flex-shrink-0 text-[#c5a059]" />
                      {plan.infrastructureCost}
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <Globe className="w-3 h-3 text-green-500" />
                      <span className="text-[10px] text-green-600 font-bold uppercase">{plan.domainCost}</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="px-6 py-2 flex-1">
                  <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3">คุณสมบัติหลัก</div>
                  <ul className="space-y-3">
                    {plan.features.slice(0, 7).map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        {f.included ? (
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#c5a059]" />
                        ) : (
                          <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-300" />
                        )}
                        <span
                          className={`text-[11px] leading-relaxed ${
                            f.included ? 'text-gray-600 font-medium' : 'text-gray-300 line-through'
                          } ${f.text.startsWith('ทุกอย่าง') ? 'font-bold text-[#0f3460]' : ''}`}
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="px-6 pb-6 pt-4 mt-auto space-y-2">
                  <button
                    onClick={() => {
                        if (plan.id === 'p5') {
                            window.open(CONTACT_INFO.lineUrl, '_blank');
                        } else {
                            handleSelectPlan(plan);
                        }
                    }}
                    className="w-full bg-[#c5a059] hover:bg-amber-400 text-white py-3.5 rounded-2xl font-black text-sm nav-font shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    🔥 {plan.ctaPrimary}
                  </button>
                  <a
                    href={plan.id === 'p5' ? 'https://dencapvision.github.io/Migijames-final-demo/' : CONTACT_INFO.lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full bg-white border-2 border-gray-100 hover:border-[#0f3460] text-[#0f3460] py-3 rounded-2xl font-bold text-xs nav-font transition-all"
                  >
                    💬 {plan.ctaSecondary}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof (Trust Booster) */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm font-bold nav-font mb-6 uppercase tracking-widest">ได้รับความไว้วางใจจากองค์กรชั้นนำ</p>
          <div className="flex justify-center items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Fallback stylized logos */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center px-4">
               <span className="text-xl md:text-3xl font-black text-slate-300 tracking-tighter">TOYOTA</span>
               <span className="text-xl md:text-3xl font-black text-slate-300 tracking-tighter italic">DELL</span>
               <span className="text-xl md:text-3xl font-black text-slate-300 tracking-tighter">CENTRAL</span>
               <span className="text-xl md:text-3xl font-black text-slate-300 tracking-tighter italic">Mr.D.I.Y.</span>
               <span className="text-xl md:text-3xl font-black text-slate-300 tracking-tighter">AOT</span>
            </div>
          </div>
        </div>

        {/* Urgency / Scarcity Banner */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center justify-center gap-4 animate-pulse">
            <span className="text-2xl">⏳</span>
            <div className="text-left">
              <p className="text-red-600 font-black nav-font text-sm uppercase tracking-wider">🔥 รับเพียง 3 โปรเจกต์ / เดือน เท่านั้น</p>
              <p className="text-red-500 text-[11px] font-bold">เพื่อคุณภาพการดูแลที่ลึกซึ้งที่สุด ปิดรับรอบนี้ใน 3 วัน</p>
            </div>
          </div>
        </div>

        {/* Wizard Modal */}
        {isWizardOpen && selectedPlan && (
          <WebAppBookingWizard 
            selectedPackage={{
              id: selectedPlan.id,
              name: selectedPlan.nameTh,
              price: selectedPlan.price,
              stripeLink: selectedPlan.stripeLink,
              features: selectedPlan.features.map(f => f.text)
            }}
            onClose={() => setIsWizardOpen(false)}
          />
        )}
      </section>

      {/* ── Comparison Table ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font text-center mb-10">
            เปรียบเทียบแพคเกจ
          </h2>

          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f3460] text-white">
                  <th className="text-left py-4 px-5 nav-font font-bold min-w-[200px]">ฟีเจอร์</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="py-4 px-4 nav-font font-bold text-center min-w-[120px]">
                      <div className="text-[11px] text-white/60 mb-0.5">{p.name.split('—')[0]}</div>
                      <div className="text-[#c5a059]">{p.name.split('—')[1]?.trim()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price row */}
                <tr className="bg-[#c5a059]/5 border-b border-gray-100">
                  <td className="py-3 px-5 font-bold text-[#0f3460] nav-font">ราคา</td>
                  {PLANS.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-center font-black text-[#0f3460] nav-font">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>
                {[
                  { label: 'Next.js 14 + App Router', values: [true, true, true, true, true] },
                  { label: 'AI Chatbot (พื้นฐาน)', values: [true, true, true, true, true] },
                  { label: 'Admin Dashboard', values: [false, true, true, true, true] },
                  { label: 'Supabase Database', values: [false, true, true, true, true] },
                  { label: 'Blog + AI ช่วยเขียน', values: [false, true, true, true, true] },
                  { label: 'Cloudflare R2 Storage', values: [false, true, true, true, true] },
                  { label: 'LINE OA Integration', values: [false, false, true, true, true] },
                  { label: 'AI Content Generation', values: [false, false, true, true, true] },
                  { label: 'ระบบสมาชิก / ชำระเงิน', values: [false, false, false, true, true] },
                  { label: 'Online Learning (LMS)', values: [false, false, false, true, true] },
                  { label: 'Advanced AI Agent', values: [false, false, false, false, true] },
                  { label: 'Deep System Integration', values: [false, false, false, false, true] },
                  { label: 'ค่า Server รายเดือน', values: ['฿0', '฿0*', '฿0*', '฿0*', 'Custom'] },
                  { label: 'ค่าโดเมนรายปี', values: ['฿680', '฿680', '฿680', '฿680', '฿680'] },
                ].map((row, idx) => (
                  <tr key={idx} className={`border-b border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="py-3 px-5 text-gray-700 font-medium">{row.label}</td>
                    {row.values.map((v, vi) => (
                      <td key={vi} className="py-3 px-4 text-center">
                        {typeof v === 'boolean' ? (
                          v ? (
                            <CheckCircle2 className="w-5 h-5 mx-auto text-green-500" />
                          ) : (
                            <X className="w-4 h-4 mx-auto text-gray-200" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-[#0f3460]">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[10px] text-gray-400 text-center">* ฿0 ภายใต้เงื่อนไขการใช้งาน Free Tier ของ Supabase/Cloudflare (50k Users / 10GB Storage)</p>
        </div>
      </section>

      {/* ── Add-ons ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font text-center mb-3">
            บริการเสริม (Add-on)
          </h2>
          <p className="text-center text-gray-500 mb-10">เลือกเพิ่มได้กับทุกแพคเกจ</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ADDONS.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#0f3460]/5 flex items-center justify-center text-[#c5a059] flex-shrink-0">
                  {a.icon}
                </div>
                <div>
                  <p className="font-bold text-[#0f3460] text-sm nav-font">{a.name}</p>
                  <p className="text-[#c5a059] font-bold text-sm mt-0.5">{a.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Den Masterfa ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font text-center mb-10">
            ทำไมต้องเลือก ครูเด่น มาสเตอร์ฟา?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Rocket className="w-7 h-7" />,
                title: 'Zero Server Cost',
                desc: 'ใช้ Stack ทันสมัย (Cloudflare + Supabase) ประหยัดค่า Server ปีละหลายหมื่น จ่ายแค่ค่าโดเมนหลักร้อยต่อปี',
              },
              {
                icon: <Bot className="w-7 h-7" />,
                title: 'AI Native System',
                desc: 'ออกแบบระบบให้มี AI ในตัวตั้งแต่แรก (Gemini/Claude) ไม่ใช่แค่การแปะแชทบอท แต่คือการทำงานร่วมกับธุรกิจ',
              },
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: 'Ownership 100%',
                desc: 'บัญชี Cloudflare และ Supabase เป็นชื่อของคุณ โค้ดเป็นของคุณ ไม่มีการ lock-in สเกลได้ไม่จำกัด',
              },
              {
                icon: <Star className="w-7 h-7" />,
                title: '15+ ปี Corporate Training',
                desc: 'ผมไม่ได้แค่เขียนโปรแกรม แต่ผมเข้าใจ "คน" และ "ธุรกิจ" UX จึงถูกออกแบบให้ใช้งานได้จริงตามพฤติกรรมลูกค้าไทย',
              },
              {
                icon: <Database className="w-7 h-7" />,
                title: 'Next.js 14 + Supabase',
                desc: 'ใช้เทคโนโลยีล่าสุดที่บริษัทชั้นนำระดับโลกเลือกใช้ มั่นใจเรื่องความเร็ว ความปลอดภัย และความเสถียร',
              },
              {
                icon: <LineChart className="w-7 h-7" />,
                title: 'SEO Optimized',
                desc: 'ทุกโปรเจกต์มาพร้อม SEO มาตรฐานสูงสุด Playfair Display + Sarabun Font จัดวาง Schema ครบ ให้ Google รักเว็บคุณ',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-[#0f3460]/3 to-[#c5a059]/5 rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#0f3460] text-white flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-black text-[#0f3460] nav-font mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font text-center mb-10">
            คำถามที่พบบ่อย
          </h2>
          <div className="space-y-3">
            {[
              {
                q: 'ทำไมถึงไม่มีค่า Server รายเดือน?',
                a: 'เพราะเราเลือกใช้โครงสร้างแบบ Serverless (Cloudflare Pages + Supabase) ซึ่งมี Free Tier ที่ใหญ่มาก รองรับผู้ใช้ได้ถึง 50,000 คนต่อเดือน และเก็บข้อมูลได้เยอะ หากธุรกิจโตขึ้นมากจริงๆ คุณค่อยขยาย (Pay as you go) ซึ่งก็ยังถูกกว่าการเช่า VPS ทั่วไปมากครับ',
              },
              {
                q: 'ปีที่ 2 ต้องจ่ายเท่าไหร่?',
                a: 'จ่ายเพียงค่าต่ออายุชื่อโดเนม (Domain Name) ประมาณ ฿680/ปี เท่านั้นครับ ไม่มีค่าธรรมเนียมรายปีของระบบเรา',
              },
              {
                q: 'ใช้เวลานานเท่าไหร่ในการสร้าง?',
                a: 'P1: 7–10 วัน | P2-P3: 3–6 สัปดาห์ | P4-P5: 2–4 เดือน ขึ้นกับความซับซ้อนและการเตรียมข้อมูลของลูกค้าครับ',
              },
              {
                q: 'มี AI ภาษาไทยรองรับไหม?',
                a: 'รองรับ 100% ครับ เราเชื่อมต่อกับ Google Gemini และ Claude AI ซึ่งเก่งภาษาไทยมากที่สุดในปัจจุบัน ช่วยให้การโต้ตอบเป็นธรรมชาติ',
              },
              {
                q: 'แก้ไขงานได้กี่รอบ?',
                a: 'เราทำงานเป็น Phase ครับ ในแต่ละ Phase ลูกค้าตรวจรับและปรับแก้ได้จนพอใจภายใต้ขอบเขตงาน (Scope) ที่ตกลงกันไว้',
              },
              {
                q: 'ถ้าต้องการเพิ่มฟีเจอร์ในอนาคตทำได้ไหม?',
                a: 'ได้แน่นอนครับ โครงสร้าง Next.js + Supabase ถูกออกแบบมาให้ขยาย (Scale) ได้ง่ายมาก คุณสามารถเริ่มที่ P1 แล้วค่อยๆ อัปเกรดเป็น P3 หรือ P5 ได้ตามการเติบโตของธุรกิจครับ',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-bold text-[#0f3460] nav-font text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#c5a059] transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0f3460] via-[#1a4b7c] to-[#0f3460] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#c5a059]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🎯</div>
          <h2 className="text-3xl md:text-5xl font-black text-white nav-font mb-6 leading-tight">
            คุณไม่จำเป็นต้องเริ่มจากแพ็กเกจที่ใหญ่ที่สุด<br />
            แต่คุณควรเริ่ม <span className="text-[#c5a059]">“ก่อนที่โอกาสจะหายไป”</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            ปรึกษาฟรี ไม่มีข้อผูกมัด <br />
            <span className="text-white font-bold">เริ่มต้นสร้างระบบธุรกิจของคุณวันนี้</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
               onClick={() => {
                 const el = document.getElementById('pricing-grid');
                 el?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="inline-flex items-center justify-center gap-3 bg-[#c5a059] hover:bg-amber-400 text-white font-black text-lg py-5 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-[#c5a059]/40 active:scale-95 nav-font w-full sm:w-auto"
            >
              🔥 เริ่มสร้างระบบธุรกิจของคุณ
            </button>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-lg py-5 px-10 rounded-2xl transition-all duration-300 nav-font"
            >
              <PhoneCall className="w-5 h-5" />
              คุยกับครูเด่นตอนนี้
            </a>
          </div>

          <p className="text-white/30 text-[10px] mt-10 uppercase tracking-widest font-bold">
            Support 24/7 · No Credit Card Required for Consultation · Guaranteed ROI
          </p>
        </div>
      </section>
    </>
  );
};

export default WebAppPricing;
