'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FileText, Users, BookOpen, Briefcase,
  Calendar, Image, Settings, LogOut, ChevronRight,
  Sparkles, Tag, MessageSquare, Menu, X
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contents', label: 'บทความ / ข้อมูล', icon: FileText },
  { href: '/speakers', label: 'วิทยากร', icon: Users },
  { href: '/courses', label: 'หลักสูตร', icon: BookOpen },
  { href: '/events', label: 'อีเวนท์', icon: Calendar },
  { href: '/media', label: 'Media Library', icon: Image },
  { href: '/leads', label: 'Leads', icon: MessageSquare },
  { href: '/categories', label: 'หมวดหมู่ / Tags', icon: Tag },
] as const

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
        </div>
        <div>
          <p className="text-white font-black text-sm leading-tight">CAP Vision</p>
          <p className="text-white/40 text-xs">Admin CMS</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                active
                  ? 'bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/8'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-[#c5a059]' : 'text-white/40 group-hover:text-white/70')} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link href="/seo" onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/8 transition-all">
          <Settings className="w-4 h-4 text-white/40" />
          SEO Settings
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          ออกจากระบบ
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-[#0f3460] border border-white/10 flex items-center justify-center text-white shadow-lg"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-[#0a1628] border-r border-white/8 transition-transform duration-300 lg:hidden',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-[#0a1628] border-r border-white/8 z-30">
        <SidebarContent />
      </aside>
    </>
  )
}
