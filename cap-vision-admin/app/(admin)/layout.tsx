import Sidebar from '@/components/layout/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
