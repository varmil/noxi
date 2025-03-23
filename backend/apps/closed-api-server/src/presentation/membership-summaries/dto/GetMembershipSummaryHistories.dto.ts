import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional, IsRFC3339, IsString } from 'class-validator'
import { PeriodStrings, PeriodString, Period } from '@domain/lib/period'
import { ChannelId } from '@domain/youtube'

export class GetMembershipSummaryHistories {
  @IsString()
  channelId: string

  @IsIn(PeriodStrings)
  period: PeriodString

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

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toChannelId = () => new ChannelId(this.channelId)

  toPeriod = () => new Period(this.period)

  toCreatedBefore = () => {
    return this.createdBefore ? new Date(this.createdBefore) : undefined
  }

  toCreatedAfter = () => {
    return this.createdAfter ? new Date(this.createdAfter) : undefined
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
