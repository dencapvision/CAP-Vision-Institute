
import React from 'react';
import { Sparkles, Zap, Heart } from 'lucide-react';

export const CONTACT_INFO = {
    phone: '093-223-5919',
    email: 'dencapvision@gmail.com',
    line: '@denmasterfa',
    lineUrl: 'https://lin.ee/zRTBF6K',
    facebook: 'thecapvision',
    facebookUrl: 'https://facebook.com/thecapvision',
    instagram: '@denmasterfa',
    instagramUrl: 'https://www.instagram.com/denmasterfa',
    youtube: '@thecapvision',
    youtubeUrl: 'https://youtube.com/@thecapvision',
    tiktok: '@denmasterfa',
    tiktokUrl: 'https://www.tiktok.com/@denmasterfa',
    address: '60/319 หมู่บ้านพฤกษ์ลดา ซอย 2 ตำบล ลาดสวาย อำเภอลำลูกกา ปทุมธานี 12150',
    mapsUrl: 'https://share.google/tfTmh0RBeeNACVWcn',
    businessHours: {
        weekdays: '08.30 - 18.00 น.',
        saturday: '08.30 - 18.00 น.',
        sunday: 'หยุดวันอาทิตย์'
    }
};

export const BRAND_INFO = {
    name: 'CAP Vision Institute',
    thaiName: 'แคป วิชั่น อินสติทิวต์',
    slogan: 'Transform People, Transform Organization',
    director: 'ครูเด่น มาสเตอร์ฟา (อนุสรณ์ หนองนา)',
    vision: 'ปลุกศักยภาพมนุษย์จากภายใน\nจุดประกายการเปลี่ยนแปลงที่มีความหมาย\nและขับเคลื่อนองค์กรสู่ผลลัพธ์ที่ยั่งยืน',
    mission: [
        'ออกแบบการเรียนรู้ที่สร้างการเปลี่ยนแปลง',
        'พัฒนาผู้นำที่ขับเคลื่อนองค์กรได้จริง',
        'สร้างวัฒนธรรมการเรียนรู้ในองค์กร',
        'Facilitate การเปลี่ยนแปลงจากภายใน',
        'ใช้เทคโนโลยีขับเคลื่อนการเรียนรู้'
    ],
    coreBeliefs: [
        { title: 'Human Potential', desc: 'ศักยภาพมนุษย์ไม่ได้ถูกจำกัดด้วยสภาพแวดล้อม แต่ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง', icon: React.createElement(Sparkles, { className: "w-6 h-6" }) },
        { title: 'Actionable Learning', desc: 'การเรียนรู้ที่แท้จริงต้องนำไปใช้ได้ทันทีและสร้างการเปลี่ยนแปลง', icon: React.createElement(Zap, { className: "w-6 h-6" }) },
        { title: 'Inside-Out Growth', desc: 'การเติบโตที่ยั่งยืนเริ่มต้นจากการตระหนักรู้ภายใน (Self-Awareness)', icon: React.createElement(Heart, { className: "w-6 h-6" }) }
    ]
};

export const CLIENTS = [
    { name: 'Tops (Central Food Retail)', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/central%20food%20retail%20(CFR).png' },
    { name: 'Mr.D.I.Y. (Thailand)', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Mr-DIY-logo.png' },
    { name: 'AOT', type: 'State Enterprise', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Airports_of_Thailand_Logo.svg.png' },
    { name: 'PEA', type: 'State Enterprise', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/PEA.png' },
    { name: 'Land & Houses', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/landandhouses.jpg' },
    { name: 'Toyota', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Toyota_Symbol.svg.png' },
    { name: 'Dell Technologies', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Dell%20Corperation%20(Thailand)%20Co.,%20Ltd..png' },
    { name: 'Betagro', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Betagro.png' },
    { name: 'EXAT', type: 'State Enterprise', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/EXAT.png' },
    { name: 'Universal Robina', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Universal_Robina-Logo.wine.png' },
    { name: 'ศอบต.', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/sbpac.go.th.jpg' },
    { name: 'สสส. SOOK', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/sook.png' },
    { name: 'กรมวิทยาศาสตร์บริการ', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/dss.go.th.png' },
    { name: 'สภากาชาดไทย', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/Thai_Red_Cross_Society_Logo_(2022).svg' },
    { name: 'กรมทรัพยากรน้ำบาดาล', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/dgr.go.th.png' },
    { name: 'ปปส.', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/oncb.go.th.png' },
    { name: 'สำนักงานทรัพยากรน้ำแห่งชาติ', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/onwr.go.th.png' },
    { name: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/obec.go.th.png' },
    { name: 'มหาวิทยาลัยศรีนครินทรวิโรฒ', type: 'Academic', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/SWU.png' },
    { name: 'มหาวิทยาลัยราชภัฏสกลนคร', type: 'Academic', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/snru.ac.th.png' },
    { name: 'มหาวิทยาลัยราชภัฏยะลา', type: 'Academic', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/yru.ac.th.png' },
    { name: 'เทศบาลเมืองป่าตอง จ.ภูเก็ต', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/patongcity.go.th.jpg' },
    { name: 'TF Cosmetology', type: 'Corporate', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/TF.png' },
    { name: 'สมาคมส่งเสริมบุคลิกสตรี', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/thaiwomen.jpg' },
    { name: 'TISTR วว.', type: 'Government', logo: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/clients%20logo/tistr.or.th.svg' },
];

export const TIMELINE = [
    { year: '2552', title: 'จุดเริ่มต้น CAP Vision', desc: 'ก่อตั้งขึ้นจากความเชื่อที่ว่าศักยภาพมนุษย์ถูกปลดปล่อยผ่านการเรียนรู้ที่แท้จริง มุ่งเน้นการพัฒนาจากภายใน' },
    { year: '2554 - 2558', title: 'ภารกิจเพื่อสังคมและชุมชน (ศอบต.)', desc: 'ลงพื้นที่ภาคใต้ช่วยเหลือผู้ได้รับผลกระทบจากเหตุการณ์ความไม่สงบ พิสูจน์ว่าการเรียนรู้สามารถเปลี่ยนแปลงชีวิตและสังคมได้จริง' },
    { year: '2561', title: 'DFA Model Generation', desc: 'คิดค้นและพัฒนาหลักสูตร Dynamic Learning Design (DFA) ที่เป็นเอกลักษณ์ เชื่อมโยง Transformative Learning' },
    { year: 'ปัจจุบัน', title: 'Transformation Partner', desc: 'เป็นผู้นำด้าน L&D ที่เชื่อมโยงองค์ความรู้สมัยใหม่เข้ากับ Digital Learning และ AI Solutions' }
];
