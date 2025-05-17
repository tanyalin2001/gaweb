"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/footer";
import { useEffect, useState } from "react";
// @ts-ignore
import featuredData from "./data/featured_decks.json" assert { type: "json" };

interface FeaturedDeck {
  id: string;
  title: string;
  cover?: string;
  type: "fundeck" | "eventdecklist";
  eventid?: number;
  playerid?: number;
  intro: string;
  description: string;
  strategy?: string;
  price?: string;
  rank?: string;
  pros?: string[];
  cons?: string[];
  playerName?: string;
  country?: string;
  record?: string;
  date?: string;
  eventname?: string;
  eventlevel?: string;
  champion: string;
  element: string;
  omni?: string;
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/info")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setLatestPosts(sorted.slice(0, 3));
      });
  }, []);

  return (
    <main className="text-white font-sans text-base relative">
      <div className="fixed inset-0 -z-50">
        <Image
          src="/3a2563dc-8604-4255-8999-c6b8590d9bb0.png"
          alt="背景圖"
          fill
          className="object-cover object-center opacity-30"
        />
      </div>

      {/* Hero Section */}
      <SectionWrapper bg="/diao.png">
        <div className="max-w-3xl mx-auto z-[1] px-4 sm:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] mb-6"
          >
            歡迎來到 <span className="text-[#F28C7C]">SparkleGA</span>
          </motion.h1>
          <p className="text-sm sm:text-base drop-shadow-sm mb-8">
            整合套牌趨勢、牌表整理、比賽資訊與影片精選，給你最完整的 Grand
            Archive 中文社群資源。
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/featured">
              <button className="bg-[#F28C7C] text-black px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 hover:bg-[#f6a999] transition w-full sm:w-auto">
                查看牌組
              </button>
            </Link>
            <Link href="/guide/rules">
              <button className="border border-[#F28C7C] text-[#F28C7C] px-6 py-3 rounded-full font-bold hover:bg-[#F28C7C] hover:text-black transition w-full sm:w-auto">
                新手教學
              </button>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <Divider />

      {/* Featured Decks */}
      <ResponsiveSection bg="/seasonsend-bg.png" title="精選牌組" fullHeight>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(featuredData.decks as any[]).slice(0, 3).map((deck) => {
            const typedDeck: FeaturedDeck = {
              ...deck,
              type:
                deck.type === "fundeck" || deck.type === "eventdecklist"
                  ? deck.type
                  : "fundeck",
            };
            return (
              <motion.div
                key={typedDeck.id}
                className="bg-[#1a1a1a]/90 rounded-2xl overflow-hidden border border-neutral-600 hover:shadow-xl hover:scale-[1.015] transition-all"
                whileHover={{ y: -4 }}
              >
                <Link href={`/featured/${typedDeck.id}`}>
                  <Image
                    src={
                      typedDeck.cover ??
                      "/champions/" +
                        typedDeck.champion.toLowerCase().replace(/\s/g, "-") +
                        ".png"
                    }
                    alt={typedDeck.title}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover object-top"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#F28C7C] mb-1">
                      {typedDeck.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {typedDeck.intro?.slice(0, 40)}...
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10">
          <Link href="/featured">
            <button className="px-6 py-3 bg-[#F28C7C] text-black font-bold rounded-full hover:bg-[#f6a999] transition">
              查看更多牌組 →
            </button>
          </Link>
        </div>
      </ResponsiveSection>

      <Divider />

      {/* Announcements */}
      <ResponsiveSection
        bg="/extricatingTouch-bg.png"
        title="最新公告與改版消息"
        fullHeight
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/info/${post.id}`}
              className="rounded-xl overflow-hidden bg-[#1a1a1a]/80 border border-white/10 hover:scale-[1.01] transition-all shadow-md hover:shadow-lg"
            >
              <Image
                src={post.coverUrl || "/default-cover.jpg"}
                alt={post.title}
                width={400}
                height={220}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="font-bold text-[#F28C7C] text-lg mb-1">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm">點擊查看完整內容 →</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/info">
            <button className="px-6 py-3 bg-[#F28C7C] text-black font-bold rounded-full hover:bg-[#f6a999] transition">
              查看更多公告 →
            </button>
          </Link>
        </div>
      </ResponsiveSection>

      <Divider />

      {/* Video Section */}
      <ResponsiveSection bg="/charm-bg.png" title="影片精選" fullHeight>
        <p className="text-gray-200 mb-6 drop-shadow-sm">
          開箱、解析、實戰精華，全部來自我們的頻道。
        </p>
        <div className="flex justify-center">
          <Image
            src="/youtube-banner.png"
            alt="YouTube 頻道"
            width={200}
            height={200}
            className="rounded-full shadow-xl border-4 border-[#F28C7C] object-cover"
          />
        </div>
        <Link
          href="https://youtube.com/@sparklesislife"
          target="_blank"
          className="inline-block mt-6 bg-[#F28C7C] text-black px-8 py-3 rounded-full font-bold hover:bg-[#f6a999] transition"
        >
          前往頻道
        </Link>
      </ResponsiveSection>

      <Footer />
    </main>
  );
}

function Divider() {
  return (
    <div className="h-[2px] bg-gradient-to-r from-[#f28c7c]/0 via-[#f28c7c] to-[#f28c7c]/0 mx-auto w-2/3" />
  );
}

function SectionWrapper({
  bg,
  children,
}: {
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-10">
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt="背景"
          fill
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      </div>
      {children}
    </section>
  );
}

function ResponsiveSection({
  bg,
  title,
  children,
  fullHeight = false,
}: {
  bg: string;
  title: string;
  children: React.ReactNode;
  fullHeight?: boolean;
}) {
  return (
    <section
      className={`relative w-full px-4 sm:px-8 md:px-16 ${fullHeight ? "min-h-screen flex items-center" : "py-24"}`}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt="Section background"
          fill
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      </div>
      <div className="max-w-7xl mx-auto z-10 text-center w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F28C7C] mb-12 drop-shadow">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
