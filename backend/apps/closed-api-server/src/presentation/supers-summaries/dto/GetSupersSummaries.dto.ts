import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { Group, GroupString, GroupStrings } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { SupersSummaryRepository } from '@domain/supers-summary'
import { ChannelId, ChannelIds } from '@domain/youtube'

export class GetSupersSummaries {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  channelIds?: string[]

  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<
    | 'last24Hours'
    | 'last7Days'
    | 'last30Days'
    | 'last90Days'
    | 'last1Year'
    | 'thisWeek'
    | 'thisMonth'
    | 'thisYear'
  >[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value ? new Date(value) : undefined
  )
  @IsDate()
  date: Date

  toChannelIds = () =>
    this.channelIds
      ? new ChannelIds(this.channelIds.map(id => new ChannelId(id)))
      : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<SupersSummaryRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
