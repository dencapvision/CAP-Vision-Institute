import React, { useState, useEffect } from 'react';
import {
  Sparkles, Save, Eye, EyeOff, Trash2, ExternalLink,
  Loader2, CheckCircle2, AlertCircle, Plus, RefreshCw,
  ChevronDown, ChevronUp, FileText, Key, Settings, Zap, Check,
  Edit, Image as ImageIcon, X, Upload
} from 'lucide-react';
import { generateArticle, type GeneratedArticle } from '../../lib/services/ai-article-generator';
import {
  fetchAllArticles, saveArticle, updateArticle, togglePublished, deleteArticle,
  type BlogArticleRow
} from '../../lib/services/blog-articles';

const PRESET_IMAGES = [
  { label: 'Workshop & Team', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Leadership Meeting', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Creative Strategy', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Executive Mentoring', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Modern Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' }
];

const OFFICIAL_CATEGORIES = [
  { id: 'Leadership', label: 'Leadership (ผู้นำทีม)' },
  { id: 'Team & Culture', label: 'Team & Culture (วัฒนธรรม)' },
  { id: 'Modern HR', label: 'Modern HR (เทคโนโลยี/HR)' },
  { id: 'Self-Growth', label: 'Self-Growth (พัฒนาตนเอง)' },
  { id: 'Insight', label: 'Insight (บทความทั่วไป)' }
];

