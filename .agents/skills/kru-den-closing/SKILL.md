---
name: kru-den-closing
description: >
  ครูเด่น มาสเตอร์ฟา — ระบบปิดการขายโปรเจกต์เว็บแอปพลิเคชัน ใช้ทักษะนี้ทุกครั้งที่ต้องการ:
  สร้างฟอร์มสมัคร/ปิดการขาย (HTML พร้อมใช้งาน), ยืนยันการชำระเงิน, ออกเอกสารยืนยันการดำเนินงานตาม Phase,
  ส่ง LINE Flex Message แจ้งเตือนลูกค้าใหม่ไปที่ @denmasterfa อัตโนมัติ, หรือสร้างชุดคำสั่งที่ใช้ซ้ำได้สำหรับลูกค้าแต่ละราย

  ต่อจาก kru-den-webdev Step 5 (Proposal) — เมื่อลูกค้าสนใจและพร้อมจะเริ่มโปรเจกต์

  Trigger: "ฟอร์มปิดการขาย", "ฟอร์มสมัคร", "ลูกค้าจะจ่ายเงิน", "ยืนยันการชำระ", "closing form",
  "สัญญาเริ่มโปรเจกต์", "ยืนยัน Phase", "ลูกค้าตกลง", "ปิดดีล", "เริ่มสัญญา",
  "payment confirmation", หรือเมื่อลูกค้าผ่าน Demo + Proposal แล้วและพร้อมจะเซ็นสัญญา/ชำระเงิน
---

# 💰 KruDen Closing Framework
## "จาก Demo สู่สัญญา — ทุกขั้นตอนที่ลูกค้ายืนยัน"

---

## ภาพรวม Closing Flow

```
[STEP 5] Proposal ส่งแล้ว
       ↓
[6A] ฟอร์มสมัคร/ปิดการขาย   → ลูกค้ากรอกข้อมูล + เลือก Phase
       ↓
[6B] ยืนยันข้อมูลเบื้องต้น   → Summary Card + เงื่อนไข
       ↓
[6C] แจ้งชำระเงิน            → QR / โอนเงิน + หลักฐาน
       ↓
[6D] ยืนยันการดำเนินงาน      → PDF Confirmation + Timeline
       ↓
[STEP 7] kru-den-onboarding  → เก็บข้อมูลเริ่มโปรเจกต์
```

---

## OUTPUT ที่ต้องสร้าง

อ่าน `references/06-closing-outputs.md` เพื่อรายละเอียดแต่ละ output

**3 Deliverables หลัก:**

| # | Output | รูปแบบ | ใช้เมื่อ |
|---|---|---|---|
| 1 | Closing Form HTML | ไฟล์ HTML | ส่งให้ลูกค้ากรอกออนไลน์ |
| 2 | Confirmation PDF | Python → PDF | หลังยืนยันชำระเงินแล้ว |
| 3 | Phase Kickoff Doc | Markdown | ส่งพร้อม Confirmation |

---

## Closing Form — โครงสร้างมาตรฐาน

ฟอร์มมี **4 Section** เสมอ:

### Section 1: ข้อมูลผู้ว่าจ้าง
```
- ชื่อ-นามสกุล (เจ้าของโปรเจกต์)
- ชื่อธุรกิจ / แบรนด์
- เบอร์โทรศัพท์ + LINE ID
- อีเมลสำหรับรับเอกสาร
- ที่อยู่ (สำหรับออกใบเสร็จ ถ้าต้องการ)
```

### Section 2: เลือก Phase และยืนยันราคา
```
- Checkbox เลือก Phase (1 / 2 / 3 หรือหลาย Phase)
- แสดงราคารวมแบบ Dynamic
- เงื่อนไขการชำระ (งวด 1 = 50% ก่อนเริ่ม, งวด 2 = 50% ส่งมอบ)
- วันที่ต้องการเริ่มโปรเจกต์
```

### Section 3: ยืนยันการชำระเงิน
```
- แสดง QR Code โอนเงิน (หรือ PromptPay)
- ชื่อบัญชี + เลขบัญชี (กรอกจาก config)
- ช่องอัปโหลดหลักฐานการโอน (รูปภาพ)
- วันที่โอน + เวลา + จำนวนเงิน
```

