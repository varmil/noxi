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
}: Params): Promise<SupersRankingSchema> {
  const searchParams = new URLSearchParams({
    channelId,
    period,
    rankingType
  })

  const res = await fetchAPI(`/api/supers-rankings?${searchParams.toString()}`)

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
