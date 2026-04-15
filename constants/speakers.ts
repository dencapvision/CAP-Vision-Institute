
export interface Speaker {
    id: string;
    name: string;
    title: string;
    image: string;
    bio: string;
    longBio: string;
    expertise: string[];
    achievements: string[];
    socials?: {
        phone?: string;
        line?: string;
        facebook?: string;
        instagram?: string;
        tiktok?: string;
    };
}

export const SPEAKERS: Speaker[] = [
    {
        id: 'den-master-fa',
        name: 'อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)',
        title: 'ผู้อำนวยการและมาสเตอร์ฟาซิลิตเทเตอร์',
        image: '/images/denmasterfa.jpg',
        bio: 'ผู้อำนวยการสถาบันแคป วิชั่น ผู้เชี่ยวชาญด้าน Transformative Learning ประสบการณ์ 18 ปี',
        longBio: 'วิยากรผู้สร้างการเปลี่ยนแปลงจากภายใน (Communication Healer and Facilitator) เจ้าของโมเดล DFA Strategy และผู้ก่อตั้ง FFT – Facilitator for Thailand มุ่งเน้นการสร้าง Human Capital ผ่านกระบวนการที่สนุก (Edutainment) และมีส่วนร่วมสูง โดยใช้จิตวิทยาเชิงบวกและการโค้ชด้าน Mindfulness & Meditation',
        expertise: [
            'Transformative Learning & Flow Design',
            'Communication Styles (C.O.D. Model)',
            'Facilitation & Coaching Techniques',
            'Team & Leadership Development',
            'Mindfulness in Business'
        ],
        achievements: [
            'ประสบการณ์กว่า 18 ปี ในการพัฒนาบุคลากรทั้งภาครัฐและเอกชน',
            'นักจัดและพัฒนาเวิร์กชอปมากกว่า 1,000 เวที',
            'วิทยากรที่ปรึกษาด้านนวัตกรรมบริการและการสร้างทีม',
            'ที่ปรึกษาด้าน AI สำหรับธุรกิจสมัยใหม่'
        ],
        socials: {
            phone: '093-223-5919',
            line: '@denmasterfa',
            facebook: 'cheumkon',
            instagram: 'denmasterfa',
            tiktok: '@denmasterfa'
        }
    },
    {
        id: 'trainer-team',
        name: 'ทีมวิทยากรคุณภาพ (Trainer Team)',
        title: 'High-Performance Trainers & Facilitators',
        image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/about%20us/Trainer%20Team.jpg',
        bio: 'ทีมงานผู้เชี่ยวชาญด้านการจัดกระบวนการเรียนรู้และกิจกรรมกลุ่มสัมพันธ์ (Team Building) ที่มีพลังและสร้างสรรค์',
        longBio: 'ทีมวิทยากรและ Facilitator มืออาชีพจาก CAP Vision Institute ที่มีความเชี่ยวชาญในการออกแบบและดำเนินการฝึกอบรมเชิงรุก (Active Learning) มุ่งเน้นการดึงศักยภาพของผู้เรียนผ่านกิจกรรมที่สนุกและได้แง่คิดในการทำงานร่วมกัน',
        expertise: [
            'Team Synergy & Relationship',
            'Communication Skills',
            'Action Planning & Goal Setting',
            'Activity-Based Learning'
        ],
        achievements: [
            'ดูแลการจัดอบรมให้องค์กรชั้นนำมากกว่า 500 แห่ง',
            'เชี่ยวชาญการใช้เครื่องมือ Facilitation หลากหลายรูปแบบ',
            'เน้นผลลัพธ์ที่นำไปใช้ได้จริง (Result-Oriented)'
        ]
    },
    {
        id: 'personality-coach',
        name: 'ผู้เชี่ยวชาญด้านบุคลิกภาพ (Personality Coach)',
        title: 'Image & Personality Expert',
        image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/about%20us/Personality%20Coach.jpg',
        bio: 'ที่ปรึกษาด้านภาพลักษณ์และบุคลิกภาพเชิงธุรกิจ เพื่อเพิ่มความมั่นใจและเสน่ห์ในการทำงาน',
        longBio: 'วิทยากรและโค้ชผู้เชี่ยวชาญด้านบุคลิกภาพที่ช่วยปรับภาพลักษณ์องค์กรผ่านบุคคล เน้นการสื่อสารด้วยภาพลักษณ์ (Visual Communication) ท่วงท่า และความมั่นใจที่เป็นธรรมชาติ เพื่อสร้างความประทับใจตั้งแต่แรกพบ',
        expertise: [
            'Business Image & Etiquette',
            'Visual Communication',
            'Self-Confidence Building',
            'Professional Grooming'
        ],
        achievements: [
            'โค้ชด้านภาพลักษณ์ให้ผู้บริหารและทีมงานสายบริการ',
            'ผู้เชี่ยวชาญด้านการพัฒนาบุคลิกภาพเชิงรุก',
            'วิทยากรรับเชิญในหลักสูตรระดับสากล'
        ]
    },
    {
        id: 'relationship-trainer',
        name: 'วิทยากรด้านความสัมพันธ์ (Relationship Trainer)',
        title: 'Communication & Relationship Specialist',
        image: 'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/about%20us/Relationship%20trainer.jpg',
        bio: 'ผู้เชี่ยวชาญด้านการสื่อสารเพื่อสร้างความสัมพันธ์และความสุขในองค์กร (Happy Workplace)',
        longBio: 'เน้นกระบวนการจิตวิทยาเชิงบวก (Positive Psychology) เพื่อลดความขัดแย้งและสร้างความเข้าใจระหว่างบุคคลในที่ทำงาน ช่วยให้ทีมงานมีทัศนคติที่ดีต่อกันและทำงานร่วมกันได้อย่างราบรื่น',
        expertise: [
            'Conflict Management',
            'Positive Communication',
            'Empathy in Workplace',
            'Interpersonal Skills'
        ],
        achievements: [
            'ผู้ออกแบบหลักสูตรสร้างสุขในที่ทำงาน (Happy Workplace)',
            'เชี่ยวชาญด้านการปรับทัศนคติเชิงบวก (Positive Mindset)',
            'ที่ปรึกษาด้านการสื่อสารภายในองค์กร'
        ]
    }
];
