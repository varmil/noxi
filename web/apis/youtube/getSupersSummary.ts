import {
  responseSchema,
  SupersSummarySchema
} from 'apis/youtube/schema/supersSummarySchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getSupersSummary(
  channelId: string
): Promise<SupersSummarySchema> {
  const res = await fetchAPI(`/api/supers-summaries/${channelId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return responseSchema.parse(await res.json())
}
