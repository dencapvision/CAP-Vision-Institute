import React, { useState } from 'react';
import {
  Mic2, Brain, Users, Headphones, Star,
  CheckCircle2, ChevronDown, MessageCircle,
  PhoneCall, Zap, Clock, Shield, Award,
  TrendingUp, Volume2, Eye, ArrowRight, Play
} from 'lucide-react';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../constants/brand';
import SpeechfulnessRegistration from '../components/SpeechfulnessRegistration';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  { icon: <Volume2 className="w-6 h-6" />, title: 'พูดแล้วคนฟัง "ว้าว"', desc: 'สร้างความประทับใจที่คงอยู่ในใจผู้ฟัง ตั้งแต่ประโยคแรก' },
  { icon: <Brain className="w-6 h-6" />, title: 'สื่อสารชัดเจน เข้าใจง่าย', desc: 'ถ่ายทอดแนวคิดซับซ้อนให้เข้าใจได้ทันที ไม่สับสน' },
  { icon: <Users className="w-6 h-6" />, title: 'เชื่อมโยงทีม นักลงทุน ลูกค้า', desc: 'ใช้พลังเรื่องเล่าสร้างความผูกพันและความไว้วางใจ' },
  { icon: <Headphones className="w-6 h-6" />, title: 'ฟังอย่างลึกซึ้ง สร้างอิทธิพล', desc: 'พัฒนาทักษะการรับฟังที่สร้างความเชื่อมั่นและพลังอิทธิพล' },
];

const MODULES = [
  {
    no: '01',
    icon: <Mic2 className="w-7 h-7" />,
    title: 'Unlock the CEO Voice',
    desc: 'ค้นพบและพัฒนาเสียงและพลังการพูดที่เป็นเอกลักษณ์ของคุณ เสียงของคุณคือแบรนด์',
    color: '#c5a059',
  },
  {
    no: '02',
    icon: <Star className="w-7 h-7" />,
    title: 'Storytelling for Impact',
    desc: 'เรียนรู้เทคนิคการเล่าเรื่องที่สร้างอารมณ์ ความจดจำ และแรงบันดาลใจในทุกการประชุม',
    color: '#0f3460',
  },
  {
    no: '03',
    icon: <TrendingUp className="w-7 h-7" />,
    title: 'Communication Gym',
    desc: 'ฝึกฝน Pitch และพลังของภาษากายอย่างเข้มข้น เพื่อความมั่นใจในเวทีจริง',
    color: '#7c3aed',
  },
  {
    no: '04',
    icon: <Headphones className="w-7 h-7" />,
    title: 'Deep Listening',
    desc: 'พัฒนาการฟังเชิงลึกที่สร้างความเชื่อมั่น ความไว้วางใจ และอิทธิพลที่แท้จริง',
    color: '#059669',
  },
  {
    no: '05',
    icon: <Eye className="w-7 h-7" />,
    title: 'CEO Speech Showcase',
    desc: 'นำเสนอจริงต่อหน้าผู้เชี่ยวชาญและรับ Feedback ทันที เพื่อยกระดับครั้งสุดท้าย',
    color: '#dc2626',
  },
];

const RESULTS = [
  { icon: <Shield className="w-6 h-6" />, title: 'ความมั่นใจที่แท้จริง', desc: 'พูดในทุกสถานการณ์ด้วยความมั่นใจ ทั้งบนเวที หน้ากล้อง และในห้องประชุม' },
  { icon: <Award className="w-6 h-6" />, title: 'เครื่องมือสื่อสารระดับโลก', desc: 'ทักษะและเทคนิคที่ผู้บริหาร Fortune 500 ใช้ในการสื่อสารกับทีมและสาธารณะ' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'ระบบ Growth Tracking', desc: 'Feedback และ Growth Tracking ที่ชัดเจนและต่อเนื่อง พัฒนาได้จริงทุกสัปดาห์' },
  { icon: <Mic2 className="w-6 h-6" />, title: 'CEO Speech Script พร้อมใช้', desc: 'สคริปต์การพูดส่วนตัวที่ปรับแต่งเฉพาะสำหรับคุณ นำไปใช้ได้ทันที' },
];

