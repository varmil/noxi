import { Type } from 'class-transformer'
import { IsIn, IsInt, IsString } from 'class-validator'
import { UsedAt, UsedCount } from '@domain/cheer-ticket-usage'
import { GroupStrings, GroupString, Group } from '@domain/group'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

export class PostCheerTicketUsagesConsume {
  @IsInt()
  @Type(() => Number)
  userId: number

  @IsString()
  channelId: string

  @IsIn(GroupStrings)
  group: GroupString

  @IsInt()
  @Type(() => Number)
  usedCount: number

  toUserId = () => new UserId(this.userId)

  toChannelId = () => new ChannelId(this.channelId)

  toUsedCount = () => new UsedCount(this.usedCount)

  toGroup = () => new Group(this.group)

  toUsedAt = () => new UsedAt(new Date())
}
