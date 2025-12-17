import { revalidateTag } from 'next/cache'
import {
  SUPERS_RANKINGS_HALF_HOURLY,
  SUPERS_SUMMARIES_HALF_HOURLY
} from 'apis/tags/revalidate-tags'
import type { NextRequest } from 'next/server'

/**
 * Last 24 Hours のキャッシュをクリアする
 * 毎時 05,35 分のスケジューラが完了したあとを狙う
 */
export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  revalidateTag(SUPERS_RANKINGS_HALF_HOURLY, 'max')
  revalidateTag(SUPERS_SUMMARIES_HALF_HOURLY, 'max')

  return Response.json({ success: true })
}
