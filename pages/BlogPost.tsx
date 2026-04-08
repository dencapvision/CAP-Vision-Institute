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
import { fetchArticleBySlug, fetchRelatedArticles, type BlogArticleRow } from '../services/blog-articles';
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

// ── NEW AEO Format ────────────────────────────────────
interface FrameworkStep {
   step?: string;
   title?: string;
   description?: string;
}
interface CaseStudyObj {
   title?: string;
   story?: string;
   result?: string;
}
interface CTAObj {
   title?: string;
   description?: string;
   buttonText?: string;
   buttonLink?: string;
}
interface AEOPost {
   title: string;
   slug: string;
   category?: string;
   thumbnail?: string;
   author?: string;
   date?: string;
   readTime?: string;
   summary: string;
   context: string;
   insight: string;
   framework: string[] | FrameworkStep[];
   application: string;
   case_study: string | CaseStudyObj;
   takeaways: string[];
   faq: Array<{ question: string; answer: string }>;
   cta?: string | CTAObj;
   seo?: { meta_title?: string; metaTitle?: string; meta_description?: string; metaDescription?: string; keywords?: string[] };
   hashtags?: string[];
   images?: Array<{ url: string; alt: string; title?: string; description?: string; caption?: string }>;
}

const BlogPost: React.FC = () => {
   const { id } = useParams();
   const [post, setPost] = useState<PostData | null>(null);
   const [aeoPost, setAeoPost] = useState<AEOPost | null>(null);
   const [loading, setLoading] = useState(true);
   const [relatedArticles, setRelatedArticles] = useState<BlogArticleRow[]>([]);
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   useEffect(() => {
      setLoading(true);
      setPost(null);
      setAeoPost(null);

      fetch(`/content/blog/posts/${id}.json`)
         .then(res => {
            if (!res.ok) throw new Error('File not found');
            return res.json();
         })
         .then(data => {
            // Detect format: AEO (has summary field) vs legacy (has sections array)
            if (data.summary !== undefined) {
               setAeoPost(data as AEOPost);
            } else {
               setPost(data as PostData);
            }
            setLoading(false);
         })
         .catch(async () => {
            try {
               const row = await fetchArticleBySlug(id!);
               if (row) {
                  const aeo: AEOPost = { ...row.content, slug: row.slug, category: row.category, thumbnail: row.thumbnail, author: row.author, date: row.date_label, readTime: row.read_time };
                  setAeoPost(aeo);
                  // load related articles
                  fetchRelatedArticles(row.slug, row.content?.seo?.keywords ?? []).then(setRelatedArticles).catch(() => {});
               }
            } catch { /* not found anywhere */ }
            setLoading(false);
         });
         
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

   // ── AEO format renderer ──────────────────────────
   const renderAEO = (p: AEOPost) => (
      <article className="space-y-10">
         {/* 1. Answer-first Summary */}
         <div className="bg-[#0f3460] text-white rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c5a059]/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
            <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] mb-3 nav-font">สรุปสั้น — ตอบทันที</p>
            <p className="text-lg md:text-xl font-bold leading-relaxed text-white/90">{p.summary}</p>
         </div>

         {/* 2. Context */}
         {p.context && (
            <section>
               <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-5 flex items-center gap-3">
                  <span className="w-1 h-8 bg-[#c5a059] rounded-full inline-block" />
                  ทำไมเรื่องนี้สำคัญในองค์กร
               </h2>
               {p.context.split('\n\n').filter(Boolean).map((para, i) => (
                  <p key={i} className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-4">{para}</p>
               ))}
            </section>
         )}

         {/* 3. Insight */}
         {p.insight && (
            <section>
               <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-5 flex items-center gap-3">
                  <span className="w-1 h-8 bg-[#c5a059] rounded-full inline-block" />
                  แนวคิดสำคัญ — CAP Vision Insight
               </h2>
               {p.insight.split('\n\n').filter(Boolean).map((para, i) => (
                  <p key={i} className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-4">{para}</p>
               ))}
            </section>
         )}

         {/* 4. Framework */}
         {p.framework?.length > 0 && (
            <section className="bg-[#f8fafc] rounded-[2rem] p-8 md:p-10 border border-gray-100">
               <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-7">Framework ที่ใช้ได้จริง</h2>
               <ol className="space-y-6">
                  {(p.framework as Array<string | FrameworkStep>).map((step, i) => {
                     if (typeof step === 'string') {
                        return (
                           <li key={i} className="flex gap-5 items-start">
                              <span className="w-9 h-9 bg-[#0f3460] text-white text-xs font-black rounded-xl flex items-center justify-center flex-shrink-0">
                                 {String(i + 1).padStart(2, '0')}
                              </span>
                              <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed pt-1">{step}</p>
                           </li>
                        );
                     }
                     const s = step as FrameworkStep;
                     return (
                        <li key={i} className="flex gap-5 items-start">
                           <span className="w-9 h-9 bg-[#0f3460] text-white text-xs font-black rounded-xl flex items-center justify-center flex-shrink-0">
                              {String(i + 1).padStart(2, '0')}
                           </span>
                           <div className="pt-1">
                              {(s.step || s.title) && (
                                 <p className="font-black text-[#0f3460] text-sm md:text-base nav-font mb-1">
                                    {s.step ? `${s.step}${s.title ? ` — ${s.title}` : ''}` : s.title}
                                 </p>
                              )}
                              {s.description && <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed">{s.description}</p>}
                           </div>
                        </li>
                     );
                  })}
               </ol>
            </section>
         )}

         {/* 5. Application */}
         {p.application && (
            <section>
               <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-5 flex items-center gap-3">
                  <span className="w-1 h-8 bg-[#c5a059] rounded-full inline-block" />
                  นำไปใช้ในองค์กรอย่างไร
               </h2>
               {p.application.split('\n\n').filter(Boolean).map((para, i) => (
                  <p key={i} className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-4">{para}</p>
               ))}
            </section>
         )}

         {/* 6. Case Study */}
         {p.case_study && (
            <section className="border-l-4 border-[#c5a059] pl-8 py-6 bg-amber-50/40 rounded-r-[2rem]">
               <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] mb-3 nav-font">ตัวอย่างจากองค์กรจริง</p>
               {typeof p.case_study === 'string' ? (
                  p.case_study.split('\n\n').filter(Boolean).map((para, i) => (
                     <p key={i} className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-3">{para}</p>
                  ))
               ) : (
                  <>
                     {(p.case_study as CaseStudyObj).title && (
                        <p className="font-black text-[#0f3460] text-sm md:text-base nav-font mb-3">{(p.case_study as CaseStudyObj).title}</p>
                     )}
                     {(p.case_study as CaseStudyObj).story && (
                        <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-3">{(p.case_study as CaseStudyObj).story}</p>
                     )}
                     {(p.case_study as CaseStudyObj).result && (
                        <p className="text-sm font-black text-[#c5a059] mt-3">{(p.case_study as CaseStudyObj).result}</p>
                     )}
                  </>
               )}
            </section>
         )}

         {/* 7. Takeaways */}
         {p.takeaways?.length > 0 && (
            <section className="bg-[#0f3460]/5 rounded-[2rem] p-8 md:p-10">
               <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-6">สรุปสิ่งที่ได้</h2>
               <ul className="space-y-4">
                  {p.takeaways.map((item, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-base font-medium leading-relaxed">{item}</span>
                     </li>
                  ))}
               </ul>
            </section>
         )}

         {/* 8. Hashtags */}
         {p.hashtags && p.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
               {p.hashtags.map((tag) => (
                  <span key={tag} className="text-xs font-bold text-[#0f3460]/60 bg-gray-100 px-3 py-1.5 rounded-lg">
                     {tag}
                  </span>
               ))}
            </div>
         )}

         {/* 9. FAQ (AEO) */}
         {p.faq?.length > 0 && (
            <section>
               <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-7 flex items-center gap-3">
                  <span className="w-1 h-8 bg-[#c5a059] rounded-full inline-block" />
                  คำถามที่พบบ่อย
               </h2>
               <div className="space-y-4">
                  {p.faq.map((item, i) => (
                     <FAQItem key={i} question={item.question} answer={item.answer} />
                  ))}
               </div>
            </section>
         )}

         {/* 10. CTA */}
         {(() => {
            const ctaTitle = typeof p.cta === 'object' && p.cta ? (p.cta as CTAObj).title : 'พร้อมออกแบบการพัฒนา\nยกระดับองค์กรหรือยัง?';
            const ctaDesc = typeof p.cta === 'object' && p.cta ? (p.cta as CTAObj).description : (typeof p.cta === 'string' ? p.cta : 'สถาบัน CAP Vision พร้อมออกแบบหลักสูตรที่ตรงกับปัญหาขององค์กรคุณ ปรึกษาฟรีภายใน 24 ชั่วโมง');
            const ctaBtnText = typeof p.cta === 'object' && p.cta ? (p.cta as CTAObj).buttonText : 'ปรึกษาฟรี';
            const ctaBtnLink = typeof p.cta === 'object' && p.cta ? (p.cta as CTAObj).buttonLink : undefined;
            return (
               <div className="bg-gray-900 text-white p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 p-8 opacity-5"><Users className="w-48 h-48" /></div>
                  <h3 className="text-2xl md:text-4xl font-black mb-5 nav-font text-[#c5a059] leading-tight uppercase tracking-tight whitespace-pre-line">
                     {ctaTitle || 'พร้อมออกแบบการพัฒนา\nยกระดับองค์กรหรือยัง?'}
                  </h3>
                  <p className="text-white/70 mb-8 text-base md:text-lg font-medium max-w-xl leading-relaxed">
                     {ctaDesc || 'สถาบัน CAP Vision พร้อมออกแบบหลักสูตรที่ตรงกับปัญหาขององค์กรคุณ ปรึกษาฟรีภายใน 24 ชั่วโมง'}
                  </p>
                  <div className="flex flex-wrap gap-4">
                     {ctaBtnLink ? (
                        <Link to={ctaBtnLink} className="bg-[#c5a059] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-lg uppercase tracking-widest text-sm">
                           {ctaBtnText || 'ปรึกษาฟรี'}
                        </Link>
                     ) : (
                        <a href={CONTACT_INFO.lineUrl} className="bg-[#c5a059] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-lg uppercase tracking-widest text-sm">
                           {ctaBtnText || 'ปรึกษาฟรี'}
                        </a>
                     )}
                     <Link to="/contact" className="border-2 border-white/20 px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all nav-font uppercase tracking-widest text-sm">
                        ขอใบเสนอราคา
                     </Link>
                  </div>
               </div>
            );
         })()}
      </article>
   );

   // FAQ accordion component
   const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
      const [open, setOpen] = React.useState(false);
      return (
         <div className={`border rounded-2xl overflow-hidden transition-all ${open ? 'border-[#c5a059]' : 'border-gray-200'}`}>
            <button
               className="w-full flex items-center justify-between px-6 py-5 text-left"
               onClick={() => setOpen(!open)}
            >
               <span className="text-sm md:text-base font-bold text-[#0f3460] pr-4">{question}</span>
               <span className={`text-[#c5a059] font-black text-xl transition-transform flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open && (
               <div className="px-6 pb-5 text-gray-600 text-sm md:text-base leading-relaxed font-medium border-t border-gray-100 pt-4">
                  {answer}
               </div>
            )}
         </div>
      );
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
         </div>
      );
   }

   if (!post && !aeoPost) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <h2 className="text-3xl font-black text-[#0f3460] mb-4 nav-font">ไม่พบหน้าที่คุณต้องการ</h2>
            <p className="text-gray-500 mb-8 font-medium">บทความนี้อาจถูกลบหรือย้ายที่อยู่แล้ว</p>
            <Link to="/resources" className="bg-[#0f3460] text-white px-10 py-4 rounded-2xl font-black nav-font uppercase tracking-widest text-xs shadow-lg">กลับไปหน้า Resources</Link>
         </div>
      );
   }

   // For AEO format, use a unified post-like object for the header
   const aeoSeoTitle = aeoPost?.seo?.meta_title || aeoPost?.seo?.metaTitle;
   const aeoSeoDesc = aeoPost?.seo?.meta_description || aeoPost?.seo?.metaDescription;
   const activePost = aeoPost ? {
      title: aeoPost.title,
      category: aeoPost.category || 'Insight',
      thumbnail: aeoPost.thumbnail || (aeoPost.images?.[0]?.url ?? ''),
      author: aeoPost.author || 'ครูเด่น มาสเตอร์ฟา',
      date: aeoPost.date || '',
      readTime: aeoPost.readTime || '5 นาที',
      description: aeoSeoDesc || aeoPost.summary,
      tags: aeoPost.hashtags?.map(h => h.replace('#', '')) || [],
   } : post!;

   return (
      <div className="bg-white min-h-screen">
         <SEO
            title={aeoSeoTitle || `${activePost.title} | CAP Vision Insight`}
            description={aeoSeoDesc || activePost.description || activePost.title}
            keywords={aeoPost?.seo?.keywords}
            type="BlogPosting"
            articleData={{
               headline: activePost.title,
               description: activePost.description || activePost.title,
               image: activePost.thumbnail,
               datePublished: activePost.date,
               author: activePost.author,
            }}
            articleFaq={aeoPost?.faq}
         />

         {/* Reading Progress Bar */}
         <motion.div
           className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 origin-left z-[100]"
           style={{ scaleX }}
         />

         {/* AI Coach Sidebar (Floating) */}
         <AICoachSidebar
           articleTitle={activePost.title}
           articleContent={aeoPost
             ? [aeoPost.summary, aeoPost.context, aeoPost.insight, aeoPost.application].join(' ')
             : post!.sections.map(s => s.content || '').join(' ')
           }
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
                          {activePost.category}
                       </span>
                       {activePost.tags?.map(tag => (
                          <span key={tag} className="bg-gray-50 text-gray-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block nav-font border border-gray-100">
                             #{tag}
                          </span>
                       ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f3460] nav-font leading-[1.1] tracking-tighter uppercase">
                       {activePost.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-10 py-8 border-y border-gray-100">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#0f3460] shadow-inner border border-gray-100"><User className="w-6 h-6" /></div>
                          <div>
                            <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest nav-font">Author</span>
                            <span className="text-sm font-bold text-[#0f3460]">{activePost.author}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-10">
                         <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 nav-font">{activePost.date}</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 nav-font">{activePost.readTime}</span>
                         </div>
                       </div>
                    </div>
                 </div>

                 {activePost.thumbnail && (
                   <motion.img
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     src={activePost.thumbnail}
                     className="w-full h-[400px] md:h-[600px] object-cover rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] mb-24"
                     alt={activePost.title}
                     loading="lazy"
                   />
                 )}

                 {/* Content Body — AEO or Legacy */}
                 <article className="max-w-none text-[#0f3460]">
                    {aeoPost ? renderAEO(aeoPost) : post!.sections.map((section, index) => renderSection(section, index))}

                    {/* Reflection Panel + Legacy CTA — only for old format */}
                    {!aeoPost && (
                       <>
                          <div className="mt-24">
                             <ReflectionPanel articleTitle={activePost.title} />
                          </div>
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
                       </>
                    )}
                 </article>
              </div>

              {/* Sidebar / Insights */}
              <aside className="lg:w-1/3">
                 <div className="sticky top-32 space-y-16">
                    <ShareButtons title={activePost.title} />

                    {/* Related */}
                    <div>
                       <h3 className="text-xl font-black text-[#0f3460] uppercase tracking-tighter nav-font mb-10 flex items-center gap-4">
                          <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                          Recommended Insights
                       </h3>
                       <div className="space-y-12">
                          {STATIC_ARTICLES
                             .filter(a => a.id !== id)
                             .slice(0, 3)
                             .map((a: any) => (
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

                    {/* Related AEO Articles */}
                    {relatedArticles.length > 0 && (
                       <div>
                          <h3 className="text-xl font-black text-[#0f3460] uppercase tracking-tighter nav-font mb-8 flex items-center gap-4">
                             <div className="w-1.5 h-8 bg-[#c5a059] rounded-full" />
                             Related Insights
                          </h3>
                          <div className="space-y-8">
                             {relatedArticles.map(a => (
                                <Link key={a.id} to={`/resources/${a.slug}`} className="group block">
                                   <div className="flex gap-5 items-center">
                                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm bg-[#0f3460]/5">
                                         {a.thumbnail ? <img src={a.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center"><Sparkles className="w-6 h-6 text-[#c5a059]/40" /></div>}
                                      </div>
                                      <div>
                                         <h4 className="font-bold text-[#0f3460] leading-tight mb-1.5 group-hover:text-[#c5a059] transition-colors nav-font tracking-tight text-sm line-clamp-2">{a.title}</h4>
                                         <span className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest">{a.category}</span>
                                      </div>
                                   </div>
                                </Link>
                             ))}
                          </div>
                       </div>
                    )}

                    <NewsletterBox />
                 </div>
              </aside>
            </div>
         </div>
      </div>
   );
};

export default BlogPost;
