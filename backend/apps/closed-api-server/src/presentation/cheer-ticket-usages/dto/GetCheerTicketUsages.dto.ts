import { OmitType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import { UsedAtDto } from '@presentation/cheer-ticket-usages/dto/UsedAt.dto'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { CheerTicketUsageRepository } from '@domain/cheer-ticket-usage'
import { Group } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

export class GetCheerTicketUsages {
  @IsOptional()
  @Type(() => Number)
  userId?: number

  @IsOptional()
  @IsString()
  channelId?: string

  @IsOptional()
  @IsString()
  group?: string

  @IsOptional()
  @IsIn(GenderStrings)
  gender?: GenderString

  @IsOptional()
  @Type(() => UsedAtDto)
  usedAt?: UsedAtDto

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<'usedAt' | 'usedCount'>[]

  @IsInt()
  @Type(() => Number)
  limit: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toUserId = () => (this.userId ? new UserId(this.userId) : undefined)

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toUsedAt = () => {
    if (!this.usedAt) {
      return undefined
    }
    return {
      gte: new Date(this.usedAt.gte),
      ...(this.usedAt.lte && { lte: new Date(this.usedAt.lte) })
    }
  }

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<CheerTicketUsageRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}

export class GetCheerTicketUsagesWithoutLimitOffset extends OmitType(
  GetCheerTicketUsages,
  ['limit', 'offset'] as const
) {}

export class GetCheerTicketUsagesRanksCheered extends OmitType(
  GetCheerTicketUsages,
  ['userId', 'gender', 'orderBy', 'limit', 'offset'] as const
) {
  @IsString()
  channelId: string

  toChannelId = () => new ChannelId(this.channelId)
}

export class GetCheerTicketUsagesRanksFan extends OmitType(
  GetCheerTicketUsages,
  ['gender', 'orderBy', 'limit', 'offset'] as const
) {
  @Type(() => Number)
  userId: number

  toUserId = () => new UserId(this.userId)
}
