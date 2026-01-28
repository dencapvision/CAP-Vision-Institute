import React from 'react';
import {
  Award,
  BarChart3,
  BookOpen,
  ChevronRight,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const navItems = [
    { label: 'คอร์สของฉัน', icon: BookOpen, active: true },
    { label: 'ผลการเรียน', icon: BarChart3, active: false },
    { label: 'ใบประกาศนียบัตร', icon: Award, active: false },
  ];

  const ongoingCourse = {
    title: 'ผู้นำที่สร้างแรงบันดาลใจในองค์กร',
    lessons: 12,
    duration: '4h 30m',
    progress: 68,
    nextLesson: 'บทที่ 7: Stakeholder Influence',
  };

  const recommendedCourses = [
    {
      title: 'Leadership Essentials',
      tag: 'Leadership',
      level: 'Intermediate',
      duration: '3h 10m',
    },
    {
      title: 'EQ for Modern Leaders',
      tag: 'EQ',
      level: 'Beginner',
      duration: '2h 45m',
    },
    {
      title: 'Coaching Mindset at Work',
      tag: 'Coaching',
      level: 'Advanced',
      duration: '5h 05m',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="space-y-6">
            <div className="bg-white rounded-[2rem] border border-blue-100/60 shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0f3460] text-white flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Student</p>
                  <p className="text-lg font-black text-[#0f3460] nav-font">Dashboard</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-4">เมนูหลัก</p>
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <button
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold nav-font transition-all ${
                          item.active
                            ? 'bg-[#0f3460] text-white shadow-lg'
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="space-y-8">
            <header className="bg-white rounded-[2.5rem] border border-blue-100/60 shadow-xl p-8 overflow-hidden relative">
              <div className="absolute -right-16 -top-20 w-56 h-56 rounded-full bg-gradient-to-br from-blue-100 to-transparent" />
              <div className="absolute -left-20 -bottom-24 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-50 to-transparent" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold mb-3">CAP Vision Institute LMS</p>
                  <h1 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font leading-tight">
                    ยินดีต้อนรับกลับมา พร้อมพัฒนาศักยภาพต่อเนื่อง
                  </h1>
                  <p className="text-slate-500 mt-3 max-w-2xl">
                    ติดตามความก้าวหน้า เรียนต่อจากบทล่าสุด และค้นหาหลักสูตรที่ตรงกับเป้าหมายของคุณ
                  </p>
                </div>
                <button className="w-full lg:w-auto px-6 py-3 bg-[#0f3460] text-white rounded-2xl font-bold nav-font shadow-lg hover:bg-[#0b2a4a] transition-all">
                  เปิดบทเรียนล่าสุด
                </button>
              </div>
            </header>

            <section className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold mb-2">Course Progress</p>
                    <h2 className="text-2xl font-black text-[#0f3460] nav-font">คอร์สที่กำลังเรียนอยู่</h2>
                  </div>
                  <button className="text-[#0f3460] font-bold nav-font flex items-center gap-2 hover:text-[#c5a059] transition-colors">
                    ดูทั้งหมด <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-[#f1f6fb] rounded-[2rem] p-6 border border-blue-100/70">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#0f3460] text-white flex items-center justify-center shadow-lg">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">In Progress</p>
                      <h3 className="text-xl font-bold text-[#0f3460] nav-font mt-1">{ongoingCourse.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-bold mt-3">
                        <span>{ongoingCourse.lessons} บทเรียน</span>
                        <span>{ongoingCourse.duration}</span>
                        <span>บทถัดไป: {ongoingCourse.nextLesson}</span>
                      </div>
                      <div className="mt-5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>ความคืบหน้า</span>
                          <span className="text-[#0f3460]">{ongoingCourse.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
                          <div
                            className="h-full bg-[#0f3460] rounded-full transition-all duration-700"
                            style={{ width: `${ongoingCourse.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-6 py-3 bg-white text-[#0f3460] border border-blue-200 rounded-2xl font-bold nav-font hover:border-[#0f3460] transition-all">
                      เรียนต่อ
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Recommended</p>
                    <h3 className="text-xl font-black text-[#0f3460] nav-font">หลักสูตรแนะนำ</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div
                      key={course.title}
                      className="group p-4 rounded-2xl border border-slate-100 hover:border-[#c5a059] hover:bg-[#fffbf5] transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-bold mb-2">
                            {course.tag}
                          </p>
                          <h4 className="text-base font-bold text-[#0f3460] nav-font">{course.title}</h4>
                          <p className="text-xs text-slate-400 font-bold mt-2">
                            {course.level} • {course.duration}
                          </p>
                        </div>
                        <button className="px-4 py-2 rounded-xl text-xs font-bold nav-font text-[#0f3460] bg-blue-50 group-hover:bg-[#0f3460] group-hover:text-white transition-all">
                          ดูรายละเอียด
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
