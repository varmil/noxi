import { SUPERS_SUMMARIES } from 'apis/tags/revalidate-tags'
import {
  responseSchema,
  SupersSummarySchema
} from 'apis/youtube/schema/supersSummarySchema'
import { CACHE_1W, fetchAPI } from 'lib/fetchAPI'

export async function getSupersSummary(
  channelId: string
): Promise<SupersSummarySchema> {
  const res = await fetchAPI(`/api/supers-summaries/${channelId}`, {
    next: { revalidate: CACHE_1W, tags: [SUPERS_SUMMARIES] }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return responseSchema.parse(await res.json())
}
