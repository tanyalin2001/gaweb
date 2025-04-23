'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Video {
  id: string
  title: string
  thumbnail: string
  tag: string
  youtubeUrl: string
}

const playlists: { title: string; videos: Video[] }[] = [
  {
    title: '🎓 新手導向',
    videos: [
      {
        id: 'v2',
        title: '入坑懶人包！入坑萬用牌、基礎元素特性與五大流派簡介',
        thumbnail: '/videos/beginner-guide.png',
        tag: '新手教學',
        youtubeUrl: 'https://youtu.be/yFTRUU1ki_4?si=4BB29zKKc9N839QV',
      },
      {
        id: 'v5',
        title: 'Grand Archive 是什麼？三分鐘快速了解',
        thumbnail: '/videos/beginner-guide2.png',
        tag: '新手教學',
        youtubeUrl: 'https://youtube.com/watch?v=xxx2',
      },
      {
        id: 'v6',
        title: 'Grand Archive 是什麼？三分鐘快速了解',
        thumbnail: '/videos/beginner-recommendation.png',
        tag: '新手教學',
        youtubeUrl: 'https://youtube.com/watch?v=xxx2',
      },
    ],
  },
  {
    title: '📹 Vlog 系列',
    videos: [
      {
        id: 'v1',
        title: '開箱一箱 GB01！我們抽到了 SSR！',
        thumbnail: '/videos/box-opening.jpg',
        tag: '開箱',
        youtubeUrl: 'https://youtube.com/watch?v=xxx1',
      },
    ],
  },
  {
    title: '🃏 牌組介紹',
    videos: [
      {
        id: 'v4',
        title: '風札德控制詳細解析！',
        thumbnail: '/videos/deck-wind.jpg',
        tag: '牌組解析',
        youtubeUrl: 'https://youtube.com/watch?v=xxx4',
      },
    ],
  },
  {
    title: '📊 環境介紹',
    videos: [
      {
        id: 'v3',
        title: 'Seattle 大賽精華！你錯過的精彩瞬間',
        thumbnail: '/videos/seattle.jpg',
        tag: '大賽報導',
        youtubeUrl: 'https://youtube.com/watch?v=xxx3',
      },
    ],
  },
]

export default function VideosPage() {
  return (
    <main className="relative min-h-screen text-white font-sans">
      <div className="absolute inset-0 z-[-2]">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[-1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-[#F28C7C] mb-12">🎬 推薦影片</h1>

        {playlists.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <h2 className="text-2xl font-bold text-[#F28C7C] mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1a1a1a]/90 rounded-xl shadow-md border border-[#F28C7C]/20 overflow-hidden"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={400}
                    height={200}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4">
                    <span className="text-xs bg-[#F28C7C]/10 text-[#F28C7C] px-2 py-1 rounded inline-block mb-2">
                      {video.tag}
                    </span>
                    <h3 className="text-lg font-semibold mb-3 text-white">{video.title}</h3>
                    <Link
                      href={video.youtubeUrl}
                      target="_blank"
                      className="inline-block bg-[#F28C7C] text-black px-4 py-2 rounded hover:bg-[#e0474d] transition"
                    >
                      ▶️ 觀看影片
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
