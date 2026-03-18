import { ChannelId } from '@domain/youtube/channel'
import { SubscriberRankTrend } from './SubscriberRankTrend.entity'

export interface SubscriberRankTrendRepository {
  findByChannelId: (args: {
    channelId: ChannelId
    since: Date
  }) => Promise<SubscriberRankTrend>
}
