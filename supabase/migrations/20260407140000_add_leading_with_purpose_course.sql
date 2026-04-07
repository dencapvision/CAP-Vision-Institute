-- Migration: Add 'Leading with Purpose' course
-- Path: supabase/migrations/20260407140000_add_leading_with_purpose_course.sql

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
        'leading-with-purpose',
        'Leading with Purpose: นำทีมด้วยความหมาย สร้างพลังขับเคลื่อนจากภายใน',
        'Leader Skills',
        'เปลี่ยนจาก “ทีมที่ทำงานตามหน้าที่” สู่ ทีมที่เข้าใจคุณค่า เชื่อในเป้าหมาย และอยากสร้างผลงานด้วยตัวเอง',
        '/images/courses/leading-with-purpose.png',
        'Leading with Purpose: นำทีมด้วยความหมาย สร้างพลังขับเคลื่อนจากภายใน',
        'หลักสูตรนี้ได้รับการออกแบบมาเพื่อเปลี่ยนผ่านจาก “ทีมที่ทำงานตามหน้าที่” สู่ “ทีมที่เข้าใจคุณค่า” เชื่อในเป้าหมาย และอยากสร้างผลงานด้วยตนเอง ผ่านกระบวนการเรียนรู้แบบ ลงมือทำ + สะท้อนคิด + เชื่อมโยงความหมาย ซึ่งนำไปสู่การเปลี่ยนพฤติกรรมจริงในองค์กร' || chr(10) || chr(10) ||
        '📌 เมื่อคน “เห็นความหมาย” → เขาจะสร้าง “ผลงานที่มีคุณค่า”',
        'In-house Training (1–2 วัน)',
        'ผู้บริหาร, ผู้จัดการ, ทีมที่ต้องการเพิ่ม Engagement',
        '[
            {"label": "Passion", "stat": "😣", "desc": "ทีมทำงานแบบ Routine ไม่มีแรงขับเคลื่อน", "icon": "Flame"},
            {"label": "Purpose", "stat": "❌", "desc": "พนักงานไม่เข้าใจว่า ทำไปเพื่ออะไร", "icon": "Target"},
            {"label": "Engagement", "stat": "📌", "desc": "Engagement ต่ำ ผู้นำสื่อสาร Vision แต่ทีมไม่อิน", "icon": "Users"}
        ]'::jsonb,
        '[
            {"title": "Workshop", "desc": "Learning by Doing ลงมือทำจริง", "icon": "Layers"},
            {"title": "Reflection", "desc": "สะท้อนคิดลึกเพื่อการเปลี่ยนแปลง", "icon": "Brain"},
            {"title": "Dialogue", "desc": "วงสนทนาแลกเปลี่ยนความหมาย", "icon": "MessageCircle"},
            {"title": "Storytelling", "desc": "ฝึกทักษะการสื่อสารเชิงสร้างสรรค์", "icon": "Zap"}
        ]'::jsonb,
        '[
            {"title": "Purpose Discovery", "desc": "ค้นหาคุณค่าและแรงขับเคลื่อนจากภายใน", "icon": "Search"},
            {"title": "Meaning Connection", "desc": "ทำให้ทีมรู้ว่างานของเขาสำคัญอย่างไร", "icon": "Heart"},
            {"title": "Vision Alignment", "desc": "สื่อสารให้ทีมเชื่อและอยากทำ", "icon": "Rocket"},
            {"title": "Sustainable Commitment", "desc": "สร้างทีมที่มีพลังและ Engagement ยั่งยืน", "icon": "ShieldCheck"}
        ]'::jsonb,
        '[
            {"title": "Module 1: Self Purpose Discovery", "desc": "ฉันทำงานไปเพื่ออะไร? ค้นหาคุณค่าที่ซ่อนอยู่ภายใน"},
            {"title": "Module 2: Work & Meaning Connection", "desc": "งานที่ทำเชื่อมกับอะไร? เปลี่ยนนิยามจาก Task สู่ Value"},
            {"title": "Module 3: Purposeful Leadership", "desc": "ผู้นำที่สร้างแรงบันดาลใจ นำด้วยความหมาย ไม่ใช่อำนาจ"},
            {"title": "Module 4: Vision Communication", "desc": "Storytelling เชิงความหมาย ทำให้ทีมอินกับเป้าหมาย"},
            {"title": "Module 5: Purpose-Driven Team", "desc": "Alignment ระหว่างคนกับองค์กร สร้างทีมที่มี Passion"}
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
