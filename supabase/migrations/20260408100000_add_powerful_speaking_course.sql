-- Migration: Add 'Powerful Speaking' course
-- Path: supabase/migrations/20260408100000_add_powerful_speaking_course.sql

DO $$
DECLARE
    agus_instructor_id UUID;
BEGIN
    -- 1. ค้นหา ID ของวิทยากร ครูเด่น มาสเตอร์ฟา
    SELECT id INTO agus_instructor_id FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;

    -- 2. เพิ่มหลักสูตร Powerful Speaking
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
        'powerful-speaking',
        'Powerful Speaking: พูดทรงพลังในองค์กร (The Art of Influential Communication)',
        'Communication Skills',
        'เปลี่ยนสุ้มเสียงของคุณให้เป็นพลังขับเคลื่อนองค์กร ด้วยเทคนิคการสื่อสารที่สะกดใจและสร้างผลลัพธ์ในระดับจิตใต้สำนึก',
        '/images/courses/powerful-speaking.png',
        'Powerful Speaking: พูดทรงพลังในองค์กร โดย ครูเด่น มาสเตอร์ฟา',
        'หลักสูตรที่เปลี่ยน "คนพูดเก่ง" ให้เป็น "ผู้นำที่ทรงอิทธิพล" ผ่านศิลปะการสื่อสารที่สะกดสายตาและครองใจผู้ฟัง' || chr(10) || chr(10) ||
        '📌 เพราะการพูดคือการส่งต่อพลังงาน (Energy Transfer) สู่คนรอบข้าง',
        'In-house Training (1–2 วัน)',
        'หัวหน้างาน (Managers), ทีมขาย (Sales), และผู้ที่ต้องนำเสนอแผนงานเชิงกลยุทธ์',
        '[
            {"label": "Anxiety", "stat": "😰", "desc": "ความประหม่าที่บดบังศักยภาพที่แท้จริงในที่สาธารณะ", "icon": "AlertTriangle"},
            {"label": "Disengagement", "stat": "💤", "desc": "พรีเซนต์ยาวเกินไป ขาดจุดโฟกัสจนผู้ฟังหลุดความสนใจ", "icon": "ZapOff"},
            {"label": "Weak Imprint", "stat": "❌", "desc": "พูดแล้วไม่มีใครจำได้ ขาด Executive Presence", "icon": "XCircle"}
        ]'::jsonb,
        '[
            {"title": "Mindset Overhaul", "desc": "ปรับจูน Inner Authority และความมั่นใจจากภายใน", "icon": "Heart"},
            {"title": "Signature Structure", "desc": "โครงสร้างเนื้อหาที่สั้น กระชับ จับใจ (CAP Frame)", "icon": "Layout"},
            {"title": "Vocal Mastery", "desc": "เทคนิคการใช้น้ำเสียงและจังหวะเพื่อสร้างแรงดึงดูด", "icon": "Mic"},
            {"title": "Body Language", "desc": "การเคลื่อนไหวที่สง่างามและมีพลังบนเวที", "icon": "UserCheck"}
        ]'::jsonb,
        '[
            {"title": "Confidence Reset", "desc": "สยบความกลัว และเปลี่ยนพลังงานลบให้เป็นเสน่ห์", "icon": "ShieldCheck"},
            {"title": "Strategic Storytelling", "desc": "ศิลปะการเล่าเรื่องเพื่อสื่อสาร Vision/Strategy", "icon": "PenTool"},
            {"title": "Interactive Workshop", "desc": "ฝึกปฏิบัติจริง (70%) และรับ Feedback รายบุคคล", "icon": "Users"},
            {"title": "Result Driven", "desc": "การนำเสนอที่ทรงอิทธิพลและสร้าง Conversion จริง", "icon": "TrendingUp"}
        ]'::jsonb,
        '[
            {"title": "Module 1: The Inner Voice (Confidence & Presence)", "desc": "ปรับจูน Mindset และการบริหารจัดการสภาวะอารมณ์ก่อนเริ่มพูด"},
            {"title": "Module 2: Designing Impact (The Logic of Persuasion)", "desc": "โครงสร้างเนื้อหาที่ทรงพลังแบบ Why-What-How และศิลปะการเปิด-ปิด"},
            {"title": "Module 3: Captivating Presence (Body & Voice Resonance)", "desc": "การใช้สรีระ ภาษากาย และน้ำเสียงเพื่อสร้างอำนาจ (Authority) และความเป็นผู้นำ"},
            {"title": "Module 4: The Art of Hooking (Emotional Engagement)", "desc": "เทคนิคการเล่าเรื่อง (Storytelling) และการสื่อสารที่สะกดใจผู้คนในระดับจิตใต้สำนึก"},
            {"title": "Module 5: Real-World Arena (The Ultimate Pitch)", "desc": "Workshop รอบปฐมทัศน์ - ทดลองนำเสนอจริงและรับ Feedback เชิงลึกแบบตัวต่อตัว"}
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
