"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Flame } from "lucide-react";

export default function HomePage() {
  const { username, role, logout, isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <main className="text-white font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md text-white shadow-md border-b border-[#ffffff22]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left - Logo / Icon */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[#F28C7C] text-2xl font-black tracking-wide hover:opacity-90"
          >
            <Flame className="w-6 h-6 -mt-0.5" />
            SparkGA
          </Link>

          {/* Center - Nav links */}
          <nav className="hidden md:flex items-center gap-6 font-semibold text-base text-gray-200">
            <Link href="/info" className="hover:text-[#F28C7C] transition">
              資訊
            </Link>
            <Link href="/guide" className="hover:text-[#F28C7C] transition">
              新手教學
            </Link>
            <Link href="/meta" className="hover:text-[#F28C7C] transition">
              上位牌組
            </Link>
            <Link href="/videos" className="hover:text-[#F28C7C] transition">
              推薦影片
            </Link>
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 border border-[#F28C7C] rounded-full text-[#F28C7C] hover:bg-[#F28C7C] hover:text-black transition"
                >
                  登入
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 border border-[#F28C7C] rounded-full text-[#F28C7C] hover:bg-[#F28C7C] hover:text-black transition"
                >
                  註冊
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="font-semibold text-white">
                  嗨，{username} 👤
                </button>
                <div className="absolute top-12 right-0 w-44 bg-[#111]/95 border border-[#F28C7C] shadow-xl rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 backdrop-blur">
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm hover:bg-[#F28C7C] hover:text-black"
                  >
                    帳號設定
                  </Link>
                  {role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm hover:bg-[#F28C7C] hover:text-black"
                    >
                      後台管理
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#F28C7C] hover:text-black"
                  >
                    登出
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Right - Mobile Toggle */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Menu className="text-[#F28C7C] w-6 h-6" />
              </SheetTrigger>
              <SheetContent className="bg-black/90 text-white backdrop-blur">
                <div className="flex flex-col gap-5 mt-10 text-base font-semibold">
                  <Link
                    href="/info"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#F28C7C]"
                  >
                    資訊
                  </Link>
                  <Link
                    href="/guide"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#F28C7C]"
                  >
                    新手教學
                  </Link>
                  <Link
                    href="/meta"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#F28C7C]"
                  >
                    上位牌組
                  </Link>
                  <Link
                    href="/videos"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#F28C7C]"
                  >
                    推薦影片
                  </Link>
                  {!isLoggedIn ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="text-[#F28C7C]"
                      >
                        登入
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="text-[#F28C7C]"
                      >
                        註冊
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/settings" onClick={() => setOpen(false)}>
                        帳號設定
                      </Link>
                      {role === "admin" && (
                        <Link href="/admin" onClick={() => setOpen(false)}>
                          後台管理
                        </Link>
                      )}
                      <button onClick={handleLogout}>登出</button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </main>
  );
}
