
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  CreditCard, 
  FileText, 
  Upload, 
  ArrowRight, 
  QrCode, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck,
  AlertCircle,
  Loader2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { ceoService } from '../lib/ceoService';

interface PackageInfo {
  id: string;
  name: string;
  price: number;
  type: 'consult' | 'full' | 'workshop';
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

interface SpeechfulnessRegistrationProps {
  selectedPackage: PackageInfo;
  onClose: () => void;
}

const SpeechfulnessRegistration: React.FC<SpeechfulnessRegistrationProps> = ({ selectedPackage, onClose }) => {
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
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // VAT Calculation
  const basePrice = selectedPackage.price;
  const vatAmount = formData.isVat ? basePrice * 0.07 : 0;
  const totalAmount = basePrice + vatAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1. Generate Booking Code
      const bookingCode = await ceoService.generateBookingCode('CEO-SF');

      // 2. Insert into Isolated Lead Table (No Auth Dependency)
      const { data: leadData, error: leadError } = await supabase
        .from('ceo_speechfulness_leads')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          line_id: formData.lineId,
          address: formData.address,
          tax_id: formData.taxId,
          package_name: selectedPackage.name,
          tier_id: selectedPackage.id,
          total_amount: totalAmount,
          booking_code: bookingCode,
          is_vat: formData.isVat,
          status: 'pending_payment'
        })
        .select()
        .single();

      if (leadError) throw leadError;

      setBookingId(leadData.id);
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

  const handleSubmitPayment = async () => {
    if (!slipFile || !bookingId) return;
    setLoading(true);
    
    try {
      // 1. Upload Slip to Independent Storage Bucket
      const fileName = `${bookingId}_${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ceo-media')
        .upload(`slips/${fileName}`, slipFile);

      if (uploadError) throw uploadError;

      const slipUrl = supabase.storage.from('ceo-media').getPublicUrl(`slips/${fileName}`).data.publicUrl;

      // 2. Update Lead Record with Slip and Status
      const { error: updateError } = await supabase
        .from('ceo_speechfulness_leads')
        .update({
          line_id: formData.lineId,
          email: formData.email,
          slip_url: slipUrl,
          status: 'paid',
          metadata: {
            payment_at: new Date().toISOString(),
            method: 'bank_transfer'
          }
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      // 3. Send LINE Notification
      const { data: notifyData, error: notifyError } = await supabase.functions.invoke('line-notify', {
        body: {
          project: 'CEO_SPEECHFULNESS',
          to: 'Ue652c6a963399b81a811eb04fe88c123',
          formType: 'ลงทะเบียน CEO Speechfulness (VIP)',
          data: {
            'โปรแกรม': 'CEO Speechfulness',
            'แพคเกจ': selectedPackage.name,
            'ลูกค้า': formData.fullName,
            'LINE ID': formData.lineId,
            'เบอร์โทร': formData.phone,
            'ยอดชำระ': `฿${totalAmount.toLocaleString()}`,
            'ออกใบกำกับภาษี': formData.isVat ? 'ใช่' : 'ไม่',
            'สลิปโอนเงิน': slipUrl
          }
        }
      });

      if (notifyError) {
        throw new Error(`LINE Notify Error: ${notifyError.message}`);
      }
      
      if (notifyData?.error) {
        throw new Error(`LINE API Error: ${notifyData.error}`);
      }

      setStep('success');
    } catch (err: any) {
      console.error('Payment submission error:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
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
          <h2 className="text-3xl md:text-4xl font-black text-[#0f3460] mb-2 nav-font">ลงทะเบียนสำเร็จ!</h2>
          <p className="text-lg text-[#0f3460]/60 font-medium mb-8">เราได้รับหลักฐานการชำระเงินเรียบร้อยแล้ว</p>
          
          {/* Automated Flow 1-2-3 */}
          <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-8 text-left border border-gray-100">
            <h3 className="text-[#0f3460] font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#0f3460] text-white rounded-full flex items-center justify-center text-sm">!</span> 
              ขั้นตอนสำคัญ 1-2-3 เพื่อเริ่มการปรึกษา
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center font-black text-[#c5a059] flex-shrink-0">1</div>
                <div>
                  <p className="font-black text-[#0f3460] text-sm">แอดไลน์ทีมงาน (LINE OA)</p>
                  <p className="text-xs text-gray-500 font-medium">สแกน QR Code ด้านล่าง หรือกดปุ่มเพิ่มเพื่อน</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center font-black text-[#c5a059] flex-shrink-0">2</div>
                <div>
                  <p className="font-black text-[#0f3460] text-sm">ส่ง "รหัสการจอง" เข้าแชท</p>
                  <div className="mt-1 px-3 py-1 bg-white border border-dashed border-[#c5a059] rounded-lg inline-block">
                    <span className="text-[#c5a059] font-black text-sm tracking-widest">{bookingId}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center font-black text-[#c5a059] flex-shrink-0">3</div>
                <div>
                  <p className="font-black text-[#0f3460] text-sm">รอรับคำปรึกษาเบื้องต้น</p>
                  <p className="text-xs text-gray-500 font-medium">เจ้าหน้าที่จะตอบกลับท่านในทันทีที่เห็นข้อความ</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR & Link */}
          <div className="mb-10">
            <div className="relative inline-block mb-6 group">
              <div className="absolute -inset-4 bg-gold-gradient opacity-20 blur-xl rounded-full transition-all group-hover:opacity-30"></div>
              <img 
                src="https://assets.capvisionpartner.com/media/contact/Line%20OA%20@denmasterfa.jpg" 
                alt="LINE OA @denmasterfa" 
                className="w-48 h-48 rounded-3xl shadow-2xl relative border-4 border-white"
              />
            </div>
            <p className="text-[#0f3460] font-black nav-font mb-6">Line OA : @denmasterfa</p>
            
            <a 
              href="https://lin.ee/nJIDttt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00b900] text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform"
            >
              เพิ่มเพื่อนทาง LINE
            </a>
          </div>

          <button 
            onClick={onClose}
            className="text-gray-400 font-bold hover:text-[#0f3460] transition-colors"
          >
            ปิดหน้าต่างนี้
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-xl flex items-start md:items-center justify-center p-4 md:py-12">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="bg-[#0f3460] p-8 md:p-12 text-white flex justify-between items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#c5a059] mb-2 block">Registration Process</span>
            <h2 className="text-3xl md:text-4xl font-black nav-font tracking-tight">
              สมัครเรียน: {selectedPackage.name}
            </h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex border-b border-gray-100">
          {[
            { id: 'register', label: 'ข้อมูลผู้สมัคร', icon: <User className="w-4 h-4" /> },
            { id: 'payment', label: 'ชำระเงิน', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'upload', label: 'อัปโหลดสลิป', icon: <Upload className="w-4 h-4" /> }
          ].map((s, idx) => (
            <div 
              key={s.id}
              className={`flex-1 py-5 px-4 text-center flex items-center justify-center gap-3 transition-colors ${
                step === s.id ? 'bg-gray-50 text-[#0f3460] font-black' : 'text-gray-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step === s.id ? 'bg-[#c5a059] text-white shadow-lg shadow-gold' : 'bg-gray-100'
              }`}>
                {idx + 1}
              </div>
              <span className="hidden md:inline text-sm uppercase tracking-wider font-bold nav-font">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-16">
          {error && (
            <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-2xl flex items-center gap-4 text-red-700 animate-in shake duration-500">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-bold">{error}</p>
            </div>
          )}

          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">ชื่อ-นามสกุล</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="fullName" 
                      required 
                      type="text" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" 
                      placeholder="ระบุชื่อ-นามสกุลจริง" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">อีเมล (ถ้ามี)</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" 
                      placeholder="email@example.com (ไม่บังคับ)" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">เบอร์โทรศัพท์ติดต่อ</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="phone" 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" 
                      placeholder="08X-XXX-XXXX" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-red-500">LINE ID (สำคัญเพื่อรับการโค้ชชิ่ง)</label>
                  <div className="relative">
                    <QrCode className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      name="lineId" 
                      required 
                      type="text" 
                      value={formData.lineId}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium border-2 border-red-50" 
                      placeholder="ระบุ LINE ID ของท่าน" 
                    />
                  </div>
                </div>
              </div>

              {/* VAT Section */}
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-black text-[#0f3460] nav-font">ต้องการใบกำกับภาษี?</h4>
                    <p className="text-sm text-gray-500 font-medium">คำนวณภาษีมูลค่าเพิ่ม (VAT) 7% เพิ่มเติมเข้ากับยอดชำระ</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="isVat"
                      checked={formData.isVat}
                      onChange={handleInputChange}
                      className="sr-only peer" 
                    />
                    <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#c5a059]"></div>
                  </label>
                </div>

                {formData.isVat && (
                  <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">เลขประจำตัวผู้เสียภาษี</label>
                      <input 
                        name="taxId" 
                        required={formData.isVat}
                        type="text" 
                        value={formData.taxId}
                        onChange={handleInputChange}
                        className="w-full px-6 py-5 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] font-medium" 
                        placeholder="13 หลัก หรือ เลขผู้เสียภาษีนิติบุคคล" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">ที่อยู่สำหรับออกใบเสร็จ</label>
                      <textarea 
                        name="address" 
                        required={formData.isVat}
                        rows={3} 
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-6 py-5 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#c5a059] font-medium" 
                        placeholder="เลขที่อาคาร ถนน แขวง/ตำบล..."
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-8 bg-[#0f3460] rounded-[2.5rem] text-white shadow-xl shadow-blue-900/20">
                <div>
                  <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">สรุปยอดชำระ</p>
                  <p className="text-3xl font-black nav-font tracking-tight">
                    ฿{totalAmount.toLocaleString()}
                    {formData.isVat && <span className="text-sm font-medium text-white/50 ml-2">(รวม VAT 7%)</span>}
                  </p>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-[#c5a059] hover:bg-white hover:text-[#0f3460] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center gap-3 group disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>ดำเนินการต่อ <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>}
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* QR Code Section */}
                <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 text-center">
                  <div className="bg-white p-6 rounded-[2rem] shadow-inner mb-6 inline-block">
                    {/* Placeholder for QR Code */}
                    <div className="w-48 h-48 bg-white flex items-center justify-center rounded-xl relative overflow-hidden shadow-sm">
                      <img 
                        src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/ceo_speechfulness/BBL-den%20masterfa.jpg" 
                        alt="BBL Payment QR" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-[#0f3460] mb-2 nav-font">Scan QR PromptPay</h4>
                  <p className="text-gray-500 text-sm font-medium">สแกนชำระเงินผ่าน Mobile Banking ทกธนาคาร</p>
                </div>

                {/* Bank Details Section */}
                <div className="space-y-8">
                  <div className="bg-[#0f3460]/5 p-8 rounded-3xl border border-[#0f3460]/10 border-l-8 border-l-[#c5a059]">
                    <h4 className="text-xs font-black text-[#c5a059] uppercase tracking-widest mb-4">โอนเงินเข้าบัญชีธนาคาร</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
                        <span className="text-gray-400 font-bold uppercase">ธนาคาร</span>
                        <span className="text-[#0f3460] font-black">กรุงเทพ (Bangkok Bank)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
                        <span className="text-gray-400 font-bold uppercase">ชื่อบัญชี</span>
                        <span className="text-[#0f3460] font-black">นายอนุสรณ์ หนองนา</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
                        <span className="text-gray-400 font-bold uppercase">เลขบัญชี</span>
                        <span className="text-2xl font-black text-[#0f3460]">925-013747-9</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-bold uppercase">สาขา</span>
                        <span className="text-[#0f3460] font-black">ถนนอโศกมนตรี</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gold-gradient/10 rounded-2xl flex items-start gap-4">
                    <ShieldCheck className="w-5 h-5 text-[#c5a059] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-bold text-[#b49048] nav-font mb-1">การชำระเงินที่ปลอดภัย</p>
                      <p className="text-xs text-[#0f3460]/60 font-medium">ข้อมูลการชำระเงินของท่านจะถูกเก็บรักษาเป็นความลับและใช้เพื่อการตรวจสอบเท่านั้น</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Summary Bar */}
              <div className="p-8 bg-gray-50 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
                <div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Total to pay</p>
                  <p className="text-3xl font-black text-[#0f3460] nav-font">฿{totalAmount.toLocaleString()}</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button 
                    onClick={() => setStep('register')}
                    className="flex-1 md:flex-none border-2 border-gray-100 bg-white text-[#0f3460] px-10 py-5 rounded-2xl font-black transition-all flex items-center gap-2 hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-5 h-5" /> ย้อนกลับ
                  </button>
                  <button 
                    onClick={() => setStep('upload')}
                    className="flex-1 md:flex-none bg-[#0f3460] text-white px-12 py-5 rounded-2xl font-black transition-all shadow-xl hover:bg-[#c5a059] flex items-center justify-center gap-2"
                  >
                    ไปขั้นตอนแจ้งโครงการ <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'upload' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="text-center max-w-lg mx-auto mb-10">
                <div className="w-20 h-20 bg-[#0f3460]/5 text-[#0f3460] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-[#0f3460] mb-4 nav-font">อัปโหลดหลักฐานการชำระเงิน</h4>
                <p className="text-gray-500 font-medium">
                  กรุณาแนบสลิปการโอนเงินเพื่อยืนยันการสมัครเรียน <br />
                  เจ้าหน้าที่จะใช้เวลาตรวจสอบประมาณ 1-2 วันทำการ
                </p>
              </div>

              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`p-16 border-4 border-dashed rounded-[3rem] transition-all flex flex-col items-center justify-center text-center ${
                  slipFile ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-gray-50 group-hover:border-[#c5a059]'
                }`}>
                  {slipFile ? (
                    <>
                      <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <p className="text-xl font-black text-green-700 nav-font mb-2">เลือกไฟล์เรียบร้อย!</p>
                      <p className="text-sm text-green-600 font-medium">{slipFile.name}</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-white text-[#0f3460]/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <FileText className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-bold text-[#0f3460] nav-font mb-2">ลากไฟล์สลิปมาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์</p>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Supports: JPG, PNG, PDF (Max 10MB)</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep('payment')}
                  disabled={loading}
                  className="flex-1 border-2 border-gray-100 bg-white text-[#0f3460] py-6 rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5" /> ย้อนกลับ
                </button>
                <button 
                  onClick={handleSubmitPayment}
                  disabled={!slipFile || loading}
                  className="flex-[2] bg-[#0f3460] text-white py-6 rounded-2xl font-black text-xl transition-all shadow-2xl hover:bg-[#c5a059] flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <>ยืนยันการลงทะเบียน <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /></>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechfulnessRegistration;
