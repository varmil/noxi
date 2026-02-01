'use server'

import { revalidateTag } from 'next/cache'
import { getHyperChatTag } from 'apis/tags/revalidate-tags'

/** 指定されたchannelIdのハイパーチャットキャッシュを無効化する */
export async function revalidateHyperChat(channelId: string): Promise<void> {
  revalidateTag(getHyperChatTag(channelId), 'max')
}
