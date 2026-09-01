import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, BarChart3, 
  Target, RefreshCw, Send,
  MessageSquare, Building2,
  Mail, Phone, User, Compass
} from 'lucide-react';
import { 
  IconLeadership, IconTeamSynergy, IconGrowthCulture, 
  IconCreativeCPS, IconGoldCrestStar, IconInstituteShield 
} from './icons/CapBrandIcons';
import { supabase } from '../lib/supabaseClient';
import { CONTACT_INFO } from '../constants/brand';

interface Question {
  id: number;
  dimension: 'leadership' | 'people' | 'culture' | 'execution';
  dimensionTitle: string;
  text: string;
  description: string;
}

const QUESTIONS: Question[] = [
  // 1. Leadership (1-3)
  {
    id: 1,
    dimension: 'leadership',
    dimensionTitle: 'Strategic Leadership',
    text: 'ผู้นำและผู้บริหารระดับต่างๆ ในองค์กร มีวิสัยทัศน์และการสื่อสารเป้าหมายร่วมกันที่ชัดเจน เป็นหนึ่งเดียว',
    description: 'ผู้นำทุกระดับเข้าใจทิศทางองค์กรตรงกัน และสามารถถ่ายทอดสู่ทีมงานได้อย่างมีพลัง'
  },
  {
    id: 2,
    dimension: 'leadership',
    dimensionTitle: 'Strategic Leadership',
    text: 'ผู้นำทำหน้าที่เป็น "Facilitator & Coach" มากกว่าการสั่งการแบบดั้งเดิม (Command & Control)',
    description: 'เปิดโอกาสให้ทีมคิดริเริ่ม มีส่วนร่วมในการแก้ปัญหา และรับฟังมุมมองใหม่ๆ เสมอ'
  },
  {
    id: 3,
    dimension: 'leadership',
    dimensionTitle: 'Strategic Leadership',
    text: 'องค์กรมีแผนการพัฒนาภาวะผู้นำ (Leadership Pipeline) ที่เป็นระบบและต่อเนื่องเพื่อรองรับการเติบโต',
    description: 'เตรียมความพร้อมสำหรับ Talent และผู้นำรุ่นต่อไปอย่างเป็นรูปธรรม'
  },

  // 2. People & Team (4-6)
  {
    id: 4,
    dimension: 'people',
    dimensionTitle: 'People & Team Synergy',
    text: 'การทำงานข้ามสายงาน (Cross-functional) มีความราบรื่น ปราศจากกำแพงแบบ Silo',
    description: 'แต่ละแผนกสื่อสารกันอย่างเปิดเผย ร่วมมือกันมุ่งสู่เป้าหมายใหญ่ขององค์กร'
  },
  {
    id: 5,
    dimension: 'people',
    dimensionTitle: 'People & Team Synergy',
    text: 'ทีมงานมีความปลอดภัยทางจิตวิทยา (Psychological Safety) กล้าเสนอไอเดียและกล้าพูดความจริง',
    description: 'ทุกคนสามารถแสดงความคิดเห็น เสนอแนะ หรือแจ้งปัญหาได้โดยไม่ต้องกลัวการลงโทษหรือตำหนิ'
  },
  {
    id: 6,
    dimension: 'people',
    dimensionTitle: 'People & Team Synergy',
    text: 'การให้ Feedback ภายในทีมเป็นแบบสร้างสรรค์ มี Empathy และมุ่งเน้นการเติบโตของบุคคล',
    description: 'มีการสื่อสารแบบเปิดใจ เข้าใจความต่างของคน และช่วยกันพัฒนายกระดับผลงาน'
  },

  // 3. Culture & Growth (7-9)
  {
    id: 7,
    dimension: 'culture',
    dimensionTitle: 'Culture & Growth Mindset',
    text: 'บุคลากรมี Growth Mindset มองปัญหาเป็นโอกาสการเรียนรู้ และพร้อมปรับตัวต่อความเปลี่ยนแปลง',
    description: 'ไม่ยึดติดกับความสำเร็จเดิมๆ กล้าออกจาก Comfort Zone เพื่อเรียนรู้สิ่งใหม่'
  },
  {
    id: 8,
    dimension: 'culture',
    dimensionTitle: 'Culture & Growth Mindset',
    text: 'องค์กรส่งเสริมบรรยากาศ Creative Thinking และการคิดเชิงนวัตกรรมในการทำงานประจำวัน',
    description: 'มีเครื่องมือและเวทีให้คนในองค์กรทดลองแก้ปัญหาด้วยวิธีใหม่ๆ อย่างสร้างสรรค์'
  },
  {
    id: 9,
    dimension: 'culture',
    dimensionTitle: 'Culture & Growth Mindset',
    text: 'ค่านิยมและวัฒนธรรมองค์กรสะท้อนสู่พฤติกรรมจริงของพนักงาน ไม่ใช่เป็นเพียงข้อความบนฝาผนัง',
    description: 'พนักงานเข้าใจ ยึดถือ และลงมือปฏิบัติจริงตาม Core Values ขององค์กร'
  },

  // 4. Execution & Impact (10-12)
  {
    id: 10,
    dimension: 'execution',
    dimensionTitle: 'Execution & Measurable Impact',
    text: 'การอบรมและพัฒนาบุคลากร มีการวิเคราะห์ TNA (Training Needs Analysis) จากปัญหาจริง',
    description: 'ไม่ได้เลือกหลักสูตรตามกระแส แต่ตอบโจทย์ความท้าทายทางธุรกิจขององค์กรอย่างแท้จริง'
  },
  {
    id: 11,
    dimension: 'execution',
    dimensionTitle: 'Execution & Measurable Impact',
    text: 'ผู้เรียนสามารถนำทักษะจากการฝึกอบรมไปประยุกต์ใช้ในการทำงานจริงจนเกิดผลลัพธ์วัดผลได้',
    description: 'เห็นการเปลี่ยนแปลงพฤติกรรม มี Action Plan และติดตามผลลัพธ์หลังการอบรม'
  },
  {
    id: 12,
    dimension: 'execution',
    dimensionTitle: 'Execution & Measurable Impact',
    text: 'องค์กรมีตัวชี้วัด (KPIs / OKRs / Metrics) ด้านการพัฒนาคนและประสิทธิภาพองค์กรที่ชัดเจน',
    description: 'สามารถประเมินผลสัมฤทธิ์ ROI และการเติบโตของทีมงานได้อย่างเป็นระบบ'
  }
];

