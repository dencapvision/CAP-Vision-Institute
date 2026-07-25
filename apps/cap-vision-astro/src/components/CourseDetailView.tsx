import React, { useState } from 'react';
import {
   ArrowLeft, CheckCircle2, Clock, Users, Award, Star, MessageCircle,
   Phone, ChevronDown, Target, ShieldCheck, Zap, Search, Heart,
   Layout, Video, Eye, Flame, Compass, Brain, Layers, MapPin
} from 'lucide-react';
import type { Course } from '../types';
import { CONTACT_INFO } from '@/constants/brand';

const ICON_MAP: Record<string, React.ReactNode> = {
   'Target': <Target />,
   'Search': <Search />,
   'Heart': <Heart />,
   'Users': <Users />,
   'Zap': <Zap />,
   'Layout': <Layout />,
   'Video': <Video />,
   'Clock': <Clock />,
   'Award': <Award />,
   'CheckCircle2': <CheckCircle2 />,
   'ShieldCheck': <ShieldCheck />,
   'MessageCircle': <MessageCircle />,
   'Eye': <Eye />,
   'Flame': <Flame />,
   'Star': <Star />,
   'Compass': <Compass />,
   'Brain': <Brain />,
   'Layers': <Layers />
};

interface CourseDetailViewProps {
  course: Course;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course }) => {
   const [expandedObjectives, setExpandedObjectives] = useState<number[]>([]);

   const toggleObjective = (index: number) => {
      setExpandedObjectives(prev =>
         prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
   };

   const stripEmoji = (text: string): string => {
      if (!text) return text;
      return text
         .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}]+/gu, '')
         .replace(/[\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F201}-\u{1F202}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F23A}]+/gu, '')
         .trim();
   };

   const renderIcon = (icon: any, className: string = "w-6 h-6") => {
      if (!icon) return <Target className={className} />;
      
      if (React.isValidElement(icon)) {
         return React.cloneElement(icon as React.ReactElement<any>, { className });
      }

      if (typeof icon === 'string' && ICON_MAP[icon]) {
         return React.cloneElement(ICON_MAP[icon] as React.ReactElement<any>, { className });
      }

      return <Target className={className} />;
   };

   const formatMarkdown = (text: string) => {
      if (!text) return null;
      
      const blocks = text.split('---').map(b => b.trim()).filter(Boolean);
      
      return blocks.map((block, bIdx) => {
         const lines = block.split('\n').map(line => {
            let processed = line.trim();
            
            const isH3 = processed.startsWith('###');
            const isH4 = processed.startsWith('####');
            
            processed = processed
               .replace(/^#+\s*/, '')
               .replace(/#{1,6}\s/g, '')
               .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}]+/gu, '')
               .replace(/\*\*/g, '')
               .replace(/\*/g, '')
               .trim();
            
            if (!processed) return null;

            if (isH3) {
               return <h3 key={Math.random()} className="text-2xl font-black text-[#0f3460] mt-8 mb-4 nav-font leading-tight">{processed}</h3>;
            }
            if (isH4) {
               return <h4 key={Math.random()} className="text-lg font-bold text-[#c5a059] mt-6 mb-3 nav-font uppercase tracking-wide">{processed}</h4>;
            }
            
            if (processed.startsWith('-')) {
               return (
                  <div key={Math.random()} className="flex items-start gap-3 mb-3 ml-2">
                     <CheckCircle2 className="w-5 h-5 text-[#c5a059] mt-0.5 flex-shrink-0" />
                     <span className="text-content-premium">{processed.replace(/^-\s*/, '')}</span>
                  </div>
               );
            }

            if (processed.startsWith('Q:') || processed.startsWith('**Q:')) {
               return <p key={Math.random()} className="text-[#0f3460] font-black mt-8 mb-3 nav-font text-lg">{processed.replace(/^\**Q:\s*/, 'Q: ')}</p>;
            }
            if (processed.startsWith('A:') || processed.startsWith('*A:')) {
               return <p key={Math.random()} className="text-content-premium mb-8 italic pl-6 border-l-4 border-[#c5a059]/40 bg-gray-50/50 py-3 pr-4 rounded-r-xl">{processed.replace(/^[\s\*]*A:\s*/, 'A: ')}</p>;
            }

            return <p key={Math.random()} className="mb-6 text-content-premium">{processed}</p>;
         });

         return (
            <div key={bIdx} className={bIdx > 0 ? "pt-10 mt-10 border-t border-gray-100" : ""}>
               {lines}
            </div>
         );
      });
   };

   return (
      <div className="bg-gray-50 min-h-screen">
         {/* Course Hero */}
         <div className="bg-[#0f3460] text-white pt-20 pb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
               <Award className="w-full h-full transform translate-x-1/4" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <a href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-[#c5a059] transition-colors font-bold mb-10 nav-font text-sm uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
               </a>
               <div className="flex flex-col lg:flex-row gap-16 items-start">
                  <div className="lg:w-3/5">
                     <span className="bg-[#c5a059] text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block nav-font">
                        {course.category}
                     </span>
                     <h1 className="text-4xl md:text-7xl font-black mb-8 nav-font leading-[1.1] whitespace-pre-line drop-shadow-2xl">
                        {course.title.split('\n').map((line, lineIdx) => (
                           <div key={lineIdx} className={lineIdx > 0 ? 'mt-4 opacity-90' : ''}>
                              {line.split(' ').map((word, i) => (
                                 <span 
                                    key={i} 
                                    className={`${(lineIdx === 0 && i === 1) || (lineIdx === 1 && word.includes('Mind')) ? 'font-gold text-glow-gold' : 'text-white text-shadow-premium'} inline-block mr-2 md:mr-4 transition-all hover:scale-105`}
                                 >
                                    {word}
                                 </span>
                              ))}
                           </div>
                        ))}
                     </h1>
                     <p className="text-xl text-white font-medium leading-relaxed mb-10 max-w-2xl reveal-staggered active">
                        {course.description}
                      </p>
                     <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                              <Clock className="w-6 h-6 text-[#c5a059]" />
                           </div>
                           <div>
                              <p className="text-xs text-white/85 font-bold uppercase tracking-widest mb-1">Duration</p>
                              <p className="text-sm font-bold text-white">{course.duration || 'Flexible'}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                              <Users className="w-6 h-6 text-[#c5a059]" />
                           </div>
                           <div>
                              <p className="text-xs text-white/85 font-bold uppercase tracking-widest mb-1">Target Audience</p>
                              <p className="text-sm font-bold text-white">{course.audience || 'All Levels'}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                              <Star className="w-6 h-6 text-[#c5a059]" />
                           </div>
                           <div>
                              <p className="text-xs text-white/85 font-bold uppercase tracking-widest mb-1">Rating</p>
                              <p className="text-sm font-bold text-white">4.9/5.0 Premium</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="lg:w-2/5 w-full">
                     <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl relative reveal-staggered active">
                        <img 
                           src={course.image} 
                           alt={course.alt_text || course.title} 
                           className="w-full h-[400px] object-cover rounded-[2rem] shadow-inner" 
                           onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80';
                           }}
                           loading="lazy" 
                        />
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
                  {course.why_section && course.why_section.length > 0 && (
                     <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-black text-[#0f3460] mb-12 nav-font">Why? ทำไมต้องเรียนหลักสูตรนี้</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           {course.why_section.map((item: any, idx: number) => {
                              const isObj = typeof item === 'object' && item !== null;
                              return (
                                 <div key={idx} className="bg-gray-50 p-8 rounded-[2rem] text-center group hover:bg-[#0f3460] transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-[#c5a059] shadow-sm group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                                       {renderIcon(isObj ? item.icon : null)}
                                    </div>
                                    {isObj && item.stat && <span className="text-3xl font-black text-[#0f3460] group-hover:text-white block mb-1 nav-font">{stripEmoji(String(item.stat))}</span>}
                                    <h4 className="text-sm font-bold text-[#c5a059] mb-3 nav-font uppercase tracking-widest">{isObj ? stripEmoji(item.label) : `เหตุผลที่ ${idx + 1}`}</h4>
                                    <p className="text-sm text-gray-500 group-hover:text-blue-100 leading-relaxed">{isObj ? stripEmoji(item.desc) : stripEmoji(item)}</p>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  )}

                  {/* How Section */}
                  {course.how_section && course.how_section.length > 0 && (
                     <div className="bg-[#0f3460] p-12 rounded-[3rem] shadow-xl text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <Zap className="w-48 h-48" />
                        </div>
                        <h2 className="text-3xl font-black mb-12 nav-font text-[#c5a059]">How? วิธีการเรียนรู้ของเรา</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                           {course.how_section.map((item: any, idx: number) => {
                              const isObj = typeof item === 'object' && item !== null;
                              return (
                                 <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all">
                                    <div className="w-10 h-10 bg-[#c5a059] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                                       {renderIcon(isObj ? item.icon : null, "w-5 h-5 text-white")}
                                    </div>
                                    <h4 className="text-lg font-bold text-[#c5a059] mb-3 nav-font">{isObj ? stripEmoji(item.title) : `ขั้นตอนที่ ${idx + 1}`}</h4>
                                    <p className="text-white text-sm leading-relaxed">{isObj ? stripEmoji(item.desc) : stripEmoji(item)}</p>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  )}

                   {/* What Section */}
                   {course.what_section && course.what_section.length > 0 && (
                      <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                         <h2 className="text-3xl font-black text-[#0f3460] mb-12 nav-font">What? สิ่งที่ผู้เข้าอบรมจะได้รับ</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {course.what_section.map((item: any, idx: number) => {
                               const isObj = typeof item === 'object' && item !== null;
                               return (
                                  <div key={idx} className="flex gap-4 items-center p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#c5a059] transition-all group">
                                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                                        {renderIcon(isObj ? item.icon : null, "w-5 h-5")}
                                     </div>
                                     <div>
                                        <h4 className="font-bold text-[#0f3460] nav-font">{isObj ? stripEmoji(item.title) : stripEmoji(item)}</h4>
                                        {isObj && item.desc && <p className="text-sm text-gray-500 mt-1">{stripEmoji(item.desc)}</p>}
                                     </div>
                                  </div>
                               );
                            })}
                         </div>
                      </div>
                   )}

                  {/* Original Description & Objectives Accordion */}
                  <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                      <h2 className="text-3xl font-black text-[#0f3460] mb-8 font-heading-premium relative z-10 font-gold-gradient">
                         รายละเอียดหลักสูตร
                      </h2>
                      
                      <div className="relative z-10">
                         <div className="text-lg">
                            {formatMarkdown(course.long_description || course.description)}
                         </div>

                         <div className="mt-20">
                            <div className="flex items-center gap-5 mb-12">
                               <div className="w-14 h-14 bg-gradient-to-br from-[#0f3460] to-[#1a4d8c] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                                  <Layout className="w-7 h-7 text-white" />
                                </div>
                               <div>
                                  <h3 className="text-3xl font-black text-[#0f3460] font-heading-premium">
                                     Course Modules (Hands-on + Practical)
                                  </h3>
                                  <p className="text-sm text-[#c5a059] font-bold uppercase tracking-[0.2em] mt-2">Focus on Action & Mastery</p>
                               </div>
                            </div>
                         </div>

                         <div className="space-y-5">
                            {course.objectives?.map((obj: any, i: number) => {
                               const isExpanded = expandedObjectives.includes(i);
                               const isObj = typeof obj === 'object' && obj !== null;
                               return (
                                  <div
                                     key={i}
                                     className={`overflow-hidden border rounded-3xl transition-all duration-400 ease-out ${isExpanded
                                        ? 'border-[#c5a059]/30 bg-white shadow-2xl shadow-gold-500/10 scale-[1.02] z-10 relative'
                                        : 'border-gray-100/80 bg-gray-50/40 hover:bg-white hover:border-[#c5a059]/30 hover:shadow-lg'
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
                                              {renderIcon(isObj ? obj.icon : 'CheckCircle2', "w-5 h-5")}
                                           </div>
                                           <span className={`text-[15px] font-black nav-font transition-colors ${isExpanded ? 'text-[#0f3460]' : 'text-gray-600 group-hover:text-[#0f3460]'}`}>
                                              {isObj ? stripEmoji(obj.title) : stripEmoji(obj)}
                                           </span>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#c5a059]' : 'group-hover:text-gray-600'}`} />
                                     </button>
                                     
                                     {isExpanded && isObj && obj.desc && (
                                        <div className="px-6 pb-6 pt-2 border-t border-gray-50 bg-gray-50/30 animate-in fade-in duration-300">
                                           <p className="text-sm text-gray-500 leading-relaxed pl-15 font-medium">
                                              {stripEmoji(obj.desc)}
                                           </p>
                                        </div>
                                     )}
                                  </div>
                               );
                            })}
                         </div>
                      </div>
                  </div>

               </div>

               {/* Sidebar Column */}
               <div className="space-y-8">
                  {/* Instructor Widget */}
                  {course.instructor && (
                     <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                           <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059] to-[#0f3460] rounded-full rotate-45 scale-105 shadow-md"></div>
                           <img 
                              src={course.instructor.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'} 
                              alt={course.instructor.name} 
                              className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white" 
                           />
                        </div>
                        <h4 className="text-xl font-bold text-[#0f3460] nav-font mb-1">{course.instructor.name}</h4>
                        <p className="text-xs text-[#c5a059] font-bold uppercase tracking-widest mb-4">{course.instructor.title || 'Master Facilitator'}</p>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
                           {course.instructor.bio}
                        </p>
                     </div>
                  )}

                  {/* Quick Contact Widget */}
                  <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                     <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                     <h4 className="text-xl font-bold nav-font text-[#c5a059] mb-4">ขอใบเสนอราคาด่วน</h4>
                     <p className="text-sm text-white/80 leading-relaxed mb-6">
                        สำหรับองค์กรที่ต้องการปรับแต่งหลักสูตรนี้ สามารถขอใบเสนอราคาล่วงหน้าหรือนัดปรึกษาแนวทางการสอนฟรี
                     </p>
                     <div className="space-y-4">
                        <a 
                           href="/contact" 
                           className="w-full bg-[#c5a059] hover:bg-white hover:text-[#0f3460] text-white py-3.5 rounded-2xl font-black text-center text-sm inline-flex items-center justify-center gap-2 transition-all nav-font shadow-lg active:scale-95"
                        >
                           ติดต่อขอข้อมูล
                        </a>
                        <a 
                           href={`tel:${CONTACT_INFO.phone}`} 
                           className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-2xl font-bold text-center text-sm inline-flex items-center justify-center gap-2 transition-all nav-font border border-white/10"
                        >
                           <Phone className="w-4 h-4 text-[#c5a059]" /> {CONTACT_INFO.phone}
                        </a>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default CourseDetailView;
