import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { HRD_ARTICLES } from '../constants/articles';
import { fetchRelatedArticles } from '../lib/services/blog-articles';
import ShareButtons from './ShareButtons';
import NewsletterBox from './NewsletterBox';
import ReflectionPanel from './LearningHub/ReflectionPanel';
import AICoachSidebar from './LearningHub/AICoachSidebar';

interface BlogArticleDetailPageProps {
  slug: string;
}

const BlogArticleDetailPage: React.FC<BlogArticleDetailPageProps> = ({ slug }) => {
  const [articleData, setArticleData] = useState<any>(null);
  const [isAeo, setIsAeo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [recommendedArticles, setRecommendedArticles] = useState<any[]>([]);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(null);
      let loadedArticle: any = null;

      // 1. Try fetching from public JSON path
      try {
        const res = await fetch(`/content/blog/posts/${slug}.json`);
        if (res.ok) {
          const data = await res.json();
          loadedArticle = data;
        }
      } catch (err) {
        console.warn('Failed to fetch JSON via API path:', err);
      }

      // 2. Fallback to Supabase
      if (!loadedArticle) {
        try {
          const { data, error: dbError } = await supabase
            .from('blog_articles')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

          if (!dbError && data) {
            loadedArticle = {
              ...data.content,
              slug: data.slug,
              category: data.category,
              thumbnail: data.thumbnail,
              author: data.author,
              date: data.date_label,
              readTime: data.read_time
            };
          }
        } catch (err) {
          console.warn('Failed to fetch from Supabase:', err);
        }
      }

      // 3. Fallback to static HRD_ARTICLES
      if (!loadedArticle) {
        const staticArt = HRD_ARTICLES.find(a => a.id === slug);
        if (staticArt) {
          loadedArticle = {
            id: staticArt.id,
            title: staticArt.title,
            category: staticArt.category || 'HRD Insight',
            thumbnail: staticArt.thumbnail,
            author: 'ครูเด่น มาสเตอร์ฟา',
            date: staticArt.date,
            readTime: '5 นาที',
            excerpt: staticArt.excerpt,
            sections: [
              { type: 'text', content: staticArt.excerpt }
            ]
          };
        }
      }

      if (loadedArticle) {
        setArticleData(loadedArticle);
        const hasAeo = loadedArticle.summary !== undefined;
        setIsAeo(hasAeo);

        // Fetch Related Articles client-side
        try {
          const keywords = loadedArticle.seo?.keywords || [];
          const related = await fetchRelatedArticles(slug, keywords);
          setRelatedArticles(related);
        } catch (relatedErr) {
          console.warn('Failed to load related articles:', relatedErr);
        }
      } else {
        setError('ไม่พบหน้าที่คุณต้องการ');
      }
      setLoading(false);
    };

    loadArticle();

    // Recommended static articles
    const recommended = HRD_ARTICLES
      .filter(a => a.id !== slug)
      .slice(0, 3);
    setRecommendedArticles(recommended);
  }, [slug]);

  // Update page title/meta dynamically client-side for SEO convenience
  useEffect(() => {
    if (articleData) {
      const metaTitle = articleData.seo?.meta_title || articleData.seo?.metaTitle || `${articleData.title} | CAP Vision Insight`;
      const metaDesc = articleData.seo?.meta_description || articleData.seo?.metaDescription || articleData.summary || articleData.excerpt || '';
      document.title = metaTitle;
      
      const metaDescTag = document.querySelector('meta[name="description"]');
      if (metaDescTag) {
        metaDescTag.setAttribute('content', metaDesc);
      }
    }
  }, [articleData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0f3460]/20 border-t-[#0f3460] mb-4"></div>
        <p className="text-gray-500 font-medium nav-font">กำลังโหลดเนื้อหา...</p>
      </div>
    );
  }

  if (error || !articleData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h2 className="text-3xl font-black text-[#0f3460] mb-4 nav-font">ไม่พบหน้าที่คุณต้องการ</h2>
        <p className="text-gray-500 mb-8 font-medium">บทความนี้อาจถูกลบหรือย้ายที่อยู่แล้ว</p>
        <a href="/resources" className="bg-[#0f3460] text-white px-10 py-4 rounded-2xl font-black nav-font uppercase tracking-widest text-xs shadow-lg hover:bg-[#c5a059] transition-colors">
          กลับหน้าหลักทรัพยากร
        </a>
      </div>
    );
  }

  const activeThumbnail = articleData.thumbnail || '';
  const articleTextForAI = isAeo
    ? [articleData.summary, articleData.context, articleData.insight, articleData.application].join(' ')
    : articleData.sections?.map((s: any) => s.content || '').join(' ') || '';

  return (
    <div className="bg-white min-h-screen">
      {/* AI Coach Sidebar (Floating) */}
      <AICoachSidebar
        articleTitle={articleData.title}
        articleContent={articleTextForAI}
      />

      {/* Hero Header Area */}
      <header className="relative bg-[#0f3460] text-white pt-32 pb-24 overflow-hidden">
        {/* Subtle Decorative Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,242,254,0.05),transparent_65%)]" />
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#c5a059] rounded-full blur-[120px] opacity-[0.07] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Category Tag */}
            <span className="bg-[#c5a059]/20 text-[#c5a059] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.25em] mb-8 border border-[#c5a059]/30 shadow-sm nav-font">
              {articleData.category || 'HRD Insight'}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl mb-10 nav-font bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-200">
              {articleData.title}
            </h1>

            {/* Metadata (Author, Date, Read Time) */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#c5a059] rounded-full" />
                {articleData.author || 'ครูเด่น มาสเตอร์ฟา'}
              </span>
              <span className="text-gray-600">•</span>
              <span>{articleData.date}</span>
              <span className="text-gray-600">•</span>
              <span className="bg-white/10 px-4 py-1.5 rounded-lg text-xs text-white border border-white/5 font-semibold">
                ⏳ {articleData.readTime || '5 นาที'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Thumbnail Image */}
      {activeThumbnail && (
        <div className="container mx-auto px-6 max-w-5xl -mt-12 relative z-20">
          <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(15,52,96,0.15)] border-4 border-white bg-gray-50">
            <img
              src={activeThumbnail}
              alt={articleData.title}
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.5s]"
            />
          </div>
        </div>
      )}

      {/* Article Content Layout */}
      <div className="container mx-auto px-6 max-w-5xl pt-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content Area */}
          <main className="lg:w-2/3">
            <article className="prose prose-lg max-w-none">
              {isAeo ? (
                /* Premium AEO (Answer Engine Optimized) Rendering */
                <div className="space-y-16">
                  {/* 1. Summary Card */}
                  <section className="bg-gradient-to-r from-amber-50/60 to-orange-50/20 rounded-[2.5rem] p-10 border border-amber-100/60 relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/10 rounded-bl-full -z-10 opacity-40 group-hover:scale-110 transition-transform duration-700" />
                    <h2 className="text-2xl font-black text-[#0f3460] nav-font mb-4 flex items-center gap-2">
                      💡 บทสรุปผู้บริหาร (Executive Summary)
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed font-medium m-0">
                      {articleData.summary}
                    </p>
                  </section>

                  {/* 2. Context */}
                  {articleData.context && (
                    <section className="mt-12">
                      <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-[#c5a059] rounded-full inline-block" />
                        ทำไมเรื่องนี้สำคัญในองค์กร
                      </h2>
                      {articleData.context.split('\n\n').filter(Boolean).map((para: string, idx: number) => (
                        <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-4">{para}</p>
                      ))}
                    </section>
                  )}

                  {/* 3. Insight */}
                  {articleData.insight && (
                    <section className="mt-12">
                      <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-blue-600 rounded-full inline-block" />
                        แนวคิดและหลักการสำคัญ (Core Insight)
                      </h2>
                      {articleData.insight.split('\n\n').filter(Boolean).map((para: string, idx: number) => (
                        <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-4">{para}</p>
                      ))}
                    </section>
                  )}

                  {/* 4. Framework */}
                  {articleData.framework && articleData.framework.length > 0 && (
                    <section className="bg-[#f8fafc] rounded-[2rem] p-8 md:p-10 border border-gray-100 mt-12">
                      <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-7">Framework ที่ใช้ได้จริง</h2>
                      <ol className="space-y-6 list-none p-0 m-0">
                        {articleData.framework.map((step: any, i: number) => {
                          if (typeof step === 'string') {
                            return (
                              <li key={i} className="flex gap-5 items-start">
                                <span className="w-9 h-9 bg-[#0f3460] text-white text-xs font-black rounded-xl flex items-center justify-center flex-shrink-0">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed pt-1 m-0">{step}</p>
                              </li>
                            );
                          }
                          return (
                            <li key={i} className="flex gap-5 items-start">
                              <span className="w-9 h-9 bg-[#0f3460] text-white text-xs font-black rounded-xl flex items-center justify-center flex-shrink-0">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <div className="pt-1">
                                {(step.step || step.title) && (
                                  <p className="font-black text-[#0f3460] text-sm md:text-base nav-font mb-1 m-0">
                                    {step.step ? `${step.step}${step.title ? ` — ${step.title}` : ''}` : step.title}
                                  </p>
                                )}
                                {step.description && <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed m-0 mt-1">{step.description}</p>}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </section>
                  )}

                  {/* 5. Application */}
                  {articleData.application && (
                    <section className="mt-12">
                      <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-5 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-green-500 rounded-full inline-block" />
                        แนวทางการนำไปประยุกต์ใช้ (Application)
                      </h2>
                      {articleData.application.split('\n\n').filter(Boolean).map((para: string, idx: number) => (
                        <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed font-medium mb-4">{para}</p>
                      ))}
                    </section>
                  )}

                  {/* 6. Case Study */}
                  {articleData.case_study && (
                    <section className="border-l-4 border-[#c5a059] pl-8 py-6 bg-amber-50/45 rounded-r-[2rem] mt-12">
                      <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] mb-3 nav-font">ตัวอย่างจากองค์กรจริง</p>
                      {typeof articleData.case_study === 'string' ? (
                        articleData.case_study.split('\n\n').filter(Boolean).map((para: string, idx: number) => (
                          <p key={idx} className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-3 m-0">{para}</p>
                        ))
                      ) : (
                        <div>
                          {articleData.case_study.title && (
                            <p className="font-black text-[#0f3460] text-sm md:text-base nav-font mb-3 m-0">{articleData.case_study.title}</p>
                          )}
                          {articleData.case_study.story && (
                            <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-3 m-0">{articleData.case_study.story}</p>
                          )}
                          {articleData.case_study.result && (
                            <p className="text-sm font-black text-[#c5a059] mt-3 m-0">{articleData.case_study.result}</p>
                          )}
                        </div>
                      )}
                    </section>
                  )}

                  {/* 7. Key Takeaways */}
                  {articleData.takeaways && articleData.takeaways.length > 0 && (
                    <section className="mt-12 bg-gray-50/50 rounded-[2rem] p-8 md:p-10 border border-gray-100">
                      <h2 className="text-2xl font-black text-[#0f3460] nav-font mb-6">สรุปประเด็นชวนคิด (Key Takeaways)</h2>
                      <ul className="space-y-4 list-disc pl-6 text-gray-700 text-base md:text-lg font-medium">
                        {articleData.takeaways.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* 8. FAQ */}
                  {articleData.faq && articleData.faq.length > 0 && (
                    <section className="mt-16">
                      <h2 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mb-8">คำถามที่พบบ่อย (FAQs)</h2>
                      <div className="space-y-6">
                        {articleData.faq.map((item: any, i: number) => (
                          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-black text-[#0f3460] nav-font mb-2 flex gap-3">
                              <span className="text-[#c5a059]">Q:</span>
                              {item.question}
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed font-medium pl-6 m-0">
                              {item.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              ) : (
                /* Legacy Sections rendering */
                <div className="space-y-8">
                  {articleData.sections?.map((section: any, idx: number) => {
                    switch (section.type) {
                      case 'text':
                        return <p key={idx} className="text-lg mb-8 leading-relaxed text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: section.content }}></p>;
                      case 'image':
                        return (
                          <div key={idx} className="my-10 rounded-2xl overflow-hidden shadow-md">
                            <img src={section.url} alt={section.alt || ''} className="w-full object-cover" />
                            {section.caption && <p className="text-center text-xs text-gray-400 mt-3 font-semibold uppercase tracking-widest">{section.caption}</p>}
                          </div>
                        );
                      case 'quote':
                        return (
                          <blockquote key={idx} className="border-l-4 border-[#c5a059] pl-6 my-8 italic text-xl text-[#0f3460] font-bold">
                            <p className="mb-2 leading-relaxed">{section.text}</p>
                            {section.author && <cite className="text-sm text-gray-400 font-semibold block uppercase tracking-widest">— {section.author}</cite>}
                          </blockquote>
                        );
                      case 'list':
                        return (
                          <div key={idx} className="my-8 bg-gray-50/50 p-8 rounded-2xl border border-gray-100">
                            {section.title && <h3 className="text-xl font-bold text-[#0f3460] mb-4 nav-font">{section.title}</h3>}
                            <ul className="space-y-3 list-none p-0 m-0">
                              {section.items.map((item: string, i: number) => (
                                <li key={i} className="flex gap-3 items-start text-gray-700 text-base md:text-lg font-medium">
                                  <span className="w-2 h-2 bg-[#c5a059] rounded-full mt-2.5 flex-shrink-0" />
                                  <span dangerouslySetInnerHTML={{ __html: item }}></span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      case 'heading-2':
                        return <h2 key={idx} className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font mt-12 mb-6 flex items-center gap-3"><span className="w-1 h-6 bg-[#c5a059] rounded-full inline-block" />{section.text}</h2>;
                      case 'heading-3':
                        return <h3 key={idx} className="text-xl font-black text-[#0f3460] nav-font mt-8 mb-4">{section.text}</h3>;
                      case 'callout':
                        return (
                          <div key={idx} className="bg-gradient-to-r from-blue-50/30 to-[#f8fafc] p-8 my-8 rounded-2xl border-l-4 border-blue-600">
                            <p className="text-xl font-bold nav-font tracking-tight leading-relaxed mb-6 text-[#0f3460]" dangerouslySetInnerHTML={{ __html: section.content }}></p>
                          </div>
                        );
                      case 'highlight':
                        return (
                          <div key={idx} className="bg-[#0f3460] text-white p-8 md:p-10 my-8 rounded-[2rem] shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/10 rounded-bl-full -z-10" />
                            <p className="text-blue-100/80 text-xl leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: section.content }}></p>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}

                  {/* Reflection Panel */}
                  <div className="mt-24">
                    <ReflectionPanel articleTitle={articleData.title} />
                  </div>

                  {/* Legacy CTA */}
                  {articleData.cta && (
                    <div className="bg-[#0f3460] text-white p-10 md:p-14 rounded-[2.5rem] mt-16 text-center relative overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1),transparent_60%)]" />
                      <div className="relative z-10">
                        <span className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.3em] mb-4 inline-block nav-font">In-House Training Solutions</span>
                        <h3 className="text-2xl md:text-3xl font-black nav-font mb-6 leading-tight max-w-2xl mx-auto">
                          {typeof articleData.cta === 'object' && articleData.cta ? articleData.cta.title : 'พร้อมออกแบบการพัฒนา\nยกระดับองค์กรหรือยัง?'}
                        </h3>
                        <p className="text-blue-100/80 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
                          {typeof articleData.cta === 'object' && articleData.cta ? articleData.cta.description : (typeof articleData.cta === 'string' ? articleData.cta : 'ให้ CAP Vision เป็นคู่คิดในการพัฒนาคนในองค์กรของคุณ')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                          {typeof articleData.cta === 'object' && articleData.cta?.buttonLink ? (
                            <a href={articleData.cta.buttonLink} className="bg-[#c5a059] text-[#0f3460] px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest nav-font shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all">
                              {articleData.cta.buttonText || 'รายละเอียดหลักสูตร'}
                            </a>
                          ) : (
                            <a href="https://lin.ee/zRTBF6K" target="_blank" rel="noopener noreferrer" className="bg-[#00B900] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest nav-font shadow-lg hover:bg-white hover:text-green-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                              ติดต่อทาง LINE
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>
          </main>

          {/* Right Sidebar Area */}
          <aside className="lg:w-1/3">
            <div className="sticky top-32 space-y-16">
              <ShareButtons title={articleData.title} />

              {/* Recommended Insights */}
              <div>
                <h4 className="text-xs font-black text-[#0f3460] uppercase tracking-[0.2em] mb-6 nav-font flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#c5a059] rounded-full inline-block" />
                  บทความแนะนำ
                </h4>
                <div className="space-y-6">
                  {recommendedArticles.map((a: any) => (
                    <a key={a.id} href={`/resources/${a.id}`} className="group block cursor-pointer">
                      <div className="flex gap-4 items-start">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm bg-gray-50">
                          <img
                            src={a.thumbnail}
                            alt={a.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-[#0f3460] leading-snug mb-1 group-hover:text-[#c5a059] transition-colors nav-font tracking-tight text-sm line-clamp-2">
                            {a.title}
                          </h5>
                          <span className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest">
                            {a.category || 'HRD Insight'}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Related Insights from DB */}
              {relatedArticles.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-[#0f3460] uppercase tracking-[0.2em] mb-6 nav-font flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-blue-600 rounded-full inline-block" />
                    บทความที่เกี่ยวข้อง
                  </h4>
                  <div className="space-y-6">
                    {relatedArticles.map((a: any) => (
                      <a key={a.slug} href={`/resources/${a.slug}`} className="group block cursor-pointer">
                        <div className="flex gap-5 items-start">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm bg-[#0f3460]/5">
                            {a.thumbnail ? (
                              <img
                                src={a.thumbnail}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#c5a059]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0f3460] leading-tight mb-1.5 group-hover:text-[#c5a059] transition-colors nav-font tracking-tight text-sm line-clamp-2">
                              {a.title}
                            </h4>
                            <span className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest">
                              {a.category || 'HRD Insight'}
                            </span>
                          </div>
                        </div>
                      </a>
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

export default BlogArticleDetailPage;
