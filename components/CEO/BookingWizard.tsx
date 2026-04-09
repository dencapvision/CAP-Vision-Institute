import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, ChevronLeft, Check, 
  User, Building2, Briefcase, BarChart3, 
  Phone, MessageSquare, Mail, AlertCircle,
  CreditCard, QrCode, Upload, Loader2, Sparkles,
  Lock, ArrowRight, ShieldCheck
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { ceoService } from '../../lib/ceoService';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'intro' | 'info' | 'qualification' | 'selection' | 'payment' | 'completion';

const PRICING = {
  session: 4500,
  membership: 12000
};

const REVENUE_RANGES = [
  '10M - 50M',
  '50M - 100M',
  '100M+'
];

export const BookingWizard: React.FC<BookingWizardProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('intro');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'transfer' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    position: '',
    revenue_range: '',
    phone: '',
    line_id: '',
    email: '',
    challenge: '',
    expectation: '',
    consent: false,
    selected_plan: 'session' as 'session' | 'membership'
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => {
    if (step === 'intro') setStep('info');
    else if (step === 'info') setStep('qualification');
    else if (step === 'qualification') setStep('selection');
    else if (step === 'selection') setStep('payment');
  };

  const prevStep = () => {
    if (step === 'info') setStep('intro');
    else if (step === 'qualification') setStep('info');
    else if (step === 'selection') setStep('qualification');
    else if (step === 'payment') setStep('selection');
  };

  // Submit Logic
  const handleSubmitBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Create or Check User (Assume user is logged in for simplicity, or we check auth)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('กรุณาเข้าสู่ระบบก่อนดำเนินการจอง');
      }

      // 2. Create Booking via Service
      const booking = await ceoService.createBooking(
        {
          full_name: formData.full_name,
          company: formData.company,
          position: formData.position,
          revenue_range: formData.revenue_range,
          phone: formData.phone,
          line_id: formData.line_id,
          challenge: formData.challenge,
          expectation: formData.expectation
        },
        formData.selected_plan,
        formData.selected_plan === 'session' ? 'CEO Tier Session' : 'Monthly Membership'
      );

      setBookingData(booking);

      // 3. Handle Payment Redirect or UI
      if (paymentMethod === 'stripe') {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-handler/create-checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            priceId: formData.selected_plan === 'session' ? 'price_session_id' : 'price_membership_id', // Needs valid price IDs
            userEmail: user.email,
            userId: user.id,
            bookingId: booking.id,
            metadata: {
              isSubscription: formData.selected_plan === 'membership'
            }
          })
        });

        const { url } = await response.json();
        if (url) window.location.href = url;
      } else {
        setStep('completion');
      }

    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Upload to Supabase Storage
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Auth required');

        const filePath = `${user.id}/${Date.now()}_${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from('payment-slips')
          .upload(filePath, selectedFile);

        if (error) throw error;

        // Update payment record
        await ceoService.recordPayment(
          bookingData.id,
          formData.selected_plan === 'session' ? PRICING.session : PRICING.membership,
          'transfer',
          'pending',
          data.path
        );

        setStep('completion');
      } catch (err: any) {
        setError('ไม่สามารถอัปโหลดสลิปได้: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0a1628]/80 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] border border-white/20"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <div>
            <h3 className="text-xl font-black text-[#0f3460] nav-font leading-none mb-1">CEO Tier Application</h3>
            <p className="text-sm text-gray-500 font-medium tracking-tight">Step {step === 'intro' ? 1 : step === 'info' ? 2 : step === 'qualification' ? 3 : step === 'selection' ? 4 : 5} of 5</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="w-20 h-20 bg-[#c5a059]/10 rounded-3xl flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-[#c5a059]" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#0f3460] mb-4 nav-font leading-tight">ยินดีต้อนรับสู่ <span className="font-gold">CEO Thinking Room</span></h2>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">นี่ไม่ใช่คอร์สสัมมนา แต่คือวงสนทนาที่ปลอดภัยที่สุดสำหรับการตัดสินใจที่ยากที่สุดของคุณ</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-blue-50">
                    <ShieldCheck className="w-6 h-6 text-[#0f3460] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#0f3460] mb-1">Confidential & Private</h4>
                      <p className="text-sm text-gray-500 font-medium">ทุกการพูดคุยเป็นความลับ ไม่มีการบันทึกภาพและเสียง</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-blue-50">
                    <User className="w-6 h-6 text-[#0f3460] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#0f3460] mb-1">Curated Peer Group</h4>
                      <p className="text-sm text-gray-500 font-medium">เราคัดกรองเฉพาะเจ้าของธุรกิจและผู้บริหารระดับสูงเท่านั้น</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full bg-[#0f3460] text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#0a2545] transition-all shadow-xl shadow-blue-900/20"
                >
                  เริ่มกระบวนการสมัคร <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {step === 'info' && (
              <motion.div 
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-black text-[#0f3460] nav-font mb-6">ข้อมูลผู้สมัคร</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3" /> ชื่อ-นามสกุล
                    </label>
                    <input 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="ระบุชื่อจริง"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Building2 className="w-3 h-3" /> บริษัท
                    </label>
                    <input 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="ชื่อบริษัทของคุณ"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="w-3 h-3" /> ตำแหน่ง
                    </label>
                    <input 
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="เช่น CEO, Founder"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" /> รายได้ต่อปี
                    </label>
                    <select 
                      name="revenue_range"
                      value={formData.revenue_range}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-bold text-gray-700"
                    >
                      <option value="">เลือกช่วงรายได้</option>
                      {REVENUE_RANGES.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Phone className="w-3 h-3" /> เบอร์โทรศัพท์
                    </label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="09X-XXX-XXXX"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Line ID
                    </label>
                    <input 
                      name="line_id"
                      value={formData.line_id}
                      onChange={handleChange}
                      placeholder="@id"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-bold text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-[#0f3460] hover:bg-gray-50 transition-all flex items-center gap-2"><ChevronLeft /> Back</button>
                  <button onClick={nextStep} className="flex-1 bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0a2545] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10">Next Step <ChevronRight /></button>
                </div>
              </motion.div>
            )}

            {step === 'qualification' && (
              <motion.div 
                key="qualification"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-6 bg-[#c5a059]/5 rounded-3xl border border-[#c5a059]/10 mb-6">
                  <p className="text-[#a68444] font-bold leading-relaxed italic">"เราไม่ได้มองหาแค่คนที่จ่ายเงินได้ แต่เรามองหาคนที่มีเรื่องราวที่จะแบ่งปัน และพร้อมจะเติบโตไปกับวงสนทนา"</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">ปัจจุบันคุณกำลังเผชิญ Challenge อะไรในธุรกิจ?</label>
                    <textarea 
                      name="challenge"
                      value={formData.challenge}
                      onChange={handleChange}
                      rows={3}
                      placeholder="เล่าให้เราฟังคร่าวๆ เพื่อจัดกลุ่มผู้ที่มีความท้าทายใกล้เคียงกัน..."
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-medium text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">คุณคาดหวังอะไรจากวงนี้?</label>
                    <textarea 
                      name="expectation"
                      value={formData.expectation}
                      onChange={handleChange}
                      rows={3}
                      placeholder="มุมมองใหม่ กัลยาณมิตร หรือทางออกของปัญหา..."
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-medium text-gray-700"
                    />
                  </div>

                  <label className="flex gap-4 p-6 bg-blue-50/50 rounded-2xl cursor-pointer border border-blue-100 group transition-all hover:bg-blue-50">
                    <input 
                      type="checkbox" 
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-6 h-6 rounded-lg text-[#0f3460] focus:ring-[#0f3460] border-gray-200 mt-1 cursor-pointer"
                    />
                    <div className="text-sm font-bold text-[#0f3460] group-hover:text-blue-900 transition-colors">
                      ฉันเข้าใจดีว่าวงสนทนานี้เป็นความลับ (Private & Confidential) และยินดีแบ่งปันประสบการณ์จริงเพื่อการเรียนรู้ร่วมกัน
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-[#0f3460] hover:bg-gray-50 transition-all flex items-center gap-2"><ChevronLeft /> Back</button>
                  <button 
                    onClick={nextStep} 
                    disabled={!formData.consent}
                    className="flex-1 bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0a2545] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50"
                  >
                    Select Plan <ChevronRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'selection' && (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div 
                    onClick={() => setFormData({...formData, selected_plan: 'session'})}
                    className={`relative p-8 rounded-3xl cursor-pointer transition-all border-2 flex flex-col items-center text-center ${formData.selected_plan === 'session' ? 'border-[#c5a059] bg-[#c5a059]/5' : 'border-gray-100 hover:border-[#c5a059]/30'}`}
                  >
                    <div className="mb-4 text-[#c5a059] font-black text-sm uppercase tracking-widest">Pay per Session</div>
                    <div className="text-4xl font-black text-[#0f3460] mb-2">{PRICING.session.toLocaleString()} <span className="text-lg">THB</span></div>
                    <p className="text-gray-500 font-bold">เข้าร่วมเฉพาะครั้ง เข้าถึงง่าย เพื่อทดสอบวงสนทนา</p>
                    {formData.selected_plan === 'session' && <div className="absolute top-4 right-4 text-[#c5a059]"><Check className="w-6 h-6" /></div>}
                  </div>

                  <div 
                    onClick={() => setFormData({...formData, selected_plan: 'membership'})}
                    className={`relative p-8 rounded-3xl cursor-pointer transition-all border-2 flex flex-col items-center text-center ${formData.selected_plan === 'membership' ? 'border-[#c5a059] bg-[#c5a059]/5' : 'border-gray-100 hover:border-[#c5a059]/30'}`}
                  >
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#0f3460] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Best Commitment</div>
                    <div className="mb-4 text-[#c5a059] font-black text-sm uppercase tracking-widest">Monthly Membership</div>
                    <div className="text-4xl font-black text-[#0f3460] mb-2">{PRICING.membership.toLocaleString()} <span className="text-lg">THB</span></div>
                    <p className="text-gray-500 font-bold">1 Session/เดือน + สิทธิ์เข้ากลุ่ม Private Circle ตลอดชีพ</p>
                    {formData.selected_plan === 'membership' && <div className="absolute top-4 right-4 text-[#c5a059]"><Check className="w-6 h-6" /></div>}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-[#0f3460] hover:bg-gray-50 transition-all flex items-center gap-2"><ChevronLeft /> Back</button>
                  <button onClick={nextStep} className="flex-1 bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0a2545] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10">Payment Methods <ChevronRight /></button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center mb-6">
                   <div className="text-[#0f3460] font-black text-3xl mb-1">{(formData.selected_plan === 'session' ? PRICING.session : PRICING.membership).toLocaleString()} THB</div>
                   <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Amount to Pay</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center ${paymentMethod === 'stripe' ? 'border-[#c5a059] bg-[#c5a059]/5' : 'border-gray-100 hover:bg-gray-50'}`}
                  >
                    <CreditCard className="w-10 h-10 text-[#0f3460] mb-4" />
                    <div className="font-bold text-[#0f3460]">บัตรเครดิต/เดบิต</div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Processed by Stripe</p>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center ${paymentMethod === 'transfer' ? 'border-[#c5a059] bg-[#c5a059]/5' : 'border-gray-100 hover:bg-gray-50'}`}
                  >
                    <QrCode className="w-10 h-10 text-[#c5a059] mb-4" />
                    <div className="font-bold text-[#0f3460]">PromptPay / โอนเงิน</div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Manual Slip Upload</p>
                  </div>
                </div>

                {paymentMethod === 'transfer' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="p-6 bg-[#f8fafc] rounded-3xl border border-gray-100 space-y-4"
                  >
                    <div className="flex justify-between items-center text-sm">
                      <div className="font-bold text-gray-500">บัญชีธนาคาร</div>
                      <div className="font-black text-[#0f3460]">ธ.กสิกรไทย</div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="font-bold text-gray-500">เลขบัญชี</div>
                      <div className="font-black text-[#0f3460] text-lg">093-x-xxxxx-x</div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="font-bold text-gray-500">ชื่อบัญชี</div>
                      <div className="font-black text-[#0f3460]">บจก. แคป วิชั่น อินสทิทิวท์</div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-2xl py-8 cursor-pointer hover:border-[#c5a059] transition-all bg-white group">
                        <Upload className="w-8 h-8 text-gray-300 group-hover:text-[#c5a059] mb-2" />
                        <span className="text-sm font-bold text-gray-400 group-hover:text-[#0f3460]">{file ? file.name : 'อัปโหลดสลิปที่นี่'}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={loading} />
                      </label>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-[#0f3460] hover:bg-gray-50 transition-all flex items-center gap-2"><ChevronLeft /> Back</button>
                  <button 
                    disabled={!paymentMethod || loading}
                    onClick={handleSubmitBooking}
                    className="flex-1 bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0a2545] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Confirm Order'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'completion' && (
              <motion.div 
                key="completion"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-8"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12 text-green-500" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-[#0f3460] mb-4 nav-font leading-tight">ดำเนินการจองสำเร็จ!</h2>
                  <p className="text-gray-500 font-bold mb-2">Booking ID: <span className="text-[#c5a059]">{bookingData?.booking_code || 'CEO-2026xxxx'}</span></p>
                  <p className="text-gray-500 text-lg leading-relaxed font-bold max-w-sm mx-auto">ทางทีมงานได้รับข้อมูลแล้ว จะทำการตรวจสอบและส่งการยืนยันผ่านทาง LINE ของคุณภายใน 24 ชม.</p>
                </div>

                <div className="p-6 bg-[#f8fafc] rounded-3xl border border-gray-100 text-left space-y-4 max-w-xs mx-auto">
                   <div className="flex items-center gap-3 text-[#0f3460] font-bold">
                     <ShieldCheck className="w-5 h-5" /> ยืนยันสิทธิ์เรียบร้อย
                   </div>
                   <div className="flex items-center gap-3 text-gray-400 font-bold">
                     <Lock className="w-5 h-5 text-gray-200" /> รับลิงก์เข้า Dashboard (รอตรวจสอบ)
                   </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={onClose}
                    className="w-full bg-[#0f3460] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#0a2545] transition-all"
                  >
                    กลับสู่หน้าหลัก
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
