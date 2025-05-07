import Image from "next/image";

interface CardEntry {
  card: string;
  quantity: number;
}

interface Deck {
  main: CardEntry[];
  sideboard?: CardEntry[];
  material?: CardEntry[];
}

interface DeckCardProps {
  playerName: string;
  country: string;
  record: string;
  deckName: string;
  deck: Deck;
  rank: number;
}

export function DeckCard({
  playerName,
  country,
  record,
  deckName,
  deck,
  rank,
}: DeckCardProps) {
  return (
    <div className="bg-[#0a0a0a]/90 border border-[#F28C7C]/40 rounded-lg overflow-hidden shadow-lg">
      <div className="flex justify-between items-center px-6 py-4 bg-black/70 backdrop-blur">
        <div>
          <p className="text-sm text-gray-400">RANKING</p>
          <p className="text-2xl font-bold text-white">{rank}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">PLAYER</p>
          <p className="text-white font-semibold">{playerName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">COUNTRY</p>
          <p className="text-white">{country}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">DECK</p>
          <p className="text-white">{deckName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">SWISS RECORD</p>
          <p className="text-white">{record}</p>
        </div>
      </div>

      <div className="p-4 bg-black/50">
        <h3 className="text-lg font-semibold text-white mb-2">Material Deck</h3>
        <div className="grid grid-cols-6 gap-3">
          {deck.material?.map((card, i) => (
            <div key={i} className="text-center text-sm">
              <Image
                src={`https://api.gatcg.com/cards/images/${card.card
                  .toLowerCase()
                  .replaceAll(/[^a-z0-9]/gi, "-")
                  .replace(/-+/g, "-")}.jpg?rounded=true`}
                alt={card.card}
                width={160}
                height={220}
                className="rounded-lg border border-gray-700"
              />
              <p className="text-white mt-1">{card.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
