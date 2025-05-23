import { Exclude, Expose, Transform } from 'class-transformer'
import {
  Duration,
  LiveStreamingDetails,
  IsPaidPromotion,
  VideoSnippet,
  Statistics,
  VideoId
} from '@domain/youtube/video'

export class Video {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly id: VideoId
  public readonly snippet: VideoSnippet
  @Exclude()
  public readonly duration: Duration
  public readonly statistics: Statistics
  public readonly liveStreamingDetails?: LiveStreamingDetails

  constructor(args: {
    id: VideoId
    snippet: VideoSnippet
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
  get membersOnly(): boolean {
    return this.statistics.membersOnly()
  }

  @Expose()
  get isShort(): boolean {
    return this.duration.isShort()
  }

  /**
   * 配信の開始が予定されている時刻。値は ISO 8601 形式で指定します。
   */
  @Exclude()
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
  @Exclude()
  get streamStatus() {
    return this.liveStreamingDetails?.streamTimes.streamStatus
  }

  @Exclude()
  get engagementCount() {
    return this.statistics.engagementCount
  }

  @Exclude()
  get engagementRate() {
    return this.statistics.engagementRate
  }

  /**
   * @Beta search '#PR', '#pr' in title,
   * match whole WORD
   */
  @Expose()
  @Transform(({ value }: { value: IsPaidPromotion }) => value.get())
  get isPaidPromotion(): IsPaidPromotion | undefined {
    const { title } = this.snippet
    const searchStrs = ['#PR']
    const isPaidPromotion = [title.get()].some(str =>
      searchStrs.some(e => {
        return new RegExp(String.raw`${e}\b`, 'i').test(str)
      })
    )

    return new IsPaidPromotion(isPaidPromotion)
  }
}
