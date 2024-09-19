import { Exclude, Transform } from 'class-transformer'
import { VideoId } from '@domain/youtube'
import { Count } from '@domain/youtube/stream-stats'

export class ChatCount {
  @Exclude()
  public readonly videoId: VideoId
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly all: Count
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly member: Count
  public readonly createdAt: Date

  constructor(args: {
    videoId: VideoId
    all: Count
    member: Count
    createdAt: Date
  }) {
    this.videoId = args.videoId
    this.all = args.all
    this.member = args.member
    this.createdAt = args.createdAt
  }
}
