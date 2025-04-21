'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface InfoEntry {
  _id: string
  title: string
  content: string
}

export default function AdminInfoPage() {
  const { role, isLoggedIn } = useAuth()
  const router = useRouter()

  const [infos, setInfos] = useState<InfoEntry[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')

  useEffect(() => {
    if (!isLoggedIn) return
    if (role !== 'admin') router.push('/')
    else fetchInfos()
  }, [role, isLoggedIn])

  const fetchInfos = async () => {
    const res = await fetch('/api/info')
    const data = await res.json()
    setInfos(data)
  }

  const handleSubmit = async () => {
    if (!title || !content) return alert('請填寫標題與內容')
    setLoading(true)
    const res = await fetch('/api/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    if (res.ok) {
      setTitle('')
      setContent('')
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

  const handleEdit = (info: InfoEntry) => {
    setEditingId(info._id)
    setEditedTitle(info.title)
    setEditedContent(info.content)
  }

  const handleSaveEdit = async (id: string) => {
    if (!editedTitle || !editedContent) return
    const res = await fetch('/api/info', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: editedTitle, content: editedContent }),
    })
    if (res.ok) {
      setEditingId(null)
      await fetchInfos()
    }
  }

  if (!isLoggedIn) {
    return <div className="text-center py-10 text-gray-500">載入中...</div>
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-[#ff5a5f] mb-6">🛠️ 編輯資訊頁</h1>

      {/* 新增段落 */}
      <div className="space-y-4 mb-10">
        <input
          className="w-full border p-2 rounded"
          placeholder="標題（例：Grand Archive 是什麼？）"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded h-32"
          placeholder="內容"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#ff5a5f] text-white px-6 py-2 rounded hover:bg-[#e0474d] transition"
        >
          {loading ? '儲存中...' : '新增段落'}
        </button>
      </div>

      {/* 現有段落 */}
      <div className="space-y-6">
        {infos.map(info => (
          <div
            key={info._id}
            className="bg-white border border-[#ffdede] rounded-lg p-4 shadow-sm"
          >
            {editingId === info._id ? (
              <>
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="w-full border p-2 rounded h-28"
                  value={editedContent}
                  onChange={e => setEditedContent(e.target.value)}
                />
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleSaveEdit(info._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    儲存
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 hover:underline"
                  >
                    取消
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-[#ff5a5f]">{info.title}</h3>
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => handleEdit(info)}
                      className="text-blue-500 hover:underline"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDelete(info._id)}
                      className="text-red-500 hover:underline"
                    >
                      刪除
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{info.content}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
