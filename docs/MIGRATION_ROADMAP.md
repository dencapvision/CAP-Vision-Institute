# KruDen Core Engine Migration Roadmap

แผนนี้ออกแบบให้ย้ายระบบแบบค่อยเป็นค่อยไป ไม่หยุดเว็บเดิม และลดความเสี่ยงจากการ refactor ครั้งใหญ่

## Phase 0: Foundation

- เพิ่ม `packages/core`, `packages/database`, `packages/integrations`
- กำหนด contract กลางของ Auth, CRM, Payment, Notification, AI Agent, Analytics, Admin และ Automation
- เพิ่มเอกสาร architecture และ security rules
- เปิดใช้งานผ่าน TypeScript path aliases ก่อน ยังไม่เปิด npm workspaces เพื่อไม่กระทบ lockfile/deploy เดิม
- ยังไม่เปลี่ยน route production

สถานะ: เริ่มดำเนินการแล้ว

## Phase 1: Security Hardening

- เอา Supabase service role ออกจาก Vite app
- ย้าย AI provider calls จาก browser ไป server-side function
- แยก admin mutations ไป Next.js route handlers หรือ Supabase Edge Functions
- เพิ่ม Turnstile ให้ lead/booking/payment forms

ผลลัพธ์ที่ต้องได้: ไม่มี secret สำคัญอยู่ใน client bundle

สถานะ: เริ่มดำเนินการแล้ว โดยตัด Gemini/service role ออกจาก Vite bundle, เพิ่ม `ai-generate` Edge Function และลบ `lib/supabaseAdmin.ts` ออกจาก root client app แล้ว

## Phase 2: Admin Consolidation

- เลือก `cap-vision-admin` เป็น admin หลัก
- freeze หรือ redirect `/dashboard/*` ใน root Vite app
- ย้าย dashboard modules ทีละตัวเข้า Next.js admin
- ใช้ `Admin Core` เป็น registry ของ modules และ permissions

ผลลัพธ์ที่ต้องได้: มี admin เดียว ไม่ซ้ำซ้อน

## Phase 3: CRM + Notification Workflow

- รวม lead/contact/deal schema เข้า CRM Core
- สร้าง `lead.created` workflow
- ส่ง LINE alert ให้ทีม
- ส่ง Resend confirmation ให้ลูกค้า
- บันทึก notification receipt

ผลลัพธ์ที่ต้องได้: lead ใหม่มี workflow ครบ ไม่พึ่ง manual follow-up

## Phase 4: Cloudflare Media Layer

- ตั้ง custom domain สำหรับ R2 เช่น `media.capvisionpartner.com`
- ย้าย public media ไป R2
- สร้าง upload API หรือ Worker สำหรับ signed upload
- เพิ่ม cache rules สำหรับรูปและ static assets

ผลลัพธ์ที่ต้องได้: media เร็วขึ้น คุมต้นทุนและ cache ได้ดีขึ้น

## Phase 5: Payment Core

- สร้าง order/payment model กลาง
- รองรับ manual transfer proof ก่อน
- เตรียม payment gateway webhook
- ส่ง receipt ผ่าน Resend และ LINE alert ผ่าน Notification Core

ผลลัพธ์ที่ต้องได้: payment status น่าเชื่อถือ ตรวจสอบย้อนหลังได้

## Phase 6: AI Agent Core

- ย้าย course generator, caption generator, article generator และ chat agent เข้าชั้น AI Agent Core
- บังคับ provider calls ผ่าน server-side เท่านั้น
- เพิ่ม logging, cost tracking และ safety guard

ผลลัพธ์ที่ต้องได้: AI เป็น service กลาง ไม่กระจายตาม component/page

## Phase 7: Analytics + Automation

- เก็บ event สำคัญเข้า Analytics Core
- สร้าง funnel dashboard
- เพิ่ม Automation Core สำหรับ follow-up, queue jobs และ webhook

ผลลัพธ์ที่ต้องได้: เห็น conversion funnel และ automation ที่ตรวจสอบได้
