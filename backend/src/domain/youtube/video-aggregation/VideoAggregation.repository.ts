import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'

export interface VideoAggregationRepository {
  // startDate, endDate （チャンネル詳細でヒストリ参照するときなど）
  findOne: (args: {
    where: { channelId: string }
  }) => Promise<VideoAggregation | null>

  save: (args: {
    where: { channelId: string }
    data: VideoAggregation
  }) => Promise<void>
}
