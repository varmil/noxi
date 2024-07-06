export class ChannelStatistics {
  public readonly viewCount: string
  public readonly subscriberCount: string
  public readonly videoCount: string

  constructor(args: {
    viewCount?: string
    subscriberCount?: string
    videoCount?: string
  }) {
    this.viewCount = args.viewCount ?? '0'
    this.subscriberCount = args.subscriberCount ?? '0'
    this.videoCount = args.videoCount ?? '0'
  }

  // engagementCount() {
  //   return Number(this.subscriberCount) + Number(this.videoCount)
  // }

  // engagementRate() {
  //   return (this.engagementCount() / Number(this.viewCount)) * 100
  // }
}
