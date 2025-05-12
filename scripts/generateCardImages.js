import fs from "fs";
import fetch from "node-fetch";

const OUTPUT_FILE = "cards_with_images.json";

async function fetchAllCards(limit = 1000) {
  let allCards = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const url = `https://api.gatcg.com/cards/search`;
    console.log("Fetching:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed at offset ${offset}`);

    const json = await res.json();
    const cards = json.data;

    if (cards.length === 0) break;

    allCards.push(...cards);
    offset += limit;

    hasMore = cards.length === limit;
  }

  return allCards;
}

async function main() {
  try {
    const allCards = await fetchAllCards(100);
    const imageMap = {};

    for (const card of allCards) {
      const name = card.name;
      const image = card.editions?.[0]?.image;
      if (name && image) {
        imageMap[name] = `https://api.gatcg.com/cards/images/${image
          .split("/")
          .pop()}`;
      }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(imageMap, null, 2));
    console.log(
      `✅ Saved ${Object.keys(imageMap).length} card images to ${OUTPUT_FILE}`
    );
  } catch (err) {
    console.error("❌ Error generating card image map:", err);
  }
}

main();
