"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Footer from "@/components/ui/footer";

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col text-white font-sans">
      {/* 背景圖層 */}
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/bg-2.png"
          alt="Guide Background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 黑色遮罩 */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[-1]" />

      {/* 主體內容 */}
      <main className="flex-grow relative z-10 max-w-7xl w-full mx-auto px-6 md:px-10 pt-16 pb-20">
        {children}
      </main>

      {/* Footer 全寬區塊 */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
