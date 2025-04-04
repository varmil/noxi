import 'server-only'
import {
  CommentThreadsListSchema,
  responseSchema
} from 'apis/youtube/data-api/schema/commentThreadsSchema'
import { CACHE_12H } from 'lib/fetchAPI'

const MaxResultsPerRequest = 100

type Params = {
  allThreadsRelatedToChannelId?: string
  videoId?: string
  order?: 'time' | 'relevance'
  maxResults?: number
  pageToken?: string
  searchTerms?: string
}

/**
 * NOTE:
 * This request directly request the YouTube Data API
 * and returns comment threads
 */
export async function getCommentThreads({
  allThreadsRelatedToChannelId,
  videoId,
  order = 'relevance',
  maxResults = MaxResultsPerRequest,
  pageToken,
  searchTerms
}: Params): Promise<CommentThreadsListSchema> {
  let results: CommentThreadsListSchema = []

  const searchParams = new URLSearchParams({
    part: 'snippet,replies',
    textFormat: 'plainText',
    maxResults: `${maxResults}`,
    ...(allThreadsRelatedToChannelId && { allThreadsRelatedToChannelId }),
    ...(videoId && { videoId }),
    ...(order && { order }),
    ...(pageToken && { pageToken }),
    ...(searchTerms && { searchTerms }),
    key: process.env.YOUTUBE_DATA_API_KEY
  })
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?${searchParams.toString()}`,
    { next: { revalidate: CACHE_12H } }
  )
  if (!res.ok) {
    if (res.status === 403 || res.status === 404) {
      return []
    }

    console.error(await res.text())
    throw new Error('Failed to fetch data')
  }

  const response = await res.json()
  results = response.items ?? []
  return responseSchema.parse(results)
}
