import { Transform } from 'class-transformer'
import { Count, VideoId } from '@domain/youtube'

export class ChatCount {
  @Transform(({ value }: { value: VideoId }) => value.get())
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
