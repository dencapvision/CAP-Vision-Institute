import React,{lazy,Suspense,useEffect,useState} from 'react';
import {supabase} from '../../lib/supabase';
import {getAdminAccess,type AccessResult} from '../../lib/admin-access.mjs';
const pages={
 dashboard:lazy(()=>import('./AdminDashboard')),system:lazy(()=>import('./AdminSystem')),
 leads:lazy(()=>import('./DashboardLeads')),assessments:lazy(()=>import('./DashboardAssessments')),
 courses:lazy(()=>import('./DashboardCourses')),speakers:lazy(()=>import('./DashboardSpeakers')),
 contents:lazy(()=>import('./DashboardArticles')),categories:lazy(()=>import('./DashboardCategories')),
 events:lazy(()=>import('./DashboardEvents')),proposals:lazy(()=>import('./DashboardProposals')),
 media:lazy(()=>import('./MediaManager')),seo:lazy(()=>import('./DashboardSEO')),
 speechfulness:lazy(()=>import('./SpeechfulnessAdmin')),
};
export default function AdminPage({module}:{module:keyof typeof pages}){
 const [access,setAccess]=useState<AccessResult|null>(null);const [attempt,setAttempt]=useState(0);
 useEffect(()=>{let active=true;setAccess(null);getAdminAccess(supabase,module).then(result=>{if(!active)return;if(result.kind==='signed_out'){window.location.replace('/admin/login');return;}setAccess(result);}).catch(()=>{if(active)setAccess({allowed:false,kind:'connection',message:'ตรวจสิทธิ์ไม่สำเร็จ กรุณาลองใหม่'});});
 const {data}=supabase.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT'){setAccess(null);window.location.replace('/admin/login');}});
 return()=>{active=false;data.subscription.unsubscribe();};},[module,attempt]);
 if(!access)return <p role="status" className="p-6">กำลังตรวจสอบการเข้าสู่ระบบและสิทธิ์…</p>;
 if(!access.allowed)return <section className="bg-white border rounded-2xl p-6 space-y-4"><h1 className="text-xl">ยังไม่สามารถเปิดส่วนนี้ได้</h1><p role="alert">{access.message}</p><div className="flex flex-wrap gap-4"><button className="border rounded-xl p-3" onClick={()=>setAttempt(a=>a+1)}>ลองใหม่</button><a href="/admin/system" className="underline">ตรวจสถานะระบบและบัญชี</a><a href="/admin/login" className="underline">เข้าสู่ระบบใหม่</a></div></section>;
 const Page=pages[module];return <Suspense fallback={<p role="status">กำลังโหลด…</p>}><Page/></Suspense>;
}
