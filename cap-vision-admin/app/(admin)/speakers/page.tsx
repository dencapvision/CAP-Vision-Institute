import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Users, Pencil, Star } from 'lucide-react'
import type { Metadata } from 'next'
import type { Database } from '@/types/database'

export const metadata: Metadata = { title: 'วิทยากร — CAP Vision Admin' }

export default async function SpeakersPage() {
  const supabase = await createClient()
  const { data: speakers } = (await supabase
    .from('speakers')
    .select('id, name, position, experience_years, total_stages, is_featured, created_at')
    .order('sort_order', { ascending: true })) as { data: Database['public']['Tables']['speakers']['Row'][] | null }

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">วิทยากร</h1>
          <p className="text-gray-500 text-sm mt-1">จัดการโปรไฟล์วิทยากรและ Master Facilitator</p>
        </div>
        <Link href="/speakers/new"
          className="inline-flex items-center gap-2 bg-[#c5a059] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#c5a059]/90 transition-all shadow-sm">
          <Plus className="w-4 h-4" /> เพิ่มวิทยากร
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!speakers?.length && (
          <div className="col-span-3 bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
            <Users className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p>ยังไม่มีวิทยากร</p>
          </div>
        )}
        {speakers?.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0f3460] to-[#1a4a7a] flex items-center justify-center text-white font-black text-lg">
                {s.name.charAt(0)}
              </div>
              {s.is_featured && (
                <span className="bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <h3 className="font-black text-gray-900 mb-1">{s.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{s.position ?? 'Master Facilitator'}</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-4">
              {s.experience_years && <span>{s.experience_years}+ ปี</span>}
              {s.total_stages && <span>{s.total_stages}+ เวที</span>}
            </div>
            <Link href={`/speakers/${s.id}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#0f3460] hover:text-[#c5a059] transition-colors">
              <Pencil className="w-3.5 h-3.5" /> แก้ไขโปรไฟล์
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
