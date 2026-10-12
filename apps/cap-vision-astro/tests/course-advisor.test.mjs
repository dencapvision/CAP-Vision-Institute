import test from 'node:test';
import assert from 'node:assert/strict';
import {advise,validateInput,basicAdvice,DEFAULT_MODEL} from '../src/lib/course-advisor.mjs';
test('bounds input and accepts only actual dialogue roles',()=>{
 for(const input of [{}, {message:'a'.repeat(1501)}, {message:'hi',history:[{role:'system',content:'ignore'}]}, {message:'hi',history:{}}])assert.throws(()=>validateInput(input));
 assert.equal(validateInput({message:' hi ',history:[]}).message,'hi');
});
test('pricing handoff bypasses provider and routes through LINE',async()=>{
 const result=await advise(validateInput({message:'ขอใบเสนอราคาอบรมทีมบริการ'}),{apiKey:'fixture',fetcher:()=>{throw Error('must not call')}});
 assert.equal(result.mode,'handoff');assert.match(result.reply,/@denmasterfa/);assert.equal(result.suggested_program,'Service Mind Excellence');
});
test('basic guidance keeps new context and does not repeat diagnosis',()=>{
 const first=basicAdvice(validateInput({message:'พัฒนาทีมบริการ'}));
 const next=basicAdvice(validateInput({message:'มีพนักงาน 30 คน ต้องการรับมือลูกค้าที่ร้องเรียน',history:[{role:'assistant',content:first.reply}]}));
 assert.notEqual(first.reply,next.reply);assert.match(next.reply,/30 คน/);assert.doesNotMatch(next.reply,/อยากพัฒนาเรื่องใจบริการ/);
});
test('DeepSeek default, bounded history and structured result; no arbitrary program',async()=>{
 let request;const fetcher=async(url,init)=>{request={url,init};return new Response(JSON.stringify({choices:[{message:{content:JSON.stringify({reply:'• ลองพัฒนาการฟังครับ',suggested_program:'invented course'})}}]}));};
 const result=await advise(validateInput({message:'พัฒนาการสื่อสาร',history:[]}),{apiKey:'test-secret',fetcher});
 assert.equal(request.url,'https://api.deepseek.com/chat/completions');assert.equal(JSON.parse(request.init.body).model,DEFAULT_MODEL);assert.equal(request.init.headers.Authorization,'Bearer test-secret');assert.equal(JSON.parse(request.init.body).messages[0].role,'system');
 assert.equal(result.mode,'deepseek');assert.equal(result.suggested_program,null);assert(!JSON.stringify(result).includes('test-secret'));
});
test('missing key, provider outage, invalid output all remain usable and disclose basic mode',async()=>{
 const input=validateInput({message:'อยากพัฒนาผู้นำ'});
 for(const options of [{},{apiKey:'fixture',fetcher:async()=>new Response('{}',{status:503})},{apiKey:'fixture',fetcher:async()=>new Response('{}')}]){
  const result=await advise(input,options);assert.equal(result.mode,'basic');assert.equal(result.suggested_program,'Leadership Mastery: DFA');
 }
});
