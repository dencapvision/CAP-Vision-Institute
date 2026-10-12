import{pathToFileURL}from'node:url';
export const ADMIN_MODULES=['dashboard','leads','assessments','courses','speakers','contents','categories','events','proposals','media','seo','speechfulness','system'];
export async function verifyAdminRelease(origin,fetcher=fetch){
 for(const module of ADMIN_MODULES){const url=new URL('/admin/'+module,origin);url.searchParams.set('admin_check',Date.now());const response=await fetcher(url,{signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error(`${module}: HTTP ${response.status}`);if(!(await response.text()).includes('data-cap-admin="guard-v1"'))throw Error(`${module}: guarded shell missing`);}
 const response=await fetcher(new URL('/api/admin-article',origin),{method:'POST',headers:{'Content-Type':'application/json'},body:'{}',signal:AbortSignal.timeout(15000)});if(response.status!==401)throw Error('Anonymous article generation was not rejected');
 return {guard:'guard-v1',modules:ADMIN_MODULES.length,anonymousArticle:'denied'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){let success=false;for(let i=0;i<3;i++){try{console.log('PASS admin:',JSON.stringify(await verifyAdminRelease(process.argv[2]||'https://capvisionpartner.com')));success=true;break;}catch(e){console.error(e.message);if(i<2)await new Promise(r=>setTimeout(r,10000));}}if(!success)process.exitCode=1;}
