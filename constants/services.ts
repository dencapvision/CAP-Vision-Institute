
import React from 'react';
import { GraduationCap, Users, Target, TrendingUp, Zap, Heart, MessageCircle, Brain, Layers, Sparkles, PenTool, Cpu, Rocket, BarChart3, Search, MapPin, User, Shield, Award, Laptop, Facebook, Layout } from 'lucide-react';

export const SERVICES = [
    {
        id: 'in-house-training',
        title: 'In-house Training',
        description: 'ออกแบบหลักสูตรพัฒนาบุคลากรที่ตอบโจทย์เฉพาะองค์กรของคุณ',
        icon: React.createElement(GraduationCap, { className: "w-8 h-8" }),
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80'
    },
    {
        id: 'executive-coaching',
        title: 'Executive Coaching',
        description: 'การโค้ชผู้บริหารเพื่อดึงศักยภาพและสร้างภาวะผู้นำที่เหนือระดับ',
        icon: React.createElement(Users, { className: "w-8 h-8" }),
        image: 'https://images.unsplash.com/photo-1517048676732-d676936d9b2c?auto=format&fit=crop&q=80'
    },
    {
        id: 'od-consulting',
        title: 'OD Consulting',
        description: 'ที่ปรึกษาการพัฒนาองค์กรและวัฒนธรรมแห่งการเรียนรู้',
        icon: React.createElement(Target, { className: "w-8 h-8" }),
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'
    }
];

export const TRAINING_INFO = {
    title: 'Corporate Training Solutions',
    slogan: 'ยกระดับองค์กรด้วยการพัฒนาคนอย่างมีระบบ',
    why: [
        { label: 'Growth Mindset', stat: '85%', desc: 'พนักงานมีทัศนคติที่พร้อมเติบโตและรับความท้าทายใหม่', icon: React.createElement(TrendingUp) },
        { label: 'Team Synergy', stat: '92%', desc: 'ความร่วมมือในทีมเพิ่มขึ้นอย่างเห็นได้ชัด', icon: React.createElement(Users) },
        { label: 'Productivity', stat: '40%', desc: 'ประสิทธิภาพการทำงานสูงขึ้นผ่านกระบวนการที่ถูกต้อง', icon: React.createElement(Zap) }
    ]
};

export const TRANSFORMATIVE_LEARNING_INFO = {
    title: 'Transformative Learning',
    slogan: 'การเรียนรู้ที่สร้างการเปลี่ยนแปลงจากภายในสู่ภายนอก',
    why: [
        { label: 'Awareness', stat: '100%', desc: 'สร้างความตระหนักรู้ในตนเอง', icon: React.createElement(Heart) },
        { label: 'Insight', stat: '90%', desc: 'เกิดการเรียนรู้จากความเข้าใจที่แท้จริง', icon: React.createElement(Zap) },
        { label: 'Action', stat: '95%', desc: 'นำไปสู่การปฏิบัติที่เห็นผลจริง', icon: React.createElement(Target) }
    ],
    how: [
        { title: 'Activity Based', desc: 'เรียนรู้ผ่านกิจกรรมและการลงมือทำ', icon: React.createElement(Layout) },
        { title: 'Facilitation', desc: 'กระบวนการอำนวยความสะดวกในการเรียนรู้', icon: React.createElement(MessageCircle) },
        { title: 'Reflection', desc: 'การสะท้อนคิดเพื่อถอดบทเรียน', icon: React.createElement(Brain) },
        { title: 'Coaching', desc: 'การโค้ชเพื่อดึงศักยภาพเฉพาะตัว', icon: React.createElement(Users) }
    ],
    what: [
        'Inside-Out Transformation Program',
        'Self-Awareness & EQ Workshop',
        'Communication Healer Series',
        'Mindfulness in Business'
    ]
};

export const FACILITATION_TRAINING_INFO = {
    title: 'Facilitation Skills Training',
    slogan: 'ศิลปะการอำนวยความสะดวกเพื่อการเรียนรู้ที่มีประสิทธิภาพ',
    why: [
        { label: 'Engagement', stat: '98%', desc: 'ผู้เรียนมีส่วนร่วมในกระบวนการอย่างเต็มที่', icon: React.createElement(Users) },
        { label: 'Flow State', stat: '88%', desc: 'บรรยากาศการเรียนรู้ที่ลื่นไหลและสนุกสนาน', icon: React.createElement(Sparkles) },
        { label: 'Transfer', stat: '90%', desc: 'การถ่ายทอดความรู้ที่นำไปใช้ได้จริง', icon: React.createElement(Zap) }
    ],
    how: [
        { title: 'DFA Model', desc: 'Dynamic, Flow, Art of Growth strategy', icon: React.createElement(Layers) },
        { title: 'Tools & Cards', desc: 'ใช้เครื่องมือประกอบการทำกิจกรรม', icon: React.createElement(Layout) },
        { title: 'Practice', desc: 'ฝึกปฏิบัติจริงในทุกหัวข้อ', icon: React.createElement(PenTool) },
        { title: 'Feedback', desc: 'การให้คำแนะนำเพื่อการพัฒนา', icon: React.createElement(MessageCircle) }
    ],
    what: [
        'Professional Facilitator Certification',
        'Dynamic Learning Design Workshop',
        'Visual Facilitation Techniques',
        'Game-based Learning Design'
    ]
};

