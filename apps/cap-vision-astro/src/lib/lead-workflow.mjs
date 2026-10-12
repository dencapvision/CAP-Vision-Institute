import { contactSource } from './contact-context.mjs';
export const PIPELINE = {
  new: 'ผู้สนใจใหม่', contacted: 'ติดต่อแล้ว', tna: 'วิเคราะห์ความต้องการ',
  proposal: 'ส่งข้อเสนอ', won: 'ตกลงใช้บริการ', lost: 'ไม่ดำเนินการ',
  delivery: 'ส่งมอบบริการ', follow_up: 'ติดตามผล', repeat: 'ใช้บริการซ้ำ'
};
export function pipelineStage(lead) {
  // Preserve ambiguous historical closed/qualified values until a staff member classifies them.
  return lead.pipeline_stage || ({new: 'new', contacted: 'contacted', lost: 'lost'}[lead.status]) || '';
}
export function validateContact(data) {
  const required = ['fullName', 'organization', 'phone', 'email', 'service', 'requirements'];
  const limits = {fullName: 200, organization: 300, phone: 40, email: 254, lineId: 100, service: 50, requirements: 4000};
  const cleaned = Object.fromEntries(Object.keys(limits).map(key => [key, String(data[key] || '').trim()]));
  if (required.some(key => !cleaned[key]) || Object.entries(limits).some(([key, max]) => cleaned[key].length > max)) {
    throw new Error('กรุณากรอกข้อมูลให้ครบและไม่เกินความยาวที่กำหนด');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email) || !/^[+\d\s().-]{6,40}$/.test(cleaned.phone)) {
    throw new Error('กรุณาตรวจสอบอีเมลและเบอร์โทรศัพท์');
  }
  return cleaned;
}
export async function captureContact({client, data, onSaved = () => {}}) {
  const d = validateContact(data);
  const {error} = await client.from('leads').insert([{
    name: d.fullName, company: d.organization, phone: d.phone, email: d.email,
    line_id: d.lineId, interest_topic: `Service: ${d.service} | ${d.requirements}${contactSource(data) !== 'contact_form' ? ` | Origin: ${contactSource(data)}` : ''}`,
    source: 'contact_form', status: 'new'
  }]);
  if (error) throw new Error('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง');
  // A saved lead is a successful conversion, regardless of notification availability.
  try { onSaved(); } catch { /* analytics must never break capture */ }
  try {
    const {error: notifyError} = await client.functions.invoke('line-notify', {body: {
      project: 'CONTACT', formType: 'ฟอร์มติดต่อสอบถาม / ขอใบเสนอราคา',
      data: {'ชื่อ-นามสกุล': d.fullName, 'หน่วยงาน/องค์กร': d.organization, 'เบอร์ติดต่อ': d.phone,
        'อีเมล': d.email, 'Line ID': d.lineId, 'บริการที่สนใจ': d.service, 'ความต้องการเพิ่มเติม': d.requirements}
    }});
    return {saved: true, notified: !notifyError};
  } catch { return {saved: true, notified: false}; }
}
