-- Migration: Add 'Health Communication Mastery' course
-- หลักสูตร: พลังแห่งความมั่นใจและบุคลิกภาพที่เหนือชั้น เพื่อการสื่อสารสุขภาพอย่างมีประสิทธิภาพ
-- (High-Impact Communication & Personality Mastery for Family Practice Teams)

DO $$
DECLARE
    den_instructor_id UUID;
BEGIN
    -- ค้นหา ID ของวิทยากร ครูเด่น มาสเตอร์ฟา
    SELECT id INTO den_instructor_id FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;

    -- เพิ่มหลักสูตร Health Communication Mastery
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
        'health-communication-mastery',
        'พลังแห่งความมั่นใจและบุคลิกภาพที่เหนือชั้น เพื่อการสื่อสารสุขภาพอย่างมีประสิทธิภาพ',
        'Communication Skills',
        'เปลี่ยนทีมสหวิชาชีพให้เป็น "ทูตสุขภาพ" ที่เปี่ยมด้วยพลัง ความน่าเชื่อถือ และความเห็นอกเห็นใจ ผ่านกระบวนการเรียนรู้แบบ Transformative Learning (90% Workshop)',
        'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Course/cap-vision-health-communication-mastery-course.png',
        'หลักสูตรพัฒนาบุคลิกภาพและการสื่อสารสุขภาพสำหรับทีมสหวิชาชีพ PCC โดย ครูเด่น มาสเตอร์ฟา',
        'ในโลกของการดูแลสุขภาพระดับปฐมภูมิ "ความเชื่อมั่น" (Trust) คือเข็มทิศที่นำไปสู่ผลลัพธ์การรักษาที่ดีที่สุด' || chr(10) || chr(10) ||
        'หลักสูตรนี้ไม่ใช่แค่การสอนเรื่อง "มารยาท" หรือ "การแต่งกาย" แต่คือการปรับ Mindset เพื่อสร้าง Professional Presence ที่จะช่วยให้ แพทย์ พยาบาล นักวิชาการ และเจ้าหน้าที่ สธ. สามารถประสานงานกันได้อย่างไร้รอยต่อ ลดความขัดแย้ง และสร้างความไว้วางใจให้เกิดขึ้นในใจผู้รับบริการภายในเสี้ยววินาที' || chr(10) || chr(10) ||
        '"บุคลิกภาพไม่ใช่แค่การแต่งกาย แต่คือสารที่ส่งออกไปก่อนที่คุณจะเริ่มอ้าปากพูด"',
        'In-house Training (3 ชั่วโมง | Half-day Session)',
        'ทีมสหวิชาชีพ PCC (แพทย์, พยาบาล, เภสัชกร, นักวิชาการสาธารณสุข), หัวหน้าหน่วยงานที่ต้องการสร้างวัฒนธรรมทีม, และเจ้าหน้าที่ด่านหน้าที่ต้องรับมือกับประชาชนโดยตรง',
        '[
            {"label": "Hierarchy Wall", "stat": "🧱", "desc": "กำแพงระหว่างวิชาชีพและความเกรงใจที่ทำให้การสื่อสารในทีมติดขัด", "icon": "Layers"},
            {"label": "Invisible Barriers", "stat": "🚧", "desc": "บุคลากรขาดความมั่นใจในการแสดงออก หรือสื่อสารด้วยท่าทีที่ดูเข้าถึงยากโดยไม่รู้ตัว", "icon": "EyeOff"},
            {"label": "Lost in Translation", "stat": "🔤", "desc": "การใช้ภาษาเทคนิคที่ชาวบ้านไม่เข้าใจ ทำให้เกิดความสับสนและไม่ปฏิบัติตามคำแนะนำ", "icon": "AlertTriangle"},
            {"label": "Workload Stress", "stat": "😓", "desc": "ภาระงานที่หนักส่งผลต่อบุคลิกภาพ (หน้าบึ้ง เสียงแข็ง) บั่นทอนความรู้สึกของผู้รับบริการ", "icon": "ZapOff"}
        ]'::jsonb,
        '[
            {"title": "Transformative Learning", "desc": "เน้นการทำลายกำแพงระหว่างวิชาชีพด้วยกระบวนการเรียนรู้ที่ลึกซึ้งและทรงพลัง (CAP Theory)", "icon": "RefreshCw"},
            {"title": "Workshop 70%", "desc": "การฝึกปฏิบัติสถานการณ์จำลอง (Simulation) และการเล่นบทบาทสมมติ (Role-play)", "icon": "Users"},
            {"title": "Dialogue & Reflection 20%", "desc": "การแลกเปลี่ยนเรียนรู้และสะท้อนคิดเพื่อการเปลี่ยนแปลงจากภายใน", "icon": "MessageCircle"},
            {"title": "Knowledge Injection 10%", "desc": "สรุปใจความสำคัญและเทคนิคระดับโลกในรูปแบบที่จำง่าย นำไปใช้ได้จริง", "icon": "Zap"}
        ]'::jsonb,
        '[
            {"title": "MDT Synergy", "desc": "เปลี่ยนจาก \"ต่างคนต่างทำ\" เป็น \"หนึ่งทีม หนึ่งเป้าหมาย\" ด้วยทักษะการสื่อสารเชิงบวก", "icon": "Link"},
            {"title": "Instant Authority", "desc": "พัฒนาบุคลิกภาพที่สร้างความน่าเชื่อถือทันทีที่เห็น (Presence Mastery)", "icon": "UserCheck"},
            {"title": "Communication Flow", "desc": "เทคนิคการส่งต่อข้อมูลสุขภาพให้ง่าย โดนใจ และเกิด Impact", "icon": "TrendingUp"},
            {"title": "Stress Resilience", "desc": "การจัดการบุคลิกภาพและการแสดงออกภายใต้สถานการณ์กดดันในคลินิก", "icon": "ShieldCheck"}
        ]'::jsonb,
        '[
            {"title": "Module 1: [Define & Discover] – ปลดล็อกใจ ก้าวข้ามกำแพง (45 นาที)", "desc": "กิจกรรม \"The MDT Mirror\" – สะท้อนมุมมองระหว่างวิชาชีพและปรับ Mindset จาก Fixed ไปสู่ Growth Mindset (CAP Theory) เพื่อการทำงานร่วมกันอย่างแท้จริง"},
            {"title": "Module 2: [Develop] – พลังแห่งบุคลิกภาพและภาพลักษณ์ (45 นาที)", "desc": "Workshop \"The 7-Second Impression\" – ปรับ Body Language, Grooming, และน้ำเสียง พร้อม Video Group Feedback เพื่อสร้าง Professional Presence ที่น่าเชื่อถือและเข้าถึงง่าย"},
            {"title": "Module 3: [Decide & Deploy] – การสื่อสารสุขภาพและการประสานงานที่ทรงพลัง (45 นาที)", "desc": "\"Health Storytelling Challenge\" – ฝึกอธิบายคำแนะนำสุขภาพให้ชาวบ้านเข้าใจภายใน 1 นาที และ Workshop การสื่อสารประสานงาน SBAR ในสถานการณ์จำลอง"},
            {"title": "Module 4: [Deep Reflection] – ถอดบทเรียนและพันธสัญญา (45 นาที)", "desc": "\"The Commitment Circle\" – Deep Reflection รายวิชาชีพ, AAR (After Action Review), และการตั้งเป้าหมายการเปลี่ยนแปลงร่วมกันเพื่อสร้างวัฒนธรรมการสื่อสารที่ดีในคลินิก"}
        ]'::jsonb,
        den_instructor_id,
        true
    )
    ON CONFLICT (slug) DO UPDATE
    SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        long_description = EXCLUDED.long_description,
        duration = EXCLUDED.duration,
        audience = EXCLUDED.audience,
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives,
        updated_at = now();
END $$;
