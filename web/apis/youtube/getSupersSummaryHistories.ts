import {
  SupersSummaryHistoriesSchema,
  responseHistoriesSchema
} from 'apis/youtube/schema/supersSummarySchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
  createdBefore?: Date
  createdAfter: Date
}

export async function getSupersSummaryHistories({
  channelId,
  createdBefore,
  createdAfter
}: Params): Promise<SupersSummaryHistoriesSchema> {
  const searchParams = new URLSearchParams({
    ...(createdBefore && { createdBefore: createdBefore.toISOString() }),
    ...(createdAfter && { createdAfter: createdAfter.toISOString() })
  })

  const res = await fetchAPI(
    `/api/supers-summaries/${channelId}?${searchParams.toString()}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return responseHistoriesSchema.parse(await res.json()).list
}
