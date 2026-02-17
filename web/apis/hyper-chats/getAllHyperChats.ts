'use server'

import {
  HyperChatsSchema,
  responseSchema
} from 'apis/hyper-chats/hyperChatSchema'
import { HYPER_CHATS_LATEST } from 'apis/tags/revalidate-tags'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

type Params = {
  orderBy?: {
    field: 'createdAt' | 'tier' | 'likeCount' | 'amount'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
}

export async function getAllHyperChats({
  orderBy,
  limit,
  offset
}: Params = {}): Promise<HyperChatsSchema> {
  const searchParams = new URLSearchParams({
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  orderBy?.forEach((ob, index) => {
    searchParams.append(`orderBy[${index}][field]`, ob.field)
    searchParams.append(`orderBy[${index}][order]`, ob.order)
  })

  const res = await fetchAPI(
    `/api/hyper-chats?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [HYPER_CHATS_LATEST] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch all hyper chats: ${await res.text()}`)
  }
  const data = responseSchema.parse(await res.json())
  return data.list
}

export async function getAllHyperChatsCount(): Promise<number> {
  const res = await fetchAPI(`/api/hyper-chats/count`, {
    next: { revalidate: CACHE_1D, tags: [HYPER_CHATS_LATEST] }
  })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch all hyper chats count: ${await res.text()}`
    )
  }
  const data = (await res.json()) as { count: number }
  return data.count
}
