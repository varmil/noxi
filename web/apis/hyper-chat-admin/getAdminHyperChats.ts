'use server'

import {
  HyperChatsSchema,
  responseSchema
} from 'apis/hyper-chats/hyperChatSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  limit?: number
  offset?: number
}

export async function getAdminHyperChats({
  limit,
  offset
}: Params = {}): Promise<HyperChatsSchema> {
  const searchParams = new URLSearchParams({
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  const res = await fetchAPI(
    `/api/hyper-chats/admin?${searchParams.toString()}`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch admin hyper chats: ${await res.text()}`)
  }
  const data = responseSchema.parse(await res.json())
  return data.list
}

export async function getAdminHyperChatsCount(): Promise<number> {
  const res = await fetchAPI(`/api/hyper-chats/admin/count`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch admin hyper chats count: ${await res.text()}`
    )
  }
  const data = (await res.json()) as { count: number }
  return data.count
}
