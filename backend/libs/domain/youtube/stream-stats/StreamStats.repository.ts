import {
  ChatCount,
  ChatCounts,
  Count,
  VideoId,
  ViewerCounts
} from '@domain/youtube'

export interface StreamStatsRepository {
  findAllViewerCounts: (args: {
    where: { videoId: VideoId }
  }) => Promise<ViewerCounts>

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
    where: { videoId: VideoId }
    /**
     * 差分更新（前回のレコードから今回までの増分）
     */
    data: { all: Count; member: Count }
  }) => Promise<void>
}
