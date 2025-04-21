import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Info from '@/models/Info'

export async function GET() {
  await connectDB()
  const infos = await Info.find().sort({ createdAt: -1 })
  return NextResponse.json(infos)
}

export async function POST(req: Request) {
  await connectDB()
  const { title, content } = await req.json()
  const created = await Info.create({ title, content })
  return NextResponse.json(created)
}

export async function DELETE(req: Request) {
  await connectDB()
  const { id } = await req.json()
  await Info.findByIdAndDelete(id)
  return NextResponse.json({ message: 'deleted' })
}

export async function PUT(req: Request) {
  await connectDB()
  const { id, title, content } = await req.json()
  const updated = await Info.findByIdAndUpdate(id, { title, content }, { new: true })
  return NextResponse.json(updated)
}
