
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Clock, Settings, LogOut, ChevronRight, PlayCircle, Star, Target } from 'lucide-react';
import { ONLINE_COURSES, BRAND_INFO } from '../constants';

const LMSProfile: React.FC = () => {
  const myCourses = ONLINE_COURSES.filter(c => c.progress > 0);
  const user = {
    name: "Member CAP Vision",
    email: "member@example.com",
    avatar: "https://i.pravatar.cc/150?u=capvisionmember"
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Profile Header */}
      <div className="bg-[#0f3460] pt-20 pb-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Award className="w-96 h-96 absolute -bottom-20 -right-20 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
             </div>
             <div className="text-center md:text-left">
                <h1 className="text-4xl font-black text-white nav-font mb-2">{user.name}</h1>
                <p className="text-blue-200 font-medium opacity-70 mb-6">{user.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                   <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white nav-font">สมาชิกพรีเมียม</span>
                   <span className="bg-[#c5a059] px-4 py-2 rounded-xl text-xs font-bold text-white nav-font">Level: Practitioner</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
                <ul className="space-y-2">
                   {[
                     { label: 'คอร์สของฉัน', icon: <BookOpen />, active: true },
                     { label: 'ใบประกาศนียบัตร', icon: <Award />, active: false },
                     { label: 'สถิติการเรียน', icon: <Target />, active: false },
                     { label: 'ตั้งค่าบัญชี', icon: <Settings />, active: false },
                   ].map((item, i) => (
                     <li key={i}>
                        <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold nav-font transition-all ${item.active ? 'bg-[#0f3460] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
                           {React.cloneElement(item.icon as any, { className: "w-5 h-5" })}
                           {item.label}
                        </button>
                     </li>
                   ))}
                </ul>
                <div className="mt-8 pt-8 border-t border-gray-50">
                   <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold nav-font text-red-500 hover:bg-red-50 transition-all">
                      <LogOut className="w-5 h-5" /> ออกจากระบบ
                   </button>
                </div>
             </div>
          </div>

          {/* Main Profile Content */}
          <div className="lg:col-span-3 space-y-10">
             {/* Stats Row */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'คอร์สที่กำลังเรียน', value: myCourses.length, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'คอร์สที่เรียนจบแล้ว', value: ONLINE_COURSES.filter(c => c.progress === 100).length, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'จำนวนใบเซอร์', value: ONLINE_COURSES.filter(c => c.progress === 100).length, color: 'text-[#c5a059]', bg: 'bg-[#c5a059]/10' }
                ].map((stat, i) => (
                  <div key={i} className={`p-8 rounded-[2.5rem] border border-gray-50 shadow-sm bg-white`}>
                     <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                     <p className={`text-4xl font-black nav-font ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
             </div>

             {/* Ongoing Courses */}
             <div className="bg-white rounded-[3rem] shadow-xl p-10 border border-gray-100">
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-2xl font-black text-[#0f3460] nav-font">คอร์สที่กำลังดำเนินการ</h2>
                   <Link to="/lms" className="text-[#c5a059] font-bold nav-font flex items-center gap-2 hover:gap-4 transition-all">ดูคอร์สทั้งหมด <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="space-y-6">
                   {myCourses.map((course) => (
                     <div key={course.id} className="group p-6 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:border-[#c5a059] hover:bg-white transition-all flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-48 h-32 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg">
                           <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                           <h3 className="text-xl font-bold text-[#0f3460] mb-3 nav-font">{course.title}</h3>
                           <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-gray-400 font-bold mb-4">
                              <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> {course.lessons} บทเรียน</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                                 <div className="bg-[#c5a059] h-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                              </div>
                              <span className="text-xs font-black text-[#0f3460] nav-font">{course.progress}%</span>
                           </div>
                        </div>
                        <Link 
                          to={`/lms/${course.id}`}
                          className="w-full md:w-auto px-8 py-4 bg-[#0f3460] text-white rounded-2xl font-bold nav-font shadow-lg hover:bg-[#c5a059] transition-all whitespace-nowrap"
                        >
                          เรียนต่อ
                        </Link>
                     </div>
                   ))}
                   {myCourses.length === 0 && (
                     <div className="text-center py-16">
                        <p className="text-gray-400 font-bold mb-6">คุณยังไม่มีคอร์สที่กำลังเรียนอยู่</p>
                        <Link to="/lms" className="inline-block bg-[#0f3460] text-white px-10 py-4 rounded-2xl font-bold nav-font">เลือกคอร์สเรียนเลย</Link>
                     </div>
                   )}
                </div>
             </div>

             {/* Certificates Section (Mock) */}
             <div className="bg-white rounded-[3rem] shadow-xl p-10 border border-gray-100">
                <h2 className="text-2xl font-black text-[#0f3460] nav-font mb-10">ใบประกาศนียบัตรของคุณ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {ONLINE_COURSES.filter(c => c.progress === 100).map(course => (
                     <div key={course.id} className="p-8 border-2 border-dashed border-[#c5a059]/30 rounded-[2.5rem] flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center text-[#c5a059]">
                           <Award className="w-8 h-8" />
                        </div>
                        <div className="flex-grow">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">COMPLETED</p>
                           <h4 className="font-bold text-[#0f3460] nav-font mb-2">{course.title}</h4>
                           <button className="text-[#c5a059] text-xs font-black underline nav-font">ดาวน์โหลดใบเซอร์ (PDF)</button>
                        </div>
                     </div>
                   ))}
                   {ONLINE_COURSES.filter(c => c.progress === 100).length === 0 && (
                      <div className="col-span-full text-center py-10 text-gray-400">
                         เรียนจบหลักสูตรเพื่อรับใบประกาศนียบัตรพรีเมียม
                      </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSProfile;
