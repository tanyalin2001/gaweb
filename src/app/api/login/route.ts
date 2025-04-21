import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: '找不到此帳號' }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ message: '密碼錯誤' }, { status: 401 });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role, username: user.username },
    process.env.JWT_SECRET || 'devsecret',
    { expiresIn: '1d' }
  );

  return NextResponse.json({ token });
}