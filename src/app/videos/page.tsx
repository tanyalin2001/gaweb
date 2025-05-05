"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  tag: string;
  youtubeUrl: string;
}

interface PlaylistSection {
  title: string;
  videos: Video[];
}

export default function VideosPage() {
  const [playlists, setPlaylists] = useState<PlaylistSection[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube", { cache: "no-store" });
        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid API response");

        setPlaylists(data);
        if (data.length > 0) setActiveTab(data[0].title); // 預設選擇第一個 tab
      } catch (err) {
        console.error("載入失敗", err);
        setPlaylists([]);
      }
    };
    fetchVideos();
  }, []);

  const activeSection = playlists.find(
    (section) => section.title === activeTab,
  );

  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖層 */}
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/diaochan-bg.png"
          alt="Guide Background"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[-1]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 pt-28 pb-20 space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] text-center drop-shadow-[0_1px_0_rgba(0,0,0,0.9)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
          推薦影片
        </h1>

        {/* Tab 導覽列 */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 border-b border-white/20 pb-6">
          {playlists.map((section) => (
            <button
              key={section.title}
              onClick={() => setActiveTab(section.title)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm md:text-base
        ${
          activeTab === section.title
            ? "bg-white text-black shadow-md"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* 選中 tab 的影片清單 */}
        {activeSection && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
            {activeSection.videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#1e1e1e] rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-full aspect-[16/9] relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="rounded-t-2xl object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-4 flex-1">
                  <div className="space-y-2">
                    <span className="text-xs inline-block px-2 py-[2px] rounded-full bg-[#F28C7C]/20 text-[#F28C7C] font-medium">
                      {video.tag}
                    </span>
                    <h3 className="text-base font-semibold text-white leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                  <Link
                    href={video.youtubeUrl}
                    target="_blank"
                    className="mt-4 w-full inline-block text-center font-semibold text-sm bg-[#F28C7C] text-black py-2 rounded-lg hover:bg-[#e04646] transition"
                  >
                    ▶ 觀看影片
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
