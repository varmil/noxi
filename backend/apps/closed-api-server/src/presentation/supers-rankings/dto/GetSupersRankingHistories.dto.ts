import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional, IsRFC3339, IsString } from 'class-validator'
import { ChannelId } from '@domain'
import { PeriodStrings, PeriodString, Period } from '@domain/lib/period'
import {
  RankingTypeStrings,
  RankingTypeString,
  RankingType
} from '@domain/supers-ranking'

export class GetSupersRankingHistories {
  @IsString()
  channelId: string

  @IsIn(PeriodStrings)
  period: PeriodString

  @IsIn(RankingTypeStrings)
  rankingType: RankingTypeString

  @IsOptional()
  @IsRFC3339()
  createdBefore?: string

  @IsOptional()
  @IsRFC3339()
  createdAfter?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  toChannelId = () => new ChannelId(this.channelId)

  toPeriod = () => new Period(this.period)

  toRankingType = () => new RankingType(this.rankingType)

  toCreatedBefore = () => {
    return this.createdBefore ? new Date(this.createdBefore) : undefined
  }

  toCreatedAfter = () => {
    return this.createdAfter ? new Date(this.createdAfter) : undefined
  }

  toLimit = () => this.limit
}
