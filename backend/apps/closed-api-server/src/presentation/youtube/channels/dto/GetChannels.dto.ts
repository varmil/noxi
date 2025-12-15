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
import { GroupName } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import {
  ChannelId,
  ChannelIds,
  ChannelRepository,
  ChannelTitle
} from '@domain/youtube'

export class GetChannelsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  ids?: string[]

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

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

  toTitle = () => (this.title ? new ChannelTitle(this.title) : undefined)

  toGroup = () => (this.group ? new GroupName(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

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
