import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ message: "未登入" }, { status: 401 });

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ message: "無效的 token" }, { status: 403 });
  }

  const { email } = decoded;
  const { oldPassword, newPassword } = await req.json();

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ message: "帳號不存在" }, { status: 404 });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch)
    return NextResponse.json({ message: "舊密碼錯誤" }, { status: 400 });

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashed });

  return NextResponse.json({ message: "密碼已更新" });
}
