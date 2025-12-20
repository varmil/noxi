import { Transform } from 'class-transformer'
import { MedianViewers } from '@domain/concurrent-viewer-trend'
import { Count } from '@domain/stream-volume-trend'
import { DayOfWeek } from './DayOfWeek.vo'

/** 曜日別の配信件数と同時接続数中央値 */
export class DayOfWeekDistribution {
  @Transform(({ value }: { value: DayOfWeek }) => value.get())
  public readonly dayOfWeek: DayOfWeek

  @Transform(({ value }: { value: Count }) => value.get())
  public readonly streamCount: Count

  @Transform(({ value }: { value: MedianViewers }) => value.get())
  public readonly medianViewers: MedianViewers

  constructor(args: {
    dayOfWeek: DayOfWeek
    streamCount: Count
    medianViewers: MedianViewers
  }) {
    this.dayOfWeek = args.dayOfWeek
    this.streamCount = args.streamCount
    this.medianViewers = args.medianViewers
  }
}
