import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { generateCourseContent, GeneratedCourse } from '../../services/ai-course-generator';
import {
  Sparkles, Loader2, CheckCircle2, ArrowRight, ArrowLeft,
  Edit3, Save, AlertCircle
} from 'lucide-react';

const CATEGORIES = ['Leader Skills', 'People Skills', 'Work Skills', 'Think Skills'];

type Step = 1 | 2 | 3;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const CourseCreateWizard: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);

  // Step 1 — Basic info
  const [courseName, setCourseName] = useState('');
  const [category, setCategory] = useState('Leader Skills');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);

  // Step 2 — AI Generate or Manual
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [generated, setGenerated] = useState<GeneratedCourse | null>(null);

  // Step 3 — Review & Save
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [savedSlug, setSavedSlug] = useState('');

  // Manual fields
  const [manualDescription, setManualDescription] = useState('');
  const [manualImage, setManualImage] = useState('');

  const handleNameChange = (v: string) => {
    setCourseName(v);
    if (autoSlug) setSlug(slugify(v));
  };

  // ── Step 1 → 2 ──
  const goStep2 = () => {
    if (!courseName.trim() || !slug.trim()) return;
    setStep(2);
  };

  // ── AI Generate ──
  const runAI = async () => {
    setAiLoading(true);
    setAiError('');
    setGenerated(null);
    try {
      const data = await generateCourseContent(courseName.trim(), category);
      setGenerated(data);
    } catch (e: any) {
      setAiError(e.message ?? 'เกิดข้อผิดพลาด');
    } finally {
      setAiLoading(false);
    }
  };

  // ── Step 2 → 3 ──
  const goStep3 = () => {
    if (mode === 'ai' && !generated) return;
    setStep(3);
  };

  // ── Save to Supabase ──
  const save = async () => {
    setSaving(true);
    setSaveError('');

    const payload: Record<string, any> = {
      title: generated?.title ?? courseName.trim(),
      slug: slug.trim(),
      category,
      description: generated?.description ?? manualDescription,
      image: generated ? '' : manualImage,
      long_description: generated?.long_description ?? '',
      why_section: generated?.why_section ?? [],
      how_section: generated?.how_section ?? [],
      what_section: generated?.what_section ?? [],
      objectives: generated?.objectives ?? [],
      audience: generated?.audience ?? '',
      duration: generated?.duration ?? '',
      instructor_id: '5c27d651-5a5e-4001-9c83-55d8d224791f',
    };

    const { error } = await supabase.from('courses').insert(payload);

    if (error) {
      setSaveError(error.message);
      setSaving(false);
      return;
    }

    setSavedSlug(slug.trim());
    setSaving(false);
    setStep(3); // stays on step 3 showing success
  };

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────

  const StepIndicator = () => (
    <div className="flex items-center gap-3 mb-8">
      {([1, 2, 3] as Step[]).map((s) => (
        <React.Fragment key={s}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
              step > s
                ? 'bg-emerald-500 text-white'
                : step === s
                ? 'bg-[#0f3460] text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
          </div>
          {s < 3 && (
            <div className={`flex-1 h-0.5 transition-all ${step > s ? 'bg-emerald-500' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0f3460] nav-font">สร้างหลักสูตรใหม่</h1>
        <p className="text-sm text-gray-500 mt-1">3 ขั้นตอนสร้างหลักสูตรด้วย AI</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <StepIndicator />

        {/* ────── STEP 1 ────── */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-base font-black text-[#0f3460]">ข้อมูลพื้นฐาน</h2>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-wider">ชื่อหลักสูตร</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="เช่น Transformational Leadership"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Slug (URL)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setAutoSlug(false);
                  }}
                  placeholder="transformational-leadership"
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm font-mono border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
                />
                {!autoSlug && (
                  <button
                    onClick={() => { setAutoSlug(true); setSlug(slugify(courseName)); }}
                    className="text-xs text-[#c5a059] font-bold hover:underline whitespace-nowrap"
                  >
                    รีเซ็ต
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400">
                URL: /courses/<strong>{slug || 'your-slug'}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-wider">หมวดหมู่</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-left ${
                      category === cat
                        ? 'bg-[#0f3460] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={goStep2}
              disabled={!courseName.trim() || !slug.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#c5a059] text-white py-3.5 rounded-xl text-sm font-black hover:bg-[#b8924d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ถัดไป
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ────── STEP 2 ────── */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-base font-black text-[#0f3460]">สร้างเนื้อหา</h2>

            {/* Mode selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('ai')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  mode === 'ai'
                    ? 'border-[#c5a059] bg-[#c5a059]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Sparkles className={`w-5 h-5 mb-2 ${mode === 'ai' ? 'text-[#c5a059]' : 'text-gray-400'}`} />
                <div className="text-xs font-black text-[#0f3460]">สร้างด้วย AI</div>
                <div className="text-xs text-gray-400 mt-0.5">Gemini 2.0 Flash</div>
              </button>
              <button
                onClick={() => setMode('manual')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  mode === 'manual'
                    ? 'border-[#c5a059] bg-[#c5a059]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Edit3 className={`w-5 h-5 mb-2 ${mode === 'manual' ? 'text-[#c5a059]' : 'text-gray-400'}`} />
                <div className="text-xs font-black text-[#0f3460]">กรอกเอง</div>
                <div className="text-xs text-gray-400 mt-0.5">เนื้อหาพื้นฐาน</div>
              </button>
            </div>

            {mode === 'ai' && (
              <div className="space-y-4">
                {aiError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {aiError}
                  </div>
                )}

                {!generated ? (
                  <button
                    onClick={runAI}
                    disabled={aiLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0f3460] to-[#1a4a8a] text-white py-4 rounded-xl text-sm font-black hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {aiLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />กำลังสร้าง...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" />สร้างด้วย Gemini AI</>
                    )}
                  </button>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-700 font-black text-sm mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                      AI สร้างเนื้อหาเสร็จแล้ว
                    </div>
                    <div className="text-xs text-emerald-600 space-y-1">
                      <div>Title: <strong>{generated.title}</strong></div>
                      <div>Why: {generated.why_section?.length} items</div>
                      <div>Modules: {generated.objectives?.length} modules</div>
                    </div>
                    <button
                      onClick={runAI}
                      className="mt-3 text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      สร้างใหม่อีกครั้ง
                    </button>
                  </div>
                )}
              </div>
            )}

            {mode === 'manual' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">คำอธิบายสั้น</label>
                  <textarea
                    value={manualDescription}
                    onChange={(e) => setManualDescription(e.target.value)}
                    placeholder="ประโยคเดียวที่สื่อถึงประโยชน์ของหลักสูตร"
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-[#c5a059] outline-none resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Image URL</label>
                  <input
                    type="text"
                    value={manualImage}
                    onChange={(e) => setManualImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm font-mono border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                ย้อนกลับ
              </button>
              <button
                onClick={goStep3}
                disabled={mode === 'ai' && !generated}
                className="flex-1 flex items-center justify-center gap-2 bg-[#c5a059] text-white py-3 rounded-xl text-sm font-black hover:bg-[#b8924d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ตรวจสอบและบันทึก
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ────── STEP 3 ────── */}
        {step === 3 && (
          <div className="space-y-5">
            {savedSlug ? (
              // Success state
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-lg font-black text-[#0f3460] mb-2">บันทึกเรียบร้อยแล้ว</h2>
                <p className="text-sm text-gray-500 mb-6">/courses/{savedSlug}</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a
                    href={`/courses/${savedSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-[#0f3460] text-white text-sm font-bold rounded-xl hover:bg-[#0b2a4a] transition-colors"
                  >
                    ดูหน้าหลักสูตร
                  </a>
                  <button
                    onClick={() => navigate('/dashboard/courses')}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    กลับรายการหลักสูตร
                  </button>
                </div>
              </div>
            ) : (
              // Review state
              <>
                <h2 className="text-base font-black text-[#0f3460]">ตรวจสอบก่อนบันทึก</h2>

                <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">ชื่อ</span>
                    <span className="font-black text-[#0f3460] text-right max-w-xs truncate">
                      {generated?.title ?? courseName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">Slug</span>
                    <code className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">{slug}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">หมวดหมู่</span>
                    <span className="text-gray-700">{category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">เนื้อหา</span>
                    <span className="text-gray-700">{mode === 'ai' ? 'AI Generated' : 'Manual'}</span>
                  </div>
                  {generated && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-bold">Why Section</span>
                        <span className="text-gray-700">{generated.why_section?.length ?? 0} items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-bold">Modules</span>
                        <span className="text-gray-700">{generated.objectives?.length ?? 0} modules</span>
                      </div>
                    </>
                  )}
                </div>

                {saveError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {saveError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={save}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#0f3460] text-white py-3 rounded-xl text-sm font-black hover:bg-[#0b2a4a] transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />กำลังบันทึก...</>
                    ) : (
                      <><Save className="w-4 h-4" />บันทึกหลักสูตร</>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCreateWizard;