const DashboardArticles: React.FC = () => {
  const [title, setTitle] = useState('ทักษะ Emotional Intelligence ที่ผู้นำองค์กรไทยต้องมี');
  const [context, setContext] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Leadership');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generated, setGenerated] = useState<GeneratedArticle | null>(null);
  const [error, setError] = useState('');
  const [savedMsg, setSavedMsg] = useState('');
  const [articles, setArticles] = useState<BlogArticleRow[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState<'generator' | 'list'>('generator');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  // Edit Modal State
  const [editingArticle, setEditingArticle] = useState<BlogArticleRow | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editCategory, setEditCategory] = useState('Leadership');
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    loadArticles();
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gemini_api_key');
      if (stored) setApiKey(stored);
    }
  }, []);

  async function loadArticles() {
    setLoadingList(true);
    try {
      const data = await fetchAllArticles();
      setArticles(data || []);
    } catch (e) {
      console.error('Error loading articles:', e);
    } finally {
      setLoadingList(false);
    }
  }

  function handleSaveApiKey(e: React.FormEvent) {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2500);
    }
  }

  async function handleGenerate() {
    if (!title.trim()) return;
    setGenerating(true);
    setError('');
    setGenerated(null);
    try {
      const result = await generateArticle(title.trim(), context.trim(), apiKey.trim());
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
      await saveArticle(generated, selectedCategory);
      setSavedMsg(`บันทึกสำเร็จ! บทความจัดอยู่ในหมวดหมู่ "${selectedCategory}"`);
      await loadArticles();
      setTimeout(() => setSavedMsg(''), 5000);
    } catch (e: any) {
      setError(e.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  }

  function openEditModal(row: BlogArticleRow) {
    setEditingArticle(row);
    setEditTitle(row.title);
    setEditThumbnail(row.thumbnail || row.content?.images?.[0]?.url || '');
    setEditSummary(row.content?.summary || '');
    setEditCategory(row.category || 'Leadership');
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingArticle) return;
    setEditSaving(true);

    try {
      const updatedContent: GeneratedArticle = {
        ...editingArticle.content,
        title: editTitle,
        summary: editSummary,
        images: [
          {
            url: editThumbnail,
            alt: editTitle,
            title: editTitle,
            description: editSummary
          },
          ...(editingArticle.content.images?.slice(1) || [])
        ]
      };

      await updateArticle(editingArticle.id, {
        content: updatedContent,
        category: editCategory,
        thumbnail: editThumbnail,
        published: editingArticle.published
      });

      setArticles(prev => prev.map(a => a.id === editingArticle.id ? {
        ...a,
        title: editTitle,
        thumbnail: editThumbnail,
        category: editCategory,
        content: updatedContent
      } : a));

      setEditingArticle(null);
    } catch (err: any) {
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + (err.message || err));
    } finally {
      setEditSaving(false);
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
    if (!confirm(`คุณแน่ใจว่าต้องการลบบทความ "${row.title}"?`)) return;
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">AI Article Generator & Editor</h1>
          <p className="text-gray-500 text-sm mt-1">สร้างและจัดการบทความ AEO/SEO ภาพประกอบ และ FAQ Schema</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-gray-200 text-gray-700 hover:border-[#c5a059] transition-all shadow-xs"
          >
            <Key className="w-3.5 h-3.5 text-[#c5a059]" />
            {apiKey ? 'API Key (บันทึกแล้ว)' : 'ตั้งค่า Gemini API Key'}
          </button>
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

      {/* Optional Gemini API Key Drawer */}
      {showKeyConfig && (
        <div className="bg-gradient-to-r from-gray-900 via-[#0f3460] to-gray-900 text-white rounded-2xl p-6 shadow-xl border border-white/10 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Key className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-bold text-base">Google Gemini API Key (ฟรี)</h3>
            </div>
            <button onClick={() => setShowKeyConfig(false)} className="text-white/60 hover:text-white text-xs">ปิด ✕</button>
          </div>
          <p className="text-xs text-gray-300 mb-4 leading-relaxed max-w-2xl font-light">
            คุณสามารถนำ Gemini API Key จาก <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#F59E0B] underline font-bold">Google AI Studio (ฟรี)</a> มาใส่ตรงนี้เพื่อสั่งการ AI เจนบทความสดแบบ Realtime ได้ไม่จำกัด (หากไม่ใส่ ระบบจะใช้ Domain Knowledge Engine ของสถาบันในการสร้างเนื้อหาอัตโนมัติ)
          </p>
          <form onSubmit={handleSaveApiKey} className="flex gap-3 max-w-xl">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="วาง API Key เช่น AIzaSy..."
              className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F59E0B]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-bold text-sm rounded-xl flex items-center gap-2"
            >
              {keySaved ? <><Check className="w-4 h-4" /> บันทึกแล้ว</> : 'บันทึก Key'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Left: Input Panel ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                หัวข้อบทความที่ต้องการ
              </label>
              <textarea
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="เช่น: ทักษะ Emotional Intelligence ที่ผู้นำองค์กรไทยต้องมี"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none mb-3"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5">
                    หมวดหมู่ความรู้ *
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f3460] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  >
                    {OFFICIAL_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5">
                    บริบทเพิ่มเติม (Optional)
                  </label>
                  <input
                    type="text"
                    value={context}
                    onChange={e => setContext(e.target.value)}
                    placeholder="เช่น เน้นผู้นำระดับกลาง"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!title.trim() || generating}
                  className="flex-1 bg-[#0f3460] hover:bg-[#1a4a8a] text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                >
                  {generating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> กำลังประมวลผลบทความ...</>
                  ) : (
                    <><Sparkles className="w-4 h-4 text-[#F59E0B]" /> สร้างบทความทันที (1-Click)</>
                  )}
                </button>
                {generated && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-[#c5a059] hover:bg-[#b8924d] text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 disabled:opacity-40 transition-all shadow-md active:scale-95"
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> กำลังบันทึก...</>
                    ) : (
                      <><Save className="w-4 h-4" /> บันทึกบทความ</>
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
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <p className="text-sm text-emerald-800 font-bold">{savedMsg}</p>
              </div>
            )}

            {/* Quick Presets */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80">
              <p className="text-xs font-black text-[#0f3460] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                หัวข้อยอดนิยมแนะนำ (คลิกเพื่อเลือก)
              </p>
              <div className="space-y-2">
                {[
                  'ทักษะ Emotional Intelligence ที่ผู้นำองค์กรไทยต้องมี',
                  'วิธีสร้าง Psychological Safety ในทีมเพื่อทลาย Silo',
                  'Facilitative Leadership: ศิลปะการนำทีมโดยไม่ใช้อำนาจสั่งการ',
                  'Creative Problem Solving (CPS Model): การคิดค้นนวัตกรรมองค์กร',
                  'การปรับวัฒนธรรมองค์กรสู่ Growth Mindset อย่างยั่งยืน',
                ].map(s => (
                  <button
                    key={s}
                    onClick={() => setTitle(s)}
                    className="block w-full text-left text-xs text-gray-700 hover:text-[#0f3460] hover:bg-white font-medium py-2 px-3 rounded-lg border border-transparent hover:border-gray-200 transition-all"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Preview Panel ── */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {!generated && !generating && (
              <div className="h-full flex flex-col items-center justify-center py-24 text-center px-8">
                <div className="w-16 h-16 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-[#c5a059]" />
                </div>
                <p className="font-black text-gray-400 nav-font text-sm uppercase tracking-widest">Preview บทความ</p>
                <p className="text-gray-400 text-xs mt-2">ใส่หัวข้อและกดสร้างบทความ</p>
              </div>
            )}

            {generating && (
              <div className="h-full flex flex-col items-center justify-center py-24">
                <Loader2 className="w-10 h-10 text-[#c5a059] animate-spin mb-4" />
                <p className="font-bold text-gray-700 text-sm">กำลังประมวลผลและสร้างเนื้อหา AEO/SEO...</p>
                <p className="text-gray-400 text-xs mt-1">สร้างโครงสร้าง Framework, Case Study และ FAQ</p>
              </div>
            )}

            {generated && (
              <div className="overflow-y-auto max-h-[700px]">
                {/* Header Image Selection */}
                <div className="relative h-48 bg-gray-100 overflow-hidden group">
                  {generated.images?.[0]?.url ? (
                    <img
                      src={generated.images[0].url}
                      alt={generated.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      <ImageIcon className="w-8 h-8 opacity-40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white w-full">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] mb-1">ภาพปกบทความ</p>
                      <input
                        type="url"
                        value={generated.images?.[0]?.url || ''}
                        onChange={(e) => {
                          const url = e.target.value;
                          setGenerated({
                            ...generated,
                            images: [{ url, alt: generated.title, title: generated.title, description: '' }]
                          });
                        }}
                        placeholder="วาง URL รูปภาพปกที่ต้องการ..."
                        className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Presets for Image */}
                <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-[11px]">
                  <span className="text-gray-500 font-bold shrink-0">เลือกภาพแนะนำ:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => {
                        setGenerated({
                          ...generated,
                          images: [{ url: img.url, alt: generated.title, title: generated.title, description: '' }]
                        });
                      }}
                      className="shrink-0 px-2.5 py-1 rounded-md bg-white border border-gray-200 hover:border-[#c5a059] text-gray-700 hover:text-[#0f3460] font-medium transition-all"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>

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
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">SEO & Metadata</p>
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
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
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
                <div key={row.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="relative group/thumb cursor-pointer" onClick={() => openEditModal(row)}>
                      {row.thumbnail ? (
                        <img src={row.thumbnail} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100 shadow-xs" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                        เปลี่ยนภาพ
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${row.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                          {row.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-[9px] text-gray-400">{new Date(row.created_at).toLocaleDateString('th-TH')}</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#0f3460] leading-tight truncate">{row.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">/{row.slug}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openEditModal(row)}
                        className="p-2 text-gray-500 hover:text-[#0f3460] hover:bg-gray-100 rounded-lg transition-colors"
                        title="แก้ไขบทความ / เปลี่ยนภาพประกอบ"
                      >
                        <Edit className="w-4 h-4 text-[#c5a059]" />
                      </button>

                      <button
                        onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                        className="p-2 text-gray-400 hover:text-[#0f3460] hover:bg-gray-100 rounded-lg transition-colors"
                        title="ดู Preview"
                      >
                        {expandedId === row.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {row.published && (
                        <a
                          href={`/resources/${row.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-gray-400 hover:text-[#0f3460] hover:bg-gray-100 rounded-lg transition-colors"
                          title="เปิดดูบทความจริง"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        onClick={() => handleTogglePublish(row)}
                        className={`p-2 rounded-lg transition-colors ${row.published ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-300 hover:text-emerald-600 hover:bg-gray-100'}`}
                        title={row.published ? 'คลิกเพื่อเปลี่ยนเป็น Draft' : 'คลิกเพื่อเผยแพร่ (Publish)'}
                      >
                        {row.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleDelete(row)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="ลบบทความ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded preview */}
                  {expandedId === row.id && (
                    <div className="mt-4 pl-20 space-y-3">
                      <div className="bg-[#0f3460]/5 rounded-xl p-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Summary</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{row.content?.summary}</p>
                      </div>
                      {row.content?.faq?.length > 0 && (
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

      {/* Edit Article & Image Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#c5a059]" />
                <h2 className="text-lg font-black text-[#0f3460]">แก้ไขบทความ & ภาพประกอบ</h2>
              </div>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Image Preview & URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">รูปภาพปกบทความ (Thumbnail URL) *</label>
                <div className="relative h-44 bg-gray-100 rounded-2xl overflow-hidden mb-2 border border-gray-200">
                  {editThumbnail ? (
                    <img src={editThumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      <ImageIcon className="w-8 h-8 opacity-30" />
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  required
                  value={editThumbnail}
                  onChange={(e) => setEditThumbnail(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none"
                />

                {/* Preset image suggestions */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-400 font-bold">เลือกภาพแนะนำ:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setEditThumbnail(img.url)}
                      className="px-2.5 py-1 rounded-md text-[10px] bg-gray-100 hover:bg-[#c5a059] hover:text-white font-bold text-gray-600 transition-colors"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">หัวข้อบทความ *</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">หมวดหมู่ความรู้ *</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm font-bold text-[#0f3460] border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none"
                >
                  {OFFICIAL_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">สรุปเนื้อหาบทความ (Summary)</label>
                <textarea
                  rows={3}
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#0f3460] text-white hover:bg-[#1a4a8a] disabled:opacity-50 flex items-center gap-2"
                >
                  {editSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardArticles;
