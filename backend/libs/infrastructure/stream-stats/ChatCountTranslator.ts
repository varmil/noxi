import { NextPageToken, PublishedAt, VideoId } from '@domain/youtube'
import { ChatCount, Count } from '@domain/stream-stats'
import type { YoutubeStreamChatCount as PrismaChatCount } from '@prisma/client'

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
      nextPageToken: row.nextPageToken
        ? new NextPageToken(row.nextPageToken)
        : undefined,
      latestPublishedAt: new PublishedAt(row.latestPublishedAt),
      createdAt: row.createdAt
    })
  }
}
