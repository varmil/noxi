import { SupersMonthlySummaries } from '@domain/supers-summary'
import { ChannelId } from '@domain/youtube'

export interface SupersMonthlySummaryRepository {
  /** 各月最終日のレコードを取得 */
  findAll: (args: {
    where: {
      channelId: ChannelId
    }
    limit?: number
    offset?: number
  }) => Promise<SupersMonthlySummaries>
}
