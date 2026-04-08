import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Plus, Pencil, Trash2, Eye, EyeOff, PlayCircle, Download, Clock, FileText, Loader2, CheckCircle2, AlertCircle, X, GripVertical } from 'lucide-react';
import {
  fetchAllVideos, createVideo, updateVideo, deleteVideo,
  fetchAllToolkits, createToolkit, updateToolkit, deleteToolkit,
  type MicroVideo, type ToolkitDownload, type MicroVideoInput, type ToolkitInput,
} from '../../services/resources-admin';

// ─── Constants ────────────────────────────────────────────────

const VIDEO_CATEGORIES = ['Micro-learning', 'Communication Skills', 'Facilitation', 'Leadership', 'Self-Growth', 'Team & Culture'];
const TOOLKIT_CATEGORIES = ['HRD Partner', 'Business Result', 'Facilitation', 'Leadership', 'Self-Growth'];
const FILE_TYPES = ['PDF', 'EXCEL', 'PDF / EXCEL', 'WORD', 'PowerPoint', 'Template'];

const EMPTY_VIDEO: MicroVideoInput = {
  title: '', category: 'Micro-learning', thumbnail_url: '', duration: '',
  video_url: '', description: '', published: false, sort_order: 0,
};
const EMPTY_TOOLKIT: ToolkitInput = {
  title: '', file_type: 'PDF', category: 'HRD Partner', thumbnail_url: '',
  download_url: '', description: '', published: false, sort_order: 0,
};

// ─── Shared UI ────────────────────────────────────────────────

const Toast: React.FC<{ msg: string; type: 'ok' | 'err'; onClose: () => void }> = ({ msg, type, onClose }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm ${type === 'ok' ? 'bg-green-600' : 'bg-red-500'}`}>
    {type === 'ok' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
    {msg}
    <button onClick={onClose}><X className="w-4 h-4 opacity-60 hover:opacity-100" /></button>
  </div>
);

const Label: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1.5">
    {children}{required && <span className="text-red-400 ml-1">*</span>}
  </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0f3460] focus:outline-none focus:border-[#c5a059] transition-colors ${props.className ?? ''}`} />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0f3460] focus:outline-none focus:border-[#c5a059] transition-colors resize-none" />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select {...props} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0f3460] focus:outline-none focus:border-[#c5a059] transition-colors bg-white" />
);

// ─── Video Preview Card (mirrors /resources look) ─────────────

const VideoPreviewCard: React.FC<{ v: MicroVideoInput | MicroVideo }> = ({ v }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm w-64 shrink-0">
    <div className="relative h-36 bg-gray-100 overflow-hidden">
      {v.thumbnail_url
        ? <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" />
        : <div className="w-full h-full flex items-center justify-center bg-gray-100"><PlayCircle className="w-10 h-10 text-gray-300" /></div>}
      <div className="absolute inset-0 bg-[#0f3460]/30 flex items-center justify-center">
        <div className="w-10 h-10 bg-[#c5a059] rounded-full flex items-center justify-center">
          <PlayCircle className="w-5 h-5 text-white" />
        </div>
      </div>
      {v.duration && (
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-white text-[10px] font-bold flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" /> {v.duration}
        </div>
      )}
    </div>
    <div className="p-4">
      <p className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest mb-1">{v.category || 'Category'}</p>
      <p className="text-[#0f3460] font-bold text-sm leading-snug line-clamp-2">{v.title || 'ชื่อวิดีโอ'}</p>
    </div>
  </div>
);

// ─── Toolkit Preview Card ─────────────────────────────────────

