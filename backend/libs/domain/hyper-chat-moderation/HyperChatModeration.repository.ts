import { HyperChatId } from '@domain/hyper-chat'
import { HyperChatModeration } from './HyperChatModeration.entity'
import { ModerationStatus } from './ModerationStatus.vo'

export interface HyperChatModerationRepository {
  /**
   * モデレーション情報を upsert
   */
  upsert: (args: {
    hyperChatId: HyperChatId
    status: ModerationStatus
  }) => Promise<void>

  /**
   * モデレーション情報を削除
   */
  delete: (hyperChatId: HyperChatId) => Promise<void>

  /**
   * モデレーション情報を取得
   */
  findOne: (args: {
    where: { hyperChatId: HyperChatId }
  }) => Promise<HyperChatModeration | null>
}
