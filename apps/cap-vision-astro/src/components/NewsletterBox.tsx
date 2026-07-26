import React, { useState } from 'react';
import { TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('กรุณาใส่อีเมลที่ถูกต้อง');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. บันทึกลงฐานข้อมูล
      const { error: dbError } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (dbError) {
        if (dbError.code === '23505') { // Unique violation
          throw new Error('อีเมลนี้เคยลงทะเบียนไว้แล้วครับ');
        }
        throw dbError;
      }

      // 2. แจ้งเตือนผ่าน LINE Notify (Edge Function)
      try {
        await supabase.functions.invoke('line-notify', {
          body: {
            formType: 'Newsletter Subscription',
            data: {
              email: email,
              source: 'Website Newsletter Box',
              time: new Date().toLocaleString('th-TH')
            }
          }
        });
      } catch (notifyError) {
        console.error('Error sending LINE notice:', notifyError);
        // ไม่ throw error เพื่อให้ user ยังเห็น success ของการบันทึก email
      }

      setStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error('Subscription error:', error);
      setErrorMessage(error.message || 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50/50 rounded-[3rem] p-12 border border-green-100/50 relative overflow-hidden shadow-inner text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h4 className="text-xl font-black text-green-900 nav-font uppercase tracking-tighter mb-4">ขอบคุณที่ติดตามครับ!</h4>
        <p className="text-sm font-bold text-green-700 uppercase tracking-widest leading-relaxed">
          เราได้รับอีเมลของคุณแล้ว ทีมงานจะส่งความรู้ดีๆ ให้สัปดาห์ละครั้งครับ
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-xs font-black text-green-900/60 uppercase tracking-widest hover:text-green-900 transition-colors cursor-pointer"
        >
          ลงทะเบียนอีเมลอื่น
        </button>
      </div>
    );
  }

  return (
    <div className="bg-blue-50/50 rounded-[3rem] p-12 border border-blue-100/50 relative overflow-hidden shadow-inner">
      <TrendingUp className="w-12 h-12 text-blue-600/10 absolute -top-2 -right-2" />
      <h4 className="text-xl font-black text-[#0f3460] nav-font uppercase tracking-tighter mb-4">The Insight Weekly</h4>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 leading-relaxed">
        รับข้อมูลการพัฒนาคนและความคิดเชิงระบบ สัปดาห์ละ 1 ครั้งโดยครูเด่น
      </p>
      
      <form onSubmit={handleSubscribe} className="space-y-3">
        <div className="relative">
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className={`w-full rounded-xl py-4 px-6 text-sm bg-white border-transparent focus:ring-blue-100 focus:border-blue-100 transition-all font-medium ${status === 'error' ? 'border-red-300 ring-1 ring-red-100' : ''}`}
            required
          />
        </div>
        
        <button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#0f3460] text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] nav-font shadow-lg shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
              Processing...
            </>
          ) : 'Subscribe'}
        </button>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-500 mt-4 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewsletterBox;
