import { ChatCount } from '@domain/stream-stats'
import { PublishedAt, VideoId } from '@domain/youtube'
import { Continuation } from '@domain/youtubei/live-chat'
import type { NextContinuation } from '@prisma/generated/client'

export class ChatCountTranslator {
  constructor(private readonly row: NextContinuation) {}

  translate(): ChatCount {
    const row = this.row

    return new ChatCount({
      videoId: new VideoId(row.videoId),
      nextContinuation: row.nextContinuation
        ? new Continuation(row.nextContinuation)
        : undefined,
      latestPublishedAt: new PublishedAt(row.latestPublishedAt),
      createdAt: row.createdAt
    })
  }
}
