
import React from 'react';
import { Sparkles, Zap, Heart } from 'lucide-react';

export const CONTACT_INFO = {
    phone: '093-223-5919',
    email: 'thecapvision@gmail.com',
    line: '@denmasterfa',
    lineUrl: 'https://lin.ee/zRTBF6K',
    facebook: 'thecapvision',
    facebookUrl: 'https://facebook.com/thecapvision',
    youtube: '@thecapvision',
    youtubeUrl: 'https://youtube.com/@thecapvision',
    address: 'Bangkok, Thailand',
    mapsUrl: 'https://goo.gl/maps/abc'
};

export const BRAND_INFO = {
    name: 'CAP Vision Institute',
    thaiName: 'แคป วิชั่น อินสติทิวต์',
    slogan: 'Transform People, Transform Organization',
    director: 'ครูเด่น มาสเตอร์ฟา (อนุสรณ์ หนองนา)',
    vision: 'เชื่อมโยงข้อมูลระดับโลก เพื่อช่วยให้บุคคลและองค์กรค้นพบทุกกลยุทธ์และพัฒนาศักยภาพสูงสุดในเวลาที่จำกัด',
    mission: [
        'ออกแบบโซลูชันการเรียนรู้ที่ทันสมัย – ผสมผสานแนวคิด Blended Learning และ AI-powered Learning',
        'พัฒนาผู้นำและบุคลากรองค์กร – สร้าง Leadership Development Programs ที่ตอบโจทย์อนาคต',
        'สนับสนุนองค์กรสร้าง Learning Culture – วางรากฐานวัฒนธรรมการเรียนรู้ผ่าน Reskilling & Upskilling',
        'เป็น Facilitator ในการเปลี่ยนแปลง – ใช้เทคนิค Facilitation & Coaching เพื่อพัฒนาแนวคิดและพฤติกรรม',
        'นำเทคโนโลยีมาขับเคลื่อนการเรียนรู้ – สร้างแพลตฟอร์ม Digital Learning Solutions ที่ตอบโจทย์องค์กรยุคใหม่'
    ],
    coreBeliefs: [
        { title: 'Human Potential', desc: 'ศักยภาพมนุษย์ไม่ได้ถูกจำกัดด้วยสภาพแวดล้อม แต่ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง', icon: React.createElement(Sparkles, { className: "w-6 h-6" }) },
        { title: 'Actionable Learning', desc: 'การเรียนรู้ที่แท้จริงต้องนำไปใช้ได้ทันทีและสร้างการเปลี่ยนแปลง', icon: React.createElement(Zap, { className: "w-6 h-6" }) },
        { title: 'Inside-Out Growth', desc: 'การเติบโตที่ยั่งยืนเริ่มต้นจากการตระหนักรู้ภายใน (Self-Awareness)', icon: React.createElement(Heart, { className: "w-6 h-6" }) }
    ]
};

export const CLIENTS = [
    { name: 'Toyota', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Toyota_logo_%28modern%29.svg' },
    { name: 'Dell Technologies', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg' },
    { name: 'Betagro', type: 'Corporate', logo: 'https://www.betagro.com/img/logo-betagro.svg' },
    { name: 'AOT', type: 'State Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Airports_of_Thailand_Logo.svg' },
    { name: 'EXAT', type: 'State Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/th/4/4e/EXAT_Logo.png' },
    { name: 'PEA', type: 'State Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/f/f6/PEA_Logo.svg/1200px-PEA_Logo.svg.png' },
    { name: 'Land & Houses', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/3/30/Land_and_Houses_logo.svg/1280px-Land_and_Houses_logo.svg.png' },
    { name: 'Central Food Retail', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Central_Group_logo.svg' },
    { name: 'Universal Robina', type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/URC_Logo.svg' },
    { name: 'ศอบต.', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/d/d4/SBPAC_Logo.png' },
    { name: 'สสส. SOOK', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/e/e0/Thai_Health_Promotion_Foundation_Logo.png/640px-Thai_Health_Promotion_Foundation_Logo.png' },
    { name: 'กรมวิทยาศาสตร์บริการ', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/7/7b/Logo_DSS_Thailand.svg/1200px-Logo_DSS_Thailand.svg.png' },
    { name: 'มหาวิทยาลัยศรีนครินทรวิโรฒ', type: 'Academic', logo: 'https://upload.wikimedia.org/wikipedia/th/thumb/6/6f/SWU_Seal.png/600px-SWU_Seal.png' },
    { name: 'มหาวิทยาลัยราชภัฏสกลนคร', type: 'Academic', logo: 'https://upload.wikimedia.org/wikipedia/th/9/9c/SNRU_Logo.png' },
    { name: 'มหาวิทยาลัยราชภัฏยะลา', type: 'Academic', logo: 'https://upload.wikimedia.org/wikipedia/th/0/0f/YRU_Logo.png' },
    { name: 'TISTR วว.', type: 'Government', logo: 'https://upload.wikimedia.org/wikipedia/th/1/11/TISTR_Logo.png' }
];

export const TIMELINE = [
    { year: '2552', title: 'จุดเริ่มต้น CAP Vision', desc: 'ก่อตั้งขึ้นจากความเชื่อที่ว่าศักยภาพมนุษย์ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง มุ่งเน้นการพัฒนาจากภายใน' },
    { year: '2554 - 2558', title: 'ภารกิจเพื่อสังคมและชุมชน (ศอบต.)', desc: 'ลงพื้นที่ภาคใต้ช่วยเหลือผู้ได้รับผลกระทบจากเหตุการณ์ความไม่สงบ พิสูจน์ว่าการเรียนรู้สามารถเปลี่ยนแปลงชีวิตและสังคมได้จริง' },
    { year: '2561', title: 'DFA Model Generation', desc: 'คิดค้นและพัฒนาหลักสูตร Dynamic Learning Design (DFA) ที่เป็นเอกลักษณ์ เชื่อมโยง Transformative Learning' },
    { year: 'ปัจจุบัน', title: 'Transformation Partner', desc: 'เป็นผู้นำด้าน L&D ที่เชื่อมโยงองค์ความรู้สมัยใหม่เข้ากับ Digital Learning และ AI Solutions' }
];
