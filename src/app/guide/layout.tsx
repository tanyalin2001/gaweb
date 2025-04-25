"use client";

import Image from "next/image";
import { ReactNode } from "react";

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖層 */}
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/bg-2.png"
          alt="Guide Background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 全畫面黑色半透明遮罩 */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[-1]" />

      {/* 內文容器保持原樣 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-20">
        {children}
      </div>
    </main>
  );
}
