import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Tag, BookOpen, FileText, Loader2, PlayCircle } from 'lucide-react';

interface CategoryStats {
  name: string;
  courseCount: number;
  articleCount: number;
  onlineCourseCount: number;
}

const DashboardCategories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryStats();
  }, []);

  const fetchCategoryStats = async () => {
    try {
      setLoading(true);
      
      // Fetch courses
      const { data: courses } = await supabase.from('courses').select('category');
      
      // Fetch articles
      const { data: articles } = await supabase.from('articles').select('category');
      
      // Fetch online courses
      const { data: onlineCourses } = await supabase.from('online_courses').select('category');

      const statsMap = new Map<string, CategoryStats>();

      const addStat = (cat: string | null | undefined, type: 'course' | 'article' | 'online') => {
        if (!cat) return;
        const name = cat.trim();
        if (!name) return;

        if (!statsMap.has(name)) {
          statsMap.set(name, { name, courseCount: 0, articleCount: 0, onlineCourseCount: 0 });
        }
        
        const stat = statsMap.get(name)!;
        if (type === 'course') stat.courseCount++;
        else if (type === 'article') stat.articleCount++;
        else if (type === 'online') stat.onlineCourseCount++;
      };

      (courses || []).forEach(c => addStat(c.category, 'course'));
      (articles || []).forEach(a => addStat(a.category, 'article'));
      (onlineCourses || []).forEach(oc => addStat(oc.category, 'online'));

      const sortedCategories = Array.from(statsMap.values()).sort((a, b) => {
        const totalA = a.courseCount + a.articleCount + a.onlineCourseCount;
        const totalB = b.courseCount + b.articleCount + b.onlineCourseCount;
        return totalB - totalA;
      });

      setCategories(sortedCategories);
    } catch (error) {
      console.error('Error fetching generic categories:', error);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูลหมวดหมู่');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#c5a059]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font">Categories / Tags</h1>
        <p className="text-gray-500 font-medium">ภาพรวมหมวดหมู่ที่ถูกใช้งานในหลักสูตรและบทความ (อิงจากข้อมูลล่าสุด)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0f3460]/5 rounded-xl">
                  <Tag className="w-6 h-6 text-[#0f3460]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3460] nav-font">{cat.name}</h3>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <BookOpen className="w-4 h-4" /> In-house Courses
                </span>
                <span className="font-bold text-[#0f3460] bg-gray-50 px-3 py-1 rounded-lg">
                  {cat.courseCount}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <PlayCircle className="w-4 h-4" /> Online Courses
                </span>
                <span className="font-bold text-[#0f3460] bg-gray-50 px-3 py-1 rounded-lg">
                  {cat.onlineCourseCount}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <FileText className="w-4 h-4" /> Articles
                </span>
                <span className="font-bold text-[#0f3460] bg-gray-50 px-3 py-1 rounded-lg">
                  {cat.articleCount}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-[2rem] border border-gray-100">
            <Tag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>ยังไม่มีการใช้งานหมวดหมู่ใดๆ ในระบบ</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <h4 className="font-bold text-[#0f3460] nav-font mb-2">💡 แนะนำเกี่ยวกับการจัดการหมวดหมู่</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          ปัจจุบันหมวดหมู่ในระบบเป็นแบบ Dynamic ซึ่งจะถูกดึงมาจากรายชื่อหมวดหมู่ที่ถูกใช้ใน "หลักสูตร" และ "บทความ" 
          เมื่อคุณกำหนดหมวดหมู่ใหม่ให้กับบทความ หรือหลักสูตร ระบบจะเรียนรู้และนำหมวดหมู่นั้นมาแสดงผลโดยอัตโนมัติ 
          (ไม่ต้องสร้างหมวดหมู่ก่อน) หากต้องการซ่อน/ลบหมวดหมู่ ให้เปลี่ยนหมวดหมู่ของรายการที่ผูกอยู่ออกให้หมด
        </p>
      </div>
    </div>
  );
};

export default DashboardCategories;
