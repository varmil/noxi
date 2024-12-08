import { ChannelSchema, schema } from 'apis/youtube/schema/channelSchema'
import { CACHE_12H, fetchAPI } from 'lib/fetchAPI'

export async function getChannel(id: string): Promise<ChannelSchema> {
  const res = await fetchAPI(`/api/youtube/channels/${id}`, {
    next: { revalidate: CACHE_12H }
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = schema.parse(await res.json())
  return data
}
