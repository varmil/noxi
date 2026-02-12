import {
  HyperChatsSchema,
  responseSchema
} from 'apis/hyper-chats/hyperChatSchema'
import { HYPER_CHATS_LATEST } from 'apis/tags/revalidate-tags'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

export async function getLatestHyperChats(
  limit = 20
): Promise<HyperChatsSchema> {
  const res = await fetchAPI(`/api/hyper-chats/latest?limit=${limit}`, {
    next: { revalidate: CACHE_1D, tags: [HYPER_CHATS_LATEST] }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch latest hyper chats: ${await res.text()}`)
  }
  const data = responseSchema.parse(await res.json())
  return data.list
}
