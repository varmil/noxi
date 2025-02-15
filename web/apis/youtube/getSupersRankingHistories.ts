import {
  SupersRankingHistoriesSchema,
  responseHistoriesSchema
} from 'apis/youtube/schema/supersRankingSchema'
import { CACHE_10M, CACHE_1D, fetchAPI } from 'lib/fetchAPI'
import { Period } from 'types/period'
import { RankingType } from 'types/supers-ranking'

type Params = {
  channelId: string
  period: Period
  rankingType: RankingType
  createdBefore: Date
  createdAfter: Date
  limit?: number
}

export async function getSupersRankingHistories({
  channelId,
  period,
  rankingType,
  createdBefore,
  createdAfter,
  limit
}: Params): Promise<SupersRankingHistoriesSchema> {
  const searchParams = new URLSearchParams({
    channelId,
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
