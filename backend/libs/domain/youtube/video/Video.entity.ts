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

  @Exclude()
  isLive(): boolean {
    return this.liveActualStartTime !== undefined
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
  get status() {
    // return if detail.actual_end_time.is_some() {
    //     StreamStatus::Ended
    // } else if detail.actual_start_time.is_some() {
    //     StreamStatus::Live
    // } else {
    //     StreamStatus::Scheduled
    // }
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
   * match whole WORD
   */
  @Expose()
  @Transform(({ value }: { value: IsPaidPromotion }) => value.get())
  get isPaidPromotion(): IsPaidPromotion | undefined {
    const { title, description } = this.snippet
    const searchStrs = ['#PR']
    const isPaidPromotion = [title, description].some(str =>
      searchStrs.some(e => {
        return new RegExp(String.raw`${e}\b`, 'i').test(str)
      })
    )

    return new IsPaidPromotion(isPaidPromotion)
  }
}
