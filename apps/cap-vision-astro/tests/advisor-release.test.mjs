import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyCourseAdvisor} from '../scripts/verify-course-advisor.mjs';
test('release requires an actual DeepSeek response, not merely a stored key',async()=>{
 const fetcher=async(url,options)=>new Response(JSON.stringify(options.method==='POST'?{mode:'deepseek',model:'deepseek-flash',reply:'• พัฒนาการฟังครับ'}:{advisor:'CourseAdvisor-DenMasterFa',mode:'deepseek'}));
 assert.equal((await verifyCourseAdvisor('https://example.test',fetcher)).mode,'deepseek');
 for(const mode of ['basic','handoff'])await assert.rejects(verifyCourseAdvisor('https://example.test',async(url,options)=>new Response(JSON.stringify(options.method==='POST'?{mode,reply:'fallback'}:{mode:'deepseek'}))),/did not return/);
});
test('release rejects missing keys and failed endpoints',async()=>{
 await assert.rejects(verifyCourseAdvisor('https://example.test',async()=>new Response(JSON.stringify({mode:'basic'}))),/secret not active/);
 await assert.rejects(verifyCourseAdvisor('https://example.test',async()=>new Response('{}',{status:503})),/HTTP 503/);
});
