'use server'

import { updateTag } from 'next/cache'
import {
  getHyperChatTag,
  HYPER_CHATS_LATEST,
  HYPER_TRAINS_ACTIVE
} from 'apis/tags/revalidate-tags'

/** 指定されたchannelIdのハイパーチャットキャッシュを無効化する */
export async function revalidateHyperChat(channelId: string): Promise<void> {
  updateTag(getHyperChatTag(channelId))
  updateTag(HYPER_TRAINS_ACTIVE)
  updateTag(HYPER_CHATS_LATEST)
}
