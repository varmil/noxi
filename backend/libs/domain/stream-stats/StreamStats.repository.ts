import {
  AvgCount,
  ChatCount,
  ChatCounts,
  Count,
  ViewerCounts
} from '@domain/stream-stats'
import { VideoId } from '@domain/youtube/video'

export interface StreamStatsRepository {
  findAllViewerCounts: (args: {
    where: { videoId: VideoId }
  }) => Promise<ViewerCounts>

  findAvgViewerCount: (args: {
    where: { videoId: VideoId }
  }) => Promise<AvgCount>

  findAllChatCounts: (args: {
    where: { videoId: VideoId }
  }) => Promise<ChatCounts>

  /**
   * Find 最も新しいチャット数
   */
  findLatestChatCount: (args: {
    where: { videoId: VideoId }
  }) => Promise<ChatCount | null>

  saveViewerCount: (args: {
    where: { videoId: VideoId }
    /**
     * 現在時点の視聴者数
     */
    data: Count
  }) => Promise<void>

  saveChatCount: (args: {
    /**
     * 差分更新（前回のレコードから今回までの増分）
     */
    data: ChatCount
  }) => Promise<void>

  /** 5秒間隔でINSERTされているレコードを1分単位にまとめる */
  bundleChatCounts: (args: {
    where: { videoId: VideoId }
    /**
     * BUNDLED DATA sorted by createdAt ASC
     */
    data: ChatCounts
  }) => Promise<void>
}
