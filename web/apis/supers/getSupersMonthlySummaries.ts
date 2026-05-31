import { SUPERS_SUMMARIES } from 'apis/tags/revalidate-tags'
import {
  listSchema,
  SupersMonthlySummariesSchema
} from 'apis/youtube/schema/supersMonthlySummarySchema'
import { CACHE_1W, fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
  limit?: number
  offset?: number
}

export async function getSupersMonthlySummaries({
  channelId,
  limit,
  offset
}: Params): Promise<SupersMonthlySummariesSchema> {
  const searchParams = new URLSearchParams({
    channelId,
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  const res = await fetchAPI(
    `/api/supers-summaries/monthly?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1W, tags: [SUPERS_SUMMARIES] } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return listSchema.parse(await res.json()).list
}
