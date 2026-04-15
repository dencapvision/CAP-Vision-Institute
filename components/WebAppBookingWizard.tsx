
import React, { useState } from 'react';
import { 
  CheckCircle, 
  CreditCard, 
  FileText, 
  Upload, 
  ArrowRight, 
  QrCode, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck,
  AlertCircle,
  Loader2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  MessageCircle,
  Building2
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { ceoService } from '../lib/ceoService';

interface PackageInfo {
  id: string;
  name: string;
  price: number;
  stripeLink?: string;
  features: string[];
}

interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  lineId: string;
  isVat: boolean;
  taxId?: string;
  address?: string;
}

interface WebAppBookingWizardProps {
  selectedPackage: PackageInfo;
  onClose: () => void;
}

const WebAppBookingWizard: React.FC<WebAppBookingWizardProps> = ({ selectedPackage, onClose }) => {
  const [step, setStep] = useState<'register' | 'payment' | 'upload' | 'success'>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    lineId: '',
    isVat: false,
    taxId: '',
    address: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    senderAccount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentTime: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false }),
  });
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingCode, setBookingCode] = useState<string | null>(null);

  // VAT Calculation
  const basePrice = selectedPackage.price;
  const vatAmount = formData.isVat ? basePrice * 0.07 : 0;
  const totalAmount = basePrice + vatAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handlePaymentDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1. Generate Booking Code (Prefix WA for Web App)
      const code = await ceoService.generateBookingCode('WA');

      // 2. Insert into Web App Bookings Table
      const { data: bookingData, error: bookingError } = await supabase
        .from('web_app_bookings')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          line_id: formData.lineId,
          package_name: selectedPackage.name,
          plan_id: selectedPackage.id,
          total_amount: totalAmount,
          booking_code: code,
          is_vat: formData.isVat,
          status: 'pending_payment',
          metadata: {
            tax_id: formData.taxId,
            address: formData.address
          }
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      setBookingId(bookingData.id);
      setBookingCode(code);
      setStep('payment');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSlipFile(e.target.files[0]);
    }
  };

  const handleSubmitPayment = async (method: 'transfer' | 'stripe') => {
    if (method === 'transfer' && !slipFile) {
        setError('กรุณาอัปโหลดสลิปเพื่อยืนยันการโอนเงิน');
        return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let slipUrl = null;

      if (method === 'transfer' && slipFile && bookingId) {
        // 1. Upload Slip
        const fileName = `webapp_${bookingId}_${Date.now()}.jpg`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('ceo-media')
          .upload(`slips/${fileName}`, slipFile);

        if (uploadError) throw uploadError;
        slipUrl = supabase.storage.from('ceo-media').getPublicUrl(`slips/${fileName}`).data.publicUrl;
      }

      // 2. Update Booking Record
      const { error: updateError } = await supabase
        .from('web_app_bookings')
        .update({
          slip_url: slipUrl,
          payment_method: method,
          status: method === 'transfer' ? 'paid' : 'pending_stripe', 
          metadata: {
            ...formData,
            ...paymentDetails,
            payment_at: new Date().toISOString(),
          }
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      // 3. Send LINE Notification (Using centralized line-notify)
      const { data: notifyData, error: notifyError } = await supabase.functions.invoke('line-notify', {
        body: {
          project: 'WEB_APP',
          formType: 'Web App Booking',
          data: {
            'โครงการ': selectedPackage.name,
            'ชื่อลูกค้า': formData.fullName,
            'เบอร์โทร': formData.phone,
            'LINE ID': formData.lineId,
            'ยอดเงิน': `฿${totalAmount.toLocaleString()}`,
            'ช่องทาง': method === 'stripe' ? 'บัตรเครดิต (Stripe)' : 'โอนเงินผ่านธนาคาร',
            'Booking Code': bookingCode,
            'เลขบัญชีที่โอน (4 ตัวท้าย)': paymentDetails.senderAccount || '-',
            'วันที่โอน': paymentDetails.paymentDate || '-',
            'เวลาที่โอน': paymentDetails.paymentTime || '-',
            'slip_url': slipUrl
          }
        }
      });

      console.log('LINE Notify Response:', notifyData);
      if (notifyError) {
        console.error('LINE Notify Error:', notifyError);
      }

      setStep('success');
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 md:p-14 text-center animate-in zoom-in duration-500 overflow-y-auto max-h-[90vh]">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] mb-2 nav-font">สมัครสำเร็จ 🎉</h2>
          <p className="text-lg text-[#0f3460]/60 font-medium mb-8">รหัสการจองของคุณคือ: <strong>{bookingCode}</strong></p>
          
          <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-8 text-left border border-gray-100">
            <h3 className="text-[#0f3460] font-black mb-6 flex items-center gap-2">
              ขั้นตอนต่อไปเพื่อรับบริการ
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center font-black text-[#c5a059] flex-shrink-0">1</div>
                <div>
                  <p className="font-black text-[#0f3460] text-sm">แอด LINE ทีมงาน</p>
                  <a href="https://lin.ee/nJIDttt" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-xs">คลิกเพื่อเพิ่มเพื่อน @denmasterfa</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center font-black text-[#c5a059] flex-shrink-0">2</div>
                <div>
                  <p className="font-black text-[#0f3460] text-sm">ส่งรหัสการจองเข้าแชท</p>
                  <p className="text-xs text-gray-500">ส่งรหัส: <span className="font-bold text-[#0f3460]">{bookingCode}</span></p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center font-black text-[#c5a059] flex-shrink-0">3</div>
                <div>
                  <p className="font-black text-[#0f3460] text-sm">รอทีมงานติดต่อกลับ</p>
                  <p className="text-xs text-gray-500">ทีมงานจะเริ่มดำเนินงานตามแพ็กเกจที่ท่านเลือกทันที</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10 text-center">
            <img 
                src="https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/contact/Line%20OA%20@denmasterfa.jpg" 
                alt="LINE OA" 
                className="w-40 h-40 mx-auto rounded-2xl shadow-lg mb-4"
            />
            <a 
              href="https://lin.ee/nJIDttt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00b900] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" /> ทักแชทคุยกับทีมงาน
            </a>
          </div>

          <button onClick={onClose} className="text-gray-400 font-bold hover:text-[#0f3460] transition-colors">ปิดหน้าต่างนี้</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-xl flex items-start md:items-center justify-center p-4 md:py-12">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="bg-[#0f3460] p-8 md:p-10 text-white flex justify-between items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#c5a059] mb-2 block">Premium Web App Service</span>
            <h2 className="text-2xl md:text-3xl font-black nav-font tracking-tight">สมัคร: {selectedPackage.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          {[
            { id: 'register', label: 'ข้อมูลธุรกิจ', icon: <User className="w-4 h-4" /> },
            { id: 'payment', label: 'ชำระเงิน', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'upload', label: 'หลักฐานโอน', icon: <Upload className="w-4 h-4" /> }
          ].map((s, idx) => (
            <div 
              key={s.id}
              className={`flex-1 py-4 px-2 text-center flex items-center justify-center gap-2 transition-colors ${
                step === s.id ? 'text-[#0f3460] font-black' : 'text-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === s.id ? 'bg-[#c5a059] text-white shadow-md' : 'bg-gray-200'
              }`}>
                {idx + 1}
              </div>
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-bold">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-center gap-3 text-red-700 animate-in shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ชื่อผู้ติดต่อ / ชื่อบริษัท</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      name="fullName" required type="text" value={formData.fullName} onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" 
                      placeholder="ระบุชื่อจริงหรือชื่อบริษัท" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">อีเมล</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      name="email" type="email" value={formData.email} onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" 
                      placeholder="เพื่อรับใบแจ้งหนี้และสัญญางาน" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">เบอร์โทรศัพท์</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      name="phone" required type="tel" value={formData.phone} onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" 
                      placeholder="08X-XXX-XXXX" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">LINE ID (เพื่อให้ทีมงานติดต่อคุยรายละเอียดได้ง่าย)</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      name="lineId" required type="text" value={formData.lineId} onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] outline-none" 
                      placeholder="ระบุ LINE ID ของท่าน" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#0f3460]">ต้องการใบกำกับภาษี (VAT 7%)</h4>
                  <p className="text-xs text-gray-400">คลิกหากท่านต้องการหักภาษีในนามบริษัท</p>
                </div>
                <input 
                    type="checkbox" name="isVat" checked={formData.isVat} onChange={handleInputChange}
                    className="w-6 h-6 rounded accent-[#c5a059]"
                />
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Package Price</p>
                  <p className="text-2xl font-black text-[#0f3460]">฿{totalAmount.toLocaleString()}</p>
                </div>
                <button 
                  type="submit" disabled={loading}
                  className="bg-[#c5a059] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>ไปที่หน้าชำระเงิน <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Option 1: Credit Card (Stripe) */}
                {selectedPackage.stripeLink && (
                    <div className="p-8 border-2 border-blue-100 rounded-[2.5rem] bg-blue-50/30 flex flex-col items-center text-center">
                        <CreditCard className="w-12 h-12 text-blue-500 mb-4" />
                        <h4 className="text-xl font-black text-[#0f3460] mb-2">บัตรเครดิต / เดบิต</h4>
                        <p className="text-sm text-gray-500 mb-6">ชำระผ่านระบบ Stripe ปลอดภัย พร้อมรับแต้มจากบัตร</p>
                        <a 
                            href={selectedPackage.stripeLink} 
                            target="_blank" rel="noopener noreferrer"
                            onClick={() => handleSubmitPayment('stripe')}
                            className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 shadow-lg"
                        >
                            ชำระออนไลน์ <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                )}

                {/* Option 2: Bank Transfer */}
                <div className={`p-8 border-2 border-orange-100 rounded-[2.5rem] bg-orange-50/30 flex flex-col items-center text-center ${!selectedPackage.stripeLink ? 'md:col-span-2' : ''}`}>
                    <QrCode className="w-12 h-12 text-orange-500 mb-4" />
                    <h4 className="text-xl font-black text-[#0f3460] mb-2">โอนเงินผ่านธนาคาร (QR)</h4>
                    <p className="text-sm text-gray-500 mb-6">สแกน QR เพื่อโอนเงินเข้าบัญชีบริษัทโดยตรง</p>
                    <button 
                        onClick={() => setStep('upload')}
                        className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 shadow-lg"
                    >
                        แสดง QR & อัปโหลดสลิป <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
              </div>

              <div className="flex justify-start">
                <button onClick={() => setStep('register')} className="text-gray-400 font-bold flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> ย้อนกลับ</button>
              </div>
            </div>
          )}

          {step === 'upload' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="bg-[#0f172a] p-10 rounded-[3rem] border-2 border-[#c5a059]/30 text-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all duration-700">
                      <QrCode className="w-32 h-32 text-white" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white p-4 rounded-3xl shadow-2xl mb-8 transform group-hover:scale-105 transition-transform duration-500">
                            <img 
                              src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/ceo_speechfulness/BBL-den%20masterfa.jpg" 
                              alt="Payment QR" 
                              className="w-48 h-48 rounded-xl"
                            />
                        </div>
                        
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 bg-[#c5a059]/20 px-4 py-1.5 rounded-full border border-[#c5a059]/40 mb-2">
                                <Building2 className="w-3.5 h-3.5 text-[#c5a059]" />
                                <span className="text-[#c5a059] font-black text-[10px] uppercase tracking-[0.2em]">ธนาคารกรุงเทพ (BBL)</span>
                            </div>
                            <p className="text-4xl md:text-5xl font-black text-white tracking-tighter nav-font">
                                925-0137-479
                            </p>
                            <div className="pt-2">
                               <p className="text-lg font-black text-gray-100 flex items-center justify-center gap-2">
                                   <User className="w-5 h-5 text-[#c5a059]" />
                                   นายอนุสรณ์ หนองนา
                               </p>
                               <p className="text-xs text-gray-400 font-bold mt-2 bg-white/5 inline-block px-4 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                                   ออมทรัพย์ • สาขาถนนอโศกมนตรี
                               </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3 p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-[#c5a059] transition-all">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <CreditCard className="w-3 h-3 text-[#c5a059]" /> เลขบัญชี 4 ตัวท้าย
                    </label>
                    <input 
                      name="senderAccount" type="text" value={paymentDetails.senderAccount} onChange={handlePaymentDetailChange}
                      className="w-full px-4 py-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-[#c5a059] outline-none font-black text-xl text-[#0f3460]" 
                      placeholder="xxxx" maxLength={4}
                    />
                  </div>
                  <div className="space-y-3 p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-[#c5a059] transition-all">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="w-3 h-3 text-[#c5a059]" /> วันที่โอนเงิน
                    </label>
                    <input 
                      name="paymentDate" type="date" value={paymentDetails.paymentDate} onChange={handlePaymentDetailChange}
                      className="w-full px-4 py-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-[#c5a059] outline-none font-black text-lg text-[#0f3460] [color-scheme:light]" 
                    />
                  </div>
                  <div className="space-y-3 p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-[#c5a059] transition-all">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Loader2 className="w-3 h-3 text-[#c5a059]" /> เวลาที่โอนเงิน
                    </label>
                    <input 
                      name="paymentTime" type="time" value={paymentDetails.paymentTime} onChange={handlePaymentDetailChange}
                      className="w-full px-4 py-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-[#c5a059] outline-none font-black text-lg text-[#0f3460] [color-scheme:light]" 
                    />
                  </div>
                </div>

                <div className="relative group p-10 border-4 border-dashed rounded-3xl border-gray-100 bg-gray-50 text-center hover:border-[#c5a059] transition-all">
                    <input 
                      type="file" accept="image/*" onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {slipFile ? (
                        <div className="text-green-600 font-bold flex flex-col items-center">
                            <CheckCircle className="w-10 h-10 mb-2" />
                            <span>{slipFile.name} (พร้อมส่ง)</span>
                        </div>
                    ) : (
                        <div className="text-gray-400 font-bold flex flex-col items-center">
                            <Upload className="w-10 h-10 mb-2" />
                            <span>คลิกเพื่อเลือกไฟล์สลิป</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button onClick={() => setStep('payment')} className="flex-1 bg-gray-100 font-bold py-4 rounded-xl">ย้อนกลับ</button>
                    <button 
                        onClick={() => handleSubmitPayment('transfer')} 
                        disabled={!slipFile || loading}
                        className="flex-[2] bg-[#0f3460] text-white font-bold py-4 rounded-xl disabled:opacity-50 shadow-xl"
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : "แจ้งชำระเงินเรียบร้อย"}
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebAppBookingWizard;
