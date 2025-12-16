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
import { GroupId } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { StreamStatus, StreamRepository } from '@domain/stream'
import { ChannelId, VideoId, VideoIds, VideoTitle } from '@domain/youtube'

/** 視聴者数による絞り込み */
class ViewersDto {
  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? Number(value || 0) : undefined
  )
  gte?: number

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? Number(value || 0) : undefined
  )
  lte?: number
}

export class GetStreamsDto {
  @IsOptional()
  @IsString()
  title?: string

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

  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  @IsOptional()
  @IsString()
  channelId?: string

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
  @ValidateIf((_, value) => value !== 'null')
  @Transform(({ value }: { value?: string | null }) =>
    value === 'null' ? null : value
  )
  endedBefore?: string

  @IsOptional()
  @IsRFC3339()
  @ValidateIf((_, value) => value !== 'null')
  @Transform(({ value }: { value?: string | null }) =>
    value === 'null' ? null : value
  )
  endedAfter?: string

  @IsOptional()
  @Type(() => ViewersDto)
  peakConcurrentViewers?: ViewersDto

  @IsOptional()
  @Type(() => ViewersDto)
  avgConcurrentViewers?: ViewersDto

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

  toTitle = () => (this.title ? new VideoTitle(this.title) : undefined)

  toStatus = () => (this.status ? new StreamStatus(this.status) : undefined)

  toVideoIds = () =>
    this.videoIds
      ? new VideoIds(this.videoIds.map(id => new VideoId(id)))
      : undefined

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

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

  /** 便宜的にgte, lteどちらかがnullであれば、全体をnullとして扱う */
  toActualEndTime = () => {
    if (this.endedBefore === null || this.endedAfter === null) {
      return null
    }

    const endedAfter =
      this.endedAfter !== undefined ? new Date(this.endedAfter) : undefined
    const endedBefore =
      this.endedBefore !== undefined ? new Date(this.endedBefore) : undefined

    return {
      ...(endedAfter && { gte: endedAfter }),
      ...(endedBefore && { lte: endedBefore })
    }
  }

  toPeakConcurrentViewers = () => {
    if (!this.peakConcurrentViewers) {
      return undefined
    }
    return {
      gte: this.peakConcurrentViewers.gte,
      lte: this.peakConcurrentViewers.lte
    }
  }

  toAvgConcurrentViewers = () => {
    if (!this.avgConcurrentViewers) {
      return undefined
    }
    return {
      gte: this.avgConcurrentViewers.gte,
      lte: this.avgConcurrentViewers.lte
    }
  }

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
