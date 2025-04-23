'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: '投稿管理', href: '/admin/posts' },
  { label: '公告管理', href: '/admin/info' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-white border-r shadow-sm h-screen sticky top-0 left-0 p-6">
      <h1 className="text-2xl font-bold text-[#ff5a5f] mb-8">SparkGA Admin</h1>
      <nav className="space-y-4">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded ${
              pathname.startsWith(item.href)
                ? 'bg-[#ffeaea] text-[#ff5a5f] font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
