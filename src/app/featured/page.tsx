"use client";

import Link from "next/link";
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
  cover?: string;
  description: string;
  strategy?: string;
  playerName: string;
  country: string;
  deckName: string;
  record: string;
  rank?: string;
  deck?: Deck;
  eventname: string;
  date: string;
  eventlevel?: string;
}

interface FeaturedData {
  intro: string;
  decks: FeaturedDeck[];
}

const data = rawData as unknown as FeaturedData;
const featuredDecks = data.decks;

const EVENT_LEVELS = [
  "store championships",
  "regionals",
  "ascents",
  "nationals",
  "worlds",
];

export default function FeaturedPage() {
  const [filter, setFilter] = useState<string>("");
  const [filteredDecks, setFilteredDecks] =
    useState<FeaturedDeck[]>(featuredDecks);

  useEffect(() => {
    if (!filter) {
      setFilteredDecks(featuredDecks);
    } else {
      setFilteredDecks(
        featuredDecks.filter(
          (deck) => deck.eventlevel?.toLowerCase() === filter,
        ),
      );
    }
  }, [filter]);

  return (
    <HeroSection title="精選牌組" image="/waterbarrier-bg.png">
      <div className="mb-8">
        <label className="text-white font-medium mr-2">選擇賽事等級：</label>
        <select
          className="bg-[#1a1a1a] text-white border border-gray-600 px-4 py-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">全部</option>
          {EVENT_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.map((deck) => (
          <Link
            href={`/featured/${deck.id}`}
            key={deck.id}
            className="relative rounded-xl overflow-hidden border border-[#F28C7C]/30 bg-black/60 p-4 hover:scale-[1.02] transition-transform"
          >
            <h2 className="text-xl font-bold text-[#F28C7C] mb-2">
              {deck.title}
            </h2>
            <ul className="text-sm text-gray-300 space-y-1 mb-2">
              <li>
                <span className="text-white font-medium">賽事：</span>
                {deck.eventname}
              </li>
              <li>
                <span className="text-white font-medium">賽事等級：</span>
                {deck.eventlevel || "-"}
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
              <li>
                <span className="text-white font-medium">排名：</span>
                {deck.rank || "-"}
              </li>
            </ul>
            {deck.intro && (
              <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                {deck.intro}
              </p>
            )}
          </Link>
        ))}
      </div>
    </HeroSection>
  );
}
