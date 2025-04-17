import { ChatCount } from '@domain/stream-stats'
import { VideoId } from '@domain/youtube/video'

export interface ChatCountRepository {
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

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>
}
