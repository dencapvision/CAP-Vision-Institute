import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Briefcase, Edit3, Trash2, ExternalLink,
  Loader2, RefreshCw, Image as ImageIcon
} from 'lucide-react';
import { fetchPortfolios, type Portfolio } from '../../services/portfolio';
import { deletePortfolioAdmin } from '../../services/portfolio-admin';

const CATEGORY_COLORS: Record<string, string> = {
  Leadership: 'bg-blue-100 text-blue-700',
  Team: 'bg-emerald-100 text-emerald-700',
  Communication: 'bg-purple-100 text-purple-700',
  Mindset: 'bg-orange-100 text-orange-700',
  'Work Skills': 'bg-gray-100 text-gray-600',
};

const DashboardPortfolio: React.FC = () => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('ทั้งหมด');

  const CATEGORIES = ['ทั้งหมด', ...Array.from(new Set(items.map(i => i.category))).filter(Boolean)];

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await fetchPortfolios()); }
    catch { /* ignore */ }
    finally { setLoading(false); }
  }

  async function handleDelete(item: Portfolio) {
    if (!confirm(`ลบ "${item.title}"?\nจะลบรูปภาพและข้อมูลที่เกี่ยวข้องทั้งหมด`)) return;
    try {
      await deletePortfolioAdmin(item.id);
      setItems(prev => prev.filter(p => p.id !== item.id));
    } catch { alert('ลบไม่สำเร็จ'); }
  }

  const filtered = filterCat === 'ทั้งหมด' ? items : items.filter(i => i.category === filterCat);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">จัดการ Case Studies + รูปภาพ + AI Caption</p>
        </div>
        <Link to="/dashboard/portfolio/new"
          className="bg-[#0f3460] text-white px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-[#1a4a7a] transition-all shadow-sm">
          <Plus className="w-4 h-4" /> Portfolio ใหม่
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Case Studies ทั้งหมด', value: items.length, color: 'bg-purple-50 text-purple-600' },
          { label: 'Leadership', value: items.filter(i => i.category === 'Leadership').length, color: 'bg-blue-50 text-blue-600' },
          { label: 'Team & Others', value: items.filter(i => i.category !== 'Leadership').length, color: 'bg-emerald-50 text-emerald-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className={`text-2xl font-black ${s.color.split(' ')[1]}`}>{s.value}</p>
            <p className="text-xs text-gray-500 font-bold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter + Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setFilterCat(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterCat === c ? 'bg-[#0f3460] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                {c}
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
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-bold mb-4">ยังไม่มี Portfolio</p>
            <Link to="/dashboard/portfolio/new" className="text-xs font-black text-[#c5a059] flex items-center gap-1 justify-center">
              <Plus className="w-3 h-3" /> สร้าง Case Study แรก
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x-0">
            {filtered.map(item => (
              <div key={item.id} className="border-b border-gray-100 p-5 hover:bg-gray-50/50 transition-colors group">
                {/* Cover image */}
                <div className="relative h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  {item.cover_image ? (
                    <img src={item.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full ${CATEGORY_COLORS[item.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <p className="font-bold text-sm text-[#0f3460] leading-tight mb-1 line-clamp-2">{item.title}</p>
                <p className="text-xs text-gray-400 mb-4">{item.organization}</p>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Link to={`/dashboard/portfolio/edit/${item.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 hover:bg-[#0f3460] hover:text-white text-gray-600 rounded-xl text-xs font-bold transition-all">
                    <Edit3 className="w-3.5 h-3.5" /> แก้ไข
                  </Link>
                  <a href={`/portfolio/${item.slug}`} target="_blank"
                    className="p-2 text-gray-400 hover:text-[#0f3460] transition-colors rounded-xl hover:bg-gray-100">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => handleDelete(item)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-xl hover:bg-gray-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPortfolio;
