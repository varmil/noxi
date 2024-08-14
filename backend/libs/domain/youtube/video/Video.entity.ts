import { Exclude, Expose, Transform } from 'class-transformer'
import {
  Duration,
  LiveStreamingDetails,
  IsPaidPromotion,
  Snippet,
  Statistics,
  VideoId
} from '@domain/youtube/video'

export class Video {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly id: VideoId
  public readonly snippet: Snippet
  @Transform(({ value }: { value: Duration }) => value.get())
  public readonly duration: Duration
  public readonly statistics: Statistics
  public readonly liveStreamingDetails?: LiveStreamingDetails

  constructor(args: {
    id: VideoId
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
  get isShort(): boolean {
    return this.duration.isShort()
  }

  @Exclude()
  get isStream(): boolean {
    return this.liveStreamingDetails !== undefined
  }

  /**
   * 配信の開始が予定されている時刻。値は ISO 8601 形式で指定します。
   */
  @Expose()
  get streamScheduledStartTime() {
    return this.liveStreamingDetails?.streamTimes.scheduledStartTime
  }

  /**
   * The time that the broadcast actually started.
   * This value will not be available until the broadcast begins.
   */
  @Exclude()
  get streamActualStartTime() {
    return this.liveStreamingDetails?.streamTimes.actualStartTime
  }

  /**
   * @return undefined if this video is not stream
   */
  @Expose()
  get streamStatus() {
    return this.liveStreamingDetails?.streamTimes.streamStatus
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
