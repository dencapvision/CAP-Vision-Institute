
import React, { useState } from 'react';
import { Heart, Rocket, Target, Users, Send, Upload, Link as LinkIcon, Video, CheckCircle, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../constants';

const JoinUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-16 rounded-[3rem] shadow-2xl max-w-2xl text-center border border-gray-100 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-[#0f3460] mb-6 nav-font">ขอบคุณที่อยากมาร่วม Transform โลกกับเรา!</h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
            เราได้รับข้อมูลความตั้งใจของคุณแล้ว ทีมงานสถาบันแคป วิชั่น จะพิจารณาโปรไฟล์และติดต่อกลับหาคุณโดยเร็วที่สุด
          </p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="bg-[#0f3460] text-white px-12 py-5 rounded-2xl font-bold nav-font hover:bg-[#c5a059] transition-all"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-[#0f3460] pt-24 pb-48 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Rocket className="w-96 h-96 absolute -bottom-10 -right-20 text-white animate-pulse" />
          <Heart className="w-64 h-64 absolute top-10 left-10 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-8 nav-font tracking-tight">ร่วมเป็นส่วนหนึ่งของ CAP Vision</h1>
          <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            เรายินดีต้อนรับคนรุ่นใหม่ที่มี "ใจ" อยากเห็นผู้คนเติบโตและพัฒนาศักยภาพตนเองอย่างไม่มีขีดจำกัด
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Content Side */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-black text-[#0f3460] mb-8 nav-font">ทำไมต้องมาร่วมงานกับเรา?</h2>
              <div className="space-y-8">
                {[
                  { 
                    title: 'Culture of Growth', 
                    desc: 'เราเชื่อในการพัฒนาตนเองก่อนที่จะไปพัฒนาผู้อื่น ที่นี่คุณจะได้เรียนรู้ทักษะ Facilitation ระดับพรีเมียม',
                    icon: <Target className="w-6 h-6" />
                  },
                  { 
                    title: 'Meaningful Impact', 
                    desc: 'ทุกโปรเจกต์ที่เราทำ คือการช่วยให้คนมีความสุขขึ้น ทำงานเก่งขึ้น และองค์กรแข็งแรงขึ้น',
                    icon: <Users className="w-6 h-6" />
                  },
                  { 
                    title: 'Joy & Professionalism', 
                    desc: 'ทำงานด้วยความสนุก (Edutainment) ภายใต้มืออาชีพที่พร้อมซัพพอร์ตกันและกัน',
                    icon: <Heart className="w-6 h-6" />
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 text-[#c5a059] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f3460] group-hover:text-white transition-all shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#0f3460] mb-2 nav-font">{item.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gold-gradient p-12 rounded-[3rem] text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-4 nav-font">สถาบันแคป วิชั่น (CAP Vision)</h3>
              <p className="text-white/80 font-medium leading-relaxed mb-6">
                เราไม่ใช่แค่บริษัทฝึกอบรม แต่เราคือ "Partner ของการเปลี่ยนแปลง" มาร่วมสร้างอนาคตที่ทุกคนได้ใช้ศักยภาพสูงสุดของตัวเองไปด้วยกัน
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Rocket className="w-6 h-6" />
                 </div>
                 <span className="font-black text-sm uppercase tracking-widest nav-font">Transforming Humanity</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3.5rem] shadow-2xl p-10 md:p-16 border border-gray-100">
              <h2 className="text-3xl font-black text-[#0f3460] mb-4 nav-font">Recruitment Form</h2>
              <p className="text-gray-500 font-medium mb-12">เราไม่ได้มองหาแค่เรซูเม่ที่สวยงาม แต่เรามองหา "ความตั้งใจ" ที่ตรงกัน</p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">ชื่อ-นามสกุล</label>
                    <input required type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" placeholder="ชื่อเล่นระบุต่อท้ายได้ครับ" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">เบอร์โทรศัพท์ / LINE ID</label>
                    <input required type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" placeholder="ช่องทางติดต่อที่สะดวก" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">บทบาทที่อยากเข้าร่วม (Role)</label>
                  <select required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-bold text-[#0f3460] nav-font">
                    <option value="">กรุณาเลือกตำแหน่ง...</option>
                    <option value="facilitator">Facilitator / วิทยากร</option>
                    <option value="content">Content Creator / Graphic Designer</option>
                    <option value="marketing">Marketing & Sales Partner</option>
                    <option value="coordinator">Project Coordinator / Admin</option>
                    <option value="intern">Internship (นักศึกษาฝึกงาน)</option>
                    <option value="other">อื่นๆ (ระบุในความตั้งใจ)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">เล่าถึงความตั้งใจของคุณ (Motivation)</label>
                  <textarea required rows={5} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" placeholder="ทำไมคุณถึงอยากมาร่วมงานกับ CAP Vision? คุณมี Passion เรื่องอะไร?"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" /> ลิงค์โปรไฟล์ / พอร์ตโฟลิโอ
                    </label>
                    <input type="url" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" placeholder="Google Drive, Website, LinkedIn" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block flex items-center gap-2">
                      <Video className="w-3 h-3" /> วิดีโอแนะนำตัวสั้นๆ (ถ้ามี)
                    </label>
                    <input type="url" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium" placeholder="TikTok, YouTube, หรือ ลิงค์วิดีโอ" />
                  </div>
                </div>

                <div className="p-8 bg-[#0f3460]/5 rounded-[2rem] border border-dashed border-[#0f3460]/20 flex flex-col items-center justify-center text-center">
                   <Upload className="w-10 h-10 text-[#0f3460] mb-4 opacity-30" />
                   <p className="text-sm font-bold text-[#0f3460] nav-font mb-1">อัปโหลด Resume / CV</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">PDF format only (Max 5MB)</p>
                   <input type="file" className="mt-4 text-xs font-bold text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#0f3460] file:text-white hover:file:bg-[#c5a059]" />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#0f3460] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#c5a059] transition-all nav-font shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4 group"
                >
                  ส่งความตั้งใจของฉัน <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
