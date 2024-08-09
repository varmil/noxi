import { VideosSchema, responseSchema } from 'api-schema/youtube/videoSchema'

export async function getVideosInChannel({
  channelId
}: {
  channelId: string
}): Promise<VideosSchema> {
  const res = await fetch(
    `${process.env.BASE_URL}/api/youtube/channels/${channelId}/videos`,
    {
      next: { revalidate: 3600 }
    }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.items.list
}
