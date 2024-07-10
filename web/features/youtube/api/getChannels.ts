import {
  ChannelsSchema,
  listSchema
} from 'features/youtube/types/channelSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getChannels(): Promise<ChannelsSchema> {
  const res = await fetchAPI('/api/youtube/channels', {
    // next: { revalidate: 600 }
    cache: 'no-store'
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = listSchema.parse(await res.json())
  return data.list
}
