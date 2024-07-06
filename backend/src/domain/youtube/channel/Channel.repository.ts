import { Channel } from '@domain/youtube/channel/Channel.entity'
import { Channels } from '@domain/youtube/channel/Channels.collection'

export interface ChannelRepository {
  findAll: (args: { limit: number }) => Promise<Channels>
  save: (args: Channel) => Promise<void>
}
