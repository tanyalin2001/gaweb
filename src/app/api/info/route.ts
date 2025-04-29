import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export async function GET() {
  const infoDir = path.join(process.cwd(), "src", "content", "info");


  try {
    const files = await fs.readdir(infoDir);
    const posts = [];

    for (const file of files) {
      if (file.endsWith(".md")) {
        const id = file.replace(".md", "");
        const filePath = path.join(infoDir, file);
        const content = await fs.readFile(filePath, "utf8");
        const { data } = matter(content);

        posts.push({
          id,
          title: data.title,
          createdAt: data.createdAt,
          coverUrl: data.coverUrl,
          tags: Array.isArray(data.tags) ? data.tags : [data.tags],
        });
      }
    }

    posts.sort((a, b) => {
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to load posts", { status: 500 });
  }
}
