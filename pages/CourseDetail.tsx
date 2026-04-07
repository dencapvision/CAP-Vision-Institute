
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
   ArrowLeft, ArrowRight, CheckCircle2, Clock, Users, Calendar, Award, Star, MessageCircle,
   Phone, ChevronDown, ChevronRight, Plus, Minus, Target, ShieldCheck, Zap, Search, Heart,
   Layout, Video, Zap as ZapIcon, Eye, Flame, Compass, Brain, Layers
} from 'lucide-react';
import { fetchCourseBySlug } from '../services/courses';
import { Course } from '../types';
import { CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';

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

const CourseDetail: React.FC = () => {
   const { id } = useParams(); // URL might be /courses/the-modern-facilitator
   const [course, setCourse] = useState<Course | null>(null);
   const [loading, setLoading] = useState(true);
   const [expandedObjectives, setExpandedObjectives] = useState<number[]>([]);

   useEffect(() => {
      const loadCourse = async () => {
         try {
            if (id) {
               const data = await fetchCourseBySlug(id);
               setCourse(data);
            }
         } catch (error) {
            console.error('Failed to load course:', error);
         } finally {
            setLoading(false);
         }
      };

      loadCourse();
      // Scroll to top when loading new course
      window.scrollTo(0, 0);
   }, [id]);

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-16 h-16 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
         </div>
      );
   }

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

    const renderIcon = (icon: any, className: string = "w-6 h-6") => {
        if (!icon) return <Target className={className} />;
        
        // If it's already a React element (from constants.tsx)
        if (React.isValidElement(icon)) {
           return React.cloneElement(icon as React.ReactElement<any>, { className });
        }

        // If it's a string (from database)
        if (typeof icon === 'string' && ICON_MAP[icon]) {
           return React.cloneElement(ICON_MAP[icon] as React.ReactElement<any>, { className });
        }

        return <Target className={className} />;
     };

     // Helper to clean markdown and format text
     const formatMarkdown = (text: string) => {
        if (!text) return null;
        
        // Split by --- to create logical blocks
        const blocks = text.split('---').map(b => b.trim()).filter(Boolean);
        
        return blocks.map((block, bIdx) => {
           // Clean up symbols but keep structure
           const lines = block.split('\n').map(line => {
              let processed = line.trim();
              
              // Step 1: Detect Headers BEFORE any cleaning
              const isH3 = processed.startsWith('###');
              const isH4 = processed.startsWith('####');
              
              // Step 2: Global cleaning for all symbols
              processed = processed
                 .replace(/^#+\s*/, '')      // Remove start-of-line hashes
                 .replace(/#{1,6}\s/g, '')   // Remove any remaining hashes followed by space
                 .replace(/🔶\s*/g, '')      // Remove diamond emoji
                 .replace(/\*\*/g, '')        // Remove double asterisks
                 .replace(/\*/g, '');          // Remove single asterisks
              
              if (!processed) return null;

              if (isH3) {
                 return <h3 key={Math.random()} id={`h3-${Math.random()}`} className="text-2xl font-black text-[#0f3460] mt-8 mb-4 nav-font leading-tight">{processed}</h3>;
              }
              if (isH4) {
                 return <h4 key={Math.random()} id={`h4-${Math.random()}`} className="text-lg font-bold text-[#c5a059] mt-6 mb-3 nav-font uppercase tracking-wide">{processed}</h4>;
              }
              
              // Check if it's a list item
              if (processed.startsWith('-')) {
                 return (
                    <div key={Math.random()} className="flex items-start gap-3 mb-3 ml-2">
                       <CheckCircle2 className="w-5 h-5 text-[#c5a059] mt-0.5 flex-shrink-0" />
                       <span className="text-content-premium">{processed.replace(/^-\s*/, '')}</span>
                    </div>
                 );
              }

              // Check if it's Q&A
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
               <Link to="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-[#c5a059] transition-colors font-bold mb-10 nav-font text-sm uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
               </Link>
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
                           onClick={(e) => {
                              const img = e.target as HTMLImageElement;
                              if (img.src.includes('unsplash.com')) {
                                 img.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80';
                              }
                           }}
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
                                    {isObj && item.stat && <span className="text-3xl font-black text-[#0f3460] group-hover:text-white block mb-1 nav-font">{item.stat}</span>}
                                    <h4 className="text-sm font-bold text-[#c5a059] mb-3 nav-font uppercase tracking-widest">{isObj ? item.label : `เหตุผลที่ ${idx + 1}`}</h4>
                                    <p className="text-sm text-gray-500 group-hover:text-blue-100 leading-relaxed">{isObj ? item.desc : item}</p>
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
                                    <h4 className="text-lg font-bold text-[#c5a059] mb-3 nav-font">{isObj ? item.title : `ขั้นตอนที่ ${idx + 1}`}</h4>
                                    <p className="text-white text-sm leading-relaxed">{isObj ? item.desc : item}</p>
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
                                        <h4 className="font-bold text-[#0f3460] nav-font">{isObj ? item.title : item}</h4>
                                        {isObj && item.desc && <p className="text-sm text-gray-500 mt-1">{item.desc}</p>}
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
                                          <span className={`text-lg font-bold nav-font transition-colors ${isExpanded ? 'text-[#0f3460]' : 'text-gray-700'
                                             }`}>
                                             {isObj ? obj.title : obj}
                                          </span>
                                       </div>
                                       <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                          {isExpanded ? <Minus className="w-5 h-5 text-[#c5a059]" /> : <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#c5a059]" />}
                                       </div>
                                    </button>

                                    <div
                                       className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                                          }`}
                                    >
                                       <div className="px-8 md:px-20 pb-10 pt-6 border-t border-gray-100 bg-gradient-to-b from-gray-50/30 to-white">
                                          {isObj && obj.desc ? (
                                             <div className="text-content-premium">
                                                {formatMarkdown(obj.desc)}
                                             </div>
                                          ) : (
                                             <p className="text-gray-500 italic font-medium">ไม่มีรายละเอียดเพิ่มเติมสำหรับหัวข้อนี้</p>
                                          )}
                                          
                                          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                                                   <Zap className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-bold text-[#0f3460]">Learning by Doing</span>
                                             </div>
                                             <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center">
                                                   <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-bold text-[#0f3460]">Real Application</span>
                                             </div>
                                          </div>
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
                              <Link to={`/speakers/${course.instructor.slug || course.instructor.id}`}>
                                 <img src={course.instructor.image} alt={`วิทยากร: ${course.instructor.name}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                              </Link>
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-[#0f3460] mb-3 nav-font">
                                 <Link to={`/speakers/${course.instructor.slug || course.instructor.id}`} className="hover:text-[#c5a059] transition-colors">
                                    {course.instructor.name}
                                 </Link>
                              </h3>
                              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Director & Master Facilitator</p>
                              <p className="text-lg text-gray-600 leading-relaxed font-medium opacity-80">{course.instructor.bio}</p>
                              <Link to={`/speakers/${course.instructor.slug || course.instructor.id}`} className="inline-flex items-center gap-2 text-[#c5a059] font-black text-sm uppercase tracking-widest mt-6 hover:gap-4 transition-all">
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
                         <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
                            <div className="text-gray-500 text-sm font-medium text-center">
                               ต้องการความช่วยเหลือในการลงทะเบียน? <Link to="/contact" className="text-[#c5a059] font-bold hover:underline">ติดต่อเรา</Link>
                            </div>
                         </div>
                     </div>

                     <ShareButtons title={course.title} />

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
