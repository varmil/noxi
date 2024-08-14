import { StreamStatus } from '@domain/stream'
import {
  ChannelId,
  Stream,
  Streams,
  StreamTimes,
  VideoId
} from '@domain/youtube'

export interface StreamRepository {
  findAll: (args: {
    where: { channelId?: ChannelId; status: StreamStatus }
    limit: number
  }) => Promise<Streams>

  findOne: (args: { where: { videoId: VideoId } }) => Promise<Stream | null>

  save: (args: { data: Stream }) => Promise<void>

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>

  updateStreamTimes: (args: {
    where: { videoId: VideoId }
    data: StreamTimes
  }) => Promise<void>
}
