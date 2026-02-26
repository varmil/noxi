import { GroupId } from '@domain/group'
import { HyperChat, IsAnonymous, Message } from '@domain/hyper-chat'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { HyperChatTicketId } from './HyperChatTicketId.vo'
import { HyperChatTickets } from './HyperChatTickets.collection'

export interface UseTicketArgs {
  ticketId: HyperChatTicketId
  userId: UserId
  channelId: ChannelId
  group: GroupId
  gender: Gender
  message: Message
  isAnonymous?: IsAnonymous
}

export interface HyperChatTicketRepository {
  /**
   * 有効なチケット一覧を取得（未使用 & 有効期限内）
   */
  findValidByUserId: (userId: UserId) => Promise<HyperChatTickets>

  /**
   * チケットを使用してハイパーチャットを作成
   * - トランザクション内で以下を実行:
   *   1. チケットをロック & 有効性確認
   *   2. チケットの usedAt を更新
   *   3. HyperChat を作成（tier: 'free', amount: 0, ticketId 設定）
   */
  useTicket: (args: UseTicketArgs) => Promise<HyperChat>
}
