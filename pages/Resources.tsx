import React, { useState, useEffect } from 'react';
import { Search, PlayCircle, Clock, Download, FileText, ChevronRight, BookOpen, Video, FileDown, Filter, Layout, Tag, Calendar } from 'lucide-react';
import { RESOURCE_ARTICLES as STATIC_ARTICLES, MICRO_LEARNING_VIDEOS, DOWNLOAD_RESOURCES } from '../constants/resources';
import { COLORS } from '../constants/theme';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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
}

const Resources: React.FC = () => {
   const [activeType, setActiveType] = useState<'all' | 'video' | 'article' | 'download'>('all');
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedTag, setSelectedTag] = useState<string | null>(null);
   const [articles, setArticles] = useState<BlogManifestItem[]>(STATIC_ARTICLES.map(a => ({ ...a, date: '2026-01-20' })));

   useEffect(() => {
      fetch('/content/blog/manifest.json')
         .then(res => res.json())
         .then(data => {
            if (Array.isArray(data)) {
               // Sort articles by createdAt or date descending
               const sorted = [...data].sort((a, b) => {
                  const dateA = a.createdAt || a.date;
                  const dateB = b.createdAt || b.date;
                  return new Date(dateB).getTime() - new Date(dateA).getTime();
               });
               setArticles(sorted);
            }
         })
         .catch(err => console.error('Error loading blog manifest:', err));
   }, []);

   // Extract unique tags
   const allTags = Array.from(new Set(articles.flatMap(article => article.tags || [])));

   const filteredArticles = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesTag = selectedTag ? article.tags?.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
   });

   return (
      <div className="bg-[#f8fafc] min-h-screen">
         <SEO
            title="คลังความรู้"
            description="รวมบทความ วิดีโอสั้น เครื่องมือ Templates จากทีม Master Facilitator ของ CAP Vision Institute"
         />
         {/* Hero Header */}
         <div className="bg-[#0f3460] pt-20 pb-32 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
               <Layout className="w-96 h-96 absolute -bottom-20 -right-20" />
               <Video className="w-64 h-64 absolute top-10 left-10" />
            </div>
            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
               <h1 className="text-5xl md:text-7xl font-black mb-8 nav-font tracking-tight">Resources Hub</h1>
               <p className="text-xl text-blue-100/80 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                  คลังปัญญาเพื่อการเปลี่ยนแปลง: รวมบทความ วิดีโอสั้น และเครื่องมือช่วยทำงาน (Tools) จากทีม Master Facilitator
               </p>
               <div className="max-w-xl mx-auto relative group">
                  <input
                     type="text"
                     placeholder="ค้นหาสิ่งที่คุณอยากเรียนรู้..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-14 pr-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
                  />
                  <Search className="absolute left-6 top-5.5 w-6 h-6 text-white/40 group-focus-within:text-[#c5a059]" />
               </div>
            </div>
         </div>

         {/* Filter Tabs */}
         <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
            <div className="bg-white rounded-[2.5rem] shadow-xl p-4 border border-gray-100">
               <div className="flex flex-wrap justify-center gap-2">
                  {[
                     { id: 'all', label: 'ทั้งหมด', icon: <Filter className="w-4 h-4" /> },
                     { id: 'video', label: 'วิดีโอ (Micro-learning)', icon: <Video className="w-4 h-4" /> },
                     { id: 'article', label: 'บทความ (Insight)', icon: <BookOpen className="w-4 h-4" /> },
                     { id: 'download', label: 'ดาวน์โหลด (Templates)', icon: <FileDown className="w-4 h-4" /> }
                  ].map((type) => (
                     <button
                        key={type.id}
                        onClick={() => setActiveType(type.id as any)}
                        className={`px-8 py-4 rounded-2xl font-bold nav-font transition-all flex items-center gap-2 ${activeType === type.id ? 'bg-[#0f3460] text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
                     >
                        {type.icon} {type.label}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">

            {/* Micro-learning Section */}
            {(activeType === 'all' || activeType === 'video') && (
               <section>
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h2 className="text-3xl font-black text-[#0f3460] nav-font mb-2">Micro-learning Video</h2>
                        <p className="text-gray-400 font-medium">เรียนรู้วันละนิด จิตแจ่มใส เข้าใจง่ายใน 3-5 นาที</p>
                     </div>
                     <Video className="w-12 h-12 text-[#c5a059]/20" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     {MICRO_LEARNING_VIDEOS.map((video) => (
                        <div key={video.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 cursor-pointer">
                           <div className="relative h-56 overflow-hidden">
                              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <PlayCircle className="w-16 h-16 text-white" />
                              </div>
                              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-bold flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> {video.duration}
                              </div>
                           </div>
                           <div className="p-8">
                              <span className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-3 block">{video.category}</span>
                              <h3 className="text-xl font-bold text-[#0f3460] nav-font mb-4 group-hover:text-[#c5a059] transition-colors">{video.title}</h3>
                              <button className="text-[#0f3460] text-sm font-black flex items-center gap-2 group-hover:gap-4 transition-all">
                                 ดูวิดีโอเลย <ChevronRight className="w-4 h-4 text-[#c5a059]" />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Insight Articles Section */}
            {(activeType === 'all' || activeType === 'article') && (
               <section>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
                     <div>
                        <h2 className="text-3xl font-black text-[#0f3460] nav-font mb-2">Knowledge Insights</h2>
                        <p className="text-gray-400 font-medium">บทความเจาะลึกด้านจิตวิทยาองค์กรและการบริหารคน</p>
                     </div>

                     {/* Tag Selection */}
                     <div className="flex flex-wrap gap-2">
                        <button
                           onClick={() => setSelectedTag(null)}
                           className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${!selectedTag ? 'bg-[#c5a059] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        >
                           ทั้งหมด
                        </button>
                        {allTags.map(tag => (
                           <button
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${selectedTag === tag ? 'bg-[#c5a059] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                           >
                              {tag}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                     {filteredArticles.map((article) => (
                        <Link to={`/resources/${article.id}`} key={article.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all border border-gray-100 group flex flex-col h-full ring-0 hover:ring-4 hover:ring-[#c5a059]/10">
                           <div className="h-56 bg-gray-200 rounded-[2rem] mb-8 overflow-hidden shadow-inner relative">
                              <img src={article.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
                              <div className="absolute top-4 left-4">
                                 <span className="bg-white/90 backdrop-blur-md text-[#0f3460] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    {article.category}
                                 </span>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 mb-4 text-[#c5a059] text-[10px] font-black uppercase tracking-[0.2em]">
                              <div className="flex items-center gap-1.5">
                                 <Calendar className="w-3 h-3" />
                                 {article.date}
                              </div>
                              {article.tags && article.tags[0] && (
                                 <div className="flex items-center gap-1.5">
                                    <Tag className="w-3 h-3" />
                                    {article.tags[0]}
                                 </div>
                              )}
                           </div>

                           <h3 className="font-bold text-2xl text-[#0f3460] mb-4 nav-font leading-tight group-hover:text-[#c5a059] transition-colors line-clamp-2">
                              {article.title}
                           </h3>

                           <p className="text-gray-500 leading-relaxed line-clamp-3 font-medium mb-8 text-sm italic">
                              {article.description || article.excerpt}
                           </p>

                           <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                              <div className="flex flex-wrap gap-1">
                                 {article.tags?.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">#{tag}</span>
                                 ))}
                              </div>
                              <div className="text-[#0f3460] font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all nav-font">
                                 อ่านต่อ <span className="text-[#c5a059]">→</span>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>

                  {filteredArticles.length === 0 && (
                     <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold nav-font">ไม่พบจุดที่ต้องการ ค้นหาใหม่อีกครั้งนะ</p>
                     </div>
                  )}
               </section>
            )}

            {/* Downloadable Templates Section */}
            {(activeType === 'all' || activeType === 'download') && (
               <section>
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h2 className="text-3xl font-black text-[#0f3460] nav-font mb-2">Templates & Toolkits</h2>
                        <p className="text-gray-400 font-medium">ดาวน์โหลดเครื่องมือช่วยทำงานเพื่อประสิทธิภาพที่ดียิ่งขึ้น</p>
                     </div>
                     <FileDown className="w-12 h-12 text-[#c5a059]/20" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                     {DOWNLOAD_RESOURCES.map((tool) => (
                        <div key={tool.id} className="bg-white rounded-[3rem] p-6 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
                           <div className="relative rounded-[2.5rem] overflow-hidden mb-6 h-48 bg-gray-100">
                              <img src={tool.thumbnail} alt={tool.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white">
                                    <FileText className="w-8 h-8 text-[#0f3460]" />
                                 </div>
                              </div>
                           </div>
                           <div className="px-4">
                              <div className="flex items-center justify-between mb-4">
                                 <span className="bg-[#c5a059]/10 text-[#c5a059] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{tool.type}</span>
                                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tool.category}</span>
                              </div>
                              <h3 className="font-bold text-xl text-[#0f3460] nav-font mb-8 leading-tight">{tool.title}</h3>
                              <button className="w-full bg-[#0f3460] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#c5a059] transition-all nav-font shadow-lg">
                                 <Download className="w-5 h-5" /> ดาวน์โหลดฟรี
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

         </div>

         {/* Suggestion CTA */}
         <div className="bg-[#0f3460] py-24 px-4 text-center text-white overflow-hidden relative">
            <div className="max-w-4xl mx-auto relative z-10">
               <h2 className="text-3xl md:text-5xl font-black nav-font mb-8 leading-tight tracking-tight">ไม่พบหัวข้อที่คุณต้องการเรียนรู้?</h2>
               <p className="text-xl text-blue-100/60 font-medium mb-12">บอกเราสิ! ว่าคุณอยากให้ทีม CAP Vision ผลิตคอนเทนต์เรื่องอะไรเพื่อซัพพอร์ตองค์กรของคุณ</p>
               <button className="bg-[#c5a059] text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-gold-500/30 nav-font">
                  เสนอแนะหัวข้อใหม่
               </button>
            </div>
         </div>
      </div>
   );
};

export default Resources;
