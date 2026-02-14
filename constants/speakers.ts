
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
        line?: string;
        facebook?: string;
        tiktok?: string;
    };
}

export const SPEAKERS: Speaker[] = [
    {
        id: 'den-master-fa',
        name: 'อนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)',
        title: 'ผู้อำนวยการและมาสเตอร์ฟาซิลิตเทเตอร์',
        image: 'https://res.cloudinary.com/dmo4kq7ej/image/upload/v1769741787/%E0%B8%84%E0%B8%A3%E0%B8%B9%E0%B9%80%E0%B8%94%E0%B9%88%E0%B8%99%20%E0%B8%A1%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9F%E0%B8%B2%20%40denmasterfa.png',
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
            line: '@denmasterfa',
            facebook: 'thecapvision'
        }
    }
];
