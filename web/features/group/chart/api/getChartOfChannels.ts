import {
  ChannelsSchema,
  responseSchema
} from 'api/youtube/schema/channelSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  limit: number
}

export async function getChartOfChannels({
  limit
}: Params): Promise<ChannelsSchema> {
  const res = await fetchAPI(
    `/api/hololive/charts/channels?${new URLSearchParams({
      limit: String(limit)
    }).toString()}`,
    {
      next: { revalidate: 600 }
    }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(
      `Failed to fetch data. status:${res.status} ${res.statusText}`
    )
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
