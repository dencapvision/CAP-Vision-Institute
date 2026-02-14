
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Star, ArrowRight, MessageCircle } from 'lucide-react';
import { SPEAKERS } from '../constants/speakers';
import { BRAND_INFO } from '../constants/brand';

const Speakers: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0f3460] pt-20 pb-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Award className="w-full h-full transform translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 nav-font">วิทยากร และ Facilitator</h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto font-light leading-relaxed">
            พบกับทีมผู้เชี่ยวชาญด้านการพัฒนาบุคลากรและ Master Facilitator จาก {BRAND_INFO.thaiName}
          </p>
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SPEAKERS.map((speaker) => (
            <div key={speaker.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col group">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3460]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                    Expert Facilitator
                  </div>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-[#0f3460] mb-2 nav-font group-hover:text-[#c5a059] transition-colors">
                  {speaker.name}
                </h3>
                <p className="text-xs font-bold text-[#c5a059] uppercase tracking-[0.2em] mb-6 nav-font">
                  {speaker.title}
                </p>
                <p className="text-gray-500 leading-relaxed font-medium mb-8 flex-grow">
                  {speaker.bio}
                </p>
                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                  <Link
                    to={`/speakers/${speaker.id}`}
                    className="text-[#0f3460] font-black nav-font flex items-center gap-2 group-hover:gap-4 transition-all"
                  >
                    ดูประวัติและผลงาน <ArrowRight className="w-5 h-5 text-[#c5a059]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mt-32 text-center">
        <div className="bg-[#0f3460] p-16 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 p-8 opacity-5">
            <MessageCircle className="w-32 h-32" />
          </div>
          <h2 className="text-3xl font-black mb-6 nav-font">ต้องการนัดปรึกษาหลักสูตร In-house?</h2>
          <p className="text-blue-100 opacity-70 mb-10 text-lg">เราพร้อมส่งทีมวิทยากรไปช่วย Transform องค์กรของคุณถึงที่</p>
          <Link to="/contact" className="bg-[#c5a059] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-[#0f3460] transition-all nav-font inline-block shadow-lg">
            คุยกับเราตอนนี้
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
