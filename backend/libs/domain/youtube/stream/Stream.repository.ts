import { StreamStatus, StreamStatuses } from '@domain/stream'
import {
  ChannelId,
  Duration,
  Stream,
  Streams,
  StreamTimes,
  VideoId
} from '@domain/youtube'

export interface StreamRepository {
  findAll: (args: {
    where: {
      status: StreamStatus | StreamStatuses
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

  updateLikeCount: (args: {
    where: { videoId: VideoId }
    data: number
  }) => Promise<void>
}
