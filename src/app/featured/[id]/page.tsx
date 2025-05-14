import { notFound } from "next/navigation";
import Image from "next/image";
import rawData from "../../data/featured_decks.json";
import CardImage from "@/components/CardImage";

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
  title: string;
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
}

interface FeaturedDecksWrapper {
  intro: string;
  decks: FeaturedDeck[];
}

export const revalidate = 3600;

export default async function FeaturedDeckPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = rawData as FeaturedDecksWrapper;
  const deckEntry = data.decks.find(d => d.id === id);
  
  if (!deckEntry) return notFound();

  let deck: Deck | null = null;
  let eventData: any = null;

  if (
    deckEntry.type === "eventdecklist" &&
    deckEntry.eventid &&
    deckEntry.playerid
  ) {
    try {
      const [deckRes, eventRes] = await Promise.all([
        fetch(
          `https://omni.gatcg.com/api/events/decklist?id=${deckEntry.eventid}&player=${deckEntry.playerid}`
        ),
        fetch(
          `https://omni.gatcg.com/api/events/event?id=${deckEntry.eventid}`
        ),
      ]);

      if (!deckRes.ok || !eventRes.ok) throw new Error("API fetch failed");

      const deckData = await deckRes.json();
      eventData = await eventRes.json();

      deck = {
        main: deckData.main.map((c: any) => ({
          card: c.card,
          quantity: c.quantity,
        })),
        material: deckData.material?.map((c: any) => ({
          card: c.card,
          quantity: c.quantity,
        })),
        sideboard: deckData.sideboard?.map((c: any) => ({
          card: c.card,
          quantity: c.quantity,
        })),
      };
    } catch (err) {
      console.error("API failed", err);
      return notFound();
    }
  }

  if (!deck) return notFound();

  const playerName =
    deckEntry.playerName ||
    eventData?.players?.find((p: any) => p.playerId === deckEntry.playerid)
      ?.playerName ||
    "-";
  const country =
    deckEntry.country ||
    eventData?.players?.find((p: any) => p.playerId === deckEntry.playerid)
      ?.country ||
    "-";
  const record =
    deckEntry.record ||
    eventData?.players?.find((p: any) => p.playerId === deckEntry.playerid)
      ?.record ||
    "-";
  const rank =
    deckEntry.rank ||
    eventData?.players?.find((p: any) => p.playerId === deckEntry.playerid)
      ?.rank ||
    "-";
  const date =
    deckEntry.date ||
    (eventData?.startDate
      ? new Date(eventData.startDate).toISOString().split("T")[0]
      : "-");
  const eventname = deckEntry.eventname || eventData?.name || "";
  const eventlevel = deckEntry.eventlevel || eventData?.eventType || "";
  const omnidexUrl =
    deckEntry.eventid && deckEntry.playerid
      ? `https://omni.gatcg.com/events/${deckEntry.eventid}?player=${deckEntry.playerid}`
      : "";

  return (
    <main className="relative min-h-screen text-white px-6 pt-28 pb-20 text-lg">
      <div className="fixed inset-0 z-[-2]">
        <Image src="/bg.png" alt="BG" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[-1]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-[#F28C7C] mb-2">
          {deckEntry.title}
        </h1>

        <p className="text-gray-300 mb-1">
          玩家：{playerName}｜國家：{country}｜戰績：{record}｜排名：{rank}
          ｜日期：{date}
        </p>

        {eventname && (
          <p className="text-gray-400 mb-4">
            賽事：{eventname} ｜ 賽事等級：{eventlevel}
            {omnidexUrl && (
              <>
                {" ｜"}
                <a
                  href={omnidexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-300"
                >
                  Omnidex 連結
                </a>
              </>
            )}
          </p>
        )}

        {(deckEntry.intro ||
          deckEntry.description ||
          deckEntry.pros?.length ||
          deckEntry.cons?.length) && (
          <div className="mb-8 bg-black/60 p-4 rounded border border-[#F28C7C]/40">
            <h2 className="text-2xl font-bold mb-2 text-[#F28C7C]">牌組介紹</h2>
            {deckEntry.intro && (
              <p className="text-gray-300 whitespace-pre-line">
                {deckEntry.intro}
              </p>
            )}
            {deckEntry.description && (
              <p className="text-gray-300 mt-4 whitespace-pre-line">
                {deckEntry.description}
              </p>
            )}
            {deckEntry.pros && deckEntry.pros.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#A0D468]">優點</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {deckEntry.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {deckEntry.cons && deckEntry.cons.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#ED5565]">缺點</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {deckEntry.cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {deckEntry.price && (
          <div className="mb-8 bg-black/60 p-4 rounded border border-[#F28C7C]/40">
            <h2 className="text-2xl font-bold mb-2 text-[#F28C7C]">
              📊 額外資訊
            </h2>
            <p className="text-gray-300">牌價：約 ${deckEntry.price}</p>
          </div>
        )}

        {deckEntry.strategy && (
          <div className="mb-8 bg-black/60 p-4 rounded border border-[#F28C7C]/40">
            <h2 className="text-2xl font-bold mb-2 text-[#F28C7C]">
              📘 使用指南
            </h2>
            <p className="text-gray-300 whitespace-pre-line">
              {deckEntry.strategy}
            </p>
          </div>
        )}
      <div className="space-y-10">
        {deck.material?.length && renderCardGrid("Material Deck", deck.material, "material")}
        {deck.main?.length && renderCardGrid("Main Deck", deck.main, "main")}
        {deck.sideboard?.length && renderCardGrid("Sideboard", deck.sideboard, "sideboard")}
      </div>
      </div> 

    </main>
  );

  function renderCardGrid(title: string, cards: CardEntry[], section: string) {
    return (
      <div className="mb-8 bg-black/60 p-4 rounded border border-[#F28C7C]/40">
        <h3 className="text-xl font-semibold text-white mb-2">
          {title} ({cards.length} cards)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {cards.map((card, i) => (
            <CardImage key={`${section}-${i}`} card={card} />
          ))}
        </div>
      </div>
    );
  }
}
