import { Type } from 'class-transformer'
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { SuperStickerRepository } from '@domain/supers'
import { ChannelId, VideoId } from '@domain/youtube'

export class GetSuperStickers {
  @IsOptional()
  @IsString()
  videoId?: string

  @IsOptional()
  @IsString()
  channelId?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy: OrderByDto<
    'commentLength' | 'amountMicros' | 'currency' | 'createdAt'
  >[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  toVideoId = () => (this.videoId ? new VideoId(this.videoId) : undefined)

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toOrderBy = () => {
    return this.orderBy.map(({ field, order }) => ({
      [field]: order
    })) as Parameters<SuperStickerRepository['findAll']>[0]['orderBy']
  }

  toLimit = () => this.limit
}
