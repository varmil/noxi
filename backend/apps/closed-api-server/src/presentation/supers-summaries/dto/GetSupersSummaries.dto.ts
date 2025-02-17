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
import { AmountMicros } from '@domain'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { Group, GroupString, GroupStrings } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { PeriodString, PeriodStrings } from '@domain/lib/period'
import { ChannelId, ChannelIds } from '@domain/youtube'

/** 金額による絞り込み */
export class AmountMicrosDto {
  @IsIn(PeriodStrings)
  period: PeriodString

  @IsIn(['gt', 'gte', 'lt', 'lte'])
  operator: 'gt' | 'gte' | 'lt' | 'lte'

  @Transform(({ value }: { value: string }) => new AmountMicros(value))
  value: AmountMicros
}

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

  /** JPY micro */
  @IsOptional()
  @Type(() => AmountMicrosDto)
  amountMicros?: AmountMicrosDto

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value ? new Date(value) : undefined
  )
  @IsDate()
  date: Date

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<PeriodString>[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

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
      })) as Record<PeriodString, 'asc' | 'desc'>[]) ?? undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
