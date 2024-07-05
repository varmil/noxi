import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'

export interface VideoAggregationRepository {
  // startDate, endDate （チャンネル詳細でヒストリ参照するときなど）
  findOne: (args: {
    where: { channelId: string }
  }) => Promise<VideoAggregation | null>

  // チャンネル一覧で並び替えする際などはchannelを使う
  // findAll: (args: {
  //   where: { channelId: string | string[] }
  //   limit?: number
  // }) => Promise<VideoAggregations>

  save: (args: {
    where: { channelId: string }
    data: VideoAggregation
  }) => Promise<void>
}
