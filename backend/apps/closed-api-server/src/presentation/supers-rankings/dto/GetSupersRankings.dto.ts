import { IsIn, IsString } from 'class-validator'
import { Period, PeriodString, PeriodStrings } from '@domain/lib/period'
import {
  RankingType,
  RankingTypeString,
  RankingTypeStrings
} from '@domain/ranking'
import { ChannelId } from '@domain/youtube'

export class GetSupersRankings {
  @IsString()
  channelId: string

  @IsIn(PeriodStrings)
  period: PeriodString

  @IsIn(RankingTypeStrings)
  rankingType: RankingTypeString

  toChannelId = () => new ChannelId(this.channelId)

  toPeriod = () => new Period(this.period)

  toRankingType = () => new RankingType(this.rankingType)
}
