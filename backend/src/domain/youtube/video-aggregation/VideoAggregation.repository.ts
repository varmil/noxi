import { ChannelId } from '@domain/youtube/channel'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'

export interface VideoAggregationRepository {
  // startDate, endDate （チャンネル詳細でヒストリ参照するときなど）
  findOne: (args: {
    where: { channelId: ChannelId }
  }) => Promise<VideoAggregation | null>

  save: (args: {
    where: { channelId: ChannelId }
    data: VideoAggregation
  }) => Promise<void>
}
