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

          {/* Center - Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 font-semibold text-lg text-gray-200">
            <Link href="/info" className="hover:text-[#F28C7C] transition">
              資訊
            </Link>
            <div className="relative group">
              <button className="hover:text-[#F28C7C] transition">
                新手教學
              </button>
              <div className="absolute top-full left-0 mt-2 w-52 bg-[#111]/95 border border-[#F28C7C] rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 backdrop-blur flex flex-col gap-1 p-2">
                <Link
                  href="/guide/rules"
                  className="block px-4 py-2 text-base hover:bg-[#F28C7C] hover:text-black"
                >
                  規則
                </Link>
                <Link
                  href="/guide/classes"
                  className="block px-4 py-2 text-base hover:bg-[#F28C7C] hover:text-black"
                >
                  職業介紹
                </Link>
                <Link
                  href="/guide/heroes"
                  className="block px-4 py-2 text-base hover:bg-[#F28C7C] hover:text-black"
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
              <SheetContent
                side="left"
                className="w-[85%] max-w-sm bg-black/90 text-white backdrop-blur p-6"
              >
                <div className="flex flex-col gap-6 mt-10 text-lg font-semibold">
                  <Link
                    href="/info"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#F28C7C]"
                  >
                    資訊
                  </Link>

                  <div>
                    <span className="font-bold text-[#F28C7C] text-xl mb-2 block">
                      新手教學
                    </span>
                    <div className="ml-4 flex flex-col gap-2 text-lg">
                      <Link
                        href="/guide/rules"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F28C7C]"
                      >
                        規則
                      </Link>
                      <Link
                        href="/guide/classes"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F28C7C]"
                      >
                        職業介紹
                      </Link>
                      <Link
                        href="/guide/heroes"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F28C7C]"
                      >
                        英雄介紹
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/featured"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#F28C7C]"
                  >
                    精選牌組
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