const TESTIMONIALS = [
  {
    name: 'เสี่ยโจ้',
    role: 'CEO บริษัท เอ็น เอช เค แบริ่ง จำกัด',
    page: 'เจ้าของเพจ "ชีวิตเหี้ยๆก็เป็นเสี่ยได้"',
    age: null,
    img: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/P.Joe%20(2).jpg',
    quote: 'เมื่อก่อนผมไม่อยากพูดหน้ากล้อง หรือต่อหน้าคนเยอะๆเลย เพราะพูดไม่ออก ไม่รู้จะพูดอะไร จะเริ่มแบบไหน เลยไม่พูดดีกว่า แต่พอมาเรียนกับครูเด่น ช่วยปลดล็อคความคิดของผมนิดเดียว ตอนนี้ผมพูดได้ทุกอย่าง ทุกเรื่อง ทุกที่ ทุกเวลาแบบสบายๆเลยครับ',
  },
  {
    name: 'ผอ.แป๊ะ Money Hero',
    role: 'เจ้าของเพจ SMEs Money Clinic',
    page: 'ที่ปรึกษาการเงินกว่า 25 ปี',
    age: null,
    img: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/P.Pae%20(2).jpg',
    quote: 'ปกติผมพูดอยู่แล้ว เพราะอาชีพผมต้องให้คำปรึกษาเรื่องการหาแหล่งเงินทุน ผมมาเรียนพูดกับครูเด่น ก็เพื่ออยากเอาประสบการณ์กว่า 25 ปี ออกมาแบ่งปัน แต่พอจะพูดก็อาย ไม่กล้าสู้กล้อง เจอกัน 2 วัน ตอนนี้พูดหน้ากล้อง หน้าเวทีได้อย่างสบายๆเลยครับ',
  },
  {
    name: 'คุณโต๋',
    role: 'ที่ปรึกษาทางการเงิน & เจ้าของกิจการ',
    page: 'ร้านอาหาร & ร้านคาร์แคร์',
    age: 32,
    img: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/P.Tor.jpg',
    quote: 'หลังจากที่ได้คุยกับครูเด่น นี่คือสิ่งที่เรียกว่าการเปิดหูเปิดตา ได้มากกว่าแค่มุมมอง แต่คือการต่อยอด การคิดวิเคราะห์ที่รอบคอบ มันเหมือนการมองภาพที่ไม่ชัด แต่เราก็ไม่รู้ว่ามันไม่ชัด การมาพบกับครูเด่นทำให้รู้ว่าภาพชัดขึ้นกว่าเดิมมากๆ',
  },
  {
    name: 'ดร.ก้อย',
    role: 'อาจารย์มหาวิทยาลัย / HRM Expert & Lecturer',
    page: null,
    age: 47,
    img: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/dr.goi.jpg',
    quote: 'ขอบคุณครูเด่นมากเลยนะคะ ที่มาแบ่งปันทั้งความรู้และแนวทาง เป็น session สั้นๆ แต่มีคุณค่ากับ Mind & Soul ของพี่ก้อย และได้ guideline ในการใช้ชีวิตที่ดีมากเลยค่ะ',
  },
  {
    name: 'คุณอุ้ม',
    role: 'นักพัฒนาอสังหาริมทรัพย์ / นักลงทุน',
    page: null,
    age: 44,
    img: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/K.AUM.png',
    quote: 'คุยครูทุกครั้ง จิตวิญญาณมันตื่นรับพลังดีดี เห็นภาพตัวเองชัดขึ้น และเห็นการเดินทางของชีวิตตัวเองมากขึ้นค่ะ ครูผู้ที่ร้อยเรื่องราว พลัง ความรู้สึก ผ่านศาสตร์การบำบัด ทำให้สิ่งที่ดูแรง กลับเป็นพลังงานให้คิดใหม่ทำใหม่',
  },
  {
    name: 'คุณป๋วย เพ่ย เพ่ย',
    role: 'นักสะสม Art Toy & เจ้าของผลิตภัณฑ์ Scoop B Doh',
    page: null,
    age: 49,
    img: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/P.Pouy.jpg',
    quote: 'สิ่งที่ชอบเป็นพิเศษคือการที่ครูชี้ให้เห็น "จุดเด่นเฉพาะตัว" ทั้งแนวทางการพูด มุมกล้อง การใช้น้ำเสียง ครูเน้นเสมอว่า "เสียงของเราเองดีที่สุด" วิธีพูดในแบบของเรา คือเสน่ห์ที่แท้จริง',
  },
];

