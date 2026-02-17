'use server'

import { updateTag } from 'next/cache'
import { getHyperChatTag, HYPER_CHATS_LATEST } from 'apis/tags/revalidate-tags'
import { fetchAPI } from 'lib/fetchAPI'

/** ハイパーチャットを削除する */
export async function deleteHyperChat(
  hyperChatId: number,
  channelId: string
): Promise<void> {
  const res = await fetchAPI(`/api/hyper-chats/${hyperChatId}`, {
    method: 'DELETE',
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error(`Failed to delete hyper chat: ${res.status}`)
  }
  updateTag(getHyperChatTag(channelId))
  updateTag(HYPER_CHATS_LATEST)
}
