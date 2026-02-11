import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // 秘密トークンで認証
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const tags: string[] = body.tags ?? (body.tag ? [body.tag] : [])

    if (tags.length === 0) {
      return NextResponse.json({ error: 'Tag is required' }, { status: 400 })
    }

    // キャッシュ無効化
    for (const tag of tags) {
      revalidateTag(tag, 'max')
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      now: Date.now()
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
