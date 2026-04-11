import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, ChevronLeft, Check, 
  User, Phone, MessageSquare, AlertCircle,
  QrCode, Upload, Loader2, Sparkles,
  ArrowRight, ShieldCheck, Copy, CheckCheck,
  Zap, Users, Presentation, MessageCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { speakerService } from '../../lib/speakerService';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  instructorId: string;
  instructorName: string;
  lineOA: string;
  lineLink: string;
  initialService?: string;
  avatarUrl?: string;
}

type Step = 'intro' | 'info' | 'requirement' | 'payment' | 'completion';

const SERVICE_DETAILS: Record<string, any> = {
  speaking: {
    id: 'speaking',
    title: 'Keynote Speaking',
    subtitle: 'Powerful & Inspiring',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'บรรยายพิเศษแบบเน้นพลังงานและสร้างแรงบันดาลใจ'
  },
  training: {
    id: 'training',
    title: 'In-house Training',
    subtitle: 'Skill Transformation',
    icon: <Users className="w-6 h-6" />,
    description: 'จัดอบรมภายในองค์กร ออกแบบตามความต้องการ'
  },
  consulting: {
    id: 'consulting',
    title: 'Executive Consulting',
    subtitle: 'Strategic Guidance',
    icon: <Zap className="w-6 h-6" />,
    description: 'ปรึกษาผู้บริหารตัวต่อตัวหรือทีมงานกลยุทธ์'
  },
  workshop: {
    id: 'workshop',
    title: 'Focus Workshop',
    subtitle: 'Hands-on Learning',
    icon: <Presentation className="w-6 h-6" />,
    description: 'เวิร์กชอปกลุ่มย่อยที่เน้นการลงมือทำจริง'
  }
};

