'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface InfoEntry {
  _id: string
  title: string
  content: string
  coverUrl?: string
  createdAt: string
}

export default function InfoPage() {
  const [posts, setPosts] = useState<InfoEntry[]>([])

  useEffect(() => {
    fetch('/api/info')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: InfoEntry, b: InfoEntry) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setPosts(sorted)
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#ff5a5f] mb-8">📚 最新資訊</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <Link
            key={post._id}
            href={`/info/${post._id}`}
            className="block border border-[#ffdede] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition"
          >
            <div className="flex gap-4 items-start p-4">
              <img
                src={post.coverUrl || '/default-cover.jpg'}
                alt={post.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-[#ff5a5f] mb-1">{post.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
