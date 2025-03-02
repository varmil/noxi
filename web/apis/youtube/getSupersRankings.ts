import {
  responseSchema,
  SupersRankingSchema
} from 'apis/youtube/schema/supersRankingSchema'
import { fetchAPI } from 'lib/fetchAPI'
import { Period } from 'types/period'
import { RankingType } from 'types/supers-ranking'

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

  // last24Hoursの場合は古い値が見えることが多いのでキャッシュしない
  // （バックエンドのControllerでキャッシュしている）
  const noCache: RequestInit | undefined =
    period === 'last24Hours' ? { cache: 'no-store' } : undefined

  const res = await fetchAPI(
    `/api/supers-rankings?${searchParams.toString()}`,
    noCache
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
