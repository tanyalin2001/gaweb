import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { _id: '1', title: '示範文章', author: 'Admin', status: '審核中', createdAt: new Date().toISOString() },
  ])
}
