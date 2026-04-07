import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, Heart, Sparkles, CheckCircle2, Zap, MessageCircle, Quote, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { BRAND_INFO, CONTACT_INFO, TIMELINE, CLIENTS } from '../constants/brand';
import { SERVICES_LIST } from '../constants/services';
import ClientsSection from '../components/ClientsSection';
import SEO from '../components/SEO';
import { fetchInstructorBySlug } from '../services/instructors';
import type { Instructor } from '../types';

const About: React.FC = () => {
  const [founder, setFounder] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFounder = async () => {
      try {
        const data = await fetchInstructorBySlug('den-master-fa');
        setFounder(data);
      } catch (err) {
        console.error('Failed to load founder info:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFounder();
  }, []);

  return (
    <div className="bg-white min-h-screen pb-16 md:pb-24 overflow-x-hidden">
      <SEO
        title="เกี่ยวกับเรา | CAP Vision Institute"
        description="CAP Vision Institute — Transformation Partner ที่ไว้วางใจโดย Tops, Mr.D.I.Y., AOT, PEA, Land and Houses และกว่า 100 องค์กร นำโดย ครูเด่น มาสเตอร์ฟา Master Facilitator ประสบการณ์กว่า 18 ปี"
      />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#0f3460] pt-24 md:pt-40 pb-32 md:pb-56 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#c5a059]/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-400/5 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,52,96,0.2),transparent_70%)]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 md:mb-8 block nav-font">
            About CAP Vision Institute
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 nav-font tracking-tight leading-[0.95]">
            <span className="text-[#c5a059]">เชื่อในศักยภาพมนุษย์</span><br />
            <span className="text-white">ขับเคลื่อนด้วยการเรียนรู้</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed mb-10 px-4">
            ตั้งแต่ปี 2552 เราเป็น <strong className="text-white">Transformation Partner</strong> ที่อยู่เบื้องหลัง
            การเปลี่ยนแปลงขององค์กรชั้นนำ ผ่านกระบวนการ Facilitation ที่มุ่งเน้นผลลัพธ์ที่ยั่งยืน
          </p>

          {/* Trust stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10 border-t border-white/10 pt-10">
            {[
              { value: '2552', label: 'ปีก่อตั้ง' },
              { value: '18+',  label: 'ปีประสบการณ์' },
              { value: '100+', label: 'องค์กรพันธมิตร' },
              { value: '10,000+', label: 'ผู้เรียนสำเร็จ' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-4xl font-black text-[#c5a059] nav-font">{s.value}</div>
                <div className="text-white/85 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services" className="bg-[#c5a059] text-white px-10 py-4 rounded-2xl font-black text-base md:text-lg hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-2xl active:scale-95 inline-flex items-center justify-center gap-3">
              ดูบริการทั้งหมด <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all nav-font inline-flex items-center justify-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#c5a059]" /> ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 md:-mt-32 relative z-20">

        {/* ── 2. BRAND STORY ──────────────────────────────────────────────────── */}
        <section className="mb-24 md:mb-40">
          <div className="bg-white rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Quote className="w-48 h-48 md:w-80 md:h-80 text-[#0f3460]" />
            </div>
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
              <div className="lg:w-1/2">
                <span className="text-[#c5a059] font-black text-[10px] uppercase tracking-widest mb-4 block nav-font">Our Story</span>
                <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-8 nav-font leading-tight">
                  จากความเชื่อ<br />สู่การเปลี่ยนแปลง
                </h2>
                <div className="space-y-5 text-base md:text-xl text-gray-600 font-medium leading-relaxed">
                  <p>
                    CAP Vision ก่อตั้งขึ้นจากความเชื่อที่ว่า{' '}
                    <span className="text-[#0f3460] font-black underline decoration-[#c5a059]/40 underline-offset-4">
                      "ศักยภาพที่แท้จริงของมนุษย์ไม่ได้ถูกจำกัดด้วยสภาพแวดล้อม แต่ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง"
                    </span>
                  </p>
                  <p>
                    เริ่มต้นปี 2552 เราไม่ได้เป็นแค่ "ผู้ฝึกอบรม" แต่คือ <strong className="text-[#0f3460]">Facilitator</strong> ที่ช่วยให้บุคคลค้นพบศักยภาพที่ซ่อนเร้น และเปลี่ยนแปลงตนเองจากภายใน
                  </p>
                  <p>
                    ผ่านกว่า 18 ปี เราได้ร่วมงานกับองค์กรชั้นนำกว่า 100 แห่ง ทั้งภาคเอกชน รัฐวิสาหกิจ และสถาบันการศึกษา
                  </p>
                </div>
                <div className="mt-10 p-8 md:p-12 bg-gradient-to-br from-[#0f3460] to-[#0a2545] rounded-3xl text-white shadow-xl relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#c5a059]/20 rounded-full"></div>
                  <p className="text-lg md:text-2xl font-black nav-font leading-relaxed italic relative z-10">
                    "พลังแห่งศักยภาพอยู่ในตัวท่าน<br />ค้นพบความมหัศจรรย์นั้นด้วยตัวท่านเอง"
                  </p>
                  <p className="text-[#c5a059] text-sm font-bold mt-4 relative z-10">— ครูเด่น มาสเตอร์ฟา</p>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative group">
                  <div className="absolute -inset-8 bg-[#c5a059]/10 rounded-full blur-[80px]"></div>
                  <img
                    src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/CAP%20Vision%20CEO.jpg"
                    className="relative z-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl w-full h-[400px] md:h-[600px] object-cover"
                    alt="CAP Vision CEO"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CORE BELIEFS ─────────────────────────────────────────────────── */}
        <section className="mb-24 md:mb-40">
          <div className="text-center mb-12">
            <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] block mb-4 nav-font">What We Believe</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font mb-3">
              3 ความเชื่อที่ขับเคลื่อนทุกสิ่งที่เราทำ
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              ไม่ใช่แค่วิธีการทำงาน แต่คือปรัชญาที่ฝังอยู่ในทุก session ทุกหลักสูตร ทุกการ facilitate
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND_INFO.coreBeliefs.map((belief, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:border-[#c5a059] hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0f3460] group-hover:text-white transition-all">
                  {belief.icon}
                </div>
                <h3 className="text-xl font-black text-[#0f3460] mb-3 nav-font">{belief.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{belief.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. VISION & MISSION ─────────────────────────────────────────────── */}
        <section className="mb-24 md:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 group hover:border-[#c5a059] transition-all">
              <div className="w-16 h-16 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-[#0f3460] mb-6 nav-font uppercase tracking-tight">Vision</h3>
              <p className="text-lg md:text-2xl text-gray-700 font-bold leading-relaxed border-l-4 border-[#c5a059] pl-6 italic nav-font">
                "{BRAND_INFO.vision}"
              </p>
            </div>
            <div className="lg:col-span-7 bg-[#0f3460] p-10 md:p-16 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Zap className="w-48 h-48" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black mb-10 nav-font uppercase tracking-tight text-[#c5a059]">Mission</h3>
              <div className="space-y-5 relative z-10">
                {BRAND_INFO.mission.map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-start group">
                    <span className="w-9 h-9 bg-white/10 text-[#c5a059] rounded-full flex items-center justify-center font-black flex-shrink-0 text-sm group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                      {idx + 1}
                    </span>
                    <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. TIMELINE ─────────────────────────────────────────────────────── */}
        <section className="mb-24 md:mb-40">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.4em] mb-4 block nav-font">Our Journey</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font">การเดินทางกว่า 18 ปีของเรา</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
            <div className="space-y-12 md:space-y-16">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-3xl md:text-5xl font-black text-[#c5a059] nav-font mb-2">{item.year}</span>
                    <h4 className="text-xl font-bold text-[#0f3460] mb-3 nav-font">{item.title}</h4>
                    <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="w-5 h-5 bg-white border-4 border-[#c5a059] rounded-full relative z-10 hidden md:block flex-shrink-0"></div>
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. WHY CHOOSE US ────────────────────────────────────────────────── */}
        <section className="mb-24 md:mb-40">
          <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
              <div className="lg:w-1/2">
                <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.4em] mb-6 block nav-font">Why CAP Vision?</span>
                <h2 className="text-2xl md:text-5xl font-black text-[#0f3460] mb-8 nav-font leading-tight">
                  ทำไมองค์กรชั้นนำ<br />เลือก CAP Vision
                </h2>
                <div className="space-y-5">
                  {[
                    { title: 'Customized Learning', desc: 'ออกแบบการเรียนรู้เฉพาะองค์กร เริ่มจาก TNA วิเคราะห์ปัญหาจริง' },
                    { title: 'Active Facilitation', desc: 'ใช้เทคนิค Facilitation & Coaching ให้ผู้เรียนค้นพบคำตอบด้วยตัวเอง' },
                    { title: 'Result-Oriented', desc: 'เน้น Reskilling & Upskilling ที่วัดผลได้จริง มี KPI ชัดเจน' },
                    { title: 'Learning Culture', desc: 'สนับสนุนองค์กรสร้างวัฒนธรรมการเรียนรู้ที่ยั่งยืนระยะยาว' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-11 h-11 bg-green-50 text-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f3460] group-hover:text-white transition-all">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#0f3460] mb-1 nav-font">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <Link to="/contact" className="bg-[#0f3460] text-white px-10 py-4 rounded-2xl font-black text-base md:text-lg hover:bg-[#c5a059] transition-all nav-font shadow-xl inline-flex items-center gap-3 active:scale-95">
                    ขอใบเสนอราคาฟรี <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="grid grid-cols-2 gap-4 md:gap-5">
                  <img src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/meeting%20team.jpg" className="rounded-[1.5rem] shadow-lg h-48 md:h-72 w-full object-cover" alt="Meeting Team" />
                  <img src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/Presentation.jpg" className="rounded-[1.5rem] shadow-lg h-48 md:h-72 w-full object-cover mt-8 md:mt-10" alt="Presentation" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. CLIENTS ──────────────────────────────────────────────────────── */}
        <ClientsSection />

        {/* ── 8. FOUNDER ──────────────────────────────────────────────────────── */}
        <section className="mb-24 md:mb-40">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.4em] mb-4 block nav-font">The Visionary Leader</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0f3460] nav-font">ผู้นำกระบวนการเปลี่ยนผ่าน</h2>
          </div>
          
          <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-xl border border-gray-100 min-h-[400px] flex items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-[#c5a059] animate-spin" />
                <p className="text-gray-400 font-medium nav-font">กำลังโหลดข้อมูลผู้ก่อตั้ง...</p>
              </div>
            ) : founder ? (
              <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20 w-full">
                <div className="lg:w-1/3">
                  <div className="relative group max-w-sm mx-auto">
                    <div className="absolute -inset-4 bg-[#c5a059]/10 rounded-[3rem] blur-2xl"></div>
                    <img
                      src={founder.image || ''}
                      alt={founder.name}
                      className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/5] object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-[#c5a059] text-white p-5 md:p-7 rounded-2xl z-20 shadow-xl border-4 border-white hidden sm:block">
                      <Award className="w-8 h-8 mx-auto" />
                      <p className="text-[10px] font-black nav-font uppercase tracking-widest mt-2">Master Fa</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <h2 className="text-2xl md:text-5xl font-black text-[#0f3460] mb-4 nav-font leading-tight">{founder.name}</h2>
                  <p className="text-[#c5a059] font-bold text-sm mb-6">{founder.title || 'Master Facilitator · ประสบการณ์กว่า 18 ปี'}</p>
                  <p className="text-base md:text-xl text-gray-600 leading-relaxed font-medium mb-8 opacity-80">
                    {founder.longBio || founder.bio}
                  </p>
                  {founder.expertise && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {founder.expertise.map((exp, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="bg-[#c5a059]/10 p-2 rounded-lg group-hover:bg-[#c5a059] transition-colors flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-[#c5a059] group-hover:text-white" />
                          </div>
                          <span className="text-sm md:text-base font-bold text-gray-600 nav-font">{exp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link to={`/speakers/${founder.slug}`} className="bg-[#0f3460] text-white px-10 py-4 rounded-2xl font-black text-base md:text-lg hover:bg-[#c5a059] transition-all nav-font shadow-xl active:scale-95 inline-flex items-center gap-3">
                    อ่านประวัติฉบับเต็ม <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ) : (
               <div className="text-center py-12">
                <p className="text-gray-400">ไม่พบข้อมูลผู้ก่อตั้ง</p>
              </div>
            )}
          </div>
        </section>

        {/* ── 9. FINAL CTA ────────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#0f3460] to-[#1a4a7a] rounded-[3rem] py-16 md:py-20 px-8 md:px-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/15 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c5a059]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#c5a059]/20 border border-[#c5a059]/50 rounded-full px-5 py-2 mb-8">
              <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-pulse" />
              <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.4em] nav-font">พร้อมร่วมงานกับเรา</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black nav-font mb-2 leading-tight text-white">
              เริ่มต้นการเปลี่ยนแปลง<br />องค์กรของคุณวันนี้
            </h2>
            <div className="w-16 h-1 bg-[#c5a059] rounded-full mx-auto mb-6 mt-4" />
            <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              ปรึกษาฟรีกับ Master Facilitator — เราวิเคราะห์ปัญหา ออกแบบแนวทาง และส่งใบเสนอราคาภายใน 24 ชั่วโมง
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-[#c5a059] text-white px-12 py-4 rounded-2xl font-black text-lg md:text-xl hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all nav-font shadow-2xl active:scale-95 inline-flex items-center justify-center gap-3">
                ขอใบเสนอราคา <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={CONTACT_INFO.lineUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all nav-font inline-flex items-center justify-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#c5a059]" /> ปรึกษาฟรีผ่าน Line
              </a>
            </div>
            <p className="text-white/85 text-xs mt-6">ไม่มีข้อผูกมัด · ตอบกลับภายใน 24 ชั่วโมง</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
