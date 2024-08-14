import { StreamStatus } from '@domain/stream'
import { ChannelId, Stream, Streams, VideoId } from '@domain/youtube'

export interface StreamRepository {
  findAll: (args: {
    where: { channelId?: ChannelId; status: StreamStatus }
    limit: number
  }) => Promise<Streams>

  findOne: (args: { where: { videoId: VideoId } }) => Promise<Stream | null>

  save: (args: { data: Stream }) => Promise<void>
}
