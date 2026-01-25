import { SUPERS_BUNDLES } from 'apis/tags/revalidate-tags'
import {
  SupersBundleRankSchema,
  schema
} from 'apis/youtube/schema/supersBundleRankSchema'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'
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
    `/api/supers-bundles/${videoId}/rank?rankingType=${rankingType}`,
    { next: { revalidate: CACHE_1D, tags: [SUPERS_BUNDLES] } }
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
