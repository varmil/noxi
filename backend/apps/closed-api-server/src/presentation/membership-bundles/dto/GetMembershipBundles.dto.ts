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
import { GroupName } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { MembershipBundleRepository } from '@domain/membership-bundle'
import { ChannelId, VideoId, VideoIds } from '@domain/youtube'

export class GetMembershipBundles {
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
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

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

  toGroup = () => (this.group ? new GroupName(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<MembershipBundleRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
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
