'use server'

import {
  HyperTrainSchema,
  hyperTrainSchema,
  hyperTrainsResponseSchema
} from 'apis/hyper-trains/hyperTrainSchema'
import { getHyperChatTag, HYPER_TRAINS_ACTIVE } from 'apis/tags/revalidate-tags'
import { CACHE_1M, fetchAPI } from 'lib/fetchAPI'

export async function getActiveHyperTrains(
  group?: string
): Promise<HyperTrainSchema[]> {
  const searchParams = new URLSearchParams(group ? { group } : {})
  const res = await fetchAPI(
    `/api/hyper-trains/active?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1M, tags: [HYPER_TRAINS_ACTIVE] } }
  )
  if (!res.ok) {
    throw new Error(
      `[getActiveHyperTrains] Failed to fetch data: ${await res.text()}`
    )
  }

  const text = await res.text()
  if (!text) return []
  const data = hyperTrainsResponseSchema.parse(JSON.parse(text))
  return data.list
}

export async function getActiveHyperTrainByChannel(
  channelId: string
): Promise<HyperTrainSchema | null> {
  const res = await fetchAPI(`/api/hyper-trains/channels/${channelId}/active`, {
    next: { revalidate: CACHE_1M, tags: [getHyperChatTag(channelId)] }
  })
  if (!res.ok) {
    throw new Error(
      `[getActiveHyperTrainByChannel] Failed to fetch data: ${await res.text()}`
    )
  }

  const text = await res.text()
  if (!text) return null
  return hyperTrainSchema.parse(JSON.parse(text))
}

export async function getBestHyperTrain(
  channelId: string
): Promise<HyperTrainSchema | null> {
  const res = await fetchAPI(
    `/api/hyper-trains/channels/${channelId}/best`,
    { cache: 'no-store' } // 「終了」は自然発生するのでrevalidateが難しい。キャッシュ無効
  )
  if (!res.ok) {
    throw new Error(
      `[getBestHyperTrain] Failed to fetch data: ${await res.text()}`
    )
  }

  const text = await res.text()
  if (!text) return null
  return hyperTrainSchema.parse(JSON.parse(text))
}

export async function getHyperTrainIncomingStatus(
  channelId: string
): Promise<{ uniqueUserCount: number; cooldownEndsAt: string | null }> {
  const res = await fetchAPI(
    `/api/hyper-trains/channels/${channelId}/incoming`,
    { next: { revalidate: CACHE_1M, tags: [getHyperChatTag(channelId)] } }
  )
  if (!res.ok) {
    throw new Error(
      `[getHyperTrainIncomingStatus] Failed to fetch data: ${await res.text()}`
    )
  }

  return (await res.json()) as {
    uniqueUserCount: number
    cooldownEndsAt: string | null
  }
}
