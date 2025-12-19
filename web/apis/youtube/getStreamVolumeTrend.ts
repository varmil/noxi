import {
  StreamVolumeTrendsSchema,
  responseSchema
} from 'apis/youtube/schema/streamVolumeTrendSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  days?: number
  group?: string
}

export async function getStreamVolumeTrend({
  days = 28,
  group
}: Params = {}): Promise<StreamVolumeTrendsSchema> {
  const params = new URLSearchParams()
  params.set('days', String(days))
  if (group) {
    params.set('group', group)
  }

  const res = await fetchAPI(
    `/api/youtube/stream-volume-trends?${params.toString()}`,
    {
      next: { revalidate: CACHE_1H }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch StreamVolumeTrend')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
