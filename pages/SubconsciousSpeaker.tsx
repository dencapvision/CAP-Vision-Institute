import React, { useState } from 'react';
import {
  Mic2, Brain, Users, Headphones, Star,
  CheckCircle2, ChevronDown, MessageCircle,
  PhoneCall, Zap, Clock, Shield, Award,
  TrendingUp, Volume2, Eye, ArrowRight, Play,
  Sparkles, Heart, Presentation, Target, Calendar, Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants/brand';
import BookingWizard from '../components/SubconsciousSpeaker/BookingWizard';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  { icon: <Volume2 className="w-6 h-6" />, title: 'กลัวการพูดต่อหน้าผู้คน', desc: 'ใจสั่น ประหม่า ไม่กล้าสบตา หรือตื่นเต้นจนลืมเนื้อหาที่เตรียมมา' },
  { icon: <Brain className="w-6 h-6" />, title: 'เสียงในหัวบอกว่า "เก่งไม่พอ"', desc: 'ติดกับดักความไม่มั่นใจ มีความกลัวที่ซ่อนอยู่ในจิตใต้สำนึกปลอมประมวล' },
  { icon: <Users className="w-6 h-6" />, title: 'พูดแล้วคนฟังไม่เชื่อถือ', desc: 'ขาดความน่าเชื่อถือ สื่อสารแล้วนิ่งเงียบ ไม่มีคนมีส่วนร่วมหรือทำตาม' },
  { icon: <Headphones className="w-6 h-6" />, title: 'อยากเป็นวิทยากรแต่เริ่มไม่ถูก', desc: 'มีความรู้ มีประสบการณ์ แต่ไม่รู้จะถ่ายทอดอย่างไรให้เป็นมืออาชีพ' },
];

const MODULES = [
  {
    no: '01',
    icon: <Shield className="w-7 h-7" />,
    title: 'Break Free & Reset',
    desc: 'ปลดล็อกข้อจำกัดและควากลัวที่ซ่อนอยู่ในจิตใต้สำนึก เพื่อสร้างฐานความมั่นใจใหม่จากภายใน',
    color: '#0f3460',
  },
  {
    no: '02',
    icon: <Sparkles className="w-7 h-7" />,
    title: 'Authentic Soul Voice',
    desc: 'ค้นพบ "เสียงที่แท้จริง" และเสน่ห์เฉพาะตัวของคุณ ไม่ใช่การเลียนแบบใคร แต่เป็นคุณที่ทรงพลังที่สุด',
    color: '#c5a059',
  },
  {
    no: '03',
    icon: <Target className="w-7 h-7" />,
    title: 'Subconscious Script Design',
    desc: 'ศาสตร์การออกแบบบทพูดเพื่อโปรแกรมจิต การจัดลำดับความคิดที่ส่งตรงถึงใจผู้ฟัง',
    color: '#7c3aed',
  },
  {
    no: '04',
    icon: <Heart className="w-7 h-7" />,
    title: 'Deep Heart Connection',
    desc: 'เทคนิคการสื่อสารที่เข้าถึงอารมณ์ความรู้สึก สร้างความเชื่อมั่นและความเป็นหนึ่งเดียวกับผู้ฟัง',
    color: '#059669',
  },
  {
    no: '05',
    icon: <Presentation className="w-7 h-7" />,
    title: 'The Professional Stage',
    desc: 'ฝึกฝนบนเวทีจริง รับ Feedback จากมาสเตอร์ฟาและดร.โส เพื่อก้าวสู่การเป็นมืออาชีพ',
    color: '#dc2626',
  },
];

const INSTRUCTORS = [
  {
    name: 'ดร.โส (Dr. So)',
    title: 'ผู้เชี่ยวชาญด้านพลังจิตใต้สำนึก',
    image: 'https://assets.capvisionpartner.com/media/dr.so_healing/dr.so2.jpg',
    bio: 'พุทธศาสตรดุษฎีบัณฑิต (สันติศึกษา) ผู้เชี่ยวชาญการใช้เครื่องมือบำบัดเพื่อปลดล็อกศักยภาพภายในและโปรแกรมจิตใต้สำนึก',
    role: 'ปลดล็อกภายใน'
  },
  {
    name: 'ครูเด่น มาสเตอร์ฟา',
    title: 'Master Facilitator & Digital Expert',
    image: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/denmasterfa.jpg',
    bio: 'ผู้นำด้านกระบวนการเรียนรู้ Transformative Learning ประสบการณ์กว่า 18 ปี ในการพัฒนาวิทยากรและผู้นำองค์กร',
    role: 'จุดประกายภายนอก'
  }
];

