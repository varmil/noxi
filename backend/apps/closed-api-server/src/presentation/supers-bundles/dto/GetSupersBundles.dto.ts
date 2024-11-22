import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsRFC3339,
  IsString,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { Group, GroupString, GroupStrings } from '@domain/group'
import { SupersBundleRepository } from '@domain/supers-bundle'
import { ChannelId, VideoId, VideoIds } from '@domain/youtube'

export class GetSupersBundles {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  videoIds?: string[]

  @IsOptional()
  @IsString()
  channelId?: string

  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  /** "null" means "realtime live" */
  @IsOptional()
  @IsRFC3339()
  @ValidateIf((_, value) => value !== 'null')
  @Transform(({ value }: { value?: string | null }) =>
    value === 'null' ? null : value
  )
  actualEndTimeGTE?: string | null

  /** "null" means "realtime live" */
  @IsOptional()
  @IsRFC3339()
  @ValidateIf((_, value) => value !== 'null')
  @Transform(({ value }: { value?: string | null }) =>
    value === 'null' ? null : value
  )
  actualEndTimeLTE?: string | null

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<'amountMicros'>[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toVideoIds = () =>
    this.videoIds
      ? new VideoIds(this.videoIds.map(id => new VideoId(id)))
      : undefined

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<SupersBundleRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  /** 便宜的にgte, lteどちらかがnullであれば、全体をnullとして扱う */
  toActualEndTime = () => {
    if (this.actualEndTimeGTE === null || this.actualEndTimeLTE === null) {
      return null
    }

    const actualEndTimeGTE =
      this.actualEndTimeGTE !== undefined
        ? new Date(this.actualEndTimeGTE)
        : undefined
    const actualEndTimeLTE =
      this.actualEndTimeLTE !== undefined
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
