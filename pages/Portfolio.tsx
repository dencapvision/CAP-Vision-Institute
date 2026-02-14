import React from 'react';
import { Briefcase, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ClientsSection from '../components/ClientsSection';
import { COURSES } from '../constants/courses'; // Re-use course images for portfolio for now

const Portfolio: React.FC = () => {
    // Using some courses as dummy portfolio items for now, mixed with static data
    const portFolioItems = [
        {
            id: 1,
            client: "SCG Logistics",
            project: "Leadership Development Program",
            image: COURSES[0].image,
            category: "Leadership",
            result: "Developed 50+ future leaders"
        },
        {
            id: 2,
            client: "PTT Global Chemical",
            project: "Team Synergy & Culture",
            image: COURSES[1].image,
            category: "Team Building",
            result: "Enhanced cross-functional collaboration"
        },
        {
            id: 3,
            client: "Toyota Motor Thailand",
            project: "Effective Communication",
            image: COURSES[2].image,
            category: "Communication",
            result: "Improved internal communication scores by 30%"
        },
        {
            id: 4,
            client: "Kasikornbank",
            project: "Agile Mindset Transformation",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
            category: "Mindset",
            result: "Adopted agile practices across 10 teams"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20 overflow-x-hidden">
            <SEO
                title="ผลงานของเรา (Portfolio) - CAP Vision Institute"
                description="ตัวอย่างผลงานการฝึกอบรมและพัฒนาบุคลากรให้กับองค์กรชั้นนำ โดย CAP Vision Institute"
            />
            {/* Page Header */}
            <div className="bg-[#0f3460] pt-16 md:pt-20 pb-24 md:pb-32 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059] rounded-full blur-[150px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <span className="text-[#c5a059] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block nav-font">Our Success Stories</span>
                    <h1 className="text-3xl md:text-6xl font-black mb-6 nav-font tracking-tight uppercase">
                        ผลงานแห่งความภาคภูมิใจ
                    </h1>
                    <p className="text-blue-100 text-base md:text-xl max-w-2xl mx-auto font-light opacity-80 leading-relaxed">
                        เบื้องหลังความสำเร็จของการพัฒนาคนและองค์กรชั้นนำระดับประเทศ
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {portFolioItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group hover:-translate-y-2 transition-transform duration-500">
                            <div className="relative h-64 overflow-hidden">
                                <img src={item.image} alt={item.project} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-[#0f3460] nav-font shadow-lg">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Briefcase className="w-5 h-5 text-[#c5a059]" />
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{item.client}</span>
                                </div>
                                <h3 className="text-2xl font-black text-[#0f3460] mb-4 nav-font leading-tight">{item.project}</h3>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                                    <p className="text-gray-600 font-medium text-sm">
                                        <span className="text-[#c5a059] font-bold mr-2">Result:</span> {item.result}
                                    </p>
                                </div>
                                <Link to="/contact" className="inline-flex items-center gap-2 text-[#0f3460] font-bold hover:text-[#c5a059] transition-colors nav-font">
                                    สนใจหลักสูตรนี้ <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-20 md:mt-32">
                <ClientsSection />
            </div>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-8 nav-font">ร่วมสร้างความสำเร็จใหม่ๆ ไปกับเรา</h2>
                    <p className="text-gray-500 text-lg mb-10 font-medium">
                        ให้เราเป็นส่วนหนึ่งในการขับเคลื่อนองค์กรของคุณสู่เป้าหมายด้วยกระบวนการพัฒนาบุคลากรที่วัดผลได้จริง
                    </p>
                    <Link to="/contact" className="bg-[#c5a059] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#0f3460] transition-colors shadow-xl nav-font inline-flex items-center gap-3">
                        ติดต่อเราเพื่อขอคำปรึกษา <ExternalLink className="w-5 h-5" />
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Portfolio;
