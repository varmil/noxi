import { getStreams } from 'apis/youtube/getStreams'
import { getEntry } from 'config/sitemap/getEntry'
import { CACHE_1D } from 'lib/fetchAPI'
import type { MetadataRoute } from 'next'

const LIMIT = 2000

// Streamsの総数 / LIMIT = 総ページ数
export async function generateSitemaps() {
  return [...Array(50)].map((_, i) => ({ id: i }))
}

// Google's limit is 50,000 URLs per sitemap
export default async function sitemap({
  id
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const streams = await getStreams({
    peakConcurrentViewers: { gte: 1 },
    orderBy: [{ field: 'actualEndTime', order: 'asc' }],
    limit: LIMIT,
    offset: id * LIMIT,
    revalidate: CACHE_1D
  })

  return streams
    .map(stream => {
      const { videoId } = stream

      return getEntry({
        pathname: `/youtube/live/${videoId}`,
        // NOTE: googlebotが正しい更新を終えたらコメントアウトする
        lastModified: new Date('2025-04-16T18:33:00+09:00')
      })
    })
    .filter(e => !!e)
}
