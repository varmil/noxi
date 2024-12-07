import { ChatCount, ChatCounts } from '@domain/stream-stats'
import { VideoId } from '@domain/youtube/video'

export interface ChatCountRepository {
  findAllChatCounts: (args: {
    where: { videoId: VideoId }
  }) => Promise<ChatCounts>

  /**
   * Find 最も新しいチャット数
   */
  findLatestChatCount: (args: {
    where: { videoId: VideoId }
  }) => Promise<ChatCount | null>

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
