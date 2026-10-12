import type {APIRoute} from 'astro';
import {env} from 'cloudflare:workers';
import {createClient} from '@supabase/supabase-js';
import {supabaseUrl,supabaseAnonKey} from '../../lib/supabase';
import {DEFAULT_MODEL} from '../../lib/course-advisor.mjs';
export const prerender=false;
export const POST:APIRoute=async({request})=>{
 const headers={'Content-Type':'application/json','Cache-Control':'no-store'};
 const respond=(value:unknown,status=200)=>new Response(JSON.stringify(value),{status,headers});
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return respond({},403);
 const token=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!token)return respond({error:'กรุณาเข้าสู่ระบบ'},401);
 try{
  const client=createClient(supabaseUrl,supabaseAnonKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},global:{headers:{Authorization:`Bearer ${token}`}}});
  const user=await client.auth.getUser(token);if(user.error||!user.data.user)return respond({error:'กรุณาเข้าสู่ระบบใหม่'},401);
  const role=await client.rpc('is_admin');if(role.error||role.data!==true)return respond({error:'ไม่มีสิทธิ์สร้างบทความ'},403);
  const raw=await request.text();if(raw.length>10000)return respond({error:'ข้อมูลยาวเกินไป'},413);
  const body=JSON.parse(raw);if(typeof body.title!=='string'||!body.title.trim()||body.title.length>300||typeof body.context!=='string'||body.context.length>6000)return respond({error:'กรุณาระบุหัวข้อและบริบทให้ถูกต้อง'},400);
  const secrets=env as unknown as {DEEPSEEK_API_KEY?:string;COURSE_ADVISOR_LIMITER?:{limit:(a:{key:string})=>Promise<{success:boolean}>}};
  if(!secrets.DEEPSEEK_API_KEY)return respond({error:'ผู้ดูแลยังไม่ได้ตั้งค่าระบบ AI ฝั่งเซิร์ฟเวอร์'},503);
  if(secrets.COURSE_ADVISOR_LIMITER&&!(await secrets.COURSE_ADVISOR_LIMITER.limit({key:'article:'+user.data.user.id})).success)return respond({error:'กรุณารอสักครู่แล้วลองใหม่'},429);
  const response=await fetch('https://api.deepseek.com/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${secrets.DEEPSEEK_API_KEY}`},signal:AbortSignal.timeout(40000),body:JSON.stringify({model:DEFAULT_MODEL,thinking:{type:'disabled'},response_format:{type:'json_object'},max_tokens:4500,messages:[{role:'system',content:'เขียนร่างบทความภาษาไทยสำหรับ CAP Vision Institute ในแนว Human Communication, Facilitation, Transformative Learning, Flow Learning ให้กระชับ ใช้งานได้จริง ไม่แต่งชื่อองค์กรลูกค้า สถิติ งานวิจัย หรือผลลัพธ์จริง หากไม่มีหลักฐานให้ใช้ตัวอย่างสมมติที่ระบุชัดว่าเป็นสมมติ ตอบ JSON เท่านั้น: {title,slug,summary,context,insight,framework:[ข้อความ],application,case_study,takeaways:[ข้อความ],faq:[{question,answer}],cta,seo:{meta_title,meta_description,keywords:[ข้อความ]},hashtags:[ข้อความ],images:[]} ห้ามใส่ HTML ให้ slug เป็นตัวอักษรอังกฤษเล็ก ตัวเลข ขีดกลาง CTA ไป /contact หรือ /courses'},{role:'user',content:JSON.stringify({title:body.title,context:body.context})}]})});
  if(!response.ok)return respond({error:'ผู้ให้บริการ AI ไม่พร้อมใช้งาน กรุณาลองใหม่'},502);
  const data=await response.json();const article=JSON.parse(data.choices?.[0]?.message?.content||'{}');
  const strings=['title','slug','summary','context','insight','application','case_study','cta'];
  if(strings.some(k=>typeof article[k]!=='string')||!Array.isArray(article.framework)||!Array.isArray(article.takeaways)||!Array.isArray(article.faq)||!article.seo||typeof article.seo.meta_title!=='string'||typeof article.seo.meta_description!=='string'||!Array.isArray(article.seo.keywords)||!Array.isArray(article.hashtags)||[...article.framework,...article.takeaways,...article.hashtags,...article.seo.keywords].some(v=>typeof v!=='string')||article.faq.some((v:any)=>!v||typeof v.question!=='string'||typeof v.answer!=='string'))return respond({error:'ร่างบทความไม่ครบ กรุณาลองใหม่'},502);
  article.images=[];return respond({article});
 }catch{return respond({error:'สร้างบทความไม่สำเร็จ กรุณาลองใหม่'},502);}
};
