import {
  SupersBundleRankSchema,
  schema
} from 'apis/youtube/schema/supersBundleRankSchema'
import { fetchAPI } from 'lib/fetchAPI'
import { RankingType } from 'types/ranking'

type Params = {
  videoId: string
  rankingType: RankingType
}

export async function getSupersBundleRank({
  videoId,
  rankingType
}: Params): Promise<SupersBundleRankSchema | undefined> {
  const res = await fetchAPI(
    `/api/supers-bundles/${videoId}/rank?rankingType=${rankingType}`
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const text = await res.text()
  if (!text) {
    return undefined
  } else {
    return schema.parse(JSON.parse(text))
  }
}
