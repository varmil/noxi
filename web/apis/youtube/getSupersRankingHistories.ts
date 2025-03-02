import {
  SupersRankingHistoriesSchema,
  responseHistoriesSchema
} from 'apis/youtube/schema/supersRankingSchema'
import { CACHE_10M, fetchAPI } from 'lib/fetchAPI'
import { Period } from 'types/period'
import { RankingType } from 'types/supers-ranking'

type Params = {
  channelIds: string[]
  period: Period
  rankingType: RankingType
  createdBefore: Date
  createdAfter: Date
  limit?: number
}

export async function getSupersRankingHistories({
  channelIds,
  period,
  rankingType,
  createdBefore,
  createdAfter,
  limit
}: Params): Promise<SupersRankingHistoriesSchema> {
  if (channelIds.length === 0) {
    return []
  }

  const searchParams = new URLSearchParams({
    channelIds: [...new Set(channelIds)].join(','),
    period,
    rankingType,
    ...(createdBefore && { createdBefore: createdBefore.toISOString() }),
    ...(createdAfter && { createdAfter: createdAfter.toISOString() }),
    ...(limit !== undefined && { limit: String(limit) })
  })

  const res = await fetchAPI(
    `/api/supers-rankings/histories?${searchParams.toString()}`,
    { next: { revalidate: CACHE_10M } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return responseHistoriesSchema.parse(await res.json()).list
}
