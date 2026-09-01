export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  title: string;
  description: string;
}

export interface ArticleSEO {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  summary: string;
  context: string;
  insight: string;
  framework: string[];
  application: string;
  case_study: string;
  takeaways: string[];
  faq: ArticleFAQ[];
  cta: string;
  seo: ArticleSEO;
  hashtags: string[];
  images: ArticleImage[];
}

// Generate fallback domain-rich article when AI key is missing or offline
function generateFallbackArticle(title: string, context?: string): GeneratedArticle {
  const cleanTitle = title.trim();
  const slug = cleanTitle
    .toLowerCase()
    .replace(/[^\w\sก-๙-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50) || 'article-' + Date.now();

  return {
    title: cleanTitle,
    slug: slug,
    summary: `การพัฒนา ${cleanTitle} เป็นหัวใจสำคัญในการยกระดับศักยภาพผู้นำและทีมงานในองค์กรยุคใหม่ ช่วยเปลี่ยนวิธีคิดจากภายใน ทลาย Silo ในการทำงาน และสร้างผลลัพธ์ที่ยั่งยืนผ่านกระบวนการ Transformative Learning`,
    context: `ในยุคที่องค์กรต้องเผชิญกับความผันผวนและความท้าทายรอบด้าน การพัฒนาทักษะเพียงแค่ Hard Skills ไม่เพียงพออีกต่อไป องค์กรชั้นนำพบว่าจุดคานงัดที่แท้จริงคือการพัฒนาภาวะผู้นำ กรอบความคิด (Growth Mindset) และการสร้างความปลอดภัยทางจิตวิทยา (Psychological Safety) เพื่อให้ทุกคนกล้าคิด กล้าสื่อสาร และร่วมมือกันอย่างแท้จริง`,
    insight: `CAP Vision Institute เชื่อมั่นในหลักการ "Transform People → Transform Organization" การเรียนรู้ที่มีพลังต้องเริ่มจากการตระหนักรู้ในตนเอง (Self-Awareness) สู่การเข้าใจผู้อื่นผ่าน Empathy และประยุกต์ใช้เครื่องมือ Facilitation เพื่อดึงศักยภาพสูงสุดของทีมออกมาโดยไม่ต้องใช้อำนาจสั่งการ`,
    framework: [
      '1. Assess & Diagnose: วินิจฉัยจุดติดขัดและวิเคราะห์ความพร้อมของคนในองค์กร',
      '2. Mindset Shift: ปรับเปลี่ยนกรอบความคิดและสร้าง Psychological Safety',
      '3. Process Facilitation: ใช้เครื่องมือการสนทนาและการแก้ปัญหาเชิงสร้างสรรค์ (CPS Model)',
      '4. Action & Integration: นำแผนปฏิบัติการไปปรับใช้ในการทำงานจริงพร้อมติดตามผล ROI'
    ],
    application: `นำไปประยุกต์ใช้ในการประชุมทีม การให้ Feedback เชิงบวก และการออกแบบโครงการพัฒนานวัตกรรมข้ามสายงาน (Cross-Functional Projects) โดยผู้นำทำหน้าที่เป็น Facilitator คอยสนับสนุนและเปิดพื้นที่ให้ทีมแสดงศักยภาพอย่างเต็มที่`,
    case_study: `องค์กรธุรกิจชั้นนำในอุตสาหกรรมการเงินและบริการได้นำโมเดลนี้ไปปรับใช้ในการพัฒนาผู้บริหารระดับกลาง ผลลัพธ์พบว่าความผูกพันในองค์กร (Employee Engagement) เพิ่มขึ้น 35% และลดระยะเวลาในการตัดสินใจแก้ปัญหาข้ามสายงานลงได้ถึง 40% ภายใน 3 เดือน`,
    takeaways: [
      'การพัฒนาคนต้องเริ่มจาก Mindset ภายในก่อนการปรับระบบภายนอก',
      'ผู้นำยุคใหม่ต้องเปลี่ยนจาก Commander มาเป็น Facilitator',
      'Psychological Safety คือรากฐานของการสื่อสารและนวัตกรรม',
      'Activity-Based Learning สร้างการเปลี่ยนแปลงพฤติกรรมจริงได้ดีกว่าการบรรยายทางเดียว',
      'การวัดผลลัพธ์ต้องเชื่อมโยงกับเป้าหมายทางธุรกิจขององค์กร'
    ],
    faq: [
      {
        question: `ทำไม ${cleanTitle} จึงจำเป็นสำหรับองค์กรยุคนี้?`,
        answer: `เพราะช่วยลดความขัดแย้ง เพิ่มประสิทธิภาพการทำงานร่วมกัน และทำให้องค์กรมีความยืดหยุ่น (Agility) พร้อมรับมือกับการเปลี่ยนแปลงอย่างรวดเร็ว`
      },
      {
        question: 'หลักสูตรนี้เหมาะสำหรับกลุ่มเป้าหมายระดับใดในองค์กร?',
        answer: 'เหมาะสำหรับผู้บริหารระดับสูง (C-Level), ผู้จัดการฝ่าย (Managers), HRD/L&D รวมถึงทีมงานที่ต้องทำงานประสานงานข้ามสายงาน'
      },
      {
        question: 'ใช้ระยะเวลาในการฝึกอบรมและเห็นผลลัพธ์นานแค่ไหน?',
        answer: 'โปรแกรม In-house Workshop แบบเข้มข้น 1-2 วัน พร้อม Action Plan สำหรับติดตามผลหลังการอบรม 30-90 วัน'
      }
    ],
    cta: 'ต้องการยกระดับผู้นำและทีมงานของคุณ? ปรึกษาออกแบบหลักสูตร In-house Training ร่วมกับ ครูเด่น มาสเตอร์ฟา และทีมผู้เชี่ยวชาญจาก CAP Vision Institute วันนี้',
    seo: {
      meta_title: `${cleanTitle.slice(0, 45)} | CAP Vision Institute`,
      meta_description: `เจาะลึก ${cleanTitle} พร้อมแนวทางปฏิบัติและกรณีศึกษาจริงจากองค์กรธุรกิจชั้นนำ เพื่อยกระดับภาวะผู้นำและวัฒนธรรมองค์กรอย่างยั่งยืน`,
      keywords: ['Leadership Transformation', 'Team Synergy', 'Growth Mindset', 'In-house Training', 'CAP Vision Institute']
    },
    hashtags: ['#CAPVision', '#LeadershipDevelopment', '#TransformPeople', '#InHouseTraining', '#MasterFa'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
        alt: `${cleanTitle} Workshop`,
        title: cleanTitle,
        description: `บรรยากาศการเรียนรู้และการพัฒนา ${cleanTitle} โดย CAP Vision Institute`
      }
    ]
  };
}

