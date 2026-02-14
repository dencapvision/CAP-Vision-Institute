
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Award, Star, MessageCircle, Phone, Globe, BookOpen } from 'lucide-react';
import { SPEAKERS } from '../constants/speakers';
import { COURSES } from '../constants/courses';
import { CONTACT_INFO } from '../constants/brand';

const SpeakerDetail: React.FC = () => {
   const { id } = useParams();
   const speaker = SPEAKERS.find(s => s.id === id);
   const taughtCourses = COURSES.filter(c => c.instructor?.id === id);

   if (!speaker) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl max-w-lg">
               <h2 className="text-2xl font-black text-[#0f3460] mb-4 nav-font">ไม่พบข้อมูลวิทยากร</h2>
               <Link to="/speakers" className="text-[#c5a059] font-bold nav-font flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> กลับหน้าวิทยากร
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="bg-gray-50 min-h-screen">
         {/* Hero Section */}
         <div className="bg-[#0f3460] pt-20 pb-40 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
               <Award className="w-full h-full transform translate-y-1/4" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <Link to="/speakers" className="inline-flex items-center gap-2 text-blue-200 hover:text-[#c5a059] transition-colors font-bold mb-10 nav-font text-sm uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
               </Link>
               <div className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="lg:w-1/3">
                     <div className="bg-white p-4 rounded-[3rem] shadow-2xl relative">
                        <img src={speaker.image} alt={speaker.name} className="w-full h-[450px] object-cover rounded-[2.5rem]" />
                        <div className="absolute -bottom-8 -right-8 bg-[#c5a059] p-8 rounded-[2rem] shadow-xl text-white text-center border-4 border-white">
                           <Star className="w-8 h-8 mb-1 mx-auto" />
                           <p className="text-xs font-black nav-font uppercase tracking-widest">Certified Master</p>
                        </div>
                     </div>
                  </div>
                  <div className="lg:w-2/3">
                     <h1 className="text-4xl md:text-6xl font-black mb-6 nav-font leading-tight">{speaker.name}</h1>
                     <p className="text-xl text-[#c5a059] font-bold uppercase tracking-[0.2em] mb-10 nav-font">{speaker.title}</p>
                     <p className="text-xl text-blue-100/80 font-light leading-relaxed mb-10 max-w-2xl">{speaker.longBio}</p>

                     <div className="flex flex-wrap gap-4">
                        <a href={CONTACT_INFO.lineUrl} className="bg-white text-[#0f3460] px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#c5a059] hover:text-white transition-all nav-font">
                           <MessageCircle className="w-5 h-5" /> นัดปรึกษา In-house
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Expertise & Achievements */}
               <div className="lg:col-span-2 space-y-12">
                  {/* Expertise */}
                  <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                     <h2 className="text-2xl font-black text-[#0f3460] mb-8 nav-font border-l-4 border-[#c5a059] pl-6">ความเชี่ยวชาญ (Expertise)</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {speaker.expertise.map((exp, i) => (
                           <div key={i} className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#c5a059] transition-all">
                              <CheckCircle2 className="w-6 h-6 text-[#c5a059] flex-shrink-0" />
                              <span className="font-bold text-[#0f3460] nav-font">{exp}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                     <h2 className="text-2xl font-black text-[#0f3460] mb-8 nav-font border-l-4 border-[#c5a059] pl-6">ผลงานและประสบการณ์ (Key Results)</h2>
                     <ul className="space-y-6">
                        {speaker.achievements.map((ach, i) => (
                           <li key={i} className="flex gap-6 items-start">
                              <div className="w-12 h-12 bg-[#0f3460]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                 <Award className="w-6 h-6 text-[#c5a059]" />
                              </div>
                              <p className="text-lg text-gray-600 font-medium leading-relaxed pt-2">{ach}</p>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               {/* Courses Sidebar */}
               <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8">
                     <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <h3 className="text-xl font-black text-[#0f3460] mb-8 nav-font flex items-center gap-3">
                           <BookOpen className="w-6 h-6 text-[#c5a059]" />
                           หลักสูตรที่สอน
                        </h3>
                        <div className="space-y-6">
                           {taughtCourses.map((course) => (
                              <Link
                                 key={course.id}
                                 to={`/courses/${course.id}`}
                                 className="group block p-4 rounded-2xl border border-gray-50 hover:border-[#c5a059] hover:bg-gray-50 transition-all"
                              >
                                 <img src={course.image} className="w-full h-32 object-cover rounded-xl mb-4" />
                                 <h4 className="font-bold text-[#0f3460] group-hover:text-[#c5a059] transition-colors nav-font mb-2">{course.title}</h4>
                                 <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest">{course.category}</p>
                              </Link>
                           ))}
                        </div>
                     </div>

                     <div className="bg-gradient-to-br from-[#c5a059] to-[#e0c58e] p-10 rounded-[2.5rem] text-white shadow-xl">
                        <h4 className="text-xl font-black mb-4 nav-font">Contact Details</h4>
                        <p className="text-white/80 font-medium mb-8">ช่องทางติดตามและติดต่อสอบถามตารางงานวิทยากร</p>
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <Globe className="w-5 h-5" />
                              <span className="font-bold text-sm">@thecapvision</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <MessageCircle className="w-5 h-5" />
                              <span className="font-bold text-sm">{speaker.socials?.line || CONTACT_INFO.line}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SpeakerDetail;
