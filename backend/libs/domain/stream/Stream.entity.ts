import { Exclude, Expose, Transform } from 'class-transformer'
import type { GroupName } from '@domain/group'
import { StreamStatus, StreamTimes, Metrics } from '@domain/stream'
import {
  VideoId,
  Duration,
  VideoSnippet,
  UpdatedAt,
  VideoTitle
} from '@domain/youtube'

export class Stream {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  public readonly snippet: VideoSnippet
  /**
   * Live中はP0D（０）固定
   */
  @Transform(({ value }: { value?: Duration }) => value?.get())
  public readonly duration?: Duration
  public readonly streamTimes: StreamTimes
  public readonly metrics: Metrics
  @Transform(({ value }: { value: GroupName }) => value.get())
  public readonly group: GroupName
  @Transform(({ value }: { value: UpdatedAt }) => value.get())
  public readonly updatedAt: UpdatedAt

  constructor(args: {
    videoId: VideoId
    snippet: VideoSnippet
    duration?: Duration
    streamTimes: StreamTimes
    metrics: Metrics
    group: GroupName
    updatedAt: UpdatedAt
  }) {
    this.videoId = args.videoId
    this.snippet = args.snippet
    this.duration = args.duration
    this.streamTimes = args.streamTimes
    this.metrics = args.metrics
    this.group = args.group
    this.updatedAt = args.updatedAt
  }

  @Expose()
  @Transform(({ value }: { value: StreamStatus }) => value.get())
  get status() {
    return this.streamTimes.streamStatus
  }

  /**
   * 簡易的に
   * - viewsがundefined = メンバー限定
   * - タイトルに特定の文字列がある = メンバー限定
   */
  @Expose()
  get membersOnly() {
    if (this.metrics.membersOnly()) return true
    return Stream.isMembersOnly(this.snippet.title)
  }

  @Exclude()
  static isMembersOnly(target: VideoTitle) {
    const TITLES = [
      'members only',
      'member stream',
      'membership',
      'メンバー限定',
      'メン限'
    ]
    return TITLES.some(title =>
      target.get().toLowerCase().replaceAll('-', ' ').includes(title)
    )
  }
}
