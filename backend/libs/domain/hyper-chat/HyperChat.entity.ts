import { Transform } from 'class-transformer'
import { GroupId } from '@domain/group'
import {
  HyperChatId,
  IsAnonymous,
  LikeCount,
  Message,
  Tier
} from '@domain/hyper-chat'
import { ModerationStatus } from '@domain/hyper-chat-moderation'
import { Amount } from '@domain/hyper-chat-order'
import { FREE_TICKET_POINT } from '@domain/hyper-train/level-config'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

/** HyperChat送信者の情報 */
export interface HyperChatAuthor {
  name: string | null
  image: string | null
  username: string | null
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

  @Transform(({ value }: { value: IsAnonymous }) => value.get())
  public readonly isAnonymous: IsAnonymous

  public readonly createdAt: Date

  @Transform(({ value }: { value: ModerationStatus }) => value?.get())
  public readonly moderationStatus?: ModerationStatus

  /** 送信者情報（isAnonymous の場合はマスク済み） */
  @Transform(({ value, obj }: { value: HyperChatAuthor; obj: HyperChat }) =>
    obj.isAnonymous.get() ? { name: null, image: null, username: null } : value
  )
  public readonly author: HyperChatAuthor

  /**
   * ハイパートレイン用のポイントを計算
   * - free tier: 100pt（定数）
   * - 有料 tier: 金額（1円 = 1pt）
   */
  getPoint(): number {
    if (this.tier.get() === 'free') return FREE_TICKET_POINT
    return this.amount.get()
  }

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
    isAnonymous: IsAnonymous
    createdAt: Date
    moderationStatus?: ModerationStatus
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
    this.isAnonymous = args.isAnonymous
    this.createdAt = args.createdAt
    this.moderationStatus = args.moderationStatus
    this.author = args.author
  }
}
