"use client";

import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  image?: string;
  children?: ReactNode;
}

export default function HeroSection({
  title,
  image = "/coronation-bg.png",
  children,
}: HeroSectionProps) {
  return (
    <section className="relative z-10 w-full min-h-screen text-white font-sans">
      {/* 背景圖層 */}
      <div className="absolute inset-0 z-[-2]">
        <img
          src={image}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[-1]" />

      {/* 內容 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] text-center drop-shadow">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
