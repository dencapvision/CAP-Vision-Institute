import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Search, FileText, Eye, Pencil } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'เนื้อหา — CAP Vision Admin' }

const statusBadge: Record<string, string> = {
  published: 'bg-green-100 text-green-700 border-green-200',
  draft: 'bg-gray-100 text-gray-600 border-gray-200',
  archived: 'bg-yellow-100 text-yellow-700 border-yellow-200',
}

const typeLabel: Record<string, string> = {
  article: 'บทความ', service: 'บริการ', course: 'หลักสูตร',
  portfolio: 'Portfolio', page: 'หน้า', news: 'ข่าวสาร',
}

export default async function ContentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; type?: string }>
}) {
  const { q, status, type } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('contents')
    .select('id, title, slug, content_type, status, created_at, updated_at')
    .order('updated_at', { ascending: false })

  if (status) query = query.eq('status', status)
  if (type) query = query.eq('content_type', type)
  if (q) query = query.ilike('title', `%${q}%`)

  const { data: contents } = await query.limit(50)

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">เนื้อหา</h1>
          <p className="text-gray-500 text-sm mt-1">จัดการบทความ บริการ และเนื้อหาทั้งหมด</p>
        </div>
        <Link href="/contents/new"
          className="inline-flex items-center gap-2 bg-[#0f3460] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#0f3460]/90 transition-all shadow-sm">
          <Plus className="w-4 h-4" /> สร้างเนื้อหาใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <form className="flex-1 min-w-[200px] max-w-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="q"
              defaultValue={q}
              placeholder="ค้นหาเนื้อหา..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:border-[#0f3460]/50 focus:ring-2 focus:ring-[#0f3460]/10"
            />
          </div>
        </form>

        {/* Status filter */}
        {['', 'published', 'draft', 'archived'].map(s => (
          <Link key={s} href={s ? `?status=${s}${type ? `&type=${type}` : ''}` : '/contents'}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${status === s || (!status && !s)
              ? 'bg-[#0f3460] text-white border-[#0f3460]'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
            {s === '' ? 'ทั้งหมด' : s === 'published' ? 'เผยแพร่' : s === 'draft' ? 'Draft' : 'Archive'}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wide w-1/2">หัวข้อ</th>
              <th className="text-left px-4 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">ประเภท</th>
              <th className="text-left px-4 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">สถานะ</th>
              <th className="text-left px-4 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">อัปเดต</th>
              <th className="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {!contents?.length && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                  ยังไม่มีเนื้อหา
                </td>
              </tr>
            )}
            {contents?.map(c => (
              <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900 truncate max-w-xs">{c.title}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">{c.slug}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-600 text-xs">{typeLabel[c.content_type] ?? c.content_type}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${statusBadge[c.status ?? 'draft']}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-gray-400">
                  {c.updated_at ? new Date(c.updated_at).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' }) : '-'}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/contents/${c.id}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#0f3460] hover:bg-[#0f3460]/8 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    {c.status === 'published' && (
                      <a href={`https://capvisionpartner.com/resources/${c.slug}`} target="_blank" rel="noopener"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
