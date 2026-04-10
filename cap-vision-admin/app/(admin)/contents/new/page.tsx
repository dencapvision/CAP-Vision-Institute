import ContentForm from '@/components/contents/ContentForm'
import { Suspense } from 'react'

export const metadata = { title: 'สร้างเนื้อหาใหม่ — CAP Vision Admin' }

export default function NewContentPage() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ContentForm />
    </Suspense>
  )
}
