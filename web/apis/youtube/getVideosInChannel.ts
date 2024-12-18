import { VideosSchema, responseSchema } from 'apis/youtube/schema/videoSchema'
import { CACHE_12H, fetchAPI } from 'lib/fetchAPI'

export async function getVideosInChannel({
  channelId,
  limit
}: {
  channelId: string
  limit: number
}): Promise<VideosSchema> {
  const res = await fetchAPI(
    `/api/youtube/channels/${channelId}/videos?${new URLSearchParams({
      limit: String(limit)
    }).toString()}`,
    {
      next: { revalidate: CACHE_12H }
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const data = responseSchema.parse(await res.json())
  return data.items.list
}
