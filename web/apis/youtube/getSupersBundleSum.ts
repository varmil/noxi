import {
  sumSchema,
  SupersBundleSumSchema
} from 'apis/youtube/schema/supersBundleSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
  createdAtGTE: Date
  createdAtLTE?: Date
  limit?: number
}

export async function getSupersBundleSum({
  channelId,
  createdAtGTE,
  createdAtLTE,
  limit
}: Params): Promise<SupersBundleSumSchema> {
  const searchParams = new URLSearchParams({
    channelId,
    period: 'last24Hours',
    createdAtGTE: createdAtGTE.toISOString(),
    ...(createdAtLTE && { createdAtLTE: createdAtLTE?.toISOString() }),
    ...(limit && { limit: String(limit) })
  })
  const res = await fetchAPI(
    `/api/supers-bundles/sum?${searchParams.toString()}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return sumSchema.parse(await res.json())
}
