import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
  BookOpen, Users, Sparkles, ArrowRight, Plus, FileText,
  Briefcase, BarChart3, TrendingUp, Eye, Zap, ChevronRight
} from 'lucide-react';
import { fetchAllArticles } from '../../services/blog-articles';
import { analyzeSEO, scoreColor, scoreBg, scoreLabel } from '../../utils/seo-analyzer';

interface FullStats {
  articles: number;
  published: number;
  portfolio: number;
  courses: number;
  speakers: number;
  avgSEO: number;
}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<FullStats>({ articles: 0, published: 0, portfolio: 0, courses: 0, speakers: 0, avgSEO: 0 });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [recentPortfolio, setRecentPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('courses').select('id', { count: 'exact', head: true }),
      supabase.from('speakers').select('id', { count: 'exact', head: true }),
      supabase.from('portfolio').select('id', { count: 'exact', head: true }),
      supabase.from('portfolio').select('id, title, organization, category, created_at').order('created_at', { ascending: false }).limit(4),
      fetchAllArticles(),
    ]).then(([coursesRes, speakersRes, portRes, recentPort, articles]) => {
      const published = articles.filter(a => a.published);
      const scores = published.map(a => analyzeSEO(a.content).score);
      const avgSEO = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 0;
      setStats({
        articles: articles.length,
        published: published.length,
        portfolio: portRes.count ?? 0,
        courses: coursesRes.count ?? 0,
        speakers: speakersRes.count ?? 0,
        avgSEO,
      });
      setRecentArticles(articles.slice(0, 5));
      setRecentPortfolio(recentPort.data ?? []);
      setLoading(false);
    });
  }, []);

  const STAT_CARDS = [
    { label: 'บทความทั้งหมด', sub: `${stats.published} Published`, value: stats.articles, icon: FileText, color: 'bg-blue-500', to: '/dashboard/blog' },
    { label: 'Portfolio', sub: 'Case Studies', value: stats.portfolio, icon: Briefcase, color: 'bg-purple-500', to: '/dashboard/portfolio' },
    { label: 'หลักสูตร', sub: 'Courses', value: stats.courses, icon: BookOpen, color: 'bg-emerald-500', to: '/dashboard/courses' },
    { label: 'SEO Score', sub: scoreLabel(stats.avgSEO), value: stats.avgSEO, icon: BarChart3, color: stats.avgSEO >= 80 ? 'bg-green-500' : stats.avgSEO >= 60 ? 'bg-amber-500' : 'bg-red-500', to: '/dashboard/seo', suffix: '/100' },
  ];

  const QUICK_ACTIONS = [
    { label: 'บทความใหม่', icon: FileText, to: '/dashboard/blog/new', color: 'bg-[#0f3460] text-white' },
    { label: 'Portfolio ใหม่', icon: Briefcase, to: '/dashboard/portfolio/new', color: 'bg-purple-600 text-white' },
    { label: 'หลักสูตรใหม่', icon: BookOpen, to: '/dashboard/courses/new', color: 'bg-emerald-600 text-white' },
    { label: 'SEO Analyzer', icon: BarChart3, to: '/dashboard/seo', color: 'bg-gray-100 text-gray-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">CAP Vision Institute — Content Control Center</p>
        </div>
        <Link to="/dashboard/blog/new"
          className="bg-[#c5a059] text-white px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all shadow-sm">
          <Plus className="w-4 h-4" /> สร้างบทความ
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(card => (
          <Link key={card.to} to={card.to}
            className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-center justify-between">
              <div className={`${card.color} w-9 h-9 rounded-xl flex items-center justify-center`}>
                <card.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#c5a059] transition-colors" />
            </div>
            <div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-black text-gray-900">{loading ? '—' : card.value}</span>
                {card.suffix && <span className="text-sm text-gray-400 mb-1 font-bold">{card.suffix}</span>}
              </div>
              <p className="text-xs font-bold text-gray-500">{card.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Content Funnel */}
      <div className="bg-gradient-to-r from-[#0f3460] to-[#1a4a7a] rounded-2xl p-6 text-white">
        <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-4">Content Funnel</p>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: 'บทความ', value: stats.articles, icon: FileText },
            { label: 'SEO Optimized', value: stats.published, icon: TrendingUp },
            { label: 'หลักสูตร', value: stats.courses, icon: BookOpen },
            { label: 'Portfolio', value: stats.portfolio, icon: Briefcase },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                <item.icon className="w-4 h-4 text-[#c5a059]" />
                <div>
                  <p className="text-lg font-black">{loading ? '—' : item.value}</p>
                  <p className="text-[9px] text-white/60 uppercase tracking-widest font-bold">{item.label}</p>
                </div>
              </div>
              {i < 3 && <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />}
            </React.Fragment>
          ))}
          <div className="ml-auto flex items-center gap-2 bg-[#c5a059]/20 border border-[#c5a059]/30 rounded-xl px-4 py-2.5">
            <Zap className="w-4 h-4 text-[#c5a059]" />
            <div>
              <p className="text-sm font-black text-[#c5a059]">Lead Generation</p>
              <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map(a => (
          <Link key={a.to} to={a.to}
            className={`${a.color} rounded-xl p-4 flex items-center gap-3 font-bold text-sm hover:opacity-90 transition-all shadow-sm`}>
            <a.icon className="w-4 h-4 shrink-0" />
            {a.label}
          </Link>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-gray-700">บทความล่าสุด</h2>
            <Link to="/dashboard/blog" className="text-xs font-bold text-[#c5a059] hover:underline">ดูทั้งหมด</Link>
          </div>
          {loading ? (
            <div className="p-6 text-center text-sm text-gray-400">กำลังโหลด...</div>
          ) : recentArticles.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">
              <Link to="/dashboard/blog/new" className="text-[#c5a059] font-bold flex items-center gap-1 justify-center">
                <Plus className="w-3 h-3" /> สร้างบทความแรก
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentArticles.map(a => {
                const seo = analyzeSEO(a.content);
                return (
                  <li key={a.id}>
                    <Link to={`/dashboard/blog/edit/${a.id}`}
                      className="flex items-center px-5 py-3 gap-3 hover:bg-gray-50 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{a.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${a.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {a.published ? 'Live' : 'Draft'}
                          </span>
                          <span className="text-[10px] text-gray-400">{new Date(a.created_at).toLocaleDateString('th-TH')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-black ${scoreColor(seo.score)}`}>{seo.score}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#c5a059] transition-colors" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Recent Portfolio */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-gray-700">Portfolio ล่าสุด</h2>
            <Link to="/dashboard/portfolio" className="text-xs font-bold text-[#c5a059] hover:underline">ดูทั้งหมด</Link>
          </div>
          {loading ? (
            <div className="p-6 text-center text-sm text-gray-400">กำลังโหลด...</div>
          ) : recentPortfolio.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">
              <Link to="/dashboard/portfolio/new" className="text-[#c5a059] font-bold flex items-center gap-1 justify-center">
                <Plus className="w-3 h-3" /> สร้าง Portfolio แรก
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentPortfolio.map((p: any) => (
                <li key={p.id}>
                  <Link to={`/dashboard/portfolio/edit/${p.id}`}
                    className="flex items-center px-5 py-3 gap-3 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{p.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{p.organization} · {p.category}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#c5a059] shrink-0 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
