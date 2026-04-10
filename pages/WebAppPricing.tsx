import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, X, Zap, Globe, Bot, Database, LineChart,
  Users, ShieldCheck, Rocket, Star, MessageCircle, PhoneCall,
  ChevronDown, ArrowRight, Crown, Building2, Layers3, Server
} from 'lucide-react';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants/brand';
import WebAppBookingWizard from '../components/WebAppBookingWizard';

// ─── Types ────────────────────────────────────────────────────────────────────
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
  price: number;
  priceNote: string;
  hostingPlan: string;
  hostingSpec: string;
  hostingPrice: string;
  hostingRenewal: string;
  domain: boolean;
  color: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  stripeLink?: string;
}

// ─── Pricing Data ─────────────────────────────────────────────────────────────
const PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'P1 — AI Profile',
    nameTh: 'เว็บโปรไฟล์ + เอไอ',
    subtitle: 'มีตัวตนออนไลน์ มีเอไอตอบแทน 24/7',
    price: 15000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    hostingPlan: 'Hostinger KVM 1',
    hostingSpec: '1 vCPU · RAM 4 GB · NVMe 50 GB · Bandwidth 4 TB',
    hostingPrice: '฿249/เดือน (โปรโมชั่น 12 เดือน)',
    hostingRenewal: 'ต่ออายุ ฿399/เดือน',
    domain: true,
    color: '#4f86c6',
    accentColor: '#3b6fa8',
    bgGradient: 'from-blue-50 to-indigo-50',
    icon: <Globe className="w-7 h-7" />,
    cta: 'เริ่มสร้างเว็บโปรไฟล์',
    stripeLink: 'https://buy.stripe.com/test_6oE8wS6tL7q8', // Example link
    features: [
      { text: '1 หน้า Landing Page', included: true },
      { text: 'Section: Hero · บริการ · Portfolio · ติดต่อ', included: true },
      { text: 'AI Chatbot ตอบแทน 24/7', included: true },
      { text: 'SEO ครบ (Meta, OG Image, Schema)', included: true },
      { text: 'Responsive ทุกอุปกรณ์', included: true },
      { text: 'Deploy บน VPS + โดเมนฟรีปีแรก', included: true },
      { text: 'Admin Dashboard', included: false },
      { text: 'Blog / บทความ', included: false },
      { text: 'Line OA Integration', included: false },
      { text: 'ระบบสมาชิก', included: false },
    ],
  },
  {
    id: 'p2',
    name: 'P2 — Business Web',
    nameTh: 'เว็บธุรกิจ + ระบบหลังบ้าน',
    subtitle: 'เว็บมืออาชีพ บริหารได้เอง มี AI',
    price: 35000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    hostingPlan: 'Hostinger KVM 2',
    hostingSpec: '2 vCPU · RAM 8 GB · NVMe 100 GB · Bandwidth 8 TB',
    hostingPrice: '฿329/เดือน (โปรโมชั่น 12 เดือน)',
    hostingRenewal: 'ต่ออายุ ฿489/เดือน',
    domain: true,
    color: '#c5a059',
    accentColor: '#a8883e',
    bgGradient: 'from-amber-50 to-yellow-50',
    icon: <Building2 className="w-7 h-7" />,
    cta: 'สร้างเว็บธุรกิจ',
    stripeLink: 'https://buy.stripe.com/test_5kA7sOeWxfKy', // Example link
    features: [
      { text: '5–8 หน้าหลัก (Multi-page)', included: true },
      { text: 'Admin Dashboard จัดการเนื้อหาเอง', included: true },
      { text: 'AI Chatbot ตอบ & แนะนำบริการ', included: true },
      { text: 'Blog / บทความ + AI ช่วยเขียน', included: true },
      { text: 'Portfolio & Gallery ผลงาน', included: true },
      { text: 'Contact Form + เก็บ Lead ใน DB', included: true },
      { text: 'Deploy บน VPS + โดเมนฟรีปีแรก', included: true },
      { text: 'Line OA Integration', included: false },
      { text: 'AI สร้างคอนเทนต์อัตโนมัติ', included: false },
      { text: 'ระบบสมาชิก', included: false },
    ],
  },
  {
    id: 'p3',
    name: 'P3 — Smart Platform',
    nameTh: 'แพลตฟอร์มอัจฉริยะ + Line OA',
    subtitle: 'ระบบการตลาดอัตโนมัติ + AI สร้างสื่อ',
    price: 75000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    hostingPlan: 'Hostinger KVM 2',
    hostingSpec: '2 vCPU · RAM 8 GB · NVMe 100 GB · Bandwidth 8 TB',
    hostingPrice: '฿329/เดือน (โปรโมชั่น 12 เดือน)',
    hostingRenewal: 'ต่ออายุ ฿489/เดือน',
    domain: true,
    color: '#0f3460',
    accentColor: '#0a2444',
    bgGradient: 'from-slate-50 to-blue-50',
    icon: <Layers3 className="w-7 h-7" />,
    cta: 'อัปเกรดสู่ Smart Platform',
    stripeLink: 'https://buy.stripe.com/test_8wM6oK9Gb3aC', // Example link
    popular: true,
    badge: 'แนะนำ',
    features: [
      { text: 'ทุกอย่างใน P2 รวมถึง...', included: true },
      { text: 'Line OA Integration + Line Notify', included: true },
      { text: 'AI สร้างบทความ/โพสต์ อัตโนมัติ', included: true },
      { text: 'AI Generator หลักสูตรฝึกอบรม', included: true },
      { text: 'ระบบ Event & สัมมนา', included: true },
      { text: 'Media Library (วีดีโอ, PDF, ดาวน์โหลด)', included: true },
      { text: 'Leads Management Dashboard', included: true },
      { text: 'Multi-Role Admin (แยกสิทธิ์)', included: true },
      { text: 'Deploy บน VPS + โดเมนฟรีปีแรก', included: true },
      { text: 'ระบบสมาชิก / ชำระเงินออนไลน์', included: false },
    ],
  },
  {
    id: 'p4',
    name: 'P4 — Full Platform',
    nameTh: 'แพลตฟอร์มเต็มรูปแบบ + สมาชิก',
    subtitle: 'สร้างชุมชน / Online Learning / SaaS',
    price: 120000,
    priceNote: 'ราคาเริ่มต้น (จ่ายครั้งเดียว)',
    hostingPlan: 'Hostinger KVM 2–4',
    hostingSpec: '2–4 vCPU · RAM 8–16 GB · NVMe 100–200 GB · Bandwidth 8–16 TB',
    hostingPrice: '฿329–439/เดือน (โปรโมชั่น 12 เดือน)',
    hostingRenewal: 'ต่ออายุ ฿489–909/เดือน',
    domain: true,
    color: '#7c3aed',
    accentColor: '#6d28d9',
    bgGradient: 'from-violet-50 to-purple-50',
    icon: <Crown className="w-7 h-7" />,
    cta: 'สร้างแพลตฟอร์มของคุณ',
    stripeLink: 'https://buy.stripe.com/test_7sI9AW19v9yg', // Example link
    features: [
      { text: 'ทุกอย่างใน P3 รวมถึง...', included: true },
      { text: 'ระบบสมาชิก (สมัคร / Login / โปรไฟล์)', included: true },
      { text: 'ชำระเงินออนไลน์ (PromptPay / บัตรเครดิต)', included: true },
      { text: 'Online Learning (Video / Quiz / Certificate)', included: true },
      { text: 'AI Personal Advisor (รู้จักผู้ใช้แต่ละคน)', included: true },
      { text: 'Dashboard ความคืบหน้าสมาชิก', included: true },
      { text: 'Community Feed / กระดานสนทนา', included: true },
      { text: 'Super Admin Analytics Dashboard', included: true },
      { text: 'Deploy บน VPS + โดเมนฟรีปีแรก', included: true },
      { text: 'White-label Ready (ขยายได้)', included: true },
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
      <SEO
        title="บริการสร้างเว็บแอพ AI พร้อมใช้ | ครูเด่น มาสเตอร์ฟา"
        description="บริการสร้างเว็บแอพพร้อมระบบ AI ครบวงจร 4 แพคเกจ ตั้งแต่เว็บโปรไฟล์ ถึงแพลตฟอร์มสมาชิก โดยครูเด่น มาสเตอร์ฟา"
        keywords={['สร้างเว็บไซต์', 'เว็บแอพ AI', 'ที่ปรึกษาดิจิทัล', 'ครูเด่น', 'CAP Vision']}
      />

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
            เว็บแอพ{' '}
            <span className="text-[#c5a059]">พร้อมใช้</span>
            <br />
            พร้อม{' '}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              AI ครบวงจร
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            ออกแบบ พัฒนา และ Deploy โดยผู้สร้าง{' '}
            <span className="text-white font-bold">capvisionpartner.com · unicorngloballink.com · unicornsmartai.cloud</span>
            <br />
            <span className="text-[#c5a059]">ฟรีโดเมนปีแรก + Setup VPS บน Hostinger</span> ทุกแพคเกจ
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { n: '15+', label: 'ปีประสบการณ์' },
              { n: '4', label: 'แพคเกจครอบคลุม' },
              { n: 'AI', label: 'ทุกแพคเกจ' },
              { n: '100%', label: 'เจ้าของ VPS เอง' },
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
          ทุกแพคเกจ: ฟรีโดเมนปีแรก · Deploy บน Hostinger VPS ที่คุณเป็นเจ้าของ · Setup &amp; Config ฟรี
        </p>
      </div>

      {/* ── Pricing Cards ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
              เลือกแพคเกจที่ใช่สำหรับคุณ
            </h2>
            <p className="text-gray-500 text-lg">4 ระดับ ครอบคลุมทุกขนาดธุรกิจ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  plan.popular
                    ? 'ring-2 ring-[#0f3460] shadow-2xl shadow-[#0f3460]/20'
                    : 'shadow-lg'
                } bg-white`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 bg-[#0f3460] text-white text-xs font-black text-center py-2 nav-font tracking-wider">
                    ⭐ แนะนำสำหรับธุรกิจที่เติบโตเร็ว
                  </div>
                )}

                {/* Card Header */}
                <div
                  className={`px-6 pt-${plan.popular ? '10' : '6'} pb-6`}
                  style={{ background: `linear-gradient(135deg, ${plan.color}15, ${plan.color}05)` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white"
                    style={{ backgroundColor: plan.color }}
                  >
                    {plan.icon}
                  </div>
                  <div className="text-xs font-bold tracking-widest nav-font mb-1" style={{ color: plan.color }}>
                    {plan.name}
                  </div>
                  <h3 className="text-lg font-black text-[#0f3460] nav-font leading-tight mb-1">
                    {plan.nameTh}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{plan.subtitle}</p>
                </div>

                {/* Price */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-4xl font-black text-[#0f3460] nav-font">
                      {formatPrice(plan.price)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{plan.priceNote}</p>

                  {/* Hosting Info */}
                  <div className="mt-4 bg-gray-50 rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <Server className="w-3.5 h-3.5 flex-shrink-0" style={{ color: plan.color }} />
                      {plan.hostingPlan}
                    </div>
                    <p className="text-[10px] text-gray-400 pl-5">{plan.hostingSpec}</p>
                    <p className="text-[11px] font-semibold pl-5" style={{ color: plan.color }}>
                      {plan.hostingPrice}
                    </p>
                    <p className="text-[10px] text-gray-400 pl-5">{plan.hostingRenewal}</p>
                    {plan.domain && (
                      <div className="flex items-center gap-1.5 pl-5 pt-1">
                        <Globe className="w-3 h-3 text-green-500" />
                        <span className="text-[11px] text-green-600 font-bold">ฟรีโดเมนปีแรก</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 py-5 flex-1">
                  <ul className="space-y-2.5">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        {f.included ? (
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                        ) : (
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-300" />
                        )}
                        <span
                          className={`text-xs leading-relaxed ${
                            f.included ? 'text-gray-700' : 'text-gray-300'
                          } ${f.text.startsWith('ทุกอย่าง') ? 'font-bold' : ''}`}
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 mt-auto">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className="block w-full text-center py-3.5 rounded-2xl font-black text-sm nav-font transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                      backgroundColor: plan.popular ? plan.color : 'transparent',
                      color: plan.popular ? 'white' : plan.color,
                      border: `2px solid ${plan.color}`,
                    }}
                  >
                    {plan.cta} →
                  </button>
                </div>
              </div>
            ))}
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
        <div className="max-w-5xl mx-auto">
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
                  { label: 'หน้าเว็บ', values: ['1 หน้า', '5–8 หน้า', '10+ หน้า', 'ไม่จำกัด'] },
                  { label: 'Admin Dashboard', values: [false, true, true, true] },
                  { label: 'AI Chatbot', values: [true, true, true, true] },
                  { label: 'Blog + AI ช่วยเขียน', values: [false, true, true, true] },
                  { label: 'Portfolio & Gallery', values: [false, true, true, true] },
                  { label: 'Contact Form + Leads DB', values: [false, true, true, true] },
                  { label: 'Line OA Integration', values: [false, false, true, true] },
                  { label: 'AI สร้างสื่ออัตโนมัติ', values: [false, false, true, true] },
                  { label: 'Event Management', values: [false, false, true, true] },
                  { label: 'Media Library', values: [false, false, true, true] },
                  { label: 'ระบบสมาชิก', values: [false, false, false, true] },
                  { label: 'ชำระเงินออนไลน์', values: [false, false, false, true] },
                  { label: 'Online Learning + Quiz', values: [false, false, false, true] },
                  { label: 'AI Personal Advisor', values: [false, false, false, true] },
                  { label: 'Hosting (Hostinger VPS)', values: ['KVM 1', 'KVM 2', 'KVM 2', 'KVM 2–4'] },
                  { label: 'ฟรีโดเมนปีแรก', values: [true, true, true, true] },
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
        </div>
      </section>

      {/* ── Hosting Specs Section ────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#0f3460]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white nav-font mb-2">
              Hostinger VPS — ที่คุณเป็นเจ้าของ 100%
            </h2>
            <p className="text-white/60">ราคา VPS ชำระตรงกับ Hostinger · ครูเด่น Setup &amp; Config ให้ฟรี</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { plan: 'KVM 1', promo: '฿249/เดือน', renew: '฿399 ต่ออายุ', spec: '1 vCPU · 4GB RAM · 50GB NVMe · 4TB BW', tag: 'P1', color: '#4f86c6' },
              { plan: 'KVM 2', promo: '฿329/เดือน', renew: '฿489 ต่ออายุ', spec: '2 vCPU · 8GB RAM · 100GB NVMe · 8TB BW', tag: 'P2, P3', color: '#c5a059' },
              { plan: 'KVM 4', promo: '฿439/เดือน', renew: '฿909 ต่ออายุ', spec: '4 vCPU · 16GB RAM · 200GB NVMe · 16TB BW', tag: 'P4 (ใหญ่)', color: '#7c3aed' },
              { plan: 'KVM 8', promo: '฿879/เดือน', renew: '฿1,629 ต่ออายุ', spec: '8 vCPU · 32GB RAM · 400GB NVMe · 32TB BW', tag: 'Enterprise', color: '#10b981' },
            ].map((h) => (
              <div key={h.plan} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <div className="text-xs font-bold tracking-wider nav-font mb-1" style={{ color: h.color }}>
                  {h.tag}
                </div>
                <div className="text-white font-black text-lg nav-font mb-1">{h.plan}</div>
                <div className="text-[#c5a059] font-bold text-xl nav-font mb-0.5">{h.promo}</div>
                <div className="text-white/40 text-xs mb-3">{h.renew} · (12 เดือน)</div>
                <p className="text-white/60 text-xs leading-relaxed">{h.spec}</p>
                <div className="mt-3 flex items-center gap-1.5 text-green-400 text-xs font-bold">
                  <Globe className="w-3 h-3" />
                  ฟรีโดเมนปีแรก
                </div>
              </div>
            ))}
          </div>
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
                title: 'สร้างจริง ใช้จริง',
                desc: 'ผลงานจริงที่ใช้งาน Live: capvisionpartner.com · unicorngloballink.com · unicornsmartai.cloud · mtc.denmasterfa.com',
              },
              {
                icon: <Bot className="w-7 h-7" />,
                title: 'AI ครบวงจร',
                desc: 'ใช้ Google Gemini + Claude AI สร้างระบบ AI ที่เข้าใจบริบทธุรกิจไทย ตอบแทน 24 ชม. สร้างสื่ออัตโนมัติ',
              },
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: 'คุณเป็นเจ้าของ 100%',
                desc: 'Deploy บน VPS ของคุณเอง โค้ดเป็นของคุณ ไม่ lock กับเรา มีปัญหาหลังส่งงาน ยังดูแลต่อได้',
              },
              {
                icon: <Star className="w-7 h-7" />,
                title: '15+ ปี Corporate Training',
                desc: 'เข้าใจธุรกิจไทย ออกแบบ UX ให้เหมาะกับกลุ่มเป้าหมายจริง ไม่ใช่แค่หน้าตาสวย',
              },
              {
                icon: <Database className="w-7 h-7" />,
                title: 'Full-stack ครบวงจร',
                desc: 'React · Next.js · Supabase · TypeScript · Tailwind CSS ทุก Layer ทำเองหมด ไม่มีช่องโหว่ส่งต่อ',
              },
              {
                icon: <LineChart className="w-7 h-7" />,
                title: 'วัดผลได้ SEO ได้',
                desc: 'ทุกเว็บมี SEO ครบ Meta · OG · Schema JSON-LD · Sitemap ให้ Google จัดอันดับได้จริง',
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
            {FAQS.map((faq, i) => (
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

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl md:text-4xl font-black text-white nav-font mb-4">
            พร้อมมีเว็บแอพ AI เป็นของตัวเองแล้วหรือยัง?
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            ปรึกษาฟรี ไม่มีข้อผูกมัด <br />
            <span className="text-[#c5a059] font-bold">ครูเด่น มาสเตอร์ฟา</span> พร้อมช่วยออกแบบแนวทางที่เหมาะกับธุรกิจของคุณ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-amber-400 text-white font-black text-base py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 nav-font"
            >
              <MessageCircle className="w-5 h-5" />
              ปรึกษาผ่าน Line OA ฟรี
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-base py-4 px-8 rounded-2xl transition-all duration-200 nav-font"
            >
              <PhoneCall className="w-5 h-5" />
              {CONTACT_INFO.phone}
            </a>
          </div>

          <p className="text-white/40 text-xs mt-8">
            Line OA: {CONTACT_INFO.line} · Email: {CONTACT_INFO.email}
          </p>
        </div>
      </section>
    </>
  );
};

export default WebAppPricing;
