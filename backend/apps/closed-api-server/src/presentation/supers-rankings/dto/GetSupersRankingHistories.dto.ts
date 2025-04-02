import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsRFC3339,
  IsString
} from 'class-validator'
import { PeriodStrings, PeriodString, Period } from '@domain/lib/period'
import {
  RankingType,
  RankingTypeString,
  RankingTypeStrings
} from '@domain/ranking'
import { ChannelId, ChannelIds } from '@domain/youtube'

export class GetSupersRankingHistories {
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  channelIds: string[]

  @IsIn(PeriodStrings)
  period: PeriodString

  @IsIn(RankingTypeStrings)
  rankingType: RankingTypeString

  @IsRFC3339()
  createdBefore: string

  @IsRFC3339()
  createdAfter: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  toChannelIds = () =>
    new ChannelIds(this.channelIds.map(id => new ChannelId(id)))

  toPeriod = () => new Period(this.period)

  toRankingType = () => new RankingType(this.rankingType)

  toCreatedBefore = () => new Date(this.createdBefore)

  toCreatedAfter = () => new Date(this.createdAfter)

  toLimit = () => this.limit
}
