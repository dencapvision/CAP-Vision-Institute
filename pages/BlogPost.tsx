import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Clock, Calendar, User, BookOpen, Quote, CheckCircle2, Download, FileText, ChevronRight, MessageCircle, Zap, Facebook, Target, BarChart3, TrendingUp, Users, Cpu, Tag } from 'lucide-react';
import { RESOURCE_ARTICLES, CONTACT_INFO } from '../constants';

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
            // Fallback or show error
            setLoading(false);
         });
   }, [id]);

   const renderSection = (section: PostContentSection, index: number) => {
      switch (section.type) {
         case 'heading':
            return <h2 key={index} className="text-3xl font-black text-[#0f3460] nav-font mb-8 mt-12">{section.content}</h2>;
         case 'subheading':
            return <h3 key={index} className="text-2xl font-black text-[#0f3460] mb-8 nav-font border-b-4 border-[#c5a059] pb-4 inline-block">{section.content}</h3>;
         case 'text':
            return <p key={index} className="text-lg mb-8 leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: section.content || '' }}></p>;
         case 'quote':
            return (
               <div key={index} className="border-l-4 border-[#c5a059] pl-8 py-4 my-12 bg-gray-50 rounded-r-3xl">
                  <Quote className="w-10 h-10 text-[#c5a059] mb-4" />
                  <p className="text-2xl md:text-3xl font-black nav-font italic leading-snug text-[#0f3460]">{section.content}</p>
                  {section.author && <cite className="block mt-4 text-gray-500 font-bold">— {section.author}</cite>}
               </div>
            );
         case 'image':
            return <img key={index} src={section.imageUrl} className="w-full rounded-[2rem] shadow-xl my-12" alt={section.content || 'post image'} />;
         case 'list':
            return (
               <ul key={index} className="space-y-4 mb-12">
                  {section.items?.map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#c5a059] shrink-0 mt-0.5" />
                        <span className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: item }}></span>
                     </li>
                  ))}
               </ul>
            );
         case 'box':
            const boxStyles = {
               info: 'bg-blue-50 border-blue-100 text-blue-800',
               warning: 'bg-orange-50 border-orange-100 text-orange-800',
               success: 'bg-green-50 border-green-100 text-green-800',
               danger: 'bg-red-50 border-red-100 text-red-800'
            };
            const variant = section.variant || 'info';
            return (
               <div key={index} className={`${boxStyles[variant]} p-8 rounded-[2rem] border mb-10`}>
                  {section.title && <h4 className="font-black mb-4 uppercase tracking-widest text-xs">{section.title}</h4>}
                  <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: section.content || '' }}></p>
                  {section.items && (
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm font-bold">
                        {section.items.map((item, i) => (
                           <li key={i} className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${variant === 'danger' ? 'bg-red-400' : 'bg-blue-400'}`}></div> {item}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            );
         case 'highlight':
            return (
               <div key={index} className="bg-[#0f3460] text-white p-10 rounded-[3rem] shadow-xl my-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-32 h-32" /></div>
                  <h3 className="text-2xl font-black text-[#c5a059] mb-6 nav-font">{section.title}</h3>
                  <p className="text-blue-100/80 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content || '' }}></p>
               </div>
            );
         default:
            return null;
      }
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c5a059]"></div>
         </div>
      );
   }

   if (!post) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <h2 className="text-3xl font-black text-[#0f3460] mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
            <p className="text-gray-500 mb-8">บทความนี้อาจถูกลบหรือย้ายที่อยู่แล้ว</p>
            <Link to="/resources" className="bg-[#0f3460] text-white px-8 py-3 rounded-xl font-bold">กลับไปหน้า Resources</Link>
         </div>
      );
   }

   return (
      <div className="bg-white min-h-screen">
         {/* Article Header */}
         <div className="max-w-4xl mx-auto px-4 pt-16 md:pt-24 pb-12">
            <Link to="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c5a059] transition-colors font-bold mb-10 nav-font text-xs uppercase tracking-widest">
               <ArrowLeft className="w-4 h-4" /> ย้อนกลับไป Resources Hub
            </Link>

            <div className="space-y-8 mb-12">
               <div className="flex flex-wrap gap-3">
                  <span className="bg-[#c5a059] text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] inline-block nav-font">
                     {post.category}
                  </span>
                  {post.tags?.map(tag => (
                     <span key={tag} className="bg-gray-100 text-gray-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block nav-font">
                        #{tag}
                     </span>
                  ))}
               </div>

               <h1 className="text-3xl md:text-6xl font-black text-[#0f3460] nav-font leading-tight">
                  {post.title}
               </h1>

               {post.description && (
                  <p className="text-xl text-gray-500 font-medium italic border-l-4 border-gray-100 pl-6 py-2">
                     {post.description}
                  </p>
               )}

               <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#0f3460]"><User className="w-5 h-5" /></div>
                     <span className="text-sm font-black text-[#0f3460] nav-font uppercase tracking-wider">By {post.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                     <Calendar className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-widest">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                     <Clock className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-widest">{post.readTime}</span>
                  </div>
               </div>
            </div>

            <img src={post.thumbnail} className="w-full h-[300px] md:h-[500px] object-cover rounded-[3rem] shadow-2xl mb-16" alt={post.title} />

            {/* Content Body */}
            <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium">
               {post.sections.map((section, index) => renderSection(section, index))}

               <div className="bg-gray-900 text-white p-12 md:p-16 rounded-[4rem] my-24 shadow-2xl relative overflow-hidden">
                  <h3 className="text-2xl md:text-4xl font-black mb-8 nav-font text-[#c5a059] leading-tight">ต้องการออกแบบกลยุทธ์การพัฒนาบุคลากรที่เห็นผลจริง?</h3>
                  <p className="text-blue-100/70 mb-12 text-lg">สถาบันแคป วิชั่น พร้อมเป็นพาร์ทเนอร์ในการทำ TNA และออกแบบระบบ Training Management ครบวงจรให้กับองค์กรคุณ</p>
                  <div className="flex flex-wrap gap-6">
                     <a href={CONTACT_INFO.lineUrl} className="bg-[#c5a059] text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white hover:text-[#0f3460] transition-all nav-font shadow-lg">คุยกับ Master Facilitator</a>
                     <Link to="/contact" className="border-2 border-white/20 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all nav-font">ขอใบเสนอราคา</Link>
                  </div>
               </div>
            </article>

            {/* Post Footer */}
            <div className="bg-gray-50 rounded-[3rem] p-12 text-center border border-gray-100 mb-24">
               <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-6">Connect with Author</p>
               <h4 className="text-2xl font-black text-[#0f3460] nav-font mb-4">{post.author}</h4>
               <div className="flex justify-center gap-6">
                  <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm hover:scale-110 transition-transform"><Facebook className="w-6 h-6" /></a>
                  <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm hover:scale-110 transition-transform"><MessageCircle className="w-6 h-6" /></a>
                  <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c5a059] shadow-sm hover:scale-110 transition-transform"><Share2 className="w-6 h-6" /></button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default BlogPost;
