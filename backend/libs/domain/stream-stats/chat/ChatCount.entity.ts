import { Exclude, Transform } from 'class-transformer'
import { NextPageToken, PublishedAt, VideoId } from '@domain/youtube'
import { Count } from '@domain/stream-stats'

export class ChatCount {
  @Exclude()
  public readonly videoId: VideoId
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly all: Count
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly member: Count
  @Exclude()
  public readonly nextPageToken?: NextPageToken
  @Exclude()
  public readonly latestPublishedAt: PublishedAt

  public readonly createdAt: Date

  constructor(args: {
    videoId: VideoId
    all: Count
    member: Count
    nextPageToken?: NextPageToken
    latestPublishedAt: PublishedAt
    createdAt: Date
  }) {
    this.videoId = args.videoId
    this.all = args.all
    this.member = args.member
    this.nextPageToken = args.nextPageToken
    this.latestPublishedAt = args.latestPublishedAt
    this.createdAt = args.createdAt
  }
}
