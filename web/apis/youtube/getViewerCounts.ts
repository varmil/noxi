import {
  ViewerCountsSchema,
  responseSchema
} from 'apis/youtube/schema/viewerCountSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoId: string
}

export async function getViewerCounts({
  videoId
}: Params): Promise<ViewerCountsSchema> {
  const res = await fetchAPI(
    `/api/youtube/stream-stats/viewer-counts?videoId=${videoId}`,
    { next: { revalidate: CACHE_1H } }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch ViewerCounts')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
