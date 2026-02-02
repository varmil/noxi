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
import { GroupId } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { SupersBundleRepository } from '@domain/supers-bundle'
import { ChannelId, VideoId, VideoIds } from '@domain/youtube'

/** 金額による絞り込み */
export class AmountMicrosDto {
  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new AmountMicros(value || 0) : undefined
  )
  gt?: AmountMicros

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new AmountMicros(value || 0) : undefined
  )
  gte?: AmountMicros

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new AmountMicros(value || 0) : undefined
  )
  lt?: AmountMicros

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new AmountMicros(value || 0) : undefined
  )
  lte?: AmountMicros
}

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

  @IsOptional()
  @Type(() => AmountMicrosDto)
  amountMicros?: AmountMicrosDto

  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  @IsOptional()
  @IsRFC3339()
  actualStartTimeGTE?: string

  @IsOptional()
  @IsRFC3339()
  actualStartTimeLTE?: string

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
  @IsRFC3339()
  createdAtLTE?: string

  @IsOptional()
  @IsRFC3339()
  createdAtGTE?: string

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

  toAmountMicros = () => {
    if (!this.amountMicros) {
      return undefined
    }
    return {
      gt: this.amountMicros.gt,
      gte: this.amountMicros.gte,
      lt: this.amountMicros.lt,
      lte: this.amountMicros.lte
    }
  }

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<SupersBundleRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  toActualStartTime = () => {
    const gte = this.actualStartTimeGTE
      ? new Date(this.actualStartTimeGTE)
      : undefined
    const lte = this.actualStartTimeLTE
      ? new Date(this.actualStartTimeLTE)
      : undefined

    return {
      ...(gte && { gte }),
      ...(lte && { lte })
    }
  }

  /** 便宜的にgte, lteどちらかがnullであれば、全体をnullとして扱う */
  toActualEndTime = () => {
    if (this.actualEndTimeGTE === null || this.actualEndTimeLTE === null) {
      return null
    }
    return undefined
  }

  toCreatedAt = () => {
    const createdAtGTE = this.createdAtGTE
      ? new Date(this.createdAtGTE)
      : undefined
    const createdAtLTE = this.createdAtLTE
      ? new Date(this.createdAtLTE)
      : undefined

    return {
      ...(createdAtGTE && { gte: createdAtGTE }),
      ...(createdAtLTE && { lte: createdAtLTE })
    }
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
