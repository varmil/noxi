import { UserId } from '@domain/user'
import { HyperChatTicketProgress } from './HyperChatTicketProgress.entity'

export interface HyperChatTicketProgressRepository {
  /**
   * ログイン記録＆チケット付与（3日カウントで1枚）
   *
   * - ログインするとカウント +1（JST 5時基準で1日1回のみ）
   * - カウントが 3 に達するとチケット 1 枚付与
   * - 付与後、カウントは 0 にリセット
   */
  recordLoginAndGrantIfEligible: (args: {
    where: { userId: UserId }
  }) => Promise<HyperChatTicketProgress>
}
