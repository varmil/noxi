import { Transform } from 'class-transformer'
import { ChannelId, VideoCount } from '@domain/youtube'

export class VideoCountSummary {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: VideoCount }) => value.get())
  public readonly videoCount: VideoCount

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    videoCount: VideoCount
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.videoCount = args.videoCount
    this.createdAt = args.createdAt
  }
}
