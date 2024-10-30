import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsRFC3339,
  IsString,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { Group, GroupString, GroupStrings } from '@domain/group'
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

  @IsOptional()
  @IsRFC3339()
  scheduledBefore?: string

  @IsOptional()
  @IsRFC3339()
  scheduledAfter?: string

  @IsOptional()
  @IsString()
  channelId?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy: OrderByDto<
    | 'scheduledStartTime'
    | 'actualStartTime'
    | 'actualEndTime'
    | 'maxViewerCount'
  >[]

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  limit: number

  toStatus = () => (this.status ? new StreamStatus(this.status) : undefined)

  toVideoIds = () =>
    this.videoIds
      ? new VideoIds(this.videoIds.map(id => new VideoId(id)))
      : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toScheduledBefore = () => {
    return this.scheduledBefore ? new Date(this.scheduledBefore) : undefined
  }

  toScheduledAfter = () => {
    return this.scheduledAfter ? new Date(this.scheduledAfter) : undefined
  }

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toOrderBy = () => {
    return this.orderBy.map(({ field, order }) => ({
      [field]: order
    })) as Parameters<StreamRepository['findAll']>[0]['orderBy']
  }

  toLimit = () => this.limit
}
