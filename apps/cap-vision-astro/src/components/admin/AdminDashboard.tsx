import React,{useEffect,useState} from 'react';
import {supabase} from '../../lib/supabase';
import {adminError} from '../../lib/admin-access.mjs';
const cards=[['บทความ','blog_articles','/admin/contents'],['วิทยากร','instructors','/admin/speakers'],['หลักสูตร','courses','/admin/courses'],['อีเวนท์','events','/admin/events'],['ผู้สนใจ','leads','/admin/leads'],['สื่อ','media','/admin/media']];
export default function AdminDashboard(){
 const [rows,setRows]=useState<{label:string;href:string;count:number|null;error?:string}[]>([]);const [busy,setBusy]=useState(true);
 async function load(){setBusy(true);setRows(await Promise.all(cards.map(async([label,table,href])=>{try{const r=await supabase.from(table).select('id',{count:'exact',head:true});return {label,href,count:r.error?null:r.count,error:r.error?adminError(r.error).message:undefined};}catch{return {label,href,count:null,error:adminError({}).message};}})));setBusy(false);}
 useEffect(()=>{load();},[]);
 return <div className="space-y-6"><h1>Dashboard</h1><p>ภาพรวมข้อมูลตามสิทธิ์ของบัญชีที่เข้าสู่ระบบ</p><button onClick={load} className="border rounded-xl p-3">อัปเดตข้อมูล</button>{busy?<p role="status">กำลังโหลดข้อมูล…</p>:<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{rows.map(r=><a key={r.href} href={r.href} className="p-5 bg-white border rounded-2xl"><h2 className="text-lg">{r.label}</h2><strong className="text-2xl">{r.count??'—'}</strong>{r.error&&<p className="text-red-700" role="alert">{r.error}</p>}</a>)}</div>}<a href="/admin/system" className="underline">ตรวจสถานะฐานข้อมูลและสิทธิ์</a><div className="flex flex-wrap gap-3"><a className="border bg-white rounded-xl p-3" href="/admin/contents">จัดการบทความ</a><a className="border bg-white rounded-xl p-3" href="/admin/courses?edit=new">สร้างหลักสูตร</a><a className="border bg-white rounded-xl p-3" href="/admin/events?edit=new">สร้างอีเวนท์</a><a className="border bg-white rounded-xl p-3" href="/admin/proposals">จัดทำใบเสนอราคา</a></div></div>;
}
