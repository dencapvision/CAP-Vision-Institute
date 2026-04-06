-- 20260406110000_add_more_sample_courses.sql
-- Migration to update schema and add high-conversion course data

-- Ensure objectives is JSONB
DO $setup$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'courses' AND column_name = 'objectives' AND data_type = 'ARRAY'
    ) THEN
        ALTER TABLE public.courses ALTER COLUMN objectives TYPE JSONB USING to_jsonb(objectives);
    END IF;
END $setup$;

DO $main$
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
        slug, title, category, description, image, alt_text, long_description,
        duration, audience, why_section, how_section, what_section, objectives,
        instructor_id, is_published
    ) VALUES (
        'conflict-to-collaboration',
        'Conflict to Collaboration: The Art of Generative Teams',
        'People Skills',
        'เปลี่ยนความขัดแย้งเป็นพลังสร้างสรรค์: ศิลปะการสร้างทีมที่มีประสิทธิภาพสูงด้วยเทคนิค Generative Dialogue และ Trust Architecture',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
        'Conflict to Collaboration Hero Image',
        $ldesc$### "ความขัดแย้งไม่ใช่ปัญหา แต่คือโอกาสในการเติบโต"
ในทุกองค์กรความขัดแย้งเป็นเรื่องปกติ แต่สิ่งที่แยก "ทีมชั้นนำ" ออกจาก "ทีมทั่วไป" คือความสามารถในการเปลี่ยนความเห็นต่างให้กลายเป็นนวัตกรรม

หลักสูตรนี้ได้รับการออกแบบมาเพื่อช่วยให้ผู้นำและทีมก้าวข้ามกำแพงทางอารมณ์ สู่ความร่วมมือที่สร้างสรรค์ผ่านกระบวนการหลัก 3 ขั้นตอน: Unlock, Align, และ Action

---

#### 🔶 ทำไมทีมของคุณต้องมีทักษะนี้?
การหนีปัญหาหรือการปะทะด้วยอารมณ์ทำให้องค์กรสูญเสียทรัพยากรมหาศาล หลักสูตรนี้จะให้เครื่องมือในการทำความเข้าใจ "ความต้องการที่แท้จริง" (Needs) หลังข้อโต้แย้ง และสร้างพื้นที่ปลอดภัย (Psychological Safety) เพื่อให้ทุกคนกล้าเสนอไอเดีย

---

#### 🔶 ข้อมูลเบื้องต้น
- **รูปแบบการอบรม**: In-house Training (1 วันเต็ม) หรือ Workshop ต่อเนื่อง
- **จำนวนผู้เข้าอบรม**: 15–30 คน เพื่อประสิทธิภาพสูงสุด
- **กลุ่มเป้าหมาย**: ผู้นำทีม, ผู้จัดการ, และทีมงานที่ต้องการลดความขัดแย้งเชิงลบ$ldesc$,
        '1 วัน (6 ชม.)',
        'Leaders, Managers, HR, Project Teams',
        $json$[
            {"title": " silos culture", "desc": "ต่างคนต่างทำ ข้ามกั้นระหว่างแผนกสูง", "icon": "ShieldExclamation"},
            {"title": "Toxic Vibes", "desc": "บรรยากาศการทำงานอึดอัด คนไม่กล้าพูดความจริง", "icon": "UserX"},
            {"title": "Low Trust", "desc": "ความไว้วางใจต่ำ ทำให้การประสานงานล่าช้า", "icon": "LockClosed"}
        ]$json$::jsonb,
        $json$[
            {"title": "Trust Architecture", "desc": "สร้างโครงสร้างความไว้วางใจใน 5 มิติ", "icon": "Cube"},
            {"title": "Generative Dialogue", "desc": "ฝึกทักษะการฟังที่ได้ยินมากกว่าคำพูด", "icon": "Microphone"},
            {"title": "Emptying Process", "desc": "กระบวนการสลายกำแพงทางอารมณ์", "icon": "Leaf"}
        ]$json$::jsonb,
        $json$[
            {"title": "Psychology of Conflict", "desc": "เข้าใจจิตวิทยาความขัดแย้ง", "icon": "Brain"},
            {"title": "The 4 Levels of Listening", "desc": "การฟัง 4 ระดับสู่ความเข้าใจเชิงลึก", "icon": "CheckBadge"},
            {"title": "Conflict Mapping", "desc": "เครื่องมือวิเคราะห์ทางออกที่ Win-Win", "icon": "Map"}
        ]$json$::jsonb,
        $json$[
            {"title": "เปลี่ยนความขัดแย้งเป็นพลัง", "desc": "รู้วิธีจัดการความขัดแย้งอย่างเป็นระบบ", "icon": "LightningBolt"},
            {"title": "สร้างความสัมพันธ์ที่แข็งแกร่ง", "desc": "ทีมมีความไว้วางใจและทำงานร่วมกันได้ดีขึ้น", "icon": "UserGroup"},
            {"title": "เพิ่มประสิทธิภาพงาน", "desc": "ลดเวลาที่สูญเสียไปกับการทะเลาะวิวาทเชิงลบ", "icon": "PresentationChartLine"}
        ]$json$::jsonb,
        agus_instructor_id,
        true
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        long_description = EXCLUDED.long_description,
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives,
        updated_at = now();


    -- 2. Insert 'Leadership Mindset Reset'
    INSERT INTO public.courses (
        slug, title, category, description, image, alt_text, long_description,
        duration, audience, why_section, how_section, what_section, objectives,
        instructor_id, is_published
    ) VALUES (
        'leadership-mindset-reset',
        'Leadership Mindset Reset: รีเซ็ตวิธีคิดผู้นำ ปลดล็อกศักยภาพทีมทั้งระบบ',
        'Leader Skills',
        'เปลี่ยน "กรอบความคิดเดิม" ที่จำกัดทีม สู่ Mindset ผู้นำยุคใหม่ ที่สร้างทั้งผลงานและคนไปพร้อมกัน ผ่านกระบวนการเรียนรู้แบบ ลงมือทำ + สะท้อนคิด + ตกผลึก',
        'https://images.unsplash.com/photo-1507679799987-c7377bc586df?auto=format&fit=crop&q=80',
        'Leadership Mindset Reset Hero Image',
        $ldesc$### "ผู้นำไม่ได้สร้างผู้ตาม แต่ผู้นำสร้างผู้นำ"
ในโลกที่เปลี่ยนแปลงรวดเร็ว การเป็นเพียง Manager ที่เน้นคุมงานไม่เพียงพออีกต่อไป หลักสูตรนี้จะพาคุณไปสลายกรอบความคิดเดิม (Unlearn) เพื่อสร้างวิสัยทัศน์ที่ทรงพลัง (Relearn) และเป็นผู้นำที่ครองใจทีมงาน

---

#### 🔶 ผู้นำทำงานเก่ง แต่ยังไม่สามารถยกระดับทีมได้จริง?
ไม่ใช่เพราะขาดทักษะ แต่เพราะยังติดอยู่ใน **กรอบความคิดเดิม (Old Mindset)** หลักสูตรนี้ช่วยให้ผู้นำมองเห็นรูปแบบความคิดของตัวเอง เข้าใจผลกระทบต่อทีม และรีเซ็ตวิธีคิดเพื่อสร้างผลลัพธ์ใหม่

---

#### 🔶 ข้อมูลเบื้องต้น
- **รูปแบบการอบรม**: In-house Training (1 วัน / 2 วัน) หรือ Hybrid
- **จำนวนผู้เข้าอบรม**: 20–50 คน
- **กลุ่มเป้าหมาย**: ผู้บริหาร, ผู้จัดการ, Talent / Future Leader

---

#### 🔶 ลูกค้าที่ไว้วางใจ
URC | Central | AOT | Land and Houses | การไฟฟ้าส่วนภูมิภาค (PEA) | ศอ.บต. | ปปส. (100+ องค์กรทั่วประเทศ)

---

#### 🔶 FAQ Questions
**Q: หลักสูตรนี้ต่างจาก Mindset Training ทั่วไปอย่างไร?**
*A: ไม่ได้แค่สอน Growth Mindset แต่ช่วยให้ "เห็นตัวเอง + เปลี่ยนจริง" ด้วยกระบวนการสะท้อนคิดเชิงลึก*

**Q: เหมาะกับองค์กรแบบไหน?**
*A: องค์กรที่ต้องการเปลี่ยน "วิธีคิดของคน" เพื่อยกระดับผลลัพธ์และการทำงานที่เป็นระบบ*$ldesc$,
        '1 วัน (6 ชม.)',
        'ผู้บริหาร, ผู้จัดการ / หัวหน้างาน, Talent / Future Leader',
        $json$[
            {"title": "ผู้นำยึดวิธีเดิม", "desc": "ผู้นำยึดติดความสำเร็จเดิม ไม่กล้าเปลี่ยนแปลง", "icon": "Zap"},
            {"title": "ทีมรอคำสั่ง", "desc": "ทีมงานไม่คิดเอง รอสั่งการอย่างเดียว", "icon": "Search"},
            {"title": "Feedback ไม่เกิดผล", "desc": "Feedback แล้วไม่เกิดการเปลี่ยนแปลงพฤติกรรม", "icon": "MessageCircle"},
            {"title": "ขาด Growth Mindset", "desc": "ทีมขาดความกระตือรือร้นในการเรียนรู้สิ่งใหม่", "icon": "ShieldCheck"}
        ]$json$::jsonb,
        $json$[
            {"title": "Self-Awareness", "desc": "Module 1: เข้าใจกรอบความคิดที่จำกัดตัวเอง", "icon": "Search"},
            {"title": "Mindset Shift", "desc": "Module 2: เปลี่ยน Fixed เป็น Growth Mindset", "icon": "Zap"},
            {"title": "Team Impact", "desc": "Module 3: วิธีคิดผุ้นำส่งผลต่อทีมอย่างไร", "icon": "Users"},
            {"title": "Growth Culture", "desc": "Module 4: สร้าง Psychological Safety ในทีม", "icon": "Layout"},
            {"title": "Action Plan", "desc": "Module 5: ออกแบบวิธีคิดใหม่ในการทำงานจริง", "icon": "Target"}
        ]$json$::jsonb,
        $json$[
            {"title": "Workshop 70%", "desc": "เน้น Learning by Doing ลงมือทำจริง", "icon": "Layout"},
            {"title": "Reflection", "desc": "สะท้อนคิดเชิงลึกเพื่อการตกผลึกทางปัญญา", "icon": "Heart"},
            {"title": "Dialogue", "desc": "เรียนรู้ผ่านการแลกเปลี่ยนแบ่งปัน", "icon": "MessageCircle"},
            {"title": "Real Application", "desc": "การประยุกต์ใช้กับสถานการณ์งานจริง", "icon": "Target"}
        ]$json$::jsonb,
        $json$[
            {"title": "เข้าใจกรอบความคิด", "desc": "ระบุ Mindset ที่จำกัดศักยภาพตนเองได้", "icon": "Search"},
            {"title": "ปรับจูนเป้าหมาย", "desc": "ปรับ Mindset ให้สอดคล้องกับเป้าหมายองค์กร", "icon": "Target"},
            {"title": "เพิ่ม Engagement", "desc": "สร้างการมีส่วนร่วมของทีมอย่างยั่งยืน", "icon": "Users"},
            {"title": "สร้างวัฒนธรรมเรียนรู้", "desc": "เกิดพฤติกรรมการเรียนรู้และกล้าลองสิ่งใหม่", "icon": "Award"}
        ]$json$::jsonb,
        agus_instructor_id,
        true
    ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        long_description = EXCLUDED.long_description,
        why_section = EXCLUDED.why_section,
        how_section = EXCLUDED.how_section,
        what_section = EXCLUDED.what_section,
        objectives = EXCLUDED.objectives,
        updated_at = now();

END $main$;