const DIMENSION_CONFIG = {
  leadership: {
    title: 'Strategic Leadership',
    thTitle: 'ภาวะผู้นำเชิงกลยุทธ์',
    color: '#2563EB',
    icon: IconLeadership,
    desc: 'ความชัดเจนของวิสัยทัศน์และการนำพาองค์กรผ่าน Facilitative Leadership'
  },
  people: {
    title: 'People & Team Synergy',
    thTitle: 'พลังทีมและการประสานงาน',
    color: '#0F2557',
    icon: IconTeamSynergy,
    desc: 'ความปลอดภัยทางจิตวิทยา การสื่อสารเชิงบวก และการทลายกำแพง Silo'
  },
  culture: {
    title: 'Culture & Growth Mindset',
    thTitle: 'วัฒนธรรม & กรอบคิดเติบโต',
    color: '#F59E0B',
    icon: IconGrowthCulture,
    desc: 'การเปิดรับการเปลี่ยนแปลง ความคิดสร้างสรรค์ และการสร้างนวัตกรรม'
  },
  execution: {
    title: 'Execution & Impact',
    thTitle: 'การขับเคลื่อน & วัดผลลัพธ์',
    color: '#10B981',
    icon: IconCreativeCPS,
    desc: 'การแปลงทักษะสู่การปฏิบัติจริง และการประเมินผลลัพธ์ที่จับต้องได้'
  }
};

