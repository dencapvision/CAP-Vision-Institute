
import React, { useState } from 'react';
// Add missing Award import
import { BookOpen, PlayCircle, Clock, Search, Layout, List, GraduationCap, TrendingUp, CheckCircle, Award, User } from 'lucide-react';
import { ONLINE_COURSES, BRAND_INFO } from '../constants';
import { Link } from 'react-router-dom';

const LMS: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* LMS Header Area */}
      <div className="bg-[#0f3460] pt-16 pb-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <GraduationCap className="w-full h-full transform translate-x-1/4 -translate-y-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
               <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl md:text-5xl font-black nav-font tracking-tight">ระบบเรียนออนไลน์ (Learning Online)</h1>
                  <Link to="/lms-profile" className="bg-white/10 hover:bg-[#c5a059] transition-all p-3 rounded-2xl text-white flex items-center gap-2 font-bold text-sm nav-font">
                    <User className="w-5 h-5" /> Dashboard ของฉัน
                  </Link>
               </div>
               <p className="text-blue-100 text-xl font-light opacity-80 max-w-2xl">
                 เรียนรู้ทักษะที่จำเป็นในการเปลี่ยนคนและองค์กรได้ทุกที่ ทุกเวลา กับทีม Master Facilitator จาก {BRAND_INFO.thaiName}
               </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">คอร์สทั้งหมด</p>
                <p className="text-2xl font-black nav-font">48 คอร์ส</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">นักเรียนที่เข้าเรียน</p>
                <p className="text-2xl font-black nav-font">2.4k+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-24">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
              <button 
                onClick={() => setViewType('grid')}
                className={`p-3 rounded-xl transition-all ${viewType === 'grid' ? 'bg-white shadow-md text-[#0f3460]' : 'text-gray-400'}`}
              >
                <Layout className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewType('list')}
                className={`p-3 rounded-xl transition-all ${viewType === 'list' ? 'bg-white shadow-md text-[#0f3460]' : 'text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <div className="w-px h-8 bg-gray-200 mx-2"></div>
              <div className="flex gap-2">
                {['คอร์สของฉัน', 'แนะนำ', 'ยอดนิยม', 'มาใหม่'].map(tab => (
                  <button key={tab} className="px-4 py-2 text-sm font-bold nav-font text-gray-500 hover:text-[#0f3460]">
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full lg:w-96">
               <input 
                 type="text" 
                 placeholder="ค้นหาคอร์สออนไลน์ที่คุณสนใจ..." 
                 className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c5a059] font-medium text-gray-700"
               />
               <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* LMS Grid View */}
        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-10`}>
          {ONLINE_COURSES.map((course) => (
            <Link to={`/lms/${course.id}`} key={course.id} className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex ${viewType === 'list' ? 'flex-row items-center h-48' : 'flex-col'}`}>
              <div className={`relative ${viewType === 'list' ? 'w-1/3 h-full' : 'h-64'} overflow-hidden`}>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                     <PlayCircle className="w-12 h-12 text-white" />
                   </div>
                </div>
                {course.progress > 0 && (
                   <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl flex items-center justify-between shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0f3460]">เรียนไปแล้ว {course.progress}%</span>
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                           <div className="bg-[#c5a059] h-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                   </div>
                )}
              </div>
              
              <div className={`p-8 flex flex-col flex-grow ${viewType === 'list' ? 'justify-center' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.2em]">{course.category}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0f3460] mb-4 group-hover:text-[#c5a059] transition-colors nav-font leading-tight line-clamp-2">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-6 mt-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs font-bold">{course.lessons} บทเรียน</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#0f3460] overflow-hidden">
                        <img src="https://i.pravatar.cc/100?u=instructor" alt="Instructor" />
                     </div>
                     <span className="text-xs font-bold text-gray-600">{course.instructor}</span>
                  </div>
                  <div className="text-right">
                    {course.progress === 100 ? (
                      <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black nav-font flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> จบคอร์สแล้ว
                      </span>
                    ) : (
                      <span className="text-lg font-black text-[#0f3460] nav-font">฿{course.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Learning Statistics Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { label: 'ใบประกาศนียบัตร', value: 'ดิจิทัลไฟล์', icon: <Award /> },
             { label: 'เข้าถึงเนื้อหา', value: 'ตลอดชีพ', icon: <Clock /> },
             { label: 'คุณภาพวิดีโอ', value: 'Full HD', icon: <PlayCircle /> },
             { label: 'การอัปเดต', value: 'เนื้อหาใหม่เสมอ', icon: <TrendingUp /> }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center mb-6">
                  {stat.icon}
               </div>
               <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
               <p className="text-xl font-black text-[#0f3460] nav-font">{stat.value}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default LMS;
