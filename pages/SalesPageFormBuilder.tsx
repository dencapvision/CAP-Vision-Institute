import { useState } from "react";

const STEPS = [
  { id: 1, label: "ตัวตน & แบรนด์", icon: "👤" },
  { id: 2, label: "สินค้า / บริการ", icon: "💼" },
  { id: 3, label: "กลุ่มเป้าหมาย", icon: "🎯" },
  { id: 4, label: "ปัญหา & ผลลัพธ์", icon: "✨" },
  { id: 5, label: "หลักฐาน & ความน่าเชื่อถือ", icon: "🏆" },
  { id: 6, label: "Offer & ราคา", icon: "💰" },
  { id: 7, label: "Visual & สไตล์", icon: "🎨" },
  { id: 8, label: "CTA & ติดต่อ", icon: "📞" },
];

const initialData = {
  // Step 1
  ownerName: "",
  brandName: "",
  tagline: "",
  ownerRole: "",
  experience: "",
  ownerStory: "",
  socialProfiles: "",
  // Step 2
  productName: "",
  productType: "",
  productDescription: "",
  format: [] as string[],
  duration: "",
  location: "",
  capacity: "",
  // Step 3
  targetGroup: "",
  targetAge: "",
  targetPain: "",
  targetDream: "",
  targetOccupation: "",
  // Step 4
  problemBefore: "",
  transformation: "",
  outcomes: "",
  uniqueMethod: "",
  whyYou: "",
  // Step 5
  testimonials: "",
  clientLogos: "",
  mediaFeatures: "",
  certifications: "",
  caseStudy: "",
  // Step 6
  priceMain: "",
  priceNote: "",
  bonuses: "",
  guarantee: "",
  urgency: "",
  paymentOptions: "",
  // Step 7
  colorPreference: "",
  toneStyle: "",
  fontFeel: "",
  referenceLinks: "",
  logoAvailable: "",
  photoAvailable: "",
  // Step 8
  ctaText: "",
  lineId: "",
  phone: "",
  email: "",
  formLink: "",
  deadline: "",
};

type FormData = typeof initialData;

const colors = {
  navy: "#0D1B3E",
  teal: "#1A7A6E",
  gold: "#C9A84C",
  tealLight: "#22A699",
  navyLight: "#1a2f5a",
  cream: "#FDFAF4",
  goldLight: "#E8C96A",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1.5px solid #dde3ef",
  fontSize: "15px",
  fontFamily: "'Sarabun', sans-serif",
  color: colors.navy,
  background: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "100px",
  resize: "vertical",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: "700",
  fontSize: "14px",
  color: colors.navy,
  marginBottom: "6px",
  fontFamily: "'Prompt', sans-serif",
};

const hintStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#8a97b5",
  marginTop: "4px",
  fontFamily: "'Sarabun', sans-serif",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {hint && <p style={hintStyle}>💡 {hint}</p>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        ...inputStyle,
        borderColor: focused ? colors.teal : "#dde3ef",
        boxShadow: focused ? `0 0 0 3px ${colors.teal}22` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        ...textareaStyle,
        borderColor: focused ? colors.teal : "#dde3ef",
        boxShadow: focused ? `0 0 0 3px ${colors.teal}22` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function CheckGroup({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => {
    if (selected.includes(v)) onChange(selected.filter((x) => x !== v));
    else onChange([...selected, v]);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            style={{
              padding: "8px 16px",
              borderRadius: "30px",
              border: `1.5px solid ${active ? colors.teal : "#ccd3e0"}`,
              background: active ? colors.teal : "#fff",
              color: active ? "#fff" : colors.navy,
              fontFamily: "'Sarabun', sans-serif",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: active ? "700" : "400",
              transition: "all 0.2s",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{
        fontSize: "20px",
        fontWeight: "800",
        color: colors.navy,
        fontFamily: "'Prompt', sans-serif",
        margin: "0 0 4px",
      }}>{children}</h2>
      <div style={{ width: "48px", height: "3px", borderRadius: "4px", background: `linear-gradient(90deg, ${colors.teal}, ${colors.gold})` }} />
    </div>
  );
}

// ============ STEP COMPONENTS ============

function Step1({ data, set }: { data: FormData; set: (k: string, v: string) => void }) {
  return (
    <>
      <SectionTitle>👤 ข้อมูลตัวตนและแบรนด์</SectionTitle>
      <Field label="ชื่อ-นามสกุล / ชื่อที่ใช้เรียก *" hint="ชื่อที่ลูกค้าจะเห็นบน Sale Page">
        <Input value={data.ownerName} onChange={(v) => set("ownerName", v)} placeholder="เช่น ครูเด่น มาสเตอร์ฟา / อาจารย์อนุสรณ์ หนองนา" />
      </Field>
      <Field label="ชื่อแบรนด์ / สถาบัน / บริษัท *">
        <Input value={data.brandName} onChange={(v) => set("brandName", v)} placeholder="เช่น CAP Vision Institute" />
      </Field>
      <Field label="Tagline หรือสโลแกนของแบรนด์" hint="ประโยคที่สะท้อนตัวตนแบรนด์ใน 1 บรรทัด">
        <Input value={data.tagline} onChange={(v) => set("tagline", v)} placeholder="เช่น Transform People, Transform Organization" />
      </Field>
      <Field label="ตำแหน่ง / บทบาทของคุณ *">
        <Input value={data.ownerRole} onChange={(v) => set("ownerRole", v)} placeholder="เช่น Master Facilitator, ที่ปรึกษาทางการเงิน, นักโภชนาการ" />
      </Field>
      <Field label="ประสบการณ์ / ความเชี่ยวชาญ" hint="กี่ปี / กี่เวที / กี่องค์กร / วุฒิการศึกษา / ประกาศนียบัตร">
        <Textarea value={data.experience} onChange={(v) => set("experience", v)} placeholder="เช่น ประสบการณ์ 18+ ปี, 1,000+ เวที, 100+ องค์กร, วท.บ. ฟิสิกส์ มศว" />
      </Field>
      <Field label="เรื่องราวของคุณ (Origin Story)" hint="เส้นทางชีวิต จุดเปลี่ยน หรือเหตุผลที่ทำงานนี้ — ช่วยสร้างความเชื่อมั่น">
        <Textarea value={data.ownerStory} onChange={(v) => set("ownerStory", v)} placeholder="เล่าสั้นๆ ว่าทำไมถึงทำงานนี้ มีจุดเปลี่ยนอะไร..." rows={5} />
      </Field>
      <Field label="Social Media / ช่องทางออนไลน์">
        <Textarea value={data.socialProfiles} onChange={(v) => set("socialProfiles", v)} placeholder={"LINE ID: @denmasterfa\nTikTok: @denmasterfa\nFacebook: @cheumkon\nWebsite: capvisionpartner.com"} rows={4} />
      </Field>
    </>
  );
}

function Step2({ data, set }: { data: FormData; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      <SectionTitle>💼 ข้อมูลสินค้า / บริการ</SectionTitle>
      <Field label="ชื่อสินค้า / บริการ / คอร์ส *">
        <Input value={data.productName} onChange={(v) => set("productName", v)} placeholder="เช่น Team Talk Flow Workshop, คอร์สพูดอย่างไรให้ได้ใจ" />
      </Field>
      <Field label="ประเภทสินค้า / บริการ *">
        <Input value={data.productType} onChange={(v) => set("productType", v)} placeholder="เช่น Workshop, Online Course, Coaching 1:1, บริการรับเหมา, สินค้า" />
      </Field>
      <Field label="คำอธิบายสินค้า / บริการโดยย่อ *" hint="อธิบายให้คนที่ไม่รู้จักเข้าใจได้ใน 2-3 ประโยค">
        <Textarea value={data.productDescription} onChange={(v) => set("productDescription", v)} placeholder="บอกว่าคืออะไร ทำอะไร และได้อะไรจากมัน..." />
      </Field>
      <Field label="รูปแบบการให้บริการ">
        <CheckGroup
          options={["Onsite", "Online (Live)", "Online (Self-Paced)", "Hybrid", "1-on-1", "Group", "In-house", "Public"]}
          selected={data.format}
          onChange={(v) => set("format", v)}
        />
      </Field>
      <Field label="ระยะเวลา" hint="เช่น 1 วัน / 6 ชั่วโมง / 8 สัปดาห์">
        <Input value={data.duration} onChange={(v) => set("duration", v)} placeholder="เช่น 2 วัน (16 ชั่วโมง), 3 เดือน" />
      </Field>
      <Field label="สถานที่ / Platform">
        <Input value={data.location} onChange={(v) => set("location", v)} placeholder="เช่น โรงแรม / Zoom / Google Meet / บริษัทลูกค้า" />
      </Field>
      <Field label="จำนวนผู้เข้าร่วม (สูงสุด)">
        <Input value={data.capacity} onChange={(v) => set("capacity", v)} placeholder="เช่น 20-30 คน / ไม่จำกัด" />
      </Field>
    </>
  );
}

function Step3({ data, set }: { data: FormData; set: (k: string, v: string) => void }) {
  return (
    <>
      <SectionTitle>🎯 กลุ่มเป้าหมาย</SectionTitle>
      <Field label="กลุ่มเป้าหมายหลัก *" hint="ระบุให้ชัดเจนที่สุด ยิ่งเจาะจงยิ่งดี">
        <Textarea value={data.targetGroup} onChange={(v) => set("targetGroup", v)} placeholder="เช่น HR Manager และ Training Manager ในองค์กรขนาดกลาง-ใหญ่ ที่ต้องการพัฒนาทักษะทีม" />
      </Field>
      <Field label="อาชีพ / ตำแหน่ง / อุตสาหกรรม">
        <Input value={data.targetOccupation} onChange={(v) => set("targetOccupation", v)} placeholder="เช่น ผู้จัดการ, เจ้าของธุรกิจ, แม่บ้าน, นักศึกษาจบใหม่" />
      </Field>
      <Field label="ช่วงอายุโดยประมาณ">
        <Input value={data.targetAge} onChange={(v) => set("targetAge", v)} placeholder="เช่น 28-45 ปี" />
      </Field>
      <Field label="Pain Point — ปัญหา / ความเจ็บปวดที่กลุ่มเป้าหมายเผชิญ *" hint="เขียนให้เหมือนพูดแทนเขา ให้เขาอ่านแล้วรู้สึกว่า 'นี่แหละคือฉัน'">
        <Textarea value={data.targetPain} onChange={(v) => set("targetPain", v)} placeholder="เช่น ทีมสื่อสารกันไม่รู้เรื่อง / รู้สึกว่าตัวเองพูดไม่เก่ง / งานล้นแต่ไม่รู้จะจัดการอย่างไร..." rows={5} />
      </Field>
      <Field label="ความฝัน / สิ่งที่อยากได้ *" hint="พวกเขาอยากได้ผลลัพธ์อะไรจริงๆ">
        <Textarea value={data.targetDream} onChange={(v) => set("targetDream", v)} placeholder="เช่น อยากให้ทีมทำงานร่วมกันได้อย่างราบรื่น / อยากมีความมั่นใจในการพูด..." rows={4} />
      </Field>
    </>
  );
}

function Step4({ data, set }: { data: FormData; set: (k: string, v: string) => void }) {
  return (
    <>
      <SectionTitle>✨ ปัญหาที่แก้ & การเปลี่ยนแปลง</SectionTitle>
      <Field label="ชีวิตก่อนใช้บริการ (Before) *" hint="อธิบายสภาพปัญหาที่ลูกค้ากำลังเจออยู่">
        <Textarea value={data.problemBefore} onChange={(v) => set("problemBefore", v)} placeholder="เช่น ก่อนมาเรียน ผู้เรียนมักรู้สึกว่าการประชุมไม่มีประสิทธิภาพ ทีมต่างฝ่ายต่างทำ ไม่มีใครรับฟังกันจริงๆ..." rows={4} />
      </Field>
      <Field label="การเปลี่ยนแปลง (Transformation) *" hint="บอกว่าสินค้า/บริการทำให้เกิดอะไรขึ้น">
        <Textarea value={data.transformation} onChange={(v) => set("transformation", v)} placeholder="เช่น หลังจบ Workshop ทีมเริ่มฟังกันมากขึ้น ประชุมสั้นลงแต่ได้ผลลัพธ์มากขึ้น..." rows={4} />
      </Field>
      <Field label="ผลลัพธ์ที่วัดได้ (Outcomes) *" hint="ยิ่งมีตัวเลขยิ่งดี">
        <Textarea value={data.outcomes} onChange={(v) => set("outcomes", v)} placeholder="เช่น ยอดขายเพิ่ม 23% / ความพึงพอใจทีม 4.8/5 / ลดเวลาประชุมลง 40%..." rows={4} />
      </Field>
      <Field label="วิธีการ / Methodology ที่ใช้" hint="อธิบายกระบวนการทำงานของคุณ ทำให้ดูมืออาชีพ">
        <Textarea value={data.uniqueMethod} onChange={(v) => set("uniqueMethod", v)} placeholder="เช่น ใช้กระบวนการ CAP Theory: Cognition → Affection → Practice / Flow Learning 5 ขั้นตอน..." rows={4} />
      </Field>
      <Field label="ทำไมต้องเลือกคุณ? (Why You)" hint="จุดแตกต่างที่คนอื่นทำไม่ได้">
        <Textarea value={data.whyYou} onChange={(v) => set("whyYou", v)} placeholder="เช่น เป็นคนเดียวที่ใช้ Brainwave Tracker ในการฝึกอบรม / ประสบการณ์โดยตรงจากองค์กรระดับโลก..." rows={4} />
      </Field>
    </>
  );
}

function Step5({ data, set }: { data: FormData; set: (k: string, v: string) => void }) {
  return (
    <>
      <SectionTitle>🏆 หลักฐานและความน่าเชื่อถือ</SectionTitle>
      <Field label="Testimonials / รีวิวจากลูกค้า *" hint="คัดที่ดีที่สุด 3-5 ข้อ พร้อมชื่อและตำแหน่ง">
        <Textarea value={data.testimonials} onChange={(v) => set("testimonials", v)} placeholder={"\"หลังเข้า Workshop ทีมเราสื่อสารกันดีขึ้นมาก...\" — คุณสมศรี ผู้จัดการฝ่าย HR บริษัท XYZ\n\n\"ครูเด่นสอนได้เข้าใจง่ายมาก นำไปใช้ได้ทันที...\" — อาจารย์วิชัย มหาวิทยาลัย ABC"} rows={8} />
      </Field>
      <Field label="ลูกค้า / องค์กรที่เคยร่วมงาน" hint="ชื่อองค์กรหรือแบรนด์ที่มีชื่อเสียง จะช่วยเพิ่มความน่าเชื่อถือมาก">
        <Textarea value={data.clientLogos} onChange={(v) => set("clientLogos", v)} placeholder="เช่น Toyota Motor Thailand, Dell Technologies, กรมสรรพากร, ไทยประกันชีวิต..." rows={4} />
      </Field>
      <Field label="การปรากฏตัวในสื่อ / Media Features">
        <Textarea value={data.mediaFeatures} onChange={(v) => set("mediaFeatures", v)} placeholder="เช่น ถูกสัมภาษณ์ใน Manager Online / พูดบนเวที TEDx / รายการ TV / Podcast..." rows={3} />
      </Field>
      <Field label="ประกาศนียบัตร / รางวัล / การรับรอง">
        <Textarea value={data.certifications} onChange={(v) => set("certifications", v)} placeholder="เช่น Certified Facilitator จาก IAF / รางวัลวิทยากรดีเด่น..." rows={3} />
      </Field>
      <Field label="Case Study ที่โดดเด่น" hint="เล่าเรื่อง 1 เคสที่ประสบความสำเร็จชัดเจน">
        <Textarea value={data.caseStudy} onChange={(v) => set("caseStudy", v)} placeholder="องค์กร: (ประเภท) / ปัญหา: / กระบวนการที่ใช้: / ผลลัพธ์: ..." rows={5} />
      </Field>
    </>
  );
}

function Step6({ data, set }: { data: FormData; set: (k: string, v: string) => void }) {
  return (
    <>
      <SectionTitle>💰 Offer & ราคา</SectionTitle>
      <Field label="ราคาหลัก / Package หลัก *">
        <Input value={data.priceMain} onChange={(v) => set("priceMain", v)} placeholder="เช่น 15,000 บาท/คน / เริ่มต้น 120,000 บาท (In-house)" />
      </Field>
      <Field label="หมายเหตุเรื่องราคา / Package อื่น" hint="มี Tier อื่นไหม? ราคา Early Bird? ราคากลุ่ม?">
        <Textarea value={data.priceNote} onChange={(v) => set("priceNote", v)} placeholder="เช่น Early Bird ลด 20% / สมาชิก VIP ราคาพิเศษ / กลุ่ม 3+ คน ลด 15%..." rows={4} />
      </Field>
      <Field label="Bonus / ของแถม / สิ่งที่ได้รับเพิ่ม" hint="ยิ่งดูคุ้มค่ายิ่งดี">
        <Textarea value={data.bonuses} onChange={(v) => set("bonuses", v)} placeholder={"✅ Workbook มูลค่า 300 บาท\n✅ Recording 30 วัน\n✅ Group LINE ติดตามผล 3 เดือน..."} rows={5} />
      </Field>
      <Field label="การรับประกัน / Guarantee" hint="ช่วยลดความกังวลของผู้ซื้อ">
        <Textarea value={data.guarantee} onChange={(v) => set("guarantee", v)} placeholder="เช่น รับประกันความพึงพอใจ 100% หากไม่ได้ผลภายใน 7 วัน ยินดีคืนเงิน..." rows={3} />
      </Field>
      <Field label="ความเร่งด่วน / Urgency / Scarcity" hint="ทำให้คนตัดสินใจเร็วขึ้น">
        <Textarea value={data.urgency} onChange={(v) => set("urgency", v)} placeholder="เช่น เปิดรับเพียง 20 คนเท่านั้น / รุ่นนี้ปิดรับ 31 พ.ค. นี้..." rows={3} />
      </Field>
      <Field label="ช่องทางชำระเงิน">
        <Input value={data.paymentOptions} onChange={(v) => set("paymentOptions", v)} placeholder="เช่น โอนธนาคาร, บัตรเครดิต, ผ่อน 0% 3 เดือน" />
      </Field>
    </>
  );
}

function Step7({ data, set }: { data: FormData; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      <SectionTitle>🎨 Visual & สไตล์การออกแบบ</SectionTitle>
      <Field label="สีหลักที่ชอบหรือใช้อยู่" hint="ใส่ชื่อสี / Hex Code / หรืออธิบายความรู้สึก">
        <Input value={data.colorPreference} onChange={(v) => set("colorPreference", v)} placeholder="เช่น Navy #0D1B3E + Teal #1A7A6E + Gold #C9A84C / สีเขียวหยก, ทอง" />
      </Field>
      <Field label="Tone & Style ที่ต้องการ">
        <CheckGroup
          options={["Professional", "Warm & Friendly", "Bold & Energetic", "Luxury", "Minimalist", "Playful", "Nature", "Dark & Premium"]}
          selected={data.toneStyle ? data.toneStyle.split(",").filter(Boolean) : []}
          onChange={(v) => set("toneStyle", v.join(","))}
        />
      </Field>
      <Field label="ความรู้สึกของ Font / ตัวอักษร">
        <Input value={data.fontFeel} onChange={(v) => set("fontFeel", v)} placeholder="เช่น ดูน่าเชื่อถือ / อ่านง่าย / ทันสมัย / อบอุ่น / หรู" />
      </Field>
      <Field label="Sale Page อ้างอิง (ที่ชอบ)" hint="ลิงก์ Sale Page ที่ดูแล้วรู้สึกชอบ เพื่อใช้เป็น Reference">
        <Textarea value={data.referenceLinks} onChange={(v) => set("referenceLinks", v)} placeholder={"วางลิงก์ได้เลย เช่น\nhttps://..."} rows={3} />
      </Field>
      <Field label="มี Logo / Branding ที่ใช้อยู่แล้วไหม?">
        <CheckGroup
          options={["มี Logo พร้อมใช้", "มีแต่ต้องปรับ", "ยังไม่มี (ต้องสร้างใหม่)"]}
          selected={data.logoAvailable ? [data.logoAvailable] : []}
          onChange={(v) => set("logoAvailable", v[v.length - 1] || "")}
        />
      </Field>
      <Field label="มีรูปโปรไฟล์ / รูปสินค้า / รูปอบรมไหม?">
        <CheckGroup
          options={["มีรูปคุณภาพดีพร้อมใช้", "มีบ้าง", "ยังไม่มี ต้องถ่ายใหม่"]}
          selected={data.photoAvailable ? [data.photoAvailable] : []}
          onChange={(v) => set("photoAvailable", v[v.length - 1] || "")}
        />
      </Field>
    </>
  );
}

function Step8({ data, set }: { data: FormData; set: (k: string, v: string) => void }) {
  return (
    <>
      <SectionTitle>📞 CTA & ข้อมูลการติดต่อ</SectionTitle>
      <Field label="ข้อความ Call-to-Action (ปุ่มหลัก) *" hint="ประโยคที่ให้คนกดสมัคร/ติดต่อ">
        <Input value={data.ctaText} onChange={(v) => set("ctaText", v)} placeholder="เช่น สมัครเลย / จองที่นั่ง / ขอใบเสนอราคา / ปรึกษาฟรี" />
      </Field>
      <Field label="LINE ID / LINE OA">
        <Input value={data.lineId} onChange={(v) => set("lineId", v)} placeholder="เช่น @denmasterfa" />
      </Field>
      <Field label="เบอร์โทรศัพท์">
        <Input value={data.phone} onChange={(v) => set("phone", v)} placeholder="เช่น 093-223-5919" type="tel" />
      </Field>
      <Field label="Email">
        <Input value={data.email} onChange={(v) => set("email", v)} placeholder="เช่น dencapvision@gmail.com" type="email" />
      </Field>
      <Field label="ลิงก์ Form สมัคร / ลิงก์ชำระเงิน (ถ้ามี)">
        <Input value={data.formLink} onChange={(v) => set("formLink", v)} placeholder="เช่น https://forms.gle/..." />
      </Field>
      <Field label="Deadline / วันปิดรับสมัคร">
        <Input value={data.deadline} onChange={(v) => set("deadline", v)} placeholder="เช่น 31 พฤษภาคม 2567 / ไม่กำหนด" />
      </Field>
    </>
  );
}

// ============ SUMMARY ============

function Summary({ data }: { data: FormData }) {
  const sections = [
    { title: "👤 ตัวตน & แบรนด์", fields: [
      ["ชื่อ", data.ownerName], ["แบรนด์", data.brandName], ["Tagline", data.tagline],
      ["ตำแหน่ง", data.ownerRole], ["ประสบการณ์", data.experience],
      ["เรื่องราว", data.ownerStory], ["Social", data.socialProfiles],
    ]},
    { title: "💼 สินค้า / บริการ", fields: [
      ["ชื่อ", data.productName], ["ประเภท", data.productType],
      ["คำอธิบาย", data.productDescription], ["รูปแบบ", data.format.join(", ")],
      ["ระยะเวลา", data.duration], ["สถานที่", data.location], ["จำนวน", data.capacity],
    ]},
    { title: "🎯 กลุ่มเป้าหมาย", fields: [
      ["กลุ่มหลัก", data.targetGroup], ["อาชีพ", data.targetOccupation],
      ["อายุ", data.targetAge], ["Pain", data.targetPain], ["ความฝัน", data.targetDream],
    ]},
    { title: "✨ ปัญหา & ผลลัพธ์", fields: [
      ["Before", data.problemBefore], ["Transformation", data.transformation],
      ["Outcomes", data.outcomes], ["Methodology", data.uniqueMethod], ["Why You", data.whyYou],
    ]},
    { title: "🏆 หลักฐาน", fields: [
      ["Testimonials", data.testimonials], ["ลูกค้า", data.clientLogos],
      ["สื่อ", data.mediaFeatures], ["ประกาศนียบัตร", data.certifications], ["Case Study", data.caseStudy],
    ]},
    { title: "💰 Offer & ราคา", fields: [
      ["ราคาหลัก", data.priceMain], ["Package/หมายเหตุ", data.priceNote],
      ["Bonus", data.bonuses], ["Guarantee", data.guarantee],
      ["Urgency", data.urgency], ["ชำระเงิน", data.paymentOptions],
    ]},
    { title: "🎨 Visual", fields: [
      ["สี", data.colorPreference], ["Tone", data.toneStyle], ["Font", data.fontFeel],
      ["Reference", data.referenceLinks], ["Logo", data.logoAvailable], ["รูปภาพ", data.photoAvailable],
    ]},
    { title: "📞 CTA & ติดต่อ", fields: [
      ["CTA", data.ctaText], ["LINE", data.lineId], ["โทร", data.phone],
      ["Email", data.email], ["Form Link", data.formLink], ["Deadline", data.deadline],
    ]},
  ];

  const buildPrompt = () => {
    const lines: string[] = ["=== SALE PAGE BRIEF ===\n"];
    sections.forEach(({ title, fields }) => {
      lines.push(`\n--- ${title} ---`);
      (fields as [string, string][]).forEach(([label, value]) => {
        if (value) lines.push(`${label}: ${value}`);
      });
    });
    lines.push("\n=== END BRIEF ===");
    return lines.join("\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildPrompt());
    alert("คัดลอก Brief แล้ว! นำไปวางใน AI Chat ได้เลย 🎉");
  };

  return (
    <div>
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎉</div>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: colors.navy, fontFamily: "'Prompt', sans-serif", margin: "0 0 8px" }}>
          Brief ของคุณพร้อมแล้ว!
        </h2>
        <p style={{ color: "#6b7a99", fontFamily: "'Sarabun', sans-serif", fontSize: "15px" }}>
          ตรวจสอบข้อมูลด้านล่าง แล้วกด "คัดลอก Brief" เพื่อนำไปสร้าง Sale Page
        </p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        style={{
          width: "100%",
          padding: "16px",
          background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "700",
          fontFamily: "'Prompt', sans-serif",
          cursor: "pointer",
          marginBottom: "32px",
          boxShadow: `0 4px 20px ${colors.teal}44`,
        }}
      >
        📋 คัดลอก Brief ทั้งหมด
      </button>

      {sections.map(({ title, fields }) => {
        const filled = (fields as [string, string][]).filter(([, v]) => v);
        if (!filled.length) return null;
        return (
          <div key={title} style={{ marginBottom: "24px", background: "#f8faff", borderRadius: "12px", padding: "20px", border: "1px solid #e8edf8" }}>
            <div style={{ fontWeight: "700", fontSize: "15px", color: colors.navy, fontFamily: "'Prompt', sans-serif", marginBottom: "12px" }}>{title}</div>
            {filled.map(([label, value]) => (
              <div key={label} style={{ display: "flex", gap: "12px", marginBottom: "8px", fontSize: "14px", fontFamily: "'Sarabun', sans-serif" }}>
                <span style={{ color: "#8a97b5", minWidth: "120px", flexShrink: 0 }}>{label}</span>
                <span style={{ color: colors.navy, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{value}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ============ MAIN COMPONENT ============

export default function SalesPageFormBuilder() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [done, setDone] = useState(false);

  const set = (key: string, value: string | string[]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const stepProps = { data, set };

  const stepContent = [
    <Step1 key={1} data={data} set={(k, v) => set(k, v as string)} />,
    <Step2 key={2} data={data} set={set} />,
    <Step3 key={3} data={data} set={(k, v) => set(k, v as string)} />,
    <Step4 key={4} data={data} set={(k, v) => set(k, v as string)} />,
    <Step5 key={5} data={data} set={(k, v) => set(k, v as string)} />,
    <Step6 key={6} data={data} set={(k, v) => set(k, v as string)} />,
    <Step7 key={7} data={data} set={set} />,
    <Step8 key={8} data={data} set={(k, v) => set(k, v as string)} />,
  ];

  void stepProps;

  return (
    <div style={{ minHeight: "100vh", background: colors.cream, fontFamily: "'Sarabun', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyLight} 60%, ${colors.teal} 100%)`,
        padding: "32px 24px 28px",
        textAlign: "center",
        color: "#fff",
      }}>
        <div style={{ fontSize: "13px", letterSpacing: "3px", color: colors.goldLight, fontFamily: "'Prompt', sans-serif", marginBottom: "8px" }}>
          CAP VISION INSTITUTE
        </div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: "800", fontFamily: "'Prompt', sans-serif", margin: "0 0 6px" }}>
          Sale Page Brief Builder
        </h1>
        <p style={{ fontSize: "14px", color: "#c8d8e8", margin: 0 }}>
          กรอกข้อมูลทีละขั้นตอน เพื่อสร้าง Brief สำหรับทำ Sale Page ที่ขายได้จริง
        </p>
      </div>

      {/* Step Progress */}
      {!done && (
        <div style={{ background: "#fff", borderBottom: "1px solid #e8edf8", overflowX: "auto" }}>
          <div style={{ display: "flex", minWidth: "max-content", padding: "0 16px" }}>
            {STEPS.map((s) => {
              const isActive = s.id === step;
              const isDone = s.id < step;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "14px 14px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    borderBottom: isActive ? `3px solid ${colors.teal}` : "3px solid transparent",
                    transition: "all 0.2s",
                    opacity: isDone ? 0.7 : 1,
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{isDone ? "✅" : s.icon}</span>
                  <span style={{
                    fontSize: "11px",
                    fontFamily: "'Sarabun', sans-serif",
                    color: isActive ? colors.teal : colors.navy,
                    fontWeight: isActive ? "700" : "400",
                    whiteSpace: "nowrap",
                  }}>
                    {s.label}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setDone(true)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                padding: "14px 14px",
                border: "none",
                background: "none",
                cursor: "pointer",
                borderBottom: done ? `3px solid ${colors.gold}` : "3px solid transparent",
              }}
            >
              <span style={{ fontSize: "18px" }}>📄</span>
              <span style={{ fontSize: "11px", fontFamily: "'Sarabun', sans-serif", color: done ? colors.gold : colors.navy, whiteSpace: "nowrap" }}>
                สรุป Brief
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 20px 80px" }}>
        {done ? (
          <>
            <button
              type="button"
              onClick={() => { setDone(false); setStep(1); }}
              style={{
                marginBottom: "24px",
                background: "none",
                border: `1.5px solid ${colors.navy}`,
                borderRadius: "8px",
                padding: "8px 18px",
                fontSize: "14px",
                fontFamily: "'Sarabun', sans-serif",
                color: colors.navy,
                cursor: "pointer",
              }}
            >
              ← แก้ไขข้อมูล
            </button>
            <Summary data={data} />
          </>
        ) : (
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "clamp(24px, 4vw, 40px)",
            boxShadow: "0 4px 24px rgba(13,27,62,0.08)",
          }}>
            {/* Step header */}
            <div style={{ marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", flexShrink: 0,
              }}>
                {STEPS[step - 1].icon}
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#8a97b5", fontFamily: "'Sarabun', sans-serif" }}>ขั้นที่ {step} / {STEPS.length}</div>
                <div style={{ fontSize: "17px", fontWeight: "700", color: colors.navy, fontFamily: "'Prompt', sans-serif" }}>{STEPS[step - 1].label}</div>
              </div>
            </div>

            {stepContent[step - 1]}

            {/* Navigation */}
            <div style={{ display: "flex", gap: "12px", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #e8edf8" }}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    background: "#fff",
                    border: `1.5px solid #dde3ef`,
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontFamily: "'Sarabun', sans-serif",
                    color: colors.navy,
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  ← ย้อนกลับ
                </button>
              )}
              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  style={{
                    flex: 2,
                    padding: "14px",
                    background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontFamily: "'Prompt', sans-serif",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "700",
                    boxShadow: `0 4px 16px ${colors.teal}44`,
                  }}
                >
                  ถัดไป →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setDone(true)}
                  style={{
                    flex: 2,
                    padding: "14px",
                    background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontFamily: "'Prompt', sans-serif",
                    color: colors.navy,
                    cursor: "pointer",
                    fontWeight: "700",
                    boxShadow: `0 4px 16px ${colors.gold}44`,
                  }}
                >
                  ดู Brief สรุป 🎉
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
