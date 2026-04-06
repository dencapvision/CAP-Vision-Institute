-- 1. Ensure the 'objectives' column is JSONB (Fix for type mismatch text[] vs jsonb)
ALTER TABLE public.courses 
ALTER COLUMN objectives TYPE JSONB 
USING to_jsonb(objectives);

DO $$
DECLARE
    agus_instructor_id UUID;
BEGIN
    -- Ensure instructor exists or create one
    SELECT id INTO agus_instructor_id FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;
    
    IF agus_instructor_id IS NULL THEN
        INSERT INTO public.instructors (slug, name, bio, image)
        VALUES (
            'den-masterfa',
            'ครูเด่น (Den MasterFa)',
            'ผู้เชี่ยวชาญด้าน Transformative Learning และการออกแบบกระบวนการเรียนรู้เพื่อการเปลี่ยนแปลงองค์กร (CAP Theory)',
            'https://capvisionpartner.com/images/instructors/den.jpg'
        ) RETURNING id INTO agus_instructor_id;
    END IF;

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
        'หลักสูตรนี้จะพาคุณไปเจาะลึกถึงรากเหง้าของความขัดแย้ง และใช้เครื่องมือในการสร้างความเข้าใจแบบ Inside-Out เพื่อเปลี่ยนทีมจาก Silo ให้เป็น Synergy' || chr(10) ||
        '---' || chr(10) ||
        '#### สาระสำคัญของหลักสูตร' || chr(10) ||
        '1. **Understanding Conflict**: ความเข้าใจธรรมชาติของมนุษย์และความแตกต่าง' || chr(10) ||
        '2. **The 3 Layers of Trust**: การสร้างฐานความมั่นคงในใจเพื่อนร่วมทีม' || chr(10) ||
        '3. **Generative Dialogue**: เทคนิคการคุยเพื่อต่อยอด ไม่ใช่คุยเพื่อเอาชนะ',
        '1 วัน (6 ชม.)',
        'ทีมบริหาร, หัวหน้างาน, พนักงานระดับปฏิบัติการ, Cross-functional Teams',
        '[
            {"title": "The Root of Friction", "desc": "วิเคราะห์สาเหตุที่ทำให้เกิดความขัดแย้งในที่ทำงาน", "icon": "Search"},
            {"title": "Empathy Gap", "desc": "การลดช่องว่างความไม่เข้าใจด้วยใจที่เปิดรับ", "icon": "Heart"},
            {"title": "Trust Economy", "desc": "ความไว้วางใจคือต้นทุนสำคัญของผลผลิตในทีม", "icon": "ShieldCheck"}
        ]'::jsonb,
        '[
            {"title": "DFA Strategy", "desc": "Dynamic, Flow, และ Art of Collaboration", "icon": "Zap"},
            {"title": "Simulation Games", "desc": "กิจกรรมจำลองสถานการณ์ความขัดแย้งเสมือนจริง", "icon": "Layout"},
            {"title": "Safe Space Dialogue", "desc": "การสร้างพื้นที่ปลอดภัยในการแลกเปลี่ยนความคิด", "icon": "MessageCircle"}
        ]'::jsonb,
        '[
            {"title": "Radical Empathy", "desc": "ทักษะการเข้าใจผู้อื่นในระดับลึก", "icon": "Heart"},
            {"title": "Generative Dialogue", "desc": "การสนทนาเพื่อหาทางเลือกใหม่ร่วมกัน", "icon": "MessageCircle"},
            {"title": "Conflict Framework", "desc": "กรอบการทำงานในการจัดการปัญหาอย่างเป็นระบบ", "icon": "Target"}
        ]'::jsonb,
        '[
            {"title": "ระบุสไตล์การสื่อสาร", "desc": "เข้าใจความต่างของสมาชิกในทีม", "icon": "Users"},
            {"title": "ลดอัตราความขัดแย้ง", "desc": "ป้องกันปัญหาล่วงหน้าก่อนลุกลาม", "icon": "Zap"},
            {"title": "Team Agreement", "desc": "สร้างข้อตกลงร่วมกันที่ทุกคนยอมรับ", "icon": "CheckCircle2"},
            {"title": "ฟังแบบ Deep Listening", "desc": "ทักษะการฟังที่ลดการตัดสิน", "icon": "Heart"}
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
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives, 
        updated_at = now();

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
        'หลักสูตรนี้ออกแบบมาเพื่อผู้ปฏิบัติงานยุคใหม่ที่ต้องการก้าวข้ามการทำงานแบบเดิมๆ สู่การเป็น AI-Powered Professional' || chr(10) ||
        '---' || chr(10) ||
        '#### เรียนรู้อะไรบ้าง?' || chr(10) ||
        '1. **Prompt Engineering 101**: วิธีสั่งงาน AI ให้ได้ผลลัพธ์ดั่งใจ' || chr(10) ||
        '2. **AI-Driven Creativity**: การใช้ AI เป็นผู้ช่วยในการคิดไอเดียและวางแผน' || chr(10) ||
        '3. **Ethics and Accuracy**: การตรวจสอบความถูกต้องและจริยธรรมในการใช้ AI',
        '1 วัน (6 ชม.)',
        'Business Professionals, Content Creators, Admin Teams, พนักงานทุกคนที่ต้องการเพิ่ม Productivity',
        '[
            {"title": "AI Opportunity", "desc": "มองเห็นโอกาสในการใช้ AI เข้ามาช่วยงาน", "icon": "Search"},
            {"title": "Efficiency Multiplier", "desc": "การทวีคูณประสิทธิภาพงานด้วยเครื่องมือที่ถูกต้อง", "icon": "Zap"},
            {"title": "Future Readiness", "desc": "เตรียมความพร้อมสู่โลกการทำงานในอนาคต", "icon": "ShieldCheck"}
        ]'::jsonb,
        '[
            {"title": "Interactive Demo", "desc": "สาธิตการใช้เครื่องมือ AI ชั้นนำในธุรกิจ", "icon": "Layout"},
            {"title": "Hands-on Workshop", "desc": "ลงมือเขียน Prompt เพื่อแก้โจทย์งานจริง", "icon": "Video"},
            {"title": "Workflow Audit", "desc": "สำรวจและปรับปรุงกระบวนการทำงานด้วย AI", "icon": "Target"}
        ]'::jsonb,
        '[
            {"title": "Prompt Engineering", "desc": "ศิลปะการสื่อสารกับ AI ให้ได้ดั่งใจ", "icon": "MessageCircle"},
            {"title": "AI Tool Selection", "desc": "การเลือกใช้เครื่องมือที่ตอบโจทย์งานเฉพาะด้าน", "icon": "Search"},
            {"title": "Critical Thinking", "desc": "การตรวจสอบและต่อยอดผลลัพธ์จาก AI", "icon": "ShieldCheck"}
        ]'::jsonb,
        '[
            {"title": "ลดเวลาทำงาน 50%", "desc": "ทำงานได้เร็วขึ้นด้วย AI Workflow", "icon": "Zap"},
            {"title": "Master Prompting", "desc": "เขียน Prompt ซับซ้อนได้อย่างแม่นยำ", "icon": "MessageCircle"},
            {"title": "ออกแบบ AI Workflow", "desc": "สร้างระบบงานอัตโนมัติเบื้องต้น", "icon": "Layout"},
            {"title": "Tech Confidence", "desc": "มั่นใจในการใช้เทคโนโลยีใหม่ๆ", "icon": "Award"}
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
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives, 
        updated_at = now();

    -- 3. Insert 'Leadership Mindset Reset' (Ensure consistency)
    INSERT INTO public.courses (
        slug, title, category, description, image, alt_text, long_description, duration, audience,
        why_section, how_section, what_section, objectives, instructor_id, is_published
    )
    VALUES (
        'leadership-mindset-reset',
        'Leadership Mindset Reset: Transforming from Manager to Leader',
        'Leader Skills',
        'ปรับจูนหัวใจและวิธีคิดของผู้นำยุคใหม่ เปลี่ยนจาก "ผู้สั่งการ" เป็น "ผู้สร้างแรงบันดาลใจ" ด้วยเทคนิค Transformative Learning และ CAP Theory',
        'https://images.unsplash.com/photo-1507679799987-c7377bc586df?auto=format&fit=crop&q=80',
        'Leadership Mindset Reset Hero Image',
        '### "ผู้นำไม่ได้สร้างผู้ตาม แต่ผู้นำสร้างผู้นำ"' || chr(10) ||
        'ในโลกที่เปลี่ยนแปลงรวดเร็ว การเป็นเพียง Manager ที่เน้นคุมงานไม่เพียงพออีกต่อไป' || chr(10) ||
        'หลักสูตรนี้จะพาคุณไปสลายกรอบความคิดเดิม (Unlearn) เพื่อสร้างวิสัยทัศน์ที่ทรงพลัง (Relearn) และเป็นผู้นำที่ครองใจทีมงาน',
        '1 วัน (6 ชม.)',
        'HR Manager, Team Leader, ผู้บริหารระดับกลาง-สูง',
        '[
            {"title": "VUCA World", "desc": "เข้าใจความท้าทายของโลกยุคใหม่", "icon": "Search"},
            {"title": "Fixed vs Growth", "desc": "ทำลายกำแพงความคิดเดิมๆ", "icon": "Zap"},
            {"title": "Influence Strategy", "desc": "พลังแห่งการโน้มน้าวใจโดยไม่ใช้คำสั่ง", "icon": "Target"}
        ]'::jsonb,
        '[
            {"title": "CAP Theory", "desc": "การเรียนรู้ผ่านประสบการณ์จริง", "icon": "Layout"},
            {"title": "Peer Coaching", "desc": "การฝึกโค้ชเพื่อนร่วมงาน", "icon": "Users"},
            {"title": "Action Learning", "desc": "แก้โจทย์ธุรกิจจริงในห้องเรียน", "icon": "ShieldCheck"}
        ]'::jsonb,
        '[
            {"title": "Self Mastery", "desc": "การควบคุมอารมณ์และสติของผู้นำ", "icon": "Heart"},
            {"title": "Storytelling", "desc": "ศิลปะการเล่าเรื่องเพื่อสร้างแรงบันดาลใจ", "icon": "MessageCircle"},
            {"title": "Feedback Loop", "desc": "การสร้างวัฒนธรรมการให้ข้อมูลสะท้อนกลับ", "icon": "Layout"}
        ]'::jsonb,
        '[
            {"title": "เปลี่ยน Mindset", "desc": "ก้าวข้ามขีดจำกัดเดิมของตัวเอง", "icon": "Zap"},
            {"title": "สร้างทีมที่ยืดหยุ่น", "desc": "พร้อมรับมือกับทุกการเปลี่ยนแปลง", "icon": "Users"},
            {"title": "เป็น Role Model", "desc": "สร้างความเคารพจากผลงานและการกระทำ", "icon": "Award"}
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
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives, 
        updated_at = now();

END $$;
