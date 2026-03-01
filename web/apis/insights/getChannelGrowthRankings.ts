import {
  ChannelGrowthRankingsSchema,
  responseSchema
} from 'apis/insights/schema/channelGrowthRankingSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  days?: number
  group?: string
  orderBy?: 'diff' | 'rate'
  limit?: number
  minSubscriberCount?: number
}

export async function getChannelGrowthRankings({
  days = 28,
  group,
  orderBy,
  limit,
  minSubscriberCount
}: Params = {}): Promise<ChannelGrowthRankingsSchema> {
  const params = new URLSearchParams()
  params.set('days', String(days))
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
