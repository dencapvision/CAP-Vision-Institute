import assert from 'node:assert/strict';
const arg = process.argv.find(a=>a.startsWith('--base='));
if (!arg) throw new Error('Supply --base=https://your-staging-host (read-only HTTP check)');
const base = new URL(arg.slice(7));
if (!['http:', 'https:'].includes(base.protocol)) throw new Error('Invalid base URL');
const checks = ['/', '/contact', '/services', '/resources/leader-as-facilitator'];
const failures=[];
for (const path of checks) {
  try {
    const response=await fetch(new URL(path,base),{signal:AbortSignal.timeout(15000)});
    assert.equal(response.status,200, `${path}: HTTP ${response.status}`);
    const html=await response.text();
    assert.ok(html.includes(`rel="canonical" href="https://capvisionpartner.com${path}"`),`${path}: canonical mismatch`);
    assert.ok(html.includes(`property="og:url" content="https://capvisionpartner.com${path}"`),`${path}: OG mismatch`);
    if (path==='/') assert.ok(html.includes('อบรมองค์กร In-house Training พัฒนาผู้นำและทีม | CAP Vision Institute'), 'Homepage metadata is from an older build');
    if (path.startsWith('/resources/')) assert.ok(!html.includes('กำลังโหลดเนื้อหา...'), 'Article is not rendered on server');
    assert.ok(html.includes('การวัดผลเว็บไซต์'),'Consent interface is missing');
    assert.ok(!html.includes('Error Log:'),'Raw error was exposed');
    console.log(`PASS ${path}`);
  } catch(e) { failures.push(e.message);console.error(`FAIL ${e.message}`); }
}
if(failures.length) process.exitCode=1;
