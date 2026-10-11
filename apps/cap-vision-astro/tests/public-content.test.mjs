import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loadPublishedRecord, resolveArticle, articleMetadata, isPublicSlug} from '../src/lib/public-content.mjs';
function client(result, reject=false) {
  const calls=[];
  const query = {select:x=>{calls.push(['select',x]);return query;},eq:(...args)=>{calls.push(args);return query;},
    abortSignal:signal=>{assert.ok(signal instanceof AbortSignal);return query;},maybeSingle:async()=>{if(reject) throw Error('private');return result;}};
  return {calls,from:table=>{calls.push(['table',table]);return query;}};
}
test('published record distinguishes absence from service failure',async()=>{
  for(const [result,status] of [[{data:{title:'Published'},error:null},200],[{data:null,error:null},404],[{data:null,error:{code:'PGRST116'}},503]]) {
    const c=client(result); assert.equal((await loadPublishedRecord(c,'courses','valid-slug',{publishedColumn:'is_published'})).status,status);
    assert.ok(c.calls.some(v=>v[0]==='is_published'&&v[1]===true));
  }
  assert.deepEqual(await loadPublishedRecord(client({},true),'courses','valid-slug'),{status:503,data:null});
});
test('invalid slugs never query the database',async()=>{
  const c=client({});
  for(const slug of ['', '../admin','%2Fadmin','a/b','a'.repeat(181)]) {
    assert.equal(isPublicSlug(slug),false);assert.equal((await loadPublishedRecord(c,'courses',slug)).status,404);
  }
  assert.equal(c.calls.length,0);assert.equal(isPublicSlug('ผู้นำ-ยุคใหม่'),true);
});
test('bundled full article renders without a database dependency',async()=>{
  const article={title:'Full',summary:'Actual summary',seo:{meta_title:'Actual SEO'}};
  const result=await resolveArticle('known',{bundled:{known:article},lookup:()=>{throw Error('must not query');}});
  assert.equal(result.status,200);assert.equal(result.data,article);assert.equal(articleMetadata(result.data).title,'Actual SEO');
});
test('database-only articles normalize actual title and metadata',async()=>{
  const result=await resolveArticle('database-only',{lookup:async()=>({status:200,data:{slug:'database-only',title:'DB title',content:{summary:'<b>Summary</b>'}}})});
  assert.equal(result.data.title,'DB title');assert.equal(articleMetadata(result.data).description,'Summary');
});
test('fallback stays usable during an outage; unknown article returns 503',async()=>{
  const lookup=async()=>({status:503,data:null});
  const result=await resolveArticle('fallback',{fallback:[{id:'fallback',title:'Existing',excerpt:'Known content'}],lookup});
  assert.equal(result.status,200);assert.equal(result.data.sections[0].content,'Known content');
  assert.deepEqual(await resolveArticle('unknown',{lookup}),{status:503,data:null});
  assert.deepEqual(await resolveArticle('unknown',{lookup:async()=>({status:404,data:null})}),{status:404,data:null});
});
