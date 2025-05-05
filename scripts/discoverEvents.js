const fs = require("fs");

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
  console.log(`🔍 Checking event ${id}`);

  try {
    const res = await fetch(`${BASE}/events/event?id=${id}`, { headers });
    if (!res.ok) {
      console.warn(`❌ Failed to fetch ${id}: ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (
      !data?.event_type?.includes("Premier") ||
      (data.players?.length || 0) < 20
    ) {
      return null;
    }

    console.log(`✅ Found Premier Event: ${id} - ${data.title}`);

    return {
      id,
      title: data.title,
      date: data.date,
      location: data.location || "",
      players: data.players?.map((p) => p.id) || [],
    };
  } catch (err) {
    console.warn(`⚠️  Error loading ${id}`, err.message);
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
    console.log(`🚀 Running batch: ${batch[0]} to ${batch[batch.length - 1]}`);
    await runBatch(batch);
  }

  fs.writeFileSync(
    "scripts/discoveredEvents.json",
    JSON.stringify(output, null, 2)
  );

  console.log(
    "🎉 Done! Saved discovered Premier events to scripts/discoveredEvents.json"
  );
})();
