import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verifyProjectTheme,PROJECT_PAGES} from '../scripts/verify-project-theme.mjs';
const html='<body data-cap-design="pearl-glass-v1"><link href="/_astro/project.css" rel="stylesheet">';
const fixture=(missingPath=null,css=':root{--pg-primary:#284f72}.cap-site-header{}')=>async url=>{
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
