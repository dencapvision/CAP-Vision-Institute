import SpeakerForm from '@/components/speakers/SpeakerForm'
export const metadata = { title: 'แก้ไขวิทยากร — CAP Vision Admin' }
export default async function EditSpeakerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SpeakerForm id={id} />
}
