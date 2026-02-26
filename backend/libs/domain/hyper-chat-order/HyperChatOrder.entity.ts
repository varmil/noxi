import { Transform } from 'class-transformer'
import { GroupId } from '@domain/group'
import { IsAnonymous, Message, Status, Tier } from '@domain/hyper-chat'
import {
  Amount,
  HyperChatOrderId,
  StripePaymentIntentId
} from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

export class HyperChatOrder {
  @Transform(({ value }: { value: HyperChatOrderId }) => value.get())
  public readonly id: HyperChatOrderId

  @Transform(({ value }: { value: StripePaymentIntentId }) => value.get())
  public readonly stripePaymentIntentId: StripePaymentIntentId

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

  @Transform(({ value }: { value: Status }) => value.get())
  public readonly status: Status

  @Transform(({ value }: { value: IsAnonymous }) => value.get())
  public readonly isAnonymous: IsAnonymous

  public readonly createdAt: Date

  public readonly updatedAt: Date

  constructor(args: {
    id: HyperChatOrderId
    stripePaymentIntentId: StripePaymentIntentId
    userId: UserId
    channelId: ChannelId
    group: GroupId
    gender: Gender
    tier: Tier
    amount: Amount
    message: Message
    status: Status
    isAnonymous: IsAnonymous
    createdAt: Date
    updatedAt: Date
  }) {
    this.id = args.id
    this.stripePaymentIntentId = args.stripePaymentIntentId
    this.userId = args.userId
    this.channelId = args.channelId
    this.group = args.group
    this.gender = args.gender
    this.tier = args.tier
    this.amount = args.amount
    this.message = args.message
    this.status = args.status
    this.isAnonymous = args.isAnonymous
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
  }
}
