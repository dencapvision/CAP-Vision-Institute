import React, { useState, useEffect, useRef } from 'react';

import {
  Menu, X, PhoneCall, ChevronDown,
  GraduationCap, Users, Info,
  Briefcase, MessageCircle, ExternalLink,
  Sparkles, BookOpen,
  Phone, Building2, Layers3, ChevronRight,
  FileText, Target
} from 'lucide-react';
import { 
  IconLeadership, IconTeamSynergy, IconGrowthCulture, 
  IconCreativeCPS, IconCustomArchitecture, IconFacilitatorMastery, 
  IconGoldCrestStar, IconInstituteShield 
} from './icons/CapBrandIcons';
import { CONTACT_INFO, BRAND_INFO } from '../constants/brand';
import Logo from './Logo';

// ===== TYPES =====
interface SubItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  external?: boolean;
  description?: string;
}
interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string;
  submenu?: SubItem[];
}

// ===== NAV DATA — Aligned with CAP Vision Blueprint =====
const navItems: NavItem[] = [
  {
    name: 'หน้าหลัก',
    path: '/',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    name: 'ประเมินองค์กร',
    path: '/assessment',
    icon: <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B]" />,
    badge: 'Diagnostic',
  },
  {
    name: 'โซลูชัน',
    path: '/services',
    icon: <Target className="w-4 h-4" />,
    submenu: [
      {
        name: 'Leadership Transformation',
        path: '/services#leadership',
        icon: <IconLeadership className="w-4 h-4" />,
        description: 'พัฒนาภาวะผู้นำเพื่อการเปลี่ยนแปลง',
      },
      {
        name: 'People & Team Synergy',
        path: '/services#people-team',
        icon: <IconTeamSynergy className="w-4 h-4" />,
        description: 'ทลาย Silo & เสริมพลังทีมงาน',
      },
      {
        name: 'Organization Culture',
        path: '/services#culture',
        icon: <IconGrowthCulture className="w-4 h-4" />,
        description: 'สร้างวัฒนธรรม Growth Mindset',
      },
      {
        name: 'Customized In-house Solutions',
        path: '/services#customized',
        icon: <IconCustomArchitecture className="w-4 h-4" />,
        description: 'ออกแบบหลักสูตรจาก TNA เฉพาะองค์กร',
      },
      {
        name: 'CEO Speechfulness',
        path: '/ceo-speechfulness',
        icon: <IconLeadership className="w-4 h-4" />,
        description: 'Coaching พูด & สื่อสาร สำหรับผู้บริหาร',
      },
      {
        name: 'The Facilitorium',
        path: 'https://facilitorium.denmasterfa.com/',
        icon: <IconFacilitatorMastery className="w-4 h-4" />,
        external: true,
        description: 'โรงเรียนวิทยากรและคลังเครื่องมือ Facilitator',
      },
    ],
  },
  {
    name: 'หลักสูตร',
    path: '/courses',
    icon: <GraduationCap className="w-4 h-4" />,
    submenu: [
      {
        name: 'Leadership Programs',
        path: '/courses?cat=Leader+Skills',
        icon: <IconLeadership className="w-4 h-4" />,
        description: 'Transformative Leadership, Strategic Vision',
      },
      {
        name: 'People Skills',
        path: '/courses?cat=People+Skills',
        icon: <IconTeamSynergy className="w-4 h-4" />,
        description: 'Service Mind, Empathetic Communication',
      },
      {
        name: 'Creative Thinking',
        path: '/courses?cat=Work+Skills',
        icon: <IconCreativeCPS className="w-4 h-4" />,
        description: 'Creative Problem Solving (CPS Model)',
      },
      {
        name: 'Facilitator & Process Design',
        path: '/courses',
        icon: <IconFacilitatorMastery className="w-4 h-4" />,
        description: 'ศาสตร์การจัดกระบวนการเรียนรู้ที่มีพลัง',
      },
      {
        name: 'Growth Mastery Workshop',
        path: '/resources/building-growth-mindset-culture',
        icon: <IconGrowthCulture className="w-4 h-4" />,
        description: 'หลักสูตร Signature สำหรับผู้นำ',
      },
      {
        name: 'Workshop Handouts',
        path: '/growth-mastery/handouts',
        icon: <FileText className="w-4 h-4 text-gray-500" />,
        description: 'เอกสารประกอบการอบรมแบบโต้ตอบ',
      },
    ],
  },
  {
    name: 'CAP Framework',
    path: '/about#cap-framework',
    icon: <IconInstituteShield className="w-4 h-4" />,
  },
  {
    name: 'Case Studies',
    path: '/portfolio',
    icon: <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B]" />,
  },
  {
    name: 'วิทยากร',
    path: '/speakers',
    icon: <Users className="w-4 h-4" />,
  },
  {
    name: 'คลังความรู้',
    path: '/resources',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    name: 'ติดต่อเรา',
    path: '/contact',
    icon: <Phone className="w-4 h-4" />,
  },
];

