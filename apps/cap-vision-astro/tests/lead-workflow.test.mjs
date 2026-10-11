import {test} from 'node:test';
import assert from 'node:assert/strict';
import {captureContact, validateContact, pipelineStage} from '../src/lib/lead-workflow.mjs';
import {trackConversion} from '../src/lib/conversion.mjs';
const data = {fullName:'Test', organization:'Org', phone:'0812345678',email:'test@example.com',service:'customized',requirements:'Workshop'};
function fixture({dbError = null, notifyError = null, rejectNotification = false} = {}) {
  const calls = [];
  return {calls, client: {from: () => ({insert: async rows => {calls.push(rows); return {error:dbError};}}),
    functions: {invoke: async () => {calls.push('notify'); if (rejectNotification) throw Error('offline'); return {error:notifyError};}}}};
}
test('reject missing, malformed and excessive fields', () => {
  for (const bad of [{email:'bad'}, {fullName:' '}, {phone:'bad'}, {requirements:'a'.repeat(4001)}]) assert.throws(() => validateContact({...data,...bad}));
});
test('database failure does not notify or count conversion', async () => {
  const f = fixture({dbError:Error('db')}); let count = 0;
  await assert.rejects(captureContact({client:f.client,data,onSaved:()=>count++}));
  assert.equal(count,0); assert.equal(f.calls.length,1);
});
test('saved lead stays successful when notification fails', async () => {
  for (const options of [{notifyError:Error('notify')},{rejectNotification:true},{}]) {
    const f=fixture(options); let count=0;
    const result=await captureContact({client:f.client,data,onSaved:()=>count++});
    assert.equal(result.saved,true); assert.equal(count,1); assert.equal(f.calls.length,2);
    assert.equal(f.calls[0][0].source,'contact_form');
  }
});
test('analytics failure never breaks capture', async () => {
  const f=fixture(); assert.equal((await captureContact({client:f.client,data,onSaved:()=>{throw Error();}})).saved,true);
});
test('legacy closed/qualified are not silently reclassified', () => {
  assert.equal(pipelineStage({status:'closed'}),''); assert.equal(pipelineStage({status:'qualified'}),'');
  assert.equal(pipelineStage({status:'new'}),'new'); assert.equal(pipelineStage({status:'new',pipeline_stage:'proposal'}),'proposal');
});
test('tracking requires consent and rejects arbitrary values', () => {
  const w={localStorage:{getItem:()=>null}};
  assert.equal(trackConversion('generate_lead','form',w),false);
  w.localStorage.getItem=()=> 'granted';
  assert.equal(trackConversion('generate_lead','form',w),true);
  assert.deepEqual(w.dataLayer,[{event:'generate_lead',channel:'form'}]);
  assert.equal(trackConversion('email=test@example.com','form',w),false);
  assert.equal(trackConversion('generate_lead','test@example.com',w),false);
});
