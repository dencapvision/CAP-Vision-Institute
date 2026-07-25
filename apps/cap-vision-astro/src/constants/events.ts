
import React from 'react';
import { Users, RefreshCcw, Zap, Facebook, MessageCircle } from 'lucide-react';

export const EVENT_INFO = {
    title: 'Events & Communities',
    slogan: 'พื้นที่แห่งการเรียนรู้และแบ่งปันประสบการณ์',
    why: [
        { label: 'Connection', stat: '1000+', desc: 'เครือข่ายนักพัฒนาทรัพยากรมนุษย์และวิทยากร', icon: React.createElement(Users) },
        { label: 'Update', stat: 'Weekly', desc: 'อัปเดตเทรนด์การเรียนรู้ใหม่ๆ เสมอ', icon: React.createElement(RefreshCcw) },
        { label: 'Impact', stat: 'High', desc: 'สร้างแรงบันดาลใจเพื่อการเปลี่ยนแปลง', icon: React.createElement(Zap) }
    ],
    schedule: [
        { id: 1, date: '25 มี.ค. 2567', title: 'The Modern Facilitator Workshop', speaker: 'ครูเด่น มาสเตอร์ฟา', location: 'Bangkok / Online', link: '#' },
        { id: 2, date: '10 เม.ย. 2567', title: 'Leadership DNA for HR Leaders', speaker: 'ทีมวิทยากร CAP Vision', location: 'Hotel in Bangkok', link: '#' }
    ],
    communities: [
        { platform: 'Facebook Group', name: 'Facilitator for Thailand', link: 'https://facebook.com/groups/denmasterfa', icon: React.createElement(Facebook) },
        { platform: 'LINE OpenChat', name: 'Learning Designer Community', link: 'https://line.me/ti/g2/denmasterfa', icon: React.createElement(MessageCircle) }
    ]
};
