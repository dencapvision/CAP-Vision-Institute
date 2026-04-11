import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, ChevronRight, ChevronLeft, CreditCard, 
  Calendar, Users, Rocket, Sparkles, Send, Copy, ExternalLink 
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { courseService } from '../../lib/courseService';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CourseConfig = {
  name: "ก้าวแรกสู่ วิทยากรจิตใต้สำนึก",
  dates: "20-21 พฤษภาคม 2569",
  location: "กรุงเทพฯ (สถานที่แจ้งให้ทราบภายหลัง)",
  seats: 20,
  packages: {
    early_bird: {
      id: "early_bird",
      name: "Early Bird 🕊️",
      price: 6500,
      description: "สมัครล่วงหน้า รับส่วนลดพิเศษ"
    },
    regular: {
      id: "regular",
      name: "Normal Rate 💎",
      price: 12500,
      description: "ราคาปกติสำหรับการอบรม"
    }
  },
  bank: {
    name: "ธนาคารไทยพาณิชย์ (SCB)",
    accountNumber: "383-4-80629-4",
    accountName: "บริษัท สไมล์ลิ่งไดม่อน จำกัด",
    type: "ออมทรัพย์",
    lineLink: "https://lin.ee/6Baop7M"
  },
  images: {
    hero: "https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Den%20Masterfa%20Gallery/denmasterfa.jpg",
    success: "https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class2.jpg",
    bank: "https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/dr.so_healing/dr.so_class3.jpg"
  }
};

