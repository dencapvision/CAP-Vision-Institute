
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, MessageCircle, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO, BRAND_INFO } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f3460] text-white pt-24 pb-12 border-t-[10px] border-[#c5a059]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-white p-1.5 rounded-2xl">
                <Logo className="w-12 h-12" />
              </div>
              <div className="nav-font">
                <span className="text-xl font-black block tracking-tight uppercase">แคป วิชั่น</span>
                <span className="text-[#c5a059] text-[9px] font-bold uppercase tracking-[0.3em]">พาร์ทเนอร์</span>
              </div>
            </div>
            <p className="text-blue-100 text-[15px] leading-relaxed mb-10 opacity-80 font-medium">
              "Transform People, Transform Organization"<br />
              สถาบันที่ปรึกษาด้านการยกระดับคุณภาพพนักงานและการพัฒนาผู้นำโดย {BRAND_INFO.director}
            </p>
            <div className="flex space-x-4">
              <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#c5a059] transition-all border border-white/10 shadow-lg" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={CONTACT_INFO.youtubeUrl} target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#c5a059] transition-all border border-white/10 shadow-lg" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#c5a059] transition-all border border-white/10 shadow-lg" aria-label="Line Official">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-10 nav-font text-[#c5a059] uppercase tracking-wider">ลิงก์ด่วน</h4>
            <ul className="space-y-4 text-blue-100/70 font-bold text-sm">
              <li><Link to="/" className="hover:text-[#c5a059] transition-colors">หน้าหลัก</Link></li>
              <li><Link to="/courses" className="hover:text-[#c5a059] transition-colors">หลักสูตรพัฒนาผู้นำ</Link></li>
              <li><Link to="/events" className="hover:text-[#c5a059] transition-colors">กิจกรรม & เครือข่าย</Link></li>
              <li><Link to="/resources" className="hover:text-[#c5a059] transition-colors">คลังความรู้ & บทความ</Link></li>
              <li><Link to="/speakers" className="hover:text-[#c5a059] transition-colors">วิทยากร & Master Facilitator</Link></li>
              <li><Link to="/about" className="hover:text-[#c5a059] transition-colors">เกี่ยวกับ CAP Vision</Link></li>
              <li><Link to="/join-us" className="hover:text-[#c5a059] transition-colors">ร่วมงานกับเรา</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-10 nav-font text-[#c5a059] uppercase tracking-wider">บริการของเรา</h4>
            <ul className="space-y-4 text-blue-100/70 font-bold text-sm">
              <li><Link to="/services" className="hover:text-[#c5a059] transition-colors">In-house Training</Link></li>
              <li><Link to="/services" className="hover:text-[#c5a059] transition-colors">Executive Coaching</Link></li>
              <li><Link to="/services" className="hover:text-[#c5a059] transition-colors">OD Consulting</Link></li>
              <li><Link to="/services" className="hover:text-[#c5a059] transition-colors">Facilitator Training</Link></li>
              <li><Link to="/lms" className="hover:text-[#c5a059] transition-colors">Digital Learning Solutions</Link></li>
              <li><Link to="/contact" className="hover:text-[#c5a059] transition-colors">Customized Solutions</Link></li>
              <li><Link to="/services" className="hover:text-[#c5a059] transition-colors">Leadership Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-10 nav-font text-[#c5a059] uppercase tracking-wider">ข้อมูลการติดต่อ</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-4 group">
                <div className="bg-white/5 p-3 rounded-xl group-hover:bg-[#c5a059] transition-colors border border-white/5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-1 opacity-60">Call Center</p>
                  <p className="text-blue-100 font-bold">{CONTACT_INFO.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="bg-white/5 p-3 rounded-xl group-hover:bg-[#c5a059] transition-colors border border-white/5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-1 opacity-60">LINE Official</p>
                  <p className="text-blue-100 font-bold">{CONTACT_INFO.line}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="bg-white/5 p-3 rounded-xl group-hover:bg-[#c5a059] transition-colors border border-white/5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-1 opacity-60">Location</p>
                  <p className="text-blue-100 leading-tight font-bold text-sm">{CONTACT_INFO.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 text-center text-[10px] md:text-[11px] text-blue-200/40 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] nav-font">
          <p>© {new Date().getFullYear()} {BRAND_INFO.thaiName} (CAP Vision Partner). Empowerment through Innovation & Care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
