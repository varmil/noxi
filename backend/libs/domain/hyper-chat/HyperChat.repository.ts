import { GroupId } from '@domain/group'
import {
  HyperChat,
  HyperChatId,
  HyperChats,
  IsAnonymous,
  Message,
  Tier
} from '@domain/hyper-chat'
import { Amount, HyperChatOrderId } from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

interface FindAllWhere {
  channelId?: ChannelId
  userId?: UserId
  group?: GroupId
  gender?: Gender
  tier?: Tier
  isAnonymous?: IsAnonymous
  createdAt?: { gte?: Date; lte?: Date }
}

export interface HyperChatRepository {
  /**
   * ハイパーチャットを作成
   * - 購入時: orderId あり
   * - チケット利用時: orderId なし
   */
  create: (args: {
    data: {
      orderId?: HyperChatOrderId
      userId: UserId
      channelId: ChannelId
      group: GroupId
      gender: Gender
      tier: Tier
      amount: Amount
      message: Message
      isAnonymous?: IsAnonymous
    }
  }) => Promise<HyperChat>

  /**
   * ID でハイパーチャットを取得
   */
  findById: (id: HyperChatId) => Promise<HyperChat | null>

  /**
   * ハイパーチャット一覧を取得
   */
  findAll: (args: {
    where: FindAllWhere
    orderBy?: Partial<Record<'createdAt' | 'tier' | 'likeCount' | 'amount', 'asc' | 'desc'>>[]
    limit: number
    offset?: number
  }) => Promise<HyperChats>

  /**
   * 条件に一致するハイパーチャットの件数を取得
   */
  count: (args: { where: FindAllWhere }) => Promise<number>

  /**
   * 条件に一致するハイパーチャットの合計金額を取得
   */
  sumAmount: (args: { where: FindAllWhere }) => Promise<number>

  /**
   * 条件に一致するハイパーチャットの合計いいね数を取得
   */
  sumLikeCount: (args: { where: FindAllWhere }) => Promise<number>

  /**
   * 条件に一致するユニークユーザー数を取得
   */
  countDistinctUsers: (args: { where: FindAllWhere }) => Promise<number>

  /**
   * 複数チャンネルの最新ハイパーチャットを取得（過去24時間）
   */
  findRecentByChannelIds: (args: {
    channelIds: ChannelId[]
  }) => Promise<Map<string, HyperChats>>

  /**
   * チャンネルごとに最新1件のハイパーチャットを取得
   */
  findLatestPerChannel: (args: { limit: number }) => Promise<HyperChats>

  /**
   * ハイパーチャットを削除
   */
  delete: (id: HyperChatId) => Promise<void>
}
