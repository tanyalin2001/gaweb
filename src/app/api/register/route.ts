import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { email, password, username } = await req.json();
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: "Email 已被註冊" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, username });

  return NextResponse.json({ success: true });
}
