
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Users, Calendar, Award, Star, MessageCircle, Phone, ChevronDown, ChevronRight, Plus, Minus, Target, ShieldCheck, Zap } from 'lucide-react';
import { COURSES } from '../constants/courses';
import { CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';

const CourseDetail: React.FC = () => {
   const { id } = useParams();
   const course = COURSES.find(c => c.id === id);
   const [expandedObjectives, setExpandedObjectives] = useState<number[]>([]);

   if (!course) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl max-w-lg border border-gray-100">
               <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10" />
               </div>
               <h2 className="text-3xl font-black text-[#0f3460] mb-4 nav-font">ขออภัย ไม่พบหลักสูตรที่คุณต้องการ</h2>
               <p className="text-gray-500 mb-8 font-medium">หลักสูตรนี้อาจถูกย้ายหรือไม่มีอยู่ในระบบปัจจุบัน</p>
               <Link to="/courses" className="inline-flex items-center gap-2 bg-[#0f3460] text-white px-8 py-4 rounded-2xl font-bold nav-font transition-all hover:bg-[#c5a059]">
                  <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลักสูตร
               </Link>
            </div>
         </div>
      );
   }

   const toggleObjective = (index: number) => {
      setExpandedObjectives(prev =>
         prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
   };

   return (
      <div className="bg-gray-50 min-h-screen">
         <SEO
            title={course.title}
            description={course.description}
         />
         {/* Course Hero */}
         <div className="bg-[#0f3460] text-white pt-20 pb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
               <Award className="w-full h-full transform translate-x-1/4" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <Link to="/courses" className="inline-flex items-center gap-2 text-blue-200 hover:text-[#c5a059] transition-colors font-bold mb-10 nav-font text-sm uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
               </Link>
               <div className="flex flex-col lg:flex-row gap-16 items-start">
                  <div className="lg:w-3/5">
                     <span className="bg-[#c5a059] text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block nav-font">
                        {course.category}
                     </span>
                     <h1 className="text-4xl md:text-6xl font-black mb-8 nav-font leading-tight">
                        {course.title.split(' ').map((word, i) => (
                           <span key={i} className={i % 2 !== 0 ? 'font-gold' : ''}>{word} </span>
                        ))}
                     </h1>
                     <p className="text-xl text-blue-100 font-light opacity-80 leading-relaxed mb-10 max-w-2xl reveal-staggered active">
                        {course.description}
                     </p>
                     <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                              <Clock className="w-6 h-6 text-[#c5a059]" />
                           </div>
                           <div>
                              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Duration</p>
                              <p className="text-sm font-bold">{course.duration || 'Flexible'}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                              <Users className="w-6 h-6 text-[#c5a059]" />
                           </div>
                           <div>
                              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Target Audience</p>
                              <p className="text-sm font-bold">{course.audience || 'All Levels'}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                              <Star className="w-6 h-6 text-[#c5a059]" />
                           </div>
                           <div>
                              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Rating</p>
                              <p className="text-sm font-bold">4.9/5.0 Premium</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="lg:w-2/5 w-full">
                     <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl relative reveal-staggered active">
                        <img src={course.image} alt={course.title} className="w-full h-[400px] object-cover rounded-[2rem] shadow-inner" loading="lazy" />
                        <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[2rem] shadow-xl border border-gray-50 hidden md:block">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                                 <CheckCircle2 className="w-6 h-6 text-green-500" />
                              </div>
                              <p className="text-sm font-black text-[#0f3460] nav-font">Available for<br />In-house Training</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Main Content Area */}
               <div className="lg:col-span-2 space-y-16">

                  {/* Why Section */}
                  {course.why && (
                     <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-black text-[#0f3460] mb-12 nav-font">Why? ทำไมต้องเรียนหลักสูตรนี้</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           {course.why.map((item, idx) => (
                              <div key={idx} className="bg-gray-50 p-8 rounded-[2rem] text-center group hover:bg-[#0f3460] transition-all">
                                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-[#c5a059] shadow-sm group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                                    {item.icon ? React.cloneElement(item.icon as any, { className: "w-6 h-6" }) : <Target className="w-6 h-6" />}
                                 </div>
                                 <span className="text-3xl font-black text-[#0f3460] group-hover:text-white block mb-1 nav-font">{item.stat}</span>
                                 <h4 className="text-xs font-bold text-[#c5a059] mb-3 nav-font uppercase tracking-widest">{item.label}</h4>
                                 <p className="text-[10px] text-gray-500 group-hover:text-blue-100/70 leading-relaxed">{item.desc}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* How Section */}
                  {course.how && (
                     <div className="bg-[#0f3460] p-12 rounded-[3rem] shadow-xl text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <Zap className="w-48 h-48" />
                        </div>
                        <h2 className="text-3xl font-black mb-12 nav-font text-[#c5a059]">How? วิธีการเรียนรู้ของเรา</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                           {course.how.map((item, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all">
                                 <div className="w-10 h-10 bg-[#c5a059] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                                    {item.icon ? React.cloneElement(item.icon as any, { className: "w-5 h-5 text-white" }) : <Target className="w-5 h-5 text-white" />}
                                 </div>
                                 <h4 className="text-lg font-bold text-[#c5a059] mb-3 nav-font">{item.title}</h4>
                                 <p className="text-blue-100/70 text-xs leading-relaxed">{item.desc}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* What Section */}
                  {course.what && (
                     <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-black text-[#0f3460] mb-12 nav-font">What? สิ่งที่ผู้เข้าอบรมจะได้รับ</h2>
                        <div className="space-y-4">
                           {course.what.map((item, idx) => (
                              <div key={idx} className="flex gap-4 items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#c5a059] transition-all">
                                 <ShieldCheck className="w-6 h-6 text-green-500" />
                                 <span className="text-lg font-bold text-[#0f3460] nav-font">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Original Description & Objectives Accordion */}
                  <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                     <h2 className="text-3xl font-black text-[#0f3460] mb-8 nav-font">โครงสร้างหลักสูตรและกิจกรรม</h2>
                     <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium opacity-90">
                        <p className="text-xl mb-12">{course.longDescription}</p>

                        <h3 className="text-2xl font-black text-[#0f3460] mt-16 mb-10 nav-font flex items-center gap-4">
                           <Target className="w-8 h-8 text-[#c5a059]" />
                           หัวข้อกิจกรรม (Agenda & Activities)
                        </h3>

                        <div className="space-y-4">
                           {course.objectives?.map((obj, i) => {
                              const isExpanded = expandedObjectives.includes(i);
                              return (
                                 <div
                                    key={i}
                                    className={`overflow-hidden border rounded-3xl transition-all duration-300 ${isExpanded
                                       ? 'border-[#c5a059] bg-white shadow-xl shadow-gold-500/5 translate-x-2'
                                       : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200'
                                       }`}
                                 >
                                    <button
                                       onClick={() => toggleObjective(i)}
                                       className="w-full flex items-center justify-between p-6 text-left group"
                                       aria-expanded={isExpanded}
                                    >
                                       <div className="flex items-center gap-5">
                                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#c5a059] text-white' : 'bg-white text-[#c5a059] border border-gray-100'
                                             }`}>
                                             <CheckCircle2 className="w-5 h-5" />
                                          </div>
                                          <span className={`text-lg font-bold nav-font transition-colors ${isExpanded ? 'text-[#0f3460]' : 'text-gray-700'
                                             }`}>
                                             {obj}
                                          </span>
                                       </div>
                                       <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                          {isExpanded ? <Minus className="w-5 h-5 text-[#c5a059]" /> : <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#c5a059]" />}
                                       </div>
                                    </button>

                                    <div
                                       className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                          }`}
                                    >
                                       <div className="px-20 pb-8 pt-2 text-gray-500 font-medium leading-relaxed border-t border-gray-50/50">
                                          <p className="mt-4">
                                             ในหัวข้อนี้ เราจะใช้กระบวนการเรียนรู้แบบ Activity-Based Learning เพื่อช่วยให้ผู้เรียนเข้าใจแก่นแท้และสามารถนำไปปรับใช้ได้ทันที
                                             โดยเน้นการสร้าง "Insight" หรือการตระหนักรู้จากภายใน เพื่อให้เกิดการเปลี่ยนแปลงในระยะยาวและมีประสิทธิภาพสูงสุดต่อองค์กร
                                          </p>
                                          <ul className="mt-4 space-y-2 list-disc pl-5 text-sm text-[#0f3460]/70">
                                             <li>ลงมือปฏิบัติจริงผ่าน Case Study</li>
                                             <li>สรุปบทเรียนผ่านการ Facilitation</li>
                                             <li>วางแผนการนำไปใช้จริงในที่ทำงาน</li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>

                  {/* Instructor Info Section */}
                  {course.instructor && (
                     <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-black text-[#0f3460] mb-8 nav-font">วิทยากรผู้สอน</h2>
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                           <div className="w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg border-4 border-gray-50">
                              <Link to={`/speakers/${course.instructor.id}`}>
                                 <img src={course.instructor.image} alt={course.instructor.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                              </Link>
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-[#0f3460] mb-3 nav-font">
                                 <Link to={`/speakers/${course.instructor.id}`} className="hover:text-[#c5a059] transition-colors">
                                    {course.instructor.name}
                                 </Link>
                              </h3>
                              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Director & Master Facilitator</p>
                              <p className="text-lg text-gray-600 leading-relaxed font-medium opacity-80">{course.instructor.bio}</p>
                              <Link to={`/speakers/${course.instructor.id}`} className="inline-flex items-center gap-2 text-[#c5a059] font-black text-sm uppercase tracking-widest mt-6 hover:gap-4 transition-all">
                                 อ่านประวัติและผลงานฉบับเต็ม <ArrowRight className="w-4 h-4" />
                              </Link>
                           </div>
                        </div>
                     </div>
                  )}
               </div>

               {/* Sidebar CTA */}
               <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8">
                     <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-black text-[#0f3460] mb-8 nav-font">สนใจหลักสูตรนี้?</h3>
                        <p className="text-gray-500 mb-8 font-medium">หากองค์กรของคุณต้องการจัดอบรมหลักสูตรนี้ในรูปแบบ In-house หรือปรึกษาเพิ่มเติม</p>
                        <div className="space-y-4">
                           <a href={CONTACT_INFO.lineUrl} className="w-full bg-[#0f3460] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#c5a059] transition-all nav-font shadow-lg">
                              <MessageCircle className="w-6 h-6" /> ติดต่อทาง LINE Official
                           </a>
                           <a href={`tel:${CONTACT_INFO.phone}`} className="w-full bg-white border-2 border-gray-100 text-[#0f3460] py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:border-[#c5a059] transition-all nav-font">
                              <Phone className="w-6 h-6" /> {CONTACT_INFO.phone}
                           </a>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                           <div className="text-gray-500 text-sm font-medium">
                              ต้องการความช่วยเหลือในการลงทะเบียน? <Link to="/contact" className="text-[#c5a059] font-bold hover:underline">ติดต่อเรา</Link>
                           </div>
                           <Link to="/lms" className="flex items-center gap-2 text-[#0f3460] font-bold hover:text-[#c5a059] transition-colors nav-font">
                              ไปที่ระบบเรียนออนไลน์ <ChevronRight className="w-4 h-4" />
                           </Link>
                        </div>
                     </div>

                     <div className="bg-gradient-to-br from-[#c5a059] to-[#e0c58e] p-10 rounded-[2.5rem] text-white shadow-xl">
                        <h4 className="text-xl font-black mb-4 nav-font">Custom Solution</h4>
                        <p className="text-white/80 font-medium mb-8 leading-relaxed">เราสามารถปรับแต่ง (Customize) เนื้อหาและกิจกรรมให้ตรงตามโจทย์และวัฒนธรรมองค์กรของคุณโดยเฉพาะ</p>
                        <Link to="/contact" className="text-white underline underline-offset-8 font-black nav-font text-sm uppercase tracking-widest">ขอใบเสนอราคา</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CourseDetail;
