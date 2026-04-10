import ContentForm from '@/components/contents/ContentForm'
import { Suspense } from 'react'

export const metadata = { title: 'แก้ไขเนื้อหา — CAP Vision Admin' }

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ContentForm id={id} />
    </Suspense>
  )
}
