import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, GraduationCap, Award, Sparkles, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_INFO, CONTACT_INFO } from '../constants/brand';
import { HRD_ARTICLES } from '../constants/articles';
import { fetchCourses } from '../services/courses';
import type { Course } from '../types';
import Logo from '../components/Logo';
import ClientsSection from '../components/ClientsSection';
import SEO from '../components/SEO';
import { Calendar, User } from 'lucide-react';


const Home: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setFeaturedCourses(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading featured courses:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="หน้าหลัก"
        description="CAP Vision Institute สถาบันฝึกอบรมระดับมืออาชีพ ผู้นำด้าน Transformative Learning นำโดย ครูเด่น (อนุสรณ์ หนองนา) และ Master Fa"
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-[#0f3460] pt-16 md:pt-0">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
            alt="CAP Vision Institute - ทีมเวิร์คและการพัฒนาองค์กร"
            className="w-full h-full object-cover scale-110 md:scale-100 transition-transform duration-[10s] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f3460] via-[#0f3460]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1),transparent_70%)]"></div>
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#c5a059]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-400/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="max-w-4xl">

            {/* Social proof badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 md:mb-10 animate-fade-in-down">
              <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-ping flex-shrink-0"></span>
              <span className="text-white/80 font-bold tracking-[0.15em] text-[10px] md:text-xs nav-font uppercase leading-none mt-0.5">
                ไว้วางใจโดย Tops · Mr.D.I.Y. · AOT · PEA · Land and Houses · กว่า 100 องค์กร
              </span>
            </div>

            {/* H1 — brand identity preserved, gold emphasis boosted */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] mb-6 md:mb-8 nav-font tracking-tight">
              <span className="text-[#c5a059]">Transform</span> <span className="text-white block md:inline">People</span><br className="hidden md:block" />
              <span className="md:ml-16 lg:ml-20 text-white">Transform <span className="text-[#c5a059]">Organization</span></span>
            </h1>

            {/* Subheadline — specific, outcome-focused */}
            <p className="text-base md:text-xl text-white/90 leading-relaxed mb-3 max-w-2xl">
              สำหรับ HR Manager และผู้บริหารที่ต้องการ
              <strong className="text-white"> พัฒนาผู้นำ ยกระดับทีม และวัดผลได้จริง</strong>
            </p>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-3 max-w-2xl">
              ไม่ใช่แค่อบรม — แต่คือการเปลี่ยนแปลงที่ยั่งยืนด้วย Transformative Learning
            </p>
            <p className="text-[#c5a059] font-bold text-sm md:text-base mb-10 md:mb-12">
              โดย ครูเด่น มาสเตอร์ฟา — Master Facilitator ประสบการณ์กว่า 18 ปี
            </p>

            {/* CTAs — conversion-first order */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-14">
              <Link to="/contact" className="btn-premium bg-[#c5a059] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 group shadow-2xl nav-font active:scale-95 hover:bg-[#e0c58e] hover:text-[#0f3460]">
                ขอใบเสนอราคา
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/courses" className="btn-premium bg-white/5 backdrop-blur-xl text-white border-2 border-white/20 px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 nav-font active:scale-95">
                ดูหลักสูตรทั้งหมด
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-8 md:gap-14 border-t border-white/10 pt-8">
              {[
                { value: '10,000+', label: 'ผู้เรียนสำเร็จ' },
                { value: '100+',    label: 'องค์กรพันธมิตร' },
                { value: '18+',     label: 'ปีประสบการณ์' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-[#c5a059] nav-font">{stat.value}</div>
                  <div className="text-white/85 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/80">
          <span className="text-[10px] items-center font-bold tracking-widest uppercase rotate-90 origin-left translate-x-3 mb-8">Scroll</span>
          <div className="w-0.5 h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>
      {/* Video Intro Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-24 md:py-32 bg-[#0a2545] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#c5a059] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#c5a059] font-black text-[10px] md:text-sm uppercase tracking-[0.4em] mb-4 block nav-font underline decoration-2 underline-offset-8">
              Experience the Transformation
            </span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-7xl font-black text-white nav-font leading-tight"
            >
              สัมผัสประสบการณ์ <span className="font-gold">การเรียนรู้</span> ที่แท้จริง
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-8 border-white/5 ring-1 ring-white/10 group">
              <iframe
                src="https://www.youtube.com/embed/nTdeTEWVeWE?si=JTWQI8tXb57_e7SL"
                title="CAP Vision Institute - Intro Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              {[
                { title: 'Visionary Learning', desc: 'กระบวนการเรียนรู้ที่มองไกลกว่าแค่ทฤษฎี' },
                { title: 'Interactive Flow', desc: 'การมีส่วนร่วมที่สร้างการเปลี่ยนแปลงจากภายใน' },
                { title: 'Result Oriented', desc: 'มุ่งเน้นผลลัพธ์ที่นำไปใช้งานได้จริงในองค์กร' }
              ].map((item, i) => (
                <div key={i} className="group p-6 rounded-2xl hover:bg-white/5 transition-colors">
                  <h4 className="text-[#c5a059] font-black text-lg mb-2 nav-font uppercase tracking-tight">{item.title}</h4>
                  <p className="text-white/85 text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Courses Section */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#c5a059] font-black text-[10px] md:text-sm uppercase tracking-[0.4em] mb-4 block nav-font">Course Selection</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f3460] nav-font leading-tight">
                หลักสูตรที่ <span className="font-gold">ดีที่สุด</span> สำหรับคุณ
              </h2>
            </div>
            <Link to="/courses" className="group flex items-center gap-3 text-lg font-bold text-[#0f3460] hover:text-[#c5a059] transition-all nav-font">
              ดูหลักสูตรทั้งหมด <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {loading ? (
               <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#c5a059] border-t-transparent"></div>
               </div>
            ) : featuredCourses.length > 0 ? (
               featuredCourses.map((course) => (
              <div key={course.id} className="card-premium group flex flex-col h-full bg-white relative overflow-hidden transition-all duration-500">
                <div className="relative overflow-hidden aspect-[16/10] bg-[#0f3460]/5">
                  <img
                    src={course.image}
                    alt={course.alt_text || course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f3460]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-[#c5a059] text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase z-10 shadow-lg">
                    Premium Workshop
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-black text-[#0f3460] mb-4 nav-font group-hover:text-[#c5a059] transition-colors leading-tight whitespace-pre-line min-h-[3.5rem]">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base mb-8 line-clamp-3 opacity-80 leading-relaxed font-medium flex-grow">
                    {course.description}
                  </p>
                  <div className="pt-8 border-t border-gray-100 mt-auto">
                    <Link 
                      to={`/courses/${course.slug || course.id}`} 
                      className="btn-premium w-full bg-[#0f3460] hover:bg-[#c5a059] text-white py-4 rounded-xl font-black text-sm md:text-base flex items-center justify-center gap-3 transition-all nav-font shadow-xl group/btn"
                    >
                      ดูรายละเอียดหลักสูตร
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
            ) : (
               <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                 <p className="text-gray-500">กำลังเตรียมหลักสูตรล่าสุด โปรดกลับมาใหม่ภายหลัง</p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 bg-[#0f3460] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {[
              { label: 'ผู้สำเร็จการอบรม', value: '10,000+', icon: <Users className="w-8 h-8 md:w-10 md:h-10" /> },
              { label: 'หลักสูตรที่เปิดสอน', value: '50+', icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" /> },
              { label: 'องค์กรพันธมิตร', value: '200+', icon: <Award className="w-8 h-8 md:w-10 md:h-10" /> },
              { label: 'ความพึงพอใจ', value: '99%', icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" /> }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className="text-[#c5a059] mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-6xl font-black text-white mb-2 md:mb-4 nav-font tracking-tight">{stat.value}</div>
                <div className="text-white/80 font-black tracking-[0.2em] text-[10px] md:text-sm uppercase nav-font">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16 md:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-16 -left-16 w-64 md:w-80 h-64 md:h-80 bg-[#c5a059] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-pulse"></div>
              <div className="bg-white p-4 md:p-6 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative z-10">
                <img
                  src="/images/denmasterfa.jpg"
                  alt="ครูเด่น มาสเตอร์ฟา"
                  className="rounded-[2.5rem] md:rounded-[3rem] w-full max-w-lg mx-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#c5a059] text-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] z-20 shadow-2xl hidden md:block border-8 border-white">
                <p className="text-3xl md:text-5xl font-black mb-1 nav-font">18+</p>
                <p className="text-[8px] md:text-xs font-bold uppercase tracking-[0.3em] nav-font">Experience Years</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="inline-block text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-6 md:mb-8 nav-font">Master Facilitator</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f3460] mb-6 md:mb-10 nav-font leading-tight">{BRAND_INFO.director}</h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 md:mb-12 font-medium opacity-80">
                ผู้อำนวยการสถาบัน แคป วิชั่น อินสติทิวต์ ผู้เชี่ยวชาญด้านกระบวนการเรียนรู้เพื่อการเปลี่ยนแปลง (Transformative Learning)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
                {[
                  'Activity Based Learning',
                  'Transformative Facilitator',
                  'Leadership Development',
                  'Corporate Culture Coaching'
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6 text-[#c5a059]" />
                    <span className="font-bold text-[#0f3460] text-base md:text-lg nav-font">{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Link to="/speakers" className="bg-[#0f3460] text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-[#c5a059] transition-all nav-font shadow-xl text-center">
                  ทีมวิทยากรทั้งหมด
                </Link>
                <a href={CONTACT_INFO.lineUrl} className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-[#0f3460] px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold hover:border-[#c5a059] transition-all nav-font">
                  <MessageCircle className="w-6 h-6 text-[#c5a059]" /> {CONTACT_INFO.line}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsSection />

      {/* Insights & Articles Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 nav-font">Knowledge Hub</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] nav-font">Insights & Articles</h2>
            </div>
            <Link 
              to="/resources" 
              className="group flex items-center gap-2 text-[#0f3460] font-bold hover:text-[#c5a059] transition-colors nav-font text-lg"
            >
              ดูบทความทั้งหมด
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HRD_ARTICLES.slice(0, 3).map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-gray-50 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <Link to={`/resources/${article.id}`} className="relative h-64 overflow-hidden block">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f3460] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10 shadow-sm">
                    {article.category}
                  </div>
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-gray-400 text-xs mb-4 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {article.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#0f3460] mb-4 group-hover:text-[#c5a059] transition-colors line-clamp-2 leading-tight">
                    <Link to={`/resources/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-8 flex-grow">
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/resources/${article.id}`}
                    className="inline-flex items-center gap-2 text-[#0f3460] font-black text-sm uppercase tracking-wider group/link hover:text-[#c5a059] transition-colors"
                  >
                    อ่านต่อ
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}

      <section className="py-24 md:py-40 bg-gradient-to-br from-[#0f3460] to-[#0a2545] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
          <Logo className="w-full h-full p-20" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-8 md:mb-12 nav-font leading-tight tracking-tight uppercase text-white">ยกระดับ<br />องค์กรของคุณ</h2>
          <p className="text-white/85 text-base md:text-xl lg:text-2xl mb-12 md:mb-20 font-light max-w-2xl mx-auto">
            ปรึกษาเราเพื่อออกแบบโซลูชันการพัฒนาผู้นำที่ทันสมัยและวัดผลได้จริง
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
            <a href={CONTACT_INFO.lineUrl} className="btn-premium bg-[#c5a059] text-white px-10 md:px-16 py-4 md:py-6 rounded-[2rem] font-bold text-lg md:text-2xl hover:scale-105 transition-all shadow-2xl nav-font">
              พูดคุยกับพวกเรา
            </a>
            <a href={`tel:${CONTACT_INFO.phone}`} className="btn-premium bg-white/10 border-2 border-white/20 text-white px-10 md:px-16 py-4 md:py-6 rounded-[2rem] font-bold text-lg md:text-2xl hover:bg-white/20 transition-all nav-font">
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
