import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useContactPopup } from '../lib/useContactPopup';
import { CONTACT_INFO } from '../constants/brand';
import '../styles/contact-popup.css';

type Message = {role:'user'|'assistant';content:string;program?:string|null;mode?:string};
const WELCOME:Message={role:'assistant',content:`• สวัสดีครับ ผมครูเด่น (AI) ผู้ช่วยแนะนำหลักสูตรของ CAP Vision
• อยากพัฒนาใคร และอยากเห็นอะไรเปลี่ยนในการทำงานครับ?`};
const STARTERS=['พัฒนาทีมบริการลูกค้า','พัฒนาทักษะการสื่อสาร','พัฒนาผู้นำ','ออกแบบหลักสูตรเฉพาะองค์กร'];
const STORAGE='cap_course_advisor_v2';
export default function AIAgent(){
  const {isOpen,setIsOpen,triggerRef,close}=useContactPopup('ai');
  const [messages,setMessages]=useState<Message[]>([WELCOME]);
  const [input,setInput]=useState('');
  const [busy,setBusy]=useState(false);
  const inputRef=useRef<HTMLInputElement>(null);
  const endRef=useRef<HTMLDivElement>(null);
  const sending=useRef(false);
  const abortRef=useRef<AbortController|null>(null);
  const loaded=useRef(false);
  useEffect(()=>{
    try{const saved=JSON.parse(sessionStorage.getItem(STORAGE)||'null');if(Array.isArray(saved)&&saved.length&&saved.every(m=>['user','assistant'].includes(m.role)&&typeof m.content==='string'))setMessages(saved.slice(-24));}catch{/* works with storage disabled */}
    loaded.current=true;
    return()=>abortRef.current?.abort();
  },[]);
  useEffect(()=>{if(loaded.current){try{sessionStorage.setItem(STORAGE,JSON.stringify(messages.slice(-24)));}catch{/* optional history */}}},[messages]);
  useEffect(()=>{if(isOpen)inputRef.current?.focus();},[isOpen]);
  useEffect(()=>{if(isOpen)endRef.current?.scrollIntoView({block:'nearest'});},[messages,busy,isOpen]);
  async function send(text=input){
    text=text.trim();if(!text||sending.current)return;
    sending.current=true;setBusy(true);setInput('');
    const history=messages.filter(m=>m!==WELCOME).slice(-12).map(({role,content})=>({role,content}));
    setMessages(prev=>[...prev,{role:'user',content:text}]);
    const controller=new AbortController();abortRef.current=controller;const timeout=setTimeout(()=>controller.abort(),25000);
    try{
      const response=await fetch('/api/course-advisor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history}),signal:controller.signal});
      if(!response.ok)throw Error('unavailable');
      const data=await response.json();if(typeof data.reply!=='string')throw Error('invalid reply');
      setMessages(prev=>[...prev,{role:'assistant',content:data.reply,program:data.suggested_program,mode:data.mode}]);
    }catch{setMessages(prev=>[...prev,{role:'assistant',content:`• ขณะนี้ผู้ช่วยตอบไม่ได้ครับ
• ดูหลักสูตร หรือส่งโจทย์ให้ทีมทาง LINE และฟอร์มติดต่อได้เลยครับ`,mode:'error'}]);}
    finally{clearTimeout(timeout);sending.current=false;setBusy(false);}
  }
  return <div className="cap-contact-dock cap-contact-dock--ai" data-cap-contact="course-advisor-v3">
    {isOpen&&<section id="cap-ai-panel" role="dialog" aria-labelledby="cap-ai-title" className="cap-contact-panel cap-contact-ai-panel">
      <header className="cap-contact-heading"><div><h2 id="cap-ai-title">ครูเด่น (AI)</h2><p>Course Advisor · CAP Vision Institute</p></div><button className="cap-contact-close" aria-label="ปิดหน้าต่าง AI" onClick={close}><X size={20}/></button></header>
      <div className="cap-advisor-messages" role="log" aria-live="polite" aria-label="บทสนทนาแนะนำหลักสูตร">
        {messages.map((m,i)=><article key={i} className={`cap-advisor-message cap-advisor-message--${m.role}`}>
          {m.content.split('\n').filter(Boolean).map((line,j)=><p key={j}>{line.replace(/\*\*/g,'')}</p>)}
          {m.program&&<strong className="cap-advisor-program">{m.program}</strong>}
          {m.mode==='basic'&&<small>คำแนะนำเบื้องต้นจากข้อมูลหลักสูตร</small>}
        </article>)}
        {busy&&<p role="status">กำลังพิจารณาโจทย์ของคุณครับ…</p>}<div ref={endRef}/>
      </div>
      {messages.length===1&&<div className="cap-advisor-starters">{STARTERS.map(s=><button key={s} onClick={()=>send(s)} disabled={busy}>{s}</button>)}</div>}
      <nav className="cap-advisor-paths" aria-label="ขั้นตอนรับบริการ"><a href="/courses">ดูหลักสูตร <ArrowRight size={14}/></a><a href="/contact?source=ai-advisor">ออกแบบเฉพาะองค์กร <ArrowRight size={14}/></a><a href={CONTACT_INFO.lineUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={14}/> LINE ครูเด่น</a></nav>
      <form className="cap-advisor-input" onSubmit={e=>{e.preventDefault();send();}}><input ref={inputRef} aria-label="โจทย์ที่ต้องการพัฒนา" placeholder="เล่าโจทย์ของคุณ…" value={input} maxLength={1500} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.nativeEvent.isComposing&&e.key==='Enter')e.preventDefault();}}/><button aria-label="ส่งข้อความ" disabled={busy||!input.trim()}><Send size={20}/></button></form>
    </section>}
    <button ref={triggerRef} onClick={()=>isOpen?close():setIsOpen(true)} className="cap-contact-launcher" aria-label="ปรึกษาหลักสูตรกับครูเด่น AI" aria-expanded={isOpen} aria-controls="cap-ai-panel">{isOpen?<X size={22}/>:<Sparkles size={22}/>}<span>AI ครูเด่น</span></button>
  </div>;
}
