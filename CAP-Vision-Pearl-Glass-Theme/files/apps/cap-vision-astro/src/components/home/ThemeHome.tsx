import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Compass, Users, Heart, Layers, Sparkles } from 'lucide-react';
import { contactHref } from '../../lib/contact-context.mjs';
import { CONTACT_INFO } from '../../constants/brand';
import { HRD_ARTICLES } from '../../constants/articles';
import { fetchCourses } from '../../lib/services/courses';
import type { Course } from '../../types';
import '../../styles/cap-theme.css';

const solutions = [
  {id: 'leadership', icon: Compass, en: 'LEADERSHIP', title: 'ผู้นำที่ปลุกพลังทีม', text: 'จากเก่งงาน สู่การนำคนและสร้างความรับผิดชอบร่วมกัน', color: 'blue'},
  {id: 'people-team', icon: Users, en: 'PEOPLE & TEAM', title: 'ทีมที่เข้าใจและไปด้วยกัน', text: 'สื่อสารเป็น ให้ Feedback ได้ และร่วมมือข้ามสายงาน', color: 'teal'},
  {id: 'culture', icon: Heart, en: 'CULTURE & MINDSET', title: 'วัฒนธรรมที่เกิดขึ้นจริง', text: 'เปลี่ยนค่านิยมบนกระดาษ เป็นพฤติกรรมในทุกวัน', color: 'gold'},
  {id: 'customized', icon: Layers, en: 'CUSTOMIZED LEARNING', title: 'เส้นทางที่ออกแบบเพื่อคุณ', text: 'เริ่มจากโจทย์องค์กร สู่เวิร์กช็อปและการติดตามผล', color: 'lilac'},
];
const categories = [
  {title: 'Leadership', th: 'ภาวะผู้นำ', href: '/courses?cat=Leader+Skills'},
  {title: 'People Skills', th: 'การสื่อสารและทีม', href: '/courses?cat=People+Skills'},
  {title: 'Work Skills', th: 'การคิดและแก้ปัญหา', href: '/courses?cat=Work+Skills'},
  {title: 'Facilitator', th: 'วิทยากรและกระบวนกร', href: '/courses'},
];
const paths = [
  ['/services','โซลูชันองค์กร'], ['/courses','หลักสูตร'], ['/assessment','ประเมินองค์กร'],
  ['/portfolio','ผลงานและกรณีศึกษา'], ['/speakers','ทีมวิทยากร'], ['/resources','คลังความรู้'],
];
export default function ThemeHome() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    let active = true;
    fetchCourses().then(data => { if (active) setCourses(data.slice(0, 3)); }).catch(() => {});
    return () => { active = false; };
  }, []);
  return <div className="cap-theme">
    <section className="cap-hero" aria-labelledby="home-hero-title">
      <div className="cap-hero-copy">
        <p className="cap-eyebrow"><span /> CAP VISION INSTITUTE</p>
        <p className="cap-editorial">A new perspective. A lasting change.</p>
        <h1 id="home-hero-title">ปลุกศักยภาพคน<br /><span>ให้เป็นพลัง</span><br />ขององค์กร</h1>
        <p className="cap-lead">ออกแบบ In-house Training และ Learning Journey<br className="cap-desktop-break" /> ที่เชื่อมวิธีคิด พฤติกรรม และการทำงานจริง</p>
        <div className="cap-actions">
          <a className="cap-button" href={contactHref()}>ปรึกษาโจทย์องค์กร <ArrowUpRight size={20} aria-hidden="true" /></a>
          <a className="cap-text-link" href="#home-problems">สำรวจโซลูชัน <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
        <p className="cap-signature">Human <span>•</span> Heart <span>•</span> Harmony</p>
      </div>
      <div className="cap-hero-visual" aria-hidden="true">
        <div className="cap-orbit cap-orbit-one" /><div className="cap-orbit cap-orbit-two" />
        <div className="cap-sculpture"><div className="cap-stone cap-stone-pearl" /><div className="cap-stone cap-stone-blue" /><div className="cap-stone cap-stone-sage" /><div className="cap-stone-shadow" /></div>
        <div className="cap-glass-label"><span className="cap-dot" /> Transform People<br /><strong>Transform Organization</strong></div>
        <span className="cap-visual-note">CHANGE STARTS WITHIN</span>
      </div>
    </section>
    <div className="cap-intro-strip"><span>YOUR TRANSFORMATION PARTNER</span><p>เข้าใจโจทย์ <i /> ออกแบบร่วมกัน <i /> นำไปใช้จริง</p><a href="/about">รู้จัก CAP Vision <ArrowUpRight size={17} aria-hidden="true" /></a></div>

    <section id="home-problems" className="cap-section" aria-labelledby="home-problems-title">
      <div className="cap-section-heading"><div><p className="cap-eyebrow">DESIGNED AROUND YOUR PEOPLE</p><h2 id="home-problems-title">อยากเปลี่ยนเรื่องไหน<br /><span>ให้เห็นผล?</span></h2></div><p>เลือกโจทย์ของคุณ<br />แล้วค่อยออกแบบเส้นทางไปด้วยกัน</p></div>
      <div className="cap-solution-grid">{solutions.map(({id, icon: Icon, en, title, text, color}, i) => <article key={id} className={`cap-solution cap-tone-${color}`}>
        <div className="cap-card-top"><span className="cap-icon"><Icon size={25} aria-hidden="true" /></span><span className="cap-index">0{i + 1}</span></div>
        <p className="cap-card-eyebrow">{en}</p><h3>{title}</h3><p className="cap-card-description">{text}</p>
        <div className="cap-card-actions"><a href={`/services#${id}`} aria-label={`ดูรายละเอียด ${title}`}>ดูแนวทาง <ArrowUpRight size={19} aria-hidden="true" /></a><a href={contactHref(id)}>ปรึกษาโจทย์นี้</a></div>
      </article>)}</div>
      <a className="cap-assessment-link" href="/assessment"><span className="cap-icon"><Compass size={22} aria-hidden="true" /></span><span>ยังไม่แน่ใจว่าจะเริ่มตรงไหน?<strong>สำรวจความพร้อมองค์กร</strong></span><ArrowUpRight size={24} aria-hidden="true" /></a>
    </section>

    <section className="cap-section cap-framework" aria-labelledby="cap-framework-heading">
      <div className="cap-section-heading"><div><p className="cap-eyebrow">THE CAP WAY</p><h2 id="cap-framework-heading">การเปลี่ยนแปลงที่ดี<br /><span>มีเส้นทางของมัน</span></h2></div><a className="cap-text-link" href="/about#cap-framework">รู้จัก CAP Framework <ArrowUpRight size={19} aria-hidden="true" /></a></div>
      <div className="cap-framework-grid">{[
        ['C','Context & Clarify','เข้าใจโจทย์','ค้นหาบริบทและเป้าหมายที่สำคัญ'],
        ['A','Align & Activate','ลงมือเปลี่ยน','เรียนรู้ ทดลอง และสะท้อนคิด'],
        ['P','Perform & Partner','เติบโตไปด้วยกัน','นำไปใช้ ติดตาม และพัฒนาต่อ'],
      ].map(([letter, en, title, text]) => <article key={letter}><span className="cap-phase-letter">{letter}</span><p className="cap-card-eyebrow">{en}</p><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="cap-section" aria-labelledby="cap-courses-heading">
      <div className="cap-section-heading"><div><p className="cap-eyebrow">LEARN. PRACTICE. TRANSFORM.</p><h2 id="cap-courses-heading">การเรียนรู้ที่ต่อยอด<br /><span>สู่การทำงานจริง</span></h2></div><a className="cap-text-link" href="/courses">ดูหลักสูตรทั้งหมด <ArrowUpRight size={19} aria-hidden="true" /></a></div>
      <div className="cap-category-grid">{categories.map(c => <a key={c.title} href={c.href}><span>{c.title}</span><strong>{c.th}</strong><ArrowUpRight size={22} aria-hidden="true" /></a>)}</div>
      {courses.length > 0 && <div className="cap-course-grid">{courses.map(c => <a key={c.id} className="cap-course" href={`/courses/${encodeURIComponent(c.slug || c.id)}`}>
        <div className="cap-course-image">{c.image && <img src={c.image} alt={c.alt_text || c.title} loading="lazy" width="640" height="400" />}</div><div><span className="cap-card-eyebrow">{c.category}</span><h3>{c.title}</h3><span className="cap-text-link">รายละเอียดหลักสูตร <ArrowUpRight size={17} aria-hidden="true" /></span></div>
      </a>)}</div>}
    </section>

    <section className="cap-section cap-human-section" aria-labelledby="cap-human-heading">
      <div className="cap-founder-photo"><img src="/images/denmasterfa.jpg" alt="ครูเด่น อนุสรณ์ หนองนา ขณะพูดและอำนวยกระบวนการเรียนรู้" width="883" height="853" loading="lazy" /><span>HUMAN COMMUNICATION FACILITATOR</span></div>
      <div className="cap-human-copy"><p className="cap-eyebrow">HUMAN AT THE HEART</p><h2 id="cap-human-heading">เริ่มจากเข้าใจคน<br /><span>จึงเปลี่ยนองค์กรได้</span></h2><p>ครูเด่น มาสเตอร์ฟา และทีมวิทยากร<br />ร่วมออกแบบพื้นที่การเรียนรู้ที่เปิดให้คนคิด<br />ลงมือทำ และค้นพบทางไปต่อด้วยตัวเอง</p><div className="cap-actions"><a className="cap-button" href="/speakers">รู้จักทีมวิทยากร <ArrowUpRight size={19} aria-hidden="true" /></a><a className="cap-text-link" href="/portfolio">ดูผลงาน <ArrowUpRight size={19} aria-hidden="true" /></a></div></div>
    </section>

    <section className="cap-section" aria-labelledby="cap-insights-heading">
      <div className="cap-section-heading"><div><p className="cap-eyebrow">A LITTLE INSIGHT. A NEW POSSIBILITY.</p><h2 id="cap-insights-heading">มุมคิดสำหรับ<br /><span>ผู้นำและคนทำงาน</span></h2></div><a className="cap-text-link" href="/resources">เข้าคลังความรู้ <ArrowUpRight size={19} aria-hidden="true" /></a></div>
      <div className="cap-insight-grid">{HRD_ARTICLES.slice(0, 3).map((a, i) => <a href={`/resources/${a.id}`} key={a.id}><span className="cap-index">0{i+1}</span><h3>{a.title}</h3><span className="cap-text-link">อ่านต่อ <ArrowUpRight size={18} aria-hidden="true" /></span></a>)}</div>
    </section>

    <section id="home-explore" className="cap-section cap-closing" aria-labelledby="cap-closing-title"><div className="cap-closing-glow" aria-hidden="true" /><p className="cap-eyebrow">LET’S CREATE YOUR NEXT CHAPTER</p><h2 id="cap-closing-title">ก้าวต่อไปขององค์กร<br /><span>เริ่มจากบทสนทนาที่ดี</span></h2><div className="cap-actions"><a className="cap-button" href={contactHref()}>ปรึกษาโจทย์องค์กร <ArrowUpRight size={20} aria-hidden="true" /></a><a className="cap-button cap-button-light" href={contactHref('', 'proposal')}>ขอใบเสนอราคา <ArrowUpRight size={20} aria-hidden="true" /></a></div><a className="cap-line-link" href={CONTACT_INFO.lineUrl} target="_blank" rel="noopener noreferrer">คุยกับครูเด่นผ่าน LINE <ArrowUpRight size={16} aria-hidden="true" /></a><nav aria-label="สำรวจส่วนต่างๆ ของ CAP Vision" className="cap-explore-nav">{paths.map(([href,title]) => <a href={href} key={href}>{title}</a>)}</nav></section>
  </div>;
}
