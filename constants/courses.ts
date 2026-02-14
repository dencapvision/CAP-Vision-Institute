
import React from 'react';
import { Smile, ShieldCheck, Layout, Search, Zap, Brain, Layers } from 'lucide-react';

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
