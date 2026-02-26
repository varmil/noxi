import { HyperChatId } from '@domain/hyper-chat'
import { UserId } from '@domain/user'

export interface HyperChatLikeRepository {
  /**
   * いいねを作成
   * HyperChat.likeCount もインクリメントする
   */
  create: (args: { hyperChatId: HyperChatId; userId: UserId }) => Promise<void>

  /**
   * いいねを削除
   * HyperChat.likeCount もデクリメントする
   */
  delete: (args: { hyperChatId: HyperChatId; userId: UserId }) => Promise<void>

  /**
   * 指定したHyperChatのうち、ユーザーがいいねしているものを取得
   */
  findLikedHyperChatIds: (args: {
    hyperChatIds: HyperChatId[]
    userId: UserId
  }) => Promise<Set<HyperChatId>>
}
