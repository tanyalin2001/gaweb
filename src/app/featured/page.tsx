"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import rawData from "../data/featured_decks.json" assert { type: "json" };
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Footer from "@/components/ui/footer";

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
  element: string;
  champion: string;
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
const ELEMENTS = ["Wind", "Fire", "Water"];
const CHAMPIONS = [
  ...Array.from(new Set(featuredDecks.map((d) => d.champion))),
];

const elementStyles: Record<string, string> = {
  Fire: "from-red-900 to-red-700 hover:from-red-800 hover:to-red-600",
  Water: "from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600",
  Wind: "from-green-900 to-green-700 hover:from-green-800 hover:to-green-600",
};

export default function FeaturedPage() {
  const [level, setLevel] = useState<string>("");
  const [element, setElement] = useState<string>("");
  const [champion, setChampion] = useState<string>("");
  const [filteredDecks, setFilteredDecks] = useState<FeaturedDeck[]>(() => {
    return [...featuredDecks].sort((a, b) => b.date.localeCompare(a.date));
  });

  useEffect(() => {
    let decks = [...featuredDecks];
    if (level)
      decks = decks.filter((deck) => deck.eventlevel?.toLowerCase() === level);
    if (element) decks = decks.filter((deck) => deck.element === element);
    if (champion) decks = decks.filter((deck) => deck.champion === champion);
    decks.sort((a, b) => b.date.localeCompare(a.date));
    setFilteredDecks(decks);
  }, [level, element, champion]);

  return (
    <>
      <HeroSection title="精選牌組" image="/waterbarrier-bg.png">
        <div className="mb-8 flex flex-wrap gap-4 items-center text-white">
          <label>賽事等級：</label>
          <select
            className="bg-[#1a1a1a] text-white border border-gray-600 px-4 py-2 rounded"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">全部</option>
            {EVENT_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <label>屬性：</label>
          <select
            className="bg-[#1a1a1a] text-white border border-gray-600 px-4 py-2 rounded"
            value={element}
            onChange={(e) => setElement(e.target.value)}
          >
            <option value="">全部</option>
            {ELEMENTS.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>

          <label>英雄：</label>
          <select
            className="bg-[#1a1a1a] text-white border border-gray-600 px-4 py-2 rounded"
            value={champion}
            onChange={(e) => setChampion(e.target.value)}
          >
            <option value="">全部</option>
            {CHAMPIONS.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        <div
          className="grid gap-6"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          }}
        >
          {filteredDecks.map((deck) => {
            const elementClass =
              elementStyles[deck.element] ||
              "from-gray-800 to-gray-600 hover:from-gray-700 hover:to-gray-500";

            return (
              <Link
                href={`/featured/${deck.id}`}
                key={deck.id}
                className={`relative rounded-xl overflow-hidden p-5 hover:scale-[1.01] transition-transform shadow-lg backdrop-blur-md bg-opacity-40 backdrop-blur-lg border border-white/10 ${deck.element === "Fire" ? "bg-red-400/60" : deck.element === "Water" ? "bg-blue-400/60" : deck.element === "Wind" ? "bg-green-400/60" : "bg-gray-800/50"}`}
              >
                <div className="absolute inset-0 bg-black/60 z-0" />
                <div className="relative z-10">
                  <h2 className="font-bold text-white mb-3 border-b border-white/20 pb-1">
                    {deck.title}
                  </h2>
                  <ul className="text-gray-300 space-y-1">
                    <li>
                      <span className="text-white font-medium">賽事：</span>
                      {deck.eventname}
                    </li>
                    <li>
                      <span className="text-white font-medium">等級：</span>
                      {deck.eventlevel || "-"}
                    </li>
                    <li>
                      <span className="text-white font-medium">屬性：</span>
                      {deck.element}
                    </li>
                    <li>
                      <span className="text-white font-medium">英雄：</span>
                      {deck.champion}
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
                  <Image
                    src={`/champions/${deck.champion.toLowerCase().replace(/\s/g, "-")}.png`}
                    alt={deck.champion}
                    width={200}
                    height={200}
                    unoptimized
                    className="absolute bottom-0 right-0 w-[150px] h-[150px] object-cover"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </HeroSection>
      <Footer />
    </>
  );
}
