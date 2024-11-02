import { Transform } from 'class-transformer'

export class ChannelStatistics {
  @Transform(({ value }: { value: bigint }) => value.toString())
  public readonly viewCount: bigint
  public readonly subscriberCount: number
  public readonly videoCount: number

  constructor(args: {
    viewCount: bigint
    subscriberCount: number
    videoCount: number
  }) {
    this.viewCount = args.viewCount
    this.subscriberCount = args.subscriberCount
    this.videoCount = args.videoCount
  }
}
