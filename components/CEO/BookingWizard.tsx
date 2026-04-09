import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, ChevronLeft, Check, 
  User, Building2, Briefcase, BarChart3, 
  Phone, MessageSquare, Mail, AlertCircle,
  CreditCard, QrCode, Upload, Loader2, Sparkles,
  Lock, ArrowRight, ShieldCheck, Copy, CheckCheck
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
  const [copied, setCopied] = useState(false);

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
    selected_plan: 'session' as 'session' | 'membership',
    transfer_date: '',
    transfer_time: ''
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Submit Logic
  const handleSubmitBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Create or Check User
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
        const stripeUrl = formData.selected_plan === 'session' 
          ? 'https://buy.stripe.com/6oUaEQbTWdPj5KAemk5EY03' 
          : 'https://buy.stripe.com/4gMaEQ1ficLf4Gw3HG5EY04';
        
        const checkoutUrl = new URL(stripeUrl);
        checkoutUrl.searchParams.append('client_reference_id', booking.id);
        checkoutUrl.searchParams.append('prefilled_email', user.email || '');
        
        window.location.href = checkoutUrl.toString();
      } else if (paymentMethod === 'transfer') {
        if (!file) throw new Error('กรุณาอัปโหลดสลิปเพื่อยืนยันการชำระเงิน');

        // Handle File Upload
        const filePath = `${user.id}/${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('payment-slips')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Record Payment with all details
        await ceoService.recordPayment(
          booking.id,
          formData.selected_plan === 'session' ? PRICING.session : PRICING.membership,
          'transfer',
          'pending',
          uploadData.path,
          formData.transfer_date,
          formData.transfer_time
        );

        // Notify Admin via LINE
        try {
          await supabase.functions.invoke('line-notify', {
            body: { 
              formType: 'CEO Tier Community (Manual Transfer)', 
              project: 'CEO_TIER',
              data: {
                'Customer': formData.full_name,
                'Package': formData.selected_plan === 'session' ? 'CEO Tier Session' : 'Monthly Membership',
                'Booking Code': booking.booking_code,
                'Transfer Date': formData.transfer_date,
                'Transfer Time': formData.transfer_time
              }
            }
          });
        } catch (notifyErr) {
          console.error('LINE notification failed:', notifyErr);
        }

        setStep('completion');
      }

    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
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
                      <div className="font-black text-[#0f3460] text-lg">0983668941</div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="font-bold text-gray-500">ชื่อบัญชี</div>
                      <div className="font-black text-[#0f3460]">บจก.นิวไดซ์</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">วันที่โอน (ตามสลิป)</label>
                        <input 
                          type="date" 
                          name="transfer_date"
                          value={formData.transfer_date}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#c5a059] outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">เวลาที่โอน (ตามสลิป)</label>
                        <input 
                          type="time" 
                          name="transfer_time"
                          value={formData.transfer_time}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#c5a059] outline-none"
                        />
                      </div>
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
                    disabled={!paymentMethod || loading || (paymentMethod === 'transfer' && (!formData.transfer_date || !formData.transfer_time || !file))}
                    onClick={handleSubmitBooking}
                    className="flex-1 bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0a2545] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Confirm & Upload Slip'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'completion' && (
              <motion.div 
                key="completion"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 pt-2 pb-8"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-black text-[#0f3460] nav-font leading-tight">ดำเนินการจองสำเร็จ!</h2>
                    <p className="text-gray-500 font-bold">ขอบคุณที่ร่วมเป็นส่วนหนึ่งของ CEO Tier Community</p>
                  </div>

                  <div className="bg-[#f8fafc] w-full max-w-sm mx-auto p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                      <QrCode size={80} />
                    </div>
                    
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">รหัสการสมัครของคุณ</p>
                    
                    <div className="flex items-center justify-center gap-4">
                      <p className="text-4xl font-black text-[#c5a059] tracking-tighter drop-shadow-sm">
                        {bookingData?.booking_code || 'CEO-ERR'}
                      </p>
                      <button 
                        onClick={() => {
                          const code = bookingData?.booking_code || '';
                          navigator.clipboard.writeText(code);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`p-3 rounded-2xl transition-all shadow-lg ${copied ? 'bg-green-500 text-white scale-110' : 'bg-[#0f3460] text-white hover:scale-110 active:scale-95'}`}
                      >
                        {copied ? <CheckCheck size={20} /> : <Copy size={20} />}
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 mt-3 text-center">ก๊อปปี้รหัสนี้นำไปแจ้งที่ LINE ทีมงานได้ทันที</p>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl shadow-blue-900/10 text-left space-y-6 max-w-md mx-auto relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 rounded-full -mr-16 -mt-16" />
                  
                  <h3 className="text-xl font-black text-[#0f3460] nav-font flex items-center gap-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#c5a059] text-white flex items-center justify-center text-sm shadow-lg shadow-[#c5a059]/30">3</div>
                    ขั้นตอนง่ายๆ เพื่อเริ่มใช้งาน
                  </h3>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0f3460]/5 text-[#0f3460] flex items-center justify-center flex-shrink-0 font-bold border border-[#0f3460]/10">1</div>
                      <div>
                        <p className="font-black text-[#0f3460] nav-font">แอดไลน์ทีมงาน (LINE OA)</p>
                        <p className="text-gray-500 text-xs font-medium">สแกน QR code หรือ กดปุ่มเพิ่มเพื่อนด้านล่าง</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0f3460]/5 text-[#0f3460] flex items-center justify-center flex-shrink-0 font-bold border border-[#0f3460]/10">2</div>
                      <div>
                        <p className="font-black text-[#0f3460] nav-font">ส่ง "รหัสการสมัคร" เข้าแชท</p>
                        <p className="text-gray-500 text-xs font-medium">คลิกปุ่ม Copy ด้านบนแล้วส่งเข้า LINE ได้ทันที</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0f3460]/5 text-[#0f3460] flex items-center justify-center flex-shrink-0 font-bold border border-[#0f3460]/10">3</div>
                      <div>
                        <p className="font-black text-[#0f3460] nav-font">รอรับการประสานงานเบื้องต้น</p>
                        <p className="text-gray-500 text-xs font-medium">เจ้าหน้าที่จะตอบกลับท่านในทันทีที่เห็นข้อความ</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col items-center gap-6 relative z-10">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-tr from-[#c5a059] to-[#0f3460] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all" />
                      <img 
                        src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/contact/Line%20OA%20@denmasterfa.jpg" 
                        alt="Line OA QR Code"
                        className="w-40 h-40 rounded-2xl shadow-xl border-4 border-white relative z-10"
                      />
                    </div>
                    <a 
                      href="https://lin.ee/nJIDttt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#06c755] text-white py-4 rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-6 h-6" />
                      เพิ่มเพื่อน LINE OA
                    </a>
                  </div>
                </div>

                <div className="pt-6 pb-4">
                  <button 
                    onClick={onClose}
                    className="text-[#0f3460] font-black hover:text-[#c5a059] transition-all nav-font flex items-center gap-2 mx-auto group"
                  >
                    กลับสู่หน้าหลัก <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
