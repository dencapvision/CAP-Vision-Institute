-- Migration: Add 'Presentation Like a Pro' course
-- Path: supabase/migrations/20260408120000_add_presentation_like_a_pro_course.sql

DO $$
DECLARE
    agus_instructor_id UUID;
BEGIN
    -- 1. ค้นหา ID ของวิทยากร ครูเด่น มาสเตอร์ฟา
    SELECT id INTO agus_instructor_id FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;

    -- 2. เพิ่มหลักสูตร Presentation Like a Pro
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
        'presentation-like-a-pro',
        'นำเสนองานอย่างมืออาชีพ (Presentation Like a Pro)',
        'Communication Skills',
        'เปลี่ยนทุกการนำเสนอให้ทรงพลัง น่าเชื่อถือ และสร้าง Impact ได้จริง ตั้งแต่การออกแบบสไลด์ไปจนถึงการ Deliver บนเวที',
        '/images/courses/powerful-speaking.png',
        'หลักสูตร Presentation Like a Pro - นำเสนองานอย่างมืออาชีพ โดย ครูเด่น มาสเตอร์ฟา CAP Vision Institute',
        'คนจำนวนมากกลัวการนำเสนอ ไม่ใช่เพราะไม่รู้เรื่อง แต่เพราะ "ไม่รู้จะพูดอย่างไรให้คนฟัง"' || chr(10) || chr(10) ||
        'หลักสูตรนี้ออกแบบมาเพื่อเปลี่ยนทุกคนให้กลายเป็นนักนำเสนอที่มั่นใจ ครอบคลุมทั้ง Mindset (เชื่อในคุณค่าของสิ่งที่นำเสนอ), Skillset (โครงสร้าง Storytelling, Voice & Body Language, Visual Design) และ Toolset (PowerPoint/Canva เทคนิค)' || chr(10) || chr(10) ||
        'เพราะการนำเสนอที่ดีไม่ใช่แค่ความรู้ที่แม่นยำ แต่คือการเชื่อมใจผู้ฟังให้เข้าถึงเนื้อหาได้ทุกนาที',
        'In-house Training 1–2 วัน | 20–40 คน',
        'ผู้จัดการ / หัวหน้างาน, พนักงานที่นำเสนองานประจำ, Sales & Marketing, ผู้บริหารที่ต้องพรีเซนต์ต่อ C-Suite หรือลูกค้า',
        '[
            {"label": "Executive Presence", "stat": "+80%", "desc": "ผู้เข้าอบรมมีความมั่นใจในการนำเสนอเพิ่มขึ้นชัดเจน", "icon": "Star"},
            {"label": "Audience Engagement", "stat": "สูงขึ้น", "desc": "ผู้ฟังจดจำและอยากนำสิ่งที่ได้ยินไปใช้", "icon": "Users"},
            {"label": "Message Clarity", "stat": "3X", "desc": "โครงสร้างที่ชัดทำให้ผู้ฟังเข้าใจเร็วและตัดสินใจได้เลย", "icon": "Target"},
            {"label": "Presentation Anxiety", "stat": "-70%", "desc": "ลดความกลัวเวทีด้วยเทคนิค Mindset Shift และการฝึกซ้ำ", "icon": "Heart"}
        ]'::jsonb,
        '[
            {"title": "Practice-First", "desc": "ฝึกนำเสนอจริงตั้งแต่ชั่วโมงแรก รับ Feedback ทันที ไม่ใช่แค่ฟังทฤษฎี", "icon": "Flame"},
            {"title": "Video Playback", "desc": "อัดวีดิโอการนำเสนอของตัวเอง เห็น Blind Spot และปรับปรุงได้ทันที", "icon": "Eye"},
            {"title": "Real Case Workshop", "desc": "นำหัวข้องานจริงขององค์กรมาฝึก ได้สไลด์และสคริปต์ใช้งานได้ทันที", "icon": "Zap"}
        ]'::jsonb,
        '[
            {"title": "Presentation Mindset", "desc": "เปลี่ยนจากกลัวเป็นกล้า + Audience-First Thinking", "icon": "Brain"},
            {"title": "Story Architecture", "desc": "โครงสร้าง PREP / Problem-Solution / Hero''s Journey + Opening Hook", "icon": "BookOpen"},
            {"title": "Slide Design Mastery", "desc": "One Idea Per Slide, Visual Hierarchy, Data Storytelling", "icon": "Layout"},
            {"title": "Voice & Body Language", "desc": "Vocal Variety, Eye Contact, Gesture, Stage Presence", "icon": "Mic"},
            {"title": "Q&A Mastery", "desc": "รับมือคำถามยาก Hostile Questions และการรักษาความน่าเชื่อถือ", "icon": "MessageCircle"},
            {"title": "Live Presentation Lab", "desc": "นำเสนอจริงต่อกลุ่ม + Peer Feedback + Coaching จากวิทยากร", "icon": "Users"}
        ]'::jsonb,
        '[
            {"title": "Module 1: Presentation Mindset — เปลี่ยนจาก ''กลัว'' เป็น ''กล้า''", "desc": "Audience-First Thinking, สร้าง Inner Confidence และเอาชนะความประหม่าก่อนขึ้นเวที"},
            {"title": "Module 2: Story Architecture — โครงสร้างที่ทรงพลัง", "desc": "PREP Framework, Problem-Solution Pattern, Hero''s Journey + เทคนิค Opening Hook ที่ดึงดูดทันที"},
            {"title": "Module 3: Slide Design Mastery — สไลด์ที่คนดูแล้วเข้าใจ", "desc": "One Idea Per Slide, Visual Hierarchy, Data Storytelling ที่ไม่ทำให้ผู้ฟังงง"},
            {"title": "Module 4: Voice & Body Language — Presence บนเวที", "desc": "Vocal Variety, Eye Contact, Gesture และการสร้าง Stage Presence ที่น่าเชื่อถือ"},
            {"title": "Module 5: Q&A Mastery — รับมือคำถามยาก", "desc": "เทคนิคจัดการ Hostile Questions, Bridging Technique และการรักษาความน่าเชื่อถือในทุกสถานการณ์"},
            {"title": "Module 6: Live Presentation Lab — ฝึกจริง รับ Feedback จริง", "desc": "นำเสนองานจริงต่อกลุ่ม รับ Peer Feedback และ Coaching จากวิทยากรแบบตัวต่อตัว"}
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
        alt_text = EXCLUDED.alt_text,
        long_description = EXCLUDED.long_description,
        duration = EXCLUDED.duration,
        audience = EXCLUDED.audience,
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives,
        is_published = EXCLUDED.is_published,
        updated_at = now();
END $$;
