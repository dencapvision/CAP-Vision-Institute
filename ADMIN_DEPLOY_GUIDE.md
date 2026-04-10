# คู่มือการติดตั้ง CAP Vision Admin Portal (Deployment Guide)

เนื่องจากระบบ Admin เป็นโปรเจกต์ Next.js ซึ่งต้องการสภาพแวดล้อมที่ต่างจากเว็บหลัก ครูเด่นต้องดำเนินการตามขั้นตอนดังนี้ครับ:

---

## ขั้นตอนที่ 0: ตั้งค่า Environment Variables (ทำครั้งเดียว)
ก่อนจะรันสคริปต์ ให้สร้างไฟล์ `.env.local` ภายในโฟลเดอร์ `cap-vision-admin` โดยคัดลอกค่าจากไฟล์ `.env` หลักในโปรเจกต์มาใส่ดังนี้ครับ:

1. **NEXT_PUBLIC_SUPABASE_URL** = (ใช้ค่าเดียวกับ VITE_SUPABASE_URL)
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** = (ใช้ค่าเดียวกับ VITE_SUPABASE_ANON_KEY)
3. **SUPABASE_SERVICE_ROLE_KEY** = (ใช้ค่าเดียวกับ VITE_SUPABASE_service_role)
4. **NEXT_PUBLIC_SITE_URL** = `https://admin.capvisionpartner.com`

---

## ขั้นตอนที่ 1: รันสคริปต์ Deploy จากเครื่องคอมพิวเตอร์
รันสคริปต์ที่ผมเตรียมไว้ให้เพื่อส่งไฟล์ขึ้นเซิร์ฟเวอร์ครับ:

```powershell
./scripts/deploy-admin.ps1
```
*สคริปต์นี้จะทำการ build โปรเจกต์ที่โฟลเดอร์ `cap-vision-admin` และส่งไฟล์ไปที่ `/var/www/cap-vision-admin/` บนเซิร์ฟเวอร์ครับ*

---

## ขั้นตอนที่ 2: ติดตั้ง Dependencies บนเซิร์ฟเวอร์
ให้ครูเด่น SSH เข้าไปยังเซิร์ฟเวอร์ (IP 76.13.21.197) และรันคำสั่งดังนี้:

```bash
cd /var/www/cap-vision-admin
npm install --production
```

---

## ขั้นตอนที่ 3: รันระบบ Admin ด้วย PM2
เพื่อให้ระบบทำงานตลอดเวลา แม้จะปิด Terminal ไปแล้ว:

```bash
# หากยังไม่มี pm2 ให้ติดตั้งก่อน
npm install -g pm2

# เริ่มทำงานระบบ Admin บน Port 3001
pm2 start npm --name "cap-vision-admin" -- start
```

---

## ขั้นตอนที่ 4: ตั้งค่า Nginx สำหรับ Subdomain
นำค่าคอนฟิกที่ผมเตรียมไว้ใน `scripts/admin-nginx.conf` ไปวางที่เซิร์ฟเวอร์:

1. สร้างไฟล์คอนฟิกใหม่:
   ```bash
   sudo nano /etc/nginx/sites-available/admin.capvisionpartner.com
   ```
2. **Copy เนื้อหาจากไฟล์ `scripts/admin-nginx.conf` ในเครื่องครูเด่นไปวาง** แล้วกด `Ctrl+O` และ `Ctrl+X` เพื่อบันทึก
3. ทำการ Link ไฟล์เพื่อเปิดใช้งาน:
   ```bash
   sudo ln -s /etc/nginx/sites-available/admin.capvisionpartner.com /etc/nginx/sites-enabled/
   ```
4. ตรวจสอบ Syntax และ Restart Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## ขั้นตอนที่ 5: (แนะนำ) ตั้งค่า SSL (HTTPS)
รัน Certbot เพื่อให้เว็บเป็น https:
```bash
sudo certbot --nginx -d admin.capvisionpartner.com
```

---

เมื่อทำครบทุกขั้นตอนแล้ว ครูเด่นจะสามารถใช้งาน `https://admin.capvisionpartner.com` ได้ทันทีครับ! หากติดขัดในขั้นตอนไหนแจ้งผมได้เลยครับ
