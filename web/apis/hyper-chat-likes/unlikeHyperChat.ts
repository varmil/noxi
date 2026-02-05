'use server'

import { revalidateTag } from 'next/cache'
import { getHyperChatTag } from 'apis/tags/revalidate-tags'
import { fetchAPI } from 'lib/fetchAPI'

export async function unlikeHyperChat(
  hyperChatId: number,
  channelId: string
): Promise<void> {
  const res = await fetchAPI(`/api/hyper-chats/${hyperChatId}/like`, {
    method: 'DELETE',
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to unlike: ${errorText}`)
  }

  revalidateTag(getHyperChatTag(channelId), 'max')
}
