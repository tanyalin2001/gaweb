'use client'

import { useAuth } from '@/hooks/useAuth'

export default function AdminNavbar() {
  const { username, logout } = useAuth()

  return (
    <header className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
      <div className="text-sm text-gray-500">歡迎，{username}</div>
      <button
        onClick={logout}
        className="text-sm text-red-500 hover:underline"
      >
        登出
      </button>
    </header>
  )
}
