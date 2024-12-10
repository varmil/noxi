import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import {
  Metrics,
  Stream,
  Streams,
  StreamTimes,
  StreamStatus,
  StreamStatuses
} from '@domain/stream'
import {
  ChannelId,
  Duration,
  Thumbnails,
  VideoId,
  VideoIds
} from '@domain/youtube'

export interface StreamRepository {
  findAll: (args: {
    where: {
      status?: StreamStatus | StreamStatuses
      videoIds?: VideoIds
      group?: Group
      gender?: Gender
      channelId?: ChannelId
      scheduledBefore?: Date
      scheduledAfter?: Date
      endedBefore?: Date
      endedAfter?: Date
    }
    orderBy?: Partial<
      Record<
        | 'videoId'
        | 'scheduledStartTime'
        | 'actualStartTime'
        | 'actualEndTime'
        | 'maxViewerCount',
        'asc' | 'desc'
      >
    >[]
    limit?: number
    offset?: number
  }) => Promise<Streams>

  findOne: (args: { where: { videoId: VideoId } }) => Promise<Stream | null>

  /** 渡したデータで全上書き */
  save: (args: { data: Stream }) => Promise<void>

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>

  updateDuration: (args: {
    where: { videoId: VideoId }
    data: Duration
  }) => Promise<void>

  updateStreamTimes: (args: {
    where: { videoId: VideoId }
    data: StreamTimes
  }) => Promise<void>

  /** undefinedの場合、何もしない */
  updateMetrics: (args: {
    where: { videoId: VideoId }
    data: Partial<
      Omit<ConstructorParameters<typeof Metrics>[0], 'chatMessages'> & {
        chatMessages: { increment: number }
      }
    >
  }) => Promise<void>

  updateLikeCount: (args: {
    where: { videoId: VideoId }
    data: number
  }) => Promise<void>

  updateThumbnails: (args: {
    where: { videoId: VideoId }
    data: Thumbnails
  }) => Promise<void>
}
