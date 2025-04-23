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

const videos: Video[] = [
  {
    id: 'v1',
    title: '開箱一箱 GB01！我們抽到了 SSR！',
    thumbnail: '/videos/box-opening.jpg',
    tag: '開箱',
    youtubeUrl: 'https://youtube.com/watch?v=xxx1',
  },
  {
    id: 'v2',
    title: 'Grand Archive 是什麼？三分鐘快速了解',
    thumbnail: '/videos/ga-intro.jpg',
    tag: '新手教學',
    youtubeUrl: 'https://youtube.com/watch?v=xxx2',
  },
  {
    id: 'v3',
    title: 'Seattle 大賽精華！你錯過的精彩瞬間',
    thumbnail: '/videos/seattle.jpg',
    tag: '大賽報導',
    youtubeUrl: 'https://youtube.com/watch?v=xxx3',
  },
]

export default function VideosPage() {
  return (
    <main className="px-6 md:px-16 py-12 bg-[#fffaf9] min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#ff5a5f] mb-10">🎬 推薦影片</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-md border border-[#ffdede] overflow-hidden"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={400}
              height={200}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4">
              <span className="text-xs bg-[#ffeaea] text-[#ff5a5f] px-2 py-1 rounded inline-block mb-2">
                {video.tag}
              </span>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{video.title}</h3>
              <Link
                href={video.youtubeUrl}
                target="_blank"
                className="inline-block bg-[#ff5a5f] text-white px-4 py-2 rounded hover:bg-[#e0474d] transition"
              >
                ▶️ 觀看影片
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
