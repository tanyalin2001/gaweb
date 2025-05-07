"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";

interface InfoPost {
  id: string;
  title: string;
  createdAt: string;
  coverUrl?: string;
  tags?: string[];
}

export default function InfoPage() {
  const [posts, setPosts] = useState<InfoPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterTag = searchParams.get("tag");

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch("/api/info");
      const data = await res.json();
      setPosts(data);
    }
    loadPosts();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])));

  const filtered = posts.filter((p) => {
    const matchesTag = filterTag ? p.tags?.includes(filterTag) : true;
    const matchesSearch = searchQuery
      ? p.title.includes(searchQuery) ||
        p.tags?.some((tag) => tag.includes(searchQuery))
      : true;
    return matchesTag && matchesSearch;
  });

  const handleTagClick = (tag: string) => {
    router.push(`/info?tag=${encodeURIComponent(tag)}`);
  };

  const handleClearTag = () => {
    router.push(`/info`);
  };

  return (
    <HeroSection title="最新公告" image="/coronation-bg.png">
      {/* 搜尋欄 */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
        <input
          type="text"
          placeholder="搜尋公告..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg border border-gray-600 bg-black/50 text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* 標籤 */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleClearTag}
            className={`px-3 py-1 rounded-full text-sm ${
              filterTag
                ? "bg-gray-700 text-gray-200"
                : "bg-[#F28C7C] text-black font-bold"
            }`}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                filterTag === tag
                  ? "bg-[#F28C7C] text-black font-bold"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* 列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filtered.map((post, index) => (
          <Link key={post.id} href={`/info/${post.id}`} className="group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-stretch border border-[#F28C7C]/20 rounded-2xl overflow-hidden bg-[#121212]/80 hover:bg-[#1a1a1a]/90 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={post.coverUrl || "/default-cover.jpg"}
                alt={post.title}
                className="w-full md:w-56 h-44 md:h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-[#F28C7C] mb-2 transition-colors duration-200">
                    {post.title}
                  </h2>
                </div>
                <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("zh-TW")}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[#F28C7C] bg-[#F28C7C]/10 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400">沒有符合條件的公告。</p>
      )}
    </HeroSection>
  );
}
