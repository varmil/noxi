'use server'

import { updateTag } from 'next/cache'
import { getHyperChatTag, HYPER_CHATS_LATEST } from 'apis/tags/revalidate-tags'
import { fetchAPI } from 'lib/fetchAPI'

export async function likeHyperChat(
  hyperChatId: number,
  channelId: string
): Promise<void> {
  const res = await fetchAPI(`/api/hyper-chats/${hyperChatId}/like`, {
    method: 'POST',
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to like: ${errorText}`)
  }

  updateTag(getHyperChatTag(channelId))
  updateTag(HYPER_CHATS_LATEST)
}
