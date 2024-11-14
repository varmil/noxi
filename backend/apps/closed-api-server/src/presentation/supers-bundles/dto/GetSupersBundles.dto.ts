import { Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsRFC3339,
  IsString,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { Group, GroupString, GroupStrings } from '@domain/group'
import { SupersBundleRepository } from '@domain/supers-bundle'
import { ChannelId, VideoId } from '@domain/youtube'

export class GetSupersBundles {
  @IsOptional()
  @IsString()
  videoId?: string

  @IsOptional()
  @IsString()
  channelId?: string

  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  @IsOptional()
  @IsRFC3339()
  actualEndTimeGTE?: string

  @IsOptional()
  @IsRFC3339()
  actualEndTimeLTE?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy: OrderByDto<'amountMicros'>[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toVideoId = () => (this.videoId ? new VideoId(this.videoId) : undefined)

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toOrderBy = () => {
    return this.orderBy.map(({ field, order }) => ({
      [field]: order
    })) as Parameters<SupersBundleRepository['findAll']>[0]['orderBy']
  }

  toActualEndTime = () => {
    const actualEndTimeGTE = this.actualEndTimeGTE
      ? new Date(this.actualEndTimeGTE)
      : undefined
    const actualEndTimeLTE = this.actualEndTimeLTE
      ? new Date(this.actualEndTimeLTE)
      : undefined

    return {
      ...(actualEndTimeGTE && { gte: actualEndTimeGTE }),
      ...(actualEndTimeLTE && { lte: actualEndTimeLTE })
    }
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
