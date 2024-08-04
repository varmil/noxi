export class ChannelStatistics {
  public readonly viewCount: number
  public readonly subscriberCount: number
  public readonly videoCount: number

  constructor(args: {
    viewCount: number
    subscriberCount: number
    videoCount: number
  }) {
    this.viewCount = args.viewCount
    this.subscriberCount = args.subscriberCount
    this.videoCount = args.videoCount
  }
}
