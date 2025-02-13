import {
  schema,
  SupersRankingSchema
} from 'apis/youtube/schema/supersRankingSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
  period: string // TODO: enum
  rankingType: string // TODO: enum
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

  return schema.parse(await res.json())
}
