---
description: แนวทางการออกแบบและสร้าง Web Component สไตล์พรีเมี่ยม (CAP-Vision Style) — เน้น Contrast และการประหยัด Token
---

# 🚀 CAP-Vision Premium Design & Code Workflow

Workflow นี้ถูกออกแบบมาเพื่อให้การพัฒนา UI ในอนาคตมีความสม่ำเสมอ รวดเร็ว และประหยัด Token มากที่สุด โดยยึดมาตรฐานความสวยงามระดับ Professional

## 1. การวิเคราะห์และความต้องการ (Planning & Context)
*   **Identify UI Complexity**: วิเคราะห์ว่าส่วนนี้เป็น Hero, Carousel, Content Card หรือ Landing Page
*   **Search Skills**: ค้นหา Skill ที่เกี่ยวข้องก่อนเสมอเพื่อใช้ความสามารถสูงสุดที่ติดตั้งไว้ (เช่น `npx skills find ui-ux-pro-max`)
*   **Check Contrast First**: หากมีภาพพื้นหลัง ต้องวางแผนใช้ Gradient Overlay และ Text Shadow ตั้งแต่แรก

## 2. การกำหนด Design System (Tokens)
*   **Colors (HSL)**: 
    *   Navy (Primary): `bg-[#0f3460]`
    *   Gold (Accent): `text-[#c5a059]`
*   **Typography**: ใช้ `nav-font` สำหรับหัวข้อที่ดูแพง และ Google Fonts (Inter/Sarabun)
*   **Animation**: ใช้ `animate-fade-in-up` หรือ `animate-fade-in-down` เสมอ

## 3. การลงมือทำ (Execution - Premium Style)
*   **Layout**: เน้น Glassmorphism (`backdrop-blur-xl`) และ Border `white/10`
*   **Image Overlays**: 
    *   ใช้ Gradient: `bg-gradient-to-t from-[#0f3460] via-[#0f3460]/70 to-transparent`
    *   ใช้ `object-cover` และเพิ่ม `scale` เวลา hover เพื่อให้ภาพดูมีชีวิต
*   **Text Readability**:
    *   ใช้ `drop-shadow-xl` หรือ `drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]` กับพาดหัว (Headlines)
    *   ใช้ `text-white/90` หรือ `text-blue-50` สำหรับคำบรรยาย เพื่อให้สบายตา

## 4. การตรวจสอบคุณภาพ (Verification & SEO)
*   **Responsive**: ตรวจสอบที่ 640px, 768px, 1024px
*   **Accessibility (A11y)**: ตัวหนังสือต้องไม่อ่านยากบนรูปภาพ (Contrast >= 4.5:1)
*   **SEO**: ใส่ `title`, `meta description` และ `semantic HTML` เสมอ

## 5. การประหยัด Token
*   **Targeted Edits**: ใช้ `replace_file_content` หรือ `multi_replace_file_content` เฉพาะจุด
*   **Code Reusability**: สร้าง Component แยกเป็นไฟล์ใน `/components` เพื่อให้ Import ไปใช้ได้หลายที่
