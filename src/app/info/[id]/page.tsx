import { notFound } from "next/navigation";
import { hardcodedPosts, InfoEntry } from "@/lib/infoData";

async function getPost(id: string): Promise<InfoEntry | null> {
  return hardcodedPosts.find((p) => p._id === id) ?? null;
}

export default async function InfoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);
  if (!post) return notFound();

  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖層 */}
      <div className="absolute inset-0 z-[-2]">
        <img
          src="/coronation-bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[-1]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-20 space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-center">
          {post.title}
        </h1>

        <p className="text-sm text-gray-400 text-center">
          發布日期：{new Date(post.createdAt).toLocaleDateString("zh-TW")}
        </p>

        {post.coverUrl && (
          <img
            src={post.coverUrl}
            alt="封面圖片"
            className="rounded-xl w-full max-h-[500px] object-cover shadow-md"
          />
        )}

        <article className="text-lg leading-loose text-gray-200 whitespace-pre-line bg-[#1a1a1a]/80 p-6 rounded-2xl shadow-inner border border-white/10">
          {post.content}
        </article>
      </div>
    </main>
  );
}
