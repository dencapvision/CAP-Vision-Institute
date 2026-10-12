import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { contactHref } from '../../lib/contact-context.mjs';

export const PROBLEM_PATHS = [
  {id: 'leadership', title: 'หัวหน้าเก่งงาน แต่ยังนำคนไม่เป็น', outcome: 'พัฒนาการสื่อสาร การโค้ช และการดึงศักยภาพทีม', label: 'พัฒนาผู้นำ'},
  {id: 'people-team', title: 'คนเก่ง แต่สื่อสารและร่วมงานกันยาก', outcome: 'สร้างความเข้าใจ การให้ Feedback และความร่วมมือข้ามทีม', label: 'พัฒนาคนและทีม'},
  {id: 'culture', title: 'องค์กรอยากเปลี่ยน แต่พฤติกรรมยังเหมือนเดิม', outcome: 'เชื่อมค่านิยมและ Growth Mindset กับการทำงานจริง', label: 'พัฒนาวัฒนธรรมองค์กร'},
  {id: 'customized', title: 'มีโจทย์เฉพาะ ต้องการออกแบบให้ตรงบริบท', outcome: 'เริ่มจาก TNA แล้ววาง Learning Journey พร้อมแนวทางติดตามผล', label: 'ออกแบบเฉพาะองค์กร'},
];
const WEBSITE_PATHS = [
  ['/services', 'โซลูชันองค์กร', 'เลือกแนวทางพัฒนาคนและทีม'],
  ['/courses', 'หลักสูตร', 'ค้นหาหัวข้อและรายละเอียดการเรียนรู้'],
  ['/assessment', 'ประเมินองค์กร', 'สำรวจจุดแข็งและโจทย์ที่ควรพัฒนา'],
  ['/portfolio', 'ผลงานและกรณีศึกษา', 'ดูประสบการณ์การทำงานกับองค์กร'],
  ['/speakers', 'ทีมวิทยากร', 'รู้จักผู้ร่วมออกแบบกระบวนการเรียนรู้'],
  ['/resources', 'คลังความรู้', 'อ่านแนวคิดสำหรับผู้นำและ HR'],
];
export function ProblemNavigator() {
  return <section id="home-problems" aria-labelledby="home-problems-title" className="bg-[#F8FAFC] py-16 md:py-24 scroll-mt-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <p className="text-sm font-bold tracking-wider text-[#2563EB]">เริ่มจากโจทย์ขององค์กรคุณ</p>
      <h2 id="home-problems-title" className="nav-font mt-3 text-3xl font-black leading-snug text-[#111827] sm:text-4xl">อยากเปลี่ยนเรื่องไหนให้เห็นผล?</h2>
      <p className="mt-4 max-w-2xl leading-7 text-gray-600">เลือกโจทย์ที่ใกล้กับสถานการณ์ของคุณ เพื่อสำรวจแนวทางพัฒนา หรือพูดคุยกับทีมเพื่อออกแบบร่วมกัน</p>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {PROBLEM_PATHS.map((problem, index) => <article key={problem.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <span className="text-sm font-bold text-[#2563EB]">0{index + 1}</span>
          <h3 className="nav-font mt-3 text-xl font-bold leading-relaxed text-[#111827]">{problem.title}</h3>
          <p className="mt-3 flex-1 leading-7 text-gray-600">{problem.outcome}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={`/services#${problem.id}`} className="inline-flex min-h-11 items-center gap-2 font-bold text-[#2563EB] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{problem.label}<ArrowRight size={17} aria-hidden="true" /></a>
            <a href={contactHref(problem.id)} className="inline-flex min-h-11 items-center font-semibold text-[#111827] hover:underline">ปรึกษาโจทย์นี้</a>
          </div>
        </article>)}
      </div>
      <a href="/assessment" className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-[#111827]"><Compass size={20} aria-hidden="true" />ยังไม่แน่ใจ? เริ่มจากแบบประเมินองค์กร<ArrowRight size={17} aria-hidden="true" /></a>
    </div>
  </section>;
}
export function WebsiteNavigator() {
  return <section id="home-explore" aria-labelledby="home-explore-title" className="border-t border-gray-200 bg-white py-16 md:py-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 id="home-explore-title" className="nav-font text-3xl font-black leading-snug text-[#111827]">เลือกเส้นทางที่ตอบโจทย์คุณ</h2>
      <nav aria-label="สำรวจส่วนต่างๆ ของ CAP Vision" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WEBSITE_PATHS.map(([href, title, description]) => <a key={href} href={href} className="rounded-2xl border border-gray-200 p-6 transition hover:border-[#2563EB] hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB]">
          <span className="flex items-center justify-between gap-3 font-bold text-[#111827]">{title}<ArrowRight size={18} aria-hidden="true" /></span>
          <span className="mt-2 block text-sm leading-7 text-gray-600">{description}</span>
        </a>)}
      </nav>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href={contactHref('', 'proposal')} className="inline-flex min-h-12 items-center rounded-xl bg-[#2563EB] px-6 py-3 font-bold text-white hover:bg-[#1D4ED8]">ขอใบเสนอราคาสำหรับองค์กร</a>
        <a href="/about#cap-framework" className="inline-flex min-h-12 items-center gap-2 px-2 font-bold text-[#111827]">รู้จัก CAP Framework<ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
