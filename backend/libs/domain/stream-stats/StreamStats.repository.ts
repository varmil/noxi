import { AvgCount, Count, ViewerCounts } from '@domain/stream-stats'
import { VideoId } from '@domain/youtube/video'

export interface StreamStatsRepository {
  findAllViewerCounts: (args: {
    where: { videoId: VideoId }
  }) => Promise<ViewerCounts>

  findAvgViewerCount: (args: {
    where: { videoId: VideoId }
  }) => Promise<AvgCount>

  saveViewerCount: (args: {
    where: { videoId: VideoId }
    /**
     * 現在時点の視聴者数
     */
    data: Count
  }) => Promise<void>
}
