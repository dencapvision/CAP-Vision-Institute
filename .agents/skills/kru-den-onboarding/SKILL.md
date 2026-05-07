---
name: kru-den-onboarding
description: >
  ครูเด่น มาสเตอร์ฟา — ระบบ Onboarding ลูกค้าโปรเจกต์เว็บแอปพลิเคชัน ใช้ทักษะนี้ทุกครั้งที่ต้องการ:
  สร้างฟอร์มเก็บข้อมูลเพื่อการพัฒนาเว็บ (HTML พร้อมใช้งาน), สร้าง Project Brief Document,
  สร้าง Kickoff Checklist, หรือสร้างชุดคำถามที่ปรับตามประเภทธุรกิจและ Phase ที่ลูกค้าเลือก

  ต่อจาก kru-den-closing Step 6 — ใช้หลังจากลูกค้าชำระเงินและยืนยันแล้ว

  Trigger: "onboarding form", "ฟอร์มเก็บข้อมูลโปรเจกต์", "เริ่มโปรเจกต์", "ข้อมูลเพื่อพัฒนาเว็บ",
  "project brief", "kickoff form", "ลูกค้าจ่ายแล้วจะเริ่ม", "เก็บข้อมูลลูกค้า", "content gathering",
  "รับข้อมูลเพื่อพัฒนา", หรือเมื่อลูกค้าผ่านขั้นตอน Closing แล้วและพร้อมเริ่มกระบวนการพัฒนาจริง
---

# 📋 KruDen Onboarding Framework
## "เก็บทุกอย่างที่ต้องรู้ — ก่อนลงมือพัฒนาจริง"

---

## ภาพรวม Onboarding Flow

```
[STEP 6] Closing เสร็จ + ชำระเงินแล้ว
       ↓
[7A] ส่ง Onboarding Form   → ลูกค้ากรอกข้อมูลทั้งหมด
       ↓
[7B] ประมวลผล              → สร้าง Project Brief Document
       ↓
[7C] Kickoff Meeting        → ตรวจสอบข้อมูล + นัดเริ่มงาน
       ↓
[DEVELOPMENT] เริ่มพัฒนาตาม Brief
```

---

## OUTPUT ที่ต้องสร้าง

อ่าน `references/07-onboarding-sections.md` เพื่อรายละเอียดคำถามแต่ละ Section

**3 Deliverables หลัก:**

| # | Output | รูปแบบ | ส่งให้เมื่อ |
|---|---|---|---|
| 1 | Onboarding Form HTML | ไฟล์ HTML | ส่งทันทีหลัง Closing |
| 2 | Project Brief PDF | Python → PDF | หลังลูกค้ากรอกครบ |
| 3 | Kickoff Checklist | Markdown | ก่อนประชุม Kickoff |

---

## Onboarding Form — โครงสร้างมาตรฐาน (ปรับตาม Phase)

ฟอร์มแบ่งเป็น **6 Section** — ใช้ตามที่เกี่ยวข้องกับ Phase ที่ลูกค้าเลือก:

### Section 1: แบรนด์และตัวตน (ทุก Phase)
```
- ชื่อธุรกิจ (ภาษาไทย + อังกฤษ)
- Slogan / คำที่อยากให้คนจำ
- สีแบรนด์ที่ชอบ (Color Picker)
- ฟอนต์ / สไตล์ที่ชอบ (modern/classic/playful/minimal)
- เว็บไซต์/เพจที่ชอบ (อ้างอิง)
- Logo ไฟล์ (อัปโหลด PNG/SVG)
```

### Section 2: เนื้อหาหลัก (ทุก Phase)
```
- คำอธิบายธุรกิจ (ใน 3 ประโยค)
- จุดเด่น / USP ที่ไม่มีคู่แข่ง
- กลุ่มลูกค้าหลัก (อายุ, อาชีพ, ปัญหาที่แก้ให้ได้)
- รูปภาพ/วิดีโอที่มีอยู่แล้ว (อัปโหลด หรือ Link)
- รายการสินค้า/บริการ (ชื่อ + รายละเอียด + ราคา)
```

### Section 3: ระบบและฟีเจอร์ (Phase 2+)
```
- ต้องการ Login ระบบหรือไม่? (ลูกค้า/Admin/ทั้งคู่)
- ข้อมูลที่ต้องเก็บในระบบ (รายการ)
- การแจ้งเตือน (Email / LINE / SMS)
- ต้องการ Booking/Reservation หรือไม่?
- Dashboard ที่ต้องการดู (ข้อมูลอะไรบ้าง)
- Integrations ที่ใช้อยู่ (LINE, Facebook, Google, อื่นๆ)
```

