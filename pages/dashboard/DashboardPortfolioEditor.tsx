import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Plus, Trash2, Loader2,
  Sparkles, CheckCircle2, AlertCircle, Image as ImageIcon, X, Upload
} from 'lucide-react';
import { generateCaption } from '../../services/ai-caption-generator';
import {
  createPortfolioAdmin, updatePortfolioAdmin,
  fetchPortfolioForEdit, fetchCoursesForSelect, slugify, uploadPortfolioImage,
  type PortfolioFormData, type PortfolioImageInput,
} from '../../services/portfolio-admin';

const CATEGORIES = ['Leadership', 'Team', 'Communication', 'Mindset', 'Work Skills'];

interface ImageRow extends PortfolioImageInput { _generating?: boolean; _uploading?: boolean }

const DashboardPortfolioEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Form state
  const [form, setForm] = useState<PortfolioFormData>({
    title: '', slug: '', organization: '', course_name: '',
    category: 'Leadership', description_short: '',
    description_full: '', result: '', keywords: [], cover_image: '',
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [images, setImages] = useState<ImageRow[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [courses, setCourses] = useState<{ id: string; title: string; category: string }[]>([]);

  // UI state
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    fetchCoursesForSelect().then(setCourses);
    if (!id) return;
    fetchPortfolioForEdit(id).then(data => {
      if (data) {
        const p = data.portfolio;
        setForm({
          title: p.title, slug: p.slug, organization: p.organization,
          course_name: p.course_name, category: p.category,
          description_short: p.description_short, description_full: p.description_full,
          result: p.result, keywords: p.keywords ?? [], cover_image: p.cover_image ?? '',
        });
        setKeywordInput((p.keywords ?? []).join(', '));
        setImages(data.images.map((img, i) => ({
          image_url: img.image_url, caption: img.caption, sort_order: img.sort_order ?? i,
        })));
        setSelectedCourseIds(data.courseIds);
      }
      setLoading(false);
    });
  }, [id]);

  const setField = (k: keyof PortfolioFormData, v: any) => {
    setForm(prev => {
      const updated = { ...prev, [k]: v };
      if (k === 'title' && !isEdit) updated.slug = slugify(v);
      return updated;
    });
  };

  const addImage = () => setImages(prev => [...prev, { image_url: '', caption: '', sort_order: prev.length }]);

  const updateImage = (i: number, field: keyof ImageRow, value: any) =>
    setImages(prev => prev.map((img, idx) => idx === i ? { ...img, [field]: value } : img));

  const removeImage = (i: number) =>
    setImages(prev => prev.filter((_, idx) => idx !== i).map((img, idx) => ({ ...img, sort_order: idx })));

  const handleGenerateCaption = async (i: number) => {
    const img = images[i];
    updateImage(i, '_generating', true);
    try {
      const result = await generateCaption(form.course_name || form.title, form.organization, img.image_url || 'Training workshop activity');
      updateImage(i, 'caption', result.caption);
      // Add keywords from caption
      const newKws = [...new Set([...(form.keywords ?? []), ...result.keywords])];
      setForm(prev => ({ ...prev, keywords: newKws }));
      setKeywordInput(newKws.join(', '));
    } catch { /* ignore */ }
    finally { updateImage(i, '_generating', false); }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadPortfolioImage(file);
      setField('cover_image', url);
    } catch { setError('อัปโหลดรูป cover ไม่สำเร็จ'); }
    finally { setUploadingCover(false); e.target.value = ''; }
  };

  const handleGalleryUpload = async (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateImage(i, '_uploading', true);
    try {
      const url = await uploadPortfolioImage(file);
      updateImage(i, 'image_url', url);
    } catch { setError('อัปโหลดรูปไม่สำเร็จ'); }
    finally { updateImage(i, '_uploading', false); e.target.value = ''; }
  };

  const toggleCourse = (courseId: string) =>
    setSelectedCourseIds(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );

  const handleSave = async () => {
    if (!form.title || !form.organization) { setError('กรุณาใส่ชื่อและองค์กร'); return; }
    setSaving(true);
    setError('');
    const keywords = keywordInput.split(',').map(k => k.trim()).filter(Boolean);
    const payload = { ...form, keywords };
    const validImages = images
      .filter(img => img.image_url.trim())
      .map(({ image_url, caption, sort_order }) => ({ image_url, caption, sort_order }));
    try {
      if (isEdit && id) {
        await updatePortfolioAdmin(id, payload, validImages, selectedCourseIds);
      } else {
        const created = await createPortfolioAdmin(payload, validImages, selectedCourseIds);
        navigate(`/dashboard/portfolio/edit/${created.id}`, { replace: true });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      setError(e.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-[#c5a059] animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/portfolio" className="text-gray-400 hover:text-[#0f3460] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-gray-900">{isEdit ? 'แก้ไข Portfolio' : 'Portfolio ใหม่'}</h1>
        </div>
        {error && (
          <span className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {error}
          </span>
        )}
        {saved && (
          <span className="text-xs font-bold text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> บันทึกแล้ว
          </span>
        )}
        <button onClick={handleSave} disabled={saving}
          className="bg-[#c5a059] text-white px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-[#e0c58e] hover:text-[#0f3460] disabled:opacity-40 transition-all shadow-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          บันทึก
        </button>
      </div>

      {/* ── Section 1: Basic Info ── */}
      <Card title="ข้อมูลพื้นฐาน">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>ชื่อโปรเจก / หัวข้อ *</Label>
            <input value={form.title} onChange={e => setField('title', e.target.value)}
              placeholder="เช่น: หลักสูตร Leadership for Manager"
              className="input" />
          </div>
          <div>
            <Label>Slug (URL)</Label>
            <input value={form.slug} onChange={e => setField('slug', e.target.value)}
              placeholder="leadership-for-manager" className="input font-mono text-xs" />
          </div>
          <div>
            <Label>หมวดหมู่</Label>
            <select value={form.category} onChange={e => setField('category', e.target.value)} className="input">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label>ชื่อองค์กร / ลูกค้า *</Label>
            <input value={form.organization} onChange={e => setField('organization', e.target.value)}
              placeholder="เช่น: บริษัท ABC จำกัด" className="input" />
          </div>
          <div>
            <Label>หลักสูตรที่อบรม</Label>
            <input value={form.course_name} onChange={e => setField('course_name', e.target.value)}
              placeholder="เช่น: Leadership for Manager" className="input" />
          </div>
        </div>
      </Card>

      {/* ── Section 2: Description ── */}
      <Card title="เนื้อหา Case Study">
        <div className="space-y-4">
          <div>
            <Label>คำอธิบายสั้น (แสดงในการ์ด)</Label>
            <textarea value={form.description_short} onChange={e => setField('description_short', e.target.value)}
              rows={2} placeholder="สรุปสั้นๆ ว่าทำอะไร ผลอะไร" className="input resize-none" />
          </div>
          <div>
            <Label>เรื่องราวเต็ม (แสดงในหน้า Detail)</Label>
            <textarea value={form.description_full} onChange={e => setField('description_full', e.target.value)}
              rows={5} placeholder="เล่าเรื่องตั้งแต่ปัญหา → กระบวนการ → ผลลัพธ์..." className="input resize-none" />
          </div>
          <div>
            <Label>ผลลัพธ์ที่โดดเด่น (Result Highlight)</Label>
            <textarea value={form.result} onChange={e => setField('result', e.target.value)}
              rows={2} placeholder="เช่น: ผู้เข้าร่วม 48 คน · Engagement เพิ่ม 34% · นำไปใช้จริงใน 30 วัน" className="input resize-none" />
          </div>
          <div>
            <Label>Keywords (คั่นด้วย ,)</Label>
            <input value={keywordInput} onChange={e => setKeywordInput(e.target.value)}
              placeholder="Leadership, Team Building, Facilitation" className="input" />
          </div>
          <div>
            <Label>Cover Image</Label>
            <div className="flex gap-2 items-start">
              <input value={form.cover_image} onChange={e => setField('cover_image', e.target.value)}
                placeholder="https://... หรืออัปโหลดไฟล์" className="input flex-1" />
              <label className={`shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold cursor-pointer transition-all ${uploadingCover ? 'opacity-50 pointer-events-none' : 'hover:bg-[#0f3460] hover:text-white hover:border-[#0f3460]'}`}>
                {uploadingCover ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                {uploadingCover ? 'กำลังอัปโหลด...' : 'อัปโหลด'}
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploadingCover} />
              </label>
              {form.cover_image && (
                <img src={form.cover_image} alt="" className="w-14 h-10 rounded-lg object-cover shrink-0 border border-gray-200"
                  onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* ── Section 3: Images ── */}
      <Card title={`รูปภาพ (${images.length} รูป)`} action={
        <button onClick={addImage}
          className="text-xs font-black text-[#c5a059] flex items-center gap-1 hover:underline">
          <Plus className="w-3 h-3" /> เพิ่มรูป
        </button>
      }>
        {images.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">ยังไม่มีรูปภาพ</p>
            <button onClick={addImage} className="mt-2 text-xs font-bold text-[#c5a059] hover:underline">+ เพิ่มรูปแรก</button>
          </div>
        ) : (
          <div className="space-y-4">
            {images.map((img, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">รูปที่ {i + 1}</span>
                  <button onClick={() => removeImage(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Label>Image URL</Label>
                    <input value={img.image_url} onChange={e => updateImage(i, 'image_url', e.target.value)}
                      placeholder="https://... หรืออัปโหลดไฟล์" className="input text-xs" />
                  </div>
                  <label className={`shrink-0 flex items-center gap-1 px-2.5 py-2.5 rounded-xl border border-gray-200 text-[10px] font-bold cursor-pointer transition-all mb-0.5 ${img._uploading ? 'opacity-50 pointer-events-none' : 'hover:bg-[#0f3460] hover:text-white hover:border-[#0f3460]'}`}>
                    {img._uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleGalleryUpload(i, e)} disabled={!!img._uploading} />
                  </label>
                  {img.image_url && (
                    <img src={img.image_url} alt="" className="w-14 h-10 rounded-lg object-cover border border-gray-200 shrink-0 mb-0.5"
                      onError={e => (e.currentTarget.style.display = 'none')} />
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label>Caption</Label>
                    <button onClick={() => handleGenerateCaption(i)}
                      disabled={img._generating || !form.organization}
                      className="text-[9px] font-black text-[#c5a059] flex items-center gap-1 hover:underline disabled:opacity-40">
                      {img._generating ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Sparkles className="w-2.5 h-2.5" />}
                      AI Generate Caption
                    </button>
                  </div>
                  <textarea value={img.caption} onChange={e => updateImage(i, 'caption', e.target.value)}
                    rows={2} placeholder="คำบรรยายรูป..." className="input resize-none text-xs" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ── Section 4: Related Courses ── */}
      <Card title="หลักสูตรที่เกี่ยวข้อง">
        {courses.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">ไม่พบหลักสูตร</p>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-1.5">
            {courses.map(c => (
              <label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedCourseIds.includes(c.id) ? 'bg-[#0f3460]/5 border border-[#0f3460]/20' : 'hover:bg-gray-50'}`}>
                <input type="checkbox" checked={selectedCourseIds.includes(c.id)}
                  onChange={() => toggleCourse(c.id)} className="rounded text-[#0f3460]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-700 truncate">{c.title}</p>
                  <p className="text-[9px] text-gray-400">{c.category}</p>
                </div>
                {selectedCourseIds.includes(c.id) && (
                  <CheckCircle2 className="w-4 h-4 text-[#0f3460] shrink-0" />
                )}
              </label>
            ))}
          </div>
        )}
        {selectedCourseIds.length > 0 && (
          <p className="text-xs font-bold text-[#0f3460] mt-3">เลือกแล้ว {selectedCourseIds.length} หลักสูตร</p>
        )}
      </Card>

      {/* Save button (bottom) */}
      <div className="flex justify-end pb-6">
        <button onClick={handleSave} disabled={saving}
          className="bg-[#0f3460] text-white px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-[#1a4a7a] disabled:opacity-40 transition-all shadow-sm">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> กำลังบันทึก...</> : <><Save className="w-4 h-4" /> บันทึก Portfolio</>}
        </button>
      </div>
    </div>
  );
};

// Helpers
const Card: React.FC<{ title: string; action?: React.ReactNode; children: React.ReactNode }> = ({ title, action, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
    <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{title}</p>
      {action}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{children}</p>
);

// Global input style via CSS in JSX
const style = document.createElement('style');
style.textContent = `.input { width:100%; border:1px solid #e5e7eb; border-radius:0.75rem; padding:0.625rem 0.875rem; font-size:0.875rem; font-weight:500; outline:none; } .input:focus { ring: 2px solid #c5a059; border-color:#c5a059; }`;
document.head.appendChild(style);

export default DashboardPortfolioEditor;