const PACKAGES = [
  {
    id: 'consult-zoom',
    tag: 'เริ่มต้น',
    name: 'ปรึกษาแบบ Zoom / โทร',
    subtitle: '1:1 กับครูเด่นโดยตรง',
    price: 1999,
    unit: '/ 1 ชั่วโมง',
    addOn: 'ชั่วโมงถัดไป ฿999',
    color: '#4f86c6',
    features: [
      'Session 1 ชั่วโมงเต็ม (Zoom / โทร)',
      'วิเคราะห์สไตล์การสื่อสารของคุณ',
      'แนวทางพัฒนาเฉพาะบุคคล',
      'สรุปหลัง Session เป็นลายลักษณ์อักษร',
    ],
    cta: 'จองคิวปรึกษา',
    highlight: false,
  },
  {
    id: 'consult-inperson',
    tag: 'แนะนำ',
    name: 'พบตัวนอกสถานที่',
    subtitle: 'เจอหน้า เข้มข้น ลึกกว่า',
    price: 5500,
    unit: '/ ครั้ง',
    addOn: null,
    color: '#c5a059',
    features: [
      'พบตัวที่สถานที่ของคุณ (กทม. & ปริมณฑล)',
      'Session เต็มรูปแบบ 2–3 ชั่วโมง',
      'ฝึกปฏิบัติจริงทันที',
      'CEO Speech Draft เบื้องต้น',
      'ติดตามผลผ่าน Line หลัง Session',
    ],
    cta: 'จองนัดพบตัว',
    highlight: false,
  },
  {
    id: 'package-3m',
    tag: 'Best Value',
    name: 'CEO Speechfulness 3 เดือน',
    subtitle: 'ครบวงจร Consult + Workshop + Coaching',
    price: 39000,
    unit: '/ 3 เดือน',
    addOn: '+ Bonus Coaching 1 ครั้ง (มูลค่า ฿5,000) ฟรี!',
    color: '#0f3460',
    features: [
      'Workshop เข้มข้น 1 วัน (6 ชั่วโมง) ครบ 5 โมดูล',
      'Online Coaching 1 ครั้ง/สัปดาห์ × 3 เดือน',
      'In-person Coaching 2 ครั้ง/เดือน × 3 เดือน',
      'CEO Speech Script ส่วนตัว',
      'Action Plan สำหรับพัฒนาต่อยอด',
      'Growth Tracking Dashboard',
      'BONUS: Coaching เพิ่ม 1 ครั้ง มูลค่า ฿5,000 ฟรี!',
    ],
    cta: 'สมัครแพคเกจ 3 เดือน',
    highlight: true,
  },
];

