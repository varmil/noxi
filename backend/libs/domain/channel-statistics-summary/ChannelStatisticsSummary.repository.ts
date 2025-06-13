import {
  SubscriberCountSummaries,
  VideoCountSummaries,
  ViewCountSummaries
} from '@domain/channel-statistics-summary'
import { ChannelId } from '@domain/youtube'

interface WHERE {
  channelId: ChannelId
  createdAt: { gte?: Date; lte?: Date }
}

export interface ChannelStatisticsSummaryRepository {
  /** 特定のチャンネルのサブスクライブ数の履歴を取得 */
  findSubscriberCountHistories: (args: {
    where: WHERE
    limit?: number
    offset?: number
  }) => Promise<SubscriberCountSummaries>

  /** 特定のチャンネルのアップロード数の履歴を取得 */
  findVideoCountHistories: (args: {
    where: WHERE
    limit?: number
    offset?: number
  }) => Promise<VideoCountSummaries>

  /** 特定のチャンネルの視聴回数の履歴を取得 */
  findViewCountHistories: (args: {
    where: WHERE
    limit?: number
    offset?: number
  }) => Promise<ViewCountSummaries>
}
