'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { slugify } from '@/lib/seo'
import { Save, ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  name: z.string().min(1, 'กรุณาใส่ชื่อ'),
  position: z.string().optional(),
  bio_short: z.string().optional(),
  bio_long: z.string().optional(),
  experience_years: z.coerce.number().optional(),
  total_stages: z.coerce.number().optional(),
  total_organizations: z.coerce.number().optional(),
  expertise: z.string().optional(),
  signature_programs: z.string().optional(),
  profile_pdf_url: z.string().optional(),
  is_featured: z.boolean().default(false),
  sort_order: z.coerce.number().default(0),
  facebook_url: z.string().optional(),
  line_id: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function SpeakerForm({ id }: { id?: string }) {
  const router = useRouter()
  const supabase = createClient()
  const isEditing = !!id
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!id) return
    async function load() {
      const { data } = await supabase.from('speakers').select('*').eq('id', id!).single()
      if (data) {
        setValue('name', data.name)
        setValue('position', data.position ?? '')
        setValue('bio_short', data.bio_short ?? '')
        setValue('bio_long', data.bio_long ?? '')
        setValue('experience_years', data.experience_years ?? undefined)
        setValue('total_stages', data.total_stages ?? undefined)
        setValue('total_organizations', data.total_organizations ?? undefined)
        setValue('expertise', data.expertise?.join(', ') ?? '')
        setValue('signature_programs', data.signature_programs?.join(', ') ?? '')
        setValue('profile_pdf_url', data.profile_pdf_url ?? '')
        setValue('is_featured', data.is_featured ?? false)
        setValue('sort_order', data.sort_order ?? 0)
        const links = data.social_links as Record<string, string> | null
        setValue('facebook_url', links?.facebook ?? '')
        setValue('line_id', links?.line ?? '')
      }
    }
    load()
  }, [id])

  async function onSubmit(data: FormData) {
    setSaving(true)
    try {
      const payload = {
        name: data.name,
        slug: slugify(data.name),
        position: data.position ?? null,
        bio_short: data.bio_short ?? null,
        bio_long: data.bio_long ?? null,
        experience_years: data.experience_years ?? null,
        total_stages: data.total_stages ?? null,
        total_organizations: data.total_organizations ?? null,
        expertise: data.expertise ? data.expertise.split(',').map(s => s.trim()).filter(Boolean) : [],
        signature_programs: data.signature_programs ? data.signature_programs.split(',').map(s => s.trim()).filter(Boolean) : [],
        profile_pdf_url: data.profile_pdf_url ?? null,
        is_featured: data.is_featured,
        sort_order: data.sort_order,
        social_links: {
          facebook: data.facebook_url ?? null,
          line: data.line_id ?? null,
        },
      }

      if (isEditing) {
        await supabase.from('speakers').update(payload).eq('id', id!)
      } else {
        await supabase.from('speakers').insert(payload)
      }
      router.push('/speakers')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!confirm('ยืนยันการลบวิทยากรนี้?')) return
    setDeleting(true)
    await supabase.from('speakers').delete().eq('id', id!)
    router.push('/speakers')
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0f3460]/50 focus:ring-2 focus:ring-[#0f3460]/10 bg-white'
  const labelCls = 'block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide'

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/speakers" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-xl font-black text-gray-900">
          {isEditing ? 'แก้ไขโปรไฟล์วิทยากร' : 'เพิ่มวิทยากรใหม่'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:col-span-2">
            <h3 className="font-bold text-gray-800 mb-5">ข้อมูลพื้นฐาน</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>ชื่อ-นามสกุล *</label>
                <input {...register('name')} className={inputCls} placeholder="ชื่อ นามสกุล" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelCls}>ตำแหน่ง / title</label>
                <input {...register('position')} className={inputCls} placeholder="Master Facilitator & Director" />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Bio สั้น (ใช้บน listing page)</label>
                <textarea {...register('bio_short')} rows={2} className={inputCls} placeholder="สรุปประวัติแบบย่อ 2-3 บรรทัด" />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Bio ยาว (รายละเอียด)</label>
                <textarea {...register('bio_long')} rows={5} className={inputCls} placeholder="ประวัติการทำงานโดยละเอียด..." />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-5">สถิติและประสบการณ์</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>ปีประสบการณ์</label>
                <input {...register('experience_years')} type="number" className={inputCls} placeholder="18" />
              </div>
              <div>
                <label className={labelCls}>จำนวนเวทีทั้งหมด</label>
                <input {...register('total_stages')} type="number" className={inputCls} placeholder="1000" />
              </div>
              <div>
                <label className={labelCls}>จำนวนองค์กร</label>
                <input {...register('total_organizations')} type="number" className={inputCls} placeholder="100" />
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-5">ความเชี่ยวชาญ</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Expertise (คั่นด้วย ,)</label>
                <textarea {...register('expertise')} rows={3} className={inputCls}
                  placeholder="Facilitation, Leadership, Communication Skills" />
              </div>
              <div>
                <label className={labelCls}>หลักสูตร Signature (คั่นด้วย ,)</label>
                <textarea {...register('signature_programs')} rows={3} className={inputCls}
                  placeholder="CAP Theory, Transformative Learning, ..." />
              </div>
            </div>
          </div>

          {/* Social + Files */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:col-span-2">
            <h3 className="font-bold text-gray-800 mb-5">ช่องทางติดต่อและไฟล์</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Facebook URL</label>
                <input {...register('facebook_url')} className={inputCls} placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label className={labelCls}>Line ID</label>
                <input {...register('line_id')} className={inputCls} placeholder="@lineid" />
              </div>
              <div>
                <label className={labelCls}>PDF Profile URL</label>
                <input {...register('profile_pdf_url')} className={inputCls} placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-5">การแสดงผล</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input {...register('is_featured')} type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#c5a059] focus:ring-[#c5a059]/20" />
                <span className="text-sm font-medium text-gray-700">แสดงเป็น Featured Speaker</span>
              </label>
              <div>
                <label className={labelCls}>ลำดับการแสดงผล</label>
                <input {...register('sort_order')} type="number" className={inputCls} placeholder="0" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#c5a059]/90 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
          {isEditing && (
            <button type="button" onClick={onDelete} disabled={deleting}
              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold px-6 py-3 rounded-xl transition-all text-sm border border-red-100">
              <Trash2 className="w-4 h-4" />
              ลบ
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
