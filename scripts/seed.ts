import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import { resolve } from 'path';

// Parse .env manually to avoid needing dotenv
const envPathLocal = resolve(process.cwd(), '.env.local');
const envPath = resolve(process.cwd(), '.env');

const configPath = fs.existsSync(envPathLocal) ? envPathLocal : (fs.existsSync(envPath) ? envPath : null);

if (configPath) {
  const envConfig = fs.readFileSync(configPath, 'utf-8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
  });
}


// Make sure to load constants (We copy the needed parts or import them directly)
// Since this script is TS, we might need a runner like ts-node or bun
// import { EVENT_INFO } from '../constants/events';
// import { IN_HOUSE_COURSES, PUBLIC_TRAININGS } from '../constants/courses';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🌱 Starting database seed...');

  // 1. Insert Instructor
  const { data: instructor, error: instructorError } = await supabase
    .from('instructors')
    .upsert({
      slug: 'den-masterfa',
      name: 'ครูเด่น มาสเตอร์ฟา',
      bio: 'ผู้เชี่ยวชาญด้าน Learning Design และ Facilitator',
      image: '/images/hero-profile.png',
    }, { onConflict: 'slug' })
    .select('id')
    .single();

  if (instructorError) {
    console.error('Error inserting instructor:', instructorError);
    return;
  }

  const instructorId = instructor.id;
  console.log('✅ Instructor created/found:', instructorId);

  // 2. Insert In-house/Public Courses
  // For simplicity, we are inserting the specific courses from constants
  const coursesToInsert = [
    {
      slug: 'the-modern-facilitator',
      title: 'The Modern Facilitator',
      category: 'In-house Training',
      description: 'ยกระดับทักษะการจัดกระบวนการเรียนรู้สู่ระดับยอดเยี่ยม',
      image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      alt_text: 'The Modern Facilitator Course',
      duration: '2 วัน (12 ชั่วโมง)',
      audience: 'วิทยากร, HRD, หัวหน้างานที่ต้องสอนงาน',
      instructor_id: instructorId,
      is_published: true,
      what_section: [
        'ทักษะการเรียนรู้แบบมีส่วนร่วม',
        'จิตวิทยาการเรียนรู้สำหรับผู้ใหญ่ (Adult Learning Psychology)',
        'เทคนิคการใช้คำถามเพื่อฉุกคิด (Powerful Questioning)'
      ],
      why_section: [
        'ผู้เรียนคาดหวังประสบการณ์การเรียนรู้ที่ไม่ใช่แค่การนั่งฟัง',
        'การเปลี่ยนแปลงพฤติกรรมเกิดจากการมีส่วนร่วม ไม่ใช่แค่การรับรู้',
        'Facilitator คือตัวเร่งปฏิกิริยาแห่งการเปลี่ยนแปลงในองค์กร'
      ],
      how_section: [
        'ออกแบบโมดูลย่อยชัดเจน (Micro-Learning)',
        'กิจกรรมเจาะจงเป้าหมาย (Purposeful Activity)',
        'สกัดบทเรียนเชิงลึก (Deep Debriefing)'
      ],
      search_metadata: {
        keywords: ['facilitator', 'training', 'learning design', 'modern facilitator', 'ครูเด่น', 'การสอน'],
        relevance_score: 1.0,
        tags: ['HRD', 'Training', 'Active Learning']
      }
    },
    {
      slug: 'cps-problem-solving',
      title: 'Creative Problem Solving',
      category: 'In-house Training',
      description: 'ทักษะการแก้ปัญหาอย่างสร้างสรรค์เพื่อผลลัพธ์ที่แตกต่าง',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      alt_text: 'Creative Problem Solving Course',
      duration: '1 วัน (6 ชั่วโมง)',
      audience: 'พนักงานทุกระดับ, หัวหน้างานระดับต้น-กลาง',
      instructor_id: instructorId,
      is_published: true,
      what_section: [
        'การระบุปัญหาที่แท้จริง (Root Cause Analysis)',
        'การคิดนอกกรอบ (Out of the Box Thinking)',
        'การประเมินทางเลือกและการตัดสินใจ'
      ],
      why_section: [
        'ความซับซ้อนของปัญหาในปัจจุบันต้องการกระบวนการคิดรูปแบบใหม่',
        'แนวคิดสร้างสรรค์คือตัวช่วยในการหาทางออกที่มีประสิทธิภาพ',
        'เพิ่มทักษะความได้เปรียบด้วยปัญหาเชิงซ้อน'
      ],
      how_section: [
        'กรณีศึกษาจากเหตุการณ์จริง (Real Case Study)',
        'จำลองสถานการณ์สมมติ (Role Play)',
        'การฝึกคิดวิเคราะห์เป็นกลุ่ม (Group Brainstorming)'
      ],
      search_metadata: {
        keywords: ['problem solving', 'creative thinking', 'cps', 'การแก้ปัญหา', 'ความคิดสร้างสรรค์'],
        relevance_score: 0.9,
        tags: ['Soft Skills', 'Innovation', 'Decision Making']
      }
    }
  ];

  for (const course of coursesToInsert) {
    const { error } = await supabase
      .from('courses')
      .upsert(course, { onConflict: 'slug' });
    if (error) console.error(`Error inserting course ${course.slug}:`, error);
  }
  console.log('✅ Courses seeded');

  // 3. Online Courses
  const onlineCoursesToInsert = [
    {
      slug: 'mastering-agile-facilitation',
      title: 'Mastering Agile Facilitation',
      category: 'Online / Self-Paced',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      duration: '10 ชั่วโมง',
      lessons: 25,
      price: 2900,
      instructor_id: instructorId,
      is_published: true,
      search_metadata: {
        keywords: ['agile', 'facilitation', 'online course', 'scrum', 'agile facilitator'],
        relevance_score: 0.8,
        tags: ['Agile', 'Remote Work', 'Management']
      }
    },
    {
      slug: 'design-thinking-for-hr',
      title: 'Design Thinking for HR',
      category: 'Online / Live',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      duration: '12 ชั่วโมง',
      lessons: 15,
      price: 3500,
      instructor_id: instructorId,
      is_published: true,
      search_metadata: {
        keywords: ['design thinking', 'hr', 'human resources', 'innovation in hr'],
        relevance_score: 0.8,
        tags: ['HR', 'Design Thinking', 'Strategy']
      }
    }
  ];

  for (const course of onlineCoursesToInsert) {
    const { error } = await supabase
      .from('online_courses')
      .upsert(course, { onConflict: 'slug' });
    if (error) console.error(`Error inserting online course ${course.slug}:`, error);
  }
  console.log('✅ Online Courses seeded');

  // 4. Events
  const eventsToInsert = [
    {
      title: 'The Modern Facilitator Workshop',
      event_date: '2024-03-25T00:00:00Z',
      location: 'Bangkok / Online',
      link: '#',
      speaker_id: instructorId,
      is_published: true,
      search_metadata: {
        keywords: ['workshop', 'bangkok', 'facilitator workshop', 'live event'],
        relevance_score: 1.0,
        tags: ['Workshop', 'Live', 'Bangkok']
      }
    },
    {
      title: 'Leadership DNA for HR Leaders',
      event_date: '2024-04-10T00:00:00Z',
      location: 'Hotel in Bangkok',
      link: '#',
      speaker_id: instructorId,
      is_published: true,
      search_metadata: {
        keywords: ['leadership', 'hr leaders', 'dna', 'executive training'],
        relevance_score: 0.9,
        tags: ['Leadership', 'HR', 'Executive']
      }
    }
  ];

  for (const event of eventsToInsert) {
    // We don't have a unique column for simple events other than ID, so we just insert
    // But to make script idempotent, we delete old seed events first or just let it insert duplicate if run twice.
    // For now we'll just insert
    const { error } = await supabase
      .from('events')
      .insert(event);
    if (error) console.error(`Error inserting event ${event.title}:`, error);
  }
  console.log('✅ Events seeded');

  console.log('🎉 Seeding completed successfully!');
}

seed().catch(console.error);
