import { Transform } from 'class-transformer'
import { DayOfWeek } from '@domain/lib/datetime'
import { Count } from '@domain/stream-volume-trend'
import { Hour } from './Hour.vo'

/** 時刻×曜日別の配信件数 */
export class GoldenTime {
  @Transform(({ value }: { value: Hour }) => value.get())
  public readonly hour: Hour

  @Transform(({ value }: { value: DayOfWeek }) => value.get())
  public readonly dayOfWeek: DayOfWeek

  @Transform(({ value }: { value: Count }) => value.get())
  public readonly streamCount: Count

  constructor(args: { hour: Hour; dayOfWeek: DayOfWeek; streamCount: Count }) {
    this.hour = args.hour
    this.dayOfWeek = args.dayOfWeek
    this.streamCount = args.streamCount
  }
}
