import { Group } from '@domain/group'
import {
  Metrics,
  Stream,
  Streams,
  StreamTimes,
  StreamStatus,
  StreamStatuses
} from '@domain/stream'
import { ChannelId, Duration, Thumbnails, VideoId } from '@domain/youtube'

export interface StreamRepository {
  findAll: (args: {
    where: {
      status: StreamStatus | StreamStatuses
      group?: Group
      channelId?: ChannelId
      scheduledBefore?: Date
      scheduledAfter?: Date
    }
    orderBy: Partial<
      Record<
        | 'scheduledStartTime'
        | 'actualStartTime'
        | 'actualEndTime'
        | 'maxViewerCount',
        'asc' | 'desc'
      >
    >[]
    limit: number
  }) => Promise<Streams>

  findOne: (args: { where: { videoId: VideoId } }) => Promise<Stream | null>

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
