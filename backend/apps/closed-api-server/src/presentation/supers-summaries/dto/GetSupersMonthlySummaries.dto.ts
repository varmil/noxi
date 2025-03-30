import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'
import { ChannelId } from '@domain/youtube'

export class GetSupersMonthlySummaries {
  @IsString()
  channelId: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toChannelId = () => new ChannelId(this.channelId)

  toLimit = () => this.limit

  toOffset = () => this.offset
}
