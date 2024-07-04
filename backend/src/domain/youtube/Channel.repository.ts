import { Channel } from '@domain/youtube/Channel.entity'
import { Channels } from '@domain/youtube/Channels.collection'

export interface ChannelRepository {
  findAll: (args: { limit?: number }) => Promise<Channels>
  save: (channel: Channel) => Promise<void>
}
