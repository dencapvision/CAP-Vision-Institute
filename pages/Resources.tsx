import React, { useState, useEffect } from 'react';
import { 
  Search, 
  PlayCircle, 
  Clock, 
  Download, 
  FileText, 
  ChevronRight, 
  BookOpen, 
  Video, 
  FileDown, 
  Filter, 
  Layout, 
  Tag, 
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MICRO_LEARNING_VIDEOS, DOWNLOAD_RESOURCES } from '../constants/resources';
import { HRD_ARTICLES as STATIC_ARTICLES } from '../constants/articles';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SmartSearchBar from '../components/LearningHub/SmartSearchBar';
import LearningPathFilter from '../components/LearningHub/LearningPathFilter';

interface BlogManifestItem {
   id: string;
   title: string;
   category: string;
   thumbnail: string;
   excerpt: string;
   description?: string;
   tags?: string[];
   date: string;
   createdAt?: string;
   level?: 'Beginner' | 'Intermediate' | 'Expert';
   readTime?: string;
}

const Resources: React.FC = () => {
   const [activeType, setActiveType] = useState<'all' | 'video' | 'article' | 'download'>('article');
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedPath, setSelectedPath] = useState('facilitation');
   const [articles, setArticles] = useState<BlogManifestItem[]>((STATIC_ARTICLES as any[]).map(a => ({ 
     ...a, 
     date: a.date || '2026-01-20', 
     category: a.category || 'facilitation',
     level: a.level || (a.id === '1' ? 'Intermediate' : 'Beginner')
    })));

   useEffect(() => {
       const data = (STATIC_ARTICLES as any[]).map(a => ({
         ...a,
         category: a.category || 'facilitation',
         tags: a.tags || ['HR', 'Leadership'],
         level: a.id === '1' ? 'Intermediate' : 'Beginner'
       }));
       const sorted = [...data].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
       });
       setArticles(sorted as any);
   }, []);

   const filteredArticles = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesPath = activeType === 'article' ? article.category === selectedPath : true;

      return matchesSearch && matchesPath;
   });

   return (
      <div className="bg-white min-h-screen">
         <SEO
            title="Learning Intelligence System | CAP Vision Insight"
            description="รวมบทความ วิดีโอสั้น และเครื่องมือช่วยทำงานเพื่อการเปลี่ยนแปลงองค์กรเชิงระบบ"
         />

         {/* Hero Header */}
         <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-50/30 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 nav-font"
               >
                 <Sparkles className="w-4 h-4" />
                 Learning Intelligence System
               </motion.div>
               
               <motion.h1
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-5xl md:text-7xl font-black text-[#0f3460] nav-font leading-[0.9] tracking-tight uppercase"
               >
                 Knowledge <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">To Action</span>
               </motion.h1>

               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-lg md:text-xl text-gray-500 mb-12 font-medium max-w-2xl mx-auto leading-relaxed"
               >
                 คลังปัญญาเพื่อการเปลี่ยนแปลง: รวมบทความ วิดีโอสั้น และเครื่องมือช่วยทำงาน (Tools) เพื่อการพัฒนาองค์กรเชิงระบบ
               </motion.p>

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                 <SmartSearchBar onSearch={setSearchQuery} />
               </motion.div>
            </div>
         </section>

         {/* Multi-Path Filter */}
         <section className="pb-20">
            <div className="max-w-7xl mx-auto px-6">
              <LearningPathFilter 
                activePath={selectedPath} 
                onPathChange={(path) => { setSelectedPath(path); setActiveType('article'); }} 
              />
            </div>
         </section>

         <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
            {/* Insight Articles Section */}
            {(activeType === 'all' || activeType === 'article') && (
               <section>
                  <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                      <div>
                        <h2 className="text-3xl font-black text-[#0f3460] nav-font uppercase tracking-tighter">Featured Insights</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Recommended for {selectedPath}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                     {filteredArticles.map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link to={`/resources/${article.id}`} className="bg-white rounded-[3rem] border border-gray-100/50 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full group">
                             <div className="relative h-64 overflow-hidden shadow-inner">
                                <img src={article.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                   <span className="bg-white/90 backdrop-blur-md text-[#0f3460] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                      {article.category}
                                   </span>
                                   <span className={`px-4 py-1.5 backdrop-blur-md rounded-full text-[10px] font-black text-white shadow-sm uppercase tracking-widest ${
                                      article.level === 'Expert' ? 'bg-red-500/80' : 
                                      article.level === 'Intermediate' ? 'bg-amber-500/80' : 'bg-green-500/80'
                                   }`}>
                                      {article.level || 'Beginner'}
                                   </span>
                                </div>
                             </div>

                             <div className="p-10 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-6 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                   <div className="flex items-center gap-1.5">
                                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                      {article.date}
                                   </div>
                                   <div className="flex items-center gap-1.5">
                                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                                      {article.readTime || '8 min read'}
                                   </div>
                                </div>

                                <h3 className="font-bold text-2xl text-[#0f3460] mb-6 nav-font leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
                                   {article.title}
                                </h3>

                                <p className="text-gray-500 leading-relaxed line-clamp-3 font-medium mb-8 text-sm italic">
                                   {article.description || article.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                                   <div className="flex -space-x-2">
                                      {[1,2,3].map(i => (
                                        <div key={i} className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white shadow-sm" />
                                      ))}
                                   </div>
                                   <div className="text-[#0f3460] font-black text-[10px] flex items-center gap-2 group-hover:gap-4 transition-all nav-font uppercase tracking-widest">
                                      Read Insight <ArrowRight className="w-4 h-4 text-blue-600" />
                                   </div>
                                </div>
                             </div>
                          </Link>
                        </motion.div>
                     ))}
                  </div>

                  {filteredArticles.length === 0 && (
                     <div className="text-center py-20 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
                        <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold nav-font uppercase tracking-widest text-xs">No Insights Found</p>
                     </div>
                  )}
               </section>
            )}

            {/* Micro-learning Section */}
            {(activeType === 'all' || activeType === 'video') && (
               <section>
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h2 className="text-3xl font-black text-[#0f3460] nav-font mb-2">Micro-learning Video</h2>
                        <p className="text-gray-400 font-medium tracking-tight">เรียนรู้วันละนิด จิตแจ่มใส เข้าใจง่ายใน 3-5 นาที</p>
                     </div>
                     <Video className="w-12 h-12 text-blue-600/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     {MICRO_LEARNING_VIDEOS.map((video) => (
                        <div key={video.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 cursor-pointer">
                           <div className="relative h-56 overflow-hidden">
                              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <PlayCircle className="w-16 h-16 text-white" />
                              </div>
                              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-bold flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> {video.duration}
                              </div>
                           </div>
                           <div className="p-10">
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 block">{video.category}</span>
                              <h3 className="text-xl font-bold text-[#0f3460] nav-font mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{video.title}</h3>
                              <button className="text-[#0f3460] text-[10px] font-black flex items-center gap-2 group-hover:gap-4 transition-all nav-font uppercase tracking-widest">
                                 Watch Now <ChevronRight className="w-4 h-4 text-blue-600" />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Templates Section */}
            {(activeType === 'all' || activeType === 'download') && (
               <section>
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h2 className="text-3xl font-black text-[#0f3460] nav-font mb-2 uppercase tracking-tighter">Templates & Toolkits</h2>
                        <p className="text-gray-400 font-medium">ดาวน์โหลดเครื่องมือช่วยทำงานเพื่อประสิทธิภาพที่ดียิ่งขึ้น</p>
                     </div>
                     <FileDown className="w-12 h-12 text-blue-600/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                     {DOWNLOAD_RESOURCES.map((tool) => (
                        <div key={tool.id} className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] transition-all group">
                           <div className="relative rounded-[2rem] overflow-hidden mb-8 h-48 bg-gray-50 flex items-center justify-center border border-gray-50 shadow-inner">
                              <FileText className="w-16 h-16 text-blue-900 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-xl shadow-sm">
                                 <Download className="w-4 h-4 text-blue-600" />
                              </div>
                           </div>
                           <div className="px-2">
                              <div className="flex items-center gap-3 mb-4">
                                 <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{tool.type}</span>
                              </div>
                              <h3 className="font-bold text-xl text-[#0f3460] nav-font mb-8 leading-tight tracking-tight">{tool.title}</h3>
                              <button className="w-full bg-[#0f3460] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all nav-font shadow-lg shadow-blue-100 uppercase tracking-widest text-xs">
                                 Download Toolkit
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>

         {/* Den Master Fa logic Quote */}
         <section className="py-32 bg-[#0f3460] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-400 rounded-full blur-[100px]" />
            </div>
            
            <div className="container mx-auto px-6 relative text-center">
              <div className="max-w-3xl mx-auto">
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 block nav-font">Knowledge Persistence</span>
                <blockquote className="text-3xl md:text-5xl font-black text-white nav-font italic leading-tight mb-12 tracking-tight">
                  "การเรียนรู้ที่ไม่มีการสะท้อนคิด (Reflection) <br/>
                  เปรียบเสมือนการปลูกเมล็ดพันธุ์บนพื้นปูน"
                </blockquote>
                <div className="w-16 h-1.5 bg-amber-500 rounded-full mx-auto mb-10" />
                <p className="text-blue-100/60 font-black uppercase tracking-widest text-xs nav-font">
                   Join the ecosystem of active learners at CAP Vision
                </p>
              </div>
            </div>
         </section>
      </div>
   );
};

export default Resources;
