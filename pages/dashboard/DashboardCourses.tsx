import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Search, ExternalLink, Edit, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  created_at: string;
}

const CATEGORIES = ['ทั้งหมด', 'Leader Skills', 'People Skills', 'Work Skills', 'Think Skills'];

const DashboardCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ทั้งหมด');

  useEffect(() => {
    supabase
      .from('courses')
      .select('id, title, slug, category, description, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setCourses(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = courses.filter((c) => {
    const matchCat = category === 'ทั้งหมด' || c.category === category;
    const matchSearch =
      !search ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.slug?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0f3460] nav-font">หลักสูตรทั้งหมด</h1>
          <p className="text-sm text-gray-500 mt-1">{courses.length} หลักสูตร</p>
        </div>
        <Link
          to="/dashboard/courses/new"
          className="flex items-center gap-2 bg-[#c5a059] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#b8924d] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          สร้างหลักสูตรใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาหลักสูตร..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                category === cat
                  ? 'bg-[#0f3460] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-gray-400">กำลังโหลด...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">ไม่พบหลักสูตร</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">หลักสูตร</th>
                  <th className="text-left px-4 py-4 text-xs font-black text-gray-400 uppercase tracking-wider hidden md:table-cell">หมวดหมู่</th>
                  <th className="text-left px-4 py-4 text-xs font-black text-gray-400 uppercase tracking-wider hidden lg:table-cell">Slug</th>
                  <th className="px-4 py-4 w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#0f3460] line-clamp-1">{course.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{course.description}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {course.category || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {course.slug}
                      </code>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          to={`/courses/${course.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0f3460] transition-colors"
                          title="ดูหน้าเว็บ"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/dashboard/courses/${course.id}`}
                          className="p-1.5 rounded-lg hover:bg-[#c5a059]/10 text-gray-400 hover:text-[#c5a059] transition-colors"
                          title="แก้ไข"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCourses;
