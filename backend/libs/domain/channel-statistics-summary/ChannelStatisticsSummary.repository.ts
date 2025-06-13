import {
  SubscriberCountSummaries,
  VideoCountSummaries,
  ViewCountSummaries
} from '@domain/channel-statistics-summary'
import { ChannelId, Channels } from '@domain/youtube'

interface WHERE {
  channelId: ChannelId
  createdAt: { gte?: Date; lte?: Date }
}

export interface ChannelStatisticsSummaryRepository {
  /** SubscriberCount, VideoCount, ViewCountを一括で保存 */
  bulkCreate: (args: { data: Channels }) => Promise<void>

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
