import {
  ChatCountsSchema,
  responseSchema
} from 'apis/youtube/schema/chatCountSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoId: string
}

export async function getChatCounts({
  videoId
}: Params): Promise<ChatCountsSchema> {
  const res = await fetchAPI(
    `/api/youtube/stream-stats/chat-counts?videoId=${videoId}`,
    {
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch ChatCounts')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
