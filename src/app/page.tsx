"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="text-white font-sans">
      {/* 區塊 1：首頁引導 */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/diao.png"
            alt="首頁背景"
            fill
            className="object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        </div>

        <div className="text-center max-w-4xl mx-auto z-[1]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] mb-6"
          >
            開啟你的 <span className="text-[#F28C7C]">卡牌冒險</span>
          </motion.h1>
          <p className="text-lg md:text-lg text-white drop-shadow-sm mb-10">
            整合套牌解析、牌表趨勢、創意混亂 —— 一起進入 Grand Archive 的世界。
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/register">
              <button className="bg-[#F28C7C] text-black px-6 py-3 rounded-full font-bold text-lg shadow-md hover:scale-105 hover:bg-[#f6a999] transition">
                立即加入
              </button>
            </Link>
            <Link href="/guide">
              <button className="border border-[#F28C7C] text-[#F28C7C] px-6 py-3 rounded-full font-bold text-lg hover:bg-[#F28C7C] hover:text-black transition">
                新手教學
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 分隔線 */}
      <div className="h-[2px] bg-gradient-to-r from-[#f28c7c]/0 via-[#f28c7c] to-[#f28c7c]/0 mx-auto w-2/3" />

      {/* 區塊 2：特色套牌 */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/seasonsend-bg.png"
            alt="特色套牌背景"
            fill
            className="object-cover object-top brightness-40"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        </div>

        <div className="max-w-7xl mx-auto z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F28C7C] mb-12 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            特色套牌
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {["風戰士", "風 Shadowstrike Tristan", "火光刺"].map((name, i) => (
              <motion.div
                key={i}
                className="bg-[#1a1a1a]/90 rounded-2xl overflow-hidden border border-neutral-600 hover:shadow-xl hover:scale-[1.015] transition-all"
                whileHover={{ y: -4 }}
              >
                <Image
                  src={`/feature-decks/deck-${i + 1}.png`}
                  alt={name}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover object-[center_20%]"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#F28C7C] mb-1">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-200">套牌重點</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 分隔線 */}
      <div className="h-[2px] bg-gradient-to-r from-[#f28c7c]/0 via-[#f28c7c] to-[#f28c7c]/0 mx-auto w-2/3" />

      {/* 區塊 3：關於我們 */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/extricatingTouch-bg.png"
            alt="關於我們背景"
            fill
            className="object-cover object-top brightness-40"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <Image
            src="/bg-2.png"
            alt="活動照片"
            width={640}
            height={400}
            className="rounded-xl shadow-xl object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#F28C7C] drop-shadow">
              關於 SparkleGA
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed drop-shadow-sm">
              由玩家打造，為玩家服務 — SparkGA 是 Grand Archive
              玩家社群的聚集地，分享、學習、成長的舞台。
            </p>
            <Link
              href="/info"
              className="text-[#F28C7C] underline hover:text-[#f6a999] text-base font-semibold"
            >
              瞭解更多 →
            </Link>
          </div>
        </div>
      </section>

      {/* 分隔線 */}
      <div className="h-[2px] bg-gradient-to-r from-[#f28c7c]/0 via-[#f28c7c] to-[#f28c7c]/0 mx-auto w-2/3" />

      {/* 區塊 4：影片精選 */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/charm-bg.png"
            alt="影片背景"
            fill
            className="object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-bold text-[#F28C7C] mb-4 drop-shadow">
            影片精選
          </h2>
          <p className="text-gray-200 mb-8 text-lg drop-shadow-sm">
            開箱、解析、實戰精華，全部來自我們的頻道。
          </p>
          <div className="flex justify-center">
            <Image
              src="/youtube-banner.png"
              alt="YouTube 頻道"
              width={220}
              height={220}
              className="rounded-full shadow-xl border-4 border-[#F28C7C] object-cover"
            />
          </div>
          <Link
            href="https://youtube.com/@sparklesislife"
            target="_blank"
            className="inline-block mt-6 bg-[#F28C7C] text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-[#f6a999] transition"
          >
            前往頻道
          </Link>
        </div>
      </section>

      {/* 分隔線 */}
      <div className="h-[2px] bg-gradient-to-r from-[#f28c7c]/0 via-[#f28c7c] to-[#f28c7c]/0 mx-auto w-2/3" />

      {/* 區塊 5：行動號召 */}
      <section className="py-12 px-6 md:px-16 bg-black backdrop-blur-sm text-white text-center">
        <h2 className="text-4xl font-black mb-4 drop-shadow-sm">
          準備好加入戰局了嗎？
        </h2>
        <p className="text-lg mb-6 drop-shadow-sm">
          參加比賽、分享牌表、一起和社群成長。
        </p>
        <Link href="/register">
          <button className="bg-[#F28C7C] text-black font-bold px-8 py-3 rounded-full text-lg hover:bg-[#f6a999] transition">
            加入 SparkGA
          </button>
        </Link>
      </section>
    </main>
  );
}
