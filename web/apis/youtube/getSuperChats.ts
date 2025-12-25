import {
  responseSchema,
  SuperChatsSchema
} from 'apis/youtube/schema/superChatSchema'
import { CACHE_1W, fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoId?: string
  channelId?: string
  userCommentNotNull?: boolean
  createdAfter?: Date
  orderBy: {
    field: 'commentLength' | 'amountMicros' | 'currency' | 'createdAt'
    order: 'asc' | 'desc'
  }[]
  limit: number
}

const createSearchParams = ({
  videoId,
  channelId,
  userCommentNotNull,
  createdAfter,
  orderBy,
  limit
}: Partial<Params>) => {
  const searchParams = new URLSearchParams({
    ...(limit !== undefined && { limit: String(limit) }),
    ...(videoId && { videoId }),
    ...(channelId && { channelId }),
    ...(userCommentNotNull && {
      userCommentNotNull: String(userCommentNotNull)
    }),
    ...(createdAfter && { createdAfter: createdAfter.toISOString() })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  return searchParams
}

export async function getSuperChats(params: Params): Promise<SuperChatsSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(`/api/supers/chats?${searchParams.toString()}`, {
    next: { revalidate: CACHE_1W }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = responseSchema.parse(await res.json())
  return data.list
}

export async function getSuperChatsCount(
  params: Omit<Params, 'limit' | 'offset' | 'orderBy'>
): Promise<number> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/supers/chats/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1W } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
