import {
  sumSchema,
  SupersBundleSumSchema
} from 'apis/youtube/schema/supersBundleSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
}

export async function getSupersBundleSum({
  channelId
}: Params): Promise<SupersBundleSumSchema> {
  const searchParams = new URLSearchParams({
    channelId,
    period: 'last24Hours'
  })
  const res = await fetchAPI(
    `/api/supers-bundles/sum?${searchParams.toString()}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return sumSchema.parse(await res.json())
}
