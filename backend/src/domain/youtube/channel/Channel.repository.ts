import { Channel, Channels, ChannelId, ChannelSort } from '@domain/youtube/'

export interface ChannelRepository {
  findAll: (args: { sort: ChannelSort; limit: number }) => Promise<Channels>
  findById: (id: ChannelId) => Promise<Channel | null>
  save: (args: Channel) => Promise<void>
}
