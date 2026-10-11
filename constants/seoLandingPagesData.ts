import React from 'react';

export interface SEOLandingPageData {
  slug: string;
  url: string;
  intent: 'Commercial' | 'Niche' | 'Premium' | 'B2B';
  badge: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  subH1: string;
  tagline: string;
  valueProposition: string;
  primaryCta: string;
  secondaryCta: string;
  heroImage: string;
  themeColor: string;
  accentColor: string;
  
  painPointsTitle: string;
  painPointsDescription: string;
  painPoints: Array<{
    title: string;
    description: string;
  }>;
  
  solutionTitle: string;
  solutionDescription: string;
  solutions: Array<{
    title: string;
    description: string;
  }>;
  
  modulesTitle: string;
  modulesDescription: string;
  modules: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
  }>;

  businessOutcomes: Array<{
    title: string;
    desc: string;
  }>;

  targetAudience: string[];
  formatAndDuration: {
    duration: string;
    groupSize: string;
    mode: string;
  };

  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const SEO_LANDING_PAGES_DATA: Record<string, SEOLandingPageData> = {
  'in-house-training': {
    slug: 'in-house-training',
    url: '/in-house-training',
    intent: 'Commercial',
    badge: 'Customized In-house Training for Organizations',
    metaTitle: 'รับจัดอบรม In-house Training สำหรับองค์กร | Customized Learning โดย CAP Vision',
    metaDescription: 'บริการรับจัดอบรม In-house Training ที่ออกแบบเฉพาะตามเป้าหมายขององค์กร (Customized Learning) โดย ครูเด่น Master Facilitator ประสบการณ์ 18+ ปี เปลี่ยนคน สร้างทีม ยกระดับองค์กร',
    keywords: [
      'รับจัดอบรม In-house Training', 'In-house Training สำหรับองค์กร', 
      'จัดอบรมภายในองค์กร', 'Customized Training', 'พัฒนาบุคลากร',
      'Training สำหรับองค์กร', 'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'รับจัดอบรม In-house Training สำหรับองค์กร',
    subH1: 'ออกแบบการเรียนรู้แบบ Customized & Transformative Learning ที่แก้โจทย์จริงของธุรกิจ',
    tagline: 'เปลี่ยนการอบรมแบบเดิมๆ สู่ประสบการณ์การเรียนรู้ที่สร้างการเปลี่ยนแปลงเชิงพฤติกรรมและผลลัพธ์จริง',
    valueProposition: 'CAP Vision Institute ไม่ได้มองการจัดอบรมเป็นเพียงการสอนทฤษฎีในห้องสัมมนา แต่เราคือ Partner ที่ร่วมออกแบบสถาปัตยกรรมการเรียนรู้ (Learning Architecture) ร่วมกับผู้บริหารและ HR เพื่อแก้ Pain Point ตรงจุด และขับเคลื่อนผลตอบแทนที่คุ้มค่า (ROI)',
    primaryCta: 'ปรึกษาและออกแบบหลักสูตรองค์กร',
    secondaryCta: 'ดูหลักสูตรและผลงานที่ผ่านมา',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    themeColor: '#2563EB',
    accentColor: '#F59E0B',
    
    painPointsTitle: 'ทำไมการจัดอบรม In-house แบบเดิมๆ ถึงมักไม่เห็นผล?',
    painPointsDescription: 'หลายองค์กรทุ่มงบประมาณจัดฝึกอบรมทุกปี แต่กลับพบว่าพฤติกรรมของพนักงานและผลลัพธ์ของธุรกิจยังอยู่ที่เดิม',
    painPoints: [
      {
        title: 'หลักสูตรสำเร็จรูปที่ไม่ตรงกับบริบทจริง',
        description: 'การนำสไลด์มาตรฐานมาสอนโดยไม่เข้าใจปัญหา ความท้าทาย หรือวัฒนธรรมเฉพาะขององค์กร ทำให้ผู้เรียนรู้สึกว่านำไปใช้ไม่ได้จริง'
      },
      {
        title: 'การเรียนรู้แบบบรรยายทางเดียว (One-Way Lecture)',
        description: 'ผู้เรียนเป็นเพียงผู้รับฟัง นั่งฟังทั้งวัน เบื่อหน่าย และลืมเนื้อหามากกว่า 80% ภายในสัปดาห์แรกหลังการอบรม'
      },
      {
        title: 'ขาด Action Plan และการนำไปลงมือทำต่อ',
        description: 'จบการอบรมโดยไม่มีพันธสัญญาหรือแผนปฏิบัติการที่ชัดเจน พนักงานกลับไปทำงานด้วยกรอบคิดและพฤติกรรมเดิม'
      },
      {
        title: 'ไม่สามารถวัดผลลัพธ์เชิงพฤติกรรมและ ROI ได้',
        description: 'มีเพียงแบบประเมินความพึงพอใจ (Happy Sheet) แต่ไม่สามารถตอบผู้บริหารได้ว่าองค์กรดีขึ้นอย่างไรหลังการอบรม'
      }
    ],

    solutionTitle: 'โซลูชัน In-house Training ของ CAP Vision Institute',
    solutionDescription: 'เราใช้กระบวนการ 6D CPS Model และ Transformative Facilitation ผสานเนื้อหาเข้ากับกิจกรรมจริง',
    solutions: [
      {
        title: '1. Diagnostic & Pre-Assessment',
        description: 'ร่วมวิเคราะห์โจทย์ธุรกิจ ทำแบบประเมินหรือสัมภาษณ์กลุ่มตัวอย่าง เพื่อเข้าใจ Root Cause ที่แท้จริงก่อนจัดอบรม'
      },
      {
        title: '2. Tailor-Made Curriculum Design',
        description: 'ปรับแต่งเนื้อหา กรณีศึกษา (Case Studies) และกิจกรรมจำลองให้ตรงกับอุตสาหกรรมและระดับของผู้เรียน 100%'
      },
      {
        title: '3. Experiential & Facilitative Learning',
        description: 'ผู้เรียนได้ลงมือทำ แลกเปลี่ยนความคิด สะท้อนบทเรียน (Reflection) และค้นพบคำตอบด้วยตนเองจากสภาวะภายใน'
      },
      {
        title: '4. Action Commitment & HR Report',
        description: 'สรุปพันธสัญญา Action Plan รายบุคคลและทีม พร้อมส่งมอบรายงานผลการประเมินเชิงลึกให้ HR และผู้บริหาร'
      }
    ],

    modulesTitle: 'หมวดหมู่หลักสูตร In-house ยอดนิยมที่องค์กรเลือกจัดมากที่สุด',
    modulesDescription: 'ทุกหลักสูตรสามารถปรับระดับความเข้มข้นให้เหมาะกับผู้บริหาร หัวหน้างาน หรือพนักงานทั่วไป',
    modules: [
      {
        id: 'leadership',
        title: 'Transformational Leadership & Modern Manager',
        subtitle: 'ภาวะผู้นำเพื่อการเปลี่ยนแปลงและการบริหารคนยุคใหม่',
        description: 'พัฒนาทัศนคติผู้นำ ทักษะการสร้างแรงบันดาลใจ การโค้ช และการมอบหมายงานอย่างมีประสิทธิภาพ',
        highlights: [
          'Facilitative Leadership for High-Performing Teams',
          'Coaching & Constructive Feedback Mastery',
          'Strategic Thinking & Adaptive Decision Making',
          'Mindset Shift: From Boss to inspiring Coach'
        ]
      },
      {
        id: 'team-synergy',
        title: 'Team Synergy & Psychological Safety Workshop',
        subtitle: 'การสร้างพลังทีม ความปลอดภัยทางจิตวิทยา และทลาย Silo',
        description: 'กิจกรรมหลอมรวมใจ สร้างความไว้เนื้อเชื่อใจ และยกระดับการทำงานร่วมกันข้ามสายงาน',
        highlights: [
          'Building Psychological Safety in Workplace',
          'Empathic Communication & Trust Building',
          'Cross-Functional Collaboration without Silo',
          'DISC Behavioral Adaptation at Work'
        ]
      },
      {
        id: 'creative-cps',
        title: 'Creative Problem Solving (6D CPS Model)',
        subtitle: 'การคิดเชิงสร้างสรรค์และการแก้ปัญหาซับซ้อนในงาน',
        description: 'ติดอาวุธกรอบคิดนวัตกรรม กระบวนการคิดวิเคราะห์ และการแก้ปัญหาเฉพาะหน้าอย่างเป็นระบบ',
        highlights: [
          '6D CPS Framework for Business Innovation',
          'Design Thinking for Service & Process Improvement',
          'Root Cause Analysis & Strategic Decision',
          'Actionable Prototyping in Daily Work'
        ]
      },
      {
        id: 'growth-mindset',
        title: 'Growth Mindset & Organization Culture Activation',
        subtitle: 'กรอบคิดเติบโตและการขับเคลื่อนวัฒนธรรมองค์กร',
        description: 'เปลี่ยนวิธีคิดให้มองปัญหาเป็นโอกาส สร้างความยืดหยุ่นทางอารมณ์ (Resilience) พร้อมรับมือการเปลี่ยนแปลง',
        highlights: [
          'Inside-Out Growth Mindset Shift',
          'Change Agility & Resilience under Pressure',
          'Core Values Activation into Daily Behavior',
          'Continuous Learning Habit Formulation'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'เปลี่ยนวิธีคิด (Mindset Shift)', desc: 'พนักงานตระหนักรู้ในตนเอง มองเห็นคุณค่าในงาน และเปิดรับการเติบโต' },
      { title: 'สร้างทีมที่ทำงานได้จริง (Real Collaboration)', desc: 'ลดความขัดแย้ง สื่อสารด้วยความเข้าอกเข้าใจ และประสานงานราบรื่น' },
      { title: 'เพิ่มผลผลิตและประสิทธิภาพ (Productivity)', desc: 'แก้ปัญหาได้ตรงจุด ตัดสินใจได้เร็วขึ้น และทำงานตอบโจทย์เป้าหมายธุรกิจ' },
      { title: 'วัฒนธรรมองค์กรที่ยั่งยืน (Sustainable Culture)', desc: 'ปลูกฝังพฤติกรรมเชิงบวกที่สอดคล้องกับค่านิยมและวิสัยทัศน์ขององค์กร' }
    ],

    targetAudience: [
      'ผู้บริหารระดับสูง (C-Level / Directors) ที่ต้องการปรับทิศทางองค์กร',
      'ฝ่ายทรัพยากรบุคคล (HR / HRD / L&D) ที่มองหาหลักสูตรตอบโจทย์จริง',
      'ผู้จัดการและหัวหน้างานทุกระดับ (Department Heads / Supervisors)',
      'ทีมงานฝ่ายขาย ฝ่ายบริการลูกค้า และฝ่ายปฏิบัติการที่ต้องการยกระดับศักยภาพ'
    ],

    formatAndDuration: {
      duration: '1 วัน (6 ชั่วโมง) หรือ 2 วัน (12 ชั่วโมง) แบบเข้มข้น',
      groupSize: '25 - 40 ท่านต่อรุ่น (เพื่อให้เกิดกระบวนการ Facilitation สูงสุด)',
      mode: 'On-site ณ โรงแรม / รีสอร์ต / สถานที่ขององค์กร หรือ Live Interactive Online'
    },

    faqs: [
      {
        question: 'หลักสูตร In-house Training ของ CAP Vision แตกต่างจากการบรรยายทั่วไปอย่างไร?',
        answer: 'เราใช้กระบวนการ Transformative Facilitation และ 6D CPS Model ซึ่งเน้นให้ผู้เรียนค้นพบคำตอบด้วยตัวเองผ่านกิจกรรมและการสะท้อนคิด (Reflection) ไม่ใช่การนั่งฟังบรรยายทางเดียว ทำให้เกิดการเปลี่ยน Mindset จากภายในและนำไปใช้จริงได้อย่างยั่งยืน'
      },
      {
        question: 'สามารถปรับแต่ง (Customize) เนื้อหาให้เข้ากับปัญหาขององค์กรได้หรือไม่?',
        answer: 'ได้แน่นอนครับ ทุกหลักสูตรของ CAP Vision Institute มีขั้นตอน Pre-Assessment และประชุมสรุปโจทย์ร่วมกับ HR/ผู้บริหาร เพื่อออกแบบเนื้อหา กรณีศึกษา และกิจกรรมให้ตรงกับความต้องการและวัฒนธรรมขององค์กรคุณ 100%'
      },
      {
        question: 'รองรับจำนวนผู้เข้าอบรมได้กี่คนต่อรุ่น?',
        answer: 'เพื่อประสิทธิภาพการเรียนรู้และกระบวนการดูแลอย่างทั่วถึง เราแนะนำรุ่นละ 25-40 คนสำหรับรูปแบบ Workshop เข้มข้น แต่หากเป็นรูปแบบสัมมนาสร้างแรงบันดาลใจ (Inspiring Seminar) สามารถรองรับได้ถึง 100-200 คนขึ้นไปครับ'
      },
      {
        question: 'มีกระบวนการวัดผลหลังการอบรมอย่างไร?',
        answer: 'เรามีระบบ Pre-Post Assessment ประเมินทั้งระดับความรู้ ทัศนคติ และความมั่นใจในการนำไปใช้ พร้อมสรุปรายงานผลการเรียนรู้เชิงลึก (HR Summary Report) และแนวทางติดตามผล (Follow-up Guidelines) มอบให้องค์กร'
      }
    ]
  },

  'leadership-development': {
    slug: 'leadership-development',
    url: '/leadership-development',
    intent: 'Commercial',
    badge: 'Leadership Transformation & Executive Mastery',
    metaTitle: 'หลักสูตรพัฒนาผู้นำ Leadership Development สำหรับองค์กร | CAP Vision Institute',
    metaDescription: 'ยกระดับผู้นำทุกระดับจากผู้สั่งการสู่ Facilitative Leader ด้วยหลักสูตร Leadership Development & Transformational Leadership โดย ครูเด่น Master Facilitator ประสบการณ์ 18+ ปี',
    keywords: [
      'พัฒนาผู้นำ', 'Leadership Development', 'หลักสูตรผู้นำ', 
      'Transformational Leadership', 'ภาวะผู้นำ', 'Facilitative Leadership',
      'อบรมผู้นำ', 'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'หลักสูตรพัฒนาผู้นำและ Leadership Development',
    subH1: 'ยกระดับผู้นำทุกระดับ จาก "ผู้สั่งการ" สู่ "Facilitative & Inspiring Leader"',
    tagline: 'พัฒนาภาวะผู้นำจากภายใน สร้างวิสัยทัศน์ร่วม และขับเคลื่อนทีมให้บรรลุเป้าหมายสูงสุดในยุคแห่งความผันผวน',
    valueProposition: 'ในยุคที่ธุรกิจเปลี่ยนแปลงอย่างรวดเร็ว ผู้นำที่ใช้อำนาจสั่งการไม่สามารถดึงศักยภาพสูงสุดของคนรุ่นใหม่ได้ หลักสูตร Leadership Development ของเราช่วยปรับ Mindset ให้ผู้นำกลายเป็นกระบวนกร (Facilitator) และโค้ช (Coach) ที่สามารถสร้างความปลอดภัยทางจิตวิทยา ดึงพลังของทีม และสร้างผลลัพธ์ที่ก้าวกระโดด',
    primaryCta: 'ปรึกษาออกแบบหลักสูตรพัฒนาผู้นำ',
    secondaryCta: 'ดูรายละเอียด Roadmap ผู้นำ',
    heroImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    themeColor: '#2563EB',
    accentColor: '#60A5FA',
    
    painPointsTitle: 'ความท้าทายของผู้นำในองค์กรยุคปัจจุบัน',
    painPointsDescription: 'ตำแหน่งที่สูงขึ้นมาพร้อมกับความคาดหวังที่เปลี่ยนไป แต่ผู้นำหลายคนยังติดกับดักวิธีคิดแบบเดิม',
    painPoints: [
      {
        title: 'เก่งงานเดี่ยว แต่บริหารคนไม่เป็น (Micromanagement)',
        description: 'ผู้นำที่ได้รับการเลื่อนตำแหน่งจากผลงานยอดเยี่ยม มักไม่กล้ามอบหมายงาน ทำเองทุกอย่างจนหมดไฟ และทีมไม่เติบโต'
      },
      {
        title: 'ขาดทักษะการโค้ชและให้ Feedback เชิงสร้างสรรค์',
        description: 'เมื่อลูกทีมทำงานผิดพลาด ไม่สามารถสื่อสารเพื่อชี้แนะได้ ทำให้เกิดความอึดอัดและสูญเสียความผูกพันในทีม'
      },
      {
        title: 'ไม่สามารถสร้างแรงบันดาลใจและ Alignment ในทีม',
        description: 'ไม่สามารถถ่ายทอดเป้าหมายขององค์กรให้กลายเป็นเป้าหมายร่วมของทีมงาน ทำให้ลูกทีมทำงานเพียงแค่ตามสั่ง'
      },
      {
        title: 'ปรับตัวรับมือกับความหลากหลายของคนไม่ทัน',
        description: 'ช่องว่างระหว่างวัย (Gen Gap) และสไตล์การทำงานที่ต่างกัน กลายเป็นอุปสรรคใหญ่ในการบริหารจัดการ'
      }
    ],

    solutionTitle: 'กรอบการพัฒนาภาวะผู้นำ 4 มิติ (Inside-Out Leadership)',
    solutionDescription: 'พัฒนาตั้งแต่สภาวะจิตใจ ทักษะการสื่อสาร ไปจนถึงการขับเคลื่อนผลลัพธ์เชิงกลยุทธ์',
    solutions: [
      {
        title: '1. Self-Leadership & Self-Awareness',
        description: 'ตระหนักรู้ในจุดแข็ง จุดบอด และอารมณ์ของตนเอง เพื่อเป็นผู้นำที่มีความมั่นคงทางใจและวุฒิภาวะทางอารมณ์ (EQ)'
      },
      {
        title: '2. Facilitative & Coaching Skills',
        description: 'เปลี่ยนการสั่งการเป็นการตั้งคำถามทรงพลัง การฟังเชิงลึก และการโค้ชเพื่อดึงศักยภาพลูกทีมให้คิดและแก้ปัญหาเองได้'
      },
      {
        title: '3. Psychological Safety & Trust Building',
        description: 'สร้างบรรยากาศแห่งความปลอดภัยทางจิตวิทยา ที่ทุกคนในทีมกล้าออกความคิดเห็น กล้าทดลอง และกล้าเรียนรู้'
      },
      {
        title: '4. Strategic Execution & Change Agility',
        description: 'นำพาทีมก้าวข้ามความไม่แน่นอน ตัดสินใจเชิงกลยุทธ์ได้อย่างเฉียบคม และผลักดันเป้าหมายสู่ผลลัพธ์ที่จับต้องได้'
      }
    ],

    modulesTitle: 'เนื้อหาหลักสูตรการพัฒนาผู้นำ (Customizable Modules)',
    modulesDescription: 'สามารถปรับให้เหมาะสมกับผู้บริหารระดับสูง ผู้จัดการ หรือหัวหน้างานมือใหม่ (New Manager)',
    modules: [
      {
        id: 'lead-self',
        title: 'Module 1: Leading Self — Mindset & Emotional Agility',
        subtitle: 'การนำตนเองและการบริหารสภาวะภายใน',
        description: 'สร้างรากฐานความมั่นคงทางอารมณ์ การเข้าใจตนเอง และการปรับ Mindset จากผู้ปฏิบัติงานสู่ผู้นำ',
        highlights: [
          'Self-Awareness & Blind Spot Discovery',
          'Emotional Intelligence (EQ) for Modern Leaders',
          'Growth Mindset vs Fixed Mindset in Management',
          'Developing Executive Presence & Authenticity'
        ]
      },
      {
        id: 'lead-people',
        title: 'Module 2: Leading People — Coaching & Empathetic Dialogue',
        subtitle: 'การนำคนด้วยการโค้ชและการสื่อสารที่เข้าอกเข้าใจ',
        description: 'เครื่องมือการโค้ช การฟังเชิงลึก และการให้ฟีดแบ็กที่สร้างแรงจูงใจและพัฒนาศักยภาพทีมงาน',
        highlights: [
          'The Leader as Coach Framework (GROW Model & Powerful Questions)',
          'Constructive Feedback & Difficult Conversations',
          'DISC Styles in Leadership & Team Delegation',
          'Empowerment & Accountability Mechanism'
        ]
      },
      {
        id: 'lead-team',
        title: 'Module 3: Leading Team — Synergy & Psychological Safety',
        subtitle: 'การนำทีมสู่ความเป็นเลิศและความปลอดภัยทางจิตวิทยา',
        description: 'เทคนิคการหลอมรวมทีมงาน สร้างความไว้ใจ และนำการประชุมอย่างกระบวนกร (Facilitative Meeting)',
        highlights: [
          'Creating High Psychological Safety Culture',
          'Facilitation Techniques for Effective Meetings',
          'Conflict Resolution & Collaborative Problem Solving',
          'Fostering Cross-Functional Collaboration'
        ]
      },
      {
        id: 'lead-change',
        title: 'Module 4: Leading Change — Strategic Agility & Vision',
        subtitle: 'การนำการเปลี่ยนแปลงและขับเคลื่อนผลลัพธ์เชิงกลยุทธ์',
        description: 'การสื่อสารวิสัยทัศน์ การสร้าง Alignment และการนำพาทีมก้าวผ่านความท้าทายในยุค Disruption',
        highlights: [
          'Communicating Vision with Impact & Storytelling',
          'Managing Resistance to Change',
          'Agile Leadership & Adaptive Decision Making',
          'Action Plan for Leadership Transformation'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'ยกระดับผู้นำทุกระดับ (Elevated Leadership)', desc: 'ผู้นำมีความมั่นใจ สื่อสารทรงพลัง และบริหารคนได้อย่างมีชั้นเชิง' },
      { title: 'ลดภาระ Micromanagement (Team Autonomy)', desc: 'ทีมงานคิดเป็น ทำเป็น และกล้ารับผิดชอบงานด้วยตนเอง' },
      { title: 'เพิ่มความผูกพันในองค์กร (Higher Engagement)', desc: 'ลูกทีมรู้สึกปลอดภัย ได้รับการรับฟัง และทุ่มเทเพื่อเป้าหมายร่วม' },
      { title: 'ขับเคลื่อนผลลัพธ์ธุรกิจ (Business Agility)', desc: 'องค์กรมีความยืดหยุ่น ปรับตัวเร็ว และบรรลุเป้าหมายเชิงกลยุทธ์' }
    ],

    targetAudience: [
      'ผู้บริหารระดับสูง (C-Level / Directors / VP)',
      'ผู้จัดการฝ่ายและหัวหน้าแผนก (Department Managers / Section Heads)',
      'หัวหน้างานมือใหม่ (New Managers & Emerging Leaders)',
      'Talent & High-Potential Leaders ในองค์กร'
    ],

    formatAndDuration: {
      duration: '1-2 วัน (Workshop) หรือโปรแกรมระยะยาว 3-6 เดือน พร้อม 1-on-1 Coaching',
      groupSize: '20 - 30 ท่านต่อรุ่น',
      mode: 'In-house Workshop / Executive Retreat / Interactive Learning'
    },

    faqs: [
      {
        question: 'หลักสูตรนี้เหมาะกับหัวหน้างานมือใหม่ (New Manager) หรือผู้บริหารระดับสูงมากกว่ากัน?',
        answer: 'เรามีโครงสร้างเนื้อหาที่แยกความเข้มข้นอย่างชัดเจนครับ สำหรับ New Manager จะเน้นการปรับ Mindset, การมอบหมายงาน และการโค้ชเบื้องต้น ส่วนผู้บริหารระดับสูงจะเน้น Strategic Leadership, Executive Presence, และการสร้างวัฒนธรรมองค์กร'
      },
      {
        question: 'หลังจบการอบรม ผู้นำจะนำไปปฏิบัติจริงได้อย่างไร?',
        answer: 'ใน Workshop ทุกท่านจะได้จัดทำ Leadership Action Blueprint รายบุคคล พร้อมเครื่องมือ 1-on-1 Coaching Sheet และเทมเพลตการประชุม เพื่อนำไปใช้กับทีมงานทันทีในวันรุ่งขึ้น'
      },
      {
        question: 'มีบริการติดตามผลหรือโค้ชส่วนตัวหลังจบหลักสูตรหรือไม่?',
        answer: 'มีครับ เรามีบริการ Follow-up Reflection Session (หลังจัด 30 วัน) และบริการ 1-on-1 Executive Coaching โดย ครูเด่น มาสเตอร์ฟา เพื่อช่วยประกบและแก้ปัญหาเฉพาะหน้าในการบริหารทีมครับ'
      }
    ]
  },

  'team-building': {
    slug: 'team-building',
    url: '/team-building',
    intent: 'Commercial',
    badge: 'Transformative Team Building & Synergy',
    metaTitle: 'Team Building และการพัฒนาทีมสำหรับองค์กร | Team Synergy Workshop โดย CAP Vision',
    metaDescription: 'กิจกรรม Team Building พัฒนาทีมงานยุคใหม่ เน้น Team Synergy, ทลายกำแพง Silo, สร้าง Psychological Safety และความผูกพันในองค์กรอย่างแท้จริง โดย ครูเด่น มาสเตอร์ฟา',
    keywords: [
      'Team Building องค์กร', 'พัฒนาทีมงาน', 'Team Synergy', 
      'Psychological Safety', 'กิจกรรมสร้างทีม', 'อบรม Team Building',
      'ทลาย Silo', 'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'Team Building และการพัฒนาทีมสำหรับองค์กร',
    subH1: 'ก้าวข้าม Team Building แบบเดิมๆ สู่ "Transformative Team Synergy Workshop"',
    tagline: 'ไม่ใช่แค่ความสนุกชั่วคราว แต่คือการหลอมรวมใจ ทลาย Silo และสร้างความร่วมมือที่ยั่งยืนในการทำงานจริง',
    valueProposition: 'Team Building ของ CAP Vision Institute ถูกออกแบบบนหลักการ Experiential Learning และ Group Facilitation ทุกกิจกรรมมีความหมาย (Purposeful Activity) และเชื่อมโยงกับการสะท้อนคิด (Reflection) เพื่อให้ผู้เข้าร่วมตระหนักถึงความสำคัญของความไว้ใจ การสื่อสาร และเป้าหมายร่วมกันขององค์กร',
    primaryCta: 'ปรึกษาและออกแบบกิจกรรม Team Building',
    secondaryCta: 'ดูบรรยากาศและผลงาน Team Building',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
    themeColor: '#0F2557',
    accentColor: '#F59E0B',
    
    painPointsTitle: 'ปัญหาคลาสสิกของกิจกรรม Team Building แบบทั่วไป',
    painPointsDescription: 'ทำไมกิจกรรมสร้างทีมส่วนใหญ่ถึงสร้างผลลัพธ์ได้เพียงแค่ช่วงเวลาที่อยู่ในค่าย?',
    painPoints: [
      {
        title: 'สนุกแค่ในงาน พอกลับมาทำงานก็เหมือนเดิม',
        description: 'กิจกรรมเน้นแต่ความบันเทิงและการแข่งขันแบบผิวเผิน ขาดการถอดบทเรียนที่เชื่อมโยงกับชีวิตการทำงานจริง'
      },
      {
        title: 'กำแพง Silo และความขัดแย้งสะสมข้ามแผนก',
        description: 'ต่างคนต่างทำ ไม่ส่งต่องาน มีอคติระหว่างทีม และไม่เข้าใจภาระหน้าที่ของเพื่อนร่วมงานต่างแผนก'
      },
      {
        title: 'พนักงานบางกลุ่มรู้สึกถูกบังคับและปิดใจ',
        description: 'กิจกรรมที่บังคับให้ทำสิ่งที่ไม่สบายใจ หรือละเลยความปลอดภัยทางจิตวิทยา ทำให้คนที่มีบุคลิกเก็บตัว (Introvert) ยิ่งถอยห่าง'
      },
      {
        title: 'ไม่มีพันธสัญญาหรือวัฒนธรรมทีมร่วมกันหลังจบงาน',
        description: 'ขาดกระบวนการสร้าง Team Charter หรือข้อตกลงในการทำงานร่วมกัน ทำให้พลังความร่วมมือค่อยๆ จางหายไป'
      }
    ],

    solutionTitle: 'ความแตกต่างของ Team Building สไตล์ CAP Vision',
    solutionDescription: 'เราผสานพลัง Play, Learn, และ Transformative Facilitation เข้าด้วยกัน',
    solutions: [
      {
        title: '1. Meaningful Activities (กิจกรรมมีความหมาย)',
        description: 'ทุกเกมและการทดลองถูกออกแบบจำลองสถานการณ์การทำงานจริง (Business Simulation) ท้าทายทั้งความคิดและการสื่อสาร'
      },
      {
        title: '2. Deep Reflection & Dialogue (สะท้อนคิดลึกซึ้ง)',
        description: 'มีช่วงเวลาให้ทีมได้เปิดใจ พูดคุยในพื้นที่ปลอดภัย ทำความเข้าใจจุดแข็งและข้อจำกัดของกันและกัน'
      },
      {
        title: '3. Psychological Safety First (ปลอดภัยทางใจ)',
        description: 'สร้างบรรยากาศที่เคารพความหลากหลาย ไม่มีการตัดสิน ทุกคนมีส่วนร่วมได้อย่างเป็นธรรมชาติและสบายใจ'
      },
      {
        title: '4. Team Charter Commitment (พันธสัญญาทีม)',
        description: 'ร่วมกันร่างข้อตกลงและกติกาทีม เพื่อนำไปใช้เป็นมาตรฐานการทำงานร่วมกันในออฟฟิศอย่างต่อเนื่อง'
      }
    ],

    modulesTitle: 'รูปแบบโปรแกรม Team Building & Synergy ที่ออกแบบได้ตามโจทย์',
    modulesDescription: 'เลือกปรับแต่งให้เหมาะกับ Indoor Workshop, Outdoor Experiential, หรือ Hybrid Team Retreat',
    modules: [
      {
        id: 'break-silo',
        title: 'Phase 1: Breaking Silo & Ice Melting',
        subtitle: 'ทลายกำแพง ละลายพฤติกรรม และเปิดใจ',
        description: 'สร้างบรรยากาศแห่งความเป็นมิตร ปลดล็อกความเกร็ง และทำให้ทุกคนพร้อมเปิดรับเพื่อนร่วมทีม',
        highlights: [
          'High-Energy Connection & Playful Ice Breaking',
          'Unmasking & Vulnerability Sharing in Safe Space',
          'Discovering Hidden Talents & Human Dimensions',
          'Aligning Expectations for the Workshop'
        ]
      },
      {
        id: 'empathy-trust',
        title: 'Phase 2: Building Trust & Empathy Mastery',
        subtitle: 'สร้างความไว้เนื้อเชื่อใจและการสื่อสารด้วย Empathy',
        description: 'กิจกรรมจำลองที่เน้นการฟัง การพึ่งพาอาศัย และการทำความเข้าใจความหลากหลายทางพฤติกรรม',
        highlights: [
          'Trust Building & Interdependence Simulation',
          'Empathetic Listening & Feedback Exchange',
          'Understanding Diversity (DISC / Behavioral Traits)',
          'Overcoming Prejudices and Silo Mindset'
        ]
      },
      {
        id: 'collaborative-challenge',
        title: 'Phase 3: High-Performing Collaboration Challenge',
        subtitle: 'ภารกิจท้าทายเพื่อพลังความร่วมมือระดับสูง',
        description: 'ภารกิจแก้ปัญหาซับซ้อนที่ต้องอาศัยการวางแผนร่วมกัน การแบ่งบทบาท และการบริหารทรัพยากรจำกัด',
        highlights: [
          'Complex Team Simulation & Strategic Planning',
          'Role Clarity & Effective Resource Allocation',
          'Problem-Solving Under Time Pressure',
          'Celebrating Collective Success & Agility'
        ]
      },
      {
        id: 'team-charter',
        title: 'Phase 4: Co-Creating Team Culture & Action Commitment',
        subtitle: 'สร้างวัฒนธรรมทีมและพันธสัญญาเพื่อการเปลี่ยนแปลง',
        description: 'สรุปบทเรียนและร่วมกันสร้างกติกาทีม (Team Charter) ที่พร้อมนำไปปฏิบัติจริงในชีวิตประจำวัน',
        highlights: [
          'Appreciative Inquiry & Gratitude Circle',
          'Co-Creating Team Norms & Working Agreements',
          'Personal & Team Action Blueprint',
          'Closing Ceremony & Symbolic Commitment'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'ทลายกำแพง Silo ข้ามแผนก (Cross-Team Harmony)', desc: 'พนักงานเข้าใจมุมมองของเพื่อนร่วมงานและประสานงานกันง่ายขึ้น' },
      { title: 'สร้างความปลอดภัยทางจิตวิทยา (High Trust)', desc: 'ทุกคนกล้าพูด กล้าเสนอไอเดีย และกล้าขอความช่วยเหลือเมื่อเจอปัญหา' },
      { title: 'เพิ่มพลังใจและความผูกพัน (Boost Morale)', desc: 'พนักงานรู้สึกมีคุณค่า มีความสุข และภูมิใจที่ได้เป็นส่วนหนึ่งขององค์กร' },
      { title: 'ทำงานมุ่งสู่เป้าหมายเดียวกัน (One Vision, One Team)', desc: 'หลอมรวมทุกบทบาทเพื่อขับเคลื่อนผลงานองค์กรสู่ความสำเร็จ' }
    ],

    targetAudience: [
      'องค์กรที่ต้องการจัดกิจกรรมประจำปี / Company Outing / Team Retreat',
      'ทีมงานที่มีปัญหาความขัดแย้งภายใน หรือการทำงานแบบ Silo',
      'องค์กรที่มีการขยายทีมรวดเร็ว หรือควบรวมกิจการ (Merger & Acquisition)',
      'Cross-functional Project Teams ที่ต้องทำงานร่วมกันอย่างใกล้ชิด'
    ],

    formatAndDuration: {
      duration: '1 วัน (One-Day Synergy Workshop) หรือ 2 วัน 1 คืน (Team Outing / Retreat)',
      groupSize: '30 - 200+ ท่าน (แบ่งกลุ่มย่อยพร้อม Facilitator ประกบดูแล)',
      mode: 'Indoor Hotel Hall / Outdoor Resort / Training Center ทั่วประเทศ'
    },

    faqs: [
      {
        question: 'กิจกรรม Team Building มีความปลอดภัยสำหรับผู้ใหญ่และพนักงานทุกวัยหรือไม่?',
        answer: 'ปลอดภัย 100% ครับ เราเน้นกิจกรรมที่ท้าทายความคิด การสื่อสาร และการทำงานร่วมกันเป็นทีม (Thought-Provoking & Experiential) ไม่ใช่การใช้กำลังกายหนักหรือกิจกรรมแกล้งกันที่เป็นอันตราย'
      },
      {
        question: 'สามารถจัดกิจกรรมควบคู่กับงานสัมมนาประจำปี (Annual Conference) ได้หรือไม่?',
        answer: 'สามารถทำได้อย่างลงตัวครับ ทีมงานสามารถออกแบบให้ช่วงเช้าเป็นการสรุปทิศทางธุรกิจหรือประชุมกลยุทธ์ และช่วงบ่าย-ค่ำเป็น Team Building Workshop ที่หลอมรวมและตอกย้ำวิสัยทัศน์ขององค์กร'
      },
      {
        question: 'CAP Vision มีบริการดูแลด้านสถานที่ อาหาร และการเดินทางหรือไม่?',
        answer: 'เราโฟกัสการเป็น Facilitator และออกแบบกระบวนการเรียนรู้เป็นหลักครับ แต่เรามีเครือข่ายพาร์ตเนอร์โรงแรม สถานที่ และทีมอีเวนต์ที่สามารถประสานงานให้คำแนะนำได้อย่างครบวงจรครับ'
      }
    ]
  },

  'communication-training': {
    slug: 'communication-training',
    url: '/communication-training',
    intent: 'Commercial',
    badge: 'Empathetic & Effective Communication',
    metaTitle: 'หลักสูตรอบรมทักษะการสื่อสารสำหรับองค์กร | Effective Communication | CAP Vision',
    metaDescription: 'อบรมทักษะการสื่อสารที่มีประสิทธิภาพในองค์กร (Effective & Empathetic Communication) การฟังเชิงลึก (Deep Listening) และการประสานงานไร้รอยต่อ โดย ครูเด่น มาสเตอร์ฟา',
    keywords: [
      'อบรมการสื่อสาร', 'Communication Training', 'ทักษะการสื่อสารในองค์กร', 
      'Empathetic Communication', 'การสื่อสารที่มีประสิทธิภาพ', 'Deep Listening',
      'การฟังเชิงลึก', 'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'หลักสูตรอบรมทักษะการสื่อสารสำหรับองค์กร',
    subH1: 'สื่อสารตรงเป้าหมาย ไร้ความขัดแย้ง ด้วย "Human Communication 4 ระดับ"',
    tagline: 'เปลี่ยนการสื่อสารที่ผิดพลาดและการโต้เถียง สู่การสื่อสารด้วยความเข้าอกเข้าใจและประสานพลังร่วม',
    valueProposition: 'ปัญหามากกว่า 80% ในองค์กรไม่ได้เกิดจากเทคโนโลยีหรือความรู้ แต่เกิดจากการสื่อสารที่ไม่เข้าใจกัน หลักสูตรของเราสอนศาสตร์และศิลป์ของการสื่อสารมนุษย์ (Human Communication) ผสานการฟังเชิงลึก (Deep Listening) และการให้ Feedback เชิงบวก เพื่อสร้างบรรยากาศการทำงานที่มีความสุขและมีประสิทธิภาพสูงสุด',
    primaryCta: 'ปรึกษาออกแบบหลักสูตรการสื่อสาร',
    secondaryCta: 'ดูตัวอย่างเนื้อหาการสื่อสาร',
    heroImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
    themeColor: '#0F2557',
    accentColor: '#10B981',
    
    painPointsTitle: 'ความเสียหายที่เกิดจากการสื่อสารผิดพลาดในองค์กร',
    painPointsDescription: 'คำพูดที่ไม่ได้ตั้งใจ หรือการฟังแบบไม่ตั้งใจ ก่อให้เกิดต้นทุนมหาศาลต่อธุรกิจ',
    painPoints: [
      {
        title: 'สั่งงานอย่างหนึ่ง แต่ลูกทีมทำมาอีกอย่าง (Miscommunication)',
        description: 'การสื่อสารไม่ชัดเจน ไม่มีการตรวจสอบความเข้าใจร่วมกัน ทำให้งานล่าช้าและต้องแก้ไขซ้ำซ้อน'
      },
      {
        title: 'การฟังแบบ "รอสวนกลับ" มากกว่า "ตั้งใจเข้าใจ"',
        description: 'ฟังเพียงเพื่อจะหาจังหวะพูดหรือแก้ตัว แทนที่จะฟังเพื่อจับความต้องการและอารมณ์ความรู้สึกที่แท้จริง'
      },
      {
        title: 'ความขัดแย้งทางอารมณ์เมื่อต้องสื่อสารเรื่องยาก (Difficult Conversations)',
        description: 'ไม่กล้าให้ Feedback ตรงๆ เพราะกลัวเสียน้ำใจ หรือพูดแรงจนทำลายความสัมพันธ์และบรรยากาศการทำงาน'
      },
      {
        title: 'ไม่เข้าใจความแตกต่างในสไตล์การสื่อสารของแต่ละบุคคล',
        description: 'ใช้สไตล์การพูดแบบเดียวกับทุกคน ทำให้เกิดความเข้าใจผิดและการต่อต้านโดยไม่รู้ตัว'
      }
    ],

    solutionTitle: 'โมเดลการสื่อสาร 4 ระดับ (Human Communication Framework)',
    solutionDescription: 'พัฒนาทักษะการสื่อสารครบทุกมิติ ตั้งแต่ภายในตนเองไปจนถึงระดับองค์กร',
    solutions: [
      {
        title: '1. Self-Dialogue & Mindfulness',
        description: 'รู้เท่าทันอารมณ์และเสียงในหัวของตนเองก่อนสื่อสาร ควบคุมโทนเสียงและภาษาท่าทางอย่างมืออาชีพ'
      },
      {
        title: '2. Deep Listening & Empathetic Presence',
        description: 'ฝึกทักษะการฟัง 4 ระดับ (ฟังเนื้อหา, ฟังอารมณ์, ฟังความต้องการ, ฟังเจตนา) เพื่อจับประเด็นได้ครบถ้วน'
      },
      {
        title: '3. Behavioral Communication (DISC Mastery)',
        description: 'อ่านสไตล์การสื่อสารของคู่สนทนา และปรับสไตล์การพูดให้ตรงใจคนแต่ละแบบเพื่อความร่วมมือที่ดีเยี่ยม'
      },
      {
        title: '4. Constructive Feedback & Conflict Resolution',
        description: 'เทคนิคการส่งมอบ Feedback แบบชี้แนะเชิงบวก (SBI Model) และการคลี่คลายข้อพิพาทอย่างสันติ'
      }
    ],

    modulesTitle: 'โครงสร้างเนื้อหาหลักสูตรการสื่อสาร (Interactive Modules)',
    modulesDescription: 'เน้นการจำลองสถานการณ์จริง (Role-Play) และการฝึกปฏิบัติแบบจับคู่พร้อมคำแนะนำ',
    modules: [
      {
        id: 'comm-foundation',
        title: 'Module 1: The Psychology of Human Communication',
        subtitle: 'จิตวิทยาการสื่อสารมนุษย์และการตระหนักรู้ตนเอง',
        description: 'เข้าใจกระบวนการทำงานของสมอง อารมณ์ และอิทธิพลของการสื่อสารต่อพฤติกรรมมนุษย์',
        highlights: [
          'Communication Mindset: Intent vs Impact',
          'Non-Verbal Communication & Executive Presence',
          'Overcoming Cognitive Biases in Workplace Interaction',
          'Creating Positive First Impressions'
        ]
      },
      {
        id: 'deep-listening',
        title: 'Module 2: 4 Levels of Listening & Empathetic Inquiry',
        subtitle: 'การฟังเชิงลึก 4 ระดับและการตั้งคำถามเปิดใจ',
        description: 'เปลี่ยนจากการฟังแบบผิวเผิน สู่การฟังอย่างเข้าอกเข้าใจเพื่อสร้างความสัมพันธ์และความไว้วางใจ',
        highlights: [
          'The 4 Levels of Listening (Cosmetic, Conversational, Active, Deep)',
          'Paraphrasing & Summarizing without Judgment',
          'Powerful Open-Ended Questions for Clarity',
          'Holding Space for Honest Conversations'
        ]
      },
      {
        id: 'disc-communication',
        title: 'Module 3: DISC Styles & Adaptive Communication',
        subtitle: 'การสื่อสารตามลักษณะพฤติกรรมบุคคล (DISC Model)',
        description: 'วิเคราะห์ลักษณะเด่นของคน 4 สไตล์ (D, I, S, C) และวิธีปรับการนำเสนอให้ตอบโจทย์แต่ละคน',
        highlights: [
          'Identifying D-I-S-C Personalities in Team',
          'How to Pitch & Persuade Different Profiles',
          'Cross-Generational Communication Strategies',
          'Preventing Personality Clashes at Work'
        ]
      },
      {
        id: 'feedback-conflict',
        title: 'Module 4: Constructive Feedback & Difficult Conversations',
        subtitle: 'การให้ Feedback เชิงสร้างสรรค์และการจัดการข้อขัดแย้ง',
        description: 'เครื่องมือสื่อสารเรื่องยาก การตำหนิเพื่อก่อ และการเจรจาต่อรองเพื่อผลลัพธ์ Win-Win',
        highlights: [
          'The SBI Feedback Framework (Situation-Behavior-Impact)',
          'De-escalating Emotional Conflicts & Tension',
          'Assertive Communication: Saying "No" with Respect',
          'Real-World Role Play & Tailored Simulation'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'ลดความผิดพลาดในการประสานงาน (Clear Execution)', desc: 'งานส่งมอบถูกต้องตรงตามเป้าหมาย ลดเวลาและต้นทุนในการแก้ไข' },
      { title: 'สร้างความสัมพันธ์อันดีในทีม (Harmonious Workplace)', desc: 'ลดความตึงเครียด บรรยากาศการทำงานเต็มไปด้วยความเคารพซึ่งกันและกัน' },
      { title: 'กล้าพูดคุยเรื่องยากอย่างสร้างสรรค์ (Constructive Culture)', desc: 'เปิดรับ Feedback และร่วมกันแก้ไขปัญหาอย่างตรงไปตรงมา' },
      { title: 'ยกระดับภาพลักษณ์และความเป็นมืออาชีพ (Professionalism)', desc: 'สื่อสารได้อย่างมั่นใจ ชัดเจน และน่าเชื่อถือทั้งภายในและภายนอกองค์กร' }
    ],

    targetAudience: [
      'หัวหน้างานและผู้จัดการที่ต้องสื่อสาร มอบหมายงาน และให้ Feedback ทีมงาน',
      'ฝ่ายประสานงาน, จัดซื้อ, บัญชี, และทีม Support ที่ต้องติดต่อข้ามแผนก',
      'ทีมขาย ทีมบริการลูกค้า และทีมการตลาดที่ต้องเจรจาต่อรอง',
      'พนักงานทุกระดับที่ต้องการพัฒนา Soft Skills ด้านการสื่อสาร'
    ],

    formatAndDuration: {
      duration: '1 วัน (6 ชั่วโมง) หรือ 2 วัน (Workshop + Role Play เข้มข้น)',
      groupSize: '25 - 35 ท่านต่อรุ่น',
      mode: 'In-house Workshop / Hands-on Practice / Interactive Training'
    },

    faqs: [
      {
        question: 'หลักสูตรนี้มีกิจกรรมฝึกปฏิบัติ (Role-Play) มากน้อยเพียงใด?',
        answer: 'เราเน้นการเรียนรู้แบบ 70:20:10 โดยมีสัดส่วนการฝึกปฏิบัติ การจับคู่สนทนา และการจำลองสถานการณ์จริง (Role-Play) มากกว่า 60% ของเวลาทั้งหมด เพื่อให้ผู้เรียนได้ลองใช้เครื่องมือจริงและได้รับคำแนะนำทันที'
      },
      {
        question: 'สามารถนำเคสปัญหาจริงที่เกิดขึ้นในแผนกมาเป็นโจทย์ฝึกได้หรือไม่?',
        answer: 'ได้เลยครับ ในขั้นตอน Pre-Assessment เราจะรวบรวมกรณีศึกษาจริงจากองค์กร เพื่อนำมาสร้างเป็น Scenario ในการฝึกซ้อม ทำให้ผู้เรียนแก้ไขปัญหาที่เจอในชีวิตจริงได้ตรงจุด'
      },
      {
        question: 'เหมาะสำหรับผู้เรียนที่เป็นคนพูดน้อยหรือไม่ชอบแสดงออกหรือไม่?',
        answer: 'เหมาะมากครับ เพราะหลักสูตรนี้เน้นเรื่องการฟัง (Listening) และการเข้าใจจิตวิทยาคน ซึ่งเป็นจุดแข็งของคนพูดน้อย กระบวนการ Facilitation ของเราสร้างพื้นที่ปลอดภัยให้ทุกคนได้ร่วมเรียนรู้โดยไม่รู้สึกถูกกดดัน'
      }
    ]
  },

  'service-mind': {
    slug: 'service-mind',
    url: '/service-mind',
    intent: 'Commercial',
    badge: 'Service Excellence & Inside-Out Service Mindset',
    metaTitle: 'อบรม Service Mind และ Service Excellence สำหรับองค์กร | CAP Vision Institute',
    metaDescription: 'หลักสูตรอบรม Service Mind และสร้างวัฒนธรรม Service Excellence ปลูกฝังจิตวิญญาณการบริการจากภายใน สู่การส่งมอบประสบการณ์ที่เหนือความคาดหมาย โดย ครูเด่น มาสเตอร์ฟา',
    keywords: [
      'อบรม Service Mind', 'Service Excellence', 'พัฒนาทักษะการบริการ', 
      'จิตสำนึกงานบริการ', 'Customer Experience', 'รับมือข้อร้องเรียน',
      'Customer Centricity', 'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'อบรม Service Mind และ Service Excellence',
    subH1: 'ปลูกฝังจิตวิญญาณการบริการจากภายใน สู่การส่งมอบประสบการณ์ระดับพรีเมียม',
    tagline: 'เปลี่ยนงานบริการจาก "หน้าที่ที่ต้องทำ" สู่ "คุณค่าที่ภาคภูมิใจ" สร้างความประทับใจที่ลูกค้าไม่มีวันลืม',
    valueProposition: 'การบริการที่ยอดเยี่ยมไม่ได้เกิดจากการท่องจำสคริปต์ แต่เกิดจาก "Inside-Out Service Mindset" หรือความสุขและความภูมิใจจากภายในตัวผู้ให้บริการ หลักสูตรนี้ช่วยจุดประกายความสุขในการทำงาน ปรับมุมมองการมองลูกค้าด้วย Empathy และเสริมทักษะการแก้ปัญหาเฉพาะหน้า เพื่อยกระดับสู่ Service Excellence อย่างยั่งยืน',
    primaryCta: 'ปรึกษาออกแบบหลักสูตร Service Mind',
    secondaryCta: 'ดูรายละเอียดหลักสูตรบริการ',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a67c55c0282?auto=format&fit=crop&q=80',
    themeColor: '#0F2557',
    accentColor: '#F59E0B',
    
    painPointsTitle: 'ปัญหาของงานบริการที่พบได้บ่อยในองค์กร',
    painPointsDescription: 'เมื่อพนักงานหมดใจ งานบริการจะกลายเป็นความเครียดและส่งผลเสียต่อแบรนด์',
    painPoints: [
      {
        title: 'บริการตามหน้าที่ ไร้ชีวิตชีวาและความใส่ใจ (Robotic Service)',
        description: 'พนักงานยิ้มตามหน้าที่ พูดตามบท ขาดความกระตือรือร้นและความจริงใจในการช่วยเหลือลูกค้า'
      },
      {
        title: 'ตื่นตระหนกและรับมือกับข้อร้องเรียน (Complaint) ไม่เป็น',
        description: 'เมื่อเจอลูกค้าอารมณ์ร้อน พนักงานมักตั้งการ์ดแก้ตัว หรือเก็บอารมณ์ไม่อยู่จนเกิดการปะทะ'
      },
      {
        title: 'ภาวะหมดไฟและความเครียดสะสมของทีมบริการ (Service Burnout)',
        description: 'การต้องแบกรับอารมณ์ของลูกค้าทุกวันโดยไม่มีเครื่องมือจัดการจิตใจ ทำให้พนักงานลาออกบ่อย'
      },
      {
        title: 'การขาดจิตสำนึกบริการภายในระหว่างแผนก (Internal Service Silo)',
        description: 'มองว่าตนเองต้องบริการเฉพาะลูกค้าภายนอก แต่ละเลยการส่งมอบงานที่มีคุณภาพให้เพื่อนร่วมงานภายใน'
      }
    ],

    solutionTitle: 'เสาหลัก 4 ประการแห่ง Service Excellence',
    solutionDescription: 'เชื่อมโยงหัวใจบริการ สู่ทักษะการสื่อสาร และมาตรฐานการทำงานระดับสากล',
    solutions: [
      {
        title: '1. Service Awakening from Inside-Out',
        description: 'ค้นพบคุณค่าและความหมายในงานบริการ ปรับทัศนคติเพื่อส่งมอบความสุขให้ตนเองและลูกค้า'
      },
      {
        title: '2. Customer Empathy & Psychology',
        description: 'อ่านใจลูกค้า เข้าใจความคาดหวังที่ซ่อนอยู่ (Unmet Needs) และส่งมอบสิ่งที่เกินความคาดหมาย'
      },
      {
        title: '3. Professional Complaint Handling (HEAR Model)',
        description: 'เทคนิคการรับฟัง คลี่คลายอารมณ์โกรธ และเปลี่ยนลูกค้าที่มีปัญหาให้กลายเป็น Brand Advocate'
      },
      {
        title: '4. Total Service Experience (Internal & External)',
        description: 'สร้างวัฒนธรรมการส่งต่องานที่มีคุณภาพระหว่างแผนก เพื่อขับเคลื่อนประสบการณ์องค์กรที่เป็นเลิศ'
      }
    ],

    modulesTitle: 'โครงสร้างหลักสูตร Service Excellence Masterclass',
    modulesDescription: 'สามารถปรับแต่งให้ตรงกับธุรกิจค้าปลีก โรงแรม อสังหาริมทรัพย์ บริการทางการแพทย์ หรือหน่วยงานบริการภายใน',
    modules: [
      {
        id: 'service-mindset',
        title: 'Module 1: The Soul of Service Excellence',
        subtitle: 'จิตวิญญาณและกรอบคิดแห่งงานบริการจากภายใน',
        description: 'การตระหนักรู้ในคุณค่าตนเอง การสร้างพลังบวก และการเปลี่ยนมุมมองต่องานบริการ',
        highlights: [
          'Inside-Out Service Mindset Transformation',
          'The Value of Service: From "Duty" to "Pride"',
          'Emotional Resilience & Stress Relief for Service Staff',
          'Creating Positive Emotional Contagion'
        ]
      },
      {
        id: 'customer-empathy',
        title: 'Module 2: Customer Psychology & Empathy Mapping',
        subtitle: 'จิตวิทยาและการอ่านใจลูกค้าอย่างลึกซึ้ง',
        description: 'วิเคราะห์ความต้องการ พฤติกรรม และความคาดหวังของลูกค้าในยุคดิจิทัล',
        highlights: [
          'Empathy Map for Service Delivery',
          'Decoding Customer Expectations & Moments of Truth (MOT)',
          'Personalized Service vs Standardized Service',
          'Delivering "WOW" Experiences that Exceed Expectations'
        ]
      },
      {
        id: 'complaint-mastery',
        title: 'Module 3: Complaint Handling & Crisis Communication',
        subtitle: 'ศิลปะการรับมือข้อร้องเรียนและการคลี่คลายวิกฤต',
        description: 'เครื่องมือและขั้นตอนการรับมือลูกค้าอารมณ์ร้อน การเจรจาต่อรอง และการกอบกู้ความเชื่อมั่น',
        highlights: [
          'The HEAR Model (Hear, Empathize, Apologize, Resolve)',
          'De-escalating Angry Customers with Calm Authority',
          'Turning Complaints into Customer Loyalty',
          'Live Role-Play & Tough Customer Simulation'
        ]
      },
      {
        id: 'internal-service',
        title: 'Module 4: Building Internal Service Culture',
        subtitle: 'การสร้างวัฒนธรรมบริการภายในและการประสานงานเป็นเลิศ',
        description: 'หลอมรวมใจทุกแผนกให้เป็นหนึ่งเดียว ส่งมอบงานคุณภาพสู่ลูกค้าภายนอกอย่างราบรื่น',
        highlights: [
          'Internal Customer Concept: Service within the Organization',
          'Cross-Department Service Level Agreements (SLA)',
          'Appreciation & Recognition in Service Teams',
          'Personal Service Commitment Blueprint'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'คะแนนความพึงพอใจลูกค้าเพิ่มขึ้น (Higher CSAT / NPS)', desc: 'ลูกค้าประทับใจในความใส่ใจและกลับมาใช้บริการซ้ำ' },
      { title: 'ลดข้อร้องเรียนและความขัดแย้ง (Lower Complaints)', desc: 'พนักงานสามารถแก้ปัญหาเฉพาะหน้าได้อย่างรวดเร็วและมืออาชีพ' },
      { title: 'พนักงานมีความสุขและรักในงานบริการ (Lower Turnover)', desc: 'ลดความเครียด สร้างพลังบวก และเพิ่มความผูกพันในงาน' },
      { title: 'ยกระดับภาพลักษณ์แบรนด์ (Brand Reputation)', desc: 'สร้างชื่อเสียงการบริการที่โดดเด่นและเป็นที่ยอมรับในอุตสาหกรรม' }
    ],

    targetAudience: [
      'พนักงานฝ่ายบริการลูกค้า (Customer Service / Front Office / Call Center)',
      'ทีมงานฝ่ายขาย พนักงานต้อนรับ และทีมหน้าร้าน (Store Staff)',
      'หน่วยงานสนับสนุนภายในองค์กร (HR, IT Support, บัญชี, จัดซื้อ)',
      'หัวหน้างานและผู้จัดการฝ่ายบริการที่ต้องการยกระดับมาตรฐานการทำงาน'
    ],

    formatAndDuration: {
      duration: '1 วัน (6 ชั่วโมง) หรือ 2 วัน (เน้น Workshop & Case Study)',
      groupSize: '25 - 40 ท่านต่อรุ่น',
      mode: 'In-house Workshop / Role Play / Video Analysis / Simulation'
    },

    faqs: [
      {
        question: 'หลักสูตรนี้เหมาะกับหน่วยงานที่ไม่มีการติดต่อลูกค้าภายนอกหรือไม่?',
        answer: 'เหมาะอย่างยิ่งครับ เรามีโมดูล "Internal Service Mind" ที่ออกแบบเฉพาะสำหรับแผนก Support เช่น IT, HR, บัญชี เพื่อให้เข้าใจบทบาทการบริการเพื่อนร่วมงานภายในองค์กรอย่างมีประสิทธิภาพ'
      },
      {
        question: 'การอบรมจะช่วยให้พนักงานลดความเครียดจากลูกค้าอารมณ์ร้ายได้อย่างไร?',
        answer: 'เราสอนเทคนิค Emotional Agility และการแยกแยะระหว่าง "อารมณ์ของลูกค้า" กับ "คุณค่าในตัวเอง" พร้อมเครื่องมือทางภาษาที่ช่วยลดความตึงเครียด ทำให้พนักงานไม่เก็บอารมณ์ลบกลับบ้านครับ'
      }
    ]
  },

  'facilitator-training': {
    slug: 'facilitator-training',
    url: '/facilitator-training',
    intent: 'Niche',
    badge: 'Master Facilitation & Learning Process Architecture',
    metaTitle: 'Facilitator Training พัฒนาทักษะกระบวนกรและวิทยากรภายในองค์กร | CAP Vision',
    metaDescription: 'หลักสูตร Facilitator Training พัฒนาทักษะกระบวนกรมืออาชีพ ออกแบบกระบวนการเรียนรู้เพื่อการเปลี่ยนแปลง (Transformative Learning) โดย ครูเด่น Master Facilitator 18+ ปี',
    keywords: [
      'Facilitator Training', 'ฝึกอบรมกระบวนกร', 'ทักษะวิทยากร', 
      'Master Facilitator', 'Train the Trainer', 'Transformative Learning',
      'ออกแบบการเรียนรู้', 'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'Facilitator Training พัฒนาทักษะกระบวนกร',
    subH1: 'เปลี่ยนจาก "ผู้บรรยาย (Trainer)" สู่ "กระบวนกรมืออาชีพ (Modern Facilitator)"',
    tagline: 'ศาสตร์และศิลป์แห่งการออกแบบกระบวนการเรียนรู้ การตั้งคำถามทรงพลัง และการดึงศักยภาพกลุ่มเพื่อสร้างการเปลี่ยนแปลง',
    valueProposition: 'ในยุคที่ข้อมูลหาได้ง่ายแค่ปลายนิ้ว การสอนแบบเดิมไม่ตอบโจทย์อีกต่อไป หลักสูตร Facilitator Training ถ่ายทอดองค์ความรู้และประสบการณ์ 18+ ปีของ ครูเด่น มาสเตอร์ฟา ในการสร้างพื้นที่ปลอดภัย การออกแบบกระบวนการเรียนรู้ 6D CPS Model และศิลปะการนำกลุ่ม เพื่อให้วิทยากรและผู้นำสามารถจุดประกายความคิดและสร้างผลลัพธ์ยั่งยืน',
    primaryCta: 'ปรึกษาหลักสูตร Facilitator Training',
    secondaryCta: 'ดูประวัติ Master Facilitator',
    heroImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80',
    themeColor: '#0F2557',
    accentColor: '#10B981',
    
    painPointsTitle: 'ข้อจำกัดของการฝึกอบรมและการประชุมแบบเดิม',
    painPointsDescription: 'ทำไมผู้สอนหลายคนถึงรู้สึกเหนื่อยแต่ผู้เรียนกลับไม่เกิดการเปลี่ยนแปลง?',
    painPoints: [
      {
        title: 'ผู้สอนพูดคนเดียวตลอดการอบรม (Trainer Burnout)',
        description: 'ใช้พลังงานเยอะมากในการบรรยาย แต่ผู้เรียนกลับนั่งเงียบ ขาดการมีส่วนร่วม และไม่เกิดความคิดริเริ่ม'
      },
      {
        title: 'การประชุมหรือ Workshop ไม่ได้ข้อสรุปที่แท้จริง',
        description: 'การประชุมวนเวียน ไร้ทิศทาง มีคนไม่กี่คนผูกขาดการพูด ขณะที่คนส่วนใหญ่ไม่กล้าออกความคิดเห็น'
      },
      {
        title: 'ขาดเครื่องมือในการรับมือกับความเงียบหรือการต่อต้าน',
        description: 'ไม่รู้วิธีคลี่คลายเมื่อผู้เรียนปิดใจ หรือเมื่อเกิดความเห็นต่างที่ตึงเครียดในห้องเรียน'
      },
      {
        title: 'ออกแบบกิจกรรมไม่เชื่อมโยงกับเป้าหมายการเรียนรู้',
        description: 'จัดกิจกรรมสนุกสนาน แต่ไม่สามารถถอดบทเรียน (Debrief) ให้เกิดความรู้เชิงลึกได้'
      }
    ],

    solutionTitle: 'แกนหลักของ Modern Facilitation (CAP Framework)',
    solutionDescription: 'เรียนรู้ทักษะกระบวนกรระดับ Master ครบทุกมิติ',
    solutions: [
      {
        title: '1. Facilitator Presence & Space Holding',
        description: 'การสร้างสภาวะนิ่งมั่นคง การเปิดรับ และการสร้างพื้นที่ปลอดภัยทางใจ (Psychological Safety) ในห้องเรียน'
      },
      {
        title: '2. 6D CPS Process Design Framework',
        description: 'สถาปัตยกรรมการออกแบบกระบวนการเรียนรู้จากจุดเริ่มต้นจนถึงการสร้าง Action Plan ที่ทำได้จริง'
      },
      {
        title: '3. Powerful Questioning & Reflective Dialogue',
        description: 'ศิลปะการตั้งคำถามปลายเปิดเพื่อกระตุกความคิด และการนำการสนทนาเชิงลึก (Deep Dialogue)'
      },
      {
        title: '4. Dynamic Debriefing & Group Energy Management',
        description: 'เทคนิคการจับพลังงานกลุ่ม การถอดบทเรียนอย่างคมคาย และการสรุปองค์ความรู้ร่วมกัน'
      }
    ],

    modulesTitle: 'หลักสูตร Facilitator Mastery Program (Hands-on Practicum)',
    modulesDescription: 'เน้นการฝึกปฏิบัติจริงหน้าห้อง พร้อมรับ Feedback แบบตัวต่อตัวจาก ครูเด่น มาสเตอร์ฟา',
    modules: [
      {
        id: 'fa-mindset',
        title: 'Module 1: Mindset and Presence of The Facilitator',
        subtitle: 'กรอบคิดและสภาวะภายในของกระบวนกร',
        description: 'ปรับสภาวะจากผู้รู้ (Expert) สู่ผู้อำนวยความสะดวกในการเรียนรู้ (Facilitator)',
        highlights: [
          'Shift from Teacher to Space Holder',
          'Somatic Grounding & Neutrality in Group Settings',
          'Reading Group Energy & Unconscious Dynamics',
          'Creating Instant Psychological Safety'
        ]
      },
      {
        id: 'fa-design',
        title: 'Module 2: 6D CPS Learning Architecture & Activity Design',
        subtitle: 'การออกแบบสถาปัตยกรรมการเรียนรู้และกิจกรรม',
        description: 'โครงสร้างการร้อยเรียงกระบวนการ กิจกรรม และคำถามให้ลื่นไหลและทรงพลัง',
        highlights: [
          '6D Creative Problem Solving Process Architecture',
          'Experiential Activity Design & Metaphor Creation',
          'Pacing, Flow & Timing Management in Workshops',
          'Customizing Scenarios for Corporate Contexts'
        ]
      },
      {
        id: 'fa-tools',
        title: 'Module 3: Powerful Questioning & Reflective Debriefing',
        subtitle: 'เครื่องมือการตั้งคำถามและการถอดบทเรียน',
        description: 'ศาสตร์แห่งการตั้งคำถามที่ทำให้ผู้เรียนฉุกคิด และเทคนิคการเชื่อมโยงสู่ผลลัพธ์งาน',
        highlights: [
          'The Art of Powerful Questions (ORID Model & Beyond)',
          'Deep Debriefing: Connecting Games to Real-World Impact',
          'Handling Resistant Participants & Difficult Group Situations',
          'Visual Facilitation & Harvesting Collective Wisdom'
        ]
      },
      {
        id: 'fa-practicum',
        title: 'Module 4: Live Facilitation Practicum & Master Mentoring',
        subtitle: 'การฝึกปฏิบัติการนำกลุ่มจริงพร้อมรับฟีดแบ็กรายบุคคล',
        description: 'ผู้เรียนทุกคนได้ลงมือนำกระบวนการจริง และรับคำแนะนำเชิงลึกเพื่อพัฒนาจุดเด่นเฉพาะตัว',
        highlights: [
          'Live Facilitation Simulation with Peer Learners',
          '1-on-1 Personalized Coaching from Master Facilitator',
          'Developing Your Signature Facilitation Style',
          'Certification of Excellence from CAP Vision Institute'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'สร้างวิทยากรและผู้นำกระบวนกรภายใน (Internal Capability)', desc: 'องค์กรมีบุคลากรที่สามารถจัด Workshop และถ่ายทอดความรู้ได้เองอย่างมีคุณภาพ' },
      { title: 'การประชุมและ Workshop มีประสิทธิภาพสูงสุด (Effective Meetings)', desc: 'ได้ไอเดียสร้างสรรค์ ข้อสรุปที่ชัดเจน และความร่วมมือเต็มใจจากทุกคน' },
      { title: 'การเรียนรู้ในองค์กรเกิดการเปลี่ยนแปลงจริง (Real Impact)', desc: 'ผู้เรียนนำความรู้ไปต่อยอดและปรับใช้ในการทำงานได้จริง' },
      { title: 'ส่งเสริมวัฒนธรรมแห่งการเรียนรู้ (Continuous Learning Culture)', desc: 'เกิดบรรยากาศการแบ่งปันความรู้และการสะท้อนคิดทั่วทั้งองค์กร' }
    ],

    targetAudience: [
      'วิทยากรภายในองค์กร (Internal Trainers / In-house Instructors)',
      'ผู้เชี่ยวชาญด้านการพัฒนาบุคลากร (HRD / L&D Professionals)',
      'ผู้บริหาร, ผู้จัดการ, และ Agile Coaches / Scrum Masters ที่ต้องนำการประชุม',
      'วิทยากรและที่ปรึกษาอิสระที่ต้องการยกระดับสู่ Master Facilitator'
    ],

    formatAndDuration: {
      duration: '2 วันเต็ม (Intensive Masterclass) หรือ 3 วัน พร้อม Mentoring Session',
      groupSize: '15 - 20 ท่านต่อรุ่น (จำกัดจำนวนเพื่อให้ได้ฝึกปฏิบัติทุกคน)',
      mode: 'In-house Cohort / Public Masterclass / Interactive Workshop'
    },

    faqs: [
      {
        question: 'หลักสูตรนี้แตกต่างจาก Train the Trainer ทั่วไปอย่างไร?',
        answer: 'Train the Trainer ทั่วไปมักเน้นทักษะการพูด การยืน และการใช้สไลด์บรรยาย แต่ Facilitator Training เน้นการออกแบบกระบวนการ (Process Design), การตั้งคำถาม, และการดึงศักยภาพผู้เรียนให้คิดและเปลี่ยนแปลงจากข้างในครับ'
      },
      {
        question: 'ผู้ที่ไม่มีประสบการณ์เป็นวิทยากรมาก่อนสามารถเรียนได้หรือไม่?',
        answer: 'เรียนได้แน่นอนครับ หลักสูตรนี้ปูพื้นฐานตั้งแต่กระบวนการคิด สภาวะภายใน ไปจนถึงเทคนิคการตั้งคำถาม ซึ่งเป็นทักษะสากลที่ผู้นำและผู้จัดการทุกคนสามารถนำไปใช้ในการประชุมและการบริหารทีมได้ทันที'
      }
    ]
  },

  'executive-coaching': {
    slug: 'executive-coaching',
    url: '/executive-coaching',
    intent: 'Premium',
    badge: '1-on-1 Confidential Executive Coaching',
    metaTitle: 'Executive Coaching สำหรับผู้บริหารระดับสูง 1-on-1 | CAP Vision Institute',
    metaDescription: 'บริการ Executive Coaching แบบ 1-on-1 สำหรับ CEO, กรรมการผู้จัดการ และผู้บริหารระดับสูง ปลดล็อกศักยภาพ วางกลยุทธ์ และขยายขีดความสามารถการนำองค์กร โดย ครูเด่น Master Facilitator',
    keywords: [
      'Executive Coaching', 'โค้ชผู้บริหาร', 'Coaching สำหรับผู้นำ', 
      '1-on-1 Coaching', 'พัฒนาผู้บริหารระดับสูง', 'Leadership Coaching',
      'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'Executive Coaching สำหรับผู้บริหาร',
    subH1: 'คู่คิดเชิงสะท้อนคิด (Reflection Companion) ปลดล็อกศักยภาพผู้นำระดับสูงสู่ผลลัพธ์ที่ยั่งยืน',
    tagline: 'พื้นที่สนทนาที่เป็นความลับสูงสุด เพื่อให้ผู้นำมองเห็นจุดบอด จัดการความเครียด และตัดสินใจเชิงกลยุทธ์ได้อย่างเฉียบคม',
    valueProposition: 'ยิ่งอยู่ในตำแหน่งสูงขึ้น ความโดดเดี่ยวในการตัดสินใจก็ยิ่งมากขึ้น บริการ Executive Coaching ของเราคือพื้นที่ปลอดภัย (Confidential Space) ที่ผู้บริหารระดับสูงสามารถสะท้อนความคิด ปลดล็อก Mindset ที่ติดขัด และสร้างสมดุลระหว่างผลงานธุรกิจ (Performance) กับสุขภาวะภายใน (Well-being)',
    primaryCta: 'นัดหมายสนทนาเบื้องต้น (Discovery Session)',
    secondaryCta: 'ดูแนวทาง Executive Coaching',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80',
    themeColor: '#0F2557',
    accentColor: '#F59E0B',
    
    painPointsTitle: 'ความท้าทายที่ผู้นำระดับสูงต้องเผชิญลำพัง',
    painPointsDescription: 'ความรับผิดชอบที่ยิ่งใหญ่มาพร้อมกับแรงกดดันที่ไม่สามารถปรึกษาใครในองค์กรได้',
    painPoints: [
      {
        title: 'ความโดดเดี่ยวในการตัดสินใจสำคัญ (Leadership Loneliness)',
        description: 'การตัดสินใจระดับยุทธศาสตร์ที่มีผลต่อชีวิตคนและอนาคตธุรกิจ สร้างแรงกดดันมหาศาลโดยไม่มีคู่คิดที่ไว้ใจได้'
      },
      {
        title: 'จุดบอดในการบริหาร (Blind Spots) ที่ไม่มีใครกล้าบอก',
        description: 'เมื่ออยู่ในจุดสูงสุด ลูกทีมมักไม่กล้าให้ Feedback ตรงๆ ทำให้ผู้นำมองไม่เห็นพฤติกรรมที่อาจขัดขวางการเติบโต'
      },
      {
        title: 'ความเหนื่อยล้าสะสมและความไม่สมดุลในชีวิต (Executive Burnout)',
        description: 'ทุ่มเทเวลาให้องค์กรจนสูญเสียพลังงาน สุขภาพ และความสุขในชีวิตส่วนตัว'
      },
      {
        title: 'การเปลี่ยนผ่านสไตล์การนำเพื่อรองรับบริบทใหม่ (Leadership Transition)',
        description: 'วิธีคิดและสไตล์เดิมที่เคยพาให้สำเร็จในอดีต อาจไม่สามารถนำพาองค์กรในยุค Disruption ได้อีกต่อไป'
      }
    ],

    solutionTitle: 'กระบวนการ Executive Coaching ของ CAP Vision',
    solutionDescription: 'ผสานการโค้ชเชิงลึก การสะท้อนคิด และการตั้งเป้าหมายเชิงกลยุทธ์',
    solutions: [
      {
        title: '1. Discovery & Chemistry Check',
        description: 'พูดคุยเพื่อทำความเข้าใจเป้าหมาย ความท้าทาย และตรวจสอบความเข้ากันได้ของการทำงานร่วมกัน'
      },
      {
        title: '2. Deep Assessment & Self-Reflection',
        description: 'สะท้อนจุดแข็ง ข้อจำกัด และรูปแบบพฤติกรรมผ่านการสนทนาและเครื่องมือประเมินเชิงจิตวิทยา'
      },
      {
        title: '3. Strategic Breakthrough Sessions',
        description: 'การสนทนาโค้ชชิ่งแบบ 1-on-1 อย่างต่อเนื่องเพื่อปลดล็อกประเด็นสำคัญและวางกลยุทธ์'
      },
      {
        title: '4. Sustainable Transformation & Accountability',
        description: 'ติดตามผลการเปลี่ยนแปลงเชิงพฤติกรรมและการตัดสินใจในสถานการณ์จริง'
      }
    ],

    modulesTitle: 'แกนหลักในการโค้ชผู้บริหารระดับสูง (Focus Areas)',
    modulesDescription: 'ออกแบบเฉพาะบุคคลตามเป้าหมายและบริบทของผู้บริหารแต่ละท่าน',
    modules: [
      {
        id: 'exec-presence',
        title: 'Focus 1: Strategic Clarity & Executive Presence',
        subtitle: 'ความชัดเจนเชิงกลยุทธ์และพลังภาวะผู้นำ',
        description: 'การตกผลึกวิสัยทัศน์ การสื่อสารสร้างแรงบันดาลใจ และการสร้างความน่าเชื่อถือในฐานะเบอร์หนึ่ง',
        highlights: [
          'Vision Crystallization & Strategic Focus',
          'Executive Presence & Authentic Communication',
          'High-Stakes Decision Making under Uncertainty',
          'Managing Board & Stakeholder Dynamics'
        ]
      },
      {
        id: 'exec-people',
        title: 'Focus 2: Leading Culture & Succession Mentoring',
        subtitle: 'การขับเคลื่อนวัฒนธรรมองค์กรและการสร้างทายาทผู้นำ',
        description: 'การสร้างทีมบริหารระดับสูง (C-Suite Synergy) และการวางแผนส่งต่อความสำเร็จ',
        highlights: [
          'Shaping Organization Culture from the Top',
          'Building High-Performing Executive Teams',
          'Succession Planning & Developing Key Talents',
          'Empowerment without Losing Strategic Control'
        ]
      },
      {
        id: 'exec-mindset',
        title: 'Focus 3: Emotional Mastery & Resilience',
        subtitle: 'การบริหารสภาวะภายในและความยืดหยุ่นทางอารมณ์',
        description: 'การจัดการความเครียด การข้ามผ่านความกลัว และการรักษาความมั่นคงทางใจในวิกฤต',
        highlights: [
          'Overcoming Imposter Syndrome & Executive Anxiety',
          'Emotional Agility in High-Pressure Situations',
          'Mindfulness & Mental Energy Management',
          'Cultivating Inner Peace & Clarity'
        ]
      },
      {
        id: 'exec-balance',
        title: 'Focus 4: Life Harmony & Lasting Legacy',
        subtitle: 'ความสมดุลในชีวิตและคุณค่าที่ต้องการส่งต่อ',
        description: 'การสร้างความสุขที่แท้จริง เชื่อมโยงความสำเร็จในงานกับคุณค่าชีวิตส่วนตัว',
        highlights: [
          'Work-Life Harmony & Personal Well-being',
          'Defining Your Leadership Legacy',
          'Purpose-Driven Leadership Alignment',
          'Sustaining High Performance Long-Term'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'การตัดสินใจที่เฉียบคมและรอบคอบ (Decisive Clarity)', desc: 'มองเห็นภาพรวมทะลุปรุโปร่ง และตัดสินใจเชิงกลยุทธ์ได้อย่างมั่นใจ' },
      { title: 'ยกระดับภาวะผู้นำที่สร้างแรงบันดาลใจ (Inspiring Leadership)', desc: 'ทีมงานพร้อมให้ใจและร่วมมือขับเคลื่อนวิสัยทัศน์อย่างเต็มศักยภาพ' },
      { title: 'ฟื้นฟูพลังกายและพลังใจ (Renewed Energy & Well-being)', desc: 'ลดความตึงเครียด มีความสุขในการทำงาน และมีสมดุลชีวิตที่ดีขึ้น' },
      { title: 'ส่งมอบผลลัพธ์ธุรกิจที่ก้าวกระโดด (Sustainable Growth)', desc: 'องค์กรเติบโตอย่างมั่นคงท่ามกลางความเปลี่ยนแปลง' }
    ],

    targetAudience: [
      'ประธานเจ้าหน้าที่บริหาร (CEO) และกรรมการผู้จัดการ (MD / President)',
      'ผู้บริหารระดับสูง (C-Suite Executives: CFO, COO, CMO, CHRO, CTO)',
      'เจ้าของธุรกิจและทายาทธุรกิจครอบครัว (Business Owners & Next-Gen Leaders)',
      'กรรมการบริหารและผู้นำองค์กรภาครัฐและเอกชน'
    ],

    formatAndDuration: {
      duration: 'โปรแกรม 3 เดือน หรือ 6 เดือน (พบกันทุก 2 สัปดาห์ ครั้งละ 90 นาที)',
      groupSize: '1-on-1 ตัวต่อตัว (รักษาความลับ 100% ภายใต้ NDA)',
      mode: 'In-person ณ สถานที่ส่วนตัว / Private Executive Suite หรือ Confidential Video Call'
    },

    faqs: [
      {
        question: 'ข้อมูลที่พูดคุยในกระบวนการ Coaching จะถูกเก็บเป็นความลับหรือไม่?',
        answer: 'เรายึดถือจรรยาบรรณวิชาชีพโค้ชระดับสากลอย่างเคร่งครัด ข้อมูล บทสนทนา และประเด็นที่พูดคุยทั้งหมดจะถูกเก็บเป็นความลับสูงสุด 100% ภายใต้สัญญารักษาความลับ (Non-Disclosure Agreement: NDA)'
      },
      {
        question: 'ความแตกต่างระหว่าง Executive Coaching กับ Consulting คืออะไร?',
        answer: 'Consulting คือการที่ที่ปรึกษาเป็นผู้บอกคำตอบและแนวทางแก้ปัญหา แต่ Executive Coaching คือกระบวนการที่โค้ชช่วยตั้งคำถาม สะท้อนคิด และชวนวิเคราะห์ เพื่อให้ผู้บริหารค้นพบคำตอบที่ทรงพลังและเหมาะสมกับตนเองมากที่สุด'
      }
    ]
  },

  'od-consulting': {
    slug: 'od-consulting',
    url: '/od-consulting',
    intent: 'B2B',
    badge: 'Strategic Organization Development Consulting',
    metaTitle: 'OD Consulting ที่ปรึกษาพัฒนาองค์กรและวัฒนธรรม | CAP Vision Institute',
    metaDescription: 'บริการที่ปรึกษาด้านการพัฒนาองค์กร (Organization Development Consulting) วางสถาปัตยกรรมวัฒนธรรมองค์กร, การขับเคลื่อน Change Management และ Competency Framework',
    keywords: [
      'OD Consulting', 'ที่ปรึกษาพัฒนาองค์กร', 'Organization Development', 
      'Culture Transformation', 'Change Management', 'วัฒนธรรมองค์กร',
      'ที่ปรึกษา HRD', 'CAP Vision Institute', 'ครูเด่น มาสเตอร์ฟา'
    ],
    h1: 'OD Consulting ที่ปรึกษาพัฒนาองค์กร',
    subH1: 'ที่ปรึกษาคู่คิดยุทธศาสตร์ วางสถาปัตยกรรมคน วัฒนธรรม และระบบเพื่อการเปลี่ยนผ่านที่ยั่งยืน',
    tagline: 'ผสานกลยุทธ์ธุรกิจ (Strategy) เข้ากับพฤติกรรมคน (Culture) เพื่อสร้างองค์กรที่พร้อมเติบโตและปรับตัวอย่างก้าวกระโดด',
    valueProposition: 'CAP Vision Institute ให้บริการที่ปรึกษาด้านการพัฒนาองค์กร (OD) โดยไม่เน้นการทำเอกสารรายงานหนาเตอะที่วางไว้บนหิ้ง แต่เน้นการลงมือสร้างการเปลี่ยนแปลงเชิงระบบ (Systemic Change) ร่วมกับผู้บริหารและทีมงาน เพื่อแปลงค่านิยม (Core Values) ให้กลายเป็นพฤติกรรมจริงในทุกๆ วัน',
    primaryCta: 'ปรึกษาโจทย์การพัฒนาองค์กร (OD Consultation)',
    secondaryCta: 'ดูแนวทาง OD Framework',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    themeColor: '#0F2557',
    accentColor: '#F59E0B',
    
    painPointsTitle: 'ปัญหาเชิงโครงสร้างและวัฒนธรรมที่องค์กรมักเผชิญ',
    painPointsDescription: 'เมื่อกลยุทธ์ธุรกิจเปลี่ยน แต่คนและวัฒนธรรมองค์กรไม่ยอมเปลี่ยนตาม',
    painPoints: [
      {
        title: 'ค่านิยมองค์กร (Core Values) อยู่แค่บนกระดาษ',
        description: 'พนักงานจำค่านิยมได้แต่ไม่รู้ว่าจะนำมาปรับใช้ในพฤติกรรมการทำงานและการตัดสินใจประจำวันอย่างไร'
      },
      {
        title: 'การต่อต้านการเปลี่ยนแปลง (Resistance to Change)',
        description: 'เมื่อมีการปรับโครงสร้างองค์กร นำเทคโนโลยีใหม่ หรือเปลี่ยนทิศทางธุรกิจ พนักงานเกิดความกลัวและต่อต้าน'
      },
      {
        title: 'ขาดระบบการพัฒนาผู้นำและแผนสืบทอดตำแหน่ง (Succession Gap)',
        description: 'ไม่มีผู้นำรุ่นใหม่ที่พร้อมขึ้นมาทดแทนตำแหน่งสำคัญ ทำให้การขยายธุรกิจติดขัดและมีความเสี่ยงสูง'
      },
      {
        title: 'การประสานงานติดขัดและขาดความผูกพัน (Low Engagement & Silo)',
        description: 'กระบวนการทำงานซ้ำซ้อน แต่ละแผนกทำงานแยกส่วน พนักงานขาดแรงจูงใจและสถิติการลาออกสูง'
      }
    ],

    solutionTitle: 'กระบวนการ OD Consulting 4 ขั้นตอนของ CAP Vision',
    solutionDescription: 'ขับเคลื่อนการเปลี่ยนแปลงอย่างเป็นระบบและวัดผลได้',
    solutions: [
      {
        title: '1. Organizational Diagnosis & Audit',
        description: 'สำรวจสุขภาพองค์กร วัฒนธรรม และสัมภาษณ์เชิงลึกเพื่อระบุจุดติดขัดที่แท้จริง (Root Cause Analysis)'
      },
      {
        title: '2. Co-Designing Transformation Roadmap',
        description: 'ร่วมวางสถาปัตยกรรมการเรียนรู้ แผนการสื่อสาร และการแปลง Core Values สู่ Behavioral Indicators'
      },
      {
        title: '3. Multi-Level Intervention & Facilitation',
        description: 'ขับเคลื่อนการเปลี่ยนแปลงผ่าน Workshop, Townhall Facilitation, และ Leadership Alignment'
      },
      {
        title: '4. Institutionalization & Measurement',
        description: 'ฝังพฤติกรรมใหม่ลงในระบบประเมินผล วัฒนธรรมองค์กร พร้อมประเมินผลลัพธ์และความยั่งยืน'
      }
    ],

    modulesTitle: 'ขอบเขตบริการที่ปรึกษาพัฒนาองค์กร (OD Service Scope)',
    modulesDescription: 'สามารถเลือกทำเป็นโครงการเฉพาะด้าน หรือแบบบูรณาการทั้งระบบองค์กร',
    modules: [
      {
        id: 'culture-transform',
        title: 'Scope 1: Culture & Core Values Transformation',
        subtitle: 'การสร้างและขับเคลื่อนวัฒนธรรมองค์กร',
        description: 'กระบวนการแปลงค่านิยมองค์กรให้กลายเป็นพฤติกรรมที่วัดผลได้ในชีวิตประจำวัน',
        highlights: [
          'Core Values Definition & Behavioral Indicators Formulation',
          'Culture Activation Workshops & Change Agents (Culture Champions)',
          'Aligning HR Systems with Target Culture',
          'Culture Monitoring & Employee Engagement Audit'
        ]
      },
      {
        id: 'change-mgmt',
        title: 'Scope 2: Change Management Architecture',
        subtitle: 'การบริหารการเปลี่ยนแปลงสำหรับองค์กรขนาดใหญ่',
        description: 'สถาปัตยกรรมการสื่อสารและการขับเคลื่อนการเปลี่ยนผ่านในยุค Disruption หรือ M&A',
        highlights: [
          'Change Impact Assessment & Stakeholder Mapping',
          'Strategic Change Communication & Townhall Facilitation',
          'Overcoming Resistance & Building Psychological Safety',
          'Continuous Feedback Loops & Change Agility'
        ]
      },
      {
        id: 'competency-design',
        title: 'Scope 3: Leadership Competency & Learning Architecture',
        subtitle: 'การออกแบบกรอบสมรรถนะและสถาปัตยกรรมการเรียนรู้',
        description: 'การสร้าง Competency Model และ Learning Roadmap ที่สอดคล้องกับกลยุทธ์ธุรกิจในอนาคต',
        highlights: [
          'Future Leadership Competency Framework Design',
          'Multi-Tier Learning Roadmap Architecture (Executive to Staff)',
          'Succession Planning & High-Potential Identification',
          'Pre-Post Assessment & Evaluation Metrics Design'
        ]
      },
      {
        id: 'team-alignment',
        title: 'Scope 4: Executive Alignment & Strategic Facilitation',
        subtitle: 'การจัดกระบวนการ Alignment ผู้บริหารระดับสูง',
        description: 'การนำกระบวนการประชุมเชิงยุทธศาสตร์เพื่อสร้างวิสัยทัศน์ร่วมและความเป็นอันหนึ่งอันเดียวกัน',
        highlights: [
          'Strategic Visioning & Business Direction Alignment',
          'C-Suite Synergy & Conflict Harmonization',
          'Co-Creating Annual Strategic Priorities',
          'Action Commitment & Governance Framework'
        ]
      }
    ],

    businessOutcomes: [
      { title: 'วัฒนธรรมองค์กรที่เข้มแข็ง (Strong Positive Culture)', desc: 'พนักงานมีค่านิยมร่วมและแสดงออกด้วยพฤติกรรมที่สอดคล้องกับเป้าหมายองค์กร' },
      { title: 'การเปลี่ยนผ่านที่ราบรื่น (Smooth Transformation)', desc: 'ลดการต่อต้าน พนักงานมีความเข้าใจและร่วมมือขับเคลื่อนการเปลี่ยนแปลง' },
      { title: 'โครงสร้างคนพร้อมรองรับอนาคต (Future-Ready Workforce)', desc: 'มีผู้นำรุ่นใหม่และทีมงานที่มีสมรรถนะพร้อมรับมือความท้าทาย' },
      { title: 'ผลการดำเนินงานทางธุรกิจเติบโต (Sustainable Business ROI)', desc: 'องค์กรมีประสิทธิภาพสูง มีความคล่องตัว และบรรลุเป้าหมายเชิงยุทธศาสตร์' }
    ],

    targetAudience: [
      'ผู้บริหารระดับสูง (CEO, Board Members, Managing Directors)',
      'ผู้บริหารฝ่ายทรัพยากรบุคคลและพัฒนาองค์กร (CHRO / CPO / Head of OD & HR)',
      'คณะกรรมการขับเคลื่อนยุทธศาสตร์และการเปลี่ยนแปลง (Transformation Committee)',
      'องค์กรที่กำลังขยายตัว ควบรวมกิจการ หรือปรับโครงสร้างธุรกิจครั้งใหญ่'
    ],

    formatAndDuration: {
      duration: 'โครงการที่ปรึกษา 3 เดือน, 6 เดือน หรือ 1 ปี (ขึ้นอยู่กับขอบเขตงาน)',
      groupSize: 'ทำงานร่วมกับคณะทำงาน (Steering Committee) และครอบคลุมพนักงานทั้งองค์กร',
      mode: 'Strategic Consulting, On-site Diagnostic, Executive Facilitation & Workshop Interventions'
    },

    faqs: [
      {
        question: 'กระบวนการเป็นที่ปรึกษา OD แตกต่างจากการจัดอบรมธรรมดาอย่างไร?',
        answer: 'การจัดอบรมธรรมดาคือการถ่ายทอดความรู้ในห้องเรียน แต่ OD Consulting คือการวิเคราะห์โครงสร้างคน ระบบ และวัฒนธรรมทั้งระบบ ร่วมมือกับผู้บริหารและทีมงานในการแก้ปัญหาเชิงลึก และติดตามผลการเปลี่ยนแปลงเชิงพฤติกรรมอย่างต่อเนื่องครับ'
      },
      {
        question: 'องค์กรขนาดกลาง (SMEs) เหมาะกับการทำ OD หรือไม่?',
        answer: 'เหมาะมากครับ โดยเฉพาะ SMEs ที่กำลังเติบโตก้าวกระโดดและเริ่มเจอปัญหาเรื่องคน การประสานงาน หรือการส่งต่องาน การทำ OD จะช่วยวางรากฐานวัฒนธรรมและระบบคนให้แข็งแรงเพื่อรองรับการขยายตัวอย่างยั่งยืน'
      }
    ]
  }
};
