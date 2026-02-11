'use server'

import { revalidateTag } from 'next/cache'
import { getHyperChatTag, HYPER_TRAINS_ACTIVE } from 'apis/tags/revalidate-tags'

/** 指定されたchannelIdのハイパーチャットキャッシュを無効化する */
export async function revalidateHyperChat(channelId: string): Promise<void> {
  revalidateTag(getHyperChatTag(channelId), 'max')
  revalidateTag(HYPER_TRAINS_ACTIVE, 'max')
}
