import React, { useState } from 'react';
import { Sparkles, Layout, ChevronRight, History, Settings, Bell, Search, Plus } from 'lucide-react';
import CourseCategorySelector, { COURSE_CATEGORIES } from './CourseCategorySelector';
import CourseInputForm, { CourseFormData } from './CourseInputForm';
import CoursePreview from './CoursePreview';
import SmartSuggest from './SmartSuggest';

const CourseDesignPlatform: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(COURSE_CATEGORIES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);

  const handleGenerate = (formData: CourseFormData) => {
    setIsGenerating(true);
    
    // Simulate AI Generation Logic
    setTimeout(() => {
      const mockData = {
        title: formData.topic || "Premium In-house Training",
        description: `หลักสูตรนี้ถูกออกแบบมาเพื่อแก้ปัญหา ${formData.pain_point} โดยเน้นให้ ${formData.target_audience} สามารถบรรลุเป้าหมาย ${formData.expected_outcome} ผ่านกระบวนการเรียนรู้แบบ 6D CPS Model`,
        objectives: [
          "เข้าใจหลักการสำคัญและ Framework ในการทำงานระดับสากล",
          "ฝึกปฏิบัติผ่าน Workshop ที่จำลองสถานการณ์จริงจาก Pain Point",
          "สร้าง Action Plan ที่สามารถนำกลับไปใช้งานได้ทันทีหลังจบการอบรม"
        ],
        modules: [
          {
            id: 1,
            title: "D1: Discover - สำรวจรากเหง้าของปัญหา",
            content: "การค้นหาต้นตอที่แท้จริงของปัญหาผ่านเทคนิค 5-Whys และ Mindset การสำรวจ",
            workshop: "Problem Tree Analysis: วาดต้นไม้ปัญหาของทีมคุณเอง",
            outcome: "ผู้เข้าอบรมเห็นภาพรวมของปัญหาที่ซับซ้อนได้ชัดเจนขึ้น"
          },
          {
            id: 2,
            title: "D2: Define - ระบุโจทย์ที่ถูกต้อง",
            content: "การตั้งคำถามเชิงบวก 'How Might We' เพื่อเปลี่ยนปัญหาให้เป็นโอกาส",
            workshop: "Framing the Challenge: การเขียน Problem Statement ใหม่",
            outcome: "มีความชัดเจนในเป้าหมายที่ต้องแก้ไข"
          },
          {
            id: 3,
            title: "D3: Design - ออกแบบทางเลือกใหม่",
            content: "ใช้เทคนิค Divergent Thinking เพื่อสร้างไอเดียให้หลากหลายที่สุด",
            workshop: "Brainstorming with Constraint: ระดมสมองภายใต้ข้อจำกัด",
            outcome: "ได้ไอเดียเบื้องต้นอย่างน้อย 10-20 ไอเดีย"
          },
          {
            id: 4,
            title: "D4: Develop - พัฒนาสู่แนวทางปฏิบัติ",
            content: "การคัดเลือกและขัดเกลาไอเดีย (Convergent Thinking)",
            workshop: "Idea Matrix: การเลือกลำดับความสำคัญของทางเลือก",
            outcome: "เลือกทางเลือกที่ดีที่สุด 1-2 อย่าง"
          },
          {
            id: 5,
            title: "D5: Deploy - วางแผนการนำไปใช้",
            content: "การทำ Prototype เบื้องต้นและวางแผน Resource ที่ต้องใช้",
            workshop: "Action Roadmap 30-60-90 days",
            outcome: "มีแผนงานที่เป็นรูปธรรม 1 ชุด"
          },
          {
            id: 6,
            title: "D6: Deliver - นำเสนอและประเมินผล",
            content: "การ Pitching ไอเดียและเกณฑ์การวัดผล Success Metrics",
            workshop: "Group Presentation & Feedback Loop",
            outcome: "ได้รับ Feedback เพื่อนำไปปรับปรุงแผนงานจริง"
          }
        ],
        activities: [
          "Ice Breaking: Marshmallow Challenge การสวมบทบาทการทำงานเป็นทีม",
          "Role Play: สถานการณ์รับมือกับปัญหาหน้างานจริง",
          "Group Coaching: การแลกเปลี่ยนมุมมองกับวิทยากรในกลุ่มย่อย",
          "Digital Tools: การใช้เทคโนโลยีช่วยในการระดมสมองและจัดการข้อมูล"
        ]
      };
      
      setCourseData(mockData);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0f3460] font-sans selection:bg-blue-100 selection:text-[#1D4ED8]">
      {/* Header Nav */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1D4ED8] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight nav-font">Course Designer</h1>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">CAP Vision Platform</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <button className="px-6 py-2 bg-blue-50 text-[#1D4ED8] rounded-xl text-sm font-bold transition-all">Editor</button>
            <button className="px-6 py-2 text-gray-400 hover:text-gray-600 rounded-xl text-sm font-bold transition-all">Library</button>
            <button className="px-6 py-2 text-gray-400 hover:text-gray-600 rounded-xl text-sm font-bold transition-all">Instructors</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden md:block">
            <Search className="w-4 h-4 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#1D4ED8] transition-colors" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="bg-gray-50 border-none rounded-2xl py-2.5 pl-11 pr-6 text-sm font-medium focus:ring-2 focus:ring-blue-100 w-64 transition-all" 
            />
          </div>
          <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <div className="w-10 h-10 bg-gray-100 rounded-full border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Den" alt="User" />
          </div>
        </div>
      </header>

      <main className="pt-28 pb-12 px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Section A: Selection & Input (Left) */}
          <div className="lg:col-span-4 space-y-10">
            {/* Sidebar Categories */}
            <section className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-100/50">
              <CourseCategorySelector 
                selectedCategoryId={selectedCategoryId}
                onSelect={setSelectedCategoryId}
              />
            </section>

            {/* Input Form */}
            <section className="animate-slide-up">
              <CourseInputForm 
                onSubmit={handleGenerate}
                isLoading={isGenerating}
              />
            </section>

            {/* Smart Suggest (Section B Alternative Position for Responsive) */}
            <section className="hidden xl:block">
              <SmartSuggest />
            </section>
          </div>

          {/* Section C: Preview (Center/Right) */}
          <div className="lg:col-span-8 animate-fade-in">
            <CoursePreview 
              data={courseData}
              isLoading={isGenerating}
            />
          </div>

        </div>
      </main>

      {/* Background Orbs */}
      <div className="fixed top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50/50 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-50/30 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
};

export default CourseDesignPlatform;
