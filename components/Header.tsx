
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, PhoneCall, ChevronDown,
  GraduationCap, Laptop, Users, Info,
  Briefcase, MessageCircle, ExternalLink,
  Sparkles, BookOpen, Trophy, Newspaper,
  Phone, Building2, Layers3, ChevronRight
} from 'lucide-react';
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
  submenu?: SubItem[];
}

// ===== NAV DATA — 5 items for HRD audience =====
const navItems: NavItem[] = [
  {
    name: 'หน้าหลัก',
    path: '/',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    name: 'หลักสูตรฝึกอบรม',
    path: '/courses',
    icon: <GraduationCap className="w-4 h-4" />,
    submenu: [
      {
        name: 'Growth Mastery Workshop',
        path: 'https://growth-mindset-workshop.capvisionpartner.com/',
        icon: <Sparkles className="w-4 h-4" />,
        external: true,
        description: 'หลักสูตร Signature สำหรับผู้นำ',
      },
      {
        name: 'หลักสูตร In-house Training',
        path: '/courses',
        icon: <Layers3 className="w-4 h-4" />,
        description: 'ออกแบบหลักสูตรเฉพาะองค์กร',
      },
      {
        name: 'People Skills',
        path: '/courses?cat=People+Skills',
        icon: <Users className="w-4 h-4" />,
        description: 'Service Mind, บุคลิกภาพ',
      },
      {
        name: 'Work Skills',
        path: '/courses?cat=Work+Skills',
        icon: <Laptop className="w-4 h-4" />,
        description: 'Team Building, Creative Thinking',
      },
      {
        name: 'Communication Skills',
        path: '/courses?cat=Communication+Skills',
        icon: <MessageCircle className="w-4 h-4" />,
        description: 'การสื่อสาร, DISC, Feedback',
      },
      {
        name: 'Leader Skills',
        path: '/courses?cat=Leader+Skills',
        icon: <Trophy className="w-4 h-4" />,
        description: 'Leadership, DFA Strategy',
      },
    ],
  },
  {
    name: 'ผลงาน & บริการ',
    path: '/portfolio',
    icon: <Trophy className="w-4 h-4" />,
    submenu: [
      {
        name: 'ผลงานการจัดอบรม',
        path: '/portfolio',
        icon: <Trophy className="w-4 h-4" />,
        description: 'Case Studies จากลูกค้าองค์กร',
      },
      {
        name: 'บริการองค์กร',
        path: '/services',
        icon: <Building2 className="w-4 h-4" />,
        description: 'Consulting & Training Solutions',
      },
      {
        name: 'วิทยากร & Facilitator',
        path: '/speakers',
        icon: <Users className="w-4 h-4" />,
        description: 'ทีมผู้เชี่ยวชาญของเรา',
      },
    ],
  },
  {
    name: 'ความรู้ & กิจกรรม',
    path: '/resources',
    icon: <BookOpen className="w-4 h-4" />,
    submenu: [
      {
        name: 'คลังความรู้ & บทความ',
        path: '/resources',
        icon: <Newspaper className="w-4 h-4" />,
        description: 'บทความ HRD, เทคนิคพัฒนาทีม',
      },
      {
        name: 'กิจกรรม & เครือข่าย',
        path: '/events',
        icon: <Sparkles className="w-4 h-4" />,
        description: 'Workshop, Seminar, Networking',
      },
    ],
  },
  {
    name: 'ติดต่อ & เกี่ยวกับ',
    path: '/contact',
    icon: <Phone className="w-4 h-4" />,
    submenu: [
      {
        name: 'เกี่ยวกับเรา',
        path: '/about',
        icon: <Info className="w-4 h-4" />,
        description: 'วิสัยทัศน์ & พันธกิจ',
      },
      {
        name: 'ติดต่อ / ขอใบเสนอราคา',
        path: '/contact',
        icon: <Phone className="w-4 h-4" />,
        description: 'Quotation In-house Training',
      },
      {
        name: 'ร่วมงานกับเรา',
        path: '/join-us',
        icon: <Briefcase className="w-4 h-4" />,
        description: 'สมัครเป็นวิทยากรหรือพาร์ทเนอร์',
      },
    ],
  },
];

