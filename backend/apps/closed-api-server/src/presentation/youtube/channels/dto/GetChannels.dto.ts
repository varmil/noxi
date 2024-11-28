import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { GroupStrings, GroupString, Group } from '@domain/group'
import { ChannelId, ChannelIds, ChannelRepository } from '@domain/youtube'

export class GetChannelsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  ids?: string[]

  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<'subscriberCount' | 'viewCount'>[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toIds = () =>
    this.ids
      ? new ChannelIds(this.ids?.map(id => new ChannelId(id)))
      : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<ChannelRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
