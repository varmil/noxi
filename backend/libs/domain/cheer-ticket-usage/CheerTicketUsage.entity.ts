import { Transform } from 'class-transformer'
import { UsedAt, UsedCount } from '@domain/cheer-ticket-usage'
import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

export class CheerTicketUsage {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly group: GroupId
  @Transform(({ value }: { value: Gender }) => value.get())
  public readonly gender: Gender
  @Transform(({ value }: { value: UsedCount }) => value.get())
  public readonly usedCount: UsedCount
  @Transform(({ value }: { value: UsedAt }) => value.get())
  public readonly usedAt: UsedAt

  constructor(args: {
    userId: UserId
    channelId: ChannelId
    group: GroupId
    gender: Gender
    usedCount: UsedCount
    usedAt: UsedAt
  }) {
    this.userId = args.userId
    this.channelId = args.channelId
    this.group = args.group
    this.gender = args.gender
    this.usedCount = args.usedCount
    this.usedAt = args.usedAt
  }
}
