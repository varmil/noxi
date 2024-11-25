import {
  ChannelsSchema,
  responseSchema
} from 'apis/youtube/schema/channelSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  ids: string[]
}

export async function getChannels({ ids }: Params): Promise<ChannelsSchema> {
  if (ids.length === 0) {
    return []
  }

  const res = await fetchAPI(
    `/api/youtube/channels?${new URLSearchParams({
      ids: [...new Set(ids)].join(',')
    }).toString()}`,
    {
      next: { revalidate: 3600 * 12 }
    }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
