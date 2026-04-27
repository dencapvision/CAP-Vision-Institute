import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Rocket, Layout, Database, CheckCircle2, 
  ArrowRight, ArrowLeft, Upload, Globe, MessageSquare, 
  Bot, LayoutDashboard, CreditCard, Clock, Check,
  AlertCircle, Loader2, Sparkles, LineChart, ShieldCheck
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import SEO from '../components/SEO';

// --- Types ---
interface OnboardingData {
  companyName: string;
  businessType: string;
  goal: string;
  features: string[];
  logoUrl?: string;
  imagesUrls: string[];
  domain: string;
  hosting: string;
  apiKey: string;
  lineOa: string;
  budget: string;
  timeline: string;
}

const STORAGE_KEY = 'cap_vision_webapp_onboarding_v1';

const WebAppOnboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get('booking_id');
  const packageName = searchParams.get('package') || 'Web App Project';

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      companyName: '',
      businessType: '',
      goal: '',
      features: [],
      imagesUrls: [],
      domain: '',
      hosting: '',
      apiKey: '',
      lineOa: '',
      budget: '',
      timeline: '',
    };
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase
        .from('web_app_onboarding')
        .insert({
          booking_id: bookingId,
          package_name: packageName,
          company_name: formData.companyName,
          business_type: formData.businessType,
          goal: formData.goal,
          features: formData.features,
          assets: {
            logo_url: formData.logoUrl,
            images: formData.imagesUrls,
            domain: formData.domain,
            hosting: formData.hosting,
            api_key: formData.apiKey,
            line_oa: formData.lineOa
          },
          budget: formData.budget,
          timeline: formData.timeline
        });

      if (dbError) throw dbError;

      // 2. Send LINE Notification (Admin)
      await supabase.functions.invoke('line-notify', {
        body: {
          project: 'WEB_APP',
          formType: 'Web App Onboarding',
          data: {
            'โครงการ': packageName,
            'บริษัท': formData.companyName,
            'ประเภทธุรกิจ': formData.businessType,
            'เป้าหมาย': formData.goal,
            'ฟีเจอร์': formData.features.join(', '),
            'งบประมาณ': formData.budget,
            'ไทม์ไลน์': formData.timeline,
            'Booking ID': bookingId || 'N/A'
          }
        }
      });

      setIsSuccess(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  // Progress Calculation
  const progress = (currentStep / 4) * 100;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0f3460] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-black/50"
        >
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-4 nav-font">ขอบคุณสำหรับข้อมูล!</h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
            เราได้รับข้อมูลโครงการของคุณแล้ว ทีมงานจะทำการวิเคราะห์และเริ่มต้นออกแบบโครงสร้างให้คุณภายใน 24 ชม.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-10 text-left">
            <h4 className="font-black text-[#0f3460] mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c5a059]" /> ขั้นตอนต่อไป
            </h4>
            <ul className="space-y-3 text-sm text-[#0f3460]/70 font-bold">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-[#c5a059] flex-shrink-0">1</span>
                ทีมงานตรวจสอบข้อมูลและนัดสัมภาษณ์เชิงลึก (Discovery Call)
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-[#c5a059] flex-shrink-0">2</span>
                ส่งมอบ Sitemap และ Design Wireframe ชุดแรก
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-[#c5a059] flex-shrink-0">3</span>
                เริ่มกระบวนการพัฒนา (Coding Phase)
              </li>
            </ul>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full md:w-auto bg-[#0f3460] text-white px-12 py-5 rounded-2xl font-black text-lg nav-font hover:scale-105 transition-transform"
          >
            กลับสู่หน้าหลัก
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <SEO 
        title="เริ่มต้นสร้าง Web App ของคุณ | CAP Vision Partner" 
        description="กรอกข้อมูลเริ่มต้นโปรเจกต์ Web App เพื่อให้ทีมงานเริ่มออกแบบและพัฒนาทันที"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#c5a059]/10 text-[#c5a059] px-4 py-1.5 rounded-full border border-[#c5a059]/20 font-black text-[11px] uppercase tracking-widest mb-4"
          >
            <Rocket className="w-3.5 h-3.5" /> Project Onboarding
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-4 nav-font">
            เริ่มต้นสร้าง <span className="text-[#c5a059]">Web App</span> ของคุณ
          </h1>
          <p className="text-gray-500 font-medium">กรอกข้อมูลเพียง 3 นาที ทีมจะเริ่มออกแบบให้ทันที</p>
          <div className="mt-4 inline-block bg-[#0f3460] text-white px-6 py-2 rounded-xl text-sm font-bold nav-font">
            แพ็กเกจที่เลือก: {packageName}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">ความสำเร็จของข้อมูล</span>
            <span className="text-sm font-black text-[#0f3460]">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden border border-gray-100 shadow-inner p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#c5a059] to-amber-400 rounded-full"
            />
          </div>
          
          {/* Step Indicator */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            {[
              { id: 1, label: 'ข้อมูลธุรกิจ', icon: <Building2 className="w-4 h-4" /> },
              { id: 2, label: 'ระบบที่ต้องการ', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 3, label: 'Assets & Accounts', icon: <Database className="w-4 h-4" /> },
              { id: 4, label: 'ยืนยันข้อมูล', icon: <ShieldCheck className="w-4 h-4" /> }
            ].map((s) => (
              <div 
                key={s.id}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                  currentStep >= s.id ? 'bg-white shadow-sm border-gray-100' : 'opacity-40 grayscale'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                  currentStep >= s.id ? 'bg-[#c5a059] text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {currentStep > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className="text-[10px] font-black text-center text-[#0f3460] hidden md:block uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-[#0f3460]/5 border border-gray-50 relative overflow-hidden">
          {/* Subtle bg decoration */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
            <Building2 className="w-64 h-64" />
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-[#0f3460] text-white rounded-2xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">ข้อมูลธุรกิจ (Business Info)</h3>
                    <p className="text-sm text-gray-400">เล่าให้เราฟังเกี่ยวกับธุรกิจของคุณ</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ชื่อบริษัท / โปรเจกต์ *</label>
                    <input 
                      name="companyName" required value={formData.companyName} onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-medium"
                      placeholder="ระบุชื่อบริษัทหรือชื่อโครงการของคุณ"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ประเภทธุรกิจ *</label>
                    <input 
                      name="businessType" required value={formData.businessType} onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-medium"
                      placeholder="เช่น อสังหาริมทรัพย์, การศึกษา, E-commerce, ฯลฯ"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">เป้าหมายหลักของ Web App *</label>
                    <textarea 
                      name="goal" required rows={4} value={formData.goal} onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-medium resize-none"
                      placeholder="เช่น ต้องการเก็บ Lead ลูกค้า, ต้องการระบบสมาชิกเพื่อเรียนออนไลน์, ฯลฯ"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-[#0f3460] text-white rounded-2xl flex items-center justify-center">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">ระบบที่ต้องการ (Features)</h3>
                    <p className="text-sm text-gray-400">เลือกฟีเจอร์สำคัญสำหรับโปรเจกต์ของคุณ</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'auth', label: 'Login System', desc: 'ระบบสมัครสมาชิกและล็อกอิน', icon: <ShieldCheck className="w-5 h-5" /> },
                    { id: 'dashboard', label: 'Admin Dashboard', desc: 'หน้าหลังบ้านสำหรับจัดการข้อมูล', icon: <Layout className="w-5 h-5" /> },
                    { id: 'payment', label: 'Payment Gateway', desc: 'ระบบรับชำระเงินออนไลน์', icon: <CreditCard className="w-5 h-5" /> },
                    { id: 'ai', label: 'AI / Chatbot', desc: 'ปัญญาประดิษฐ์ตอบคำถามอัตโนมัติ', icon: <Bot className="w-5 h-5" /> },
                    { id: 'seo', label: 'Advanced SEO', desc: 'การเพิ่มประสิทธิภาพการค้นหาบน Google', icon: <Globe className="w-5 h-5" /> },
                    { id: 'analytics', label: 'Data Analytics', desc: 'ระบบวิเคราะห์ข้อมูลและกราฟ', icon: <LineChart className="w-5 h-5" /> },
                  ].map((f) => (
                    <button 
                      key={f.id}
                      onClick={() => toggleFeature(f.label)}
                      className={`p-6 rounded-3xl border-2 text-left transition-all flex gap-4 ${
                        formData.features.includes(f.label) 
                          ? 'border-[#c5a059] bg-[#c5a059]/5' 
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        formData.features.includes(f.label) ? 'bg-[#c5a059] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {f.icon}
                      </div>
                      <div>
                        <p className="font-black text-[#0f3460] text-sm nav-font">{f.label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{f.desc}</p>
                      </div>
                      <div className="ml-auto">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.features.includes(f.label) ? 'bg-[#c5a059] border-[#c5a059]' : 'border-gray-200'
                        }`}>
                          {formData.features.includes(f.label) && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-[#0f3460] text-white rounded-2xl flex items-center justify-center">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">Asset & Account</h3>
                    <p className="text-sm text-gray-400">เตรียมไฟล์และข้อมูลสำหรับเริ่มต้นพัฒนา</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 p-8 border-4 border-dashed border-gray-100 rounded-[2rem] text-center hover:border-[#c5a059] transition-all cursor-pointer bg-gray-50/50">
                    <Upload className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                    <p className="font-black text-[#0f3460] nav-font">อัปโหลด Logo และไฟล์ภาพประกอบ</p>
                    <p className="text-xs text-gray-400 mt-1">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์ (สูงสุด 50MB)</p>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">Reference Links (URL ของเว็บที่ชอบ / แรงบันดาลใจ)</label>
                    <textarea 
                      name="imagesUrls" 
                      value={formData.imagesUrls.join(', ')} 
                      onChange={(e) => setFormData(prev => ({ ...prev, imagesUrls: e.target.value.split(',').map(s => s.trim()) }))}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-medium resize-none"
                      placeholder="ใส่ URL เว็บไซต์ที่ชอบ (แยกด้วยเครื่องหมาย ,)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">

                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">Domain Name</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        name="domain" value={formData.domain} onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-medium"
                        placeholder="เช่น www.example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">LINE OA (ID)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        name="lineOa" value={formData.lineOa} onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-medium"
                        placeholder="@yourbrand"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">API Keys / อื่นๆ (ถ้ามี)</label>
                    <textarea 
                      name="apiKey" value={formData.apiKey} onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-medium resize-none"
                      placeholder="ระบุข้อมูลอื่นๆ ที่จำเป็นสำหรับระบบ"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-[#0f3460] text-white rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">ยืนยันข้อมูล & ไทม์ไลน์</h3>
                    <p className="text-sm text-gray-400">ตรวจสอบความเรียบร้อยก่อนส่งให้ทีมงาน</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">งบประมาณที่วางไว้ (Budget)</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <select 
                        name="budget" value={formData.budget} onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold text-[#0f3460]"
                      >
                        <option value="">เลือกช่วงงบประมาณ</option>
                        <option value="15k-30k">15,000 - 35,000 บาท</option>
                        <option value="35k-75k">35,000 - 75,000 บาท</option>
                        <option value="75k-150k">75,000 - 150,000 บาท</option>
                        <option value="150k+">150,000 บาท ขึ้นไป</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ไทม์ไลน์ที่ต้องการ (Timeline)</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <select 
                        name="timeline" value={formData.timeline} onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold text-[#0f3460]"
                      >
                        <option value="">ระบุเวลาที่ต้องการ</option>
                        <option value="ASAP">เร่งด่วนที่สุด (ASAP)</option>
                        <option value="2-4weeks">2 - 4 สัปดาห์</option>
                        <option value="1-2months">1 - 2 เดือน</option>
                        <option value="flexible">ยืดหยุ่นได้ (Flexible)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f3460] rounded-3xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Rocket className="w-20 h-20" />
                  </div>
                  <h4 className="text-lg font-black nav-font mb-2">พร้อมเริ่มสร้างการเติบโตหรือยัง?</h4>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">
                    ข้อมูลที่คุณกรอกจะถูกส่งตรงไปยังครูเด่นและทีมพัฒนาทันที เพื่อวางโครงสร้างระบบให้เหมาะสมกับธุรกิจคุณที่สุด
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
              className={`flex items-center gap-2 font-black text-sm uppercase tracking-widest transition-colors ${
                currentStep === 1 ? 'opacity-0' : 'text-gray-400 hover:text-[#0f3460]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
            </button>

            {error && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-600 px-6 py-2 rounded-full border border-red-100 text-xs font-bold animate-bounce flex items-center gap-2 shadow-lg">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <button 
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={loading}
              className="bg-[#c5a059] hover:bg-amber-400 text-white px-10 py-4 rounded-2xl font-black text-sm nav-font shadow-lg hover:shadow-xl transition-all flex items-center gap-3 active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : currentStep === 4 ? (
                <>ส่งข้อมูลให้ทีมเริ่มพัฒนา <Rocket className="w-4 h-4" /></>
              ) : (
                <>ถัดไป <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="mt-10 text-center text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">
          Powered by CAP Vision Institute — Security & Data Protection Guaranteed
        </div>
      </div>
    </div>
  );
};

export default WebAppOnboarding;
