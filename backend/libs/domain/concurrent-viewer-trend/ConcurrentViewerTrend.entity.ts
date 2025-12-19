import { Transform } from 'class-transformer'
import { MedianViewers } from './MedianViewers.vo'

/** 日別の同時視聴者数トレンド */
export class ConcurrentViewerTrend {
  public readonly date: Date

  @Transform(({ value }: { value: MedianViewers }) => value.get())
  public readonly medianViewers: MedianViewers

  constructor(args: { date: Date; medianViewers: MedianViewers }) {
    this.date = args.date
    this.medianViewers = args.medianViewers
  }
}
