import { Exclude, Transform } from 'class-transformer'
import { Period } from '@domain/lib/period'
import { Rank, RankingType } from '@domain/supers-ranking'
import { ChannelId } from '@domain/youtube'

export class SupersRanking {
  @Exclude()
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
}
