"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CardEntry {
  card: string;
  quantity: number;
}

const slugify = (cardName: string) =>
  cardName
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function CardImage({ card }: { card: CardEntry }) {
  const [imageUrl, setImageUrl] = useState("/card-back.jpg");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `/api/card-image?name=${encodeURIComponent(card.card)}`,
        );
        const data = await res.json();
        if (data.image) setImageUrl(data.image);
      } catch (error) {
        console.error("Failed to load card image:", card.card);
      }
    };

    fetchImage();
  }, [card.card]);

  return (
    <div className="text-center text-sm relative group" title={card.card}>
      <div className="relative transition-transform origin-center group-hover:scale-[2] group-hover:z-[999]">
        <Image
          src={imageUrl}
          alt={card.card}
          width={160}
          height={220}
          className="rounded-lg border border-gray-700 mx-auto"
          loading="lazy"
          unoptimized
        />
      </div>
      <p className="text-white mt-1 font-medium text-sm">{card.card}</p>
      <p className="text-gray-300 text-sm">x{card.quantity}</p>
    </div>
  );
}
