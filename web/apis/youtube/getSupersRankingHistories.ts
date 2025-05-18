import {
  SupersRankingHistoriesSchema,
  responseHistoriesSchema
} from 'apis/youtube/schema/supersRankingSchema'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'
import { Period } from 'types/period'
import { RankingType } from 'types/ranking'

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

  // last24Hoursの場合は古い値が見えることが多いのでキャッシュしない
  // （バックエンドのControllerでキャッシュしている）
  const cache: RequestInit =
    period === 'last24Hours'
      ? { cache: 'no-store' }
      : { next: { revalidate: CACHE_1D } }

  const res = await fetchAPI(
    `/api/supers-rankings/histories?${searchParams.toString()}`,
    cache
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return responseHistoriesSchema.parse(await res.json()).list
}
