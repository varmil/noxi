import { Transform } from 'class-transformer'
import { ChannelId, ViewCount } from '@domain/youtube'

export class ViewCountSummary {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: ViewCount }) => value.toString())
  public readonly viewCount: ViewCount

  public readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    viewCount: ViewCount
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.viewCount = args.viewCount
    this.createdAt = args.createdAt
  }
}
