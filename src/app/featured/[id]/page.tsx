import { notFound } from "next/navigation";
import Image from "next/image";
import rawData from "../../data/featured_decks.json" assert { type: "json" };

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
  image?: string;
  eventname?: string;
  date?: string;
  intro: string;
  description: string;
  strategy?: string;
  playerName: string;
  country: string;
  deckName: string;
  record: string;
  deck?: Deck;
}

function slugify(cardName: string): string {
  return cardName
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function FeaturedDeckPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await Promise.resolve(params);

  interface FeaturedDecksWrapper {
    intro: string;
    decks: FeaturedDeck[];
  }

  const data = rawData as FeaturedDecksWrapper;
  const decks = data.decks;

  const deckEntry = decks.find((d) => d.id === id);
  if (!deckEntry) return notFound();

  let deck: Deck | null = null;

  if (deckEntry.type === "fundeck") {
    deck = deckEntry.deck || null;
  } else if (
    deckEntry.type === "eventdecklist" &&
    deckEntry.eventid &&
    deckEntry.playerid
  ) {
    try {
      const res = await fetch(
        `https://omni.gatcg.com/api/events/decklist?id=${deckEntry.eventid}&player=${deckEntry.playerid}`,
      );
      if (!res.ok) throw new Error("Deck fetch failed");
      const data = await res.json();
      deck = {
        main: data.main.map((c: any) => ({
          card: c.card,
          quantity: c.quantity,
        })),
        material: data.material?.map((c: any) => ({
          card: c.card,
          quantity: c.quantity,
        })),
        sideboard: data.sideboard?.map((c: any) => ({
          card: c.card,
          quantity: c.quantity,
        })),
      };
    } catch (err) {
      console.error("API failed", err);
    }
  }

  if (!deck) return notFound();

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
          玩家：{deckEntry.playerName}｜國家：{deckEntry.country}｜戰績：
          {deckEntry.record}｜日期：{deckEntry.date}
        </p>
        {deckEntry.eventname && (
          <p className="text-gray-400 mb-4">
            賽事：{deckEntry.eventname}
            {deckEntry.eventid && <>｜編號：{deckEntry.eventid}</>}
          </p>
        )}
        {(deckEntry.intro || deckEntry.description) && (
          <div className="mb-8 bg-black/60 p-4 rounded border border-[#F28C7C]/40">
            <h2 className="text-2xl font-bold mb-2 text-[#F28C7C]">牌組介紹</h2>
            <p className="text-gray-300 whitespace-pre-line">
              {deckEntry.intro}
              {"\n\n"}
              {deckEntry.description}
            </p>
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
          {deck.material?.length
            ? await renderCardGrid("Material Deck", deck.material, "material")
            : null}
          {deck.main?.length
            ? await renderCardGrid("Main Deck", deck.main, "main")
            : null}
          {deck.sideboard?.length
            ? await renderCardGrid("Sideboard", deck.sideboard, "sideboard")
            : null}
        </div>
      </div>
    </main>
  );

  async function renderCardGrid(
    title: string,
    cards: CardEntry[],
    section: string,
  ) {
    const imageMap: Record<string, string> = {};

    await Promise.all(
      cards.map(async (card) => {
        const slug = slugify(card.card);
        try {
          const res = await fetch(`https://api.gatcg.com/cards/${slug}`);
          if (!res.ok) throw new Error("Card not found");
          const data = await res.json();
          const image = data.editions?.[0]?.image;
          if (image) {
            imageMap[card.card] = `https://api.gatcg.com${image}`;
          }
        } catch (err) {
          console.error("Image fetch failed for", card.card);
        }
      }),
    );

    return (
      <div className="mb-8 bg-black/60 p-4 rounded border border-[#F28C7C]/40">
        <h3 className="text-xl font-semibold text-white mb-2">
          {title} ({cards.length} cards)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {cards.map((card, i) => (
            <div
              key={`${section}-${i}`}
              className="text-center text-sm relative group"
            >
              <div className="relative transition-transform origin-center group-hover:scale-[2] group-hover:z-[999]">
                <img
                  src={imageMap[card.card] || "/card-back.jpg"}
                  alt={card.card}
                  width={160}
                  height={220}
                  className="rounded-lg border border-gray-700 mx-auto"
                />
              </div>
              <p className="text-white mt-1 font-medium text-sm">{card.card}</p>
              <p className="text-gray-300 text-sm">x{card.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
