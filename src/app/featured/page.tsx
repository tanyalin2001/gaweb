"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import rawData from "../data/featured_decks.json" assert { type: "json" };
import HeroSection from "@/components/HeroSection";

interface CardEntry {
  card: string;
  quantity: number;
}

interface Deck {
  main: CardEntry[];
  sideboard?: CardEntry[];
  material?: CardEntry[];
}

interface FeaturedDeck {
  id: string;
  intro: string;
  title: string;
  cover: string;
  description: string;
  strategy?: string;
  playerName: string;
  country: string;
  deckName: string;
  record: string;
  deck?: Deck;
  eventname: string;
  date: string;
}

interface FeaturedData {
  intro: string;
  decks: FeaturedDeck[];
}

const data = rawData as unknown as FeaturedData;
const featuredDecks = data.decks;

export default function FeaturedPage() {
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadCovers = async () => {
      const map: Record<string, string> = {};
      await Promise.all(
        featuredDecks.map(async (deck) => {
          try {
            const res = await fetch(deck.cover);
            if (!res.ok) throw new Error("Failed to fetch cover");
            const data = await res.json();
            const imgPath = data.editions?.[0]?.image;
            if (imgPath) {
              map[deck.id] = `https://api.gatcg.com${imgPath}`;
            }
          } catch (err) {
            console.error(`Cover fetch failed for ${deck.id}:`, err);
          }
        }),
      );
      setImageMap(map);
    };

    loadCovers();
  }, []);

  return (
    <HeroSection title="精選牌組" image="/waterbarrier-bg.png">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredDecks.map((deck) => (
          <Link
            href={`/featured/${deck.id}`}
            key={deck.id}
            className="relative rounded-xl overflow-hidden border border-[#F28C7C]/30 hover:scale-[1.02] transition-transform group "
          >
            {/* 背景圖層 */}
            <Image
              src={imageMap[deck.id] || "/card-back.jpg"}
              alt={deck.title}
              fill
              className="object-cover object-[center_31%] brightness-[0.4] scale-120 transition-transform duration-300"
            />

            {/* 遮罩層 */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* 內容層 */}
            <div className="relative z-10 p-5 flex flex-col justify-between h-full">
              <h2 className="text-xl font-bold text-[#F28C7C] leading-snug mb-3">
                {deck.title}
              </h2>

              <ul className="text-xs text-gray-300 space-y-1 mb-3">
                <li>
                  <span className="text-white font-medium">賽事：</span>
                  {deck.eventname}
                </li>
                <li>
                  <span className="text-white font-medium">玩家：</span>
                  {deck.playerName}（{deck.country}）
                </li>
                <li>
                  <span className="text-white font-medium">日期：</span>
                  {new Date(deck.date).toLocaleDateString("zh-TW")}
                </li>
                <li>
                  <span className="text-white font-medium">戰績：</span>
                  {deck.record}
                </li>
              </ul>

              <p className="text-sm text-gray-200 leading-relaxed">
                {deck.intro}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </HeroSection>
  );
}
