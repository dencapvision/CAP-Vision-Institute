-- 🚀 Migration: Standardizing Course Assets (Fixed Schema)
-- Description: Updates slug, image path, alt_text, and description for 13 specific courses.
-- Note: Using 'title' instead of 'name' to match the database schema.

-- 1. Storytelling for Business
UPDATE public.courses
SET 
    slug = 'storytelling-for-business',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-storytelling-for-business-course.png',
    alt_text = 'หลักสูตร Storytelling for Business เล่าเรื่องให้ธุรกิจเดิน โดย CAP Vision Institute',
    description = 'เรียนรู้เทคนิคการเล่าเรื่องเชิงธุรกิจเพื่อดึงดูดใจลูกค้าและสร้างผลลัพธ์ที่นำไปใช้ได้จริง เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'เล่าเรื่องให้ธุรกิจเดิน (Storytelling for Business)' OR title = 'Storytelling for Business' OR title ILIKE '%Storytelling for Business%';

-- 2. Presentation Like a Pro
UPDATE public.courses
SET 
    slug = 'presentation-like-a-pro',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-presentation-like-a-pro-course.png',
    alt_text = 'หลักสูตร Presentation Like a Pro นำเสนองานอย่างมืออาชีพ โดย CAP Vision Institute',
    description = 'ฝึกทักษะการนำเสนอที่ทรงพลังเพื่อสร้างความประทับใจและบรรลุเป้าหมายทางธุรกิจ เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'นำเสนองานอย่างมืออาชีพ (Presentation Like a Pro)' OR title = 'Presentation Like a Pro' OR title ILIKE '%Presentation Like a Pro%';

-- 3. Powerful Speaking
UPDATE public.courses
SET 
    slug = 'the-art-of-influential-communication',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-powerful-speaking-the-art-of-influential-communication-course.png',
    alt_text = 'หลักสูตร The Art of Influential Communication พูดทรงพลังในองค์กร โดย CAP Vision Institute',
    description = 'ศิลปะการสื่อสารเพื่อการโน้มน้าวใจและสร้างอิทธิพลอย่างสร้างสรรค์ในองค์กร เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Powerful Speaking: พูดทรงพลังในองค์กร (The Art of Influential Communication)' OR title = 'The Art of Influential Communication' OR title ILIKE '%Influential Communication%';

-- 4. Communication Mastery
UPDATE public.courses
SET 
    slug = 'communication-mastery',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-communication-mastery-supervisory-level-course.png',
    alt_text = 'หลักสูตร Communication Mastery สื่อสารอย่างมืออาชีพสำหรับระดับหัวหน้างาน โดย CAP Vision Institute',
    description = 'ยกระดับทักษะการสื่อสารรอบด้านเพื่อการบริหารงานและบริหารคนที่เปี่ยมประสิทธิภาพ เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Communication Mastery: สื่อสารอย่างมืออาชีพ สำหรับระดับหัวหน้างาน' OR title = 'Communication Mastery' OR title ILIKE '%Communication Mastery%';

-- 5. Leadership Communication for Impact
UPDATE public.courses
SET 
    slug = 'leadership-communication-for-impact',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-leadership-communication-for-impact-course.png',
    alt_text = 'หลักสูตร Leadership Communication for Impact โดย CAP Vision Institute',
    description = 'เทคนิคการสื่อสารสำหรับผู้นำเพื่อสร้างแรงบันดาลใจและขับเคลื่อนผลลัพธ์ที่ยั่งยืน เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Leadership Communication for Impact' OR title ILIKE '%Leadership Communication for Impact%';

-- 6. Strategic Thinking for Leaders
UPDATE public.courses
SET 
    slug = 'strategic-thinking-for-leaders',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-strategic-thinking-for-leaders-course.png',
    alt_text = 'หลักสูตร Strategic Thinking for Leaders พัฒนาความคิดเชิงกลยุทธ์ โดย CAP Vision Institute',
    description = 'ขยายมุมมองแนวคิดเชิงกลยุทธ์เพื่อการตัดสินใจและวางแผนอนาคตขององค์กรอย่างแม่นยำ เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Strategic Thinking for Leaders' OR title ILIKE '%Strategic Thinking for Leaders%';