// ===== SUB-COMPONENT: Dropdown Panel =====
const DropdownPanel: React.FC<{ items: SubItem[]; alignRight?: boolean }> = ({ items, alignRight }) => (
  <div
    className={`absolute top-[calc(100%-2px)] min-w-[290px] bg-white shadow-2xl rounded-2xl border border-gray-100 p-3 z-50 ${alignRight ? 'right-0' : 'left-0'}`}
    style={{ animation: 'dropIn 0.18s cubic-bezier(0.16,1,0.3,1) both' }}
  >
    <div className="grid gap-1">
      {items.map((sub) => {
        const inner = (
          <div className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 flex-shrink-0 bg-blue-50/80 group-hover:bg-blue-100/60 rounded-lg flex items-center justify-center mt-0.5">
              {sub.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-[#111827] group-hover:text-[#2563EB] nav-font whitespace-nowrap flex items-center gap-1.5">
                {sub.name}
                {sub.external && <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />}
              </span>
              {sub.description && (
                <span className="text-[11px] text-gray-500 font-medium mt-0.5">{sub.description}</span>
              )}
            </div>
          </div>
        );

        return sub.external ? (
          <a
            key={sub.name}
            href={sub.path}
            target="_blank"
            rel="noreferrer"
          >
            {inner}
          </a>
        ) : (
          <a key={sub.name} href={sub.path}>
            {inner}
          </a>
        );
      })}
    </div>
  </div>
);

// ===== MAIN COMPONENT =====
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const location = (typeof window !== 'undefined' ? window.location : { pathname: '', search: '' });
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu & dropdowns on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenMobileSubmenu(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Dropdown hover helpers with delay for smooth UX
  const handleMouseEnter = (name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(name);
  };
  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'h-16 bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100'
            : 'h-20 bg-white/90 backdrop-blur-md md:bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">

          {/* ---- Logo ---- */}
          <a href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="CAP Vision Institute - หน้าหลัก">
            <Logo
              className={`transition-all duration-300 ${
                isScrolled ? 'w-8 h-8 md:w-9 md:h-9' : 'w-9 h-9 md:w-11 md:h-11'
              } group-hover:scale-105`}
            />
            <div className="flex flex-col leading-none">
              <span className={`font-black tracking-tight nav-font uppercase transition-all duration-300 ${
                isScrolled ? 'text-base md:text-lg text-[#111827]' : 'text-base md:text-xl text-[#111827]'
              }`}>
                CAP Vision Institute
              </span>
              <span className="text-[9px] md:text-[10px] font-bold tracking-wider nav-font text-[#2563EB]">
                Transform People → Transform Organization
              </span>
            </div>
          </a>

          {/* ---- Desktop Nav ---- */}
          <div className="hidden xl:flex items-center gap-1 h-full">
            {navItems.map((item, idx) => {
              const alignRight = idx >= navItems.length - 3;
              const isAssessment = item.path === '/assessment';
              return (
                <div
                  key={item.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.submenu && handleMouseLeave()}
                >
                  <a href={item.path}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className={`px-3 py-2 text-[13px] font-bold transition-all duration-200 nav-font flex items-center gap-1.5 whitespace-nowrap rounded-xl ${
                      isAssessment
                        ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/25 hover:bg-[#2563EB] hover:text-white shadow-xs'
                        : isActive(item.path)
                          ? 'text-[#2563EB] bg-blue-50/50'
                          : 'text-[#111827] hover:text-[#2563EB] hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                    {item.submenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180 text-[#2563EB]' : 'text-gray-400'
                        }`}
                      />
                    )}
                  </a>

                  {item.submenu && openDropdown === item.name && (
                    <DropdownPanel items={item.submenu} alignRight={alignRight} />
                  )}
                </div>
              );
            })}

            {/* CTA Button */}
            <a href="/contact"
              className="ml-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg nav-font whitespace-nowrap active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              ขอใบเสนอราคา
            </a>
          </div>

          {/* ---- Mobile Action Bar ---- */}
          <div className="xl:hidden flex items-center gap-2">
            <a href="/assessment"
              className="bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              ประเมินองค์กร
            </a>

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="bg-[#2563EB] text-white p-2.5 rounded-xl hover:bg-[#1D4ED8] transition-all shadow-sm active:scale-90"
              aria-label="โทรปรึกษา"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#111827] bg-white border border-gray-200 p-2.5 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none shadow-sm min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={isOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ---- Mobile Full-screen Drawer ---- */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-white"
          style={{ animation: 'slideInRight 0.28s cubic-bezier(0.16,1,0.3,1) both', paddingTop: '64px' }}
          role="dialog"
          aria-modal="true"
          aria-label="เมนูหลัก"
        >
          <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex justify-between items-center">
            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase nav-font">CAP Vision Menu</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB]">
              Executive Platform
            </span>
          </div>

          <nav className="overflow-y-auto h-[calc(100svh-140px)] px-4 py-4 space-y-1 pb-32">
            {navItems.map((item, idx) => {
              const isAssessment = item.path === '/assessment';
              return (
                <div
                  key={item.name}
                  style={{ animation: `fadeInUp 0.3s ${idx * 0.04}s cubic-bezier(0.16,1,0.3,1) both` }}
                >
                  <div className="flex items-center">
                    <a href={item.path}
                      className={`flex-1 flex items-center gap-3 py-3 px-3.5 rounded-2xl font-black nav-font text-base transition-all ${
                        isAssessment
                          ? 'text-[#2563EB] bg-blue-50/80 border border-blue-100'
                          : isActive(item.path)
                            ? 'text-[#2563EB] bg-blue-50/50'
                            : 'text-[#111827] hover:text-[#2563EB] hover:bg-gray-50'
                      }`}
                    >
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-xl text-[#2563EB] flex-shrink-0">
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#D97706]">
                          {item.badge}
                        </span>
                      )}
                    </a>

                    {item.submenu && (
                      <button
                        onClick={() =>
                          setOpenMobileSubmenu(openMobileSubmenu === item.name ? null : item.name)
                        }
                        className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-[#2563EB] rounded-xl transition-colors"
                        aria-label={`ขยาย ${item.name}`}
                      >
                        <ChevronRight
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openMobileSubmenu === item.name ? 'rotate-90 text-[#2563EB]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.submenu && openMobileSubmenu === item.name && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-4">
                      {item.submenu.map((sub) => {
                        const inner = (
                          <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-all">
                            <div className="w-7 h-7 flex-shrink-0 bg-blue-50 rounded-lg flex items-center justify-center">
                              {sub.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-[#111827] nav-font flex items-center gap-1">
                                {sub.name}
                                {sub.external && <ExternalLink className="w-3 h-3 text-gray-400" />}
                              </span>
                              {sub.description && (
                                <span className="text-[11px] text-gray-400">{sub.description}</span>
                              )}
                            </div>
                          </div>
                        );
                        return sub.external ? (
                          <a key={sub.name} href={sub.path} target="_blank" rel="noreferrer">
                            {inner}
                          </a>
                        ) : (
                          <a key={sub.name} href={sub.path}>
                            {inner}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sticky CTA at drawer bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 safe-area-pb">
            <a href="/assessment"
              className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl font-bold text-center nav-font text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              ประเมินองค์กร
            </a>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-[#06C755] text-white py-3.5 rounded-xl font-bold text-center nav-font text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              ไลน์ทางการ
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
