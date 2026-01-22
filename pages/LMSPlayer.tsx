
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Added missing 'X' import from lucide-react
import { PlayCircle, CheckCircle, ChevronRight, ArrowLeft, Download, MessageSquare, BookOpen, Star, Clock, FileText, CheckCircle2, Award, ChevronDown, X } from 'lucide-react';
import { ONLINE_COURSES } from '../constants';

const LMSPlayer: React.FC = () => {
  const { id } = useParams();
  const course = ONLINE_COURSES.find(c => c.id === id) || ONLINE_COURSES[0];
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'resources' | 'quiz' | 'discussion'>('details');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);

  const activeLesson = course.curriculum[activeLessonIdx] || course.curriculum[0];

  const handleQuizOption = (qIdx: number, oIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      {/* Player Top Nav */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-6 h-14 md:h-16 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
        <Link to="/lms-profile" className="flex items-center gap-2 md:gap-3 text-[#0f3460] hover:text-[#c5a059] transition-all font-bold nav-font text-xs md:text-sm">
          <ArrowLeft className="w-4 h-4 md:w-5 h-5" />
          <span className="hidden sm:inline">กลับไปยัง Dashboard</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <div className="flex-grow text-center px-4 max-w-md">
           <h2 className="text-[10px] md:text-sm font-black text-[#0f3460] truncate nav-font uppercase tracking-tight">{course.title}</h2>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2">
             <div className="w-24 md:w-32 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-[#c5a059] h-full" style={{ width: `${course.progress}%` }}></div>
             </div>
             <span className="text-[8px] md:text-[10px] font-black text-[#0f3460] whitespace-nowrap">{course.progress}% COMPLETED</span>
          </div>
          <button 
            onClick={() => setShowCurriculum(!showCurriculum)}
            className="lg:hidden p-2 text-[#0f3460] bg-gray-50 rounded-lg"
          >
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow overflow-hidden relative">
        {/* Main Content (Video Player & Info) */}
        <div className="flex-grow overflow-y-auto h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] scrollbar-hide">
          <div className="max-w-5xl mx-auto">
            {/* Video Placeholder */}
            <div className="aspect-video bg-black md:rounded-[2rem] overflow-hidden shadow-2xl relative mb-6 md:mb-10 group cursor-pointer md:mt-6 md:mx-6 border-b md:border-4 border-white">
              <img src={course.image} className="w-full h-full object-cover opacity-60 blur-[1px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-full border border-white/20 group-hover:scale-110 transition-transform">
                   <PlayCircle className="w-12 h-12 md:w-20 h-20 text-white" />
                 </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/90 text-[10px] md:text-xs font-bold nav-font">
                <span className="truncate max-w-[70%]">{activeLesson.title}</span>
                <span>{activeLesson.duration}</span>
              </div>
            </div>

            <div className="bg-white md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border-t md:border border-gray-100 md:mx-6 md:mb-10">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 md:mb-10">
                <div className="flex-grow">
                  <h1 className="text-xl md:text-3xl font-black text-[#0f3460] mb-3 md:mb-4 nav-font leading-tight">{activeLesson.title}</h1>
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="bg-[#0f3460]/5 px-3 py-1 rounded-full text-[10px] font-bold text-[#0f3460] uppercase tracking-widest">Lesson {activeLessonIdx + 1}</span>
                    <span className="text-[10px] font-medium uppercase">ความยาว {activeLesson.duration} นาที</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setActiveLessonIdx(prev => Math.min(course.curriculum.length - 1, prev + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full md:w-auto bg-[#c5a059] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0f3460] transition-all nav-font shadow-lg active:scale-95"
                >
                  บทเรียนถัดไป <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs Section */}
              <div className="border-t border-gray-100 pt-8 md:pt-10">
                <div className="flex gap-6 md:gap-8 mb-8 md:mb-10 border-b border-gray-50 overflow-x-auto scrollbar-hide">
                  {[
                    { id: 'details', label: 'รายละเอียด', icon: <BookOpen className="w-4 h-4" /> },
                    { id: 'resources', label: 'เอกสาร', icon: <Download className="w-4 h-4" /> },
                    { id: 'quiz', label: 'ควิซ', icon: <Award className="w-4 h-4" /> },
                    { id: 'discussion', label: 'Q&A', icon: <MessageSquare className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`pb-4 text-xs md:text-sm font-black nav-font transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'border-[#c5a059] text-[#0f3460]' : 'border-transparent text-gray-400'}`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Contents */}
                <div className="min-h-[250px] md:min-h-[300px] pb-10">
                  {activeTab === 'details' && (
                    <div className="text-gray-600 leading-relaxed font-medium text-sm md:text-base">
                      <p>ในบทเรียนนี้ {course.instructor} จะพาทุกท่านไปเจาะลึกเนื้อหาของ {activeLesson.title} เพื่อให้ได้ผลลัพธ์ที่นำไปใช้ได้จริง</p>
                      <ul className="space-y-4 mt-8">
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] flex-shrink-0" /> เข้าใจแก่นแท้ของเนื้อหาผ่าน DFA Model</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#c5a059] flex-shrink-0" /> เทคนิคการประยุกต์ใช้ในสถานการณ์จริง</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === 'resources' && (
                    <div className="space-y-4">
                      {activeLesson.resources?.length ? activeLesson.resources.map((res, i) => (
                        <a key={i} href={res.url} className="flex items-center justify-between p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#c5a059] transition-all group">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="p-2 md:p-3 bg-red-50 text-red-500 rounded-xl"><FileText className="w-5 h-5 md:w-6 h-6" /></div>
                            <span className="font-bold text-[#0f3460] nav-font text-sm md:text-base">{res.name}</span>
                          </div>
                          <Download className="w-4 h-4 md:w-5 h-5 text-gray-300 group-hover:text-[#c5a059]" />
                        </a>
                      )) : (
                        <p className="text-center text-gray-400 py-10 text-sm">ไม่มีเอกสารประกอบสำหรับบทเรียนนี้</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'quiz' && (
                    <div className="space-y-6 md:space-y-8">
                      {activeLesson.quiz?.length ? activeLesson.quiz.map((q, qIdx) => (
                        <div key={qIdx} className="bg-gray-50 p-6 md:p-8 rounded-[2rem] border border-gray-100">
                          <h4 className="text-lg md:text-xl font-bold text-[#0f3460] mb-6 nav-font">Q{qIdx+1}: {q.question}</h4>
                          <div className="space-y-3">
                            {q.options.map((opt, oIdx) => (
                              <button 
                                key={oIdx}
                                onClick={() => handleQuizOption(qIdx, oIdx)}
                                className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border text-left font-bold transition-all flex items-center justify-between text-sm md:text-base ${
                                  quizAnswers[qIdx] === oIdx 
                                    ? (quizSubmitted ? (oIdx === q.answer ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'bg-[#0f3460] text-white border-[#0f3460]')
                                    : (quizSubmitted && oIdx === q.answer ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white text-gray-600 hover:bg-gray-50')
                                }`}
                              >
                                {opt}
                                {quizSubmitted && oIdx === q.answer && <CheckCircle className="w-4 h-4 md:w-5 h-5" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )) : (
                        <p className="text-center text-gray-400 py-10 text-sm">ไม่มีแบบทดสอบสำหรับบทเรียนนี้</p>
                      )}
                      {activeLesson.quiz && activeLesson.quiz.length > 0 && !quizSubmitted && (
                        <button 
                          onClick={submitQuiz}
                          className="w-full bg-[#0f3460] text-white py-4 md:py-5 rounded-2xl font-black nav-font shadow-lg hover:bg-[#c5a059] transition-all"
                        >
                          ส่งคำตอบ
                        </button>
                      )}
                    </div>
                  )}

                  {activeTab === 'discussion' && (
                    <div className="space-y-6">
                      <div className="flex gap-3 md:gap-4 items-start">
                        <div className="w-10 h-10 md:w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div className="flex-grow">
                           <textarea className="w-full p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c5a059] text-sm" placeholder="พิมพ์คำถามหรือข้อสงสัยของคุณที่นี่..."></textarea>
                           <button className="mt-3 bg-[#0f3460] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold nav-font text-sm">โพสต์คำถาม</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Course Curriculum) - Desktop View */}
        <div className="hidden lg:block lg:w-96 bg-white border-l border-gray-100 h-[calc(100vh-64px)] overflow-y-auto shadow-inner">
           <div className="p-8 border-b border-gray-100 bg-gray-50/30">
              <h3 className="text-xl font-bold text-[#0f3460] nav-font">เนื้อหาหลักสูตร</h3>
              <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">{course.curriculum.length} บทเรียน • {course.duration}</p>
           </div>
           <div className="divide-y divide-gray-50">
              {course.curriculum.map((lesson, i) => (
                <div 
                  key={i} 
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-all flex items-start gap-4 ${activeLessonIdx === i ? 'bg-[#0f3460]/5 border-r-4 border-[#c5a059]' : ''}`}
                  onClick={() => setActiveLessonIdx(i)}
                >
                   <div className="flex-shrink-0 mt-1">
                      {lesson.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : activeLessonIdx === i ? (
                        <PlayCircle className="w-6 h-6 text-[#c5a059]" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-300">
                          {i + 1}
                        </div>
                      )}
                   </div>
                   <div className="flex-grow">
                      <p className={`text-sm font-bold nav-font leading-snug mb-2 ${activeLessonIdx === i ? 'text-[#0f3460]' : 'text-gray-600'}`}>{lesson.title}</p>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                         <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span>
                         {activeLessonIdx === i && <span className="bg-[#c5a059] text-white px-2 py-0.5 rounded text-[8px]">กำลังเรียน</span>}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Sidebar (Course Curriculum) - Mobile View Slide-over */}
        {showCurriculum && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-lg font-bold text-[#0f3460] nav-font">เนื้อหาหลักสูตร</h3>
                <button onClick={() => setShowCurriculum(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="divide-y divide-gray-50 pb-10">
                {course.curriculum.map((lesson, i) => (
                  <div 
                    key={i} 
                    className={`p-5 cursor-pointer flex items-start gap-4 ${activeLessonIdx === i ? 'bg-[#0f3460]/5 border-r-4 border-[#c5a059]' : ''}`}
                    onClick={() => {
                      setActiveLessonIdx(i);
                      setShowCurriculum(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : activeLessonIdx === i ? (
                        <PlayCircle className="w-5 h-5 text-[#c5a059]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-300">
                          {i + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`text-xs font-bold nav-font leading-snug mb-1 ${activeLessonIdx === i ? 'text-[#0f3460]' : 'text-gray-600'}`}>{lesson.title}</p>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LMSPlayer;
