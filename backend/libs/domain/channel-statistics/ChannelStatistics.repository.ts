import { ChannelId, Channels  } from '@domain/youtube'
import { CountHistories } from './count-history'
import { Interval } from './count-history/Interval.vo'

export interface ChannelStatisticsRepository {
  /** SubscriberCount, VideoCount, ViewCountを一括で保存 */
  bulkCreate: (args: { data: Channels }) => Promise<void>

  /** チャンネル登録者数の増減推移を集計して取得 */
  findAggregatedSubscriberCounts: (args: {
    where: { channelId: ChannelId; gte: Date; lt: Date }
    interval: Interval
  }) => Promise<CountHistories>
}
