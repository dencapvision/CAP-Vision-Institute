-- Migration: Add 'Storytelling for Business' course
-- Path: supabase/migrations/20260408130000_add_storytelling_for_business_course.sql

DO $$
DECLARE v UUID;
BEGIN
  SELECT id INTO v FROM public.instructors WHERE name ILIKE '%ครูเด่น%' LIMIT 1;

  INSERT INTO public.courses (
    slug, title, category, description, image, alt_text,
    long_description, duration, audience,
    why_section, how_section, what_section, objectives,
    instructor_id, is_published
  )
  VALUES (
    'storytelling-for-business',
    'เล่าเรื่องให้ธุรกิจเดิน (Storytelling for Business)',
    'Communication Skills',
    'เปลี่ยนข้อมูลและตัวเลขให้กลายเป็นเรื่องเล่าที่จับใจ สร้างแรงบันดาลใจ และขับเคลื่อนการตัดสินใจในองค์กร',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/Course/Storytelling%20for%20Business.jpg',
    'หลักสูตร Storytelling for Business - เล่าเรื่องให้ธุรกิจเดิน โดย ครูเด่น มาสเตอร์ฟา CAP Vision Institute',
    'ในยุคที่ข้อมูลล้นหลาม สิ่งที่ทำให้ผู้คนหยุดฟัง จดจำ และลงมือทำ ไม่ใช่ตัวเลขหรือ Data แต่คือเรื่องเล่าที่ดีหนึ่งเรื่อง นักธุรกิจที่ยิ่งใหญ่ ไม่ว่าจะเป็น Steve Jobs, Simon Sinek หรือ Elon Musk ล้วนเป็นนักเล่าเรื่องชั้นยอด หลักสูตรนี้ไม่ได้สอนให้พูดเก่งขึ้น แต่สอนให้สื่อสารด้วยหัวใจ ผ่านโครงสร้าง Story ที่ออกแบบมาเพื่องานธุรกิจโดยเฉพาะ',
    'In-house Training 1-2 วัน | 20-40 คน',
    'ผู้บริหาร / CEO, Sales & Marketing, HR & L&D, Project Manager, ทุกคนที่ต้องโน้มน้าวและสร้างแรงบันดาลใจให้ผู้อื่น',
    jsonb_build_array(
      jsonb_build_object('label','Retention Rate','stat','22X','desc','ข้อมูลที่นำเสนอผ่านเรื่องเล่าถูกจดจำได้มากกว่าข้อมูลล้วนๆ ถึง 22 เท่า (Stanford Research)','icon','Brain'),
      jsonb_build_object('label','Persuasion Power','stat','+65%','desc','การตัดสินใจซื้อหรือสนับสนุนเพิ่มขึ้นเมื่อใช้ Story แทนการนำเสนอ Feature/Spec','icon','Target'),
      jsonb_build_object('label','Emotional Connection','stat','Deep','desc','Story กระตุ้นสมองส่วน Emotion ทำให้ผู้ฟัง Feel ก่อน Think และ Act ตามมา','icon','Heart'),
      jsonb_build_object('label','Leadership Impact','stat','สูงขึ้น','desc','ผู้นำที่เล่าเรื่องเป็นสร้าง Vision Alignment และ Team Engagement ได้ดีกว่า 3 เท่า','icon','Star')
    ),
    jsonb_build_array(
      jsonb_build_object('title','Story Deconstruction','desc','ถอดแบบเรื่องเล่าที่ทรงพลังจากผู้นำระดับโลก แล้วนำ Framework มาประยุกต์ใช้จริง','icon','Layers'),
      jsonb_build_object('title','Story Building Workshop','desc','เขียนและเล่าเรื่องธุรกิจของตัวเองในคลาส รับ Feedback ทันทีจากวิทยากรและเพื่อน','icon','Zap'),
      jsonb_build_object('title','Real Business Cases','desc','ฝึกผ่านโจทย์จริง เช่น Pitch ผู้บริหาร เปิดตัวโปรเจกต์ Lead Change ด้วย Story','icon','Target')
    ),
    jsonb_build_array(
      jsonb_build_object('title','Why Story Works','desc','วิทยาศาสตร์เบื้องหลังพลังของ Storytelling ทำไม Brain ถึงตอบสนองต่อเรื่องเล่ามากกว่าข้อมูล','icon','Brain'),
      jsonb_build_object('title','Story Frameworks','desc','Hero Journey, Problem-Solution, Before-After-Bridge และ frameworks อื่นที่ใช้ได้ทันที','icon','Layers'),
      jsonb_build_object('title','Business Story Types','desc','Pitch Story, Brand Story, Change Story, Teaching Story — รู้จักประเภทและเลือกใช้ให้ถูก','icon','BookOpen'),
      jsonb_build_object('title','Story Ingredients','desc','Character, Conflict, Transformation, Stakes — 4 องค์ประกอบที่ทำให้เรื่องเล่ามีพลัง','icon','Sparkles'),
      jsonb_build_object('title','Data Storytelling','desc','เปลี่ยนตัวเลขและ Data ให้มีชีวิต ผู้ฟังเข้าใจและจดจำได้ทันที','icon','BarChart3'),
      jsonb_build_object('title','Story in Action','desc','เล่าเรื่องจริงต่อกลุ่ม รับ Feedback + Coaching จากวิทยากรแบบตัวต่อตัว','icon','Users')
    ),
    jsonb_build_array(
      jsonb_build_object('title','Module 1: Why Story Works — วิทยาศาสตร์เบื้องหลัง Storytelling','desc','เข้าใจว่าทำไม Brain ถึงตอบสนองต่อเรื่องเล่า และความแตกต่างระหว่าง Story กับ Presentation ธรรมดา'),
      jsonb_build_object('title','Module 2: Story Frameworks — โครงสร้างที่ใช้ได้จริง','desc','Hero Journey, Problem-Solution-Resolution, Before-After-Bridge, Sparkline — เลือก Framework ให้เหมาะกับสถานการณ์'),
      jsonb_build_object('title','Module 3: Business Story Types — Story สำหรับแต่ละโอกาส','desc','Pitch Story (ขอทุน/ขออนุมัติ), Brand Story (สร้างความเชื่อถือ), Change Story (นำการเปลี่ยนแปลง), Teaching Story (ถ่ายทอดความรู้)'),
      jsonb_build_object('title','Module 4: Story Ingredients — ส่วนผสมของเรื่องเล่าที่จับใจ','desc','สร้าง Character ที่ผู้ฟัง Relate ได้, ออกแบบ Conflict ที่สร้างความตึงเครียด และ Transformation ที่สร้างแรงบันดาลใจ'),
      jsonb_build_object('title','Module 5: Data Storytelling — เมื่อตัวเลขมีหัวใจ','desc','เทคนิคการเปลี่ยน Graph และ Dashboard ให้กลายเป็นเรื่องเล่าที่ผู้ฟังเข้าใจและรู้สึกได้'),
      jsonb_build_object('title','Module 6: Story in Action — เล่าจริง วัดผลจริง','desc','นำ Story ที่สร้างเองมาเล่าต่อกลุ่ม รับ Peer Feedback และ Coaching จากวิทยากร พร้อม Action Plan นำกลับไปใช้')
    ),
    v,
    true
  )
  ON CONFLICT (slug) DO UPDATE SET
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
    is_published = true,
    updated_at = now();
END $$;
