# ธีมไม่เปลี่ยนหลัง Commit — ผลตรวจและวิธีเผยแพร่

ตรวจ main commit e659d87a40d40e38b678f278435e49f71cb34212 แล้ว: pages/Home.tsx และ Astro HomePage.tsx เรียก ThemeHome ใหม่อยู่จริง Commit นี้เพิ่ม archive ของ ZIP ต่อจาก theme commit a32b2b6 จึงไม่ใช่กรณีไฟล์ธีมอยู่เฉพาะโฟลเดอร์ ZIP

ตรวจเว็บไซต์จริงด้วย GET แบบ Cache-Control: no-cache และ query ใหม่เมื่อ 12 ตุลาคม 2569: HTML ยังเป็นหน้าเดิม ไม่มี cap-theme และไม่มีหัวเรื่อง “ปลุกศักยภาพคน” ใช้ Astro island /_astro/HomePage.CpQfisIz.js และ stylesheet /_astro/global.lU3CdULP.css

ข้อค้นพบ: workflow เดิมบน main เรียก VPS webhook และซ่อน curl error ด้วย || true ไม่ได้ build/deploy Astro Worker ที่ระบุใน apps/cap-vision-astro/copy-wrangler.js ไม่มีหลักฐานว่า Worker ปัจจุบันได้รับ release ใหม่นี้ สถานะ CI ผ่านเพียงอย่างเดียวไม่ยืนยันว่าเว็บไซต์เผยแพร่แล้ว

## การแก้ไข

- เพิ่ม workflow Deploy Astro to Cloudflare แบบ workflow_dispatch ให้ maintainer เริ่มด้วยตนเองบน main
- ทดสอบ/typecheck/build ภายใน apps/cap-vision-astro และ deploy dist/wrangler.json ไป Worker cap-vision-institute
- ต้องมี secret CLOUDFLARE_API_TOKEN สำหรับ account/Worker ที่ระบุใน config โดยไม่บันทึก token ใน repository
- ปรับ workflow VPS เป็น manual และให้ HTTP error แสดงเป็น failure
- เพิ่ม data-cap-theme=pearl-glass-v1 ที่หน้า Home และสคริปต์ตรวจ HTML ใหม่พร้อม CSS ที่เว็บไซต์เชื่อมจริงหลัง deploy
- กรณีโดเมนยังชี้ Worker อื่น verifier จะ fail ต้องแก้ Cloudflare route/custom domain ให้ชี้ Worker ที่เผยแพร่ จึงไม่รายงานความสำเร็จจากเพียงคำสั่ง deploy

## ขั้นตอนนำขึ้นจริง (หลังอนุมัติ)

1. Merge PR ชุดแก้ไขนี้เข้า main
2. ตั้ง secret CLOUDFLARE_API_TOKEN ใน GitHub production environment หรือ repository หากยังไม่มี ไม่ส่ง token ผ่านแชต
3. GitHub Actions → Deploy Astro to Cloudflare → Run workflow → เลือก main
4. Workflow ต้องผ่านขั้น Verify public homepage changed ก่อนถือว่าการเผยแพร่สำเร็จ

กรณีใช้ Antigravity/เครื่องที่ login Cloudflare อยู่แล้ว:

```sh
cd apps/cap-vision-astro
npm ci
npm test
npm run typecheck:public
npm run deploy
node scripts/verify-live-theme.mjs https://capvisionpartner.com --attempts=6
```

npm run deploy เป็นการแก้ Production ต้องได้รับอนุมัติก่อนเรียก ไม่ได้ใช้ npm run deploy:web เพราะคำสั่งนั้น build แอป React เพื่อ Pages ซึ่งต่างจาก Astro Worker ปัจจุบัน

## Validation

Node tests รวม 17 กรณีผ่าน; public typecheck และ Astro build ผ่าน ทดสอบ verifier ด้วย fixture ว่า HTML เก่า, CSS ขาด และ HTTP error ไม่รายงาน success ไม่ได้ส่ง POST webhook ไม่ได้ run workflow deploy ไม่ได้ merge และไม่ได้แก้ production ในการตรวจรอบนี้
