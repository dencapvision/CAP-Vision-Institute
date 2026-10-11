# CAP Vision — Public Content & SEO Reliability

ฐานพัฒนา: main commit 41840b5b2496aa64a57c1517f3cac8df7d948e2c.
PR #4 ถูก merged แล้ว. Commit ล่าสุดเพิ่มสำเนาชุดอัปเดตใน CAP-Vision-PR4-Update/; สำเนานี้เป็นเอกสารอ้างอิง ไม่ใช่ source ที่ build ใช้งาน. รอบนี้ไม่แก้หรือลบสำเนานั้น.

## ผลตรวจและงานที่แก้

1. courses/[slug] เดิมคืน 200 เมื่อไม่พบข้อมูลและแสดง Error Log. ใช้ maybeSingle แยก empty result = 404, database/network error = 503 พร้อม Retry-After: 60 และ Cache-Control: no-store. ทั้งสองกรณี noindex และไม่แสดง raw error. Lookup จำกัด published records พร้อม timeout 5 วินาทีและตรวจ slug รวมภาษาไทย.
2. resources/[slug] เดิมมี metadata จาก constants แต่ React แสดงเพียง loading ใน HTML แรก แล้ว fetch JSON/DB ใน browser. รอบนี้ resolve บน server ตามลำดับ JSON ที่ bundled → published database article → existing constants. ส่ง initialArticle เข้า React ให้เนื้อหาและ metadata ตรงกันตั้งแต่ SSR และหลัง hydration.
3. JSON ทั้ง 40 ไฟล์ใน src/data และ public/content ตรงกันทั้งหมด. Build สร้าง sitemap 49 URL: 9 หน้าหลัก + 40 บทความ. Generator ตรวจสำเนาทั้งสองชุดและ fail หากต่างกันเพื่อป้องกัน SSR/client content drift.
4. Layout รองรับ noindex และ social image รายหน้า; เปลี่ยน default image ที่ไม่มีไฟล์ใน repo เป็น images/denmasterfa.jpg ที่มีจริง. ไม่สร้างภาพหรือ testimonial เพิ่ม.
5. เอา FAQPage schema แบบเดียวที่ใส่ซ้ำทุกหน้าออก เพราะไม่ตรงกับ FAQ ที่ผู้ใช้เห็นในหน้าแรก. คง Organization schema และเนื้อหา FAQ ที่แสดงไว้. ยังไม่ได้เพิ่ม schema แบบรายบทความ.
6. 404 route ส่ง status 404/noindex ชัดเจน. เพิ่ม read-only verify-release script สำหรับตรวจ staging/หลัง deploy ว่า homepage metadata, canonical/OG, SSR article และ consent UI เป็น build ใหม่.
7. แก้ tsconfig โดยนำ baseUrl ที่ TypeScript 7 ไม่รองรับออก; คง paths aliases เดิม. เพิ่ม typecheck:public และ GitHub Actions QA สำหรับ PR เท่านั้น ไม่มี merge/deploy/migration step.

## ผลทดสอบ

- npm test: 12 tests ผ่าน รวม 7 capture/CRM/RLS tests เดิม และ 5 public content tests ใหม่. Database tests ใช้ isolated PGlite; ไม่ส่งข้อมูลลูกค้าเข้า production.
- npm run build ผ่าน.
- typecheck:public ผ่านสำหรับ server article loader, React article component และ imports. ไม่อ้างว่า typecheck ทั้ง monorepo ผ่าน.
- Built Worker local HTTP QA: ครบ 49 sitemap URLs, query/trailing-slash variant และ resource sample ผ่าน status/canonical/OG/title/JSON-LD parse.
- ยืนยันเนื้อหา leader-as-facilitator ปรากฏใน HTML แรก ไม่ใช่ loading screen; invalid course slug 404/noindex; missing route 404; admin login noindex.
- verify-release ผ่านสำหรับ /, /contact, /services และ /resources/leader-as-facilitator บน local built Worker.
- Local Wrangler ใช้ scratch-only network-interface shim เนื่องจาก runtime ไม่รองรับ os.networkInterfaces; shim ไม่รวมใน Git.
- GitHub Actions เพิ่งเพิ่มใน PR นี้ ต้องดูผล CI หลังเปิด PR; ไม่ถือว่าผ่านก่อน GitHub รายงาน.

## เว็บไซต์ที่ใช้งานจริง

การอ่านหน้าแรกผ่าน web retrieval ได้หน้า Astro ที่แสดง copywriting ใหม่จาก PR #2 แต่ title ยังเป็นข้อความเดิมก่อน PR #3. จึงยังไม่ยืนยันว่า deploy ล่าสุดขึ้น origin แล้ว; retrieval อาจเป็น cached page.
การตรวจ HTTP หลาย URL จาก execution environment ได้ 403 จึงใช้ผลนี้ยืนยันสถานะ Production ไม่ได้. ไม่สรุปว่าเว็บไซต์ล่มหรือ route ทั้งหมดคืน 403 ให้ผู้ใช้จริง.
ให้รัน `node scripts/verify-release.mjs --base=https://capvisionpartner.com` จากเครือข่ายที่เข้าถึงเว็บได้หลังผู้ดูแลอนุมัติและเผยแพร่. Script อ่าน HTTP เท่านั้น.

## ข้อค้างก่อนรับรองทั้งระบบ

- Published course และ DB-only article ต้องตรวจกับ staging Supabase จริง; helper ทดสอบด้วย fixtures แล้ว แต่ไม่ได้รับรองข้อมูลและ policy ของ live DB.
- Browser hydration, ฟอร์มจริง → Lead → LINE → CRM และ allowlisted staff ต้องทำ E2E บน staging. รอบนี้ไม่เปลี่ยน SQL migration หรือข้อมูลจริง.
- GA4/GTM collector ยังไม่ได้เชื่อม; events/consent จาก PR #4 คงอยู่.
- Sitemap รวม bundled content เท่านั้น; DB-only articles/courses ต้องเพิ่ม dynamic sitemap หลังยืนยัน schema และวิธี deploy.
- Repo มีทั้ง root Vite deploy scripts, Astro Worker deployment และ VPS webhook. ต้องยืนยัน artifact/target จริงก่อนอนุมัติ production deploy; รอบนี้ไม่แก้ target หรือ trigger deploy.

Draft review เท่านั้น. ยังไม่ Merge, Deploy Production หรือ apply migration กับฐานจริง.
