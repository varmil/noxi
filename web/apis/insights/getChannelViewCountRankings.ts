import {
  ChannelViewCountRankingsSchema,
  responseSchema
} from 'apis/insights/schema/channelViewCountRankingSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  period?: 'weekly' | 'monthly'
  days?: number
  group?: string
  limit?: number
}

export async function getChannelViewCountRankings({
  period,
  days,
  group,
  limit
}: Params = {}): Promise<ChannelViewCountRankingsSchema> {
  const params = new URLSearchParams()
  if (period) {
    params.set('period', period)
  } else {
    params.set('days', String(days ?? 28))
  }
  if (group) {
    params.set('group', group)
  }
  if (limit !== undefined) {
    params.set('limit', String(limit))
  }

  const res = await fetchAPI(
    `/api/insights/channel-view-count-rankings?${params.toString()}`,
    {
      next: { revalidate: CACHE_1H }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch ChannelViewCountRankings')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
