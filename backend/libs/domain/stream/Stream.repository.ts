import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import {
  Metrics,
  Stream,
  Streams,
  StreamTimes,
  StreamStatus
} from '@domain/stream'
import {
  ChannelId,
  Duration,
  Thumbnails,
  VideoId,
  VideoIds
} from '@domain/youtube'
import type { Prisma } from '@prisma/client'

export interface StreamFindAllWhere {
  status?: StreamStatus
  videoIds?: VideoIds
  group?: Group
  gender?: Gender
  channelId?: ChannelId
  scheduledStartTime?: { gte?: Date; lte?: Date } | null
  actualEndTime?: { gte?: Date; lte?: Date } | null
  OR?: (Omit<Prisma.YoutubeStreamWhereInput, 'status'> & {
    status: StreamStatus
  })[]
}

export interface StreamRepository {
  findAll: (args: {
    where: StreamFindAllWhere
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

  count: (args: { where: StreamFindAllWhere }) => Promise<number>

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
      Omit<
        ConstructorParameters<typeof Metrics>[0],
        'chatMessages' | 'views'
      > & {
        chatMessages: { increment: number }
        views?: number | null
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
