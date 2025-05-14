import { NextResponse } from "next/server";

const cache = new Map<string, { url: string; expires: number }>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";

  const cached = cache.get(name);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json({ image: cached.url });
  }

  try {
    const slug = slugify(name);
    const response = await fetch(`https://api.gatcg.com/cards/${slug}`);
    if (!response.ok) throw new Error("Card not found");

    const data = await response.json();
    const image = data.editions?.[0]?.image || "";
    const imageUrl = image ? `https://api.gatcg.com${image}` : "/card-back.jpg";

    cache.set(name, {
      url: imageUrl,
      expires: Date.now() + 24 * 60 * 60 * 1000,
    });

    return NextResponse.json({ image: imageUrl });
  } catch (error) {
    return NextResponse.json({ image: "/card-back.jpg" });
  }
}

const slugify = (cardName: string) =>
  cardName
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
