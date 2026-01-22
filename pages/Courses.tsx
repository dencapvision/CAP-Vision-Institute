import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowRight, Star, ChevronDown, Filter as FilterIcon, Layout, Target, Zap, Users, MessageCircle, PenTool, Cpu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES } from '../constants';
import SEO from '../components/SEO';

const Courses: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['All', 'Leader Skills', 'People Skills', 'Work Skills', 'Communication Skills'];

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'Leader Skills':
        return { bg: 'bg-indigo-600', text: 'text-indigo-600', icon: <Target />, desc: 'พัฒนาภาวะผู้นำและการบริหารจัดการเพื่อนำพาองค์กรสู่อนาคต' };
      case 'People Skills':
        return { bg: 'bg-emerald-600', text: 'text-emerald-600', icon: <Users />, desc: 'สร้างทีมงานที่แข็งแกร่งและความร่วมมือที่เป็นหนึ่งเดียว' };
      case 'Work Skills':
        return { bg: 'bg-orange-500', text: 'text-orange-500', icon: <Layers />, desc: 'ยกระดับประสิทธิภาพการทำงานด้วยทักษะสมัยใหม่' };
      case 'Communication Skills':
        return { bg: 'bg-sky-500', text: 'text-sky-500', icon: <MessageCircle />, desc: 'ศิลปะการสื่อสารที่ทรงพลังเพื่อการทำงานที่ราบรื่น' };
      default:
        return { bg: 'bg-[#0f3460]', text: 'text-[#0f3460]', icon: <Layout />, desc: 'ยกระดับศักยภาพด้วยหลักสูตรที่ออกแบบมาเพื่อการเปลี่ยนแปลงที่แท้จริง' };
    }
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: COURSES.length };
    categories.forEach(cat => {
      if (cat !== 'All') {
        counts[cat] = COURSES.filter(c => c.category === cat).length;
      }
    });
    return counts;
  }, [categories]);

  const featuredCourses = COURSES.slice(0, 4);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === featuredCourses.length - 1 ? 0 : prev + 1));
  }, [featuredCourses.length]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? featuredCourses.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const filteredCourses = COURSES.filter(c => {
    const matchesCategory = filter === 'All' || c.category === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryInfo = getCategoryInfo(filter);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 overflow-x-hidden">
      <SEO
        title={`${filter === 'All' ? 'หลักสูตรทั้งหมด' : filter} - CAP Vision Institute`}
        description="ค้นหาหลักสูตรฝึกอบรมพัฒนาบุคลากร Leadership, Team Building, Communication โดย CAP Vision Institute"
      />
      {/* Page Header */}
      <div className="bg-[#0f3460] pt-16 md:pt-20 pb-24 md:pb-32 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-[#c5a059] rounded-full blur-[80px] md:blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-[#c5a059] rounded-full blur-[80px] md:blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 nav-font tracking-tight uppercase">
            {filter === 'All' ? 'หลักสูตรระดับพรีเมียม' : filter}
          </h1>
          <p className="text-blue-100 text-base md:text-xl max-w-2xl mx-auto font-light opacity-80 leading-relaxed">
            {categoryInfo.desc}
          </p>
        </div>
      </div>

      {/* Featured Carousel Section - Only show when "All" is selected */}
      {filter === 'All' && (
        <div className="max-w-7xl mx-auto px-4 -mt-12 md:-mt-20 relative z-20 mb-12 md:mb-20">
          <div className="relative group">
            <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl bg-white border border-white/20">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {featuredCourses.map((course) => (
                  <div key={course.id} className="w-full flex-shrink-0 relative h-[400px] md:h-[600px]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f3460] via-[#0f3460]/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-16 text-white max-w-3xl">
                      <div className="flex items-center gap-2 mb-3 md:mb-4">
                        <Star className="w-4 h-4 md:w-5 h-5 fill-[#c5a059] text-[#c5a059]" />
                        <span className="text-[#c5a059] font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase nav-font">หลักสูตรแนะนำ</span>
                      </div>
                      <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 nav-font leading-tight">{course.title}</h2>
                      <p className="text-sm md:text-xl text-blue-50 mb-6 md:mb-8 opacity-90 line-clamp-2 max-w-2xl">{course.description}</p>
                      <Link to={`/courses/${course.id}`} className="bg-[#c5a059] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold inline-flex items-center gap-3 hover:bg-white hover:text-[#0f3460] transition-all nav-font group/btn text-sm md:text-base shadow-lg">
                        ดูรายละเอียด
                        <ArrowRight className="w-4 h-4 md:w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-[#0f3460] transition-all opacity-0 md:group-hover:opacity-100 z-30 shadow-xl"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-[#0f3460] transition-all opacity-0 md:group-hover:opacity-100 z-30 shadow-xl"
            >
              <ChevronRight className="w-6 h-6 md:w-8 h-8" />
            </button>

            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex gap-2 md:gap-3 z-30">
              {featuredCourses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 md:h-2 transition-all duration-300 rounded-full shadow-sm ${activeSlide === idx ? 'w-8 md:w-12 bg-[#c5a059]' : 'w-2 md:w-3 bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className={`max-w-7xl mx-auto px-4 ${filter !== 'All' ? '-mt-12 md:-mt-20 relative z-20' : ''}`}>

        {/* Visual Category Cards (Desktop) */}
        <div className="hidden lg:grid grid-cols-5 gap-6 mb-12">
          {categories.map(cat => {
            const info = getCategoryInfo(cat);
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`p-6 rounded-[2.5rem] text-left transition-all duration-500 border group flex flex-col h-full ${isActive
                  ? 'bg-white border-[#c5a059] shadow-2xl shadow-gold-500/10 -translate-y-2'
                  : 'bg-white border-transparent shadow-sm hover:shadow-lg hover:border-gray-200'
                  }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? info.bg + ' text-white scale-110 shadow-lg' : 'bg-gray-50 text-gray-400 group-hover:bg-[#0f3460]/5 group-hover:text-[#c5a059]'
                  }`}>
                  {React.cloneElement(info.icon as any, { className: "w-7 h-7" })}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-black text-sm nav-font tracking-tight ${isActive ? 'text-[#0f3460]' : 'text-gray-600'}`}>
                      {cat}
                    </h4>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-[#c5a059] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                      {categoryCounts[cat]}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-400 font-medium line-clamp-2">
                    {info.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Search & Mobile Filter Bar */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl p-6 md:p-8 mb-12 md:mb-16 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-between">
            <div className="lg:hidden w-full relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold text-[#0f3460] nav-font text-sm"
              >
                <div className="flex items-center gap-3">
                  <FilterIcon className="w-4 h-4 text-[#c5a059]" />
                  <span>หมวดหมู่: {filter}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilter(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-6 py-4 font-bold nav-font transition-colors flex items-center justify-between text-sm ${filter === cat ? 'bg-[#0f3460] text-white' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {cat}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${filter === cat ? 'bg-[#c5a059] text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                        {categoryCounts[cat]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full lg:w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาหลักสูตรที่คุณสนใจ เช่น Leadership, Communication..."
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c5a059] font-medium text-gray-700 text-sm"
              />
              <Search className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Category Description Header (Visible when filter is active or for All) */}
        <div className="mb-12 flex items-center gap-6 animate-in fade-in duration-700">
          <div className={`w-16 h-16 ${categoryInfo.bg} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
            {React.cloneElement(categoryInfo.icon as any, { className: "w-8 h-8" })}
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0f3460] nav-font">หลักสูตร {filter}</h2>
            <p className="text-gray-400 text-sm font-medium">มี {categoryCounts[filter]} หลักสูตรที่พร้อมให้บริการ</p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredCourses.map((course) => {
            const colors = getCategoryInfo(course.category);
            return (
              <div key={course.id} className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-gray-100 flex flex-col h-full hover:-translate-y-3 hover:scale-[1.02] duration-500 relative">
                <div className={`absolute top-0 left-0 right-0 h-1 md:h-1.5 ${colors.bg} transition-colors duration-500`} />
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${colors.bg} text-white px-3 md:px-5 py-1 md:py-2 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest nav-font shadow-lg`}>
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-[#0f3460] mb-3 md:mb-4 group-hover:text-[#c5a059] transition-colors nav-font leading-tight">{course.title}</h3>
                  <p className="text-gray-500 text-sm md:text-lg mb-6 md:mb-8 flex-grow leading-relaxed font-medium opacity-80 line-clamp-2 md:line-clamp-3">{course.description}</p>
                  <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-gray-50">
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-[#0f3460] hover:text-[#c5a059] font-black text-sm md:text-base flex items-center gap-2 transition-all nav-font px-4 py-2 rounded-xl hover:bg-[#0f3460]/5"
                    >
                      ดูรายละเอียด <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-2.5 h-2.5 md:w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
