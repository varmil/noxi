import { ChatCount, ChatCounts } from '@domain/stream-stats'
import { VideoId } from '@domain/youtube/video'

export interface ChatCountRepository {
  /** 間引いた形 */
  findAll: (args: { where: { videoId: VideoId } }) => Promise<ChatCounts>

  /** 間引かない形 */
  findAllRaw: (args: {
    where: { videoId: VideoId; createdAt: { gte: Date; lt: Date } }
    orderBy?: Partial<Record<'createdAt', 'asc' | 'desc'>>[]
  }) => Promise<ChatCounts>

  findOne: (args: {
    where: { videoId: VideoId }
    orderBy?: Partial<Record<'createdAt', 'asc' | 'desc'>>[]
  }) => Promise<ChatCount | null>

  save: (args: {
    /**
     * 差分更新（前回のレコードから今回までの増分）
     */
    data: ChatCount
  }) => Promise<void>

  /** 5秒間隔でINSERTされているレコードを1分単位にまとめる */
  bundle: (args: {
    where: { videoId: VideoId; createdAt: { gte: Date; lt: Date } }
    /**
     * BUNDLED DATA sorted by createdAt ASC
     */
    data: ChatCounts
  }) => Promise<void>
}
