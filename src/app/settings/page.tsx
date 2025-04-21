'use client'

import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { email, username, role } = useAuth()

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">帳號設定</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">使用者名稱</label>
          <input
            className="mt-1 w-full px-3 py-2 border rounded-md"
            type="text"
            value={username}
            disabled
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            className="mt-1 w-full px-3 py-2 border rounded-md"
            type="email"
            value={email}
            disabled
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">角色</label>
          <input
            className="mt-1 w-full px-3 py-2 border rounded-md"
            type="text"
            value={role}
            disabled
          />
        </div>

        <p className="text-sm text-gray-500">（未來會開放修改密碼、刪帳號等功能）</p>
      </div>
    </div>
  )
}
