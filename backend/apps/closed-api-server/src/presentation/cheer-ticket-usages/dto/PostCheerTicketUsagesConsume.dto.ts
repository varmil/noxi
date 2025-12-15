import { Type } from 'class-transformer'
import { IsIn, IsInt, IsString } from 'class-validator'
import { UsedAt, UsedCount } from '@domain/cheer-ticket-usage'
import { GroupName } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

export class PostCheerTicketUsagesConsume {
  @IsString()
  channelId: string

  @IsString()
  group: string

  @IsIn(GenderStrings)
  gender: GenderString

  @IsInt()
  @Type(() => Number)
  usedCount: number

  toChannelId = () => new ChannelId(this.channelId)

  toUsedCount = () => new UsedCount(this.usedCount)

  toGroup = () => new GroupName(this.group)

  toGender = () => new Gender(this.gender)

  toUsedAt = () => new UsedAt(new Date())
}
