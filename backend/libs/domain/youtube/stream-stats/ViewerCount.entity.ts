import { Transform } from 'class-transformer'
import { Count, VideoId } from '@domain/youtube'

export class ViewerCount {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly count: Count
  public readonly cratedAt: Date

  constructor(args: { videoId: VideoId; count: Count; cratedAt: Date }) {
    this.videoId = args.videoId
    this.count = args.count
    this.cratedAt = args.cratedAt
  }
}