export const BookingWizard: React.FC<BookingWizardProps> = ({ 
  isOpen, 
  onClose, 
  instructorId,
  instructorName,
  lineOA,
  lineLink,
  initialService = 'speaking',
  avatarUrl
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

      // 1. Create Booking
      const booking = await speakerService.createBooking({
        instructor_id: instructorId,
        full_name: formData.full_name,
        email: formData.email || '',
        phone: formData.phone,
        line_id: formData.line_id,
        service_type: formData.selected_service,
        challenge: formData.challenge,
        expectation: formData.expectation
      });

      setBookingData(booking);

      // 2. Handle Slip Upload (Only if file exists, some might skip but we prefer it)
      let uploadPath = '';
      if (file) {
        const userFolder = user?.id || 'guest';
        const filePath = `speakers/${instructorId}/${userFolder}/${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('payment-slips')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        uploadPath = uploadData.path;

        // 3. Record Payment
        await speakerService.recordPayment(
          booking.id,
          0, // For speaker booking, we might not know price yet or use deposit
          'transfer',
          'pending',
          uploadPath,
          formData.transfer_date,
          formData.transfer_time
        );
      }

      // 4. Notify Admin via LINE
      try {
        let publicUrl = '';
        if (uploadPath) {
          const { data: { publicUrl: url } } = supabase.storage
            .from('payment-slips')
            .getPublicUrl(uploadPath);
          publicUrl = url;
        }

        await supabase.functions.invoke('line-notify', {
          body: { 
            formType: `Speaker Booking (${instructorName})`, 
            project: 'SPEAKER_BOOKING',
            data: {
              'วิทยากร': instructorName,
              'ประเภทบริการ': SERVICE_DETAILS[formData.selected_service]?.title || formData.selected_service,
              'Customer': formData.full_name,
              'Booking Code': booking.booking_code,
              'โทรศัพท์': formData.phone,
              'Line ID': formData.line_id,
              'ความท้าทาย': formData.challenge,
              'สิ่งที่คาดหวัง': formData.expectation,
              'วันที่ส่งหลักฐาน': formData.transfer_date,
              'เวลาที่ส่งหลักฐาน': formData.transfer_time,
              'Slip URL': publicUrl || 'ไม่มีหลักฐาน (ติดต่อภายหลัง)'
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
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt={instructorName} className="w-12 h-12 rounded-2xl object-cover shadow-lg border-2 border-white" />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Sparkles className="w-6 h-6" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-black text-[#0f3460] nav-font leading-none mb-1">Booking {instructorName}</h3>
              <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest">
                Step {step === 'intro' ? 1 : step === 'info' ? 2 : step === 'requirement' ? 3 : step === 'payment' ? 4 : 5} of 5
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <X className="w-6 h-6 text-gray-400 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-[#0f3460] nav-font leading-tight">สร้างผลลัพธ์ผ่าน <br /><span className="text-indigo-600">วิทยากรระดับแถวหน้า</span></h2>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">สถาบัน CAP Vision ขอขอบคุณที่ท่านไว้วางใจเลือก {instructorName} เพื่อพัฒนากลุ่มเป้าหมายของท่าน</p>
                </div>
                
                <div className="space-y-4 pt-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block">เลือกรูปแบบการจองที่สนใจ</label>
                  <div className="grid grid-cols-1 gap-3">
                    {(Object.keys(SERVICE_DETAILS)).map((key) => {
                      const service = SERVICE_DETAILS[key];
                      const isSelected = formData.selected_service === key;
                      return (
                        <div 
                          key={key}
                          onClick={() => setFormData({...formData, selected_service: key})}
                          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-indigo-200'}`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-black text-[#0f3460] text-sm leading-none mb-1">{service.title}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{service.subtitle}</p>
                          </div>
                          {isSelected && <div className="text-indigo-600"><Check className="w-5 h-5" /></div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 bg-indigo-50/30 rounded-2xl flex gap-4 border border-indigo-100/50">
                  <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-indigo-900 mb-0.5">Professional Handling</h4>
                    <p className="text-[11px] text-indigo-600 font-medium">ทีมงานสถาบันจะติดต่อกลับภายใน 24 ชม. เพื่อสรุปรายละเอียด</p>
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20 active:translate-y-1"
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
                   <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <User className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-black text-[#0f3460] nav-font">ข้อมูลผู้ติดต่อ</h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">ชื่อ-นามสกุล / ชื่อผู้ติดต่อ</label>
                    <input 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="ระบุชื่อจริงหรือชื่อบริษัท"
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Phone className="w-3 h-3 text-indigo-600" /> เบอร์โทรศัพท์
                      </label>
                      <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="09X-XXX-XXXX"
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare className="w-3 h-3 text-indigo-600" /> Line ID
                      </label>
                      <input 
                        name="line_id"
                        value={formData.line_id}
                        onChange={handleChange}
                        placeholder="@id"
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">อีเมลผู้ประสานงาน</label>
                    <input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="coordinator@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                    <ChevronLeft /> Back
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!formData.full_name || !formData.phone}
                    className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10 disabled:opacity-50"
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
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                      <Presentation size={60} />
                   </div>
                   <p className="text-[#0f3460] font-bold leading-relaxed relative z-10 italic">"ความสำเร็จของการบรรยาย เริ่มต้นจากการทำความเข้าใจเป้าหมายที่แท้จริงร่วมกัน"</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">ท่านมีหัวข้อ หรือ "โจทย์" สำคัญที่จะให้นำเสนอหรือพัฒนาหรือไม่?</label>
                    <textarea 
                      name="challenge"
                      value={formData.challenge}
                      onChange={handleChange}
                      rows={4}
                      placeholder="เช่น บรรยายทิศทางองค์กรประจำปี, พัฒนาทีมขายรุ่นใหม่..."
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-700 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">กลุ่มผู้ฟัง/ผู้รับการพัฒนา และจำนวนคนโดยประมาณ?</label>
                    <textarea 
                      name="expectation"
                      value={formData.expectation}
                      onChange={handleChange}
                      rows={3}
                      placeholder="เช่น ผู้บริหารระดับกลาง 50 ท่าน, พนักงานฝ่ายผลิต..."
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all font-medium text-slate-700 outline-none"
                    />
                  </div>

                  <label className="flex gap-4 p-6 bg-indigo-50/20 rounded-2xl cursor-pointer border border-indigo-100/30 group transition-all hover:bg-white hover:border-indigo-200">
                    <input 
                      type="checkbox" 
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-6 h-6 rounded-lg text-indigo-600 focus:ring-indigo-600 border-indigo-200 mt-1 cursor-pointer"
                    />
                    <div className="text-sm font-bold text-slate-600 leading-relaxed">
                      ฉันยืนยันข้อมูลและยินดีให้ทางสถาบันประสานงานกลับเพื่อเตรียมข้อเสนอ
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"><ChevronLeft /> Back</button>
                  <button 
                    onClick={nextStep} 
                    disabled={!formData.consent}
                    className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10 disabled:opacity-50"
                  >
                    Confirm Booking <ChevronRight />
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
                <div className="text-center space-y-2 mb-4">
                  <h3 className="text-2xl font-black text-[#0f3460] nav-font">ลงทะเบียนเพื่อจองวิทยากร</h3>
                  <p className="text-gray-500 font-bold px-4">ชำระค่าธรรมเนียมบริหารจัดการเบื้องต้น 500 บาทเพื่อรับการประสานงานด่วน (หักลบกับค่าวิทยากรเมื่อตกลงงานได้จริง)</p>
                </div>

                <div className="p-8 bg-[#f8fafc] rounded-3xl border border-slate-100 space-y-5 relative">
                   <div className="flex justify-between items-center">
                     <div className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Bank Transfer</div>
                     <div className="px-3 py-1 bg-white rounded-full font-black text-indigo-600 text-[10px] shadow-sm uppercase tracking-tighter">Fast Notification</div>
                   </div>
                   
                   <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-300 uppercase leading-none">Account Number</p>
                     <div className="flex items-center gap-3">
                       <p className="text-2xl font-black text-[#0f3460] tracking-tighter">098-3-66894-1</p>
                       <button 
                         onClick={() => {
                           navigator.clipboard.writeText('0983668941');
                           setCopied(true);
                           setTimeout(() => setCopied(false), 2000);
                         }}
                         className={`p-2 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white shadow-sm text-slate-400 hover:text-indigo-600'}`}
                       >
                         {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                       </button>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
                       <div className="space-y-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase">วันที่โอน</label>
                         <input 
                           type="date" 
                           name="transfer_date"
                           value={formData.transfer_date}
                           onChange={handleChange}
                           className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:border-indigo-600 outline-none"
                         />
                       </div>
                       <div className="space-y-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase">เวลาที่โอน</label>
                         <input 
                           type="time" 
                           name="transfer_time"
                           value={formData.transfer_time}
                           onChange={handleChange}
                           className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:border-indigo-600 outline-none"
                         />
                       </div>
                   </div>

                   <div className="pt-2">
                     <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-200 rounded-2xl py-8 cursor-pointer hover:border-indigo-600 transition-all bg-white group">
                       <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-600 mb-2" />
                       <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-600">{file ? file.name : 'อัปโหลดสลิปที่นี่'}</span>
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
                  <button onClick={prevStep} className="px-8 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"><ChevronLeft /> Back</button>
                  <button 
                    disabled={loading || !file}
                    onClick={handleSubmitBooking}
                    className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><QrCode className="w-5 h-5" /> ยืนยันข้อมูลการจอง</>}
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
                    <p className="text-gray-500 font-bold px-8 leading-relaxed">รหัสการจองของท่านถูกส่งไปยังทีมงานของสถาบันแล้ว เราจะเร่งดำเนินการให้ท่านโดยเร็วที่สุด</p>
                  </div>

                  <div className="bg-slate-50 w-full max-w-sm mx-auto p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600" />
                    
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">Reference Code</p>
                    
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <p className="text-4xl font-black text-indigo-600 tracking-tighter">
                        {bookingData?.booking_code || 'REF-ERR'}
                      </p>
                      <button 
                        onClick={() => {
                          const code = bookingData?.booking_code || '';
                          navigator.clipboard.writeText(code);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`p-3 rounded-2xl transition-all shadow-lg ${copied ? 'bg-green-500 text-white scale-110' : 'bg-slate-900 text-white hover:scale-110 active:scale-95'}`}
                      >
                        {copied ? <CheckCheck size={20} /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-8">ช่องทางการติดต่อด่วน: {lineOA}</p>
                  <a 
                    href={lineLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-sm bg-[#06c755] text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-8 h-8" />
                    ยืนยันผ่าน LINE ทันที
                  </a>
                  <button 
                    onClick={onClose}
                    className="text-slate-400 font-bold hover:text-indigo-600 transition-colors flex items-center gap-2"
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
