'use client'

import Link from 'next/link'
import Image from 'next/image'
import { featuredDecks } from '../data/deckData'

export default function FeatureDecksPage() {
  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖層 */}
      <div className="absolute inset-0 z-[-2]">
        <Image
          src="/bg.png" // 換成你想用的背景圖
          alt="Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[-1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-[#F28C7C] mb-6">精選牌組</h1>
        <p className="text-gray-300 mb-10">
          每週更新的熱門精選牌組，由我們推薦，讓你掌握最潮卡組搭配！
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredDecks.map(deck => (
            <Link
              href={`/meta/${deck.id}`}
              key={deck.id}
              className="bg-[#1a1a1a]/90 border border-[#F28C7C]/30 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-[1.01]"
            >
              <Image
                src={deck.image}
                alt={deck.title}
                width={640}
                height={360}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#F28C7C]">{deck.title}</h2>
                <p className="text-gray-300 mt-1 text-sm">{deck.description}</p>
                <span className="inline-block mt-2 text-sm text-[#F28C7C] underline">查看詳情</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
