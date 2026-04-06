-- Migration: Add 'Conflict to Collaboration' and 'AI Mastery' sample courses
-- Path: supabase/migrations/20260406110000_add_more_sample_courses.sql

DO $$
DECLARE
    agus_instructor_id UUID;
BEGIN
    SELECT id INTO agus_instructor_id FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;

    -- 1. Insert 'Conflict to Collaboration'
    INSERT INTO public.courses (
        slug, title, category, description, image, alt_text, long_description, duration, audience,
        why_section, how_section, what_section, objectives, instructor_id, is_published
    )
    VALUES (
        'conflict-to-collaboration',
        'Conflict to Collaboration: The Art of Generative Teams',
        'People Skills',
        'เปลี่ยนความขัดแย้งเป็นพลังสร้างสรรค์: ศิลปะการสร้างทีมที่มีประสิทธิภาพสูงด้วยเทคนิค Generative Dialogue และ Trust Architecture',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
        'Conflict to Collaboration Hero Image',
        '### "ความขัดแย้งไม่ใช่ปัญหา แต่คือโอกาสในการเติบโต"' || chr(10) ||
        'เมื่อคนหลากหลายมารวมตัวกัน ความแตกต่างคือสิ่งที่หลีกเลี่ยงไม่ได้ แต่จะทำอย่างไรให้ความต่างนั้นไม่กลายเป็นอุปสรรค?' || chr(10) ||
        'หลักสูตรนี้จะพาคุณไปเจาะลึกถึงรากเหง้าของความขัดแย้ง และใช้เครื่องมือในการสร้างความเข้าใจแบบ Inside-Out เพื่อเปลี่ยนทีมจาก Silo ให้เป็น Synergy',
        '1 วัน (6 ชม.)',
        'ทีมบริหาร, หัวหน้างาน, พนักงานระดับปฏิบัติการ, Cross-functional Teams',
        '[
            {"title": "The Root of Friction", "desc": "วิเคราะห์สาเหตุที่ทำให้เกิดความขัดแย้งในที่ทำงาน"},
            {"title": "Empathy Gap", "desc": "การลดช่องว่างความไม่เข้าใจด้วยใจที่เปิดรับ"},
            {"title": "Trust Economy", "desc": "ความไว้วางใจคือต้นทุนสำคัญของผลผลิตในทีม"}
        ]'::jsonb,
        '[
            {"title": "DFA Strategy for Teams", "desc": "Dynamic, Flow, และ Art of Collaboration"},
            {"title": "Simulation Games", "desc": "กิจกรรมจำลองสถานการณ์ความขัดแย้งเสมือนจริง"},
            {"title": "Safe Space Dialogue", "desc": "การสร้างพื้นที่ปลอดภัยในการแลกเปลี่ยนความคิด"}
        ]'::jsonb,
        '[
            {"title": "Radical Empathy", "desc": "ทักษะการเข้าใจผู้อื่นในระดับลึก"},
            {"title": "Generative Dialogue", "desc": "การสนทนาเพื่อหาทางเลือกใหม่ร่วมกัน"},
            {"title": "Conflict Framework", "desc": "กรอบการทำงานในการจัดการปัญหาอย่างเป็นระบบ"}
        ]'::jsonb,
        ARRAY[
            'สามารถระบุสไตล์การสื่อสารที่แตกต่างกันของคนในทีมได้',
            'ลดอัตราการเกิดความขัดแย้งที่รุนแรงและส่งผลกระทบต่อผลผลิตงาน',
            'สร้างข้อตกลงร่วมกัน (Team Agreement) ที่สมาชิกทุกคนยอมรับ',
            'พัฒนาทักษะการฟังที่ลึกซึ้ง (Empathetic Listening) เพื่อลดการตัดสิน'
        ],
        agus_instructor_id,
        true
    )
    ON CONFLICT (slug) DO UPDATE
    SET
        title = EXCLUDED.title, category = EXCLUDED.category, description = EXCLUDED.description, 
        image = EXCLUDED.image, objectives = EXCLUDED.objectives, updated_at = now();

    -- 2. Insert 'AI Mastery for Professionals'
    INSERT INTO public.courses (
        slug, title, category, description, image, alt_text, long_description, duration, audience,
        why_section, how_section, what_section, objectives, instructor_id, is_published
    )
    VALUES (
        'ai-mastery-professionals',
        'AI Mastery for Professionals: Productivity Reimagined',
        'Work Skills',
        'ปลดล็อกขีดจำกัดการทำงานด้วยพลัง AI: ยกระดับประสิทธิภาพการทำงานในยุคดิจิทัลด้วย AI Tools และ Prompt Engineering',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
        'AI Mastery for Professionals Hero Image',
        '### "AI จะไม่มาแย่งงานคุณ แต่คนที่ใช้ AI เป็นจะมาแทนที่คุณ"' || chr(10) ||
        'ในยุคที่ข้อมูลมีมหาศาล ความรวดเร็วและความแม่นยำคือหัวใจสำคัญของการทำงาน' || chr(10) ||
        'หลักสูตรนี้ออกแบบมาเพื่อผู้ปฏิบัติงานยุคใหม่ที่ต้องการก้าวข้ามการทำงานแบบเดิมๆ สู่การเป็น AI-Powered Professional',
        '1 วัน (6 ชม.)',
        'Business Professionals, Content Creators, Admin Teams, พนักงานทุกคนที่ต้องการเพิ่ม Productivity',
        '[
            {"title": "AI Opportunity", "desc": "มองเห็นโอกาสในการใช้ AI เข้ามาช่วยงาน"},
            {"title": "Efficiency Multiplier", "desc": "การทวีคูณประสิทธิภาพงานด้วยเครื่องมือที่ถูกต้อง"},
            {"title": "Future Readiness", "desc": "เตรียมความพร้อมสู่โลกการทำงานในอนาคต"}
        ]'::jsonb,
        '[
            {"title": "Interactive Demo", "desc": "สาธิตการใช้เครื่องมือ AI ชั้นนำในธุรกิจ"},
            {"title": "Hands-on Workshop", "desc": "ลงมือเขียน Prompt เพื่อแก้โจทย์งานจริง"},
            {"title": "Workflow Audit", "desc": "สำรวจและปรับปรุงกระบวนการทำงานด้วย AI"}
        ]'::jsonb,
        '[
            {"title": "Prompt Engineering", "desc": "ศิลปะการสื่อสารกับ AI ให้ได้ดั่งใจ"},
            {"title": "AI Tool Selection", "desc": "การเลือกใช้เครื่องมือที่ตอบโจทย์งานเฉพาะด้าน"},
            {"title": "Critical Thinking", "desc": "การตรวจสอบและต่อยอดผลลัพธ์จาก AI"}
        ]'::jsonb,
        ARRAY[
            'ลดเวลาในการทำงานเอกสารและงานวิเคราะห์ลงได้อย่างน้อย 30-50%',
            'สามารถเขียน Prompt ที่ซับซ้อนเพื่อสั่งงาน AI ได้อย่างแม่นยำ',
            'ออกแบบกระบวนการทำงานใหม่ที่สอดแทรก AI เข้าไปอย่างลื่นไหล',
            'มีความมั่นใจในการใช้เทคโนโลยีใหม่ๆ เพื่อสร้างสรรค์ผลงานระดับพรีเมียม'
        ],
        agus_instructor_id,
        true
    )
    ON CONFLICT (slug) DO UPDATE
    SET
        title = EXCLUDED.title, category = EXCLUDED.category, description = EXCLUDED.description, 
        image = EXCLUDED.image, objectives = EXCLUDED.objectives, updated_at = now();

END $$;
