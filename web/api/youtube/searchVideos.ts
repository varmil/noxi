import { VideosSchema, responseSchema } from 'api/youtube/schema/videoSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  q: string
  limit: number
  order: 'date' | 'rating' | 'relevance' | 'viewCount'
  /** ISO8601 */
  publishedBefore?: Date
  /** ISO8601 */
  publishedAfter?: Date
  channelId?: string
  /** ISO31661Alpha2 */
  country?: string
  /** ISO 639-1 */
  language?: string
}

export async function searchVideos({
  q,
  limit,
  order,
  publishedBefore,
  publishedAfter,
  channelId,
  country,
  language
}: Params): Promise<VideosSchema> {
  const searchParams = new URLSearchParams({
    q,
    limit: String(limit),
    order,
    ...(publishedBefore && { publishedBefore: publishedBefore.toISOString() }),
    ...(publishedAfter && { publishedAfter: publishedAfter.toISOString() }),
    ...(channelId && { channelId }),
    ...(country && { country }),
    ...(language && { language })
  })
  const res = await fetchAPI(
    `/api/youtube/searches/videos?${searchParams.toString()}`,
    {
      next: { revalidate: 600 }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.items.list
}
