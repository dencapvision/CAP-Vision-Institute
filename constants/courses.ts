
import React from 'react';
import { Smile, ShieldCheck, Layout, Search, Zap, Brain, Layers, Users, MessageCircle, Target, Heart } from 'lucide-react';

export interface CourseDetailInfo {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    longDescription?: string;
    objectives?: string[];
    instructor?: {
        id?: string;
        name: string;
        bio: string;
        image: string;
    };
    duration?: string;
    audience?: string;
    why?: { label: string; stat: string; desc: string; icon?: React.ReactNode }[];
    how?: { title: string; desc: string; icon?: React.ReactNode }[];
    what?: string[];
}

export const COURSES: CourseDetailInfo[] = [
    {
        id: 'service-mind-excellence',
        title: 'หลักสูตร ใช้หัวใจบริการ คนสำราญ งานสำเร็จ (Service Mind)',
        category: 'People Skills',
        description: 'สร้างความแตกต่างด้วยหัวใจบริการ พร้อมปรับบุคลิกภาพแห่งตัวตนอย่างแท้จริง',
        image: 'https://images.unsplash.com/photo-1556740734-7f9a2b7a0f4d?auto=format&fit=crop&q=80',
        longDescription: 'หลักสูตรที่มุ่งเน้นการสร้างบุคลิกภาพแห่งตัวตน (Smart Personality) ทั้งด้านทักษะความรู้และความเข้าใจในหลักการให้บริการด้วยใจ (Service Mind) โดยใช้จิตวิทยาการบริการอย่างมีศิลปะเพื่อภาพลักษณ์องค์กรที่ดีเยี่ยม',
        duration: '1 วัน (09.00 - 16.30 น.)',
        audience: 'พนักงานส่วนหน้า (Front-line), เจ้าหน้าที่บริการลูกค้า, พนักงานทุกคนในองค์กร',
        why: [
            { label: 'ดัชนีความสุขผู้รับบริการ', stat: '98%', desc: 'ยกระดับความพึงพอใจด้วยการบริการที่เหนือความคาดหมาย', icon: React.createElement(Smile) },
            { label: 'ภาพลักษณ์องค์กร', stat: '100%', desc: 'สร้างความเชื่อมั่นผ่านการสื่อสารที่เป็นมืออาชีพ', icon: React.createElement(ShieldCheck) }
        ],
        how: [
            { title: 'Smart Personality', desc: 'ปรับบุคลิกภาพและสร้างเสน่ห์สำหรับผู้ให้บริการ', icon: React.createElement(Layout) },
            { title: 'Empathy Analysis', desc: 'วิเคราะห์ความต้องการของผู้รับบริการ 4 ประเภท', icon: React.createElement(Search) },
            { title: 'Conflict Management', desc: 'ทักษะการจัดการอารมณ์และสถานการณ์ยากลำบาก', icon: React.createElement(Zap) }
        ],
        what: [
            'Personality Adjustment for Service Excellence',
            'Effective Communication & Peace Communication',
            'Emotional Intelligence in Service',
            'Scenario-based Management Workshop'
        ],
        objectives: [
            'เข้าใจประโยชน์ของคุณค่าการบริการต่อตนเองและองค์กร',
            'พัฒนาบุคลิกภาพให้น่าเชื่อถือและมีเสน่ห์ดึงดูด',
            'เรียนรู้ทักษะการฟังเชิงลึก (Deep Listening)',
            'ฝึกทัศนคติเชิงบวกต่อการพัฒนาตนเองและเพื่อนร่วมงาน'
        ],
        instructor: {
            id: 'den-master-fa',
            name: 'ครูเด่น มาสเตอร์ฟา',
            bio: 'ที่ปรึกษาองค์กรและนักพัฒนาทักษะการสื่อสารเพิ่มพลังบวก',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
        }
    },
    {
        id: 'creative-problem-solving',
        title: 'หลักสูตร การแก้ปัญหาอย่างสร้างสรรค์ (Creative Problem Solving)',
        category: 'Work Skills',
        description: 'แตกปัญหาเพื่อหาทางออกด้วยกระบวนการคิดที่เป็นระบบและสร้างสรรค์',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
        longDescription: 'กระบวนการที่สอนให้เราแตกปัญหาเพื่อทำความเข้าใจ สร้างแนวคิด และประเมินความคิดเหล่านั้นเพื่อหาทางออกที่มีประสิทธิภาพสูงสุด ตามหลักสูตรระดับสากล (Buffalo College, New York)',
        duration: '1 วัน (09.00 - 16.30 น.)',
        audience: 'พนักงานระดับปฏิบัติการ, หัวหน้างาน, ผู้จัดการโครงการ',
        why: [
            { label: 'นวัตกรรมใหม่', stat: '45%', desc: 'เพิ่มขีดความสามารถในการสร้างทางเลือกที่แตกต่าง', icon: React.createElement(Layers) },
            { label: 'ประสิทธิภาพงาน', stat: '3X', desc: 'แก้ปัญหาได้รวดเร็วและแม่นยำขึ้นด้วยกระบวนการ 7 ขั้นตอน', icon: React.createElement(ShieldCheck) }
        ],
        how: [
            { title: 'Growth Mindset Workshop', desc: 'ปรับทัศนคติการเผชิญปัญหาผ่านกิจกรรม Gain & Loss', icon: React.createElement(Brain) },
            { title: '7-Steps CPS Process', desc: 'เรียนรู้ขั้นตอนตั้งแต่ระบุปัญหาจนถึงการนำไปใช้งานจริง', icon: React.createElement(Layers) },
            { title: 'Facilitating Cards', desc: 'ใช้เครื่องมือกระตุ้นไอเดียเพื่อเปลี่ยนปัญหาเป็นความท้าทาย', icon: React.createElement(Zap) }
        ],
        what: [
            'Growth Mindset in Problem Solving',
            'The 7 Steps of Creative Problem Solving',
            'Relationship & Internal Communication Problems',
            'Strategic Action Planning'
        ],
        objectives: [
            'ระบุและวิจัยปัญหาที่แท้จริงได้อย่างแม่นยำ',
            'สร้างแนวคิด (Ideation) ที่หลากหลายแบบ No Judgment',
            'จัดทำแผนปฏิบัติการ (Action Plan) ที่เป็นรูปธรรม',
            'ตอบสนองต่อสิ่งเร้าอย่างมีสติและมีเหตุผล'
        ],
        instructor: {
            id: 'den-master-fa',
            name: 'ครูเด่น มาสเตอร์ฟา',
            bio: 'นักออกแบบกระบวนการเรียนรู้ (Dynamic Learning Designer)',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
        }
    },
    {
        id: 'effective-communication',
        title: 'หลักสูตร ศิลปะการสื่อสารเพื่อประสิทธิผลงาน (Effective Communication)',
        category: 'Communication Skills',
        description: 'สื่อสารอย่างมีชั้นเชิง ลดความขัดแย้ง และสร้างความร่วมมือในทีม',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
        longDescription: 'หลักสูตรที่ช่วยให้คุณเข้าใจรูปแบบการสื่อสารของตนเองและผู้อื่น พร้อมเทคนิคการฟังและการพูดที่สร้างสรรค์',
        duration: '1 วัน (09.00 - 16.30 น.)',
        audience: 'พนักงานทุกระดับ',
        why: [
            { label: 'ความร่วมมือ', stat: '85%', desc: 'เพิ่มประสิทธิภาพการทำงานร่วมกัน', icon: React.createElement(Users) },
            { label: 'ลดข้อขัดแย้ง', stat: '60%', desc: 'ลดปัญหาความเข้าใจผิดในการทำงาน', icon: React.createElement(MessageCircle) }
        ],
        how: [
            { title: 'DISC Analysis', desc: 'วิเคราะห์สไตล์การสื่อสารด้วย DISC Model', icon: React.createElement(Brain) },
            { title: 'Active Listening', desc: 'ฝึกทักษะการฟังอย่างตั้งใจ', icon: React.createElement(Target) },
            { title: 'Feedback Techniques', desc: 'เทคนิคการให้และรับข้อมูลป้อนกลับ', icon: React.createElement(MessageCircle) }
        ],
        what: [
            'Communication Styles Assessment',
            '3 levels of Listening',
            'I-Message & Feedback',
            'Non-verbal Communication'
        ],
        objectives: [
            'เข้าใจสไตล์การสื่อสารของตนเองและผู้อื่น',
            'สามารถสื่อสารเพื่อสร้างความร่วมมือได้',
            'ลดความขัดแย้งจากการสื่อสาร',
            'พัฒนาทักษะการฟังและการถาม'
        ],
        instructor: {
            id: 'den-master-fa',
            name: 'ครูเด่น มาสเตอร์ฟา',
            bio: 'ผู้เชี่ยวชาญด้านการสื่อสารและการพัฒนาทีม',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
        }
    },
    {
        id: 'team-synergy',
        title: 'หลักสูตร สร้างทีมแกร่งด้วยพลังบวก (Positive Team Synergy)',
        category: 'Work Skills',
        description: 'เปลี่ยนความแตกต่างให้เป็นพลัง ผสานจุดแข็งเพื่อเป้าหมายเดียวกัน',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
        longDescription: 'กิจกรรม Team Building ที่เน้นกระบวนการกลุ่มสัมพันธ์และการเรียนรู้ผ่านประสบการณ์ (Experiential Learning)',
        duration: '1-2 วัน',
        audience: 'ทีมงานทุกแผนก',
        why: [
            { label: 'ความผูกพัน', stat: '90%', desc: 'สร้างความรู้สึกเป็นเจ้าของร่วมกัน', icon: React.createElement(Heart) },
            { label: 'พลังทีม', stat: 'MAX', desc: 'ดึงศักยภาพสูงสุดของทีมออกมาใช้', icon: React.createElement(Zap) }
        ],
        how: [
            { title: 'Trust Building', desc: 'กิจกรรมสร้างความไว้วางใจ', icon: React.createElement(ShieldCheck) },
            { title: 'Team Canvas', desc: 'ออกแบบข้อตกลงและเป้าหมายร่วมกัน', icon: React.createElement(Layout) },
            { title: 'Synergy Games', desc: 'เกมจำลองสถานการณ์เพื่อการทำงานเป็นทีม', icon: React.createElement(Smile) }
        ],
        what: [
            'The 5 Dysfunctions of a Team',
            'Psychological Safety',
            'Collaborative Mindset',
            'Team Charter Design'
        ],
        objectives: [
            'สร้างความไว้วางใจในทีม',
            'ยอมรับความแตกต่างและทำงานร่วมกันได้',
            'มีเป้าหมายและพันธสัญญาต่อทีมร่วมกัน',
            'สื่อสารกันอย่างเปิดใจ'
        ],
        instructor: {
            id: 'den-master-fa',
            name: 'ครูเด่น มาสเตอร์ฟา',
            bio: 'Certified Team Coach & Facilitator',
            image: '/images/denmasterfa.jpg'
        }
    }
];

export const ONLINE_COURSES = [
    {
        id: 'leadership-mastery',
        title: 'Leadership Mastery: DFA Strategy',
        category: 'Leader Skills',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
        progress: 45,
        duration: '12 ชม.',
        lessons: 24,
        instructor: 'ครูเด่น มาสเตอร์ฟา',
        price: 5900,
        curriculum: [
            { title: 'Introduction to Leadership', duration: '15:00', completed: true },
            { title: 'The DFA Model', duration: '45:00', completed: false, resources: [{ name: 'DFA Guide', url: '#' }], quiz: [{ question: 'What does D stand for?', options: ['Dynamic', 'Digital', 'Design'], answer: 0 }] }
        ]
    }
];