const FAQS = [
  {
    q: 'เหมาะสำหรับใคร?',
    a: 'ผู้บริหารระดับสูง CEO / ผู้ก่อตั้งธุรกิจ / เจ้าของกิจการที่ต้อง Pitch นักลงทุน / อินฟลูเอนเซอร์และ Content Creator ที่ต้องสร้างความน่าเชื่อถือ ทุกคนที่อยากสื่อสารอย่างทรงพลังและมืออาชีพ',
  },
  {
    q: 'Workshop 1 วันเรียนที่ไหน?',
    a: 'จัดในรูปแบบ In-person ที่สถานที่กำหนด (กทม. & ปริมณฑล) หรือ Online ผ่าน Zoom ขึ้นอยู่กับแพคเกจและการนัดหมาย',
  },
  {
    q: 'CEO Speech Script ที่ได้รับคืออะไร?',
    a: 'สคริปต์การพูดที่ออกแบบเฉพาะสำหรับคุณ อ้างอิงจากตัวตน สไตล์ และบริบทธุรกิจของคุณ พร้อมใช้งานจริงในการ Pitch, Presentation หรือ Social Media',
  },
  {
    q: 'Coaching ออนไลน์ทำอย่างไร?',
    a: 'ผ่าน Zoom หรือ Line Video Call สัปดาห์ละ 1 ครั้ง ติดตามความคืบหน้า วิเคราะห์ปัญหา และฝึกซ้อมเนื้อหาจากบทเรียนก่อนหน้า',
  },
  {
    q: 'Bonus Coaching ฟรีมีเงื่อนไขอะไร?',
    a: 'สำหรับผู้สมัครแพคเกจ 3 เดือน ภายในช่วงโปรโมชั่น รับ Coaching เพิ่ม 1 ครั้ง (มูลค่า ฿5,000) ฟรีทันทีเมื่อสมัครวันนี้',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const CEOSpeechfulness: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <SEO
        title="CEO Speechfulness — พูดให้ตรึงใจ สื่อสารแบบผู้บริหารยุคใหม่ | ครูเด่น"
        description="หลักสูตร CEO Speechfulness โดยครูเด่น มาสเตอร์ฟา Workshop 1 วัน + Coaching 3 เดือน สำหรับผู้บริหาร เจ้าของธุรกิจ และผู้นำที่อยากสื่อสารอย่างทรงพลัง"
        keywords={['CEO Speechfulness', 'หลักสูตรพูด', 'Coaching ผู้บริหาร', 'ครูเด่น', 'Public Speaking', 'CAP Vision']}
      />

      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a0f1e] pt-32 pb-24">
        {/* BG layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#c5a059]/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] text-sm font-bold px-5 py-2.5 rounded-full mb-8 animate-fade-in">
                <Mic2 className="w-4 h-4" />
                หลักสูตรสื่อสารพิเศษสำหรับผู้บริหาร
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.05] mb-6 nav-font tracking-tight">
                CEO{' '}
                <span className="text-[#c5a059] block lg:inline">Speechfulness</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 font-medium mb-8 nav-font">
                พูดให้ตรึงใจ · ฟังให้ลึกซึ้ง · สื่อสารแบบผู้บริหารยุคใหม่
              </p>

              <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
                <div className="w-12 h-[1px] bg-[#c5a059]/50 hidden sm:block" />
                <p className="text-white/60 text-base md:text-lg">
                  โดย <span className="text-[#c5a059] font-bold">ครูเด่น มาสเตอร์ฟา</span>
                  <span className="hidden sm:inline"> · ประสบการณ์กว่า 18 ปีด้านการสื่อสารผู้บริหาร</span>
                </p>
              </div>

              {/* Target tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-10">
                {['ผู้บริหาร CEO', 'เจ้าของธุรกิจ', 'Startup Founder', 'Influencer'].map((t) => (
                  <span key={t} className="bg-white/5 border border-white/10 text-white/50 text-xs font-bold px-4 py-2 rounded-lg backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={CONTACT_INFO.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#c5a059] hover:bg-amber-400 text-white font-black py-5 px-10 rounded-2xl text-lg transition-all shadow-xl shadow-[#c5a059]/20 hover:shadow-[#c5a059]/40 nav-font active:scale-95"
                >
                  <MessageCircle className="w-6 h-6" />
                  ปรึกษาครูเด่นทาง Line
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all nav-font backdrop-blur-md"
                >
                  ดูแพคเกจและราคา
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-16 pt-8 border-t border-white/5">
                {[
                  { n: '18+', label: 'ปีประสบการณ์' },
                  { n: '5', label: 'โมดูลหลัก' },
                  { n: '3', label: 'เดือน Coaching' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-[#c5a059] nav-font">{s.n}</div>
                    <div className="text-white/30 text-[10px] uppercase tracking-widest font-bold mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Container */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative group mx-auto max-w-md lg:max-w-none">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#c5a059]/20 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#c5a059]/10 rounded-full blur-3xl animate-pulse" />
                
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl">
                  <img
                    src="https://assets.capvisionpartner.com/media/Den%20Masterfa%20Gallery/den%20masterfa7.jpg"
                    alt="Kru Den Master Fa - CEO Speechfulness"
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#c5a059] flex items-center justify-center text-white flex-shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">Experience Leader</div>
                        <div className="text-white/60 text-xs">Expert Communication Coach</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accent border */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-[#c5a059]/20 pointer-events-none -m-2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-700" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pain Points ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-3">ความท้าทายที่คุณเผชิญ</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font">
              คุณต้องการสิ่งเหล่านี้ใช่ไหม?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-6 rounded-2xl border border-gray-100 hover:border-[#c5a059]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0f3460] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a059] transition-colors">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-black text-[#0f3460] nav-font text-lg mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Program Overview ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0f3460]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-3">รูปแบบการเรียน</p>
          <h2 className="text-3xl md:text-4xl font-black text-white nav-font mb-4">
            ออกแบบมาเพื่อผู้บริหารโดยเฉพาะ
          </h2>
          <p className="text-white/60 mb-14">เรียนรู้เข้มข้น + ติดตามผลระยะยาว = เปลี่ยนแปลงได้จริง</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/8 border border-white/10 rounded-3xl p-8 text-left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#c5a059] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-black nav-font">Workshop เข้มข้น</div>
                  <div className="text-[#c5a059] text-sm font-bold">1 วัน · 6 ชั่วโมงเต็ม</div>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                ฝึกฝนครบทั้ง 5 โมดูลในวันเดียว เน้นปฏิบัติจริง ได้ Feedback ทันที พร้อมปรับปรุงและฝึกซ้ำในสภาพแวดล้อมที่ปลอดภัย
              </p>
              <ul className="space-y-2">
                {['5 โมดูลหลักครบถ้วน', 'ฝึกปฏิบัติจริงทุก Module', 'CEO Speech Showcase รับ Feedback ทันที', 'วัสดุและเอกสารประกอบ'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/8 border border-white/10 rounded-3xl p-8 text-left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#c5a059] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-black nav-font">Coaching ติดตาม</div>
                  <div className="text-[#c5a059] text-sm font-bold">3 เดือน · ต่อเนื่องยั่งยืน</div>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                ติดตามผลและพัฒนาต่อเนื่อง เพราะการพูดดีต้องอาศัยการฝึกซ้ำในบริบทจริง ไม่ใช่แค่ความรู้วันเดียว
              </p>
              <ul className="space-y-2">
                {[
                  'Online Coaching 1 ครั้ง/สัปดาห์',
                  'In-person Coaching 2 ครั้ง/เดือน',
                  'CEO Speech Script ส่วนตัว',
                  'Action Plan & Growth Tracking',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 Modules ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-3">หลักสูตร</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font">
              5 โมดูลที่จะเปลี่ยนแปลงคุณ
            </h2>
          </div>

          <div className="space-y-4">
            {MODULES.map((m, i) => (
              <div
                key={i}
                className="flex items-start gap-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 text-xl font-black nav-font"
                  style={{ backgroundColor: m.color }}
                >
                  {m.no}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span style={{ color: m.color }}>{m.icon}</span>
                    <h3 className="font-black text-[#0f3460] nav-font text-lg">{m.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-3">ผลลัพธ์</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font">
              สิ่งที่คุณจะได้รับ
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RESULTS.map((r, i) => (
              <div key={i} className="bg-gradient-to-br from-[#0f3460]/3 to-[#c5a059]/5 rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#0f3460] text-white flex items-center justify-center mb-4">
                  {r.icon}
                </div>
                <h3 className="font-black text-[#0f3460] nav-font mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-3">ดูตัวอย่าง</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-8">
            ครูเด่นสอนอย่างไร?
          </h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-[#0f3460]">
            <iframe
              src="https://www.youtube.com/embed/mOOMs6n6Q58?rel=0"
              title="CEO Speechfulness by ครูเด่น"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0f3460]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-3">รีวิวจากผู้เรียน</p>
            <h2 className="text-3xl md:text-4xl font-black text-white nav-font">
              ประสบการณ์จริงจากผู้รับคำปรึกษา
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#c5a059]/50 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="text-white font-black nav-font text-sm">{t.name}{t.age ? `, ${t.age} ปี` : ''}</div>
                    <div className="text-[#c5a059] text-xs font-medium">{t.role}</div>
                    {t.page && <div className="text-white/40 text-[10px]">{t.page}</div>}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────────────────────── */}
      <section id="packages" className="py-20 px-4 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-3">ค่าบริการและแพ็กเกจ</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
              เลือกรูปแบบที่ใช่สำหรับคุณ
            </h2>
            <p className="text-gray-500">ปรึกษาฟรีก่อนตัดสินใจ ไม่มีข้อผูกมัด</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  pkg.highlight
                    ? 'ring-2 shadow-2xl'
                    : 'border border-gray-100 shadow-lg'
                }`}
                style={pkg.highlight ? { boxShadow: `0 20px 60px ${pkg.color}25, 0 0 0 2px ${pkg.color}` } : {}}
              >
                {pkg.highlight && (
                  <div className="py-2.5 text-center text-white text-xs font-black tracking-wider nav-font" style={{ backgroundColor: pkg.color }}>
                    ⭐ BEST VALUE — สมัครวันนี้ รับ Bonus ฟรี
                  </div>
                )}

                <div className="p-7 flex-1 flex flex-col">
                  {/* Tag */}
                  <span
                    className="self-start text-xs font-black px-3 py-1 rounded-full mb-4 nav-font"
                    style={{ backgroundColor: `${pkg.color}15`, color: pkg.color }}
                  >
                    {pkg.tag}
                  </span>

                  <h3 className="font-black text-[#0f3460] nav-font text-xl mb-1">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{pkg.subtitle}</p>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl font-black nav-font" style={{ color: pkg.color }}>
                      ฿{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">{pkg.unit}</span>
                  </div>
                  {pkg.addOn && (
                    <p className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg mb-6">
                      🎁 {pkg.addOn}
                    </p>
                  )}
                  {!pkg.addOn && <div className="mb-6" />}

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: f.includes('BONUS') ? '#059669' : pkg.color }}
                        />
                        <span className={`text-xs leading-relaxed ${f.includes('BONUS') ? 'text-green-700 font-bold' : 'text-gray-600'}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      setSelectedPackage({
                        id: pkg.id,
                        name: pkg.name,
                        price: pkg.price,
                        type: pkg.id.includes('3m') ? 'full' : 'consult'
                      });
                      setShowBooking(true);
                    }}
                    className="block w-full text-center py-4 rounded-2xl font-black text-sm nav-font transition-all active:scale-95 hover:opacity-90"
                    style={
                      pkg.highlight
                        ? { backgroundColor: pkg.color, color: 'white' }
                        : { border: `2px solid ${pkg.color}`, color: pkg.color, backgroundColor: 'transparent' }
                    }
                  >
                    {pkg.cta} →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-gray-400 text-xs mt-8">
            * ราคาสำหรับพื้นที่ กทม. และปริมณฑล · ต่างจังหวัดกรุณาสอบถามค่าเดินทางเพิ่มเติม
          </p>
        </div>
      </section>

      {/* ── Special Bonus Banner ──────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#c5a059] via-amber-400 to-[#c5a059]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-3">🎁</div>
          <h2 className="text-2xl md:text-3xl font-black text-white nav-font mb-2">
            โปรโมชันพิเศษ! สมัครวันนี้
          </h2>
          <p className="text-white/80 text-lg mb-6">
            รับ Bonus Coaching เพิ่ม 1 ครั้ง <strong className="text-white">มูลค่า ฿5,000 ฟรี!</strong>
            <br />
            เฉพาะผู้สมัครแพคเกจ CEO Speechfulness 3 เดือน
          </p>
          <button
            onClick={() => {
              setSelectedPackage({
                id: 'package-3m',
                name: 'CEO Speechfulness 3 เดือน',
                price: 39000,
                type: 'full'
              });
              setShowBooking(true);
            }}
            className="inline-flex items-center gap-2 bg-white text-[#c5a059] font-black py-4 px-8 rounded-2xl text-base hover:bg-[#0f3460] hover:text-white transition-all nav-font shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            สมัครเลย — ชำระเงิน/ลงทะเบียน
          </button>
        </div>
      </section>

      {/* ── About Coach ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl flex-shrink-0 overflow-hidden shadow-lg border-2 border-[#c5a059]/30">
                <img
                  src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/Den%20Service/denmasterfa.jpg"
                  alt="ครูเด่น มาสเตอร์ฟา"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[#c5a059] text-sm font-bold tracking-widest nav-font uppercase mb-2">เกี่ยวกับวิทยากร</p>
                <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-3">
                  ครูเด่น มาสเตอร์ฟา
                </h2>
                <p className="text-base font-bold text-gray-600 mb-4">
                  อนุสรณ์ หนองนา · ผู้เชี่ยวชาญด้านการสื่อสารสำหรับผู้บริหาร & Master Facilitator
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  ประสบการณ์การสอนและโค้ชผู้บริหารระดับสูงมากกว่า 18 ปี ผู้สร้าง DFA Model ที่เชื่อมโยง Transformative Learning เข้ากับ Digital Communication และ AI Solutions ลูกค้าองค์กรชั้นนำกว่า 25+ บริษัท ทั้งรัฐวิสาหกิจ มหาวิทยาลัย และ Corporate
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'IG/TikTok', value: '@denmasterfa', href: 'https://www.instagram.com/denmasterfa' },
                    { label: 'Line', value: CONTACT_INFO.line, href: CONTACT_INFO.lineUrl },
                    { label: 'Tel', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0f3460]/5 hover:bg-[#c5a059]/10 border border-gray-200 text-[#0f3460] text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      <span className="text-[#c5a059] text-xs">{c.label}:</span>
                      {c.value}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font text-center mb-10">
            คำถามที่พบบ่อย
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-bold text-[#0f3460] nav-font text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#c5a059] transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#c5a059]/8 blur-3xl" />
          <div className="absolute -bottom-32 left-0 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🎤</div>
          <h2 className="text-3xl md:text-4xl font-black text-white nav-font mb-4">
            พร้อมสื่อสารอย่างผู้บริหารระดับโลก?
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            ปรึกษาฟรี ไม่มีข้อผูกมัด<br />
            <span className="text-[#c5a059] font-bold">ครูเด่น มาสเตอร์ฟา</span> พร้อมออกแบบเส้นทางพัฒนาที่ใช่สำหรับคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-amber-400 text-white font-black py-4 px-8 rounded-2xl text-base transition-all shadow-lg nav-font active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              ทักหา Line @denmasterfa
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white font-bold py-4 px-8 rounded-2xl text-base transition-all nav-font"
            >
              <PhoneCall className="w-5 h-5" />
              {CONTACT_INFO.phone}
            </a>
          </div>
          <p className="text-white/30 text-xs mt-8">
            Line OA: {CONTACT_INFO.line} · Email: {CONTACT_INFO.email}
          </p>
        </div>
      </section>

      {/* ── Registration Modal ────────────────────────────────────────────────── */}
      {showBooking && selectedPackage && (
        <SpeechfulnessRegistration
          selectedPackage={selectedPackage}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
};

export default CEOSpeechfulness;
