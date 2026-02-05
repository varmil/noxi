'use server'

import { fetchAPI } from 'lib/fetchAPI'

export async function getLikedHyperChatIds(
  ids: number[]
): Promise<Set<number>> {
  if (ids.length === 0) {
    return new Set()
  }

  const res = await fetchAPI(
    `/api/hyper-chats/liked-ids?${ids.map(id => `ids=${id}`).join('&')}`,
    {
      method: 'GET',
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    // 認証エラーの場合は空のSetを返す
    if (res.status === 401) {
      return new Set()
    }
    const errorText = await res.text()
    throw new Error(`Failed to get liked ids: ${errorText}`)
  }

  const data = (await res.json()) as { likedIds: number[] }
  return new Set(data.likedIds)
}
