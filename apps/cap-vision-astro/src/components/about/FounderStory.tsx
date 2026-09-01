import React from 'react';

import { Award, ArrowRight } from 'lucide-react';
import { IconGoldCrestStar } from '../icons/CapBrandIcons';

export const FounderStory: React.FC = () => {
  const milestones = [
    {
      phase: 'จุดเริ่มต้น',
      title: 'จากสายงานขายสู่ศาสตร์การสื่อสารที่เข้าถึงใจ',
      body: 'ครูเด่นเริ่มต้นอาชีพในสายการขายและการสื่อสาร ซึ่งทำให้ค้นพบว่าสิ่งที่ผู้คนขาดไม่ใช่ข้อมูล แต่คือ "การเชื่อมโยง" ระหว่างสิ่งที่รู้กับสิ่งที่รู้สึก การได้พบผู้คนที่หลากหลายคือบทเรียนแรกที่ทรงพลังที่สุด',
    },
    {
      phase: 'การค้นพบ',
      title: 'ศาสตร์ Transformative Learning & Facilitation',
      body: 'การเดินทางในฐานะวิทยากรนำไปสู่คำถามสำคัญ — ทำไมคนถึงเรียนแล้วไม่เปลี่ยน? คำตอบอยู่ที่กระบวนการ ไม่ใช่เนื้อหา ครูเด่นพัฒนาแนวทางที่ผสาน Facilitation กับ Inner Growth และการสร้างบริบทการเรียนรู้ที่ออกแบบเพื่อผู้เรียนแต่ละคน',
    },
    {
      phase: 'บทพิสูจน์',
      title: 'จากห้องเรียนสู่การขับเคลื่อนองค์กรจริง',
      body: 'ผ่านการนำกระบวนการกว่า 1,000 เวที ทั่วประเทศ ครอบคลุมทั้งภาครัฐ องค์กรธุรกิจมหาชน และชุมชน พิสูจน์ว่ากระบวนการเรียนรู้ที่ออกแบบมาอย่างถูกต้องสามารถเปลี่ยนพฤติกรรมคนและทลาย Silo ได้จริง',
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <p className="text-[#2563EB] text-xs font-black uppercase tracking-widest mb-6 nav-font">
          Founder Story & Philosophy
        </p>

        {/* Two-column layout: headline + opening */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0F2557] nav-font leading-[1.05] tracking-tight mb-0">
              อนุสรณ์ หนองนา
              <br />
              <span className="text-[#F59E0B]">ครูเด่น มาสเตอร์ฟา</span>
            </h2>
          </div>
          <div className="pt-2">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal mb-6">
              นักสร้างบริบทการเรียนรู้ผู้ออกแบบกระบวนการสอนเพื่อพัฒนาผู้คนตามศักยภาพและตัวตนของผู้เรียนแต่ละคน ผ่านกระบวนการที่ออกแบบให้ "รู้สึก" ก่อน "รู้" เพราะการเปลี่ยนแปลงที่ยั่งยืนไม่ได้เริ่มจากหัว แต่เริ่มจากข้างใน
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-light">
              ผู้อำนวยการสถาบัน CAP Vision Institute ผู้เชี่ยวชาญด้าน Transformative Learning และ 6D CPS Model ที่ได้รับความไว้วางใจจากองค์กรชั้นนำกว่า 200 แห่ง
            </p>
            <div className="mt-8 border-l-4 border-[#F59E0B] pl-6 bg-[#F8FAFC] py-4 rounded-r-2xl">
              <p className="text-[#0F2557] text-base md:text-lg font-black nav-font italic leading-snug">
                "พลังแห่งศักยภาพอยู่ในตัวท่าน
                <br />
                ค้นพบความมหัศจรรย์นั้นด้วยตัวท่านเอง"
              </p>
              <p className="text-[#2563EB] text-xs font-bold uppercase tracking-wider mt-2">
                — ครูเด่น มาสเตอร์ฟา
              </p>
            </div>
          </div>
        </div>

        {/* Founder image + journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start mb-16">
          {/* Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 bg-gray-900">
              <img
                src="https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/about%20us/CAP%20Vision%20CEO.jpg"
                alt="ครูเด่น มาสเตอร์ฟา"
                className="w-full aspect-[4/5] object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/denmasterfa.jpg';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111827] via-[#111827]/80 to-transparent p-6 text-white">
                <div className="inline-flex items-center gap-2 text-[#F59E0B] text-xs font-black uppercase tracking-wider mb-1">
                  <IconGoldCrestStar className="w-3.5 h-3.5" />
                  Director & Master Facilitator
                </div>
                <p className="text-white text-sm font-bold">
                  ประสบการณ์นำกระบวนการกว่า 18+ ปี
                </p>
              </div>
            </div>
          </div>

          {/* Journey milestones */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#2563EB] text-xs font-black uppercase tracking-widest mb-6 nav-font">
              The Journey & Milestones
            </p>
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-[#2563EB]/40 transition-colors"
                >
                  <span className="text-[#2563EB] text-xs font-black uppercase tracking-wider block mb-1">
                    {m.phase}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#0F2557] nav-font mb-2">
                    {m.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href="/speakers/den-masterfa"
                className="text-xs font-black text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-2 nav-font transition-colors"
              >
                ดูประวัติ ผลงาน และหลักสูตรทั้งหมดของครูเด่น <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderStory;
