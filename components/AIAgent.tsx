import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ChevronRight, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../constants/brand';

const AIAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const SYSTEM_PROMPT = `คุณคือ "ครูเด่น มาสเตอร์ฟา" (Krabuan-korn Sorn Sanook) ผู้ช่วยอัจฉริยะและกระบวนกรสอนสนุกจาก CAP Vision Institute

อัตลักษณ์ (Core Identity):
- เป็น "คู่คิดในการเรียนรู้" (Learning Partner) สำหรับทั้งบุคคลทั่วไปและองค์กร
- เป้าหมาย: ช่วยออกแบบหลักสูตรที่สนุก มีพลัง และเปลี่ยนพฤติกรรมได้จริง

กลุ่มเป้าหมายและสไตล์การสื่อสาร:
1. บุคคลทั่วไป: เน้นการเติบโตส่วนบุคคลการทำงานที่สนุก (Personal Growth & Joyful Work)
2. องค์กร/HR: เน้นการพัฒนาทีม ผู้นำ และผลลัพธ์ที่จับต้องได้ (Team Synergy & Practical Results)

ความเชี่ยวชาญพิเศษ (Phase 1 Focus):
- ออกแบบ "โครงสร้างหลักสูตร" (Course Outline) ที่ประกอบด้วย Why (ทำไมต้องเรียน), What (หัวข้อสำคัญ), How (วิธีกระตุกต่อมคิด) และ Agenda เบื้องต้น

แนวทางการตอบ:
- ให้ความเป็นกันเองเหมือน Master Facilitator มาคุยด้วยตัวเอง
- ถามคำถามชวนคิด (Powerful Questions) เพื่อหา Unmet Needs ก่อนเริ่มออกแบบ
- พูดจาสุภาพ ให้พลัง และมีความเป็นมืออาชีพ

ช่องทางติดต่อ:
- Line OA: @denmasterfa [https://lin.ee/zRTBF6K]
- โทร: 093-223-5919`;

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    role: 'assistant',
                    content: 'สวัสดีครับ ผม "ครูเด่น มาสเตอร์ฟา" กระบวนกรสอนสนุกครับ! ยินดีที่ได้เป็นคู่คิดในการเรียนรู้ให้กับคุณนะครับ ไม่ว่าจะเป็นการพัฒนาตัวเอง หรือโจทย์ท้าทายในองค์กร ลองเล่าให้ผมฟังได้ไหมครับว่าตอนนี้คุณกำลังมองหาทางแก้เรื่องไหนอยู่?'
                }
            ]);
        }
        scrollToBottom();
    }, [isOpen, messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Mock AI response logic based on refined persona & Phased Skill focus
        setTimeout(() => {
            let response = 'คำถามนี้ยอดเยี่ยมมากครับ ในฐานะคู่คิด ผมอยากให้เราได้เห็นภาพเป้าหมายที่ตรงกันก่อน คุณเห็นภาพความสำเร็จหลังจบการเรียนรู้นี้เป็นอย่างไรครับ?';

            const lowerInput = input.toLowerCase();
            if (lowerInput.includes('หลักสูตร') || lowerInput.includes('ออกแบบ') || lowerInput.includes('เวิร์กช็อป') || lowerInput.includes('ตัวอย่าง') || lowerInput.includes('วิทยากร')) {
                response = 'ยินดีเลยครับ! ผมจะช่วยคุณออกแบบ "โครงสร้างหลักสูตร" (Course Outline) ที่เน้นทั้งความสนุกและผลลัพธ์ เพื่อให้คุณเห็นภาพ FLOW ของกิจกรรมทั้งหมดก่อน ไม่ว่าจะเป็นการนำไปเสนอฝ่าย HR หรือเตรียมบรรยายส่วนตัว เพื่อให้ข้อมูลแม่นยำที่สุด คุณอยากเน้นการพัฒนาทักษะ (Skill) หรือการเปลี่ยนทัศนคติ (Mindset) มากกว่ากันครับ?';
            } else if (lowerInput.includes('บทความ') || lowerInput.includes('เขียน')) {
                response = 'การถ่ายทอดเรื่องราวคือหัวใจของการแบ่งปันครับ! ผมจะช่วยคุณร่างโครงสร้างบทความที่กระตุกต่อมคิดและอ่านง่าย คุณอยากให้ผู้อ่านรู้สึกอย่างไรหลังจากอ่านบทความนี้จบครับ?';
            } else if (lowerInput.includes('ราคา') || lowerInput.includes('เสนอราคา') || lowerInput.includes('จ้าง')) {
                response = 'สำหรับการเชิญวิทยากรหรือขอใบเสนอราคาแบบ Custom Design ผมแนะนำให้ส่งรายละเอียดเบื้องต้นมาที่ Line @denmasterfa [https://lin.ee/zRTBF6K] ครับ ทีมงานของผมพร้อมดูแลเปลี่ยนโจทย์ของคุณให้เป็นโซลูชันทันที!';
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        }, 1000);
    };

    const suggestions = [
        'ขอดูหลักสูตร In-house',
        'ช่วยวิเคราะห์ Pain Point องค์กร',
        'ปรึกษาเรื่อง Leadership Roadmap'
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[90vw] md:w-[400px] h-[500px] md:h-[600px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-[#0f3460] p-6 text-white flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <MessageCircle className="w-20 h-20" />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-full border-2 border-[#c5a059] overflow-hidden bg-white">
                                <img src="/images/denmasterfa.jpg" alt="Kru Den" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg nav-font">ครูเด่น (AI)</h3>
                                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Master Facilitator</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm md:text-base leading-relaxed ${m.role === 'user'
                                    ? 'bg-[#c5a059] text-white rounded-tr-none'
                                    : 'bg-white text-[#0f3460] shadow-sm border border-gray-100 rounded-tl-none font-medium'
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Suggestions */}
                    {messages.length === 1 && (
                        <div className="px-6 pb-2 flex flex-wrap gap-2 animate-in fade-in duration-500 delay-300">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setInput(s); handleSend(); }}
                                    className="bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-[#0f3460] hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Line OA Action */}
                    <div className="px-6 py-4 bg-white border-t border-gray-100">
                        <a
                            href={CONTACT_INFO.lineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#00b900] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg nav-font text-sm"
                        >
                            <MessageCircle className="w-5 h-5" /> คุยกับเจ้าหน้าที่ (Line OA)
                            <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                        </a>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="พิมพ์ข้อความที่นี่..."
                            className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#c5a059] transition-all"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-[#0f3460] text-white p-3 rounded-xl hover:bg-[#c5a059] transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center gap-4 p-4 md:p-6 rounded-full shadow-2xl transition-all duration-500 ${isOpen ? 'bg-[#0f3460] rotate-90' : 'bg-[#c5a059] hover:scale-110 active:scale-95'
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
                ) : (
                    <>
                        <div className="absolute right-full mr-4 bg-white px-6 py-3 rounded-2xl shadow-xl text-[#0f3460] font-black nav-font text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
                            ปรึกษาครูเด่น (AI) ✨
                        </div>
                        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </>
                )}
            </button>
        </div>
    );
};

export default AIAgent;
