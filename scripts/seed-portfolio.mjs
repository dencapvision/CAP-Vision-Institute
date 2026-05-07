import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nheppvjayzxlblkeanxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const BASE = 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media';

const portfolios = [
  {
    slug: 'central-food-retail-leadership',
    title: 'Leadership Development Program',
    organization: 'Central Food Retail (Tops)',
    course_name: 'Transformational Leadership',
    category: 'Leadership',
    description_short: 'พัฒนาผู้นำรุ่นใหม่ 50+ คน เพื่อขับเคลื่อนองค์กรค้าปลีกชั้นนำ',
    description_full: `Central Food Retail (Tops) เผชิญกับความท้าทายในการสร้างผู้นำรุ่นใหม่ที่สามารถนำทีมในยุคที่การเปลี่ยนแปลงเกิดขึ้นอย่างรวดเร็ว

CAP Vision Institute ออกแบบหลักสูตร Transformational Leadership เฉพาะสำหรับองค์กร โดยใช้ CAP Facilitation Framework ที่ผสาน Experiential Learning เข้ากับ Real Case Study จากธุรกิจค้าปลีก

ผู้เข้าอบรมได้ค้นพบ Leadership Identity ของตนเอง เรียนรู้การสร้าง Vision ที่ทีมเชื่อมั่น และฝึกทักษะการนำการเปลี่ยนแปลงผ่านกระบวนการ Workshop 70%`,
    result: 'พัฒนาผู้นำรุ่นใหม่ 50+ คน — Engagement Score เพิ่มขึ้น 35% ใน 3 เดือนหลังการอบรม',
    keywords: ['Leadership', 'Transformational Leadership', 'Retail', 'Team Development', 'CAP Vision'],
    cover_image: `${BASE}/portfolio/Central%20Food%20Retail%202.jpg`,
    images: [
      { image_url: `${BASE}/portfolio/Central%20Food%20Retail%202.jpg`, caption: 'Workshop กระบวนการค้นพบ Leadership Identity ของผู้เข้าอบรมแต่ละคน', sort_order: 1 },
    ],
  },
  {
    slug: 'vocational-team-synergy',
    title: 'Team Synergy & Learning Culture',
    organization: 'สำนักพัฒนาสมรรถนะครูและบุคลากรอาชีวศึกษา',
    course_name: 'Conflict to Collaboration',
    category: 'Team',
    description_short: 'สร้างวัฒนธรรมการทำงานร่วมกันและพัฒนาทักษะการสื่อสารในองค์กรภาครัฐ',
    description_full: `สำนักพัฒนาสมรรถนะครูและบุคลากรอาชีวศึกษา ต้องการพัฒนาทีมงานให้ทำงานร่วมกันได้อย่างมีประสิทธิภาพมากขึ้น ลดช่องว่างระหว่างแผนก และสร้างบรรยากาศการทำงานเชิงบวก

CAP Vision ออกแบบกระบวนการ Team Synergy Workshop ที่ผสาน Experiential Activities เข้ากับ Reflection และ Dialogue เพื่อให้ทีมเข้าใจความแตกต่างและใช้มันเป็นพลังงาน

ผลลัพธ์คือทีมที่สื่อสารตรงไปตรงมามากขึ้น มีความไว้วางใจสูงขึ้น และสามารถแก้ปัญหาร่วมกันได้อย่างสร้างสรรค์`,
    result: 'ความพึงพอใจในการทำงานเพิ่มขึ้น 40% — ทีมรายงานความร่วมมือข้ามแผนกดีขึ้นอย่างมีนัยสำคัญ',
    keywords: ['Team Building', 'Collaboration', 'Government', 'Communication', 'Culture'],
    cover_image: `${BASE}/portfolio/team%20building1.jpg`,
    images: [
      { image_url: `${BASE}/portfolio/team%20building1.jpg`, caption: 'กิจกรรม Team Synergy ที่ออกแบบเพื่อสร้างความไว้วางใจและพลังงานบวกในทีม', sort_order: 1 },
    ],
  },
  {
    slug: 'womens-association-communication',
    title: 'นวัตกรรมการสื่อสารและการพูดในที่ชุมชน',
    organization: 'สมาคมส่งเสริมบุคลิกสตรี',
    course_name: 'Leadership Communication for Impact',
    category: 'Communication',
    description_short: 'พัฒนาทักษะการสื่อสารและบุคลิกภาพผู้นำสตรีระดับชาติ',
    description_full: `สมาคมส่งเสริมบุคลิกสตรีต้องการพัฒนาสมาชิกให้มีทักษะการสื่อสารที่ทรงพลัง สามารถพูดในที่สาธารณะได้อย่างมั่นใจ และสร้างบุคลิกภาพผู้นำที่น่าเชื่อถือ

CAP Vision ออกแบบหลักสูตรที่รวม Communication Psychology, Public Speaking Techniques และ Personal Branding เข้าด้วยกัน ผ่านกระบวนการ Practice-based Learning

ผู้เข้าอบรมได้ฝึกพูดหน้ากลุ่ม รับ Feedback แบบ Real-time และสร้าง Communication Style ที่เป็นตัวเองอย่างแท้จริง`,
    result: '95% ของผู้เข้าอบรมรายงานความมั่นใจในการพูดในที่สาธารณะเพิ่มขึ้นอย่างมีนัยสำคัญ',
    keywords: ['Communication', 'Public Speaking', 'Leadership', 'Personal Branding', 'Women'],
    cover_image: `${BASE}/portfolio/Communication.jpg`,
    images: [
      { image_url: `${BASE}/portfolio/Communication.jpg`, caption: 'Workshop การพูดในที่สาธารณะ เน้นการฝึกจริงพร้อม Feedback จาก Facilitator', sort_order: 1 },
    ],
  },
  {
    slug: 'onwr-positive-mindset',
    title: 'การคิดบวกอย่างสร้างสรรค์และการทำงานอย่างมีความสุข',
    organization: 'สำนักงานทรัพยากรน้ำแห่งชาติ',
    course_name: 'Growth Mindset & Positive Psychology',
    category: 'Mindset',
    description_short: 'ปรับ Mindset บุคลากรภาครัฐสู่การทำงานอย่างมีความสุขและสร้างสรรค์',
    description_full: `สำนักงานทรัพยากรน้ำแห่งชาติ ต้องการพัฒนา Mindset ของบุคลากรให้มีทัศนคติเชิงบวก รับมือกับการเปลี่ยนแปลงได้ดี และสร้างความสุขในการทำงานอย่างยั่งยืน

CAP Vision ออกแบบหลักสูตรที่ใช้ Positive Psychology, Growth Mindset Framework และ Flow State Learning เพื่อให้ผู้เข้าอบรมค้นพบแรงจูงใจจากภายในและเปลี่ยนแปลงวิธีมองงาน

กระบวนการประกอบด้วย Mindset Assessment, Value Excavation Workshop และ Personal Action Planning เพื่อนำผลลัพธ์กลับไปใช้จริง`,
    result: 'Happiness Index เพิ่มขึ้น 28% — บุคลากรรายงานพลังงานในการทำงานและความพึงพอใจสูงขึ้นอย่างต่อเนื่อง',
    keywords: ['Mindset', 'Positive Psychology', 'Government', 'Happiness', 'Growth Mindset'],
    cover_image: `${BASE}/portfolio/Mindset.jpg`,
    images: [
      { image_url: `${BASE}/portfolio/Mindset.jpg`, caption: 'กิจกรรม Mindset Transformation ที่ช่วยให้ผู้เข้าอบรมค้นพบแรงบันดาลใจจากภายใน', sort_order: 1 },
    ],
  },
];

async function main() {
  console.log('CAP Vision — Seed Portfolio Data');
  console.log('==================================\n');

  for (const p of portfolios) {
    const { images, ...portfolioData } = p;

    // Upsert portfolio
    const { data: port, error: portErr } = await supabase
      .from('portfolio')
      .upsert(portfolioData, { onConflict: 'slug' })
      .select('id, slug')
      .single();

    if (portErr) {
      console.error(`Error upserting ${p.slug}:`, portErr.message);
      continue;
    }

    console.log(`Portfolio: ${port.slug} (${port.id})`);

    // Delete existing images then re-insert
    await supabase.from('portfolio_images').delete().eq('portfolio_id', port.id);

    const imageRows = images.map(img => ({ ...img, portfolio_id: port.id }));
    const { error: imgErr } = await supabase.from('portfolio_images').insert(imageRows);

    if (imgErr) {
      console.error(`  Images error:`, imgErr.message);
    } else {
      console.log(`  Images: ${imageRows.length} inserted`);
    }
  }

  console.log('\nDone! Run create-portfolio-tables.sql in Supabase SQL Editor first.');
}

main();
