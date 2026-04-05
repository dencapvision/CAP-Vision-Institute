-- Seed Script สำหรับสร้างข้อมูลเริ่มต้นบน Supabase (รันใน SQL Editor ได้เลย)

DO $$ 
DECLARE
    den_id uuid := gen_random_uuid();
BEGIN
    -- ลบ Check Constraint (กฏเดิมที่อาจจะถูกตั้งไว้จากตารางเก่า) ที่อาจจะล็อกเรื่อง Category เอาไว้
    ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_category_check;
    ALTER TABLE public.online_courses DROP CONSTRAINT IF EXISTS online_courses_category_check;

    -- 1. สร้างข้อมูล Instructor (ครูเด่น)
    INSERT INTO public.instructors (id, slug, name, bio, image) 
    VALUES (
        den_id, 
        'den-masterfa', 
        'ครูเด่น มาสเตอร์ฟา', 
        'ผู้เชี่ยวชาญด้าน Learning Design และ Facilitator', 
        '/images/hero-profile.png'
    )
    ON CONFLICT (slug) DO NOTHING;

    -- หากมีครูเด่นอยู่แล้วจากการรันครั้งก่อน ให้ดึง ID เก่ามาใช้แทน
    SELECT id INTO den_id FROM public.instructors WHERE slug = 'den-masterfa' LIMIT 1;

    -- 2. สร้างข้อมูล Courses (In-house / Public Training)
    INSERT INTO public.courses (slug, title, category, description, image, alt_text, duration, audience, instructor_id, is_published, what_section, why_section, how_section)
    VALUES 
    (
        'the-modern-facilitator', 
        'The Modern Facilitator', 
        'In-house Training', 
        'ยกระดับทักษะการจัดกระบวนการเรียนรู้สู่ระดับยอดเยี่ยม',
        'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'The Modern Facilitator Course',
        '2 วัน (12 ชั่วโมง)',
        'วิทยากร, HRD, หัวหน้างานที่ต้องสอนงาน',
        den_id,
        true,
        '["ทักษะการเรียนรู้แบบมีส่วนร่วม","จิตวิทยาการเรียนรู้สำหรับผู้ใหญ่ (Adult Learning Psychology)","เทคนิคการใช้คำถามเพื่อฉุกคิด (Powerful Questioning)"]'::jsonb,
        '["ผู้เรียนคาดหวังประสบการณ์การเรียนรู้ที่ไม่ใช่แค่การนั่งฟัง","การเปลี่ยนแปลงพฤติกรรมเกิดจากการมีส่วนร่วม ไม่ใช่แค่การรับรู้","Facilitator คือตัวเร่งปฏิกิริยาแห่งการเปลี่ยนแปลงในองค์กร"]'::jsonb,
        '["ออกแบบโมดูลย่อยชัดเจน (Micro-Learning)","กิจกรรมเจาะจงเป้าหมาย (Purposeful Activity)","สกัดบทเรียนเชิงลึก (Deep Debriefing)"]'::jsonb
    ),
    (
        'cps-problem-solving', 
        'Creative Problem Solving', 
        'In-house Training', 
        'ทักษะการแก้ปัญหาอย่างสร้างสรรค์เพื่อผลลัพธ์ที่แตกต่าง',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'Creative Problem Solving Course',
        '1 วัน (6 ชั่วโมง)',
        'พนักงานทุกระดับ, หัวหน้างานระดับต้น-กลาง',
        den_id,
        true,
        '["การระบุปัญหาที่แท้จริง (Root Cause Analysis)","การคิดนอกกรอบ (Out of the Box Thinking)","การประเมินทางเลือกและการตัดสินใจ"]'::jsonb,
        '["ความซับซ้อนของปัญหาในปัจจุบันต้องการกระบวนการคิดรูปแบบใหม่","แนวคิดสร้างสรรค์คือตัวช่วยในการหาทางออกที่มีประสิทธิภาพ","เพิ่มทักษะความได้เปรียบด้วยปัญหาเชิงซ้อน"]'::jsonb,
        '["กรณีศึกษาจากเหตุการณ์จริง (Real Case Study)","จำลองสถานการณ์สมมติ (Role Play)","การฝึกคิดวิเคราะห์เป็นกลุ่ม (Group Brainstorming)"]'::jsonb
    ) ON CONFLICT (slug) DO NOTHING;

    -- 3. สร้างข้อมูล Online Courses
    INSERT INTO public.online_courses (slug, title, category, image, duration, lessons, price, instructor_id, is_published)
    VALUES 
    (
        'mastering-agile-facilitation',
        'Mastering Agile Facilitation',
        'Online / Self-Paced',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        '10 ชั่วโมง',
        25,
        2900,
        den_id,
        true
    ),
    (
        'design-thinking-for-hr',
        'Design Thinking for HR',
        'Online / Live',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
        '12 ชั่วโมง',
        15,
        3500,
        den_id,
        true
    ) ON CONFLICT (slug) DO NOTHING;

    -- 4. สร้างข้อมูล Events
    -- หมายเหตุตาราง event ไม่มี slug unique เลยใช้วิธี insert ตรงๆ แต่ถ้ากันซ้ำจะไม่มี ON CONFLICT สำหรับตอนนี้
    -- เพื่อไม่ให้กดแล้วข้อมูลเบิ้ล เราจะใช้วิธีเช็คก่อนว่ามีงานสัมมนานี้แล้วหรือยัง
    IF NOT EXISTS (SELECT 1 FROM public.events WHERE title = 'The Modern Facilitator Workshop') THEN
        INSERT INTO public.events (title, event_date, location, link, speaker_id, is_published)
        VALUES (
            'The Modern Facilitator Workshop',
            '2024-03-25T09:00:00Z',
            'Bangkok / Online',
            '#',
            den_id,
            true
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.events WHERE title = 'Leadership DNA for HR Leaders') THEN
        INSERT INTO public.events (title, event_date, location, link, speaker_id, is_published)
        VALUES (
            'Leadership DNA for HR Leaders',
            '2024-04-10T09:00:00Z',
            'Hotel in Bangkok',
            '#',
            den_id,
            true
        );
    END IF;

END $$;
