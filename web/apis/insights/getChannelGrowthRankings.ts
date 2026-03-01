import {
  ChannelGrowthRankingsSchema,
  responseSchema
} from 'apis/insights/schema/channelGrowthRankingSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  period?: 'weekly' | 'monthly'
  days?: number
  group?: string
  orderBy?: 'diff' | 'rate'
  limit?: number
  minSubscriberCount?: number
}

export async function getChannelGrowthRankings({
  period,
  days,
  group,
  orderBy,
  limit,
  minSubscriberCount
}: Params = {}): Promise<ChannelGrowthRankingsSchema> {
  const params = new URLSearchParams()
  if (period) {
    params.set('period', period)
  } else {
    params.set('days', String(days ?? 28))
  }
  if (group) {
    params.set('group', group)
  }
  if (orderBy) {
    params.set('orderBy', orderBy)
  }
  if (limit !== undefined) {
    params.set('limit', String(limit))
  }
  if (minSubscriberCount !== undefined) {
    params.set('minSubscriberCount', String(minSubscriberCount))
  }

  const res = await fetchAPI(
    `/api/insights/channel-growth-rankings?${params.toString()}`,
    {
      next: { revalidate: CACHE_1H }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch ChannelGrowthRankings')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
