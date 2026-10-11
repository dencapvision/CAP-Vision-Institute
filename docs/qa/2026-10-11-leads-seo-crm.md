# CAP Vision — SEO, Contact Capture และ CRM MVP

ฐานตรวจ: main `27e477c7aa65379bc561e39362a5064287a7eecb` และ Draft PR #3 head `1a81ea254dab1b684cb11c0b723e48eea7b10580`.
PR นี้รวมการเปลี่ยนแปลง SEO ของ PR #3 และยังไม่อนุมัติให้ Merge หรือ Deploy Production

## ผลตรวจและสิ่งที่แก้

- Canonical/og:url ใช้ production host, ตัด query และ normalize trailing slash ให้ตรง sitemap.
- Sitemap เดิมระบุ 9 URL ที่ไม่มี route ใน Astro: in-house-training, leadership-development, team-building, communication-training, service-mind, facilitator-training, executive-coaching, od-consulting, leadership-roadmap. นำออกจาก sitemap; ไม่สร้าง landing page เพิ่มโดยไม่มีเนื้อหา.
- เพิ่ม ASSETS binding ใน config ที่สร้างโดย copy-wrangler.js. ก่อนแก้ URL ที่ไม่มีหน้าเกิด 500 จาก fallbackToAssets.
- Admin layout และ login มี noindex/nofollow.
- Contact: บันทึกสำเร็จถือว่าได้รับ Lead แม้ LINE notification ล้มเหลว. ป้องกัน submit ซ้อน, แสดง error ในฟอร์ม, ไม่แสดง raw database error และไม่นับ conversion เมื่อ insert ล้มเหลว.
- Validation ฟอร์มและ constraint ฐานข้อมูลสำหรับ source contact_form. ไม่แตะข้อมูลลูกค้าจริงในการทดสอบ.
- CRM ต่อจาก /admin/leads: pipeline 9 ระยะ, จำนวนต่อระยะ, ค้นหา/กรอง, นัดติดตาม, บันทึกทีมงาน. closed/qualified เดิมไม่ถูกตีความเป็น won อัตโนมัติ. ใช้ pipeline_stage แยกจาก status เดิมเพื่อไม่กระทบหน้ารายงานเก่า.
- เพิ่ม crm_admins และ RLS จำกัด select/update ให้บัญชีที่อนุญาต. Repository policy เดิมให้ authenticated ทุกบัญชี FOR ALL; ไม่ยืนยันว่า production ใช้ policy เดียวกันจนกว่าจะตรวจ staging/live โดยผู้ดูแล.
- Preview ไม่ให้ Contact/CRM เขียนผ่าน production Supabase fallback. หากต้องการทดสอบจริงต้องกำหนด PUBLIC_SUPABASE_URL ของ staging ที่แตกต่างและ PUBLIC_ENABLE_STAGING_LEAD_WRITES=true.

## Conversion instrumentation

แสดงตัวเลือกยินยอม/ปฏิเสธและเปลี่ยนภายหลังได้. ส่ง dataLayer events หลังยินยอมเท่านั้น:
contact_view, contact_start, contact_submit, generate_lead, contact_error, cta_click.
Payload มีเพียง event และ channel ที่กำหนดล่วงหน้า; ไม่มีชื่อ อีเมล โทรศัพท์ ข้อความ URL หรือ query string.

ยังไม่ได้ติดตั้ง collector GA4/GTM: dataLayer คือ interface พร้อมเชื่อมต่อ ไม่ใช่ระบบรายงาน traffic ที่เก็บข้อมูลย้อนหลังแล้ว. จำนวนใน CRM เป็นจำนวน Lead จากฐานข้อมูล ไม่ใช่ conversion rate ของผู้เข้าชม. ต้องตั้ง collector บน staging และตรวจ consent/duplicate counting ก่อนเปิดจริง.

## การทดสอบ

- `npm ci` และ `npm run build` ผ่านบน Node 24.
- `npm test`: 7 tests ผ่าน รวม validation, database failure, notification failure, analytics failure, legacy mapping, consent และ SQL RLS.
- SQL ใช้ PGlite PostgreSQL แยกจาก production โดยสร้าง auth fixture. ตรวจ anon insert, anon read denied, unapproved authenticated read/update denied, ห้ามเพิ่มสิทธิ์ตัวเอง, allowlisted staff เปลี่ยนทุก stage/notes/follow-up ได้, stage ผิดและ delete ถูกปฏิเสธ.
- TypeScript ตรวจ React components ที่เปลี่ยนและ imports ผ่าน. ไม่ได้อ้างว่า typecheck ทั้ง monorepo ผ่าน.
- `node tests/seo-rendered.mjs` ตรวจ built Worker ผ่าน local Wrangler: HTTP status, canonical, OG, title, JSON-LD parse, query/trailing-slash, resource detail, admin noindex และ missing-route 404.
- Runtime นี้ต้องใช้ shim เฉพาะการค้นหา local network interface เนื่องจาก os.networkInterfaces ใช้งานไม่ได้. Shim อยู่ใน scratch ไม่รวมใน repo หรือ production build.

## ขั้นตอนก่อนเผยแพร่

1. ทบทวน SQL migration `20261011150000_lead_crm_mvp.sql`; สำรอง/ตรวจ schema และ policies ปัจจุบันก่อนใช้.
2. ใช้กับ staging เท่านั้นก่อน และเพิ่ม UUID ของผู้ดูแลที่ตรวจตัวตนแล้วลง crm_admins ผ่านผู้ดูแลฐานข้อมูล. ไม่อนุญาตผู้ใช้เพิ่มสิทธิ์ตัวเอง.
3. ทดสอบ browser E2E บน staging: ส่งฟอร์มหนึ่งครั้ง, ปิด LINE notification จำลอง, ตรวจมี Lead หนึ่งรายการ, เปลี่ยนสถานะ/บันทึก/นัดติดตาม, logout และบัญชีที่ไม่มีสิทธิ์. Browser download ใน runtime นี้ไม่สำเร็จ จึงไม่อ้างว่าผ่าน E2E.
4. ตรวจจริงรายหลักสูตรที่เผยแพร่: route courses/[slug] ดึงข้อมูล Supabase และยังมี legacy soft-404 (not-found คืน 200); ต้องแก้ missing-vs-unavailable ให้ถูกต้องก่อนถือว่า dynamic-course SEO ผ่านครบ.
5. ตรวจ og-capvision.jpg บน staging: ไม่พบไฟล์ตามชื่อใน public ของ repo. ตรวจ FAQ JSON-LD ที่ใส่ร่วมทุกหน้าให้ตรงกับเนื้อหาที่ผู้ใช้เห็น และทำ dynamic sitemap สำหรับรายละเอียดหลักสูตร/บทความเป็นงานถัดไป.
6. เพิ่ม server-side anti-spam/rate limit สำหรับ public capture ก่อนเพิ่ม traffic มาก; validation/submit lock ไม่ใช่ระบบป้องกัน bot.
7. จึงขออนุมัติ migration/merge/production deployment แยกต่างหาก. งานนี้ไม่ได้ใช้ SQL กับ production และไม่ได้เปลี่ยน main.