const ToolkitPreviewCard: React.FC<{ t: ToolkitInput | ToolkitDownload }> = ({ t }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm w-64 shrink-0">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 bg-[#0f3460]/5 rounded-xl flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5 text-[#0f3460]" />
      </div>
      <div>
        <p className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest mb-0.5">{t.file_type} · {t.category}</p>
        <p className="text-[#0f3460] font-bold text-sm leading-snug line-clamp-2">{t.title || 'ชื่อเครื่องมือ'}</p>
      </div>
    </div>
    <div className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 ${t.download_url ? 'bg-[#0f3460] text-white' : 'bg-gray-100 text-gray-400'}`}>
      <Download className="w-3.5 h-3.5" /> {t.download_url ? 'ดาวน์โหลดฟรี' : 'เร็วๆ นี้'}
    </div>
  </div>
);

// ─── Video Form ───────────────────────────────────────────────

const VideoForm: React.FC<{
  initial: MicroVideoInput;
  onSave: (data: MicroVideoInput) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}> = ({ initial, onSave, onCancel, saving }) => {
  const [form, setForm] = useState<MicroVideoInput>(initial);
  const set = (k: keyof MicroVideoInput, v: string | boolean | number) =>
    setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <Label required>ชื่อวิดีโอ</Label>
            <Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="เช่น เทคนิคการฟังแบบ Deep Listening" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label required>หมวดหมู่</Label>
              <Select value={form.category} onChange={e => set('category', e.target.value)}>
                {VIDEO_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </Select>
            </div>
            <div>
              <Label>ความยาว (เช่น 3:45)</Label>
              <Input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="3:45" />
            </div>
          </div>
          <div>
            <Label required>YouTube / Video URL</Label>
            <Input value={form.video_url} onChange={e => set('video_url', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            {form.video_url && (
              <a href={form.video_url} target="_blank" rel="noopener noreferrer" className="text-[#c5a059] text-xs font-bold mt-1 inline-flex items-center gap-1 hover:underline">
                <ExternalLink className="w-3 h-3" /> ทดสอบลิงก์
              </a>
            )}
          </div>
          <div>
            <Label>Thumbnail URL</Label>
            <Input value={form.thumbnail_url} onChange={e => set('thumbnail_url', e.target.value)} placeholder="https://..." />
            <p className="text-gray-400 text-[10px] mt-1">แนะนำ: Unsplash, Supabase Storage, หรือ screenshot จากวิดีโอ</p>
          </div>
          <div>
            <Label>คำอธิบายสั้น (แสดงใน tooltip)</Label>
            <Textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} placeholder="สรุปสั้นๆ ว่าวิดีโอนี้สอนอะไร" />
          </div>
          <div>
            <Label>ลำดับการแสดง (0 = แสดงก่อน)</Label>
            <Input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => set('published', !form.published)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-green-500' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.published ? 'left-5' : 'left-0.5'}`} />
            </button>
            <span className="text-sm font-bold text-gray-600">{form.published ? 'เผยแพร่แล้ว' : 'ซ่อน (Draft)'}</span>
          </div>
        </div>

        {/* Live preview */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">ตัวอย่างการแสดงผลบนเว็บไซต์</p>
          <VideoPreviewCard v={form} />
          <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-600 font-medium">
            Preview อัพเดทแบบ real-time ตามที่กรอก
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.title}
          className="bg-[#0f3460] text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-[#c5a059] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {saving ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
        <button onClick={onCancel} className="border border-gray-200 text-gray-500 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

// ─── Toolkit Form ─────────────────────────────────────────────

