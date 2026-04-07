-- Migration: Add 'Communication Mastery' course
-- Path: supabase/migrations/20260407150000_add_communication_mastery_course.sql

DO $$
DECLARE
    agus_instructor_id UUID;
BEGIN
    -- 1. ค้นหา ID ของวิทยากร ครูเด่น มาสเตอร์ฟา
    SELECT id INTO agus_instructor_id FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;

    -- 2. เพิ่มหลักสูตร Communication Mastery
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
        'communication-mastery',
        'Communication Mastery: สื่อสารอย่างมืออาชีพ สำหรับระดับหัวหน้างาน',
        'Communication Skills',
        'ก้าวข้ามการสื่อสารแบบเดิม สู่การนำทีมด้วยความเข้าใจ และการจัดการสภาวะวิกฤต (Crisis Communication) อย่างมีชั้นเชิง',
        '/images/courses/communication-mastery.png',
        'Communication Mastery: สื่อสารอย่างมืออาชีพ สำหรับระดับหัวหน้างาน โดย ครูเด่น มาสเตอร์ฟา',
        'หลักสูตรนี้ได้รับการออกแบบเฉพาะสำหรับผู้นำที่ต้องการยกระดับการปฏิสัมพันธ์ในทีม เปลี่ยน "การสั่งการ" ให้เป็น "การสร้างแรงบันดาลใจ" และเตรียมความพร้อมสำหรับการสื่อสารในสภาวะกดดันหรือภาวะวิกฤต (Crisis Communication)' || chr(10) || chr(10) ||
        '📌 เพราะหัวหน้างานที่สื่อสารเก่ง คือหัวหน้าที่ได้ใจคนและได้ผลงาน',
        'In-house Training (1–2 วัน)',
        'หัวหน้างาน (Supervisors), ผู้จัดการ (Managers), และผู้ที่ต้องบริหารจัดการทีม',
        '[
            {"label": "Crisis", "stat": "😰", "desc": "เมื่อเกิดปัญหา สื่อสารไม่ทันการณ์หรือคลาดเคลื่อน", "icon": "AlertTriangle"},
            {"label": "Mistrust", "stat": "❌", "desc": "ลูกน้องไม่กล้าพูดความจริง หรือปิดบังข้อมูล", "icon": "ShieldAlert"},
            {"label": "Inefficiency", "stat": "📌", "desc": "สั่งงานแล้วไม่ได้ผลงาน งานซ้ำซ้อนเพราะสื่อสารไม่ชัด", "icon": "XCircle"}
        ]'::jsonb,
        '[
            {"title": "Role Play", "desc": "จำลองสถานการณ์จริงและวิกฤต", "icon": "Users"},
            {"title": "Reflection", "desc": "สะท้อนคิดลึกผ่าน CAP Theory", "icon": "Brain"},
            {"title": "Crisis Simulation", "desc": "ทดลองสื่อสารในภาวะกดดัน", "icon": "Activity"},
            {"title": "Dialogue", "desc": "วงสนทนาเพื่อการแลกเปลี่ยน", "icon": "MessageSquare"}
        ]'::jsonb,
        '[
            {"title": "Master Mindset", "desc": "การปรับ Awareness สู่การเป็นนักสื่อสารที่แท้จริง", "icon": "Heart"},
            {"title": "Deep Listening", "desc": "เข้าถึงหัวใจลูกน้องด้วยการฟังที่ลึกซึ้ง", "icon": "Mic"},
            {"title": "Crisis Resilient", "desc": "สื่อสารอย่างมีสติในสภาวะวิกฤต", "icon": "Shield"},
            {"title": "Powerful Influence", "desc": "เทคนิคการโน้มน้าวใจและการให้ Feedback", "icon": "Zap"}
        ]'::jsonb,
        '[
            {"title": "Module 1: Mindset of Master Communicator", "desc": "เปลี่ยนระบบคิดการสื่อสาร: จากผู้สั่ง สู่ผู้สร้างการมีส่วนร่วม"},
            {"title": "Module 2: Deep Listening & Relationship Building", "desc": "เทคนิคการฟังแบบ Empathy ฟังอย่างไรให้ได้มากกว่าคำพูด"},
            {"title": "Module 3: Constructive Feedback & Feedforward", "desc": "การให้ Feedback ที่สร้างพลัง และการ Feedforward เพื่ออนาคต"},
            {"title": "Module 4: Influencing & Assertive Communication", "desc": "สื่อสารอย่างหนักแน่น สุภาพ และมีพลังในการโน้มน้าวใจ"},
            {"title": "Module 5: Crisis Communication & Difficult Conversations", "desc": "การสื่อสารในภาวะวิกฤต และการจัดการบทสนทนาที่ยากลำบากอย่างมืออาชีพ"}
        ]'::jsonb,
        agus_instructor_id,
        true
    )
    ON CONFLICT (slug) DO UPDATE
    SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        long_description = EXCLUDED.long_description,
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives,
        updated_at = now();
END $$;
