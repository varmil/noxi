import { Channels } from '@domain/youtube'

export interface ChannelStatisticsSummaryRepository {
  /** SubscriberCount, VideoCount, ViewCountを一括で保存 */
  bulkCreate: (args: { data: Channels }) => Promise<void>
}
