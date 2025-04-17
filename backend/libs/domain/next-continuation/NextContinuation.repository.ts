import { NextContinuation } from '@domain/next-continuation'
import { VideoId } from '@domain/youtube/video'

export interface NextContinuationRepository {
  findOne: (args: {
    where: { videoId: VideoId }
    orderBy?: Partial<Record<'createdAt', 'asc' | 'desc'>>[]
  }) => Promise<NextContinuation | null>

  save: (args: {
    /**
     * 差分更新（前回のレコードから今回までの増分）
     */
    data: NextContinuation
  }) => Promise<void>

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>
}
