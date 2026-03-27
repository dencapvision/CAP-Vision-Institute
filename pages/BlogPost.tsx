import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Clock, 
  Calendar, 
  User, 
  BookOpen, 
  Quote, 
  CheckCircle2, 
  Download, 
  FileText, 
  ChevronRight, 
  MessageCircle, 
  Zap, 
  Facebook, 
  Target, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Cpu, 
  Tag,
  Sparkles
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { RESOURCE_ARTICLES } from '../constants/resources';
import { HRD_ARTICLES as STATIC_ARTICLES } from '../constants/articles';
import { CONTACT_INFO } from '../constants/brand';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';
import ReflectionPanel from '../components/LearningHub/ReflectionPanel';
import AICoachSidebar from '../components/LearningHub/AICoachSidebar';
import NewsletterBox from '../components/NewsletterBox';

interface PostContentSection {
   type: 'text' | 'heading' | 'subheading' | 'quote' | 'image' | 'list' | 'box' | 'highlight';
   content?: string;
   title?: string;
   items?: string[];
   level?: number;
   author?: string;
   imageUrl?: string;
   variant?: 'info' | 'warning' | 'success' | 'danger';
}

interface PostData {
   id: string;
   title: string;
   category: string;
   thumbnail: string;
   author: string;
   date: string;
   readTime: string;
   description?: string;
   tags?: string[];
   createdAt?: string;
   sections: PostContentSection[];
}

