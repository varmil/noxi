import { ChatCount, Count } from '@domain/stream-stats'
import { PublishedAt, VideoId } from '@domain/youtube'
import { Continuation } from '@domain/youtubei/live-chat'
import type { YoutubeStreamChatCount as PrismaChatCount } from '@prisma/generated/client'

export class ChatCountTranslator {
  constructor(private readonly row: PrismaChatCount) {}

  /**
   * Translate PrismaChatCount to Stream
   * @returns
   */
  translate(): ChatCount {
    const row = this.row

    return new ChatCount({
      videoId: new VideoId(row.videoId),
      all: new Count(row.all),
      member: new Count(row.member),
      nextContinuation: row.nextContinuation
        ? new Continuation(row.nextContinuation)
        : undefined,
      latestPublishedAt: new PublishedAt(row.latestPublishedAt),
      createdAt: row.createdAt
    })
  }
}
