import React, { useState } from 'react';
import {
  Sparkles, Loader2, Copy, CheckCircle2, RefreshCw,
  Image, FileText, Code2, Link2, Upload, ChevronRight, Info
} from 'lucide-react';
import { generateCourseContent, GeneratedCourse } from '../../services/ai-course-generator';
import {
  generateVisualSEO, buildUpdateSQL, buildImageUrl,
  type VisualSEOResult
} from '../../services/ai-visual-seo-generator';

const CATEGORIES = ['Leader Skills', 'People Skills', 'Work Skills', 'Think Skills'];

// ─── Shared copy button ───────────────────────────────────────────────────────
const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'คัดลอก' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs font-bold text-[#c5a059] hover:text-[#b8924d] transition-colors whitespace-nowrap"
    >
      {copied ? (
        <><CheckCircle2 className="w-3.5 h-3.5" />คัดลอกแล้ว</>
      ) : (
        <><Copy className="w-3.5 h-3.5" />{label}</>
      )}
    </button>
  );
};

// ─── Output block with label + copy ──────────────────────────────────────────
const OutputBlock: React.FC<{
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  value: string;
  mono?: boolean;
  rows?: number;
}> = ({ icon, label, sublabel, value, mono = false, rows = 4 }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[#c5a059]">{icon}</span>
        <div>
          <span className="text-xs font-black text-[#0f3460] uppercase tracking-wider">{label}</span>
          {sublabel && <span className="text-[10px] text-gray-400 ml-2">{sublabel}</span>}
        </div>
      </div>
      <CopyButton text={value} />
    </div>
    <textarea
      readOnly
      value={value}
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl text-sm border border-gray-100 bg-gray-50 resize-none focus:outline-none leading-relaxed ${
        mono ? 'font-mono text-[11px] bg-gray-900 text-green-400 border-gray-800' : 'text-gray-700'
      }`}
    />
  </div>
);

// ─── Step Badge ───────────────────────────────────────────────────────────────
const StepBadge: React.FC<{ no: number; label: string; done?: boolean }> = ({ no, label, done }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
    done ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
  }`}>
    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
      done ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'
    }`}>{no}</span>
    {label}
  </div>
);

// ─── Tab: Course Generator ────────────────────────────────────────────────────
const CourseGeneratorTab: React.FC = () => {
  const [courseName, setCourseName] = useState('');
  const [category, setCategory] = useState('Leader Skills');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedCourse | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!courseName.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await generateCourseContent(courseName.trim(), category);
      setResult(data);
    } catch (e: any) {
      setError(e.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  const copyJSON = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
      {/* Input */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-black text-[#0f3460] uppercase tracking-wider">ข้อมูลหลักสูตร</h2>

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-wider">ชื่อหลักสูตร</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="เช่น Transformational Leadership"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
            onKeyDown={(e) => e.key === 'Enter' && generate()}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-wider">หมวดหมู่</label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-left ${
                  category === cat ? 'bg-[#0f3460] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">{error}</div>
        )}

        <button
          onClick={generate}
          disabled={loading || !courseName.trim()}
          className="w-full flex items-center justify-center gap-2 bg-[#c5a059] text-white py-4 rounded-xl text-sm font-black hover:bg-[#b8924d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" />กำลังสร้างเนื้อหา...</>
          ) : (
            <><Sparkles className="w-4 h-4" />สร้างด้วย AI</>
          )}
        </button>

        {result && (
          <p className="text-xs text-center text-gray-400">
            สร้างเสร็จแล้ว —{' '}
            <a href="/dashboard/courses/new" className="text-[#c5a059] hover:underline">
              สร้างหลักสูตรใหม่
            </a>
          </p>
        )}
      </div>

      {/* Output */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-[#0f3460] uppercase tracking-wider">ผลลัพธ์</h2>
          {result && (
            <div className="flex gap-2">
              <button
                onClick={generate}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#0f3460] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />สร้างใหม่
              </button>
              <button
                onClick={copyJSON}
                className="flex items-center gap-1.5 text-xs font-bold text-[#c5a059] hover:text-[#b8924d] transition-colors"
              >
                {copied ? <><CheckCircle2 className="w-3.5 h-3.5" />คัดลอกแล้ว</> : <><Copy className="w-3.5 h-3.5" />คัดลอก JSON</>}
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center gap-4 text-gray-400">
            <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Gemini กำลังสร้างเนื้อหา...</p>
          </div>
        ) : !result ? (
          <div className="p-12 text-center text-gray-300">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">กรอกชื่อหลักสูตรและกด "สร้างด้วย AI"</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 max-h-[70vh] overflow-y-auto">
            <div className="px-6 py-4">
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Title</div>
              <div className="text-base font-black text-[#0f3460]">{result.title}</div>
              <div className="text-sm text-gray-600 mt-1">{result.description}</div>
            </div>
            <div className="px-6 py-4">
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Why ({result.why_section?.length})</div>
              <div className="space-y-2">
                {result.why_section?.map((item: any, i: number) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <span className="text-[10px] font-black text-[#c5a059] uppercase">{item.icon} · {item.stat}</span>
                    <div className="text-xs font-bold text-[#0f3460] mt-0.5">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Modules ({result.objectives?.length})</div>
              <div className="space-y-2">
                {result.objectives?.map((item: any, i: number) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-bold text-[#0f3460]">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1 whitespace-pre-line line-clamp-3">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 grid grid-cols-1 gap-3">
              <div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Audience</div>
                <div className="text-xs text-gray-600">{result.audience}</div>
              </div>
              <div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Duration</div>
                <div className="text-xs text-gray-600">{result.duration}</div>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Raw JSON</div>
              <pre className="bg-gray-900 text-green-400 text-[10px] p-4 rounded-xl overflow-x-auto leading-relaxed max-h-64">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Tab: Visual & SEO Generator ─────────────────────────────────────────────
const VisualSEOTab: React.FC = () => {
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VisualSEOResult | null>(null);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!courseName.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await generateVisualSEO(courseName.trim());
      setResult(data);
    } catch (e: any) {
      setError(e.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  const sql = result ? buildUpdateSQL(result) : '';
  const imageUrl = result ? buildImageUrl(result.file_name) : '';

  return (
    <div className="space-y-6">
      {/* Workflow guide */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="text-xs font-black text-blue-700 uppercase tracking-wider">End-to-End Workflow</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <StepBadge no={1} label="พิมพ์ชื่อหลักสูตร → Generate" done={!!result} />
          <ChevronRight className="w-4 h-4 text-gray-300 self-center" />
          <StepBadge no={2} label="Copy IMAGE PROMPT → Midjourney / DALL·E" done={false} />
          <ChevronRight className="w-4 h-4 text-gray-300 self-center" />
          <StepBadge no={3} label="บันทึกไฟล์ตาม FILE NAME" done={false} />
          <ChevronRight className="w-4 h-4 text-gray-300 self-center" />
          <StepBadge no={4} label="อัปโหลด → Supabase: media/Course/" done={false} />
          <ChevronRight className="w-4 h-4 text-gray-300 self-center" />
          <StepBadge no={5} label="รัน SQL ใน Supabase Editor" done={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-black text-[#0f3460] uppercase tracking-wider">ชื่อหลักสูตร</h2>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
              พิมพ์ชื่อหลักสูตร (ไทย หรือ English)
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="เช่น Transformational Leadership หรือ ภาวะผู้นำเชิงกลยุทธ์"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
              onKeyDown={(e) => e.key === 'Enter' && generate()}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">{error}</div>
          )}

          <button
            onClick={generate}
            disabled={loading || !courseName.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#c5a059] text-white py-4 rounded-xl text-sm font-black hover:bg-[#b8924d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />กำลังสร้าง Output...</>
            ) : (
              <><Sparkles className="w-4 h-4" />Generate Visual & SEO</>
            )}
          </button>

          {result && (
            <button
              onClick={generate}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />สร้างใหม่อีกครั้ง
            </button>
          )}

          {/* Upload link shortcut */}
          {result && (
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-bold text-[#0f3460] hover:text-[#c5a059] transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              เปิด Supabase Storage Dashboard
            </a>
          )}
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-black text-[#0f3460] uppercase tracking-wider">Output 4 ส่วน</h2>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col items-center gap-4 text-gray-400">
              <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium">Gemini กำลังสร้าง Output...</p>
            </div>
          ) : !result ? (
            <div className="p-12 text-center text-gray-300">
              <Image className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">กรอกชื่อหลักสูตรและกด Generate</p>
            </div>
          ) : (
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

              {/* 1: File Name */}
              <OutputBlock
                icon={<FileText className="w-4 h-4" />}
                label="FILE NAME (SEO)"
                sublabel="บันทึกไฟล์ภาพด้วยชื่อนี้"
                value={result.file_name}
                rows={1}
              />

              {/* 2: Image URL */}
              <OutputBlock
                icon={<Link2 className="w-4 h-4" />}
                label="IMAGE URL (หลังอัปโหลด)"
                sublabel={`bucket: media/Course/`}
                value={imageUrl}
                rows={2}
              />

              {/* 3: Alt Text + SEO fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#c5a059]"><FileText className="w-4 h-4" /></span>
                  <span className="text-xs font-black text-[#0f3460] uppercase tracking-wider">SEO Metadata</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">SEO Title</p>
                      <p className="text-sm font-bold text-[#0f3460]">{result.seo_title}</p>
                    </div>
                    <CopyButton text={result.seo_title} />
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Alt Text</p>
                      <p className="text-sm text-gray-600">{result.alt_text}</p>
                    </div>
                    <CopyButton text={result.alt_text} />
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Description</p>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>
                    <CopyButton text={result.description} />
                  </div>
                </div>
              </div>

              {/* 4: Image Prompts */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#c5a059]"><Image className="w-4 h-4" /></span>
                  <span className="text-xs font-black text-[#0f3460] uppercase tracking-wider">IMAGE PROMPT</span>
                </div>
                <OutputBlock
                  icon={<Image className="w-4 h-4" />}
                  label="Midjourney"
                  sublabel="วางใน /imagine"
                  value={result.image_prompt.midjourney}
                  rows={5}
                />
                <OutputBlock
                  icon={<Image className="w-4 h-4" />}
                  label="DALL·E"
                  sublabel="วางใน ChatGPT / OpenAI"
                  value={result.image_prompt.dalle}
                  rows={4}
                />
              </div>

              {/* 5: SQL */}
              <OutputBlock
                icon={<Code2 className="w-4 h-4" />}
                label="SQL — Supabase Editor"
                sublabel="รันหลังอัปโหลดภาพเสร็จ"
                value={sql}
                mono
                rows={12}
              />

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
type Tab = 'course' | 'visual';

const DashboardAIGenerator: React.FC = () => {
  const [tab, setTab] = useState<Tab>('course');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0f3460] nav-font">AI Generator</h1>
        <p className="text-sm text-gray-500 mt-1">สร้างเนื้อหาและ Visual Assets ด้วย Gemini AI</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setTab('course')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
            tab === 'course'
              ? 'bg-white text-[#0f3460] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Course Generator
        </button>
        <button
          onClick={() => setTab('visual')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
            tab === 'visual'
              ? 'bg-white text-[#0f3460] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          Visual & SEO Generator
        </button>
      </div>

      {/* Tab content */}
      {tab === 'course' ? <CourseGeneratorTab /> : <VisualSEOTab />}
    </div>
  );
};

export default DashboardAIGenerator;
