'use server'

import { updateTag } from 'next/cache'
import { getHyperChatTag, HYPER_CHATS_LATEST } from 'apis/tags/revalidate-tags'
import { fetchAPI } from 'lib/fetchAPI'

/** ハイパーチャットのモデレーション状態を設定する */
export async function setModeration(
  hyperChatId: number,
  channelId: string,
  status: 'warn' | 'ban'
): Promise<void> {
  const res = await fetchAPI(`/api/hyper-chat-moderations/${hyperChatId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error(`Failed to set moderation: ${res.status}`)
  }

  updateTag(getHyperChatTag(channelId))
  updateTag(HYPER_CHATS_LATEST)
}
