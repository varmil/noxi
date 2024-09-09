import { Expose, Transform } from 'class-transformer'
import { StreamStatus } from '@domain/stream'
import {
  VideoId,
  Duration,
  Snippet,
  StreamTimes,
  Metrics
} from '@domain/youtube'

export class Stream {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  public readonly snippet: Snippet
  /**
   * Live中はP0D（０）固定
   */
  @Transform(({ value }: { value: Duration }) => value.get())
  public readonly duration?: Duration
  public readonly streamTimes: StreamTimes
  public readonly metrics: Metrics

  constructor(args: {
    videoId: VideoId
    snippet: Snippet
    duration?: Duration
    streamTimes: StreamTimes
    metrics: Metrics
  }) {
    this.videoId = args.videoId
    this.snippet = args.snippet
    this.duration = args.duration
    this.streamTimes = args.streamTimes
    this.metrics = args.metrics
  }

  @Expose()
  @Transform(({ value }: { value: StreamStatus }) => value.get())
  get status() {
    return this.streamTimes.streamStatus
  }
}