-- 7. Leading with Purpose
UPDATE public.courses
SET 
    slug = 'leading-with-purpose',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-leading-with-purpose-course.png',
    alt_text = 'หลักสูตร Leading with Purpose นำทีมด้วยความหมาย โดย CAP Vision Institute',
    description = 'สร้างพลังขับเคลื่อนจากภายในสู่การนำทีมงานด้วยเป้าหมายที่ชัดเจนและทรงความหมาย เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Leading with Purpose: นำทีมด้วยความหมาย สร้างพลังขับเคลื่อนจากภายใน' OR title = 'Leading with Purpose' OR title ILIKE '%Leading with Purpose%';

-- 8. Transformational Leadership
UPDATE public.courses
SET 
    slug = 'transformational-leadership',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-transformational-leadership-course.png',
    alt_text = 'หลักสูตร Transformational Leadership ผู้นำแห่งการเปลี่ยนแปลง โดย CAP Vision Institute',
    description = 'พัฒนาทักษะผู้นำเพื่อการปรับเปลี่ยนและยกระดับองค์กรสู่ความสำเร็จในยุคใหม่ เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Transformational Leadership' OR title ILIKE '%Transformational Leadership%';

-- 9. Leadership Mindset Reset
UPDATE public.courses
SET 
    slug = 'leadership-mindset-reset',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-leadership-mindset-reset-course.png',
    alt_text = 'หลักสูตร Leadership Mindset Reset รีเซ็ตวิธีคิดผู้นำ โดย CAP Vision Institute',
    description = 'ปรับจูนวิธีคิด (Mindset) ของผู้นำเพื่อปลดล็อกศักยภาพของทีมงานได้อย่างไร้ขีดจำกัด เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Leadership Mindset Reset: รีเซ็ตวิธีคิดผู้นำ ปลดล็อกศักยภาพทีมทั้งระบบ' OR title = 'Leadership Mindset Reset' OR title ILIKE '%Mindset Reset%';

-- 10. Conflict to Collaboration
UPDATE public.courses
SET 
    slug = 'conflict-to-collaboration',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-conflict-to-collaboration-course.png',
    alt_text = 'หลักสูตร Conflict to Collaboration: The Art of Generative Teams โดย CAP Vision Institute',
    description = 'เปลี่ยนความขัดแย้งให้เป็นพลังแห่งการร่วมมือผ่านศิลปะการสร้างทีมเชิงสร้างสรรค์ เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Conflict to Collaboration: The Art of Generative Teams' OR title ILIKE '%Conflict to Collaboration%';

-- 11. AI Mastery for Professionals
UPDATE public.courses
SET 
    slug = 'ai-mastery-for-professionals',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-ai-mastery-for-professionals-course.png',
    alt_text = 'หลักสูตร AI Mastery for Professionals โดย CAP Vision Institute',
    description = 'ติดอาวุธทักษะ AI เพื่อเพิ่มประสิทธิภาพการทำงานแบบมืออาชีพในทุกมิติ เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'AI Mastery for Professionals' OR title ILIKE '%AI Mastery%';

-- 12. Creative Problem Solving (CPS)
UPDATE public.courses
SET 
    slug = 'creative-problem-solving',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-creative-problem-solving-course.png',
    alt_text = 'หลักสูตร Creative Problem Solving (CPS) การแก้ปัญหาอย่างสร้างสรรค์ โดย CAP Vision Institute',
    description = 'กระบวนการแก้ปัญหาอย่างเป็นระบบและสร้างสรรค์เพื่อหาทางออกที่ยอดเยี่ยมที่สุด เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'Creative Problem Solving (CPS)' OR title = 'หลักสูตร การแก้ปัญหาอย่างสร้างสรรค์ (Creative Problem Solving)' OR title ILIKE '%Creative Problem Solving%';

-- 13. The Modern Facilitator
UPDATE public.courses
SET 
    slug = 'the-modern-facilitator',
    image = 'https://assets.capvisionpartner.com/media/Course/cap-vision-the-modern-facilitator-course.png',
    alt_text = 'หลักสูตร The Modern Facilitator โดย CAP Vision Institute',
    description = 'บทบาทผู้อำนวยการเรียนรู้ยุคใหม่เพื่อสร้างการมีส่วนร่วมและผลลัพธ์ที่มีประสิทธิภาพ เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ',
    updated_at = now()
WHERE title = 'The Modern Facilitator' OR title ILIKE '%Modern Facilitator%';
