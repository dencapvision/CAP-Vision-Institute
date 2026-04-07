import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Sparkles, Save, Eye, ArrowLeft, Loader2, CheckCircle2,
  AlertCircle, Plus, Trash2, ChevronDown, ChevronUp,
  BarChart3, RefreshCw, ExternalLink
} from 'lucide-react';
import { generateArticle, type GeneratedArticle, type ArticleFAQ } from '../../services/ai-article-generator';
import {
  saveArticle, fetchArticleById, updateArticle, togglePublished,
  type BlogArticleRow
} from '../../services/blog-articles';

// ── SEO Analyzer ──────────────────────────────────────────────────────────────
interface SEOResult { score: number; issues: string[]; suggestions: string[]; passed: string[] }

function analyzeSEO(a: Partial<GeneratedArticle>): SEOResult {
  const issues: string[] = [], suggestions: string[] = [], passed: string[] = [];
  let score = 0;

  // Meta Title (15 pts)
  if (a.seo?.meta_title) {
    const l = a.seo.meta_title.length;
    if (l <= 60) { score += 15; passed.push(`Meta Title ✓ (${l} ตัว)`); }
    else { score += 8; suggestions.push(`Meta Title ยาว ${l} ตัว (ควร ≤60)`); }
  } else issues.push('ไม่มี Meta Title');

  // Meta Description (15 pts)
  if (a.seo?.meta_description) {
    const l = a.seo.meta_description.length;
    if (l >= 130 && l <= 165) { score += 15; passed.push(`Meta Description ✓ (${l} ตัว)`); }
    else if (l < 130) { score += 7; suggestions.push(`Meta Description สั้นเกินไป (${l} ตัว ควร 130-165)`); }
    else { score += 8; suggestions.push(`Meta Description ยาวเกินไป (${l} ตัว)`); }
  } else issues.push('ไม่มี Meta Description');

  // Keywords (10 pts)
  const kwCount = a.seo?.keywords?.length ?? 0;
  if (kwCount >= 5) { score += 10; passed.push(`Keywords ✓ (${kwCount} คำ)`); }
  else { score += kwCount * 2; suggestions.push(`มี Keywords ${kwCount} คำ (ควร ≥5)`); }

  // Summary AEO (15 pts)
  const sumLen = a.summary?.length ?? 0;
  if (sumLen >= 100) { score += 15; passed.push('Summary ✓ Answer-first AEO'); }
  else if (sumLen > 0) { score += 7; suggestions.push(`Summary สั้นเกินไป (${sumLen} ตัว ควร ≥100)`); }
  else issues.push('ไม่มี Summary — สำคัญมากสำหรับ AEO');

  // FAQ (15 pts)
  const faqCount = a.faq?.length ?? 0;
  if (faqCount >= 3) { score += 15; passed.push(`FAQ ✓ ${faqCount} ข้อ (JSON-LD ready)`); }
  else if (faqCount > 0) { score += 5; suggestions.push(`FAQ แค่ ${faqCount} ข้อ (ควร ≥3)`); }
  else issues.push('ไม่มี FAQ — ขาด AEO schema');

  // Framework (10 pts)
  const fwCount = a.framework?.length ?? 0;
  if (fwCount >= 3) { score += 10; passed.push(`Framework ✓ ${fwCount} ขั้นตอน`); }
  else suggestions.push(`Framework มีแค่ ${fwCount} ขั้น (ควร ≥3)`);

  // Case Study (10 pts)
  if ((a.case_study?.length ?? 0) > 80) { score += 10; passed.push('Case Study ✓'); }
  else suggestions.push('เพิ่ม Case Study จากองค์กรจริง');

  // Image (5 pts)
  if (a.images?.length) { score += 5; passed.push('Thumbnail ✓'); }
  else suggestions.push('เพิ่ม Thumbnail image');

  // CTA (5 pts)
  if ((a.cta?.length ?? 0) > 20) { score += 5; passed.push('CTA ✓'); }
  else suggestions.push('เพิ่ม Call-to-Action');

  return { score: Math.min(100, score), issues, suggestions, passed };
}

