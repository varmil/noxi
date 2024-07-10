import { VideosSchema } from 'features/youtube/types/videoSchema'
import { fetchAPI } from 'lib/fetchAPI'

interface Res {
  list: VideosSchema
}

export async function getVideos(): Promise<VideosSchema> {
  const res = await fetchAPI('/api/youtube/videos', {
    cache: 'no-store'
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return (await (res.json() as Promise<Res>)).list
}
