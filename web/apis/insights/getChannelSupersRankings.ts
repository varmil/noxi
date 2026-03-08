import {
  ChannelSupersRankingsSchema,
  responseSchema
} from 'apis/insights/schema/channelSupersRankingSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  period: 'weekly' | 'monthly'
  group?: string
  limit?: number
}

export async function getChannelSupersRankings({
  period,
  group,
  limit
}: Params): Promise<ChannelSupersRankingsSchema> {
  const params = new URLSearchParams()
  params.set('period', period)
  if (group) {
    params.set('group', group)
  }
  if (limit !== undefined) {
    params.set('limit', String(limit))
  }

  const res = await fetchAPI(
    `/api/insights/channel-supers-rankings?${params.toString()}`,
    {
      next: { revalidate: CACHE_1H }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch ChannelSupersRankings')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
