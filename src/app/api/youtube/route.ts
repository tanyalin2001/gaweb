import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID!;

const getPlaylists = async () => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`,
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API 錯誤: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return data.items;
};

const getPlaylistItems = async (playlistId: string) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${API_KEY}`,
  );
  const data = await res.json();
  return data.items;
};
console.log("API_KEY:", API_KEY);
console.log("CHANNEL_ID:", CHANNEL_ID);

export async function GET() {
  try {
    const playlists = await getPlaylists();

    const result = await Promise.all(
      playlists.map(async (pl: any) => {
        const items = await getPlaylistItems(pl.id);
        return {
          title: pl.snippet.title,
          videos: items.map((video: any) => ({
            id: video.snippet.resourceId.videoId,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium.url,
            tag: pl.snippet.title,
            youtubeUrl: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
          })),
        };
      }),
    );

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("❌ API Error", err);
    return new Response(
      JSON.stringify({ error: "YouTube fetch failed", detail: err.message }),
      { status: 500 },
    );
  }
}
