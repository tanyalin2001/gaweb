'use client';
import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useAuth } from '@/lib/useAuth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-black`}>
        <header className="flex items-center justify-between px-6 py-4 border-b bg-gray-100 shadow-sm">
          <h1 className="text-xl font-bold">卡牌社群</h1>
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>選單</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4 text-lg">
                <Link href="/">首頁</Link>
                <Link href="/info">資訊頁</Link>
                <Link href="/guide">教學規則</Link>
                <Link href="/meta">上位牌組</Link>
                <Link href="/community">玩家投稿</Link>
                {auth?.role === 'admin' && <Link href="/admin">後台管理</Link>}
                {!auth && <Link href="/login">登入</Link>}
                {!auth && <Link href="/register">註冊</Link>}
                {auth && <span className="text-sm text-gray-500">👤 {auth.email}</span>}
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex gap-6 text-lg font-medium items-center">
            <Link href="/">首頁</Link>
            <Link href="/info">資訊頁</Link>
            <Link href="/guide">教學規則</Link>
            <Link href="/meta">上位牌組</Link>
            <Link href="/community">玩家投稿</Link>
            {auth?.role === 'admin' && <Link href="/admin">後台管理</Link>}
            {!auth && <Link href="/login">登入</Link>}
            {!auth && <Link href="/register">註冊</Link>}
            {auth && <span className="text-sm text-gray-600">👤 {auth.email}</span>}
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
