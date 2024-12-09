import {
  ViewerCountsSchema,
  responseSchema
} from 'apis/youtube/schema/viewerCountSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoId: string
}

export async function getViewerCounts({
  videoId
}: Params): Promise<ViewerCountsSchema> {
  const res = await fetchAPI(
    `/api/youtube/stream-stats/viewer-counts?videoId=${videoId}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch ViewerCounts')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