const BookingWizard: React.FC<BookingWizardProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    lineId: '',
    occupation: '',
    goals: '',
    packageId: 'early_bird'
  });

  const [bookingResult, setBookingResult] = useState<{ id: string; code: string } | null>(null);
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0]);
  const [transferTime, setTransferTime] = useState(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false }));

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setPaymentImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPaymentPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submitRegistration = async () => {
    setLoading(true);
    setError(null);
    try {
      const booking = await courseService.createBooking({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        line_id: formData.lineId,
        occupation: formData.occupation,
        goals: formData.goals
      }, formData.packageId);

      setBookingResult({ id: booking.id, code: booking.booking_code });
      
      // Notify Admin via LINE (Registration Phase)
      await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1/line-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          project: 'SUB_SPEAKER',
          formType: 'ลงทะเบียนใหม่',
          data: {
            'Course': CourseConfig.name,
            'Name': formData.fullName,
            'Phone': formData.phone,
            'Line ID': formData.lineId,
            'Package': formData.packageId === 'early_bird' ? 'Early Bird' : 'Regular',
            'Booking Code': booking.booking_code,
            'Status': '🔴 รอชำระเงิน'
          }
        })
      });

      handleNext();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadSlipAndComplete = async () => {
    if (!paymentImage || !bookingResult) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Upload Slip Image
      const fileName = `${bookingResult.code}_${Date.now()}.png`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('slips')
        .upload(`courses/${fileName}`, paymentImage);

      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('slips')
        .getPublicUrl(`courses/${fileName}`);

      // 2. Record Payment
      const selectedPackage = CourseConfig.packages[formData.packageId as keyof typeof CourseConfig.packages];
      await courseService.recordPayment(
        bookingResult.id,
        selectedPackage.price,
        publicUrl,
        transferDate,
        transferTime
      );

      // 3. Notify Admin via LINE (Payment Phase)
      await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1/line-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          project: 'SUB_SPEAKER',
          formType: 'แจ้งโอนเงิน',
          data: {
            'Booking Code': bookingResult.code,
            'Name': formData.fullName,
            'Amount': `${selectedPackage.price.toLocaleString()} THB`,
            'Date': transferDate,
            'Time': transferTime,
            'Evidence': publicUrl,
            'Status': '🟡 รอตรวจสอบสลิป'
          }
        })
      });

      handleNext();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification if available
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
              <div>
                <h3 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  สมัครอบรมวิทยากรจิตใต้สำนึก
                </h3>
                <p className="text-sm text-gray-500">{CourseConfig.dates}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Stepper */}
            <div className="px-8 py-4 bg-gray-50/50 flex justify-between items-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > i ? <Check className="w-4 h-4" /> : i}
                  </div>
                  {i < 4 && (
                    <div className={`w-12 h-1 mx-2 rounded ${
                      step > i ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-start gap-3">
                  <div className="mt-0.5">⚠️</div>
                  <p>{error}</p>
                </div>
              )}

              {/* STEP 1: Package Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-navy-900">เลือกแพ็กเกจที่คุณต้องการ</h4>
                    <p className="text-gray-500 text-sm mt-2">จำกัดความรู้สู่ 20 ท่านผู้มีหัวใจวิทยากรเท่านั้น</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.values(CourseConfig.packages).map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setFormData(f => ({ ...f, packageId: pkg.id }))}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.packageId === pkg.id 
                            ? 'border-blue-600 bg-blue-50/30' 
                            : 'border-gray-100 hover:border-blue-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className="font-bold text-navy-900">{pkg.name}</span>
                          {formData.packageId === pkg.id && <Check className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div className="text-2xl font-bold text-blue-700 mb-1">
                          ฿{pkg.price.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-500">{pkg.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Information */}
              {step === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700">ชื่อ-นามสกุล (สำหรับใบประกาศ)</label>
                    <input 
                      type="text" 
                      placeholder="ระบุชื่อ-นามสกุลจริง"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      value={formData.fullName}
                      onChange={e => setFormData(f => ({ ...f, fullName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">เบอร์โทรศัพท์</label>
                    <input 
                      type="tel" 
                      placeholder="08X-XXX-XXXX"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
                      value={formData.phone}
                      onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Line ID</label>
                    <input 
                      type="text" 
                      placeholder="@lineid"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
                      value={formData.lineId}
                      onChange={e => setFormData(f => ({ ...f, lineId: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700">เป้าหมายในการเรียน (หากมี)</label>
                    <textarea 
                      placeholder="เช่น ต้องการเป็นวิทยากรมืออาชีพ, พัฒนาศักยภาพพนักงาน ฯลฯ"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none min-h-[100px]"
                      value={formData.goals}
                      onChange={e => setFormData(f => ({ ...f, goals: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Payment & Slip Upload */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Bank Account Details */}
                  <div className="p-6 bg-navy-900 rounded-3xl text-white shadow-xl mb-8 relative overflow-hidden group min-h-[220px]">
                    <div className="absolute inset-0 opacity-20 transition-transform group-hover:scale-110 duration-700">
                      <img src={CourseConfig.images.bank} alt="Bank Background" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-900/40" />
                    <div className="relative z-10">
                      <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">ช่องทางชำระเงิน</p>
                      <h4 className="text-2xl font-bold mb-6">{CourseConfig.bank.name}</h4>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors">
                          <div>
                            <p className="text-white/60 text-xs">เลขที่บัญชี</p>
                            <p className="text-xl font-mono tracking-wider">{CourseConfig.bank.accountNumber}</p>
                          </div>
                          <button 
                            onClick={() => copyToClipboard(CourseConfig.bank.accountNumber)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors flex items-center gap-2 text-sm"
                          >
                            <Copy className="w-4 h-4" /> คัดลอก
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/60 text-xs">ชื่อบัญชี</p>
                            <p className="font-semibold">{CourseConfig.bank.accountName}</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-xs">ประเภท</p>
                            <p className="font-semibold">{CourseConfig.bank.type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">แพ็กเกจที่เลือก</p>
                      <p className="text-navy-900 font-bold">{CourseConfig.packages[formData.packageId as keyof typeof CourseConfig.packages].name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">ยอดเงินที่ต้องโอน</p>
                      <p className="text-xl font-black text-blue-700">฿{CourseConfig.packages[formData.packageId as keyof typeof CourseConfig.packages].price.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Transfer Details Form */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">วันที่โอน (ระบุในสลิป)</label>
                      <input 
                        type="date" 
                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
                        value={transferDate}
                        onChange={e => setTransferDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">เวลาที่โอน</label>
                      <input 
                        type="time" 
                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
                        value={transferTime}
                        onChange={e => setTransferTime(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Slip Upload */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700">อัปโหลดสลิปหลักฐาน</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        id="slip-upload"
                        onChange={handleImageChange}
                      />
                      <label 
                        htmlFor="slip-upload"
                        className={`block p-8 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all ${
                          paymentPreview ? 'border-green-400 bg-green-50/10' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/10'
                        }`}
                      >
                        {paymentPreview ? (
                          <div className="space-y-2">
                            <img src={paymentPreview} alt="Slip" className="max-h-[200px] mx-auto rounded-lg shadow-md" />
                            <p className="text-sm text-green-600 font-bold">✓ อัปโหลดสลิปแล้ว คลิกเพื่อเปลี่ยน</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                              <CreditCard className="w-6 h-6" />
                            </div>
                            <p className="font-semibold text-navy-900">กดเลือกไฟล์รูปภาพสลิป</p>
                            <p className="text-xs text-gray-400">รองรับไฟล์ JPG, PNG</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Confirmation & Next Steps */}
              {step === 4 && (
                <div className="text-center py-4 space-y-6">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                    <div className="relative z-10 w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-600 overflow-hidden border-4 border-white shadow-lg">
                      <img src={CourseConfig.images.success} alt="Success" className="w-full h-full object-cover opacity-60" />
                      <Check className="w-12 h-12 absolute z-20" />
                    </div>
                  </div>
                  <h4 className="text-3xl font-black text-navy-900 underline decoration-blue-500/30">สำเร็จ! รอการตรวจสอบ</h4>
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">รหัสยืนยันการสมัครของคุณ</p>
                      <p className="text-2xl font-black text-navy-900 tracking-tighter">{bookingResult?.code}</p>
                    </div>
                    <p className="text-gray-600">กดปุ่มด้านล่างเพื่อแอดไลน์และส่งรหัส <span className="font-bold text-navy-900 border-b-2 border-blue-500">{bookingResult?.code}</span> ให้เจ้าหน้าที่เพื่อรับการประสานงานขั้นต่อไป</p>
                  </div>

                  <div className="pt-8 space-y-4">
                    <a 
                      href={CourseConfig.bank.lineLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#00B900] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 hover:scale-[1.02] transition-transform"
                    >
                      <Send className="w-6 h-6" /> แอดไลน์และส่งรหัสยืนยัน
                    </a>
                    <button 
                      onClick={onClose}
                      className="w-full text-gray-400 font-bold py-2 hover:text-navy-900 transition-colors"
                    >
                      เสร็จสิ้น กลับสู่หน้าหลัก
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footer */}
            {step < 4 && (
              <div className="p-6 border-t border-gray-100 bg-white flex justify-between gap-4">
                {step > 1 && (
                  <button 
                    onClick={handleBack}
                    disabled={loading}
                    className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" /> ย้อนกลับ
                  </button>
                )}
                
                <div className="flex-1" />

                {step === 1 && (
                  <button 
                    onClick={handleNext}
                    className="px-10 py-4 bg-navy-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/10"
                  >
                    ดำเนินการต่อ <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {step === 2 && (
                  <button 
                    onClick={submitRegistration}
                    disabled={loading || !formData.fullName || !formData.phone}
                    className="px-10 py-4 bg-navy-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-navy-800 disabled:opacity-50 transition-all shadow-xl shadow-navy-900/10"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        กำลังลงทะเบียน...
                      </span>
                    ) : (
                      "ลงทะเบียนและรับรหัสชำระเงิน"
                    )}
                  </button>
                )}

                {step === 3 && (
                  <button 
                    onClick={uploadSlipAndComplete}
                    disabled={loading || !paymentImage}
                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xl shadow-blue-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        กำลังตรวจสอบ...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        ยืนยันการแจ้งโอน <Rocket className="w-5 h-5" />
                      </span>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingWizard;