### Section 4: ข้อตกลงและยืนยัน
```
- Checkbox ยอมรับเงื่อนไขการทำงาน
- Checkbox ยืนยันว่าข้อมูลถูกต้อง
- ลายมือชื่ออิเล็กทรอนิกส์ (Canvas Signature)
- ปุ่ม "ยืนยันและส่งใบสมัคร"
```

---

## Confirmation PDF — โครงสร้าง

หลังลูกค้าชำระเงินและยืนยันแล้ว ออก PDF ให้ประกอบด้วย:

```
1. Header          — ชื่อบริษัท + เลขที่สัญญา + วันที่
2. ข้อมูลสัญญา    — ลูกค้า / ผู้ให้บริการ / Phase ที่เลือก
3. ขอบเขตงาน     — Feature list ตาม Phase ที่ชำระ
4. Timeline        — วันเริ่ม / Milestone / วันส่งมอบ
5. เงื่อนไขงวดเงิน — งวดที่ชำระแล้ว + งวดที่เหลือ
6. ลายเซ็น        — ฝ่ายลูกค้า + ฝ่ายผู้พัฒนา
7. Footer          — ติดต่อ + เลขที่ใบเสร็จ
```

---

## คำสั่งลัด

```
"closing form [ธุรกิจ] Phase [1/2/3]"
→ สร้าง Closing Form HTML ครบ 4 Section
  พร้อม Phase ที่ระบุ + ราคา auto-calculate

"closing form ครบ [ธุรกิจ]"
→ สร้าง Closing Form ให้เลือก Phase ได้ทุกแบบ

"confirm pdf [ธุรกิจ] [Phase] [ราคา]"
→ สร้าง Confirmation PDF หลังชำระเงิน

"closing ครบ [ธุรกิจ]"
→ สร้าง HTML Form + PDF Template พร้อมกัน
```

---

## ข้อมูลบัญชีรับชำระ (พร้อมใช้ทุกโปรเจกต์)

```
ชื่อบัญชี:   นายอนุสรณ์ หนองนา
ธนาคาร:     กรุงเทพ (BBL) ออมทรัพย์ สาขาถนนอโศกมนตรี
เลขบัญชี:   925-0-13747-9
PromptPay:  3-4506-00689-95-1
LINE OA:    @denmasterfa | https://lin.ee/X9Ch25o
User ID:    Ue652c6a963399b81a811eb04fe88c123
```

---

## LINE Flex Message — Notify อัตโนมัติ

ทุก Closing Form ต้องเรียก `sendLineNotify(data)` เมื่อ Submit  
อ่าน template เต็มใน `references/06-payment-config.md`

```javascript
// เรียกหลัง submit form สำเร็จ
sendLineNotify({
  contractId, name, biz, email, lineId,
  phases, payLabel, todayAmt, totalAmt, startDate
});
```

---

## Design Guidelines

**Closing Form HTML:**
- ใช้สี + Font จาก Demo ของโปรเจกต์นั้น (ความต่อเนื่อง)
- Progress Bar 4 ขั้นตอนด้านบน + **2 ทางเลือกการชำระ (Card Selector)**
- **ฝัง QR PromptPay จริง** (base64 จาก 576297.jpg) + **QR LINE** (@denmasterfa)
- Mobile-first (ลูกค้ากรอกบนมือถือเป็นส่วนใหญ่)
- Validation ทุก field ก่อน Submit
- Success State สวยงาม + ปุ่ม "ส่งสลิป @denmasterfa"
- **LINE Flex Message Notify** → @denmasterfa อัตโนมัติ

**Confirmation PDF:**
- ใช้ฟอนต์ไทย (Garuda + Norasi จาก TLWG)
- สีหลัก Navy + Gold (สีแบรนด์ CAP Vision)
- มีเลขที่เอกสาร auto-generate: `CV-YYYY-XXXX`

---

> อ่าน `references/06-closing-outputs.md` ก่อนสร้าง output ทุกครั้ง
> อ่าน `references/06-payment-config.md` เพื่อข้อมูลบัญชีรับชำระเงิน
