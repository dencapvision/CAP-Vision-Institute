
import React from 'react';
import { CLIENTS } from '../constants/brand';
import { Award } from 'lucide-react';

const ClientsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#c5a059] font-black text-xs uppercase tracking-[0.5em] mb-4 md:mb-6 block nav-font">พันธมิตรที่ไว้วางใจเรา</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f3460] mb-6 md:mb-8 nav-font">ลูกค้าและพันธมิตรที่ไว้วางใจเรา</h2>
          <div className="w-16 md:w-24 h-1 bg-[#c5a059] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-500 font-medium max-w-3xl mx-auto text-sm md:text-lg">
            กว่า 18 ปีที่เราได้ร่วมเดินทางเพื่อ Transform บุคลากรให้กับหน่วยงานภาครัฐ รัฐวิสาหกิจ และบริษัทมหาชนชั้นนำทั่วประเทศ
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center reveal-staggered active">
          {CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-4 md:p-6 w-full h-32 md:h-40 transition-all duration-500 hover:scale-110"
            >
              <div className="absolute inset-0 bg-gray-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100"></div>
              <img
                src={client.logo}
                alt={client.name}
                className="relative z-10 max-w-[80%] max-h-[70%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=f8fafc&color=0f3460&bold=true&size=128`;
                }}
              />
              <span className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity nav-font text-center">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-32 pt-12 border-t border-gray-50 text-center">
          <div className="inline-flex items-center gap-6 bg-gray-50 px-8 py-4 rounded-[2rem] border border-gray-100 shadow-inner">
            <Award className="w-10 h-10 text-[#c5a059]" />
            <div className="text-left">
              <p className="text-[#0f3460] font-black text-xl nav-font leading-tight">กว่า 500 องค์กร</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">ที่ผ่านการพัฒนาด้วยหลักสูตรของเรา</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