const RESULTS = [
  { icon: <Zap className="w-6 h-6" />, title: 'ความมั่นใจเกินร้อย', desc: 'กล้าพูด กล้าแชร์ และกล้าแสดงออกอย่างเป็นธรรมชาติในสไตล์ของคุณเอง' },
  { icon: <Star className="w-6 h-6" />, title: 'Charisma & Presence', desc: 'สร้างออร่าและเสน่ห์บนเวทีที่ทำให้ผู้ฟังสะกดสายตาและจดจ่ออยู่กับคุณ' },
  { icon: <Target className="w-6 h-6" />, title: 'หลักสูตรส่วนตัว', desc: 'ได้โครงสร้างการสอนหรือการพูดที่เป็นเอกลักษณ์เฉพาะตัว นำไปทำเงินหรือสร้างชื่อได้ทันที' },
  { icon: <Award className="w-6 h-6" />, title: 'Certificate of Excellence', desc: 'รับใบประกาศนียบัตรรับรองจาก CAP Vision Institute เพื่อยืนยันมาตรฐานการเป็นวิทยากร' },
];

const TESTIMONIALS = [
  {
    name: 'คุณนพดล',
    role: 'Entrepreneur',
    img: 'https://assets.capvisionpartner.com/media/Kraiput%20Gallery/Kraiput%20Intarayotha.jpg',
    quote: 'ไม่เคยคิดว่าตัวเองจะพูดได้ดีขนาดนี้ การเรียนกับครูเด่นและดร.โส ช่วยให้ผมเห็นจุดดำที่ซ่อนอยู่ในใจและลบมันออกไปได้จริง ๆ ตอนนี้ผมกล้าขยายธุรกิจด้วยการพูดแล้วครับ',
  },
  {
    name: 'คุณเมลิศา',
    role: 'HR Manager',
    img: 'https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class1.jpg',
    quote: 'เป็นหลักสูตรที่ไม่ได้มีแต่เทคนิค แต่มี "หัวใจ" อยู่ในนั้น ดร.โสช่วยพาสัมผัสความรู้สึกข้างใน ส่วนครูเด่นช่วยพาลงมือทำ เป็นส่วนผสมที่ลงตัวมากค่ะ',
  },
];

const PACKAGES = [
  {
    id: 'early_bird',
    tag: 'สิทธิ์พิเศษเฉพาะคุณ',
    name: 'Early Bird Rate 🕊️',
    subtitle: 'สมัครก่อนใคร รับราคาพิเศษที่สุด',
    price: 6500,
    originalPrice: 12500,
    deadline: '5 พฤษภาคม 2569',
    unit: '/ ท่าน',
    addOn: 'รวมอาหารกลางวัน & Coffee Break',
    color: '#c5a059',
    features: [
      'อบรมเข้มข้น 2 วันเต็ม',
      'เรียนรู้กับวิทยากร 2 ท่านแบบใกล้ชิด',
      'เอกสารประกอบการเรียนครบถ้วน',
      'Workbook ส่วนตัวสำหรับโปรแกรมจิต',
      'ใบประกาศนียบัตรรับรอง',
      'เข้าถึงกลุ่มลับปรึกษาต่อเนื่อง',
    ],
    cta: 'ลงทะเบียน Early Bird',
    highlight: true,
  },
];

