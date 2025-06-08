import { revalidateTag } from 'next/cache'
import {
  SUPERS_RANKINGS_HALF_HOURLY,
  SUPERS_SUMMARIES_HALF_HOURLY
} from 'apis/tags/revalidate-tags'
import type { NextRequest } from 'next/server'

/**
 * 過去２４時間用のキャッシュをクリアする
 * 毎時 05,35 分のスケジューラが完了したあとを狙う
 */
export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  revalidateTag(SUPERS_RANKINGS_HALF_HOURLY)
  revalidateTag(SUPERS_SUMMARIES_HALF_HOURLY)

  return Response.json({ success: true })
}
