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
import { GroupId } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { PeriodStrings, PeriodString, Period } from '@domain/lib/period'
import { Count } from '@domain/membership'
import { ChannelId, ChannelIds } from '@domain/youtube'

/** 件数による絞り込み */
export class CountDto {
  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new Count(Number(value)) : undefined
  )
  gt?: Count

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new Count(Number(value)) : undefined
  )
  gte?: Count

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new Count(Number(value)) : undefined
  )
  lt?: Count

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new Count(Number(value)) : undefined
  )
  lte?: Count
}

export class GetMembershipSummaries {
  @IsIn(PeriodStrings)
  period: PeriodString

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  channelIds?: string[]

  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  /** 件数による絞り込み */
  @IsOptional()
  @Type(() => CountDto)
  count?: CountDto

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
  orderBy?: OrderByDto<'count' | 'amountMicros'>[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toPeriod = () => new Period(this.period)

  toChannelIds = () =>
    this.channelIds
      ? new ChannelIds(this.channelIds.map(id => new ChannelId(id)))
      : undefined

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toCount = () =>
    this.count
      ? {
          gt: this.count.gt,
          gte: this.count.gte,
          lt: this.count.lt,
          lte: this.count.lte
        }
      : undefined

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Record<'count' | 'amountMicros', 'asc' | 'desc'>[]) ?? undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
