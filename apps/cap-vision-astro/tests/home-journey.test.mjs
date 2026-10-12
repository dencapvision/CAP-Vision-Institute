import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readContactContext, contactHref, contactSource} from '../src/lib/contact-context.mjs';
import {captureContact} from '../src/lib/lead-workflow.mjs';

test('selected problem survives the Home to Contact link; proposal is distinct', () => {
  for (const service of ['leadership','people-team','culture','customized']) {
    const url = new URL(contactHref(service),'https://example.test');
    assert.deepEqual(readContactContext(url.search),{service,intent:'consultation',source:'home'});
  }
  assert.equal(readContactContext(new URL(contactHref('', 'proposal'),'https://example.test').search).intent,'proposal');
});
test('unknown and prototype values cannot preselect a service or create arbitrary CRM sources', () => {
  for (const service of ['__proto__','constructor','not-a-service','<script>']) {
    assert.equal(readContactContext(`?service=${encodeURIComponent(service)}`).service,'');
  }
  assert.deepEqual(readContactContext('?source=https://evil.test&intent=delete'),{service:'',source:'',intent:'consultation'});
  assert.equal(contactSource({source:'email@example.com'}),'contact_form');
});
test('CRM captures fixed homepage context while preserving service and user requirements', async () => {
  let saved;
  const client = {from:()=>({insert:async rows=>{saved=rows[0];return {error:null};}}),functions:{invoke:async()=>({error:null})}};
  const data={fullName:'QA',organization:'Fixture',phone:'0812345678',email:'qa@example.test',service:'culture',requirements:'Culture workshop',source:'home',intent:'proposal'};
  await captureContact({client,data});
  assert.equal(saved.source,'contact_form');
  assert.equal(saved.interest_topic,'Service: culture | Culture workshop | Origin: home_proposal');
  await captureContact({client,data:{...data,source:'unknown'}});
  assert.equal(saved.source,'contact_form');
});
