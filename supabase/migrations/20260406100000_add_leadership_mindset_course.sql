-- Migration: Add 'Leadership Mindset Reset' course
-- Path: supabase/migrations/20260406100000_add_leadership_mindset_course.sql

DO $$
DECLARE
    agus_instructor_id UUID;
BEGIN
    -- 1. Find the instructor ID for ครูเด่น มาสเตอร์ฟา
    SELECT id INTO agus_instructor_id FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;

    -- 2. Insert the course if it doesn't already exist
    INSERT INTO public.courses (
        slug,
        title,
        category,
        description,
        image,
        alt_text,
        long_description,
        duration,
        audience,
        why_section,
        how_section,
        what_section,
        objectives,
        instructor_id,
        is_published
    )
    VALUES (
        'leadership-mindset-reset',
        'Leadership Mindset Reset: Transforming from Manager to Leader',
        'Leader Skills',
        'หลักสูตรเร่งด่วนเพื่อปรับจูนหัวใจและวิธีคิดของผู้นำยุคใหม่ เปลี่ยนจาก "ผู้สั่งการ" เป็น "ผู้สร้างแรงบันดาลใจ" ด้วยเทคนิค Transformative Learning และ CAP Theory',
        'https://images.unsplash.com/photo-1507679799987-c7377bc586df?auto=format&fit=crop&q=80',
        'Leadership Mindset Reset Hero Image',
        '### "ผู้นำไม่ได้แปลว่าเป็นหัวหน้า" สู่ "หัวใจของการเป็นผู้นำที่แท้จริง"' || chr(10) ||
        'ในยุคที่โลกหมุนเร็วและเต็มไปด้วยความซับซ้อน ผู้นำที่เน้นการสั่งการ (Command & Control) กำลังล้มเหลว' || chr(10) ||
        'หลักสูตร Leadership Mindset Reset ออกแบบขึ้นเพื่อ "ล้าง" วิสัยทัศน์เดิมๆ และ "วาง" รากฐานวิธีคิดใหม่' || chr(10) ||
        'เพื่อให้คุณเป็นผู้นำที่สามารถดึงศักยภาพสูงสุดของทีมออกมาได้ ผ่านกระบวนการ Transformative Learning (CAP Vision Signature Style)',
        '1 วัน (6 ชม.)',
        'ผู้จัดการ, หัวหน้างาน, ผู้นำยุคใหม่, HRD Professionals',
        '[
            {"title": "Unconscious Bias", "desc": "ทำไมเราถึงติดกับดักการทำงานแบบเดิมๆ?"},
            {"title": "The Inspiration Gap", "desc": "ทำไมพนักงานรุ่นใหม่ถึงไม่ชอบถูกสั่ง?"},
            {"title": "Transformation First", "desc": "เปลี่ยนข้างในก่อน ถึงจะเปลี่ยนผลลัพธ์ข้างนอกได้"}
        ]'::jsonb,
        '[
            {"title": "Reflective Dialogue", "desc": "การสนทนาที่สะท้อนความคิด (Inside-Out)"},
            {"title": "Dynamic Activity", "desc": "กิจกรรมที่ทำให้เกิด Flow ในการทำงานร่วมกัน"},
            {"title": "Action Learning", "desc": "ลงมือแก้โจทย์จริง (Real Challenge)"}
        ]'::jsonb,
        '[
            {"title": "Self-Leadership", "desc": "ทักษะการนำพาตนเองออกจาก Comfort Zone"},
            {"title": "Empathetic Communication", "desc": "ทักษะการสื่อสารด้วยความเห็นอกเห็นใจ"},
            {"title": "Mastering Facilitation", "desc": "ศิลปะการเป็น Facilitator ให้ลูกน้องเก่งขึ้น"}
        ]'::jsonb,
        '[
            "สามารถระบุและก้าวข้ามขีดจำกัดทางความคิด (Fixed Mindset) ของตนเองได้",
            "สื่อสารเพื่อสร้างแรงบันดาลใจและพันธสัญญาในเป้าหมายร่วมกันของทีม",
            "ใช้ทักษะการโค้ชและการฟังเชิงลึก (Deep Listening) ในการบริหารจัดการ",
            "สร้างบรรยากาศแห่งความไว้วางใจ (Psychological Safety) ในที่ทำงาน"
        ]'::jsonb,
        agus_instructor_id,
        true
    )
    ON CONFLICT (slug) DO UPDATE
    SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        long_description = EXCLUDED.long_description,
        duration = EXCLUDED.duration,
        audience = EXCLUDED.audience,
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives,
        updated_at = now();
END $$;
