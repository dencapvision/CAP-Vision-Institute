# CAP Vision Home Journey Update

Base: `6fb1b5a98a5e36a9cb2a046caf7cf5ada01ad060` (main).

## ผลลัพธ์

หน้า Home ให้ผู้ชมเลือกโจทย์องค์กร 4 ด้าน แล้วอ่านบริการตรงหมวดหรือปรึกษาโดยฟอร์มเลือกบริการให้ล่วงหน้า มีทางลัดไปบริการ หลักสูตร แบบประเมิน ผลงาน วิทยากร และคลังความรู้ พร้อมปุ่มขอใบเสนอราคาและ CAP Framework

ปรับทั้ง React/Vite เดิม (`pages/Home.tsx`, `pages/Contact.tsx`) และ Astro/Cloudflare (`apps/cap-vision-astro/src/components/HomePage.tsx`, `ContactPage.tsx`) เนื่องจาก repository มีสองแอป มี HomeNavigation และ contact-context แยกเป็นส่วนที่ใช้ซ้ำได้ภายในแต่ละแอป

## เส้นทาง

- การ์ดโจทย์ → `/services#leadership`, `#people-team`, `#culture`, `#customized`
- ปรึกษาโจทย์ → `/contact?source=home&intent=consultation&service=<service>`
- ขอใบเสนอราคา → `/contact?source=home&intent=proposal`
- หมวดหลักสูตรเดิมและรายละเอียดหลักสูตรยังใช้เส้นทางเดิม
- CAP Framework → `/about#cap-framework`

ใช้หน้า services ที่ตรวจว่ามีจริงทั้งสองแอป แทน SEO landing routes ที่มีเฉพาะแอป React ปัจจุบัน ฟอร์มรับเฉพาะ service ที่อยู่ในรายการที่กำหนด; ค่าอื่นกลับไปเริ่มเลือกบริการ ผู้ใช้เปลี่ยนบริการได้ ข้อมูลชื่อและข้อมูลติดต่อไม่ถูกส่งผ่าน URL

## CRM และความปลอดภัย

ไม่ต้อง migration ไม่แก้ RLS ไม่แก้สิทธิ์ Admin และไม่เปลี่ยน source ของ lead จาก `contact_form` เพื่อรักษากฎตรวจข้อมูลของฐานข้อมูล เพิ่ม `Origin: home_consultation` หรือ `Origin: home_proposal` ใน interest_topic หลังรายละเอียดความต้องการเฉพาะกรณีมาจาก Home; เป็นบริบทจากผู้ใช้ ไม่ใช่หลักฐานยืนยันแหล่งที่มา

ระบบแจ้งเตือนและ guard ที่ป้องกัน preview เขียนข้อมูลจริงยังใช้ของเดิม

## ตรวจคุณภาพ

- Astro: npm test (15 ผ่าน), npm run typecheck:public และ npm run build ผ่าน
- React: npm ci --legacy-peer-deps และ npm run build ผ่าน (peer conflict React 19/react-helmet-async เป็นข้อจำกัดเดิม)
- Chromium ตรวจ React UI: 4 บริการถูกเลือกตรงลิงก์และเปลี่ยนได้, proposal intent, URL ที่ไม่รู้จัก, service anchor, hub 6 ปลายทาง, จอ 320–1440px และไม่มี page error ผ่าน
- ไม่ส่งแบบฟอร์ม ไม่เขียนฐานข้อมูลจริง ไม่ส่ง LINE/อีเมลจริง และไม่ deploy
- Astro Cloudflare dev background runtime เริ่มไม่ได้ในสภาพแวดล้อมนี้; build/typecheck/unit tests ผ่าน แต่ต้องตรวจ hosting preview และ workflow จริงก่อนปล่อย production
- แก้ข้อผิดพลาดเดิมที่พบจากการเพิ่ม Home/Contact เข้า typecheck: import Course ผิดตำแหน่ง, import Trophy ที่ขาด และ style ของ custom icon

## นำเข้าใน Antigravity

ใช้ branch `feat/home-journey-20261012` หรือแตก ZIP และคัดลอกไฟล์ภายใน `files/` ไปที่ root ของ repository ตาม path เดิม ชุดนี้เป็นไฟล์ที่เปลี่ยนจาก base ด้านบน ไม่ใช่ repository ทั้งชุด

```sh
# React/Vite
npm ci --legacy-peer-deps
npm run build

# Astro/Cloudflare
cd apps/cap-vision-astro
npm ci
npm test
npm run typecheck:public
npm run build
```

ตรวจ preview: Home → การ์ดโจทย์ → Services; Home → ปรึกษา → บริการเลือกไว้; Home → ขอใบเสนอราคา → intent ถูกต้อง; เปลี่ยนบริการได้; หลักสูตร/ผลงาน/วิทยากร/บทความเปิดได้; เมนูและมือถือใช้งานได้ จากนั้นขออนุมัติก่อน merge/deploy production

Rollback: revert commit ของชุดนี้แล้ว build/deploy ผ่าน workflow ที่อนุมัติไว้ ไม่ต้องเปลี่ยนฐานข้อมูล
