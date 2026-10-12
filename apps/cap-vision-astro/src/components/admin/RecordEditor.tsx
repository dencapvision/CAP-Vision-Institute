import React,{useState,useEffect} from 'react';
import {supabase} from '../../lib/supabase';
import {adminError} from '../../lib/admin-access.mjs';
import {canWriteLeads} from '../../lib/lead-environment';
export default function RecordEditor({table,onSaved}:{table:'courses'|'events';onSaved:()=>void}){
 const [id,setId]=useState<string|null>(()=>typeof window==='undefined'?null:new URLSearchParams(window.location.search).get('edit'));
 const [row,setRow]=useState<Record<string,any>>({is_published:false});const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 useEffect(()=>{if(!id||id==='new')return;setBusy(true);supabase.from(table).select('*').eq('id',id).single().then(({data,error})=>{if(error||!data)setError(adminError(error).message);else setRow(data);setBusy(false);});},[id,table]);
 function close(){setId(null);const url=new URL(window.location.href);url.searchParams.delete('edit');window.history.replaceState({},'',url);}
 if(!id)return null;
 const fields=table==='courses'?[['title','ชื่อหลักสูตร'],['slug','ชื่อใน URL (ภาษาอังกฤษ)'],['category','หมวดหมู่'],['description','คำอธิบาย'],['duration','ระยะเวลา'],['audience','กลุ่มผู้เรียน']]:[['title','ชื่ออีเวนท์'],['event_date','วันที่จัด'],['location','สถานที่'],['link','ลิงก์รายละเอียด']];
 async function save(e:React.FormEvent){e.preventDefault();if(!canWriteLeads(window.location.hostname)){setError('เวอร์ชันทดสอบไม่อนุญาตให้แก้ฐานข้อมูลจริง');return;}
  if(!String(row.title||'').trim()){setError('กรุณาระบุชื่อ');return;}
  if(table==='courses'&&!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug||'')){setError('ชื่อ URL ใช้ตัวอักษรอังกฤษเล็ก ตัวเลข และขีดกลาง');return;}
  if(table==='events'&&row.link){try{if(!['https:','http:'].includes(new URL(row.link).protocol))throw Error();}catch{setError('กรุณาใช้ลิงก์ http หรือ https');return;}}
  setBusy(true);setError('');const text=(key:string)=>String(row[key]||'').trim();
  const values=table==='courses'?{title:text('title'),slug:text('slug'),category:text('category'),description:text('description'),duration:text('duration'),audience:text('audience'),is_published:!!row.is_published}:{title:text('title'),event_date:text('event_date'),location:text('location'),link:text('link'),is_published:!!row.is_published};
  try{const query=id==='new'?supabase.from(table).insert<typeof values>(values):supabase.from(table).update<typeof values>(values).eq('id',id);const result=await query.select('id').single();if(result.error||!result.data)throw result.error||{};close();onSaved();}catch(e){setError(adminError(e).message);}finally{setBusy(false);}
 }
 return <section role="dialog" aria-labelledby="record-editor-title" className="bg-white border rounded-2xl p-6 space-y-4"><h2 id="record-editor-title">{id==='new'?'สร้าง':'แก้ไข'}{table==='courses'?'หลักสูตร':'อีเวนท์'}</h2>{error&&<p role="alert" className="text-red-700">{error}</p>}<form onSubmit={save} className="grid md:grid-cols-2 gap-4">{fields.map(([key,label])=><label key={key} className="grid gap-2">{label}<input required={key==='title'||key==='slug'} type={key==='event_date'?'date':key==='link'?'url':'text'} value={row[key]||''} onChange={e=>setRow(prev=>({...prev,[key]:e.target.value}))} className="border p-3 rounded-xl"/></label>)}<label className="flex gap-2 items-center"><input type="checkbox" checked={!!row.is_published} onChange={e=>setRow(prev=>({...prev,is_published:e.target.checked}))}/>เผยแพร่บนเว็บไซต์</label><div className="flex gap-3"><button disabled={busy} className="bg-blue-600 text-white p-3 rounded-xl">{busy?'กำลังบันทึก…':'บันทึกข้อมูล'}</button><button type="button" onClick={close} className="border p-3 rounded-xl">ยกเลิก</button></div></form></section>;
}
