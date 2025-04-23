'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { featuredDecks } from '../../data/deckData'

export default function FeatureDeckDetailPage() {
  const { id } = useParams()
  const deck = featuredDecks.find(deck => deck.id === id)

  if (!deck) {
    return <div className="p-10 text-center text-gray-500">找不到此牌組。</div>
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#ff5a5f] mb-4">{deck.title}</h1>
      <Image
        src={deck.image}
        alt={deck.title}
        width={720}
        height={400}
        className="rounded-md shadow-md mb-6"
      />
      <p className="text-gray-700 mb-6">{deck.description}</p>
      <h2 className="text-xl font-bold text-[#ff5a5f] mb-2">卡片組成：</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {deck.cards.map((card, index) => (
          <li key={index}>{card}</li>
        ))}
      </ul>
    </main>
  )
}
