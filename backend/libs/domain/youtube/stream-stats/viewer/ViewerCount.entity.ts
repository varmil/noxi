import { Exclude, Transform } from 'class-transformer'
import { Count, VideoId } from '@domain/youtube'

export class ViewerCount {
  @Exclude()
  public readonly videoId: VideoId
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly count: Count
  public readonly createdAt: Date

  constructor(args: { videoId: VideoId; count: Count; createdAt: Date }) {
    this.videoId = args.videoId
    this.count = args.count
    this.createdAt = args.createdAt
  }
}
