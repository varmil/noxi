import { Transform } from 'class-transformer'
import { Count } from './Count.vo'
import { DurationHours } from './DurationHours.vo'

/** 日別のライブ配信件数と総配信時間 */
export class StreamVolumeTrend {
  public readonly date: Date

  @Transform(({ value }: { value: Count }) => value.get())
  public readonly streamCount: Count

  @Transform(({ value }: { value: DurationHours }) => value.get())
  public readonly totalDurationHours: DurationHours

  constructor(args: {
    date: Date
    streamCount: Count
    totalDurationHours: DurationHours
  }) {
    this.date = args.date
    this.streamCount = args.streamCount
    this.totalDurationHours = args.totalDurationHours
  }
}
