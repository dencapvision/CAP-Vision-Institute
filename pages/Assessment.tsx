import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, CheckCircle2, Trophy, HelpCircle, ArrowRight } from 'lucide-react';
import TransformationAssessment from '../components/TransformationAssessment';
import SEO from '../components/SEO';
import ClientsSection from '../components/ClientsSection';
import { CONTACT_INFO } from '../constants/brand';

const AssessmentPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <SEO
        title="แบบประเมินความพร้อมการเปลี่ยนแปลงองค์กร | CAP Transformation Assessment"
        description="ประเมินจุดแข็งและช่องว่างในการพัฒนาองค์กร 4 มิติ: Strategic Leadership, People & Team Synergy, Culture & Growth Mindset, Execution & Impact โดย CAP Vision Institute"
      />

      {/* Hero Header */}
      <section className="relative bg-[#111827] text-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
            alt="Corporate Transformation Assessment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#111827]/90 to-[#111827]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              Executive Diagnostic Framework
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white nav-font leading-tight mb-6">
              ค้นหาพลังขับเคลื่อน <br />
              <span className="text-[#F59E0B]">และจุดปลดล็อกองค์กรของคุณ</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-xl leading-relaxed mb-8 font-light">
              ประเมินคน ทีม และองค์กร เพื่อค้นหาว่า อะไรคือจุดแข็งที่ควรต่อยอด และอะไรคือจุดที่ควรเปลี่ยน
            </p>

            {/* Quick Benefits Pills */}
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-semibold text-gray-200">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                12 คำถาม (ใช้เวลาเพียง 3 นาที)
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                วิเคราะห์ผลแบบ Radar Chart ทันที
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                ไม่มีค่าใช้จ่าย & ข้อมูลเป็นความลับ
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Assessment Tool Section */}
      <section className="relative z-20 -mt-10 mb-20 px-4 sm:px-6 lg:px-8">
        <TransformationAssessment />
      </section>

      {/* Methodology Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-3">
              Why Assessment Matters
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111827] nav-font">
              ทำไมการประเมินความพร้อมจึงเป็น <span className="text-[#2563EB]">จุดเริ่มต้นที่ดีที่สุด</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed">
              การจัดฝึกอบรมที่ประสบความสำเร็จ ไม่ได้ขึ้นอยู่กับเนื้อหาหลักสูตรเพียงอย่างเดียว แต่เริ่มต้นจากการวินิจฉัยปัญหาจริง (Accurate Diagnosis) ขององค์กร
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Identify Blind Spots',
                thTitle: 'มองเห็นจุดบอดที่ซ่อนอยู่',
                desc: 'ช่วยให้ผู้บริหารและ HR มองเห็นอุปสรรคที่แท้จริงระหว่างเป้าหมายกลยุทธ์กับพฤติกรรมของทีมงาน'
              },
              {
                step: '02',
                title: 'Tailored Solution Design',
                thTitle: 'ออกแบบการเรียนรู้เฉพาะเจาะจง',
                desc: 'เปลี่ยนจากการอบรมแบบ Generic มาเป็นการคัดสรร Tools และ Process ที่แก้ Pain Point ได้ตรงจุดที่สุด'
              },
              {
                step: '03',
                title: 'Measurable Business ROI',
                thTitle: 'วัดผลลัพธ์ได้อย่างเป็นรูปธรรม',
                desc: 'มีเกณฑ์ตั้งต้น (Baseline) ชัดเจน เพื่อเปรียบเทียบพัฒนาการและผลลัพธ์ทั้งก่อนและหลังการจัดกระบวนการ'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                <span className="text-4xl font-black text-[#2563EB]/20 block mb-4 group-hover:text-[#2563EB] transition-colors nav-font">
                  {item.step}
                </span>
                <h3 className="text-lg font-black text-[#111827] mb-1 nav-font">{item.thTitle}</h3>
                <div className="text-xs font-bold text-[#2563EB] mb-3">{item.title}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Trust */}
      <ClientsSection />

      {/* Call to Action Bar */}
      <section className="bg-[#0F2557] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 nav-font text-white">
            ต้องการปรึกษาการออกแบบหลักสูตร In-house หรือ OD Consulting?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            ทีม Master Facilitator ยินดีให้คำปรึกษาเบื้องต้นเพื่อประเมินความต้องการและจัดทำข้อเสนอโครงการ (Proposal)
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={CONTACT_INFO.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-premium bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-black px-8 py-4 rounded-2xl text-base shadow-xl"
            >
              ปรึกษาทีมงานผ่าน LINE OA
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="btn-premium bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl text-base border border-white/20"
            >
              โทร {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssessmentPage;
