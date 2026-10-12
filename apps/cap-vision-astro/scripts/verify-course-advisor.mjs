import {pathToFileURL} from 'node:url';
export async function verifyCourseAdvisor(origin,fetcher=fetch){
 const endpoint=new URL('/api/course-advisor',origin);
 const configResponse=await fetcher(endpoint,{signal:AbortSignal.timeout(15000)});
 if(!configResponse.ok)throw Error(`Advisor configuration HTTP ${configResponse.status}`);
 const config=await configResponse.json();
 if(config.mode!=='deepseek')throw Error('DeepSeek secret not active on the Worker');
 const response=await fetcher(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'ต้องการพัฒนาการสื่อสารของหัวหน้างาน',history:[]}),signal:AbortSignal.timeout(25000)});
 if(!response.ok)throw Error(`Advisor reply HTTP ${response.status}`);
 const result=await response.json();
 if(result.mode!=='deepseek'||typeof result.reply!=='string'||!result.reply.trim())throw Error('DeepSeek did not return a model response; basic guidance was used');
 return {advisor:config.advisor,mode:result.mode,model:result.model};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 let success=false;
 for(let i=0;i<3;i++){
  try{console.log('PASS advisor:',JSON.stringify(await verifyCourseAdvisor(process.argv[2]||'https://capvisionpartner.com')));success=true;break;}
  catch(error){console.error(`Advisor attempt ${i+1}: ${error.message}`);if(i<2)await new Promise(r=>setTimeout(r,10000));}
 }
 if(!success){
  const key=process.env.DEEPSEEK_API_KEY;
  if(key){
   const {advise,validateInput}=await import('../src/lib/course-advisor.mjs');
   const result=await advise(validateInput({message:'แนะนำหลักสูตรการสื่อสาร',history:[]}),{apiKey:key,fetcher:async(url,init)=>{
    const response=await fetch(url,init);
    if(!response.ok){const error=await response.clone().json().catch(()=>({}));console.error('DeepSeek diagnostic:',JSON.stringify({status:response.status,message:String(error.error?.message||'').replaceAll(key,'[redacted]').slice(0,400)}));}
    return response;
   }});
   console.error('Direct provider mode:',result.mode);
  }
  process.exitCode=1;
 }
}
