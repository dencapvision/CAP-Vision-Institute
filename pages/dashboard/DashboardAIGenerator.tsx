import React, { useState } from 'react';
import { Sparkles, Loader2, Copy, CheckCircle2, RefreshCw } from 'lucide-react';
import { generateCourseContent, GeneratedCourse } from '../../services/ai-course-generator';

const CATEGORIES = ['Leader Skills', 'People Skills', 'Work Skills', 'Think Skills'];

const DashboardAIGenerator: React.FC = () => {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0f3460] nav-font">AI Course Generator</h1>
        <p className="text-sm text-gray-500 mt-1">สร้างเนื้อหาหลักสูตรด้วย Gemini AI แบบอัตโนมัติ</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Input panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-black text-[#0f3460] uppercase tracking-wider">ข้อมูลหลักสูตร</h2>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-wider">ชื่อหลักสูตร (ภาษาไทย / English)</label>
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

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          <button
            onClick={generate}
            disabled={loading || !courseName.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#c5a059] text-white py-4 rounded-xl text-sm font-black hover:bg-[#b8924d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังสร้างเนื้อหา...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                สร้างด้วย AI
              </>
            )}
          </button>

          {result && (
            <p className="text-xs text-center text-gray-400">
              สร้างเสร็จแล้ว — คัดลอก JSON แล้วนำไป{' '}
              <a href="/dashboard/courses/new" className="text-[#c5a059] hover:underline">
                สร้างหลักสูตรใหม่
              </a>
            </p>
          )}
        </div>

        {/* Preview panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-[#0f3460] uppercase tracking-wider">ผลลัพธ์</h2>
            {result && (
              <div className="flex gap-2">
                <button
                  onClick={generate}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#0f3460] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  สร้างใหม่
                </button>
                <button
                  onClick={copyJSON}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#c5a059] hover:text-[#b8924d] transition-colors"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-3.5 h-3.5" />คัดลอกแล้ว</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" />คัดลอก JSON</>
                  )}
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
              {/* Title & description */}
              <div className="px-6 py-4">
                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Title</div>
                <div className="text-base font-black text-[#0f3460]">{result.title}</div>
                <div className="text-sm text-gray-600 mt-1">{result.description}</div>
              </div>

              {/* Why section */}
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

              {/* Objectives */}
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

              {/* Audience & duration */}
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

              {/* Raw JSON */}
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
    </div>
  );
};

export default DashboardAIGenerator;
