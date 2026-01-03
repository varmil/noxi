import {
  ChannelGrowthRankingsSchema,
  responseSchema
} from 'apis/youtube/schema/channelGrowthRankingSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  days?: number
  group?: string
}

export async function getChannelGrowthRankings({
  days = 28,
  group
}: Params = {}): Promise<ChannelGrowthRankingsSchema> {
  const params = new URLSearchParams()
  params.set('days', String(days))
  if (group) {
    params.set('group', group)
  }

  const res = await fetchAPI(
    `/api/youtube/channel-growth-rankings?${params.toString()}`,
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
