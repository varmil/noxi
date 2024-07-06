import { LiveStreamingDetails } from '@domain/youtube/video/LiveStreamingDetails'
import { Snippet } from '@domain/youtube/video/Snippet'
import { Statistics } from '@domain/youtube/video/Statistics'

// TODO:  public readonly contentDetails: ContentDetails  {duration}
export class Video {
  public readonly id: string
  public readonly snippet: Snippet
  public readonly statistics: Statistics
  public readonly liveStreamingDetails?: LiveStreamingDetails

  constructor(args: {
    id: string
    snippet: Snippet
    statistics: Statistics
    liveStreamingDetails?: LiveStreamingDetails
  }) {
    this.id = args.id
    this.snippet = args.snippet
    this.statistics = args.statistics
    this.liveStreamingDetails = args.liveStreamingDetails
  }

  isShort(): boolean {
    return true
  }

  engagementCount() {
    return this.statistics.engagementCount()
  }

  engagementRate() {
    return this.statistics.engagementRate()
  }
}
