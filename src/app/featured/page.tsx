"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import rawData from "../data/featured_decks.json" assert { type: "json" };

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
}

interface FeaturedData {
  intro: string;
  decks: FeaturedDeck[];
}

const data = rawData as unknown as FeaturedData;
const intro = data.intro;
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
        })
      );
      setImageMap(map);
    };

    loadCovers();
  }, []);

  return (
    <main className="relative min-h-screen text-white font-sans px-6 pt-28 pb-20">
      <div className="fixed inset-0 z-[-2]">
        <Image src="/bg.png" alt="BG" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[-1]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#F28C7C] mb-6 text-center">
          ✨ 精選牌組
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-10 text-sm md:text-base">
          {intro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDecks.map((deck) => (
            <Link
              href={`/featured/${deck.id}`}
              key={deck.id}
              className="bg-black/70 backdrop-blur rounded-lg border border-[#F28C7C]/40 overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <Image
                src={imageMap[deck.id] || "/card-back.jpg"}
                alt={deck.title}
                width={640}
                height={360}
                className="w-full h-48 object-cover object-[0_20%]"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#F28C7C]">
                  {deck.title}
                </h2>
                <p className="text-gray-300 text-sm mt-2">
                  {deck.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
