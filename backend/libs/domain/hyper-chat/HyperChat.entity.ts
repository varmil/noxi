import { Transform } from 'class-transformer'
import { GroupId } from '@domain/group'
import {
  HyperChatId,
  LikeCount,
  Message,
  Tier
} from '@domain/hyper-chat'
import { Amount } from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

export class HyperChat {
  @Transform(({ value }: { value: HyperChatId }) => value.get())
  public readonly id: HyperChatId

  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly group: GroupId

  @Transform(({ value }: { value: Gender }) => value.get())
  public readonly gender: Gender

  @Transform(({ value }: { value: Tier }) => value.get())
  public readonly tier: Tier

  @Transform(({ value }: { value: Amount }) => value.get())
  public readonly amount: Amount

  @Transform(({ value }: { value: Message }) => value.get())
  public readonly message: Message

  @Transform(({ value }: { value: LikeCount }) => value.get())
  public readonly likeCount: LikeCount

  public readonly createdAt: Date

  constructor(args: {
    id: HyperChatId
    userId: UserId
    channelId: ChannelId
    group: GroupId
    gender: Gender
    tier: Tier
    amount: Amount
    message: Message
    likeCount: LikeCount
    createdAt: Date
  }) {
    this.id = args.id
    this.userId = args.userId
    this.channelId = args.channelId
    this.group = args.group
    this.gender = args.gender
    this.tier = args.tier
    this.amount = args.amount
    this.message = args.message
    this.likeCount = args.likeCount
    this.createdAt = args.createdAt
  }
}
