import {
  responseSchema,
  SuperChatsSchema
} from 'apis/youtube/schema/superChatSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoId?: string
  channelId?: string
  createdBefore?: Date
  createdAfter?: Date
  orderBy: {
    field: 'commentLength' | 'amountMicros' | 'currency' | 'createdAt'
    order: 'asc' | 'desc'
  }[]
  limit: number
}

export async function getSuperChats({
  videoId,
  channelId,
  createdBefore,
  createdAfter,
  orderBy,
  limit
}: Params): Promise<SuperChatsSchema> {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    ...(videoId && { videoId }),
    ...(channelId && { channelId }),
    ...(createdBefore && { createdBefore: createdBefore.toISOString() }),
    ...(createdAfter && { createdAfter: createdAfter.toISOString() })
  })

  orderBy.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(`/api/supers/chats?${searchParams.toString()}`, {
    // next: { revalidate: 120 },
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
