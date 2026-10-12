import test from'node:test';import assert from'node:assert/strict';import{verifyAdminRelease}from'../scripts/verify-admin-release.mjs';
test('admin release covers all guarded modules and rejects anonymous AI generation',async()=>{
 const fixture=async url=>new URL(url).pathname==='/api/admin-article'?new Response('{}',{status:401}):new Response('<main data-cap-admin="guard-v1">');
 assert.equal((await verifyAdminRelease('https://example.test',fixture)).modules,13);
 await assert.rejects(verifyAdminRelease('https://example.test',async url=>new URL(url).pathname==='/admin/courses'?new Response('old'):fixture(url)),/courses.*missing/);
 await assert.rejects(verifyAdminRelease('https://example.test',async url=>new URL(url).pathname==='/api/admin-article'?new Response('{}'):fixture(url)),/not rejected/);
});
