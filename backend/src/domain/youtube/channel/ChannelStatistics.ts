export class ChannelStatistics {
  public readonly viewCount: number
  public readonly subscriberCount: number
  public readonly videoCount: number

  constructor(args: {
    viewCount?: number
    subscriberCount?: number
    videoCount?: number
  }) {
    this.viewCount = args.viewCount ?? 0
    this.subscriberCount = args.subscriberCount ?? 0
    this.videoCount = args.videoCount ?? 0
  }
}
