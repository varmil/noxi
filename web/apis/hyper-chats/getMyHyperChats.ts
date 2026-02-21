'use server'

import {
  HyperChatsSchema,
  responseSchema
} from 'apis/hyper-chats/hyperChatSchema'
import { TierValue } from 'apis/hyper-chats/hyperChatSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  tier?: TierValue
  limit?: number
  offset?: number
}

export async function getMyHyperChats({
  tier,
  limit,
  offset
}: Params = {}): Promise<HyperChatsSchema> {
  const searchParams = new URLSearchParams({
    ...(tier && { tier }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  const res = await fetchAPI(`/api/hyper-chats/me?${searchParams.toString()}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch my hyper chats: ${await res.text()}`)
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
