import { createClient } from '@/lib/supabase/server'
import { FileText, Users, BookOpen, Calendar, MessageSquare, Image, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Database } from '@/types/database'

export const metadata = { title: 'Dashboard — CAP Vision Admin' }

async function getStats() {
  const supabase = await createClient()
  const [
    { count: totalContents },
    { count: publishedContents },
    { count: totalSpeakers },
    { count: totalCourses },
    { count: totalEvents },
    { count: totalLeads },
    { count: newLeads },
    { count: totalMedia },
  ] = await Promise.all([
    (supabase.from('contents') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('contents') as any).select('*', { count: 'exact', head: true }).eq('status', 'published'),
    (supabase.from('speakers') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('courses') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('events') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('leads') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('leads') as any).select('*', { count: 'exact', head: true }).eq('status', 'new'),
    (supabase.from('media') as any).select('*', { count: 'exact', head: true }),
  ])
  return { totalContents, publishedContents, totalSpeakers, totalCourses, totalEvents, totalLeads, newLeads, totalMedia }
}

async function getRecentLeads() {
  const supabase = await createClient()
  const { data } = (await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5)) as { data: Database['public']['Tables']['leads']['Row'][] | null }
  return data ?? []
}

async function getRecentContents() {
  const supabase = await createClient()
  const { data } = (await supabase.from('contents').select('id, title, status, content_type, updated_at').order('updated_at', { ascending: false }).limit(5)) as { data: Database['public']['Tables']['contents']['Row'][] | null }
  return data ?? []
}

const statCards = [
  { label: 'เนื้อหาทั้งหมด', key: 'totalContents' as const, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', href: '/contents' },
  { label: 'เผยแพร่แล้ว', key: 'publishedContents' as const, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50 border-green-100', href: '/contents?status=published' },
  { label: 'วิทยากร', key: 'totalSpeakers' as const, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', href: '/speakers' },
  { label: 'หลักสูตร', key: 'totalCourses' as const, icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100', href: '/courses' },
  { label: 'อีเวนท์', key: 'totalEvents' as const, icon: Calendar, color: 'text-pink-600', bg: 'bg-pink-50 border-pink-100', href: '/events' },
  { label: 'Leads ใหม่', key: 'newLeads' as const, icon: MessageSquare, color: 'text-red-600', bg: 'bg-red-50 border-red-100', href: '/leads' },
  { label: 'Media ไฟล์', key: 'totalMedia' as const, icon: Image, color: 'text-teal-600', bg: 'bg-teal-50 border-teal-100', href: '/media' },
]

const statusColor: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  archived: 'bg-yellow-100 text-yellow-700',
}

const leadStatusColor: Record<string, string> = {
  new: 'bg-red-100 text-red-700',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-600',
}

export default async function DashboardPage() {
  const stats = await getStats()
  const recentLeads = await getRecentLeads()
  const recentContents = await getRecentContents()

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">ภาพรวมระบบ CAP Vision Admin CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {statCards.map(({ label, key, icon: Icon, color, bg, href }) => (
          <Link key={key} href={href}
            className={`${bg} border rounded-2xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group`}>
            <div className={`${color} mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-gray-900">{stats[key] ?? 0}</p>
            <p className="text-xs text-gray-500 mt-1 leading-tight">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="/contents/new?type=article"
          className="inline-flex items-center gap-2 bg-[#0f3460] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0f3460]/90 transition-all">
          <FileText className="w-4 h-4" /> + บทความใหม่
        </Link>
        <Link href="/speakers/new"
          className="inline-flex items-center gap-2 bg-[#c5a059] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c5a059]/90 transition-all">
          <Users className="w-4 h-4" /> + วิทยากรใหม่
        </Link>
        <Link href="/courses/new"
          className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-300 transition-all">
          <BookOpen className="w-4 h-4" /> + หลักสูตรใหม่
        </Link>
        <Link href="/events/new"
          className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-300 transition-all">
          <Calendar className="w-4 h-4" /> + อีเวนท์ใหม่
        </Link>
      </div>

      {/* Two-column bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent contents */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> เนื้อหาล่าสุด
            </h2>
            <Link href="/contents" className="text-xs text-[#0f3460] font-medium hover:underline">ดูทั้งหมด</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentContents.length === 0 && (
              <p className="px-6 py-8 text-center text-gray-400 text-sm">ยังไม่มีเนื้อหา</p>
            )}
            {recentContents.map(c => (
              <Link key={c.id} href={`/contents/${c.id}`}
                className="flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors group">
                <FileText className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#0f3460]">{c.title}</p>
                  <p className="text-xs text-gray-400">{c.content_type}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg ${statusColor[c.status ?? 'draft'] ?? 'bg-gray-100 text-gray-600'}`}>
                  {c.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-400" /> Leads ล่าสุด
              {(stats.newLeads ?? 0) > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {stats.newLeads} ใหม่
                </span>
              )}
            </h2>
            <Link href="/leads" className="text-xs text-[#0f3460] font-medium hover:underline">ดูทั้งหมด</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.length === 0 && (
              <p className="px-6 py-8 text-center text-gray-400 text-sm">ยังไม่มี leads</p>
            )}
            {recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center gap-3 px-6 py-3.5">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-gray-500">{lead.name?.charAt(0) ?? '?'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{lead.name ?? 'ไม่ระบุ'}</p>
                  <p className="text-xs text-gray-400 truncate">{lead.company ?? lead.email ?? '-'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg ${leadStatusColor[lead.status ?? 'new'] ?? 'bg-gray-100 text-gray-600'}`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
