# Phase 1: Security Hardening

อัปเดตนี้ตัด secret สำคัญออกจาก browser bundle และสร้าง boundary ใหม่สำหรับงานที่ต้องใช้ key ฝั่ง server

## สิ่งที่เปลี่ยนแล้ว

- เอา Gemini key ออกจาก `vite.config.ts`
- เปลี่ยน AI generator ฝั่ง client ให้เรียก `supabase.functions.invoke('ai-generate')`
- เพิ่ม Supabase Edge Function `supabase/functions/ai-generate`
- เปลี่ยน ChatBot ให้เรียก `supabase.functions.invoke('ai-chat')` แทนการ import AI SDK ใน browser
- ลบ `lib/supabaseAdmin.ts` ออกจาก Vite app
- เปลี่ยน upload slip ของ Subconscious Speaker ให้ผ่าน `uploadToR2` Edge Function
- sanitize `.env` โดยเอา `VITE_SUPABASE_service_role` และ `VITE_GEMINI_API_KEY` ออก
- เพิ่ม `.env.example` ที่แยก browser-safe env และ server-only env ชัดเจน

## กติกา Security ต่อจากนี้

- ใช้ `VITE_*` เฉพาะค่าที่ public ได้เท่านั้น เช่น Supabase URL และ anon key
- ห้ามใส่ service role, AI provider key, Resend key, LINE token หรือ payment secret ใน Vite client
- งาน upload, AI, notification, payment verification และ admin mutation ที่ต้อง bypass RLS ต้องอยู่ใน server boundary เท่านั้น
- Server boundary ที่ใช้ได้:
  - Supabase Edge Functions
  - Cloudflare Workers
  - Next.js route handlers / server actions
- Admin CRUD ที่ยังอยู่ใน root Vite app ต้องพึ่ง Supabase Auth + RLS เท่านั้นจนกว่าจะย้ายไป `cap-vision-admin`

## Secrets ที่ต้องตั้งใน Supabase/Cloudflare

```txt
GEMINI_API_KEY
ANTHROPIC_API_KEY
SERVICE_ROLE_KEY
RESEND_API_KEY
LINE_CHANNEL_ACCESS_TOKEN
CLOUDFLARE_R2_ACCESS_KEY_ID
CLOUDFLARE_R2_SECRET_ACCESS_KEY
CLOUDFLARE_R2_BUCKET
CLOUDFLARE_R2_PUBLIC_BASE_URL
```

## งานที่ยังเหลือใน Phase 1

- ตรวจ RLS policy ของ table ที่ admin CRUD ยังเรียกจาก browser
- ย้าย dashboard/admin mutations จาก root Vite ไป Next.js admin
- เพิ่ม Turnstile ให้ lead, booking และ payment proof forms
- เพิ่ม webhook signature validation ให้ payment/LINE/Resend callbacks
- rotate key ที่เคยอยู่ใน `.env` หรือเคยถูก commit/push แล้ว
