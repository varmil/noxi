import { Transform } from 'class-transformer'
import { GroupId } from '@domain/group'
import {
  HyperChatId,
  LikeCount,
  Message,
  Tier
} from '@domain/hyper-chat'
import { Amount } from '@domain/hyper-chat-order'
import { HyperChatTicketId } from '@domain/hyper-chat-ticket'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

/** HyperChat送信者の情報 */
export interface HyperChatAuthor {
  name: string | null
  image: string | null
}

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

  @Transform(({ value }: { value: HyperChatTicketId | null }) =>
    value?.get() ?? null
  )
  public readonly ticketId: HyperChatTicketId | null

  public readonly createdAt: Date

  /** 送信者情報 */
  public readonly author: HyperChatAuthor

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
    ticketId: HyperChatTicketId | null
    createdAt: Date
    author: HyperChatAuthor
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
    this.ticketId = args.ticketId
    this.createdAt = args.createdAt
    this.author = args.author
  }
}
