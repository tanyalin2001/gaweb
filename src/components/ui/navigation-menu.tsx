"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Flame } from "lucide-react";

export default function HomePage() {
  const [open, setOpen] = useState(false);

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
            SparkleGA
          </Link>

          {/* Center - Nav links */}
          <nav className="hidden md:flex items-center gap-6 font-semibold text-base text-gray-200">
            <Link href="/info" className="hover:text-[#F28C7C] transition">
              資訊
            </Link>
            <div className="relative group">
              <button className="hover:text-[#F28C7C] transition">
                新手教學
              </button>
              <div className="absolute top-full left-0 bg-[#111]/95 border border-[#F28C7C] mt-2 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 backdrop-blur">
                <Link
                  href="/guide/rules"
                  className="block px-4 py-2 text-sm hover:bg-[#F28C7C] hover:text-black"
                >
                  規則
                </Link>
                <Link
                  href="/guide/classes"
                  className="block px-4 py-2 text-sm hover:bg-[#F28C7C] hover:text-black"
                >
                  職業介紹
                </Link>
                <Link
                  href="/guide/heroes"
                  className="block px-4 py-2 text-sm hover:bg-[#F28C7C] hover:text-black"
                >
                  英雄介紹
                </Link>
              </div>
            </div>

            <Link href="/featured" className="hover:text-[#F28C7C] transition">
              精選牌組
            </Link>
            <Link href="/videos" className="hover:text-[#F28C7C] transition">
              推薦影片
            </Link>
            <Link href="/tools" className="hover:text-[#F28C7C] transition">
              實用網站
            </Link>
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
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-[#F28C7C]">新手教學</span>
                    <Link
                      href="/guide/rules"
                      onClick={() => setOpen(false)}
                      className="ml-3 hover:text-[#F28C7C]"
                    >
                      規則
                    </Link>
                    <Link
                      href="/guide/classes"
                      onClick={() => setOpen(false)}
                      className="ml-3 hover:text-[#F28C7C]"
                    >
                      職業介紹
                    </Link>
                    <Link
                      href="/guide/heroes"
                      onClick={() => setOpen(false)}
                      className="ml-3 hover:text-[#F28C7C]"
                    >
                      英雄介紹
                    </Link>
                  </div>

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
                  <Link
                    href="/tools"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#F28C7C]"
                  >
                    實用網站
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </main>
  );
}
