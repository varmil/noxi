import { Transform } from 'class-transformer'
import { UsedAt, UsedCount } from '@domain/cheer-ticket-usage'
import { Group } from '@domain/group'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

export class CheerTicketUsage {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group
  @Transform(({ value }: { value: UsedCount }) => value.get())
  public readonly usedCount: UsedCount
  @Transform(({ value }: { value: UsedAt }) => value.get())
  public readonly usedAt: UsedAt

  constructor(args: {
    userId: UserId
    channelId: ChannelId
    group: Group
    usedCount: UsedCount
    usedAt: UsedAt
  }) {
    this.userId = args.userId
    this.channelId = args.channelId
    this.group = args.group
    this.usedCount = args.usedCount
    this.usedAt = args.usedAt
  }
}
