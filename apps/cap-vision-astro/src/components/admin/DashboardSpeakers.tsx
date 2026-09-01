import React, { useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase';
import { Plus, Search, ExternalLink, Edit } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  title: string;
  slug: string;
  image: string;
  created_at: string;
}

const DashboardSpeakers: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('speakers')
      .select('id, name, title, slug, image, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setSpeakers(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = speakers.filter(
    (s) =>
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0f3460] nav-font">วิทยากรทั้งหมด</h1>
          <p className="text-sm text-gray-500 mt-1">{speakers.length} วิทยากร</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาวิทยากร..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-[#c5a059] outline-none"
          />
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="p-12 text-center text-sm text-gray-400">กำลังโหลด...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-sm text-gray-400">
          ไม่พบวิทยากร
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="h-32 bg-gradient-to-br from-[#0f3460] to-[#1a4a8a] relative overflow-hidden">
                {speaker.image && (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                )}
              </div>
              <div className="p-5">
                <div className="font-black text-[#0f3460] text-sm">{speaker.name}</div>
                <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{speaker.title}</div>
                <div className="flex items-center gap-2 mt-4">
                  <a href={`/speakers/${speaker.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-[#0f3460] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    ดูหน้าเว็บ
                  </a>
                  <span className="text-gray-200">·</span>
                  <code className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded truncate max-w-24">
                    {speaker.id.slice(0, 8)}...
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardSpeakers;
