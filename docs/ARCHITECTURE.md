# KruDen Core Engine Architecture

เอกสารนี้เป็นเป้าหมายสถาปัตยกรรมใหม่ของ CAP Vision / KruDen Platform โดยแยกหน้าที่ให้ชัดเจนระหว่าง Next.js, Supabase, Cloudflare, Resend, LINE และ Core Engine กลางของระบบ

## Target Architecture

```txt
User
  ↓
Cloudflare DNS / CDN / WAF / Turnstile / R2 / Workers / Queues
  ↓
Next.js + TypeScript + Tailwind
  ↓
KruDen Core Engine
  ↓
Supabase Auth / Postgres / RLS / Realtime / Edge Functions
  ↓
Resend / LINE / Payment Gateway / AI APIs
```

## Application Boundaries

```txt
apps/
  web/        Public website, landing pages, SEO pages, lead capture
  admin/      Protected CMS, CRM, payments, analytics, automation
  portal/     Member/client portal when needed

packages/
  core/       Business contracts and shared domain logic
  database/   Supabase generated types and table contracts
  integrations/ Cloudflare, Resend, LINE, payment, AI contracts
```

ช่วงเปลี่ยนผ่านยังคงให้ root Vite app และ `cap-vision-admin` ทำงานได้ตามเดิม แต่โค้ดใหม่ควรเริ่มย้ายเข้าขอบเขตด้านบนทีละส่วน

## Core Systems

### Core UI System

เป็น design system กลางสำหรับปุ่ม ฟอร์ม ตาราง modal layout dashboard empty state loading state และ navigation ใช้ร่วมกันระหว่าง web, admin และ portal

### Auth System

ใช้ Supabase Auth เป็น identity provider และบังคับ role-based access ผ่าน middleware/server-side logic ห้ามตรวจสิทธิ์เฉพาะฝั่ง browser สำหรับงาน admin หรือข้อมูลสำคัญ

### CRM Core

เป็น source of truth ของ leads, contacts, companies, deals, pipeline stage, owner, follow-up และ lead score

### Payment Core

ดูแล order, invoice, payment proof, payment status, webhook, receipt และ phase payment โดยให้ server เป็นผู้ยืนยันสถานะเสมอ

### Notification Core

รวม Resend และ LINE ให้เป็น queue-based workflow เช่น lead ใหม่, booking ใหม่, ชำระเงินแล้ว, แจ้งทีม, ยืนยันลูกค้า

### AI Agent Core

เป็นชั้นกลางสำหรับ lead qualification, course recommendation, sales assistant, content generation และ admin assistant โดยไม่เรียก provider key จาก browser

### Analytics Core

บันทึก event เช่น page view, CTA click, lead created, booking created, payment completed, AI agent used และ admin action เพื่อทำ funnel และ conversion dashboard

### Admin Core

ควบคุม module registry, admin navigation, permissions, audit log และ CMS operations

### Automation Core

เป็น workflow engine เช่น `lead.created -> send.line -> send.email -> create.task -> update.lead`

## Cloudflare Role

Cloudflare ควรเป็นหน้าด่านของระบบ:

- DNS และ CDN สำหรับเว็บหลัก
- WAF, bot protection และ Turnstile สำหรับ form สำคัญ
- R2 สำหรับ public media assets
- Workers สำหรับ signed upload, webhook proxy, rate limit และ lightweight APIs
- Queues สำหรับงาน notification และ automation ที่ไม่ควรบล็อก request หลัก

R2 public URL ปัจจุบัน:

```txt
https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev
```

ควรเปลี่ยนเป็น custom domain เช่น:

```txt
https://media.capvisionpartner.com
```

## Security Rules

- ห้ามใช้ Supabase service role ใน Vite/React/browser
- ห้าม expose AI provider key ผ่าน `VITE_*`
- Admin mutations ต้องอยู่ใน Next.js server actions, route handlers, Supabase Edge Functions หรือ Cloudflare Workers
- RLS ต้องเป็น safety net ของทุก table สำคัญ
- Webhook ต้อง validate signature หรือ shared secret
- Upload ต้องผ่าน signed URL หรือ server-side validation

## Standard Lead Flow

```txt
Lead form submit
  ↓
Validate Turnstile
  ↓
Insert Supabase leads
  ↓
Emit lead.created
  ↓
AI Agent Core score/qualify
  ↓
Notification Core sends LINE + Resend
  ↓
Automation Core creates follow-up task
  ↓
Analytics Core records conversion
  ↓
Admin Core displays in dashboard
```
