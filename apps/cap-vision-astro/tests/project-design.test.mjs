import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verifyProjectTheme,PROJECT_PAGES} from '../scripts/verify-project-theme.mjs';
const html='<body data-cap-design="pearl-glass-v1"><div class="cap-pearl-hero" data-cap-contact="course-advisor-v3"></div><link href="/_astro/project.css" rel="stylesheet">';
const fixture=(missingPath=null,css=':root{--pg-primary:#284f72}.cap-site-header{}.cap-pearl-hero{}')=>async url=>{
 const path=new URL(url).pathname;
 return new Response(path.endsWith('.css')?css:path===missingPath?'<body>old</body>':html);
};
test('release verifies every public shell and Admin login, not only the homepage',async()=>{
 const result=await verifyProjectTheme('https://example.test',fixture());assert.deepEqual(result.pages,PROJECT_PAGES);
});
test('missing theme on a single internal page or missing stylesheet blocks release success',async()=>{
 await assert.rejects(verifyProjectTheme('https://example.test',fixture('/contact')),/contact.*marker missing/);
 await assert.rejects(verifyProjectTheme('https://example.test',fixture(null,'.old{}')),/CSS missing/);
});

test('release rejects a public page without restored AI or Pearl hero',async()=>{
 const original=fixture();
 for(const token of ['data-cap-contact="course-advisor-v3"','cap-pearl-hero']) {
  const missing=async url=>{const response=await original(url);return new Response(new URL(url).pathname.endsWith('.css')?await response.text():(await response.text()).replace(token,''));};
  await assert.rejects(verifyProjectTheme('https://example.test',missing),/Advisor missing|Pearl hero missing/);
 }
});