const BlogPost: React.FC = () => {
   const { id } = useParams();
   const [post, setPost] = useState<PostData | null>(null);
   const [loading, setLoading] = useState(true);
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   useEffect(() => {
      setLoading(true);
      fetch(`/content/blog/posts/${id}.json`)
         .then(res => res.json())
         .then(data => {
            setPost(data);
            setLoading(false);
         })
         .catch(err => {
            console.error('Error loading post:', err);
            setLoading(false);
         });
      window.scrollTo(0, 0);
   }, [id]);

   const renderSection = (section: PostContentSection, index: number) => {
      switch (section.type) {
         case 'heading':
            return <h2 key={index} className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font mb-8 mt-12 uppercase tracking-tighter">{section.content}</h2>;
         case 'subheading':
            return <h3 key={index} className="text-2xl font-black text-[#0f3460] mb-8 nav-font border-b-4 border-[#c5a059] pb-4 inline-block uppercase tracking-tight">{section.content}</h3>;
         case 'text':
            return <p key={index} className="text-lg mb-8 leading-relaxed text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: section.content || '' }}></p>;
         case 'quote':
            return (
               <div key={index} className="border-l-4 border-blue-600 pl-8 py-10 my-16 bg-blue-50/50 rounded-r-[3rem] shadow-sm">
                  <Quote className="w-10 h-10 text-blue-600 mb-6" />
                  <p className="text-2xl md:text-3xl font-black nav-font italic leading-snug text-[#0f3460] tracking-tight">{section.content}</p>
                  {section.author && <cite className="block mt-6 text-gray-400 font-black uppercase tracking-widest text-xs">— {section.author}</cite>}
               </div>
            );
         case 'image':
            return (
               <div key={index} className="my-16 group relative">
                  <img src={section.imageUrl} className="w-full rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" alt={section.content || 'post image'} />
                  {section.content && <p className="mt-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">{section.content}</p>}
               </div>
            );
         case 'list':
            return (
               <ul key={index} className="space-y-5 mb-12">
                  {section.items?.map((item, i) => (
                     <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-lg text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: item }}></span>
                     </li>
                  ))}
               </ul>
            );
         case 'box':
            const boxStyles = {
               info: 'bg-blue-50 border-blue-100/50 text-[#0f3460]',
               warning: 'bg-amber-50 border-amber-100/50 text-[#0f3460]',
               success: 'bg-green-50 border-green-100/50 text-[#0f3460]',
               danger: 'bg-red-50 border-red-100/50 text-[#0f3460]'
            };
            const variant = section.variant || 'info';
            return (
               <div key={index} className={`${boxStyles[variant]} p-10 rounded-[2.5rem] border shadow-sm mb-12 relative overflow-hidden`}>
                  {section.title && <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] nav-font text-blue-600">{section.title}</h4>}
                  <p className="text-xl font-bold nav-font tracking-tight leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: section.content || '' }}></p>
                  {section.items && (
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-xs font-black uppercase tracking-widest nav-font opacity-60">
                        {section.items.map((item, i) => (
                           <li key={i} className="flex items-center gap-2">
                              {variant === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />} {item}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            );
         case 'highlight':
            return (
               <div key={index} className="bg-[#0f3460] text-white p-12 md:p-16 rounded-[4rem] shadow-2xl my-24 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000 rotate-12"><Sparkles className="w-48 h-48" /></div>
                  <h3 className="text-2xl md:text-3xl font-black text-amber-500 mb-8 nav-font uppercase tracking-tighter">{section.title}</h3>
                  <p className="text-blue-100/80 text-xl leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: section.content || '' }}></p>
               </div>
            );
         default:
            return null;
      }
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
         </div>
      );
   }

   if (!post) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <h2 className="text-3xl font-black text-[#0f3460] mb-4 nav-font">ไม่พบหน้าที่คุณต้องการ</h2>
            <p className="text-gray-500 mb-8 font-medium">บทความนี้อาจถูกลบหรือย้ายที่อยู่แล้ว</p>
            <Link to="/resources" className="bg-[#0f3460] text-white px-10 py-4 rounded-2xl font-black nav-font uppercase tracking-widest text-xs shadow-lg">กลับไปหน้า Resources</Link>
         </div>
      );
   }

   return (
      <div className="bg-white min-h-screen">
         <SEO
            title={`${post.title} | CAP Vision Insight`}
            description={post.description || post.title}
         />

         {/* Reading Progress Bar */}
         <motion.div
           className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 origin-left z-[100]"
           style={{ scaleX }}
         />

         {/* AI Coach Sidebar (Floating) */}
         <AICoachSidebar 
           articleTitle={post.title} 
           articleContent={post.sections.map(s => s.content || '').join(' ')} 
         />

         {/* Hero Header */}
         <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16">
            <div className="flex flex-col lg:flex-row gap-20">
              {/* Left: Metadata & Title */}
              <div className="lg:w-2/3">
                 <Link to="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors font-black mb-12 nav-font text-[10px] uppercase tracking-[0.3em]">
                    <ArrowLeft className="w-4 h-4" /> Resources Hub
                 </Link>

                 <div className="space-y-10 mb-16">
                    <div className="flex flex-wrap gap-3">
                       <span className="bg-blue-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] inline-block nav-font shadow-lg shadow-blue-100">
                          {post.category}
                       </span>
                       {post.tags?.map(tag => (
                          <span key={tag} className="bg-gray-50 text-gray-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block nav-font border border-gray-100">
                             #{tag}
                          </span>
                       ))}
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black text-[#0f3460] nav-font leading-[0.9] tracking-tighter uppercase">
                       {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-10 py-8 border-y border-gray-100">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#0f3460] shadow-inner border border-gray-100"><User className="w-6 h-6" /></div>
                          <div>
                            <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest nav-font">Author</span>
                            <span className="text-sm font-bold text-[#0f3460]">{post.author}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-10">
                         <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 nav-font">{post.date}</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 nav-font">{post.readTime}</span>
                         </div>
                       </div>
                    </div>
                 </div>

                 <motion.img 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   src={post.thumbnail} 
                   className="w-full h-[400px] md:h-[600px] object-cover rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] mb-24" 
                   alt={post.title} 
                   loading="lazy"
                 />

                 {/* Content Body */}
                 <article className="max-w-none text-[#0f3460]">
                    {post.sections.map((section, index) => renderSection(section, index))}

                    {/* Reflection Panel - CRITICAL FOR TRANSFORMATION */}
                    <div className="mt-24">
                       <ReflectionPanel articleTitle={post.title} />
                    </div>

                    {/* Content Footer / CTA */}
                    <div className="bg-gray-900 text-white p-14 md:p-20 rounded-[4rem] my-24 shadow-2xl relative overflow-hidden group">
                       <div className="absolute bottom-0 right-0 p-12 opacity-5 scale-150"><Users className="w-64 h-64" /></div>
                       <h3 className="text-3xl md:text-5xl font-black mb-10 nav-font text-amber-500 leading-tight uppercase tracking-tighter">
                          พร้อมออกแบบการพัฒนา <br/> ยกระดับองค์กรหรือยังครับ?
                       </h3>
                       <p className="text-blue-100/70 mb-14 text-lg font-medium max-w-2xl leading-relaxed">
                          สถาบันแคป วิชั่น พร้อมเป็นพาร์ทเนอร์ในการวิเคราะห์ความต้องการ (TNA) และออกแบบระบบนิเวศแห่งการเรียนรู้ (Learning Ecosystem) ที่เห็นผลจริงให้กับองค์กรของคุณ
                       </p>
                       <div className="flex flex-wrap gap-8">
                          <a href={CONTACT_INFO.lineUrl} className="bg-amber-500 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-amber-500 transition-all nav-font shadow-xl shadow-amber-500/20 uppercase tracking-widest">
                             Consult now
                          </a>
                          <Link to="/contact" className="border-2 border-white/20 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all nav-font uppercase tracking-widest">
                             Get Proposal
                          </Link>
                       </div>
                    </div>
                 </article>
              </div>

              {/* Sidebar / Insights */}
              <aside className="lg:w-1/3">
                 <div className="sticky top-32 space-y-16">
                    <ShareButtons title={post.title} />

                    {/* Related */}
                    <div>
                       <h3 className="text-xl font-black text-[#0f3460] uppercase tracking-tighter nav-font mb-10 flex items-center gap-4">
                          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                          Recommended Insights
                       </h3>
                       <div className="space-y-12">
                          {STATIC_ARTICLES.slice(0, 3).map((a: any) => (
                            <Link key={a.id} to={`/resources/${a.id}`} className="group block">
                               <div className="flex gap-6 items-center">
                                  <div className="w-24 h-24 rounded-[1.8rem] overflow-hidden flex-shrink-0 shadow-sm">
                                     <img src={a.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-[#0f3460] leading-tight mb-2 group-hover:text-blue-600 transition-colors nav-font tracking-tight">{a.title}</h4>
                                     <div className="flex items-center gap-4">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{a.date}</span>
                                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{a.category}</span>
                                     </div>
                                  </div>
                               </div>
                            </Link>
                          ))}
                       </div>
                    </div>

                    <NewsletterBox />
                 </div>
              </aside>
            </div>
         </div>
      </div>
   );
};

export default BlogPost;