export async function generateArticle(title: string, context?: string, userApiKey?: string): Promise<GeneratedArticle> {
  const apiKey = userApiKey || (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : null);

  // If user provided a Gemini API Key, call Gemini directly
  if (apiKey) {
    try {
      const prompt = `You are CAP Vision Institute AI - Thailand's premier corporate transformative learning and OD consulting institute.
Generate a complete, high-quality, answer-first SEO/AEO article in JSON based on the topic: "${title}".
Editor Context: ${context || 'Focus on leadership, team synergy, culture, and practical workplace application in Thailand.'}

Return ONLY valid JSON matching this schema with NO markdown codeblocks:
{
  "title": "${title}",
  "slug": "english-lowercase-slug-kebab-case",
  "summary": "2-3 sentences answer-first summary (minimum 100 characters in Thai)",
  "context": "Comprehensive Thai context section about challenges in modern Thai organizations",
  "insight": "Deep Thai insight connecting to CAP Theory, Transformative Learning, Facilitative Leadership",
  "framework": ["1. Step 1 title: Thai description", "2. Step 2 title: Thai description", "3. Step 3 title: Thai description", "4. Step 4 title: Thai description"],
  "application": "Thai practical application steps for managers and teams",
  "case_study": "Thai realistic corporate case study showing challenges, solution, and measurable business ROI results",
  "takeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3", "Takeaway 4", "Takeaway 5"],
  "faq": [
    { "question": "Thai question 1", "answer": "Thai answer 1" },
    { "question": "Thai question 2", "answer": "Thai answer 2" },
    { "question": "Thai question 3", "answer": "Thai answer 3" }
  ],
  "cta": "Thai compelling CTA inviting readers to contact CAP Vision for in-house workshop or consultation",
  "seo": {
    "meta_title": "SEO title under 60 characters | CAP Vision",
    "meta_description": "SEO description between 130 and 165 characters explaining the core value in Thai",
    "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"]
  },
  "hashtags": ["#CAPVision", "#Leadership", "#Training"],
  "images": [
    {
      "url": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
      "alt": "${title}",
      "title": "${title}",
      "description": "ภาพบรรยากาศการเรียนรู้และการพัฒนาภาวะผู้นำ"
    }
  ]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7 }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return JSON.parse(cleanJson) as GeneratedArticle;
      }
    } catch (err) {
      console.warn('Direct Gemini generation failed, falling back to Domain Engine:', err);
    }
  }

  // Fallback to Instant Domain Engine
  return generateFallbackArticle(title, context);
}

