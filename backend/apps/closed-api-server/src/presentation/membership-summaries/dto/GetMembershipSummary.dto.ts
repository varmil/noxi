import { IsIn, IsString } from 'class-validator'
import { PeriodStrings, PeriodString, Period } from '@domain/lib/period'
import { ChannelId } from '@domain/youtube'

export class GetMembershipSummary {
  @IsString()
  channelId: string

  @IsIn(PeriodStrings)
  period: PeriodString

  toChannelId = () => new ChannelId(this.channelId)

  toPeriod = () => new Period(this.period)
}
