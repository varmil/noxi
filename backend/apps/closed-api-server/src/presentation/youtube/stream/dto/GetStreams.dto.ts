import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsRFC3339,
  IsString,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { Group, GroupString, GroupStrings } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { StreamStatus, StreamRepository } from '@domain/stream'
import { ChannelId, VideoId, VideoIds } from '@domain/youtube'

export class GetStreamsDto {
  @IsOptional()
  @IsIn(['scheduled', 'live', 'ended'])
  @IsNotEmpty()
  status?: 'scheduled' | 'live' | 'ended'

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  videoIds?: string[]

  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  @IsOptional()
  @IsRFC3339()
  @ValidateIf((_, value) => value !== 'null')
  @Transform(({ value }: { value?: string | null }) =>
    value === 'null' ? null : value
  )
  scheduledBefore?: string | null

  @IsOptional()
  @IsRFC3339()
  @ValidateIf((_, value) => value !== 'null')
  @Transform(({ value }: { value?: string | null }) =>
    value === 'null' ? null : value
  )
  scheduledAfter?: string | null

  @IsOptional()
  @IsRFC3339()
  endedBefore?: string

  @IsOptional()
  @IsRFC3339()
  endedAfter?: string

  @IsOptional()
  @IsString()
  channelId?: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<
    | 'videoId'
    | 'scheduledStartTime'
    | 'actualStartTime'
    | 'actualEndTime'
    | 'maxViewerCount'
  >[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toStatus = () => (this.status ? new StreamStatus(this.status) : undefined)

  toVideoIds = () =>
    this.videoIds
      ? new VideoIds(this.videoIds.map(id => new VideoId(id)))
      : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  /** 便宜的にgte, lteどちらかがnullであれば、全体をnullとして扱う */
  toScheduledStartTime = () => {
    if (this.scheduledBefore === null || this.scheduledAfter === null) {
      return null
    }

    const scheduledAfter =
      this.scheduledAfter !== undefined
        ? new Date(this.scheduledAfter)
        : undefined
    const scheduledBefore =
      this.scheduledBefore !== undefined
        ? new Date(this.scheduledBefore)
        : undefined

    return {
      ...(scheduledAfter && { gte: scheduledAfter }),
      ...(scheduledBefore && { lte: scheduledBefore })
    }
  }

  toEndedBefore = () => {
    return this.endedBefore ? new Date(this.endedBefore) : undefined
  }

  toEndedAfter = () => {
    return this.endedAfter ? new Date(this.endedAfter) : undefined
  }

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<StreamRepository['findAll']>[0]['orderBy']) ?? undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
