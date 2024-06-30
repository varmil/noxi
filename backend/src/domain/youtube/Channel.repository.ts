import { Channels } from '@domain/youtube/Channels.collection'

export interface ChannelRepository {
  findAll: (args: { limit?: number }) => Promise<Channels>
}