// ===== SUB-COMPONENT: Dropdown Panel =====
// alignRight: used for nav items near viewport right edge to prevent overflow
const DropdownPanel: React.FC<{ items: SubItem[]; alignRight?: boolean }> = ({ items, alignRight }) => (
  <div
    className={`absolute top-[calc(100%-2px)] min-w-[280px] bg-white shadow-2xl rounded-2xl border border-gray-100/80 p-3 z-50 ${alignRight ? 'right-0' : 'left-0'}`}
    style={{ animation: 'dropIn 0.18s cubic-bezier(0.16,1,0.3,1) both' }}
  >
    <div className="grid gap-1">
      {items.map((sub) => {
        const inner = (
          <div className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 flex-shrink-0 bg-[#f0f4ff] group-hover:bg-[#e8f0fe] rounded-lg flex items-center justify-center text-[#c5a059] mt-0.5">
              {sub.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-[#0f3460] group-hover:text-[#c5a059] nav-font whitespace-nowrap flex items-center gap-1.5">
                {sub.name}
                {sub.external && <ExternalLink className="w-3 h-3 text-gray-300 flex-shrink-0" />}
              </span>
              {sub.description && (
                <span className="text-[11px] text-gray-400 font-medium mt-0.5">{sub.description}</span>
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
          <Link key={sub.name} to={sub.path}>
            {inner}
          </Link>
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
  const location = useLocation();
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ---- Keyframe injection ---- */}
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'h-16 bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100'
            : 'h-20 md:h-24 bg-white/10 backdrop-blur-sm md:bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">

          {/* ---- Logo ---- */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="CAP Vision Institute - หน้าหลัก">
            <Logo
              className={`transition-all duration-500 ${
                isScrolled ? 'w-8 h-8 md:w-9 md:h-9' : 'w-9 h-9 md:w-12 md:h-12'
              } group-hover:scale-110`}
            />
            <div className="flex flex-col leading-none">
              <span className={`font-black tracking-tight nav-font uppercase transition-all duration-500 ${
                isScrolled ? 'text-base md:text-lg text-[#0f3460]' : 'text-base md:text-2xl text-[#0f3460]'
              }`}>
                CAP Vision Institute
              </span>
              <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.15em] nav-font text-[#c5a059] transition-all duration-500 ${
                isScrolled ? 'opacity-100' : 'opacity-80 md:opacity-100'
              }`}>
                สถาบันพัฒนาศักยภาพผู้นำและฝึกอบรมครบวงจร
              </span>
            </div>
          </Link>

          {/* ---- Desktop Nav ---- */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 h-full">
            {navItems.map((item, idx) => {
              // Last 2 nav items are near right edge — align dropdown to right
              const alignRight = idx >= navItems.length - 2;
              return (
              <div
                key={item.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={() => item.submenu && handleMouseLeave()}
              >
                <Link
                  to={item.path}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`px-2 xl:px-3 py-2 text-[13px] xl:text-[14px] font-bold transition-all duration-200 nav-font flex items-center gap-1 whitespace-nowrap rounded-lg hover:bg-[#0f3460]/5 ${
                    isActive(item.path)
                      ? 'text-[#c5a059]'
                      : 'text-[#0f3460] hover:text-[#c5a059]'
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180 text-[#c5a059]' : 'text-gray-400'
                      }`}
                    />
                  )}
                </Link>

                {item.submenu && openDropdown === item.name && (
                  <DropdownPanel items={item.submenu} alignRight={alignRight} />
                )}
              </div>
            );})}

            {/* CTA Button */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="ml-3 bg-[#c5a059] text-white px-5 xl:px-6 py-2.5 rounded-full text-[13px] xl:text-[14px] font-bold flex items-center gap-2 hover:bg-[#0f3460] transition-all duration-300 shadow-md hover:shadow-lg nav-font whitespace-nowrap active:scale-95"
              aria-label="โทรนัดปรึกษาหลักสูตร"
            >
              <PhoneCall className="w-4 h-4" />
              นัดปรึกษา
            </a>
          </div>

          {/* ---- Mobile Action Bar ---- */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="bg-[#c5a059] text-white p-2.5 rounded-full hover:bg-[#0f3460] transition-all shadow-md active:scale-90"
              aria-label="โทรปรึกษา"
              style={{ touchAction: 'manipulation' }}
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0f3460] bg-white/80 backdrop-blur-sm p-2.5 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
              aria-expanded={isOpen}
              style={{ touchAction: 'manipulation' }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ---- Mobile Full-screen Drawer ---- */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-white"
          style={{ animation: 'slideInRight 0.28s cubic-bezier(0.16,1,0.3,1) both', paddingTop: '64px' }}
          role="dialog"
          aria-modal="true"
          aria-label="เมนูหลัก"
        >
          {/* Drawer Header */}
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase nav-font">เมนูหลัก</p>
          </div>

          <nav className="overflow-y-auto h-[calc(100svh-130px)] px-4 py-4 space-y-1 pb-32">
            {navItems.map((item, idx) => (
              <div
                key={item.name}
                style={{ animation: `fadeInUp 0.3s ${idx * 0.05}s cubic-bezier(0.16,1,0.3,1) both` }}
              >
                {/* Main menu item */}
                <div className="flex items-center">
                  <Link
                    to={item.path}
                    className={`flex-1 flex items-center gap-3 py-3.5 px-4 rounded-2xl font-black nav-font text-lg transition-all ${
                      isActive(item.path)
                        ? 'text-[#c5a059] bg-[#c5a059]/8'
                        : 'text-[#0f3460] hover:text-[#c5a059] hover:bg-gray-50'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-[#f0f4ff] rounded-xl text-[#c5a059] flex-shrink-0">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                  {/* Expand submenu toggle */}
                  {item.submenu && (
                    <button
                      onClick={() =>
                        setOpenMobileSubmenu(openMobileSubmenu === item.name ? null : item.name)
                      }
                      className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-[#c5a059] rounded-xl transition-colors"
                      aria-label={`ขยาย ${item.name}`}
                      aria-expanded={openMobileSubmenu === item.name}
                      style={{ touchAction: 'manipulation' }}
                    >
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-200 ${
                          openMobileSubmenu === item.name ? 'rotate-90 text-[#c5a059]' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Sub-menu items */}
                {item.submenu && openMobileSubmenu === item.name && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#c5a059]/20 pl-4">
                    {item.submenu.map((sub) => {
                      const inner = (
                        <div className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-gray-50 group transition-all min-h-[52px]">
                          <div className="w-8 h-8 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059]/10">
                            {sub.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#0f3460] group-hover:text-[#c5a059] nav-font flex items-center gap-1">
                              {sub.name}
                              {sub.external && <ExternalLink className="w-3 h-3 text-gray-300" />}
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
                        <Link key={sub.name} to={sub.path}>
                          {inner}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sticky CTA at drawer bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 safe-area-pb">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex-1 bg-[#0f3460] text-white py-4 rounded-2xl font-black text-center nav-font text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ touchAction: 'manipulation' }}
            >
              <PhoneCall className="w-5 h-5" />
              โทรปรึกษา
            </a>
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-[#c5a059] text-white py-4 rounded-2xl font-black text-center nav-font text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ touchAction: 'manipulation' }}
            >
              <MessageCircle className="w-5 h-5" />
              ไลน์ทางการ
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
