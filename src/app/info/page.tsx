"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { hardcodedPosts } from "@/lib/infoData";

export default function InfoPage() {
  const searchParams = useSearchParams();
  const filterTag = searchParams.get("tag");

  const filtered = filterTag
    ? hardcodedPosts.filter((p) => p.tags?.includes(filterTag))
    : hardcodedPosts;

  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖 */}
      <div className="absolute inset-0 z-[-2]">
        <img
          src="/coronation-bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[-1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20 space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] text-center drop-shadow-[0_1px_0_rgba(0,0,0,0.9)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
          最新公告
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filtered.map((post, index) => (
            <Link key={post._id} href={`/info/${post._id}`} className="group">
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
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {post.content}
                    </p>
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
      </div>
    </main>
  );
}
