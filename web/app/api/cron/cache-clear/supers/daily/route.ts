import { revalidateTag } from 'next/cache'
import { SUPERS_RANKINGS, SUPERS_SUMMARIES } from 'apis/tags/revalidate-tags'
import type { NextRequest } from 'next/server'

/**
 * スパチャ金額集計のrevalidateを行う
 * １日に１回 3:00 JST のスケジューラが完了したあとを狙う
 */
export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  revalidateTag(SUPERS_RANKINGS, 'max')
  revalidateTag(SUPERS_SUMMARIES, 'max')

  return Response.json({ success: true })
}
