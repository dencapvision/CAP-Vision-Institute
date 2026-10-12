import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verifyTheme,THEME_MARKER} from '../scripts/verify-live-theme.mjs';
const html=`<div ${THEME_MARKER}>ปลุกศักยภาพคน</div><link rel="stylesheet" href="/_astro/theme.css">`;
const fixture=(page=html,css='.cap-theme{}.cap-stone{}',status=200)=>async url=>new Response(new URL(url).pathname==='/'?page:css,{status});
test('release verifies fresh HTML and actual linked stylesheet',async()=>{
 const urls=[];const f=fixture();const result=await verifyTheme('https://example.test',async(...args)=>{urls.push(new URL(args[0]));return f(...args);});
 assert.equal(result.theme,'pearl-glass-v1');assert(urls[0].searchParams.has('cap_release_check'));assert.equal(urls[1].pathname,'/_astro/theme.css');
});
test('old HTML, missing CSS and HTTP failures cannot report success',async()=>{
 await assert.rejects(verifyTheme('https://example.test',fixture('<h1>old</h1>')),/older build/);
 await assert.rejects(verifyTheme('https://example.test',fixture(html,'.old{}')),/stylesheet is missing/);
 await assert.rejects(verifyTheme('https://example.test',fixture(html,'',503)),/HTTP 503/);
});
