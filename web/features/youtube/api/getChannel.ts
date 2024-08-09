import { ChannelSchema, schema } from 'api-schema/youtube/channelSchema'

export async function getChannel(id: string): Promise<ChannelSchema> {
  const res = await fetch(
    `${process.env.BASE_URL}/api/youtube/channels/${id}`,
    {
      next: { revalidate: 1800 }
    }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = schema.parse(await res.json())
  return data
}
