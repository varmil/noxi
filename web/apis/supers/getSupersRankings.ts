import {
  SUPERS_RANKINGS,
  SUPERS_RANKINGS_HALF_HOURLY
} from 'apis/tags/revalidate-tags'
import {
  responseSchema,
  SupersRankingSchema
} from 'apis/youtube/schema/supersRankingSchema'
import { CACHE_1H, CACHE_1D, fetchAPI } from 'lib/fetchAPI'
import { Period } from 'types/period'
import { RankingType } from 'types/ranking'

type Params = {
  channelId: string
  period: Period
  rankingType: RankingType
}

export async function getSupersRankings({
  channelId,
  period,
  rankingType
}: Params): Promise<SupersRankingSchema | undefined> {
  const searchParams = new URLSearchParams({
    channelId,
    period,
    rankingType
  })

  // last24HoursはバックエンドのControllerで
  // キャッシュしているが消してもいいかもしれない
  const cache: RequestInit =
    period === 'last24Hours'
      ? { next: { revalidate: CACHE_1H, tags: [SUPERS_RANKINGS_HALF_HOURLY] } }
      : { next: { revalidate: CACHE_1D, tags: [SUPERS_RANKINGS] } }

  const res = await fetchAPI(
    `/api/supers-rankings?${searchParams.toString()}`,
    cache
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const text = await res.text()
  if (!text) {
    return undefined
  } else {
    return responseSchema.parse(JSON.parse(text))
  }
}
