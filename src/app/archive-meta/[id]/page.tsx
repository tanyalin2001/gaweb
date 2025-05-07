"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import events from "../../data/events_with_decklists.json";
import { useEffect, useState } from "react";

interface CardEntry {
  card: string;
  quantity: number;
}

interface Deck {
  main: CardEntry[];
  sideboard?: CardEntry[];
  material?: CardEntry[];
}

interface DeckEntry {
  playerId: number;
  playerName: string;
  country: string;
  deckName: string;
  record: string;
  deck: Deck;
}

interface EventData {
  id: number;
  name: string;
  date: number;
  playerCount: number;
  decks: DeckEntry[];
}

function slugify(cardName: string): string {
  return cardName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function DeckCard({
  playerName,
  country,
  record,
  deckName,
  deck,
  rank,
}: DeckEntry & { rank: number }) {
  const [images, setImages] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const map: Record<string, string> = {};
      const allCards = [
        ...(deck.material || []),
        ...(deck.main || []),
        ...(deck.sideboard || []),
      ];

      await Promise.all(
        allCards.map(async (card) => {
          try {
            const slug = slugify(card.card);
            const res = await fetch(`https://api.gatcg.com/cards/${slug}`);
            if (res.ok) {
              const data = await res.json();
              const imgPath = data.editions?.[0]?.image;
              if (imgPath) {
                map[card.card] = `https://api.gatcg.com${imgPath}`;
              }
            }
          } catch (err) {
            console.error("Image fetch failed for", card.card);
          }
        }),
      );

      setImages(map);
    };
    loadImages();
  }, [deck]);

  const renderCardGrid = (
    title: string,
    cards: CardEntry[],
    section: string,
  ) => (
    <>
      <h3 className="text-lg font-semibold text-white mb-2 mt-6">
        {title} ({cards.length} cards)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {cards.map((card, i) => (
          <div
            key={`${section}-${i}`}
            className="text-center text-sm relative group"
          >
            <div className="relative z-50 group-hover:scale-[2] transition-transform origin-center">
              <img
                src={images[card.card] || "/card-back.jpg"}
                alt={card.card}
                width={160}
                height={220}
                className="rounded-lg border border-gray-700 mx-auto"
              />
              <p className="text-white mt-1 font-medium text-xs">{card.card}</p>
              <p className="text-gray-300 text-xs">x{card.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="bg-[#0a0a0a]/90 border border-[#F28C7C]/40 rounded-lg overflow-hidden shadow-lg">
      <div
        className="flex flex-wrap justify-between items-center px-6 py-4 bg-black/70 backdrop-blur cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-sm text-gray-400">
          RANKING<p className="text-2xl font-bold text-white">{rank}</p>
        </div>
        <div className="text-sm text-gray-400">
          PLAYER<p className="text-white font-semibold">{playerName}</p>
        </div>
        <div className="text-sm text-gray-400">
          COUNTRY<p className="text-white">{country}</p>
        </div>
        <div className="text-sm text-gray-400">
          DECK<p className="text-white">{deckName}</p>
        </div>
        <div className="text-sm text-gray-400">
          SWISS RECORD<p className="text-white">{record}</p>
        </div>
      </div>

      {expanded && (
        <div className="p-4 bg-black/50">
          {deck.material &&
            renderCardGrid("Material Deck", deck.material, "material")}
          {deck.main && renderCardGrid("Main Deck", deck.main, "main")}
          {deck.sideboard &&
            renderCardGrid("Sideboard", deck.sideboard, "sideboard")}
        </div>
      )}
    </div>
  );
}

export default function EventPage({ params }: { params: { id: string } }) {
  const id = params.id.toString();
  const event = (events as EventData[]).find((e) => e.id.toString() === id);
  if (!event) return notFound();

  return (
    <main className="relative min-h-screen text-white px-6 pt-28 pb-20">
      <div className="fixed inset-0 z-[-2]">
        <Image src="/incap-bg.png" alt="BG" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[-1]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#F28C7C] mb-2">{event.name}</h1>
        <p className="text-gray-300 mb-8">
          日期：{new Date(event.date).toLocaleDateString("zh-TW")}｜玩家數：
          {event.playerCount}
        </p>

        <div className="space-y-10">
          {event.decks.map((deckEntry, index) => (
            <DeckCard
              key={deckEntry.playerId}
              rank={index + 1}
              {...deckEntry}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
