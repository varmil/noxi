import { StreamStatus } from '@domain/stream'
import { ChannelId, Streams } from '@domain/youtube'

export interface StreamRepository {
  findAll: (args: {
    where: { channelId?: ChannelId; status: StreamStatus }
    limit: number
  }) => Promise<Streams>
}
