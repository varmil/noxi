import { Channel, Channels, ChannelId } from '@domain/youtube/'

export interface ChannelRepository {
  findAll: (args: { limit: number }) => Promise<Channels>
  findById: (id: ChannelId) => Promise<Channel | null>
  save: (args: Channel) => Promise<void>
}