const FAQS = [
  {
    q: 'ไม่มีพื้นฐานการพูดเลยเรียนได้ไหม?',
    a: 'เรียนได้แน่นอนครับ หลักสูตรนี้ออกแบบมาเพื่อ "ก้าวแรก" โดยเฉพาะ เราเน้นการปรับจากภายใน (จิตใต้สำนึก) ก่อน แล้วค่อยเสริมเทคนิคภายนอก ทำให้ทุกคนสามารถเริ่มต้นได้อย่างมั่นคง',
  },
  {
    q: 'ทำไมต้องสอนโดยวิทยากร 2 ท่าน?',
    a: 'เพราะการสื่อสารที่มีประสิทธิภาพต้องมีทั้ง "ศาสตร์แห่งความสงบภายใน" (โดย ดร.โส) และ "การแสดงออกอย่างทรงพลังภายนอก" (โดย ครูเด่น) การร่วมมือกันทำให้ผู้เรียนได้รับการพัฒนาแบบ 360 องศาครับ',
  },
  {
    q: 'จัดที่ไหนและวันไหน?',
    a: 'จัดวันที่ 20-21 พฤษภาคม 2569 ณ กรุงเทพฯ (สถานที่แจ้งให้ทราบภายหลังการสมัคร) เป็นการเรียนแบบ On-site พบตัวจริงเพื่อการฝึกฝนที่มีประสิทธิภาพสูงสุด',
  },
  {
    q: 'ราคานี้รวมอะไรบ้าง?',
    a: 'รวมค่าอบรม 2 วันเต็ม, อาหารกลางวันพรีเมียม, Coffee Break 2 มื้อต่อวัน, Workbook ส่วนตัว และไฟล์เสียงโปรแกรมจิตสำหรับฝึกฝนเองที่บ้านครับ',
  },
];

const GALLERY = [
  "https://assets.capvisionpartner.com/media/dr.so_healing/dr.sio_class9.jpg",
  "https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class1.jpg",
  "https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class2.jpg",
  "https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class4.jpg",
  "https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class6.jpg",
  "https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class7.jpg",
];