### Section 4: เนื้อหา + สื่อ (ทุก Phase)
```
- ข้อความหน้าแรก (Hero Text)
- ข้อความ About Us
- รายการหมวดหมู่สินค้า/บริการ
- คำถามที่ลูกค้าถามบ่อย (FAQ) อย่างน้อย 5 ข้อ
- Social Media ที่ใช้ (URL ทั้งหมด)
- เบอร์โทร + Line + Email + ที่อยู่สำหรับหน้าติดต่อ
```

### Section 5: เทคนิค (Phase 2-3)
```
- Domain ที่ต้องการ (.com / .co.th / อื่นๆ)
- มี Email ธุรกิจ (@domain) หรือไม่?
- ระบบเดิมที่ใช้อยู่ (ถ้ามี) — ต้องย้ายข้อมูล?
- ต้องการ Multi-language? (ไทย/อังกฤษ/อื่นๆ)
- ต้องการระบบชำระเงิน Online? (SCB / PromptPay / Stripe)
```

### Section 6: Timeline และความคาดหวัง (ทุก Phase)
```
- วันที่ต้องการเปิดตัวเว็บ
- งานอีเวนท์/แคมเปญที่ต้องเปิดตัวทัน (ถ้ามี)
- ความคาดหวังสูงสุดจากเว็บนี้
- สิ่งที่กลัวมากที่สุดเกี่ยวกับโปรเจกต์
- คำถามที่ยังค้างใจ (Free text)
```

---

## Project Brief PDF — โครงสร้าง

```
1. Cover          — ชื่อโปรเจกต์ + เลขที่ + วันที่
2. Business Intel — ข้อมูลแบรนด์ + USP + Target
3. Design Brief   — สี + ฟอนต์ + Reference + Mood
4. Feature Spec   — รายการ Feature แต่ละ Phase
5. Content Map    — Sitemap + หน้าที่ต้องมี
6. Tech Spec      — Domain + Integration + Data
7. Timeline       — Milestones + Delivery dates
8. Next Steps     — Checklist ก่อน Kickoff
```

---

## คำสั่งลัด

```
"onboarding form [ธุรกิจ] Phase [1/2/3]"
→ สร้าง Onboarding Form ที่ตรงกับ Phase ที่เลือก
  (Phase 1 = Section 1,2,4,6 | Phase 2+ = ครบทุก Section)

"onboarding form ครบ [ธุรกิจ]"
→ สร้างฟอร์มครบทุก Section (เหมาะเมื่อลูกค้าเลือกหลาย Phase)

"brief pdf [ธุรกิจ]"
→ สร้าง Project Brief PDF จากข้อมูลที่มี

"kickoff checklist [ธุรกิจ]"
→ สร้าง Kickoff Checklist Markdown

"onboarding ครบ [ธุรกิจ]"
→ สร้าง HTML Form + Brief Template + Checklist พร้อมกัน
```

---

## Design Guidelines

**Onboarding Form HTML:**
- ต้องรู้สึก "ง่าย ไม่หนัก" — แสดงทีละ Section
- Progress indicator ด้านบน (Section X/6)
- Save draft ได้ (localStorage) — กลับมากรอกต่อได้
- Tooltip อธิบายทุก field ที่อาจสับสน
- Upload preview สำหรับรูปและ Logo
- Mobile-first — ลูกค้ากรอกบนมือถือได้สบาย
- สีและ Font สอดคล้องกับ Demo เดิมของโปรเจกต์

**Project Brief PDF:**
- ใช้ฟอนต์ไทย Garuda + Norasi
- สีแบรนด์ CAP Vision: Navy + Gold
- Clean, minimal — ใช้เป็น Reference ตลอดโปรเจกต์

---

## Sections ตาม Phase

| Section | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| 1. แบรนด์และตัวตน | ✓ | ✓ | ✓ |
| 2. เนื้อหาหลัก | ✓ | ✓ | ✓ |
| 3. ระบบและฟีเจอร์ | — | ✓ | ✓ |
| 4. เนื้อหา + สื่อ | ✓ | ✓ | ✓ |
| 5. เทคนิค | — | ✓ | ✓ |
| 6. Timeline | ✓ | ✓ | ✓ |

---

> อ่าน `references/07-onboarding-sections.md` เพื่อดูคำถามเต็มและ Hint แต่ละ field
> อ่าน `references/07-brief-template.md` เพื่อ Python code สร้าง Project Brief PDF
