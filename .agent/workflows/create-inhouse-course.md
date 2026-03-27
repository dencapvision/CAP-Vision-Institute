---
description: สร้างหลักสูตร In-house Training (6D CPS Model + CAP Framework)
---

// turbo-all

ยุทธศาสตร์การออกแบบหลักสูตรแบบ "AI Learning Designer" ของครูเด่น มาสเตอร์ฟา

## 🔄 Workflow: create_course_flow

ให้ปฏิบัติตามลำดับขั้นตอนดังนี้เพื่อให้ได้หลักสูตรที่พรีเมียมและตรงตาม DNA ของ CAP Vision:

1. **Category Selection**: 
   - สอบถามผู้ใช้ว่าต้องการหลักสูตรในหมวดใด (People / Work / Communication / Leader Skills)
   - อ้างอิงหมวดหมู่จาก `CourseDesign` skill

2. **Data Gathering**:
   - รวบรวมข้อมูล: Topic (หัวข้อ), Target Audience (กลุ่มเป้าหมาย), Pain Point (ปัญหาที่พบ), Expected Outcome (ผลลัพธ์ที่ต้องการ)

3. **Template Selection**:
   - ใช้ `select_course_template` เพื่อเลือกฐานการเรียนรู้ที่เหมาะสมกับหมวดหมู่

4. **Learning Flow Generation (6D CPS Model)**:
   - สร้างเนื้อหา 6 Modules: Define -> Discover -> Develop -> Decide -> Deploy -> Deep Reflection

5. **Workshop & Activities Design**:
   - ออกแบบกิจกรรม Workshop สำหรับแต่ละ Module โดยเน้น Facilitation และ Reflection

6. **Full Outline Generation**:
   - ประมวลผลข้อมูลทั้งหมดเป็น Course Outline ฉบับสมบูรณ์

7. **Format Optimization (Kruden Style)**:
   - จัดรูปแบบให้เป็นมาตรฐาน Kruden Format (ชื่อหลักสูตร, Why, Objectives, 6-Modules, ฯลฯ)

8. **Preview & Review**:
   - แสดงตัวอย่าง (Preview) ให้ผู้ใช้ตรวจสอบและแก้ไข

9. **Save & Publish**:
   - บันทึกข้อมูลลงฐานข้อมูล Supabase (ตาราง `courses`) และเตรียมแสดงผลบนเวบไซต์

---
*หมายเหตุ: ทุกขั้นตอนต้องเน้นภาษาที่เป็นมิตร ทรงพลัง และกระตุ้นการเรียนรู้แบบ Transformative Learning*
