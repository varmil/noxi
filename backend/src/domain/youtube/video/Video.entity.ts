import { Expose, Transform } from 'class-transformer'
import { Duration } from '@domain/youtube/video/Duration'
import { LiveStreamingDetails } from '@domain/youtube/video/LiveStreamingDetails'
import { Snippet } from '@domain/youtube/video/Snippet'
import { Statistics } from '@domain/youtube/video/Statistics'

export class Video {
  public readonly id: string
  public readonly snippet: Snippet
  @Transform(({ value }: { value: Duration }) => value.get())
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

  @Expose()
  isShort(): boolean {
    return this.duration.isShort()
  }

  /**
   * The time that the broadcast actually started.
   * This value will not be available until the broadcast begins.
   */
  get liveActualStartTime() {
    return this.liveStreamingDetails?.actualStartTime
  }

  @Expose()
  get engagementCount() {
    return this.statistics.engagementCount()
  }

  @Expose()
  get engagementRate() {
    return this.statistics.engagementRate()
  }
}
