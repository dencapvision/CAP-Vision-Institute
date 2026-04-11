import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, ChevronLeft, Check, 
  User, Phone, MessageSquare, Mail, AlertCircle,
  QrCode, Upload, Loader2, Sparkles,
  ArrowRight, ShieldCheck, Copy, CheckCheck,
  Zap, Users, Presentation
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { drsoService } from '../../lib/drsoService';

interface DrSoBookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: 'personal' | 'private' | 'workshop';
}

type Step = 'intro' | 'info' | 'requirement' | 'payment' | 'completion';

const SERVICE_DETAILS = {
  personal: {
    id: 'personal_coaching',
    title: 'Personal Coaching',
    subtitle: 'High-Touch Mentorship',
    price: 15000,
    icon: <Zap className="w-6 h-6" />
  },
  private: {
    id: 'private_group',
    title: 'Private Group Coaching',
    subtitle: 'Strategic Communication',
    price: 35000,
    icon: <Users className="w-6 h-6" />
  },
  workshop: {
    id: 'workshop_training',
    title: 'Workshop & Training',
    subtitle: 'Corporate Transformation',
    price: 55000,
    icon: <Presentation className="w-6 h-6" />
  }
};

export const DrSoBookingWizard: React.FC<DrSoBookingWizardProps> = ({ 
  isOpen, 
  onClose, 
  initialService = 'personal' 
}) => {
  const [step, setStep] = useState<Step>('intro');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    line_id: '',
    email: '',
    challenge: '',
    expectation: '',
    consent: false,
    selected_service: initialService,
    transfer_date: new Date().toISOString().split('T')[0],
    transfer_time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => {
    if (step === 'intro') setStep('info');
    else if (step === 'info') setStep('requirement');
    else if (step === 'requirement') setStep('payment');
  };

  const prevStep = () => {
    if (step === 'info') setStep('intro');
    else if (step === 'requirement') setStep('info');
    else if (step === 'payment') setStep('requirement');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const serviceInfo = SERVICE_DETAILS[formData.selected_service];

      // 1. Create Booking
      const booking = await drsoService.createBooking(
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          line_id: formData.line_id,
          challenge: formData.challenge,
          expectation: formData.expectation
        },
        serviceInfo.id
      );

      setBookingData(booking);

      // 2. Handle Slip Upload
      if (!file) throw new Error('กรุณาอัปโหลดสลิปเพื่อยืนยันการชำระเงิน');

      const userFolder = user?.id || 'guest';
      const filePath = `drso/${userFolder}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-slips')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Record Payment
      await drsoService.recordPayment(
        booking.id,
        serviceInfo.price,
        uploadData.path,
        formData.transfer_date,
        formData.transfer_time
      );

      // 4. Notify Admin via LINE
      try {
        const { data: { publicUrl } } = supabase.storage
          .from('payment-slips')
          .getPublicUrl(uploadData.path);

        await supabase.functions.invoke('line-notify', {
          body: { 
            formType: `Dr. So Service (${serviceInfo.title})`, 
            project: 'DR_SO',
            data: {
              'Customer': formData.full_name,
              'Service': serviceInfo.title,
              'Booking Code': booking.booking_code,
              'Phone': formData.phone,
              'Line ID': formData.line_id,
              'Transfer Date': formData.transfer_date,
              'Transfer Time': formData.transfer_time,
              'Slip URL': publicUrl
            }
          }
        });
      } catch (notifyErr) {
        console.error('LINE notification failed:', notifyErr);
      }

      setStep('completion');

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
        className="absolute inset-0 bg-[#07111d]/90 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] border border-white/20"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f3460]/5 flex items-center justify-center text-[#0f3460]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0f3460] nav-font leading-none mb-1">Dr. So Service Booking</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Step {step === 'intro' ? 1 : step === 'info' ? 2 : step === 'requirement' ? 3 : step === 'payment' ? 4 : 5} of 5
              </p>
            </div>
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
                <div>
                  <h2 className="text-3xl font-black text-[#0f3460] mb-4 nav-font leading-tight">เริ่มต้นการเดินทางสู่ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f3460] to-[#c5a059]">การเป็นคุณที่ทรงพลังที่สุด</span></h2>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">กรุณาให้ข้อมูลเบื้องต้นเพื่อให้ Dr. So และทีมงานเตรียมการดูแลที่ดีที่สุดสำหรับคุณ</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#f8fafc] rounded-2xl border border-blue-50">
                    <ShieldCheck className="w-6 h-6 text-[#0f3460] mb-3" />
                    <h4 className="font-bold text-[#0f3460] mb-1">Confidential</h4>
                    <p className="text-xs text-gray-500 font-medium">ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุด</p>
                  </div>
                  <div className="p-5 bg-[#f8fafc] rounded-2xl border border-blue-50">
                    <Users className="w-6 h-6 text-[#c5a059] mb-3" />
                    <h4 className="font-bold text-[#0f3460] mb-1">Impact Driven</h4>
                    <p className="text-xs text-gray-500 font-medium">เน้นผลลัพธ์ที่เปลี่ยนแปลงได้จริงในระดับจิตใต้สำนึก</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">เลือกบริการที่สนใจ</label>
                  <div className="grid grid-cols-1 gap-3">
                    {(Object.keys(SERVICE_DETAILS) as Array<keyof typeof SERVICE_DETAILS>).map((key) => {
                      const service = SERVICE_DETAILS[key];
                      const isSelected = formData.selected_service === key;
                      return (
                        <div 
                          key={key}
                          onClick={() => setFormData({...formData, selected_service: key})}
                          className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${isSelected ? 'border-[#0f3460] bg-[#0f3460]/5' : 'border-gray-100 hover:border-[#0f3460]/20'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#0f3460] text-white' : 'bg-gray-100 text-gray-400'}`}>
                              {service.icon}
                            </div>
                            <div>
                              <p className="font-black text-[#0f3460] text-sm leading-none mb-1">{service.title}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{service.subtitle}</p>
                            </div>
                          </div>
                          <p className="font-black text-[#0f3460]">{service.price.toLocaleString()} THB</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full bg-[#0f3460] text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#0a2545] transition-all shadow-xl shadow-blue-900/20 active:translate-y-1"
                >
                  เริ่มดำเนินการจอง <ArrowRight className="w-6 h-6" />
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
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-12 h-12 rounded-full bg-[#0f3460]/5 flex items-center justify-center text-[#0f3460]">
                      <User className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-black text-[#0f3460] nav-font">ข้อมูลผู้ติดต่อ</h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">ชื่อ-นามสกุล</label>
                    <input 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="ระบุชื่อจริงของคุณ"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0f3460] focus:bg-white transition-all font-bold text-gray-700 outline-none"
                    />
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
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0f3460] focus:bg-white transition-all font-bold text-gray-700 outline-none"
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
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0f3460] focus:bg-white transition-all font-bold text-gray-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">อีเมล (สำหรับรับรหัสการจอง)</label>
                    <input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0f3460] focus:bg-white transition-all font-bold text-gray-700 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-[#0f3460] hover:bg-gray-50 transition-all flex items-center gap-2">
                    <ChevronLeft /> Back
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!formData.full_name || !formData.phone}
                    className="flex-1 bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0a2545] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50"
                  >
                    Next Step <ChevronRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'requirement' && (
              <motion.div 
                key="requirement"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-6 bg-[#0f3460]/5 rounded-3xl border border-[#0f3460]/10 mb-6">
                  <p className="text-[#0f3460] font-bold leading-relaxed italic">"เพื่อให้การพัฒนาเกิดขึ้นอย่างแม่นยำที่สุด Dr. So ต้องการทราบบางอย่างเกี่ยวกับคุณก่อนเริ่มงาน"</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">ปัจจุบันคุณกำลังเผชิญ "โจทย์" หรือ "ความท้าทาย" อะไร?</label>
                    <textarea 
                      name="challenge"
                      value={formData.challenge}
                      onChange={handleChange}
                      rows={4}
                      placeholder="เล่ารายละเอียดเพื่อให้เราประเมินแนวทางเบื้องต้น..."
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0f3460] focus:bg-white transition-all font-medium text-gray-700 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">คุณคาดหวัง "ผลลัพธ์" อย่างไรหลังจบการปรึกษา?</label>
                    <textarea 
                      name="expectation"
                      value={formData.expectation}
                      onChange={handleChange}
                      rows={3}
                      placeholder="เป้าหมายที่คุณต้องการทำให้สำเร็จ..."
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#0f3460] focus:bg-white transition-all font-medium text-gray-700 outline-none"
                    />
                  </div>

                  <label className="flex gap-4 p-6 bg-slate-50 rounded-2xl cursor-pointer border border-slate-100 group transition-all hover:bg-white hover:border-[#0f3460]/30 hover:shadow-xl hover:shadow-slate-200/50">
                    <input 
                      type="checkbox" 
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-6 h-6 rounded-lg text-[#0f3460] focus:ring-[#0f3460] border-gray-200 mt-1 cursor-pointer"
                    />
                    <div className="text-sm font-bold text-[#0f3460] leading-relaxed">
                      ฉันยินดีให้ข้อมูลเพื่อประโยชน์ในการวิเคราะห์และจัดทำแนวทางพัฒนาบุคคลรายตัวตามความเป็นจริง
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
                    Go to Payment <ChevronRight />
                  </button>
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
                   <div className="text-[#0f3460] font-black text-4xl mb-1">{SERVICE_DETAILS[formData.selected_service].price.toLocaleString()} THB</div>
                   <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Service Amount</div>
                </div>

                <div className="p-8 bg-[#f8fafc] rounded-3xl border border-gray-100 space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f3460]/5 rounded-full -mr-16 -mt-16" />
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Bank Transfer</div>
                    <div className="font-black text-[#0f3460] text-sm">ธนาคารกสิกรไทย</div>
                  </div>
                  
                  <div className="space-y-1 relative z-10">
                    <p className="text-[10px] font-black text-gray-300 uppercase leading-none">Account Number</p>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-black text-[#0f3460] tracking-tighter">098-3-66894-1</p>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('0983668941');
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`p-2 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white shadow-sm text-gray-400 hover:text-[#0f3460]'}`}
                      >
                        {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-gray-300 uppercase leading-none mb-1">Account Name</p>
                    <p className="font-black text-[#0f3460] text-lg">บจก.นิวไดซ์ (NewDice Co., Ltd.)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/50 relative z-10">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">วันที่โอน</label>
                        <input 
                          type="date" 
                          name="transfer_date"
                          value={formData.transfer_date}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0f3460] outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">เวลาที่โอน</label>
                        <input 
                          type="time" 
                          name="transfer_time"
                          value={formData.transfer_time}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#0f3460] outline-none"
                        />
                      </div>
                  </div>

                  <div className="pt-2 relative z-10">
                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-2xl py-8 cursor-pointer hover:border-[#0f3460] transition-all bg-white group">
                      <Upload className="w-8 h-8 text-gray-300 group-hover:text-[#0f3460] mb-2" />
                      <span className="text-sm font-bold text-gray-400 group-hover:text-[#0f3460]">{file ? file.name : 'อัปโหลดสลิปยืนยัน'}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={loading} />
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-[#0f3460] hover:bg-gray-50 transition-all flex items-center gap-2"><ChevronLeft /> Back</button>
                  <button 
                    disabled={loading || !file}
                    onClick={handleSubmitBooking}
                    className="flex-1 bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0a2545] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><QrCode className="w-5 h-5" /> ยืนยันข้อมูลการโอน</>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'completion' && (
              <motion.div 
                key="completion"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-4"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2 relative">
                   <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
                   <Check className="w-12 h-12 text-green-500 relative z-10" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="text-4xl font-black text-[#0f3460] nav-font leading-tight">ดำเนินการจองสำเร็จ!</h2>
                    <p className="text-gray-500 font-bold px-8 leading-relaxed">ข้อมูลของคุณถูกส่งให้ Dr. So แล้ว เราจะเร่งดำเนินการประสานงานให้เร็วที่สุด</p>
                  </div>

                  <div className="bg-[#f8fafc] w-full max-w-sm mx-auto p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-[#0f3460]" />
                    
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">Service Booking Code</p>
                    
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <p className="text-4xl font-black text-[#0f3460] tracking-tighter">
                        {bookingData?.booking_code || 'SO-ERR'}
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
                    <p className="text-[10px] font-bold text-gray-400 px-4">กรุณาก๊อปปี้รหัสการจองนี้ไว้เพื่อความรวดเร็วในการประสานงาน</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-8">ขั้นตอนสุดท้าย: ส่งรหัสยืนยันผ่าน LINE</p>
                  <a 
                    href={`https://line.me/R/oaMessage/@958wlshf/?รหัสการจองสำหรับคุณคือ: ${bookingData?.booking_code || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-sm bg-[#06c755] text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-8 h-8" />
                    ยืนยันรับบริการทาง LINE
                  </a>
                  <button 
                    onClick={onClose}
                    className="text-gray-400 font-bold hover:text-[#0f3460] transition-colors flex items-center gap-2"
                  >
                    กลับสู่หน้าโปรไฟล์ <ArrowRight className="w-4 h-4" />
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
