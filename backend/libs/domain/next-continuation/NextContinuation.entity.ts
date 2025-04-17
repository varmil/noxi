import { Exclude } from 'class-transformer'
import { PublishedAt, VideoId } from '@domain/youtube'
import { Continuation } from '@domain/youtubei/live-chat/Continuation.vo'

export class NextContinuation {
  @Exclude()
  public readonly videoId: VideoId
  @Exclude()
  public readonly nextContinuation?: Continuation
  @Exclude()
  public readonly latestPublishedAt: PublishedAt
  @Exclude()
  public readonly createdAt: Date

  constructor(args: {
    videoId: VideoId
    nextContinuation?: Continuation
    latestPublishedAt: PublishedAt
    createdAt: Date
  }) {
    this.videoId = args.videoId
    this.nextContinuation = args.nextContinuation
    this.latestPublishedAt = args.latestPublishedAt
    this.createdAt = args.createdAt
  }
}
