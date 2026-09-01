import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Search, ExternalLink, Edit, Trash2, CheckCircle2, AlertCircle, X, Sparkles, UserCheck } from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  title: string;
  slug: string;
  image: string;
  bio?: string;
  created_at: string;
}

const DashboardSpeakers: React.FC = () => {
  const [speakers, setSpeakers] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingSpeaker, setEditingSpeaker] = useState<Instructor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    slug: '',
    image: '',
    bio: ''
  });

  useEffect(() => {
    loadSpeakers();
  }, []);

  async function loadSpeakers() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSpeakers(data ?? []);
    } catch (err: any) {
      console.error('Error loading instructors:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenAdd() {
    setEditingSpeaker(null);
    setFormData({
      name: '',
      title: '',
      slug: '',
      image: '',
      bio: ''
    });
    setIsModalOpen(true);
  }

  function handleOpenEdit(spk: Instructor) {
    setEditingSpeaker(spk);
    setFormData({
      name: spk.name || '',
      title: spk.title || '',
      slug: spk.slug || '',
      image: spk.image || '',
      bio: spk.bio || ''
    });
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    try {
      if (editingSpeaker) {
        // Update
        const { error } = await supabase
          .from('instructors')
          .update({
            name: formData.name,
            title: formData.title,
            slug: formData.slug,
            image: formData.image,
            bio: formData.bio,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingSpeaker.id);

        if (error) throw error;
        setMsg('บันทึกข้อมูลเรียบร้อยแล้ว');
      } else {
        // Create
        const { error } = await supabase
          .from('instructors')
          .insert({
            name: formData.name,
            title: formData.title,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
            image: formData.image,
            bio: formData.bio
          });

        if (error) throw error;
        setMsg('เพิ่มวิทยากรเรียบร้อยแล้ว');
      }

      await loadSpeakers();
      setTimeout(() => {
        setIsModalOpen(false);
        setMsg('');
      }, 1000);
    } catch (err: any) {
      alert('เกิดข้อผิดพลาด: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`คุณแน่ใจว่าต้องการลบวิทยากร "${name}" ใช่หรือไม่?`)) return;
    try {
      const { error } = await supabase.from('instructors').delete().eq('id', id);
      if (error) throw error;
      setSpeakers(speakers.filter(s => s.id !== id));
    } catch (err: any) {
      alert('ไม่สามารถลบได้: ' + err.message);
    }
  }

  const filtered = speakers.filter(
    (s) =>
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0f3460] nav-font">วิทยากรทั้งหมด</h1>
          <p className="text-sm text-gray-500 mt-1">{speakers.length} วิทยากร / Facilitators</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#c5a059] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#b8924d] transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          เพิ่มวิทยากรใหม่
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, ตำแหน่ง หรือ slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
          />
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="p-12 text-center text-sm text-gray-400">กำลังโหลดข้อมูลวิทยากร...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-sm text-gray-400">
          ไม่พบวิทยากร
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-gradient-to-br from-[#0f3460] to-[#1a4a8a] relative overflow-hidden">
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30">
                      <UserCheck className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#c5a059] text-white">
                      Verified Facilitator
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="font-black text-[#0f3460] text-base mb-1">{speaker.name}</div>
                  <div className="text-xs text-[#c5a059] font-bold mb-2">{speaker.title || 'Master Facilitator'}</div>
                  {speaker.bio && (
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light mb-4">
                      {speaker.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-50 mt-auto">
                <div className="flex items-center justify-between pt-4">
                  <a
                    href={`/speakers/${speaker.slug || speaker.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#0f3460] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    ดูหน้าโปรไฟล์
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(speaker)}
                      className="p-2 rounded-lg bg-gray-50 hover:bg-[#c5a059]/10 text-gray-600 hover:text-[#c5a059] transition-colors"
                      title="แก้ไขข้อมูล"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(speaker.id, speaker.name)}
                      className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="ลบ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-lg font-black text-[#0f3460]">
                {editingSpeaker ? 'แก้ไขข้อมูลวิทยากร' : 'เพิ่มวิทยากรใหม่'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {msg && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {msg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ชื่อ - นามสกุล (หรือฉายา) *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="เช่น ครูเด่น มาสเตอร์ฟา"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ตำแหน่ง / ความเชี่ยวชาญ *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น Master Facilitator & Learning Designer"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug (สำหรับลิงก์โปรไฟล์) *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="เช่น den-masterfa หรือ dr-so"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL รูปภาพประจำตัว (Image URL)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://capvisionpartner.com/images/..."
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ประวัติย่อ (Bio / Tagline)</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="คำอธิบายความเชี่ยวชาญและประสบการณ์ย่อ..."
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#c5a059] outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#0f3460] text-white hover:bg-[#1a4a8a] disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSpeakers;
