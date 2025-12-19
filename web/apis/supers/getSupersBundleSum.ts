import {
  sumSchema,
  SupersBundleSumSchema
} from 'apis/youtube/schema/supersBundleSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
  createdAfter: Date
  createdBefore?: Date
}

export async function getSupersBundleSum({
  channelId,
  createdAfter,
  createdBefore
}: Params): Promise<SupersBundleSumSchema> {
  const searchParams = new URLSearchParams({
    channelId,
    period: 'last24Hours',
    createdAfter: createdAfter.toISOString(),
    ...(createdBefore && { createdBefore: createdBefore?.toISOString() })
  })
  const res = await fetchAPI(
    `/api/supers-bundles/sum?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1H } }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return sumSchema.parse(await res.json())
}
