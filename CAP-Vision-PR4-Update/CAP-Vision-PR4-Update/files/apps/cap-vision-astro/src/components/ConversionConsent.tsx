import { useEffect, useState } from 'react';
import { trackConversion } from '../lib/conversion.mjs';
export default function ConversionConsent() {
  const [choice, setChoice] = useState<string | null>(null);
  useEffect(() => {
    try { setChoice(localStorage.getItem('cap_analytics_consent')); } catch { setChoice('denied'); }
    const click = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.('a');
      const href = a?.getAttribute('href') || '';
      const channel = href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : /^https:\/\/(lin\.ee|line\.me)\//.test(href) ? 'line' : href === '/contact' ? 'consultation' : null;
      if (channel) trackConversion('cta_click', channel);
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  function choose(value: string) {
    try { localStorage.setItem('cap_analytics_consent', value); } catch { /* no tracking without storage */ }
    setChoice(value);
    if (value === 'granted' && location.pathname === '/contact') trackConversion('contact_view');
  }
  return <aside aria-label="การวัดผลเว็บไซต์" className="bg-white border-t p-4 text-sm text-gray-700">
    {choice === null ? <div className="flex flex-wrap items-center gap-3">
      <p>อนุญาตให้วัดจำนวนการคลิกและการส่งฟอร์มเพื่อปรับปรุงเว็บไซต์หรือไม่? ไม่ส่งชื่อหรือข้อมูลติดต่อไปในเหตุการณ์วิเคราะห์</p>
      <button onClick={() => choose('granted')} className="border rounded px-3 py-2">อนุญาต</button>
      <button onClick={() => choose('denied')} className="border rounded px-3 py-2">ไม่อนุญาต</button>
    </div> : <button onClick={() => setChoice(null)} className="underline">ตั้งค่าการวัดผลเว็บไซต์</button>}
  </aside>;
}
