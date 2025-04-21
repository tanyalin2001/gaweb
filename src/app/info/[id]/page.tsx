import { notFound } from 'next/navigation'

interface InfoEntry {
  _id: string
  title: string
  content: string
  coverUrl?: string
  createdAt: string
}

async function getPost(id: string): Promise<InfoEntry | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/info/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function InfoDetailPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) return notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#ff5a5f] mb-4">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        發布日期：{new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.coverUrl && (
        <img
          src={post.coverUrl}
          alt="Cover"
          className="rounded-lg mb-6 w-full max-h-[400px] object-cover"
        />
      )}
      <div className="text-gray-800 whitespace-pre-line leading-relaxed">{post.content}</div>
    </div>
  )
}
