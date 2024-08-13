import { StreamStatus } from '@domain/stream'
import { ChannelId, Stream, Streams } from '@domain/youtube'

export interface StreamRepository {
  findAll: (args: {
    where: { channelId?: ChannelId; status: StreamStatus }
    limit: number
  }) => Promise<Streams>

  save: (args: { data: Stream }) => Promise<void>
}
