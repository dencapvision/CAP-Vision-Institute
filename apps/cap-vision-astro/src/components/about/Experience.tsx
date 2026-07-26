import React from 'react';

const credentials = [
  {
    category: 'ตำแหน่งและบทบาท',
    items: [
      'ผู้อำนวยการสถาบันจัดการเรียนรู้ CAP Vision Institute',
      'วิทยากรบรรยาย ภาครัฐ เอกชน และบุคคลทั่วไป',
      'ที่ปรึกษาการออกแบบกระบวนการเรียนรู้และพัฒนาสมรรถนะบุคลากร',
      'ที่ปรึกษานักธุรกิจและเจ้าของกิจการด้านการจัดการศึกษา',
    ],
  },
  {
    category: 'ความเชี่ยวชาญเฉพาะด้าน',
    items: [
      'นักสร้างบริบทการเรียนรู้และออกแบบกระบวนการสอน',
      'ผู้ให้การปรึกษาทางจิตวิทยาและพัฒนาศักยภาพส่วนบุคคล',
      'ครูฝึกสติสัมปชัญญะและสอนการทำสมาธิ',
      'ผู้เชี่ยวชาญด้านการสื่อสาร การโค้ช และการพูด',
    ],
  },
];

const clients = [
  { name: 'Toyota', type: 'ภาคเอกชน' },
  { name: 'PEA (การไฟฟ้าส่วนภูมิภาค)', type: 'รัฐวิสาหกิจ' },
  { name: 'AOT (การท่าอากาศยาน)', type: 'รัฐวิสาหกิจ' },
  { name: 'ปปส. (สำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด)', type: 'ราชการ' },
  { name: 'Tops (Central Food Retail)', type: 'ภาคเอกชน' },
  { name: 'ศอบต. (ศูนย์อำนวยการบริหารจังหวัดชายแดนภาคใต้)', type: 'ราชการ' },
  { name: 'Dell Technologies Thailand', type: 'ภาคเอกชน' },
  { name: 'Land and Houses', type: 'ภาคเอกชน' },
];

const Experience: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Label */}
        <p className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] mb-6 nav-font">
          Experience & Credentials
        </p>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20 items-end">
          <h2 className="text-4xl md:text-6xl font-black text-[#0f3460] nav-font leading-[1.05] tracking-tight">
            18 ปีแห่งการ
            <br />
            พิสูจน์บนเวที
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
            ไม่ใช่แค่ประสบการณ์ในห้องเรียน แต่คือประสบการณ์จากเวทีจริง องค์กรจริง และปัญหาจริงของผู้คนทุกภาคส่วน
          </p>
        </div>

        {/* Credentials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-20 md:mb-28 border border-gray-200">
          {credentials.map((c, i) => (
            <div
              key={i}
              className={`p-10 md:p-14 ${i === 0 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
            >
              <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-8 nav-font">
                {c.category}
              </p>
              <ul className="space-y-5">
                {c.items.map((item, j) => (
                  <li key={j} className="flex gap-4 items-start">
                    <div className="w-1 h-1 bg-[#c5a059] rounded-full flex-shrink-0 mt-2.5" />
                    <span className="text-gray-600 text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Client list */}
        <div>
          <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-10 nav-font">
            องค์กรที่เคยร่วมงาน (ตัวอย่าง)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200">
            {clients.map((client, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const isLastRow = Math.floor((clients.length - 1) / 4) === row;
              const isLastCol = col === 3 || i === clients.length - 1;
              return (
                <div
                  key={i}
                  className={`p-6 md:p-8 ${!isLastRow ? 'border-b border-gray-200' : ''} ${!isLastCol ? 'border-r border-gray-200' : ''}`}
                >
                  <p className="text-[#c5a059] text-[9px] font-black uppercase tracking-[0.3em] mb-2 nav-font">
                    {client.type}
                  </p>
                  <p className="text-[#0f3460] text-sm font-bold leading-snug">
                    {client.name}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-gray-400 text-xs mt-4">
            และกว่า 100 องค์กรทั่วประเทศ ทั้งภาคเอกชน รัฐวิสาหกิจ ราชการ และสถาบันการศึกษา
          </p>
        </div>

      </div>
    </section>
  );
};

export default Experience;
