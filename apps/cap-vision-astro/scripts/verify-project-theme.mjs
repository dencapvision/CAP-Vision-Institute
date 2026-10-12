import {pathToFileURL} from 'node:url';
export const PROJECT_PAGES = ['/', '/services', '/courses', '/contact', '/about', '/assessment', '/resources', '/portfolio', '/speakers', '/admin/login'];
export async function verifyProjectTheme(origin, fetcher=fetch) {
  const results=[];
  for(const path of PROJECT_PAGES){
    const url=new URL(path,origin);url.searchParams.set('cap_design_check',String(Date.now()));
    const response=await fetcher(url,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw Error(`${path}: HTTP ${response.status}`);
    const html=await response.text();
    if(!html.includes('data-cap-design="pearl-glass-v1"'))throw Error(`${path}: shared design marker missing`);
    const cssUrls=[...html.matchAll(/<link\b[^>]*href=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi)]
      .map(m=>new URL(m[1],url)).filter(u=>u.origin===url.origin);
    let present=false;
    for(const cssUrl of cssUrls){
      const css=await fetcher(cssUrl,{signal:AbortSignal.timeout(15000)});
      if(!css.ok)throw Error(`${path}: stylesheet HTTP ${css.status}`);
      const text=await css.text();
      if(text.includes('--pg-primary')&&text.includes('.cap-site-header'))present=true;
    }
    if(!present)throw Error(`${path}: shared theme CSS missing`);
    results.push(path);
  }
  return {design:'pearl-glass-v1',pages:results};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  try{console.log('PASS:',JSON.stringify(await verifyProjectTheme(process.argv[2]||'https://capvisionpartner.com')));}
  catch(error){console.error(error.message);process.exitCode=1;}
}
