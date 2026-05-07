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
  // Section 1: แบรนด์และตัวตน
  companyNameTh: string;
  companyNameEn: string;
  slogan: string;
  brandColors: string;
  brandStyle: string;
  referenceLinks: string;
  logoUrl?: string;

  // Section 2: เนื้อหาหลัก
  businessDescription: string;
  usp: string;
  targetGroup: string;
  services: string;
  
  // Section 3: ระบบและฟีเจอร์ (Phase 2+)
  loginRequirement: string;
  dataToCollect: string;
  notifications: string[];
  bookingRequirement: string;
  dashboardRequirement: string;
  integrations: string;

  // Section 4: เนื้อหา + สื่อ
  heroText: string;
  aboutUs: string;
  faqs: string;
  socialMedia: string;
  contactInfo: string;

  // Section 5: เทคนิค (Phase 2-3)
  domainChoice: string;
  businessEmail: string;
  existingSystem: string;
  multiLanguage: string;
  paymentOnline: string;

  // Section 6: Timeline & Expectation
  deadline: string;
  specialEvent: string;
  maxExpectation: string;
  mainConcern: string;
  questions: string;
}

const STORAGE_KEY = 'cap_vision_webapp_onboarding_v2';

const WebAppOnboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get('booking_id');
  const packageName = searchParams.get('package') || 'Web App Project';
  
  // Determine Phase based on package name or id
  const phase = packageName.includes('P1') ? 1 : (packageName.includes('P2') ? 2 : 3);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      companyNameTh: '',
      companyNameEn: '',
      slogan: '',
      brandColors: '',
      brandStyle: 'modern',
      referenceLinks: '',
      businessDescription: '',
      usp: '',
      targetGroup: '',
      services: '',
      loginRequirement: 'no',
      dataToCollect: '',
      notifications: [],
      bookingRequirement: 'no',
      dashboardRequirement: '',
      integrations: '',
      heroText: '',
      aboutUs: '',
      faqs: '',
      socialMedia: '',
      contactInfo: '',
      domainChoice: '',
      businessEmail: 'no',
      existingSystem: '',
      multiLanguage: 'no',
      paymentOnline: 'no',
      deadline: '',
      specialEvent: '',
      maxExpectation: '',
      mainConcern: '',
      questions: '',
    };
  });

  // Steps Configuration based on Phase
  const steps = [
    { id: 1, label: 'แบรนด์และตัวตน', icon: <Sparkles className="w-4 h-4" />, phase: [1, 2, 3] },
    { id: 2, label: 'เนื้อหาหลัก', icon: <Building2 className="w-4 h-4" />, phase: [1, 2, 3] },
    { id: 3, label: 'ระบบและฟีเจอร์', icon: <LayoutDashboard className="w-4 h-4" />, phase: [2, 3] },
    { id: 4, label: 'เนื้อหา + สื่อ', icon: <Layout className="w-4 h-4" />, phase: [1, 2, 3] },
    { id: 5, label: 'เทคนิค', icon: <Database className="w-4 h-4" />, phase: [2, 3] },
    { id: 6, label: 'Timeline', icon: <Clock className="w-4 h-4" />, phase: [1, 2, 3] },
  ].filter(s => s.phase.includes(phase));

  const totalSteps = steps.length;
  const activeStepConfig = steps[currentStep - 1];

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (type: string) => {
    setFormData(prev => ({
      ...prev,
      notifications: prev.notifications.includes(type)
        ? prev.notifications.filter(t => t !== type)
        : [...prev.notifications, type]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
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
          phase: phase,
          data: formData
        });

      if (dbError) throw dbError;

      // 2. Send LINE Notification (Admin)
      await supabase.functions.invoke('line-notify', {
        body: {
          project: 'WEB_APP',
          formType: 'Web App Onboarding (V2)',
          data: {
            'โครงการ': packageName,
            'ชื่อธุรกิจ': formData.companyNameTh,
            'เป้าหมาย': formData.maxExpectation,
            'ไทม์ไลน์': formData.deadline,
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
  const progress = (currentStep / totalSteps) * 100;

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
          <h1 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-4 nav-font">ส่งข้อมูลสำเร็จ! 🎉</h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
            ครูเด่นและทีมงานได้รับข้อมูลโครงการของคุณแล้ว เราจะทำการสร้าง **Project Brief Document** และติดต่อคุณเพื่อนัดหมาย **Kickoff Meeting** ภายใน 24 ชม.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-10 text-left">
            <h4 className="font-black text-[#0f3460] mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c5a059]" /> ขั้นตอนต่อไป (Next Steps)
            </h4>
            <ul className="space-y-3 text-sm text-[#0f3460]/70 font-bold">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-[#c5a059] flex-shrink-0">1</span>
                ทีมงานวิเคราะห์ข้อมูลและสร้าง Project Brief & Tech Stack
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-[#c5a059] flex-shrink-0">2</span>
                นัด Kickoff Meeting เพื่อยืนยันขอบเขตงานและ Timeline
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-[#c5a059] flex-shrink-0">3</span>
                เริ่มกระบวนการพัฒนา (Development Start)
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
        title="Project Onboarding | CAP Vision Institute" 
        description="แบบฟอร์มเก็บข้อมูลโปรเจกต์เว็บแอปพลิเคชัน เพื่อการพัฒนาที่แม่นยำและรวดเร็ว"
      />

      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#c5a059]/10 text-[#c5a059] px-4 py-1.5 rounded-full border border-[#c5a059]/20 font-black text-[11px] uppercase tracking-widest mb-4"
          >
            <Rocket className="w-3.5 h-3.5" /> Web App Onboarding Framework
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-4 nav-font">
            เตรียมพร้อมสำหรับ <span className="text-[#c5a059]">ความสำเร็จ</span>
          </h1>
          <p className="text-gray-500 font-medium">กรอกข้อมูลโครงการเพื่อให้ทีมงานเริ่มออกแบบโครงสร้างทันที</p>
          <div className="mt-4 flex justify-center gap-4">
             <div className="bg-[#0f3460] text-white px-6 py-2 rounded-xl text-sm font-bold nav-font">
                Package: {packageName}
             </div>
             <div className="bg-amber-500 text-white px-6 py-2 rounded-xl text-sm font-bold nav-font">
                Phase: {phase}
             </div>
          </div>
        </div>

        {/* Progress Bar & Step Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Section {currentStep} / {totalSteps}: {activeStepConfig.label}</span>
            <span className="text-sm font-black text-[#0f3460]">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden border border-gray-100 shadow-inner p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#c5a059] to-amber-400 rounded-full"
            />
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-6">
            {steps.map((s, idx) => (
              <div 
                key={s.id}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                  currentStep === (idx + 1) ? 'bg-white shadow-md border-gray-100' : 'opacity-40 grayscale'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                  currentStep >= (idx + 1) ? 'bg-[#c5a059] text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {currentStep > (idx + 1) ? <Check className="w-4 h-4" /> : (idx + 1)}
                </div>
                <span className="text-[9px] font-black text-center text-[#0f3460] hidden md:block uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-[#0f3460]/5 border border-gray-50 relative min-h-[500px]">
          
          <AnimatePresence mode="wait">
            {activeStepConfig.id === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center"><Sparkles /></div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">Section 1: แบรนด์และตัวตน</h3>
                    <p className="text-sm text-gray-400">สร้างเอกลักษณ์ให้เว็บของคุณดูพรีเมียม</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ชื่อธุรกิจ (ภาษาไทย)</label>
                    <input name="companyNameTh" value={formData.companyNameTh} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น แคป วิชั่น อินสติทิวต์" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ชื่อธุรกิจ (ภาษาอังกฤษ)</label>
                    <input name="companyNameEn" value={formData.companyNameEn} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น CAP Vision Institute" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">Slogan / คำที่อยากให้คนจำ</label>
                    <input name="slogan" value={formData.slogan} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น Transform People, Transform Organization" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">สีแบรนด์ที่ชอบ (หรือรหัสสี)</label>
                    <input name="brandColors" value={formData.brandColors} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น น้ำเงิน-ทอง, #0f3460" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">สไตล์ที่ต้องการ</label>
                    <select name="brandStyle" value={formData.brandStyle} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold">
                        <option value="modern">Modern & Clean</option>
                        <option value="luxury">Luxury & Elegant</option>
                        <option value="classic">Classic & Professional</option>
                        <option value="playful">Playful & Friendly</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStepConfig.id === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center"><Building2 /></div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">Section 2: เนื้อหาหลัก</h3>
                    <p className="text-sm text-gray-400">เล่ารายละเอียดธุรกิจเพื่อให้เราสื่อสารได้ตรงจุด</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">คำอธิบายธุรกิจ (ใน 3 ประโยค)</label>
                    <textarea name="businessDescription" rows={3} value={formData.businessDescription} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="ธุรกิจของคุณทำอะไร และช่วยใคร?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">จุดเด่น / USP ที่ไม่มีคู่แข่ง</label>
                    <textarea name="usp" rows={2} value={formData.usp} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="ทำไมลูกค้าต้องเลือกคุณ?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">กลุ่มลูกค้าหลัก</label>
                    <input name="targetGroup" value={formData.targetGroup} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น เจ้าของธุรกิจอายุ 30-45 ปี" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">รายการสินค้า/บริการ (สรุปสั้นๆ)</label>
                    <textarea name="services" rows={3} value={formData.services} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="เช่น 1. รับออกแบบ... 2. ขายสินค้า..." />
                  </div>
                </div>
              </motion.div>
            )}

            {activeStepConfig.id === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center"><LayoutDashboard /></div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">Section 3: ระบบและฟีเจอร์</h3>
                    <p className="text-sm text-gray-400">ระบุการทำงานของระบบที่ต้องการ</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ต้องการระบบ Login หรือไม่?</label>
                    <select name="loginRequirement" value={formData.loginRequirement} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold">
                        <option value="no">ไม่มีระบบ Login</option>
                        <option value="customer">มีสำหรับลูกค้า</option>
                        <option value="admin">มีสำหรับ Admin เท่านั้น</option>
                        <option value="both">มีทั้งคู่</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ต้องการระบบจอง (Booking) หรือไม่?</label>
                    <select name="bookingRequirement" value={formData.bookingRequirement} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold">
                        <option value="no">ไม่มี</option>
                        <option value="yes">มีระบบนัดหมาย/จองบริการ</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ข้อมูลที่ต้องเก็บในระบบ (เช่น รายชื่อสมาชิก, ยอดขาย)</label>
                    <textarea name="dataToCollect" rows={2} value={formData.dataToCollect} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="ระบุรายการข้อมูลหลักที่ต้องการบันทึก" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">การแจ้งเตือนที่ต้องการ</label>
                    <div className="flex flex-wrap gap-4 pt-2">
                        {['Email', 'LINE Notify', 'LINE Messaging API', 'SMS'].map(type => (
                            <button key={type} onClick={() => toggleNotification(type)} className={`px-4 py-2 rounded-xl border-2 text-xs font-bold transition-all ${formData.notifications.includes(type) ? 'border-[#c5a059] bg-[#c5a059] text-white' : 'border-gray-100 text-gray-400'}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStepConfig.id === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center"><Layout /></div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">Section 4: เนื้อหา + สื่อ</h3>
                    <p className="text-sm text-gray-400">เตรียมข้อความที่จะแสดงบนหน้าเว็บไซต์</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">Hero Text (พาดหัวหน้าแรกที่น่าสนใจ)</label>
                    <input name="heroText" value={formData.heroText} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น ยกระดับธุรกิจของคุณด้วย AI อัจฉริยะ" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">เกี่ยวกับเรา (About Us สรุป)</label>
                    <textarea name="aboutUs" rows={3} value={formData.aboutUs} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="ประวัติย่อหรือพันธกิจของแบรนด์" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">Social Media URL ทั้งหมด</label>
                    <textarea name="socialMedia" rows={2} value={formData.socialMedia} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="Facebook, Instagram, TikTok, YouTube..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ข้อมูลติดต่อ (เบอร์โทร, LINE, ที่อยู่)</label>
                    <textarea name="contactInfo" rows={2} value={formData.contactInfo} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="สำหรับแสดงหน้า Contact" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeStepConfig.id === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center"><Database /></div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">Section 5: เทคนิค</h3>
                    <p className="text-sm text-gray-400">ข้อมูลเชิงเทคนิคสำหรับระบบและการเชื่อมต่อ</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ชื่อโดเมนที่ต้องการ (.com / .net / .co.th)</label>
                    <input name="domainChoice" value={formData.domainChoice} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น yourbrand.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ต้องการระบบหลายภาษา (Multi-language)?</label>
                    <select name="multiLanguage" value={formData.multiLanguage} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold">
                        <option value="no">ภาษาไทยอย่างเดียว</option>
                        <option value="en">ไทย + อังกฤษ</option>
                        <option value="other">อื่นๆ ระบุในหมายเหตุ</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ต้องการระบบชำระเงินออนไลน์?</label>
                    <select name="paymentOnline" value={formData.paymentOnline} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold">
                        <option value="no">ไม่มี (เน้นแจ้งโอน)</option>
                        <option value="yes">มี (Stripe / PromptPay Gateway)</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ระบบเดิมที่ใช้อยู่ (ถ้ามี) — เช่น Excel, เว็บเก่า</label>
                    <input name="existingSystem" value={formData.existingSystem} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เพื่อประเมินการย้ายข้อมูล" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeStepConfig.id === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center"><Clock /></div>
                  <div>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">Section 6: Timeline & Expectation</h3>
                    <p className="text-sm text-gray-400">เป้าหมายและความคาดหวังสูงสุดของคุณ</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">วันที่ต้องการเปิดตัวเว็บ (Deadline)</label>
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none font-bold [color-scheme:light]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">ความคาดหวังสูงสุดจากเว็บนี้</label>
                    <input name="maxExpectation" value={formData.maxExpectation} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น ยอดขายเพิ่มขึ้น 2 เท่า" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">สิ่งที่กังวลมากที่สุดเกี่ยวกับโปรเจกต์นี้</label>
                    <input name="mainConcern" value={formData.mainConcern} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" placeholder="เช่น ความซับซ้อนของการใช้งาน, ความปลอดภัย" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-[#0f3460] uppercase tracking-widest">คำถามที่ยังค้างใจ / หมายเหตุเพิ่มเติม</label>
                    <textarea name="questions" rows={2} value={formData.questions} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none" placeholder="มีอะไรที่อยากบอกครูเด่นเพิ่มเติมไหม?" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <button onClick={handleBack} disabled={currentStep === 1 || loading} className={`flex items-center gap-2 font-black text-sm uppercase tracking-widest transition-colors ${currentStep === 1 ? 'opacity-0' : 'text-gray-400 hover:text-[#0f3460]'}`}>
              <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
            </button>

            {error && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-600 px-6 py-2 rounded-full border border-red-100 text-xs font-bold animate-bounce flex items-center gap-2 shadow-lg z-10">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <button onClick={currentStep === totalSteps ? handleSubmit : handleNext} disabled={loading} className="bg-[#c5a059] hover:bg-amber-400 text-white px-10 py-4 rounded-2xl font-black text-sm nav-font shadow-lg hover:shadow-xl transition-all flex items-center gap-3 active:scale-95">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : currentStep === totalSteps ? (
                <>ยืนยันและส่งข้อมูลโปรเจกต์ <Rocket className="w-4 h-4" /></>
              ) : (
                <>ขั้นตอนถัดไป <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-10 text-center text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">
          Professional Web App Onboarding — Design & Develop by Kru Den Masterfa
        </div>
      </div>
    </div>
  );
};

export default WebAppOnboarding;
