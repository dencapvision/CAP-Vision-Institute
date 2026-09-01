import React from 'react';

import { Facebook, Youtube, MessageCircle, Phone, MapPin, Instagram, Sparkles, ArrowRight } from 'lucide-react';
import { CONTACT_INFO, BRAND_INFO } from '../constants/brand';
import Logo from './Logo';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.34 6.34 0 0 1-2.9-2.8V15.22c.07 1.96-.58 4.02-2.01 5.43-1.61 1.64-4.14 2.21-6.32 1.44-2.18-.74-3.79-2.78-4.10-5.06-.31-2.12.51-4.41 2.14-5.83 1.64-1.45 4.09-1.89 6.22-1.12.03.01.06.02.09.03v4.02c-1.39-.46-3.03-.2-4.16.89-1.14 1.1-1.28 3.01-.26 4.21.96 1.19 2.8 1.48 4.07.64.92-.61 1.34-1.74 1.3-2.83V.02z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-12 border-t-4 border-[#2563EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Banner */}
        <div className="bg-[#0F2557] rounded-3xl p-6 sm:p-10 mb-16 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 font-black">
              ⭐
            </div>
            <div>
              <h4 className="text-lg font-black text-white nav-font">
                CAP Organization Transformation Assessment
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                ประเมินความพร้อม 4 มิติสำคัญ เพื่อรับข้อเสนอแนะเชิงกลยุทธ์เฉพาะองค์กรคุณทันที
              </p>
            </div>
          </div>

          <a href="/assessment"
            className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-black px-6 py-3 rounded-xl text-sm whitespace-nowrap flex items-center gap-2 shadow-lg"
          >
            เริ่มทำแบบประเมินฟรี
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1.5 rounded-xl">
                <Logo className="w-10 h-10" />
              </div>
              <div className="nav-font">
                <span className="text-lg font-black block tracking-tight uppercase">CAP Vision Institute</span>
                <span className="text-[#60A5FA] text-[9px] font-bold uppercase tracking-wider">สถาบันพัฒนาศักยภาพผู้นำ</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              "Transform People → Transform Organization"<br />
              สถาบันที่ปรึกษาและจัดฝึกอบรมชั้นนำ นำโดย {BRAND_INFO.director} และทีม Master Facilitators ประสบการณ์กว่า 18+ ปี
            </p>
            <div className="flex space-x-3">
              <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#2563EB] transition-all border border-white/10" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={CONTACT_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#2563EB] transition-all border border-white/10" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#06C755] transition-all border border-white/10" aria-label="Line Official">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#2563EB] transition-all border border-white/10" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={CONTACT_INFO.tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#2563EB] transition-all border border-white/10" aria-label="TikTok">
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-6 nav-font text-[#F59E0B] uppercase tracking-wider">โครงสร้างหลักสูตร</h4>
            <ul className="space-y-3 text-gray-300 text-xs sm:text-sm font-medium">
              <li><a href="/courses?cat=Leader+Skills" className="hover:text-[#60A5FA] transition-colors">Leadership Programs</a></li>
              <li><a href="/courses?cat=People+Skills" className="hover:text-[#60A5FA] transition-colors">People & Communication Skills</a></li>
              <li><a href="/courses?cat=Work+Skills" className="hover:text-[#60A5FA] transition-colors">Creative Thinking & CPS</a></li>
              <li><a href="/courses" className="hover:text-[#60A5FA] transition-colors">The Modern Facilitator</a></li>
              <li><a href="/growth-mastery/handouts" className="hover:text-[#60A5FA] transition-colors">Workshop Handouts</a></li>
            </ul>
          </div>

          {/* Solutions & OD */}
          <div>
            <h4 className="font-bold text-sm mb-6 nav-font text-[#F59E0B] uppercase tracking-wider">โซลูชันองค์กร</h4>
            <ul className="space-y-3 text-gray-300 text-xs sm:text-sm font-medium">
              <li><a href="/services#leadership" className="hover:text-[#60A5FA] transition-colors">Leadership Transformation</a></li>
              <li><a href="/services#people-team" className="hover:text-[#60A5FA] transition-colors">People & Team Synergy</a></li>
              <li><a href="/services#culture" className="hover:text-[#60A5FA] transition-colors">Growth Mindset Culture</a></li>
              <li><a href="/services#customized" className="hover:text-[#60A5FA] transition-colors">Customized In-house Training</a></li>
              <li><a href="/ceo-speechfulness" className="hover:text-[#60A5FA] transition-colors">CEO Speechfulness Coaching</a></li>
              <li><a href="/portfolio" className="hover:text-[#60A5FA] transition-colors">Enterprise Case Studies</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-6 nav-font text-[#F59E0B] uppercase tracking-wider">ติดต่อเรา</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl text-[#60A5FA] mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">โทรศัพท์ติดต่อ</p>
                  <p className="text-white text-sm font-bold">{CONTACT_INFO.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl text-[#06C755] mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LINE Official</p>
                  <p className="text-white text-sm font-bold">{CONTACT_INFO.line}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl text-[#F59E0B] mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ที่อยู่สถาบัน</p>
                  <p className="text-gray-300 text-xs leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} CAP Vision Institute. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/about" className="hover:text-white transition-colors">เกี่ยวกับเรา</a>
            <a href="/resources" className="hover:text-white transition-colors">คลังความรู้</a>
            <a href="/contact" className="hover:text-white transition-colors">ขอใบเสนอราคา</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
