import { listSchema, VideosSchema } from 'features/youtube/types/videoSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getVideos({
  channelId
}: {
  channelId: string
}): Promise<VideosSchema> {
  const params = new URLSearchParams({ channelId })
  const res = await fetchAPI(`/api/youtube/videos?${params.toString()}`, {
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
