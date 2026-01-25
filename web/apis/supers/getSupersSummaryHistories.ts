import { SUPERS_SUMMARIES } from 'apis/tags/revalidate-tags'
import {
  SupersSummaryHistoriesSchema,
  responseHistoriesSchema
} from 'apis/youtube/schema/supersSummarySchema'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
  createdBefore?: Date
  createdAfter?: Date
  limit?: number
  offset?: number
}

export async function getSupersSummaryHistories({
  channelId,
  createdBefore,
  createdAfter,
  limit,
  offset
}: Params): Promise<SupersSummaryHistoriesSchema> {
  const searchParams = new URLSearchParams({
    ...(createdBefore && { createdBefore: createdBefore.toISOString() }),
    ...(createdAfter && { createdAfter: createdAfter.toISOString() }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  const res = await fetchAPI(
    `/api/supers-summaries/${channelId}/histories?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [SUPERS_SUMMARIES] } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return responseHistoriesSchema.parse(await res.json()).list
}
