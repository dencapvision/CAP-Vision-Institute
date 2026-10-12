export const DEFAULT_MODEL = 'gemini-3-flash-preview';
export const PORTFOLIO = [
  {name:'Service Mind Excellence',keywords:/บริการ|ลูกค้า|customer|service|front.line/i,duration:'1 วัน',question:'ทีมบริการอยากพัฒนาเรื่องใจบริการ การรับมือลูกค้า หรือบุคลิกภาพมากที่สุดครับ?'},
  {name:'Feedback & Coaching',keywords:/feedback|coaching|โค้ช|ฟีดแบ็ก/i,duration:'1 วัน',question:'หัวหน้างานอยากพัฒนาเรื่องการให้ Feedback หรือการโค้ชทีมมากกว่ากันครับ?'},
  {name:'Effective Communication (DISC)',keywords:/สื่อสาร|ขัดแย้ง|communication|disc/i,duration:'1 วัน',question:'การสื่อสารติดขัดภายในทีม หรือระหว่างแผนกมากกว่ากันครับ?'},
  {name:'Creative Problem Solving',keywords:/ปัญหา|นวัตกรรม|creative|innovation/i,duration:'1 วัน',question:'อยากให้ทีมแก้โจทย์งานเดิมให้ดีขึ้น หรือสร้างแนวทางใหม่ครับ?'},
  {name:'Leadership Mastery: DFA',keywords:/ผู้นำ|หัวหน้า|leadership|management|ผู้บริหาร/i,duration:'1–2 วัน',question:'กลุ่มผู้เรียนเป็นหัวหน้างานใหม่ หรือผู้บริหารที่มีประสบการณ์ครับ?'},
  {name:'Growth Mastery Workshop',keywords:/mindset|เปลี่ยนแปลง|growth|เติบโต/i,duration:'1 วัน',question:'อยากเห็นพฤติกรรมอะไรเปลี่ยนแปลงหลังการเรียนรู้ครับ?'},
  {name:'Positive Team Synergy',keywords:/ทีม|team|สามัคคี|engagement/i,duration:'1–2 วัน',question:'ความร่วมมือที่อยากพัฒนาคือภายในทีม หรือข้ามแผนกครับ?'},
  {name:'Smart Personality',keywords:/บุคลิก|personality/i,duration:'1 วัน',question:'ต้องการเสริมความมั่นใจ หรือบุคลิกภาพในการพบลูกค้าครับ?'}
];
export const SYSTEM_PROMPT = `คุณคือ ครูเด่น (AI) — CourseAdvisor-DenMasterFa ของ CAP Vision Institute ผู้ช่วยแนะนำหลักสูตร ไม่ใช่ครูเด่นตัวจริง
ครูเด่น: อนุสรณ์ หนองนา ผู้อำนวยการ CAP Vision Institute ผู้ก่อตั้ง Facilitator for Thailand ประสบการณ์ 18+ ปี 1,000+ เวที ลูกค้าองค์กร 200+ แห่ง เช่น Toyota, Dell Technologies, Land & Houses, PEA, AOT, Betagro
วิธีเรียนรู้ Transformative Learning, Play to Learn, Circle Dialogue, Activity-based, Human Communication, Flow Learning
ตอบภาษาไทยสุภาพ ลงท้ายครับ เป็นคู่คิดและให้พลังบวกอย่างพอดี ใช้ Emoji เมื่อช่วยสื่อความหมาย
สรุป 2–4 bullet สั้นๆ เว้นแต่ผู้ใช้ขอรายละเอียด ถ้าโจทย์ยังไม่พอถามเพียงหนึ่ง Powerful Question หากข้อมูลพอแล้วแนะนำทันที ไม่วนถามสิ่งที่ตอบแล้ว ไม่ใช้ประโยคหรือเทมเพลตเดิมซ้ำ อ่านข้อมูลใหม่และต่อยอด
แนะนำเฉพาะหลักสูตรจาก portfolio ด้านล่าง ทุกหลักสูตรออกแบบ In-house ได้ ห้ามแต่งราคา ส่วนลด กำหนดรับงาน หรือรับประกัน 24 ชม. ให้ทีมยืนยันเงื่อนไขจริง
ผู้ใช้พูดถึงราคา ใบเสนอราคา รายละเอียดเพิ่มเติม หรือคุยครูเด่นตรง ส่งต่อ LINE OA @denmasterfa https://lin.ee/zRTBF6K โทร 093-223-5919 อีเมล thecapvision@gmail.com
จบด้วยสองทางเลือก ดูหลักสูตร /courses หรือออกแบบเฉพาะองค์กร /contact ให้ปุ่มหน้าเว็บเป็นทางเลือก ไม่ย้ำข้อความปิดซ้ำในทุกคำตอบ
ห้ามขอข้อมูลอ่อนไหวในแชต ให้ใช้ฟอร์มติดต่อสำหรับข้อมูลประสานงาน
ตอบเป็น JSON เท่านั้น {"reply":"ข้อความ bullet","suggested_program":"ชื่อหลักสูตรหรือ null"} ไม่ส่ง HTML หรือกระบวนการคิด
Portfolio: ${JSON.stringify(PORTFOLIO.map(({name,duration})=>({name,duration})))}`;
export function validateInput(body) {
  if (!body || typeof body.message !== 'string' || !body.message.trim() || body.message.length > 1500) throw Error('invalid message');
  if (body.history !== undefined && !Array.isArray(body.history)) throw Error('invalid history');
  const history=(body.history||[]).slice(-12);
  if(history.some(h=>!h||!['user','assistant'].includes(h.role)||typeof h.content!=='string'||h.content.length>4000)) throw Error('invalid history');
  return {message:body.message.trim(),history};
}
export function basicAdvice({message,history}) {
  const topic=PORTFOLIO.find(p=>p.keywords.test(message)) || PORTFOLIO.find(p=>p.keywords.test(history.filter(h=>h.role==='user').map(h=>h.content).reverse().join(' ')));
  if(/ราคา|quotation|ใบเสนอราคา|คุย.*(ครูเด่น|โดยตรง)|รายละเอียดเพิ่มเติม/i.test(message)) return {reply:`• ให้ทีมช่วยยืนยันราคาและรายละเอียดตามโจทย์ของคุณครับ
• ติดต่อครูเด่นผ่าน LINE OA @denmasterfa หรือโทร 093-223-5919 ได้เลยครับ`,suggested_program:topic?.name||null,mode:'handoff'};
  if(!topic) return {reply:`• ช่วยค้นหาหลักสูตรหรือออกแบบ In-house ให้ตรงโจทย์ได้ครับ
• อยากพัฒนาใคร และอยากเห็นอะไรเปลี่ยนในการทำงานมากที่สุดครับ?`,suggested_program:null,mode:'basic'};
  const previouslyDiscussed=history.some(h=>h.role==='assistant'&&h.content.includes(topic.name));
  return {reply:previouslyDiscussed
    ? `• รับโจทย์เพิ่มเติมว่า “${message.slice(0,120)}” ครับ
• นำบริบทนี้ไปออกแบบกิจกรรมและผลลัพธ์ของ ${topic.name} ให้เฉพาะทีมได้ครับ
• ส่งรายละเอียดผ่านปุ่มออกแบบเฉพาะองค์กร เพื่อให้ทีมร่วมวางแนวทางต่อครับ`
    : `• แนวทางเบื้องต้น: ${topic.name} (${topic.duration}) จัดแบบ In-house ได้ครับ
• ${topic.question}`,suggested_program:topic.name,mode:'basic'};
}
export async function advise(input,{apiKey,model=DEFAULT_MODEL,fetcher=fetch}={}) {
  const basic=basicAdvice(input);
  if(basic.mode==='handoff'||!apiKey) return basic;
  try {
    const response=await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{
      method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},signal:AbortSignal.timeout(20000),
      body:JSON.stringify({systemInstruction:{parts:[{text:SYSTEM_PROMPT}]},contents:[...input.history,{role:'user',content:input.message}].map(h=>({role:h.role==='assistant'?'model':'user',parts:[{text:h.content}]})),generationConfig:{temperature:0.7,maxOutputTokens:1800,responseMimeType:'application/json',thinkingConfig:{thinkingLevel:'minimal'}}})
    });
    if(!response.ok)throw Error('provider unavailable');
    const data=await response.json();
    const result=JSON.parse(data.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('')||'{}');
    if(typeof result.reply!=='string'||!result.reply.trim()||result.reply.length>4000)throw Error('invalid response');
    const program=PORTFOLIO.find(p=>p.name===result.suggested_program)?.name||null;
    return {reply:result.reply,suggested_program:program,mode:'gemini',model};
  }catch { return {...basic,mode:'basic'}; }
}
