import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Info from '@/models/Info'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB()

  try {
    const post = await Info.findById(params.id)
    if (!post) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving info' }, { status: 500 })
  }
}
