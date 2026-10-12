import {pathToFileURL} from 'node:url';
export const THEME_MARKER = 'data-cap-theme="pearl-glass-v1"';
export async function verifyTheme(origin, fetcher = fetch) {
  const home=new URL('/',origin);
  home.searchParams.set('cap_release_check',String(Date.now()));
  const response=await fetcher(home,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(15000)});
  if(!response.ok) throw Error(`Homepage returned HTTP ${response.status}`);
  const html=await response.text();
  if(!html.includes(THEME_MARKER)||!html.includes('ปลุกศักยภาพคน')) throw Error('The public homepage still serves an older build or a different app.');
  const cssUrls=[...html.matchAll(/<link\b[^>]*href=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi)]
    .map(m=>new URL(m[1],home)).filter(url=>url.origin===home.origin);
  if(!cssUrls.length) throw Error('No same-origin stylesheet was linked by the homepage.');
  let hasThemeCss=false;
  for(const url of cssUrls){
    const css=await fetcher(url,{signal:AbortSignal.timeout(15000)});
    if(!css.ok) throw Error(`Stylesheet returned HTTP ${css.status}`);
    const body=await css.text();
    if(body.includes('.cap-theme')&&body.includes('.cap-stone'))hasThemeCss=true;
  }
  if(!hasThemeCss) throw Error('The theme HTML is present, but its stylesheet is missing.');
  return {origin:home.origin,theme:'pearl-glass-v1',stylesheetCount:cssUrls.length};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const origin=process.argv[2]||'https://capvisionpartner.com';
  const count=process.argv.find(a=>a.startsWith('--attempts='))?.split('=')[1]||'1';
  const attempts=Math.min(6,Math.max(1,Number(count)||1));let passed=false;
  for(let i=0;i<attempts;i++){
    try{console.log('PASS:',JSON.stringify(await verifyTheme(origin)));passed=true;break;}
    catch(error){console.error(`Attempt ${i+1}/${attempts}: ${error.message}`);if(i+1<attempts)await new Promise(r=>setTimeout(r,10000));}
  }
  if(!passed)process.exitCode=1;
}