const SCORE_COLOR = (s: number) =>
  s >= 80 ? 'text-green-600' : s >= 60 ? 'text-amber-500' : 'text-red-500';
const SCORE_BG = (s: number) =>
  s >= 80 ? 'bg-green-50 border-green-200' : s >= 60 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

const CATEGORIES = ['Leadership', 'Communication', 'Team', 'Modern HR', 'Mindset', 'Self-Growth', 'Insight'];

// ── Article Preview ───────────────────────────────────────────────────────────
const ArticlePreview: React.FC<{ article: Partial<GeneratedArticle>; thumbnail: string }> = ({ article, thumbnail }) => {
  if (!article.title && !article.summary) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-300">
        <Eye className="w-12 h-12 mb-3 opacity-30" />
        <p className="font-bold text-sm">Live Preview</p>
        <p className="text-xs mt-1">Preview จะแสดงหลัง Generate</p>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6 text-sm">
      {/* Title */}
      <div>
        {thumbnail && <img src={thumbnail} alt="" className="w-full h-40 object-cover rounded-2xl mb-4" onError={e => (e.currentTarget.style.display = 'none')} />}
        <h1 className="text-xl font-black text-[#0f3460] nav-font leading-tight">{article.title}</h1>
      </div>

      {/* Summary */}
      {article.summary && (
        <div className="bg-[#0f3460] text-white rounded-xl p-5">
          <p className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest mb-2">Answer-first Summary</p>
          <p className="text-sm leading-relaxed text-white/90">{article.summary}</p>
        </div>
      )}

      {/* Context */}
      {article.context && (
        <div>
          <p className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-0.5 h-3 bg-[#c5a059] rounded-full inline-block" /> Context
          </p>
          {article.context.split('\n\n').filter(Boolean).map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-2">{p}</p>
          ))}
        </div>
      )}

      {/* Framework */}
      {article.framework && article.framework.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Framework</p>
          <ol className="space-y-2">
            {article.framework.map((step, i) => (
              <li key={i} className="flex gap-3 text-xs text-gray-600">
                <span className="w-5 h-5 bg-[#0f3460] text-white rounded-md flex items-center justify-center font-black text-[9px] shrink-0">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* FAQ */}
      {article.faq && article.faq.length > 0 && (
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">FAQ ({article.faq.length} ข้อ)</p>
          <div className="space-y-2">
            {article.faq.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <p className="font-bold text-[#0f3460] text-xs mb-1">Q: {f.question}</p>
                <p className="text-gray-500 text-xs leading-relaxed">A: {f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Takeaways */}
      {article.takeaways && article.takeaways.length > 0 && (
        <div className="bg-[#0f3460]/5 rounded-xl p-4">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Takeaways</p>
          <ul className="space-y-2">
            {article.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" /> {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      {article.cta && (
        <div className="bg-gray-900 text-white rounded-xl p-5">
          <p className="text-xs font-bold text-[#c5a059] mb-2">CTA</p>
          <p className="text-xs text-white/80 leading-relaxed">{article.cta}</p>
        </div>
      )}

      {/* SEO */}
      {article.seo && (
        <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">SEO Meta</p>
          <p className="text-xs font-bold text-[#0f3460] mb-1">{article.seo.meta_title}</p>
          <p className="text-xs text-gray-500 mb-2">{article.seo.meta_description}</p>
          <div className="flex flex-wrap gap-1">
            {article.seo.keywords?.map(k => (
              <span key={k} className="text-[9px] bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">{k}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Editor ───────────────────────────────────────────────────────────────
const DashboardBlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Generation inputs
  const [genTitle, setGenTitle] = useState('');
  const [genCategory, setGenCategory] = useState('Leadership');
  const [genContext, setGenContext] = useState('');

  // Article state
  const [article, setArticle] = useState<Partial<GeneratedArticle>>({});
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('Leadership');
  const [rowId, setRowId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);

  // UI state
  const [tab, setTab] = useState<'generate' | 'edit' | 'seo'>('generate');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [error, setError] = useState('');
  const [seoResult, setSeoResult] = useState<SEOResult | null>(null);
  const [loadingArticle, setLoadingArticle] = useState(isEdit);

  // Load existing article
  useEffect(() => {
    if (!id) return;
    fetchArticleById(id).then(row => {
      if (row) {
        setArticle(row.content);
        setThumbnail(row.thumbnail);
        setCategory(row.category);
        setRowId(row.id);
        setIsPublished(row.published);
        setGenTitle(row.title);
        setSeoResult(analyzeSEO(row.content));
        setTab('edit');
      }
      setLoadingArticle(false);
    });
  }, [id]);

  const updateField = useCallback(<K extends keyof GeneratedArticle>(field: K, value: GeneratedArticle[K]) => {
    setArticle(prev => {
      const updated = { ...prev, [field]: value };
      setSeoResult(analyzeSEO(updated));
      return updated;
    });
  }, []);

  const handleGenerate = async () => {
    if (!genTitle.trim()) return;
    setGenerating(true);
    setError('');
    try {
      const result = await generateArticle(genTitle.trim(), genContext.trim() || undefined);
      setArticle(result);
      setCategory(genCategory);
      setThumbnail(result.images?.[0]?.url ?? '');
      setSeoResult(analyzeSEO(result));
      setTab('edit');
    } catch (e: any) {
      setError(e.message || 'เกิดข้อผิดพลาด');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async (publish = false) => {
    if (!article.title) return;
    setSaving(true);
    setError('');
    try {
      const full = { ...article } as GeneratedArticle;
      if (rowId) {
        await updateArticle(rowId, { content: full, category, thumbnail, published: publish });
        setIsPublished(publish);
      } else {
        const saved = await saveArticle(full);
        setRowId(saved.id);
        if (publish) { await togglePublished(saved.id, true); setIsPublished(true); }
        navigate(`/dashboard/blog/edit/${saved.id}`, { replace: true });
      }
      setSaveMsg(publish ? 'Published!' : 'บันทึก Draft แล้ว');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (e: any) {
      setError(e.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  };

  if (loadingArticle) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#c5a059] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -m-6 lg:-m-8">
      {/* ── Top Bar ── */}
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200 shrink-0">
        <Link to="/dashboard/blog" className="text-gray-400 hover:text-[#0f3460] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {(['generate', 'edit', 'seo'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${tab === t ? 'bg-white text-[#0f3460] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t === 'generate' && <Sparkles className="w-3 h-3" />}
              {t === 'edit' && <RefreshCw className="w-3 h-3" />}
              {t === 'seo' && <BarChart3 className="w-3 h-3" />}
              {t === 'generate' ? 'Generate' : t === 'edit' ? 'Edit' : `SEO${seoResult ? ` ${seoResult.score}` : ''}`}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Status */}
        {isPublished && rowId && (
          <a href={`/resources/${article.slug}`} target="_blank" className="text-xs font-bold text-green-600 flex items-center gap-1 hover:underline">
            <ExternalLink className="w-3 h-3" /> Published
          </a>
        )}
        {saveMsg && (
          <span className="text-xs font-bold text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {saveMsg}
          </span>
        )}
        {error && (
          <span className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {error}
          </span>
        )}

        <button
          onClick={() => handleSave(false)}
          disabled={saving || !article.title}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-black hover:bg-gray-200 disabled:opacity-40 transition-all flex items-center gap-1.5"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          Draft
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving || !article.title}
          className="px-4 py-2 bg-[#0f3460] text-white rounded-xl text-xs font-black hover:bg-[#1a4a7a] disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Eye className="w-3 h-3" />}
          Publish
        </button>
      </div>

      {/* ── Split Screen ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Editor Panel */}
        <div className="w-1/2 overflow-y-auto border-r border-gray-200 bg-white">
          {/* ── GENERATE TAB ── */}
          {tab === 'generate' && (
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">หัวข้อบทความ *</label>
                <input
                  value={genTitle}
                  onChange={e => setGenTitle(e.target.value)}
                  placeholder="เช่น: ทักษะ Emotional Intelligence ที่ผู้นำต้องมี"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">หมวดหมู่</label>
                <select
                  value={genCategory}
                  onChange={e => setGenCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Context / Pain Point <span className="text-gray-300 font-normal normal-case">(ไม่บังคับ — ช่วยให้ AI ตรงประเด็นมากขึ้น)</span>
                </label>
                <textarea
                  value={genContext}
                  onChange={e => setGenContext(e.target.value)}
                  placeholder="เช่น: องค์กรขนาดกลางในไทยมีปัญหาผู้นำไม่กล้าตัดสินใจ ทีมขาดความมั่นใจ..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!genTitle.trim() || generating}
                className="w-full bg-[#0f3460] text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#1a4a7a] disabled:opacity-40 transition-all"
              >
                {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Gemini AI กำลังสร้าง...</> : <><Sparkles className="w-4 h-4" /> Generate Article</>}
              </button>

              {/* Quick topics */}
              <div className="bg-[#0f3460]/5 rounded-xl p-4">
                <p className="text-[10px] font-black text-[#0f3460] uppercase tracking-widest mb-3">หัวข้อแนะนำ</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    'ทักษะ Emotional Intelligence ที่ผู้นำองค์กรไทยต้องมี',
                    'วิธีออกแบบ Learning Path สำหรับพนักงานใหม่',
                    'Agile Leadership คืออะไร ใช้ในองค์กรไทยได้อย่างไร',
                    'การสื่อสารในภาวะวิกฤตสำหรับผู้บริหาร',
                    'Facilitation Skills ทำให้ประชุมมีประสิทธิภาพอย่างไร',
                    'Psychological Safety คืออะไร ทำไมทีมต้องมี',
                  ].map(s => (
                    <button key={s} onClick={() => setGenTitle(s)}
                      className="text-left text-xs text-[#0f3460]/70 hover:text-[#c5a059] font-medium py-2 px-3 rounded-lg hover:bg-white transition-all"
                    >+ {s}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── EDIT TAB ── */}
          {tab === 'edit' && (
            <div className="p-6 space-y-6">
              {!article.title && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs font-bold text-amber-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> Generate บทความก่อน หรือจะเขียนเองก็ได้
                </div>
              )}

              {/* Title & Meta */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Title</label>
                  <input value={article.title ?? ''} onChange={e => updateField('title', e.target.value)}
                    placeholder="ชื่อบทความ" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Slug</label>
                    <input value={article.slug ?? ''} onChange={e => updateField('slug', e.target.value)}
                      placeholder="article-slug" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">หมวด</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Thumbnail URL</label>
                  <input value={thumbnail} onChange={e => setThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]" />
                </div>
              </div>

              {/* Summary */}
              <EditSection label="Summary (AEO — ตอบตรง)" hint="ตอบคำถามทันที ≥100 ตัวอักษร">
                <textarea value={article.summary ?? ''} onChange={e => updateField('summary', e.target.value)}
                  rows={3} placeholder="Answer-first summary..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none" />
              </EditSection>

              {/* Context */}
              <EditSection label="Context (ทำไมเรื่องนี้สำคัญ)">
                <textarea value={article.context ?? ''} onChange={e => updateField('context', e.target.value)}
                  rows={4} placeholder="Pain + Situation..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none" />
              </EditSection>

              {/* Insight */}
              <EditSection label="Insight (CAP Vision Methodology)">
                <textarea value={article.insight ?? ''} onChange={e => updateField('insight', e.target.value)}
                  rows={4} placeholder="CAP Theory + Transformative Learning..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none" />
              </EditSection>

              {/* Framework */}
              <EditSection label={`Framework (${article.framework?.length ?? 0} ขั้น)`}>
                <div className="space-y-2">
                  {(article.framework ?? []).map((step, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="w-5 h-5 bg-[#0f3460]/10 text-[#0f3460] rounded-md flex items-center justify-center font-black text-[9px] shrink-0 mt-2">{i + 1}</span>
                      <input value={step} onChange={e => {
                        const fw = [...(article.framework ?? [])];
                        fw[i] = e.target.value;
                        updateField('framework', fw);
                      }} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]" />
                      <button onClick={() => {
                        const fw = (article.framework ?? []).filter((_, idx) => idx !== i);
                        updateField('framework', fw);
                      }} className="text-gray-300 hover:text-red-400 transition-colors mt-2"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <button onClick={() => updateField('framework', [...(article.framework ?? []), ''])}
                    className="text-xs font-bold text-[#c5a059] flex items-center gap-1 hover:underline mt-1">
                    <Plus className="w-3 h-3" /> เพิ่มขั้นตอน
                  </button>
                </div>
              </EditSection>

              {/* Application */}
              <EditSection label="Application (นำไปใช้อย่างไร)">
                <textarea value={article.application ?? ''} onChange={e => updateField('application', e.target.value)}
                  rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none" />
              </EditSection>

              {/* Case Study */}
              <EditSection label="Case Study">
                <textarea value={article.case_study ?? ''} onChange={e => updateField('case_study', e.target.value)}
                  rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none" />
              </EditSection>

              {/* Takeaways */}
              <EditSection label={`Takeaways (${article.takeaways?.length ?? 0} ข้อ)`}>
                <div className="space-y-2">
                  {(article.takeaways ?? []).map((t, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <input value={t} onChange={e => {
                        const arr = [...(article.takeaways ?? [])];
                        arr[i] = e.target.value;
                        updateField('takeaways', arr);
                      }} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]" />
                      <button onClick={() => updateField('takeaways', (article.takeaways ?? []).filter((_, idx) => idx !== i))}
                        className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <button onClick={() => updateField('takeaways', [...(article.takeaways ?? []), ''])}
                    className="text-xs font-bold text-[#c5a059] flex items-center gap-1 hover:underline mt-1">
                    <Plus className="w-3 h-3" /> เพิ่ม Takeaway
                  </button>
                </div>
              </EditSection>

              {/* FAQ */}
              <EditSection label={`FAQ (${article.faq?.length ?? 0} ข้อ)`}>
                <div className="space-y-3">
                  {(article.faq ?? []).map((f, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                      <div className="flex gap-2 items-start">
                        <span className="text-[9px] font-black text-gray-400 mt-2.5 w-4 shrink-0">Q</span>
                        <input value={f.question} onChange={e => {
                          const arr: ArticleFAQ[] = [...(article.faq ?? [])];
                          arr[i] = { ...arr[i], question: e.target.value };
                          updateField('faq', arr);
                        }} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] bg-white" />
                        <button onClick={() => updateField('faq', (article.faq ?? []).filter((_, idx) => idx !== i))}
                          className="text-gray-300 hover:text-red-400 transition-colors mt-2"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="text-[9px] font-black text-gray-400 mt-2.5 w-4 shrink-0">A</span>
                        <textarea value={f.answer} onChange={e => {
                          const arr: ArticleFAQ[] = [...(article.faq ?? [])];
                          arr[i] = { ...arr[i], answer: e.target.value };
                          updateField('faq', arr);
                        }} rows={2} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none bg-white" />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => updateField('faq', [...(article.faq ?? []), { question: '', answer: '' }])}
                    className="text-xs font-bold text-[#c5a059] flex items-center gap-1 hover:underline">
                    <Plus className="w-3 h-3" /> เพิ่ม FAQ
                  </button>
                </div>
              </EditSection>

              {/* CTA */}
              <EditSection label="CTA">
                <textarea value={article.cta ?? ''} onChange={e => updateField('cta', e.target.value)}
                  rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none" />
              </EditSection>

              {/* SEO Meta */}
              <EditSection label="SEO Meta">
                <div className="space-y-2">
                  <input value={article.seo?.meta_title ?? ''} onChange={e => updateField('seo', { ...article.seo, meta_title: e.target.value } as any)}
                    placeholder="Meta Title (≤60 chars)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]" />
                  <textarea value={article.seo?.meta_description ?? ''} onChange={e => updateField('seo', { ...article.seo, meta_description: e.target.value } as any)}
                    rows={2} placeholder="Meta Description (130-165 chars)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none" />
                  <input value={article.seo?.keywords?.join(', ') ?? ''} onChange={e => updateField('seo', { ...article.seo, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) } as any)}
                    placeholder="keyword1, keyword2, keyword3..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]" />
                </div>
              </EditSection>
            </div>
          )}

          {/* ── SEO TAB ── */}
          {tab === 'seo' && (
            <div className="p-6 space-y-5">
              {!seoResult ? (
                <div className="text-center py-12 text-gray-400">
                  <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-bold">Generate หรือ Edit บทความก่อน</p>
                </div>
              ) : (
                <>
                  {/* Score */}
                  <div className={`rounded-2xl border p-6 ${SCORE_BG(seoResult.score)}`}>
                    <div className="flex items-center gap-4">
                      <div className={`text-5xl font-black ${SCORE_COLOR(seoResult.score)}`}>{seoResult.score}</div>
                      <div>
                        <p className="font-black text-gray-700 text-sm">SEO Score</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {seoResult.score >= 80 ? 'พร้อม Publish' : seoResult.score >= 60 ? 'ควรปรับก่อน Publish' : 'ต้องปรับปรุงก่อน'}
                        </p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-4 h-2 bg-white/60 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${seoResult.score >= 80 ? 'bg-green-500' : seoResult.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${seoResult.score}%` }} />
                    </div>
                  </div>

                  {/* Issues */}
                  {seoResult.issues.length > 0 && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" /> ปัญหาที่ต้องแก้ ({seoResult.issues.length})
                      </p>
                      <ul className="space-y-1.5">
                        {seoResult.issues.map((issue, i) => (
                          <li key={i} className="text-xs text-red-600 font-medium flex items-start gap-2">
                            <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 shrink-0" /> {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {seoResult.suggestions.length > 0 && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">
                        คำแนะนำ ({seoResult.suggestions.length})
                      </p>
                      <ul className="space-y-1.5">
                        {seoResult.suggestions.map((s, i) => (
                          <li key={i} className="text-xs text-amber-700 font-medium flex items-start gap-2">
                            <span className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 shrink-0" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Passed */}
                  {seoResult.passed.length > 0 && (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-3">
                        ผ่านแล้ว ({seoResult.passed.length})
                      </p>
                      <ul className="space-y-1.5">
                        {seoResult.passed.map((p, i) => (
                          <li key={i} className="text-xs text-green-700 font-medium flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button onClick={() => setTab('edit')}
                    className="w-full border-2 border-[#0f3460]/20 text-[#0f3460] py-2.5 rounded-xl text-xs font-black hover:border-[#c5a059] hover:text-[#c5a059] transition-all">
                    แก้ไขบทความ →
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Live Preview */}
        <div className="w-1/2 overflow-y-auto bg-gray-50">
          <div className="sticky top-0 bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between z-10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Eye className="w-3 h-3" /> Live Preview
            </span>
            {seoResult && (
              <span className={`text-[10px] font-black ${SCORE_COLOR(seoResult.score)}`}>
                SEO {seoResult.score}/100
              </span>
            )}
          </div>
          <ArticlePreview article={article} thumbnail={thumbnail} />
        </div>
      </div>
    </div>
  );
};

// Helper: collapsible section
const EditSection: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
        <div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
          {hint && <span className="text-[9px] text-gray-400 ml-2">{hint}</span>}
        </div>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

export default DashboardBlogEditor;
