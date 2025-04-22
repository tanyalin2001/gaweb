'use client'

import { useEffect, useState } from 'react'
import UploadImageButton from '@/components/UploadImageButton'

interface InfoEntry {
  _id: string
  title: string
  content: string
  coverUrl?: string
  tags?: string[]
}

export default function AdminInfoPage() {
  const [infos, setInfos] = useState<InfoEntry[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchInfos = async () => {
    const res = await fetch('/api/info')
    const data = await res.json()
    setInfos(data)
  }

  useEffect(() => {
    fetchInfos()
  }, [])

  const handleSubmit = async () => {
    if (!title || !content) return alert('請填寫標題與內容')
    setLoading(true)
    const res = await fetch('/api/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, coverUrl, tags }),
    })
    if (res.ok) {
      setTitle('')
      setContent('')
      setCoverUrl('')
      setTags([])
      await fetchInfos()
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('確認刪除此段落？')
    if (!confirm) return
    await fetch('/api/info', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchInfos()
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#ff5a5f] mb-6">📢 公告管理</h1>

      {/* 新增段落 */}
      <div className="space-y-4 mb-10">
        <input
          className="w-full border p-2 rounded"
          placeholder="標題"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded h-28"
          placeholder="內容"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
<div>
  <p className="text-sm text-gray-500 mb-1">封面圖片</p>
  <UploadImageButton onUpload={url => setCoverUrl(url)} />
  {coverUrl && (
    <img
      src={coverUrl}
      alt="預覽圖"
      className="w-48 mt-4 rounded border shadow"
    />
  )}
</div>

        <div>
          <p className="text-sm text-gray-500 mb-1">標籤（Enter 新增）</p>
          <input
            className="w-full border p-2 rounded"
            placeholder="輸入標籤"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddTag()}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-[#ffeaea] text-[#ff5a5f] px-2 py-1 text-sm rounded"
              >
                #{tag}
                <button onClick={() => removeTag(tag)} className="text-sm font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#ff5a5f] text-white px-6 py-2 rounded hover:bg-[#e0474d] transition"
        >
          {loading ? '儲存中...' : '新增公告'}
        </button>
      </div>

      {/* 列表 */}
      <div className="space-y-4">
        {infos.map(info => (
          <div
            key={info._id}
            className="bg-white border border-[#ffdede] rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-[#ff5a5f]">{info.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{info.content}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {info.tags?.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-[#ffeaea] text-[#ff5a5f] px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDelete(info._id)}
                className="text-sm text-red-500 hover:underline"
              >
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
