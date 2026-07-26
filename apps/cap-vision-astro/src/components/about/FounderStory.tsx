import React from 'react';


const FounderStory: React.FC = () => {
  const milestones = [
    {
      phase: 'จุดเริ่มต้น',
      title: 'จากสายงานขายสู่การสื่อสาร',
      body: 'ครูเด่นเริ่มต้นอาชีพในสายการขายและการสื่อสาร ซึ่งทำให้ค้นพบว่าสิ่งที่ผู้คนขาดไม่ใช่ข้อมูล แต่คือ "การเชื่อมโยง" ระหว่างสิ่งที่รู้กับสิ่งที่รู้สึก การได้พบผู้คนที่หลากหลายในสายงานขายคือบทเรียนแรกที่ทรงพลังที่สุด',
    },
    {
      phase: 'การค้นพบ',
      title: 'Transformative Learning',
      body: 'การเดินทางในฐานะวิทยากรนำไปสู่คำถามสำคัญ — ทำไมคนถึงเรียนแล้วไม่เปลี่ยน? คำตอบอยู่ที่กระบวนการ ไม่ใช่เนื้อหา ครูเด่นพัฒนาแนวทางที่ผสาน Facilitation กับ Inner Growth และการสร้างบริบทการเรียนรู้ที่ออกแบบเพื่อผู้เรียนแต่ละคน',
    },
    {
      phase: 'บทพิสูจน์',
      title: 'จากห้องเรียนสู่ภาคสนาม',
      body: 'ลงพื้นที่ภาคใต้กับ ศอบต. ทำงานกับชุมชนที่ได้รับผลกระทบจากความขัดแย้ง พิสูจน์ว่าการเรียนรู้ที่ถูกออกแบบดีสามารถเปลี่ยนชีวิต ฟื้นความเชื่อมั่น และสร้างความหวังได้จริง แม้ในสถานการณ์ที่ยากที่สุด',
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-6 nav-font">
          Founder Story
        </p>

        {/* Two-column layout: headline + opening */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-20 md:mb-32 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0f3460] nav-font leading-[1] tracking-tight mb-0">
              อนุสรณ์ หนองนา
              <br />
              <span className="text-[#c5a059]">ครูเด่น มาสเตอร์ฟา</span>
            </h2>
          </div>
          <div className="pt-2">
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium mb-6">
              นักสร้างบริบทการเรียนรู้ผู้ออกแบบกระบวนการสอนเพื่อพัฒนาผู้คนตามศักยภาพและตัวตนของผู้เรียนแต่ละคน ผ่านกระบวนการที่ออกแบบให้ "รู้สึก" ก่อน "รู้" เพราะการเปลี่ยนแปลงที่ยั่งยืนไม่ได้เริ่มจากหัว แต่เริ่มจากข้างใน
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              ผู้ให้การปรึกษาทางจิตวิทยา ครูฝึกสติสัมปชัญญะ และนักพยากรณ์บำบัด — ครูเด่นผสานศาสตร์ที่หลากหลายเพื่อสร้างเครื่องมือที่สอดคล้องกับธรรมชาติของมนุษย์แต่ละคน
            </p>
            <div className="mt-8 border-l-2 border-[#c5a059] pl-6">
              <p className="text-[#0f3460] text-lg md:text-xl font-black nav-font italic leading-snug">
                "พลังแห่งศักยภาพอยู่ในตัวท่าน
                <br />
                ค้นพบความมหัศจรรย์นั้นด้วยตัวท่านเอง"
              </p>
              <p className="text-[#c5a059] text-xs font-bold uppercase tracking-widest mt-3">
                — ครูเด่น มาสเตอร์ฟา
              </p>
            </div>
          </div>
        </div>

        {/* Founder image + journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start mb-20 md:mb-32">
          {/* Image */}
          <div className="lg:col-span-4">
            <div className="relative">
              <img
                src="https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/about%20us/CAP%20Vision%20CEO.jpg"
                alt="ครูเด่น มาสเตอร์ฟา"
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Credential tag */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#0f3460] text-white px-6 py-5">
                <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-1">
                  Master Facilitator
                </p>
                <p className="text-white text-sm font-bold">
                  ประสบการณ์กว่า 18 ปี
                </p>
              </div>
            </div>
          </div>

          {/* Journey milestones */}
          <div className="lg:col-span-8">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-8 nav-font">
              The Journey
            </p>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 pb-8 mb-8 last:border-0 last:pb-0 last:mb-0"
                >
                  <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-2 nav-font">
                    {m.phase}
                  </p>
                  <h3 className="text-xl md:text-2xl font-black text-[#0f3460] nav-font mb-3">
                    {m.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed max-w-xl">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy block */}
        <div className="bg-[#0f3460] p-10 md:p-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-8 nav-font">
              Core Philosophy
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-start">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white nav-font leading-tight mb-4">
                  รู้ เห็น รู้สึก
                  <br />
                  สัมผัส สอดคล้อง
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  ห้าขั้นตอนแห่งการเปลี่ยนแปลงที่แท้จริง — ไม่ใช่แค่การรับรู้ข้อมูล แต่คือการให้ร่างกาย ความรู้สึก และการกระทำสอดคล้องกันในทิศทางเดียว
                </p>
              </div>
              <div>
                <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium">
                  แนวคิด Play to Learn + Reflection ช่วยให้ผู้เรียนเข้าสู่สภาวะ Flow — ที่ซึ่งการเรียนรู้เกิดขึ้นโดยธรรมชาติ ไม่ถูกบังคับ ไม่กดดัน แต่ลึกถึงแก่น
                </p>
              </div>
            </div>

            {/* Impact numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
              {[
                { value: '100+', label: 'องค์กรพันธมิตร' },
                { value: '1,000+', label: 'เวทีการพูด' },
                { value: '18+', label: 'ปีประสบการณ์' },
                { value: '10,000+', label: 'ผู้เรียนสำเร็จ' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-[#c5a059] nav-font mb-1">
                    {s.value}
                  </div>
                  <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Read full bio CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://capvisionpartner.com/speakers/den-masterfa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#0f3460] text-[#0f3460] px-10 py-4 font-black text-sm uppercase tracking-widest nav-font hover:bg-[#0f3460] hover:text-white transition-colors"
          >
            อ่านประวัติฉบับเต็ม
          </a>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
