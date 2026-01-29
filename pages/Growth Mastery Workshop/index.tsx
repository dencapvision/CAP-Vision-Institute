
import React from 'react';
import { ArrowRight, CheckCircle2, Target, Zap, Award, Users, Calendar, MapPin, MessageCircle, Star, Sparkles, TrendingUp, Brain } from 'lucide-react';
import { BRAND_INFO, CONTACT_INFO, SPEAKERS } from '../../constants';
import SEO from '../../components/SEO';
import ClientsSection from '../../components/ClientsSection';

const GrowthMasteryWorkshop: React.FC = () => {
    const speaker = SPEAKERS.find(s => s.id === 'den-master-fa') || SPEAKERS[0];

    return (
        <div className="flex flex-col overflow-hidden">
            <SEO
                title="Growth Mastery Workshop | ปลดล็อกศักยภาพสู่ความสำเร็จสูงสุด"
                description="Workshop พิเศษที่จะเปลี่ยน Mindset และติดอาวุธทักษะเพื่อการเติบโตแบบก้าวกระโดด โดย ครูเด่น มาสเตอร์ฟา"
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center bg-[#0f3460] pt-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53815d1e?auto=format&fit=crop&q=80"
                        alt="Background"
                        className="w-full h-full object-cover opacity-10 mix-blend-overlay"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 mb-8">
                                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                                <span className="text-[#c5a059] font-bold text-xs uppercase tracking-widest nav-font">Platinum Edition Workshop</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 nav-font">
                                Growth <br />
                                <span className="text-[#c5a059]">Mastery</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-50/80 leading-relaxed mb-12 font-light max-w-xl">
                                ปลดล็อกขีดจำกัด พัฒนาศักยภาพสู่การเป็นผู้นำ และการเติบโตแบบ <span className="text-[#c5a059] font-bold italic">Exponential</span> ด้วยกระบวนการ Facilitation ระดับสากล
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                                <a href={CONTACT_INFO.lineUrl} className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-gold-500/20 text-center nav-font">
                                    ลงทะเบียนร่วมเวิร์กชอป
                                </a>
                                <div className="flex items-center gap-4 text-white/60">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0f3460] bg-gray-600 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium">เข้าร่วมแล้วกว่า 500+ ท่าน</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10 pt-12">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-[#c5a059]" />
                                    <div>
                                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-tiler">Date</p>
                                        <p className="text-white font-bold nav-font">เร็วๆ นี้</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-[#c5a059]" />
                                    <div>
                                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-tiler">Location</p>
                                        <p className="text-white font-bold nav-font">Bangkok, Thailand</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="absolute inset-0 bg-gold-gradient rounded-[4rem] rotate-6 transform scale-95 opacity-20 blur-2xl"></div>
                            <div className="relative z-10 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
                                    alt="Growth Mastery"
                                    className="rounded-[3.5rem] w-full shadow-2xl"
                                />
                                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs animate-bounce-slow">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-blue-50 rounded-2xl">
                                            <TrendingUp className="w-6 h-6 text-[#0f3460]" />
                                        </div>
                                        <div>
                                            <p className="text-[#0f3460] font-black text-2xl nav-font">200%</p>
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Growth Potential</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        "กระบวนการเรียนรู้ที่ออกแบบมาเพื่อให้เห็นผลลัพธ์ทันทีหลังจบ Workshop"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Growth Mastery? */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                        <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 block nav-font">The Transformation</span>
                        <h2 className="text-4xl md:text-6xl font-black text-[#0f3460] mb-8 nav-font">ทำไมต้อง Growth Mastery?</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-[#0f3460] to-[#c5a059] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Brain className="w-10 h-10 text-[#c5a059]" />,
                                title: "Growth Mindset 2.0",
                                desc: "ปรับจูนกระบวนการคิดเพื่อก้าวข้ามทุกอุปสรรค และมองเห็นโอกาสในทุกวิกฤต",
                                color: "bg-blue-50"
                            },
                            {
                                icon: <Target className="w-10 h-10 text-[#c5a059]" />,
                                title: "Strategic Mastery",
                                desc: "ติดอาวุธการวางแผน และการลงมือทำที่วัดผลได้จริงแบบ High Impact",
                                color: "bg-gold-50"
                            },
                            {
                                icon: <Users className="w-10 h-10 text-[#c5a059]" />,
                                title: "Communication Power",
                                desc: "ศิลปะการสื่อสารเพื่อการเชื่อมโยงคน และการนำทีมสู่ความสำเร็จที่เป็นหนึ่งเดียว",
                                color: "bg-gray-50"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-12 rounded-[3.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-[#c5a059]/20 transition-all duration-500">
                                <div className={`w-24 h-24 rounded-3xl ${item.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-[#0f3460] mb-6 nav-font">{item.title}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed font-medium opacity-80">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="py-24 md:py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="lg:w-2/5">
                            <div className="sticky top-32">
                                <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-6 block nav-font">Workshop Roadmap</span>
                                <h2 className="text-4xl md:text-6xl font-black text-[#0f3460] mb-10 nav-font leading-tight">เนื้อหาการเรียนรู้<br />ที่เข้มข้น</h2>
                                <p className="text-xl text-gray-600 leading-relaxed mb-12 font-medium">
                                    เราออกแบบกระบวนการเรียนรู้แบบ Blended Learning ที่ผสมผสานทฤษฎีระดับโลก และการฝึกปฏิบัติแบบ Real-time
                                </p>
                                <div className="inline-flex items-center gap-3 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
                                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                                        <Award className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-[#0f3460] font-black nav-font">Certificate Included</p>
                                        <p className="text-gray-400 text-sm">เมื่อจบเวิร์กชอปครบหลักสูตร</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-3/5 space-y-8">
                            {[
                                { step: "01", title: "Unlocking The Inner Self", desc: "สำรวจศักยภาพภายใน และทะลวงผ่าน 'ความเชื่อจำกัด' (Limiting Beliefs) ที่ฉุดรั้งการเติบโตของคุณ" },
                                { step: "02", title: "The DFA Strategy", desc: "เรียนรู้โมเดลการเรียนรู้แบบ Dynamic - Flow - Actionable เพื่อประยุกต์ใช้ในชีวิตและการทำงาน" },
                                { step: "03", title: "High-Performance Leadership", desc: "สร้าง DNA ของผู้นำยุคใหม่ ที่ไม่ได้แค่คุมงาน แต่ครองใจคน (People & Trust Mastery)" },
                                { step: "04", title: "Execution & Results", desc: "การวางแผนระบบงานและการวัดผลที่แม่นยำ เพื่อสร้างการเติบโตอย่างยั่งยืน" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex gap-8 items-start hover:shadow-xl transition-all group">
                                    <div className="text-4xl md:text-5xl font-black text-[#c5a059]/20 group-hover:text-[#c5a059] transition-colors nav-font leading-none">{item.step}</div>
                                    <div>
                                        <h4 className="text-2xl md:text-3xl font-black text-[#0f3460] mb-4 nav-font">{item.title}</h4>
                                        <p className="text-lg text-gray-600 leading-relaxed font-medium opacity-80">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructor Highlight */}
            <section className="py-24 md:py-32 bg-[#0f3460] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <img src="https://images.unsplash.com/photo-1517048676732-d676936d9b2c?auto=format&fit=crop&q=80" alt="Pattern" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-10 -left-10 w-full h-full border-4 border-[#c5a059] rounded-[4rem]"></div>
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="relative z-10 rounded-[3.5rem] w-full max-w-lg mx-auto grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                                />
                                <div className="absolute -bottom-8 -right-8 bg-[#c5a059] p-10 rounded-3xl z-20 shadow-2xl">
                                    <Star className="w-8 h-8 text-white mb-2" />
                                    <p className="text-3xl font-black nav-font">Master Fa</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#0f3460]">Authorized Instructor</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-6 block nav-font">Expert Facilitator</span>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 nav-font">{speaker.name}</h2>
                            <p className="text-xl md:text-2xl text-blue-50 leading-relaxed mb-10 font-light opacity-80">
                                "{speaker.bio}"
                            </p>
                            <div className="space-y-6 mb-12">
                                {speaker.expertise.slice(0, 3).map((exp, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#c5a059]"></div>
                                        <span className="text-lg md:text-xl font-bold nav-font opacity-90">{exp}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <a href={CONTACT_INFO.lineUrl} className="bg-white text-[#0f3460] px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#c5a059] hover:text-white transition-all text-center nav-font">
                                    ปรึกษา Master Fa โดยตรง
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials or Clients */}
            <ClientsSection />

            {/* Pricing / Register CTA */}
            <section className="py-24 md:py-40 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-[#f8fafc] border-2 border-dashed border-gray-200 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-gold-gradient opacity-10 blur-3xl rounded-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-black text-[#0f3460] mb-8 nav-font">พร้อมเปลี่ยนตัวเอง<br />คนใหม่หรือยัง?</h2>
                            <p className="text-xl text-gray-600 mb-16 font-medium leading-relaxed max-w-2xl mx-auto">
                                สิทธิพิเศษเฉพาะ 20 ท่านแรกที่ลงทะเบียนล่วงหน้า <br />
                                รับฟรี! <span className="text-[#0f3460] font-black">Personal Assessment Tool</span> มูลค่า 1,500 บาท
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <a href={CONTACT_INFO.lineUrl} className="bg-[#0f3460] text-white px-12 py-6 rounded-3xl font-black text-2xl hover:bg-[#c5a059] transition-all shadow-2xl shadow-blue-500/20 nav-font flex items-center justify-center gap-4">
                                    จองที่นั่งตอนนี้ <ArrowRight className="w-6 h-6" />
                                </a>
                            </div>

                            <div className="mt-12 flex items-center justify-center gap-8 text-gray-400 font-bold uppercase tracking-widest text-xs">
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Secure Payment</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Limited Seats</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Mobile CTA */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <a href={CONTACT_INFO.lineUrl} className="flex items-center justify-between bg-[#c5a059] text-white p-6 rounded-3xl shadow-2xl shadow-gold-500/40">
                    <div className="flex items-center gap-4">
                        <MessageCircle className="w-8 h-8" />
                        <span className="font-black text-xl nav-font tracking-tight">ลงทะเบียนจองที่นั่ง</span>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                </a>
            </div>
        </div>
    );
};

export default GrowthMasteryWorkshop;
