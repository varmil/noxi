import { Exclude, Expose, Transform } from 'class-transformer'
import {
  Duration,
  LiveStreamingDetails,
  IsPaidPromotion,
  Snippet,
  Statistics
} from '@domain/youtube/video'

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
  @Exclude()
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

  /**
   * @Beta search '#PR', '#pr' in title, description
   */
  @Expose()
  get isPaidPromotion(): IsPaidPromotion | undefined {
    const { title, description } = this.snippet
    const searchStrs = ['#PR', '#pr']
    const isPaidPromotion = [title, description].some(str => {
      return searchStrs.some(e => str.includes(e))
    })

    if (isPaidPromotion) {
      console.log('PP: ', title, description)
    }
    return new IsPaidPromotion(isPaidPromotion)
  }
}
