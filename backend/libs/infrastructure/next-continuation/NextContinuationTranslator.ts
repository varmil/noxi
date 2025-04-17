import { NextContinuation } from '@domain/next-continuation'
import { PublishedAt, VideoId } from '@domain/youtube'
import { Continuation } from '@domain/youtubei/live-chat'
import type { NextContinuation as NextContinuationRow } from '@prisma/generated/client'

export class NextContinuationTranslator {
  constructor(private readonly row: NextContinuationRow) {}

  translate(): NextContinuation {
    const row = this.row

    return new NextContinuation({
      videoId: new VideoId(row.videoId),
      nextContinuation: row.nextContinuation
        ? new Continuation(row.nextContinuation)
        : undefined,
      latestPublishedAt: new PublishedAt(row.latestPublishedAt),
      createdAt: row.createdAt
    })
  }
}
