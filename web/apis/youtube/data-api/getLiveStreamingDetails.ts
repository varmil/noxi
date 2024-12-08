import 'server-only'
import {
  LiveStreamingDetailsListSchema,
  responseSchema
} from 'apis/youtube/data-api/schema/liveStreamingDetailsSchema'
import { CACHE_1M } from 'lib/fetchAPI'

const MaxResultsPerRequest = 50

/**
 * NOTE:
 * This request directly request the YouTube Data API
 * and returns live streaming details
 */
export async function getLiveStreamingDetails({
  videoIds
}: {
  videoIds: string[]
}): Promise<LiveStreamingDetailsListSchema> {
  let results: LiveStreamingDetailsListSchema = []

  for (let i = 0; i < videoIds.length; i += MaxResultsPerRequest) {
    const batchIds = videoIds.slice(i, i + MaxResultsPerRequest)

    const searchParams = new URLSearchParams({
      part: 'liveStreamingDetails',
      id: batchIds.join(','),
      maxResults: `${Math.min(videoIds.length, MaxResultsPerRequest)}`,
      key: process.env.YOUTUBE_DATA_API_KEY
    })
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${searchParams.toString()}`,
      { next: { revalidate: CACHE_1M } }
    )
    if (!res.ok) {
      console.error(await res.text())
      throw new Error('Failed to fetch data')
    }

    const response = await res.json()
    results = results.concat(response.items ?? [])
  }

  return responseSchema.parse(results)
}
