import { getStreams } from 'apis/youtube/getStreams'
import { getEntry } from 'config/sitemap/getEntry'
import type { MetadataRoute } from 'next'

const LIMIT = 10000

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({
  id
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const streams = await getStreams({
    orderBy: [{ field: 'videoId', order: 'asc' }],
    limit: LIMIT,
    offset: id * LIMIT
  })
  return streams.map(stream =>
    getEntry({
      pathname: `/youtube/live/${stream.videoId}`,
      lastModified: stream.updatedAt
    })
  )
}
