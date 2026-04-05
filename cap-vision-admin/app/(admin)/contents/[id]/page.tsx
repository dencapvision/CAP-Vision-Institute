import ContentForm from '@/components/contents/ContentForm'

export const metadata = { title: 'แก้ไขเนื้อหา — CAP Vision Admin' }

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ContentForm id={id} />
}
