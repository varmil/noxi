import { Injectable } from '@nestjs/common'
import { NextContinuation } from '@domain/next-continuation'

interface CacheEntry {
  data: NextContinuation
  expiry: number
}

const TTL_MS = 60 * 1000 // 60秒

@Injectable()
export class CacheService {
  private readonly continuationCache = new Map<string, CacheEntry>()

  /**
   * キャッシュから NextContinuation を取得
   * TTL を過ぎている場合は削除して undefined を返す
   */
  getContinuation(videoId: string): NextContinuation | undefined {
    const cached = this.continuationCache.get(videoId)
    if (!cached) {
      return undefined
    }

    if (cached.expiry > Date.now()) {
      return cached.data
    }

    // 期限切れなので削除
    this.continuationCache.delete(videoId)
    return undefined
  }

  /**
   * NextContinuation をキャッシュに保存（TTL 60秒）
   */
  setContinuation(videoId: string, data: NextContinuation): void {
    this.continuationCache.set(videoId, {
      data,
      expiry: Date.now() + TTL_MS
    })
  }
}
