import { ChannelSchema } from 'features/youtube/types/channelSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Res = ChannelSchema

export async function getChannel(id: string): Promise<ChannelSchema> {
  // const res = await fetchAPI('/api/youtube/channels', { cache: 'no-store' })
  const res = await fetchAPI(`/api/youtube/channels/${id}`, {
    // next: { revalidate: 600 }
    cache: 'no-store'
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return await (res.json() as Promise<Res>)
}
