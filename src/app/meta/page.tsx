import Link from "next/link";
import Image from "next/image";
import events from "../data/events_with_decklists.json";

interface EventEntry {
  id: number;
  name: string;
  date: number;
  playerCount: number;
  decks: { playerId: number }[];
}

export default function MetaPage() {
  const today = Date.now();

  const filtered = (events as EventEntry[])
    .filter(
      (event) =>
        event.date <= today &&
        event.playerCount >= 15 &&
        event.decks &&
        event.decks.length > 0,
    )
    .sort((a, b) => b.date - a.date);

  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖 */}
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/incap-bg.png"
          alt="Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[-1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] text-center drop-shadow-[0_1px_0_rgba(0,0,0,0.9)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
          精選賽事牌組
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <Link
              key={event.id}
              href={`/meta/${event.id}`}
              className="bg-[#1a1a1a]/90 border border-[#F28C7C]/30 rounded-xl p-5 hover:scale-[1.01] transition transform shadow-md hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold text-white mb-2 leading-snug">
                {event.name}
              </h2>
              <p className="text-gray-300 text-sm">
                日期：{new Date(event.date).toLocaleDateString("zh-TW")}
                ｜玩家數：{event.playerCount}
              </p>
              <span className="inline-block mt-3 text-sm text-[#F28C7C] underline">
                查看對戰牌表
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
