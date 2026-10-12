export function adminError(error){
 const code=error?.code||'';
 if(code==='23505')return {kind:'validation',message:'ข้อมูลนี้ซ้ำกับรายการเดิม กรุณาตรวจชื่อ URL หรือข้อมูลที่ต้องไม่ซ้ำ'};
 if(['23514','23502','23503'].includes(code))return {kind:'validation',message:'ข้อมูลบางช่องไม่ตรงเงื่อนไขฐานข้อมูล กรุณาตรวจข้อมูลที่จำเป็นและรายการที่อ้างอิง'};
 if(['PGRST205','PGRST204','PGRST202','42P01','42703','42883'].includes(code))return {kind:'schema',message:'ฐานข้อมูลส่วนนี้ยังไม่พร้อม ต้องติดตั้งหรืออัปเดตฐานข้อมูลก่อนใช้งาน'};
 if(['42501','PGRST301','PGRST302'].includes(code)||[401,403].includes(error?.status))return {kind:'permission',message:'ไม่สามารถเข้าถึงข้อมูลได้ กรุณาตรวจ session และสิทธิ์ของบัญชี'};
 return {kind:'connection',message:'เชื่อมต่อฐานข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'};
}
export async function getAdminAccess(client,module){
 const {data:{user},error}=await client.auth.getUser();
 if(!user&&(!error||error.name==='AuthSessionMissingError'||error.status===401))return {allowed:false,kind:'signed_out',message:'กรุณาเข้าสู่ระบบ'};
 if(error)return {allowed:false,kind:'auth',message:'ตรวจสอบการเข้าสู่ระบบไม่สำเร็จ กรุณาเข้าสู่ระบบใหม่'};
 if(!user)return {allowed:false,kind:'signed_out',message:'กรุณาเข้าสู่ระบบ'};
 if(module==='system')return {allowed:true,user};
 if(['leads','assessments'].includes(module)){
  const role=await client.from('crm_admins').select('user_id').eq('user_id',user.id).maybeSingle();
  if(role.error)return {allowed:false,...adminError(role.error),message:adminError(role.error).kind==='schema'?'ยังไม่ได้ติดตั้งฐานข้อมูล CRM รุ่นใหม่ กรุณาติดตั้งชุดปรับปรุงฐานข้อมูล':adminError(role.error).message,user};
  if(!role.data)return {allowed:false,kind:'permission',message:'บัญชีนี้ยังไม่ได้รับสิทธิ์ CRM ให้ผู้ดูแลตรวจการเชื่อมสิทธิ์ CMS กับ CRM',user};
  const schema=await client.from('leads').select('pipeline_stage,follow_up_at,crm_notes').limit(0);
  if(schema.error)return {allowed:false,...adminError(schema.error),user};
  return {allowed:true,user};
 }
 const role=await client.rpc('is_admin');
 if(role.error)return {allowed:false,...adminError(role.error),user};
 return role.data===true?{allowed:true,user}:{allowed:false,kind:'permission',message:'บัญชีนี้ยังไม่มีสิทธิ์จัดการเนื้อหา กรุณาให้ผู้ดูแลตรวจบัญชี',user};
}
export const ADMIN_CHECKS=[
 {label:'สิทธิ์ CRM',table:'crm_admins',select:'user_id'},
 {label:'ข้อมูลผู้สนใจและติดตามผล',table:'leads',select:'pipeline_stage,follow_up_at,crm_notes'},
 {label:'ข้อมูลผู้ดูแล',table:'profiles',select:'is_admin'},
 {label:'บทความและ SEO',table:'blog_articles',select:'id,published,category'},
 {label:'หลักสูตร',table:'courses',select:'id,slug,is_published'},
 {label:'วิทยากร',table:'instructors',select:'id'},
 {label:'อีเวนท์',table:'events',select:'id,is_published'},
 {label:'สื่อ',table:'media',select:'id'},
 {label:'CEO Speechfulness',table:'ceo_bookings',select:'id,status'},
];
export async function checkAdminSchema(client){
 return Promise.all(ADMIN_CHECKS.map(async check=>{try{const result=await client.from(check.table).select(check.select).limit(0);return {...check,ok:!result.error,...(result.error?adminError(result.error):{})};}catch{return {...check,ok:false,...adminError({})};}}));
}
