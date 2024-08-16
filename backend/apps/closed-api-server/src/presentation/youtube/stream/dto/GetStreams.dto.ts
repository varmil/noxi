import { IntersectionType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsRFC3339,
  IsString
} from 'class-validator'
import { OrderBysDto } from '@presentation/dto/OrderByDto'
import { StreamStatus } from '@domain/stream'
import { ChannelId } from '@domain/youtube'

export class GetStreamsDto extends IntersectionType(
  OrderBysDto<'scheduledStartTime' | 'actualStartTime' | 'actualEndTime'>
) {
  @IsIn(['scheduled', 'live', 'ended'])
  @IsNotEmpty()
  status: 'scheduled' | 'live' | 'ended'

  @IsOptional()
  @IsRFC3339()
  scheduledBefore?: string

  @IsOptional()
  @IsRFC3339()
  scheduledAfter?: string

  @IsOptional()
  @IsString()
  channelId: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number

  toStatus = () => new StreamStatus(this.status)

  toScheduledBefore = () => {
    return this.scheduledBefore ? new Date(this.scheduledBefore) : undefined
  }

  toScheduledAfter = () => {
    return this.scheduledAfter ? new Date(this.scheduledAfter) : undefined
  }

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toLimit = () => this.limit
}
