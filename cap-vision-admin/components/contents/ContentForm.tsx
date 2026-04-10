'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { slugify, autoMetaDescription, buildArticleJsonLd } from '@/lib/seo'
import BlockEditor from '@/components/editor/BlockEditor'
import { Save, Eye, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  title: z.string().min(1, 'กรุณาใส่หัวข้อ'),
  slug: z.string().min(1, 'กรุณาใส่ slug'),
  excerpt: z.string().optional(),
  content_type: z.string().min(1),
  status: z.enum(['draft', 'published', 'archived']),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  keywords: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface ContentFormProps {
  id?: string
}

export default function ContentForm({ id }: ContentFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const isEditing = !!id

  const [content, setContent] = useState<object | null>(null)
  const [saving, setSaving] = useState(false)
  const [seoData, setSeoData] = useState<{ id?: string } | null>(null)

  const { register, handleSubmit, watch, setValue, control,
    formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      content_type: searchParams.get('type') ?? 'article',
      status: 'draft',
    },
  })

  const title = watch('title')
  const excerpt = watch('excerpt')

  // Auto-slug from title
  useEffect(() => {
    if (!isEditing && title) {
      setValue('slug', slugify(title))
    }
  }, [title, isEditing, setValue])

  // Auto meta description from excerpt
  useEffect(() => {
    if (excerpt && !watch('meta_description')) {
      setValue('meta_description', autoMetaDescription(excerpt))
    }
  }, [excerpt])

  // Load existing content
  useEffect(() => {
    if (!id) return
    async function load() {
      const { data } = await (supabase.from('contents') as any).select('*').eq('id', id!).single()
      if (data) {
        setValue('title', data.title)
        setValue('slug', data.slug)
        setValue('excerpt', data.excerpt ?? '')
        setValue('content_type', data.content_type)
        setValue('status', (data.status as 'draft' | 'published' | 'archived') ?? 'draft')
        setContent(data.content as object)
      }
      // Load SEO
      const { data: seo } = await (supabase.from('seo_metadata') as any).select('*').eq('content_id', id!).single()
      if (seo) {
        setValue('meta_title', seo.meta_title ?? '')
        setValue('meta_description', seo.meta_description ?? '')
        setValue('keywords', seo.keywords?.join(', ') ?? '')
        setSeoData({ id: seo.id })
      }
    }
    load()
  }, [id])

  async function onSubmit(data: FormData) {
    setSaving(true)
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? null,
        content: content,
        content_type: data.content_type,
        status: data.status,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      }

      let contentId = id
      if (isEditing) {
        await (supabase.from('contents') as any).update(payload).eq('id', id!)
      } else {
        const { data: created } = await (supabase.from('contents') as any).insert(payload).select('id').single()
        contentId = created?.id
      }

      // Upsert SEO
      if (contentId) {
        const seoPayload = {
          content_id: contentId,
          meta_title: data.meta_title ?? data.title,
          meta_description: data.meta_description ?? data.excerpt ?? '',
          keywords: data.keywords ? data.keywords.split(',').map(k => k.trim()) : [],
          schema_json: buildArticleJsonLd({
            title: data.title,
            description: data.excerpt ?? '',
            url: `https://capvisionpartner.com/resources/${data.slug}`,
          }),
        }
        if (seoData?.id) {
          await (supabase.from('seo_metadata') as any).update(seoPayload).eq('id', seoData.id)
        } else {
          await (supabase.from('seo_metadata') as any).insert(seoPayload)
        }
      }

      router.push('/contents')
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/contents" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-gray-900">
            {isEditing ? 'แก้ไขเนื้อหา' : 'สร้างเนื้อหาใหม่'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left: Main editor */}
          <div className="space-y-5">
            {/* Title */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <input
                {...register('title')}
                placeholder="หัวข้อเนื้อหา..."
                className="w-full text-2xl font-black text-gray-900 placeholder-gray-300 border-none outline-none resize-none bg-transparent"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">Slug:</span>
                <input
                  {...register('slug')}
                  className="flex-1 text-xs font-mono text-[#0f3460] bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none"
                />
              </div>

              {/* Excerpt */}
              <textarea
                {...register('excerpt')}
                placeholder="สรุปย่อ (excerpt) — ใช้เป็น meta description อัตโนมัติ"
                rows={2}
                className="w-full mt-4 text-sm text-gray-600 placeholder-gray-300 border-none outline-none resize-none bg-transparent leading-relaxed"
              />
            </div>

            {/* Block Editor */}
            <BlockEditor content={content} onChange={setContent} />
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-4">
            {/* Publish settings */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-4 text-sm">การเผยแพร่</h3>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">ประเภทเนื้อหา</label>
                <select {...register('content_type')}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0f3460]/50 bg-white">
                  <option value="article">บทความ</option>
                  <option value="service">บริการ</option>
                  <option value="page">หน้า</option>
                  <option value="news">ข่าวสาร</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">สถานะ</label>
                <select {...register('status')}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0f3460]/50 bg-white">
                  <option value="draft">Draft (ฉบับร่าง)</option>
                  <option value="published">Published (เผยแพร่)</option>
                  <option value="archived">Archived (เก็บถาวร)</option>
                </select>
              </div>

              <button type="submit" disabled={saving}
                className="w-full bg-[#0f3460] hover:bg-[#0f3460]/90 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>

            {/* SEO Panel */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-400" /> SEO Settings
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Meta Title</label>
                  <input {...register('meta_title')}
                    placeholder="ปล่อยว่าง = ใช้หัวข้อหลัก"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0f3460]/50 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Meta Description</label>
                  <textarea {...register('meta_description')}
                    rows={3}
                    placeholder="สรุปสำหรับ Google (max 155 ตัว)"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0f3460]/50 bg-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Keywords</label>
                  <input {...register('keywords')}
                    placeholder="คั่นด้วยจุลภาค: CAP, วิทยากร, ..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0f3460]/50 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
