'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/useAuth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function NavigationMenu() {
  const { username, role, logout, isLoggedIn } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white border-b shadow-sm sticky top-0 z-50">
      {/* 左側 LOGO */}
      <Link href="/" className="text-2xl font-bold text-black">
        GAWeb
      </Link>

      {/* 桌機版導覽列 */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/info">資訊</Link>
        <Link href="/guide">教學</Link>
        <Link href="/meta">上位牌組</Link>
        <Link href="/community">玩家投稿</Link>
        {isLoggedIn && role === 'admin' && <Link href="/admin">後台管理</Link>}

        {!isLoggedIn ? (
          <>
            <Link href="/login" className="text-blue-600 font-semibold">
              登入
            </Link>
            <Link href="/register" className="text-blue-600 font-semibold">
              註冊
            </Link>
          </>
        ) : (
          <div className="relative group">
            <button className="text-black font-semibold">
              嗨，{username} 👤
            </button>
            <div className="absolute top-8 right-0 w-40 bg-white border shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
              <Link href="/community/mine" className="block px-4 py-2 hover:bg-gray-100">
                我的投稿
              </Link>
              <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                帳號設定
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                登出
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 手機版漢堡選單 */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-10">
              <Link href="/info" onClick={() => setOpen(false)}>資訊</Link>
              <Link href="/guide" onClick={() => setOpen(false)}>教學</Link>
              <Link href="/meta" onClick={() => setOpen(false)}>上位牌組</Link>
              <Link href="/community" onClick={() => setOpen(false)}>玩家投稿</Link>
              {isLoggedIn && role === 'admin' && (
                <Link href="/admin" onClick={() => setOpen(false)}>後台管理</Link>
              )}

              {!isLoggedIn ? (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>登入</Link>
                  <Link href="/register" onClick={() => setOpen(false)}>註冊</Link>
                </>
              ) : (
                <>
                  <Link href="/community/mine" onClick={() => setOpen(false)}>我的投稿</Link>
                  <Link href="/settings" onClick={() => setOpen(false)}>帳號設定</Link>
                  <button onClick={handleLogout}>登出</button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