export const TEAM_LEADERSHIP_INFO = {
    title: 'Team & Leadership Development',
    slogan: 'สร้างผู้นำและทีมงานที่เปี่ยมด้วยพลังแห่งความร่วมมือ',
    why: [
        { label: 'Trust', stat: '100%', desc: 'สร้างความไว้วางใจภายในทีม', icon: React.createElement(Heart) },
        { label: 'Vision', stat: '95%', desc: 'เป้าหมายที่ชัดเจนและเป็นหนึ่งเดียว', icon: React.createElement(Target) },
        { label: 'Impact', stat: '3X', desc: 'สร้างผลลัพธ์ที่มากกว่าการทำงานคนเดียว', icon: React.createElement(Rocket) }
    ],
    how: [
        { title: 'Leadership DNA', desc: 'ค้นหาและพัฒนาจุดแข็งของผู้นำ', icon: React.createElement(Cpu) },
        { title: 'Team Building', desc: 'กิจกรรมสร้างทีมสัมพันธ์ที่เห็นผลจริง', icon: React.createElement(Users) },
        { title: 'Communication', desc: 'ทักษะการสื่อสารเพื่อการทำงานร่วมกัน', icon: React.createElement(MessageCircle) },
        { title: 'Strategy', desc: 'การวางแผนและการตัดสินใจเชิงกลยุทธ์', icon: React.createElement(BarChart3) }
    ],
    what: [
        'The Modern Leader Program',
        'High Performance Team Workshop',
        'Strategic Leadership Retreat',
        'Team Synergy & Collaboration'
    ]
};

export const OD_CONSULTING_INFO = {
    title: 'OD Consulting & Strategy',
    slogan: 'วางกลยุทธ์การพัฒนาองค์กรสู่ความยั่งยืน',
    why: [
        { label: 'Culture', stat: '100%', desc: 'สร้างวัฒนธรรมองค์กรที่แข็งแกร่ง', icon: React.createElement(Shield) },
        { label: 'Efficiency', stat: '50%', desc: 'เพิ่มประสิทธิภาพกระบวนการทำงาน', icon: React.createElement(Zap) },
        { label: 'Succession', stat: '90%', desc: 'การวางแผนสืบทอดตำแหน่งและคนเก่ง', icon: React.createElement(Award) }
    ],
    how: [
        { title: 'TNA Analysis', desc: 'วิเคราะห์ความต้องการพัฒนาที่แท้จริง', icon: React.createElement(Search) },
        { title: 'Roadmap Design', desc: 'ออกแบบแผนพัฒนาบุคลากรระยะยาว', icon: React.createElement(MapPin) },
        { title: 'Evaluation', desc: 'การประเมินผลและการติดตามผล', icon: React.createElement(BarChart3) },
        { title: 'Consulting', desc: 'การให้คำปรึกษาเชิงลึกโดยผู้เชี่ยวชาญ', icon: React.createElement(User) }
    ],
    what: [
        'Corporate Culture Design',
        'Strategic HRD Consulting',
        'Succession Planning & Talent Management',
        'Change Management Strategy'
    ]
};

export const SERVICES_LIST = [
    { id: 'in-house-training', title: 'In-house Training', description: 'ออกแบบหลักสูตรพัฒนาบุคลากรที่ตอบโจทย์เฉพาะองค์กร', icon: React.createElement(GraduationCap, { className: "w-8 h-8" }), image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80' },
    { id: 'executive-coaching', title: 'Executive Coaching', description: 'การโค้ชผู้บริหารเพื่อดึงศักยภาพและสร้างภาวะผู้นำ', icon: React.createElement(Users, { className: "w-8 h-8" }), image: 'https://images.unsplash.com/photo-1517048676732-d676936d9b2c?auto=format&fit=crop&q=80' },
    { id: 'od-consulting', title: 'OD Consulting', description: 'ที่ปรึกษาการพัฒนาองค์กรและวัฒนธรรมแห่งการเรียนรู้', icon: React.createElement(Target, { className: "w-8 h-8" }), image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80' },
    { id: 'digital-learning', title: 'Digital Learning', description: 'แพลตฟอร์มการเรียนรู้ออนไลน์สำหรับองค์กรยุคใหม่', icon: React.createElement(Laptop, { className: "w-8 h-8" }), image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80' }
];
