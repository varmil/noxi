'use server'

import {
  HyperChatsSchema,
  responseSchema
} from 'apis/hyper-chats/hyperChatSchema'
import { getHyperChatTag } from 'apis/tags/revalidate-tags'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId: string
  group?: string
  gender?: 'male' | 'female' | 'nonbinary'
  createdAfter?: Date
  orderBy?: {
    field: 'createdAt' | 'tier' | 'likeCount' | 'amount'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
}

const createSearchParams = ({
  group,
  gender,
  createdAfter,
  orderBy,
  limit,
  offset
}: Omit<Params, 'channelId'>) => {
  const searchParams = new URLSearchParams({
    ...(group && { group }),
    ...(gender && { gender }),
    ...(createdAfter && { createdAfter: createdAfter.toISOString() }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  return searchParams
}

export async function getHyperChats({
  channelId,
  ...params
}: Params): Promise<HyperChatsSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/hyper-chats/channels/${channelId}?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch hyper chats: ${await res.text()}`)
  }
  const data = responseSchema.parse(await res.json())
  return data.list
}

export async function getHyperChatsCount(
  channelId: string,
  params?: Omit<Params, 'channelId' | 'limit' | 'offset' | 'orderBy'>
): Promise<number> {
  const searchParams = createSearchParams(params ?? {})
  const res = await fetchAPI(
    `/api/hyper-chats/channels/${channelId}/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch hyper chats count: ${await res.text()}`)
  }
  const data = (await res.json()) as { count: number }
  return data.count
}

export async function getHyperChatsSumAmount(
  channelId: string,
  params?: Omit<Params, 'channelId' | 'limit' | 'offset' | 'orderBy'>
): Promise<number> {
  const searchParams = createSearchParams(params ?? {})
  const res = await fetchAPI(
    `/api/hyper-chats/channels/${channelId}/sum-amount?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(
      `Failed to fetch hyper chats sum amount: ${await res.text()}`
    )
  }
  const data = (await res.json()) as { sumAmount: number }
  return data.sumAmount
}

export async function getHyperChatsSumLikeCount(
  channelId: string,
  params?: Omit<Params, 'channelId' | 'limit' | 'offset' | 'orderBy'>
): Promise<number> {
  const searchParams = createSearchParams(params ?? {})
  const res = await fetchAPI(
    `/api/hyper-chats/channels/${channelId}/sum-like-count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(
      `Failed to fetch hyper chats sum like count: ${await res.text()}`
    )
  }
  const data = (await res.json()) as { sumLikeCount: number }
  return data.sumLikeCount
}
