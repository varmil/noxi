import 'server-only'
import {
  StatisticsListSchema,
  responseSchema
} from 'apis/youtube/data-api/schema/statisticsSchema'
import { CACHE_1H } from 'lib/fetchAPI'

const MaxResultsPerRequest = 50

/**
 * NOTE:
 * This request directly request the YouTube Data API
 * and returns Video statistics
 *
 * 現状リアルタイム性が求められないコメントや再生回数表示にのみ
 * 用いているので長めにキャッシュしてみる
 */
export async function getStatistics({
  videoIds,
  revalidate
}: {
  videoIds: string[]
  revalidate?: number
}): Promise<StatisticsListSchema> {
  let results: StatisticsListSchema = []

  for (let i = 0; i < videoIds.length; i += MaxResultsPerRequest) {
    const batchIds = videoIds.slice(i, i + MaxResultsPerRequest)

    const searchParams = new URLSearchParams({
      part: 'statistics',
      id: batchIds.join(','),
      maxResults: `${Math.min(videoIds.length, MaxResultsPerRequest)}`,
      key: process.env.YOUTUBE_DATA_API_KEY
    })
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${searchParams.toString()}`,
      { next: { revalidate: revalidate ?? CACHE_1H } }
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