const ToolkitForm: React.FC<{
  initial: ToolkitInput;
  onSave: (data: ToolkitInput) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}> = ({ initial, onSave, onCancel, saving }) => {
  const [form, setForm] = useState<ToolkitInput>(initial);
  const set = (k: keyof ToolkitInput, v: string | boolean | number) =>
    setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <Label required>ชื่อเครื่องมือ / เอกสาร</Label>
            <Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="เช่น TNA Framework & Questionnaire" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ประเภทไฟล์</Label>
              <Select value={form.file_type} onChange={e => set('file_type', e.target.value)}>
                {FILE_TYPES.map(f => <option key={f}>{f}</option>)}
              </Select>
            </div>
            <div>
              <Label>หมวดหมู่</Label>
              <Select value={form.category} onChange={e => set('category', e.target.value)}>
                {TOOLKIT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </Select>
            </div>
          </div>
          <div>
            <Label required>Download URL</Label>
            <Input value={form.download_url} onChange={e => set('download_url', e.target.value)} placeholder="https://..." />
            <div className="mt-1 space-y-0.5">
              <p className="text-gray-400 text-[10px]">ตัวเลือก: Supabase Storage · Google Drive · Dropbox · OneDrive</p>
              {form.download_url && (
                <a href={form.download_url} target="_blank" rel="noopener noreferrer" className="text-[#c5a059] text-xs font-bold inline-flex items-center gap-1 hover:underline">
                  <ExternalLink className="w-3 h-3" /> ทดสอบลิงก์
                </a>
              )}
            </div>
          </div>
          <div>
            <Label>Thumbnail URL (ภาพปก)</Label>
            <Input value={form.thumbnail_url} onChange={e => set('thumbnail_url', e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <Label>คำอธิบาย</Label>
            <Textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} placeholder="อธิบายสั้นๆ ว่าใช้ทำอะไร" />
          </div>
          <div>
            <Label>ลำดับการแสดง (0 = แสดงก่อน)</Label>
            <Input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => set('published', !form.published)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-green-500' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.published ? 'left-5' : 'left-0.5'}`} />
            </button>
            <span className="text-sm font-bold text-gray-600">{form.published ? 'เผยแพร่แล้ว' : 'ซ่อน (Draft)'}</span>
          </div>
        </div>

        {/* Live preview */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">ตัวอย่างการแสดงผลบนเว็บไซต์</p>
          <ToolkitPreviewCard t={form} />
          <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-600 font-medium">
            Preview อัพเดทแบบ real-time ตามที่กรอก
          </div>
          {/* URL guide */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-2">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">วิธีได้ Download URL</p>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p><span className="font-bold text-[#0f3460]">Supabase:</span> /admin/media → อัพโหลด → Copy Public URL</p>
              <p><span className="font-bold text-[#0f3460]">Google Drive:</span> Share → Anyone with link → copy URL</p>
              <p><span className="font-bold text-[#0f3460]">Dropbox:</span> Share → Copy link → เปลี่ยน ?dl=0 เป็น ?dl=1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.title}
          className="bg-[#0f3460] text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-[#c5a059] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {saving ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
        <button onClick={onCancel} className="border border-gray-200 text-gray-500 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────

type Tab = 'videos' | 'toolkits';

const DashboardResources: React.FC = () => {
  const [tab, setTab] = useState<Tab>('videos');
  const [videos, setVideos] = useState<MicroVideo[]>([]);
  const [toolkits, setToolkits] = useState<ToolkitDownload[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // Form state
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<MicroVideo | null>(null);
  const [showToolkitForm, setShowToolkitForm] = useState(false);
  const [editingToolkit, setEditingToolkit] = useState<ToolkitDownload | null>(null);

  // Delete confirm
  const [deleteVideoId, setDeleteVideoId] = useState<string | null>(null);
  const [deleteToolkitId, setDeleteToolkitId] = useState<string | null>(null);

  const notify = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [v, t] = await Promise.all([fetchAllVideos(), fetchAllToolkits()]);
      setVideos(v);
      setToolkits(t);
    } catch {
      notify('โหลดข้อมูลไม่สำเร็จ', 'err');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Video handlers ──
  const handleSaveVideo = async (data: MicroVideoInput) => {
    setSaving(true);
    try {
      if (editingVideo) {
        const updated = await updateVideo(editingVideo.id, data);
        setVideos(prev => prev.map(v => v.id === updated.id ? updated : v));
        notify('อัพเดทวิดีโอสำเร็จ');
      } else {
        const created = await createVideo(data);
        setVideos(prev => [created, ...prev]);
        notify('เพิ่มวิดีโอสำเร็จ');
      }
      setShowVideoForm(false);
      setEditingVideo(null);
    } catch {
      notify('บันทึกไม่สำเร็จ กรุณาลองใหม่', 'err');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVideo = async (v: MicroVideo) => {
    try {
      const updated = await updateVideo(v.id, { published: !v.published });
      setVideos(prev => prev.map(x => x.id === updated.id ? updated : x));
      notify(updated.published ? 'เผยแพร่แล้ว' : 'ซ่อนแล้ว');
    } catch { notify('เปลี่ยนสถานะไม่สำเร็จ', 'err'); }
  };

  const handleDeleteVideo = async () => {
    if (!deleteVideoId) return;
    try {
      await deleteVideo(deleteVideoId);
      setVideos(prev => prev.filter(v => v.id !== deleteVideoId));
      notify('ลบวิดีโอสำเร็จ');
    } catch { notify('ลบไม่สำเร็จ', 'err'); }
    setDeleteVideoId(null);
  };

  // ── Toolkit handlers ──
  const handleSaveToolkit = async (data: ToolkitInput) => {
    setSaving(true);
    try {
      if (editingToolkit) {
        const updated = await updateToolkit(editingToolkit.id, data);
        setToolkits(prev => prev.map(t => t.id === updated.id ? updated : t));
        notify('อัพเดทเครื่องมือสำเร็จ');
      } else {
        const created = await createToolkit(data);
        setToolkits(prev => [created, ...prev]);
        notify('เพิ่มเครื่องมือสำเร็จ');
      }
      setShowToolkitForm(false);
      setEditingToolkit(null);
    } catch {
      notify('บันทึกไม่สำเร็จ กรุณาลองใหม่', 'err');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleToolkit = async (t: ToolkitDownload) => {
    try {
      const updated = await updateToolkit(t.id, { published: !t.published });
      setToolkits(prev => prev.map(x => x.id === updated.id ? updated : x));
      notify(updated.published ? 'เผยแพร่แล้ว' : 'ซ่อนแล้ว');
    } catch { notify('เปลี่ยนสถานะไม่สำเร็จ', 'err'); }
  };

  const handleDeleteToolkit = async () => {
    if (!deleteToolkitId) return;
    try {
      await deleteToolkit(deleteToolkitId);
      setToolkits(prev => prev.filter(t => t.id !== deleteToolkitId));
      notify('ลบเครื่องมือสำเร็จ');
    } catch { notify('ลบไม่สำเร็จ', 'err'); }
    setDeleteToolkitId(null);
  };

  const publishedVideos = videos.filter(v => v.published).length;
  const publishedToolkits = toolkits.filter(t => t.published).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0f3460] nav-font">จัดการ Resources</h1>
          <p className="text-gray-400 text-sm mt-1">วิดีโอ Micro-learning และ Toolkit ดาวน์โหลดฟรี</p>
        </div>
        <a
          href="/resources"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-gray-200 text-gray-500 px-4 py-2 rounded-xl text-sm font-bold hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> ดูหน้า /resources
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'วิดีโอทั้งหมด', value: videos.length, color: 'text-[#0f3460]' },
          { label: 'วิดีโอเผยแพร่', value: publishedVideos, color: 'text-green-600' },
          { label: 'เครื่องมือทั้งหมด', value: toolkits.length, color: 'text-[#0f3460]' },
          { label: 'เครื่องมือเผยแพร่', value: publishedToolkits, color: 'text-green-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className={`text-3xl font-black nav-font ${s.color}`}>{s.value}</div>
            <div className="text-gray-400 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setTab('videos'); setShowVideoForm(false); setEditingVideo(null); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'videos' ? 'bg-[#0f3460] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0f3460]'}`}
        >
          <PlayCircle className="w-4 h-4" /> วิดีโอ Micro-learning
          <span className={`text-xs px-2 py-0.5 rounded-full ${tab === 'videos' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>{videos.length}</span>
        </button>
        <button
          onClick={() => { setTab('toolkits'); setShowToolkitForm(false); setEditingToolkit(null); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'toolkits' ? 'bg-[#0f3460] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0f3460]'}`}
        >
          <Download className="w-4 h-4" /> Toolkit ดาวน์โหลด
          <span className={`text-xs px-2 py-0.5 rounded-full ${tab === 'toolkits' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>{toolkits.length}</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 text-[#c5a059] animate-spin" />
        </div>
      ) : (
        <>
          {/* ── VIDEOS TAB ── */}
          {tab === 'videos' && (
            <div className="space-y-4">
              {/* Add button */}
              {!showVideoForm && (
                <button
                  onClick={() => { setShowVideoForm(true); setEditingVideo(null); }}
                  className="flex items-center gap-2 bg-[#c5a059] text-white px-5 py-3 rounded-xl font-black text-sm hover:bg-[#d4b06a] transition-colors"
                >
                  <Plus className="w-4 h-4" /> เพิ่มวิดีโอใหม่
                </button>
              )}

              {/* Add form */}
              {showVideoForm && !editingVideo && (
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">เพิ่มวิดีโอใหม่</p>
                  <VideoForm
                    initial={EMPTY_VIDEO}
                    onSave={handleSaveVideo}
                    onCancel={() => setShowVideoForm(false)}
                    saving={saving}
                  />
                </div>
              )}

              {/* List */}
              {videos.length === 0 && !showVideoForm ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
                  <PlayCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-bold">ยังไม่มีวิดีโอ</p>
                  <p className="text-gray-300 text-sm">กดปุ่ม "เพิ่มวิดีโอใหม่" เพื่อเริ่มต้น</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {videos.map(v => (
                    <div key={v.id}>
                      {editingVideo?.id === v.id ? (
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">แก้ไขวิดีโอ</p>
                          <VideoForm
                            initial={{ title: v.title, category: v.category, thumbnail_url: v.thumbnail_url, duration: v.duration, video_url: v.video_url, description: v.description, published: v.published, sort_order: v.sort_order }}
                            onSave={handleSaveVideo}
                            onCancel={() => setEditingVideo(null)}
                            saving={saving}
                          />
                        </div>
                      ) : (
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-4">
                          {/* Thumbnail */}
                          <div className="w-20 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                            {v.thumbnail_url
                              ? <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center"><PlayCircle className="w-6 h-6 text-gray-300" /></div>}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <PlayCircle className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${v.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                {v.published ? 'เผยแพร่' : 'Draft'}
                              </span>
                              <span className="text-[10px] text-gray-400">{v.category}</span>
                              {v.duration && <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" />{v.duration}</span>}
                            </div>
                            <p className="font-bold text-[#0f3460] text-sm leading-snug truncate">{v.title}</p>
                            {v.video_url && (
                              <a href={v.video_url} target="_blank" rel="noopener noreferrer" className="text-[#c5a059] text-[10px] font-bold inline-flex items-center gap-1 hover:underline mt-0.5">
                                <ExternalLink className="w-2.5 h-2.5" /> ดูวิดีโอ
                              </a>
                            )}
                          </div>
                          {/* Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleVideo(v)}
                              title={v.published ? 'ซ่อน' : 'เผยแพร่'}
                              className={`p-2 rounded-lg transition-colors ${v.published ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-50'}`}
                            >
                              {v.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => { setEditingVideo(v); setShowVideoForm(false); }}
                              className="p-2 text-gray-400 hover:text-[#0f3460] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteVideoId(v.id)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TOOLKITS TAB ── */}
          {tab === 'toolkits' && (
            <div className="space-y-4">
              {!showToolkitForm && (
                <button
                  onClick={() => { setShowToolkitForm(true); setEditingToolkit(null); }}
                  className="flex items-center gap-2 bg-[#c5a059] text-white px-5 py-3 rounded-xl font-black text-sm hover:bg-[#d4b06a] transition-colors"
                >
                  <Plus className="w-4 h-4" /> เพิ่มเครื่องมือใหม่
                </button>
              )}

              {showToolkitForm && !editingToolkit && (
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">เพิ่มเครื่องมือใหม่</p>
                  <ToolkitForm
                    initial={EMPTY_TOOLKIT}
                    onSave={handleSaveToolkit}
                    onCancel={() => setShowToolkitForm(false)}
                    saving={saving}
                  />
                </div>
              )}

              {toolkits.length === 0 && !showToolkitForm ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
                  <Download className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-bold">ยังไม่มีเครื่องมือ</p>
                  <p className="text-gray-300 text-sm">กดปุ่ม "เพิ่มเครื่องมือใหม่" เพื่อเริ่มต้น</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {toolkits.map(t => (
                    <div key={t.id}>
                      {editingToolkit?.id === t.id ? (
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">แก้ไขเครื่องมือ</p>
                          <ToolkitForm
                            initial={{ title: t.title, file_type: t.file_type, category: t.category, thumbnail_url: t.thumbnail_url, download_url: t.download_url, description: t.description, published: t.published, sort_order: t.sort_order }}
                            onSave={handleSaveToolkit}
                            onCancel={() => setEditingToolkit(null)}
                            saving={saving}
                          />
                        </div>
                      ) : (
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#0f3460]/5 rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-[#0f3460]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${t.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                {t.published ? 'เผยแพร่' : 'Draft'}
                              </span>
                              <span className="text-[10px] text-gray-400">{t.file_type}</span>
                              <span className="text-[10px] text-gray-400">{t.category}</span>
                            </div>
                            <p className="font-bold text-[#0f3460] text-sm leading-snug truncate">{t.title}</p>
                            {t.download_url ? (
                              <a href={t.download_url} target="_blank" rel="noopener noreferrer" className="text-[#c5a059] text-[10px] font-bold inline-flex items-center gap-1 hover:underline mt-0.5">
                                <ExternalLink className="w-2.5 h-2.5" /> ทดสอบดาวน์โหลด
                              </a>
                            ) : (
                              <span className="text-gray-300 text-[10px]">ยังไม่มี URL</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleToolkit(t)}
                              title={t.published ? 'ซ่อน' : 'เผยแพร่'}
                              className={`p-2 rounded-lg transition-colors ${t.published ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-50'}`}
                            >
                              {t.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => { setEditingToolkit(t); setShowToolkitForm(false); }}
                              className="p-2 text-gray-400 hover:text-[#0f3460] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteToolkitId(t.id)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Delete confirm modals */}
      {(deleteVideoId || deleteToolkitId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-black text-[#0f3460] mb-2">ยืนยันการลบ</h3>
            <p className="text-gray-500 text-sm mb-6">ข้อมูลจะถูกลบถาวร ไม่สามารถกู้คืนได้</p>
            <div className="flex gap-3">
              <button
                onClick={deleteVideoId ? handleDeleteVideo : handleDeleteToolkit}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-black text-sm hover:bg-red-600 transition-colors"
              >
                ลบเลย
              </button>
              <button
                onClick={() => { setDeleteVideoId(null); setDeleteToolkitId(null); }}
                className="flex-1 border border-gray-200 text-gray-500 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DashboardResources;
