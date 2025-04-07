import {
  responseSchema,
  SuperChatsSchema
} from 'apis/youtube/schema/superChatSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoId?: string
  channelId?: string
  userCommentNotNull?: boolean
  createdBefore?: Date
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
  createdBefore,
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
    ...(createdBefore && { createdBefore: createdBefore.toISOString() }),
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
  const res = await fetchAPI(`/api/supers/chats?${searchParams.toString()}`)
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
    `/api/supers/chats/count?${searchParams.toString()}`
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
