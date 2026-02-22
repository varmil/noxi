'use server'

import { updateTag } from 'next/cache'
import { getHyperChatTag, HYPER_CHATS_LATEST } from 'apis/tags/revalidate-tags'
import { fetchAPI } from 'lib/fetchAPI'

/** ハイパーチャットのモデレーション状態を解除する */
export async function removeModeration(
  hyperChatId: number,
  channelId: string
): Promise<void> {
  const res = await fetchAPI(`/api/hyper-chat-moderations/${hyperChatId}`, {
    method: 'DELETE',
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error(`Failed to remove moderation: ${res.status}`)
  }
  updateTag(getHyperChatTag(channelId))
  updateTag(HYPER_CHATS_LATEST)
}
