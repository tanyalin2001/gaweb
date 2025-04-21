'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="bg-[#fff2ee] text-[#333]">
      {/* HERO */}
      <section className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-[#ff5a5f]"
          >
            SparkGA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-[#ff5a5f]"
          >
            一起玩、一起開箱、一起投稿的 TCG 創作社群。
          </motion.p>
          <div className="flex gap-4 mt-4">
            <Link href="/register">
              <button className="bg-[#ff5a5f] text-white px-6 py-2 rounded hover:bg-[#e0474d] transition">
                註冊帳號
              </button>
            </Link>
            <Link href="/guide">
              <button className="border border-[#ff5a5f] text-[#ff5a5f] px-6 py-2 rounded hover:bg-[#ffeaea] transition">
                新手教學
              </button>
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/hero-girls.png"
            alt="Hero Banner"
            width={500}
            height={500}
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* 精選卡片 */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold text-[#ff5a5f] text-center mb-10">熱門卡片展示</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {['Fractal of Rain', 'Creative Shock', 'Snow Fairy'].map((name, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-[#ffdede] rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <Image
                src={`/cards/card-${i + 1}.jpg`}
                alt={name}
                width={400}
                height={250}
                className="rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-[#ff5a5f]">{name}</h3>
              <p className="text-sm text-gray-500 mt-1">精選展示卡片</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 關於我們 */}
      <section className="px-6 md:px-16 py-24 bg-[#fff8f6] flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <Image
            src="/ga-community.jpg"
            alt="GA Community"
            width={600}
            height={400}
            className="rounded-xl shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-[#ff5a5f]">關於 SparkGA</h2>
          <p className="text-gray-600">
            我們是一個專注於 Grand Archive 的玩家社群，讓你投稿、學習、交朋友，從卡圖到對戰全都照顧到！
          </p>
          <Link href="/info" className="text-[#ff5a5f] underline hover:text-[#e0474d] text-sm">
            了解更多 &rarr;
          </Link>
        </div>
      </section>

      {/* YouTube 區塊 */}
      <section className="px-6 md:px-16 py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#ff5a5f] mb-4">🎥 也來看看我們的 YouTube！</h2>
        <p className="text-gray-700 mb-6">一起看我們的開箱 / 教學 / 大賽報導 ✨</p>
        <div className="flex justify-center">
  <Image
    src="/youtube-banner.png"
    alt="YouTube Banner"
    width={300}
    height={300}
    className="rounded-full shadow-md border-4 border-[#ff5a5f] object-cover"
  />
</div>

        <Link
          href="https://youtube.com/@sparklesislife"
          target="_blank"
          className="inline-block mt-6 bg-[#ff5a5f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e0474d] transition"
        >
          🔔 前往 YouTube 頻道
        </Link>
      </section>

      {/* CTA 加入社群 */}
      <section className="px-6 md:px-16 py-20 bg-[#ff5a5f] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">立即加入 SparkGA</h2>
        <p className="mb-6">投稿牌組、看實況、成為卡牌圈創作者！</p>
        <Link href="/register">
          <button className="bg-white text-[#ff5a5f] font-semibold px-8 py-3 rounded-md hover:bg-[#fff8f6] transition">
            立即註冊
          </button>
        </Link>
      </section>
    </main>
  )
}
