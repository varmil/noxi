import { Exclude, Transform } from 'class-transformer'
import { Period, PeriodStrings } from '@domain/lib/period'
import { RankingType, RankingTypeStrings } from '@domain/ranking'
import { Rank } from '@domain/supers-ranking'
import { ChannelId } from '@domain/youtube'

export class SupersRanking {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  readonly channelId: ChannelId
  @Exclude()
  readonly period: Period
  @Exclude()
  readonly rankingType: RankingType
  @Transform(({ value }: { value: Rank }) => value.get())
  readonly rank: Rank

  readonly createdAt: Date

  constructor(args: {
    channelId: ChannelId
    period: Period
    rankingType: RankingType
    rank: Rank
    createdAt: Date
  }) {
    this.channelId = args.channelId
    this.period = args.period
    this.rankingType = args.rankingType
    this.rank = args.rank
    this.createdAt = args.createdAt
  }

  @Exclude()
  static allPeriods = () => PeriodStrings.map(p => new Period(p))

  @Exclude()
  static allRankingTypes = () => RankingTypeStrings.map(p => new RankingType(p))
}
