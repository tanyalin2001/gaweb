"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { featuredDecks } from "../../data/deckData";

export default function FeatureDeckDetailPage() {
  const { id } = useParams();
  const deck = featuredDecks.find((deck) => deck.id === id);

  if (!deck) {
    return (
      <main className="relative min-h-screen text-white font-sans">
        <div className="absolute inset-0 z-[-2]">
          <Image
            src="/bg.png"
            alt="Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[-1]" />
        <div className="relative z-10 px-6 py-20 text-center text-gray-400">
          找不到此牌組。
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖層 */}
      <div className="fixed  inset-0 z-[-2]">
        <Image
          src="/charm-bg.png"
          alt="Guide Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[-1]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20 space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] text-center drop-shadow-[0_1px_0_rgba(0,0,0,0.9)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
        {deck.title}
        </h1>
        <h1 className="text-4xl font-bold text-[#F28C7C] mb-6"></h1>
        <Image
          src={deck.image}
          alt={deck.title}
          width={720}
          height={400}
          className="rounded-xl shadow-lg mb-8"
        />
        <p className="text-gray-300 mb-8 text-lg">{deck.description}</p>

        <h2 className="text-2xl font-bold text-[#F28C7C] mb-4">📦 卡片組成</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200 pl-4">
          {deck.cards.map((card, index) => (
            <li key={index} className="text-sm">
              {card}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
