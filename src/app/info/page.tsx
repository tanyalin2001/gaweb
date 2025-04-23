'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface InfoEntry {
  _id: string
  title: string
  content: string
  coverUrl?: string
  createdAt: string
  tags?: string[]
}

export default function InfoPage() {
  const [posts, setPosts] = useState<InfoEntry[]>([])
  const searchParams = useSearchParams()
  const filterTag = searchParams.get('tag')

  useEffect(() => {
    fetch('/api/info')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  const filtered = filterTag
    ? posts.filter(p => p.tags?.includes(filterTag))
    : posts

  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖片 */}
      <div className="absolute inset-0 z-[-2]">
        <img
          src="/coronation-bg.png" 
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[-1]" />

      <div className="px-4 md:px-10 py-16 relative z-10">
        <h1 className="text-4xl font-extrabold text-center text-[#F28C7C] mb-12">
          最新公告
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {filtered.map(post => (
            <Link
              key={post._id}
              href={`/info/${post._id}`}
              className="group flex flex-col md:flex-row items-stretch border border-[#F28C7C]/20 rounded-xl overflow-hidden bg-[#121212]/80 hover:bg-[#1a1a1a]/90 shadow-md transition-all"
            >
              <img
                src={post.coverUrl || '/default-cover.jpg'}
                alt={post.title}
                className="w-full md:w-56 h-44 md:h-auto object-cover"
              />
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-[#F28C7C] mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                  <span>{new Date(post.createdAt).toLocaleDateString('zh-TW')}</span>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags?.map(tag => (
                      <Link
                        key={tag}
                        href={`/info?tag=${tag}`}
                        className="text-[#F28C7C] bg-[#F28C7C]/10 px-2 py-0.5 rounded-full hover:bg-[#F28C7C]/20 transition"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
