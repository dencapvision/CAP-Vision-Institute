import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { advise, validateInput, DEFAULT_MODEL } from '../../lib/course-advisor.mjs';
export const prerender = false;
export const POST: APIRoute = async ({request}) => {
  const headers={'Content-Type':'application/json','Cache-Control':'no-store'};
  const origin=request.headers.get('origin');
  if(origin&&origin!==new URL(request.url).origin) return new Response('{}',{status:403,headers});
  if(Number(request.headers.get('content-length')||0)>60000) return new Response('{}',{status:413,headers});
  try {
    const raw=await request.text();
    if(raw.length>60000)return new Response('{}',{status:413,headers});
    const input=validateInput(JSON.parse(raw));
    const secrets=env as unknown as {GEMINI_API_KEY?:string;COURSE_ADVISOR_MODEL?:string;COURSE_ADVISOR_LIMITER?:{limit:(args:{key:string})=>Promise<{success:boolean}>}};
    if(secrets.COURSE_ADVISOR_LIMITER){
      const limit=await secrets.COURSE_ADVISOR_LIMITER.limit({key:'advisor:'+ (request.headers.get('cf-connecting-ip')||'anonymous')});
      if(!limit.success)return new Response(JSON.stringify({error:'กรุณารอสักครู่แล้วลองอีกครั้ง'}),{status:429,headers:{...headers,'Retry-After':'60'}});
    }
    const result=await advise(input,{apiKey:secrets.GEMINI_API_KEY,model:secrets.COURSE_ADVISOR_MODEL});
    return new Response(JSON.stringify(result),{headers});
  }catch {return new Response(JSON.stringify({error:'กรุณาระบุข้อความไม่เกิน 1,500 ตัวอักษร'}),{status:400,headers});}
};

export const GET: APIRoute = () => {
  const secrets=env as unknown as {GEMINI_API_KEY?:string;COURSE_ADVISOR_MODEL?:string};
  return new Response(JSON.stringify({advisor:'CourseAdvisor-DenMasterFa',mode:secrets.GEMINI_API_KEY?'gemini':'basic',default_model:secrets.COURSE_ADVISOR_MODEL||DEFAULT_MODEL}),{headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
};
