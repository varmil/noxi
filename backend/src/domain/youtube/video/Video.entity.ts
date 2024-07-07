import { Duration } from '@domain/youtube/video/Duration'
import { LiveStreamingDetails } from '@domain/youtube/video/LiveStreamingDetails'
import { Snippet } from '@domain/youtube/video/Snippet'
import { Statistics } from '@domain/youtube/video/Statistics'

export class Video {
  public readonly id: string
  public readonly snippet: Snippet
  public readonly duration: Duration
  public readonly statistics: Statistics
  public readonly liveStreamingDetails?: LiveStreamingDetails

  constructor(args: {
    id: string
    snippet: Snippet
    duration: Duration
    statistics: Statistics
    liveStreamingDetails?: LiveStreamingDetails
  }) {
    this.id = args.id
    this.snippet = args.snippet
    this.duration = args.duration
    this.statistics = args.statistics
    this.liveStreamingDetails = args.liveStreamingDetails
  }

  isShort(): boolean {
    return this.duration.isShort()
  }

  engagementCount() {
    return this.statistics.engagementCount()
  }

  engagementRate() {
    return this.statistics.engagementRate()
  }
}
