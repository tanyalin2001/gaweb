import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Info from "@/models/Info";

export async function GET() {
  await connectDB();
  const infos = await Info.find().sort({ createdAt: -1 });
  return NextResponse.json(infos);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { title, content, coverUrl, tags } = await req.json();
  const info = await Info.create({
    title,
    content,
    coverUrl,
    tags: tags || [],
    createdAt: new Date(),
  });
  return NextResponse.json(info);
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { id, title, content } = await req.json();
  await Info.findByIdAndUpdate(id, { title, content });
  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  await Info.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
