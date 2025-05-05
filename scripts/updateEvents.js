import fetch from "node-fetch";
import fs from "fs";
import path from "path";
const BASE = "https://omni.gatcg.com/api";
const headers = {
  "User-Agent": "Mozilla/5.0",
  Referer: "https://omni.gatcg.com/",
  Origin: "https://omni.gatcg.com",
};

const output = [];
const START = 18000;
const END = 26000;
const CONCURRENCY = 10;

async function fetchEvent(id) {
  try {
    const res = await fetch(`${BASE}/events/event?id=${id}`, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.title?.toLowerCase()?.includes("premier")) return null;
    console.log(`✅ Found Premier Event: ${id} - ${data.title}`);
    return {
      id,
      title: data.title,
      date: data.date,
      location: data.location || "",
    };
  } catch (err) {
    return null;
  }
}

async function runBatch(ids) {
  const results = await Promise.all(ids.map(fetchEvent));
  for (const evt of results) {
    if (evt) output.push(evt);
  }
}

(async () => {
  const allIds = Array.from({ length: END - START + 1 }, (_, i) => START + i);

  for (let i = 0; i < allIds.length; i += CONCURRENCY) {
    const batch = allIds.slice(i, i + CONCURRENCY);
    await runBatch(batch);
  }

  fs.writeFileSync(
    "scripts/discoveredEvents.json",
    JSON.stringify(output, null, 2),
  );
  console.log(
    "🎉 Done! Saved discovered Premier events to scripts/discoveredEvents.json",
  );
})();
// const BASE = "https://omni.gatcg.com/api";
// const headers = {
//   "User-Agent": "Mozilla/5.0",
//   Referer: "https://omni.gatcg.com/",
//   Origin: "https://omni.gatcg.com",
// };

// const EVENTS_FILE = "public/events.json";
// const EVENTS_DIR = "public/events";
// const DECKS_DIR = "public/decks";

// async function fetchAllEvents() {
//   const res = await fetch(`${BASE}/events?premier=true`, { headers });
//   if (!res.ok) throw new Error("Failed to fetch event list");
//   return res.json();
// }

// async function fetchEventDetails(id, players) {
//   const eventRes = await fetch(`${BASE}/events/event?id=${id}`, { headers });
//   if (!eventRes.ok) throw new Error(`Failed to fetch event ID: ${id}`);
//   const event = await eventRes.json();

//   const decks = [];
//   for (const player of players) {
//     const deckRes = await fetch(
//       `${BASE}/events/decklist?id=${id}&player=${player}`,
//       { headers }
//     );
//     if (!deckRes.ok) {
//       console.warn(
//         `⚠️  Failed to fetch decklist for event ${id} player ${player}`
//       );
//       continue;
//     }
//     const deck = await deckRes.json();
//     decks.push(deck);
//   }

//   return { event, decks };
// }

// (async () => {
//   if (!fs.existsSync(EVENTS_DIR)) fs.mkdirSync(EVENTS_DIR, { recursive: true });
//   if (!fs.existsSync(DECKS_DIR)) fs.mkdirSync(DECKS_DIR, { recursive: true });

//   const existing = fs
//     .readdirSync(EVENTS_DIR)
//     .map((f) => f.replace(".json", ""));
//   const all = await fetchAllEvents();
//   const finalList = [];

//   for (const evt of all) {
//     const id = evt.id.toString();
//     const name = evt.title;
//     const date = evt.date;
//     const location = evt.location;
//     const url = `https://omni.gatcg.com/events/${id}`;

//     finalList.push({ id, name, date, location, url });

//     if (existing.includes(id)) continue;

//     console.log(`🆕 Fetching new event ${id}...`);

//     try {
//       const playerIds = (evt.players || []).map((p) => p.id); // assume players are available in evt
//       const { event, decks } = await fetchEventDetails(id, playerIds);
//       fs.writeFileSync(
//         `${EVENTS_DIR}/${id}.json`,
//         JSON.stringify(event, null, 2)
//       );
//       fs.writeFileSync(
//         `${DECKS_DIR}/${id}.json`,
//         JSON.stringify(decks, null, 2)
//       );
//       console.log(`✅ Saved ${id}`);
//     } catch (e) {
//       console.warn(`⚠️  Error loading ${id}`, e.message);
//     }
//   }

//   fs.writeFileSync(EVENTS_FILE, JSON.stringify(finalList, null, 2));
//   console.log("🎉 Done: updated events.json");
// })();
