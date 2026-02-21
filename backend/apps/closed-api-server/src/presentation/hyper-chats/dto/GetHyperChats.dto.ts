import { Transform, Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { GroupId } from '@domain/group'
import { IsAnonymous, TIERS, Tier, TierValue } from '@domain/hyper-chat'
import { Gender, GenderString, GenderStrings } from '@domain/lib/gender'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

type SortableField = 'createdAt' | 'tier' | 'likeCount' | 'amount'

export class GetHyperChats {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: string | boolean }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value as boolean
  })
  isAnonymous?: boolean

  @IsOptional()
  @IsString()
  channelId?: string

  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  @IsOptional()
  @IsIn(TIERS)
  tier?: TierValue

  @IsOptional()
  @IsDateString()
  createdAfter?: string

  @IsOptional()
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<SortableField>[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toUserId = () =>
    this.userId !== undefined ? new UserId(this.userId) : undefined

  toIsAnonymous = () =>
    this.isAnonymous !== undefined
      ? new IsAnonymous(this.isAnonymous)
      : undefined

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toTier = () => (this.tier ? new Tier(this.tier) : undefined)

  toCreatedAt = () =>
    this.createdAfter ? { gte: new Date(this.createdAfter) } : undefined

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Record<SortableField, 'asc' | 'desc'>[]) ?? undefined
    )
  }

  toLimit = () => this.limit ?? 50

  toOffset = () => this.offset
}
