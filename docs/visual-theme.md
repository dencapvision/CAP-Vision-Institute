# CAP Vision · Pearl & Glass Theme

## ทิศทางการออกแบบ

ถอดหลักการจากภาพอ้างอิง 4 ภาพ: เงานุ่มและพื้นผิวนูน (Neumorphism), กระจกโปร่งแสง (Glassmorphism), การจัดวัตถุสามมิติบนพื้นที่ว่าง และการวางหัวเรื่องสั้นเหนือภาพที่มีระยะหน้า–หลัง

ธีมสำหรับ CAP Vision: ขาวมุก ฟ้าเทา น้ำเงิน และเขียว Sage เป็นรายละเอียด ใช้ Sarabun สำหรับภาษาไทยและ Playfair Display สำหรับข้อความภาษาอังกฤษบางส่วน

ใช้หลักการของภาพเป็นแรงบันดาลใจ ไม่ฝังภาพตัวอย่างที่มีชื่อแบรนด์หรือข้อความของผู้อื่น องค์ประกอบสามมิติใน Hero สร้างด้วย CSS gradient, radius และเงา ไม่ใช้ภาพขนาดใหญ่หรือ WebGL

## Design tokens

| Token | Value | หน้าที่ |
| --- | --- | --- |
| --cap-ink | #172b43 | ข้อความหลัก |
| --cap-muted | #526578 | คำอธิบาย |
| --cap-blue | #315e84 | ส่วนเน้น |
| Background | #f5f7f8 | พื้นขาวมุก |
| --cap-radius | 30px | มุมการ์ด |
| Button | #284f72 | CTA หลัก |

CSS ทั้งหมดอยู่ใต้ .cap-theme ไม่เปลี่ยนสไตล์ฟอร์ม Admin หรือระบบภายใน มี focus-visible, reduced-motion และพื้นทึบสำรองเมื่อ backdrop-filter ไม่รองรับ

## หน้าแรกใหม่

- Hero สั้น + ประติมากรรมสามมิติ + Glass panel
- โซลูชัน 4 การ์ด: แต่ละการ์ดมีหัวเรื่อง คำอธิบายหนึ่งประโยค และทางไปบริการ/ปรึกษา
- CAP Framework 3 ขั้น สรุปให้เห็นภาพ
- หมวดหลักสูตร 4 หมวด และหลักสูตรจากข้อมูลเดิมสูงสุด 3 รายการ
- ภาพจริงของครูเด่น เชื่อมไปวิทยากรและผลงาน
- บทความ 3 หัวเรื่อง เชื่อมเนื้อหาเต็ม
- Closing CTA และเมนูทางลัด 6 ปลายทาง

ย้ายคำอธิบายเชิงลึกไปยังหน้าเดิมที่มีอยู่ ลดข้อความซ้ำและคำรับรองที่ไม่มีหลักฐาน ไม่สร้าง Testimonial หรือผลลัพธ์ลูกค้าใหม่

## Files

React: pages/Home.tsx, components/home/ThemeHome.tsx, styles/cap-theme.css
Astro: src/components/HomePage.tsx, src/components/home/ThemeHome.tsx, src/styles/cap-theme.css ภายใน apps/cap-vision-astro

ทั้งสองแอปใช้หน้าแรกแบบเดียวกัน โดยแยกเส้นทาง import ระบบดึงหลักสูตร ใช้ contact-context และฟอร์มจาก PR #6 ต่อ ไม่มี migration

## Validation

- React TypeScript/build และ Astro public typecheck/build ผ่าน
- ชุดทดสอบเดิม 15 กรณีผ่าน
- Chromium: H1 เดียว, 4 consultation flows, เปลี่ยนบริการในฟอร์มได้, proposal intent, unknown query fallback, service anchor และเมนูทางลัดผ่าน
- ตรวจการล้นแนวนอน 320, 390, 768, 1440px ผ่าน
- ตรวจภาพเดสก์ท็อป/มือถือโดยใช้ Sarabun ภายใน QA และปิด network ภายนอก; ไม่ส่งฟอร์มหรือแจ้งเตือนจริง
- Cloudflare hosting preview ยังต้องตรวจเพิ่มเติมก่อน deploy; สภาพแวดล้อมนี้ไม่รองรับ Astro background runtime เดิม

## นำเข้า

ใช้ branch feat/visual-theme-20261012 หรือคัดลอกไฟล์ภายใน files/ ของ ZIP ไปวางตาม path เดิมใน repository root

```sh
npm ci --legacy-peer-deps
npm run build
cd apps/cap-vision-astro
npm ci
npm test
npm run typecheck:public
npm run build
```

ตรวจ Hosting Preview และอนุมัติก่อน Merge/Deploy Production; rollback ด้วยการ revert commit ของธีม ไม่มีผลต่อข้อมูล Lead
