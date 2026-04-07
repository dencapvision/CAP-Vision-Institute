import React from 'react';

const CapVisionStory: React.FC = () => {
  const pillars = [
    {
      letter: 'C',
      word: 'Capacity',
      thai: 'ศักยภาพ',
      body: 'มนุษย์ทุกคนมีศักยภาพที่รอการปลดปล่อย หน้าที่ของ CAP Vision คือการสร้างบริบทที่ปลอดภัยให้ศักยภาพนั้นเผยออกมา',
    },
    {
      letter: 'A',
      word: 'Awareness',
      thai: 'การตระหนักรู้',
      body: 'การเปลี่ยนแปลงที่ยั่งยืนเริ่มจาก Self-Awareness — การรู้จักตนเอง เข้าใจรูปแบบความคิด และมองเห็นทางเลือกใหม่ที่ไม่เคยเห็นมาก่อน',
    },
    {
      letter: 'P',
      word: 'Performance',
      thai: 'ผลลัพธ์ที่วัดได้',
      body: 'การเรียนรู้ต้องแปลงเป็นผลลัพธ์จริงในการทำงาน ไม่ใช่แค่ความรู้สึกดีในห้องอบรม แต่คือพฤติกรรมและผลงานที่เปลี่ยนจริง',
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label */}
        <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-6 nav-font">
          CAP Vision Story
        </p>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0f3460] nav-font leading-[1.05] tracking-tight">
              ทฤษฎีที่อยู่เบื้องหลัง
              <br />
              ทุกกระบวนการ
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
              CAP ไม่ใช่แค่ชื่อ แต่คือปรัชญาที่เชื่อว่าการพัฒนาคนต้องเริ่มจากการสร้างศักยภาพ ผ่านการตระหนักรู้ และวัดผลด้วยผลลัพธ์ที่จับต้องได้
            </p>
          </div>
        </div>

        {/* CAP framework - large letter design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20 md:mb-32 border border-gray-200">
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`p-10 md:p-14 ${i < pillars.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
            >
              <div className="text-[80px] md:text-[120px] font-black text-[#0f3460]/8 nav-font leading-none mb-4 select-none">
                {p.letter}
              </div>
              <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-3 nav-font">
                {p.word}
              </p>
              <h3 className="text-xl md:text-2xl font-black text-[#0f3460] nav-font mb-4">
                {p.thai}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Facilitation Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-6 nav-font">
              Facilitation Approach
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font leading-tight mb-6">
              เราไม่ได้ "สอน"
              <br />
              เราสร้างพื้นที่ให้คนค้นพบ
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Facilitation ของ CAP Vision คือการออกแบบบริบทการเรียนรู้ที่ผู้เรียนเป็นศูนย์กลาง วิทยากรทำหน้าที่เป็นผู้ตั้งคำถาม ไม่ใช่ผู้ให้คำตอบ เพราะคำตอบที่ดีที่สุดมักอยู่ในตัวผู้เรียนเองอยู่แล้ว
            </p>
            <div className="space-y-4">
              {[
                'ตั้งคำถามเพื่อกระตุ้นการคิด ไม่ใช่การท่องจำ',
                'สร้างความปลอดภัยทางจิตวิทยาในห้องเรียน',
                'ออกแบบ Learning Journey ไม่ใช่แค่ Content',
                'ใช้ประสบการณ์ตรงเป็นสื่อการสอนหลัก',
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-5 h-5 border border-[#c5a059] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#c5a059]" />
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-6 nav-font">
              Learning Experience Design
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-[#0f3460] nav-font leading-tight mb-6">
              ออกแบบประสบการณ์
              <br />
              ไม่ใช่แค่หลักสูตร
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              ทุก session ถูกออกแบบให้ผู้เรียนเคลื่อนผ่านสามชั้นของการเรียนรู้ — จากการรับรู้ข้อมูล สู่การสัมผัสประสบการณ์ และนำไปสู่การตกผลึกภายใน
            </p>
            <div className="bg-white border border-gray-200 p-8">
              <div className="space-y-6">
                {[
                  { step: '01', label: 'Experience', desc: 'สร้างประสบการณ์ตรงผ่านกิจกรรม' },
                  { step: '02', label: 'Reflection', desc: 'ตั้งคำถามเพื่อถอดบทเรียน' },
                  { step: '03', label: 'Insight', desc: 'เชื่อมโยงกับชีวิตและการทำงานจริง' },
                  { step: '04', label: 'Application', desc: 'วางแผนการนำไปใช้จริงทันที' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <span className="text-[#c5a059] text-xs font-black nav-font flex-shrink-0 pt-1">{s.step}</span>
                    <div>
                      <p className="text-[#0f3460] text-sm font-black nav-font uppercase tracking-wider mb-1">{s.label}</p>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CapVisionStory;
