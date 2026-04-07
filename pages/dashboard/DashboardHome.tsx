import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { BookOpen, Users, Sparkles, ArrowRight, Plus } from 'lucide-react';

interface Stats {
  courses: number;
  speakers: number;
}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ courses: 0, speakers: 0 });
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('courses').select('id', { count: 'exact', head: true }),
      supabase.from('speakers').select('id', { count: 'exact', head: true }),
      supabase.from('courses').select('id, title, slug, category, created_at').order('created_at', { ascending: false }).limit(5),
    ]).then(([coursesRes, speakersRes, recentRes]) => {
      setStats({
        courses: coursesRes.count ?? 0,
        speakers: speakersRes.count ?? 0,
      });
      setRecentCourses(recentRes.data ?? []);
      setLoading(false);
    });
  }, []);

  const STAT_CARDS = [
    {
      label: 'หลักสูตรทั้งหมด',
      value: stats.courses,
      icon: BookOpen,
      color: 'bg-blue-500',
      to: '/dashboard/courses',
    },
    {
      label: 'วิทยากร',
      value: stats.speakers,
      icon: Users,
      color: 'bg-emerald-500',
      to: '/dashboard/speakers',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-[#0f3460] nav-font">ภาพรวม</h1>
        <p className="text-sm text-gray-500 mt-1">CAP Vision Institute — Admin Dashboard</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {STAT_CARDS.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow group"
          >
            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-black text-[#0f3460]">
                {loading ? '—' : card.value}
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.label}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#c5a059] transition-colors" />
          </Link>
        ))}

        {/* AI Generator shortcut */}
        <Link
          to="/dashboard/ai-generator"
          className="bg-gradient-to-br from-[#0f3460] to-[#1a4a8a] rounded-2xl p-6 shadow-sm flex items-center gap-5 hover:shadow-lg transition-shadow group"
        >
          <div className="w-12 h-12 bg-[#c5a059] rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-black text-white">AI Course Generator</div>
            <div className="text-xs text-white/60 mt-0.5">สร้างหลักสูตรด้วย Gemini AI</div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#c5a059] transition-colors" />
        </Link>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 flex-wrap">
        <Link
          to="/dashboard/courses/new"
          className="flex items-center gap-2 bg-[#c5a059] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#b8924d] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          สร้างหลักสูตรใหม่
        </Link>
        <Link
          to="/dashboard/ai-generator"
          className="flex items-center gap-2 bg-white text-[#0f3460] border border-gray-200 px-5 py-3 rounded-xl text-sm font-bold hover:border-[#c5a059] transition-colors shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
          สร้างด้วย AI
        </Link>
      </div>

      {/* Recent courses */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-[#0f3460] uppercase tracking-wider">หลักสูตรล่าสุด</h2>
          <Link to="/dashboard/courses" className="text-xs font-bold text-[#c5a059] hover:underline">
            ดูทั้งหมด
          </Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">กำลังโหลด...</div>
        ) : recentCourses.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">ยังไม่มีหลักสูตร</div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {recentCourses.map((course) => (
              <li key={course.id}>
                <Link
                  to={`/dashboard/courses/${course.id}`}
                  className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#0f3460] truncate">{course.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{course.category} · /courses/{course.slug}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#c5a059] shrink-0 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
