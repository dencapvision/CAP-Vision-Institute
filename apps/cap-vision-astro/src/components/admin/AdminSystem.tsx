import React,{useEffect,useState} from 'react';
import {supabase} from '../../lib/supabase';
import {checkAdminSchema} from '../../lib/admin-access.mjs';
export default function AdminSystem(){
 const [checks,setChecks]=useState<Awaited<ReturnType<typeof checkAdminSchema>>>([]);const [busy,setBusy]=useState(true);const [role,setRole]=useState('กำลังตรวจสอบ');
 async function load(){setBusy(true);const [rows,cms]=await Promise.all([checkAdminSchema(supabase),supabase.rpc('is_admin')]);setChecks(rows);setRole(cms.error?'ตรวจสิทธิ์ CMS ไม่สำเร็จ':cms.data===true?'มีสิทธิ์ CMS':'ยังไม่มีสิทธิ์ CMS');setBusy(false);}
 useEffect(()=>{load();},[]);
 return <div className="space-y-6"><h1>สถานะระบบ Admin</h1><p>{role} · การตรวจนี้ไม่อ่านข้อมูลลูกค้าและไม่เพิ่มสิทธิ์ให้บัญชี</p><button onClick={load} disabled={busy} className="border p-3 rounded-xl">ตรวจอีกครั้ง</button>{busy?<p role="status">กำลังตรวจฐานข้อมูล…</p>:<div className="grid md:grid-cols-2 gap-3">{checks.map(c=><article key={c.table} className="border bg-white rounded-xl p-4"><h2 className="text-base">{c.label}</h2><p className={c.ok?'text-green-700':'text-red-700'}>{c.ok?'โครงสร้างพร้อมใช้งาน':c.message}</p></article>)}</div>}<p>หาก CRM ยังไม่พร้อม ให้ติดตั้งชุดปรับปรุงฐานข้อมูลผ่านผู้ดูแล Supabase แล้วออกจากระบบและเข้าสู่ระบบใหม่ การแสดงว่าโครงสร้างพร้อมยังไม่ยืนยันสิทธิ์อ่านหรือแก้ไขข้อมูล</p></div>;
}
