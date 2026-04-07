import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Save, Eye, EyeOff, Trash2, ExternalLink,
  Loader2, CheckCircle2, AlertCircle, Plus, RefreshCw,
  ChevronDown, ChevronUp, FileText
} from 'lucide-react';
import { generateArticle, type GeneratedArticle } from '../../services/ai-article-generator';
import {
  fetchAllArticles, saveArticle, togglePublished, deleteArticle,
  type BlogArticleRow
} from '../../services/blog-articles';

const DashboardArticles: React.FC = () => {
  const [title, setTitle] = useState('');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generated, setGenerated] = useState<GeneratedArticle | null>(null);
  const [error, setError] = useState('');
  const [savedMsg, setSavedMsg] = useState('');
  const [articles, setArticles] = useState<BlogArticleRow[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'generator' | 'list'>('generator');

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    setLoadingList(true);
    try {
      const data = await fetchAllArticles();
      setArticles(data);
    } catch {
      // ignore
    } finally {
      setLoadingList(false);
    }
  }

  async function handleGenerate() {
    if (!title.trim()) return;
    setGenerating(true);
    setError('');
    setGenerated(null);
    try {
      const result = await generateArticle(title.trim());
      setGenerated(result);
    } catch (e: any) {
      setError(e.message || 'เกิดข้อผิดพลาดในการสร้างบทความ');
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!generated) return;
    setSaving(true);
    setError('');
    try {
      await saveArticle(generated);
      setSavedMsg('บันทึกสำเร็จ! บทความอยู่ใน Draft');
      await loadArticles();
      setTimeout(() => setSavedMsg(''), 4000);
    } catch (e: any) {
      setError(e.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish(row: BlogArticleRow) {
    try {
      await togglePublished(row.id, !row.published);
      setArticles(prev => prev.map(a => a.id === row.id ? { ...a, published: !a.published } : a));
    } catch {
      alert('ไม่สามารถเปลี่ยนสถานะได้');
    }
  }

  async function handleDelete(row: BlogArticleRow) {
    if (!confirm(`ลบ "${row.title}"?`)) return;
    try {
      await deleteArticle(row.id);
      setArticles(prev => prev.filter(a => a.id !== row.id));
    } catch {
      alert('ลบไม่สำเร็จ');
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">AI Article Generator</h1>
          <p className="text-gray-500 text-sm mt-1">สร้างบทความ AEO/SEO ด้วย Gemini AI พร้อม FAQ Schema</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'generator' ? 'bg-[#0f3460] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />สร้างบทความ
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'list' ? 'bg-[#0f3460] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <FileText className="w-4 h-4 inline mr-2" />บทความทั้งหมด ({articles.length})
          </button>
        </div>
      </div>

      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Left: Input Panel ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                หัวข้อบทความ
              </label>
              <textarea
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="เช่น: ทำไมผู้นำยุคใหม่ต้องมีทักษะ Facilitation&#10;หรือ: OKRs กับ KPI ต่างกันอย่างไร ใช้อะไรดีกว่ากัน"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={!title.trim() || generating}
                  className="flex-1 bg-[#0f3460] text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#1a4a7a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {generating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> กำลังสร้าง...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate บทความ</>
                  )}
                </button>
                {generated && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-[#c5a059] text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#e0c58e] hover:text-[#0f3460] disabled:opacity-40 transition-all"
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> กำลังบันทึก...</>
                    ) : (
                      <><Save className="w-4 h-4" /> บันทึกเป็น Draft</>
                    )}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {savedMsg && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <p className="text-sm text-green-700 font-bold">{savedMsg}</p>
              </div>
            )}

            {/* Quick tips */}
            <div className="bg-[#0f3460]/5 rounded-2xl p-5 border border-[#0f3460]/10">
              <p className="text-xs font-black text-[#0f3460] uppercase tracking-widest mb-3">หัวข้อแนะนำ</p>
              <div className="space-y-2">
                {[
                  'ทักษะ Emotional Intelligence ที่ผู้นำองค์กรไทยต้องมี',
                  'วิธีออกแบบ Learning Path สำหรับพนักงานใหม่',
                  'Agile Leadership คืออะไร และนำมาใช้ในองค์กรไทยได้อย่างไร',
                  'การสื่อสารในภาวะวิกฤตสำหรับผู้บริหาร',
                ].map(s => (
                  <button
                    key={s}
                    onClick={() => setTitle(s)}
                    className="block w-full text-left text-xs text-[#0f3460]/70 hover:text-[#c5a059] font-medium py-1.5 px-3 rounded-lg hover:bg-white transition-all"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Preview Panel ── */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {!generated && !generating && (
              <div className="h-full flex flex-col items-center justify-center py-24 text-center px-8">
                <div className="w-16 h-16 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-[#c5a059]" />
                </div>
                <p className="font-black text-gray-400 nav-font text-sm uppercase tracking-widest">Preview บทความ</p>
                <p className="text-gray-300 text-xs mt-2">ใส่หัวข้อและกด Generate</p>
              </div>
            )}

            {generating && (
              <div className="h-full flex flex-col items-center justify-center py-24">
                <Loader2 className="w-10 h-10 text-[#c5a059] animate-spin mb-4" />
                <p className="font-bold text-gray-500 text-sm">Gemini AI กำลังสร้างบทความ...</p>
                <p className="text-gray-400 text-xs mt-1">ใช้เวลาประมาณ 15-30 วินาที</p>
              </div>
            )}

            {generated && (
              <div className="overflow-y-auto max-h-[700px]">
                {/* Article header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest bg-[#c5a059]/10 px-2 py-1 rounded-md">AEO Format</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">/{generated.slug}</span>
                  </div>
                  <h2 className="font-black text-[#0f3460] text-lg leading-tight mb-3">{generated.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{generated.summary}</p>
                </div>

                {/* SEO */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">SEO</p>
                  <p className="text-xs font-bold text-[#0f3460] mb-1">{generated.seo?.meta_title}</p>
                  <p className="text-xs text-gray-500 mb-2">{generated.seo?.meta_description}</p>
                  <div className="flex flex-wrap gap-1">
                    {generated.seo?.keywords?.map(k => (
                      <span key={k} className="text-[9px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-md">{k}</span>
                    ))}
                  </div>
                </div>

                {/* Framework */}
                {generated.framework?.length > 0 && (
                  <div className="px-6 py-4 border-b border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Framework ({generated.framework.length} ขั้นตอน)</p>
                    <ol className="space-y-2">
                      {generated.framework.map((s, i) => (
                        <li key={i} className="flex gap-3 text-xs text-gray-600">
                          <span className="w-5 h-5 bg-[#0f3460]/10 text-[#0f3460] rounded-md flex items-center justify-center font-black text-[9px] shrink-0">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* FAQ */}
                {generated.faq?.length > 0 && (
                  <div className="px-6 py-4 border-b border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">FAQ ({generated.faq.length} ข้อ)</p>
                    <div className="space-y-2">
                      {generated.faq.map((f, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-bold text-[#0f3460] mb-1">Q: {f.question}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">A: {f.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                {generated.hashtags?.length > 0 && (
                  <div className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {generated.hashtags.map(t => (
                        <span key={t} className="text-[9px] font-bold text-[#0f3460]/60 bg-gray-100 px-2 py-1 rounded-md">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-black text-gray-700 text-sm">บทความทั้งหมด ({articles.length})</p>
            <button onClick={loadArticles} className="text-gray-400 hover:text-[#0f3460] transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {loadingList ? (
            <div className="py-16 flex justify-center">
              <Loader2 className="w-8 h-8 text-[#c5a059] animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold">ยังไม่มีบทความ</p>
              <button
                onClick={() => setActiveTab('generator')}
                className="mt-4 text-xs font-black text-[#c5a059] flex items-center gap-1 mx-auto"
              >
                <Plus className="w-3 h-3" /> สร้างบทความแรก
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {articles.map(row => (
                <div key={row.id} className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    {row.thumbnail ? (
                      <img src={row.thumbnail} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-gray-300" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${row.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          {row.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-[9px] text-gray-400">{new Date(row.created_at).toLocaleDateString('th-TH')}</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#0f3460] leading-tight truncate">{row.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">/{row.slug}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                        className="p-2 text-gray-400 hover:text-[#0f3460] transition-colors"
                        title="ดู Preview"
                      >
                        {expandedId === row.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {row.published && (
                        <Link
                          to={`/resources/${row.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-[#0f3460] transition-colors"
                          title="เปิดบทความ"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <button
                        onClick={() => handleTogglePublish(row)}
                        className={`p-2 transition-colors ${row.published ? 'text-green-500 hover:text-gray-400' : 'text-gray-300 hover:text-green-500'}`}
                        title={row.published ? 'Unpublish' : 'Publish'}
                      >
                        {row.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(row)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        title="ลบบทความ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded preview */}
                  {expandedId === row.id && (
                    <div className="mt-4 pl-[4.5rem] space-y-3">
                      <div className="bg-[#0f3460]/5 rounded-xl p-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Summary</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{row.content.summary}</p>
                      </div>
                      {row.content.faq?.length > 0 && (
                        <div className="text-xs text-gray-500">
                          <span className="font-bold">FAQ:</span> {row.content.faq.length} ข้อ ·
                          <span className="font-bold ml-1">Framework:</span> {row.content.framework?.length ?? 0} ขั้น
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardArticles;
