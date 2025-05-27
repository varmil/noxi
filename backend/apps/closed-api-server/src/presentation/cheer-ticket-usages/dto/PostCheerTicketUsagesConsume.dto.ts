import { Type } from 'class-transformer'
import { IsIn, IsInt, IsString } from 'class-validator'
import { UsedAt, UsedCount } from '@domain/cheer-ticket-usage'
import { GroupStrings, GroupString, Group } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

export class PostCheerTicketUsagesConsume {
  @IsString()
  channelId: string

  @IsIn(GroupStrings)
  group: GroupString

  @IsIn(GenderStrings)
  gender: GenderString

  @IsInt()
  @Type(() => Number)
  usedCount: number

  toChannelId = () => new ChannelId(this.channelId)

  toUsedCount = () => new UsedCount(this.usedCount)

  toGroup = () => new Group(this.group)

  toGender = () => new Gender(this.gender)

  toUsedAt = () => new UsedAt(new Date())
}
