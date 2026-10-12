import test from 'node:test';import assert from 'node:assert/strict';
import {getAdminAccess,adminError,checkAdminSchema} from '../src/lib/admin-access.mjs';
function client({user={id:'user-1'},cms=true,crm={data:{user_id:'user-1'},error:null},schema=null}={}){
 return {auth:{getUser:async()=>({data:{user},error:null})},rpc:async()=>({data:cms,error:null}),from(table){return {select(){return this;},eq(){return this;},maybeSingle:async()=>crm,limit:async()=>({data:[],error:schema})};}};
}
test('signed-out users and ordinary accounts cannot mount CMS modules',async()=>{
 assert.equal((await getAdminAccess(client({user:null}),'courses')).kind,'signed_out');
 assert.equal((await getAdminAccess(client({cms:false}),'courses')).allowed,false);
 assert.equal((await getAdminAccess(client(),'courses')).allowed,true);
});
test('CRM schema absence is separate from denied role and does not become empty metrics',async()=>{
 const missing=await getAdminAccess(client({crm:{data:null,error:{code:'PGRST205'}}}),'leads');assert.equal(missing.kind,'schema');
 const denied=await getAdminAccess(client({crm:{data:null,error:null}}),'leads');assert.equal(denied.kind,'permission');
 assert.equal((await getAdminAccess(client({schema:{code:'42703'}}),'assessments')).allowed,false);
 assert.equal((await getAdminAccess(client(),'leads')).allowed,true);
});
test('own system diagnostics require login and inspect only empty schema results',async()=>{
 assert.equal((await getAdminAccess(client({cms:false}),'system')).allowed,true);
 assert.equal((await getAdminAccess(client({user:null}),'system')).allowed,false);
 const results=await checkAdminSchema(client({schema:{code:'42703'}}));assert(results.every(r=>r.ok===false));
 assert.equal(adminError({code:'42501'}).kind,'permission');
});

test('missing or expired Auth sessions redirect rather than masquerading as permission failures',async()=>{
 const c=client();c.auth.getUser=async()=>({data:{user:null},error:{name:'AuthSessionMissingError'}});assert.equal((await getAdminAccess(c,'courses')).kind,'signed_out');
 c.auth.getUser=async()=>({data:{user:null},error:{status:401}});assert.equal((await getAdminAccess(c,'courses')).kind,'signed_out');
 assert.equal(adminError({code:'23505'}).kind,'validation');
});
