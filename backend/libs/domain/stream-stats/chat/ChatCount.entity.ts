import { Exclude, Transform } from 'class-transformer'
import { Count } from '@domain/stream-stats'
import { PublishedAt, VideoId } from '@domain/youtube'
import { Continuation } from '@domain/youtubei/live-chat/Continuation.vo'

export class ChatCount {
  @Exclude()
  public readonly videoId: VideoId
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly all: Count
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly member: Count

  @Exclude()
  public readonly nextContinuation?: Continuation
  @Exclude()
  public readonly latestPublishedAt: PublishedAt

  public readonly createdAt: Date

  constructor(args: {
    videoId: VideoId
    all: Count
    member: Count
    nextContinuation?: Continuation
    latestPublishedAt: PublishedAt
    createdAt: Date
  }) {
    this.videoId = args.videoId
    this.all = args.all
    this.member = args.member
    this.nextContinuation = args.nextContinuation
    this.latestPublishedAt = args.latestPublishedAt
    this.createdAt = args.createdAt
  }
}
