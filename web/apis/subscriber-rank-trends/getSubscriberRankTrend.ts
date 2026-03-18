import {
  responseSchema,
  SubscriberRankTrendSchema
} from 'apis/subscriber-rank-trends/schema/subscriberRankTrendSchema'
import { CACHE_1W, fetchAPI } from 'lib/fetchAPI'

export async function getSubscriberRankTrend(
  channelId: string
): Promise<SubscriberRankTrendSchema> {
  const params = new URLSearchParams({ channelId })

  const res = await fetchAPI(
    `/api/subscriber-rank-trends?${params.toString()}`,
    { next: { revalidate: CACHE_1W } }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch SubscriberRankTrend')
  }

  return responseSchema.parse(await res.json())
}
