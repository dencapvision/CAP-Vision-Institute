# CAP Vision Institute — ชุดอัปเดต PR #4

ชุดโค้ดนี้ตรงกับ Draft PR #4:
https://github.com/dencapvision/CAP-Vision-Institute/pull/4
Branch: feat/lead-conversion-crm-qa
Remote commit: cdb96bb76a3131b8826b675ef9323d7100b81875
Git tree: 45243711cdea816b3c201e17cebc0208a58ef5bf

## สิ่งที่อยู่ใน ZIP
- files/: ไฟล์ฉบับเต็ม 21 ไฟล์ โดยคงตำแหน่งภายใน Repository
- MAIN_TO_PR4.patch: สำหรับ main ณ commit 27e477c7aa65379bc561e39362a5064287a7eecb
- PR3_TO_PR4.patch: สำหรับ PR #3 ณ commit 1a81ea254dab1b684cb11c0b723e48eea7b10580
- MANIFEST.json: รายการไฟล์และ SHA-256
- ANTIGRAVITY_PROMPT.txt: คำสั่งสำหรับให้ IDE นำเข้าและตรวจโค้ด

มี SEO, ฟอร์มรับ Lead, consent/dataLayer tracking, CRM pipeline, SQL migration และ tests.
ไม่มี node_modules, .env, credentials หรือไฟล์แนบประกอบโครงการ.

## วิธีที่แนะนำ: ใช้ Branch จาก GitHub โดยตรง
เปิด Terminal ที่ราก Repository เดิม และตรวจว่าไม่มีงานค้างก่อนเริ่ม:

```bash
git status --short
git fetch origin feat/lead-conversion-crm-qa
git switch -c review/cap-vision-pr4 origin/feat/lead-conversion-crm-qa
cd apps/cap-vision-astro
npm ci
npm test
npm run build
```

หากชื่อ review/cap-vision-pr4 มีอยู่แล้ว ให้ใช้ชื่อใหม่. อย่าใช้ git reset --hard หรือทิ้งงานค้าง.
วิธีนี้ไม่ต้องนำ Patch มาใช้ซ้ำ.

## วิธีใช้ Patch กับโค้ดในเครื่อง
เลือก Patch เพียงไฟล์เดียวตามฐานของ Branch. MAIN_TO_PR4 รวม SEO จาก PR #3 แล้ว.
ใช้ Terminal ที่ราก Repository โดยเปลี่ยน path ตัวอย่างให้ตรงกับ ZIP ที่แตกไว้:

```bash
git status --short
git switch -c review/cap-vision-update
git apply --check /path/to/CAP-Vision-PR4-Update/MAIN_TO_PR4.patch
git apply /path/to/CAP-Vision-PR4-Update/MAIN_TO_PR4.patch
git diff --check
cd apps/cap-vision-astro
npm ci
npm test
npm run build
```

หากฐานเป็น PR #3 ให้แทน MAIN_TO_PR4.patch ด้วย PR3_TO_PR4.patch ในทั้งสองคำสั่ง.
หาก --check ไม่ผ่าน ให้หยุดและเทียบไฟล์ที่ขัดแย้งก่อน อย่าคัดลอกทับทั้งหมด.
หาก Branch มีงานใหม่หลังฐานที่ระบุ ให้ให้ IDE รวมการเปลี่ยนแปลงทีละไฟล์.
files/ เป็นไฟล์อ้างอิงฉบับเต็ม; Patch ช่วยรักษางานใหม่ได้ดีกว่าการคัดลอกทับ.

## ฐานข้อมูลและการทดสอบ staging
SQL: files/supabase/migrations/20261011150000_lead_crm_mvp.sql
SQL ยังไม่ถูกใช้กับฐานข้อมูลจริง และไม่รันจาก npm test หรือ npm run build.
ให้ตรวจ schema/policies และทดลองกับ staging ก่อน. ต้องเพิ่ม UUID ของผู้ดูแลที่ยืนยันตัวตนแล้วลง crm_admins ผ่านผู้ดูแลฐานข้อมูลก่อนใช้ CRM; migration ไม่ให้สิทธิ์บัญชีใดอัตโนมัติ.
กำหนด PUBLIC_SUPABASE_URL ของ staging ที่ต่างจาก production, PUBLIC_SUPABASE_ANON_KEY ของ staging และ PUBLIC_ENABLE_STAGING_LEAD_WRITES=true สำหรับทดสอบฟอร์ม/การแก้ CRM บน preview.
ไม่ตั้ง flag นี้กับฐานข้อมูลจริงเพื่อหลีกเลี่ยงการเขียนข้อมูลจาก preview.

## สถานะและข้อจำกัด
Build, tests 7 กรณี, TypeScript เฉพาะส่วนที่แก้ และ rendered HTTP SEO checks ผ่านในการจัดทำ PR.
Patch ทั้งสองชุดผ่าน git apply --check และสร้าง Git tree เดียวกับ PR #4.
Conversion ส่ง dataLayer events หลังยินยอม; ยังต้องเชื่อม collector GA4/GTM.
ยังต้องทดสอบ browser E2E กับ staging database/LINE และตรวจ dynamic-course soft-404/OG image/FAQ schema.
รายละเอียด: files/docs/qa/2026-10-11-leads-seo-crm.md

ห้าม Merge, ใช้ SQL กับ Production หรือ Deploy Production โดยไม่ได้รับอนุมัติ.