// ─── Component ────────────────────────────────────────────────────────────────
const SubconsciousSpeaker: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="ก้าวแรกสู่ วิทยากรจิตใต้สำนึก — ปลดล็อกพลังการพูดจากภายใน | CAP Vision"
        description="หลักสูตร 2 วันเต็มที่จะเปลี่ยนคุณให้เป็นวิทยากรที่ทรงพลัง โดย ดร.โส และครูเด่น มาสเตอร์ฟา ปลดล็อกจิตใต้สำนึกและสร้างเสน่ห์การพูดที่เป็นเอกลักษณ์"
        keywords={['วิทยากรจิตใต้สำนึก', 'Subconscious Speaker', 'ครูเด่น', 'ดร.โส', 'อบรมการพูด', 'Public Speaking Thailand']}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f1e] pt-32 pb-24">
        {/* BG layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#c5a059]/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] text-sm font-bold px-5 py-2.5 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4" />
                Workshop 2 วันที่เปลี่ยนชีวิตคนมาแล้วนับร้อย
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 nav-font tracking-tight"
              >
                ก้าวแรกสู่ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-amber-200">
                  วิทยากรจิตใต้สำนึก
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-3xl text-white/80 font-medium mb-12 nav-font max-w-4xl mx-auto"
              >
                “เพราะการสื่อสารที่ทรงพลังที่สุด...ไม่ได้เริ่มจากเทคนิค แต่เริ่มจากจิตใต้สำนึกที่มีความสุข”
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <button
                  onClick={() => setShowBooking(true)}
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#c5a059] hover:bg-amber-400 text-white font-black py-5 px-10 rounded-2xl text-xl transition-all shadow-xl shadow-[#c5a059]/20 hover:shadow-[#c5a059]/40 nav-font active:scale-95"
                >
                  ลงทะเบียน Early Bird
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#modules"
                  className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-5 px-10 rounded-2xl text-xl transition-all nav-font backdrop-blur-md"
                >
                  สิ่งที่ท่านจะได้เรียน
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 text-white/40 flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c5a059]" />
                  20-21 พฤษภาคม 2569
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#c5a059]" />
                  กรุงเทพมหานคร
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#c5a059]" />
                  จำกัดเพียง 20 ที่นั่ง
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-4">จุดเริ่มต้นของการเปลี่ยนแปลง</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f3460] nav-font leading-tight mb-8">
                ปลดล็อกกุญแจที่ขังคุณไว้ <br />
                <span className="text-[#c5a059]">ด้วยความกลัวการสื่อสาร</span>
              </h2>
              <div className="space-y-6">
                {PAIN_POINTS.map((p, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 text-[#0f3460] flex items-center justify-center shrink-0 group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300">
                      {p.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-[#0f3460] text-lg mb-1">{p.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#c5a059]/10 rounded-[3rem] blur-3xl" />
              <img 
                src="https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class3.jpg" 
                alt="บรรยากาศการเรียน" 
                className="relative rounded-[2.5rem] shadow-2xl border-8 border-white"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl max-w-xs border border-gray-100">
                <Quote className="w-8 h-8 text-[#c5a059] mb-4" />
                <p className="text-[#0f3460] font-bold italic leading-relaxed">
                  "เพียงปลดล็อกนิดเดียว...ความสามารถที่ซ่อนอยู่จะทะลักออกมาอย่างที่คุณไม่เคยคาดคิด"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Content (Modules) */}
      <section id="modules" className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3460] nav-font mb-6">หลักสูตร 2 วันแห่งการ Transform</h2>
            <p className="text-xl text-gray-500">ผสานพลังจิตใต้สำนึก เข้ากับศิลปะการพูดระดับมืออาชีพ</p>
          </div>

          <div className="space-y-4">
            {MODULES.map((m, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shrink-0 text-3xl font-black nav-font rotate-3 group-hover:rotate-0 transition-transform duration-500"
                  style={{ backgroundColor: m.color }}
                >
                  {m.no}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                    <span style={{ color: m.color }}>{m.icon}</span>
                    <h3 className="font-black text-[#0f3460] nav-font text-2xl">{m.title}</h3>
                  </div>
                  <p className="text-gray-500 text-lg leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-24 px-4 bg-[#0a0f1e] text-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black nav-font mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-amber-200">
              เรียนรู้กับวิทยากรระดับมาสเตอร์
            </span>
          </h2>
          <p className="text-white/40 text-lg uppercase tracking-widest font-bold">The Perfect Duo: Mindset & Technique</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {INSTRUCTORS.map((ins, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all duration-500 text-center">
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-[#c5a059]/20 rounded-full blur-2xl" />
                <img src={ins.image} alt={ins.name} className="relative w-full h-full object-cover rounded-full border-4 border-white/20" />
                <div className="absolute -bottom-2 right-0 bg-[#c5a059] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
                  {ins.role}
                </div>
              </div>
              <h3 className="text-3xl font-black nav-font mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-amber-200">
                  {ins.name}
                </span>
              </h3>
              <p className="text-[#c5a059] font-bold mb-6">{ins.title}</p>
              <p className="text-white/60 leading-relaxed mb-8">{ins.bio}</p>
              <Link 
                to={`/speakers/${i === 0 ? 'dr-so' : 'den-master-fa'}`}
                className="text-white/40 hover:text-[#c5a059] text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                ดูประวัติเต็ม <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0f3460] nav-font mb-4">ผลลัพธ์ที่คุณจะได้รับ</h2>
            <p className="text-gray-500">ไม่ใช่แค่ความรู้วัดผลได้ด้วยกระดาษ แต่คือพฤติกรรมที่เปลี่ยนไปตลอดกาล</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS.map((r, i) => (
              <div key={i} className="bg-[#f8fafc] p-8 rounded-[2.5rem] border border-gray-100 hover:scale-[1.03] transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3460] text-white flex items-center justify-center mb-6 shadow-lg">
                  {r.icon}
                </div>
                <h3 className="font-black text-[#0f3460] text-xl mb-3 nav-font leading-tight">{r.title}</h3>
                <p className="text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-black uppercase tracking-widest text-sm mb-4">Experience the Transformation</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f3460] nav-font mb-6">บรรยากาศการจัดกิจกรรมรุ่นที่ผ่านมา</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">ร่วมสัมผัสพลังแห่งการเปลี่ยนแปลง และรอยยิ้มจากผู้เข้าอบรมจริงที่ผ่านมา</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-lg"
              >
                <img 
                  src={img} 
                  alt={`บรรยากาศรุ่นที่ผ่านมา ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3460]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white">
                    <p className="font-black nav-font text-lg">Subconscious Speaker</p>
                    <p className="text-white/60 text-sm">Class Atmosphere</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="py-24 px-4 bg-[#0f3460] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c5a059] font-black uppercase tracking-widest text-sm mb-4">การลงทุนที่คุ้มค่าสูงสุดในชีวิต</p>
            <h2 className="text-4xl md:text-5xl font-black nav-font mb-4">บัตรเข้าร่วมการอบรม</h2>
            <p className="text-white/60">คลาสพิเศษจำกัดเพียง 20 ที่นั่ง เพื่อดูแลอย่างทั่วถึงที่สุด</p>
          </div>

          <div className="max-w-md mx-auto">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white/5 border rounded-[3rem] p-12 transition-all duration-500 hover:-translate-y-2 ${
                  pkg.highlight ? 'border-[#c5a059] bg-white/10 shadow-2xl shadow-[#c5a059]/10' : 'border-white/10'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#c5a059] text-white px-8 py-2 rounded-full font-black text-xs uppercase tracking-widest whitespace-nowrap shadow-xl">
                    🔥 HOT PROMOTION — จำกัดเวลา
                  </div>
                )}
                
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-black nav-font mb-2">{pkg.name}</h3>
                  <p className="text-white/40 mb-2">{pkg.subtitle}</p>
                  
                  {pkg.deadline && (
                    <div className="bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full text-xs font-black inline-block mb-8 border border-red-500/20">
                      สิทธิ์นี้ใช้ได้ถึง {pkg.deadline} เท่านั้น
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center gap-1">
                    {pkg.originalPrice && (
                      <span className="text-white/30 text-xl font-bold line-through mb-1">
                        ปกติ ฿{pkg.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <div className="flex items-end gap-1">
                      <span className="text-6xl font-black text-[#c5a059] leading-none tracking-tighter">
                        ฿{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-white/40 font-bold mb-2">{pkg.unit}</span>
                    </div>
                  </div>
                  {pkg.addOn && <p className="text-green-400 font-bold mt-4">🎁 {pkg.addOn}</p>}
                </div>

                <div className="space-y-4 mb-12">
                  {pkg.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-white/80 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setShowBooking(true)}
                    className={`w-full py-6 rounded-[2rem] font-black text-xl nav-transition active:scale-95 ${
                      pkg.highlight 
                        ? 'bg-[#c5a059] text-white hover:bg-amber-400 shadow-xl shadow-[#c5a059]/20' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {pkg.cta}
                  </button>
                  <p className="text-center text-xs text-white/40 font-medium">
                    * หลังจากนั้นปรับเป็นราคาปกติ
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-white/40 text-sm font-medium">
            * สมาชิก CAP Vision Partner รับส่วนลดเพิ่มเติม 10% เมื่อสมัคร <br />
            สอบถามข้อมูลเพิ่มเติมที่ Line ID: @958wlshf
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-[#0f3460] nav-font text-center mb-12">คำถามที่พบบ่อย</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-gray-100/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-black text-[#0f3460] text-lg pr-6">{faq.q}</span>
                  <ChevronDown className={`w-6 h-6 text-[#c5a059] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 pt-2 text-gray-600 text-lg leading-relaxed bg-white border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 bg-[#0a0f1e] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://assets.capvisionpartner.com/media/dr.so_healing/dr.so_class2.jpg" alt="BG" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white nav-font mb-8">
            อย่าปล่อยให้ "ความกลัว" <br />
            ขัดขวางความสำเร็จที่ควรเป็นของคุณ
          </h2>
          <p className="text-white/60 text-2xl mb-12 font-medium">
            เราจะเดินทางไปด้วยกัน...เพื่อสร้างวิทยากรที่มีหัวใจที่ยิ่งใหญ่ที่สุด
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setShowBooking(true)}
              className="px-12 py-6 bg-[#c5a059] hover:bg-amber-400 text-white font-black rounded-[2rem] text-2xl transition-all shadow-2xl active:scale-95"
            >
              จองที่นั่งของท่านเลย
            </button>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="px-12 py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black rounded-[2rem] text-2xl transition-all backdrop-blur-md"
            >
              ปรึกษาทีมงานทาง Line
            </a>
          </div>
        </div>
      </section>

      {/* Registration Wizard Modal */}
      <BookingWizard 
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </div>
  );
};

export default SubconsciousSpeaker;
