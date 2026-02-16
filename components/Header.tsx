
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, ChevronDown, GraduationCap, Laptop, Users, Info, Briefcase, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { CONTACT_INFO, BRAND_INFO } from '../constants/brand';
import { COURSES } from '../constants/courses';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const location = useLocation();

  // Handle scroll for floating effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'หน้าหลัก', path: '/' },
    {
      name: 'หลักสูตร',
      path: '/courses',
      submenu: [
        { name: 'Growth Mastery Workshop', path: 'https://growth-mindset-workshop.capvisionpartner.com/', icon: <Sparkles className="w-4 h-4" />, external: true },
        { name: 'หลักสูตร In-house', path: '/courses', icon: <GraduationCap className="w-4 h-4" /> }
      ]
    },
    { name: 'ผลงานการจัดอบรม', path: '/portfolio' },
    { name: 'บริการองค์กร', path: '/services' },
    { name: 'กิจกรรม & เครือข่าย', path: '/events' },
    { name: 'คลังความรู้', path: '/resources' },
    {
      name: 'เกี่ยวกับเรา',
      path: '/about',
      submenu: [
        { name: 'วิสัยทัศน์ & พันธกิจ', path: '/about', icon: <Info className="w-4 h-4" /> },
        { name: 'วิทยากร และ Facilitator', path: '/speakers', icon: <Users className="w-4 h-4" /> },
        { name: 'ร่วมงานกับเรา', path: '/join-us', icon: <Briefcase className="w-4 h-4" /> }
      ]
    },
    { name: 'ติดต่อเรา', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center ${isScrolled ? 'h-16 md:h-20 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'h-20 md:h-28 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo & Brand Section - Responsive Scaling */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-2 md:gap-4 group">
              <Logo className={`transition-all duration-500 ${isScrolled ? 'w-8 h-8 md:w-10 md:h-10' : 'w-10 h-10 md:w-14 md:h-14'} group-hover:scale-110`} />
              <div className="flex flex-col justify-center">
                <span className={`font-black tracking-tight leading-none nav-font uppercase transition-all duration-500 ${isScrolled ? 'text-lg md:text-xl text-[#0f3460]' : 'text-xl md:text-3xl text-white md:text-[#0f3460]'}`}>
                  CAP Vision Institute
                </span>
                <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.4em] leading-none nav-font uppercase mt-0.5 md:mt-1 transition-all duration-500 ${isScrolled ? 'text-[#c5a059]' : 'text-[#c5a059]/80 md:text-[#c5a059]'}`}>
                  สถาบันพัฒนาศักยภาพผู้นำและฝึกอบรมครบวงจร
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-7 h-full">
            {navItems.map((item) => {
              const isCourses = item.name === 'หลักสูตร';
              const isAbout = item.name === 'เกี่ยวกับเรา';
              const isDropdownOpen = isCourses ? coursesDropdown : (isAbout ? aboutDropdown : false);

              return (
                <div
                  key={item.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.submenu && (isCourses ? setCoursesDropdown(true) : setAboutDropdown(true))}
                  onMouseLeave={() => item.submenu && (isCourses ? setCoursesDropdown(false) : setAboutDropdown(false))}
                >
                  <Link
                    to={item.path}
                    className={`px-1.5 xl:px-2.5 py-2 text-[13px] xl:text-[14px] font-bold transition-all duration-300 nav-font flex items-center gap-1 whitespace-nowrap ${isScrolled
                        ? (location.pathname === item.path ? 'text-[#c5a059]' : 'text-[#0f3460] hover:text-[#c5a059]')
                        : (location.pathname === item.path ? 'text-[#c5a059]' : 'text-white/90 hover:text-[#c5a059] md:text-[#0f3460]')
                      }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#c5a059]' : (isScrolled ? 'text-gray-400' : 'text-white/50 md:text-gray-400')}`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.submenu && isDropdownOpen && (
                    <div className="absolute top-[calc(100%-10px)] left-0 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-1">
                        {item.submenu.map((sub) => (
                          (sub as any).external ? (
                            <a
                              key={sub.name}
                              href={sub.path}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-3 p-3 text-[#0f3460] hover:bg-gray-50 hover:text-[#c5a059] rounded-xl transition-all nav-font font-bold text-sm"
                            >
                              <div className="bg-gray-50 p-2 rounded-lg text-[#c5a059]">
                                {sub.icon}
                              </div>
                              {sub.name}
                              <ExternalLink className="w-3 h-3 ml-auto text-gray-300" />
                            </a>
                          ) : (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="flex items-center gap-3 p-3 text-[#0f3460] hover:bg-gray-50 hover:text-[#c5a059] rounded-xl transition-all nav-font font-bold text-sm"
                            >
                              <div className="bg-gray-50 p-2 rounded-lg text-[#c5a059]">
                                {sub.icon}
                              </div>
                              {sub.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pill CTA Button */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="bg-[#c5a059] text-white px-6 xl:px-8 py-2.5 md:py-3.5 rounded-full text-[14px] xl:text-[15px] font-bold flex items-center gap-2 hover:bg-[#0f3460] transition-all shadow-md hover:shadow-lg nav-font whitespace-nowrap active:scale-95 ml-2"
            >
              <PhoneCall className="w-4 h-4" />
              นัดปรึกษา
            </a>
          </div>

          {/* Mobile Menu Action Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="bg-[#c5a059] text-white p-2.5 rounded-full hover:bg-[#0f3460] transition-all shadow-md active:scale-90"
              aria-label="Call for consultation"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0f3460] p-2 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu Overlay - Improved Responsiveness & Glassmorphism */}
      {isOpen && (
        <div className="lg:hidden bg-white/98 fixed inset-0 top-16 z-50 overflow-y-auto animate-in fade-in slide-in-from-right duration-300">
          <div className="px-6 py-8 space-y-8 pb-32">
            {navItems.map((item) => (
              <div key={item.name} className="space-y-3">
                <Link
                  to={item.path}
                  className={`text-[#0f3460] hover:text-[#c5a059] block text-xl md:text-2xl font-black nav-font ${location.pathname === item.path ? 'text-[#c5a059]' : ''}`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-4 space-y-4 pt-1 border-l-2 border-gray-100">
                    {item.submenu.map((sub) => (
                      (sub as any).external ? (
                        <a
                          key={sub.name}
                          href={sub.path}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-500 hover:text-[#c5a059] block text-base md:text-lg font-bold nav-font flex items-center gap-4"
                        >
                          <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-[#c5a059]">
                            {sub.icon}
                          </div>
                          {sub.name}
                          <ExternalLink className="w-3 h-3 text-gray-300" />
                        </a>
                      ) : (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="text-gray-500 hover:text-[#c5a059] block text-base md:text-lg font-bold nav-font flex items-center gap-4"
                        >
                          <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-[#c5a059]">
                            {sub.icon}
                          </div>
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-8 border-t border-gray-100 space-y-4">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="w-full bg-[#c5a059] text-white py-4 md:py-5 rounded-2xl font-black flex items-center justify-center gap-3 nav-font shadow-lg active:scale-95 text-base md:text-lg"
              >
                <PhoneCall className="w-5 h-5" /> นัดปรึกษาหลักสูตร
              </a>
              <a
                href={CONTACT_INFO.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#00b900] text-white py-4 md:py-5 rounded-2xl font-black flex items-center justify-center gap-3 nav-font shadow-lg active:scale-95 text-base md:text-lg"
              >
                <MessageCircle className="w-6 h-6" /> LINE Official Account
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
