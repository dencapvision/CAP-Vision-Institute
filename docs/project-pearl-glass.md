# Pearl & Glass — ธีมส่วนกลางทั้งโปรเจกต์

## ขอบเขต

ใช้ design foundation เดียวกันกับ React/Vite เดิม, Astro public/Admin บน Cloudflare และ Next.js Admin แยกใน cap-vision-admin โดยไม่เปลี่ยน stack, route, Auth, RLS, Lead workflow หรือการบันทึกข้อมูล

ธีมส่วนกลางเชื่อมจาก shared app shells จึงครอบคลุมหน้าภายในและรายละเอียดหลักสูตร/ผลงาน/วิทยากร/บทความที่ใช้ Layout เดียวกัน หน้า Home ยังคงองค์ประกอบ Pearl & Glass เดิม

## สิ่งที่เปลี่ยน

- ตัวแปรสีขาวมุก น้ำเงิน Slate เส้นขอบ และเงานุ่ม
- เมนูหลัก Glass header ที่มีสีพื้นอ่านได้ทั้งบน Hero สีอ่อนและเข้ม
- Footer และ Sidebar เปลี่ยนเป็น Dark Glass; ปรับข้อความรองให้อ่านชัดขึ้น
- การ์ดผิวมุก เงานุ่ม และปุ่มหลักทรง Pill
- ฟอร์มและตัวกรองใช้ฟอนต์ 16px, เส้นขอบชัด, focus ring และ invalid state สีแดง
- ตารางใช้หัวตารางโทนอ่อน เส้นขอบบาง และแถว hover
- ลดน้ำหนัก/ขนาดหัวเรื่องภายใน และเปลี่ยน Accent ของแบรนด์เป็น Champagne ที่อ่านได้ตามพื้นสี
- รักษาสีสถานะ success/warning/error และแก้เฉพาะสีแบรนด์ ไม่มี backdrop-filter บนการ์ดทุกใบ
- reduced-motion, forced-colors และพื้นทึบสำรองสำหรับ header

## โครงสร้าง

Canonical CSS: styles/project-pearl-glass.css

สำเนาสำหรับแต่ละ runtime: apps/cap-vision-astro/src/styles/project-pearl-glass.css และ cap-vision-admin/app/project-pearl-glass.css

Marker ของ shell: data-cap-design="pearl-glass-v1"

Navigation hooks: cap-site-header, cap-site-footer, cap-admin-sidebar

ตรวจหลังเผยแพร่: node apps/cap-vision-astro/scripts/verify-project-theme.mjs https://capvisionpartner.com

ตัวตรวจต้องพบ marker และ CSS ของธีมใน Home, Services, Courses, Contact, About, Assessment, Resources, Portfolio, Speakers และ Admin Login หากหน้าใดยังเป็น build เก่าหรือ CSS หายจะไม่รายงานความสำเร็จ

## Validation

- React TypeScript/build และ Astro public typecheck/build ผ่าน
- Next.js Admin tsc และ build ผ่าน โดยใช้ Supabase URL/key แบบ fixture ไม่ใช้ข้อมูลหรือ Secret จริง
- Node tests 19 กรณีผ่าน
- Chromium ตรวจ 11 public/login routes, 320/390/768/1440px, เมนูมือถือ, ฟอนต์ฟอร์ม, การเลือกบริการ/Proposal และ redirect ผู้ไม่ได้ login ออกจาก Admin ผ่าน
- ตรวจภาพหน้า Services/Contact/Login และความชัดของพื้นสีแล้ว
- ไม่ใช้ session ลูกค้าจริง ไม่ submit ฟอร์ม ไม่เรียก LINE หรือ email

## เผยแพร่

Astro เป็นแอปที่ใช้งานจริงบน capvisionpartner.com: Deploy ด้วย workflow Deploy Astro to Cloudflare หลัง merge และตรวจทั้ง homepage verifier กับ project verifier

Next.js Admin เป็นแอปแยก: ชุดโค้ดและ build พร้อม แต่ไม่ได้เผยแพร่ไปโฮสต์ของ Next.js เพราะไม่มีปลายทางการเผยแพร่แอปแยกในขอบเขตนี้ หน้า /admin/... ของเว็บไซต์หลักใช้ Astro และได้รับธีมผ่าน AdminLayout

Rollback ด้วยการ revert commit ของชุดนี้และ build/deploy runtime เดิม ไม่มี migration
