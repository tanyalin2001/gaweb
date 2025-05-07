import axios from "axios";
import fs from "fs/promises";

const BASE_URL = "https://omni.gatcg.com/api";
const START_EVENT_ID = 20320;
const END_EVENT_ID = 25000;
const OUTPUT_FILE = "events_with_decklists_full.json";

async function fetchEvent(eventId) {
  try {
    const res = await axios.get(`${BASE_URL}/events/event?id=${eventId}`);
    return res.data;
  } catch (err) {
    console.warn(`❌ Failed to fetch event ${eventId}: ${err.message}`);
    return null;
  }
}

async function fetchDecklist(eventId, playerId) {
  try {
    const res = await axios.get(
      `${BASE_URL}/events/decklist?id=${eventId}&player=${playerId}`,
    );
    return res.data;
  } catch (err) {
    console.warn(`⚠️ No decklist for player ${playerId} in event ${eventId}`);
    return null;
  }
}

function getSwissRecords(event) {
  const records = {};
  for (const player of event.players || []) {
    records[player.id] = { W: 0, L: 0, D: 0, Bye: 0 };
  }

  const rounds = event?.stages?.[0]?.rounds || [];
  for (const round of rounds) {
    for (const match of round.matches || []) {
      for (const pairing of match.pairing || []) {
        const id = pairing.id;
        const status = pairing.status;
        if (!records[id]) continue;
        if (status === "winner") records[id].W++;
        else if (status === "loser") records[id].L++;
        else if (status === "tied") records[id].D++;
        else if (status === "byed") records[id].Bye++;
      }
    }
  }

  const output = {};
  for (const [id, r] of Object.entries(records)) {
    let str = `${r.W}-${r.L}-${r.D}`;
    if (r.Bye > 0) str += ` (+${r.Bye} BYE)`;
    output[id] = str;
  }

  return output;
}

async function getCardImage(cardName) {
  try {
    const res = await axios.get(
      `https://api.gatcg.com/cards/search?name=${encodeURIComponent(cardName)}`,
    );
    const card = res.data?.results?.[0];
    const path = card?.editions?.[0]?.image;
    if (path) return `https://api.gatcg.com${path}`;
  } catch (err) {
    console.warn(`⚠️ Image not found for ${cardName}`);
  }
  return null;
}

async function enrichDeckWithImages(deck) {
  const addImages = async (cards = []) =>
    await Promise.all(
      cards.map(async ({ card, quantity }) => ({
        card,
        quantity,
        image: await getCardImage(card),
      })),
    );

  return {
    main: await addImages(deck.main || []),
    sideboard: await addImages(deck.sideboard || []),
    material: await addImages(deck.material || []),
  };
}

async function main() {
  const results = [];

  for (let id = START_EVENT_ID; id <= END_EVENT_ID; id++) {
    const event = await fetchEvent(id);
    if (!event || !event.decklists || !event._players || !event.players)
      continue;

    console.log(`✅ Event ${id} - ${event.name}`);

    const swissMap = getSwissRecords(event);
    const playerMap = Object.fromEntries(
      event.players.map((p) => [
        p.id,
        { name: p.username, country: p.addressCountryCode },
      ]),
    );

    const playerDecks = [];

    for (const playerId of event._players) {
      const deck = await fetchDecklist(id, playerId);
      if (deck) {
        const enrichedDeck = await enrichDeckWithImages(deck);
        const player = playerMap[playerId] || {};
        playerDecks.push({
          playerId,
          playerName: player.name || "Unknown",
          country: player.country || "Unknown",
          deckName: deck.name || "",
          record: swissMap[playerId] || "",
          deck: enrichedDeck,
        });
      }
    }

    results.push({
      id,
      name: event.name,
      date: event.startAt,
      playerCount: event._players.length,
      decks: playerDecks,
    });
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`✅ All done! Output saved to ${OUTPUT_FILE}`);
}

main();
