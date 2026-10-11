# CAP Vision Institute — ชุดอัปเดต PR #5

PR: https://github.com/dencapvision/CAP-Vision-Institute/pull/5
Branch: feat/seo-detail-reliability-20261012
Remote commit: ab0fe974f4b67bb649a878dd1667a797307da911
Git tree: acc5acd09b511346556c8912799469f0d91f1a55
ฐาน main ที่ใช้พัฒนา: 41840b5b2496aa64a57c1517f3cac8df7d948e2c (มีงาน PR #4 แล้ว)

## สิ่งที่อยู่ในชุด
- files/: ไฟล์อัปเดตฉบับเต็ม 18 ไฟล์ พร้อมตำแหน่งเดิมใน Repository
- UPDATE_PR5.patch: Patch เฉพาะการเปลี่ยนแปลงของ PR #5
- ANTIGRAVITY_PROMPT.txt: คำสั่งนำเข้า/ตรวจสำหรับ IDE
- MANIFEST.json: SHA-256 ของไฟล์และ Patch
- README_TH.md: คู่มือนี้

สิ่งที่เปลี่ยน: บทความ SSR, metadata ตรงเนื้อหา, 404/503 สำหรับหน้ารายละเอียด, sitemap 49 URL, social images, Schema, TypeScript config และ PR-only QA workflow.
ชุดนี้ต่อจากระบบ Contact/CRM/Consent ที่อยู่ใน PR #4. ให้ยืนยันว่ามี PR #4 ก่อนใช้.

## วิธีที่แนะนำ: ใช้ Branch จาก GitHub โดยตรง
เปิด Terminal ที่ราก Repository:

```bash
git status --short
git fetch origin feat/seo-detail-reliability-20261012
git switch -c review/cap-vision-pr5 origin/feat/seo-detail-reliability-20261012
cd apps/cap-vision-astro
npm ci
npm test
npm run build
npm run typecheck:public
```

หากมีงานค้าง ให้เก็บงานนั้นก่อนสลับ Branch. หากชื่อ review/cap-vision-pr5 มีอยู่แล้วให้ใช้ชื่อใหม่.
วิธีนี้ไม่ต้องใช้ Patch ซ้ำ.

## วิธีใช้ ZIP/Patch กับโปรเจคเดิม
แตก ZIP นอก Repository และเปิด Terminal ที่รากโปรเจค. เปลี่ยน /path/to/ ให้ตรงกับตำแหน่งไฟล์จริง:

```bash
git status --short
git switch -c review/cap-vision-update-pr5
git apply --check /path/to/CAP-Vision-PR5-Update/UPDATE_PR5.patch
git apply /path/to/CAP-Vision-PR5-Update/UPDATE_PR5.patch
git diff --check
cd apps/cap-vision-astro
npm ci
npm test
npm run build
npm run typecheck:public
```

Patch ผ่านการตรวจบน main 41840b5 และ PR #4 cdb96bb แล้ว. เมื่อนำเข้าเสร็จ ไฟล์อัปเดตทั้ง 18 ไฟล์ตรงกับฉบับที่ทดสอบใน PR #5.
หาก --check ไม่ผ่าน ให้หยุดและให้ IDE รวมการเปลี่ยนแปลงทีละไฟล์. อย่าคัดลอกทับงานที่พัฒนาเพิ่มเติมหรือใช้ git reset --hard.
files/ ใช้เทียบไฟล์ฉบับเต็ม; ไม่ต้องวางโฟลเดอร์ ZIP ทั้งชุดเข้าโปรเจค. ใช้ Patch หรือคัดเฉพาะไฟล์ที่ตรวจแล้วไปยังตำแหน่งตรงกัน.

## การตรวจหลังติดตั้ง
- Build สร้าง sitemap ใหม่จาก JSON บทความทั้ง 40 รายการและตรวจว่า src/data กับ public/content ตรงกัน
- npm test ควรผ่าน 12 กรณี; typecheck:public ตรวจเฉพาะส่วนที่กำหนดและ imports
- GitHub CI ของ PR #5 ผ่าน: https://github.com/dencapvision/CAP-Vision-Institute/actions/runs/38164272985
- รายงาน QA: files/docs/qa/2026-10-12-public-content-seo.md
- หลังมี staging ที่เปิดใช้งาน ให้ตรวจ HTTP โดยอ่านข้อมูลเท่านั้น:

```bash
node scripts/verify-release.mjs --base=https://YOUR-STAGING-HOST
```

ยังต้องทดสอบ published course/DB-only article และ Contact → Lead → LINE → CRM กับ staging จริง. GA4/GTM collector และ dynamic sitemap สำหรับ DB-only records เป็นงานต่อไป.

สถานะชุดนี้คือ Draft review. ห้าม Merge หรือ Deploy Production โดยไม่ได้รับอนุมัติ.
