import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsRFC3339,
  IsString,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { SuperChatRepository } from '@domain/supers'
import { ChannelId, VideoId } from '@domain/youtube'

export class GetSuperChats {
  @IsOptional()
  @IsString()
  videoId?: string

  @IsOptional()
  @IsString()
  channelId?: string

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  userCommentNotNull?: boolean

  @IsOptional()
  @IsRFC3339()
  createdAfter?: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<
    'commentLength' | 'amountMicros' | 'currency' | 'createdAt'
  >[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  toVideoId = () => (this.videoId ? new VideoId(this.videoId) : undefined)

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toUserComment = () => (this.userCommentNotNull ? { not: null } : undefined)

  toCreatedAfter = () => {
    return this.createdAfter ? new Date(this.createdAfter) : undefined
  }

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<SuperChatRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  toLimit = () => this.limit
}
