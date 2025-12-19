import {
  ConcurrentViewerTrendsSchema,
  responseSchema
} from 'apis/youtube/schema/concurrentViewerTrendSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  days?: number
  group?: string
}

export async function getConcurrentViewerTrend({
  days = 28,
  group
}: Params = {}): Promise<ConcurrentViewerTrendsSchema> {
  const params = new URLSearchParams()
  params.set('days', String(days))
  if (group) {
    params.set('group', group)
  }

  const res = await fetchAPI(
    `/api/youtube/concurrent-viewer-trends?${params.toString()}`,
    {
      next: { revalidate: CACHE_1H }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch ConcurrentViewerTrend')
  }

  const data = responseSchema.parse(await res.json())
  return data.data
}
