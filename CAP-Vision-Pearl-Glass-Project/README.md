# Pearl & Glass Project Theme

PR: https://github.com/dencapvision/CAP-Vision-Institute/pull/9 (Merged)
Base main: a949798b8f9a29a2af36f240d5786476f9fe86ae
Theme commit: 789d33e4c9994f1588092ea58651ba46df21a06d
Verifier retry fix: 6183fac88d5fa65ea42ca0a676b62cf0f9ce9ddf
Deploy: https://github.com/dencapvision/CAP-Vision-Institute/actions/runs/38242730853

คัดลอกไฟล์ภายใน files/ ไปวางที่ root ของ repository ตาม path เดิม
อ่าน files/docs/project-pearl-glass.md สำหรับขอบเขต การทดสอบ และการเผยแพร่
ไม่มี migration ไม่เปลี่ยน Auth/RLS หรือ Lead workflow
Next.js Admin แยกพร้อมโค้ดและ build แต่ใช้ปลายทางการเผยแพร่ของแอปแยกเอง
ตัวตรวจหน้าภายในรองรับการ retry ระหว่าง Worker edge propagation
