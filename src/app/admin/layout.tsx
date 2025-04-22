'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { LayoutDashboard, Megaphone, FileText } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { role } = useAuth()

  if (role !== 'admin') return null

  const navItems = [
    { href: '/admin/posts', label: '投稿管理', icon: FileText },
    { href: '/admin/info', label: '公告管理', icon: Megaphone },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6 text-xl font-bold text-[#ff5a5f]">GAWeb 後台</div>
        <nav className="space-y-1 px-4">
          {navItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#fff2f2] transition ${
                  active ? 'bg-[#ffeaea] font-semibold text-[#ff5a5f]' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
