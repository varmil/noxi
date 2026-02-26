import { z } from 'zod'
import { schema, HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { fetchAPI } from 'lib/fetchAPI'

// バックエンドはCollection形式（{ list: [...] }）で返却する
const listSchema = z.object({ list: z.array(schema) })
const recentHyperChatsResponseSchema = z.record(z.string(), listSchema)

export type RecentHyperChatsResponse = Record<string, HyperChatSchema[]>

/**
 * 複数チャンネルの最新HyperChatを取得（過去24時間）
 * channelIdをキーとしたオブジェクトを返却
 */
export async function getRecentHyperChats(
  channelIds: string[]
): Promise<RecentHyperChatsResponse> {
  if (channelIds.length === 0) {
    return {}
  }

  const searchParams = new URLSearchParams()
  channelIds.forEach(id => {
    searchParams.append('channelIds[]', id)
  })

  // TODO: cacheしてもよいが、ChannelIdごとにHyperChat更新された場合revalidateが難しい
  const res = await fetchAPI(`/api/hyper-chats/recent?${searchParams}`, {
    // next: { revalidate: CACHE_10M }
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch recent hyper chats: ${await res.text()}`)
  }

  const raw = recentHyperChatsResponseSchema.parse(await res.json())

  // Collection形式から配列を取り出して返却
  const result: RecentHyperChatsResponse = {}
  for (const [channelId, collection] of Object.entries(raw)) {
    result[channelId] = collection.list
  }
  return result
}
