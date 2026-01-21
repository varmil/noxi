import { Injectable } from '@nestjs/common'
import { Channel } from '@domain/youtube/channel/Channel.entity'

interface CacheEntry {
  data: Channel
  expiry: number
}

const TTL_MS = 24 * 60 * 60 * 1000 // 1日

@Injectable()
export class ChannelCacheService {
  private readonly cache = new Map<string, CacheEntry>()

  /**
   * キャッシュから Channel を取得
   * TTL を過ぎている場合は削除して undefined を返す
   */
  get(channelId: string): Channel | undefined {
    const cached = this.cache.get(channelId)
    if (!cached) {
      return undefined
    }

    if (cached.expiry > Date.now()) {
      return cached.data
    }

    // 期限切れなので削除
    this.cache.delete(channelId)
    return undefined
  }

  /**
   * Channel をキャッシュに保存
   */
  set(channelId: string, data: Channel): void {
    this.cache.set(channelId, {
      data,
      expiry: Date.now() + TTL_MS
    })
  }
}
