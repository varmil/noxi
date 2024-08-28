import {
  ChannelsSchema,
  responseSchema
} from 'api/youtube/schema/channelSchema'
import Site from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  group: (typeof Site.Groups)[number]
  limit: number
}

export async function getChartOfChannels({
  /**
   * @example ${group}: hololive
   * @example ${group}: hololive-english
   */
  group,
  limit
}: Params): Promise<ChannelsSchema> {
  const res = await fetchAPI(
    `/api/groups/${group}/charts/channels?${new URLSearchParams({
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
