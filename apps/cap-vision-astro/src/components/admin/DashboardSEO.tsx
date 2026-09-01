import React, { useState, useEffect } from 'react';

import {
  BarChart3, TrendingUp, AlertCircle, CheckCircle2,
  Loader2, RefreshCw, Edit3, ArrowRight, Zap
} from 'lucide-react';
import { fetchAllArticles, type BlogArticleRow } from '../../lib/services/blog-articles';
import { analyzeSEO, scoreColor, scoreBg, scoreLabel, type SEOResult } from '../../lib/utils/seo-analyzer';

interface ArticleWithSEO extends BlogArticleRow { seo: SEOResult }

const DashboardSEO: React.FC = () => {
  const [articles, setArticles] = useState<ArticleWithSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'issues' | 'good'>('all');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchAllArticles();
      setArticles(data.map(a => ({ ...a, seo: analyzeSEO(a.content) })));
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  const sorted = [...articles].sort((a, b) => a.seo.score - b.seo.score);
  const filtered = sorted.filter(a =>
    filter === 'all' ? true : filter === 'issues' ? a.seo.score < 80 : a.seo.score >= 80
  );

  const avgScore = articles.length
    ? Math.round(articles.reduce((s, a) => s + a.seo.score, 0) / articles.length)
    : 0;
  const goodCount = articles.filter(a => a.seo.score >= 80).length;
  const warnCount = articles.filter(a => a.seo.score >= 60 && a.seo.score < 80).length;
  const badCount = articles.filter(a => a.seo.score < 60).length;

  // Most common issues
  const issueMap: Record<string, number> = {};
  articles.forEach(a => {
    [...a.seo.issues, ...a.seo.suggestions].forEach(issue => {
      const key = issue.split(' ').slice(0, 4).join(' ');
      issueMap[key] = (issueMap[key] ?? 0) + 1;
    });
  });
  const topIssues = Object.entries(issueMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">SEO Analyzer</h1>
          <p className="text-gray-500 text-sm mt-1">วิเคราะห์บทความทั้งหมด + แนะนำการปรับปรุง</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-gray-500 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold hover:border-[#c5a059] hover:text-[#c5a059] transition-all">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-24 flex justify-center"><Loader2 className="w-8 h-8 text-[#c5a059] animate-spin" /></div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400">
          <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-20" />
          <p className="font-bold">ยังไม่มีบทความ</p>
          <a href="/dashboard/blog/new" className="mt-3 text-sm font-black text-[#c5a059] flex items-center gap-1 justify-center hover:underline">
            สร้างบทความแรก <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 col-span-2 lg:col-span-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">คะแนนเฉลี่ย</p>
              <div className={`text-4xl font-black ${scoreColor(avgScore)}`}>{avgScore}</div>
              <p className="text-xs text-gray-500 mt-1">{scoreLabel(avgScore)} · {articles.length} บทความ</p>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${avgScore >= 80 ? 'bg-green-500' : avgScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${avgScore}%` }} />
              </div>
            </div>
            {[
              { label: 'ดี ≥80', value: goodCount, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'ปรับปรุง 60-79', value: warnCount, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'ต้องแก้ <60', value: badCount, color: 'text-red-600', bg: 'bg-red-50' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-2xl border border-gray-100 p-5`}>
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 font-bold mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Articles Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-3">
                <div className="flex gap-1">
                  {(['all', 'issues', 'good'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-[#0f3460] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                      {f === 'all' ? 'ทั้งหมด' : f === 'issues' ? 'ต้องปรับ' : 'ดีแล้ว'}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-bold">เรียงจากต่ำสุด</span>
              </div>

              <div className="divide-y divide-gray-50">
                {filtered.map(a => (
                  <div key={a.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-start gap-4">
                      {/* Score badge */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${scoreBg(a.seo.score)}`}>
                        {a.seo.score}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${a.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {a.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="font-bold text-sm text-gray-800 truncate">{a.title}</p>

                        {/* Top issue */}
                        {a.seo.issues[0] && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-2.5 h-2.5 shrink-0" /> {a.seo.issues[0]}
                          </p>
                        )}
                        {!a.seo.issues[0] && a.seo.suggestions[0] && (
                          <p className="text-[10px] text-amber-500 mt-1 flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5 shrink-0" /> {a.seo.suggestions[0]}
                          </p>
                        )}
                      </div>

                      <a href={`/dashboard/blog/edit/${a.id}`}
                        className="p-2 text-gray-300 hover:text-[#0f3460] transition-colors rounded-lg hover:bg-gray-100 shrink-0">
                        <Edit3 className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Score bar */}
                    <div className="mt-3 ml-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${a.seo.score >= 80 ? 'bg-green-400' : a.seo.score >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${a.seo.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Top Issues + Tips */}
            <div className="space-y-4">
              {/* Common Issues */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-red-500" /> ปัญหาที่พบบ่อย
                </p>
                {topIssues.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">ไม่พบปัญหา</p>
                ) : (
                  <div className="space-y-3">
                    {topIssues.map(([issue, count]) => (
                      <div key={issue} className="flex items-center justify-between gap-3">
                        <p className="text-xs text-gray-600 font-medium flex-1 min-w-0 truncate">{issue}...</p>
                        <span className="text-[10px] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full shrink-0">
                          {count} บทความ
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Optimization Tips */}
              <div className="bg-[#0f3460]/5 rounded-2xl border border-[#0f3460]/10 p-5">
                <p className="text-[10px] font-black text-[#0f3460] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> เพิ่ม Score ทำอะไร?
                </p>
                <div className="space-y-2.5">
                  {[
                    { pts: '+15', tip: 'Meta Title ≤60 ตัวอักษร' },
                    { pts: '+15', tip: 'Meta Description 130-165 ตัว' },
                    { pts: '+15', tip: 'Summary ≥100 ตัว (AEO)' },
                    { pts: '+15', tip: 'FAQ อย่างน้อย 3 ข้อ' },
                    { pts: '+10', tip: 'Framework ≥3 ขั้นตอน' },
                    { pts: '+10', tip: 'Case Study จากองค์กรจริง' },
                    { pts: '+10', tip: 'Keywords ≥5 คำ' },
                  ].map(t => (
                    <div key={t.tip} className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-[#c5a059] bg-[#c5a059]/10 px-1.5 py-0.5 rounded shrink-0">{t.pts}</span>
                      <p className="text-xs text-gray-600 font-medium">{t.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Action */}
              <a href="/dashboard/blog/new"
                className="flex items-center justify-center gap-2 bg-[#c5a059] text-white py-3 rounded-xl font-black text-sm hover:bg-[#e0c58e] hover:text-[#0f3460] transition-all shadow-sm w-full">
                <Zap className="w-4 h-4" /> สร้างบทความใหม่
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSEO;
