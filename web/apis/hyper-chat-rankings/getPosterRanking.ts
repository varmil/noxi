'use server'

import {
  AnonymousPosterSchema,
  anonymousPosterSchema,
  PosterSchema,
  responseSchema
} from 'apis/hyper-chat-rankings/posterRankingSchema'
import { getHyperChatTag } from 'apis/tags/revalidate-tags'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

export async function getPosterRanking(
  channelId: string,
  params?: { limit?: number; offset?: number }
): Promise<PosterSchema[]> {
  const searchParams = new URLSearchParams({
    ...(params?.limit !== undefined && { limit: String(params.limit) }),
    ...(params?.offset !== undefined && { offset: String(params.offset) })
  })

  const res = await fetchAPI(
    `/api/hyper-chat-rankings/channels/${channelId}/posters?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch poster ranking: ${await res.text()}`)
  }
  return responseSchema.parse(await res.json()).list
}

export async function getPosterRankingCount(
  channelId: string
): Promise<number> {
  const res = await fetchAPI(
    `/api/hyper-chat-rankings/channels/${channelId}/posters/count`,
    { next: { revalidate: CACHE_1D, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch poster ranking count: ${await res.text()}`)
  }
  const data = (await res.json()) as { count: number }
  return data.count
}

export async function getAnonymousPoster(
  channelId: string
): Promise<AnonymousPosterSchema | null> {
  const res = await fetchAPI(
    `/api/hyper-chat-rankings/channels/${channelId}/anonymous`,
    { next: { revalidate: CACHE_1D, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch anonymous poster: ${await res.text()}`)
  }
  const text = await res.text()
  if (!text) return null
  return anonymousPosterSchema.parse(JSON.parse(text))
}
