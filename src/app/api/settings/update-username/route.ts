import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'

export async function POST(req: Request) {
  await connectDB()

  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ message: '未登入' }, { status: 401 })

  let decoded: any
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return NextResponse.json({ message: '無效的 token' }, { status: 403 })
  }

  const { email } = decoded
  const { newUsername } = await req.json()

  const user = await User.findOneAndUpdate(
    { email },
    { username: newUsername },
    { new: true }
  )

  if (!user) return NextResponse.json({ message: '找不到帳號' }, { status: 404 })

  const newToken = jwt.sign(
    { email: user.email, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return NextResponse.json({ message: '更新成功', token: newToken })
}
