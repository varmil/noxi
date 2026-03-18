import { Transform, Type } from 'class-transformer'
import { SubscriberRankPoint } from './SubscriberRankPoint.entity'
import { Trend } from './Trend.vo'

export class SubscriberRankTrend {
  @Transform(({ value }: { value: Trend }) => value.get())
  public readonly trend: Trend

  @Type(() => SubscriberRankPoint)
  public readonly points: SubscriberRankPoint[]

  constructor(args: { trend: Trend; points: SubscriberRankPoint[] }) {
    this.trend = args.trend
    this.points = args.points
  }
}
