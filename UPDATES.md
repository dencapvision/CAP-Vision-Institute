# บันทึกการอัปเดต

## 2026-05-07

- เริ่มวางโครง `KruDen Core Engine` เป็น package กลางของโปรเจกต์
- เพิ่ม core contracts สำหรับ UI, Auth, CRM, Payment, Notification, AI Agent, Analytics, Admin และ Automation
- เพิ่ม integration contracts สำหรับ Cloudflare, Resend และ LINE
- เพิ่ม database package สำหรับเตรียมรวม Supabase generated types ในอนาคต
- เพิ่มเอกสาร `docs/ARCHITECTURE.md` และ `docs/MIGRATION_ROADMAP.md`
- เชื่อม packages ใหม่ผ่าน TypeScript path aliases โดยยังไม่เปิด npm workspaces เพื่อลดความเสี่ยงกับ deploy เดิม
- ยังไม่ย้าย route หรือแก้ production flow เดิม เพื่อให้ระบบเดิมยังทำงานต่อได้ระหว่าง migration
- เริ่ม Phase 1 Security Hardening: ตัด Gemini key ออกจาก Vite config, ย้าย AI generation ไป Supabase Edge Function, เปลี่ยน ChatBot ให้เรียก `ai-chat` server function, ลบ `lib/supabaseAdmin.ts`, และ sanitize `.env`
