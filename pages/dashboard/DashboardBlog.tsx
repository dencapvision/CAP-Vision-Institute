import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, FileText, Eye, EyeOff, Trash2, Edit3,
  Loader2, RefreshCw, ExternalLink, Sparkles, TrendingUp
} from 'lucide-react';
import {
  fetchAllArticles, togglePublished, deleteArticle,
  type BlogArticleRow
} from '../../services/blog-articles';

const DashboardBlog: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setArticles(await fetchAllArticles()); }
    catch { /* ignore */ }
    finally { setLoading(false); }
  }

  async function handleToggle(row: BlogArticleRow) {
    try {
      await togglePublished(row.id, !row.published);
      setArticles(prev => prev.map(a => a.id === row.id ? { ...a, published: !a.published } : a));
    } catch { alert('ไม่สามารถเปลี่ยนสถานะได้'); }
  }

  async function handleDelete(row: BlogArticleRow) {
    if (!confirm(`ลบ "${row.title}"?`)) return;
    try {
      await deleteArticle(row.id);
      setArticles(prev => prev.filter(a => a.id !== row.id));
    } catch { alert('ลบไม่สำเร็จ'); }
  }

  const filtered = articles.filter(a =>
    filter === 'all' ? true : filter === 'published' ? a.published : !a.published
  );
  const publishedCount = articles.filter(a => a.published).length;
  const draftCount = articles.filter(a => !a.published).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">บทความ</h1>
          <p className="text-gray-500 text-sm mt-1">จัดการบทความ AI-Generated AEO/SEO</p>
        </div>
        <Link
          to="/dashboard/blog/new"
          className="bg-[#0f3460] text-white px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-[#1a4a7a] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> สร้างบทความใหม่
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'ทั้งหมด', value: articles.length, icon: FileText, color: 'bg-gray-50 text-gray-600' },
          { label: 'Published', value: publishedCount, icon: Eye, color: 'bg-green-50 text-green-600' },
          { label: 'Draft', value: draftCount, icon: EyeOff, color: 'bg-amber-50 text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 font-bold">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Filter tabs */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-1">
            {(['all', 'published', 'draft'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-[#0f3460] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {f === 'all' ? 'ทั้งหมด' : f === 'published' ? 'Published' : 'Draft'}
              </button>
            ))}
          </div>
          <button onClick={load} className="text-gray-400 hover:text-[#0f3460] transition-colors p-1">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center"><Loader2 className="w-8 h-8 text-[#c5a059] animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-bold mb-4">ยังไม่มีบทความ</p>
            <Link to="/dashboard/blog/new" className="text-xs font-black text-[#c5a059] flex items-center gap-1 justify-center">
              <Plus className="w-3 h-3" /> สร้างบทความแรก
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">บทความ</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">หมวด</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">วันที่</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">สถานะ</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {row.thumbnail ? (
                        <img src={row.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      ) : (
                        <div className="w-10 h-10 bg-[#0f3460]/5 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-[#0f3460]/30" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-[#0f3460] truncate max-w-[260px]">{row.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">/{row.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{row.category}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-xs text-gray-400">{new Date(row.created_at).toLocaleDateString('th-TH')}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${row.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {row.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <Link
                        to={`/dashboard/blog/edit/${row.id}`}
                        className="p-2 text-gray-400 hover:text-[#0f3460] transition-colors rounded-lg hover:bg-gray-100"
                        title="แก้ไข"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      {row.published && (
                        <a
                          href={`/resources/${row.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-[#0f3460] transition-colors rounded-lg hover:bg-gray-100"
                          title="ดูบทความ"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleToggle(row)}
                        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${row.published ? 'text-green-500 hover:text-gray-400' : 'text-gray-300 hover:text-green-500'}`}
                        title={row.published ? 'Unpublish' : 'Publish'}
                      >
                        {row.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(row)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100"
                        title="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardBlog;