// SVG Radar Chart Component
const RadarChart: React.FC<{
  scores: {
    leadership: number;
    people: number;
    culture: number;
    execution: number;
  };
}> = ({ scores }) => {
  const size = 320;
  const center = size / 2;
  const radius = 100;

  // 4 Dimensions: Top (Leadership), Right (People), Bottom (Culture), Left (Execution)
  const angles = [
    -Math.PI / 2,         // Top: Leadership
    0,                    // Right: People
    Math.PI / 2,          // Bottom: Culture
    Math.PI               // Left: Execution
  ];

  const categories = [
    { key: 'leadership', label: 'Leadership', score: scores.leadership },
    { key: 'people', label: 'People & Team', score: scores.people },
    { key: 'culture', label: 'Culture & Mindset', score: scores.culture },
    { key: 'execution', label: 'Execution & Impact', score: scores.execution },
  ];

  // Calculate points for polygon
  const points = categories.map((cat, i) => {
    const angle = angles[i];
    const value = Math.max(0.2, cat.score / 100);
    const r = radius * value;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center p-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background Grids */}
        {[0.25, 0.5, 0.75, 1].map((level, idx) => (
          <polygon
            key={idx}
            points={angles.map(angle => {
              const r = radius * level;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
            strokeDasharray={idx === 3 ? 'none' : '3 3'}
          />
        ))}

        {/* Axis Lines */}
        {angles.map((angle, idx) => (
          <line
            key={idx}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
        ))}

        {/* Value Polygon */}
        <polygon
          points={points}
          fill="rgba(37, 99, 235, 0.25)"
          stroke="#2563EB"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Data Points */}
        {categories.map((cat, i) => {
          const angle = angles[i];
          const value = Math.max(0.2, cat.score / 100);
          const r = radius * value;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              <circle
                cx={x}
                cy={y}
                r="3"
                fill="#F59E0B"
              />
            </g>
          );
        })}

        {/* Dimension Labels */}
        {categories.map((cat, i) => {
          const angle = angles[i];
          const labelRadius = radius + 28;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          if (i === 1) textAnchor = 'start';
          if (i === 3) textAnchor = 'end';

          return (
            <text
              key={i}
              x={x}
              y={y + 4}
              textAnchor={textAnchor}
              className="text-[11px] font-bold fill-[#111827] select-none"
            >
              {cat.label} ({Math.round(cat.score)}%)
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export const TransformationAssessment: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Welcome, 1..12 = Questions, 13 = Result/Lead
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    lineId: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = currentStep >= 1 && currentStep <= totalQuestions ? QUESTIONS[currentStep - 1] : null;

  // Calculate Scores
  const results = useMemo(() => {
    const dimTotals: Record<string, { sum: number; count: number }> = {
      leadership: { sum: 0, count: 0 },
      people: { sum: 0, count: 0 },
      culture: { sum: 0, count: 0 },
      execution: { sum: 0, count: 0 }
    };

    QUESTIONS.forEach(q => {
      const val = answers[q.id] || 3; // Default 3 if not filled
      dimTotals[q.dimension].sum += val;
      dimTotals[q.dimension].count += 1;
    });

    const dimScores = {
      leadership: (dimTotals.leadership.sum / (dimTotals.leadership.count * 5)) * 100,
      people: (dimTotals.people.sum / (dimTotals.people.count * 5)) * 100,
      culture: (dimTotals.culture.sum / (dimTotals.culture.count * 5)) * 100,
      execution: (dimTotals.execution.sum / (dimTotals.execution.count * 5)) * 100
    };

    const overallScore = Math.round(
      (dimScores.leadership + dimScores.people + dimScores.culture + dimScores.execution) / 4
    );

    let stage = {
      level: 1,
      title: 'Foundational Stage (ช่วงวางรากฐาน)',
      badge: 'Level 1: Foundation',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'องค์กรมีความจำเป็นเร่งด่วนในการจัดวาง Alignment ภาวะผู้นำ และการสร้างความปลอดภัยทางจิตวิทยาเพื่อให้ทีมเริ่มสื่อสารและทำงานร่วมกันได้อย่างมีประสิทธิภาพ',
      recommendations: [
        'จัด Workshop: Transformational Leadership เพื่อสร้างกรอบคิดและวิสัยทัศน์ร่วม',
        'ทลายกำแพง Silo ด้วยหลักสูตร Team Synergy & Empathetic Communication',
        'สำรวจ TNA เชิงลึกเพื่อออกแบบโปรแกรมพัฒนาที่ตรงจุดเจ็บปวด'
      ]
    };

    if (overallScore >= 85) {
      stage = {
        level: 4,
        title: 'High-Impact Adaptive Enterprise (องค์กรชั้นนำแห่งอนาคต)',
        badge: 'Level 4: High Impact',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        description: 'องค์กรของคุณมีวัฒนธรรมที่แข็งแกร่ง ผู้นำมี Facilitative Mindset สูง และทีมงานมีความพร้อมสูงมาก จุดเน้นถัดไปคือการสร้างนวัตกรรมก้าวกระโดดและการเป็นต้นแบบองค์กรแห่งการเรียนรู้',
        recommendations: [
          'พัฒนา Master Facilitator ภายในองค์กรเพื่อสร้าง Learning Ecosystem ที่ยั่งยืน',
          'ต่อยอดด้วย Design Thinking & Creative Problem Solving ในระดับ Strategic Project',
          'Private CEO / Executive Strategy Exchange เพื่อขับเคลื่อน New S-Curve'
        ]
      };
    } else if (overallScore >= 70) {
      stage = {
        level: 3,
        title: 'Accelerating Growth Stage (ช่วงเร่งการเติบโต)',
        badge: 'Level 3: Accelerating',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        description: 'องค์กรมีพื้นฐานที่ดี มีความร่วมมือและเป้าหมายชัดเจน แต่อาจยังมีจุดคานงัดบางมิติที่สามารถเร่งสปีดผลลัพธ์ผ่านการปรับ Mindset และกระบวนการทำงานให้คมชัดขึ้น',
        recommendations: [
          'เสริมศักยภาพผู้นำยุคใหม่ด้วย Facilitative Leadership & Coaching Skill',
          'ยกระดับวัฒนธรรม Growth Mindset เพื่อรับมือความท้าทายและการเปลี่ยนแปลงที่รวดเร็ว',
          'วางระบบ Action Learning Project พร้อมตัวชี้วัด Impact ชัดเจน'
        ]
      };
    } else if (overallScore >= 50) {
      stage = {
        level: 2,
        title: 'Developing & Transitioning Stage (ช่วงเปลี่ยนผ่านและพัฒนา)',
        badge: 'Level 2: Developing',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        description: 'องค์กรกำลังอยู่ในช่วงตื่นตัวและต้องการพัฒนา แต่ยังพบอุปสรรคด้านการสื่อสารข้ามแผนก และการนำความรู้ไปใช้จริงให้เกิดผลลัพธ์ที่สม่ำเสมอ',
        recommendations: [
          'จัดกระบวนการ Activity-Based Learning เพื่อกระตุ้นการมีส่วนร่วมและความไว้วางใจ',
          'ฝึกทักษะการสื่อสารเชิงสร้างสรรค์และการให้ Feedback เชิงบวก',
          'กำหนดเป้าหมายระยะสั้น (Quick Wins) เพื่อสร้างความเชื่อมั่นในทีม'
        ]
      };
    }

    return {
      dimScores,
      overallScore,
      stage
    };
  }, [answers]);

  const handleSelectScore = (score: number) => {
    setSelectedScore(score);
    if (currentQuestion) {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: score }));
      setTimeout(() => {
        if (currentStep < totalQuestions) {
          setCurrentStep(currentStep + 1);
          setSelectedScore(answers[currentStep + 1] || null);
        } else {
          setCurrentStep(totalQuestions + 1); // Go to results
        }
      }, 250);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSelectedScore(answers[currentStep - 1] || null);
    } else if (currentStep === 1) {
      setCurrentStep(0);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.organization) {
      alert('กรุณากรอกข้อมูลสำคัญ (ชื่อ, องค์กร, เบอร์โทรศัพท์) ให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true);
    try {
      const summaryText = `[ผลประเมิน CAP Assessment: ${results.overallScore}% (${results.stage.title})] - Leadership: ${Math.round(results.dimScores.leadership)}%, People: ${Math.round(results.dimScores.people)}%, Culture: ${Math.round(results.dimScores.culture)}%, Execution: ${Math.round(results.dimScores.execution)}% | โน้ต: ${formData.note || '-'}`;

      // 1. Save to Supabase leads
      const { error: dbError } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.fullName,
            company: formData.organization,
            phone: formData.phone,
            email: formData.email || null,
            line_id: formData.lineId || null,
            interest_topic: summaryText,
            source: 'transformation_assessment',
            status: 'new'
          }
        ]);

      if (dbError) console.warn('Database save notice:', dbError);

      // 2. Trigger LINE notification
      try {
        await supabase.functions.invoke('line-notify', {
          body: {
            project: 'CONTACT',
            formType: '⭐ CAP Transformation Assessment Lead',
            data: {
              'ชื่อผู้บริหาร/HR': formData.fullName,
              'องค์กร': formData.organization,
              'ตำแหน่ง': formData.role || 'ไม่ระบุ',
              'เบอร์โทรศัพท์': formData.phone,
              'Email': formData.email || '-',
              'Line ID': formData.lineId || '-',
              'คะแนนความพร้อมรวม': `${results.overallScore}% (${results.stage.badge})`,
              'Leadership': `${Math.round(results.dimScores.leadership)}%`,
              'People & Team': `${Math.round(results.dimScores.people)}%`,
              'Culture & Mindset': `${Math.round(results.dimScores.culture)}%`,
              'Execution & Impact': `${Math.round(results.dimScores.execution)}%`,
              'ความต้องการเพิ่มเติม': formData.note || 'ต้องการปรึกษาการวางแผนพัฒนาองค์กร'
            }
          }
        });
      } catch (err) {
        console.warn('LINE Notify trigger skipped or failed silently:', err);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Lead submission error:', err);
      alert('บันทึกข้อมูลเรียบร้อยแล้ว ทีมวิทยากรจะติดต่อกลับเพื่อมอบรายงานฉบับสมบูรณ์');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${isEmbedded ? '' : 'max-w-5xl mx-auto'}`}>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-[#111827] text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                CAP Diagnostic Tool
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white nav-font tracking-tight">
                Organization Transformation Assessment
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                วิเคราะห์ความพร้อม 4 มิติสำคัญ เพื่อออกแบบการเปลี่ยนแปลงองค์กรที่เห็นผลลัพธ์จริง
              </p>
            </div>

            {currentStep >= 1 && currentStep <= totalQuestions && (
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                <div className="text-right">
                  <div className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">ความคืบหน้า</div>
                  <div className="text-sm font-black text-[#F59E0B]">{currentStep} / {totalQuestions}</div>
                </div>
                <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#F59E0B] transition-all duration-300"
                    style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assessment Body */}
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            
            {/* ── STEP 0: Welcome & Intro ───────────────────────────── */}
            {currentStep === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="py-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest block mb-2">
                      Exclusive Diagnostic by Master Facilitators
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#111827] leading-tight mb-4 nav-font">
                      ประเมินจุดแข็งและ <span className="text-[#2563EB]">จุดคานงัด</span> ในการขับเคลื่อนองค์กรของคุณ
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      แบบประเมินนี้ถูกพัฒนาจากประสบการณ์กว่า 18+ ปีของ CAP Vision Institute ในการจัด In-house Training และ OD Consulting ให้กับองค์กรชั้นนำกว่า 200+ แห่ง ใช้เวลาเพียง 3 นาที เพื่อค้นพบข้อเสนอแนะเชิงกลยุทธ์เฉพาะองค์กรคุณ
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {Object.values(DIMENSION_CONFIG).map((dim, idx) => {
                        const Icon = dim.icon;
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white shadow-sm flex-shrink-0" style={{ color: dim.color }}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#111827] truncate">{dim.thTitle}</div>
                              <div className="text-[10px] text-gray-400 truncate">{dim.title}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentStep(1)}
                      className="btn-premium w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                      เริ่มทำแบบประเมินฟรี (12 ข้อ)
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-6 sm:p-8 rounded-3xl border border-blue-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F2557] text-[#F59E0B] flex items-center justify-center mb-4 shadow-lg">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-black text-[#0F2557] mb-2 nav-font">สิ่งที่คุณจะได้รับทันที</h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-2.5 text-left mb-6 w-full">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <span><strong>คะแนนความพร้อม 4 มิติ</strong> ในรูปแบบ Radar Chart</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <span><strong>Maturity Level</strong> ระบุตำแหน่งปัจจุบันขององค์กร</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <span><strong>คำแนะนำโซลูชัน & แผน Action Plan</strong> เฉพาะองค์กร</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <span>สิทธิ์นัดหมาย <strong>Strategy Session 30 นาที</strong> ฟรี</span>
                      </li>
                    </ul>
                    <div className="text-[11px] text-gray-400 font-medium">
                      🔒 ข้อมูลของคุณจะถูกเก็บเป็นความลับ 100%
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 1..12: Questions ───────────────────────────── */}
            {currentQuestion && (
              <motion.div
                key={`q-${currentQuestion.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="py-4"
              >
                {/* Dimension Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-[#2563EB] border border-blue-100">
                    <Compass className="w-3.5 h-3.5" />
                    มิติที่ {Math.ceil(currentQuestion.id / 3)}: {DIMENSION_CONFIG[currentQuestion.dimension].thTitle}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    ข้อที่ {currentQuestion.id} จาก {totalQuestions}
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-xl sm:text-2xl font-black text-[#111827] leading-snug mb-3 nav-font">
                  {currentQuestion.text}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                  {currentQuestion.description}
                </p>

                {/* Rating Scale Buttons (1 - 5) */}
                <div className="space-y-3 mb-10">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    ระดับความสอดคล้องกับองค์กรของคุณในปัจจุบัน:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[
                      { score: 1, label: '1 - น้อยที่สุด / ต้องปรับปรุงด่วน', short: 'น้อยที่สุด' },
                      { score: 2, label: '2 - น้อย / มีการพูดถึงแต่ยังไม่ทำ', short: 'น้อย' },
                      { score: 3, label: '3 - ปานกลาง / ทำเป็นบางครั้ง', short: 'ปานกลาง' },
                      { score: 4, label: '4 - ดี / ทำอย่างสม่ำเสมอในหลายทีม', short: 'ดีมาก' },
                      { score: 5, label: '5 - ยอดเยี่ยม / เป็นวัฒนธรรมที่เข้มแข็ง', short: 'เป็นเลิศ' }
                    ].map(item => {
                      const isSelected = selectedScore === item.score || answers[currentQuestion.id] === item.score;
                      return (
                        <button
                          key={item.score}
                          type="button"
                          onClick={() => handleSelectScore(item.score)}
                          className={`p-4 rounded-2xl border text-left sm:text-center transition-all flex sm:flex-col items-center justify-between gap-2 active:scale-95 ${
                            isSelected 
                              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-500/20' 
                              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:border-[#2563EB]/40'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors ${
                            isSelected ? 'bg-white text-[#2563EB]' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.score}
                          </span>
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                            {item.short}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#111827] px-4 py-2 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    ย้อนกลับ
                  </button>

                  <div className="text-xs text-gray-400">
                    เลือกตัวเลข 1-5 เพื่อไปยังข้อถัดไปโดยอัตโนมัติ
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 13: Results & Diagnosis & Lead Capture ───────────── */}
            {currentStep > totalQuestions && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-2"
              >
                {/* Result Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border mb-3 ${results.stage.badgeColor}`}>
                    <Trophy className="w-4 h-4" />
                    {results.stage.badge}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black text-[#111827] nav-font mb-2">
                    คะแนนความพร้อมในการเปลี่ยนแปลง: <span className="text-[#2563EB]">{results.overallScore}%</span>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {results.stage.description}
                  </p>
                </div>

                {/* Diagnostic Grid: Radar + Dimension Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100 mb-10">
                  <div className="lg:col-span-6 flex flex-col items-center justify-center">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Transformation Radar Profile
                    </div>
                    <RadarChart scores={results.dimScores} />
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      คะแนนแยกรายมิติ (Dimensional Breakdown)
                    </div>

                    {Object.entries(DIMENSION_CONFIG).map(([key, config]) => {
                      const score = Math.round(results.dimScores[key as keyof typeof results.dimScores]);
                      const Icon = config.icon;
                      return (
                        <div key={key} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50" style={{ color: config.color }}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-[#111827] block">{config.thTitle}</span>
                                <span className="text-[10px] text-gray-400">{config.title}</span>
                              </div>
                            </div>
                            <span className="text-sm font-black" style={{ color: config.color }}>
                              {score}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${score}%`, backgroundColor: config.color }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50/60 border border-blue-100 p-6 sm:p-8 rounded-3xl mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#0F2557] nav-font">
                        ข้อเสนอแนะเชิงกลยุทธ์เฉพาะองค์กร (Tailored Action Plan)
                      </h4>
                      <p className="text-xs text-gray-500">ขั้นตอนสำคัญเพื่อยกระดับผลลัพธ์สู่ระดับถัดไป</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {results.stage.recommendations.map((rec, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-blue-100/80 shadow-sm flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
                          {rec}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Capture Form & Strategy Session Booking */}
                <div className="bg-[#111827] text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none"></div>

                  {!isSubmitted ? (
                    <div className="relative z-10 max-w-3xl mx-auto">
                      <div className="text-center mb-8">
                        <span className="text-[#F59E0B] font-bold text-xs uppercase tracking-widest block mb-2">
                          Get Full Diagnostic Report + Consultation
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black text-white nav-font mb-2">
                          รับรายงานฉบับเต็ม & นัดหมายปรึกษากลยุทธ์ 30 นาที
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
                          กรอกข้อมูลเพื่อให้ทีม Master Facilitator จัดเตรียม Executive Summary และนัดหมายพูดคุยแนวทางจัดหลักสูตรที่เหมาะกับองค์กรคุณโดยตรง
                        </p>
                      </div>

                      <form onSubmit={handleSubmitLead} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">
                              ชื่อ-นามสกุล <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="คุณอนุสรณ์ (ครูเด่น)"
                                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">
                              ชื่อหน่วยงาน / องค์กร <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                required
                                value={formData.organization}
                                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                                placeholder="ชื่อบริษัท หรือ หน่วยงาน"
                                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">
                              เบอร์โทรศัพท์ติดต่อ <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="08x-xxx-xxxx"
                                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">
                              ตำแหน่ง / บทบาท
                            </label>
                            <input
                              type="text"
                              value={formData.role}
                              onChange={e => setFormData({ ...formData, role: e.target.value })}
                              placeholder="เช่น HRD / L&D Manager / MD / CEO"
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">
                              อีเมล (สำหรับส่งรายงาน)
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@company.com"
                                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">
                              Line ID (เพื่อความสะดวกรวดเร็ว)
                            </label>
                            <input
                              type="text"
                              value={formData.lineId}
                              onChange={e => setFormData({ ...formData, lineId: e.target.value })}
                              placeholder="Line ID"
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            ความท้าทายหรือโจทย์ที่ต้องการปรึกษาเพิ่มเติม
                          </label>
                          <textarea
                            rows={2}
                            value={formData.note}
                            onChange={e => setFormData({ ...formData, note: e.target.value })}
                            placeholder="เช่น ต้องการจัดอบรมผู้นำระดับต้น, ทีมงานทำงานข้ามแผนกติดขัด, ปรับวัฒนธรรมองค์กร"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB]"
                          ></textarea>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-premium w-full sm:flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-black py-4 px-8 rounded-2xl text-base shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                          >
                            {isSubmitting ? (
                              <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <Send className="w-5 h-5" />
                                ส่งข้อมูล & นัดหมายปรึกษากลยุทธ์
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setCurrentStep(0);
                              setAnswers({});
                            }}
                            className="text-xs text-gray-400 hover:text-white transition-colors py-2"
                          >
                            ทำแบบประเมินใหม่อีกครั้ง
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center py-8 relative z-10 max-w-xl mx-auto">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-black text-white nav-font mb-2">
                        บันทึกข้อมูลเรียบร้อยแล้ว!
                      </h4>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        ทีมงาน CAP Vision Institute ได้รับผลประเมินของ <strong>{formData.organization}</strong> เรียบร้อยแล้ว และจะติดต่อกลับทางเบอร์ <strong>{formData.phone}</strong> เพื่อส่งมอบรายงานฉบับเต็มและกำหนดเวลานัดหมายพูดคุยกับ Master Facilitator ครับ
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={CONTACT_INFO.lineUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-premium w-full sm:w-auto bg-[#06C755] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          ทักไลน์สอบถามทันที
                        </a>
                        <a
                          href={`tel:${CONTACT_INFO.phone}`}
                          className="btn-premium w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/20"
                        >
                          <Phone className="w-4 h-4" />
                          โทรหาทีมงาน: {CONTACT_INFO.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default TransformationAssessment;
