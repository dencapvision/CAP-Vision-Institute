import React, { useEffect, useRef } from 'react';
import { MessageCircle, X, Phone, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';
import { useContactPopup } from '../lib/useContactPopup';
import '../styles/contact-popup.css';

export const FloatingLineWidget: React.FC = () => {
  const { isOpen, setIsOpen, triggerRef, close } = useContactPopup('line');
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (isOpen) closeRef.current?.focus(); }, [isOpen]);
  return (
    <div className="cap-contact-dock cap-contact-dock--line" data-cap-contact="line-v2">
      {isOpen && (
        <section id="cap-line-panel" role="dialog" aria-labelledby="cap-line-title" className="cap-contact-panel">
          <header className="cap-contact-heading">
            <div><h2 id="cap-line-title">คุยกับทีม CAP Vision</h2><p>ปรึกษาหลักสูตรและโจทย์องค์กร</p></div>
            <button ref={closeRef} onClick={close} className="cap-contact-close" aria-label="ปิดหน้าต่าง LINE"><X size={20} /></button>
          </header>
          <div className="cap-contact-content">
            <p>เล่าโจทย์ของคุณ แล้วร่วมออกแบบการเรียนรู้ไปด้วยกัน</p>
            <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noopener noreferrer" className="cap-contact-action cap-contact-action--line"><span>คุยผ่าน LINE · @denmasterfa</span><ArrowRight size={18} /></a>
            <a href="/assessment" className="cap-contact-action"><span>สำรวจความพร้อมองค์กร</span><ArrowRight size={18} /></a>
            <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`} className="cap-contact-phone"><Phone size={14} className="inline mr-2" />{CONTACT_INFO.phone}</a>
          </div>
        </section>
      )}
      <button ref={triggerRef} onClick={() => isOpen ? close() : setIsOpen(true)} className="cap-contact-launcher" aria-label="ติดต่อผ่าน LINE" aria-expanded={isOpen} aria-controls="cap-line-panel">
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}<span>LINE</span>
      </button>
    </div>
  );
};
export default FloatingLineWidget;
